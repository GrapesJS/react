import { useState, useEffect, MouseEvent, useMemo, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiMenuDown, mdiEyeOutline, mdiEyeOffOutline, mdiLock, mdiLockOpenVariant } from '@mdi/js';
import type { Component } from 'grapesjs';
import { useEditor } from '@grapesjs/react';
import { cx } from '../common';

export declare interface LayerItemProps extends React.HTMLProps<HTMLDivElement> {
    component: Component,
    level: number,
    draggingCmp: any,
    dragParent: any,
}

const itemStyle = { maxWidth: `100%` };

export default function LayerItem({ component, draggingCmp, dragParent, ...props }: LayerItemProps) {
    const editor = useEditor();
    const { Layers } = editor;
    const layerRef = useRef<HTMLDivElement>(null);
    const [rename, setRename] = useState(false);
    const [layerData, setLayerData] = useState(Layers.getLayerData(component));
    const { open, selected, hovered, components, visible, locked, name } = layerData;
    const componentsIds = components.map((cmp) => cmp.getId());
    const isDragging = draggingCmp === component;
    const cmpHash = componentsIds.join('-');
    const level = props.level + 1;
    const isHovered = hovered || dragParent === component;

    useEffect(() => {
        level === 0 && setLayerData(Layers.getLayerData(component));
        if (layerRef.current) {
            (layerRef.current as any).__cmp = component;
        }
    }, [component]);

    useEffect(() => {
        const up = (cmp: Component) => {
            cmp === component && setLayerData(Layers.getLayerData(cmp));
        };
        const ev = Layers.events.component;
        editor.on(ev, up);

        return () => {
            editor.off(ev, up)
        };
    }, [editor, Layers, component]);

    const cmpToRender = useMemo(() => {
        return components.map((cmp) => (
            <LayerItem
                key={cmp.getId()}
                component={cmp}
                level={level}
                draggingCmp={draggingCmp}
                dragParent={dragParent}
            />
        ))
    }, [cmpHash, draggingCmp, dragParent]);

    const onRename = (name: string) => {
        Layers.setLayerData(component, { name });
        setRename(false);
    }

    const toggleOpen = (ev: MouseEvent) => {
        ev.stopPropagation();
        Layers.setLayerData(component, { open: !open })
    };

    const toggleVisibility = (ev: MouseEvent) => {
        ev.stopPropagation();
        Layers.setLayerData(component, { visible: !visible })
    };

    const toggleLock = (ev: MouseEvent) => {
        ev.stopPropagation();
        Layers.setLayerData(component, { locked: !locked })
    };

    const select = (event: MouseEvent) => {
        event.stopPropagation();
        Layers.setLayerData(component, { selected: true }, { event })
    };

    const hover = (hovered: boolean) => {
        if (!hovered || !draggingCmp) {
            Layers.setLayerData(component, { hovered })
        }
    };

    const wrapperCls = cx('layer-item flex flex-col', selected && 'bg-red-300', (!visible || isDragging) && 'opacity-50');


    return (
        <div className="move-ref">
            <div className={wrapperCls}>
                <div
                    onClick={select}
                    onMouseEnter={() => hover(true)}
                    onMouseLeave={() => hover(false)}
                    className={cx('group max-w-full')}
                    data-layer-item
                    ref={layerRef}
                >
                    <div
                        className={cx([
                            'flex items-center',
                            isHovered ? 'bg-red-300' : '',
                            ...(selected ? ['bg-red-500'] : [])
                        ])}
                    >
                        <div
                            style={{ marginLeft: `${level*10}px` }}
                            className={cx('cursor-pointer', !components.length && 'pointer-events-none opacity-0')}
                            onClick={toggleOpen}
                        >
                            <Icon path={mdiMenuDown} size={1} rotate={open ? 0 : -90}/>
                        </div>
                        <div className="truncate flex-grow" onDoubleClick={() => setRename(true)} style={itemStyle}>
                            { rename ? <input value={name} onBlur={(ev) => onRename(ev.target.value)}/> : <>{ name }</> }
                        </div>
                        {
                            !rename &&
                            <>
                                <div className={cx('group-hover:opacity-100 cursor-pointer', locked ? 'opacity-100' : 'opacity-0')} onClick={toggleLock}>
                                    <Icon path={locked ? mdiLock : mdiLockOpenVariant} size={1}/>
                                </div>
                                <div className={cx('group-hover:opacity-100 cursor-pointer', visible ? 'opacity-0' : 'opacity-100')} onClick={toggleVisibility}>
                                    <Icon path={visible ? mdiEyeOutline : mdiEyeOffOutline} size={1}/>
                                </div>
                            </>
                        }
                    </div>
                </div>
                {
                    !!(open && components.length) &&
                    <div className={cx('max-w-full', !open && 'hidden')}>
                        { cmpToRender }
                    </div>
                }
            </div>
        </div>
    )
}
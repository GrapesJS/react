import { LayersResultProps, useEditor } from '@grapesjs/react';
import LayerItem from './LayerItem';
import { useEffect, useRef, useState } from 'react';
import type { Editor, Component } from 'grapesjs';
import { cx } from '../common';

type DragRect = {
    y: number,
    h: number,
    pointerInside: boolean,
}

const wrapGridStyle = {
    touchAction: 'none',
}

const LAYER_PAD = 5;

const getDragTarget = (ev: React.PointerEvent) => {
    const el = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement;
    const elLayer = el?.closest('[data-layer-item]') as HTMLElement;
    return {
        el: elLayer,
        cmp: (elLayer as any)?.__cmp,
    }
}

type CanMoveResult = ReturnType<Editor['Components']['canMove']>;

interface CanMove extends Partial<Omit<CanMoveResult, 'source'>> {
    canMoveInside?: CanMoveResult;
    source?: Component | null;
    index?: number;
}

export default function CustomLayerManager({ root }: LayersResultProps) {
    const editor = useEditor();
    const [pointerDown, setPointerDown] = useState(false);
    const [canMoveRes, setCanMoveRes] = useState<CanMove>({});
    const [cmpPointerOver, setCmpPointerOver] = useState<Component>();
    const [dragging, setDragging] = useState<Component>();
    const [dragParent, setDragParent] = useState<Component>();
    const [dragRect, setDragRect] = useState<DragRect>();
    const indicatorRef = useRef<HTMLDivElement>(null);
    const { Components } = editor;

    const onDragStart = () => {
        setPointerDown(true);
    };

    const onDragMove = (ev: React.PointerEvent) => {
        if (!pointerDown) return;
        const { cmp, el: elLayer } = getDragTarget(ev);
        if (!elLayer || !cmp) return;
        const layerRect = elLayer.getBoundingClientRect();
        const layerH = elLayer.offsetHeight;
        const layerY = elLayer.offsetTop;
        const pointerY = ev.clientY;
        const isBefore = pointerY < (layerRect.y + layerH / 2);
        const cmpSource = !dragging ? cmp : dragging;
        const cmpTarget = cmp.parent();
        const cmpIndex = cmp.index() + (isBefore ? 0 : 1);
        !dragging && setDragging(cmp);
        setCmpPointerOver(cmp);
        const canMove = Components.canMove(cmpTarget, cmpSource, cmpIndex);
        const canMoveInside = Components.canMove(cmp, cmpSource);
        const canMoveRes: CanMove = {
            ...canMove,
            canMoveInside,
            index: cmpIndex,
        };
        let pointerInside = false;
        if (
            canMoveInside.result &&
            (
                pointerY > (layerRect.y + LAYER_PAD)
                && pointerY < (layerRect.y + layerH - LAYER_PAD))
        ) {
            pointerInside = true;
            canMoveRes.target = cmp;
            delete canMoveRes.index;
        }
        setDragParent(pointerInside ? cmp : undefined);
        setCanMoveRes(canMoveRes);
        setDragRect({
            pointerInside,
            y: layerY + (isBefore ? 0 : layerH),
            h: layerH,
        });
    };
    const onDragEnd = () => {
        canMoveRes?.result && canMoveRes.source?.move(canMoveRes.target!, { at: canMoveRes.index });
        setDragging(undefined);
        setPointerDown(false);
        setCmpPointerOver(undefined);
        setCanMoveRes({});
        setDragParent(undefined);
        setDragRect(undefined);
    };

    const dragLevel = (cmpPointerOver ? cmpPointerOver.parents() : []).length;
    const showIndicator = !!(dragging && dragRect && canMoveRes?.result && !dragRect.pointerInside);
    const indicatorStyle = showIndicator ? { top: dragRect.y, left: 0, marginLeft: dragLevel*10+20 } : {};

    useEffect(() => {
        const doc = window.document;
        const onKeyDown = (ev: KeyboardEvent) => {
            if (ev.key === 'Escape') {
                setCanMoveRes({ ...canMoveRes, result: false });
                onDragEnd();
            }
        }

        doc.addEventListener('keydown', onKeyDown);

        return () => {
            doc.removeEventListener('keydown', onKeyDown);
        }
    }, []);

    return (
      <div
        className="gjs-custom-layer-manager h-full overflow-y-auto overflow-x-hidden text-sm select-none relative"
        style={wrapGridStyle}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
    >
        {
            !!root && <LayerItem component={root} level={-1} draggingCmp={dragging} dragParent={dragParent}/>
        }
        {
            showIndicator &&
            <div ref={indicatorRef} className={cx('absolute w-full h-0.5 bg-yellow-400')} style={indicatorStyle}></div>
        }
      </div>
    );
  }
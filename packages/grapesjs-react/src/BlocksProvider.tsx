import type { Block } from 'grapesjs';
import React, { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { useEditorOptions } from './context/EditorOptions';
import { isFunction, noop } from './utils';
import { PortalContainerResult, portalContainer } from './utils/react';

export type BlocksState = {
    /**
     * Array of blocks.
     */
    blocks: Block[],

    /**
     * Enable drag for a block.
     */
    dragStart: (block: Block, ev?: Event) => void,

    /**
     * Disable drag.
     */
    dragStop: (cancel?: boolean) => void,

    /**
     * Default Block Manager container.
     */
    Container: PortalContainerResult,

    /**
     * Map of blocks by category.
     */
    mapCategoryBlocks: MapCategoryBlocks,
};

export type BlocksResultProps = BlocksState;

export interface BlocksProviderProps {
    children: (props: BlocksResultProps) => React.JSX.Element,
}

export interface BlocksEventProps {
    blocks: Block[],
    container: HTMLElement,
    dragStart: (block: Block, ev?: Event) => void,
    drag: (ev: Event) => void,
    dragStop: (cancel?: boolean) => void,
}

export type MapCategoryBlocks = Map<string, Block[]>;

const BlocksProvider = memo(function ({ children }: BlocksProviderProps) {
    const { editor } = useEditorInstance();
    const options = useEditorOptions();
    const [propState, setPropState] = useState<BlocksState>(() => ({
        blocks: [],
        dragStart: noop,
        dragStop: noop,
        mapCategoryBlocks: new Map(),
        Container: () => null,
    }));

    useEffect(() => {
        if (!editor) return;
        const event = editor.Blocks.events.custom;
        const toListen = ({ blocks, container, dragStart, dragStop }: BlocksEventProps) => {
            const mapCategoryBlocks = blocks.reduce((res, block) => {
                const categoryLabel = block.getCategoryLabel();
                const categoryBlocks = res.get(categoryLabel);

                if (!categoryBlocks) {
                    res.set(categoryLabel, [block]);
                } else {
                    categoryBlocks.push(block);
                }

                return res;
            }, new Map() as MapCategoryBlocks);

            setPropState({
                blocks,
                dragStart,
                dragStop,
                mapCategoryBlocks,
                Container: portalContainer(container),
            });
        }

        editor.on(event, toListen);
        editor.Blocks.__trgCustom();

        return () => {
            editor.off(event, toListen);
        };
    }, [editor]);

    useEffect(() => options.setCustomBlocks(true), []);

    return editor ?
        (isFunction(children) ? children(propState)  : null)
    : null;
  });

  export default BlocksProvider;
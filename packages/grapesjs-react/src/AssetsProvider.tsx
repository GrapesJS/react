import type { Asset } from 'grapesjs';
import React, { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { useEditorOptions } from './context/EditorOptions';
import { isFunction } from './utils';
import { PortalContainerResult, portalContainer } from './utils/react';

export type AssetsState = {
    /**
     * Array of assets.
     */
    assets: Asset[],

    /**
     * Asset types.
     */
    types: string[],

    /**
     * Select asset.
     */
    select: (asset: Asset, complete?: boolean) => void,

    /**
     * Close assets.
     */
    close: () => void,

    /**
     * Asset Manager container.
     */
    Container: PortalContainerResult,
};

export type AssetsResultProps = AssetsState & {
    /**
     * Indicates if the Asset Manager is open.
     */
     open: boolean,
};

export interface AssetsProviderProps {
    children: (props: AssetsResultProps) => React.JSX.Element,
}

export interface AssetsEventProps {
    open: boolean,
    assets: Asset[],
    types: string[],
    select: () => void,
    close: () => void,
    container: HTMLElement,
}

const AssetsProvider = memo(function ({ children }: AssetsProviderProps) {
    const { editor } = useEditorInstance();
    const options = useEditorOptions();
    const [open, setOpen] = useState(false);
    const [propState, setPropState] = useState<AssetsState>({
        assets: [],
        types: [],
        close: () => {},
        select: () => {},
        Container: () => null,
    });

    useEffect(() => {
        if (!editor) return;
        const event = editor.Assets.events.custom;

        const toListen = ({ open, assets, types, select, close, container }: AssetsEventProps) => {
            open && setPropState({
                assets,
                types,
                select,
                close,
                Container: portalContainer(container),
            });
            setOpen(open);
        }

        editor.on(event, toListen);

        return () => {
            editor.off(event, toListen)
        };
    }, [editor]);

    useEffect(() => options.setCustomAssets(true), []);

    return editor ?
        (isFunction(children) ? children({ open, ...propState })  : null)
    : null;
  });

  export default AssetsProvider;
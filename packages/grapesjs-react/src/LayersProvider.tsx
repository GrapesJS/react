import type { Component } from 'grapesjs';
import React, { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { isFunction } from './utils';

export type LayersState = {
    /**
     * Root layer component.
     */
    root?: Component,
};

export type LayersResultProps = LayersState;

export interface LayersProviderProps {
    children: (props: LayersResultProps) => React.JSX.Element,
}

const LayersProvider = memo(function ({ children }: LayersProviderProps) {
    const { editor } = useEditorInstance();
    const [propState, setPropState] = useState<LayersState>(() => ({
        root: undefined,
    }));

    useEffect(() => {
        if (!editor) return;
        const { Layers } = editor;
        const event = Layers.events.custom;

        const up = () => {
            setPropState({
                root: Layers.getRoot(),
            });
        }

        editor.on(event, up);
        up();

        return () => {
            editor.off(event, up);
        };
    }, [editor]);

    return editor ?
        (isFunction(children) ? children(propState)  : null)
    : null;
  });

  export default LayersProvider;
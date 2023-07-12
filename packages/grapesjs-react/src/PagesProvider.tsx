import type { Editor, Page } from 'grapesjs';
import React, { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { isFunction, noop } from './utils';

export type PagesState = {
    /**
     * Array of pages.
     */
    pages: Page[],

    /**
     * Selected page.
     */
    selected?: Page,

    /**
     * Select page.
     */
    select: Editor['Pages']['select'],

    /**
     * Add new page.
     */
    add: Editor['Pages']['add'],

    /**
     * Remove page.
     */
    remove: Editor['Pages']['remove'],
};

export type PagesResultProps = PagesState;

export interface PagesProviderProps {
    children: (props: PagesResultProps) => React.JSX.Element,
}

const PagesProvider = memo(function ({ children }: PagesProviderProps) {
    const { editor } = useEditorInstance();
    const [propState, setPropState] = useState<PagesState>(() => ({
        pages: [],
        selected: undefined,
        select: noop as any,
        add: noop as any,
        remove: noop as any,
    }));

    useEffect(() => {
        if (!editor) return;
        const { Pages } = editor;
        const event = Pages.events.all;

        const up = () => {
            setPropState({
                pages: Pages.getAll(),
                selected: Pages.getSelected(),
                select: (...args) => Pages.select(...args),
                add: (...args) => Pages.add(...args),
                remove: (...args) => Pages.remove(...args),
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

  export default PagesProvider;
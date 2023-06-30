import type { Selector, State, Editor, Sector } from 'grapesjs';
import React, { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { isFunction, noop } from './utils';
import { PortalContainerResult, portalContainer } from './utils/react';

// TODO
// addSelector: (...args: Parameters<Editor['Selectors']['addSelected']>) => void,

export type StylesState = {
    /**
     * Array of visible sectors.
     */
    sectors: Sector[],

    /**
     * Default Styles container.
     */
    Container: PortalContainerResult,
};

export type StylesResultProps = StylesState;

export interface StylesProviderProps {
    children: (props: StylesResultProps) => React.JSX.Element,
}

const StylesProvider = memo(function ({ children }: StylesProviderProps) {
    const { editor } = useEditorInstance();
    const [propState, setPropState] = useState<StylesState>(() => ({
        sectors: [],
        Container: () => null,
    }));

    useEffect(() => {
        if (!editor) return;
        const { Styles } = editor;
        const event = Styles.events.custom;

        const up = ({ container }: { container: HTMLElement }) => {
            setPropState({
                sectors: Styles.getSectors({ visible: true }),
                Container: portalContainer(container),
            });
        }

        editor.on(event, up);

        return () => {
            editor.off(event, up);
        };
    }, [editor]);

    return editor ?
        (isFunction(children) ? children(propState)  : null)
    : null;
  });

  export default StylesProvider;
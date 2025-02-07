import type { Trait } from 'grapesjs';
import { memo, useEffect, useState } from 'react';
import type { ReactElement, JSX } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { useEditorOptions } from './context/EditorOptions';
import { isFunction } from './utils';
import { PortalContainerResult, portalContainer } from './utils/react';

export type TraitsState = {
    /**
     * Current selected traits.
     */
    traits: Trait[],

    /**
     * Default Trait Manager container.
     */
    Container: PortalContainerResult,
};

export type TraitsResultProps = TraitsState;

export interface TraitsProviderProps {
    children: (props: TraitsResultProps) => ReactElement<any>;
}

const TraitsProvider  = memo(function ({ children }: TraitsProviderProps) {
    const { editor } = useEditorInstance();
    const options = useEditorOptions();
    const [propState, setPropState] = useState<TraitsState>(() => ({
        traits: [],
        Container: () => <></>,
    }));

    useEffect(() => {
        if (!editor) return;
        const { Traits } = editor;
        const event = Traits.events.custom;

        const up = ({ container }: { container: HTMLElement }) => {
            setPropState({
                traits: Traits.getCurrent(),
                Container: portalContainer(container),
            });
        }

        editor.on(event, up);
        Traits.__trgCustom();

        return () => {
            editor.off(event, up);
        };
    }, [editor]);

    useEffect(() => options.setCustomTraits(true), []);

    return editor ?
        (isFunction(children) ? children(propState)  : <></>)
    : <></>;
  }) 

  export default TraitsProvider as unknown as (props: TraitsProviderProps) => JSX.Element;
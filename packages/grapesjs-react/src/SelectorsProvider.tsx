import type { Selector, State } from 'grapesjs';
import React, { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { isFunction } from './utils';

export type SelectorsState = {
    /**
     * Array of current selectors.
     */
    selectors: Selector[],

    /**
     * Array of available states.
     */
    states: State[],

    /**
     * Current selected state.
     */
    selectedState: string,

    /**
     * Selector strings of currently selected targets.
     */
    targets: string[],
};

export type SelectorsResultProps = SelectorsState;

export interface SelectorsProviderProps {
    children: (props: SelectorsResultProps) => React.JSX.Element,
}

const SelectorsProvider = memo(function ({ children }: SelectorsProviderProps) {
    const { editor } = useEditorInstance();
    const [propState, setPropState] = useState<SelectorsState>(() => ({
        selectors: [],
        states: [],
        selectedState: '',
        targets: [],
    }));

    useEffect(() => {
        if (!editor) return;
        const { Selectors } = editor;
        const event = Selectors.events.custom;

        const up = () => {
            setPropState({
                selectors: Selectors.getSelected(),
                states: Selectors.getStates(),
                selectedState: Selectors.getState(),
                targets: Selectors.getSelectedTargets()
                    .map(target => target.getSelectorsString()),
            });
        }

        editor.on(event, up);
        // up();

        return () => {
            editor.off(event, up);
        };
    }, [editor]);

    return editor ?
        (isFunction(children) ? children(propState)  : null)
    : null;
  });

  export default SelectorsProvider;
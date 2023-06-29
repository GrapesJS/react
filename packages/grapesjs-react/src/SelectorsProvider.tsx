import type { Selector, State, Editor } from 'grapesjs';
import React, { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { isFunction, noop } from './utils';

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

    /**
     * Add new selector to selected targets.
     */
    addSelector: (...args: Parameters<Editor['Selectors']['addSelected']>) => void,

    /**
     * Remove selector from selected targets.
     */
    removeSelector: (...args: Parameters<Editor['Selectors']['removeSelected']>) => void,

    /**
     * Update current state.
     */
    setState: (...args: Parameters<Editor['Selectors']['setState']>) => void,
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
        addSelector: noop,
        removeSelector: noop,
        setState: noop,
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
                targets: Selectors.getSelectedTargets().map(t => t.getSelectorsString()),
                addSelector: (...args) => Selectors.addSelected(...args),
                removeSelector: (...args) => Selectors.removeSelected(...args),
                setState: (...args) => Selectors.setState(...args),
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
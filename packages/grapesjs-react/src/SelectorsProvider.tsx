import type { Device } from 'grapesjs';
import React, { memo, useEffect, useState } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { isFunction, noop } from './utils';

export type SelectorsState = {
    /**
     * Array of devices.
     */
    devices: Device[],

    /**
     * Selected device id.
     */
    selected: string,

    /**
     * Select new device by id.
     */
    select: (deviceId: string) => void,
};

export type SelectorsResultProps = SelectorsState;

export interface SelectorsProviderProps {
    children: (props: SelectorsResultProps) => React.JSX.Element,
}

const SelectorsProvider = memo(function ({ children }: SelectorsProviderProps) {
    const { editor } = useEditorInstance();
    const [propState, setPropState] = useState<SelectorsState>(() => ({
        devices: [],
        selected: '',
        select: noop,
    }));

    useEffect(() => {
        if (!editor) return;
        const { Devices } = editor;
        const event = Devices.events.all;

        const up = () => {
            setPropState({
                devices: Devices.getDevices(),
                selected: Devices.getSelected()?.id as string,
                select: (id) => Devices.select(id),
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

  export default SelectorsProvider;
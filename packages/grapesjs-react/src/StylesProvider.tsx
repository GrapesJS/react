import type { Sector } from 'grapesjs';
import { memo, useEffect, useState } from 'react';
import type { ReactElement, JSX } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { isFunction } from './utils';
import { PortalContainerResult, portalContainer } from './utils/react';
import { useEditorOptions } from './context/EditorOptions';

export type StylesState = {
  /**
   * Array of visible sectors.
   */
  sectors: Sector[];

  /**
   * Default Styles container.
   */
  Container: PortalContainerResult;
};

export type StylesResultProps = StylesState;

export interface StylesProviderProps {
  children: (props: StylesResultProps) => ReactElement<any>;
}

const StylesProvider = memo(function ({ children }: StylesProviderProps) {
  const { editor } = useEditorInstance();
  const options = useEditorOptions();
  const [propState, setPropState] = useState<StylesState>(() => ({
    sectors: [],
    Container: () => <></>
  }));

  useEffect(() => {
    if (!editor) return;
    const { Styles } = editor;
    const event = Styles.events.custom;

    const up = ({ container }: { container: HTMLElement }) => {
      setPropState({
        sectors: Styles.getSectors({ visible: true }),
        Container: portalContainer(container)
      });
    };

    editor.on(event, up);

    return () => {
      editor.off(event, up);
    };
  }, [editor]);

  useEffect(() => options.setCustomStyles(true), []);

  return editor ? isFunction(children) ? children(propState) : <></> : <></>;
});

export default StylesProvider as unknown as (props: StylesProviderProps) => JSX.Element;

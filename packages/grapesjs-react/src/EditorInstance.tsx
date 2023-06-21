import type gjs from 'grapesjs';
import type { Editor, EditorConfig } from 'grapesjs';
import { useEffect, useRef } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { useEditorOptions } from './context/EditorOptions';
import { loadPlugins } from './utils';
import { loadScript, loadStyle } from './utils/dom';

export interface EditorInstanceProps extends React.HTMLProps<HTMLDivElement> {
    grapesjs: string | typeof gjs,
    grapesjsCss?: string,
    options?: EditorConfig,
}

export default function EditorInstance({ children, className, options, grapesjs, grapesjsCss }: EditorInstanceProps) {
  const { setEditor } = useEditorInstance();
  const editorOptions = useEditorOptions();
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait until all refs are loaded
    if (!editorOptions.ready) return;

    let editor: Editor | undefined;
    const loadedPlugins: string[] = [];
    const pluginOptions: Record<string, any> = {};

    const loadEditor = (gjse: typeof gjs) => {
      const config: EditorConfig = {
        ...editorOptions,
        plugins: [
          ...loadedPlugins,
          ...(options?.plugins as any),
        ],
        pluginsOpts: {
          ...options?.pluginsOpts,
          ...pluginOptions,
        },
        panels: { defaults: [] },
        container: editorOptions.refCanvas,
        customUI: true,
        height: '100%',
        modal: {
          ...options?.modal,
          custom: editorOptions.customModal,
        },
        assetManager: {
          ...options?.assetManager,
          custom: editorOptions.customAssets,
        },
        styleManager: {
          ...options?.styleManager,
          custom: true,
        },
        richTextEditor: {
          ...options?.richTextEditor,
          custom: editorOptions.customRte,
        },
      };

      editor = gjse.init(config);
      // dispatch('setEditor', editor);
      setEditor(editor);
      (window as any).editor = editor;
    }

    const init = async () => {
      grapesjsCss && await loadStyle(grapesjsCss);

      const plugins: any[] = [
        // ...PLUGINS_BY_PROJECT[projectType],
        // ...PLUGINS_BY_PROJECT.global,
      ];

      // Load plugins
      if (plugins.length) {
        const { loaded } = await loadPlugins(plugins);
        loaded.forEach(({ id, options }) => {
          loadedPlugins.push(id);
          pluginOptions[id] = options || {};
        });
      }

      // Load GrapesJS
      if (typeof grapesjs === 'string') {
        await loadScript(grapesjs);
        loadEditor((window as any).grapesjs);
      } else {
        loadEditor(grapesjs);
      }
    }

    init();

    return () => editor?.destroy();
  }, [editorOptions]); // eslint-disable-line

  console.log('EditorInstance');

  return (
    <div className={className} ref={editorRef}>
      { children }
    </div>
  );
}
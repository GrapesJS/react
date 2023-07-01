import type gjs from 'grapesjs';
import type { Editor, EditorConfig, ProjectData } from 'grapesjs';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useEditorInstance } from './context/EditorInstance';
import { useEditorOptions } from './context/EditorOptions';
import { cx, noop } from './utils';
import { loadScript, loadStyle } from './utils/dom';
import { GrapesPlugins, PluginToLoad, PluginTypeToLoad, initPlugins } from './utils/plugins';

export interface EditorProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onLoad'> {
    grapesjs: string | typeof gjs,
    /**
     * GrapesJS options.
     */
    options?: EditorConfig,

    /**
     * Load GrapesJS CSS file asynchronously from URL.
     * @example 'https://unpkg.com/grapesjs/dist/css/grapes.min.css'
     */
    grapesjsCss?: string,

    /**
     * Array of plugins.
     * Differently from the GrapesJS `plugins` option, this one allows also you to load plugins
     * asynchronously from a CDN URL.
     * @example
     * plugins: [
     *  {
     *    // The id should be name of the plugin that will be actually loaded
     *    id: 'gjs-blocks-basic',
     *    src: 'https://unpkg.com/grapesjs-blocks-basic',
     *    options: {}
     *  }
     *  // plugin already loaded in the global scope (eg. loaded via CND in HTML)
     *  'grapesjs-plugin-forms',
     *  // plugin as a function
     *  myPlugin,
     * ]
     */
    plugins?: PluginTypeToLoad[],

    /**
     * Callback triggered once the editor instance is created.
     */
    onEditor?: (editor: Editor) => void,

    /**
     * Callback triggered once the editor is ready (mounted and loaded data from the Storage).
     */
    onReady?: (editor: Editor) => void,

    /**
     * Callback triggered on each update in the editor project.
     * The updated ProjectData (JSON) is passed as a first argument.
     */
    onUpdate?: (projectData: ProjectData, editor: Editor) => void,

    /**
     * Avoid rendering children of the editor until the editor instance is created.
     */
    waitEditor?: boolean | React.ReactNode,

    /**
     * Avoid rendering children of the editor until the editor is ready (mounted and loaded data from the Storage).
     */
    waitReady?: boolean | React.ReactNode,
}

const EditorInstance = memo(function EditorInstance({
  children,
  className,
  options = {},
  plugins = [],
  grapesjs,
  grapesjsCss,
  onEditor = noop,
  onReady,
  onUpdate,
}: EditorProps) {
  const { setEditor } = useEditorInstance();
  const editorOptions = useEditorOptions();
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait until all refs are loaded
    if (!editorOptions.ready || !editorRef.current) {
      return;
    }

    const defaultContainer = editorRef.current;
    const canvasContainer = editorOptions.refCanvas;

    let editor: Editor | undefined;
    let pluginOptions: PluginToLoad['options'] = {};
    let loadedPlugins: GrapesPlugins[] = [];

    const loadEditor = (grapes: typeof gjs) => {
      const config: EditorConfig = {
        height: '100%',
        ...options,
        plugins: [
          ...loadedPlugins,
          ...(options.plugins || []),
        ],
        pluginsOpts: {
          ...options.pluginsOpts,
          ...pluginOptions,
        },
        modal: {
          ...options.modal,
          custom: !!editorOptions.customModal,
        },
        assetManager: {
          ...options.assetManager,
          custom: !!editorOptions.customAssets,
        },
        styleManager: {
          ...options.styleManager,
          custom: !!editorOptions.customStyles,
        },
        blockManager: {
          ...options.blockManager,
          custom: !!editorOptions.customBlocks,
        },
        richTextEditor: {
          ...options.richTextEditor,
          custom: !!editorOptions.customRte,
        },
        container: canvasContainer || defaultContainer,
        customUI: !!canvasContainer,
        // Disables all default panels if Canvas is used
        ...(canvasContainer ?
          {
            panels: { defaults: [] }
          } : {})
      };
      editor = grapes.init(config);
      setEditor(editor);
      onEditor(editor);

      if (onUpdate) {
        editor.on('update', () => {
          onUpdate(editor!.getProjectData(), editor!);
        })
      }

      if (onReady) {
        editor.onReady(() => onReady(editor!));
      }
    }

    const init = async () => {
      grapesjsCss && await loadStyle(grapesjsCss);
      const pluginsRes = await initPlugins(plugins);
      loadedPlugins = pluginsRes.plugins;
      pluginOptions = pluginsRes.pluginOptions;

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
  }, [editorOptions.ready]);

  const height = options.height ?? '100%';
  const width = options.width ?? '100%';

  const style = useMemo(() => ({
    height,
    width,
  }), [height, width]);

  return (
    <div className={cx('gjs-editor-wrapper', className)} ref={editorRef} style={style}>
      { children }
    </div>
  );
});

export default EditorInstance;
import GrapesJsEditor, { EditorProps } from '@grapesjs/react';
import type gjs from 'grapesjs';
import type { Editor, EditorConfig, ProjectData } from 'grapesjs';
import { useCallback, useMemo, useState } from 'react';

declare global {
  interface Window {
    grapesjs: typeof gjs
  }
}

type onUpdateProp = Required<EditorProps>['onUpdate'];

const getDateString = (date?: Date) => {
  return date?.toISOString().replace(/Z|T/gi, ' ');
}

function App() {
  const [editor, setEditor] =  useState<Editor>();
  const [projectData, setProjectData] =  useState<ProjectData>();
  const [projectDataDate, setProjectDataDate] =  useState<Date>();

  const onProjectUpdate = useCallback<onUpdateProp>((pd) => {
    setProjectData(pd);
    setProjectDataDate(new Date());
    projectData;
  }, []);

  const plugins: EditorProps['plugins'] = useMemo(() => ([
    {
      id: 'gjs-blocks-basic',
      src: 'https://unpkg.com/grapesjs-blocks-basic',
    },
    'grapesjs-plugin-forms',
    'grapesjs-component-countdown',
  ]), []);

  const defOptions: EditorConfig = useMemo(() => ({
    storageManager: false,
    components: `
      <h1>Title</h1>
      <p>Paragraph</p>
    `,
  }), []);

  console.log('App GrapesJS');

  return (
    <div className="flex flex-col h-screen text-white">
      <div className="bg-slate-900">
        Example
        <div>Editor loaded: {editor ? 'Y' : 'N'}</div>
        <div>Editor last update: {getDateString(projectDataDate)}</div>
      </div>
      <div className="flex-grow">
        <GrapesJsEditor
          grapesjs={window.grapesjs}
          grapesjsCss="http://localhost:8080/dist/css/grapes.min.css"
          plugins={plugins}
          onLoad={setEditor}
          onUpdate={onProjectUpdate}
          options={defOptions}
        />
      </div>
    </div>
  )
}

export default App

import GrapesJsEditor, { EditorProps } from '@grapesjs/react';
import type gjs from 'grapesjs';
import type { Editor, ProjectData } from 'grapesjs';
import { useState } from 'react';

declare global {
  interface Window {
    grapesjs: typeof gjs
  }
}

const getDateString = (date?: Date) => {
  return date?.toISOString().replace(/Z|T/gi, ' ');
}

function App() {
  const [editor, setEditor] =  useState<Editor>();
  const [projectData, setProjectData] =  useState<ProjectData>();
  const [projectDataDate, setProjectDataDate] =  useState<Date>();

  const onProjectUpdate: EditorProps['onUpdate'] = (pd) => {
    setProjectData(pd);
    setProjectDataDate(new Date());
    projectData;
  }

  console.log('App GrapesJS')
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
          plugins={[
            {
              id: 'gjs-blocks-basic',
              src: 'https://unpkg.com/grapesjs-blocks-basic',
            }
          ]}
          onLoad={setEditor}
          onUpdate={onProjectUpdate}
          options={{
            storageManager: false,
            components: `
              <h1>Title</h1>
              <p>Paragraph</p>
            `,
          }}
        />
      </div>
    </div>
  )
}

export default App

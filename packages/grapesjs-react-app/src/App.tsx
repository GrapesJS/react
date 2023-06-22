import GrapesJsEditor from '@grapesjs/react';
import type gjs from 'grapesjs';
import type { Editor, ProjectData } from 'grapesjs';
import { useState } from 'react';

declare global {
  interface Window {
    grapesjs: typeof gjs
  }
}

function App() {
  const [editor, setEditor] =  useState<Editor>();
  const [projectData, setProjectData] =  useState<ProjectData>();
  const [projectDataDate, setProjectDataDate] =  useState<Date>();

  console.log('App GrapesJS')
  return (
    <div className="flex flex-col h-screen text-white">
      <div className="bg-slate-900">
        Example
        <div>Editor loaded: {editor ? 'Y' : 'N'}</div>
        <div>Editor last update: {projectDataDate?.toISOString().split('.')[0].replace('T', ' ')}</div>
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

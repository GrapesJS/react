import { EditorProps } from '@grapesjs/react';
import type { Editor, ProjectData } from 'grapesjs';
import { useCallback, useState } from 'react';
import DefaultEditor from './examples/DefaultEditor';
import { getDateString } from './examples/common';

type onUpdateProp = Required<EditorProps>['onUpdate'];

function App() {
  const [editor, setEditor] =  useState<Editor>();
  const [projectData, setProjectData] =  useState<ProjectData>();
  const [projectDataDate, setProjectDataDate] =  useState<Date>();

  const onProjectUpdate = useCallback<onUpdateProp>((pd) => {
    setProjectData(pd);
    setProjectDataDate(new Date());
    projectData;
  }, []);

  console.log('App GrapesJS');

  return (
    <div className="flex flex-col h-screen  text-sm text-white bg-slate-900">
      <div className="flex gap-5 p-3">
        <div>Example</div>
        <div>Editor loaded: {editor ? 'Y' : 'N'}</div>
        {
          !!projectDataDate &&
          <div>Editor last update: {getDateString(projectDataDate)}</div>
        }
      </div>
      <div className="flex-grow">
        <DefaultEditor
          onLoad={setEditor}
          onUpdate={onProjectUpdate}
        />
      </div>
    </div>
  )
}

export default App

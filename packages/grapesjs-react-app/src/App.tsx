import { EditorProps } from '@grapesjs/react';
import type { Editor, ProjectData } from 'grapesjs';
import { useCallback, useState } from 'react';
import DefaultEditor from './examples/DefaultEditor';
import { getDateString } from './examples/common';
import Icon from '@mdi/react';
import { mdiCheckBold, mdiClose } from '@mdi/js';

function App() {
  const [editor, setEditor] =  useState<Editor>();
  const [projectData, setProjectData] =  useState<ProjectData>();
  const [projectDataDate, setProjectDataDate] =  useState<Date>();
  const iconCls = `inline-block ${editor ? 'text-green-400' : 'text-red-400'}`;

  const onProjectUpdate = useCallback<Required<EditorProps>['onUpdate']>((pd) => {
    setProjectData(pd);
    setProjectDataDate(new Date());
    projectData;
  }, []);

  console.log('App GrapesJS');

  return (
    <div className="flex flex-col h-screen  text-sm text-white bg-slate-900">
      <div className="flex gap-5 p-3">
        <div>
          Example
        </div>
        <div className="flex gap-2 items-center">
            Editor loaded:
            <Icon
              size={0.7}
              path={editor ? mdiCheckBold : mdiClose}
              className={iconCls}
            />
          </div>
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

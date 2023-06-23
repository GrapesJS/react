import { EditorProps } from '@grapesjs/react';
import type { Editor, ProjectData } from 'grapesjs';
import { useCallback, useMemo, useState } from 'react';
import DefaultEditor from './examples/DefaultEditor';
import { getDateString } from './examples/common';
import Icon from '@mdi/react';
import { mdiCheckBold, mdiClose } from '@mdi/js';

enum Examples {
  Default = 'Default Editor',
  Custom = 'Custom UI Editor',
}

function App() {
  const [editor, setEditor] =  useState<Editor>();
  const [projectData, setProjectData] =  useState<ProjectData>();
  const [projectDataDate, setProjectDataDate] =  useState<Date>();
  const [selectedExample, setSelectedExample] =  useState(Examples.Default);
  const iconCls = `inline-block ${editor ? 'text-green-400' : 'text-red-400'}`;

  const onProjectUpdate = useCallback<Required<EditorProps>['onUpdate']>((pd) => {
    setProjectData(pd);
    setProjectDataDate(new Date());
    projectData;
  }, []);

  const exampleOptions = useMemo(() => (
    Object.keys(Examples).map((key) => (
      <option key={key} value={key}>
        {Examples[key as keyof typeof Examples]}
      </option>
    ))
  ), []);

  return (
    <div className="flex flex-col h-screen  text-sm text-white bg-slate-900">
      <div className="flex gap-5 p-3">
        <div>
          <select
            className="rounded-sm bg-slate-700 p-1"
            value={selectedExample}
            onChange={(ev) => setSelectedExample(ev.target.value as Examples)}
          >
            {exampleOptions}
          </select>
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
          <div>Last update: {getDateString(projectDataDate)}</div>
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

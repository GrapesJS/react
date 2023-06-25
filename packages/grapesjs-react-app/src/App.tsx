import { EditorProps } from '@grapesjs/react';
import { mdiCheckBold, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import type { Editor, ProjectData } from 'grapesjs';
import { useCallback, useMemo, useState } from 'react';
import CustomEditor from './examples/CustomEditor';
import DefaultEditor from './examples/DefaultEditor';
import { getDateString } from './examples/common';

enum Examples {
  Default = 'Default Editor',
  Custom = 'Custom UI Editor',
}

function App() {
  const [editor, setEditor] =  useState<Editor>();
  const [projectData, setProjectData] =  useState<ProjectData>();
  const [projectDataDate, setProjectDataDate] =  useState<Date>();
  const [selectedExample, setSelectedExample] =  useState(Examples.Custom);
  const iconCls = `inline-block ${editor ? 'text-green-400' : 'text-red-400'}`;

  const onProjectUpdate = useCallback<Required<EditorProps>['onUpdate']>((pd) => {
    setProjectData(pd);
    setProjectDataDate(new Date());
    projectData;
  }, []);

  const exampleOptions = useMemo(() => (
    Object.entries(Examples).map(([key, value]) => (
      <option key={key} value={value}>
        {value}
      </option>
    ))
  ), []);

  let EditorToRender = DefaultEditor;

  switch (selectedExample) {
    case Examples.Custom:
      EditorToRender = CustomEditor;
      break;
  }

  (window as any).editor = editor

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
        <EditorToRender
          onLoad={setEditor}
          onUpdate={onProjectUpdate}
        />
      </div>
    </div>
  )
}

export default App

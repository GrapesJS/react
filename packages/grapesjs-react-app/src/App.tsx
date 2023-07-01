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
  const [ready, setReady] =  useState<Editor>();
  const [projectData, setProjectData] =  useState<ProjectData>();
  const [projectDataDate, setProjectDataDate] =  useState<Date>();
  const [selectedExample, setSelectedExample] =  useState(Examples.Custom);
  const mountedIconCls = `inline-block ${editor ? 'text-green-400' : 'text-red-400'}`;
  const readyIconCls = `inline-block ${ready ? 'text-green-400' : 'text-red-400'}`;

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

  const onExampleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExample(ev.target.value as Examples);
    setEditor(undefined);
    setReady(undefined);
  };

  let EditorToRender = DefaultEditor;

  switch (selectedExample) {
    case Examples.Custom:
      EditorToRender = CustomEditor;
      break;
  }

  (window as any).editor = editor

  return (
    <div className="flex flex-col h-screen text-sm text-white bg-slate-900">
      <div className="flex gap-3 p-3 items-center">
        <div>
          <select
            className="rounded-sm bg-slate-700 p-1"
            value={selectedExample}
            onChange={onExampleChange}
          >
            {exampleOptions}
          </select>
        </div>
        <div className="flex gap-2 items-center">
            Mounted:
            <Icon
              size={0.7}
              path={editor ? mdiCheckBold : mdiClose}
              className={mountedIconCls}
            />
        </div>
        <div className="flex gap-2 items-center">
            Ready:
            <Icon
              size={0.7}
              path={ready ? mdiCheckBold : mdiClose}
              className={readyIconCls}
            />
        </div>
        {
          !!projectDataDate &&
          <div>Last update: {getDateString(projectDataDate)}</div>
        }
      </div>
      <div className="flex-grow overflow-hidden">
        <EditorToRender
          onEditor={setEditor}
          onReady={setReady}
          onUpdate={onProjectUpdate}
        />
      </div>
    </div>
  )
}

export default App

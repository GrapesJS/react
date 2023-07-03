import GrapesJsEditor, { EditorProps } from '@grapesjs/react';
import { defaultEditorProps, slowStoragePlugin } from './common';
import CircularProgress from '@mui/material/CircularProgress';

const options = {
  ...defaultEditorProps.options,
  storageManager: { type: 'slow' }
};

const plugins = [
  slowStoragePlugin,
  ...defaultEditorProps.plugins!,
];

const Spinner = (
  <div className="flex items-center h-full justify-center">
    <CircularProgress/>
  </div>
)

export default function EditorWaitReady(props: Partial<EditorProps>) {
    return (
        <GrapesJsEditor
          className="gjs-editor-wait-ready"
          {...defaultEditorProps}
          options={options}
          plugins={plugins}
          {...props}
          waitReady={Spinner}
        />
    )
}
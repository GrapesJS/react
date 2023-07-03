import GrapesJsEditor, { EditorProps } from '@grapesjs/react';
import { defaultEditorProps, slowStoragePlugin } from './common';
import CircularProgress from '@mui/material/CircularProgress';

export default function EditorWaitReady(props: Partial<EditorProps>) {
    return (
        <GrapesJsEditor
          className="gjs-editor-wait-ready"
          {...defaultEditorProps}
          options={{
            ...defaultEditorProps.options,
            storageManager: {
              type: 'slow'
            }
          }}
          plugins={[
            slowStoragePlugin,
            ...defaultEditorProps.plugins!,
          ]}
          {...props}
          waitReady={
            <div className="flex items-center h-full justify-center">
              <CircularProgress/>
            </div>
          }
        />
    )
}
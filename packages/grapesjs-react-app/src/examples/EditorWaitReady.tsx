import GrapesJsEditor, { EditorProps } from '@grapesjs/react';
import { defaultEditorProps } from './common';
import type { Plugin } from 'grapesjs';
import CircularProgress from '@mui/material/CircularProgress';

const slowStorage: Plugin = (editor) => {
  editor.Storage.add('slow', {
    async load() {
      console.log('Waiting for the Storage');
      await new Promise(res => setTimeout(res, 3000));
      return {
        pages: [{ component: '<h1>Content from the Storage</h1>'}],
      };
    },
    async store() {},
  })
}

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
            slowStorage,
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
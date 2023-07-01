import GrapesJsEditor, { EditorProps } from '@grapesjs/react';
import { defaultEditorProps } from './common';
import type { Plugin } from 'grapesjs';

const slowStorage: Plugin = (editor) => {
  editor.Storage.add('slow', {
    async load() {
      console.log('Waiting for slow Storage');
      await new Promise(res => setTimeout(res, 3000));
      return {
        pages: [
          {
            component: '<h1>Content from slow Storage</h1>',
          }
        ]
      };
    },
    async store() {

    },
  })
}

export default function EditorWaitReady(props: Partial<EditorProps>) {
    return (
        <GrapesJsEditor
          className="gjs-default-editor"
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
        />
    )
}
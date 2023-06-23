import GrapesJsEditor, { EditorProps } from '@grapesjs/react';
import { defaultEditorProps } from './common';

export default function DefaultEditor(props: Partial<EditorProps>) {
    return (
        <GrapesJsEditor
            {...defaultEditorProps}
          {...props}
        />
    )
}
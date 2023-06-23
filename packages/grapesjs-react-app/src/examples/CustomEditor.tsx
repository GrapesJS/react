import GrapesJsEditor, { EditorProps } from '@grapesjs/react';
import { defaultEditorProps } from './common';

export default function CustomEditor(props: Partial<EditorProps>) {
    return (
        <GrapesJsEditor
            {...defaultEditorProps}
            {...props}
        >
        </GrapesJsEditor>
    )
}
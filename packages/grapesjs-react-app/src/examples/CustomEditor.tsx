import GrapesJsEditor, { Canvas, EditorProps } from '@grapesjs/react';
import { defaultEditorProps } from './common';

export default function CustomEditor(props: Partial<EditorProps>) {
    return (
        <GrapesJsEditor
            className="gjs-custom-editor"
            {...defaultEditorProps}
            {...props}
        >
            <Canvas></Canvas>
        </GrapesJsEditor>
    )
}
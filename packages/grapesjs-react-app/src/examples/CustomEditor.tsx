import GrapesJsEditor, { Canvas, EditorProps } from '@grapesjs/react';
import { defaultEditorProps } from './common';

const clsBorderColor = 'border-slate-500';

export default function CustomEditor(props: Partial<EditorProps>) {
    return (
        <GrapesJsEditor
            className="gjs-custom-editor"
            {...defaultEditorProps}
            {...props}
        >
            <div className={`flex h-full border-t ${clsBorderColor}`}>
                <div className={`gjs-column-l w-[300px] border-r ${clsBorderColor}`}>
                    A
                </div>
                <div className="gjs-column-m flex flex-col flex-grow">
                    <div className=" flex-grow">
                        Top
                    </div>
                    <Canvas className="flex-grow gjs-custom-editor-canvas"/>
                </div>
                <div className={`gjs-column-r w-[300px] border-l ${clsBorderColor}`}>
                    C
                </div>
            </div>
        </GrapesJsEditor>
    )
}
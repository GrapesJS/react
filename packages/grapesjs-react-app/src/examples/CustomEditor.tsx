import GrapesJsEditor, { AssetsProvider, Canvas, EditorProps, ModalProvider } from '@grapesjs/react';
import { defaultEditorProps } from './common';
import CustomModal from './components/CustomModal';
import CustomAssetManager from './components/CustomAssetManager';

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
            <ModalProvider>
                {({ open, title, content, close }) => (
                    <CustomModal open={open} title={title} children={content} close={close}/>
                )}
            </ModalProvider>
            <AssetsProvider>
                {({ assets, select, close, Container }) => (
                    <Container>
                        <CustomAssetManager assets={assets} select={select} close={close}/>
                    </Container>
                )}
            </AssetsProvider>
        </GrapesJsEditor>
    )
}
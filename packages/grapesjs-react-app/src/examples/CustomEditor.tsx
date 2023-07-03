import GrapesJsEditor, { AssetsProvider, Canvas, EditorProps, ModalProvider } from '@grapesjs/react';
import { ThemeProvider } from '@mui/material/styles';
import { MAIN_BORDER_COLOR, customTheme, defaultEditorProps } from './common';
import CustomAssetManager from './components/CustomAssetManager';
import CustomModal from './components/CustomModal';
import RightSidebar from './components/RightSidebar';
import Topbar from './components/Topbar';

export default function CustomEditor(props: Partial<EditorProps>) {
    return (
        <ThemeProvider theme={customTheme}>
            <GrapesJsEditor
                className="gjs-custom-editor"
                {...defaultEditorProps}
                {...props}
            >
                <div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
                    <div className="gjs-column-m flex flex-col flex-grow">
                        <Topbar className="min-h-[48px]"/>
                        <Canvas className="flex-grow gjs-custom-editor-canvas"/>
                    </div>
                    <RightSidebar className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}/>
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
        </ThemeProvider>
    )
}
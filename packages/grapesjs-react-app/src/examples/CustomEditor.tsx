import GrapesJsEditor, { AssetsProvider, Canvas, EditorProps, ModalProvider } from '@grapesjs/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { defaultEditorProps } from './common';
import CustomAssetManager from './components/CustomAssetManager';
import CustomModal from './components/CustomModal';
import RightSidebar from './components/RightSidebar';
import TopSidebar from './components/TopSidebar';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});


const clsBorderColor = 'border-slate-500';

export default function CustomEditor(props: Partial<EditorProps>) {
    return (
        <ThemeProvider theme={theme}>
            <GrapesJsEditor
                className="gjs-custom-editor"
                {...defaultEditorProps}
                {...props}
            >
                <div className={`flex h-full border-t ${clsBorderColor}`}>
                    <div className="gjs-column-m flex flex-col flex-grow">
                        <TopSidebar className="flex-grow"/>
                        <Canvas className="flex-grow gjs-custom-editor-canvas bg-red-500"/>
                    </div>
                    <RightSidebar className={`gjs-column-r w-[300px] border-l ${clsBorderColor}`}/>
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
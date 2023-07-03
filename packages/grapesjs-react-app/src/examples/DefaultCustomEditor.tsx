import GrapesJsEditor, { AssetsProvider, EditorProps, ModalProvider } from '@grapesjs/react';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme, defaultEditorProps } from './common';
import CustomAssetManager from './components/CustomAssetManager';
import CustomModal from './components/CustomModal';


export default function DefaultCustomEditor(props: Partial<EditorProps>) {
    return (
        <ThemeProvider theme={customTheme}>
            <GrapesJsEditor
                className="gjs-default-custom-editor"
                {...defaultEditorProps}
                {...props}
            >
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
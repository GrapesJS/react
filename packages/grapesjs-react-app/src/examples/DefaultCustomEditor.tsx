import GrapesJsEditor, { AssetsProvider, BlocksProvider, EditorProps, ModalProvider } from '@grapesjs/react';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme, defaultEditorProps } from './common';
import CustomAssetManager from './components/CustomAssetManager';
import CustomModal from './components/CustomModal';
import CustomBlockManager from './components/CustomBlockManager';


export default function DefaultCustomEditor(props: Partial<EditorProps>) {
    return (
        <ThemeProvider theme={customTheme}>
            <GrapesJsEditor
                className="gjs-default-custom-editor"
                {...defaultEditorProps}
                {...props}
            >
                <BlocksProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomBlockManager {...props}/>
                        </Container>
                    )}
                </BlocksProvider>
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
import GrapesJsEditor, { AssetsProvider, BlocksProvider, EditorProps, LayersProvider, ModalProvider, SelectorsProvider, StylesProvider, TraitsProvider } from '@grapesjs/react';
import { ThemeProvider } from '@mui/material/styles';
import { customTheme, defaultEditorProps } from './common';
import CustomAssetManager from './components/CustomAssetManager';
import CustomModal from './components/CustomModal';
import CustomBlockManager from './components/CustomBlockManager';
import CustomLayerManager from './components/CustomLayerManager';
import CustomSelectorManager from './components/CustomSelectorManager';
import CustomStyleManager from './components/CustomStyleManager';
import CustomTraitManager from './components/CustomTraitManager';


export default function DefaultCustomEditor(props: Partial<EditorProps>) {
    return (
        <ThemeProvider theme={customTheme}>
            <GrapesJsEditor
                className="gjs-default-custom-editor"
                {...defaultEditorProps}
                {...props}
            >
                <SelectorsProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomSelectorManager {...props}/>
                        </Container>
                    )}
                </SelectorsProvider>
                <StylesProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomStyleManager {...props}/>
                        </Container>
                    )}
                </StylesProvider>
                <TraitsProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomTraitManager {...props}/>
                        </Container>
                    )}
                </TraitsProvider>
                <LayersProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomLayerManager {...props}/>
                        </Container>
                    )}
                </LayersProvider>
                <BlocksProvider>
                    {({ Container, ...props})=> (
                        <Container>
                            <CustomBlockManager {...props}/>
                        </Container>
                    )}
                </BlocksProvider>
                <AssetsProvider>
                    {({ assets, select, close, Container }) => (
                        <Container>
                            <CustomAssetManager assets={assets} select={select} close={close}/>
                        </Container>
                    )}
                </AssetsProvider>
                <ModalProvider>
                    {({ open, title, content, close }) => (
                        <CustomModal open={open} title={title} children={content} close={close}/>
                    )}
                </ModalProvider>
            </GrapesJsEditor>
        </ThemeProvider>
    )
}
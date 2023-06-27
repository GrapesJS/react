import GrapesJsEditor, { AssetsProvider, Canvas, EditorProps, ModalProvider, WithEditor } from '@grapesjs/react';
import { defaultEditorProps } from './common';
import CustomModal from './components/CustomModal';
import CustomAssetManager from './components/CustomAssetManager';
import CustomBlockManager from './components/CustomBlockManager';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { mdiBrush, mdiLayers, mdiViewGridPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});


const clsBorderColor = 'border-slate-500';

export default function CustomEditor(props: Partial<EditorProps>) {
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
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
                    <div className={`overflow-y-auto gjs-column-r w-[300px] border-l ${clsBorderColor}`}>
                        <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
                            <Tab label={<Icon size={1} path={mdiBrush}/>}/>
                            <Tab label={<Icon size={1} path={mdiLayers}/>}/>
                            <Tab label={<Icon size={1} path={mdiViewGridPlus}/>}/>
                        </Tabs>
                        {selectedTab === 0 && <div>Styles</div>}
                        {selectedTab === 1 && <div>Layers</div>}
                        {selectedTab === 2 && <div>Blocks</div>}
                        <WithEditor>
                            <CustomBlockManager/>
                        </WithEditor>
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
        </ThemeProvider>
    )
}
import { BlocksProvider } from '@grapesjs/react';
import { mdiBrush, mdiLayers, mdiViewGridPlus } from '@mdi/js';
import Icon from '@mdi/react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import CustomBlockManager from './CustomBlockManager';
import { cx } from '../common';

export default function RightSidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
      <div className={cx('gjs-right-sidebar flex flex-col', className)}>
        <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(v)} variant="fullWidth">
            <Tab label={<Icon size={1} path={mdiBrush}/>}/>
            <Tab label={<Icon size={1} path={mdiLayers}/>}/>
            <Tab label={<Icon size={1} path={mdiViewGridPlus}/>}/>
        </Tabs>
        <div className="overflow-y-auto flex-grow">
            {selectedTab === 0 && <div>Styles</div>}
            {selectedTab === 1 && <div>Layers</div>}
            {
                selectedTab === 2 &&
                <BlocksProvider>
                    {({ mapCategoryBlocks, dragStart, dragStop }) => (
                        <CustomBlockManager
                            mapCategoryBlocks={mapCategoryBlocks}
                            dragStart={dragStart}
                            dragStop={dragStop}
                        />
                    )}
                </BlocksProvider>
            }
        </div>
      </div>
    );
  }
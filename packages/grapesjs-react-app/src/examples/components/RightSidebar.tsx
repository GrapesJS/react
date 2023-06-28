import { BlocksProvider, PagesProvider } from '@grapesjs/react';
import { mdiBrush, mdiLayers, mdiViewGridPlus, mdiTextBoxMultiple } from '@mdi/js';
import Icon from '@mdi/react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import CustomBlockManager from './CustomBlockManager';
import { cx } from '../common';
import CustomPageManager from './CustomPageManager';

const defaultTabProps = {
    className: '!min-w-0',
}

export default function RightSidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
      <div className={cx('gjs-right-sidebar flex flex-col', className)}>
        <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(v)} variant="fullWidth">
            <Tab {...defaultTabProps} label={<Icon size={1} path={mdiBrush}/>}/>
            <Tab {...defaultTabProps} label={<Icon size={1} path={mdiLayers}/>}/>
            <Tab {...defaultTabProps} label={<Icon size={1} path={mdiViewGridPlus}/>}/>
            <Tab {...defaultTabProps} label={<Icon size={1} path={mdiTextBoxMultiple}/>}/>
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
            {
                selectedTab === 3 &&
                <PagesProvider>
                    {({ pages, select, add, remove, selected }) => (
                        <CustomPageManager pages={pages} select={select} add={add} remove={remove} selected={selected}/>
                    )}
                </PagesProvider>
            }
        </div>
      </div>
    );
  }
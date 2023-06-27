import { DevicesProvider } from '@grapesjs/react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { cx } from '../common';

export default function TopSidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
      <div className={cx('gjs-top-sidebar p-1', className)}>
        <DevicesProvider>
            {({ selected, select, devices }) => (
                <FormControl size="small">
                    <Select value={selected} onChange={(ev) => select(ev.target.value)}>
                    {devices.map(device => (
                        <MenuItem value={device.id} key={device.id}>{device.getName()}</MenuItem>
                    ))}
                </Select>
                </FormControl>
            )}
        </DevicesProvider>
      </div>
    );
  }
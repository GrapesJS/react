import { StylesResultProps } from '@grapesjs/react';
import { mdiClose, mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import type { PropertyRadio, PropertySelect, PropertySlider } from 'grapesjs';
import { MAIN_BG_COLOR, cx } from '../common';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Slider from '@mui/material/Slider';

const accordionIcon = <Icon path={mdiMenuDown} size={0.7}/>;

export default function CustomStyleManager({ sectors }: StylesResultProps) {

    return (
      <div className="gjs-custom-style-manager">
        {sectors.map(sector => (
            <Accordion key={sector.getId()} disableGutters>
                <AccordionSummary className="!bg-slate-800" expandIcon={accordionIcon}>
                    { sector.getName() }
                </AccordionSummary>
                <AccordionDetails className={`!${MAIN_BG_COLOR} flex flex-wrap`}>
                    {sector.getProperties().map(prop => (
                        <div key={prop.getId()} className={cx('mb-3 px-1', prop.isFull() ? 'w-full' : 'w-1/2')}>
                            <div className={cx('flex mb-2', prop.canClear() && 'text-sky-300')}>
                                <div className="flex-grow capitalize">{ prop.getName() }</div>
                                {
                                    prop.canClear() &&
                                    <button onClick={() => prop.clear()}>
                                        <Icon path={mdiClose} size={0.7}/>
                                    </button>
                                }
                            </div>
                            {
                                prop.getType() === 'number' &&
                                <TextField
                                    fullWidth
                                    placeholder={prop.getDefaultValue()}
                                    value={prop.hasValue() ? prop.getValue() : ''}
                                    onChange={(ev) => {prop.upValue(ev.target.value)}}
                                    size="small"
                                />

                            }
                            {
                                prop.getType() === 'radio' &&
                                <RadioGroup value={prop.getValue()} onChange={(ev) => prop.upValue(ev.target.value)} row>
                                    {(prop as PropertyRadio).getOptions().map(option => (
                                        <FormControlLabel
                                            key={(prop as PropertyRadio).getOptionId(option)}
                                            value={(prop as PropertyRadio).getOptionId(option)}
                                            label={(prop as PropertyRadio).getOptionLabel(option)}
                                            control={<Radio size="small"/>}
                                        />
                                    ))}
                                </RadioGroup>
                            }
                            {
                                prop.getType() === 'select' &&
                                <FormControl fullWidth size="small">
                                    <Select value={prop.getValue()} onChange={(ev) => prop.upValue(ev.target.value)}>
                                        {(prop as PropertySelect).getOptions().map(option => (
                                            <MenuItem
                                                key={(prop as PropertySelect).getOptionId(option)}
                                                value={(prop as PropertySelect).getOptionId(option)}
                                            >
                                                {(prop as PropertySelect).getOptionLabel(option)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            }
                            {
                                prop.getType() === 'color' &&
                                <TextField
                                    fullWidth
                                    placeholder={prop.getDefaultValue()}
                                    value={prop.hasValue() ? prop.getValue() : ''}
                                    onChange={(ev) => prop.upValue(ev.target.value)}
                                    size="small"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                            <div className="w-[15px] h-[15px]" style={{ backgroundColor: prop.hasValue() ? prop.getValue() : prop.getDefaultValue() }}>
                                                <input
                                                    type="color"
                                                    className="w-[15px] h-[15px] opacity-0"
                                                    value={prop.hasValue() ? prop.getValue() : prop.getDefaultValue()}
                                                    onChange={(ev) => prop.upValue(ev.target.value)}
                                                />
                                            </div>
                                        </InputAdornment>,
                                    }}
                                />

                            }
                            {
                                prop.getType() === 'slider' &&
                                <Slider
                                    size="small"
                                    value={prop.getValue()}
                                    min={(prop as PropertySlider).getMin()}
                                    max={(prop as PropertySlider).getMax()}
                                    step={(prop as PropertySlider).getStep()}
                                    onChange={(ev: any) => prop.upValue(ev.target.value)}
                                    valueLabelDisplay="auto"
                                />

                            }
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        ))}
      </div>
    );
  }
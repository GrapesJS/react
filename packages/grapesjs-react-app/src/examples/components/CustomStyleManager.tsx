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
import type { PropertyRadio } from 'grapesjs';
import { MAIN_BG_COLOR, cx } from '../common';

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
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        ))}
      </div>
    );
  }
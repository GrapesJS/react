import { StylesResultProps } from '@grapesjs/react';
import { mdiClose, mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
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
                        <div key={prop.getId()} className={cx('mb-3', prop.isFull() ? 'w-full' : 'w-1/2')}>
                            <div className="flex">
                                <div className="flex-grow capitalize">{ prop.getName() }</div>
                                {
                                    prop.canClear() &&
                                    <button onClick={() => prop.clear()}>
                                        <Icon path={mdiClose} size={0.7}/>
                                    </button>
                                }
                            </div>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        ))}
      </div>
    );
  }
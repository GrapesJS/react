import { StylesResultProps } from '@grapesjs/react';
import { mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { MAIN_BG_COLOR } from '../common';

const accordionIcon = <Icon path={mdiMenuDown} size={0.7}/>;

export default function CustomStyleManager({ sectors }: StylesResultProps) {

    return (
      <div className="gjs-custom-style-manager">
        {sectors.map(sector => (
            <Accordion key={sector.getId()} disableGutters>
                <AccordionSummary className="!bg-slate-800" expandIcon={accordionIcon}>
                    { sector.getName() }
                </AccordionSummary>
                <AccordionDetails className={`!${MAIN_BG_COLOR}`}>
                    Details: { sector.getName() }
                </AccordionDetails>
            </Accordion>
        ))}
      </div>
    );
  }
import { StylesResultProps } from '@grapesjs/react';

export default function CustomStyleManager({ sectors }: StylesResultProps) {

    return (
      <div className="gjs-custom-style-manager">
        {sectors.map(sector => (
            <div key={sector.getId()}>
                { sector.getName() }
            </div>
        ))}
      </div>
    );
  }
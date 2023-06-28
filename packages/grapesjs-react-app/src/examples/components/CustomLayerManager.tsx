import { LayersResultProps } from '@grapesjs/react';

export default function CustomLayerManager({ root }: LayersResultProps) {

    console.log({ root });

    return (
      <div className="gjs-custom-layer-manager">
      </div>
    );
  }
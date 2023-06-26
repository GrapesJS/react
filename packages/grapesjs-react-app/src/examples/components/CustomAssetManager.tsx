import { AssetsResultProps } from '@grapesjs/react';


export type CustomAssetManagerProps = Pick<AssetsResultProps, 'assets' | 'close' | 'select'>

export default function CustomAssetManager({ assets }: CustomAssetManagerProps) {
    // asset.get('name')

    console.log({ assets })

    return (
      <div>
        CustomAssets
        {assets.map(asset => (
            <div key={asset.id}>
                <img src={asset.getSrc()}/>
                <div>
                    { asset.getFilename() }
                </div>
            </div>
        ))}
      </div>
    );
  }
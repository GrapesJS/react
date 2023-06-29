import { SelectorsResultProps } from '@grapesjs/react';

export default function CustomSelectorManager({ selectors }: SelectorsResultProps) {
    // const addNewPage = () => {
    //     const nextIndex = pages.length + 1;
    //     add({
    //         name: `New page ${nextIndex}`,
    //         component: `<h1>Page content ${nextIndex}</h1>`,
    //     })
    // }
    console.log({ selectors })
    return (
      <div className="gjs-custom-selector-manager">

      </div>
    );
  }
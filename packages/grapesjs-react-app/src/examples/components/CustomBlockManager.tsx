import { useEditor } from '@grapesjs/react';
import type { Block } from 'grapesjs';

type BlockCategoryMap = Record<string, Block[]>;

export default function CustomBlockManager() {
    const editor = useEditor();
    const { Blocks } = editor;
    const blocksMap = Blocks.getAll().reduce((res: BlockCategoryMap, item: Block) => {
        const ctg = item.getCategoryLabel();
        const ctgItem = res[ctg];

        if (!ctgItem) {
            res[ctg] = [item];
        } else {
            ctgItem.push(item);
        }

        return res;
    }, {} as BlockCategoryMap);

    return (
      <div className="grid grid-cols-3 gap-2 pr-2">
        {Object.keys(blocksMap).map(categoryName => (
            <div key={categoryName}>
                <div>{ categoryName }</div>
                <div className="grid grid-cols-2 gap-2 p-2">
                    {blocksMap[categoryName].map((block) => (
                        <div key={block.getId()}
                            draggable
                            className="cursor-pointer py-2 px-5 transition-colors"
                            onDragStart={(ev) => Blocks.startDrag(block, ev.nativeEvent)}
                            onDragEnd={() => Blocks.endDrag(false)}
                        >
                            <div className="h-10 w-10 block-media" dangerouslySetInnerHTML={{ __html: block.getMedia()! }}></div>
                            <div className="text-sm text-center w-full" title={block.getLabel()}>
                                {block.getLabel()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    );
  }
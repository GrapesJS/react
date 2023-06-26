import { useEditor } from '@grapesjs/react';
import type { Block } from 'grapesjs';
import { MAIN_BORDER_COLOR, cx } from '../common';

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
      <div>
        {Object.keys(blocksMap).map(categoryName => (
            <div key={categoryName}>
                <div className={cx('py-2 px-4 border-y', MAIN_BORDER_COLOR)}>
                    { categoryName }
                </div>
                <div className="grid grid-cols-2 gap-2 p-2">
                    {blocksMap[categoryName].map((block) => (
                        <div key={block.getId()}
                            draggable
                            className={cx('flex flex-col items-center border rounded cursor-pointer py-2 px-5 transition-colors', MAIN_BORDER_COLOR)}
                            onDragStart={(ev) => Blocks.startDrag(block, ev.nativeEvent)}
                            onDragEnd={() => Blocks.endDrag(false)}
                        >
                            <div
                                className="h-10 w-10"
                                dangerouslySetInnerHTML={{ __html: block.getMedia()! }}
                            />
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
import { BlocksResultProps } from '@grapesjs/react';
import { MAIN_BORDER_COLOR, cx } from '../common';

export type CustomBlockManagerProps = Pick<BlocksResultProps, 'mapCategoryBlocks' | 'dragStart' | 'dragStop'>;

export default function CustomBlockManager({ mapCategoryBlocks, dragStart, dragStop }: CustomBlockManagerProps) {
    return (
      <div className="gjs-custom-block-manager text-left">
        {Array.from(mapCategoryBlocks).map(([category, blocks]) => (
            <div key={category}>
                <div className={cx('py-2 px-4 border-y', MAIN_BORDER_COLOR)}>
                    { category }
                </div>
                <div className="grid grid-cols-2 gap-2 p-2">
                    {blocks.map((block) => (
                        <div key={block.getId()}
                            draggable
                            className={cx('flex flex-col items-center border rounded cursor-pointer py-2 px-5 transition-colors', MAIN_BORDER_COLOR)}
                            onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                            onDragEnd={() => dragStop(false)}
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
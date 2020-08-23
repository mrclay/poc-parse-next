// from https://github.com/WordPress/gutenberg/blob/master/storybook/stories/playground/index.js
import { useEffect, useState } from "react";
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockInspector,
  WritingFlow,
  ObserveTyping,
} from "@wordpress/block-editor";
import {
  Popover,
  SlotFillProvider,
  DropZoneProvider,
} from "@wordpress/components";
import { registerCoreBlocks } from "@wordpress/block-library";
import '@wordpress/format-library';

const Playground: React.FC = () => {
  const [blocks, updateBlocks] = useState([]);

  useEffect(() => {
    registerCoreBlocks();
  }, []);

  return (
    <div className="playground">
      <SlotFillProvider>
        <DropZoneProvider>
          <BlockEditorProvider
            value={blocks}
            onInput={updateBlocks}
            onChange={updateBlocks}
          >
            <div className="playground__sidebar">
              <BlockInspector />
            </div>
            <div className="editor-styles-wrapper">
              <Popover.Slot name="block-toolbar" />
              <BlockEditorKeyboardShortcuts />
              <WritingFlow>
                <ObserveTyping>
                  <BlockList />
                </ObserveTyping>
              </WritingFlow>
            </div>
            <Popover.Slot />
          </BlockEditorProvider>
        </DropZoneProvider>
      </SlotFillProvider>
    </div>
  );
};

export default Playground;

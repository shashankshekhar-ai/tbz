type Block = {
  blockType: string;
  id?: string;
  [key: string]: unknown;
};

type Props = {
  blocks: Block[];
};

export function BlockRenderer({ blocks }: Props) {
  if (!blocks?.length) return null;
  return (
    <div>
      {blocks.map((block, i) => (
        <BlockSwitch key={block.id ?? i} block={block} />
      ))}
    </div>
  );
}

function BlockSwitch({ block }: { block: Block }) {
  // Blocks will be wired in once page schema is locked (waiting on nav sign-off)
  switch (block.blockType) {
    default:
      return process.env.NODE_ENV === "development" ? (
        <div className="p-4 border border-dashed border-gray-300 text-sm text-gray-500 my-4">
          Block type <code>{block.blockType}</code> not yet implemented
        </div>
      ) : null;
  }
}

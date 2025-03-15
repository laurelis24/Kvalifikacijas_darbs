import { useCallback, useState } from 'react';
import { createEditor, Editor, Element, Transforms } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
];

export default function Test() {
    const [editor] = useState(() => withReact(createEditor()));
    const renderElement = useCallback((props: any) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);
    return (
        // Add the editable component inside the context.
        <Slate editor={editor} initialValue={initialValue}>
            <Editable
                renderElement={renderElement}
                onKeyDown={(event) => {
                    if (event.key === '`' && event.ctrlKey) {
                        event.preventDefault();
                        // Determine whether any of the currently selected blocks are code blocks.
                        const [match] = Editor.nodes(editor, {
                            match: (n: any) => n.type === 'code',
                        });
                        // Toggle the block type depending on whether there's already a match.
                        Transforms.setNodes(
                            editor,
                            { type: match ? 'paragraph' : 'code' },
                            { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
                        );
                    }
                }}
            />
        </Slate>
    );
}

const CodeElement = (props: any) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};

const DefaultElement = (props: any) => {
    return <p {...props.attributes}>{props.children}</p>;
};

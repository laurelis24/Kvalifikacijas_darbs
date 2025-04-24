import { useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";

const initialValue = [
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }],
    },
];

const Test = () => {
    const [editor] = useState(() => withReact(createEditor()));
    return (
        // Add the editable component inside the context.
        <Slate editor={editor} initialValue={initialValue}>
            <Editable />
        </Slate>
    );
};

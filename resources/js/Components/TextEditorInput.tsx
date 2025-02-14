import { EventHandler, KeyboardEventHandler, useState } from 'react';
import { BaseEditor, createEditor } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';



type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const initialValue: CustomElement[] = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
];

export default function TextEditorInput() {
    const [editor] = useState(() => withReact(createEditor()));

    const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
      //  e.preventDefault();

        
    }
 // https://docs.slatejs.org/walkthroughs/02-adding-event-handlers
    return (
        <Slate    editor={editor} initialValue={initialValue}>
            <Editable onKeyDown={handleKey} className='border-2 min-h-24 rounded-md bg-white border-gray-200 shadow-sm focus:outline-indigo-500'/>
        </Slate>
    );
}

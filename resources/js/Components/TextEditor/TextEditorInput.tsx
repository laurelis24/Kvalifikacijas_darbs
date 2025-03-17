import isHotkey from 'is-hotkey';
import { useCallback } from 'react';
import { BaseEditor, Descendant, Editor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { Editable, ReactEditor, RenderLeafProps, Slate, useSlate } from 'slate-react';
import { Hotkeys, SvgType, TextFormat } from './TextEditorEnums';
import { Button, Icon, Toolbar } from './TextEditorIndex';

//import {Button, Icon, Toolbar}

// https://github.com/ianstormtaylor/slate/blob/main/site/examples/ts/richtext.tsx
// https://github.com/ianstormtaylor/slate/blob/main/site/examples/ts/components/index.tsx

type CustomElement = { type: string; align?: string; children: CustomText[] };

type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; code?: boolean };
interface LeafProps {
    attributes: { [key: string]: any };
    children: React.ReactNode;
    leaf: {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
        code?: boolean;
    };
}

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
];

interface Props {
    setData: (field: string, value: string) => void; // Function to update form state
    editor: BaseEditor & ReactEditor & HistoryEditor;
}

export default function TextEditorInput({ setData, editor }: Props) {
    //const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    //const [editorValue, setEditorValue] = useState<Descendant[]>(initialValue);

    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

    const handleEditorChange = useCallback(
        (value: Descendant[]) => {
            setData('description', JSON.stringify(value)); /// TODO
        },
        [setData],
    );

    // https://docs.slatejs.org/walkthroughs/02-adding-event-handlers
    return (
        <Slate editor={editor} initialValue={initialValue} onValueChange={handleEditorChange}>
            <Toolbar>
                <MarkButton format={TextFormat.bold} icon={SvgType.bold} />
                <MarkButton format={TextFormat.italic} icon={SvgType.italic} />
                <MarkButton format={TextFormat.underline} icon={SvgType.underline} />
                <MarkButton format={TextFormat.code} icon={SvgType.code} />
            </Toolbar>

            <Editable
                renderLeaf={renderLeaf}
                onKeyDown={(e) => {
                    for (const hotkey in Hotkeys) {
                        if (isHotkey(hotkey, e)) {
                            e.preventDefault();
                            const mark = TextFormat[Hotkeys[hotkey as keyof typeof Hotkeys]];
                            toggleMark(editor, TextFormat[mark]);
                        }
                    }
                }}
                spellCheck
                className="min-h-24 rounded-md border-2 border-gray-200 bg-white shadow-sm focus:outline-indigo-500"
            />
        </Slate>
    );
}

const MarkButton = ({ format, icon }: { format: TextFormat; icon: SvgType }) => {
    const editor = useSlate();
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(e: React.MouseEvent) => {
                e.preventDefault();
                toggleMark(editor, format);
            }}
        >
            <Icon svgType={icon} />
        </Button>
    );
};

const isMarkActive = (editor: Editor, format: TextFormat) => {
    const marks = Editor.marks(editor) as { [key: string]: boolean } | null;
    return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: TextFormat) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const Leaf = ({ attributes, children, leaf }: LeafProps) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

/* const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [
            { text: 'This is editable ' },
            { text: 'rich', bold: true },
            { text: ' text, ' },
            { text: 'much', italic: true },
            { text: ' better than a ' },
            { text: '<textarea>', code: true },
            { text: '!' },
        ],
    },
];
 */

export enum TextFormat {
    bold = 'bold',
    italic = 'italic',
    underline = 'underline',
    code = 'code',
}

export enum SvgType {
    bold = 'M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z',
    italic = 'M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803',
    underline = 'M17.995 3.744v7.5a6 6 0 1 1-12 0v-7.5m-2.25 16.502h16.5',
    code = 'M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5',
}

export enum Hotkeys {
    'mod+b' = 'bold',
    'mod+i' = 'italic',
    'mod+u' = 'underline',
    'mod+`' = 'code',
}

export enum ListTypes {
    numbered = 'numbered-list',
    bulleted = 'bulleted-list',
}

export enum TextAlignTypes {
    left = 'left',
    center = 'center',
    right = 'right',
    justify = 'justify',
}

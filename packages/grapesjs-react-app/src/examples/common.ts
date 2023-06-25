import { EditorProps } from '@grapesjs/react';
import type grapesjs from 'grapesjs';
import type { EditorConfig } from 'grapesjs';

declare global {
    interface Window {
        grapesjs: typeof grapesjs
    }
}

export const MAIN_BG_COLOR = 'bg-slate-900';

export const MAIN_TXT_COLOR = 'text-white';

export function cx(...inputs: any[]): string {
    const inp = Array.isArray(inputs[0]) ? inputs[0] : [...inputs];
    return inp.filter(Boolean).join(' ');
}

export const getDateString = (date?: Date) => {
    return date?.toISOString().replace(/Z|T/gi, ' ');
}

export const plugins: EditorProps['plugins'] = [
    {
        id: 'gjs-blocks-basic',
        src: 'https://unpkg.com/grapesjs-blocks-basic',
    },
    'grapesjs-plugin-forms',
    'grapesjs-component-countdown',
];

export const defaultOptions: EditorConfig = {
    storageManager: false,
    components: `
      <h1>Title</h1>
      <p>Paragraph</p>
      <img/>
    `,
};

export const defaultEditorProps: EditorProps = {
    grapesjs: window.grapesjs,
    grapesjsCss: 'http://localhost:8080/dist/css/grapes.min.css',
    plugins: plugins,
    options: defaultOptions,
}
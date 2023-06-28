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

export const BTN_CLS = 'border rounded px-2 py-1 w-full';

export const MAIN_BORDER_COLOR = 'border-slate-500';

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
    assetManager: {
        assets: [
          'https://via.placeholder.com/350x250/78c5d6/fff',
          'https://via.placeholder.com/350x250/459ba8/fff',
          'https://via.placeholder.com/350x250/79c267/fff',
          'https://via.placeholder.com/350x250/c5d647/fff',
          'https://via.placeholder.com/350x250/f28c33/fff',
          'https://via.placeholder.com/350x250/e868a2/fff',
          'https://via.placeholder.com/350x250/cc4360/fff',
          'https://via.placeholder.com/350x250/78c5d6/eee',
          'https://via.placeholder.com/350x250/459ba8/eee',
          'https://via.placeholder.com/350x250/79c267/eee',
          'https://via.placeholder.com/350x250/c5d647/eee',
          'https://via.placeholder.com/350x250/f28c33/eee',
          'https://via.placeholder.com/350x250/e868a2/eee',
          'https://via.placeholder.com/350x250/cc4360/eee',
        ],
      },
    // components: `
    //   <h1>Title</h1>
    //   <p>Paragraph</p>
    //   <img/>
    // `,
    components: `
        <div style="padding: 25px">Custom Layer Manager</div>
        <div>Element A</div>
        <div style="padding: 20px">
        <div>Element B1</div>
        <div>Element B2</div>
        <div>Element B3</div>
        </div>
        <div>Element C</div>
    `,
};

export const defaultEditorProps: EditorProps = {
    grapesjs: window.grapesjs,
    grapesjsCss: 'http://localhost:8080/dist/css/grapes.min.css',
    plugins: plugins,
    options: defaultOptions,
}
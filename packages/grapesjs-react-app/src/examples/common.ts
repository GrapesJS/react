import { EditorProps } from '@grapesjs/react';
import type grapesjs from 'grapesjs';
import type { Plugin } from 'grapesjs';
import type { EditorConfig } from 'grapesjs';
import { createTheme } from '@mui/material/styles';

declare global {
    interface Window {
        grapesjs: typeof grapesjs
    }
}

export const MAIN_BG_COLOR = 'bg-slate-900';

export const MAIN_TXT_COLOR = 'text-white';

export const BTN_CLS = 'border rounded px-2 py-1 w-full';

export const MAIN_BORDER_COLOR = 'border-slate-500';

export const ROUND_BORDER_COLOR = `rounded border ${MAIN_BORDER_COLOR}`;

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
    undoManager: {
        trackSelection: false,
    },
    selectorManager: {
        componentFirst: true,
    },
    components: `
        <div style="padding: 25px">Element A</div>
        <div class="example example-a">Element B</div>
        <div style="padding: 20px">
            <div class="example-b1">Element B1</div>
            <div class="example-b2">Element B2</div>
            <div>Element B3</div>
        </div>
        <div>Element C</div>
    `,
};

export const slowStoragePlugin: Plugin = (editor) => {
    editor.Storage.add('slow', {
      async load() {
        console.log('Waiting for the Storage');
        await new Promise(res => setTimeout(res, 3000));
        return {
          pages: [{ component: '<h1>Content from the Storage</h1>'}],
        };
      },
      async store() {},
    })
  }

export const defaultEditorProps: EditorProps = {
    grapesjs: window.grapesjs,
    grapesjsCss: 'http://localhost:8080/dist/css/grapes.min.css',
    plugins: plugins,
    options: defaultOptions,
}

export const customTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
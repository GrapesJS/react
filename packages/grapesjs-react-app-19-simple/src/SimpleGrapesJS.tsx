import { useState } from 'react';
import GrapesJsEditor from '@grapesjs/react';
import { type Editor } from 'grapesjs';

const SimpleGrapesJS = () => {
  const [, setEditor] = useState<Editor | null>(null);

  return (
    <div className="h-screen">
      <GrapesJsEditor
        grapesjs="https://unpkg.com/grapesjs"
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        options={{
          components: '<div>Hello GrapesJS!</div>',
          storageManager: false,
          height: '100%',
          plugins: [
            'grapesjs-blocks-basic'
          ],
        }}
        onEditor={editor => {
          setEditor(editor);
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/grapesjs-blocks-basic';
          document.head.appendChild(script);
        }}
      />
    </div>
  );
};

export default SimpleGrapesJS;
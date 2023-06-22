import GrapesJsEditor from '@grapesjs/react';
import type gjs from 'grapesjs';

declare global {
  interface Window {
    grapesjs: typeof gjs
  }
}

function App() {
  return (
    <div className="flex flex-col h-screen text-white">
      <div className="bg-slate-900">
        Example
      </div>
      <div className="flex-grow">
        <GrapesJsEditor
          grapesjs={window.grapesjs}
          grapesjsCss="http://localhost:8080/dist/css/grapes.min.css"
          options={{
            storageManager: false,
            components: `
              <h1>Title<h1>
              <p>Paragraph<p>
            `,
          }}
        />
      </div>
    </div>
  )
}

export default App

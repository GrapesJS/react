import GrapesJsEditor, { MyButton, MyEnumTest } from '@grapesjs/react';
import type gjs from 'grapesjs';

declare global {
  interface Window {
    grapesjs: typeof gjs
  }
}

function App() {
  console.log({ grapesjs: window.grapesjs })

  return (
    <div className="flex flex-col h-screen text-white">
      <div className="bg-slate-900">
        Example
      </div>
      <div className="flex-grow">
        <GrapesJsEditor
          grapesjs={window.grapesjs}
          grapesjsCss="http://localhost:8080/dist/css/grapes.min.css"
        />
      </div>
    </div>
  )
}

export default App

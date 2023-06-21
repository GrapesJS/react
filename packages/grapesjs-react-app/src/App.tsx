import { MyButton, MyEnumTest } from '@grapesjs/react';
import type gjs from 'grapesjs';

declare global {
  interface Window {
    grapesjs: typeof gjs
  }
}

function App() {
  console.log({ grapesjs: window.grapesjs })

  return (
    <div>
      <div className="text-3xl font-bold underline">TEST</div>
      <MyButton check={MyEnumTest.Hello}/>
    </div>
  )
}

export default App

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
      Test button:
      <MyButton check={MyEnumTest.Hello}/>
    </div>
  )
}

export default App

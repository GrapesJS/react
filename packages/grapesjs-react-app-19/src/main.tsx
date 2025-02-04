import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';

const root = document.getElementById('root') as HTMLElement

const reactRoot = createRoot(root)

reactRoot.render( <App />);


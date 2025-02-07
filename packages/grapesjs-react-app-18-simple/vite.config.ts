import { UserConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

const dirCwd = process.cwd();
const serverOpts: UserConfig['server'] = {};
const indexDev = '_index.html';

if (fs.existsSync(`${dirCwd}/${indexDev}`)) {
  serverOpts.open = indexDev;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    ...serverOpts,
  },
})

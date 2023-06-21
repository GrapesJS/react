import { defineConfig } from 'vite'
import path from 'node:path';
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'MyLib',
        formats: ['es', 'umd'],
        fileName: (format) => `index${format === 'es' ? '' : `.${format}`}.js`,
    },
    rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        },
    },
},
})

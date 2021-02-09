import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
const path = require('path')

let __dirname = './';
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'FormVuelator'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

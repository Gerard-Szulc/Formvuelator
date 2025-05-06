import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import { VueMcp } from 'vite-plugin-vue-mcp'

export default defineConfig({
  plugins: [vue(), dts({ tsconfigPath: 'tsconfig.lib.json'}), VueMcp()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'FormVuelator',
      fileName: 'index'
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

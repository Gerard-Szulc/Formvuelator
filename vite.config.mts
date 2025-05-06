import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";
import { VueMcp } from 'vite-plugin-vue-mcp'

export default defineConfig({
  plugins: [vue(), dts(), VueMcp()],
})

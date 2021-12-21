import { defineConfig } from 'vite'
// jsx
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from '@vitejs/plugin-vue'
import path from 'path';
// element Plus 按需加载
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  // server: {
  //   proxy: env.VITE_PROXY ? proxy(JSON.parse(env.VITE_PROXY)) : {},
  //   port: env.VITE_PORT
  // },
  build: {
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus']
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  css: {
    preprocessorOptions: {
      scss: { // 注意：键名是scss不是sass！
        // 这里写你想导入全局scss变量的路径，注意只能写相对路径，alias貌似在css中不会生效
        additionalData: "@import './src/assets/style/reset.scss';@import './src/assets/style/variable.scss';",
      },
    },
    // postcss: {
    //   plugins: [
    //     require('autoprefixer'),
    //     require('tailwindcss'),
    //     require('postcss-nested'),
    //     require('postcss-simple-vars'),
    //     require('postcss-import')
    //   ]
    // }
  },
  resolve: {
    alias: [{
      find: '@',
      replacement: path.join(__dirname, 'src'),
    },],
  },

})

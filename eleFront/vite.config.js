import {
    defineConfig
} from 'vite';
import path from 'path';
// 引入vant按需导入的插件
// import vitePluginImp from 'vite-plugin-imp';
import alias from "@rollup/plugin-alias"
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        alias(),
        vue(),
        // vitePluginImp({
        //     libList: [{
        //         libName: 'vant',
        //         style(name) {
        //             return `vant/es/${name}/index.css`
        //         }
        //     }]
        // })
    ],
    resolve: {
        alias: { // 配置项目别名
            "@": path.resolve(__dirname, "src"),
            "@comps": path.resolve(__dirname, "src/components"),
            "@views": path.resolve(__dirname, "src/views"),
        },
    },
    //vite开发服务器配置
    server: {
        host: 'linxz.top', //主机名
        port: 80, //端口
        open: true, //是否自动开启浏览器
        strictPort: false, //开启控制台输出日志
        https: false, //是否开启 https
        // 反向代理
        // proxy: {
        //   '/api': {
        //     target: 'http://localhost:3000',
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/api/, '')
        //   },
        // } 
    },
    // // css预设的配置
    // // cssPreprocessOptions: {
    // //     scss: {
    // //         additionalData: '@import "style/var.scss";', // 添加公共样式
    // //     },
    // // },
    // //生产模式打包配置
    build: {
        outDir: 'dist', //指定输出目录(相对于项目根目录)
    }
});
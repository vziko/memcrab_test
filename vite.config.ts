import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path';
import svgr from "vite-plugin-svgr";

const srcPath = resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    const PORT = `${env.VITE_PORT ?? '3500'}`;

    return {
        base: process.env.GITHUB_ACTIONS ? '/memcrab_test/' : '/',
        plugins: [react(), svgr()],
        server: {
            port: Number(PORT),
            allowedHosts: true,
        },
        resolve: {
            alias: {
                // Ваші аліаси мають бути тут!
                'assets': path.resolve(srcPath, 'assets'),
                'components': path.resolve(srcPath, 'components'),
                'context': path.resolve(srcPath, 'context'),
                'hooks': path.resolve(srcPath, 'hooks'),
                'enums': path.resolve(srcPath, 'enums'),
                'types': path.resolve(srcPath, 'types'),
                'utils': path.resolve(srcPath, 'utils'),

                '@extends': resolve(srcPath, 'assets/scss/extends'),
                '@mixins': resolve(srcPath, 'assets/scss/mixins'),
            },
        },
    }
})

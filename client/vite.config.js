import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    jsxImportSource: 'react',
    babel: {
      plugins: [
        ['@babel/plugin-transform-react-jsx', {
          runtime: 'automatic',
          importSource: 'react'
        }]
      ]
    }
  })],
  server: {
    port: 3004,
    strictPort: false,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5003',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': '/src',
    },
  },
  esbuild: {
    jsx: 'automatic',
    jsxDev: true,
    logOverride: {
      'this-is-undefined-in-esm': 'silent'
    }
  }
});

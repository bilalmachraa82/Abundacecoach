import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for better DX
      fastRefresh: true,
      // Babel options for better optimization
      babel: {
        plugins: [
          // Add any babel plugins here if needed
        ],
      },
    }),
  ],

  // Build optimizations
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',

    // Increase chunk size warning limit (adjusted for our app size)
    chunkSizeWarningLimit: 600,

    // Source maps for production debugging (remove in production if not needed)
    sourcemap: false,

    // Minification
    minify: 'esbuild',

    rollupOptions: {
      output: {
        // Manual chunking strategy for optimal bundle splitting
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // UI components and icons
          'ui-vendor': ['lucide-react', 'recharts'],

          // AI SDK and related
          'ai-vendor': ['ai', '@ai-sdk/google', '@ai-sdk/anthropic', '@google/generative-ai'],

          // Supabase
          'supabase-vendor': ['@supabase/supabase-js'],

          // State management and utilities
          'utils-vendor': ['zustand', 'date-fns'],
        },

        // Naming strategy for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
  },

  // Dependency pre-bundling optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'date-fns',
      '@supabase/supabase-js',
    ],
    exclude: ['lucide-react'],

    // Force pre-bundling for these packages
    force: false,
  },

  // Server configuration
  server: {
    // Faster HMR
    hmr: true,

    // Port configuration
    port: 5173,

    // Open browser automatically
    open: false,
  },

  // Preview server configuration
  preview: {
    port: 4173,
  },
});

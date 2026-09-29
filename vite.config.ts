import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** User site is served from `/`, so deep links need a SPA 404 and Jekyll must stay off. */
function githubPagesPublishFiles(): Plugin {
  return {
    name: 'github-pages-publish-files',
    apply: 'build',
    closeBundle() {
      if (process.env.GITHUB_PAGES !== 'true') return
      const dist = path.resolve(__dirname, 'dist')
      const indexPath = path.join(dist, 'index.html')
      if (!fs.existsSync(indexPath)) return
      fs.copyFileSync(indexPath, path.join(dist, '404.html'))
      fs.writeFileSync(path.join(dist, '.nojekyll'), '')
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname), '')
  const port = Number(env.VITE_PORT) || 10006
  const hasApiUrl = env.VITE_API_URL !== undefined && env.VITE_API_URL !== ''

  return {
    plugins: [react(), githubPagesPublishFiles()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port,
      host: '0.0.0.0',
      open: true,
      ...(mode === 'dev' && !hasApiUrl
        ? {
            proxy: {
              '/api': {
                target: 'http://127.0.0.1:3001',
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/api/, ''),
              },
            },
          }
        : {}),
    },
    preview: {
      port,
      host: '0.0.0.0',
    },
  }
})

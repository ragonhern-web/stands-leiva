import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// En GitHub Pages el sitio vive en /<repo-name>/ — ajusta este valor al nombre exacto de tu repositorio
const REPO_NAME = 'stands-leiva'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${REPO_NAME}/` : '/',
  plugins: [react(), tailwindcss()],
})

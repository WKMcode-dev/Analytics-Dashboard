// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://its00480.itstransdata.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) =>
          path.replace(
            "/api",
            "/ITS-InfoExport_5F4072FB-377B-4A6D-9550-281568D8EDEA/api"
          )
      }
    }
  }
})
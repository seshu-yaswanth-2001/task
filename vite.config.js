import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/webhook": {
        target: "https://webhook.site/acbf4bbe-663f-4534-b587-9771aa008dcf",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhook/, ""),
      },
    },
  },
});

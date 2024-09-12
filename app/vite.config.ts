import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const repositoryName = "Template_Vite-React-TailwindCSS";

export default defineConfig({
  base: `/${repositoryName}/`,
  plugins: [react()],
});

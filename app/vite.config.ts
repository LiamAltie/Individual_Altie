import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const repositoryName = "Individual_Altie";

export default defineConfig({
  base: `/${repositoryName}/`,
  plugins: [react()],
});

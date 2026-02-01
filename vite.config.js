import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
  
//   plugins: [react()],
// })
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Check if the environment variable is set to 'true'
  const isGitHub = process.env.isLiveInGitHUB === 'true';

  return {
    plugins: [react()],
    // If live in GitHub, use repo name. If local, use root.
    // REPLACE '/portfolio/' with your actual repo name if different!
    base: isGitHub ? "/portfolio/" : "/", 
  }
})
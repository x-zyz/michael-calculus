import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, posix } from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function pwaOfflinePlugin(): Plugin {
  return {
    name: 'michael-calculus-pwa',
    apply: 'build',
    closeBundle() {
      const distDir = 'dist';
      const swPath = join(distDir, 'sw.js');
      if (!existsSync(swPath)) return;
      const walk = (dir: string, prefix = ''): string[] =>
        readdirSync(dir).flatMap((name) => {
          const full = join(dir, name);
          const rel = prefix ? posix.join(prefix, name) : name;
          return statSync(full).isDirectory() ? walk(full, rel) : [rel];
        });
      const files = walk(distDir)
        .filter((f) => f !== 'sw.js' && !f.endsWith('.ttf') && !f.endsWith('.woff') && !f.endsWith('.map'))
        .map((f) => `./${f}`);
      const assets = ['./', ...files];
      const pkg = JSON.parse(readFileSync('package.json', 'utf8')) as { version: string };
      const sw = readFileSync(swPath, 'utf8')
        .replaceAll('__CACHE_VERSION__', pkg.version)
        .replace('["__PRECACHE_ASSETS__"]', JSON.stringify(assets));
      writeFileSync(swPath, sw, 'utf8');
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), pwaOfflinePlugin()],
  test: { environment: 'jsdom', setupFiles: './src/tests/setup.ts', include: ['src/**/*.test.tsx', 'src/**/*.test.ts'] },
});

import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { chapters } from '../data/learning';
import { loadChapter } from '../data/bank';

await Promise.all(chapters.map(({ id }) => loadChapter(id)));
afterEach(() => { cleanup(); localStorage.clear(); document.documentElement.removeAttribute('data-theme'); });
vi.stubGlobal('scrollTo', vi.fn());

import { describe, expect, it } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../app/App';
import { learningModules } from '../app/modules';

function mount(path = '/') { return render(<MemoryRouter initialEntries={[path]}><App/></MemoryRouter>); }
describe('learning workspace', () => {
  it('keeps the available learning tools in primary navigation', () => {
    mount();
    const navigation = screen.getByRole('navigation', { name: '主导航' });
    for (const module of learningModules) {
      fireEvent.click(within(navigation).getByRole('link', { name: module.label }));
      expect(within(navigation).getAllByRole('link')).toHaveLength(5);
      expect(within(navigation).getByRole('link', { name: module.label })).toHaveAttribute('aria-current', 'page');
      if (module.path !== '/') expect(screen.getByRole('heading', { level: 1, name: module.label })).toBeVisible();
      else expect(screen.getByRole('heading', { level: 1, name: '学习首页' })).toBeVisible();
    }
  });
  it('opens each module directly with its correct heading', () => {
    mount('/experiments');
    expect(screen.getByRole('heading', { level: 1, name: '数学实验室' })).toBeVisible();
    fireEvent.click(screen.getAllByRole('link',{name:'进入实验 →'})[0]);
    expect(screen.getByLabelText('选择实验函数')).toBeVisible();
  });
  it('persists theme preferences across remounting', () => {
    const view = mount();
    fireEvent.click(screen.getByRole('button', { name: '切换深色主题' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    view.unmount();
    mount();
    expect(screen.getByRole('button', { name: '切换浅色主题' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: '切换浅色主题' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });
  it('opens and closes the learning guide with keyboard and restores focus', () => {
    mount('/settings');
    fireEvent.click(screen.getByRole('button', { name: '了解学习路径' }));
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getAllByRole('listitem')).toHaveLength(6);
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '了解学习路径' })).toHaveFocus();
  });
  it('recovers from an unknown route', () => {
    mount('/unknown');
    fireEvent.click(screen.getByRole('link', { name: /回到学习首页/ }));
    expect(screen.getByRole('heading', { level: 1, name: '学习首页' })).toBeVisible();
  });
});

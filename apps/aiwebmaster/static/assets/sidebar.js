// Shared app shell — sidebar nav + user card, identical across every page.
// renderShell(activePath) returns the outer flex container's HTML; caller
// injects it into #app-root and puts page content inside #page-content.
const NAV_ITEMS = [
  { path: '/', label: 'Chat', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 4v-4z' },
  { path: '/browse', label: 'Browse & edit', icon: 'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z' },
  { path: '/users', label: 'Users', icon: 'M12 4.5a4 4 0 100 8 4 4 0 000-8zM4 20a8 8 0 0116 0' },
  { path: '/system', label: 'System', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 7h10v10H7V7z' },
  { path: '/settings', label: 'Settings', icon: 'M10.325 4.317a1 1 0 011.35-.936l.379.15a1 1 0 001.298-.53l.198-.38a1 1 0 011.766.93l-.15.38a1 1 0 00.53 1.298l.38.198a1 1 0 01-.93 1.766l-.38-.15a1 1 0 00-1.298.53l-.198.38a1 1 0 01-1.766-.93l.15-.38a1 1 0 00-.53-1.298l-.38-.198a1 1 0 01-.319-.15zM12 15a3 3 0 100-6 3 3 0 000 6z' },
];

function svgIcon(d) {
  return `<svg class="w-[18px] h-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="${d}"/>
  </svg>`;
}

function initials(email) {
  const name = (email || '?').split('@')[0];
  return name.slice(0, 2).toUpperCase();
}

function renderShell(activePath) {
  const navHtml = NAV_ITEMS.map((item, i) => {
    const active = item.path === activePath;
    return `<a href="${item.path}"
      class="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 animate-fade-in-left
             ${active
               ? 'bg-brand-panel2 text-brand-ink border border-brand-border shadow-panel'
               : 'text-brand-muted hover:text-brand-ink hover:bg-brand-panel/70 border border-transparent'}"
      style="animation-delay:${i * 40}ms">
      <span class="${active ? 'text-brand-gold' : 'text-brand-muted group-hover:text-brand-gold'} transition-colors">${svgIcon(item.icon)}</span>
      ${item.label}
    </a>`;
  }).join('');

  return `
  <aside class="w-64 shrink-0 bg-brand-navy2/80 backdrop-blur border-r border-brand-border flex flex-col p-4 animate-fade-in-left">
    <div class="flex items-center gap-2.5 px-2 mb-1">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-gold to-amber-600 flex items-center justify-center text-brand-navy font-black text-sm shadow-glow">A</div>
      <div>
        <div class="font-bold text-[15px] tracking-tight leading-none">AI<span class="text-brand-gold">webmaster</span></div>
      </div>
    </div>
    <div class="text-[11px] text-brand-muted px-2 mb-6">The Bradbury Group</div>

    <nav class="flex flex-col gap-1">${navHtml}</nav>

    <div class="flex-1"></div>

    <div id="sidebar-who" class="border-t border-brand-border pt-4 px-1">
      <div class="flex items-center gap-2 animate-pulse">
        <div class="w-8 h-8 rounded-full bg-brand-panel"></div>
        <div class="h-3 w-24 bg-brand-panel rounded"></div>
      </div>
    </div>
  </aside>`;
}

async function mountShell(activePath) {
  const root = document.getElementById('app-root');
  const shellWrap = document.createElement('div');
  shellWrap.className = 'flex h-screen overflow-hidden bg-brand-navy text-brand-ink font-sans';
  shellWrap.innerHTML = renderShell(activePath);

  const main = document.createElement('div');
  main.id = 'shell-main';
  main.className = 'flex-1 flex flex-col min-w-0 overflow-hidden';
  const existingContent = document.getElementById('page-content');
  if (existingContent) main.appendChild(existingContent);
  shellWrap.appendChild(main);

  root.appendChild(shellWrap);

  const res = await fetch('/api/me');
  if (!res.ok) { window.location.href = '/login'; return null; }
  const me = await res.json();

  document.getElementById('sidebar-who').innerHTML = `
    <div class="flex items-center gap-2.5 animate-fade-in">
      <div class="w-8 h-8 rounded-full bg-brand-panel2 border border-brand-border flex items-center justify-center text-xs font-bold text-brand-gold">${initials(me.email)}</div>
      <div class="min-w-0 flex-1">
        <div class="text-xs font-semibold truncate">${me.email}</div>
        <div class="text-[10px] text-brand-muted capitalize">${me.role.replace('_', ' ')}</div>
      </div>
      <button id="logout-btn" title="Log out" class="text-brand-muted hover:text-brand-terracotta transition-colors p-1 rounded">
        ${svgIcon('M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1')}
      </button>
    </div>`;
  document.getElementById('logout-btn').onclick = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return me;
}

const ROLE_PERMISSIONS = {
  docker_ops: ['docker', 'git'],
  ui_editor: ['content', 'nav_link'],
  infra_admin: ['docker', 'git', 'sql', 'code_edit'],
  super_admin: ['docker', 'git', 'sql', 'content', 'nav_link', 'user_management', 'publish', 'rollback', 'code_edit'],
};
function canRun(me, actionType) {
  return me && (ROLE_PERMISSIONS[me.role] || []).includes(actionType);
}

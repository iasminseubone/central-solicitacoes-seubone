// Helpers comuns às 3 páginas do painel. Depende de config.js (API_URL).

async function apiGet(sheet) {
  const res = await fetch(`${API_URL}?sheet=${sheet}`);
  if (!res.ok) throw new Error('Falha ao carregar (' + res.status + ')');
  return res.json();
}

async function apiPost(payload) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Falha ao salvar (' + res.status + ')');
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json;
}

let flashTimer = null;
function flash(msg, isErr) {
  const el = document.getElementById('saved-flash');
  if (!el) return;
  el.textContent = msg;
  el.classList.toggle('err', !!isErr);
  el.classList.add('show');
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => el.classList.remove('show'), 1800);
}

function escapeAttr(str) {
  return String(str ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function badgeFor(status) {
  if (status === 'Preenchido') return '<span class="badge ok">Preenchido</span>';
  if (status === 'Cancelado') return '<span class="badge danger">Cancelado</span>';
  return '<span class="badge warn">Pendente</span>';
}

(() => {
 const links = [...document.querySelectorAll('a[data-task]')];
 if (!links.length) return;
 const key = 'emily-portfolio-visits-v1';
 let completed = {};
 function read() {
  try {
   const value = JSON.parse(localStorage.getItem(key) || '{}');
   if (value && typeof value === 'object' && !Array.isArray(value)) completed = value;
  } catch {}
 }
 function render() {
  links.forEach(link => {
   const done = completed[link.dataset.task] === true;
   link.classList.toggle('is-complete', done);
   link.querySelector('.task-box').textContent = done ? '✓' : '';
   link.querySelector('.task-state').textContent = done ? 'Complete' : '↗';
   link.setAttribute('aria-label', link.querySelector('.task-label').textContent + (done ? ' — complete' : ''));
  });
  const count = links.filter(link => completed[link.dataset.task] === true).length;
  document.querySelector('.task-progress').textContent = count === links.length
   ? 'All done — thanks for exploring!'
   : count + ' of ' + links.length + ' little adventures';
 }
 function complete(link) {
  read();
  completed[link.dataset.task] = true;
  try { localStorage.setItem(key, JSON.stringify(completed)); } catch {}
  render();
 }
 links.forEach(link => {
  link.addEventListener('click', () => complete(link));
  link.addEventListener('auxclick', event => { if (event.button === 1) complete(link); });
 });
 function refresh() { read(); render(); }
 window.addEventListener('pageshow', refresh);
 window.addEventListener('focus', refresh);
 window.addEventListener('storage', event => { if (event.key === key) refresh(); });
 refresh();
})();

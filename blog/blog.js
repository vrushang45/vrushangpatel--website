const menuButton = document.querySelector('.menu-button');
const navLinks = document.getElementById('nav-links');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  navLinks.classList.toggle('open', expanded);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    menuButton.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    menuButton.focus();
  }
});
const search = document.getElementById('search');
if (search) {
  document.querySelector('.tools').hidden = false;
  const filters = [...document.querySelectorAll('[data-filter]')];
  const posts = [...document.querySelectorAll('[data-category]')];
  let category = 'All articles';
  const update = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    posts.forEach(post => {
      const matches = (category === 'All articles' || post.dataset.category === category) && post.textContent.toLocaleLowerCase().includes(query);
      post.hidden = !matches;
      if (matches) count++;
    });
    document.querySelector('.empty').hidden = count > 0;
    document.getElementById('results-status').textContent = `${count} article${count === 1 ? '' : 's'} found`;
  };
  filters.forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    update();
  }));
  search.addEventListener('input', update);
  document.getElementById('reset').addEventListener('click', () => {
    search.value = '';
    filters[0].click();
    search.focus();
  });
  update();
}

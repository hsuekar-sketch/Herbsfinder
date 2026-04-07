// ============================================================
// HERBSFINDER.COM — MAIN JS (Rendering Engine)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Global: Year & Scroll-to-Top ──────────────────────────
  document.querySelectorAll('#year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
  }

  // ── Reading Progress Bar (article page) ───────────────────
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const docH = document.body.scrollHeight - window.innerHeight;
      progressBar.style.width = `${(window.scrollY / docH) * 100}%`;
    });
  }

  // ── Mobile Menu ───────────────────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.style.display === 'flex';
      mainNav.style.display = isOpen ? 'none' : 'flex';
      mainNav.style.flexDirection = 'column';
      mainNav.style.position = 'absolute';
      mainNav.style.top = '72px';
      mainNav.style.left = '0';
      mainNav.style.right = '0';
      mainNav.style.background = 'var(--white)';
      mainNav.style.padding = '1rem 2rem';
      mainNav.style.borderBottom = '1px solid var(--parchment)';
      mainNav.style.zIndex = '99';
    });
  }

  // ── Search ────────────────────────────────────────────────
  const searchTrigger = document.getElementById('search-trigger');
  const searchOverlay = document.getElementById('search-overlay');
  const searchMain    = document.getElementById('search-main');
  const searchResults = document.getElementById('search-results');
  const searchInputH  = document.getElementById('search-input-header');

  if (searchTrigger) {
    searchTrigger.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      if (searchMain) setTimeout(() => searchMain.focus(), 100);
    });
    searchInputH?.addEventListener('focus', () => {
      searchOverlay.classList.add('active');
      setTimeout(() => searchMain?.focus(), 100);
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') searchOverlay?.classList.remove('active');
  });

  searchMain?.addEventListener('input', function() {
    const q = this.value.trim();
    if (!q) { searchResults.innerHTML = ''; return; }
    const results = searchArticles(q);
    if (!results.length) {
      searchResults.innerHTML = `<p style="padding:1.5rem;font-family:var(--font-ui);color:var(--text-lt);text-align:center;">No results for "${q}"</p>`;
      return;
    }
    searchResults.innerHTML = results.slice(0, 6).map(a => `
      <div class="search-result-item" onclick="window.location='article.html?slug=${a.slug}'">
        <h4>${a.title}</h4>
        <p>${a.category} · ${a.readTime} min read</p>
      </div>
    `).join('');
  });

  // ── Determine current page ────────────────────────────────
  const path = window.location.pathname;
  const isHome     = path.endsWith('index.html') || path.endsWith('/');
  const isArticle  = path.includes('article.html');
  const isCategory = path.includes('category.html');

  if (isHome)     renderHomepage();
  if (isArticle)  renderArticlePage();
  if (isCategory) renderCategoryPage();

  renderFooterCats();
});

// ── CATEGORY ICONS ────────────────────────────────────────
const CAT_META = {
  'Growing Guide':   { icon: '🪴', desc: 'From seed to harvest' },
  'Herb Profiles':   { icon: '📖', desc: 'Deep-dive herb profiles' },
  'Medicinal Herbs': { icon: '💊', desc: 'Evidence-based remedies' },
  'Beginner Tips':   { icon: '🌱', desc: 'Start your herb journey' },
  'Foraging':        { icon: '🌲', desc: 'Find herbs in the wild' },
  'How-To':          { icon: '🔧', desc: 'Practical step-by-step guides' },
};

// ── CARD TEMPLATES ────────────────────────────────────────
function cardFeatured(article) {
  return `
    <article class="card-featured" onclick="window.location='article.html?slug=${article.slug}'">
      <div class="card-featured__img-wrap">
        <img class="card-featured__img" src="${article.image}" alt="${article.imageAlt}" loading="lazy" />
      </div>
      <div class="card-featured__body">
        <div class="card-featured__meta">
          <span class="tag">${article.category}</span>
          <span>${formatDate(article.date)}</span>
          <span>${article.readTime} min read</span>
        </div>
        <h2 class="card-featured__title">${article.title}</h2>
        <p class="card-featured__excerpt">${article.excerpt}</p>
      </div>
    </article>`;
}

function cardSmall(article) {
  return `
    <article class="card-sm" onclick="window.location='article.html?slug=${article.slug}'">
      <img class="card-sm__img" src="${article.image}" alt="${article.imageAlt}" loading="lazy" />
      <div class="card-sm__body">
        <div class="card-sm__cat">${article.category}</div>
        <div class="card-sm__title">${article.title}</div>
        <div class="card-sm__meta">${formatDate(article.date)} · ${article.readTime} min</div>
      </div>
    </article>`;
}

function cardGrid(article) {
  return `
    <article class="card-grid fade-up" onclick="window.location='article.html?slug=${article.slug}'">
      <div class="card-grid__img-wrap">
        <img class="card-grid__img" src="${article.image}" alt="${article.imageAlt}" loading="lazy" />
      </div>
      <div class="card-grid__body">
        <div class="card-grid__cat">${article.category}</div>
        <h3 class="card-grid__title">${article.title}</h3>
        <p class="card-grid__excerpt">${article.excerpt}</p>
        <div class="card-grid__footer">
          <span>${formatDate(article.date)}</span>
          <span class="card-grid__read-more">${article.readTime} min →</span>
        </div>
      </div>
    </article>`;
}

// ── HOMEPAGE RENDERER ─────────────────────────────────────
function renderHomepage() {
  // Article count
  const countEl = document.getElementById('article-count');
  if (countEl) countEl.textContent = ARTICLES.length;

  // Categories grid
  const catGrid = document.getElementById('categories-grid');
  if (catGrid) {
    const allCats = [...new Set(ARTICLES.map(a => a.category))];
    catGrid.innerHTML = allCats.map(cat => {
      const meta = CAT_META[cat] || { icon: '🌿', desc: '' };
      const count = ARTICLES.filter(a => a.category === cat).length;
      return `
        <div class="cat-card" onclick="window.location='category.html?cat=${encodeURIComponent(cat)}'">
          <div class="cat-card__icon">${meta.icon}</div>
          <span class="cat-card__name">${cat}</span>
          <span class="cat-card__count">${count} article${count !== 1 ? 's' : ''}</span>
        </div>`;
    }).join('');
  }

  // Featured section
  const featured = getFeaturedArticles();
  const featGrid = document.getElementById('featured-grid');
  if (featGrid && featured.length) {
    const main = featured[0];
    const side = featured.slice(1, 4);
    featGrid.innerHTML = `
      ${cardFeatured(main)}
      <div class="card-list">
        ${side.map(cardSmall).join('')}
      </div>
    `;
  }

  // Article grid (latest)
  let gridPage = 0;
  const PAGE_SIZE = 6;
  const grid = document.getElementById('article-grid');
  const loadMore = document.getElementById('load-more-btn');

  function renderGridPage() {
    const slice = ARTICLES.slice(gridPage * PAGE_SIZE, (gridPage + 1) * PAGE_SIZE);
    if (!slice.length) { if(loadMore) loadMore.style.display = 'none'; return; }
    if (grid) grid.innerHTML += slice.map(cardGrid).join('');
    gridPage++;
    if (gridPage * PAGE_SIZE >= ARTICLES.length) {
      if (loadMore) loadMore.style.display = 'none';
    }
  }

  renderGridPage();
  loadMore?.addEventListener('click', renderGridPage);
}

// ── ARTICLE PAGE RENDERER ─────────────────────────────────
function renderArticlePage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  if (!slug) { document.title = 'Not Found – HerbsFinder'; return; }

  const article = getArticleBySlug(slug);
  if (!article) {
    document.getElementById('article-title').textContent = 'Article Not Found';
    return;
  }

  // SEO meta
  document.title = `${article.title} – HerbsFinder`;
  document.getElementById('page-desc')?.setAttribute('content', article.excerpt);
  document.getElementById('og-title')?.setAttribute('content', article.title);
  document.getElementById('og-desc')?.setAttribute('content', article.excerpt);
  document.getElementById('og-image')?.setAttribute('content', article.image);
  document.getElementById('og-url')?.setAttribute('content', `https://www.herbsfinder.com/article.html?slug=${slug}`);

  // Breadcrumb
  const bc = document.getElementById('breadcrumb');
  if (bc) bc.innerHTML = `<a href="index.html">Home</a> › <a href="category.html?cat=${encodeURIComponent(article.category)}">${article.category}</a> › ${article.title.substring(0, 40)}…`;

  // Meta bar
  const meta = document.getElementById('article-meta-bar');
  if (meta) meta.innerHTML = `
    <span class="tag tag--gold">${article.category}</span>
    <span>${formatDate(article.date)}</span>
    <span>⏱ ${article.readTime} min read</span>
    <span>✍️ ${article.author}</span>`;

  // Title, excerpt, cover
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-excerpt').textContent = article.excerpt;
  const cover = document.getElementById('article-cover');
  if (cover) { cover.src = article.image; cover.alt = article.imageAlt; }

  // Body
  const body = document.getElementById('article-body');
  if (body) body.innerHTML = article.content;

  // Tags
  const tagsEl = document.getElementById('article-tags');
  if (tagsEl) tagsEl.innerHTML = article.tags.map(t =>
    `<span class="article-tag" onclick="window.location='category.html?q=${t}'">#${t}</span>`
  ).join('');

  // Sidebar popular
  const sidebarPop = document.getElementById('sidebar-popular');
  if (sidebarPop) {
    sidebarPop.innerHTML = ARTICLES.filter(a => a.slug !== slug).slice(0, 4).map(a => `
      <div class="sidebar-item" onclick="window.location='article.html?slug=${a.slug}'">
        <img src="${a.image}" alt="${a.imageAlt}" loading="lazy" />
        <div class="sidebar-item-title">${a.title.substring(0, 60)}…</div>
      </div>`).join('');
  }

  // Sidebar categories
  const sideCats = document.getElementById('sidebar-cats');
  if (sideCats) {
    const cats = [...new Set(ARTICLES.map(a => a.category))];
    sideCats.innerHTML = cats.map(c => {
      const meta = CAT_META[c] || { icon: '🌿' };
      return `<a href="category.html?cat=${encodeURIComponent(c)}" style="display:flex;align-items:center;gap:0.5rem;font-family:var(--font-ui);font-size:0.83rem;color:var(--forest);padding:0.4rem 0;transition:color 0.2s;" onmouseover="this.style.color='var(--leaf)'" onmouseout="this.style.color='var(--forest)'">${meta.icon} ${c}</a>`;
    }).join('');
  }

  // Related articles
  const related = document.getElementById('related-grid');
  if (related) {
    const relatedArticles = ARTICLES
      .filter(a => a.slug !== slug && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
      .slice(0, 3);
    const fill = relatedArticles.length < 3
      ? ARTICLES.filter(a => a.slug !== slug && !relatedArticles.includes(a)).slice(0, 3 - relatedArticles.length)
      : [];
    [...relatedArticles, ...fill].forEach(a => {
      related.innerHTML += cardGrid(a);
    });
  }
}

// ── CATEGORY PAGE RENDERER ────────────────────────────────
function renderCategoryPage() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const q   = params.get('q');

  let filtered = ARTICLES;
  let title = 'All Articles';
  let desc  = 'Browse all our herb guides, growing tips, medicinal profiles, and foraging articles.';

  if (cat) {
    filtered = getArticlesByCategory(cat);
    const meta = CAT_META[cat] || {};
    title = `${meta.icon || ''} ${cat}`.trim();
    desc  = `${meta.desc || ''} — ${filtered.length} articles`.trim();
    document.getElementById('cat-breadcrumb').textContent = cat;
  } else if (q) {
    filtered = searchArticles(q);
    title = `Search: "${q}"`;
    desc  = `${filtered.length} result${filtered.length !== 1 ? 's' : ''} found`;
  }

  document.title = `${title} – HerbsFinder`;
  document.getElementById('cat-title').textContent = title;
  document.getElementById('cat-desc').textContent   = desc;

  // Filter buttons
  const filterBar = document.getElementById('filter-bar');
  if (filterBar) {
    const allCats = [...new Set(ARTICLES.map(a => a.category))];
    filterBar.innerHTML = `
      <button class="filter-btn ${!cat ? 'active' : ''}" onclick="window.location='category.html'">All</button>
      ${allCats.map(c => `<button class="filter-btn ${c === cat ? 'active' : ''}" onclick="window.location='category.html?cat=${encodeURIComponent(c)}'">${c}</button>`).join('')}
    `;
  }

  // Article count
  const countEl = document.getElementById('articles-count');
  if (countEl) countEl.textContent = `Showing ${Math.min(filtered.length, 6)} of ${filtered.length} articles`;

  // Grid with pagination
  let page = 0;
  const PAGE = 6;
  const grid = document.getElementById('big-grid');
  const loadMore = document.getElementById('load-more-cat');

  function renderPage() {
    const slice = filtered.slice(page * PAGE, (page + 1) * PAGE);
    if (!slice.length) { if(loadMore) loadMore.style.display = 'none'; return; }
    if (grid) grid.innerHTML += slice.map(cardGrid).join('');
    page++;
    if (page * PAGE >= filtered.length) {
      if (loadMore) loadMore.style.display = 'none';
    }
    if (countEl) countEl.textContent = `Showing ${Math.min(page * PAGE, filtered.length)} of ${filtered.length} articles`;
  }

  renderPage();
  loadMore?.addEventListener('click', renderPage);
}

// ── FOOTER CATEGORIES ─────────────────────────────────────
function renderFooterCats() {
  const el = document.getElementById('footer-cats-list');
  if (!el) return;
  const cats = [...new Set(ARTICLES.map(a => a.category))];
  el.innerHTML = cats.map(c => `<li><a href="category.html?cat=${encodeURIComponent(c)}">${c}</a></li>`).join('');
}

// ── NEWSLETTER HANDLER ────────────────────────────────────
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const btn   = e.target.querySelector('button[type="submit"]');
  const email = input?.value;
  if (btn) {
    btn.textContent = '✅ Subscribed!';
    btn.style.background = '#2d5a3d';
    if (input) input.value = '';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
  }
  // TODO: connect to Mailchimp / ConvertKit / Brevo
  console.log('Newsletter signup:', email);
}

// ── SHARE HANDLER ─────────────────────────────────────────
function shareArticle(platform) {
  const url   = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const urls  = {
    twitter:  `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  };
  if (platform === 'copy') {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = event.target;
      btn.textContent = '✅ Copied!';
      setTimeout(() => { btn.textContent = '🔗 Copy Link'; }, 2000);
    });
  } else {
    window.open(urls[platform], '_blank', 'width=600,height=400');
  }
}

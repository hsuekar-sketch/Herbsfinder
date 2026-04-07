// ============================================================
// HERBSFINDER.COM — ARTICLE DATABASE
// ============================================================
// HOW TO ADD A NEW ARTICLE EVERY DAY:
// 1. Copy the article object template below
// 2. Fill in all fields (id must be unique & incremental)
// 3. Add image URL from Unsplash (see format below)
// 4. Add it at the TOP of the articles array (newest first)
// 5. Save and deploy — done!
// ============================================================

const ARTICLES = [
  {
    id: 1,
    slug: "lavender-complete-guide",
    title: "Lavender: The Complete Guide to Growing, Harvesting & Using Nature's Most Beloved Herb",
    excerpt: "From calming teas to aromatic sachets and culinary delights, lavender is one of the most versatile herbs you can grow. Discover everything you need to know about this purple wonder.",
    category: "Growing Guide",
    tags: ["lavender", "growing", "aromatherapy", "culinary"],
    author: "HerbsFinder Editorial",
    date: "2025-04-04",
    readTime: 8,
    featured: true,
    image: "https://images.unsplash.com/photo-1499578124509-1611b77778c8?w=1200&q=80",
    imageAlt: "Purple lavender fields in bloom",
    content: `
      <p>Lavender (<em>Lavandula angustifolia</em>) has been treasured for over 2,500 years — from ancient Egyptians who used it in mummification rituals to Roman soldiers who carried it for wound healing. Today, it remains one of the world's most beloved herbs, and for excellent reason.</p>
      
      <h2>Why Grow Lavender?</h2>
      <p>Few plants offer the combination of beauty, fragrance, culinary use, and medicinal value that lavender delivers. A single mature lavender plant can produce hundreds of flower spikes annually, each one useful in dozens of ways.</p>
      
      <h2>Choosing Your Variety</h2>
      <p>With over 450 varieties of lavender available, choosing the right one for your climate and purpose is crucial. English lavender (<em>L. angustifolia</em>) is the hardiest and most fragrant, perfect for cold climates. French lavender (<em>L. stoechas</em>) thrives in warmer zones and sports distinctive "rabbit ear" flowers. Spanish lavender tolerates heat and drought exceptionally well.</p>
      
      <h2>Growing Conditions</h2>
      <p>Lavender demands full sun — a minimum of 6 hours daily, with 8 hours being ideal. It thrives in well-draining, slightly alkaline soil (pH 6.5–7.5) and is remarkably drought-tolerant once established. The number one killer of lavender? Overwatering. Allow soil to dry completely between waterings.</p>
      
      <h2>Harvesting for Maximum Potency</h2>
      <p>Harvest lavender in the morning, just as the lower flowers on each spike begin to open. This is when essential oil concentration is at its peak. Cut stems long — about a third of the way down the plant — which also serves as a natural pruning that encourages bushy regrowth.</p>
      
      <h2>10 Ways to Use Lavender</h2>
      <p>The uses for lavender are almost endless. Culinary uses include lavender shortbread, lemonade, honey infusions, and the classic French seasoning blend Herbes de Provence. For wellness, lavender essential oil is one of the most researched aromatherapy oils, with studies supporting its use for anxiety reduction and sleep improvement. Dried lavender sachets in closets repel moths naturally, and lavender-infused oils make extraordinary skin care products.</p>
      
      <h2>Drying and Storing</h2>
      <p>Bundle freshly harvested lavender into small bunches, secure with rubber bands, and hang upside down in a warm, dark, well-ventilated space. Flowers dry in 1–3 weeks. Once dry, store in airtight glass jars away from light. Properly stored dried lavender retains its fragrance for 1–2 years.</p>
    `
  },
  {
    id: 2,
    slug: "rosemary-medicinal-culinary",
    title: "Rosemary: Ancient Herb of Memory, Medicine, and Magnificent Flavor",
    excerpt: "Called the 'herb of remembrance' by ancient scholars, rosemary is a powerhouse of flavor and medicine. Learn how to grow, use, and benefit from this Mediterranean classic.",
    category: "Herb Profiles",
    tags: ["rosemary", "Mediterranean", "memory", "cooking"],
    author: "HerbsFinder Editorial",
    date: "2025-04-03",
    readTime: 7,
    featured: true,
    image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=1200&q=80",
    imageAlt: "Fresh rosemary sprigs close-up",
    content: `
      <p>Rosemary (<em>Salvia rosmarinus</em>) has appeared in human history for millennia. Ancient Greek students wore garlands of it during exams, believing it enhanced memory — a claim modern neuroscience is beginning to validate.</p>
      
      <h2>The Memory Connection</h2>
      <p>Recent research published in Therapeutic Advances in Psychopharmacology found that simply being in a room diffused with rosemary aroma improved memory speed and accuracy by up to 15%. The compound 1,8-cineole found in rosemary appears to inhibit the breakdown of acetylcholine, a neurotransmitter critical for memory formation.</p>
      
      <h2>Culinary Mastery</h2>
      <p>Rosemary's piney, resinous flavor stands up to long cooking — making it ideal for roasted meats, stews, and slow-cooked legumes. It's the backbone of Italian cuisine's most comforting dishes. Try infusing olive oil with fresh rosemary for a pantry staple you'll use on everything.</p>
    `
  },
  {
    id: 3,
    slug: "top-10-herbs-beginners",
    title: "The 10 Best Herbs for Beginners: Start Your Herb Garden Today",
    excerpt: "You don't need acres of land or years of gardening experience. These 10 foolproof herbs will reward any beginner with harvests that transform your cooking and wellbeing.",
    category: "Beginner Tips",
    tags: ["beginners", "gardening", "easy herbs", "starter guide"],
    author: "HerbsFinder Editorial",
    date: "2025-04-02",
    readTime: 6,
    featured: false,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
    imageAlt: "Assorted potted herbs on a windowsill",
    content: `<p>Starting an herb garden is one of the most rewarding decisions a home cook or wellness enthusiast can make. Fresh herbs transform ordinary meals into extraordinary ones, and many have impressive health benefits too.</p>`
  },
  {
    id: 4,
    slug: "medicinal-herbs-anxiety",
    title: "5 Powerful Herbs That Science Says Actually Help With Anxiety",
    excerpt: "Millions of people turn to herbal remedies for anxiety relief. But which ones actually work? We dive into the clinical evidence behind five well-studied calming herbs.",
    category: "Medicinal Herbs",
    tags: ["anxiety", "stress", "medicinal", "adaptogen", "mental health"],
    author: "HerbsFinder Editorial",
    date: "2025-04-01",
    readTime: 9,
    featured: true,
    image: "https://images.unsplash.com/photo-1559181567-c3190ca9d5db?w=1200&q=80",
    imageAlt: "Chamomile tea and herbs for relaxation",
    content: `<p>Anxiety disorders affect over 284 million people worldwide, making them the most common mental health challenge globally. While pharmaceutical treatments are effective, many people seek complementary approaches — and herbal medicine offers some genuinely evidence-based options.</p>`
  },
  {
    id: 5,
    slug: "basil-varieties-guide",
    title: "Beyond Sweet Basil: 12 Extraordinary Basil Varieties You Need to Grow",
    excerpt: "Most gardeners know only one kind of basil. But there's a whole world of exotic varieties — from Thai to Holy to Lemon basil — each with unique flavors that will revolutionize your cooking.",
    category: "Growing Guide",
    tags: ["basil", "varieties", "Italian", "Thai", "cooking"],
    author: "HerbsFinder Editorial",
    date: "2025-03-31",
    readTime: 7,
    featured: false,
    image: "https://images.unsplash.com/photo-1618375531912-867984bdfd87?w=1200&q=80",
    imageAlt: "Fresh green basil leaves",
    content: `<p>If you think basil means only the sweet, tender leaves you find at the supermarket, you're missing out on one of the herb world's most diverse plant families.</p>`
  },
  {
    id: 6,
    slug: "wildcrafting-foraging-basics",
    title: "Wildcrafting 101: How to Safely Forage Herbs in the Wild",
    excerpt: "Foraging for wild herbs connects you deeply with nature and provides some of the most potent, untouched plant medicine available. Here's how to start safely and responsibly.",
    category: "Foraging",
    tags: ["foraging", "wildcrafting", "wild herbs", "nature"],
    author: "HerbsFinder Editorial",
    date: "2025-03-30",
    readTime: 10,
    featured: false,
    image: "https://images.unsplash.com/photo-1476782135-2e38efa91fef?w=1200&q=80",
    imageAlt: "Person foraging herbs in a forest",
    content: `<p>For thousands of years, humans sourced all of their plant medicine and many food ingredients from the wild. The practice of wildcrafting — intentionally harvesting wild plants for food and medicine — is experiencing a powerful revival.</p>`
  },
  {
    id: 7,
    slug: "turmeric-golden-milk-benefits",
    title: "Turmeric & Golden Milk: The Ancient Remedy Backed by Modern Science",
    excerpt: "Turmeric has been used in Ayurvedic medicine for over 4,000 years. Today, curcumin — its active compound — is one of the most studied plant substances in the world.",
    category: "Medicinal Herbs",
    tags: ["turmeric", "anti-inflammatory", "Ayurveda", "golden milk"],
    author: "HerbsFinder Editorial",
    date: "2025-03-29",
    readTime: 8,
    featured: false,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200&q=80",
    imageAlt: "Turmeric root and golden spice powder",
    content: `<p>Turmeric (<em>Curcuma longa</em>) might be the most scientifically studied herb on the planet. PubMed, the world's leading medical research database, contains over 16,000 studies mentioning curcumin — its primary bioactive compound.</p>`
  },
  {
    id: 8,
    slug: "herb-drying-preservation-methods",
    title: "6 Methods for Drying & Preserving Herbs: From Air-Drying to Freeze-Drying",
    excerpt: "Preserve the harvest and enjoy summer's herb bounty year-round. We compare all major preservation methods — including which retains the most flavor and medicinal potency.",
    category: "How-To",
    tags: ["preservation", "drying", "storage", "harvest"],
    author: "HerbsFinder Editorial",
    date: "2025-03-28",
    readTime: 7,
    featured: false,
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80",
    imageAlt: "Hanging dried herb bundles",
    content: `<p>A successful harvest is only half the story. Knowing how to properly dry and store your herbs determines whether you enjoy peak flavor and potency all year — or end up with dusty, tasteless powder by December.</p>`
  }
];

// ============================================================
// CATEGORIES (auto-generated from articles above)
// ============================================================
const CATEGORIES = [...new Set(ARTICLES.map(a => a.category))];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function getArticleBySlug(slug) {
  return ARTICLES.find(a => a.slug === slug);
}

function getArticlesByCategory(category) {
  return ARTICLES.filter(a => a.category === category);
}

function getFeaturedArticles() {
  return ARTICLES.filter(a => a.featured);
}

function getRecentArticles(count = 6) {
  return ARTICLES.slice(0, count);
}

function searchArticles(query) {
  const q = query.toLowerCase();
  return ARTICLES.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.tags.some(t => t.includes(q)) ||
    a.category.toLowerCase().includes(q)
  );
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

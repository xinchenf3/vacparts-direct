// ===== PRODUCT DATA =====
const products = [
  {
    model: 'LF08', name: 'Compact Multi-Purpose Pressure Switch',
    pressure: '0.2~45 bar', media: 'Air/Water/Oil/Refrigerant (-30~+120°C)',
    electrical: 'SPST/SPDT 3A 120/240VAC', cert: 'UL, CE',
    ddp: '$8.64', moq: '83 pcs (~10 kg)', img: 'images/LF08.jpg',
    category: 'pressure'
  },
  {
    model: 'LF20', name: 'Multi-Purpose Pressure Switch (No Hysteresis)',
    pressure: '0.5~150 psi (8 ranges)', media: 'Air/Water/Oil/Refrigerant (-40~+120°C)',
    electrical: 'SPST/SPDT 0.5A 250VAC', cert: 'UL, CE',
    ddp: '$14.18', moq: '67 pcs (~10 kg)', img: 'images/LF20.jpg',
    category: 'pressure'
  },
  {
    model: 'LF20-V', name: 'Vacuum Pressure Switch (No Hysteresis)',
    pressure: '1.1~22 in/Hg', media: 'Air only (-40~+120°C)',
    electrical: 'SPST/SPDT 0.5A 250VAC', cert: 'UL, CE',
    ddp: '$14.18', moq: '67 pcs (~10 kg)', img: 'images/LF20V.jpg',
    category: 'vacuum'
  },
  {
    model: 'LF25', name: 'Steam Pressure Switch',
    pressure: '0.2~9 bar (6 ranges)', media: 'Gas/Liquid/Steam (+85/+150°C)',
    electrical: 'SPST/SPDT 16(4)A 250VAC', cert: 'UL, CE',
    ddp: '$14.43', moq: '56 pcs (~10 kg)', img: 'images/LF25.jpg',
    category: 'special'
  },
  {
    model: 'LF32', name: 'Air Differential Pressure Switch',
    pressure: '20~5000 Pa (15 ranges)', media: 'Air/non-flammable gas (-20~+85°C)',
    electrical: 'SPDT 1.5A 250V', cert: 'UL, CE',
    ddp: '$24.94', moq: '50 pcs (~10 kg)', img: 'images/LF32.jpg',
    category: 'differential'
  },
  {
    model: 'LF40', name: 'Pneumatic Remote Pressure Switch',
    pressure: '0.25~15 psi', media: 'Non-corr. gas/liquid (-10~+85°C)',
    electrical: 'SPST/SPDT 0.1~21A 250VAC', cert: 'UL, CE',
    ddp: '$23.09', moq: '63 pcs (~10 kg)', img: 'images/LF40.jpg',
    category: 'special'
  },
  {
    model: 'LF52A', name: 'Compact Differential Pressure Switch',
    pressure: '5~400 kPa (7 ranges)', media: 'Water/Air/Oil (-20~+93°C)',
    electrical: 'SPDT 1 setpoint 3A 250VAC', cert: 'UL, CE',
    ddp: '$81.71', moq: '29 pcs (~10 kg)', img: 'images/LF52A.jpg',
    category: 'differential'
  },
  {
    model: 'LF55', name: 'Refrigeration Pressure Switch',
    pressure: '-0.5~42 bar (13 ranges)', media: 'Refrigerant/Gas/Water/Oil (-30~+120°C)',
    electrical: 'Micro-switch 250VAC', cert: 'UL, CE',
    ddp: '$33.56', moq: '33 pcs (~10 kg)', img: 'images/LF55.jpg',
    category: 'pressure'
  },
  {
    model: 'LF17', name: 'Air Compressor Pressure Switch',
    pressure: '1~35 kgf/cm² (2 models)', media: 'Air (-20~+85°C)',
    electrical: 'NC 20~30A 250VAC', cert: 'UL, CE',
    ddp: '$41.93', moq: '22 pcs (~10 kg)', img: 'images/LF17.jpg',
    category: 'pressure'
  },
  {
    model: 'LFS-01', name: 'Mini PCB-Mount Pressure Switch',
    pressure: '±10~800 mbar', media: 'Non-corr. gas (-10~+90°C)',
    electrical: 'SPST NO 20mA 125/250V', cert: 'UL, CE',
    ddp: '$13.84', moq: '333 pcs (~10 kg)', img: 'images/LFS01.jpg',
    category: 'vacuum'
  }
];

// ===== RENDER PRODUCTS =====
const productGrid = document.getElementById('productGrid');

function renderProducts(filter = 'all') {
  productGrid.innerHTML = '';
  products.forEach(p => {
    if (filter !== 'all' && p.category !== filter) return;
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img"><img src="${p.img}" alt="${p.model}" loading="lazy"></div>
      <div class="product-body">
        <div class="product-model">${p.model}</div>
        <div class="product-name">${p.name}</div>
        <ul class="product-specs">
          <li><strong>Pressure</strong> ${p.pressure}</li>
          <li><strong>Media</strong> ${p.media}</li>
          <li><strong>Electrical</strong> ${p.electrical}</li>
          <li><strong>Cert</strong> ${p.cert}</li>
        </ul>
        <div class="product-price-row">
          <div class="product-ddp">${p.ddp}</div>
          <div class="product-moq">MOQ: ${p.moq} | DDP (incl. duty & VAT)</div>
        </div>
        <button class="compare-check" data-model="${p.model}" style="margin-top:12px;width:100%;padding:8px;background:var(--bg-secondary);color:var(--text-secondary);border:1px solid var(--border);border-radius:6px;cursor:pointer;font-size:0.85rem;transition:all 0.2s">+ Add to Compare</button>
      </div>
    `;
    productGrid.appendChild(card);
  });
  // Re-bind compare buttons
  document.querySelectorAll('.compare-check').forEach(btn => {
    btn.addEventListener('click', () => toggleCompare(btn.dataset.model, btn));
  });
  updateCheckedButtons();
}

// ===== FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// ===== NAV SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);

  // Active section highlight
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 100;
    if (window.scrollY >= top) current = s.getAttribute('id');
  });
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ===== SMOOTH SCROLL OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const inputs = e.target.querySelectorAll('input, textarea');
  const name = inputs[0].value;
  const email = inputs[1].value;
  const company = inputs[2].value || 'N/A';
  const message = inputs[3].value;
  const subject = `VacParts Direct Inquiry from ${name} (${company})`;
  const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`;
  window.location.href = `mailto:xinchenf3@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// ===== INIT =====
renderProducts();

// ===== PRODUCT COMPARE =====
let compareList = [];

function toggleCompare(model, btn) {
  if (compareList.includes(model)) {
    compareList = compareList.filter(m => m !== model);
  } else {
    if (compareList.length >= 4) {
      compareList.shift();
    }
    compareList.push(model);
  }
  updateCompareBar();
  updateCheckedButtons();
}

function updateCheckedButtons() {
  document.querySelectorAll('.compare-check').forEach(btn => {
    if (compareList.includes(btn.dataset.model)) {
      btn.textContent = '✓ Added';
      btn.style.background = 'var(--accent)';
      btn.style.color = '#000';
      btn.style.borderColor = 'var(--accent)';
    } else {
      btn.textContent = '+ Add to Compare';
      btn.style.background = 'var(--bg-secondary)';
      btn.style.color = 'var(--text-secondary)';
      btn.style.borderColor = 'var(--border)';
    }
  });
}

function updateCompareBar() {
  const bar = document.getElementById('compareBar');
  const count = document.getElementById('compareCount');
  if (compareList.length > 0) {
    bar.style.display = 'flex';
    count.textContent = `${compareList.length} model(s) selected`;
  } else {
    bar.style.display = 'none';
  }
}

document.getElementById('compareBtn').addEventListener('click', () => {
  if (compareList.length < 2) return;
  const selected = products.filter(p => compareList.includes(p.model));
  const table = document.getElementById('compareTable');
  table.style.display = 'block';
  table.innerHTML = `
    <h3 style="color:var(--text-primary);margin-bottom:16px">Product Comparison</h3>
    <div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-size:0.85rem">
      <thead>
        <tr style="background:var(--bg-card)">
          <th style="padding:10px;border:1px solid var(--border);color:var(--accent)">Model</th>
          ${selected.map(p => `<th style="padding:10px;border:1px solid var(--border);color:var(--text-primary)">${p.model}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:8px;border:1px solid var(--border);color:var(--text-muted);font-weight:600">Type</td>
          ${selected.map(p => `<td style="padding:8px;border:1px solid var(--border);color:var(--text-secondary)">${p.name}</td>`).join('')}
        </tr>
        <tr style="background:var(--bg-card)">
          <td style="padding:8px;border:1px solid var(--border);color:var(--text-muted);font-weight:600">Pressure</td>
          ${selected.map(p => `<td style="padding:8px;border:1px solid var(--border);color:var(--text-secondary)">${p.pressure}</td>`).join('')}
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid var(--border);color:var(--text-muted);font-weight:600">Media</td>
          ${selected.map(p => `<td style="padding:8px;border:1px solid var(--border);color:var(--text-secondary)">${p.media}</td>`).join('')}
        </tr>
        <tr style="background:var(--bg-card)">
          <td style="padding:8px;border:1px solid var(--border);color:var(--text-muted);font-weight:600">Electrical</td>
          ${selected.map(p => `<td style="padding:8px;border:1px solid var(--border);color:var(--text-secondary)">${p.electrical}</td>`).join('')}
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid var(--border);color:var(--text-muted);font-weight:600">Cert</td>
          ${selected.map(p => `<td style="padding:8px;border:1px solid var(--border);color:var(--text-secondary)">${p.cert}</td>`).join('')}
        </tr>
        <tr style="background:var(--bg-card)">
          <td style="padding:8px;border:1px solid var(--border);color:var(--text-muted);font-weight:600">DDP Price</td>
          ${selected.map(p => `<td style="padding:8px;border:1px solid var(--border);color:var(--accent);font-weight:700">${p.ddp}</td>`).join('')}
        </tr>
        <tr>
          <td style="padding:8px;border:1px solid var(--border);color:var(--text-muted);font-weight:600">MOQ</td>
          ${selected.map(p => `<td style="padding:8px;border:1px solid var(--border);color:var(--text-secondary)">${p.moq}</td>`).join('')}
        </tr>
      </tbody>
    </table>
    </div>
  `;
  table.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('clearCompare').addEventListener('click', () => {
  compareList = [];
  updateCompareBar();
  updateCheckedButtons();
  document.getElementById('compareTable').style.display = 'none';
});

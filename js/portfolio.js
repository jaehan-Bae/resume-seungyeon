(function(){
  const wheel = document.querySelector('[data-gallery]');
  if(!wheel) return;

  const list = wheel.querySelector('#pfpGallery') || wheel.querySelector('ul');
  const base = wheel.dataset.base || '';
  const prefix = wheel.dataset.prefix || '';
  const total = Number(wheel.dataset.total || 0);
  const ext = wheel.dataset.ext || 'png';

  const nowEl = document.getElementById('pfpCountNow');
  const totalEl = document.getElementById('pfpCountTotal');
  if(totalEl) totalEl.textContent = String(total || 0);

  if(!list || !base || !prefix || !total) return;

  for(let i=1;i<=total;i++){
    const li = document.createElement('li');
    li.className = 'pfp-gallery__item';

    const img = document.createElement('img');
    img.src = `${base}${prefix}${i}.${ext}`;
    img.alt = `${prefix} screen ${i}`;
    img.loading = 'lazy';

    li.appendChild(img);
    list.appendChild(li);
  }

  function updateNow(){
    if(!nowEl) return;
    const items = list.querySelectorAll('.pfp-gallery__item');
    if(!items.length) return;

    const wheelTop = wheel.getBoundingClientRect().top;
    let current = 1;

    for(let i=0;i<items.length;i++){
      const rect = items[i].getBoundingClientRect();
      if(rect.top - wheelTop <= 40) current = i + 1;
      else break;
    }
    nowEl.textContent = String(current);
  }

  wheel.addEventListener('scroll', updateNow, { passive:true });
  window.addEventListener('resize', updateNow);
  window.addEventListener('load', updateNow);
})();

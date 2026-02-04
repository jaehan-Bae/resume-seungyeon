(() => {
  const wheels = document.querySelectorAll('[data-gallery]');
  if (!wheels.length) return;

  wheels.forEach((wheel) => {
    const list =
      wheel.querySelector('#pfpGallery') ||
      wheel.querySelector('ul');

    const base = wheel.dataset.base || '';
    const ext = wheel.dataset.ext || 'png';

    // 선택 1) custom: "1-1,2-1,..." 처럼 파일명 직접 지정 (확장자 제외)
    const custom = (wheel.dataset.custom || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    // 선택 2) start/end: 100~109 처럼 숫자 범위
    const start = Number(wheel.dataset.start);
    const end = Number(wheel.dataset.end);

    if (!list || !base) return;

    let files = [];

    if (custom.length) {
      files = custom.map(name => `${name}.${ext}`);
    } else if (!Number.isNaN(start) && !Number.isNaN(end) && end >= start) {
      for (let i = start; i <= end; i++) files.push(`${i}.${ext}`);
    } else {
      const prefix = wheel.dataset.prefix || '';
      const total = Number(wheel.dataset.total || 0);
      if (prefix && total) {
        for (let i = 1; i <= total; i++) files.push(`${prefix}${i}.${ext}`);
      } else {
        return;
      }
    }

    // 렌더
    list.innerHTML = '';
    files.forEach((file, idx) => {
      const li = document.createElement('li');
      li.className = 'pfp-gallery__item';

      const img = document.createElement('img');
      img.src = `${base}${file}`;
      img.alt = `screen ${idx + 1}`;
      img.loading = 'lazy';

      li.appendChild(img);
      list.appendChild(li);
    });

    // 1~n 카운트
    // ✅ wheel마다 자기 섹션 안의 카운트를 찾는다
    const section = wheel.closest('.pfp-section');
    const countWrap = section ? section.querySelector('.pfp-count') : null;
    const nowEl = countWrap ? countWrap.querySelector('.pfpCountNow') : null;
    const totalEl = countWrap ? countWrap.querySelector('.pfpCountTotal') : null;

    // ✅ wheel === wheels[0] 조건 삭제: 각 갤러리마다 카운트 적용
    if (totalEl) totalEl.textContent = String(files.length);

    const updateNow = () => {
      if (!nowEl) return;

      const items = list.querySelectorAll('.pfp-gallery__item');
      if (!items.length) return;

      const wheelTop = wheel.getBoundingClientRect().top;
      let current = 1;

      for (let i = 0; i < items.length; i++) {
        const rect = items[i].getBoundingClientRect();
        if (rect.top - wheelTop <= 40) current = i + 1;
        else break;
      }
      nowEl.textContent = String(current);
    };

    wheel.addEventListener('scroll', updateNow, { passive: true });
    window.addEventListener('resize', updateNow);
    window.addEventListener('load', updateNow);
    updateNow();

  });
})();

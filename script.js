// SafeSteps - Make it functional & professional

document.addEventListener('DOMContentLoaded', () => {

  // 1. SMOOTH SCROLL for all buttons/links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. NAVBAR SHADOW on scroll
  const nav = document.querySelector('nav, header, .navbar');
  window.addEventListener('scroll', () => {
    if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.15)' : 'none';
  });

  // 3. FADE-IN ANIMATION on scroll
  const revealElements = document.querySelectorAll('.card, .hero-box, .feature, section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  // 4. ANIMATED COUNTERS - find numbers like 120, 45 etc and animate them
  document.querySelectorAll('.stat-number, .stat h3, .counter').forEach(el => {
    const final = parseInt(el.textContent);
    if (isNaN(final)) return;
    let current = 0;
    const step = Math.ceil(final / 50);
    const timer = setInterval(() => {
      current += step;
      if (current >= final) { el.textContent = final + '+'; clearInterval(timer); }
      else el.textContent = current;
    }, 30);
  });

  // 5. REPORT FORM - save to browser + show success
  const reportForm = document.querySelector('#report-form, form');
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get values
      const title = reportForm.querySelector('input[type="text"]')?.value || 'New Hazard';
      const desc = reportForm.querySelector('textarea')?.value || '';
      
      if (!title || !desc) {
        showToast('Please fill in all fields ❌', 'error');
        return;
      }

      // Generate tracking ID like ST-2847
      const trackingId = 'ST-' + Math.floor(1000 + Math.random() * 9000);
      
      // Save to localStorage
      const reports = JSON.parse(localStorage.getItem('safesteps_reports') || '[]');
      reports.push({ id: trackingId, title, desc, status: 'In Progress', date: new Date().toLocaleDateString() });
      localStorage.setItem('safesteps_reports', JSON.stringify(reports));

      showToast(`Report submitted! Your ID is ${trackingId} ✅`, 'success');
      reportForm.reset();

      // Show the ID big so user can copy it
      setTimeout(() => alert(`Save this ID to track your report:\n\n${trackingId}`), 500);
    });
  }

  // 6. TRACK A REPORT - search by ID
  const trackInput = document.querySelector('#track-input, input[placeholder*="Track"], input[placeholder*="ID"]');
  const trackBtn = document.querySelector('#track-btn, button');
  if (trackInput) {
    // Create a result box if not exists
    let resultBox = document.querySelector('#track-result');
    if (!resultBox) {
      resultBox = document.createElement('div');
      resultBox.id = 'track-result';
      resultBox.style.cssText = 'margin-top:12px; padding:14px; border-radius:10px; display:none; font-weight:600;';
      trackInput.parentNode.appendChild(resultBox);
    }

    const doTrack = () => {
      const id = trackInput.value.trim().toUpperCase();
      if (!id) { showToast('Enter a tracking ID first', 'error'); return; }
      const reports = JSON.parse(localStorage.getItem('safesteps_reports') || '[]');
      const found = reports.find(r => r.id === id);
      if (found) {
        resultBox.style.display = 'block';
        resultBox.style.background = '#E6F7EE';
        resultBox.style.color = '#0F3D2E';
        resultBox.innerHTML = `✅ Found: <b>${found.title}</b><br>Status: <b>${found.status}</b><br>Date: ${found.date}`;
      } else {
        resultBox.style.display = 'block';
        resultBox.style.background = '#FFF3CD';
        resultBox.style.color = '#856404';
        resultBox.innerHTML = `🔍 No report found for <b>${id}</b>. Check the ID and try again.`;
      }
    };

    // If there's a track button near it, use it, otherwise Enter key
    trackInput.addEventListener('keypress', e => { if (e.key === 'Enter') doTrack(); });
  }

  // 7. TOAST NOTIFICATION - professional popup
  function showToast(message, type = 'success') {
    let toast = document.querySelector('#toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.style.cssText = 'position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:14px 22px; border-radius:12px; color:white; font-weight:600; z-index:9999; box-shadow:0 10px 30px rgba(0,0,0,0.2); transition:all 0.3s;';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.background = type === 'success' ? '#147A4A' : '#D32F2F';
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 4000);
  }

  // 8. BUTTON HOVER EFFECT - makes buttons feel alive
  document.querySelectorAll('button, .button, .btn, a').forEach(btn => {
    btn.style.transition = 'all 0.2s ease';
    btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-2px)');
    btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0)');
  });

});
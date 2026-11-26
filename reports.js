// SafeSteps - Report a Hazard - Professional JS

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reportForm');
  const hazardType = document.getElementById('hazardType');
  const locationInput = document.getElementById('location');
  const desc = document.getElementById('description');
  const dateInput = document.getElementById('dateNoticed');
  const submitBtn = document.getElementById('submitBtn');

  // 1. Set date to TODAY by default
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  // 2. LIVE CHARACTER COUNT for description
  if (desc) {
    const counter = document.createElement('small');
    counter.style.cssText = 'float:right; color:#888; font-size:12px; margin-top:4px;';
    counter.textContent = '0 / 500 characters';
    desc.parentNode.appendChild(counter);
    desc.setAttribute('maxlength', '500');
    desc.addEventListener('input', () => {
      counter.textContent = `${desc.value.length} / 500 characters`;
      counter.style.color = desc.value.length > 450 ? '#D32F2F' : '#888';
    });
  }

  // 3. VALIDATION - red border if empty, green if ok
  function validate(field, isValid) {
    if (!field) return;
    field.style.border = isValid ? '2px solid #147A4A' : '2px solid #D32F2F';
    field.style.transition = 'border 0.2s';
  }
  [hazardType, locationInput, desc].forEach(f => {
    f?.addEventListener('input', () => validate(f, f.value.trim() !== ''));
  });

  // 4. SUBMIT - save + generate ID + professional success
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isValid = hazardType.value && locationInput.value.trim() && desc.value.trim();
      validate(hazardType, hazardType.value);
      validate(locationInput, locationInput.value.trim());
      validate(desc, desc.value.trim());

      if (!isValid) {
        showToast('Please fill all required fields ❌', false);
        return;
      }

      // Loading state - looks professional
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting... ⏳';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        const trackingId = 'ST-' + Math.floor(1000 + Math.random() * 9000);

        // Save to browser
        const reports = JSON.parse(localStorage.getItem('safesteps_reports') || '[]');
        reports.push({
          id: trackingId,
          type: hazardType.value,
          location: locationInput.value.trim(),
          description: desc.value.trim(),
          date: dateInput.value,
          status: 'Received - Under Review',
          createdAt: new Date().toLocaleString()
        });
        localStorage.setItem('safesteps_reports', JSON.stringify(reports));

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';

        // SUCCESS CARD - replaces form
        form.innerHTML = `
          <div style="text-align:center; padding:30px 10px;">
            <div style="font-size:50px;">✅</div>
            <h2 style="color:#147A4A; margin:10px 0;">Report Submitted!</h2>
            <p>Thank you for keeping your community safe.</p>
            <div style="background:#E6F7EE; padding:18px; border-radius:12px; margin:18px 0;">
              <small style="color:#666;">YOUR TRACKING ID</small>
              <div style="font-size:32px; font-weight:800; letter-spacing:2px; color:#0F3D2E;">${trackingId}</div>
              <small>Save this ID to track your report</small>
            </div>
            <button onclick="location.reload()" style="padding:12px 24px; background:#147A4A; color:white; border:none; border-radius:10px; font-weight:700; cursor:pointer;">Submit Another Report</button>
            <br><br>
            <a href="track.html" style="color:#147A4A; font-weight:600;">Track This Report →</a>
          </div>
        `;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000); // 1 sec fake loading = feels real
    });
  }

  // 5. TOAST
  function showToast(msg, success = true) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.style.cssText = 'position:fixed; bottom:20px; left:50%; transform:translateX(-50%); padding:14px 22px; border-radius:12px; color:white; font-weight:600; z-index:9999; box-shadow:0 10px 30px rgba(0,0,0,0.2);';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.background = success ? '#147A4A' : '#D32F2F';
    t.style.display = 'block';
    setTimeout(() => t.style.display = 'none', 4000);
  }
});
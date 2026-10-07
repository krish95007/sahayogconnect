document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('table-body-target');
  const totalCounter = document.getElementById('stat-total');
  const pendingCounter = document.getElementById('stat-pending');
  const searchInput = document.getElementById('dashboard-search');
  const registrationForm = document.getElementById('worker-registration-form');

  // Master local state array tracking records parameters logs
  let workersDatabase = [
    { id: '#9041', name: 'Ramesh Kumar', skill: 'Electrician', hub: 'Bhopal Central Union', status: 'Awaiting Review' },
    { id: '#9042', name: 'Amit Sharma', skill: 'Plumber', hub: 'Arera Hills Cooperative', status: 'Verified Vetted' },
    { id: '#9043', name: 'Vikram Singh', skill: 'Carpenter', hub: 'Kolar Union Federation', status: 'Awaiting Review' },
    { id: '#9044', name: 'Rajesh Verma', skill: 'Painter', hub: 'Bhopal Central Union', status: 'Verified Vetted' },
    { id: '#9045', name: 'Sanjay Dutt', skill: 'Caregiver', hub: 'Arera Hills Cooperative', status: 'Awaiting Review' }
  ];

  let currentSkillFilter = 'All';
  let currentStatusFilter = 'All';

  // 🔄 RENDER PIPELINE LOOP: Generates the dynamic row interfaces live
  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    let totalCount = 0;
    let pendingCount = 0;

    // STEP 3: Read current live search bar parameter text values string
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';

    workersDatabase.forEach(worker => {
      const matchSearch = worker.name.toLowerCase().includes(searchQuery);
      const matchSkill = (currentSkillFilter === 'All' || worker.skill === currentSkillFilter);
      
      let matchStatus = true;
      if (currentStatusFilter === 'Pending') matchStatus = (worker.status === 'Awaiting Review');
      if (currentStatusFilter === 'Verified') matchStatus = (worker.status === 'Verified Vetted' || worker.status === 'Job Booked 🔒');

      totalCount++;
      if (worker.status === 'Awaiting Review') pendingCount++;

      if (matchSearch && matchSkill && matchStatus) {
        let tradeIcon = '⚡';
        if (worker.skill === 'Plumber') tradeIcon = '💧';
        if (worker.skill === 'Carpenter') tradeIcon = '🔨';
        if (worker.skill === 'Painter') tradeIcon = '🖌️';
        if (worker.skill === 'Caregiver') tradeIcon = '👤';

        // Set action interface elements dynamically based on current worker validation state
        let actionColumnUI = '';
        if (worker.status === 'Awaiting Review') {
          actionColumnUI = `
            <span class="badge badge-amber">🕒 Awaiting Review</span>
            <button class="btn-action approve-btn" data-id="${worker.id}">✓ Approve Vetting</button>
          `;
        } else if (worker.status === 'Verified Vetted') {
          // STEP 4: Inject a booking control button trigger for verified, available labor profiles
          actionColumnUI = `
            <span class="badge badge-green">✓ Verified Vetted</span>
            <button class="btn-book-action book-btn" data-id="${worker.id}">🔒 Step 4: Book Gig</button>
          `;
        } else if (worker.status === 'Job Booked 🔒') {
          actionColumnUI = `<span class="badge" style="background-color: #4b5563; color: #e5e7eb;">💼 Job Dispatched 🔒</span>`;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${worker.id}</td>
          <td>${worker.name}</td>
          <td><span class="table-icon-blue">${tradeIcon}</span> ${worker.skill}</td>
          <td>${worker.hub}</td>
          <td><div class="status-wrapper">${actionColumnUI}</div></td>
        `;
        tableBody.appendChild(row);
      }
    });

    if (totalCounter) totalCounter.innerText = totalCount;
    if (pendingCounter) pendingCounter.innerText = pendingCount;
  }

  // 📥 STEP 1 ENGINE: Capture form inputs and dynamically add to array logs
  if (registrationForm) {
    registrationForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameVal = document.getElementById('workerName').value.trim();
      const skillVal = document.getElementById('workerSkill').value;
      const hubVal = document.getElementById('workerHub').value;
      const generatedId = `#${Math.floor(1000 + Math.random() * 9000)}`;

      workersDatabase.push({
        id: generatedId,
        name: nameVal,
        skill: skillVal,
        hub: hubVal,
        status: 'Awaiting Review' // Enforces step 2 vetting check validation sequences rules
      });

      renderTable();
      registrationForm.reset();
    });
  }

  // 🎛️ STEP 2 & STEP 4 CLICK DISPATCHER: Event Delegation tracking routes handlers
  if (tableBody) {
    tableBody.addEventListener('click', (event) => {
      const targetId = event.target.getAttribute('data-id');
      if (!targetId) return;

      const workerMatch = workersDatabase.find(w => w.id === targetId);
      if (!workerMatch) return;

      if (event.target.classList.contains('approve-btn')) {
        // Step 2 Action: Flip status to verified
        workerMatch.status = 'Verified Vetted';
      } else if (event.target.classList.contains('book-btn')) {
        // Step 4 Action: Lock session availability and simulate booking log rows integration
        workerMatch.status = 'Job Booked 🔒';
        alert(`🚀 Success! Booking initialized for ${workerMatch.name}. Unique log record written safely to relational schemas matrices!`);
      }
      renderTable();
    });
  }

  // ◀️ SIDEBAR NAVIGATION SKILL NAVIGATION FILTER HANDLERS
  const skillItems = document.querySelectorAll('#skill-filter-list li');
  skillItems.forEach(item => {
    item.addEventListener('click', () => {
      skillItems.forEach(li => li.classList.remove('active'));
      item.classList.add('active');
      currentSkillFilter = item.getAttribute('data-skill');
      renderTable();
    });
  });

  // 🔽 VERIFICATION TOGGLE BUTTON CLICK ROUTINES
  document.getElementById('toggle-all')?.addEventListener('click', (e) => switchToggle(e.target, 'All'));
  document.getElementById('toggle-pending')?.addEventListener('click', (e) => switchToggle(e.target, 'Pending'));
  document.getElementById('toggle-verified')?.addEventListener('click', (e) => switchToggle(e.target, 'Verified'));

  function switchToggle(targetElement, filterValue) {
    document.querySelectorAll('.btn-toggle').forEach(b => b.classList.remove('active'));
    targetElement.classList.add('active');
    currentStatusFilter = filterValue;
    renderTable();
  }

  // 🔍 STEP 3 KEYSTROKE SEARCH LISTENER ROUTINE
  searchInput?.addEventListener('input', renderTable);

  // Run initial mapping rendering pass sequence check metrics
  renderTable();
});

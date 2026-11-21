document.addEventListener('DOMContentLoaded', function() {

    // // 1. LOGIKA PERPINDAHAN TAB (Master Data & Penjualan)
    const tabButtons = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(function(button) {
        button.addEventListener('click', function () {
            tabButtons.forEach(function (btn) {
                btn.classList.remove('active');
            })
            tabContents.forEach(function (content) {
                content.classList.remove('active')
            })
            button.classList.add('active');
            const targetId = button.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 2. LOGIKA LIVE SEARCH & FILTER STATUS TABEL
    const actionBars = document.querySelectorAll('.action-bar');

    actionBars.forEach(function (bar) {
        const searchInput = bar.querySelector('.search-input');
        const filterSelect = bar.querySelector('.filter-select');

        // Cari wadah pembungkus terdekat agar filter tidak merusak tabel di tab lain
        const container = bar.closest('.tab-content') || bar.closest('.content-area');
        if (!container) return;

        function filterTable() {
            const tableRows = container.querySelectorAll('tbody tr');
            const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';
            const selectedStatus = (filterSelect && filterSelect.id !== 'filter-month')
                ? filterSelect.value.toLowerCase()
                : '';

            tableRows.forEach(function (row) {
                const rowText = row.textContent.toLowerCase();
                const badge = row.querySelector('.badge');
                const badgeText = badge ? badge.textContent.toLowerCase() : '';

                const matchKeyword = rowText.includes(keyword);
                const matchStatus = selectedStatus === '' || badgeText.includes(selectedStatus);

                if (matchKeyword && matchStatus) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
        if (searchInput) {
            searchInput.addEventListener('input', filterTable);
        }
        if (filterSelect && filterSelect.id !== 'filter-month') {
            filterSelect.addEventListener('change', filterTable);
        }
    });
    // 3. LOGIKA MODAL POP-UP & SIMULASI TAMBAH DATA KLIEN
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    modalTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            const modalId = trigger.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        });
    });

    modalOverlays.forEach(function (overlay) {
        const closeBtn = overlay.querySelector('.modal-close');
        const cancelBtn = overlay.querySelector('.btn-cancel');

        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                overlay.classList.remove('active');
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', function () {
                overlay.classList.remove('active');
            });
        }

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    const formKlien = document.getElementById('form-tambah-klien');
    if (formKlien) {
        formKlien.addEventListener('submit', function (e) {
            e.preventDefault();

            const namaPerusahaan = document.getElementById('input-nama-perusahaan').value.trim();
            const namaPic = document.getElementById('input-nama-pic').value.trim();
            const telepon = document.getElementById('input-telepon').value.trim();
            const email = document.getElementById('input-email').value.trim();

            const tbodyKlien = document.querySelector('#tab-klien tbody');
            if (tbodyKlien) {
                const newRow = `
                    <tr>
                        <td class="ref-code">${namaPerusahaan}</td>
                        <td>${namaPic}</td>
                        <td>${telepon}</td>
                        <td>${email}</td>
                        <td>
                            <span class="action-link">Edit</span>
                            <span class="action-link text-danger">Hapus</span>
                        </td>
                    </tr>
                `;
                tbodyKlien.insertAdjacentHTML('beforeend', newRow);
            }

            formKlien.reset();
            const modalKlien = document.getElementById('modal-klien');
            if (modalKlien) {
                modalKlien.classList.remove('active');
            }
        });
    }
});




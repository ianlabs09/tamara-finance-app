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

        const tableRows = container.querySelectorAll('tbody tr');

        function filterTable() {
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
});




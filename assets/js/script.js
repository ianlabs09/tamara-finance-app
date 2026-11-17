document.addEventListener('DOMContentLoaded', function() {
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
});


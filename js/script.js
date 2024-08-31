document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.drop-diff h3');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const dropContent = this.nextElementSibling;
            dropContent.classList.toggle('show');
        });
    });
});

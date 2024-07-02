document.addEventListener('DOMContentLoaded', () => {
    const templateTabs = document.querySelectorAll('.template_tab');
    templateTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const templateType = tab.dataset.template;
            localStorage.setItem('selectedTemplate', templateType);
            window.location.href = './write_diary.html';
        });
    });
});

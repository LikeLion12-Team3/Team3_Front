document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".create_idea_btn");
    button.addEventListener("click", function() {
        window.location.href = 'write_idea.html';
    });
});
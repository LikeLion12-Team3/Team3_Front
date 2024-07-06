document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector(".create_idea_btn");
    button.addEventListener("click", function() {
        window.location.href = 'write_idea.html';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // 아이디어 자세히 보는 화면으로 이동
    const IdeaContents = document.getElementsByClassName("idea_tab_btn");
    for (let i = 0; i < IdeaContents.length; i++) {
        IdeaContents[i].addEventListener("click", function() {
            window.location.href = 'detail_idea.html';
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    // 뒤로가기 버튼
    const backButton = document.querySelector(".searchBackButton");
    if (backButton) {
        backButton.addEventListener("click", function() {
            window.history.back();
        });
    }

    // 일기 자세히 보는 화면으로 이동
    const diaryContents = document.getElementsByClassName("idea_tab_btn");
    for (let i = 0; i < diaryContents.length; i++) {
        diaryContents[i].addEventListener("click", function() {
            window.location.href = 'view_diary.html';
        });
    }
});
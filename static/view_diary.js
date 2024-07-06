document.addEventListener("DOMContentLoaded", function() {

    // 일기 수정화면으로 이동
    const modifyBtn = document.querySelector(".recordModify");
    modifyBtn.addEventListener("click", function() {
        window.location.href = 'modify_diary.html';
    });
});
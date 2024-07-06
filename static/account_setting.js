document.addEventListener("DOMContentLoaded", function() {
    const cancelBtn = document.getElementById("account_cancel_btn");
    cancelBtn.addEventListener("click", function() {
        window.history.back();
    });
});

//변경사항 저장버튼 - API 연동필요
document.addEventListener("DOMContentLoaded", function() {
    const saveBtn = document.getElementById("account_save_btn");
    saveBtn.addEventListener("click", function() {
        window.history.back();
    });
});

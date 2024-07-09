document.addEventListener("DOMContentLoaded", function () {
    var accountbackbutton = document.querySelector(".account_back_btn");
    accountbackbutton.addEventListener('click', function() {
        window.history.back();
    });
});

var newPasswordInput = document.getElementById('new_password');
        var confirmPasswordInput = document.getElementById('confirm_password');
        var notification = document.getElementById('confirm_new_password_notification');

        function checkPasswordMatch() {
            if (newPasswordInput.value !== confirmPasswordInput.value) {
                notification.style.display = 'block';
            } else {
                notification.style.display = 'none';
            }
        }

        newPasswordInput.addEventListener('input', checkPasswordMatch);
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);

        document.getElementById('signupForm').addEventListener('submit', function(event) {
            if (newPasswordInput.value !== confirmPasswordInput.value) {
                notification.style.display = 'block';
                event.preventDefault(); // 폼 제출을 막음
            }
        });
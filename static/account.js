document.addEventListener("DOMContentLoaded", function () {
    var accountbackbutton = document.querySelector(".account_back_btn");
    accountbackbutton.addEventListener('click', function() {
        window.history.back();
    });
});

//회원가입 기능
var API_SERVER_DOMAIN = "https://api.byuldajul.shop";
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

document.getElementById('signup_form').addEventListener('submit', function(event) {
    event.preventDefault(); //기본 폼 제출 동작 방지

    var formData = new FormData(this);
    var signupData = {
        email: formData.get('email'),
        password: formData.get('password'),
        nickname: formData.get('nickname')
    };

    fetch(API_SERVER_DOMAIN + '/users/signup', {
        method: 'POST',
        headers: {
            'content-Type' : 'application/json'
        },
        body: JSON.stringify(signupData)
    })
    .then(response => {
        if(response.ok) {
            console.log('회원가입 성공')
            alert('회원가입이 완료되었습니다.')
            window.location.replace("/login.html");
        } else if (response.status === 400){
            throw new Error('올바르지 않은 요청입니다.');
        } else if (response.status === 409){
            document.getElementById('email_notification').style.display = 'block';
            // throw new Error('해당 이메일이 이미 존재합니다.');
        } else {
            throw new Error('서버 오류: ' + response.statusText);
        }
    })
    .catch(error => {
        console.error('에러: 회원가입 실패', error);
        alert('회원 가입에 실패하셨습니다.');
    });
})
    
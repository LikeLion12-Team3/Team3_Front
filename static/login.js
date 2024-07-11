document.addEventListener("DOMContentLoaded", function () {
    let API_SERVER_DOMAIN = "https://api.byuldajul.shop";

    document.getElementById("login_form").addEventListener("submit", submitLoginForm);

    function submitLoginForm(event) {
        event.preventDefault(); 

        var email = document.getElementById("email_input").value;
        var password = document.getElementById("password_input").value;
        var error_msg = document.querySelector(".login_error");

        //입력시 에러메세지 다시 안보이게
        document.getElementById("email_input").addEventListener('input', function () {
            error_msg.style.opacity = '0';
        });
        document.getElementById("password_input").addEventListener('input', function () {
            error_msg.style.opacity = '0';
        });

        fetch(API_SERVER_DOMAIN + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'accept': '*/*',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),

        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Login failed");
            }
            return response.json();
        })
        .then((data) => {
            var accessToken = data.accessToken;
            var refreshToken = data.refreshToken;
            // 토큰을 쿠키에 저장
            setCookie("accessToken", accessToken, 1);
            setCookie("refreshToken", refreshToken, 1);
        
            // alert("로그인 성공");
            // console.log(data);
            // 로그인 성공시 아래 주석 해제
            window.location.replace("main.html");
        })
        .catch((error) => {
            // alert("아이디나 비밀번호를 다시 확인해주세요");
            error_msg.style.opacity = "1"; // 에러 메시지 표시
            console.error("Error:", error);
        });
    }

});

function joinFunction() {
    //alert("회원가입 버튼 클릭됨");
    window.location.href = 'account.html';
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  
  function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
}

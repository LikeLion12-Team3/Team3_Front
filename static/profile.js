document.addEventListener("DOMContentLoaded", function () {
  let API_SERVER_DOMAIN = "https://api.byuldajul.shop";

  // 쿠키에서 accessToken을 가져오는 함수
  function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // accessToken 가져오기
  const accessToken = getCookie("accessToken");

  // fetch 요청에 accessToken 헤더 포함시키기
  fetch(API_SERVER_DOMAIN + "/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("username").textContent = data.nickname;
      document.getElementById("email").textContent = data.eamil;
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });

  var profile_btn = document.getElementById("profile_btn");
  profile_btn.addEventListener("click", function () {
    window.location.href = "account_setting.html";
  });

  var withdrawLink = document.getElementById("withdraw");
  withdrawLink.addEventListener("click", function (event) {
    event.preventDefault();
    var confirmWithdraw = confirm("진짜 탈퇴 하시겠습니까?");
    if (confirmWithdraw) {
      alert("탈퇴되었습니다.");
      window.location.href = "login.html";
    }
  });

  var logoutLink = document.getElementById("logout");
  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();
    var confirmlogout = confirm("로그아웃 하시겠습니까?");
    if (confirmlogout) {
      alert("로그아웃 되셨습니다.");
      window.location.href = "login.html";
    }
  });
});

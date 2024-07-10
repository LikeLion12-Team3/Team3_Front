document.addEventListener("DOMContentLoaded", function () {
  let API_SERVER_DOMAIN = "https://api.byuldajul.shop";
  const cancelBtn = document.getElementById("account_cancel_btn");
  cancelBtn.addEventListener("click", function () {
    window.history.back();
  });

  // 쿠키에서 accessToken을 가져오는 함수
  function getCookie(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  const accessToken = getCookie("accessToken");

  // 사용자 정보 가져오기
  fetch(API_SERVER_DOMAIN + "/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("username").value = data.nickname;
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });

  const saveBtn = document.getElementById("account_save_btn");
  saveBtn.addEventListener("click", function () {
    const newNickname = document.getElementById("username").value;
    const currentPassword = document.getElementById("password").value;
    const newPassword = document.getElementById("new_password").value;
    const checkNewPassword =
      document.getElementById("check_new_password").value;

    if (newPassword !== checkNewPassword) {
      document.getElementById("error_new_password").style.display = "block";
      return;
    } else {
      document.getElementById("error_new_password").style.display = "none";
    }

    // 닉네임 변경 요청
    fetch(API_SERVER_DOMAIN + "/users/nickname", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ nickname: newNickname }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Nickname changed:", data);
      })
      .catch((error) => {
        console.error("Error changing nickname:", error);
      });

    // 비밀번호 변경 요청
    fetch(API_SERVER_DOMAIN + "/users/pw", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          document.getElementById("error_password").style.display = "block";
        } else {
          document.getElementById("error_password").style.display = "none";
          console.log("Password changed:", data);
          window.history.back();
        }
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  });
});

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

let API_SERVER_DOMAIN = "https://api.byuldajul.shop";

document.addEventListener('DOMContentLoaded', function() {
    // 쿠키에서 accessToken을 가져오는 함수
    function getCookie(name) {
        let value = `; ${document.cookie}`;
        let parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // accessToken 가져오기
    const accessToken = getCookie("accessToken");
    
    fetch(API_SERVER_DOMAIN + '/idea'+ ideaId, {
        method: 'GET' ,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('아이디어 정보:', data);
    })
    
});
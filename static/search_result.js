document.addEventListener("DOMContentLoaded", function() {

    // Local Storage에서 값을 가져오는 함수
    const hashTitle = document.querySelector(".searchResultTitle");
    const savedInput = localStorage.getItem("diaryInput");
    if (savedInput) {
        console.log("Loaded Input:", savedInput);
        hashTitle.innerHTML = savedInput;
    } else {
        console.log("No input found in Local Storage.");
    }

    // 뒤로가기 버튼
    const backButton = document.querySelector(".searchBackButton");
    if (backButton) {
        backButton.addEventListener("click", function() {
            window.history.back();
        });
    }


    // 일기 모아보기 API 연동
    // 쿠키에서 accessToken을 가져오는 함수
    function getCookie(name) {
        let value = `; ${document.cookie}`;
        let parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // accessToken 가져오기
    const accessToken = getCookie("accessToken");



    // API 호출
    const url = `https://api.byuldajul.shop/diary?query=${savedInput}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(data => {
        // 성공적으로 데이터를 받아왔을 때 확인
        console.log(data);
        console.log(data.length);
        console.log(data[2].title);

        //총 n개의 일기 수정
        let diaryNum = document.getElementById("diaryNum");
        diaryNum.innerText = data.length;


        //컨테이너에 검색된 일기 개수 만큼 자식 추가
        const container = document.querySelector('.search_hash_container');

        for (let i = 0; i < data.length; i++) {
            const ideaTab = document.createElement('div');
            ideaTab.classList.add('idea_tab');

            const ideaContentContainer = document.createElement('div');
            ideaContentContainer.classList.add('idea_content_container');

            const ideaTabTitle = document.createElement('span');
            //글자수 제한
            const maxLength = 30;
            const trimmedTitleText = data[i].title.length > maxLength ? data[i].title.substring(0, maxLength) + '...' : data[i].title;  

            ideaTabTitle.id = 'idea_tab_title';
            ideaTabTitle.textContent = `${trimmedTitleText}`;

            const ideaTabDate = document.createElement('span');
            ideaTabDate.id = 'idea_tab_date';
            ideaTabDate.textContent = formatDate(data[i].createdAt);

            const ideaTabContent = document.createElement('span');
            ideaTabContent.id = 'idea_tab_content';
            //글자수 제한
            const trimmedMainText = data[i].mainText.length > maxLength ? data[i].mainText.substring(0, maxLength) + '...' : data[i].mainText;
            ideaTabContent.textContent = `${trimmedMainText}`;

            ideaContentContainer.appendChild(ideaTabTitle);
            ideaContentContainer.appendChild(ideaTabDate);
            ideaContentContainer.appendChild(ideaTabContent);

            const ideaTabBottom = document.createElement('div');
            ideaTabBottom.classList.add('idea_tab_bottom');

            const ideaTabBtn = document.createElement('button');
            ideaTabBtn.classList.add('idea_tab_btn');
            ideaTabBtn.textContent = '>';
            ideaTabBottom.appendChild(ideaTabBtn);
            ideaTab.appendChild(ideaContentContainer);
            ideaTab.appendChild(ideaTabBottom);
            container.appendChild(ideaTab);

            const diaryContents = document.getElementsByClassName("idea_tab_btn");

            for (let i = 0; i < diaryContents.length; i++) {
                diaryContents[i].addEventListener("click", function() {
                    // diaryId 값을 가져옴
                    const diaryId = `${data[i].id}`;

                    // URL에 diaryId 값을 쿼리 파라미터로 추가
                    const url = `view_diary.html?diaryId=${encodeURIComponent(diaryId)}`;

                    console.log("id: ", diaryId);
                    // 페이지 이동
                    window.location.href = url;
                });
            }



        }


    })
    .catch(error => {
        console.error('보드 정보를 가져오는 중 에러 발생:', error);
        // 에러 처리 로직
    });

});

//createdAt을 문자열로 정제
function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1이 필요
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
}
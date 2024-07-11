document.addEventListener('DOMContentLoaded', function() {
    const API_SERVER_DOMAIN = "https://api.byuldajul.shop";

    document.addEventListener("click", function(event) {
        if (event.target.closest(".create_idea_btn")) {
            window.location.href = 'write_idea.html';
        }
    });

    // 쿠키에서 accessToken을 가져오는 함수
    function getCookie(name) {
        let value = `; ${document.cookie}`;
        let parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // accessToken 가져오기
    const accessToken = getCookie("accessToken");

    // 아이디어 목록 가져오기
    fetch(API_SERVER_DOMAIN + '/idea', {
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
        console.log('아이디어 정보:', data);

        const ideaContainer = document.querySelector('.idea_container');
        const ideaCountElement = document.getElementById('idea_count');

        // 데이터 구조 확인 및 처리
        if (Array.isArray(data)) {
            // 아이디어 탭 HTML 생성
            let ideaTabsHTML = '';

            data.forEach(idea => {
                const { id, title, mainText , createdAt} = idea; // 데이터 구조에 맞게 수정
                const formattedDate = new Date(createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                // title 길이 제한 및 생략 처리
                const maxLength = 50; // 최대 글자 수
                const trimmedTitle = title.length > maxLength ? title.substring(0, maxLength) + '...' : title;

                // mainText 길이 제한 및 생략 처리
                const maxLengthMainText = 22; // 최대 글자 수
                const trimmedMainText = mainText.length > maxLengthMainText ? mainText.substring(0, maxLengthMainText) + '...' : mainText;
                ideaTabsHTML += `
                    <div class="idea_tab">
                        <div class="idea_content_container">
                            <span id="idea_tab_title">${trimmedTitle}</span>
                            <span id="idea_tab_date">${formattedDate}</span>
                            <span id="idea_tab_content">${trimmedMainText}</span>
                        </div>
                        <div class="idea_tab_bottom">
                            <button class="idea_tab_btn" data-idea-id="${id}">></button>
                        </div>
                    </div>
                `;
            });

            // 아이디어 탭 추가
            ideaContainer.innerHTML = `
                <button class="create_idea_btn">
                    <span>새로운 아이디어 작성</span>
                    <i class="fa-solid fa-plus"></i>
                </button>
                ${ideaTabsHTML}
            `;

            // 아이디어 카운트 업데이트
            ideaCountElement.textContent = data.length;

            const tabButtons = document.querySelectorAll('.idea_tab_btn');
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const ideaId = button.dataset.ideaId;
                    console.log('선택된 아이디어 ID:', ideaId);
                    if (ideaId) {
                        // 아이디어 상세 페이지로 이동
                        window.location.href = `detail_idea.html?id=${ideaId}`;
                    }
                });
            });

        } else {
            console.error('Unexpected data structure:', data);
        }
    })
    .catch(error => {
        console.error('아이디어 목록 가져오기 실패:', error);
    });
});

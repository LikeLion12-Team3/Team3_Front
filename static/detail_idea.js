// document.addEventListener("DOMContentLoaded", function() {
//     var modifybutton = document.querySelector('.ideaModify');
//     modifybutton.addEventListener("click", function() {
//         window.location.href = 'modify_idea.html';
//     });
// });


// //마크다운
// document.addEventListener("DOMContentLoaded", function () {
//     // API 연동 시 이 부분 수정
//     const testText = `#제목1
//     ##제목2
//     농업 생산성 예측 모델: 기후, 토양, 작물 데이터를 기반으로 농업 생산성을 예측하여 최적의 재배 전략을 제공하는 머신러닝 모델 개발.
//     의료 이미지 분석: 딥러닝을 이용해 의료 이미지를 분석하고 초기 단계의 질병을 자동으로 진단하는 시스템 구축.
//     개인화 학습 추천 시스템: 학생의 학습 패턴과 성취도를 분석하여 맞춤형 학습 자료와 경로를 제공하는 AI 기반 추천 시스템 개발`;

//     const markdownBoxElements = document.getElementsByClassName("markdownBox");

//     function parse(md) {
//         return parseMd(md);
//     }

//     Array.from(markdownBoxElements).forEach(markdownBox => {
//         markdownBox.innerHTML = parse(testText);
//     });
// });

let API_SERVER_DOMAIN = "https://api.byuldajul.shop"

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const ideaId = urlParams.get('id');

    // 쿠키에서 accessToken을 가져오는 함수
    function getCookie(name) {
        let value = `; ${document.cookie}`;
        let parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // accessToken 가져오기
    const accessToken = getCookie("accessToken");

    if(ideaId) {
        console.log("현재 보고 있는 아이디어 ID: ", ideaId);
        //아이디어 상세 정보 가져오기 (GET)
        fetch(`${API_SERVER_DOMAIN}/idea/${ideaId}`, {
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
            console.log('아이디어 상세 정보:', data);
            const ideaTitleElement = document.getElementById('ideaTitle');
            const ideaDateElement = document.getElementById('ideaDate');
            const ideaContentElement = document.getElementById('ideaContent');
        
            // 데이터를 페이지에 표시
            ideaTitleElement.textContent = data.title;
            const formattedDate = new Date(data.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            ideaDateElement.textContent = formattedDate;
            ideaContentElement.textContent = data.mainText;
        
            // 이미지 박스에 이미지 추가 (여기서는 이미지 주소가 고정되어 있지 않아 예시로 추가하지 않음)
            const ideaImageBox = document.getElementById('ideaImageBox');
            // data.images를 이용하여 각 이미지를 추가하는 코드 필요
        
            // 활동 헤더 추가
            const ideaContentHeader = document.getElementById('ideaContentHeader');
            ideaContentHeader.textContent = data.activityHeader;
        
            // Markdown 형식의 내용 추가
            function parse(md) {
                return parseMd(md);
            }

            const ideaMarkdownBox = document.getElementById('ideaContent');
            ideaMarkdownBox.innerHTML = parse(data.mainText); // parseMd 함수를 사용하여 Markdown을 HTML로 변환
        
            // 수정 버튼 클릭 시 동작
            const modifyButton = document.querySelector('.ideaModify');
            modifyButton.addEventListener('click', function() {
                // 수정 페이지로 이동하는 코드
                window.location.href = `modify_idea.html?id=${data.id}`;
            });
        
            // 삭제 버튼 클릭 시 동작
            const deleteButton = document.querySelector('.ideaDelete');
            if (deleteButton) {
                deleteButton.addEventListener('click', function(event) {
                    // 삭제 요청을 보내는 코드
                    const confirmDelete = confirm('정말로 삭제하시겠습니까?');
                    if (confirmDelete) {
                        deleteIdea(ideaId); // 삭제 함수 호출
                    }
                });
            }
            
        })
        .catch(error => {
            console.error('아이디어 상세 정보 불러오기 실패:', error);
        });
    }
});

// 삭제 함수
function deleteIdea(ideaId) {
     // 쿠키에서 accessToken을 가져오는 함수
     function getCookie(name) {
        let value = `; ${document.cookie}`;
        let parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // accessToken 가져오기
    const accessToken = getCookie("accessToken");
    fetch(`${API_SERVER_DOMAIN}/idea/${ideaId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('아이디어 삭제 성공');
        window.location.replace("idea.html");
    })
    .catch(error => {
        console.error('아이디어 삭제 실패:', error);
        alert('아이디어 삭제에 실패했습니다.');
    });
}
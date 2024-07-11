//ID 값 가져오기
// URL에서 쿼리 문자열을 읽는 함수
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.querySelector('.write_diary_title input');
    const hashtagInput = document.getElementById('hashtag_content');
    const diaryContents = [
        document.getElementById('diary_content1'),
        document.getElementById('diary_content2'),
        document.getElementById('diary_content3'),
        document.getElementById('diary_content4')
    ];
    const saveButton = document.getElementById('diary_save_btn');

    const checkInputs = () => {
        const isTitleFilled = titleInput.value.trim() !== '';
        const isHashtagFilled = hashtagInput.value.trim() !== '';
        const isAnyDiaryContentFilled = diaryContents.some(content => content.value.trim() !== '');

        saveButton.disabled = !(isTitleFilled && isHashtagFilled && isAnyDiaryContentFilled);
    };

    // 초기 상태 설정
    checkInputs();

    // 입력값 변경 감지
    titleInput.addEventListener('input', checkInputs);
    hashtagInput.addEventListener('input', checkInputs);
    diaryContents.forEach(content => content.addEventListener('input', checkInputs));
});



//API 연동
let API_SERVER_DOMAIN = "https://api.byuldajul.shop"

document.addEventListener("DOMContentLoaded", function() {

    //템플릿 설정
    let basicTemplate = "basic";

    //ID 값 가져오기
    const boardId = getQueryParam('boardId');
    console.log("아이디", boardId);
    
     // 쿠키에서 accessToken을 가져오는 함수
     function getCookie(name) {
        let value = `; ${document.cookie}`;
        let parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // accessToken 가져오기
    const accessToken = getCookie("accessToken");

    //다이어리 정보 가져오기
    fetch(`${API_SERVER_DOMAIN}/diary/${boardId}`, {
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
        console.log(data);

        document.getElementById("modify_diary_title").value = data.title;
        document.getElementById("diary_content1").value = data.mainText;
        document.getElementById("diary_content2").value = data.impression;
        document.getElementById("diary_subtitle3").value = data.remark;
        document.getElementById("diary_subtitle4").value = data.plan;
        document.getElementById("hashtag_content").value = data.hashtagNames.join(`\n`);

        //subtitle
        const templateType = data.template.toLowerCase();
        basicTemplate = data.template.toLowerCase();

        const templates = {
            basic: {
                subtitle1: "개발내용",
                subtitle2: "느낀점",
                subtitle3: "특이사항",
                subtitle4: "내일의 계획"
            },
            feature: {
                subtitle1: "신규 기능",
                subtitle2: "이용 방안",
                subtitle3: "개선점",
                subtitle4: "개발 계획"
            },
            docs: {
                subtitle1: "추가된 내용",
                subtitle2: "변경된 내용",
                subtitle3: "관련 의견",
                subtitle4: "문서 수정 계획"
            },
            test: {
                subtitle1: "테스트 방식",
                subtitle2: "진행/결과",
                subtitle3: "개선점",
                subtitle4: "개발 계획"
            },
            android: {
                subtitle1: "핵심 기능",
                subtitle2: "트러블 슈팅",
                subtitle3: "라이브러리/기술",
                subtitle4: "내일의 계획"
            },
            ios: {
                subtitle1: "UI/UX 개선 사항",
                subtitle2: "해결한 문제",
                subtitle3: "개발 가이드라인",
                subtitle4: "테스트/배포 계획"
            },
            node: {
                subtitle1: "구현한 기능",
                subtitle2: "해결한 문제",
                subtitle3: "사용한 패키지",
                subtitle4: "배포/모니터링 계획"
            },
            web: {
                subtitle1: "UI 개선 사항",
                subtitle2: "해결한 문제",
                subtitle3: "성능 최적화",
                subtitle4: "내일의 계획"
            },
            design: {
                subtitle1: "디자인 프로세스",
                subtitle2: "UX 문제 해결",
                subtitle3: "디자인 시스템",
                subtitle4: "협업 계획"
            },
            plan: {
                subtitle1: "논의한 프로젝트 내용",
                subtitle2: "일정관리/리스크 대응",
                subtitle3: "커뮤니케이션 방식",
                subtitle4: "계획"
            },
            react: {
                subtitle1: "구현한 기능",
                subtitle2: "해결한 연동 이슈",
                subtitle3: "새로 적용한 기법",
                subtitle4: "내일의 계획"
            },
            abc: {
                subtitle1: "개발내용",
                subtitle2: "느낀점",
                subtitle3: "특이사항",
                subtitle4: "내일의 계획"
            }
        };

        if (templateType && templates[templateType]) {
            document.getElementById('diary_subtitle1').textContent = templates[templateType].subtitle1;
            document.getElementById('diary_subtitle2').textContent = templates[templateType].subtitle2;
            document.getElementById('diary_subtitle3').textContent = templates[templateType].subtitle3;
            document.getElementById('diary_subtitle4').textContent = templates[templateType].subtitle4;
        }


    })
    .catch((error) => {
        console.error("Error fetching user data:", error);
    });


    //취소버튼
    const cancelBtn = document.getElementById("diary_cancel_btn");
    cancelBtn.addEventListener("click", function() {
        window.location.href = 'view_diary.html';
    });


    const saveBtn = document.getElementById("diary_save_btn");

    //저장버튼 API 연동
    saveBtn.addEventListener("click", function () {
        // 해시태그를 '#'으로 구분하여 배열로 변환
        var hashtagContent = document.getElementById('hashtag_content').value;
        var diaryHashtags = hashtagContent.split('#')
            .map(tag => tag.trim())  // 앞뒤 공백 제거
            .filter(tag => tag.length > 0)  // 빈 태그 제거
            .map(tag => '#' + tag); //#을 붙여서 보낼 수 있도록

        var data = {
            title: document.getElementById("modify_diary_title").value,
            template: basicTemplate,   
            mainText: document.getElementById('diary_content1').value,
            impression: document.getElementById('diary_content2').value,
            remark: document.getElementById('diary_content3').value,
            plan: document.getElementById('diary_content4').value,
            diaryHashtags: diaryHashtags 
        };


        fetch(`${API_SERVER_DOMAIN}/diary/${boardId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                'accept': '*/*',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
                console.log(boardId);
                //window.location.replace("main.html");

                const url = `view_diary.html?diaryId=${encodeURIComponent(boardId)}`;
                // 페이지 이동
                window.location.href = url;

            } else {
                throw new Error('네트워크 에러: ' + response.statusText);
            }
        })
        .catch((error) => {
            console.error("내용 변경 실패", error);
        });
    }); 

    
});


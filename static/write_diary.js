document.addEventListener('DOMContentLoaded', () => {
    const templateType = localStorage.getItem('selectedTemplate');

    const templates = {
        basic: {
            name:"Basic",
            subtitle1: "개발내용",
            subtitle2: "느낀점",
            subtitle3: "특이사항",
            subtitle4: "내일의 계획"
        },
        feature: {
            name:"Feature",
            subtitle1: "신규 기능",
            subtitle2: "이용 방안",
            subtitle3: "개선점",
            subtitle4: "개발 계획"
        },
        docs: {
            name:"Docs",
            subtitle1: "추가된 내용",
            subtitle2: "변경된 내용",
            subtitle3: "관련 의견",
            subtitle4: "문서 수정 계획"
        },
        test: {
            name:"Test",
            subtitle1: "테스트 방식",
            subtitle2: "진행/결과",
            subtitle3: "개선점",
            subtitle4: "개발 계획"
        },
        android: {
            name:"Android",
            subtitle1: "핵심 기능",
            subtitle2: "트러블 슈팅",
            subtitle3: "라이브러리/기술",
            subtitle4: "내일의 계획"
        },
        ios: {
            name:"Ios",
            subtitle1: "UI/UX 개선 사항",
            subtitle2: "해결한 문제",
            subtitle3: "개발 가이드라인",
            subtitle4: "테스트/배포 계획"
        },
        node: {
            name:"Node.js",
            subtitle1: "구현한 기능",
            subtitle2: "해결한 문제",
            subtitle3: "사용한 패키지",
            subtitle4: "배포/모니터링 계획"
        },
        web: {
            name:"Web",
            subtitle1: "UI 개선 사항",
            subtitle2: "해결한 문제",
            subtitle3: "성능 최적화",
            subtitle4: "내일의 계획"
        },
        design: {
            name:"Design",
            subtitle1: "디자인 프로세스",
            subtitle2: "UX 문제 해결",
            subtitle3: "디자인 시스템",
            subtitle4: "협업 계획"
        },
        plan: {
            name:"Plan",
            subtitle1: "논의한 프로젝트 내용",
            subtitle2: "일정관리/리스크 대응",
            subtitle3: "커뮤니케이션 방식",
            subtitle4: "계획"
        },
        react: {
            name:"React Native/Flutter",
            subtitle1: "구현한 기능",
            subtitle2: "해결한 연동 이슈",
            subtitle3: "새로 적용한 기법",
            subtitle4: "내일의 계획"
        }
    };

    if (templateType && templates[templateType]) {
        document.getElementById('write_diary_category').textContent = templates[templateType].name;
        document.getElementById('diary_subtitle1').textContent = templates[templateType].subtitle1;
        document.getElementById('diary_subtitle2').textContent = templates[templateType].subtitle2;
        document.getElementById('diary_subtitle3').textContent = templates[templateType].subtitle3;
        document.getElementById('diary_subtitle4').textContent = templates[templateType].subtitle4;
    }
});

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

document.addEventListener("DOMContentLoaded", function() {
    const cancelButton = document.getElementById("diary_cancel_btn");
    cancelButton.addEventListener("click", function() {
        window.history.back();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
    var day = today.getDate();

    var dateString = year + '년 ' + month + '월 ' + day + '일';
    var h1Element = document.getElementById('write_diary_date');
    h1Element.textContent = dateString;
});

document.getElementById('guideline').addEventListener('click', function() {
    var overlay = this.nextElementSibling;
    overlay.style.opacity = (overlay.style.opacity === '1') ? '0' : '1'; // 토글
});

var API_SERVER_DOMAIN = "https://api.byuldajul.shop"; //URL 주소
//"일기 작성 페이지" ajax 연결 시작 부분 //
document.getElementById('diary_save_btn').addEventListener('click', function() {
     // 해시태그를 '#'으로 구분하여 배열로 변환
     var hashtagContent = document.getElementById('hashtag_content').value;
     var diaryHashtags = hashtagContent.split('#')
     .map(tag => tag.trim())  // 앞뒤 공백 제거
     .filter(tag => tag.length > 0)  // 빈 태그 제거
     .map(tag => '#' + tag); //#을 붙여서 보낼 수 있도록

    var data = {
        title: document.getElementById('write_diary_title').value,
        template: document.getElementById('write_diary_category').textContent,   
        mainText: document.getElementById('diary_content1').value,
        impression: document.getElementById('diary_content2').value,
        remark: document.getElementById('diary_content3').value,
        plan: document.getElementById('diary_content4').value,
        diaryHashtags: diaryHashtags 
    };

    fetch(API_SERVER_DOMAIN + '/diary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            window.location.replace("diary_check.html");
        } else {
            throw new Error('네트워크 에러: ' + response.statusText);
        }
    })
    .catch(error => {
        console.error('에러: 일기 저장 실패', error);
        alert('일기 저장에 실패하셨습니다.');
    });
});
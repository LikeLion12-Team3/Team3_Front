//ID 값 가져오기
// URL에서 쿼리 문자열을 읽는 함수
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

//API 연결
document.addEventListener("DOMContentLoaded", function () {
    // 페이지 로드 시 diaryId 값을 가져옴
    const boardId = getQueryParam('diaryId');


    // 쿠키에서 accessToken을 가져오는 함수
    function getCookie(name) {
        let value = `; ${document.cookie}`;
        let parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // accessToken 가져오기
    const accessToken = getCookie("accessToken");
    

    // API 호출
    fetch(`https://api.byuldajul.shop/diary/${boardId}`, {
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
        console.log('보드 정보:', data);

        const template = data.template.toLowerCase();

        const basicSubtitles = getSubtitle(template);
        console.log(basicSubtitles);

        //제목&날짜 변경
        const recordTitle = document.getElementById("recordTitle");
        recordTitle.innerHTML = data.title;
        const recordDate = document.getElementById("recordDate");
        recordDate.innerHTML = formatDate(data.createdAt);

        
        //내용 합치기
        const mainText = data.mainText; //위치 1
        const impression = data.impression; //위치2
        const remark = data.remark; //위치3
        const plan = data.plan; //위치 4

        let totalText = ``;

        if (data.mainText.length > 1) {
            totalText += `#- ${basicSubtitles[0]}\n${mainText}<br><br>`; // <br> 태그를 추가하여 줄바꿈을 나타냅니다.
        }
        if (data.impression.length > 1) {
            totalText += `#- ${basicSubtitles[1]}\n${impression}<br><br>`;
        }
        if (data.remark.length > 1) {
            totalText += `#- ${basicSubtitles[2]}\n${remark}<br><br>`;
        }
        if (data.plan.length > 1) {
            totalText += `#- ${basicSubtitles[3]}\n${plan}`;
        }
        console.log(totalText);
        


        //마크다운 적용
        const markdownBoxElements = document.getElementsByClassName("markdownBox");

        function parse(md) {
            return parseMd(md);
        }

        Array.from(markdownBoxElements).forEach(markdownBox => {
            markdownBox.innerHTML = parse(totalText);
        });


        //해시태그 적용
        const combinedHash = data.hashtagNames.join(`&nbsp&nbsp&nbsp`); // 공백 문자를 구분자로 사용하여 배열 요소를 하나의 문자열로 합침
        const hashs = document.querySelector(".hashs");
        hashs.innerHTML = combinedHash;



    })
    .catch(error => {
        console.error('보드 정보를 가져오는 중 에러 발생:', error);
        // 에러 처리 로직
    });

    // 날짜 포맷 함수
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
        const day = date.getDate();
        return `${year}년 ${month}월 ${day}일`;
    }


});


document.addEventListener("DOMContentLoaded", function() {

    // 일기 수정화면으로 이동
    const boardId = getQueryParam('diaryId');
    const modifyBtn = document.querySelector(".recordModify");
    modifyBtn.addEventListener("click", function() {
        // window.location.href = 'modify_diary.html';
        const url = `modify_diary.html?boardId=${encodeURIComponent(boardId)}`;
                // 페이지 이동
        window.location.href = url;
    });


});


//마크다운
/*
document.addEventListener("DOMContentLoaded", function () {
    // API 연동 시 이 부분 수정
    const testText = `#제목1
    ##제목2
    농업 생산성 예측 모델: 기후, 토양, 작물 데이터를 기반으로 농업 생산성을 예측하여 최적의 재배 전략을 제공하는 머신러닝 모델 개발.
    의료 이미지 분석: 딥러닝을 이용해 의료 이미지를 분석하고 초기 단계의 질병을 자동으로 진단하는 시스템 구축.
    개인화 학습 추천 시스템: 학생의 학습 패턴과 성취도를 분석하여 맞춤형 학습 자료와 경로를 제공하는 AI 기반 추천 시스템 개발`;

    const markdownBoxElements = document.getElementsByClassName("markdownBox");

    function parse(md) {
        return parseMd(md);
    }

    Array.from(markdownBoxElements).forEach(markdownBox => {
        markdownBox.innerHTML = parse(testText);
    });
});
*/

//템플릿 소제목 분류
function getSubtitle(templateName) {
    const templates = {
        basic: {
            name: "Basic",
            subtitle1: "개발 내용",
            subtitle2: "느낀점",
            subtitle3: "특이사항",
            subtitle4: "내일의 계획"
        },
        feature: {
            name: "Feature",
            subtitle1: "신규 기능",
            subtitle2: "이용 방안",
            subtitle3: "개선점",
            subtitle4: "개발 계획"
        },
        docs: {
            name: "Docs",
            subtitle1: "추가된 내용",
            subtitle2: "변경된 내용",
            subtitle3: "관련 의견",
            subtitle4: "문서 수정 계획"
        },
        test: {
            name: "Test",
            subtitle1: "테스트 방식",
            subtitle2: "진행/결과",
            subtitle3: "개선점",
            subtitle4: "개발 계획"
        },
        android: {
            name: "Android",
            subtitle1: "핵심 기능",
            subtitle2: "트러블 슈팅",
            subtitle3: "라이브러리/기술",
            subtitle4: "내일의 계획"
        },
        ios: {
            name: "Ios",
            subtitle1: "UI/UX 개선 사항",
            subtitle2: "해결한 문제",
            subtitle3: "개발 가이드라인",
            subtitle4: "테스트/배포 계획"
        },
        node: {
            name: "Node.js",
            subtitle1: "구현한 기능",
            subtitle2: "해결한 문제",
            subtitle3: "사용한 패키지",
            subtitle4: "배포/모니터링 계획"
        },
        web: {
            name: "Web",
            subtitle1: "UI 개선 사항",
            subtitle2: "해결한 문제",
            subtitle3: "성능 최적화",
            subtitle4: "내일의 계획"
        },
        design: {
            name: "Design",
            subtitle1: "디자인 프로세스",
            subtitle2: "UX 문제 해결",
            subtitle3: "디자인 시스템",
            subtitle4: "협업 계획"
        },
        plan: {
            name: "Plan",
            subtitle1: "논의한 프로젝트 내용",
            subtitle2: "일정관리/리스크 대응",
            subtitle3: "커뮤니케이션 방식",
            subtitle4: "계획"
        },
        react: {
            name: "React Native/Flutter",
            subtitle1: "구현한 기능",
            subtitle2: "해결한 연동 이슈",
            subtitle3: "새로 적용한 기법",
            subtitle4: "내일의 계획"
        }
    };

    // 해당 템플릿이 존재하는지 확인하고, 존재하면 subtitle 배열을 반환
    if (templates[templateName]) {
        const template = templates[templateName];
        return [template.subtitle1, template.subtitle2, template.subtitle3, template.subtitle4];
    } else {
        // 템플릿이 존재하지 않으면 빈 배열 반환
        return [];
    }
}



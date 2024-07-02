document.addEventListener('DOMContentLoaded', () => {
    const templateType = localStorage.getItem('selectedTemplate');

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
        }
    };

    if (templateType && templates[templateType]) {
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
    const saveButton = document.getElementById('save_btn');

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



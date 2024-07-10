document.addEventListener("DOMContentLoaded", function() {

    // 일기 수정화면으로 이동
    const modifyBtn = document.querySelector(".recordModify");
    modifyBtn.addEventListener("click", function() {
        window.location.href = 'modify_diary.html';
    });

    //임시 마크다운 코드

});


//마크다운
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



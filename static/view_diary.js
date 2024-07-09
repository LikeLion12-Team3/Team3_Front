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
    //API 연동시 이 부분 수정
    const testText = `#제목1
    ##제목2
    오늘 우리는 새로운 모바일 애플리케이션 개발을 위한 첫 번째 회의를 열었다. 주요 기능과 목표 사용자층을 정의하는 기획 단계를 시작했다. 이 과정을 통해 사용자가 앱을 통해 어떤 경험을 얻을지 명확하게 정리할 수 있었다. 팀원들과 함께 다양한 아이디어를 나누고, 최종적으로 프로젝트의 방향성을 설정했다. 기획이 완료된 후, 디자이너는 주요 화면의 레이아웃과 사용자 흐름을 시각적으로 나타내기 위해 와이어프레임을 제작하기 시작했다. 와이어프레임 덕분에 개발팀은 페이지 간의 연결성과 기능 배치를 명확하게 이해할 수 있었다. 클라이언트에게도 초기 디자인 방향에 대해 피드백을 받을 수 있어서 유용했다. 오늘 하루는 매우 생산적이었고, 앞으로의 개발 과정이 기대된다.`;
    
    const markdownBoxElements = document.getElementsByClassName("markdownBox");
    
    if (markdownBoxElements.length > 0) {
        const markdownBox = markdownBoxElements[0];

        function parse() {
            const md = testText;
            markdownBox.innerHTML = parseMd(md);
        }

        parse(); // Initial parse
    }
});



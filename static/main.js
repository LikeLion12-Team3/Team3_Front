function changeImage(event, element) {
    event.preventDefault(); // 기본 링크 동작을 막음

    var icons = document.querySelectorAll('ul li img');
    for (var i = 0; i < icons.length; i++) {
        var img = icons[i];
        var originalSrc = img.getAttribute('src');
        var newSrc = originalSrc.replace('click_', ''); 
        img.setAttribute('src', newSrc);
    }
    
    // 클릭된 이미지의 src 속성을 업데이트
    var clickedImg = element.querySelector('img');
    var currentSrc = clickedImg.getAttribute('src');
    
    if (!currentSrc.includes('click_')) {
        var newSrc = currentSrc.replace('./img/Icon/', './img/Icon/click_');
        clickedImg.setAttribute('src', newSrc);
    }

    // 링크로 이동
    var link = element.getAttribute('href');
    if (link) {
        window.location.href = link;
    }
}

var preloadImages = function (srcs) {
    srcs.forEach(function (src) {
        var img = new Image();
        img.src = src;
    });
};

// 사용할 이미지 경로들을 배열로 지정
var imagePaths = [
    './img/Icon/home_icon.png',
    './img/Icon/click_diary_icon.png',
    './img/Icon/book_icon.png',
    './img/Icon/idea_icon.png'
];

// 페이지 로드 시 이미지 프리로딩
preloadImages(imagePaths);
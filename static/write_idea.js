document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function() {
        var file = this.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var newPreview = document.createElement('div');
                newPreview.className = 'image-preview';
                var newImage = document.createElement('img');
                newImage.src = e.target.result;
                newImage.alt = '이미지 미리보기';
                newPreview.appendChild(newImage);
                document.querySelector('.image_preview_container').appendChild(newPreview);
            };
            reader.readAsDataURL(file);
        }
    });
    
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
    var day = today.getDate();

    var dateString = year + '년 ' + month + '월 ' + day + '일';
    var h1Element = document.getElementById('write_idea_date');
    h1Element.textContent = dateString;
});
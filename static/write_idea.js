document.addEventListener('DOMContentLoaded', function() {
    var fileInput = document.getElementById('fileInput');
var container = document.querySelector('.image_preview_container');
var uploadBox = document.querySelector('.upload-box');
var maxImages = 4;

fileInput.addEventListener('change', function() {
    var files = this.files;
    if (files.length > maxImages) {
        alert('최대 4개까지만 업로드할 수 있습니다.');
        return;
    }
    
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
        reader.onload = function(e) {
            addImagePreview(e.target.result);
            checkImageCount();
        };
        reader.readAsDataURL(file);
    }
});

function addImagePreview(src) {
    var newPreviewContainer = document.createElement('div');
    newPreviewContainer.className = 'image-preview-container';

    var newImage = document.createElement('img');
    newImage.src = src;
    newImage.alt = '이미지 미리보기';
    newImage.className = 'image-preview';

    var deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHTML = '&times;';
    deleteButton.onclick = function() {
        newPreviewContainer.remove();
        checkImageCount();
    };

    newPreviewContainer.appendChild(newImage);
    newPreviewContainer.appendChild(deleteButton);

    container.insertBefore(newPreviewContainer, uploadBox);

    // 업로드 박스를 이동
    container.appendChild(uploadBox);

    uploadBox.style.display = 'flex';

    checkImageCount();
}

function checkImageCount() {
    var previews = document.querySelectorAll('.image-preview-container');
    if (previews.length >= maxImages) {
        uploadBox.style.display = 'none';
    } else {
        uploadBox.style.display = 'flex';
    }
}

    
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
    var day = today.getDate();

    var dateString = year + '년 ' + month + '월 ' + day + '일';
    var h1Element = document.getElementById('write_idea_date');
    h1Element.textContent = dateString;
});
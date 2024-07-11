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
    var h1Element = document.getElementById('modify_idea_date');
    h1Element.textContent = dateString;
});

document.addEventListener('DOMContentLoaded', function() {
    // DOM이 로드된 후 초기 상태를 설정하기 위해 이벤트 리스너를 추가합니다.
    var titleInput = document.querySelector('.modify_idea_title input');
    var ideaContentInput = document.getElementById('idea_content1');
    var saveButton = document.getElementById('idea_save_btn');

    // 입력 필드에 입력이 발생할 때마다 호출될 함수를 정의합니다.
    function checkInputs() {
        var titleValue = titleInput.value.trim();
        var ideaContentValue = ideaContentInput.value.trim();

        // 제목과 아이디어 내용 모두 입력되어 있으면 저장 버튼을 활성화합니다.
        if (titleValue !== '' && ideaContentValue !== '') {
            saveButton.disabled = false;
        } else {
            saveButton.disabled = true;
        }
    }

    // 입력 필드에 입력 이벤트 리스너를 추가합니다.
    titleInput.addEventListener('input', checkInputs);
    ideaContentInput.addEventListener('input', checkInputs);

    // 초기 상태 설정을 위해 한 번 호출합니다.
    checkInputs();
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('idea_cancel_btn').addEventListener('click', function() {
        window.history.back();
    });
});

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

    //아이디어 정보 가져오기
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
        document.getElementById("modify_idea_title").value = data.title;
        document.getElementById("idea_content1").value = data.mainText;
    })
    .catch((error) => {
        console.error("Error fetching user data:", error);
    });

    const saveBtn = document.getElementById("idea_save_btn");
    saveBtn.addEventListener("click", function () {
        const newTitle = document.getElementById("modify_idea_title").value;
        const newMaintext = document.getElementById("idea_content1").value;
        
        fetch(`${API_SERVER_DOMAIN}/idea/${ideaId}`,{
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify({
                title: newTitle,
                mainText: newMaintext,
            }),
        })
        .then(() => {
            console.log(newMaintext);
            console.log("변경되었습니다.");
            window.location.href = `detail_idea.html?id=${ideaId}`;
        })
        .catch((error) => {
            console.error("내용 변경 실패", error);
        });
    });  
});
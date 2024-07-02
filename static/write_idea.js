document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("file_upload");
    const previewContainer = document.getElementById("preview_container");

    fileInput.addEventListener("change", function() {
        const files = fileInput.files;
        previewContainer.innerHTML = "";

        if (files.length > 4) {
            alert("최대 4개의 파일만 선택할 수 있습니다.");
            fileInput.value = "";  // 선택을 초기화
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.className = "preview_image";
                previewContainer.appendChild(img);
            };

            reader.readAsDataURL(file);
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('search-input2');
    const searchButton = document.getElementById('search-button2');
    const recentModal = document.getElementById('recent-modal');
    const recentSearches = document.getElementById('recent-searches');

    
    let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];


    function updateRecentSearches() {
        //API 연동
        //태그 개수 API 연동
        console.log(searches, searches[2]);

        // 쿠키에서 accessToken을 가져오는 함수
        function getCookie(name) {
            let value = `; ${document.cookie}`;
            let parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        }
        // accessToken 가져오기
        const accessToken = getCookie("accessToken");


        recentSearches.innerHTML = '';
        searches.forEach(search => {
            const searchWrapper = document.createElement('div');
            searchWrapper.className = 'search-item-wrapper'; // 클래스명 설정
    
            const searchItem = document.createElement('span');
            searchItem.textContent = search;
            searchItem.classList.add('search-item'); // 클래스 추가
    
            const searchNum = document.createElement('span');
            searchNum.textContent = "12"; // 추후에 API 연동시 이 부분 수정
            searchNum.classList.add('search-num'); // 클래스 추가
    
            const searchStr = document.createElement('span');
            searchStr.textContent = "개 태그됨"; // 추후에 API 연동시 이 부분 수정
            searchStr.classList.add('search-str'); // 클래스 추가

            //API 연결
            const url = `https://api.byuldajul.shop/diary?query=${search.substring(1)}`;
            fetch(url, {
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
                console.log(search, data.length);
                searchNum.textContent = data.length

            })
            .catch(error => {
                console.error('보드 정보를 가져오는 중 에러 발생:', error);
                // 에러 처리 로직
            });

            searchWrapper.appendChild(searchItem);
            searchWrapper.appendChild(searchNum);
            searchWrapper.appendChild(searchStr);

            // searchWrapper에 클릭 이벤트 추가
            searchWrapper.addEventListener('click', () => {
                searchInput.value = search; // 검색어 입력 (예: 검색어를 클릭한 경우)
                saveInput(search);
                //window.location.href = 'search_result.html'; // 클릭 시 페이지 이동
                recentModal.style.display = 'none'; // 모달 닫기
            });
            recentSearches.appendChild(searchWrapper);
        });
    }


    searchInput.addEventListener('focus', () => {
        if (searches.length > 0) {
            recentModal.style.display = 'block';
        }
    

        // 포커스가 되면 검색어 앞에 "#" 추가
        if (!searchInput.value.startsWith('#')) {
            searchInput.value = `#${searchInput.value}`;
        }

    });

    searchInput.addEventListener('blur', () => {
        // recentModal.style.display = 'none';
        // searchInput.value = '';
        searchInput.focus();
    });




    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm && !searches.includes(searchTerm)) {
                searches.unshift(searchTerm); // 배열의 맨 앞에 추가
                if (searches.length > 5) {
                    searches.pop(); // 최근 검색어 5개만 유지
                }
                localStorage.setItem('recentSearches', JSON.stringify(searches));
                updateRecentSearches();

            }
            searchInput.value = searchInput.value;
            saveInput(searchInput.value);
            //window.location.href = 'search_result.html';
            recentModal.style.display = 'none';
            // alert(`검색: ${searchTerm}`); // 검색 동작을 시뮬레이션하는 알림
        }

        if (event.key === 'Delete' || event.key === 'Backspace') {
            if (searchInput.value.length < 1) {
                searchInput.value = '#';
            }
        }
    });



    searchButton.addEventListener('click', () => {
        event.preventDefault();
        document.getElementById('search-input2').focus();
        if (searchInput.value.length > 1) {
            const searchTerm = searchInput.value.trim();
            if (searchTerm && !searches.includes(searchTerm)) {
                searches.unshift(searchTerm); // 배열의 맨 앞에 추가
                if (searches.length > 5) {
                    searches.pop(); // 최근 검색어 5개만 유지
                }
                localStorage.setItem('recentSearches', JSON.stringify(searches));


                updateRecentSearches();


            }
            saveInput(searchInput.value);
            //alert(`검색: ${searchTerm}`); // 검색 동작을 시뮬레이션하는 알림
            //window.location.href = 'search_result.html';
            recentModal.style.display = 'none';
            //searchInput.value = '#';
            document.getElementById('search-input2').blur();
        }
    });

    //기본값 focus
    searchInput.focus();
    recentModal.style.display = 'block';

    updateRecentSearches();


    //태그 개수 API 연동
    console.log(searches, searches[2]);


});

// Input 값을 저장하는 함수
function saveInput(inputValue) {
    console.log(inputValue);
    localStorage.setItem("diaryInput", inputValue); // Local Storage에 저장
    window.location.href = 'search_result.html'
}


//API 연동
import { getCookie, getAccessTokenWithRefreshToken } from './tokenUtils.js';

let API_SERVER_DOMAIN = "https://api.byuldajul.shop";

//[API] User 정보 가져오기
function getUser(accessToken) {
    return fetch(API_SERVER_DOMAIN + "/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        //console.log(response)
        if (!response.ok) {
          throw new Error("Failed to refresh access token");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data)
    });
}


//캘린더에 잔디 표시
function commits(accessToken, year, month) {
    const url = `${API_SERVER_DOMAIN}/commits?year=${year}&month=${month}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch commits");
        }
        return response.json();
    })
    .then((data) => {
        return data;
    });
}


document.addEventListener('DOMContentLoaded', function() {
    //토큰 가져오기
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    console.log(accessToken);
    console.log(refreshToken);
    
    if (accessToken) {
        // accessToken이 있는 경우, 서버에 사용자 정보 요청
        getUser(accessToken)
          .then((name) => {
            //코드 작성
          })
          .catch((error) => {
            console.error("User info error:", error);
            // accessToken이 만료된 경우 refresh 토큰을 사용하여 새로운 accessToken을 가져옴
            if (refreshToken) {
              getAccessTokenWithRefreshToken(refreshToken)
                .then((newAccessToken) => {
                  // 새로운 accessToken으로 사용자 정보 요청
                  getUser(newAccessToken)
                    .then((name) => {
                      //코드작성
                      accessToken = newAccessToken;
                    })
                    .catch((error) => {
                      console.error(
                        "User info error after refreshing token:",
                        error
                      );
                    });
                })
                .catch((error) => {
                  console.error("Failed to refresh access token:", error);
                });
            }
        });
    }


    //잔디를 위한 commits API 호출
    // commits(accessToken, "2024", '07')
    // .then((data) => {
    //     let dataArray = [];
    //     dataArray = dataArray.concat(data);
        
    //     for (var i=0; i<dataArray.length; i++) {
    //         console.log(dataArray[i]["day"]);
    //         console.log(dataArray[i]["commitCount"]);
    //     }
    // })
    // .catch((error) => {
    //     console.error("Error:", error); 
    // });


    //검색 화면으로 이동
    const searchContainer = document.querySelector('.search-container');
        searchContainer.addEventListener('click', function() {
            window.location.href = 'search_diary.html';
        });

    //오늘 날짜 로드
    const calendarBody = document.getElementById('calendarBody');
    const monthYear = document.getElementById('monthYear');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    const diaryDateDiv = document.getElementById('diary-date');

    //기록 내 날짜
    const recordDate = document.getElementById('recordDate');
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    function generateCalendar(month, year, index, count) {
        //배열로 변경
        let arr = Object.values(index);
        let countArr = Object.values(count);
        console.log(arr);
        calendarBody.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();
        let date = 1;
        let nextMonthDate = 1;
        let prevMonthStart = prevMonthDays - firstDay + 1;

        monthYear.textContent = `${monthNames[month]} ${year}`;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.textContent = prevMonthStart++;
                    cell.classList.add('not-current-month');
                } else if (date > daysInMonth) {
                    cell.textContent = nextMonthDate++;
                    cell.classList.add('not-current-month');
                } else {
                    const currentDate = date;
                    cell.textContent = currentDate;
                    // 잔디 색깔 변경
                    //console.log(cell);
                    if (arr.includes(cell.textContent) && countArr[parseInt(cell.textContent)] === 1) {
                        cell.style.backgroundColor = '#11E5B333';
                    } else if (arr.includes(cell.textContent) && countArr[parseInt(cell.textContent)] === 2) {
                        cell.style.backgroundColor = '#11E5B366';
                    } else if (arr.includes(cell.textContent) && countArr[parseInt(cell.textContent)] === 3) {
                        cell.style.backgroundColor = '#11E5B399';
                    } else if (arr.includes(cell.textContent) && countArr[parseInt(cell.textContent)] === 4) {
                        cell.style.backgroundColor = '#11E5B3CC';
                    } else if (arr.includes(cell.textContent) && countArr[parseInt(cell.textContent)] >= 5) {
                        cell.style.backgroundColor = '#11E5B3';
                    }
                    cell.addEventListener('click', () => {
                        updateDiaryDate(year, month, currentDate);
                    });
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    function updateDiaryDate(year, month, date) {
        const monthStr = String(month + 1);
        const dateStr = String(date);
        const dateText = `${year}년 ${monthStr}월 ${dateStr}일`;
        diaryDateDiv.innerHTML = `<span class="date">${dateText}</span>의 일기`;
        recordDate.innerHTML = `<span class="date">${dateText}</span>의 일기`;
        // alert(`${dateText}입니다`);
    }

    prevMonth.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        //generateCalendar(currentMonth, currentYear, [], []);

        //잔디 API 연결
        commits(accessToken, `${currentYear}`, `${currentMonth+1}`)
        .then((data) => {
            let dataArray = [];
            dataArray = dataArray.concat(data);
            let zeroArray = Array.from({ length: 31 }, () => 0);
            console.log(zeroArray);
            let dayIndex = [];
            
            for (var i=0; i<dataArray.length; i++) {
                // console.log(dataArray[i]["day"]);
                // console.log(dataArray[i]["commitCount"]);
                //커밋이 되어있는 날짜를 전부 dayIndex에 추가
                dayIndex.push(`${dataArray[i]["day"]}`);
                //count 정도를 저장
                zeroArray[dataArray[i]["day"]] = dataArray[i]["commitCount"];
            }
            // console.log(dayIndex);
            // console.log(zeroArray);
            generateCalendar(currentMonth, currentYear, dayIndex, zeroArray);

        })
        .catch((error) => {
            console.error("Error:", error); 
        });

    });

    nextMonth.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        // generateCalendar(currentMonth, currentYear);

        //잔디 API 연결
        commits(accessToken, `${currentYear}`, `${currentMonth+1}`)
        .then((data) => {
            let dataArray = [];
            dataArray = dataArray.concat(data);
            let zeroArray = Array.from({ length: 31 }, () => 0);
            console.log(zeroArray);
            let dayIndex = [];
            
            for (var i=0; i<dataArray.length; i++) {
                console.log(dataArray[i]["day"]);
                console.log(dataArray[i]["commitCount"]);
                //커밋이 되어있는 날짜를 전부 dayIndex에 추가
                dayIndex.push(`${dataArray[i]["day"]}`);
                //count 정도를 저장
                zeroArray[dataArray[i]["day"]] = dataArray[i]["commitCount"];
            }
            console.log(dayIndex);
            console.log(zeroArray);
            generateCalendar(currentMonth, currentYear, dayIndex, zeroArray);

        })
        .catch((error) => {
            console.error("Error:", error); 
        });

    });

    //잔디 API 연결
    commits(accessToken, `${currentYear}`, `${currentMonth+1}`)
    .then((data) => {
        let dataArray = [];
        dataArray = dataArray.concat(data);
        let zeroArray = Array.from({ length: 31 }, () => 0);
        console.log(zeroArray);
        let dayIndex = [];
        
        for (var i=0; i<dataArray.length; i++) {
            console.log(dataArray[i]["day"]);
            console.log(dataArray[i]["commitCount"]);
            //커밋이 되어있는 날짜를 전부 dayIndex에 추가
            dayIndex.push(`${dataArray[i]["day"]}`);
            //count 정도를 저장
            zeroArray[dataArray[i]["day"]] = dataArray[i]["commitCount"];
        }
        console.log(dayIndex);
        console.log(zeroArray);
        generateCalendar(currentMonth, currentYear, dayIndex, zeroArray);

    })
    .catch((error) => {
        console.error("Error:", error); 
    });

    updateDiaryDate(currentYear, currentMonth, new Date().getDate());


    // 일기 수정화면으로 이동
    const modifyBtn = document.querySelectorAll(".recordModify");
    modifyBtn.forEach(function(btn) {
        btn.addEventListener("click", function() {
            window.location.href = 'modify_diary.html';
        });
    });

});

document.addEventListener('DOMContentLoaded', (event) => {
    const deleteButtons = document.querySelectorAll('.recodeDelete');

    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const confirmation = confirm("진짜 삭제 하시겠습니까?");
            if (confirmation) {
                const detailRecord = button.closest('.detailRecord');
                detailRecord.remove();
            }
        });
    });
});


// 마크다운
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



document.addEventListener("DOMContentLoaded", function () {
    const boardId = 14; // 가져올 보드의 ID (예시로 7을 사용)

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

        // 필요한 데이터 추출
        const title = data.title;
        const createDate = formatDate(data.createdAt); // 날짜 포맷팅 함수 사용
        const mainText = data.mainText;
        const template = data.template;
        const impression = data.impression;
        const remark = data.remark;
        const plan = data.plan;

        // 해시태그가 올바르게 받아졌는지 확인
        console.log('Hashtags:', data.hashtagNames);

        let hashtagsHTML = '';
        if (Array.isArray(data.hashtagNames) && data.hashtagNames.length > 0) {
            hashtagsHTML = data.hashtagNames.map(tag => `<span class="hashs">${tag}</span>`).join(' ');
        }

        // HTML 요소에 데이터 적용
        const detailRecord = document.createElement('div');
        detailRecord.classList.add('detailRecord');

        const combinedText = `
            ${mainText}\n
            ${impression}\n
            ${remark}\n
            ${plan}\n
        `;

        // Use parseMd function to convert the combined Markdown text to HTML
        const parsedContent = parseMd(combinedText);

        detailRecord.innerHTML = `
            <p id="recordTitle">${title}</p>
            <p id="recordDate">${createDate}의 일기</p>
            <div id="recordContentHeader">
                ${template}
            </div>
            <div class="markdownBox" id="recordContent">
                ${parsedContent}
            </div>
            <div class="hashBox">
                <div id="RecordHashList">
                    ${hashtagsHTML}
                </div>
                <div>
                    <button class="recordModify">수정</button>
                    <button class="recodeDelete">삭제</button>
                </div>
            </div>
        `;

        // 보드 정보가 들어갈 부모 요소
        const recordParent = document.querySelector('.record');
        // 부모 요소에 추가
        recordParent.appendChild(detailRecord);

        const recordNumElement = document.getElementById('recordNum');
        const currentCount = parseInt(recordNumElement.textContent) || 0;
        recordNumElement.textContent = currentCount + 1;

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

    // Assuming parseMd is defined somewhere else to convert Markdown to HTML
    function parseMd(md) {
        // Add your Markdown parsing logic here
        return md; // Replace with actual parsed HTML
    }
});



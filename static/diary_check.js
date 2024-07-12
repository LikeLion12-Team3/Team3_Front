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

//그날의 별다줄
function todaysummary(accessToken, year, month, date){
    const url = `${API_SERVER_DOMAIN}/summary?year=${year}&month=${month}&day=${date}`;

    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
        },
    })
    .then((response) => {
        if(!response.ok) {
            throw new Error("Failed to fetch commits");
        }
        return response.json();
    })
    .then((data) => {
        console.log('보드 정보:', data);
        // '오늘의 별다줄' 리스트를 가져옴

        
        const todayList = document.querySelector('.todayContainer ul');

        // data.summary 문자열을 줄 단위로 분할하여 배열로 변환
        const summaries = data.summary.split('\n');
        console.log("summaries", summaries);

        // 각 요약을 <li> 요소로 추가
        summaries.forEach((summary, index) => {
            if (summary.trim() !== "") { // 빈 줄 무시
                const listItem = document.createElement('li');
                listItem.textContent = `${summary}`;
                todayList.appendChild(listItem);
            }
        });
        
    })
    .catch(error => {
        console.error('Fetch error:', error);
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
                        // 모든 .detailRecord 요소 선택
                        const detailRecords = document.querySelectorAll(".detailRecord");
                        // 각 요소에 remove 적용
                        detailRecords.forEach(detailRecord => detailRecord.remove());

                        let monthStr = (month+1) < 10 ? '0' + (month+1) : (month+1).toString();
                        let dateStr = currentDate < 10 ? '0' + currentDate : currentDate.toString();
                        const choosedDate = `${year}-${monthStr}-${dateStr}`;

                        dateDiaryLoad(accessToken, choosedDate);
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
        //recordDate.innerHTML = `<span class="date">${dateText}</span>의 일기`;
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
            //console.log(zeroArray);
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
            let dayIndex = [];
            let zeroArray = Array.from({ length: 31 }, () => 0);
            generateCalendar(currentMonth, currentYear, dayIndex, zeroArray);
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
            //console.log(zeroArray);
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
            let dayIndex = [];
            let zeroArray = Array.from({ length: 31 }, () => 0);
            generateCalendar(currentMonth, currentYear, dayIndex, zeroArray);
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
        let dayIndex = [];
            let zeroArray = Array.from({ length: 31 }, () => 0);
            generateCalendar(currentMonth, currentYear, dayIndex, zeroArray);
    });

    updateDiaryDate(currentYear, currentMonth, new Date().getDate());



    //날짜에 해당하는 일기조회 API 연동
    let todayMonth = (currentMonth+1) < 10 ? '0' + (currentMonth+1) : (currentMonth+1).toString();
    let todayday = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate().toString();
    const todaydate = `${currentYear}-${todayMonth}-${todayday}`;
    dateDiaryLoad(accessToken, todaydate);

    //오늘의 일기 요약
    todaysummary(accessToken, `${currentYear}`, `${currentMonth+1}`, `${new Date().getDate()}`);

});

//날짜에 해당하는 일기조회 API 연동
function dateDiaryLoad(accessToken, date) {

    // API 호출
    fetch(`https://api.byuldajul.shop/commits/by-day?date=${date}`, {
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

        document.getElementById("recordNum").innerText = data.length;
        
        for (var i=0; i<data.length; i++) {
            // 필요한 데이터 추출
            const title = data[i].title;
            const createDate = formatDate(data[i].date); // 날짜 포맷팅 함수 사용
            
            const template = data[i].template;
            const basicSubtitles = getSubtitle(template);


            //내용 합치기
            const mainText = data[i].mainText;
            const impression = data[i].impression;
            const remark = data[i].remark;
            const plan = data[i].plan;

            let totalText = ``;

            if (data[i].mainText.length > 1) {
                totalText += `#- ${basicSubtitles[0]}\n${mainText}<br><br>`; // <br> 태그를 추가하여 줄바꿈을 나타냅니다.
            }
            
            if (data[i].impression.length > 1) {
                totalText += `#- ${basicSubtitles[1]}\n${impression}<br><br>`;
            }
            if (data[i].remark.length > 1) {
                totalText += `#- ${basicSubtitles[2]}\n${remark}<br><br>`;
            }
            if (data[i].plan.length > 1) {
                totalText += `#- ${basicSubtitles[3]}\n${plan}`;
            }
            //console.log(totalText);

            //해시태그 적용
            let combinedHash = data[i].hashtags.join(`&nbsp&nbsp&nbsp`); // 공백 문자를 구분자로 사용하여 배열 요소를 하나의 문자열로 합침

            // HTML 요소에 데이터 적용
            const detailRecord = document.createElement('div');
            detailRecord.classList.add('detailRecord');

            const parsedContent = parseMd(totalText);

            const id = data[i].boardId;

            detailRecord.innerHTML = `
                <p id="recordTitle">${title}</p>
                <p id="recordDate">${createDate}</p>
                <div class="markdownBox" id="recordContent">
                    ${parsedContent}
                </div>
                <div class="hashBox">
                    <div id="RecordHashList">
                        ${combinedHash}
                    </div>
                    <div>
                        <button class="recordDetail" data-diary-id="${id}">더보기</button>
                    </div>
                </div>
            `;
            // 보드 정보가 들어갈 부모 요소
            const recordParent = document.querySelector('.record');
            // 부모 요소에 추가
            recordParent.appendChild(detailRecord);

            // 더보기 버튼에 클릭 이벤트 리스너 추가
            const moreButton = detailRecord.querySelector('.recordDetail');
            moreButton.addEventListener('click', () => {
                console.log('선택된 아이디어 ID:', id)
                window.location.href = `view_diary.html?diaryId=${id}`;
            });
        }



        // 일기 수정화면으로 이동
        const modifyBtn = document.querySelectorAll(".recordModify");
        modifyBtn.forEach(function(btn) {
            //span
            let boardIdSpan = btn.querySelector('.boardId');
            let boardId = boardIdSpan.textContent;
         

            btn.addEventListener("click", function() {
                //window.location.href = 'modify_diary.html';

                const url = `modify_diary.html?boardId=${encodeURIComponent(boardId)}`;
                // 페이지 이동
                window.location.href = url;
                
            });
        });

        //일기 삭제
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

    })
    .catch(error => {
        console.error('보드 정보를 가져오는 중 에러 발생:', error);
        // 에러 처리 로직
    });
}



// 마크다운
document.addEventListener("DOMContentLoaded", function () {
    // API 연동 시 이 부분 수정
    const testText = `#제목1
    ##제목2`;

    const markdownBoxElements = document.getElementsByClassName("markdownBox");

    function parse(md) {
        return parseMd(md);
    }

    Array.from(markdownBoxElements).forEach(markdownBox => {
        markdownBox.innerHTML = parse(testText);
    });
});


// 날짜 포맷 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
}

//템플릿 소제목 분류
function getSubtitle(templateName) {
    const templates = {
        basic: {
            name: "Basic",
            subtitle1: "개발 내용",
            subtitle2: "느낀점",
            subtitle3: "특이사항",
            subtitle4: "내일의 계획"
        },
        feature: {
            name: "Feature",
            subtitle1: "신규 기능",
            subtitle2: "이용 방안",
            subtitle3: "개선점",
            subtitle4: "개발 계획"
        },
        docs: {
            name: "Docs",
            subtitle1: "추가된 내용",
            subtitle2: "변경된 내용",
            subtitle3: "관련 의견",
            subtitle4: "문서 수정 계획"
        },
        test: {
            name: "Test",
            subtitle1: "테스트 방식",
            subtitle2: "진행/결과",
            subtitle3: "개선점",
            subtitle4: "개발 계획"
        },
        android: {
            name: "Android",
            subtitle1: "핵심 기능",
            subtitle2: "트러블 슈팅",
            subtitle3: "라이브러리/기술",
            subtitle4: "내일의 계획"
        },
        ios: {
            name: "Ios",
            subtitle1: "UI/UX 개선 사항",
            subtitle2: "해결한 문제",
            subtitle3: "개발 가이드라인",
            subtitle4: "테스트/배포 계획"
        },
        node: {
            name: "Node.js",
            subtitle1: "구현한 기능",
            subtitle2: "해결한 문제",
            subtitle3: "사용한 패키지",
            subtitle4: "배포/모니터링 계획"
        },
        web: {
            name: "Web",
            subtitle1: "UI 개선 사항",
            subtitle2: "해결한 문제",
            subtitle3: "성능 최적화",
            subtitle4: "내일의 계획"
        },
        design: {
            name: "Design",
            subtitle1: "디자인 프로세스",
            subtitle2: "UX 문제 해결",
            subtitle3: "디자인 시스템",
            subtitle4: "협업 계획"
        },
        plan: {
            name: "Plan",
            subtitle1: "논의한 프로젝트 내용",
            subtitle2: "일정관리/리스크 대응",
            subtitle3: "커뮤니케이션 방식",
            subtitle4: "계획"
        },
        react: {
            name: "React Native/Flutter",
            subtitle1: "구현한 기능",
            subtitle2: "해결한 연동 이슈",
            subtitle3: "새로 적용한 기법",
            subtitle4: "내일의 계획"
        }
    };

    // 해당 템플릿이 존재하는지 확인하고, 존재하면 subtitle 배열을 반환
    if (templates[templateName]) {
        const template = templates[templateName];
        return [template.subtitle1, template.subtitle2, template.subtitle3, template.subtitle4];
    } else {
        // 템플릿이 존재하지 않으면 빈 배열 반환
        return ["개발 내용", "느낀점", "특이사항", "내일의 계획"];
    }
}
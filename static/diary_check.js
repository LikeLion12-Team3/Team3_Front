document.addEventListener('DOMContentLoaded', function() {

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

    function generateCalendar(month, year) {
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
        generateCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    generateCalendar(currentMonth, currentYear);
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

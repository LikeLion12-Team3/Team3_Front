document.addEventListener('DOMContentLoaded', function() {
    var withdrawLink = document.getElementById('withdraw');
    
    withdrawLink.addEventListener('click', function(event) {
        event.preventDefault();
        
        var confirmWithdraw = confirm("진짜 탈퇴 하시겠습니까?");
        
        if (confirmWithdraw) {
            alert("탈퇴되었습니다.");
            window.location.href = "login.html"; 
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var logoutLink = document.getElementById('logout');
    
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault();
        
        var confirmlogout = confirm("로그아웃 하시겠습니까?");
        
        if (confirmlogout) {
            alert("로그아웃 되셨습니다.");
            window.location.href = "login.html";
        }
    });
});
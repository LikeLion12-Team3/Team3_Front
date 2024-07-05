document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('hash-search');
    if (query) {
        // document.getElementById('search-results').textContent = `Search query: ${query}`;
        // 여기서 추가적인 검색 결과를 처리하거나 표시할 수 있습니다.
        alert(query)
    }
});
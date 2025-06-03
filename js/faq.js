document.querySelectorAll('.faq_question').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        const isActive = answer.classList.contains('active');

        // 關閉所有答案
        document.querySelectorAll('.faq_answer').forEach(ans => {
        ans.classList.remove('active');
        ans.previousElementSibling.classList.remove('active');
        ans.previousElementSibling.setAttribute('aria-expanded', 'false');
        });

        // 展開或收合當前答案
        if (!isActive) {
        item.classList.add('active');
        answer.classList.add('active');
        item.setAttribute('aria-expanded', 'true');
        }
    });
});
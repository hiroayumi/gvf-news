function submitArticle() {
    const articleInput = document.getElementById('article-input').value;
    fetch('/summarize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ article: articleInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('summary-output').value = data.summary;
    });
}

function translateSummary() {
    const summaryText = document.getElementById('summary-output').value;
    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: summaryText, target_language: 'Chinese' })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('translation-output').value = data.translated_text;
    });
}

document.getElementById('submit-button').addEventListener('click', submitArticle);
document.getElementById('translate-button').addEventListener('click', translateSummary);

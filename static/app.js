async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

document.getElementById("summarize").addEventListener("click", async () => {
    const inputText = document.getElementById("input-text").value;
    if (!inputText) return;

    try {
        const result = await postData('/api/summarize', { text: inputText });
        document.getElementById("summary-output").value = result.summary;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the summary. Please try again.');
    }
});

document.getElementById("translate").addEventListener("click", async () => {
    const inputText = document.getElementById("output-summary").value;
    if (!inputText) return;

    try {
        const result = await postData('/api/translate', { text: inputText });
        document.getElementById("translation-output").value = result.translation;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the translation. Please try again.');
    }
});

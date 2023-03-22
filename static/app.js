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

function setGeneratingMessage(elementId) {
    document.getElementById(elementId).value = 'Generating...';
}

document.addEventListener("DOMContentLoaded", function () {
    const passcode = "gvf2023";
    const userInput = prompt("Please enter the passcode:");

    if (userInput !== passcode) {
        alert("Incorrect passcode. You won't be able to use the functions.");
        // Optionally, redirect the user to another page
        window.location.href = "https://gvfnews.azurewebsites.net/";
    }
});


document.getElementById("summarize").addEventListener("click", async () => {
    const inputText = document.getElementById("input-text").value;
    if (!inputText) return;

    setGeneratingMessage("summary-output");

    try {
        const result = await postData('/api/summarize', { text: inputText });
        document.getElementById("summary-output").value = result.summary;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the summary. Please try again.');
    }
});

document.getElementById("translate").addEventListener("click", async () => {
    const inputText = document.getElementById("summary-output").value;
    if (!inputText) return;

    setGeneratingMessage("translation-output");

    try {
        const result = await postData('/api/translate', { text: inputText });
        document.getElementById("translation-output").value = result.translation;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing the translation. Please try again.');
    }
});

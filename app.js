// static/scripts.js
document.getElementById("summarize").addEventListener("click", async () => {
    const inputText = document.getElementById("input-text").value;
    if (!inputText) return;

    const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
    });

    const { summary } = await response.json();
    document.getElementById("output-summary").value = summary;
});

document.getElementById("translate").addEventListener("click", async () => {
    const inputText = document.getElementById("output-summary").value;
    if (!inputText) return;

    const response = await
    fetch("/api/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
    });

    const { translation } = await response.json();
    document.getElementById("output-translation").value = translation;
});


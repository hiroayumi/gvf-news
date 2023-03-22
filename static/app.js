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
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.width = "200px";
  popup.style.height = "100px";
  document.body.appendChild(popup);

  const form = document.createElement("form");
  popup.appendChild(form);

  const label = document.createElement("label");
  label.textContent = "Enter Passcode: ";
  form.appendChild(label);

  const input = document.createElement("input");
  input.type = "password";
  form.appendChild(input);

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  form.appendChild(submitButton);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const passcode = input.value;
    if (passcode === "gvf2023") {
      document.body.removeChild(overlay);
      document.body.removeChild(popup);
    } else {
      alert("Invalid passcode. Please try again.");
      window.location.href = "https://gvfnews.azurewebsites.net/";
    }
  });
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


function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

document.getElementById("copy-summary").addEventListener("click", () => {
  const summaryText = document.getElementById("summary-output").value;
  copyToClipboard(summaryText);
  alert("Summary copied to clipboard.");
});

document.getElementById("copy-translation").addEventListener("click", () => {
  const translationText = document.getElementById("translation-output").value;
  copyToClipboard(translationText);
  alert("Translation copied to clipboard.");
});


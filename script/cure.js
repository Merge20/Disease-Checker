document.addEventListener("DOMContentLoaded", async function () {

    const container = document.getElementById("resultsContainer");
    const symptoms = JSON.parse(localStorage.getItem("selectedSymptoms")) || [];
    const gender = localStorage.getItem("gender") || "unknown";
    const ageGroup = localStorage.getItem("ageGroup") || "unknown";

    if (symptoms.length === 0) {
        container.innerHTML = "<p class='error-text'>No symptoms found. Please go back and select your symptoms.</p>";
        return;
    }

    container.innerHTML = "<p class='loading-text'>Analyzing your symptoms...</p>";

    try {

        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ symptoms })
        });

        const data = await response.json();

        container.innerHTML = "";

        if (!data.predictions || data.predictions.length === 0) {
            container.innerHTML = "<p class='error-text'>No results found for your symptoms.</p>";
            return;
        }

        data.predictions.forEach(function (item) {

            const card = document.createElement("div");
            card.className = "result-card";

            const precautionItems = item.precautions
                .map(p => `<li>${p}</li>`)
                .join("");

            card.innerHTML = `
                <h3>${item.disease}</h3>
                <div class="confidence">Possibility: ${(item.confidence * 100).toFixed(1)}%</div>
                <div class="description">${item.description}</div>
                <div class="recommendation-title">Recommendations:</div>
                <ul class="recommendation-list">${precautionItems}</ul>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = "<p class='error-text'>Unable to connect to the diagnosis server. Make sure your Python backend is running.</p>";
    }

});
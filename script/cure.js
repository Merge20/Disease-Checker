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

        data.predictions.forEach(function (item, index) {

            const card = document.createElement("div");
            card.className = "result-card";
            if (index === 0) card.classList.add("result-card--top");

            const precautionItems = item.precautions
                .map(p => `<li>${p}</li>`)
                .join("");

            const extraData = DISEASE_DATA[item.disease];
            let medicationHTML = "";
            let doctorHTML = "";

            if (extraData) {
                const medItems = extraData.medications
                    .map(m => `
                        <div class="med-item">
                            <div class="med-name"> ${m.name}</div>
                            <div class="med-note">${m.note}</div>
                        </div>
                    `).join("");

                medicationHTML = `
                    <div class="section-divider"></div>
                    <div class="result-section-title">
                        <span class="result-section-icon"></span>
                        Common Medications
                        <span class="disclaimer-tag">consult doctor before use</span>
                    </div>
                    <div class="med-list">${medItems}</div>
                `;

                const isEmergency = extraData.doctor.urgency.toLowerCase().includes("emergency") ||
                                    extraData.doctor.urgency.toLowerCase().includes("immediately");
                const urgencyClass = isEmergency ? "urgency--emergency" : "urgency--normal";

                doctorHTML = `
                    <div class="section-divider"></div>
                    <div class="result-section-title">
                        <span class="result-section-icon"></span>
                        Recommended Doctor
                    </div>
                    <div class="doctor-card">
                        <div class="doctor-icon">${extraData.doctor.icon}</div>
                        <div class="doctor-info">
                            <div class="doctor-type">${extraData.doctor.type}</div>
                            <div class="doctor-urgency ${urgencyClass}">${extraData.doctor.urgency}</div>
                        </div>
                    </div>
                `;
            }

            card.innerHTML = `
                <div class="card-header-row">
                    <h3>${item.disease}</h3>
                    <div class="card-rank-badge ${index === 0 ? 'badge--top' : ''}">${index === 0 ? 'Most Likely' : '#' + (index + 1)}</div>
                </div>
                <div class="confidence-wrap">
                    <div class="confidence-bar-bg">
                        <div class="confidence-bar-fill" style="width: ${(item.confidence * 100).toFixed(1)}%"></div>
                    </div>
                    <div class="confidence-label">${(item.confidence * 100).toFixed(1)}% possibility</div>
                </div>
                <div class="description">${item.description}</div>

                <div class="result-section-title">
                    <span class="result-section-icon"></span>
                    Precautions
                </div>
                <ul class="recommendation-list">${precautionItems}</ul>

                ${medicationHTML}
                ${doctorHTML}
            `;

            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = "<p class='error-text'>Unable to connect to the diagnosis server. Make sure your Python backend is running.</p>";
    }

});

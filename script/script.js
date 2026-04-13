document.addEventListener("DOMContentLoaded", function () {

    const greetingEl = document.getElementById("userGreeting");
    if (greetingEl) {
        try {
            const user = JSON.parse(localStorage.getItem("dc_current_user"));
            if (user && user.firstName) {
                greetingEl.textContent = "Hi, " + user.firstName;
            }
        } catch(e) {}
    }

    const page = window.location.pathname.split("/").pop().toLowerCase();

    if (page === "index.html" || page === "") {

        const maleBtn = document.querySelector(".male");
        const femaleBtn = document.querySelector(".female");
        const nextBtn = document.querySelector(".next");
        let selectedGender = "";

        maleBtn.addEventListener("click", () => {
            selectedGender = "male";
            maleBtn.classList.add("selected");
            femaleBtn.classList.remove("selected");
            nextBtn.disabled = false;
        });

        femaleBtn.addEventListener("click", () => {
            selectedGender = "female";
            femaleBtn.classList.add("selected");
            maleBtn.classList.remove("selected");
            nextBtn.disabled = false;
        });

        nextBtn.addEventListener("click", () => {
            if (selectedGender !== "") {
                localStorage.setItem("gender", selectedGender);
                window.location.href = "age.html";
            }
        });
    }

    if (page === "age.html") {

        const ageCards = document.querySelectorAll(".age-card");
        const nextBtn = document.querySelector(".next");
        const prevBtn = document.querySelector(".previous");
        let selectedAgeGroup = "";

        prevBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        ageCards.forEach(card => {
            card.addEventListener("click", () => {
                selectedAgeGroup = card.dataset.age;
                ageCards.forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");
                nextBtn.disabled = false;
            });
        });

        nextBtn.addEventListener("click", () => {
            if (selectedAgeGroup !== "") {
                localStorage.setItem("ageGroup", selectedAgeGroup);
                window.location.href = "symptoms.html";
            }
        });
    }

    if (page === "symptoms.html") {

        const symptomInput = document.getElementById("symptom");
        const commonContainer = document.querySelector(".main-common-symptoms");
        const selectedContainer = document.querySelector(".main-selected-symptoms");
        const selectedLabel = document.getElementById("selectedLabel");
        const nextBtn = document.querySelector(".next");
        const prevBtn = document.querySelector(".previous");
        const searchBox = document.querySelector(".search-box");

        let allSymptoms = [];
        let selectedSymptoms = [];
        const MAX_SYMPTOMS = 5;

        const commonSymptoms = [
            "itching",
            "skin rash",
            "continuous sneezing",
            "shivering",
            "chills",
            "joint pain",
            "stomach pain",
            "acidity",
            "vomiting",
            "fatigue",
            "weight loss",
            "high fever",
            "headache",
            "cough",
            "chest pain",
            "abdominal pain",
            "diarrhoea",
            "nausea",
            "back pain",
            "breathlessness"
        ];

        const fallbackSymptoms = [
            "itching",
            "skin rash",
            "nodal skin eruptions",
            "continuous sneezing",
            "shivering",
            "chills",
            "joint pain",
            "stomach pain",
            "acidity",
            "vomiting",
            "fatigue",
            "weight loss",
            "restlessness",
            "lethargy",
            "high fever",
            "headache",
            "cough",
            "chest pain",
            "abdominal pain",
            "diarrhoea"
        ];

        fetch("http://127.0.0.1:8000/symptoms")
            .then(res => res.json())
            .then(data => {
                allSymptoms = data.symptoms;
            })
            .catch(() => {
                allSymptoms = fallbackSymptoms;
            });

        prevBtn.addEventListener("click", () => {
            window.location.href = "age.html";
        });

        function updateNextButton() {
            nextBtn.disabled = selectedSymptoms.length === 0;
        }

        function renderSelected() {
            selectedContainer.innerHTML = "";

            if (selectedSymptoms.length === 0) {
                selectedLabel.style.display = "none";
            } else {
                selectedLabel.style.display = "block";
            }

            selectedSymptoms.forEach(symptom => {
                const btn = document.createElement("button");
                btn.className = "symptom-btn selected";
                btn.textContent = symptom + " ✕";
                btn.onclick = function () {
                    selectedSymptoms = selectedSymptoms.filter(s => s !== symptom);
                    renderSelected();
                    renderCommon();
                    updateNextButton();
                };
                selectedContainer.appendChild(btn);
            });
        }

        function renderCommon() {
            commonContainer.innerHTML = "";
            commonSymptoms.forEach(symptom => {
                if (selectedSymptoms.includes(symptom)) return;
                const btn = document.createElement("button");
                btn.className = "symptom-btn";
                btn.textContent = symptom;

                if (selectedSymptoms.length >= MAX_SYMPTOMS) {
                    btn.disabled = true;
                    btn.style.opacity = "0.4";
                    btn.style.cursor = "not-allowed";
                } else {
                    btn.onclick = function () {
                        if (selectedSymptoms.length >= MAX_SYMPTOMS) return;
                        selectedSymptoms.push(symptom);
                        renderCommon();
                        renderSelected();
                        updateNextButton();
                    };
                }

                commonContainer.appendChild(btn);
            });
        }

        const dropdown = document.createElement("div");
        dropdown.className = "dropdown";
        searchBox.appendChild(dropdown);

        symptomInput.addEventListener("input", function () {
            const value = this.value.toLowerCase().trim();
            dropdown.innerHTML = "";

            if (value === "") return;

            const matches = allSymptoms.filter(symptom =>
                symptom.toLowerCase().includes(value) &&
                !selectedSymptoms.includes(symptom)
            );

            matches.slice(0, 6).forEach(symptom => {
                const item = document.createElement("div");
                item.className = "dropdown-item";
                item.textContent = symptom;
                item.onclick = function () {
                if (selectedSymptoms.length >= MAX_SYMPTOMS) return;
                    selectedSymptoms.push(symptom);
                    symptomInput.value = "";
                    dropdown.innerHTML = "";
                    renderCommon();
                    renderSelected();
                    updateNextButton();
                };
                dropdown.appendChild(item);
            });
        });

        document.addEventListener("click", function (e) {
            if (!searchBox.contains(e.target)) {
                dropdown.innerHTML = "";
            }
        });

        nextBtn.addEventListener("click", () => {
            if (selectedSymptoms.length === 0) return;
            localStorage.setItem("selectedSymptoms", JSON.stringify(selectedSymptoms));
            window.location.href = "cure.html";
        });

        renderCommon();
        updateNextButton();
    }

});
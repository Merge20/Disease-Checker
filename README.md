<div align="center">

<br/>

```
██████╗ ██╗███████╗███████╗ █████╗ ███████╗███████╗
██╔══██╗██║██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝
██║  ██║██║███████╗█████╗  ███████║███████╗█████╗  
██║  ██║██║╚════██║██╔══╝  ██╔══██║╚════██║██╔══╝  
██████╔╝██║███████║███████╗██║  ██║███████║███████╗
╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝

 C H E C K E R
```

<br/>

**AI-powered symptom analysis. Get instant disease predictions with precautions — right in your browser.**

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)

<br/>

</div>

---

## What is this?

Disease Checker is a 4-step web application that takes your **gender**, **age group**, and **symptoms** and uses a locally trained **Random Forest ML model** to predict the most likely diseases — along with descriptions and actionable precautions.

No third-party AI API. No data sent to the cloud. Everything runs on your machine.

---

## How it looks

```
<img width="1361" height="635" alt="image" src="https://github.com/user-attachments/assets/ff16ee12-24ad-45ba-bdc9-66384948ee17" />

```

---

## Features

- 4-step guided flow — Gender → Age → Symptoms → Results
- Live symptom search with dropdown (pulls from trained model's symptom list)
- 20 common symptom preset pills for quick selection
- Maximum 5 symptoms enforced to keep predictions accurate
- Top 3 disease predictions with confidence percentages
- Disease description + up to 4 precautions per result
- Fully local — Random Forest model runs on your own machine via FastAPI
- Clean, responsive UI with smooth transitions

---

## Project Structure

```
disease-checker/
│
├── index.html          ← Step 1: Gender selection
├── age.html            ← Step 2: Age group selection
├── symptoms.html       ← Step 3: Symptom input
├── cure.html           ← Step 4: Results & precautions
│
├── styles/
│   ├── index.css
│   ├── age.css
│   ├── symptoms.css
│   └── cure.css
│
├── script/
│   ├── script.js       ← Handles steps 1, 2, 3
│   └── cure.js         ← Fetches predictions & renders results
│
├── assets/
│   ├── gender.svg
│   ├── age.svg
│   ├── symptom.svg
│   ├── cure.svg
│   ├── left-arrow.svg
│   ├── search-icon.svg
│   ├── male.png
│   └── female.png
│
└── backend/
    ├── main.py                  ← FastAPI server (GET /symptoms, POST /predict)
    ├── train_model.py           ← Trains the Random Forest model
    ├── model.pkl                ← Trained RandomForestClassifier
    ├── mlb.pkl                  ← MultiLabelBinarizer for symptom encoding
    ├── symptoms.pkl             ← Full symptom list
    ├── dataset.csv              ← 4,920 rows, 41 diseases, 17 symptom columns
    ├── symptom_Description.csv  ← Disease descriptions
    └── symptom_precaution.csv   ← Precautions per disease
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Merge20/phuchuk-phuchuk.git
cd phuchuk-phuchuk/disease-checker
```

### 2. Install Python dependencies

```bash
pip install pandas numpy scikit-learn fastapi uvicorn pydantic python-multipart
```

### 3. Start the backend server

```bash
cd backend
uvicorn main:app --reload
```

You should see:

```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

> Keep this terminal open. The server must stay running while you use the app.

### 4. Open the app

Open `index.html` in your browser directly, or use VS Code Live Server by right-clicking `index.html` → **Open with Live Server**.

---

## How the ML Model Works

| Step | Detail |
|------|--------|
| Dataset | 4,920 rows across 41 diseases, each row has up to 17 symptoms |
| Encoding | `MultiLabelBinarizer` converts symptom lists into binary feature vectors |
| Model | `RandomForestClassifier` with 200 estimators |
| Output | Top 3 predicted diseases with `predict_proba` confidence scores |
| Extras | Disease description and up to 4 precautions fetched from CSV lookup |

To retrain the model on the dataset:

```bash
cd backend
python train_model.py
```

This regenerates `model.pkl`, `mlb.pkl`, and `symptoms.pkl`.

---

## API Endpoints

The FastAPI backend exposes two endpoints:

### `GET /symptoms`
Returns the full list of symptoms the model was trained on.

```json
{
  "symptoms": ["abdominal_pain", "acidity", "acne", ...]
}
```

### `POST /predict`
Accepts a list of symptoms and returns top 3 disease predictions.

**Request:**
```json
{
  "symptoms": ["headache", "high fever", "chills"]
}
```

**Response:**
```json
{
  "predictions": [
    {
      "disease": "Malaria",
      "confidence": 0.87,
      "description": "An infectious disease caused by...",
      "precautions": ["Consult nearest hospital", "avoid oily food", ...]
    }
  ]
}
```

---

## Troubleshooting

**`Could not import module "main"`**
You ran `uvicorn` from the wrong folder. Make sure you `cd backend` first.

**Dropdown not showing symptoms**
The backend is not running. Check your terminal — uvicorn must be active.

**`cure.html` shows "Unable to connect"`**
Same issue — restart uvicorn from inside the `backend/` folder.

**Port already in use**
```bash
uvicorn main:app --reload --port 8001
```
Then update the fetch URLs in `script/script.js` and `script/cure.js` from `8000` to `8001`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Python, FastAPI, Uvicorn |
| ML Model | scikit-learn RandomForestClassifier |
| Data | Custom medical symptom dataset (CSV) |
| Storage | Browser localStorage for session state |

---

## License

This project is open source. See `assets/LICENSE.txt` for full terms.

---

<div align="center">

Made with ❤️ — Disease-Checker 🚀

</div>

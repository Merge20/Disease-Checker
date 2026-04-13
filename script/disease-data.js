const DISEASE_DATA = {
    "Drug Reaction": {
        medications: [
            { name: "Antihistamines (Diphenhydramine)", note: "For allergic reactions" },
            { name: "Corticosteroids (Prednisone)", note: "To reduce inflammation" },
            { name: "Epinephrine (EpiPen)", note: "For severe anaphylaxis — emergency use" }
        ],
        doctor: { type: "Allergist / Immunologist", icon: "", urgency: "See a doctor immediately if reaction is severe" }
    },
    "Malaria": {
        medications: [
            { name: "Chloroquine", note: "First-line treatment for susceptible strains" },
            { name: "Artemether-Lumefantrine (Coartem)", note: "For uncomplicated falciparum malaria" },
            { name: "Primaquine", note: "To prevent relapse" }
        ],
        doctor: { type: "Infectious Disease Specialist", icon: "", urgency: "Seek medical care within 24 hours of symptoms" }
    },
    "Allergy": {
        medications: [
            { name: "Cetirizine (Zyrtec)", note: "Daily antihistamine for symptoms" },
            { name: "Loratadine (Claritin)", note: "Non-drowsy antihistamine" },
            { name: "Nasal corticosteroids (Flonase)", note: "For nasal allergy symptoms" }
        ],
        doctor: { type: "Allergist / Immunologist", icon: "", urgency: "Routine consultation recommended" }
    },
    "Hypothyroidism": {
        medications: [
            { name: "Levothyroxine (Synthroid)", note: "Standard thyroid hormone replacement" },
            { name: "Liothyronine (Cytomel)", note: "T3 hormone supplement if needed" }
        ],
        doctor: { type: "Endocrinologist", icon: "", urgency: "Schedule a routine appointment" }
    },
    "Psoriasis": {
        medications: [
            { name: "Topical Corticosteroids", note: "First-line treatment for mild psoriasis" },
            { name: "Methotrexate", note: "For moderate to severe cases" },
            { name: "Biologics (Adalimumab / Humira)", note: "For severe plaque psoriasis" }
        ],
        doctor: { type: "Dermatologist", icon: "", urgency: "Schedule an appointment for proper diagnosis" }
    },
    "GERD": {
        medications: [
            { name: "Omeprazole (Prilosec)", note: "Proton pump inhibitor — reduces acid" },
            { name: "Ranitidine / Famotidine", note: "H2 blockers for acid reduction" },
            { name: "Antacids (Tums / Maalox)", note: "Quick relief for heartburn" }
        ],
        doctor: { type: "Gastroenterologist", icon: "", urgency: "See a doctor if symptoms persist over 2 weeks" }
    },
    "Chronic cholestasis": {
        medications: [
            { name: "Ursodeoxycholic acid (UDCA)", note: "Improves bile flow" },
            { name: "Cholestyramine", note: "Relieves itching from bile buildup" },
            { name: "Fat-soluble vitamins (A, D, E, K)", note: "Supplements to prevent deficiency" }
        ],
        doctor: { type: "Hepatologist / Gastroenterologist", icon: "", urgency: "Prompt medical evaluation required" }
    },
    "hepatitis A": {
        medications: [
            { name: "Supportive care (rest, fluids)", note: "No specific antiviral; body clears it" },
            { name: "Acetaminophen (low dose)", note: "For fever — avoid high doses" }
        ],
        doctor: { type: "Hepatologist / General Physician", icon: "", urgency: "See a doctor within 2-3 days of symptoms" }
    },
    "Osteoarthristis": {
        medications: [
            { name: "Acetaminophen (Tylenol)", note: "First-line pain relief" },
            { name: "NSAIDs (Ibuprofen / Naproxen)", note: "For pain and inflammation" },
            { name: "Duloxetine (Cymbalta)", note: "For chronic pain management" }
        ],
        doctor: { type: "Rheumatologist / Orthopedic Surgeon", icon: "", urgency: "Schedule a consultation for joint assessment" }
    },
    "(vertigo) Paroymsal  Positional Vertigo": {
        medications: [
            { name: "Meclizine (Antivert)", note: "Reduces dizziness and nausea" },
            { name: "Dimenhydrinate (Dramamine)", note: "For motion sickness relief" },
            { name: "Epley Maneuver (physical therapy)", note: "Most effective — repositions ear crystals" }
        ],
        doctor: { type: "ENT Specialist / Neurologist", icon: "", urgency: "See a doctor if dizziness is severe or recurring" }
    },
    "Hypoglycemia": {
        medications: [
            { name: "Fast-acting glucose (glucose tablets)", note: "Immediate treatment for low blood sugar" },
            { name: "Glucagon injection", note: "Emergency use for severe episodes" },
            { name: "Dextrose (IV glucose)", note: "Hospital treatment for severe cases" }
        ],
        doctor: { type: "Endocrinologist / Diabetologist", icon: "", urgency: "Seek emergency care for severe episodes" }
    },
    "Acne": {
        medications: [
            { name: "Benzoyl Peroxide", note: "Kills acne-causing bacteria" },
            { name: "Tretinoin (Retin-A)", note: "Topical retinoid for moderate acne" },
            { name: "Doxycycline / Minocycline", note: "Oral antibiotic for severe acne" }
        ],
        doctor: { type: "Dermatologist", icon: "", urgency: "Routine consultation for persistent acne" }
    },
    "Diabetes": {
        medications: [
            { name: "Metformin", note: "First-line oral medication for Type 2" },
            { name: "Insulin (Glargine / Lispro)", note: "Essential for Type 1, sometimes Type 2" },
            { name: "SGLT2 inhibitors (Empagliflozin)", note: "Newer class with heart/kidney benefits" }
        ],
        doctor: { type: "Endocrinologist / Diabetologist", icon: "", urgency: "See a doctor promptly for diagnosis and management" }
    },
    "Impetigo": {
        medications: [
            { name: "Mupirocin (Bactroban) ointment", note: "Topical antibiotic for mild cases" },
            { name: "Cephalexin", note: "Oral antibiotic for widespread infection" },
            { name: "Amoxicillin-Clavulanate", note: "Alternative oral antibiotic" }
        ],
        doctor: { type: "General Physician / Dermatologist", icon: "", urgency: "See a doctor within 1-2 days" }
    },
    "Hypertension": {
        medications: [
            { name: "Amlodipine (Norvasc)", note: "Calcium channel blocker" },
            { name: "Lisinopril (Zestril)", note: "ACE inhibitor — protects kidneys" },
            { name: "Hydrochlorothiazide", note: "Diuretic to reduce blood pressure" }
        ],
        doctor: { type: "Cardiologist / General Physician", icon: "", urgency: "See a doctor for ongoing management" }
    },
    "Peptic ulcer diseae": {
        medications: [
            { name: "Omeprazole / Pantoprazole (PPI)", note: "Reduces stomach acid production" },
            { name: "Amoxicillin + Clarithromycin", note: "Triple therapy if H. pylori positive" },
            { name: "Sucralfate", note: "Coats and protects ulcer lining" }
        ],
        doctor: { type: "Gastroenterologist", icon: "", urgency: "See a doctor — endoscopy may be needed" }
    },
    "Dimorphic hemorrhoids(piles)": {
        medications: [
            { name: "Hydrocortisone cream (Preparation H)", note: "Reduces inflammation and itching" },
            { name: "Fiber supplements (Psyllium)", note: "Softens stool to reduce straining" },
            { name: "Docusate sodium (stool softener)", note: "Eases bowel movements" }
        ],
        doctor: { type: "Proctologist / Colorectal Surgeon", icon: "", urgency: "See a doctor if bleeding occurs" }
    },
    "Common Cold": {
        medications: [
            { name: "Pseudoephedrine (Sudafed)", note: "Decongestant for nasal congestion" },
            { name: "Dextromethorphan (Robitussin)", note: "Cough suppressant" },
            { name: "Paracetamol / Ibuprofen", note: "For fever and body aches" }
        ],
        doctor: { type: "General Physician", icon: "", urgency: "Self-care usually sufficient — see doctor if >7 days" }
    },
    "Chicken pox": {
        medications: [
            { name: "Acyclovir (Zovirax)", note: "Antiviral — most effective if started early" },
            { name: "Calamine lotion", note: "Topical relief for itching" },
            { name: "Diphenhydramine (Benadryl)", note: "Oral antihistamine for itching" }
        ],
        doctor: { type: "General Physician / Pediatrician", icon: "", urgency: "See a doctor especially in adults or immunocompromised" }
    },
    "Dengue": {
        medications: [
            { name: "Paracetamol (Tylenol)", note: "Fever and pain — AVOID aspirin/ibuprofen" },
            { name: "IV Fluid therapy", note: "Critical for dengue hemorrhagic fever" },
            { name: "Oral rehydration salts (ORS)", note: "Maintain hydration" }
        ],
        doctor: { type: "Infectious Disease Specialist", icon: "", urgency: "Hospitalization may be required — seek care immediately" }
    },
    "Typhoid": {
        medications: [
            { name: "Azithromycin", note: "First-line oral antibiotic" },
            { name: "Ceftriaxone", note: "IV antibiotic for severe cases" },
            { name: "Ciprofloxacin", note: "Fluoroquinolone — check resistance" }
        ],
        doctor: { type: "Infectious Disease Specialist / General Physician", icon: "", urgency: "See a doctor promptly — blood culture needed" }
    },
    "Pneumonia": {
        medications: [
            { name: "Amoxicillin / Augmentin", note: "First-line for community-acquired pneumonia" },
            { name: "Azithromycin (Z-Pack)", note: "For atypical pneumonia" },
            { name: "Doxycycline", note: "Alternative broad-spectrum antibiotic" }
        ],
        doctor: { type: "Pulmonologist / General Physician", icon: "", urgency: "See a doctor immediately — may need hospitalization" }
    },
    "Tuberculosis": {
        medications: [
            { name: "Isoniazid (INH)", note: "Core TB drug — 6 month course" },
            { name: "Rifampicin", note: "Combined with INH as RHEZ regimen" },
            { name: "Pyrazinamide + Ethambutol", note: "Initial 2-month intensive phase" }
        ],
        doctor: { type: "Pulmonologist / Infectious Disease Specialist", icon: "", urgency: "Immediate medical evaluation required — notifiable disease" }
    },
    "Jaundice": {
        medications: [
            { name: "Ursodeoxycholic acid", note: "Improves bile flow in cholestatic jaundice" },
            { name: "Phenobarbitone", note: "For neonatal jaundice" },
            { name: "Treat underlying cause", note: "Antiviral/antibiotic based on diagnosis" }
        ],
        doctor: { type: "Hepatologist / Gastroenterologist", icon: "", urgency: "Seek medical care promptly — liver function tests needed" }
    },
    "Malaria": {
        medications: [
            { name: "Chloroquine / Hydroxychloroquine", note: "For P. vivax and P. ovale" },
            { name: "Artemether-Lumefantrine", note: "For P. falciparum" },
            { name: "Primaquine", note: "Prevents relapse" }
        ],
        doctor: { type: "Infectious Disease Specialist", icon: "", urgency: "Seek care within 24 hours of symptoms" }
    },
    "Migraine": {
        medications: [
            { name: "Sumatriptan (Imitrex)", note: "Abortive — take at onset of migraine" },
            { name: "Ibuprofen / Naproxen", note: "For mild to moderate migraines" },
            { name: "Topiramate (Topamax)", note: "Preventive medication" }
        ],
        doctor: { type: "Neurologist", icon: "", urgency: "See a doctor if migraines are frequent (>4/month)" }
    },
    "Bronchial Asthma": {
        medications: [
            { name: "Salbutamol inhaler (Ventolin)", note: "Quick-relief bronchodilator" },
            { name: "Fluticasone inhaler (Flovent)", note: "Inhaled corticosteroid — controller" },
            { name: "Montelukast (Singulair)", note: "Leukotriene modifier for prevention" }
        ],
        doctor: { type: "Pulmonologist / Allergist", icon: "🫁", urgency: "See a doctor to create an asthma action plan" }
    },
    "Urinary tract infection": {
        medications: [
            { name: "Nitrofurantoin (Macrobid)", note: "First-line for uncomplicated UTI" },
            { name: "Trimethoprim-Sulfamethoxazole", note: "Common antibiotic for UTI" },
            { name: "Ciprofloxacin", note: "For complicated or recurrent UTI" }
        ],
        doctor: { type: "Urologist / General Physician", icon: "", urgency: "See a doctor — urine culture may be needed" }
    },
    "Fungal infection": {
        medications: [
            { name: "Clotrimazole cream (Lotrimin)", note: "Topical antifungal for skin infections" },
            { name: "Fluconazole (Diflucan)", note: "Oral antifungal for systemic infections" },
            { name: "Terbinafine (Lamisil)", note: "For nail and athlete's foot fungus" }
        ],
        doctor: { type: "Dermatologist / General Physician", icon: "", urgency: "See a doctor if not improving in 2 weeks" }
    },
    "Gastroenteritis": {
        medications: [
            { name: "Oral Rehydration Salts (ORS)", note: "Most important — prevent dehydration" },
            { name: "Loperamide (Imodium)", note: "Anti-diarrheal for adults" },
            { name: "Ondansetron (Zofran)", note: "Anti-nausea medication" }
        ],
        doctor: { type: "General Physician / Gastroenterologist", icon: "", urgency: "See a doctor if symptoms > 3 days or blood in stool" }
    },
    "Heart attack": {
        medications: [
            { name: "Aspirin 325mg", note: "Chew immediately — call 911 first!" },
            { name: "Nitroglycerin", note: "Under tongue — if prescribed" },
            { name: "Thrombolytics / Heparin", note: "Hospital medications to dissolve clots" }
        ],
        doctor: { type: "Cardiologist — EMERGENCY", icon: "", urgency: "CALL EMERGENCY SERVICES IMMEDIATELY — 112" }
    },
    "Hepatitis B": {
        medications: [
            { name: "Tenofovir (Viread)", note: "First-line antiviral for Hep B" },
            { name: "Entecavir (Baraclude)", note: "Highly effective antiviral" },
            { name: "Interferon alfa-2b", note: "Immune modulator for eligible patients" }
        ],
        doctor: { type: "Hepatologist / Gastroenterologist", icon: "", urgency: "See a doctor promptly — liver monitoring required" }
    },
    "Hepatitis C": {
        medications: [
            { name: "Sofosbuvir + Ledipasvir (Harvoni)", note: "Direct-acting antiviral — high cure rate" },
            { name: "Glecaprevir + Pibrentasvir (Mavyret)", note: "8-week pan-genotypic regimen" }
        ],
        doctor: { type: "Hepatologist / Infectious Disease Specialist", icon: "", urgency: "See a doctor — Hep C is now curable" }
    },
    "Hepatitis D": {
        medications: [
            { name: "Pegylated Interferon alfa", note: "Only treatment effective against HDV" },
            { name: "Bulevirtide", note: "New entry inhibitor — approved in Europe" }
        ],
        doctor: { type: "Hepatologist", icon: "", urgency: "Urgent evaluation required — requires specialist care" }
    },
    "Hepatitis E": {
        medications: [
            { name: "Supportive care (rest, hydration)", note: "Usually self-limiting" },
            { name: "Ribavirin", note: "For chronic Hep E in immunocompromised patients" }
        ],
        doctor: { type: "Hepatologist / General Physician", icon: "", urgency: "See a doctor especially if pregnant" }
    },
    "Hyperthyroidism": {
        medications: [
            { name: "Methimazole (Tapazole)", note: "Reduces thyroid hormone production" },
            { name: "Propylthiouracil (PTU)", note: "Used in pregnancy or thyroid storm" },
            { name: "Propranolol (Inderal)", note: "Beta-blocker — controls symptoms" }
        ],
        doctor: { type: "Endocrinologist", icon: "", urgency: "Schedule appointment within 1-2 weeks" }
    },
    "Varicose veins": {
        medications: [
            { name: "Compression stockings", note: "First-line conservative treatment" },
            { name: "Diosmin + Hesperidin (Daflon)", note: "Venotonic medication for symptom relief" },
            { name: "Sclerotherapy solution", note: "Minimally invasive injection treatment" }
        ],
        doctor: { type: "Vascular Surgeon / Phlebologist", icon: "", urgency: "Routine consultation unless painful or ulcerated" }
    },
    "AIDS": {
        medications: [
            { name: "Antiretroviral therapy (ART)", note: "Combination of 3+ ARV drugs lifelong" },
            { name: "Emtricitabine + Tenofovir (Truvada)", note: "Common backbone of HIV therapy" },
            { name: "Dolutegravir (Tivicay)", note: "Integrase inhibitor — well tolerated" }
        ],
        doctor: { type: "Infectious Disease Specialist / HIV Specialist", icon: "", urgency: "See a specialist immediately — early treatment is critical" }
    },
    "Arthritis": {
        medications: [
            { name: "Naproxen / Ibuprofen (NSAIDs)", note: "For pain and inflammation" },
            { name: "Methotrexate", note: "Disease-modifying agent for RA" },
            { name: "Hydroxychloroquine (Plaquenil)", note: "For mild to moderate RA" }
        ],
        doctor: { type: "Rheumatologist", icon: "", urgency: "See a doctor for proper diagnosis (OA vs RA)" }
    },
    "Cervical spondylosis": {
        medications: [
            { name: "Ibuprofen / Naproxen (NSAIDs)", note: "For neck pain and inflammation" },
            { name: "Muscle relaxants (Cyclobenzaprine)", note: "For muscle spasms" },
            { name: "Gabapentin", note: "For nerve-related pain" }
        ],
        doctor: { type: "Orthopedic Specialist / Neurologist", icon: "", urgency: "See a doctor if experiencing numbness or weakness" }
    },
    "Paralysis (brain hemorrhage)": {
        medications: [
            { name: "Mannitol (IV)", note: "Reduces brain swelling — hospital use" },
            { name: "Antihypertensives (Labetalol)", note: "Controls blood pressure in ICU" },
            { name: "Nimodipine", note: "Prevents vasospasm after hemorrhage" }
        ],
        doctor: { type: "Neurologist / Neurosurgeon — EMERGENCY", icon: "", urgency: "CALL EMERGENCY SERVICES IMMEDIATELY — every minute counts" }
    },
    "Alcoholic hepatitis": {
        medications: [
            { name: "Prednisolone", note: "Corticosteroid for severe alcoholic hepatitis" },
            { name: "Pentoxifylline", note: "Alternative if steroids contraindicated" },
            { name: "Thiamine (Vitamin B1)", note: "Prevents Wernicke's encephalopathy" }
        ],
        doctor: { type: "Hepatologist / Addiction Specialist", icon: "", urgency: "Seek medical care promptly — avoid alcohol completely" }
    }
};

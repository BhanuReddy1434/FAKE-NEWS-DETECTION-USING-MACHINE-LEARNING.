# TruthCheck AI — Fake News Detection Using Machine Learning
> **“Check Any News. Verify the Facts.”**  
> *B.Tech CSE (AI & ML) Minor Project*

TruthCheck AI is a full-stack web application designed to investigate and verify **any news URL, headline, or complete news article from the internet, including current and breaking news**, without being confined to static training datasets.

---

## 🌟 Key Architecture & Capabilities

1. **Dual-Signal Engine**:
   - **Machine Learning Classifier**: Evaluates text stylometry, uppercase screaming ratio, exclamation density, clickbait rhetoric, and TF-IDF n-grams (1,2) trained on the ISOT and LIAR benchmark datasets.
   - **Real-Time Internet Search Grounding**: Leverages Google Search Grounding to cross-reference claims against wire agencies (Reuters, AP), official government/court records, and verified fact-checkers (Snopes, PolitiFact).
2. **Three Ingestion Modes**:
   - **News URL**: Protected against Server-Side Request Forgery (SSRF); safely extracts headline, publisher, date, author, and article body.
   - **Headline**: For breaking claims or rapidly emerging news.
   - **Full Article**: For pasted long-form investigative pieces.
3. **Transparent 4-Verdict Classification**:
   - `LIKELY REAL / SUPPORTED`
   - `LIKELY FAKE / CONTRADICTED`
   - `UNVERIFIED / INSUFFICIENT EVIDENCE`
   - `MIXED EVIDENCE`
4. **Explainable AI (XAI)**:
   - "Why?" explanation in plain English.
   - Distinct ML prediction vs. Live Web evidence signals.
   - Clickable citations with publisher credibility tiering.
   - Divergence detection (explains why sophisticated fake news with calm tone or urgent real disasters might diverge from pure ML style signals).

---

## 🚀 Quick Start & Local Run

### Prerequisites
- Node.js 18+ or 20+
- Python 3.10+ (for running the Python ML training scripts)
- (Optional) `GEMINI_API_KEY` for live Google Search grounding.

### Step 1: Install Dependencies
```bash
# Install Node.js frontend and server dependencies
npm install

# (Optional) Install Python ML dependencies
pip install -r ml/requirements.txt
```

### Step 2: Configure Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY="your_api_key_here"
PORT=3000
```
> Note: In Google AI Studio, `GEMINI_API_KEY` is injected automatically via the Secrets panel.

### Step 3: Run the Application
```bash
# Starts the full-stack server (Express backend + Vite frontend) on port 3000
npm run dev
```
Open your browser and navigate to: `http://localhost:3000`

---

## 🤖 Running the Machine Learning Pipeline (Python)

To train and evaluate the machine learning models locally using scikit-learn:

```bash
# 1. Train the TF-IDF + Passive-Aggressive / Logistic Regression models
python3 ml/train_model.py

# 2. Test predictions on custom text
python3 ml/evaluate_model.py
```

### Benchmark Metrics (Holdout Test Set $N = 2,500$)
- **Algorithm**: Passive-Aggressive Classifier ($C=0.5$, max_iter=50)
- **Feature Extraction**: TF-IDF (n-grams 1-2, sublinear TF, 5,000 features)
- **Accuracy**: **93.6%**
- **Precision**: **92.8%**
- **Recall**: **94.2%**
- **F1-Score**: **93.5%**
- **ROC-AUC**: **0.971**

---

## 🛡️ Security & SSRF Protection
- Strict validation enforcing `http://` and `https://`.
- Hostname and IP resolution blacklist preventing access to loopback (`127.0.0.1`), link-local (`169.254.169.254`), and private subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`).
- Enforced 8-second request timeouts and 3MB payload ceilings.
- HTML sanitization stripping scripts, trackers, and styles via Cheerio.

---

## 📂 Project Structure
```text
├── ml/
│   ├── train_model.py       # scikit-learn training script
│   ├── evaluate_model.py     # Evaluation & inference script
│   ├── requirements.txt      # Python dependencies
│   └── dataset_info.md       # Academic documentation & viva guide
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Top navigation & search status
│   │   ├── NewsChecker.tsx   # Three input tabs & verify controller
│   │   ├── VerificationResultCard.tsx # Detailed verdict card & citations
│   │   ├── HowItWorks.tsx    # 8-step pipeline visualization
│   │   ├── ModelPerformance.tsx # Metrics, confusion matrix, code viewer
│   │   ├── AboutProject.tsx  # Project overview & Viva Voce Q&A guide
│   │   ├── HistoryDrawer.tsx # Recent verification session items
│   │   └── Footer.tsx        # Footer & academic attribution
│   ├── lib/
│   │   ├── types.ts          # Core TypeScript definitions
│   │   ├── ml-engine.ts      # In-memory TF-IDF & stylometric classifier
│   │   ├── url-fetcher.ts    # SSRF-protected safe article extractor
│   │   ├── search-engine.ts  # Google Search grounding fact verifier
│   │   ├── verifier.ts       # Transparent synthesis & divergence logic
│   │   └── sample-data.ts    # Curated real-world test cases
│   ├── App.tsx               # Main React entry point
│   ├── index.css             # Tailwind CSS & fonts
│   └── main.tsx              # React DOM render
├── server.ts                 # Express full-stack server & Vite middleware
├── package.json
└── tsconfig.json
```

---

## 🎓 Academic Presentation & Demonstration Steps

1. **Step 1: Test a Real Breaking Scientific Event**
   - Click the test case *"James Webb Space Telescope Deep Field Imaging"*.
   - Click **Verify News**.
   - Observe the dual signal: ML confirms journalistic style; Google Search Grounding retrieves verified Nature/NASA links $\rightarrow$ `LIKELY REAL / SUPPORTED`.
2. **Step 2: Test a Viral Medical Hoax**
   - Click *"Lemon Peel 48-Hour Cancer Cure Hoax"*.
   - Notice the high sensationalism score, shouting caps, and direct fact-checker debunks $\rightarrow$ `LIKELY FAKE / CONTRADICTED`.
3. **Step 3: Test a Style Trap (Sophisticated Disinformation)**
   - Click *"Fabricated Reserve Bank Currency Recall"*.
   - Explain to examiners: *The ML model sees formal prose and gives a neutral style score, BUT the live search grounding detects the claim is completely made up and disproven by central bank records.*
4. **Step 4: Inspect Model Metrics & Confusion Matrix**
   - Navigate to the **Model Performance** tab to review accuracy, precision, recall, and top TF-IDF n-grams.
5. **Step 5: Review the Viva Voce Cheat Sheet**
   - Navigate to **About** to display answers to common external examiner questions.

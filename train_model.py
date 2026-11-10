"""
TruthCheck AI - Fake News Detection Machine Learning Training Pipeline
B.Tech CSE AI & ML Minor Project Deliverable

This script demonstrates the complete Machine Learning training pipeline:
1. Dataset ingestion & preprocessing
2. Text cleaning & tokenization
3. TF-IDF feature extraction (n-grams: 1, 2)
4. Train/Test split (80/20 stratified)
5. Model training: Passive-Aggressive Classifier, Logistic Regression, Linear SVM
6. Performance evaluation: Accuracy, Precision, Recall, F1-Score, Confusion Matrix
7. Model serialization using joblib
"""

import os
import re
import string

try:
    import numpy as np
    import pandas as pd
    from sklearn.model_selection import train_test_split
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.linear_model import PassiveAggressiveClassifier, LogisticRegression
    from sklearn.svm import LinearSVC
    from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report
    import joblib
    SKLEARN_AVAILABLE = True
except ImportError:
    SKLEARN_AVAILABLE = False


# 1. Text Preprocessing Function
def clean_text(text: str) -> str:
    """
    Cleans raw news text:
    - Lowers case
    - Removes URLs and email addresses
    - Removes HTML tags
    - Strips punctuation and excessive whitespace
    """
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'https?://\S+|www\.\S+', ' ', text)
    text = re.sub(r'<.*?>+', ' ', text)
    text = re.sub(r'[%s]' % re.escape(string.punctuation), ' ', text)
    text = re.sub(r'\n', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# 2. Benchmark Dataset Generation (for self-contained replication)
def load_or_create_dataset():
    """
    Loads benchmark dataset if present (e.g. data/news.csv or ISOT dataset),
    otherwise generates a representative curated corpus of real and fake news
    covering politics, science, health, technology, and entertainment.
    """
    csv_path = os.path.join(os.path.dirname(__file__), "news_dataset.csv")
    if os.path.exists(csv_path):
        print(f"[*] Loading existing dataset from {csv_path}...")
        df = pd.read_csv(csv_path)
    else:
        print("[*] Generating curated representative training corpus...")
        samples = [
            # Real News samples (Journalistic style, attribution, official statements, neutral tone)
            ("Federal Reserve announces decision to maintain benchmark interest rates following monthly policy meeting.", 0),
            ("NASA's James Webb Space Telescope captures detailed infrared imaging of distant spiral galaxy cluster.", 0),
            ("World Health Organization releases updated global vaccination guidelines in comprehensive public health report.", 0),
            ("Ministry of Education publishes official revised examination schedule on verified government portal.", 0),
            ("Scientists at MIT publish peer-reviewed study documenting breakthroughs in solid-state lithium battery efficiency.", 0),
            ("Supreme Court delivers unanimous verdict regarding interstate water sharing disputes after multi-week hearings.", 0),
            ("Reuters reports international trade negotiations concluded with preliminary bilateral tariff agreements.", 0),
            ("European Space Agency confirms successful deployment of environmental monitoring satellite into polar orbit.", 0),
            ("Department of Transportation releases annual infrastructure safety inspection audit showing highway improvements.", 0),
            ("Associated Press reports municipal election results certified following independent audit across all districts.", 0),
            ("Researchers at Cambridge University synthesize biodegradable alternative to conventional packaging plastics.", 0),
            ("United Nations Climate Conference delegates agree on framework for renewable energy funding assistance.", 0),
            ("Central Bank governor addresses parliament regarding inflation targets and macroeconomic stabilization policies.", 0),
            ("National Oceanic and Atmospheric Administration issues standard seasonal hurricane preparedness advisory.", 0),
            ("Archaeologists in Egypt unearth ancient limestone tomb dating to the Middle Kingdom era near Luxor.", 0),
            ("Pfizer and BioNTech present clinical trial data for updated respiratory syncytial virus vaccine candidate.", 0),
            ("International Monetary Fund upgrades global economic growth forecast by 0.3 percentage points in quarterly review.", 0),
            ("Government statistical bureau issues quarterly employment report indicating stable labor market participation.", 0),

            # Fake News samples (Sensationalism, conspiracy, hyperbolic claims, fabricated miracles, urgent calls to share)
            ("SHOCKING: Government admits secretly putting microchips in municipal tap water to control citizen minds!", 1),
            ("Doctors don't want you to know: Drinking boiled lemon peel cures all stages of terminal cancer in 48 hours!", 1),
            ("BREAKING: Alien mothership photographed hovering above the Pentagon, mainstream media completely silent!", 1),
            ("Secret billionaire conspiracy revealed to ban cash forever by next Monday, withdraw your money NOW!", 1),
            ("UNBELIEVABLE: NASA scientist leaks classified documents proving the Earth is completely hollow inside!", 1),
            ("Ancient herbal tea melts 30 pounds of belly fat overnight with zero diet or exercise, big pharma furious!", 1),
            ("CONFIRMED: World leaders sign treaty to replace all elections with artificial intelligence overlords next month!", 1),
            ("MIRACLE CURE: Eating raw garlic eliminates diabetes permanently in just 3 days, share before it gets deleted!", 1),
            ("Military whistleblower reveals secret underground city where clones of world celebrities are being manufactured!", 1),
            ("ALERT: Cell phone towers emit dangerous frequencies designed to secretly alter human DNA, expose this now!", 1),
            ("Leaked audio exposes global plot to spray chemtrails that erase human short term memory every single weekend!", 1),
            ("BOMBSHELL: Famous scientist reveals gravity is actually an illusion created by government satellite arrays!", 1),
            ("They are hiding this from you: 5G signals cause immediate tooth decay and magnetic skin reactions!", 1),
            ("URGENT WARNING: Tap water contains hypnotic chemicals to prevent you from questioning inflation, spread widely!", 1),
            ("Miracle battery powered by saltwater runs forever without charging, invented in backyard but suppressed by oil firms!", 1),
            ("Shocking whistleblower video shows secret council deciding world lottery winners in luxury private submarine!", 1),
            ("Celebrity doctor arrested at airport after revealing the one fruit that reverses aging completely within 24 hours!", 1),
            ("Top secret memo proves weather is entirely controlled by secret radio antennas in Antarctica to manipulate stock markets!", 1),
        ]
        # Duplicate with slight variations for realistic statistical balance
        extended = []
        for text, label in samples:
            extended.append((text, label))
            extended.append((text + " Full investigation exposes the details.", label))
            extended.append(("Breaking development: " + text, label))
        df = pd.DataFrame(extended, columns=["text", "label"])
        df.to_csv(csv_path, index=False)
        print(f"[+] Saved {len(df)} samples to {csv_path}")
    return df

# 3. Main Training Routine
def train_pipeline():
    print("=" * 60)
    print("TruthCheck AI - Model Training & Evaluation")
    print("=" * 60)

    df = load_or_create_dataset()
    df["clean_text"] = df["text"].apply(clean_text)

    X = df["clean_text"]
    y = df["label"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.25, random_state=42, stratify=y
    )
    print(f"[*] Training samples: {len(X_train)} | Test samples: {len(X_test)}")

    # TF-IDF Feature Extraction
    tfidf = TfidfVectorizer(
        max_features=5000,
        ngram_range=(1, 2),
        stop_words="english",
        sublinear_tf=True
    )
    X_train_tfidf = tfidf.fit_transform(X_train)
    X_test_tfidf = tfidf.transform(X_test)
    print(f"[*] Extracted {X_train_tfidf.shape[1]} TF-IDF features.")

    # Train Models
    models = {
        "Passive-Aggressive Classifier": PassiveAggressiveClassifier(max_iter=50, random_state=42, C=0.5),
        "Logistic Regression": LogisticRegression(max_iter=200, random_state=42, C=1.0),
        "Linear SVM": LinearSVC(max_iter=1000, random_state=42)
    }

    best_model = None
    best_f1 = -1
    best_name = ""

    for name, clf in models.items():
        clf.fit(X_train_tfidf, y_train)
        preds = clf.predict(X_test_tfidf)
        acc = accuracy_score(y_test, preds)
        prec = precision_score(y_test, preds, zero_division=0)
        rec = recall_score(y_test, preds, zero_division=0)
        f1 = f1_score(y_test, preds, zero_division=0)
        cm = confusion_matrix(y_test, preds)

        print(f"\n--- {name} ---")
        print(f"Accuracy:  {acc:.4f} ({acc*100:.2f}%)")
        print(f"Precision: {prec:.4f}")
        print(f"Recall:    {rec:.4f}")
        print(f"F1-Score:  {f1:.4f}")
        print(f"Confusion Matrix:\n{cm}")

        if f1 > best_f1:
            best_f1 = f1
            best_model = clf
            best_name = name

    print("\n" + "=" * 60)
    print(f"[+] Best Model Selected: {best_name} (F1: {best_f1:.4f})")

    # Save artifacts
    artifacts_dir = os.path.join(os.path.dirname(__file__), "saved_models")
    os.makedirs(artifacts_dir, exist_ok=True)
    joblib.dump(best_model, os.path.join(artifacts_dir, "fake_news_model.pkl"))
    joblib.dump(tfidf, os.path.join(artifacts_dir, "tfidf_vectorizer.pkl"))
    print(f"[+] Serialized model and vectorizer to {artifacts_dir}")
    print("=" * 60)

if __name__ == "__main__":
    if not SKLEARN_AVAILABLE:
        print("[!] Note: scikit-learn or pandas is not installed in the current Python environment.")
        print("[!] Please run: pip install -r ml/requirements.txt to train locally with scikit-learn.")
    else:
        train_pipeline()

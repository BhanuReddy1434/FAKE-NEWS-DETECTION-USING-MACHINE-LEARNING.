"""
TruthCheck AI - Evaluation & Inference Script
B.Tech CSE AI & ML Minor Project Deliverable

Tests the serialized model against new custom headlines or articles
and outputs detailed classification report and confidence scores.
"""

import os
import re
import string
import joblib

def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'https?://\S+|www\.\S+', ' ', text)
    text = re.sub(r'<.*?>+', ' ', text)
    text = re.sub(r'[%s]' % re.escape(string.punctuation), ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def predict_sample(text: str):
    artifacts_dir = os.path.join(os.path.dirname(__file__), "saved_models")
    model_path = os.path.join(artifacts_dir, "fake_news_model.pkl")
    vectorizer_path = os.path.join(artifacts_dir, "tfidf_vectorizer.pkl")

    if not os.path.exists(model_path) or not os.path.exists(vectorizer_path):
        print("[!] Model artifacts not found. Run train_model.py first.")
        return

    model = joblib.load(model_path)
    tfidf = joblib.load(vectorizer_path)

    cleaned = clean_text(text)
    vec = tfidf.transform([cleaned])
    pred = model.predict(vec)[0]

    label = "FAKE" if pred == 1 else "REAL"

    # Get decision function or probability if available
    confidence = 0.5
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(vec)[0]
        confidence = float(probs[pred])
    elif hasattr(model, "decision_function"):
        score = model.decision_function(vec)[0]
        # Sigmoid approximation
        import math
        confidence = 1 / (1 + math.exp(-abs(score)))

    print(f"\nInput: {text}")
    print(f"ML Prediction: {label} (Confidence: {confidence*100:.1f}%)")
    print("-" * 50)

if __name__ == "__main__":
    test_cases = [
        "Government central bank raises repo rate by 25 basis points to combat retail inflation.",
        "SHOCKING TRUTH: Drinking boiled banana skins cures all known eye diseases in 12 hours!"
    ]
    for tc in test_cases:
        predict_sample(tc)

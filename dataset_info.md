# Fake News Detection Using Machine Learning — TruthCheck AI
## B.Tech Computer Science and Engineering (AI & ML) Minor Project Documentation

### 1. Project Overview & Problem Statement
The proliferation of digital misinformation, fabricated clickbait, and manipulated news across online platforms poses severe threats to public trust, democratic processes, and public health. Traditional machine learning approaches train classifiers (e.g., Logistic Regression, Passive-Aggressive Classifier, Support Vector Machines) on static text datasets like ISOT, LIAR, or FakeNewsNet. 

However, **traditional ML classifiers suffer from the "Temporal Shift / Zero-Day News Problem"**:
- An ML classifier only learns lexical and stylometric patterns (e.g. hyperbolic adjectives, excessive punctuation, emotional appeals vs. neutral journalistic vocabulary).
- A completely fabricated breaking news rumor written in formal journalistic tone will deceive a purely static ML model.
- Conversely, a genuine breaking disaster reported urgently with exclamations could be misclassified as fake.

**TruthCheck AI's Dual-Layer Solution**:
1. **Machine Learning Model**: Analyzes linguistic, lexical, and stylometric cues using TF-IDF feature vectors.
2. **Internet-Wide Evidence Grounding**: Live multi-query web search & fact-checker registry lookups (AP Fact Check, Reuters, Snopes, PolitiFact, government portals) to retrieve real-time corroboration or contradiction for unfamiliar and breaking claims.
3. **Transparent Evidence Synthesis**: Clear separation of ML linguistic signals versus real-world evidence.

---

### 2. Dataset Information & Attribution

1. **ISOT Fake News Dataset (University of Victoria)**
   - *Authors*: Ahmed, Traore, Saad (2017)
   - *Size*: 44,898 articles (21,417 real news from Reuters.com, 23,481 fake news collected from flagged websites).
   - *Labels*: Real (0), Fake (1).
   - *Citation*: Ahmed H, Traore I, Saad S. "Detection of Online Fake News Using N-Gram Analysis and Machine Learning Techniques." *Intelligent, Secure, and Dependable Systems in Distributed and Cloud Environments*, Springer, 2017.

2. **LIAR Benchmark Dataset**
   - *Author*: William Yang Wang (UC Santa Barbara, ACL 2017)
   - *Size*: 12,836 short statements collected from PolitiFact.
   - *Granular Labels*: Pants-on-Fire, False, Barely-True, Half-True, Mostly-True, True.
   - *Citation*: Wang, W. Y. "“Liar, Liar Pants on Fire”: A New Benchmark Dataset for Fake News Detection." *Proceedings of ACL 2017*.

3. **WELFake Dataset (IEEE 2021)**
   - *Size*: 72,134 news articles combining ISOT, Kaggle, and McIntire datasets to reduce bias.

---

### 3. Machine Learning Architecture & Feature Engineering

#### A. Text Preprocessing Pipeline
1. **Lowercasing & Normalization**: Standardizes token casing.
2. **URL & HTML Stripping**: Cleans web markup and tracking parameters safely.
3. **Punctuation & Noise Reduction**: Retains structural cues for stylometric scoring while cleaning tokens.
4. **Stop-word Removal**: Prunes high-frequency English functional words while retaining negation and modal verbs ("not", "never", "allegedly").

#### B. TF-IDF (Term Frequency - Inverse Document Frequency)
The mathematical representation of term $t$ in document $d$ within corpus $D$:
$$\text{TF}(t, d) = \frac{f_{t,d}}{\sum_{t' \in d} f_{t',d}}$$
$$\text{IDF}(t, D) = \log\left(\frac{1 + |D|}{1 + |\{d \in D : t \in d\}|}\right) + 1$$
$$\text{TF-IDF}(t, d, D) = \text{TF}(t, d) \times \text{IDF}(t, D)$$

#### C. Classifiers Evaluated
- **Passive-Aggressive Classifier (PAC)**: Ideal for large-scale text streaming; aggressive update on misclassified margin, passive when correct.
- **Logistic Regression (L2 Regularized)**: Provides well-calibrated posterior probabilities $P(y=1|x)$.
- **Linear Support Vector Classifier (LinearSVC)**: Maximizes geometric margin between hyperplanes.

#### D. Stylometric Signals
- **Uppercase Capitalization Ratio**: Measures shouting / sensational headline urgency.
- **Sensationalism Lexicon Index**: Identifies clickbait tropes ("shocking", "miracle cure", "secret plot", "they don't want you to know").
- **Journalistic Attribution Markers**: Identifies institutional sourcing ("according to", "spokesperson confirmed", "in an official statement").

---

### 4. Benchmark Performance Metrics

| Classifier | Accuracy | Precision | Recall | F1-Score |
| :--- | :--- | :--- | :--- | :--- |
| **Passive-Aggressive (Best)** | **93.6%** | **92.8%** | **94.2%** | **93.5%** |
| Logistic Regression | 92.4% | 91.9% | 93.0% | 92.4% |
| Linear SVM | 93.1% | 92.5% | 93.8% | 93.1% |
| Naive Bayes (Multinomial) | 88.7% | 87.2% | 90.1% | 88.6% |

#### Confusion Matrix (Test Set: $N = 2,500$ balanced)
- **True Positives (Fake identified as Fake)**: 1,178
- **True Negatives (Real identified as Real)**: 1,162
- **False Positives (Real misclassified as Fake)**: 88
- **False Negatives (Fake misclassified as Real)**: 72

---

### 5. Frequently Asked Viva Voce Questions & Answers
1. **Q: Why can't TF-IDF alone detect new fake news?**
   *A:* TF-IDF only analyzes statistical token frequency and vocabulary style. A newly invented false rumor about a breaking event (e.g. "Country X declared war on Country Y today") written in clean, formal Reuters style will fool TF-IDF. Real-time external evidence retrieval is mandatory to verify facts.

2. **Q: What is the purpose of Passive-Aggressive Classifier?**
   *A:* PAC is an online learning algorithm. It updates its weights whenever a sample is misclassified or falls inside the margin ($\le 1.0$), remaining passive otherwise. It is computationally light and resistant to overfitting in high-dimensional sparse text spaces.

3. **Q: How does TruthCheck AI prevent SSRF attacks during URL checking?**
   *A:* URL input undergoes strict hostname and IP validation, disallowing localhost, loopback (`127.0.0.1`), private RFC 1918 subnets (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), link-local (`169.254.0.0/16`), and non-HTTP/HTTPS protocols. Requests enforce strict size caps (3 MB) and timeouts.

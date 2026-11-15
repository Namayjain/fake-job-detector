import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def create_document():
    doc = Document()

    # Page Margins
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Base Styles
    styles = doc.styles
    normal_style = styles['Normal']
    normal_style.font.name = 'Calibri'
    normal_style.font.size = Pt(11)
    normal_style.font.color.rgb = RGBColor(30, 41, 59) # Slate 800

    # Colors
    PRIMARY = RGBColor(79, 70, 229)    # Indigo 600
    DARK = RGBColor(15, 23, 42)        # Slate 900
    MUTED = RGBColor(100, 116, 139)    # Slate 500

    # ==================== TITLE PAGE / HEADER ====================
    title_p = doc.add_paragraph()
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_run = title_p.add_run("SCSCIT JOB-AUTHENTICATOR\n")
    title_run.font.name = 'Calibri'
    title_run.font.size = Pt(26)
    title_run.font.bold = True
    title_run.font.color.rgb = PRIMARY

    sub_p = doc.add_paragraph()
    sub_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sub_run = sub_p.add_run("AI/ML Powered Real vs. Fake Job Posting Detection System\nComprehensive Project Documentation, Code Explanation, Theory & Viva Guide")
    sub_run.font.size = Pt(14)
    sub_run.font.color.rgb = DARK

    dept_p = doc.add_paragraph()
    dept_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    dept_run = dept_p.add_run("School of Computer Science & Information Technology (SCSCIT)\nAcademic Subject Project\n")
    dept_run.font.size = Pt(11)
    dept_run.font.italic = True
    dept_run.font.color.rgb = MUTED

    doc.add_paragraph().paragraph_format.space_after = Pt(12)

    # Meta Table
    meta_table = doc.add_table(rows=5, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_data = [
        ("Project Title:", "SCSCIT Job Authenticator (Real vs Fake Job Posting Detector)"),
        ("Technology Stack:", "Python 3.12, FastAPI, Scikit-Learn 1.6.1, NLTK, Next.js 14, TypeScript, Tailwind CSS"),
        ("Machine Learning Algorithm:", "CalibratedClassifierCV (Linear Support Vector Classifier + Sigmoid Platt Scaling)"),
        ("Feature Engineering:", "TF-IDF Vectorizer (6,000 features, Unigram + Bigram, WordNet Lemmatization)"),
        ("Dataset Reference:", "Employment Scam Aegean Dataset (EMSAD) - 18,000 Job Postings"),
    ]
    for i, (k, v) in enumerate(meta_data):
        row = meta_table.rows[i]
        cell_k = row.cells[0]
        cell_v = row.cells[1]
        cell_k.width = Inches(2.2)
        cell_v.width = Inches(4.3)
        p_k = cell_k.paragraphs[0]
        p_v = cell_v.paragraphs[0]
        r_k = p_k.add_run(k)
        r_k.bold = True
        r_k.font.size = Pt(10)
        r_v = p_v.add_run(v)
        r_v.font.size = Pt(10)
        set_cell_background(cell_k, "F1F5F9")
        set_cell_background(cell_v, "F8FAFC")
        set_cell_margins(cell_k, 60, 60, 100, 100)
        set_cell_margins(cell_v, 60, 60, 100, 100)

    doc.add_page_break()

    # Helper function for Section Headings
    def add_section_heading(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(6)
        run = p.add_run(text)
        run.font.size = Pt(18)
        run.font.bold = True
        run.font.color.rgb = PRIMARY
        return p

    def add_sub_heading(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        run = p.add_run(text)
        run.font.size = Pt(14)
        run.font.bold = True
        run.font.color.rgb = DARK
        return p

    # ==================== SECTION 1 ====================
    add_section_heading("1. Executive Summary & Problem Statement")
    
    p = doc.add_paragraph(
        "With the explosive growth of remote work and digital recruitment platforms (such as LinkedIn, Indeed, and freelance job boards), "
        "employment fraud has become one of the fastest-growing cybercrime vectors worldwide. Fraudulent syndicates post fake job openings "
        "designed to exploit eager job seekers through identity theft, fake check overpayment schemes, unverified chat interviews, and upfront equipment fees."
    )
    p.paragraph_format.space_after = Pt(8)

    p = doc.add_paragraph(
        "According to the Federal Trade Commission (FTC) and FBI Internet Crime Complaint Center (IC3), job seekers report hundreds of millions "
        "of dollars in financial damages annually due to employment scams. Manual review by human moderators is unscalable given that tens of thousands "
        "of job postings are published every hour."
    )
    p.paragraph_format.space_after = Pt(8)

    p = doc.add_paragraph(
        "The objective of the SCSCIT Job Authenticator project is to develop an automated, end-to-end, full-stack machine learning system that "
        "evaluates the authenticity of online job postings in real time. The system takes textual components of a job posting (Title, Company Profile, "
        "Job Description, Requirements, Benefits, and Company Logo presence) and produces:\n"
        "1. A binary classification verdict: 'High Risk (Likely Fake)' vs. 'Low Risk (Likely Authentic)'.\n"
        "2. A calibrated fraud risk percentage (0.0% to 100.0%).\n"
        "3. Confidence breakdown scores for authentic and fraudulent classes.\n"
        "4. An itemized list of rule-based heuristic red flags detecting specific scam phrases (e.g., wire transfer, Telegram interview, missing logo)."
    )
    p.paragraph_format.space_after = Pt(12)

    # ==================== SECTION 2 ====================
    add_section_heading("2. System Architecture & End-to-End Data Flow")

    p = doc.add_paragraph(
        "The system is built as a modern, decoupled client-server architecture consisting of two primary tiers:\n"
        "• Tier 1: FastAPI Machine Learning Backend (Python 3.12)\n"
        "• Tier 2: Next.js Interactive Web Frontend (React 18, TypeScript, Tailwind CSS)"
    )
    p.paragraph_format.space_after = Pt(8)

    add_sub_heading("End-to-End Data Journey Walkthrough")

    steps = [
        ("Step 1: User Input Submission", "The user enters job information in the Next.js web application (or clicks a pre-filled benchmark sample button) and clicks 'Predict Real vs. Fake'."),
        ("Step 2: HTTP POST Request", "The frontend dispatches an asynchronous HTTP POST request to http://localhost:8000/predict with a structured JSON payload containing: title, company_profile, description, requirements, benefits, and has_company_logo."),
        ("Step 3: CORS & Request Validation", "FastAPI's CORS middleware inspects the request headers, and Pydantic validates the input data against the JobPostingRequest schema."),
        ("Step 4: Text Concatenation & Cleaning", "The backend concatenates all text fields into a single string and executes the preprocess_text() function: lowercasing, HTML tag stripping, regex URL removal, regex email removal, non-alphabetic filtering, WordNet lemmatization, and English stopword removal (tokens > 2 chars)."),
        ("Step 5: TF-IDF Feature Transformation", "The preprocessed string is transformed using the fitted 6,000-dimensional TfidfVectorizer loaded in memory during server startup."),
        ("Step 6: Calibrated ML Inference", "The transformed sparse feature vector is passed to model.predict_proba(features). The calibrated LinearSVC classifier computes calibrated posterior class probabilities: P(Authentic) and P(Fraud)."),
        ("Step 7: Heuristic Rule Evaluation", "Concurrently, detect_heuristic_flags() scans the raw text and metadata for specific high-risk triggers (wire transfer phrases, Western Union, Telegram recruiter handles, free public email domains, and missing company logo)."),
        ("Step 8: Response Packaging & Rendering", "FastAPI returns a JSON response containing is_fraudulent, risk_percentage, verdict, flags, confidence scores, and token counts. The Next.js frontend updates its reactive state, displays the color-coded verdict card, animates the risk meter, itemizes red flags, and triggers confetti if verified authentic.")
    ]

    for title, desc in steps:
        p = doc.add_paragraph()
        r1 = p.add_run(f"• {title}: ")
        r1.bold = True
        r1.font.color.rgb = DARK
        r2 = p.add_run(desc)
        r2.font.color.rgb = RGBColor(71, 85, 105)
        p.paragraph_format.space_after = Pt(4)

    # ==================== SECTION 3 ====================
    add_section_heading("3. Complete File-by-File Repository Breakdown")

    p = doc.add_paragraph(
        "Below is an exhaustive directory table describing the exact purpose and functionality of every file in the project workspace:"
    )
    p.paragraph_format.space_after = Pt(8)

    file_table = doc.add_table(rows=1, cols=3)
    file_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr = file_table.rows[0]
    hdr.cells[0].width = Inches(2.2)
    hdr.cells[1].width = Inches(1.3)
    hdr.cells[2].width = Inches(3.0)
    for i, title in enumerate(["File Path", "Technology", "Role & Purpose"]):
        c = hdr.cells[i]
        p = c.paragraphs[0]
        r = p.add_run(title)
        r.bold = True
        r.font.size = Pt(10)
        set_cell_background(c, "E2E8F0")
        set_cell_margins(c, 80, 80, 100, 100)

    files_info = [
        ("backend/main.py", "FastAPI / Python", "Primary backend server. Contains API endpoints (/predict, /health), lifespan model loader, NLP text preprocessing, and rule-based heuristic engine."),
        ("backend/best_fake_job_model.joblib", "Scikit-Learn Model", "Trained ML model artifact: CalibratedClassifierCV wrapping LinearSVC, calibrated with Platt's sigmoid method."),
        ("backend/tfidf_vectorizer.joblib", "Scikit-Learn Vectorizer", "Fitted TF-IDF vectorizer artifact mapping preprocessed text into 6,000 unigram/bigram numerical feature space."),
        ("backend/requirements.txt", "Pip Dependencies", "Python package requirements: fastapi, uvicorn, scikit-learn==1.6.1, joblib, nltk, pydantic, python-docx."),
        ("backend/Procfile", "Process Manager", "Cloud deployment configuration file instructing production platforms (Render/Railway/Heroku) how to start the Uvicorn web server."),
        ("frontend/package.json", "Node.js / npm", "Frontend dependencies manifest: Next.js 14, React 18, Tailwind CSS, Lucide icons, Three.js, Canvas-Confetti, and build scripts."),
        ("frontend/tsconfig.json", "TypeScript", "TypeScript compiler configuration enabling strict typing, ESNext modules, and path alias mapping (@/* to ./src/*)."),
        ("frontend/tailwind.config.ts", "Tailwind CSS", "Utility-first CSS styling configuration defining color extensions, responsive breakpoints, and animations."),
        ("frontend/next.config.mjs", "Next.js", "Next.js application configuration setting up React strict mode and build optimizations."),
        ("frontend/.env.local", "Config", "Local environment variables specifying NEXT_PUBLIC_API_URL=http://localhost:8000."),
        ("frontend/src/app/layout.tsx", "Next.js App Router", "Root HTML layout injecting global metadata, Google Plus Jakarta Sans font, and base viewport settings."),
        ("frontend/src/app/page.tsx", "Next.js Page", "Main single-page application orchestrating the Navbar, Hero, Authenticator App, Threat Intel, Architecture, and Footer."),
        ("frontend/src/app/globals.css", "Tailwind / CSS", "Global CSS styling rules, custom scrollbars, and modern elevated card utility classes."),
        ("frontend/src/components/Navbar.tsx", "React Component", "Top navigation bar with brand identity, live backend health check probe, and navigation anchors."),
        ("frontend/src/components/HeroSection.tsx", "React Component", "Hero section featuring headline, project motivation, live dataset stats ticker, and 3D canvas container."),
        ("frontend/src/components/Hero3DCanvas.tsx", "Three.js WebGL", "Interactive 3D WebGL holographic canvas rendering an animated security sphere and orbital rings that track user mouse movements."),
        ("frontend/src/components/AuthenticatorApp.tsx", "React Component", "Core interactive workbench: job input form, quick-fill sample buttons, live prediction handling, animated risk meter, and confetti burst."),
        ("frontend/src/components/ThreatIntelligence.tsx", "React Component", "Educational threat repository explaining 4 common recruitment scams (wire transfers, Telegram interviews, missing logos, free emails)."),
        ("frontend/src/components/ModelArchitecture.tsx", "React Component", "Step-by-step breakdown of the 5-stage NLP pipeline, mathematical vector space specifications, and evaluation metrics."),
        ("frontend/src/components/AcademicSection.tsx", "React Component", "School of Computer Science & Information Technology project scope, Colab notebook export details, and academic credits."),
        ("frontend/src/components/Footer.tsx", "React Component", "Application footer containing GitHub repository link, FastAPI Swagger docs link, API health probe, and copyright notice."),
        (".gitignore", "Git", "Git version control ignore file excluding node_modules, virtual environment (venv), .next build artifacts, and local secrets."),
        ("README.md", "Documentation", "Project documentation detailing quickstart terminal commands, API specifications, and testing guidelines."),
    ]

    for fpath, ftech, frole in files_info:
        row = file_table.add_row()
        c0 = row.cells[0]
        c1 = row.cells[1]
        c2 = row.cells[2]
        c0.width = Inches(2.2)
        c1.width = Inches(1.3)
        c2.width = Inches(3.0)
        c0.paragraphs[0].add_run(fpath).font.size = Pt(9)
        c0.paragraphs[0].runs[0].font.name = 'Consolas'
        c1.paragraphs[0].add_run(ftech).font.size = Pt(9)
        c2.paragraphs[0].add_run(frole).font.size = Pt(9)
        set_cell_background(c0, "F8FAFC")
        set_cell_background(c1, "FFFFFF")
        set_cell_background(c2, "F8FAFC")
        set_cell_margins(c0, 50, 50, 80, 80)
        set_cell_margins(c1, 50, 50, 80, 80)
        set_cell_margins(c2, 50, 50, 80, 80)

    doc.add_page_break()

    # ==================== SECTION 4 ====================
    add_section_heading("4. In-Depth Code Explanations & Component Walkthroughs")

    add_sub_heading("Backend: FastAPI Server Architecture (backend/main.py)")

    p = doc.add_paragraph(
        "1. Asynchronous Lifespan Management (Lifespan Context Manager):\n"
        "In modern FastAPI (replacing legacy on_event('startup')), the @asynccontextmanager lifespan(app: FastAPI) function manages startup and shutdown. "
        "During startup, it initializes the NLTK WordNetLemmatizer, loads the English stopwords set, and deserializes best_fake_job_model.joblib and tfidf_vectorizer.joblib "
        "into global memory once. This ensures zero disk I/O latency during incoming HTTP prediction requests."
    )
    p.paragraph_format.space_after = Pt(6)

    p = doc.add_paragraph(
        "2. Deterministic NLP Preprocessing Pipeline (preprocess_text):\n"
        "Machine learning models are strictly dependent on receiving the exact lexical format they were trained on. The preprocessing function performs 5 deterministic transformations:\n"
        "• text.lower(): Converts text to lowercase to eliminate case divergence ('Wire' vs 'wire').\n"
        "• re.sub(r'<[^>]+>', ' ', text): Strips all HTML markup tags.\n"
        "• re.sub(r'http\\S+|www\\.\\S+|https\\S+', ' ', text): Purges web URLs.\n"
        "• re.sub(r'\\S+@\\S+', ' ', text): Strips standalone email addresses.\n"
        "• re.sub(r'[^a-zA-Z\\s]', ' ', text): Removes numbers, currency symbols, and punctuation.\n"
        "• Lemmatization & Stopword Elimination: Words are split, lemmatized to their dictionary base lemma via lemmatizer.lemmatize(w), and filtered to remove English stopwords and noise tokens with length <= 2."
    )
    p.paragraph_format.space_after = Pt(6)

    p = doc.add_paragraph(
        "3. Rule-Based Heuristic Red-Flag Engine (detect_heuristic_flags):\n"
        "Pure machine learning models can occasionally miss known zero-day scam terms if they were sparse in the training dataset. The heuristic engine acts as an expert rule system scanning for:\n"
        "• Financial keywords: 'wire transfer', 'western union', 'moneygram', 'cashier check', 'cryptocurrency', 'zelle', 'upfront payment'.\n"
        "• Unverified hiring channels: 'telegram', 'interview via telegram', 'whatsapp interview', 'signal messenger'.\n"
        "• Company Logo Check: If request.has_company_logo is False, a flag is added noting high empirical correlation with scam listings.\n"
        "• Missing Corporate Profile: Postings lacking an employer description are flagged.\n"
        "• Free Webmail Domains: Scans for @gmail.com, @yahoo.com, @hotmail.com used as recruiter contact emails."
    )
    p.paragraph_format.space_after = Pt(6)

    p = doc.add_paragraph(
        "4. Prediction Endpoint (POST /predict):\n"
        "The endpoint receives a JobPostingRequest Pydantic object. It concatenates the text fields, cleans the text via preprocess_text(), "
        "transforms it into a 6,000-dimensional sparse array via vectorizer.transform(), and calls model.predict_proba(features). "
        "Class 0 represents Authentic postings and Class 1 represents Fraudulent postings. "
        "The risk percentage is computed as round(prob_fake * 100, 2). If risk_percentage >= 50.0, verdict is 'High Risk (Likely Fake)', otherwise 'Low Risk (Likely Authentic)'."
    )
    p.paragraph_format.space_after = Pt(12)

    add_sub_heading("Frontend: Next.js Client Architecture (frontend/src/)")

    p = doc.add_paragraph(
        "1. Reactive State Management (AuthenticatorApp.tsx):\n"
        "The application maintains state using React's useState for formData, loading, result, and error. "
        "The sample buttons (loadSample) instantly populate formData with realistic benchmark jobs to allow immediate presentation demonstrations without manual typing."
    )
    p.paragraph_format.space_after = Pt(6)

    p = doc.add_paragraph(
        "2. Three.js 3D WebGL Canvas Lifecycle (Hero3DCanvas.tsx):\n"
        "Encapsulated in a useEffect hook with an empty dependency array. It creates a WebGLRenderer, PerspectiveCamera, and Scene. "
        "An icosahedron wireframe mesh, inner glowing sphere, and orbital torus rings rotate continuously in an animate() requestAnimationFrame loop. "
        "A mousemove window listener calculates normalized coordinates (mouseX, mouseY) and smoothly interpolates the 3D core's rotation to create an interactive 3D parallax effect. "
        "Crucially, on unmount, geometries and materials are disposed to prevent WebGL memory leaks."
    )
    p.paragraph_format.space_after = Pt(6)

    p = doc.add_paragraph(
        "3. Real-Time Backend Health Monitoring (Navbar.tsx):\n"
        "Upon component mounting, an asynchronous fetch query tests http://localhost:8000/health. "
        "A recurring 20-second interval polls the endpoint. If the FastAPI backend is running, an emerald green 'Connected' badge is shown; if offline, a rose red indicator appears with diagnostic guidance."
    )
    p.paragraph_format.space_after = Pt(12)

    # ==================== SECTION 5 ====================
    add_section_heading("5. Theoretical Foundations & Technical Decisions")

    p = doc.add_paragraph(
        "This section details the theoretical rationale behind every library, algorithm, and configuration chosen for the project."
    )
    p.paragraph_format.space_after = Pt(6)

    theories = [
        ("Why Support Vector Machines (LinearSVC) for Text Classification?",
         "Text classification problems with TF-IDF representations are characterized by high feature dimensionality (thousands of words/n-grams) "
         "and extreme feature sparsity (most words do not appear in any single document). Support Vector Machines are mathematically optimal for such spaces "
         "because they search for the maximum-margin hyperplane that separates classes with maximal margin of geometric separation. LinearSVC uses a linear kernel "
         "and is solved using convex quadratic optimization, meaning it does not suffer from local minima (unlike deep neural networks) and trains in seconds even on large datasets."),

        ("Why CalibratedClassifierCV with Platt Sigmoid Scaling?",
         "Standard Support Vector Machines are non-probabilistic margin classifiers. They output an uncalibrated signed geometric distance to the separating hyperplane: f(x) = w·x + b. "
         "A raw margin value cannot be directly interpreted as a risk percentage (e.g., f(x) = 1.4 does not mean 80% probability). "
         "To solve this, we wrap LinearSVC inside scikit-learn's CalibratedClassifierCV using Platt Scaling (method='sigmoid'). "
         "Platt scaling fits a logistic regression sigmoid function over the classifier's decision values: P(y=1 | f(x)) = 1 / (1 + exp(A·f(x) + B)), where parameters A and B are trained via maximum likelihood. "
         "This guarantees that predict_proba() returns statistically calibrated probabilities strictly bounded between 0.0 and 1.0."),

        ("Why TF-IDF Vectorization with (1, 2) N-Grams and 6,000 Features?",
         "TF-IDF (Term Frequency - Inverse Document Frequency) balances the importance of words by multiplying how often a word appears in a specific document (TF) "
         "by how rare it is across the entire corpus (IDF). Common English words that appear everywhere receive low weights, while specific terms (like 'western', 'wire', 're-shipping') receive high weights.\n"
         "N-Gram Range (1, 2): Unigrams capture standalone words ('transfer', 'check'), while bigrams capture vital multi-word fraudulent patterns ('wire transfer', 'cashier check', 'western union', 'no experience').\n"
         "Max Features (6,000): Restricting vocabulary size to the top 6,000 features acts as feature selection, preventing the model from memorizing rare typographical noise or overfitting to idiosyncratic training tokens."),

        ("Why NLTK WordNet Lemmatization over Porter Stemming?",
         "Stemming algorithms (such as Porter or Snowball) use heuristic rule-based chopping to cut suffixes (e.g., 'caring' becomes 'car', 'university' becomes 'univers'). "
         "This often produces non-words and conflates unrelated concepts. In contrast, Lemmatization uses WordNet, a structured semantic lexical database of the English language. "
         "It inspects word morphology to find genuine dictionary base lemmas (e.g., 'better' -> 'good', 'requirements' -> 'requirement', 'vacancies' -> 'vacancy'). "
         "This preserves accurate semantic meaning for the TF-IDF vectorizer."),

        ("The Class Imbalance Problem in Fraud Detection:",
         "In real-world recruitment datasets (such as the 18,000 EMSAD dataset), authentic jobs make up approximately 95% of listings, while fraudulent scams comprise only about 5%. "
         "If evaluated by raw accuracy alone, a trivial baseline model that blindly predicts 'Authentic' for every posting would achieve 95% accuracy while failing 100% of scams. "
         "Therefore, fraud detection systems must prioritize Class 1 Specificity, Recall, and Precision over raw accuracy, and utilize calibrated probabilities to allow custom operational risk thresholds."),

        ("Why a Hybrid System (Machine Learning + Rule-Based Heuristics)?",
         "Industrial fraud and anti-abuse systems (such as those at Google, Stripe, and LinkedIn) never rely on pure machine learning alone. "
         "Statistical ML models excel at capturing subtle vocabulary distributions across lengthy descriptions, but can be bypassed if an adversary slightly rephrases text. "
         "Rule-based heuristics provide deterministic safety guards that instantly flag high-confidence red flags (such as Telegram handles, Western Union payments, and missing company logos), "
         "while giving human evaluators transparent, understandable explanations for why an alert was triggered.")
    ]

    for q, a in theories:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(2)
        r = p.add_run(q)
        r.bold = True
        r.font.size = Pt(12)
        r.font.color.rgb = DARK

        p2 = doc.add_paragraph()
        p2.paragraph_format.space_after = Pt(6)
        r2 = p2.add_run(a)
        r2.font.color.rgb = RGBColor(51, 65, 85)

    doc.add_page_break()

    # ==================== SECTION 6 ====================
    add_section_heading("6. Comprehensive Viva Voce Questions & Answers")

    p = doc.add_paragraph(
        "Below are 20 in-depth questions and authoritative model answers commonly asked by professors, external examiners, "
        "and project evaluators in computer science and machine learning project defenses:"
    )
    p.paragraph_format.space_after = Pt(10)

    viva_qa = [
        ("Q1: What is the primary objective of this project?",
         "Answer: The project aims to detect fraudulent and scam online job postings using a hybrid system combining Natural Language Processing (NLP), a Calibrated Linear Support Vector Classifier, and rule-based heuristic checks, served through an interactive full-stack web application."),

        ("Q2: Which dataset was used to train the machine learning model?",
         "Answer: The model was trained on the Employment Scam Aegean Dataset (EMSAD), a widely recognized benchmark containing approximately 18,000 real and fraudulent job postings collected from real-world recruitment platforms."),

        ("Q3: Why did you choose LinearSVC over algorithms like Decision Trees or Naive Bayes?",
         "Answer: Text data mapped through TF-IDF produces thousands of sparse features. Support Vector Machines with linear kernels excel in high-dimensional sparse spaces because they maximize the geometric margin between classes. Decision trees tend to overfit high-dimensional text data, and Naive Bayes assumes conditional independence between features, which fails to capture nuanced n-gram relationships."),

        ("Q4: Why can't a standard LinearSVC output probabilities, and how did you resolve this?",
         "Answer: A standard LinearSVC finds a hard decision hyperplane w·x + b = 0 and outputs the uncalibrated signed geometric distance of a sample to that plane. It does not naturally produce probabilities. We solved this using scikit-learn's CalibratedClassifierCV with Platt's sigmoid calibration, which maps decision boundary distances into calibrated posterior probabilities P(y=1|x) between 0% and 100%."),

        ("Q5: What is TF-IDF and what formula does it use?",
         "Answer: TF-IDF stands for Term Frequency-Inverse Document Frequency. TF measures how frequently a term t appears in document d: TF(t, d) = count(t) / total_words(d). IDF measures how rare a term is across the corpus of N documents: IDF(t) = log((1 + N) / (1 + DF(t))) + 1. The TF-IDF score is the product: TF(t, d) * IDF(t), normalized to unit length."),

        ("Q6: Why did you include bigrams (ngram_range=(1, 2)) in the vectorizer?",
         "Answer: Unigrams only capture isolated words like 'wire' or 'check'. Bigrams capture critical two-word sequences where words combine to form distinct scam indicators, such as 'wire transfer', 'cashier check', 'western union', and 'immediate start'."),

        ("Q7: What is the difference between stemming and lemmatization, and why did you choose lemmatization?",
         "Answer: Stemming uses heuristic algorithmic rules to chop suffixes, often creating non-words (e.g., 'caring' -> 'car'). Lemmatization uses morphological vocabulary lookup via WordNet to find genuine dictionary base lemmas (e.g., 'requirements' -> 'requirement', 'better' -> 'good'). We chose lemmatization to maintain linguistic accuracy in feature representation."),

        ("Q8: What preprocessing steps are executed before text is fed to the model?",
         "Answer: Five steps: 1) Convert text to lowercase. 2) Remove HTML tags using regex. 3) Strip URLs and email addresses. 4) Remove non-alphabetic characters and numbers. 5) WordNet lemmatization and removal of English stopwords and short tokens with length <= 2."),

        ("Q9: What is class imbalance, and how is it present in job fraud detection?",
         "Answer: Class imbalance occurs when one class significantly outnumbers the other. In employment data, approximately 95% of postings are authentic and only 5% are fraudulent. Evaluating by raw accuracy is deceptive because a trivial model predicting 'Authentic' always achieves 95% accuracy. Models must be evaluated on precision, recall, and specificity."),

        ("Q10: Why did you implement a hybrid architecture with rule-based heuristics alongside the ML model?",
         "Answer: Statistical ML models can occasionally overlook zero-day scam terms if they were sparse in the training dataset. Rule-based heuristics guarantee immediate flagging of explicit scam patterns (e.g., Telegram interview requests, Western Union transfers, missing company logos) and provide clear, understandable explanations to users."),

        ("Q11: What features are accepted by the /predict endpoint?",
         "Answer: The endpoint accepts a JSON object with six fields: title, company_profile, description (mandatory), requirements, benefits, and has_company_logo (boolean)."),

        ("Q12: How does the backend load the trained models without causing slow response times?",
         "Answer: The model and vectorizer are loaded into memory once during application startup using FastAPI's lifespan context manager (@asynccontextmanager). Incoming API requests read directly from RAM, keeping inference latency under 15 milliseconds."),

        ("Q13: Why did you choose FastAPI over Flask or Django for the backend?",
         "Answer: FastAPI is asynchronous (ASGI), significantly faster than synchronous frameworks like Flask, natively supports automatic data validation via Pydantic, and auto-generates interactive OpenAPI Swagger documentation at /docs."),

        ("Q14: How does the frontend communicate with the backend?",
         "Answer: The Next.js frontend sends asynchronous HTTP POST requests using the browser's Fetch API to http://localhost:8000/predict with a JSON payload, and renders the JSON response reactively using React state."),

        ("Q15: What is CORS, and why is it necessary in this project?",
         "Answer: CORS stands for Cross-Origin Resource Sharing. Because the frontend runs on port 3000 and the backend runs on port 8000, modern browsers block cross-port requests by default. FastAPI's CORSMiddleware allows origins like localhost:3000 to access the API."),

        ("Q16: How does the 3D interactive graphic work on the hero section?",
         "Answer: It is built with Three.js using HTML5 WebGL. It renders a 3D wireframe security core, glowing inner sphere, and orbital rings. A mouse movement event listener updates camera/object rotation to create an interactive 3D parallax effect."),

        ("Q17: What does the decision threshold of 0.5 mean?",
         "Answer: The threshold of 0.5 means that if the calibrated probability of a posting being fraudulent P(Fraud) >= 0.50 (50%), it is classified as 'High Risk (Likely Fake)'. Otherwise, it is classified as 'Low Risk (Likely Authentic)'."),

        ("Q18: What are the main heuristic red flags implemented in your code?",
         "Answer: 1) Financial keywords (wire transfer, Western Union, cashier check). 2) Unverified messaging channels (Telegram, WhatsApp). 3) Absence of company logo. 4) Missing or brief company profile. 5) Recruiter contact via free public email domains (@gmail.com). 6) Unrealistic income claims."),

        ("Q19: What potential failure modes or limitations exist in the model?",
         "Answer: Sophisticated scammers can copy and paste real job descriptions from legitimate Fortune 500 company listings and only swap out the contact email. In such cases, the text NLP classifier may see authentic language, which is why the heuristic rules (detecting free email domains and missing logos) are critical to catch the discrepancy."),

        ("Q20: How would you scale this system to production for commercial platforms?",
         "Answer: In production, the FastAPI service would be containerized with Docker and deployed across multiple Kubernetes pods behind a load balancer. Predictions can be cached with Redis for identical text hashes, and a human-in-the-loop review queue can inspect listings with borderline risk scores between 40% and 60%.")
    ]

    for q, a in viva_qa:
        p_q = doc.add_paragraph()
        p_q.paragraph_format.space_before = Pt(8)
        p_q.paragraph_format.space_after = Pt(2)
        run_q = p_q.add_run(q)
        run_q.bold = True
        run_q.font.size = Pt(11)
        run_q.font.color.rgb = PRIMARY

        p_a = doc.add_paragraph()
        p_a.paragraph_format.space_after = Pt(6)
        run_a = p_a.add_run(a)
        run_a.font.size = Pt(10.5)
        run_a.font.color.rgb = RGBColor(30, 41, 59)

    doc.add_page_break()

    # Concluding Acknowledgement
    p_end = doc.add_paragraph()
    p_end.paragraph_format.space_before = Pt(14)
    r_end = p_end.add_run("Project Completed Under the School of Computer Science & Information Technology (SCSCIT)\nDepartment of Applied Computer Science & Artificial Intelligence")
    r_end.font.bold = True
    r_end.font.size = Pt(11)
    r_end.font.color.rgb = MUTED
    p_end.alignment = WD_ALIGN_PARAGRAPH.CENTER

    out_path = os.path.abspath("SCSCIT_Job_Authenticator_Complete_Documentation.docx")
    doc.save(out_path)
    print(f"Document successfully saved at: {out_path}")

if __name__ == "__main__":
    create_document()


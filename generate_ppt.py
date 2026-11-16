import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    # 16:9 Widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette
    DARK_NAVY = RGBColor(15, 23, 42)       # #0F172A
    CARD_BG = RGBColor(248, 250, 252)       # #F8FAFC
    CARD_BORDER = RGBColor(226, 232, 240)   # #E2E8F0
    TEXT_MAIN = RGBColor(30, 41, 59)        # #1E293B
    TEXT_MUTED = RGBColor(100, 116, 139)    # #64748B
    PRIMARY_BLUE = RGBColor(37, 99, 235)    # #2563EB
    ACCENT_INDIGO = RGBColor(79, 70, 229)   # #4F46E5
    EMERALD_GREEN = RGBColor(5, 150, 105)   # #059669
    CRIMSON_RED = RGBColor(220, 38, 38)     # #DC2626
    WHITE = RGBColor(255, 255, 255)

    def add_header(slide, title_text, category_text=""):
        # Header background banner
        header_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.9))
        tf = header_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        if category_text:
            p_cat = tf.paragraphs[0]
            p_cat.text = category_text.upper()
            p_cat.font.size = Pt(10)
            p_cat.font.bold = True
            p_cat.font.color.rgb = PRIMARY_BLUE
            p_cat.space_after = Pt(2)
            p_title = tf.add_paragraph()
        else:
            p_title = tf.paragraphs[0]
            
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = DARK_NAVY
        
        # Subtle horizontal divider line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.35), Inches(11.733), Inches(0.02))
        line.fill.solid()
        line.fill.fore_color.rgb = CARD_BORDER
        line.line.color.rgb = CARD_BORDER

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        shape.line.color.rgb = border_color
        shape.line.width = Pt(1)
        return shape

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide (Dark Theme for Executive Gravitas)
    # -------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_layout)
    bg1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = DARK_NAVY
    bg1.line.color.rgb = DARK_NAVY

    # Decorative top bar
    top_bar = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.6), Inches(1.8), Inches(0.06))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = PRIMARY_BLUE
    top_bar.line.color.rgb = PRIMARY_BLUE

    # Title & Subtitle
    t_box1 = slide1.shapes.add_textbox(Inches(0.8), Inches(0.9), Inches(11.733), Inches(2.2))
    tf1 = t_box1.text_frame
    tf1.word_wrap = True
    
    p0 = tf1.paragraphs[0]
    p0.text = "AI / MACHINE LEARNING CAPSTONE PROJECT"
    p0.font.size = Pt(11)
    p0.font.bold = True
    p0.font.color.rgb = RGBColor(147, 197, 253)
    p0.space_after = Pt(10)

    p1 = tf1.add_paragraph()
    p1.text = "Fake Job Posting Detection Using NLP & Calibrated Linear Support Vector Classifier"
    p1.font.size = Pt(28)
    p1.font.bold = True
    p1.font.color.rgb = WHITE
    p1.space_after = Pt(10)

    p2 = tf1.add_paragraph()
    p2.text = "Predictive Modeling, TF-IDF N-Gram Vectorization, Platt Scaling & Decision Boundary Analysis on 18,000 Job Postings"
    p2.font.size = Pt(13)
    p2.font.color.rgb = RGBColor(203, 213, 225)

    # Student Details Card
    card_students = add_card(slide1, Inches(0.8), Inches(3.6), Inches(6.0), Inches(2.6), 
                             bg_color=RGBColor(30, 41, 59), border_color=RGBColor(51, 65, 85))
    tb_s = slide1.shapes.add_textbox(Inches(1.1), Inches(3.8), Inches(5.4), Inches(2.2))
    tf_s = tb_s.text_frame
    tf_s.word_wrap = True

    ps0 = tf_s.paragraphs[0]
    ps0.text = "PROJECT TEAM (SCSCIT)"
    ps0.font.size = Pt(11)
    ps0.font.bold = True
    ps0.font.color.rgb = RGBColor(96, 165, 250)
    ps0.space_after = Pt(10)

    students = [
        ("Namay Jain", "Roll No: 2610504"),
        ("Payal Sagitala", "Roll No: 2610508"),
        ("Toshika Verma", "Roll No: 2610517")
    ]
    for name, roll in students:
        p_mem = tf_s.add_paragraph()
        p_mem.text = f"•  {name}   —   {roll}"
        p_mem.font.size = Pt(13)
        p_mem.font.bold = True
        p_mem.font.color.rgb = WHITE
        p_mem.space_after = Pt(5)

    # Supervisor Card
    card_sup = add_card(slide1, Inches(7.1), Inches(3.6), Inches(5.4), Inches(2.6), 
                        bg_color=RGBColor(30, 41, 59), border_color=RGBColor(51, 65, 85))
    tb_sup = slide1.shapes.add_textbox(Inches(7.4), Inches(3.8), Inches(4.8), Inches(2.2))
    tf_sup = tb_sup.text_frame
    tf_sup.word_wrap = True

    psup0 = tf_sup.paragraphs[0]
    psup0.text = "UNDER THE VALUABLE GUIDANCE OF"
    psup0.font.size = Pt(11)
    psup0.font.bold = True
    psup0.font.color.rgb = RGBColor(96, 165, 250)
    psup0.space_after = Pt(12)

    psup1 = tf_sup.add_paragraph()
    psup1.text = "Prof. Anand Singh Jalal"
    psup1.font.size = Pt(18)
    psup1.font.bold = True
    psup1.font.color.rgb = WHITE
    psup1.space_after = Pt(6)

    psup2 = tf_sup.add_paragraph()
    psup2.text = "School of Computer Science & Information Technology (SCSCIT)"
    psup2.font.size = Pt(12)
    psup2.font.color.rgb = RGBColor(203, 213, 225)
    psup2.space_after = Pt(10)

    psup3 = tf_sup.add_paragraph()
    psup3.text = "Google Colab Source: colab.research.google.com/drive/134r33sXeCwnOQt6C..."
    psup3.font.size = Pt(10)
    psup3.font.color.rgb = RGBColor(148, 163, 184)

    # Footer note
    ft1 = slide1.shapes.add_textbox(Inches(0.8), Inches(6.8), Inches(11.733), Inches(0.4))
    ft1.text_frame.paragraphs[0].text = "AI/ML Subject Capstone  |  End-to-End NLP & Supervised Classification  |  Academic Year 2026-27"
    ft1.text_frame.paragraphs[0].font.size = Pt(9.5)
    ft1.text_frame.paragraphs[0].font.color.rgb = RGBColor(100, 116, 139)

    # -------------------------------------------------------------
    # SLIDE 2: Problem Statement & Motivation
    # -------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_layout)
    add_header(slide2, "Problem Statement: Digital Employment Fraud Crisis", "Introduction & Motivation")

    # 3 Cards Layout
    # Card 1: Economic & Social Threat
    c2_1 = add_card(slide2, Inches(0.8), Inches(1.6), Inches(3.6), Inches(4.8))
    tb2_1 = slide2.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(3.2), Inches(4.4))
    tf2_1 = tb2_1.text_frame
    tf2_1.word_wrap = True
    p = tf2_1.paragraphs[0]
    p.text = "The Scale of Fraud"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = CRIMSON_RED
    p.space_after = Pt(10)
    
    bullets1 = [
        "Financial Toll: Over $367 Million in direct consumer losses reported annually to FTC & FBI IC3.",
        "Target Population: Remote job seekers, new college graduates, and vulnerable individuals seeking flexible employment.",
        "Reputational Damage: Legitimate job boards (LinkedIn, Indeed) face significant trust attrition when scams proliferate."
    ]
    for b in bullets1:
        pb = tf2_1.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(11)
        pb.font.color.rgb = TEXT_MAIN
        pb.space_after = Pt(8)

    # Card 2: Scam Modus Operandi
    c2_2 = add_card(slide2, Inches(4.7), Inches(1.6), Inches(3.8), Inches(4.8))
    tb2_2 = slide2.shapes.add_textbox(Inches(4.9), Inches(1.8), Inches(3.4), Inches(4.4))
    tf2_2 = tb2_2.text_frame
    tf2_2.word_wrap = True
    p = tf2_2.paragraphs[0]
    p.text = "Attack Vectors & Tactics"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = ACCENT_INDIGO
    p.space_after = Pt(10)

    bullets2 = [
        "Advance Fee Scams: Victims receive fake checks for 'home office setups' and wire back funds before the check bounces.",
        "Identity Theft: Harvesters solicit Social Security Numbers, banking details, and IDs under pre-employment screening pretexts.",
        "Off-Platform Luring: Rapidly steering applicants to encrypted chats (Telegram, WhatsApp) to avoid job portal security filters.",
        "Vague High-Pay Offers: 'Data entry' or 'receptionist' roles promising $40+/hr with minimal requirements."
    ]
    for b in bullets2:
        pb = tf2_2.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(10.5)
        pb.font.color.rgb = TEXT_MAIN
        pb.space_after = Pt(6)

    # Card 3: Machine Learning Objective
    c2_3 = add_card(slide2, Inches(8.8), Inches(1.6), Inches(3.7), Inches(4.8))
    tb2_3 = slide2.shapes.add_textbox(Inches(9.0), Inches(1.8), Inches(3.3), Inches(4.4))
    tf2_3 = tb2_3.text_frame
    tf2_3.word_wrap = True
    p = tf2_3.paragraphs[0]
    p.text = "The AI/ML Solution Goal"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE
    p.space_after = Pt(10)

    bullets3 = [
        "Automated Detection: Process unstructured raw text of job listings in real-time (<20ms).",
        "NLP Pattern Extraction: Learn lexical and semantic markers differentiating authentic corporate language from scam narratives.",
        "Calibrated Probabilities: Deliver true posterior risk probabilities P(Fake|Text) for tiered escalation rather than binary black-box labels.",
        "Extreme Specificity: Prevent false accusations against legitimate hiring companies."
    ]
    for b in bullets3:
        pb = tf2_3.add_paragraph()
        pb.text = "• " + b
        pb.font.size = Pt(10.5)
        pb.font.color.rgb = TEXT_MAIN
        pb.space_after = Pt(6)

    # -------------------------------------------------------------
    # SLIDE 3: Dataset & Class Imbalance Challenge
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    add_header(slide3, "Dataset Characterization & Class Imbalance Mitigation", "Data Analysis & Methodology")

    # Left Column: Dataset & The Imbalance Problem (Text Cards)
    c3_1 = add_card(slide3, Inches(0.8), Inches(1.6), Inches(5.8), Inches(2.4))
    tb3_1 = slide3.shapes.add_textbox(Inches(1.0), Inches(1.75), Inches(5.4), Inches(2.1))
    tf3_1 = tb3_1.text_frame
    tf3_1.word_wrap = True
    p = tf3_1.paragraphs[0]
    p.text = "Employment Scam Aegean Dataset (EMSAD)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = DARK_NAVY
    p.space_after = Pt(6)

    items3_1 = [
        "Benchmark Corpus: 17,880 real-world job advertisements collected globally.",
        "Multi-Field Representation: Title, Company Profile, Description, Requirements, Benefits, Telecommuting status, and Company Logo.",
        "Target Variable: Binary indicator fraudulent in {0, 1}."
    ]
    for it in items3_1:
        pit = tf3_1.add_paragraph()
        pit.text = "•  " + it
        pit.font.size = Pt(10.5)
        pit.font.color.rgb = TEXT_MAIN
        pit.space_after = Pt(4)

    # Class Imbalance Formulation Card
    c3_2 = add_card(slide3, Inches(0.8), Inches(4.2), Inches(5.8), Inches(2.7))
    tb3_2 = slide3.shapes.add_textbox(Inches(1.0), Inches(4.35), Inches(5.4), Inches(2.4))
    tf3_2 = tb3_2.text_frame
    tf3_2.word_wrap = True
    p = tf3_2.paragraphs[0]
    p.text = "Handling the 95:5 Class Imbalance (Cost-Sensitive Learning)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CRIMSON_RED
    p.space_after = Pt(6)

    items3_2 = [
        "The Accuracy Paradox: 95.1% Authentic (17,014) vs 4.9% Fake (866). A naive baseline predicting all 0s gets 95.1% accuracy while catching zero scams.",
        "Mathematical Re-weighting: Enforced class_weight='balanced' in SVM loss formulation:",
        "    w_j = N / (2 * N_j)  ==>  w_fake = 17,880 / (2 * 866) ≈ 10.32x",
        "Penalizes false negatives (missed scams) ~10.3 times more heavily than false positives during convex optimization."
    ]
    for it in items3_2:
        pit = tf3_2.add_paragraph()
        pit.text = it if it.startswith("    ") else "•  " + it
        pit.font.size = Pt(10)
        pit.font.color.rgb = DARK_NAVY if it.startswith("    ") else TEXT_MAIN
        if it.startswith("    "): pit.font.bold = True
        pit.space_after = Pt(3)

    # Right Column: Visual Chart (chart_metrics_imbalance.png)
    chart_path1 = "presentation_assets/chart_metrics_imbalance.png"
    if os.path.exists(chart_path1):
        slide3.shapes.add_picture(chart_path1, Inches(6.9), Inches(1.6), Inches(5.6), Inches(5.3))

    # -------------------------------------------------------------
    # SLIDE 4: End-to-End ML Pipeline Architecture
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    add_header(slide4, "End-to-End Machine Learning Pipeline Architecture", "System Design & Workflow")

    # 5 Horizontal Pipeline Stages
    stages = [
        ("STAGE 1", "Multi-Field Aggregation", PRIMARY_BLUE, [
            "Input Features: Title, Profile, Description, Requirements, Benefits",
            "Synthesizes full job posting context into one unified text stream",
            "Preserves inter-field contextual relationships"
        ]),
        ("STAGE 2", "NLP Cleansing & Lemma", ACCENT_INDIGO, [
            "HTML & tag stripping (<.*?>)",
            "Regex URL & Email eradication",
            "Punctuation & numeric filtering",
            "WordNet Morphological Lemmatization",
            "English stopword pruning (len > 2)"
        ]),
        ("STAGE 3", "TF-IDF Vectorization", DARK_NAVY, [
            "6,000 top n-gram vocabulary",
            "Unigrams + Bigrams (1, 2)",
            "Sublinear TF scaling: 1 + log(tf)",
            "Smooth IDF penalization",
            "L2 unit-norm Euclidean projection"
        ]),
        ("STAGE 4", "Calibrated LinearSVC", CRIMSON_RED, [
            "Optimal margin hyperplane",
            "LIBLINEAR coordinate descent",
            "Class weight balanced (10.32x)",
            "Platt Sigmoid Calibration (cv=3)",
            "P(Fake|x) = 1 / (1 + exp(Af + B))"
        ]),
        ("STAGE 5", "Inference & Heuristics", EMERALD_GREEN, [
            "Probabilistic risk scoring (0-100%)",
            "Decision threshold theta = 0.50",
            "Regex heuristic cross-validation",
            "Flagging wire transfers, Telegram, Western Union, missing logo"
        ]),
    ]

    card_w = Inches(2.2)
    card_gap = Inches(0.18)
    start_x = Inches(0.8)

    for i, (stg_num, stg_title, col, details) in enumerate(stages):
        x = start_x + i * (card_w + card_gap)
        c = add_card(slide4, x, Inches(1.6), card_w, Inches(5.3))
        
        # Color top banner
        ban = slide4.shapes.add_shape(MSO_SHAPE.RECTANGLE, x, Inches(1.6), card_w, Inches(0.55))
        ban.fill.solid()
        ban.fill.fore_color.rgb = col
        ban.line.color.rgb = col
        
        tb_ban = slide4.shapes.add_textbox(x, Inches(1.65), card_w, Inches(0.45))
        p = tb_ban.text_frame.paragraphs[0]
        p.text = stg_num
        p.alignment = PP_ALIGN.CENTER
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = WHITE
        
        # Body text
        tb = slide4.shapes.add_textbox(x + Inches(0.12), Inches(2.25), card_w - Inches(0.24), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        
        p_title = tf.paragraphs[0]
        p_title.text = stg_title
        p_title.font.size = Pt(11)
        p_title.font.bold = True
        p_title.font.color.rgb = col
        p_title.space_after = Pt(8)
        
        for d in details:
            pd = tf.add_paragraph()
            pd.text = "• " + d
            pd.font.size = Pt(9.5)
            pd.font.color.rgb = TEXT_MAIN
            pd.space_after = Pt(5)

    # -------------------------------------------------------------
    # SLIDE 5: NLP Preprocessing & Semantic Normalization
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    add_header(slide5, "NLP Preprocessing: Cleansing, Tokenization & Lemmatization", "Natural Language Processing")

    # 2 Big Cards
    # Left Card: The Cleaning Steps
    c5_1 = add_card(slide5, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.3))
    tb5_1 = slide5.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(4.9))
    tf5_1 = tb5_1.text_frame
    tf5_1.word_wrap = True

    p = tf5_1.paragraphs[0]
    p.text = "Algorithmic Text Sanitization Pipeline"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE
    p.space_after = Pt(8)

    steps5 = [
        ("Case Harmonization", "All text converted to lowercase to unify token distributions (e.g. 'Wire Transfer' vs 'wire transfer')."),
        ("HTML Tag Stripping", r"Regex re.sub(r'<[^<]+?>', ' ', text) eliminates web artifacts from scraped job boards."),
        ("URL Scrubbing", r"re.sub(r'https?://\S+|www\.\S+', '', text) prevents domain names and tracking tokens from biasing classification."),
        ("Email Elimination", r"re.sub(r'\S+@\S+', '', text) strips contact emails, focusing strictly on semantic narrative cues."),
        ("Punctuation & Numeric Removal", r"re.sub(r'[^a-zA-Z\s]', ' ', text) discards special symbols, currency signs, and arbitrary numbers.")
    ]
    for s_title, s_desc in steps5:
        ps = tf5_1.add_paragraph()
        ps.text = f"{s_title}: {s_desc}"
        ps.font.size = Pt(10.5)
        ps.font.color.rgb = TEXT_MAIN
        ps.space_after = Pt(6)

    # Right Card: WordNet Lemmatization vs Stemming
    c5_2 = add_card(slide5, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.3))
    tb5_2 = slide5.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(4.9))
    tf5_2 = tb5_2.text_frame
    tf5_2.word_wrap = True

    p = tf5_2.paragraphs[0]
    p.text = "WordNet Lemmatization vs. Heuristic Stemming"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = ACCENT_INDIGO
    p.space_after = Pt(8)

    p_sub = tf5_2.add_paragraph()
    p_sub.text = "Why Porter Stemmer was rejected in favor of NLTK WordNet Lemmatizer:"
    p_sub.font.size = Pt(11)
    p_sub.font.bold = True
    p_sub.font.color.rgb = DARK_NAVY
    p_sub.space_after = Pt(6)

    comp_items = [
        ("Porter Stemmer (Flawed)", "Truncates suffixes blindly using rule heuristics (e.g., 'organization' -> 'organ', 'better' -> 'better', 'crying' -> 'cri'). Causes vocabulary corruption and semantic ambiguity."),
        ("WordNet Lemmatizer (Adopted)", "Utilizes WordNet lexical database to reduce inflected forms to legitimate morphological dictionary lemmas (e.g., 'requirements' -> 'requirement', 'executives' -> 'executive')."),
        ("English Stopwords Filtering", "Custom NLTK stopword corpus pruned high-frequency grammatical glue ('the', 'is', 'at') that dilutes TF-IDF density."),
        ("Minimum Token Length Filter", "Enforced len(token) > 2 to discard residual single-letter abbreviations and noise tokens.")
    ]
    for c_title, c_desc in comp_items:
        pc = tf5_2.add_paragraph()
        pc.text = f"•  {c_title}:\n    {c_desc}"
        pc.font.size = Pt(10)
        pc.font.color.rgb = TEXT_MAIN
        pc.space_after = Pt(6)

    # -------------------------------------------------------------
    # SLIDE 6: Feature Extraction: Sublinear TF-IDF Vectorization
    # -------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    add_header(slide6, "Feature Extraction: Sublinear TF-IDF Vectorization", "Mathematical Formulation")

    # 3 Cards Layout: Formula 1 (TF), Formula 2 (IDF), Formula 3 (N-Gram & Norm)
    c6_1 = add_card(slide6, Inches(0.8), Inches(1.6), Inches(3.7), Inches(5.3))
    tb6_1 = slide6.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(3.3), Inches(4.9))
    tf6_1 = tb6_1.text_frame
    tf6_1.word_wrap = True

    p = tf6_1.paragraphs[0]
    p.text = "1. Sublinear Term Frequency"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE
    p.space_after = Pt(8)

    bullets6_1 = [
        "Formula Formulation:",
        "  tf_sub(t, d) = 1 + log(tf(t, d))  [if tf > 0]",
        "  tf_sub(t, d) = 0                  [if tf == 0]",
        "Why Sublinear Scaling?",
        "Standard linear TF assumes 20 occurrences of a word make it 20x more significant than a single occurrence.",
        "In job listings, repeated buzzwords (e.g. 'growth', 'money') distort vector norms. Logarithmic dampening reflects diminishing marginal relevance."
    ]
    for b in bullets6_1:
        pb = tf6_1.add_paragraph()
        pb.text = b
        pb.font.size = Pt(10)
        if b.startswith("  "):
            pb.font.bold = True
            pb.font.color.rgb = DARK_NAVY
        elif b.endswith("?"):
            pb.font.bold = True
            pb.font.color.rgb = ACCENT_INDIGO
        else:
            pb.font.color.rgb = TEXT_MAIN
        pb.space_after = Pt(4)

    c6_2 = add_card(slide6, Inches(4.8), Inches(1.6), Inches(3.7), Inches(5.3))
    tb6_2 = slide6.shapes.add_textbox(Inches(5.0), Inches(1.8), Inches(3.3), Inches(4.9))
    tf6_2 = tb6_2.text_frame
    tf6_2.word_wrap = True

    p = tf6_2.paragraphs[0]
    p.text = "2. Smooth Inverse Doc Freq"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = ACCENT_INDIGO
    p.space_after = Pt(8)

    bullets6_2 = [
        "Smooth IDF Formulation:",
        "  idf(t, D) = log((1 + |D|) / (1 + df(t))) + 1",
        "Where |D| is corpus size (17,880), and df(t) is number of postings containing token t.",
        "Mathematical Purpose:",
        "Penalizes universal corporate terms that appear in virtually every posting ('job', 'candidate', 'apply').",
        "Rewards rare, highly discriminative keywords like 'wire transfer' or 'western union'."
    ]
    for b in bullets6_2:
        pb = tf6_2.add_paragraph()
        pb.text = b
        pb.font.size = Pt(10)
        if b.startswith("  "):
            pb.font.bold = True
            pb.font.color.rgb = DARK_NAVY
        elif b.endswith(":"):
            pb.font.bold = True
            pb.font.color.rgb = PRIMARY_BLUE
        else:
            pb.font.color.rgb = TEXT_MAIN
        pb.space_after = Pt(4)

    c6_3 = add_card(slide6, Inches(8.8), Inches(1.6), Inches(3.7), Inches(5.3))
    tb6_3 = slide6.shapes.add_textbox(Inches(9.0), Inches(1.8), Inches(3.3), Inches(4.9))
    tf6_3 = tb6_3.text_frame
    tf6_3.word_wrap = True

    p = tf6_3.paragraphs[0]
    p.text = "3. N-Grams & L2 Unit Norm"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = EMERALD_GREEN
    p.space_after = Pt(8)

    bullets6_3 = [
        "Unigram & Bigram Spectrum:",
        "  ngram_range = (1, 2)",
        "Captures critical pairs: isolated tokens like 'wire' or 'entry' are ambiguous, but 'wire transfer' and 'data entry' are decisive fraud triggers.",
        "L2 Euclidean Normalization:",
        "  v_norm = v / ||v||_2",
        "Ensures long postings do not arbitrarily overpower short, concise postings in dot-product margin space.",
        "Vocabulary Size: V = 6,000 top features selected across the entire corpus."
    ]
    for b in bullets6_3:
        pb = tf6_3.add_paragraph()
        pb.text = b
        pb.font.size = Pt(10)
        if b.startswith("  "):
            pb.font.bold = True
            pb.font.color.rgb = DARK_NAVY
        elif b.endswith(":"):
            pb.font.bold = True
            pb.font.color.rgb = EMERALD_GREEN
        else:
            pb.font.color.rgb = TEXT_MAIN
        pb.space_after = Pt(4)

    # -------------------------------------------------------------
    # SLIDE 7: Machine Learning Algorithm: Linear Support Vector Classifier
    # -------------------------------------------------------------
    slide7 = prs.slides.add_slide(blank_layout)
    add_header(slide7, "Classifier Selection: Linear Support Vector Classifier (LinearSVC)", "Machine Learning Core")

    # Left Column: Mathematical Formulation
    c7_1 = add_card(slide7, Inches(0.8), Inches(1.6), Inches(5.8), Inches(5.3))
    tb7_1 = slide7.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.4), Inches(4.9))
    tf7_1 = tb7_1.text_frame
    tf7_1.word_wrap = True

    p = tf7_1.paragraphs[0]
    p.text = "Mathematical Formulation & Optimization"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE
    p.space_after = Pt(8)

    opt_text = [
        "Primal Soft-Margin Objective Function:",
        "  min_{w, b, xi}  (1/2) * ||w||^2 + C * sum( w_{y_i} * xi_i )",
        "  subject to:  y_i * (w · x_i + b) >= 1 - xi_i,   xi_i >= 0",
        "",
        "Key Formulation Components:",
        "•  Maximal Margin Principle: (1/2)||w||^2 maximizes the geometric margin 2/||w|| between fraud and authentic clusters.",
        "•  Hinge Loss Slack Penalties: xi_i = max(0, 1 - y_i(w · x_i + b)) penalizes misclassifications and margin violations.",
        "•  Cost Penalty Regularization C: Balances margin width vs training error.",
        "•  LIBLINEAR Dual Coordinate Descent: Solves large-scale sparse linear systems in O(n) time, enabling training on 18,000 text samples in seconds."
    ]
    for ot in opt_text:
        pot = tf7_1.add_paragraph()
        pot.text = ot
        if ot.startswith("  "):
            pot.font.size = Pt(9.5)
            pot.font.bold = True
            pot.font.color.rgb = DARK_NAVY
        elif ot.endswith(":"):
            pot.font.size = Pt(11)
            pot.font.bold = True
            pot.font.color.rgb = ACCENT_INDIGO
        else:
            pot.font.size = Pt(10)
            pot.font.color.rgb = TEXT_MAIN
        pot.space_after = Pt(2)

    # Right Column: Why LinearSVC Beats Alternatives for Text
    c7_2 = add_card(slide7, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.3))
    tb7_2 = slide7.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(4.9))
    tf7_2 = tb7_2.text_frame
    tf7_2.word_wrap = True

    p = tf7_2.paragraphs[0]
    p.text = "Theoretical Justification for Text Classification"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = DARK_NAVY
    p.space_after = Pt(8)

    reasons = [
        ("High-Dimensional Linear Separability", "With V = 6,000 TF-IDF features, text documents reside in an extremely high-dimensional sparse hyperspace. Cover's Theorem proves that high-dimensional data is almost always linearly separable without needing non-linear projections."),
        ("Resistance to Overfitting", "L2 regularization (||w||^2) enforces small parameter weights across all 6,000 dimensions, providing robust generalization against spam overfitting."),
        ("Computational Efficiency vs Kernel SVM", "Non-linear kernel SVMs (RBF/poly) scale O(n^2) to O(n^3) in time and compute pairwise Gram matrices. LinearSVC scales O(n * D_nonzero), enabling ultra-fast training and <10ms inference."),
        ("Direct Model Explainability", "The weight vector w provides explicit linear coefficients for every single word, enabling transparent auditing of why a job was classified as fraudulent.")
    ]
    for r_title, r_desc in reasons:
        pr = tf7_2.add_paragraph()
        pr.text = f"•  {r_title}:\n    {r_desc}"
        pr.font.size = Pt(10)
        pr.font.color.rgb = TEXT_MAIN
        pr.space_after = Pt(5)

    # -------------------------------------------------------------
    # SLIDE 8: Probability Calibration via Platt Scaling
    # -------------------------------------------------------------
    slide8 = prs.slides.add_slide(blank_layout)
    add_header(slide8, "Probability Calibration via Platt Sigmoid Scaling", "Model Calibration Theory")

    # Left Column: Theory & Mathematics
    c8_1 = add_card(slide8, Inches(0.8), Inches(1.6), Inches(5.5), Inches(5.3))
    tb8_1 = slide8.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.1), Inches(4.9))
    tf8_1 = tb8_1.text_frame
    tf8_1.word_wrap = True

    p = tf8_1.paragraphs[0]
    p.text = "Why Standard SVM Probabilities Are Invalid"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CRIMSON_RED
    p.space_after = Pt(8)

    calib_points = [
        "The SVM Margin Problem: Raw decision function f(x) = w · x + b produces unconstrained geometric distances (-inf to +inf). Distance from the hyperplane does NOT equal probability P(y=1|x).",
        "Platt Sigmoid Scaling Formulation:",
        "  P(y=1 | f(x)) = 1 / ( 1 + exp( A * f(x) + B ) )",
        "Where A and B are scalar parameters estimated via Maximum Likelihood Estimation (cross-entropy minimization).",
        "Trained Calibrator Parameters (3-Fold CV):",
        "  A_mean ≈ -3.93,   B_mean ≈ +0.85",
        "Because A < 0, when f(x) > 0 (sample is on the fraud side of hyperplane), A * f(x) becomes strongly negative, driving exp(A*f + B) -> 0, and P(Fake) -> 100%.",
        "Out-of-Fold Cross-Validation: Fitted using 3-fold cross-validation during training to prevent optimism bias."
    ]
    for cp in calib_points:
        pcp = tf8_1.add_paragraph()
        pcp.text = cp
        if cp.startswith("  "):
            pcp.font.size = Pt(9.5)
            pcp.font.bold = True
            pcp.font.color.rgb = DARK_NAVY
        elif cp.endswith(":"):
            pcp.font.size = Pt(10.5)
            pcp.font.bold = True
            pcp.font.color.rgb = PRIMARY_BLUE
        else:
            pcp.font.size = Pt(9.8)
            pcp.font.color.rgb = TEXT_MAIN
        pcp.space_after = Pt(3)

    # Right Column: Visual Chart (chart_platt_calibration.png)
    chart_path2 = "presentation_assets/chart_platt_calibration.png"
    if os.path.exists(chart_path2):
        slide8.shapes.add_picture(chart_path2, Inches(6.6), Inches(1.6), Inches(5.9), Inches(5.3))

    # -------------------------------------------------------------
    # SLIDE 9: Feature Weight Analysis & Interpretability
    # -------------------------------------------------------------
    slide9 = prs.slides.add_slide(blank_layout)
    add_header(slide9, "Feature Importance: What the Calibrated SVM Learned", "Model Interpretability")

    # Left Column: Visual Chart (chart_feature_weights.png)
    chart_path3 = "presentation_assets/chart_feature_weights.png"
    if os.path.exists(chart_path3):
        slide9.shapes.add_picture(chart_path3, Inches(0.8), Inches(1.6), Inches(6.8), Inches(5.3))

    # Right Column: Analytical Insights
    c9_1 = add_card(slide9, Inches(7.8), Inches(1.6), Inches(4.7), Inches(5.3))
    tb9_1 = slide9.shapes.add_textbox(Inches(8.0), Inches(1.8), Inches(4.3), Inches(4.9))
    tf9_1 = tb9_1.text_frame
    tf9_1.word_wrap = True

    p = tf9_1.paragraphs[0]
    p.text = "Linguistic Markers of Job Scams"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = DARK_NAVY
    p.space_after = Pt(8)

    insights = [
        ("Top Fraud Indicators (Positive Weights)", [
            "link (+2.35): Directing users off-platform to external malicious forms or phishing portals.",
            "aptitude (+1.66): Fake pre-employment tests designed to collect credit card processing fees.",
            "money (+1.63) & earn (+1.29): Unrealistic compensation promises rather than job specifications.",
            "high school (+1.53) & receptionist (+1.29): Low-barrier entry roles with inflated compensation.",
            "oil gas (+1.33) & offshore (+1.48): Remote/overseas logistics operations frequently impersonated."
        ]),
        ("Top Authentic Indicators (Negative Weights)", [
            "english (-1.46): Legitimate international language qualification requirements.",
            "recruitment (-1.43): Professional HR & agency terminology.",
            "software (-1.24) & digital (-0.97): Verified tech industry job listings.",
            "university (-1.17): Formal higher education accreditation requirements."
        ])
    ]
    for in_title, in_list in insights:
        pi = tf9_1.add_paragraph()
        pi.text = in_title
        pi.font.size = Pt(11)
        pi.font.bold = True
        pi.font.color.rgb = CRIMSON_RED if "Fraud" in in_title else EMERALD_GREEN
        pi.space_after = Pt(4)
        
        for item in in_list:
            p_item = tf9_1.add_paragraph()
            p_item.text = "• " + item
            p_item.font.size = Pt(9.5)
            p_item.font.color.rgb = TEXT_MAIN
            p_item.space_after = Pt(3)

    # -------------------------------------------------------------
    # SLIDE 10: Performance Evaluation, Heuristic Fusion & Conclusions
    # -------------------------------------------------------------
    slide10 = prs.slides.add_slide(blank_layout)
    add_header(slide10, "Empirical Evaluation, Heuristic Fusion & Future Scope", "Results & Conclusion")

    # 3 Summary Cards
    # Card 1: Quantitative Results
    c10_1 = add_card(slide10, Inches(0.8), Inches(1.6), Inches(3.7), Inches(5.3))
    tb10_1 = slide10.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(3.3), Inches(4.9))
    tf10_1 = tb10_1.text_frame
    tf10_1.word_wrap = True

    p = tf10_1.paragraphs[0]
    p.text = "1. Experimental Metrics"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE
    p.space_after = Pt(8)

    res_metrics = [
        ("Test Accuracy", "97.8%", "Overall classification accuracy across both classes."),
        ("Fraud Precision", "89.2%", "Minimizes false accusations against legitimate employers."),
        ("Fraud Recall", "91.8%", "Captures over 9 out of 10 fraudulent postings in the test split."),
        ("F1-Score (Harmonic)", "90.5%", "Balanced trade-off under extreme 95:5 class imbalance."),
        ("ROC-AUC Score", "0.984", "Near-perfect ranking discrimination across all thresholds.")
    ]
    for m_name, m_val, m_desc in res_metrics:
        pm = tf10_1.add_paragraph()
        pm.text = f"{m_name}: {m_val}"
        pm.font.size = Pt(11)
        pm.font.bold = True
        pm.font.color.rgb = DARK_NAVY
        
        pd = tf10_1.add_paragraph()
        pd.text = m_desc
        pd.font.size = Pt(9.5)
        pd.font.color.rgb = TEXT_MUTED
        pd.space_after = Pt(4)

    # Card 2: Hybrid Heuristic Integration
    c10_2 = add_card(slide10, Inches(4.8), Inches(1.6), Inches(3.7), Inches(5.3))
    tb10_2 = slide10.shapes.add_textbox(Inches(5.0), Inches(1.8), Inches(3.3), Inches(4.9))
    tf10_2 = tb10_2.text_frame
    tf10_2.word_wrap = True

    p = tf10_2.paragraphs[0]
    p.text = "2. Hybrid Heuristic Fusion"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = ACCENT_INDIGO
    p.space_after = Pt(8)

    heuristics = [
        "ML + Rule-Based Synergy: Statistical models can occasionally miss novel scam wording. A deterministic heuristic layer provides immediate red flags:",
        "•  Payment Channel Heuristic: Triggers on 'wire transfer', 'Western Union', 'cashier check', 'crypto wallet'.",
        "•  Unverified Comms Heuristic: Triggers on 'Telegram interview', 'WhatsApp screening', 'personal Gmail'.",
        "•  Corporate Identity Heuristic: Checks has_company_logo == 0 and empty company profile sections.",
        "•  Actionable Flags: Directly outputs human-auditable warning badges to recruiters and moderators."
    ]
    for h in heuristics:
        ph = tf10_2.add_paragraph()
        ph.text = h
        ph.font.size = Pt(10)
        ph.font.color.rgb = TEXT_MAIN
        ph.space_after = Pt(5)

    # Card 3: Conclusions & Future Scope
    c10_3 = add_card(slide10, Inches(8.8), Inches(1.6), Inches(3.7), Inches(5.3))
    tb10_3 = slide10.shapes.add_textbox(Inches(9.0), Inches(1.8), Inches(3.3), Inches(4.9))
    tf10_3 = tb10_3.text_frame
    tf10_3.word_wrap = True

    p = tf10_3.paragraphs[0]
    p.text = "3. Future Research Scope"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = EMERALD_GREEN
    p.space_after = Pt(8)

    future_work = [
        ("Domain-Adapted LLMs", "Fine-tuning RoBERTa or DeBERTa on employment corpora to capture multi-sentence semantic dependencies."),
        ("Graph Neural Networks", "Constructing recruiter-company-post graphs to detect coordinated syndicate accounts."),
        ("Multimodal OCR Detection", "Extracting text from promotional flyer images and social media hiring banners."),
        ("Active Online Learning", "Continuous model retraining on streaming verified feedback to counteract adversarial concept drift.")
    ]
    for fw_t, fw_d in future_work:
        pfw = tf10_3.add_paragraph()
        pfw.text = f"•  {fw_t}: {fw_d}"
        pfw.font.size = Pt(10)
        pfw.font.color.rgb = TEXT_MAIN
        pfw.space_after = Pt(6)

    # Save presentation
    output_filename = "Job_Fraud_Detection_SCSCIT_Presentation.pptx"
    prs.save(output_filename)
    print(f"Presentation saved successfully as: {output_filename}")

if __name__ == "__main__":
    create_presentation()

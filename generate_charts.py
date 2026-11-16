import os
import numpy as np
import matplotlib.pyplot as plt
import joblib

os.makedirs("presentation_assets", exist_ok=True)

# Set high DPI and styling
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['axes.edgecolor'] = '#CBD5E1'
plt.rcParams['axes.linewidth'] = 0.8

# 1. Feature Importance Chart
print("Generating Feature Importance Chart...")
vectorizer = joblib.load("backend/tfidf_vectorizer.joblib")
model = joblib.load("backend/best_fake_job_model.joblib")

coefs = [clf.estimator.coef_[0] for clf in model.calibrated_classifiers_]
avg_coefs = np.mean(coefs, axis=0)
feature_names = np.array(vectorizer.get_feature_names_out())

top_fake_idx = np.argsort(avg_coefs)[-10:]
top_real_idx = np.argsort(avg_coefs)[:10]

top_features = np.concatenate([top_real_idx, top_fake_idx])
top_words = feature_names[top_features]
top_weights = avg_coefs[top_features]

colors = ['#059669' if w < 0 else '#DC2626' for w in top_weights]

fig, ax = plt.subplots(figsize=(10, 5.5), dpi=300)
bars = ax.barh(range(len(top_weights)), top_weights, color=colors, height=0.65, edgecolor='none', zorder=3)
ax.set_yticks(range(len(top_words)))
ax.set_yticklabels(top_words, fontsize=11, fontweight='500', color='#1E293B')
ax.axvline(0, color='#64748B', linewidth=1.2, linestyle='--', zorder=4)
ax.grid(axis='x', linestyle=':', alpha=0.6, zorder=0, color='#94A3B8')

for bar, w in zip(bars, top_weights):
    x_pos = w + (0.07 if w >= 0 else -0.07)
    ha = 'left' if w >= 0 else 'right'
    color = '#B91C1C' if w >= 0 else '#047857'
    ax.text(x_pos, bar.get_y() + bar.get_height()/2, f"{w:+.2f}", 
            va='center', ha=ha, fontsize=9.5, fontweight='bold', color=color)

ax.set_title("Calibrated LinearSVC Feature Weights (Decision Boundary Impact)", 
             fontsize=13, fontweight='bold', pad=15, color='#0F172A')
ax.set_xlabel("Linear Hyperplane Coefficient ($w_j$): Negative = Legitimate | Positive = Fraudulent", 
             fontsize=10.5, color='#475569', labelpad=10)
ax.set_xlim(-2.0, 3.0)

from matplotlib.patches import Patch
legend_elements = [
    Patch(facecolor='#DC2626', label='Fraud Indicator (Positive Weight)'),
    Patch(facecolor='#059669', label='Authentic Indicator (Negative Weight)')
]
ax.legend(handles=legend_elements, loc='lower right', framealpha=0.95, facecolor='white', edgecolor='#E2E8F0', fontsize=10)
plt.tight_layout()
plt.savefig("presentation_assets/chart_feature_weights.png", dpi=300)
plt.close()
print("Saved presentation_assets/chart_feature_weights.png")

# 2. Dataset Imbalance & Metrics Chart
print("Generating Dataset & Performance Chart...")
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.5), dpi=300)

sizes = [17014, 866]
labels = ['Authentic (95.1%)', 'Fraudulent (4.9%)']
colors_pie = ['#3B82F6', '#EF4444']
explode = (0, 0.12)
wedges, texts, autotexts = ax1.pie(sizes, explode=explode, labels=labels, colors=colors_pie,
                                   autopct='%1.1f%%', startangle=30, 
                                   textprops=dict(color="#1E293B", fontweight='bold', fontsize=10),
                                   wedgeprops=dict(width=0.7, edgecolor='white', linewidth=2))
for at in autotexts:
    at.set_color('white')
    at.set_fontsize(10.5)
ax1.set_title("EMSAD Dataset Class Imbalance\n(Total: 17,880 Job Postings)", fontsize=11.5, fontweight='bold', color='#0F172A')

metrics = ['Accuracy', 'Precision (Fake)', 'Recall (Fake)', 'F1-Score', 'ROC-AUC']
values = [97.8, 89.2, 91.8, 90.5, 98.4]
bar_colors = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#06B6D4']

b = ax2.bar(metrics, values, color=bar_colors, width=0.55, zorder=3)
ax2.set_ylim(80, 102)
ax2.set_ylabel("Score Percentage (%)", fontsize=10, color='#475569')
ax2.set_title("Calibrated LinearSVC Test Performance", fontsize=11.5, fontweight='bold', color='#0F172A')
ax2.grid(axis='y', linestyle=':', alpha=0.6, zorder=0, color='#94A3B8')
ax2.tick_params(axis='x', rotation=20, labelsize=9.5)

for bar, v in zip(b, values):
    ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.6, f"{v:.1f}%", 
             ha='center', va='bottom', fontsize=9.5, fontweight='bold', color='#1E293B')

plt.tight_layout()
plt.savefig("presentation_assets/chart_metrics_imbalance.png", dpi=300)
plt.close()
print("Saved presentation_assets/chart_metrics_imbalance.png")

# 3. Platt Calibration Sigmoid Curve
print("Generating Platt Calibration Curve...")
fig, ax = plt.subplots(figsize=(8, 4.2), dpi=300)
f_x = np.linspace(-3, 3, 200)
# Exact average calibrated parameters
a_avg = -3.93
b_avg = 0.85
prob = 1 / (1 + np.exp(a_avg * f_x + b_avg))

ax.plot(f_x, prob * 100, color='#4F46E5', linewidth=3, label=r'Platt Sigmoid: $P(y=1|f(x)) = \frac{1}{1 + \exp(-3.93 \cdot f(x) + 0.85)}$', zorder=3)
ax.axvline(0, color='#64748B', linestyle='--', linewidth=1.2, label='Raw SVM Margin Boundary ($f(x) = 0$)')
ax.axhline(50, color='#EF4444', linestyle=':', linewidth=1.2, label='Decision Threshold (50%)')

ax.axvspan(-3, 0, color='#10B981', alpha=0.08, label='Low Risk Region (Authentic)')
ax.axvspan(0, 3, color='#EF4444', alpha=0.08, label='High Risk Region (Fraudulent)')

ax.set_title("Platt Calibration: Mapping Linear Margin Distance to Well-Calibrated Probability", 
             fontsize=12, fontweight='bold', pad=12, color='#0F172A')
ax.set_xlabel(r"Raw SVM Hyperplane Decision Margin $f(x) = w \cdot x + b$", fontsize=10.5, color='#475569')
ax.set_ylabel("Calibrated Fraud Risk Probability (%)", fontsize=10.5, color='#475569')
ax.set_ylim(-2, 105)
ax.grid(True, linestyle=':', alpha=0.5, color='#94A3B8')
ax.legend(loc='lower right', fontsize=8.5, framealpha=0.95, facecolor='white', edgecolor='#CBD5E1')

plt.tight_layout()
plt.savefig("presentation_assets/chart_platt_calibration.png", dpi=300)
plt.close()
print("Saved presentation_assets/chart_platt_calibration.png")
print("All charts generated successfully!")

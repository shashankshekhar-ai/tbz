"""
Assessment report PDF generator.

Builds a branded one-page PDF from a scored assessment result. Best-effort by
convention: callers should catch exceptions here and treat a missing report as
optional — it must never block the assessment completion response.
"""
from __future__ import annotations

import os
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

from core.config import settings

NAVY = colors.HexColor("#0f1e3c")
GOLD = colors.HexColor("#c9a84c")


def report_path_for(session_token: str) -> str:
    os.makedirs(settings.reports_dir, exist_ok=True)
    return os.path.join(settings.reports_dir, f"{session_token}.pdf")


def generate_report_pdf(
    *,
    session_token: str,
    lead_name: str | None,
    company: str | None,
    overall_score: int,
    maturity_level: str,
    summary: str,
    recommendations: list[str],
) -> str:
    path = report_path_for(session_token)
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle("TBGTitle", parent=styles["Title"], textColor=NAVY)
    h2_style = ParagraphStyle("TBGH2", parent=styles["Heading2"], textColor=NAVY, spaceBefore=12)
    body_style = ParagraphStyle("TBGBody", parent=styles["BodyText"], leading=16)
    score_style = ParagraphStyle("TBGScore", parent=styles["Title"], textColor=GOLD, fontSize=48)
    footer_style = ParagraphStyle("TBGFooter", parent=styles["BodyText"], textColor=colors.grey, fontSize=9)

    subtitle = f"Prepared for {escape(lead_name) if lead_name else 'you'}"
    if company:
        subtitle += f" — {escape(company)}"

    doc = SimpleDocTemplate(path, pagesize=LETTER, topMargin=0.75 * inch, bottomMargin=0.75 * inch)
    story = [
        Paragraph("AI Readiness Assessment", title_style),
        Spacer(1, 4),
        Paragraph(subtitle, body_style),
        Spacer(1, 24),
        Paragraph(f"{overall_score}/100", score_style),
        Paragraph(f"Maturity level: {escape(maturity_level.title())}", h2_style),
        Spacer(1, 8),
        Paragraph("Summary", h2_style),
        Paragraph(escape(summary), body_style),
        Paragraph("Recommended Next Steps", h2_style),
    ]
    for rec in recommendations:
        story.append(Paragraph(f"&bull; {escape(rec)}", body_style))
    story.append(Spacer(1, 24))
    story.append(Paragraph("The Bradbury Group &mdash; AI Fluency &amp; Executive Transformation", footer_style))

    doc.build(story)
    return path

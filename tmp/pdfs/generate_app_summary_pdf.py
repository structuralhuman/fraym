from pathlib import Path

import fitz
from pypdf import PdfReader
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[2]
OUTPUT_PDF = ROOT / "output" / "pdf" / "fraym_app_summary.pdf"
OUTPUT_PNG = ROOT / "tmp" / "pdfs" / "fraym_app_summary_page1.png"

PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 42
GUTTER = 22
LEFT_COL_WIDTH = 218
RIGHT_COL_WIDTH = PAGE_WIDTH - (MARGIN * 2) - GUTTER - LEFT_COL_WIDTH

TITLE_COLOR = HexColor("#111827")
TEXT_COLOR = HexColor("#1F2937")
MUTED_COLOR = HexColor("#6B7280")
RULE_COLOR = HexColor("#D1D5DB")
ACCENT_COLOR = HexColor("#E5EEF9")

WHAT_IT_IS = (
    "Fraym is a small Expo/React Native app that guides a user through a"
    " five-step reflection flow: event, assumption, control boundary,"
    " alternative lens, and resolution."
)
WHAT_IT_IS_2 = (
    "Based on the UI labels and engine logic, its purpose is structured"
    " reframing rather than messaging, storage, or analytics."
)

WHO_ITS_FOR = (
    "Primary persona inferred from repo evidence: a person who wants to"
    " process a recent event, separate what is controllable from what is"
    " not, and leave with a deliberate next action."
)

FEATURES = [
    "Captures an event in a 140-character text step.",
    "Captures the user's assumption in a 180-character text step.",
    "Prompts one internal control and one external non-control selection.",
    "Offers five alternative lens options for reframing.",
    "Computes a resolution summary plus a mapped action statement.",
    "Uses validation errors and reset/cancel actions across the flow.",
]

HOW_IT_WORKS = [
    "UI: Expo Router stack in app/_layout.tsx wraps all screens in FraymProvider.",
    "Flow: app/index.tsx -> assumption.tsx -> boundary.tsx -> lens.tsx -> resolution.tsx.",
    "State: context/FraymContext.tsx keeps one in-memory FraymSession for the current run.",
    "Rules: constants/types.ts defines session shape; constants/controls.ts defines labels and action map.",
    "Computation: engine/computeResolution.ts builds the final summary and action from the selected inputs.",
    "Backend/persistence: Not found in repo.",
]

RUN_STEPS = [
    "From the project root, run npm install.",
    "Start the app with npx expo start.",
    "Open the app in Expo Go, Android, iOS, or web from the Expo CLI options.",
]


def wrap_text(text: str, font_name: str, font_size: int, width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if stringWidth(candidate, font_name, font_size) <= width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_paragraph(c: canvas.Canvas, text: str, x: float, y: float, width: float,
                   font_name: str = "Helvetica", font_size: int = 9,
                   color=TEXT_COLOR, leading: int = 12) -> float:
    c.setFont(font_name, font_size)
    c.setFillColor(color)
    for line in wrap_text(text, font_name, font_size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_section_title(c: canvas.Canvas, label: str, x: float, y: float) -> float:
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(TITLE_COLOR)
    c.drawString(x, y, label.upper())
    return y - 14


def draw_bullets(c: canvas.Canvas, items: list[str], x: float, y: float, width: float,
                 font_size: int = 8, leading: int = 10) -> float:
    text_width = width - 12
    for item in items:
        lines = wrap_text(item, "Helvetica", font_size, text_width)
        first = True
        for line in lines:
            c.setFont("Helvetica", font_size)
            c.setFillColor(TEXT_COLOR)
            if first:
                c.drawString(x, y, "-")
                c.drawString(x + 10, y, line)
                first = False
            else:
                c.drawString(x + 10, y, line)
            y -= leading
        y -= 2
    return y


def generate_pdf() -> None:
    c = canvas.Canvas(str(OUTPUT_PDF), pagesize=letter)
    c.setTitle("Fraym App Summary")

    c.setFillColor(ACCENT_COLOR)
    c.roundRect(MARGIN, PAGE_HEIGHT - 88, PAGE_WIDTH - (MARGIN * 2), 52, 10, fill=1, stroke=0)

    c.setFillColor(TITLE_COLOR)
    c.setFont("Helvetica-Bold", 20)
    c.drawString(MARGIN + 14, PAGE_HEIGHT - 58, "Fraym App Summary")
    c.setFont("Helvetica", 9)
    c.setFillColor(MUTED_COLOR)
    c.drawString(
        MARGIN + 14,
        PAGE_HEIGHT - 74,
        "One-page repo-backed overview generated from code and README evidence only.",
    )

    top_y = PAGE_HEIGHT - 108
    left_x = MARGIN
    right_x = MARGIN + LEFT_COL_WIDTH + GUTTER

    c.setStrokeColor(RULE_COLOR)
    c.setLineWidth(1)
    c.line(right_x - (GUTTER / 2), MARGIN, right_x - (GUTTER / 2), top_y)

    left_y = top_y
    left_y = draw_section_title(c, "What it is", left_x, left_y)
    left_y = draw_paragraph(c, WHAT_IT_IS, left_x, left_y, LEFT_COL_WIDTH, font_size=9, leading=12)
    left_y -= 2
    left_y = draw_paragraph(c, WHAT_IT_IS_2, left_x, left_y, LEFT_COL_WIDTH, font_size=9, leading=12)
    left_y -= 10

    left_y = draw_section_title(c, "Who it's for", left_x, left_y)
    left_y = draw_paragraph(c, WHO_ITS_FOR, left_x, left_y, LEFT_COL_WIDTH, font_size=9, leading=12)
    left_y -= 10

    left_y = draw_section_title(c, "How to run", left_x, left_y)
    draw_bullets(c, RUN_STEPS, left_x, left_y, LEFT_COL_WIDTH, font_size=8, leading=10)

    right_y = top_y
    right_y = draw_section_title(c, "What it does", right_x, right_y)
    right_y = draw_bullets(c, FEATURES, right_x, right_y, RIGHT_COL_WIDTH, font_size=8, leading=10)
    right_y -= 6

    right_y = draw_section_title(c, "How it works", right_x, right_y)
    draw_bullets(c, HOW_IT_WORKS, right_x, right_y, RIGHT_COL_WIDTH, font_size=8, leading=10)

    c.showPage()
    c.save()


def verify_outputs() -> tuple[int, str]:
    reader = PdfReader(str(OUTPUT_PDF))
    page_count = len(reader.pages)
    text = reader.pages[0].extract_text() or ""

    doc = fitz.open(str(OUTPUT_PDF))
    page = doc.load_page(0)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    pix.save(str(OUTPUT_PNG))
    doc.close()

    return page_count, text


if __name__ == "__main__":
    generate_pdf()
    page_count, text = verify_outputs()
    print(f"pdf={OUTPUT_PDF}")
    print(f"png={OUTPUT_PNG}")
    print(f"pages={page_count}")
    print(f"chars={len(text)}")

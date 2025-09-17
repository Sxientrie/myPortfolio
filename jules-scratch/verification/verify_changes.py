import re
from playwright.sync_api import sync_playwright, expect

with open('dev.log', 'r') as f:
    log_content = f.read()

match = re.search(r'http://localhost:(\d+)', log_content)
if match:
    PORT = match.group(1)
else:
    raise Exception("Could not find port in dev.log")

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Portfolio page
    page.goto(f"http://localhost:{PORT}/")
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/portfolio.png")

    # Blog page
    page.get_by_role("button", name="Blog").click()
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/blog.png")

    # Blog post page
    # Click on the first blog post card to navigate
    page.locator(".group").first.click()
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/blog-post.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)

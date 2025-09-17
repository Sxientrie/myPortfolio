from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Portfolio page
    page.goto("http://localhost:3004/myPortfolio/", timeout=60000)
    page.wait_for_selector("#main-content", timeout=60000)
    page.screenshot(path="jules-scratch/verification/portfolio.png")

    # Blog page
    page.get_by_role("link", name="Blog").click()
    page.wait_for_selector("#blog-content", timeout=60000)
    page.screenshot(path="jules-scratch/verification/blog.png")

    # Blog post page
    # Click on the first blog post card to navigate
    first_post_card = page.locator('.grid > div').first
    first_post_card.click()
    page.wait_for_selector("#blog-post-content", timeout=60000)
    page.screenshot(path="jules-scratch/verification/blog-post.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)

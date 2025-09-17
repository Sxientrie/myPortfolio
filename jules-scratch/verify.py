from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    # Portfolio page
    page.goto("http://localhost:3000/")
    page.wait_for_selector("#root")
    page.screenshot(path="jules-scratch/verification/portfolio.png")

    # Blog page
    page.get_by_role("button", name="Blog").click()
    page.wait_for_selector("#blog-content")
    page.screenshot(path="jules-scratch/verification/blog.png")

    # Blog post page
    page.locator(".group").first.click()
    page.wait_for_selector("#blog-post-content")
    page.screenshot(path="jules-scratch/verification/blog-post.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)

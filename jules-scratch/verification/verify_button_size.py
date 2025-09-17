from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173")

    # Wait for the hero section to be visible
    hero_section = page.locator("#hero")
    expect(hero_section).to_be_visible()

    # Take a screenshot of the hero section
    hero_section.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)

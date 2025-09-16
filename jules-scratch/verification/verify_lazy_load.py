from playwright.sync_api import sync_playwright, expect
import time
import re

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 800})
    page.goto("http://localhost:5173/myPortfolio/", timeout=60000)
    page.wait_for_load_state('networkidle')

    time.sleep(2)

    projects_section = page.locator("section#projects")
    expect(projects_section).to_be_visible(timeout=30000)
    projects_section.scroll_into_view_if_needed()

    # Give the observer time to react
    time.sleep(2)
    page.screenshot(path="jules-scratch/verification/debug_scrolled_view.png")

    # The rest of the script will fail, but that's ok for now.
    # The goal is to get the debug screenshot.
    project_cards = projects_section.locator("article")
    expect(project_cards.locator("img")).to_be_visible(timeout=1)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)

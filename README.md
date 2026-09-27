# DevOps Master Notes

A professional, responsive, single-page HTML website serving as a concise reference/learning guide for students learning DevOps.

## Project Structure
- `index.html`: Main HTML file containing all documentation sections.
- `style.css`: Custom styling for the layout, dark/light modes, callouts, and code blocks.
- `script.js`: Vanilla JavaScript for search, dark mode toggle, scroll tracking, and copy-to-clipboard functionality.

## How to Run Locally
Because this project is completely static (no backend, no database, no frameworks), you can run it easily:

1. **Option 1:** Just double-click `index.html` to open it in your web browser.
2. **Option 2:** Serve it via a simple web server (recommended for best experience):
   - Using Python 3: `python3 -m http.server 8000`
   - Using Node.js: `npx serve`
   - Open your browser and navigate to `http://localhost:8000`.

## How the Sidebar Works
The sidebar provides quick navigation to all topics. 
- It uses standard `#id` anchor links to navigate the page.
- On desktop, it is fixed to the left side.
- On mobile, it hides behind a hamburger menu for better screen real estate.
- It dynamically highlights the active section as you scroll through the page using JavaScript `IntersectionObserver`.
- The search box at the top filters both the navigation links and the content sections dynamically.

## How to Add a New Topic
1. Open `index.html`.
2. Add a new `<li><a href="#new-topic">New Topic</a></li>` to the `.nav-links` list in the `<aside id="sidebar" class="sidebar">`.
3. Add a new `<section id="new-topic">` inside the `<main class="main-content">`.
4. Include an `<h2>` for the section title, and populate the content using callouts and code blocks.

## How to Add a New Command
To add a new command with an automatic copy button:
1. Inside any section, use a `<pre><code>` block.
2. Example:
   ```html
   <pre><code>docker build -t my-app .</code></pre>
   ```
3. The JavaScript in `script.js` will automatically detect the `<pre><code>` block and append a "Copy" button to it.

## How to Customize the Theme
Open `style.css` and look for the `:root` and `[data-theme="dark"]` selectors at the top of the file.
You can easily modify the colors by changing the CSS variables:
```css
:root {
  --primary: #0366d6; /* Change main theme color */
  --bg-color: #ffffff; /* Change background color */
}
```

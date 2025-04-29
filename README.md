# CEMMA Blog Platform ✨

## Project Overview

CEMMA is a fully functional, responsive blog website developed as a final project to demonstrate core web development skills using HTML, CSS, and JavaScript. The platform provides a space for users to read featured news articles and create and manage their own blog posts. It is structured as a multi-page site including a Home page, a Contact page, and an About Us page.

The name "CEMMA" is derived from the Swahili word "sema," meaning "speak" or "say," reflecting the platform's core mission to empower individuals to share their voices and stories. 🗣️

## Objectives Achieved

* **Build a fully functional web application:** The project includes multiple interconnected pages, data fetching from an external API, client-side data storage (for user blogs), interactive elements, and user input forms. 🌐
* **Apply HTML, CSS, and JavaScript concepts:** The project extensively uses HTML5 for semantic structure 📄, CSS3 for styling and responsive design across different pages 🎨, and JavaScript for dynamic content loading, modal interactions, form handling, and user blog management 💻.
* **Deploy the project:** The project is designed to be easily deployable using services like GitHub Pages, Netlify, or Vercel. 🚀 (Add your deployment link here).

## Features

* **Multi-page site with navigation:** The website includes three distinct pages: Home (`index.html`) 🏠, Contact (`contact.html`) 📧, and About Us (`about.html`) ℹ️, linked via a consistent navigation bar.
* **Responsive Design:** The layout and elements on all pages adapt seamlessly to various screen sizes (desktops, tablets, mobile phones) using CSS media queries. 📱💻
* **JavaScript Interactivity:** Includes features such as:
    * Fetching and displaying featured news articles from an external API (NewsAPI). 📰
    * A modal interface for creating and editing user blog posts. ✍️
    * Storing user-created blogs in the browser's local storage. 💾
    * Modal display of full article content when a blog card is clicked. 📖
    * Basic form handling on the Contact page. 📝
    * Smooth scrolling for navigation links on the Home page. 🖱️
    * A preloader animation on page load. ⏳
    * A "Go Back" button on the Contact page for easy navigation. ↩️
* **Blog Editor:** Users can create, edit, and delete their own blog posts through a modal interface on the Home page. ✨
* **API Integration:** Fetches featured news headlines using the NewsAPI. 📡

## Technical Details

### HTML5 Structure (`index.html`, `contact.html`, `about.html`)

The project uses well-structured HTML5 documents for each page, employing semantic elements to define the content structure. Key HTML elements used across the pages include:

* `<header>`: Contains the navigation bar. ⬆️
* `<nav>`: The main navigation element. 🧭
* `<section>`: Divides the main content into logical sections (Hero, Featured Blogs, Your Blogs, Contact Form, About Us). 🧱
* `<footer>`: Contains site-wide information and social links. ⬇️
* `<form>`: Used for the blog editor modal and the contact form. 📄
* `<input>`, `<textarea>`, `<button>`: Interactive form elements. 🖱️
* `<h1>`, `<h2>`, `<h3>`, `<p>`: Headings and paragraph text for content. ✍️
* `<img>`: For displaying images. 🖼️
* `<a>`: For navigation links and social media links. 🔗
* `<div>`, `<span>`: Used for layout and styling purposes. 📦

Semantic correctness is prioritized to improve accessibility and SEO. ✅

### CSS3 Styling (`style.css`, Internal Stylesheets)

The styling is primarily handled by `style.css`, which provides a consistent visual theme across the website. Some pages (`contact.html`, `about.html`) also include internal `<style>` blocks containing the necessary CSS rules for those specific pages, ensuring they are self-contained as requested. Key CSS features include:

* **Responsive Design:** Extensive use of media queries to create flexible layouts that adapt to different screen sizes. 📏
* **Layouts:** Implementation of CSS Grid and Flexbox for arranging content in sections and within components like blog cards and the contact form. 📐
* **Visual Design:** Application of typography, color palettes, spacing, transitions, hover effects, and modal styling for a polished look. ✨🎨
* **CSS Variables:** Utilization of custom properties (`:root`) for managing colors, fonts, and other design tokens, making styling more maintainable. 💡

### JavaScript (`script.js`, Internal Scripts)

The `script.js` file contains the core JavaScript logic for the Home page, including API fetching, blog display, and modal interactions. The `contact.html` and `about.html` pages include internal `<script>` blocks with the necessary JavaScript for their specific functionalities (form handling, preloader, mobile nav, etc.), ensuring each page is self-contained. Key JavaScript features include:

* **API Interaction:** Using the Fetch API to get data from NewsAPI. 🔌
* **DOM Manipulation:** Dynamically generating and updating HTML content. 🏗️
* **Event Handling:** Responding to user actions like clicks and scrolling. 👋
* **Local Storage:** Persisting user-created blog data in the browser. 🔒
* **Modal Control:** Managing the visibility and content of modal windows. 🖼️
* **Form Validation:** Basic client-side validation for the contact form. ✅
* **History API:** Using `history.back()` for the "Go Back" button. ⏪

## Deployment

This project was deployed using services like [GitHub Pages](https://pages.github.com/), [Netlify](https://www.netlify.com/), or [Vercel](https://vercel.com/).

**Deployment Link:** [INSERT YOUR DEPLOYMENT LINK HERE] 🔗

## Setup and Installation

To run this project locally:

1.  Clone the repository: `git clone [Your Repository URL]` 📥
2.  Navigate to the project directory: `cd [Your Project Folder]` 📁
3.  Open the `index.html` file in your web browser. You can then navigate to `contact.html` and `about.html` from the navigation menu. 🌐

You may need a NewsAPI key to fetch live featured articles. Replace `"d808703a8f1944b9a21ac382004e8063"` in `script.js` with your own NewsAPI key if the provided one is invalid or reaches its rate limit. 🔑

## API Usage

This project uses the [NewsAPI](https://newsapi.org/) to fetch featured news headlines. Please refer to their documentation for terms of service and API key usage. 📊

## Libraries and Frameworks Used

* **Font Awesome:** For icons. ✨
* **Google Fonts:** For custom fonts ('Playfair Display' and 'Raleway'). ✒️

## Author

**Brian Kathurima** 👋
Career: Computer Science and Software Development 💻
[Link to your GitHub Profile - https://github.com/kbrian1237] 🐙
[Link to your LinkedIn Profile - https://www.linkedin.com/in/brian-kathurima-8404082b4/] 👔

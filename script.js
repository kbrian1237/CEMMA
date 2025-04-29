const newsAPIKey = "d808703a8f1944b9a21ac382004e8063"; // Renamed variable for clarity
let blogs = []; // Move blogs array to global scope

document.addEventListener('DOMContentLoaded', function() {
    // Move fetchNewsArticles and setDefaultBlogs inside DOMContentLoaded
    async function fetchNewsArticles() {
        try {
            // Using NewsAPI endpoint for top headlines in the US
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsAPIKey}`);

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                setDefaultBlogs();
                return;
            }

            const data = await response.json();
            console.log('API Response:', data); // Debug log

            // Check if data.articles exists, is an array, and is not empty (NewsAPI structure)
            if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
                blogs = data.articles.map((article, index) => ({
                    id: index + 1, // NewsAPI articles might not have a unique 'id' field in this endpoint
                    title: article.title,
                    content: article.description, // NewsAPI uses 'description' for a short summary
                    image: article.urlToImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40', // Use 'urlToImage'
                    author: article.author || 'News Staff',
                    date: new Date(article.publishedAt).toLocaleDateString('en-US', { // Use 'publishedAt'
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                }));
                displayFeaturedBlogs();
            } else {
                console.warn('NewsAPI response data.articles is empty or invalid format');
                setDefaultBlogs();
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            setDefaultBlogs();
        }
    }

    function setDefaultBlogs() {
        blogs = [{
            id: 1,
            title: 'Welcome to Our Blog',
            content: 'This is a default blog post that appears when we cannot fetch the latest news.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
            author: 'Admin',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }];
        displayFeaturedBlogs();
    }

    // Preloader
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Blog Editor Modal
    const openEditorBtn = document.getElementById('openEditor');
    const heroCreateBtn = document.getElementById('heroCreateBtn');
    const editorModal = document.getElementById('editorModal');
    const closeEditorBtn = document.getElementById('closeEditor');
    const cancelPostBtn = document.getElementById('cancelPost');
    const savePostBtn = document.getElementById('savePost');
    const postTitle = document.getElementById('postTitle');
    const postContent = document.getElementById('postContent');
    const postImage = document.getElementById('postImage');
    const postAuthor = document.getElementById('postAuthor');

    // Article Modal Elements
    const articleModal = document.getElementById('articleModal');
    const articleModalTitle = document.getElementById('articleModalTitle');
    const articleModalImage = document.getElementById('articleModalImage');
    const articleModalAuthor = document.getElementById('articleModalAuthor');
    const articleModalDate = document.getElementById('articleModalDate');
    const articleModalContent = document.getElementById('articleModalContent');
    const closeArticleModalBtn = document.getElementById('closeArticleModal');

    // Open editor from both buttons
    [openEditorBtn, heroCreateBtn].forEach(btn => {
        btn.addEventListener('click', function() {
            editorModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Reset form if it's a new post
            if (!this.dataset.edit) {
                postTitle.value = '';
                postContent.value = '';
                postImage.value = '';
                postAuthor.value = '';
                savePostBtn.textContent = 'Publish';
                savePostBtn.dataset.mode = 'create';
            }
        });
    });

    // Close editor
    [closeEditorBtn, cancelPostBtn].forEach(btn => {
        btn.addEventListener('click', function() {
            editorModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    let userBlogs = JSON.parse(localStorage.getItem('userBlogs')) || [];
    let currentEditId = null;

    // Function to show the article modal
    function showArticleModal(blog) {
        articleModalTitle.textContent = blog.title;
        articleModalImage.src = blog.image;
        articleModalAuthor.textContent = `By ${blog.author}`;
        articleModalDate.textContent = blog.date;
        articleModalContent.textContent = blog.content; // Use textContent to preserve formatting

        articleModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling of the background
    }

    // Function to close the article modal
    function closeArticleModal() {
        articleModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling of the background
    }

    // Add event listener to the close button
    closeArticleModalBtn.addEventListener('click', closeArticleModal);

    // Close modal if clicking outside the content (on the overlay)
    articleModal.addEventListener('click', function(e) {
        if (e.target === articleModal) {
            closeArticleModal();
        }
    });


    // Display featured blogs
    function displayFeaturedBlogs() {
        const featuredGrid = document.getElementById('featuredGrid');
        if (!featuredGrid) {
            console.error('Featured grid element not found');
            return;
        }

        featuredGrid.innerHTML = '';

        if (!blogs || blogs.length === 0) {
            featuredGrid.innerHTML = `
                <div class="no-blogs" style="grid-column: 1/-1; text-align: center; padding: 50px 0;">
                    <h3>No featured stories available</h3>
                    <p>Please check back later for new content</p>
                </div>
            `;
            return;
        }

        blogs.forEach(blog => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            // Add a data attribute to store the blog index for easy retrieval
            blogCard.dataset.blogIndex = blogs.indexOf(blog);
            blogCard.innerHTML = `
                <div class="blog-image">
                    <img src="${blog.image}" alt="${blog.title}" onerror="this.src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'">
                </div>
                <div class="blog-content">
                    <div class="blog-date">${blog.date}</div>
                    <h3 class="blog-title">${blog.title}</h3>
                    <p class="blog-excerpt">${blog.content ? blog.content.substring(0, 100) + '...' : 'No content available'}</p>
                    <div class="blog-author">
                        <div class="author-avatar">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author)}&background=random" alt="${blog.author}">
                        </div>
                        <div class="author-name">${blog.author}</div>
                    </div>
                </div>
            `;
            featuredGrid.appendChild(blogCard);

            // Add click event listener to the featured blog card
            blogCard.addEventListener('click', function() {
                const index = parseInt(this.dataset.blogIndex);
                if (!isNaN(index) && blogs[index]) {
                    showArticleModal(blogs[index]);
                }
            });
        });
    }

    // Display user's blogs
    function displayUserBlogs() {
        const yourBlogsGrid = document.getElementById('yourBlogsGrid');
         if (!yourBlogsGrid) {
            console.error('Your blogs grid element not found');
            return;
        }

        yourBlogsGrid.innerHTML = '';

        if (userBlogs.length === 0) {
            yourBlogsGrid.innerHTML = `
                <div class="no-blogs" style="grid-column: 1/-1; text-align: center; padding: 50px 0;">
                    <h3>You haven't created any blogs yet</h3>
                    <p>Click the "New Post" button to create your first blog post</p>
                </div>
            `;
            return;
        }

        userBlogs.forEach(blog => {
            const blogCard = document.createElement('div');
            blogCard.className = 'your-blog-card';
             // Add a data attribute to store the blog id for easy retrieval
            blogCard.dataset.blogId = blog.id;
            blogCard.innerHTML = `
                <div class="blog-actions">
                    <button class="edit-btn" data-id="${blog.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" data-id="${blog.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="blog-image">
                    <img src="${blog.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}" alt="${blog.title}">
                </div>
                <div class="blog-content">
                    <div class="blog-date">${blog.date}</div>
                    <h3 class="blog-title">${blog.title}</h3>
                    <p class="blog-excerpt">${blog.content ? blog.content.substring(0, 100) + '...' : 'No content available'}</p>
                    <div class="blog-author">
                        <div class="author-avatar">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author)}&background=random" alt="${blog.author}">
                        </div>
                        <div class="author-name">${blog.author}</div>
                    </div>
                </div>
            `;
            yourBlogsGrid.appendChild(blogCard);

            // Add click event listener to the user blog card, avoiding the action buttons
             blogCard.addEventListener('click', function(e) {
                 // Check if the click target is NOT one of the action buttons or their icons
                if (!e.target.closest('.blog-actions')) {
                    const blogId = parseInt(this.dataset.blogId);
                    const clickedBlog = userBlogs.find(userBlog => userBlog.id === blogId);
                    if (clickedBlog) {
                        showArticleModal(clickedBlog);
                    }
                }
            });
        });

        // Add event listeners to edit and delete buttons (these need to be re-added each time)
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const blogId = parseInt(this.dataset.id);
                editBlog(blogId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const blogId = parseInt(this.dataset.id);
                showDeleteConfirmation(blogId);
            });
        });
    }

    // Save blog post
    savePostBtn.addEventListener('click', function() {
        if (!postTitle.value || !postContent.value || !postAuthor.value) {
            alert('Please fill in all required fields');
            return;
        }

        const today = new Date();
        const dateString = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        if (this.dataset.mode === 'create') {
            // Create new blog
            const newBlog = {
                id: Date.now(), // Use timestamp for a more unique ID
                title: postTitle.value,
                content: postContent.value,
                image: postImage.value,
                author: postAuthor.value,
                date: dateString
            };

            userBlogs.unshift(newBlog);
        } else {
            // Update existing blog
            const blogIndex = userBlogs.findIndex(blog => blog.id === currentEditId);
            if (blogIndex !== -1) {
                userBlogs[blogIndex] = {
                    ...userBlogs[blogIndex],
                    title: postTitle.value,
                    content: postContent.value,
                    image: postImage.value,
                    author: postAuthor.value
                };
            }
        }

        // Save to local storage
        localStorage.setItem('userBlogs', JSON.stringify(userBlogs));

        // Close modal and refresh display
        editorModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        displayUserBlogs(); // Refresh user blogs display
    });

    // Edit blog
    function editBlog(blogId) {
        const blogToEdit = userBlogs.find(blog => blog.id === blogId);
        if (blogToEdit) {
            currentEditId = blogId;
            postTitle.value = blogToEdit.title;
            postContent.value = blogToEdit.content;
            postImage.value = postImage.value ? postImage.value : blogToEdit.image || ''; // Preserve existing image if input is empty
            postAuthor.value = blogToEdit.author;

            savePostBtn.textContent = 'Update';
            savePostBtn.dataset.mode = 'edit';

            editorModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Delete blog confirmation
    const confirmationModal = document.getElementById('confirmationModal');
    const cancelDeleteBtn = document.getElementById('cancelDelete');
    const confirmDeleteBtn = document.getElementById('confirmDelete');
    let blogToDeleteId = null;

    function showDeleteConfirmation(blogId) {
        blogToDeleteId = blogId;
        confirmationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    cancelDeleteBtn.addEventListener('click', function() {
        confirmationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    confirmDeleteBtn.addEventListener('click', function() {
        if (blogToDeleteId) {
            userBlogs = userBlogs.filter(blog => blog.id !== blogToDeleteId);
            localStorage.setItem('userBlogs', JSON.stringify(userBlogs));
            displayUserBlogs(); // Refresh user blogs display
        }

        confirmationModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Prevent default if targetId is just "#" or empty
            if (targetId === '#' || targetId === '') {
                e.preventDefault();
                return;
            }

            try {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault(); // Prevent default only if a valid target element is found
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for fixed header if any
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error('Error with querySelector for:', targetId, error);
                // Optionally, still prevent default if querySelector fails
                e.preventDefault();
            }
        });
    });


    // Initialize the page with API fetch
    fetchNewsArticles().then(() => {
        displayUserBlogs();
    }).catch(error => {
        console.error('Error during initialization:', error);
        setDefaultBlogs();
        displayUserBlogs();
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.blog-card, .your-blog-card, .section-title, .section-subtitle'); // Added your-blog-card

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});
// Theme functionality
const themeSelect = document.getElementById('themeSelect');

// Theme configurations
const themes = {
    light: {
        '--primary-color': '#c19a6b',
        '--primary-dark': '#8b6b3d',
        '--secondary-color': '#1a1a1a',
        '--background': '#ffffff', // Changed to pure white for better contrast
        '--light-color': '#f8f5f270',
        '--dark-color': '#2a2a2a',
        '--text-color': '#000000', // Changed to black for better readability
        '--text-light': '#555555' // Slightly darker for better visibility
    },
    dark: {
        '--primary-color': '#c19a6b',
        '--primary-dark': '#8b6b3d',
        '--secondary-color': '#f8f5f2',
        '--background': '#121212', // Darker background for better contrast
        '--light-color': '#1a1a1a70',
        '--dark-color': '#f8f5f2',
        '--text-color': '#ffffff', // Changed to white for better readability
        '--text-light': '#cccccc'
    },
    forest: {
        '--primary-color': '#4CAF50',
        '--primary-dark': '#388E3C',
        '--secondary-color': '#1B5E20',
        '--background': '#E8F5E9', // Lighter background for better contrast
        '--light-color': '#ffffff70', // Changed to white for better readability
        '--dark-color': '#2E7D32',
        '--text-color': '#1B5E20',
        '--text-light': '#388E3C' // Slightly darker for better visibility
    },
    sunset: {
        '--primary-color': '#FF9800',
        '--primary-dark': '#F57C00',
        '--secondary-color': '#E65100',
        '--light-color': '#FFF3E070',
        '--dark-color': '#EF6C00',
        '--background': '#FFF8E1', // Lighter background for better contrast
        '--text-color': '#E65100',
        '--text-light': '#F57C00' // Slightly darker for better visibility
    },
    ocean: {
        '--primary-color': '#03A9F4',
        '--primary-dark': '#0288D1',
        '--secondary-color': '#01579B',
        '--light-color': '#E1F5FE70',
        '--dark-color': '#0277BD',
        '--background': '#B3E5FC', // Lighter background for better contrast
        '--text-color': '#01579B',
        '--text-light': '#0288D1' // Slightly darker for better visibility
    }
};

// Function to apply theme
function applyTheme(themeName) {
    const theme = themes[themeName];
    for (const [property, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(property, value);
    }
    localStorage.setItem('selectedTheme', themeName);
}

// Event listener for theme selection
themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
});

// Load saved theme from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
});

// Add theme transition to all elements
document.documentElement.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');
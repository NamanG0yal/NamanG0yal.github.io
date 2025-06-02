<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Naman Goyal</title>
    <style>
        :root {
            --text-primary: #1a1a1a;
            --text-secondary: #4a4a4a;
            --bg-primary: #ffffff;
            --accent: #007acc;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', system-ui, sans-serif;
        }

        body {
            line-height: 1.6;
            color: var(--text-primary);
            background-color: var(--bg-primary);
            font-size: 1.1rem;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }

        header {
            margin-bottom: 4rem;
            padding: 2rem 0;
            border-bottom: 1px solid #eee;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }

        nav {
            margin-top: 1.5rem;
        }

        nav a {
            color: var(--text-secondary);
            text-decoration: none;
            margin-right: 1.5rem;
            transition: color 0.2s;
        }

        nav a:hover {
            color: var(--accent);
        }

        section {
            margin: 4rem 0;
        }

        h2 {
            font-size: 1.8rem;
            margin-bottom: 2rem;
            font-weight: 500;
        }

        .item {
            margin-bottom: 2.5rem;
        }

        .item h3 {
            font-size: 1.2rem;
            margin-bottom: 0.25rem;
        }

        .item .meta {
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
        }

        .item p {
            color: var(--text-secondary);
            line-height: 1.7;
        }

        footer {
            margin-top: 4rem;
            padding: 2rem 0;
            border-top: 1px solid #eee;
            text-align: center;
            color: var(--text-secondary);
        }

        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            nav a {
                display: block;
                margin: 0.5rem 0;
            }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header>
            <h1>Naman Goyal</h1>
            <nav>
                <a href="#about">About</a>
                <a href="#experience">Experience</a>
                <a href="#projects">Projects</a>
                <a href="#publications">Publications</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>

        <section id="about">
            <h2>About</h2>
            <div class="item">
                <!-- Add your about content here -->
            </div>
        </section>

        <section id="experience">
            <h2>Experience</h2>
            <div class="item">
                <!-- Add experience entries -->
            </div>
        </section>

        <section id="projects">
            <h2>Projects</h2>
            <div class="item">
                <!-- Add project entries -->
            </div>
        </section>

        <section id="publications">
            <h2>Publications</h2>
            <div class="item">
                <!-- Add publication entries -->
            </div>
        </section>

        <section id="contact">
            <h2>Contact</h2>
            <div class="item">
                <!-- Add contact information -->
            </div>
        </section>

        <footer>
            © 2024 Naman Goyal. All rights reserved.
        </footer>
    </div>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Dynamic content loading
        window.addEventListener('DOMContentLoaded', () => {
            const items = document.querySelectorAll('.item');
            items.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.4s ease-out';
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }
                    });
                });

                observer.observe(item);
            });
        });
    </script>
</body>
</html>

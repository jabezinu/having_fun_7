// DOM Elements
const header = document.querySelector('header');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const newsletterForm = document.getElementById('newsletter-form');

// Scroll Event for Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Change icon based on menu state
    if (navLinks.classList.contains('active')) {
        navToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Newsletter Form Submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Simulate form submission
            this.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
            
            // In a real application, you would send this data to your server
            console.log('Newsletter subscription for:', email);
        } else {
            // Show error message
            const errorMessage = document.createElement('p');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Please enter a valid email address';
            
            // Remove existing error message if any
            const existingError = this.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            this.appendChild(errorMessage);
        }
    });
}

// Email Validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Animation on Scroll
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.feature, .specialty, .testimonial, .about-content, .contact-content, .newsletter');
    
    function checkScroll() {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Add fade-in class for CSS animations
    const styleSheet = document.styleSheets[0];
    const fadeInRule = `
        .fade-in {
            animation: fadeIn 1s ease forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    styleSheet.insertRule(fadeInRule, styleSheet.cssRules.length);
    
    // Initial check and setup for scroll event
    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

// Gallery Image Zoom Effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
    });
});

// Reservation Button Handler
document.querySelectorAll('.reservation-btn, a[href*="reservation"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.classList.add('modal-overlay');
        
        // Create modal content
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-header">
                <h2>Make a Reservation</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <form id="reservation-form">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input type="date" id="date" required>
                    </div>
                    <div class="form-group">
                        <label for="time">Time</label>
                        <input type="time" id="time" required>
                    </div>
                    <div class="form-group">
                        <label for="guests">Number of Guests</label>
                        <select id="guests" required>
                            <option value="">Select</option>
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3">3 People</option>
                            <option value="4">4 People</option>
                            <option value="5">5 People</option>
                            <option value="6">6+ People</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">Special Requests</label>
                        <textarea id="message" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn primary-btn">Submit Reservation</button>
                </form>
            </div>
        `;
        
        // Add modal styles
        const styleSheet = document.styleSheets[0];
        const modalStyles = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal {
                background-color: white;
                border-radius: 10px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                transform: translateY(-50px);
                transition: transform 0.3s ease;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #eee;
            }
            
            .modal-header h2 {
                margin-bottom: 0;
                color: var(--primary-color);
            }
            
            .close-modal {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--text-light);
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 10px 15px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-family: var(--font-secondary);
                font-size: 16px;
            }
            
            .form-group textarea {
                resize: vertical;
            }
            
            .form-group select {
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: right 15px center;
            }
            
            .success-message {
                color: green;
                text-align: center;
                padding: 20px;
                font-size: 18px;
            }
        `;
        
        styleSheet.insertRule(modalStyles, styleSheet.cssRules.length);
        
        // Append modal to body
        document.body.appendChild(overlay);
        overlay.appendChild(modal);
        
        // Animation
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.transform = 'translateY(0)';
        }, 10);
        
        // Close modal when clicking close button
        modal.querySelector('.close-modal').addEventListener('click', () => {
            closeModal(overlay);
        });
        
        // Close modal when clicking outside
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
        
        // Handle form submission
        const reservationForm = document.getElementById('reservation-form');
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                guests: document.getElementById('guests').value,
                message: document.getElementById('message').value
            };
            
            // In a real application, you would send this data to your server
            console.log('Reservation submitted:', formData);
            
            // Show success message
            modal.querySelector('.modal-body').innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle" style="font-size: 48px; color: green; margin-bottom: 20px;"></i>
                    <h3>Reservation Confirmed!</h3>
                    <p>Thank you for your reservation request. We'll contact you shortly to confirm your booking.</p>
                </div>
            `;
            
            // Close modal after delay
            setTimeout(() => {
                closeModal(overlay);
            }, 3000);
        });
    });
});

// Function to close modal
function closeModal(overlay) {
    const modal = overlay.querySelector('.modal');
    overlay.style.opacity = '0';
    modal.style.transform = 'translateY(-50px)';
    
    setTimeout(() => {
        document.body.removeChild(overlay);
    }, 300);
}

// Current Year for Copyright
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} Harmeko Coffee. All Rights Reserved.`;
    }
}); 
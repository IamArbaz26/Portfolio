// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Download resume function
function downloadResume() {
    const link = document.createElement('a');
    link.href = './Muhammad_Arbaz | Resume.pdf';
    link.download = 'Muhammad_Arbaz_Resume.pdf';
    link.click();
}

// Copy to clipboard function
function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        // Show visual feedback
        const button = event.target.closest('button');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('copied');
            }, 2000);
        }
        
        // Show popup message
        showPopupMessage(message || 'Copied to clipboard!');
        
        console.log('Copied to clipboard:', text);
    }).catch(() => {
        showPopupMessage('Copy to clipboard');
        console.log('Copy to clipboard');
    });
}

// Show popup message function
function showPopupMessage(message) {
    // Remove existing popup if any
    const existingPopup = document.querySelector('.popup-message');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create new popup
    const popup = document.createElement('div');
    popup.className = 'popup-message';
    popup.textContent = message;
    document.body.appendChild(popup);
    
    // Show popup
    setTimeout(() => {
        popup.classList.add('show');
    }, 100);
    
    // Hide popup after 2 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 2000);
}

// Active section tracking
let activeSection = 'hero';

function updateActiveSection() {
    const sections = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'certifications', 'contact'];
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                if (activeSection !== section) {
                    activeSection = section;
                    // You can add active section styling here if needed
                }
                break;
            }
        }
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .experience-card, .education-card, .skills-card, .project-card, .certification-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Add scroll event listener
    window.addEventListener('scroll', updateActiveSection);
    
    // Initial call to set active section
    updateActiveSection();
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Add hover effects to contact icons
    const contactIcons = document.querySelectorAll('.contact-icon');
    contactIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1)';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
        });
    });

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.05)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
        });
    });
});

// Parallax effect for background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.bg-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Text changing animation
function changeText() {
    const changingText = document.getElementById('changing-text');
    const texts = ['Web Developer', 'Front End Developer'];
    let currentIndex = 0;
    
    function updateText() {
        changingText.classList.add('fade-out');
        
        setTimeout(() => {
            changingText.textContent = texts[currentIndex];
            changingText.classList.remove('fade-out');
            changingText.classList.add('fade-in');
            
            setTimeout(() => {
                changingText.classList.remove('fade-in');
            }, 500);
            
            currentIndex = (currentIndex + 1) % texts.length;
        }, 500);
    }
    
    // Start the animation after 2 seconds
    setTimeout(() => {
        updateText();
        // Change text every 3 seconds
        setInterval(updateText, 3000);
    }, 2000);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    changeText();
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

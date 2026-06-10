/* ==========================================================================
   SPORTMATE LANDING PAGE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active nav links on scroll
        highlightNavLinkOnScroll();
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('btn-mobile-menu');
    const navMenu = document.getElementById('nav-menu-list');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileMenuBtn.classList.toggle('active');
            
            // Hamburger icon transformation
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.querySelectorAll('span').forEach(s => s.style.transform = 'none');
                mobileMenuBtn.querySelectorAll('span')[1].style.opacity = '1';
            });
        });
    }

    // 3. Highlight Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLinkOnScroll() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // 4. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Toggle current FAQ item
            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 5. Interactive App Tour (Screenshot Switcher)
    const tourTabs = document.querySelectorAll('.tour-tab');
    const phoneScreenImg = document.getElementById('phone-screen-img');
    
    if (tourTabs.length > 0 && phoneScreenImg) {
        tourTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Ignore if clicked tab is already active
                if (tab.classList.contains('active')) return;
                
                // Remove active class from all tabs
                tourTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Get the screenshot image path
                const newImgSrc = tab.getAttribute('data-image');
                
                // Smooth transition: fade out, switch src, fade in
                phoneScreenImg.style.opacity = '0';
                
                setTimeout(() => {
                    phoneScreenImg.src = newImgSrc;
                    phoneScreenImg.onload = () => {
                        phoneScreenImg.style.opacity = '1';
                    };
                }, 200);
            });
        });
    }

    // 6. Pre-Registration Form Submission
    const preRegForm = document.getElementById('pre-registration-form');
    const successMsg = document.getElementById('registration-success-msg');
    const generatedVoucherCode = document.getElementById('generated-voucher-code');
    
    if (preRegForm && successMsg) {
        preRegForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Retrieve field values
            const name = document.getElementById('user-name').value;
            const email = document.getElementById('user-email').value;
            const phone = document.getElementById('user-phone').value;
            const sport = document.getElementById('user-sport').value;
            
            // Validate data
            if (!name || !email || !phone || !sport) {
                alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
                return;
            }
            
            // Save data to localStorage (Simulating backend registration DB save)
            const registration = {
                name,
                email,
                phone,
                sport,
                registeredAt: new Date().toISOString()
            };
            
            let registrations = [];
            try {
                const storedRegs = localStorage.getItem('sportmate_registrations');
                if (storedRegs) {
                    registrations = JSON.parse(storedRegs);
                }
            } catch (err) {
                console.error('Error reading localStorage registrations:', err);
            }
            
            registrations.push(registration);
            localStorage.setItem('sportmate_registrations', JSON.stringify(registrations));
            
            // Generate a custom voucher code based on user sport
            const shortSport = sport.substring(0, 3).toUpperCase();
            const randomCodeNum = Math.floor(100 + Math.random() * 900); // random 3 digits
            const voucher = `SM-${shortSport}-${randomCodeNum}`;
            
            if (generatedVoucherCode) {
                generatedVoucherCode.textContent = voucher;
            }
            
            // Hide form and display success alert with zoom-in styling
            preRegForm.classList.add('hidden');
            successMsg.classList.remove('hidden');
            
            console.log('Early-bird Registration Successful:', registration);
        });
    }
});

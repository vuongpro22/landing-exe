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

    // 5. App Simulator Interactivity (Interactive Mockup)
    const videoOverlayBtn = document.getElementById('video-overlay-btn');
    const simScreen1 = document.getElementById('sim-screen-1');
    const simScreenChat = document.getElementById('sim-screen-chat');
    const btnJoinSimMatch = document.getElementById('btn-join-sim-match');
    const simChatBoxList = document.getElementById('sim-chat-box-list');
    
    // Clicking overlay "starts" simulator demo
    if (videoOverlayBtn) {
        videoOverlayBtn.addEventListener('click', () => {
            videoOverlayBtn.classList.add('hidden');
        });
    }
    
    // Simulate joining match -> transition to real-time chat screen
    if (btnJoinSimMatch && simScreen1 && simScreenChat) {
        btnJoinSimMatch.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent trigger overlay
            
            // Show loading animation on button
            btnJoinSimMatch.textContent = 'Đang cọc...';
            btnJoinSimMatch.disabled = true;
            
            setTimeout(() => {
                simScreen1.classList.add('hidden');
                simScreenChat.classList.remove('hidden');
                
                // Animate typing messages in chat room
                simulateChatConversation();
            }, 1000);
        });
    }
    
    function simulateChatConversation() {
        if (!simChatBoxList) return;
        
        const messages = [
            { sender: 'Đức', text: 'Chào đồng đội mới! Tối nay đúng 19h chiến nha.', delay: 1500 },
            { sender: 'Bạn', text: 'Nhất trí ạ, mình mang theo 2 vợt nhé.', delay: 3000 },
            { sender: 'Hệ thống', text: '🏸 Đã tạo mã QR chia tiền sân: 45.000đ/người.', delay: 4500, system: true }
        ];
        
        messages.forEach(msg => {
            setTimeout(() => {
                const msgEl = document.createElement('div');
                if (msg.system) {
                    msgEl.className = 'chat-msg system';
                    msgEl.innerHTML = msg.text;
                } else {
                    const isSelf = msg.sender === 'Bạn';
                    msgEl.className = `chat-msg ${isSelf ? 'sent' : 'received'}`;
                    msgEl.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text}`;
                }
                simChatBoxList.appendChild(msgEl);
                
                // Auto scroll down in chat box
                simChatBoxList.scrollTop = simChatBoxList.scrollHeight;
            }, msg.delay);
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

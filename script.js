// Chatbot Functionality for Janith Graphic Studio
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotPanel = document.querySelector('.chatbot-panel');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    // Chatbot state
    let currentState = 'initial';
    let selectedService = '';

    // Toggle chatbot panel
    chatbotButton.addEventListener('click', function() {
        chatbotPanel.classList.toggle('active');
        if (chatbotPanel.classList.contains('active')) {
            // Only show initial message if this is the first time opening
            if (chatbotMessages.children.length === 0) {
                showInitialMessages();
            }
        }
    });

    // Close chatbot panel
    chatbotClose.addEventListener('click', function() {
        chatbotPanel.classList.remove('active');
    });

    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial bot messages
            function showInitialMessages() {
                // First message
                addBotMessage("Hi 👋 I am JGS Chatbot Assistant, How Can I Help You Today?", function() {
                    // Second message after a delay
                    setTimeout(function() {
                        addBotMessage("ඔබට අවශ්‍ය සේවාව කුමක්ද..? / What service do you need?", function() {
                            // Show service cards
                            showServiceCards();
                        });
                    }, 1000);
                });
            }

            // Show service cards
            function showServiceCards() {
                currentState = 'services';
                
                const cardsHtml = `
                    <div class="service-cards">
                        <div class="service-card" data-service="graphic-design">
                            <i class="fas fa-paint-brush"></i>
                            Graphic Design Service
                        </div>
                        <div class="service-card" data-service="about-us">
                            <i class="fas fa-info-circle"></i>
                            අපි ගැන දැනගන්න (About Us)
                        </div>
                        <div class="service-card" data-service="consulting">
                            <i class="fas fa-headset"></i>
                            කන්සාල්ටින් සහ උපකාර (Consulting & Help)
                        </div>
                        <div class="service-card" data-service="support">
                            <i class="fas fa-hands-helping"></i>
                            කස්ටමර් Support (Customer Support)
                        </div>
                    </div>
                `;
                
                // Add cards with typing effect container
                const typingContainer = document.createElement('div');
                typingContainer.className = 'bot-message message';
                typingContainer.innerHTML = '<div class="typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
                chatbotMessages.appendChild(typingContainer);
                
                // Scroll to bottom
                scrollToBottom();
                
                // After a short delay, replace typing with cards
                setTimeout(function() {
                    typingContainer.innerHTML = cardsHtml;
                    
                    // Add event listeners to cards
                    document.querySelectorAll('.service-card').forEach(card => {
                        card.addEventListener('click', function() {
                            handleServiceSelection(this.dataset.service);
                        });
                    });
                    
                    scrollToBottom();
                }, 1000);
            }

            // Handle service selection
            function handleServiceSelection(service) {
                selectedService = service;
                
                // Remove existing cards
                document.querySelector('.service-cards')?.remove();
                
                // Show selected service response
                switch(service) {
                    case 'graphic-design':
                        currentState = 'graphic-design-options';
                        addBotMessage("Graphic Design Service - ග්‍රැෆික් ඩිසයින් සේවාවන්", function() {
                            showGraphicDesignOptions();
                        });
                        break;
                        
                    case 'about-us':
                        currentState = 'about-us';
                        addBotMessage("අප පිළිබඳ දැනගැනීමට පිවිසෙන්න..", function() {
                            showActionButton("Get Now", "fas fa-external-link-alt", "https://sites.google.com/view/janithgraphicstudio/about");
                        });
                        break;
                        
                    case 'consulting':
                        currentState = 'consulting';
                        addBotMessage("ඔබට සහය වීමට ලැබීම අපට සතුටකි. කරුණාකර ඔබගේ ගැටලුව අප වෙත යොමු කරන්න.", function() {
                            showConsultingInput();
                        });
                        break;
                        
                    case 'support':
                        currentState = 'support';
                        addBotMessage("අපගේ සේවාවන් පිළිබඳ දැනගැනීමට පිවිසෙන්න..", function() {
                            showActionButton("Get Now", "fas fa-external-link-alt", "https://sites.google.com/view/janithgraphicstudio/shop");
                        });
                        break;
                }
            }

            // Show graphic design options
            function showGraphicDesignOptions() {
                const optionsHtml = `
                    <div class="options-list">
                        <div class="option-item" data-option="know-services">
                            a. අපගේ සේවාවන් දැනගන්න (Know our services)
                        </div>
                        <div class="option-item" data-option="portfolio">
                            b. Portpolio සහ Example නැරබීම (Portfolio & Samples)
                        </div>
                        <div class="option-item" data-option="buy-services">
                            c. සේවාවන් මිලදී ගැනීම (Buy Services)
                        </div>
                        <div class="option-item" data-option="place-order">
                            d. Graphic Design Service ඇණවුම් කිරීම (Place an Order)
                        </div>
                    </div>
                `;
                
                // Add options with typing effect container
                const typingContainer = document.createElement('div');
                typingContainer.className = 'bot-message message';
                typingContainer.innerHTML = '<div class="typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
                chatbotMessages.appendChild(typingContainer);
                
                // Scroll to bottom
                scrollToBottom();
                
                // After a short delay, replace typing with options
                setTimeout(function() {
                    typingContainer.innerHTML = optionsHtml;
                    
                    // Add event listeners to options
                    document.querySelectorAll('.option-item').forEach(option => {
                        option.addEventListener('click', function() {
                            handleGraphicDesignOption(this.dataset.option);
                        });
                    });
                    
                    scrollToBottom();
                }, 1000);
            }

            // Handle graphic design option selection
            function handleGraphicDesignOption(option) {
                // Remove existing options
                document.querySelector('.options-list')?.remove();
                
                switch(option) {
                    case 'know-services':
                        addBotMessage("අපගේ සේවාවන් පිළිබඳ දැනගැනීමට පිවිසෙන්න..", function() {
                            showActionButton("Get Now", "fas fa-external-link-alt", "https://sites.google.com/view/janithgraphicstudio/services");
                        });
                        break;
                        
                    case 'portfolio':
                        addBotMessage("අපගේ නිර්මාණ සහ Portpolio නැරඹීමට සහ ඒ පිළිබඳ දැනගැනීමට පිවිසෙන්න..", function() {
                            showActionButton("Get Now", "fas fa-external-link-alt", "https://sites.google.com/view/janithgraphicstudio/portfolio");
                        });
                        break;
                        
                    case 'buy-services':
                        addBotMessage("අපගේ සේවාවන් සහ මිලගණන් දැනගැනීමට හෝ මිලදී ගැනීමට පිවිසෙන්න..", function() {
                            showActionButton("Get Now", "fas fa-external-link-alt", "https://sites.google.com/view/janithgraphicstudio/shop");
                        });
                        break;
                        
                    case 'place-order':
                        addBotMessage("ස්තූති, ඔබගේ පැමිණීම අපට ඉමහත් ගෞරවයකි. ඔබගේ සේවා ඇණවුම දැන් අපට ලබාදන්න.", function() {
                            showActionButton("Order Now", "fab fa-whatsapp", "https://wa.me/94702001859", true);
                        });
                        break;
                }
            }

            // Show consulting input
            function showConsultingInput() {
                const inputHtml = `
                    <div class="bot-message message">
                        <p>කරුණාකර ඔබගේ ප්‍රශ්නය හෝ ගැටලුව ලියන්න:</p>
                        <div class="chatbot-input" style="padding: 10px 0 0 0; border: none; background: transparent;">
                            <input type="text" placeholder="Type your question..." id="consulting-input" style="width: 100%;">
                        </div>
                        <div class="action-buttons">
                            <button class="action-btn" id="send-consultation" style="margin-top: 10px;">
                                <i class="fab fa-whatsapp"></i> Send Now
                            </button>
                        </div>
                    </div>
                `;
                
                // Add input with typing effect container
                const typingContainer = document.createElement('div');
                typingContainer.className = 'bot-message message';
                typingContainer.innerHTML = '<div class="typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
                chatbotMessages.appendChild(typingContainer);
                
                // Scroll to bottom
                scrollToBottom();
                
                // After a short delay, replace typing with input
                setTimeout(function() {
                    typingContainer.innerHTML = inputHtml;
                    
                    // Add event listener to send button
                    document.getElementById('send-consultation')?.addEventListener('click', function() {
                        const input = document.getElementById('consulting-input');
                        if (input.value.trim() !== '') {
                            addUserMessage(input.value);
                            input.value = '';
                            
                            // Show confirmation
                            setTimeout(function() {
                                addBotMessage("ස්තූතියි! ඔබගේ ප්‍රශ්නය අප වෙත යොමු කර ඇත. අපගේ සහය කණ්ඩායම ඔබට ඉක්මනින් පිලිතුරු දෙනු ඇත.", function() {
                                    window.open('https://wa.me/94702001859', '_blank');
                                });
                            }, 1000);
                        }
                    });
                    
                    // Also send on Enter key
                    document.getElementById('consulting-input')?.addEventListener('keypress', function(e) {
                        if (e.key === 'Enter') {
                            document.getElementById('send-consultation').click();
                        }
                    });
                    
                    scrollToBottom();
                }, 1000);
            }

            // Show action button
            function showActionButton(text, icon, url, isWhatsApp = false) {
                const buttonHtml = `
                    <div class="action-buttons">
                        <button class="action-btn" id="action-btn">
                            <i class="${icon}"></i> ${text}
                        </button>
                    </div>
                `;
                
                // Add button with typing effect container
                const typingContainer = document.createElement('div');
                typingContainer.className = 'bot-message message';
                typingContainer.innerHTML = '<div class="typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
                chatbotMessages.appendChild(typingContainer);
                
                // Scroll to bottom
                scrollToBottom();
                
                // After a short delay, replace typing with button
                setTimeout(function() {
                    typingContainer.innerHTML = buttonHtml;
                    
                    // Add event listener to button
                    document.getElementById('action-btn')?.addEventListener('click', function() {
                        if (isWhatsApp) {
                            const timestamp = new Date().toLocaleString();
                            window.open(`${url}?text=${encodeURIComponent("I need help with JGS services - " + timestamp)}`, '_blank');
                        } else {
                            window.open(url, '_blank');
                        }
                    });
                    
                    scrollToBottom();
                }, 1000);
            }

            // Add bot message with typing effect
            function addBotMessage(text, callback) {
                const messageElement = document.createElement('div');
                messageElement.className = 'bot-message message';
                
                // Start with typing indicator
                messageElement.innerHTML = '<div class="typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
                chatbotMessages.appendChild(messageElement);
                
                // Scroll to bottom
                scrollToBottom();
                
                // Calculate typing time (50ms per character)
                const typingTime = Math.min(text.length * 50, 3000);
                
                // After typing time, replace with actual message
                setTimeout(function() {
                    messageElement.innerHTML = text;
                    scrollToBottom();
                    
                    // Execute callback if provided
                    if (callback) {
                        callback();
                    }
                }, typingTime);
            }

            // Add user message
            function addUserMessage(text) {
                const messageElement = document.createElement('div');
                messageElement.className = 'user-message message';
                messageElement.textContent = text;
                chatbotMessages.appendChild(messageElement);
                scrollToBottom();
            }

            // Send message
            function sendMessage() {
                const message = userInput.value.trim();
                if (message !== '') {
                    addUserMessage(message);
                    userInput.value = '';
                    
                    // Bot response based on current state
                    setTimeout(function() {
                        switch(currentState) {
                            case 'initial':
                            case 'services':
                                addBotMessage("කරුණාකර ඉහත සේවා වලින් ඔබට අවශ්‍ය එක තෝරන්න.", function() {
                                    showServiceCards();
                                });
                                break;
                                
                            case 'graphic-design-options':
                                addBotMessage("කරුණාකර ඉහත විකල්ප වලින් ඔබට අවශ්‍ය එක තෝරන්න.", function() {
                                    showGraphicDesignOptions();
                                });
                                break;
                                
                            case 'consulting':
                                // This will be handled by the consulting input
                                break;
                                
                            default:
                                addBotMessage("I'm not sure how to respond to that. Please select one of the options above.", function() {
                                    if (currentState === 'graphic-design-options') {
                                        showGraphicDesignOptions();
                                    } else {
                                        showServiceCards();
                                    }
                                });
                        }
                    }, 1000);
                }
            }

    // Scroll to bottom of messages
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});
// --- Chatbot Notification Logic (Local Sound File) ---
window.addEventListener('DOMContentLoaded', function() {
    const notif = document.getElementById('chatbot-notification');
    const notifClose = document.getElementById('chatbot-notification-close');

  setTimeout(() => {
        notif.classList.add('show');
        setTimeout(() => {
            notif.classList.remove('show');
        }, 4000);
    }, 1000);

    notifClose.onclick = () => notif.classList.remove('show');
});
   // Welcome Popup
        setTimeout(() => {
            document.getElementById('welcomePopup').classList.add('active');
        }, 2000);
        
        document.getElementById('closePopup').addEventListener('click', () => {
            document.getElementById('welcomePopup').classList.remove('active');
        });

// Existing website scripts
 // Mouse light effect
     document.addEventListener('mousemove', (e) => {
            const light = document.getElementById('lightEffect');
            light.style.left = e.clientX + 'px';
            light.style.top = e.clientY + 'px';
        });
        // Cursor Lightning Effect
        document.addEventListener('mousemove', function(e) {
            document.body.classList.add('lightning');
            const cursor = document.body;
            cursor.style.setProperty('--x', e.clientX + 'px');
            cursor.style.setProperty('--y', e.clientY + 'px');
            
            setTimeout(() => {
                document.body.classList.remove('lightning');
            }, 100);
        });
        
        // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
             // Scroll Down Button
        const scrollDown = document.getElementById('scrollDown');
        scrollDown.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
         // Smooth scrolling for all links
         document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Animation on scroll
        function animateOnScroll() {
            const elements = document.querySelectorAll('.card, .feature-item, .about-image, .about-content');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
            
            // Go to Top Button
            const goTop = document.querySelector('.go-top');
            if (window.scrollY > 300) {
                goTop.classList.add('active');
            } else {
                goTop.classList.remove('active');
            }
        });
        const scrollToTop = document.querySelector('.go-top');
if (scrollToTop) {
    function scrollTopHandler(e) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    scrollToTop.addEventListener('click', scrollTopHandler);
    scrollToTop.addEventListener('touchstart', scrollTopHandler);
}
        
        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Popup
        const learnMore = document.getElementById('learn-more');
        const popup = document.getElementById('popup');
        const popupClose = document.querySelector('.popup-close');
        
        learnMore.addEventListener('click', function(e) {
            e.preventDefault();
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        popupClose.addEventListener('click', function() {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
         // Card hover effect enhancement
         document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
        
        // Go to Top
        const goTop = document.querySelector('.go-top');
        goTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Animate elements on scroll
        const animateOnScroll = function() {
            const elements = document.querySelectorAll('.card, .mission-card, .ai-section, .section-title');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial state for animated elements
        window.addEventListener('load', function() {
            const elements = document.querySelectorAll('.card, .mission-card, .ai-section, .section-title');
            
            elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            animateOnScroll();
        });
        
        window.addEventListener('scroll', animateOnScroll);
        
        window.addEventListener('DOMContentLoaded', function() {
    const welcomePopup = document.getElementById('welcomePopup');
    const closePopup = document.getElementById('closePopup');

    // Function to check if device is desktop
    function isDesktop() {
        return window.innerWidth >= 768; // You can adjust this breakpoint as needed
    }

    if (welcomePopup && closePopup) {
        if (isDesktop()) {
            setTimeout(() => {
                welcomePopup.classList.add('active');
            }, 2000);

            closePopup.addEventListener('click', () => {
                welcomePopup.classList.remove('active');
            });
            closePopup.addEventListener('touchstart', () => {
                welcomePopup.classList.remove('active');
            });
        } else {
            // On mobile, always hide the popup
            welcomePopup.classList.remove('active');
        }
    }
});

class NewYearCountdown {
    constructor() {
        this.targetDate = this.getNextNewYear();
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            targetYear: document.getElementById('target-year'),
            currentYear: document.getElementById('current-year')
        };
        
        this.init();
    }
    
    getNextNewYear() {
        const now = new Date();
        const currentYear = now.getFullYear();
        let nextYear = currentYear + 1;
        
        // If it's already January 1st, count down to next year
        if (now.getMonth() === 0 && now.getDate() === 1) {
            nextYear = currentYear + 1;
        } else {
            nextYear = currentYear + 1;
        }
        
        // Create target date for January 1st, 00:00:00 of next year
        return new Date(nextYear, 0, 1, 0, 0, 0);
    }
    
    init() {
        this.updateDisplay();
        this.updateYearDisplay();
        this.startCountdown();
        this.addInteractivity();
    }
    
    updateDisplay() {
        const now = new Date();
        const difference = this.targetDate - now;
        
        if (difference <= 0) {
            this.celebrate();
            return;
        }
        
        const time = this.calculateTime(difference);
        
        this.elements.days.textContent = this.padNumber(time.days);
        this.elements.hours.textContent = this.padNumber(time.hours);
        this.elements.minutes.textContent = this.padNumber(time.minutes);
        this.elements.seconds.textContent = this.padNumber(time.seconds);
        
        // Add animation effect when seconds change
        this.animateChange(this.elements.seconds);
    }
    
    calculateTime(difference) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
    }
    
    padNumber(num) {
        return num.toString().padStart(2, '0');
    }
    
    updateYearDisplay() {
        const targetYear = this.targetDate.getFullYear();
        const currentYear = new Date().getFullYear();
        
        this.elements.targetYear.textContent = targetYear;
        this.elements.currentYear.textContent = `Counting down to ${targetYear}`;
    }
    
    startCountdown() {
        this.interval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }
    
    animateChange(element) {
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
    
    celebrate() {
        clearInterval(this.interval);
        
        // Update display to show celebration
        this.elements.days.textContent = '00';
        this.elements.hours.textContent = '00';
        this.elements.minutes.textContent = '00';
        this.elements.seconds.textContent = '00';
        
        // Add celebration class
        document.body.classList.add('celebration-mode');
        
        // Update header
        const header = document.querySelector('.countdown-header h1');
        header.textContent = '\ud83c\udf89 Happy New Year! \ud83c\udf89';
        
        // Update subtitle
        this.elements.currentYear.textContent = `Welcome ${this.targetDate.getFullYear()}!`;
        
        // Create confetti effect
        this.createConfetti();
        
        // Show celebration message
        this.showCelebrationMessage();
    }
    
    createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffd700'];
        const confettiCount = 100;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}%;
                    top: -10px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: fall ${3 + Math.random() * 2}s linear;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 5000);
            }, i * 30);
        }
        
        // Add falling animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    showCelebrationMessage() {
        const celebrationMessage = document.createElement('div');
        celebrationMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.95);
                color: #333;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                animation: celebrationPopup 0.5s ease-out;
            ">
                <h2 style="font-size: 2.5rem; margin-bottom: 20px; color: #667eea;">\ud83c\udf8a New Year 2025! \ud83c\udf8a</h2>
                <p style="font-size: 1.2rem; margin-bottom: 20px;">Wishing you joy, prosperity, and amazing adventures in the new year!</p>
                <button onclick="this.parentElement.remove()" style="
                    background: linear-gradient(45deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Let's Celebrate!
                </button>
            </div>
        `;
        document.body.appendChild(celebrationMessage);
        
        // Add popup animation
        const popupStyle = document.createElement('style');
        popupStyle.textContent = `
            @keyframes celebrationPopup {
                from {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(popupStyle);
    }
    
    addInteractivity() {
        // Add hover effects to time blocks
        const timeBlocks = document.querySelectorAll('.time-block');
        timeBlocks.forEach(block => {
            block.addEventListener('mouseenter', () => {
                block.style.background = 'rgba(255, 255, 255, 0.25)';
            });
            
            block.addEventListener('mouseleave', () => {
                block.style.background = 'rgba(255, 255, 255, 0.15)';
            });
        });
        
        // Add click event to wish items
        const wishItems = document.querySelectorAll('.wish-item');
        wishItems.forEach(item => {
            item.addEventListener('click', () => {
                this.animateWish(item);
            });
        });
    }
    
    animateWish(item) {
        item.style.transform = 'scale(1.2) rotate(10deg)';
        item.style.background = 'rgba(255, 215, 0, 0.3)';
        
        setTimeout(() => {
            item.style.transform = 'scale(1.05)';
            item.style.background = 'rgba(255, 255, 255, 0.15)';
        }, 300);
    }
}

// Initialize the countdown when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NewYearCountdown();
    
    // Add some sparkles to the page
    addSparkles();
});

function addSparkles() {
    const sparkleCount = 20;
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '\u2728';
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${10 + Math.random() * 20}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${2 + Math.random() * 3}s infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        sparkleContainer.appendChild(sparkle);
    }
    
    document.body.appendChild(sparkleContainer);
    
    // Add twinkle animation
    const twinkleStyle = document.createElement('style');
    twinkleStyle.textContent = `
        @keyframes twinkle {
            0%, 100% {
                opacity: 0;
                transform: scale(0.5);
            }
            50% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(twinkleStyle);
}

// Add keyboard shortcuts for fun
document.addEventListener('keydown', (e) => {
    if (e.key === 'c' || e.key === 'C') {
        // Trigger confetti on 'C' key
        const countdown = new NewYearCountdown();
        countdown.createConfetti();
    }
});

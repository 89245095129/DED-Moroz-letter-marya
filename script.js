// Создание снежинок
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';
        
        const size = Math.random() * 20 + 10;
        const startPosition = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.7 + 0.3;
        const delay = Math.random() * 10;
        
        snowflake.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${startPosition}%;
            font-size: ${size}px;
            color: white;
            opacity: ${opacity};
            animation: fall ${animationDuration}s linear infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
            z-index: 1;
        `;
        
        snowflakesContainer.appendChild(snowflake);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Добавление дополнительных снежинок
function addMoreSnow() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const extraCount = 30;
    
    for (let i = 0; i < extraCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('extra-snowflake');
        snowflake.innerHTML = '❅';
        
        const size = Math.random() * 25 + 15;
        const startPosition = Math.random() * 100;
        const animationDuration = Math.random() * 8 + 8;
        const opacity = Math.random() * 0.8 + 0.2;
        const delay = Math.random() * 5;
        
        snowflake.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${startPosition}%;
            font-size: ${size}px;
            color: #e0aaff;
            opacity: ${opacity};
            animation: fallFast ${animationDuration}s linear infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
            z-index: 1;
            text-shadow: 0 0 5px white;
        `;
        
        snowflakesContainer.appendChild(snowflake);
    }
    
    if (!document.querySelector('#fastSnowStyle')) {
        const style = document.createElement('style');
        style.id = 'fastSnowStyle';
        style.textContent = `
            @keyframes fallFast {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Мерцание ёлочных огней
function toggleChristmasLights() {
    const letterBorder = document.querySelector('.letter-border');
    
    if (letterBorder.classList.contains('lights-on')) {
        letterBorder.classList.remove('lights-on');
        letterBorder.style.animation = 'borderGlow 4s infinite alternate';
        document.getElementById('lightsBtn').innerHTML = '<i class="fas fa-tree"></i> Мерцание ёлки';
    } else {
        letterBorder.classList.add('lights-on');
        letterBorder.style.animation = 'christmasLights 1.5s infinite alternate';
        document.getElementById('lightsBtn').innerHTML = '<i class="fas fa-tree"></i> Выключить мерцание';
        
        if (!document.querySelector('#lightsStyle')) {
            const style = document.createElement('style');
            style.id = 'lightsStyle';
            style.textContent = `
                @keyframes christmasLights {
                    0%, 100% {
                        box-shadow: 0 0 30px #9d4edd, 0 0 60px #9d4edd;
                        border-color: #9d4edd;
                    }
                    33% {
                        box-shadow: 0 0 30px #ffcc00, 0 0 60px #ffcc00;
                        border-color: #ffcc00;
                    }
                    66% {
                        box-shadow: 0 0 30px #c77dff, 0 0 60px #c77dff;
                        border-color: #c77dff;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Управление музыкой
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    if (music.paused) {
        music.play().then(() => {
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i> Выключить музыку';
        }).catch(error => {
            console.log('Ошибка воспроизведения музыки:', error);
            musicBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Нажмите ещё раз';
        });
    } else {
        music.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i> Включить музыку';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
    
    document.getElementById('musicBtn').addEventListener('click', toggleMusic);
    document.getElementById('snowBtn').addEventListener('click', addMoreSnow);
    document.getElementById('lightsBtn').addEventListener('click', toggleChristmasLights);
    
    const letterContent = document.querySelector('.letter-content');
    letterContent.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.01)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    letterContent.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Подготовка музыки
    const music = document.getElementById('bgMusic');
    music.volume = 0.3;
    music.preload = 'auto';
});

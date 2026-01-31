document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn');
    const resultArea = document.getElementById('result-area');
    const fortuneText = document.getElementById('fortune-text');
    const bgmBtn = document.getElementById('bgm-btn');
    const bgmPlayer = document.getElementById('bgm-player');

    // Fortunes list
    // Probabilities can be adjusted by adding more of the same type if desired,
    // but here we stick to a simple uniform distribution for now.
    const fortunes = [
        '大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶'
    ];

    let isShaking = false;

    drawBtn.addEventListener('click', () => {
        if (isShaking) return; // Prevent double clicks

        // Reset previous result
        resultArea.classList.add('hidden');
        fortuneText.textContent = '';
        
        // Start shaking animation on the button to simulate drawing
        isShaking = true;
        drawBtn.textContent = 'シャカシャカ...';
        drawBtn.classList.add('shaking');

        // Wait for 1.5 seconds for effect
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * fortunes.length);
            const result = fortunes[randomIndex];

            fortuneText.textContent = result;
            
            // Determine color based on result
            if (result === '大吉' || result === '吉') {
                fortuneText.style.color = '#d32f2f'; // Red for good luck
            } else if (result === '凶' || result === '大凶') {
                fortuneText.style.color = '#1a237e'; // Dark blue for bad luck
            } else {
                fortuneText.style.color = '#3e2723'; // Standard brown
            }

            drawBtn.classList.remove('shaking');
            drawBtn.textContent = 'もう一度引く';
            resultArea.classList.remove('hidden');
            isShaking = false;

        }, 1500);
    });

    // BGM specific logic
    // Note: Auto-play policies usually require user interaction first.
    let isPlaying = false;
    
    bgmBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgmPlayer.pause();
            bgmBtn.textContent = '🎵 BGM OFF';
            isPlaying = false;
        } else {
            bgmPlayer.volume = 0.3; // Set volume to 30%
            bgmPlayer.play().catch(e => {
                console.log("Audio play failed (maybe no file or policy blocked):", e);
                alert("BGMファイルが見つかりません (assets/bgm.mp3)");
            });
            bgmBtn.textContent = '🎵 BGM ON';
            isPlaying = true;
        }
    });
});

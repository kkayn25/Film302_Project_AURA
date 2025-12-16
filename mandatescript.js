document.addEventListener("DOMContentLoaded", () => {
    // title glitch
    const title = document.querySelector("h1.glitch");
    if (title) glitchTextContinuous(title);
    
    // section subtitles glitch
    const subtitles = document.querySelectorAll(".glitch-subtitle");
    
    subtitles.forEach(subtitle => {
        subtitle.dataset.original = subtitle.textContent;
        
        setInterval(() => {
            if (Math.random() < 0.3) {
                const original = subtitle.dataset.original;
                const chars = "!<>-_\\/[]{}—=+*^?#________";
                
                subtitle.textContent = original
                    .split("")
                    .map(char => Math.random() < 0.5 ? chars[Math.floor(Math.random() * chars.length)] : char)
                    .join("");
                
                setTimeout(() => {
                    subtitle.textContent = original;
                }, 150);
            }
        }, 3000 + Math.random() * 4000);
    });
    
    // make words glitch randomly
    const glitchWords = document.querySelectorAll(".glitch-word");
    
    glitchWords.forEach(word => {
        word.dataset.original = word.textContent;
        
        setInterval(() => {
            if (Math.random() < 0.5) {
                const original = word.dataset.original;
                const chars = "!<>-_\\/[]{}—=+*^?#________";
                
                word.textContent = original
                    .split("")
                    .map(char => Math.random() < 0.6 ? chars[Math.floor(Math.random() * chars.length)] : char)
                    .join("");
                
                setTimeout(() => {
                    word.textContent = original;
                }, 120);
            }
        }, 2000 + Math.random() * 3000);
    });
});

function glitchTextContinuous(element) {
    const original = element.innerText;
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    let frameCount = 0;

    function doGlitch() {
        if (frameCount % 2 === 0) {
            element.innerText = original
                .split("")
                .map(char => Math.random() < 0.2 ? chars[Math.floor(Math.random() * chars.length)] : char)
                .join("");
        }
        if (Math.random() < 0.05) {
            element.innerText = original;
        }

        frameCount++;
        requestAnimationFrame(doGlitch);
    }

    doGlitch();
}
/* access terminal glitches */
function initAccessGlitches() {
    const codeHint = document.getElementById("code-hint");
    const classification = document.getElementById("classification");
    
    if (!codeHint || !classification) return;
    
    // glitch the access code hint
    const ACCESS_CODE = "glitch";
    const codeLetters = ACCESS_CODE.split("");
    
    setInterval(() => {
    if (Math.random() < 0.85) {
        let hint = "";
        for (let i = 0; i < codeLetters.length; i++) {
            if (Math.random() < 0.4) {
                hint += codeLetters[i];  // shows actual letter
            } else {
                hint += "_";  // shows underscore
            }
        }
        codeHint.textContent = hint;
    } else {
        codeHint.textContent = "";
    }
    }, 75);
    
    // glitch classification texts
    const classificationTexts = [
        "RESTRICTED",
        "BROKEN",
        "CORRUPTED",
        ""
    ];
    
    setInterval(() => {
        if (Math.random() < 0.8) {
            const original = classification.textContent;
            const randomText = classificationTexts[Math.floor(Math.random() * classificationTexts.length)];
            
            classification.textContent = randomText;
            
            // flash the red for coolness
            classification.style.color = "#ff0033";
            classification.style.textShadow = "0 0 10px #ff0033";
            
            // returning to normal after some milliseconds
            setTimeout(() => {
                classification.textContent = "RESTRICTED";
                classification.style.color = "";
                classification.style.textShadow = "";
            }, 150);
        }
    }, 200);
}

/* access terminal to get it working */
function initAccessLogic() {
    const ACCESS_CODE = "glitch"; 
    const input = document.getElementById("access-input");
    const error = document.getElementById("access-error");
    const accessScreen = document.getElementById("access-screen");
    const mainContent = document.getElementById("main-content");

    function authorize() {
        if (input.value === ACCESS_CODE) {
            accessScreen.style.display = "none";
            mainContent.style.display = "block";
            // start directory page glitches
            startMainGlitches();
        } else {
            error.textContent = "ACCESS DENIED";

            setTimeout(() => {
                error.textContent = "";
            }, 600);
        }
    }

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            authorize();
        }
    });
}

/* text glitches */
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

function warningGlitch(element) {
    const original = element.innerText;
    const chars = "!<>-_\\/[]{}—=+*^?#%$*@";

    function burst() {
        let duration = 220;

        let interval = setInterval(() => {
            let scale = (Math.random() * 2.5) + 0.3;
            element.style.transform = `scale(${scale})`;

            if (Math.random() < 0.8) { 
                element.innerText = "HELP HELP HELP HELP";
            } else {
                element.innerText = original
                    .split("")
                    .map(char =>
                        Math.random() < 0.15
                            ? chars[Math.floor(Math.random() * chars.length)]
                            : char
                    )
                    .join("");
            }
        }, 35);

        setTimeout(() => {
            clearInterval(interval);
            element.innerText = original;
            element.style.transform = "scale(1)";
        }, duration);
    }

    function loop() {
        burst();
        const next = Math.random() * 1800 + 700;
        setTimeout(loop, next);
    }

    loop();
}

/* to start the glitches when page opens */
function startMainGlitches() {
    const title = document.querySelector("h1.glitch");
    const warn = document.querySelector(".warning-glitch");
    const anomalous = document.querySelector(".heavy-glitch");
    const glitchFolders = document.querySelectorAll(".glitch-folder");
    const mildFolders = document.querySelectorAll(".glitch-folder");

    if (title) glitchTextContinuous(title);
    if (warn) warningGlitch(warn);
    
    // start anomalous archive glitch
    if (anomalous) glitchTextContinuous(anomalous);
    
    // start mild glitches for the other 3 folders
    if (mildFolders.length > 0) {
        mildFolders.forEach(folder => {
            mildGlitchText(folder); // NEW FUNCTION FOR MILD GLITCHING
        });
    }
}

/* for back to directory */
function checkHash() {
    if (window.location.hash === '#main') {
        document.getElementById('access-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        startMainGlitches();
    }
}

/* to start everything when page opens */
document.addEventListener("DOMContentLoaded", () => {
    initAccessGlitches();
    initAccessLogic();
    checkHash();
});

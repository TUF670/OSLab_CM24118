// --- Page Navigation Logic ---
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show the selected page
    document.getElementById(pageId).classList.add('active');
}

// --- Simulation Logic ---
const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
const logBox = document.getElementById('logBox');

const NUM_PHILOSOPHERS = 5;
const STATES = { THINKING: 0, HUNGRY: 1, EATING: 2 };
const COLORS = { THINKING: '#ffffff', HUNGRY: '#ffcc00', EATING: '#003366' };

let philosophers = [];
let forks = [true, true, true, true, true]; // true means available
let simInterval;
let isRunning = false;

// Setup geometry
const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radius = 120;

function initSimulation() {
    philosophers = [];
    for (let i = 0; i < NUM_PHILOSOPHERS; i++) {
        let angle = (i * 2 * Math.PI) / NUM_PHILOSOPHERS - Math.PI / 2;
        philosophers.push({
            id: i,
            state: STATES.THINKING,
            x: cx + radius * Math.cos(angle),
            y: cy + radius * Math.sin(angle),
            timeInState: 0
        });
    }
    forks = [true, true, true, true, true];
    draw();
}

function log(msg) {
    logBox.innerHTML = `<div>[Time: ${new Date().toLocaleTimeString()}] ${msg}</div>` + logBox.innerHTML;
}

function update() {
    philosophers.forEach((p, i) => {
        p.timeInState++;
        let leftFork = i;
        let rightFork = (i + 1) % NUM_PHILOSOPHERS;

        if (p.state === STATES.THINKING && Math.random() < 0.05) {
            p.state = STATES.HUNGRY;
            p.timeInState = 0;
            log(`Philosopher ${p.id + 1} is HUNGRY.`);
        } 
        else if (p.state === STATES.HUNGRY) {
            // Try to pick up forks
            if (forks[leftFork] && forks[rightFork]) {
                forks[leftFork] = false;
                forks[rightFork] = false;
                p.state = STATES.EATING;
                p.timeInState = 0;
                log(`Philosopher ${p.id + 1} is EATING (Got forks ${leftFork+1} & ${rightFork+1}).`);
            }
        } 
        else if (p.state === STATES.EATING && p.timeInState > 20) {
            // Done eating, put down forks
            forks[leftFork] = true;
            forks[rightFork] = true;
            p.state = STATES.THINKING;
            p.timeInState = 0;
            log(`Philosopher ${p.id + 1} finished eating and is THINKING.`);
        }
    });
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Table
    ctx.beginPath();
    ctx.arc(cx, cy, 90, 0, 2 * Math.PI);
    ctx.fillStyle = '#e6f0ff';
    ctx.fill();
    ctx.strokeStyle = '#003366';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw Forks
    for (let i = 0; i < NUM_PHILOSOPHERS; i++) {
        let angle = ((i + 0.5) * 2 * Math.PI) / NUM_PHILOSOPHERS - Math.PI / 2;
        let fx = cx + 60 * Math.cos(angle);
        let fy = cy + 60 * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(fx, fy, 8, 0, 2 * Math.PI);
        ctx.fillStyle = forks[i] ? '#28a745' : '#ccc'; // Green if available, grey if taken
        ctx.fill();
    }

    // Draw Philosophers
    philosophers.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 30, 0, 2 * Math.PI);
        ctx.fillStyle = p.state === STATES.THINKING ? COLORS.THINKING : 
                        p.state === STATES.HUNGRY ? COLORS.HUNGRY : COLORS.EATING;
        ctx.fill();
        ctx.strokeStyle = '#003366';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Label
        ctx.fillStyle = p.state === STATES.EATING ? '#fff' : '#000';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`P${p.id + 1}`, p.x, p.y);
    });
}

// Button Listeners
document.getElementById('startSimBtn').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        log("Simulation Started.");
        simInterval = setInterval(update, 200); // Update every 200ms
    }
});

document.getElementById('stopSimBtn').addEventListener('click', () => {
    isRunning = false;
    clearInterval(simInterval);
    log("Simulation Stopped.");
    initSimulation(); // Reset
});

// Initialize on load
initSimulation();
import confetti from "canvas-confetti";

export function ballonsUp(duration = 2000) {
    const end = Date.now() + duration;

    function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            startVelocity: 25,
            origin: { x: Math.random(), y: 0.7 },
            colors: ['#bb0000', '#ffffff'],
            gravity: 0.5,
        });
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }
    frame();
}
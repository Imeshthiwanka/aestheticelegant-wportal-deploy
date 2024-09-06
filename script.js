let alarmSound = document.getElementById("alarm-sound");

function startTimers() {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;
    
    const baseTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (baseTimeInSeconds <= 0) {
        alert("Please enter a valid time!");
        return;
    }

    document.getElementById("timers").innerHTML = ""; 
    let currentTimer = 0;

    // Move the input container to the left
    document.getElementById("input-container").style.transform = "translateX(-100%)";

    function createNextTimer() {
        if (currentTimer >= 5) return; 
        
        currentTimer++;
        const timeInSeconds = baseTimeInSeconds * currentTimer;
        const timerDiv = document.createElement("div");
        timerDiv.id = `timer${currentTimer}`;
        timerDiv.textContent = `Timer ${currentTimer}: ${formatTime(timeInSeconds)}`;
        timerDiv.classList.add("hidden");
        document.getElementById("timers").appendChild(timerDiv);

        setTimeout(() => {
            timerDiv.classList.remove("hidden");
        }, 100); 

        const targetTime = new Date().getTime() + timeInSeconds * 1000;

        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const distance = targetTime - currentTime;

            if (distance <= 0) {
                clearInterval(interval);
                document.getElementById(`timer${currentTimer}`).textContent = `Timer ${currentTimer} Finished!`;
                alarmSound.play();

                // Show alarm container with transition
                document.getElementById("alarm-container").classList.add("visible");

                setTimeout(() => {
                    document.getElementById("alarm-container").classList.remove("visible");
                    createNextTimer(); 
                }, 5000); // Display alarm for 5 seconds before proceeding to next timer
            } else {
                document.getElementById(`timer${currentTimer}`).textContent = `Timer ${currentTimer}: ${formatTime(distance / 1000)}`;
            }
        }, 1000);
    }

    createNextTimer(); 
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

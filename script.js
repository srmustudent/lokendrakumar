document.addEventListener('DOMContentLoaded', function() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const toggleFormatBtn = document.getElementById('toggleFormat');
    const toggleSecondsBtn = document.getElementById('toggleSeconds');
    const changeColorBtn = document.getElementById('changeColor');
    
    let is24HourFormat = true;
    let showSeconds = true;
    let colorIndex = 0;
    const colors = [
        { text: '#ffffff', shadow: 'rgba(255, 255, 255, 0.5)' },
        { text: '#ff6b6b', shadow: 'rgba(255, 107, 107, 0.5)' },
        { text: '#48dbfb', shadow: 'rgba(72, 219, 251, 0.5)' },
        { text: '#1dd1a1', shadow: 'rgba(29, 209, 161, 0.5)' },
        { text: '#feca57', shadow: 'rgba(254, 202, 87, 0.5)' },
        { text: '#5f27cd', shadow: 'rgba(95, 39, 205, 0.5)' }
    ];
    
    function updateClock() {
        const now = new Date();
        
        // Time
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        let timeString;
        
        if (is24HourFormat) {
            timeString = `${padZero(hours)}:${padZero(minutes)}`;
            if (showSeconds) {
                timeString += `:${padZero(seconds)}`;
            }
        } else {
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12
            timeString = `${padZero(hours)}:${padZero(minutes)} ${ampm}`;
            if (showSeconds) {
                timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${ampm}`;
            }
        }
        
        timeElement.textContent = timeString;
        
        // Date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString(undefined, options);
        
        // Update the color
        timeElement.style.color = colors[colorIndex].text;
        timeElement.style.textShadow = `0 0 10px ${colors[colorIndex].shadow}`;
    }
    
    function padZero(num) {
        return num < 10 ? `0${num}` : num;
    }
    
    // Update the clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);
    
    // Event listeners for buttons
    toggleFormatBtn.addEventListener('click', function() {
        is24HourFormat = !is24HourFormat;
        updateClock();
    });
    
    toggleSecondsBtn.addEventListener('click', function() {
        showSeconds = !showSeconds;
        updateClock();
    });
    
    changeColorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        updateClock();
    });
});
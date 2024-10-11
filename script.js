const dateTimeInput = document.querySelector(".container .date-time");
const currentTimeDisplay = document.querySelector(".container .current-time");
const startStopBtn = document.querySelector(".container .btn");

const audio = new Audio("Sound/beep_alarm.mp3");
audio.loop = true;

let alarmTime;
let alarmTimeout;
let intervalId;


let init = () => {
    const date = new Date();
    const offset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() - offset);

    const formattedDate = adjustedDate.toISOString().substring(0, 16);
    dateTimeInput.value = formattedDate;
    setAlarmTime();
}


let updateCurrentTime = () => {

    const date = new Date();

    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const dayNight = hour > 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;

    const paddedHour = formattedHour.toString().padStart(2, "0");
    const paddedMin = min.toString().padStart(2, "0");
    const paddedSec = sec.toString().padStart(2, "0");

    currentTimeDisplay.innerHTML = `${paddedHour}:${paddedMin}:${paddedSec} ${dayNight}`;
}


let setAlarmTime = () => {
    alarmTime = dateTimeInput.value;
}

let setAlarm = () => {
    const currentDateTime = new Date();
    const timeToAlarm = new Date(alarmTime);

    if (timeToAlarm > currentDateTime) {
        const timeout = timeToAlarm.getTime() - currentDateTime.getTime();


        dateTimeInput.classList.add("disabled");
        startStopBtn.classList.replace("start", "clear");
        startStopBtn.innerHTML = "Clear Alarm";

        alarmTimeout = setTimeout(() => {
            audio.play();

            intervalId = setInterval(() => {
                const currentMinute = new Date().getMinutes();
                const alarmMinute = timeToAlarm.getMinutes();
                if (currentMinute > alarmMinute) {
                    audio.pause();
                    clearInterval(intervalId);
                    clearTimeout(alarmTimeout);
                    dateTimeInput.classList.remove("disabled");
                    startStopBtn.classList.replace("clear", "start");
                    startStopBtn.innerHTML = "Start Alarm";
                }
            }, 1000);

        }, timeout);
    }
    else {
        alert("Lütfen geçerli bir tarih ve saat seçin!");
    }
}

let clearAlarm = () => {
    audio.pause();
    clearInterval(intervalId);
    clearTimeout(alarmTimeout);
    dateTimeInput.classList.remove("disabled");
    startStopBtn.classList.replace("clear", "start");
    startStopBtn.innerHTML = "Start Alarm";
}


startStopBtn.addEventListener("click", () => {
    if (startStopBtn.classList.contains("start")) {
        setAlarm();
    }
    else {
        clearAlarm();
    }
})


window.addEventListener("load", init);
setInterval(updateCurrentTime, 1000);
dateTimeInput.addEventListener("change", setAlarmTime);
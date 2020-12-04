const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0, 0, 0, 0];
var interval;
var time_running = "false";
var ran = ["Stimulate your mind as you test your typing speed", "Watch your typing speed and accuracy increase as you learn", "Over 40 typing test selections available."]
var speed_array;
var final_time;

function random() {
    originText.innerHTML = ran[Math.floor(Math.random() * 3)];
}



function helper(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}
function runtimer() {

    let ct = helper(timer[0]) + ":" + helper(timer[1]) + ":" + helper(timer[2]);
    console.log(ct);
    theTimer.innerHTML = ct;
    timer[3]++;
    timer[0] = Math.floor(timer[3] / 100 / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor((timer[3]) - (timer[1] * 100) - (timer[0] * 6000));

}

function reset() {
    console.log("reset");
    clearInterval(interval);
    interval = null;
    time = [0, 0, 0, 0];
    time_running = "false";

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "gray";
    random();
    document.querySelector(".main .intro p").innerHTML = "This is a typing test. Your goal is to duplicate the provided text, EXACTLY, in the field below. The timer starts when you start typing, and only stops when you match this text exactly. Good Luck!"

}

function spell() {
    let text_entered = testArea.value;
    console.log(text_entered);

    let originTextMatch = originText.innerHTML.substring(0, text_entered.length);

    if (text_entered == originText.innerHTML) {
        testWrapper.style.borderColor = "green";
        clearInterval(interval);

        speed_array = testArea.value.split(" ");
        console.log(speed_array);

        console.log(speed_array.length);
        console.log((timer[0] * 60) + (timer[1]) + (timer[2] / 100));

        final_time = (timer[0] * 60) + (timer[1]) + (timer[2] / 100);
        console.log(final_time);


        document.querySelector(".main .intro p").innerHTML = "Your typing speed is: " + parseInt((speed_array.length / final_time) * 60) + " words per minutes";
    }

    else {
        if (originTextMatch == text_entered) {

            testWrapper.style.borderColor = "blue";
        }

        else {
            testWrapper.style.borderColor = "red";
        }
    }
}

function start() {
    let text_entered_length = testArea.value.length;
    console.log(text_entered_length);
    if (text_entered_length == 0 && time_running == "false") {

        interval = setInterval(runtimer, 10);
        time_running = "true";
    }
}

testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spell, false);
resetButton.addEventListener("click", reset, false);
// theTimer.addEventListener("click",timer,false);
function runMyClock() {
    var now = new Date();

    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    // handling 0 padding
    if (h < 10) {
        h = "0" + h;
    }

    if (m < 10) {
        m = "0" + m;
    }

    if (s < 10) {
        s = "0" + s;
    }

    // display
    document.getElementById("hours").innerHTML = h;
    document.getElementById("minutes").innerHTML = m;
    document.getElementById("seconds").innerHTML = s;


    var d = now.toDateString();
    document.getElementById("fullDate").innerHTML = d;
}

setInterval(runMyClock, 1000);

runMyClock();

/*global document, window, Audio */


function main() {
    "use strict";

    var level = 0,
        count = level,
        sequenceArr = [],
        playsArr = [],
        canClick = false,
        speed = 1200;

    var lightObj = {
            1: "r",
            2: "g",
            3: "b",
            4: "y"
        },
        colorsArr = ["#F44336", "#00E676", "#304FFE", "#FFEB3B"],
        soundsArr = [],
        lights = document.getElementsByClassName('light'),
        countDisplayContainer = document.getElementById('seq-count'),
        levelDisplayContainer = document.getElementById('level'),
        countDisplay = document.getElementById('count-disp'),
        levelDisplay = document.getElementById('level-disp'),

        playInterval,
        strict = false,
        mute = false,
        threeD = true;

    for (var i = 0; i < 4; i++) {
        soundsArr.push(new Audio('audio/' + (i + 1) + '.mp3'));
    }

    //mute button
    document.getElementById("mute").addEventListener('click', function () {

        if (document.getElementById('muted').classList.contains("fa-ban")) {
            document.getElementById('muted').classList.remove("fa-ban");
        } else {
            document.getElementById('muted').classList.add("fa-ban");

        }

        if (!mute) {
            for (i = 0; i < 4; i++) {
                soundsArr[i].muted = true;
            }
            mute = true;
        } else if (mute) {
            for (i = 0; i < 4; i++) {
                soundsArr[i].muted = false;
            }
            mute = false;
        }
    });

    //view button
    document.getElementById('view').addEventListener('click', function () {

        if (threeD) {
            document.getElementsByClassName('container')[0].style.transform = "rotateX(0deg) rotateZ(0deg) rotate(-90deg)";
            countDisplayContainer.style.transform = "rotate(90deg) translateY(-80px)";
            levelDisplayContainer.style.transform = "rotate(90deg)";
            threeD = false;

        } else {
            document.getElementsByClassName('container')[0].style.transform = "rotate(0deg) rotateX(60deg) rotateZ(-45deg)";
            countDisplayContainer.style.transform = "rotate(0deg)";
            levelDisplayContainer.style.transform = "rotate(0deg) translateX(-80px)";
            threeD = true;
        }

    });



    function play() {

        level = 0;
        count = level;
        sequenceArr = [];
        playsArr = [];
        canClick = false;
        speed = 1200;

        function setSequence() {
            for (i = 0; i < 20; i++) {
                sequenceArr[i] = Math.floor((Math.random() * 4) + 1);
            }
        }
        setSequence();
        console.log(sequenceArr);

        //player input
        function lightClicked(clickedLight) {

            if (canClick) {

                //canClick = false;

                //styles for clicked light
                clickedLight.classList.add('js-lighted');

                if (clickedLight.classList.contains('r')) {
                    //clickedLight.style.backgroundColor = colorsArr[0];
                    soundsArr[0].load();

                    soundsArr[0].play();
                }

                if (clickedLight.classList.contains('g')) {
                    //clickedLight.style.backgroundColor = colorsArr[1];
                    soundsArr[1].load();

                    soundsArr[1].play();

                }

                if (clickedLight.classList.contains('b')) {
                    //clickedLight.style.backgroundColor = colorsArr[2];
                    soundsArr[2].load();

                    soundsArr[2].play();

                }

                if (clickedLight.classList.contains('y')) {
                    //clickedLight.style.backgroundColor = colorsArr[3];
                    soundsArr[3].load();

                    soundsArr[3].play();

                }

                //add player click to array
                playsArr.push(Number(clickedLight.getAttribute('data-number')));

                window.setTimeout(function () {

                    clickedLight.classList.remove('js-lighted');
                    //clickedLight.style.backgroundColor = "#455A64";

                }, speed / 3);

                //check player click
                if (playsArr[playsArr.length - 1] !== sequenceArr[playsArr.length - 1] && !strict) {

                    canClick = false;
                    level -= (level !== 0 ? 1 : 0);
                    playsArr = [];

                    countDisplay.style.color = "#FF5722";
                    levelDisplay.style.color = "#FF5722";
                    countDisplay.innerText = "XX";
                    levelDisplay.innerText = "XX";

                    window.setTimeout(function () {

                        //clickedLight.classList.remove('js-lighted');
                        //clickedLight.style.backgroundColor = "#455A64";
                        playInterval = window.setInterval(fireLight, speed);

                    }, 500);

                } else if (playsArr[playsArr.length - 1] !== sequenceArr[playsArr.length - 1] && strict) {


                    countDisplay.style.color = "#FF5722";
                    levelDisplay.style.color = "#FF5722";
                    countDisplay.innerText = "XX";
                    levelDisplay.innerText = "XX";
                    level = 0;
                    count = level;
                    sequenceArr = [];
                    setSequence();
                    playsArr = [];
                    canClick = false;
                    speed = 1200;

                    window.setTimeout(function () {
                        clickedLight.classList.remove('js-lighted');
                        //clickedLight.style.backgroundColor = "#455A64";

                        playInterval = window.setInterval(fireLight, speed);

                    }, 500);

                } else if (playsArr.length - 1 === level) {

                    //win condition
                    if (level === 19) {
                        canClick = false;
                        var c = 0;
                        window.clearInterval(playInterval);
                        playInterval = window.setInterval(function () {
                            for (i = 0; i < lights.length; i++) {
                                lights[i].classList.remove('js-lighted');
                                lights[i].style.opacity = "0.4";
                                lights[i].style.boxShadow = "-2px 2px 10px 0 rgba(34, 34, 34, 0.6)";
                                lights[i].style.transform = "rotate(90deg) translateZ(0)";
                                //lights[i].style.backgroundColor = "#455A64";
                                lights[i].innerText = "YOU WIN!!";

                            }
                            var num = Math.floor((Math.random() * 4));
                            lights[c].classList.add('js-lighted');
                            lights[c].style.backgroundColor = colorsArr[num];
                            soundsArr[num].play();
                            //lights[c].style.transform = "translateZ(" + Math.floor((Math.random() * 100) + 1) + "px) !important";
                            c++;
                            if (c > 3) {
                                c = 0;
                            }
                        }, 150);

                    } else {
                        countDisplay.style.color = "#00C853";
                        levelDisplay.style.color = "#00C853";
                        countDisplay.innerText = "✔✔";
                        levelDisplay.innerText = "✔✔";

                        level++;
                        canClick = false;
                        playsArr = [];
                        speed *= 0.92;
                        window.setTimeout(function () {

                            clickedLight.classList.remove('js-lighted');
                            //clickedLight.style.backgroundColor = "#455A64";
                            playInterval = window.setInterval(fireLight, speed);
                        }, 500);
                    }
                }


            }

        }


        //mouse up and leave handlers
        for (var i = 0; i < lights.length; i++) {

            lights[i].onmousedown = function () {

                lightClicked(this);
            };


            lights[i].onmouseup = function () {

                if (canClick) {

                    //this.classList.remove('js-lighted');
                    //this.style.backgroundColor = "#455A64";

                }
            };



            lights[i].onmouseleave = function () {

                if (canClick) {

                    this.classList.remove('js-lighted');
                    //this.style.backgroundColor = "#455A64";
                }
            };

        }

        //run light sequence
        function fireLight() {

            countDisplay.style.color = "#fff";
            levelDisplay.style.color = "#fff";
            countDisplay.innerText = count + 1;
            levelDisplay.innerText = level;

            var light = document.getElementsByClassName('' + lightObj[sequenceArr[count]])[0];

            light.classList.add('js-lighted');

            if (light.classList.contains('r')) {
                //light.style.backgroundColor = colorsArr[0];
                soundsArr[0].load();
                soundsArr[0].play();

            }

            if (light.classList.contains('g')) {
                //light.style.backgroundColor = colorsArr[1];
                soundsArr[1].load();
                soundsArr[1].play();

            }

            if (light.classList.contains('b')) {
                //light.style.backgroundColor = colorsArr[2];
                soundsArr[2].load();
                soundsArr[2].play();

            }

            if (light.classList.contains('y')) {
                //light.style.backgroundColor = colorsArr[3];
                soundsArr[3].load();
                soundsArr[3].play();

            }

            window.setTimeout(function () {
                light.classList.remove('js-lighted');
                //light.style.backgroundColor = "#455A64";
            }, speed / 2);

            count++;

            if (count == level + 1) {
                window.clearInterval(playInterval);
                count = 0;
                canClick = true;
            }
        } //--end fireLight/sequence function

        //run level 0/first sequence
        playInterval = window.setInterval(fireLight, speed);

    } //--end play function


    //start switch listener
    document.getElementById('start').addEventListener('click', function () {
        if (this.classList.contains('js-switched')) {

            for (var i = 0; i < lights.length; i++) {
                lights[i].classList.remove('js-lighted');
                lights[i].style.opacity = "0.4";
                lights[i].style.boxShadow = "-2px 2px 10px 0 rgba(34, 34, 34, 0.6)";
                lights[i].style.transform = "rotate(90deg)";
                //lights[i].style.backgroundColor = "#455A64";
                lights[i].innerText = "";


                lights[i].onmousedown = null;


                lights[i].onmouseup = null;


                lights[i].onmouseleave = null;



            }

            this.classList.remove('js-switched');
            document.getElementById('start-stop-label').innerText = "START";
            window.clearInterval(playInterval);
            countDisplay.innerText = "--";
            levelDisplay.innerText = "--";





        } else {
            this.classList.add('js-switched');
            document.getElementById('start-stop-label').innerText = "STOP/RESET";
            play();
        }
    });

    //strict switch listener
    document.getElementById('strict').addEventListener('click', function () {
        if (this.classList.contains('js-switched')) {
            this.classList.remove('js-switched');
            strict = false;


        } else {
            this.classList.add('js-switched');
            strict = true;
        }
    });

}

document.addEventListener('DOMContentLoaded', function () {

    main();

});

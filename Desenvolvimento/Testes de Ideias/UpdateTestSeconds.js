/**
 * Created by Luis David on 15/03/2017.
 */
"use strict";

let canvas;
let ctx;
let ch;
let cw;
let x = 0;
let y = 0;
let p;
let p2;
let frameCount = 0;
let prevFrameCount = 0;
let time;
let deltatime = 1/60;
let currenttime = 0;
let startsec;
let curFrames = 0;
let elapsed = 0;

(function () {
    window.addEventListener("load", start);
}());

function start() {
    canvas = document.getElementById("myCanvas");
    p = document.getElementById("myP");
    p2 = document.getElementById("myP2");
    cw = canvas.width;
    ch = canvas.height;
    ctx = canvas.getContext("2d");
    time = new Date().getTime();
    startsec = performance.now();
    window.webkitRequestAnimationFrame(update);
    setInterval(averageFrames,1000);
}

function update() {
    currenttime = performance.now();
    p.innerHTML = new Date() + "<br>" + frameCount;
    ctx.clearRect(0,0,cw,ch);
    drawRect(x,y);
    x+=10*deltatime;
    y+=10*deltatime;

    curFrames++;
    if(x>cw && y>ch){
        p.innerHTML = performance.now() - startsec;
        p.innerHTML = new Date().getTime() - time;
        //deltatime = performance.now() - currenttime;
        //setTimeout(update,0);
    }
    else{
        frameCount++;
        window.webkitRequestAnimationFrame(update);
    }
}

function drawRect(x,y) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x,y,25,25);
}

function averageFrames(){
    p2.innerHTML = frameCount-prevFrameCount + "\t" + x;
    prevFrameCount = frameCount;
}
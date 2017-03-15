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
    setTimeout(update,0);
    setInterval(averageFrames,1000);
}

function update() {
    p.innerHTML = new Date() + "<br>" + frameCount;
    ctx.clearRect(0,0,cw,ch);
    drawRect(x,y);
    x+=2;
    y+=2;
    frameCount++;
    if(x>cw && y>ch){
        p.innerHTML = new Date().getTime()-time;
    }
    else{

        setTimeout(update,0);
    }
}

function drawRect(x,y) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x,y,25,25);
}

function averageFrames(){
    p2.innerHTML = frameCount-prevFrameCount;
    prevFrameCount = frameCount;
}
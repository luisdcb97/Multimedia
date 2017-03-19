/**
 * Created by Luis David on 19/03/2017.
 */
"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    document.cookie = "idade=21 path=/";
    let strings = document.cookie.split(" ");

    console.info(strings[0].split("=")[0] + ":" + strings[0].split("=")[1]);
    console.log(strings);
    console.log(new Date());
    console.log(new Date(0));
}

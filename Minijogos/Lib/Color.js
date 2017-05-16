"use strict";

/**
 * Container for color related functions and an instance of a color
 * @class Color
 */
function Color(){
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.red = 0;
    this.green = 0;
    this.blue = 0;

    this.h = 0;
    this.s = 0;
    this.v = 1;
    this.hue = 0;
    this.saturation = 0;
    this.value = 1;

    this.a = 1;
    this.alpha = 1;
}

Color.fromHSV = function (h, s, v) {
    let color = new Color();

    color.h = color.hue = h;
    color.s = color.saturation = s;
    color.v = color.value = v;

    let obj = Color.HSVtoRGB(h,s,v);
    color.r = color.red = obj.r;
    color.g = color.green = obj.g;
    color.b = color.blu = obj.b;
    return color
};

Color.fromRGB = function (r, g, b) {
    let color = new Color();
    color.r = color.red = r;
    color.g = color.green = g;
    color.b = color.blu = b;

    let obj = Color.RGBtoHSV(r,g,b);
    color.h = color.hue = obj.h;
    color.s = color.saturation = obj.s;
    color.v = color.value = obj.v;
    return color
};

/**
 *
 *
 * @param {Number} [r=0] - Red component of RGB color
 * @param {Number} [g=0] - Green component of RGB color
 * @param {Number} [b=0] - Blue component of RGB color
 * @param {Number} [h=0] - Hue of HSV color
 * @param {Number} [s=0] - Saturation of HSV color
 * @param {Number} [v=1] - Value of HSV color
 * @return
 */
Color.getComplementarColor = function (r, g, b, h, s, v) {
    let hsvColor;
    let useRGB = false;
    if(h === undefined || s === undefined || v === undefined
    || h > 360 || s > 1 || v > 1 || h < 0 || s < 0 || v < 0 ){
        let _tempR = r || 0;
        let _tempG = g || 0;
        let _tempB = b || 0;
        hsvColor = Color.RGBtoHSV(_tempR, _tempG, _tempB);
        useRGB = true;
    }
    else{
        hsvColor = {h:h, s:s, v:v};
    }

    hsvColor.h = Color.hueShift(hsvColor.h, 0);
    if(useRGB){
        hsvColor = Color.HSVtoRGB(hsvColor.h, hsvColor.s, hsvColor.v);
    }
    return hsvColor;
};

Color.hexStringToRGB = function (string) {
    let _tempR = string.slice(1, 3);
    let _tempG = string.slice(3, 5);
    let _tempB = string.slice(5, 7);

    let obj = {};

    obj.r = parseInt(_tempR, 16);
    obj.g = parseInt(_tempG, 16);
    obj.b = parseInt(_tempB, 16);

    return obj;
};

Color.hexToRGB = function (hex) {
    let _tempR = (hex >> 16) & 0x0000ff;
    let _tempG = (hex >> 8) & 0x0000ff;
    let _tempB = hex & 0x0000ff;

    let obj = {};

    obj.r = _tempR;
    obj.g = _tempG;
    obj.b = _tempB;

    return obj;
};

/**
 * Converts an HSV (hue, saturation and value) color value to RGB.
 * Assumes S and V in the set [0, 1] and H in the set [0, 360].
 * Assumes RGB values are contained in the set [0, 255].
 *
 * @param {Number} hue - The hue , in the range 0 - 360.
 * @param {Number} saturation - The saturation, in the range 0 - 1.
 * @param {Number} value - The value, in the range 0 - 1.
 * @return {object} An object with the red, green and blue set in the r, g and b properties.
 *
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV
 */
Color.HSVtoRGB = function (hue, saturation, value) {
    let obj = {};
    let chroma = value * saturation;

    let _tempHue = hue / 60;

    let secondLargest = chroma * (1 - Math.abs(_tempHue % 2 - 1));

    let _tempRed, _tempGreen, _tempBlue;
    if (_tempHue >= 0 && _tempHue < 1) {
        _tempRed = chroma;
        _tempGreen = secondLargest;
        _tempBlue = 0;
    }
    else if (_tempHue < 2) {
        _tempRed = secondLargest;
        _tempGreen = chroma;
        _tempBlue = 0;
    }
    else if (_tempHue < 3) {
        _tempRed = 0;
        _tempGreen = chroma;
        _tempBlue = secondLargest;
    }
    else if (_tempHue < 4) {
        _tempRed = 0;
        _tempGreen = secondLargest;
        _tempBlue = chroma;
    }
    else if (_tempHue < 5) {
        _tempRed = secondLargest;
        _tempGreen = 0;
        _tempBlue = chroma;
    }
    else if (_tempHue < 6) {
        _tempRed = chroma;
        _tempGreen = 0;
        _tempBlue = secondLargest;
    }

    /*
     At the time of creation of this there is an error in the Wikipedia article, since it calculates the RGB values
     to be between 0 and 1.
     */
    let amount = value - chroma;
    obj.r = Math.floor((_tempRed + amount) * 255);
    obj.g = Math.floor((_tempGreen + amount) * 255);
    obj.b = Math.floor((_tempBlue + amount) * 255);

    return obj;
};


/**
 *
 * @param {Number} initial - Initial hue between [0, 2PI[, or [0, 360[ if useDeg is set to true
 * @param {Number} angle - Angle with which to shift the hue in radians, or degrees if useDeg is set to true
 * @param {Boolean} [useDeg=true] - Should the shift consider angles in degrees instead of radians
 * @return {Number} The shifted hue
 */
Color.hueShift = function (initial, angle, useDeg = true) {
    let circleConstant = Math.PI * 2;
    if (useDeg === true) {
        circleConstant = 360;
    }

    return (initial + angle) % circleConstant;
};

/**
 * Converts an RGB color value to HSV (hue, saturation and value).
 * Assumes RGB values are contained in the set [0, 255].
 * Returns S and V in the set [0, 1] and H in the set [0, 360].
 *
 * @param {Number} red - The red color component, in the range 0 - 255.
 * @param {Number} green - The green color component, in the range 0 - 255.
 * @param {Number} blue - The blue color component, in the range 0 - 255.
 * @return {object} An object with the hue, saturation and value set in the h, s and v properties.
 *
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
 */
Color.RGBtoHSV = function (red, green, blue) {
    let obj = {};
    let _tempRed = red / 255;
    let _tempGreen = green / 255;
    let _tempBlue = blue / 255;

    let max = Math.max(_tempRed, _tempGreen, _tempBlue);
    let min = Math.min(_tempRed, _tempGreen, _tempBlue);
    let chroma = max - min;

    // chroma = 0 represents equal values of all colors, i.e, a shade of gray/white/black
    if (chroma === 0) {
        obj.h = 0;
    }
    else {
        switch (max) {
            case _tempRed:
                obj.h = 60 * (((_tempGreen - _tempBlue) / chroma) % 6);
                break;
            case _tempGreen:
                obj.h = 60 * ((_tempBlue - _tempRed) / chroma + 2);
                break;
            case _tempBlue:
                obj.h = 60 * ((_tempRed - _tempGreen) / chroma + 4);
                break;
        }
    }

    if (max === 0) {
        obj.s = 0;
    }
    else {
        obj.s = chroma / max;
    }

    obj.v = max;

    return obj;
};

 /*
    This is a simple 8bit painter made with P5.js
    Copyright (C) 2017 Scott Winkelmann

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

//THIS FILE IS A COMPLETE WORK IN PROGRESS

const cols = 16;
const rows = 16;
const maxColor = cols;
const scale = 20;

let palette;

let hColor;
let sColor;
let vColor;


function setup()
{
    createCanvas(cols*scale,rows*scale)
    background(0);

    palette = new Array();

    //three axis : hue, saturation, value
    //hue is horizontal, saturation is vertical till half height, value the second half

    noStroke();
    colorMode(HSB, maxColor);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            hColor = x;

            if(y >= rows/2)
            {
                sColor = maxColor;
                vColor = map(y,0,maxColor,rows,0);
            }
            else
            {
                sColor = map(y,0,maxColor,maxColor,-maxColor);
                vColor = maxColor;
            }

            let c = color(hColor,sColor,vColor);
            palette.push([int(red(c)),int(green(c)),int(blue(c))]);
            fill(c);
            rect(x*scale,y*scale,scale,scale);
        }
    }

    console.log(JSON.stringify(palette));

}

function draw()
{

}
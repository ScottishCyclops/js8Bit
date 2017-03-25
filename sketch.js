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

const cols = 16;
const rows = 16;
//the scale to which the pixels are drawn (1px is "scale" px in the browser)
const scale = 30;
const undoSteps = 12;
const paletteSize = 256;

let pressing;
let palette;
let drawing;

//HTML inputs
let fileInput;
let saveButton;

function setup()
{
    //canvas
    createCanvas(cols*scale*2,rows*scale);
    frameRate(120);

    //objects and var initialization
    palette = new Palette(paletteSize);
    palette.setColor(1,[255,255,255]);
    drawing = new Drawing(palette,cols,rows,scale,undoSteps);
    cursor = new Cursor(drawing);
    pressing = false;

    //drawing importing
    fileInput = document.getElementById('fileInput');
    fileInput.onchange = function()
    {
        let reader = new FileReader();
        reader.onloadend = function()
        {
            drawing.importJson(this.result);
            fileInput.value = "";
        };
        reader.readAsText(fileInput.files[0]);
    };

    //drawing exporting
    saveButton = document.getElementById('saveButton');
    saveButton.onclick = function () {
        drawing.exportJson();
    };
}

function draw()
{
    background(200);

    if(pressing)
    {
        if(!cursor.picker)
        {
            //drawing
            drawing.drawPixel(localMouseX(),localMouseY());
        }
        else
        {
            //picking colors
            drawing.paintingColor = drawing.pixels[localMouseX()+localMouseY()*cols];
        }
    }

    drawing.showPixels();
    palette.showColors();
    cursor.draw();
}

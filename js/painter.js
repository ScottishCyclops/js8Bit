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

//optimized for 16x16
const cols = 16;
const rows = 16;
//the scale to which the pixels are drawn (1px is "scale" px in the browser)
const scale = 30;
const undoSteps = 12;
const paletteSize = 256;

let pressing;
let palette;
let drawing;
let paletteMode;
//let oldMode;

//HTML inputs
let importJson;
let exportJson;
let exportBitmap;
let paletteViewer;
let paletteEditor;

function setup()
{
    //canvas
    createCanvas(cols*scale,rows*scale);
    frameRate(120);

    //objects and var initialization
    palette = new Palette(paletteSize);
    palette.setColor(1,[255,255,255]);
    drawing = new Drawing(palette,cols,rows,scale,undoSteps);
    cursor = new Cursor(drawing);

    pressing = false;
    paletteMode = false;
    //oldMode = 0;

    //drawing importing
    importJson = document.getElementById('importJson');
    importJson.onchange = function()
    {
        let reader = new FileReader();
        reader.onloadend = function()
        {
            drawing.importJson(this.result);
            importJson.value = "";
        };
        reader.readAsText(importJson.files[0]);
    };

    //drawing exporting as json
    exportJson = document.getElementById('exportJson');
    exportJson.onclick = function () {
        drawing.exportJson();
    };

    //drawing exporting as bitmap
    exportBitmap = document.getElementById('exportBitmap');
    exportBitmap.onclick = function () {
        saveCanvas("drawing","bmp");
    };

    //palette mode
    paletteViewer = document.getElementById('paletteViewer');
    paletteViewer.onclick = function()
    {
        paletteMode ? paletteMode = false : paletteMode = true;

        if(paletteMode)
            cursor.mode = cursorMode.PALETTE;
        else
            cursor.mode = cursorMode.DRAWING;
    }

    //palette editor (complicated because we may want to do more stuff)
    paletteEditor = document.getElementById('paletteEditor');
    paletteEditor.onclick = function()
    {
        open('editor.html','_self');
    }
    
    //confirm leaving
    window.onbeforeunload = function(e) 
    {
        return "Discard changes?";
    };
}

function draw()
{
    background(200);

    if(pressing)
    {
        switch(cursor.mode)
        {
            case cursorMode.DRAWING:
                if(!(mouseY < 0 || mouseX < 0 || mouseY > height || mouseX > width))
                    drawing.drawPixel(localMouseX(),localMouseY());
                break;
            case cursorMode.PICKING:
                if(!(mouseY < 0 || mouseX < 0 || mouseY > height || mouseX > width))
                    drawing.paintingColor = drawing.pixels[localMouseX()+localMouseY()*cols];
                break;
            case cursorMode.PALETTE:
                console.log("paletteMode");
                break;
        }
    }

    if(cursor.mode == cursorMode.PALETTE)
        palette.showColors();
    else
        drawing.showPixels();
    cursor.draw();
}

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

//constantes
const cols = 16; //optimized for 16x16
const rows = 16;
const scale = 30; //the scale to which the pixels are drawn (1px is "scale" px in the browser)
const undoSteps = 12;
const paletteSize = 256;


//booleans
let pressing;
let paletteMode;

//objects
let palette;
let drawing;
let customCursor;

//HTML inputs elements
let importJson;
let exportJson;
let exportBitmap;
let paletteViewer;
let paletteEditor;

function setup()
{
    //p5 canvas creation
    createCanvas(cols*scale,rows*scale);

    //objects initialization
    palette      = new Palette(paletteSize);    
    drawing      = new Drawing(palette,cols,rows,scale,undoSteps);
    customCursor = new CustomCursor(drawing);

    //vars initialization
    pressing = false;
    paletteMode = false;

    //drawing importing
    importJson = document.getElementById('importJson');
    importJson.onchange = function()
    {
        let reader = new FileReader();
        reader.onloadend = function()
        {
            //we import as json the text result from the reader
            drawing.importJson(this.result);
            //we reset the value to nothing
            importJson.value = "";
        };
        //we don't care about more than one file, so we take the first one
        reader.readAsText(importJson.files[0]);
    };

    //drawing exporting as json
    exportJson = document.getElementById('exportJson');
    exportJson.onclick = function ()
    {
        drawing.exportJson();
    };

    //drawing exporting as bitmap
    exportBitmap = document.getElementById('exportBitmap');
    exportBitmap.onclick = function ()
    {
        //we hide the cursor so it isn't drawn on thse canvas
        customCursor.hide();
        //we redraw the canvas without the cursor
        redraw();
        //we save the canvas as a drawing.bmp
        saveCanvas("drawing","bmp");
        //we show the cursor again
        customCursor.reveal();
    };

    //palette viewing mode
    paletteViewer = document.getElementById('paletteViewer');
    paletteViewer.onclick = function()
    {
        paletteMode ? paletteMode = false : paletteMode = true;
        paletteMode ? customCursor.mode = cursorMode.PALETTE : customCursor.mode = cursorMode.DRAWING;
    };

    //palette editor (complicated because we may want to do more stuff)
    paletteEditor = document.getElementById('paletteEditor');
    paletteEditor.onclick = function()
    {
        open('editor.html','_self');
    };
    
    //confirm leaving
    window.onbeforeunload = function(e) 
    {
        return "Discard changes?";
    };
    

    //default palette
    palette.importJson('palettes/default.json');
}

function draw()
{
    //TODO: remove background
    background(200);

    if(pressing)
    {
        switch(customCursor.mode)
        {
            case cursorMode.DRAWING:
                if(isMouseInCanvas()) drawing.drawPixel(localMouseX(),localMouseY());
                break;
            case cursorMode.PICKING:
                if(isMouseInCanvas()) drawing.paintingColor = drawing.pixels[localMouseX()+localMouseY()*cols];
                break;
            case cursorMode.PALETTE:
                console.log("paletteMode");
                break;
        }
    }

    if(customCursor.mode == cursorMode.PALETTE)
    {
        palette.showColors();
    }
    else
    {
        //TODO: optimize -> don't redraw everything everytime. only draw newly changed pixels
        drawing.showPixels();
    }

    //the cursor is drawn on top of everything
    customCursor.draw();
}

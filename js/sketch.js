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
let cols = 16; 
let rows = 16;
//the scale to which the pixels are drawn (1px is "scale" px in the browser)
let scale = 30;
const undoSteps = 12;
const paletteSize = 256;


//booleans
let pressing;

//objects
let palette;
let drawing;
let brush;

//HTML inputs elements
let domImportJson;
let domExportJson;
let domExportBitmap;
let domPaletteViewer;
let domPaletteEditor;


function setupDom()
{
    //drawing importing
    domImportJson = document.getElementById("importJson");
    domImportJson.onchange = function()
    {
        let reader = new FileReader();
        reader.onloadend = function()
        {
            //we import as json the text result from the reader
            drawing.importJson(this.result);
            //we reset the value to nothing
            domImportJson.value = "";
        };
        //we don't care about more than one file, so we take the first one
        reader.readAsText(domImportJson.files[0]);
    };

    //drawing exporting as json
    domExportJson = document.getElementById("exportJson");
    domExportJson.onclick = () =>
    {
        drawing.exportJson();
    };

    //drawing exporting as bitmap
    domExportBitmap = document.getElementById("exportBitmap");
    domExportBitmap.onclick = () =>
    {
        //we hide the cursor so it isn't drawn on thse canvas
        brush.hide();
        //we redraw the canvas without the cursor
        redraw();
        //we save the canvas as a drawing.bmp
        saveCanvas("drawing","bmp");
        //we show the cursor again
        brush.reveal();
    };

    //palette viewing mode
    domPaletteViewer = document.getElementById("paletteViewer");
    domPaletteViewer.onclick = () =>
    {
        brush.mode === cursorMode.DRAWING ? brush.mode = cursorMode.PALETTE : brush.mode = cursorMode.DRAWING;
    };

    //palette editor (complicated because we may want to do more stuff)
    domPaletteEditor = document.getElementById("paletteEditor");
    domPaletteEditor.onclick = () =>
    {
        open("editor.html","_self");
    };
    
    //confirm leaving
    window.onbeforeunload = function(e) 
    {
        return "Discard changes?";
    };
}


function setup()
{
    //p5 canvas creation
    createCanvas(cols * scale, rows * scale);

    //objects initialization
    palette = new Palette(paletteSize);    
    drawing = new Drawing(palette, undoSteps);
    brush = new Brush(drawing);

    //vars initialization
    pressing = false;

    //everything related to HTML elements
    setupDom();
    
    //default palette
    palette.importJson("palettes/default.json");
}


function draw()
{
    //TODO: remove background
    background(200);

    if(pressing)
    {
        switch(brush.mode)
        {
            case cursorMode.DRAWING:
                if(isMouseInCanvas())
                {
                    drawing.drawPixel(localMouseX(), localMouseY());
                }
                break;
            case cursorMode.PICKING:
                if(isMouseInCanvas())
                {
                    drawing.paintingColor = drawing.getPixel(localMouseX(), localMouseY());
                }
                break;
            case cursorMode.PALETTE:
                //TODO: do something with this mode
                console.log("paletteMode");
                break;
        }
    }

    if(brush.mode == cursorMode.PALETTE)
    {
        palette.showColors();
    }
    else
    {
        //TODO: don't redraw everything everytime. only draw newly changed pixels
        drawing.showPixels();
    }

    //the cursor is drawn on top of everything
    brush.draw();
}


function mousePressed()
{
    pressing = true;
    drawing.pushUndo();
}


function mouseReleased()
{
    pressing = false;
    //putting the last modifications in the undo stack
    drawing.pushUndo();
    drawing.undoPosition = 0;

    //if we were picking, we now go back to drawing
    if(brush.mode == cursorMode.PICKING)
    {
        brush.mode = cursorMode.DRAWING;
    }
}


function keyPressed()
{
    //quick access colors
    if(keyIsDown(KEY_ZERO))
    {
        drawing.setPaintingColor(0);
    }
    if(keyIsDown(KEY_ONE))
    {
        drawing.setPaintingColor(1);
    }
    if(keyIsDown(KEY_TWO))
    {
        drawing.setPaintingColor(2);
    }
    if(keyIsDown(KEY_THREE))
    {
        drawing.setPaintingColor(3);
    }
    if(keyIsDown(KEY_FOUR))
    {
        drawing.setPaintingColor(4);
    }
    if(keyIsDown(KEY_FIVE))
    {
        drawing.setPaintingColor(5);
    }
    if(keyIsDown(KEY_SIX))
    {
        drawing.setPaintingColor(6);
    }
    if(keyIsDown(KEY_SEVEN))
    {
        drawing.setPaintingColor(7);
    }
    if(keyIsDown(KEY_EIGHT))
    {
        drawing.setPaintingColor(8);
    }
    if(keyIsDown(KEY_NINE))
    {
        drawing.setPaintingColor(9);
    }

    //importing palettes
    if(keyIsDown(KEY_I))
    {
        palette.importJson('palettes/default.json');
    }
    if(keyIsDown(KEY_O))
    {
        palette.importJson('palettes/test.json');
    }

    //undo
     if(keyIsDown(KEY_LEFT_CTRL) && keyIsDown(KEY_Z))
     {
        drawing.undo();
    }

    //redo
    if(keyIsDown(KEY_LEFT_CTRL) && keyIsDown(KEY_Y))
    {
        drawing.redo();
    }
        
    //color picker
    if(keyIsDown(KEY_P))
    {
        if(brush.mode !== cursorMode.PALETTE)
        {
            brush.mode === cursorMode.DRAWING ? brush.mode = cursorMode.PICKING : brush.mode = cursorMode.DRAWING;
        }
    }
}

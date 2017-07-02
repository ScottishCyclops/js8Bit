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

"use strict";

/*****
 * Super globals
 *****/

//constantes
const cols = 64;
const rows = 32;
const scale = 500 / cols;
const refreshRate = 30 / 1000;

//objects
let palette, drawing, canvas;
let brush;

let enableRightClick = true;

//utility variables
const width = cols * scale;
const height = rows * scale;

let mouseX, mouseY = 0;
let canvasOffset;
let keysDown = new Array();
let buttonsDown = [undefined, false, false, false];

/*****
 * Utilities
 *****/

/**
 * Converts a number to an integer by cutting it's decimal
 * @param {number} x the number to return as integer
 */
//100% functionnal
function int(x)
{
    return Math.floor(x);
}

function moveCanvas()
{
    canvas.style.transform = "translate(100px, 300px)";
}


/**
 * Returns which colomn is hovered at a given x position
 * @param {number} x the x position on the canvas to check
 */
//100% functionnal
function hoveredColomn(x)
{
    let colomn = int(x / width * cols);

    return colomn < 0 ? 0 : colomn > cols - 1 ? cols - 1 : colomn;
}

/**
 * Returns which row is hovered at a given y position
 * @param {number} y the y position on the canvas to check
 */
//100% functionnal
function hoveredRow(y)
{
    let row = int(y / height * rows);
    
    return row < 0 ? 0 : row > rows - 1 ? rows - 1 : row;
}


/**
 * Creates and returns a two dimensional array of given length
 * @param {number} x the length of the first dimension
 * @param {number} y the length of the second dimension
 */
//100% functionnal
function make2DArray(x = 1, y = 0)
{
    let a = new Array(x);

    for(let i = 0; i < x; i++)
    {
        a[i] = new Array(y);
    }

    return a;
}


/**
 * Returns a copy of the given two dimensional array
 * @param {array} array the 2D array to copy
 */
//100% functionnal
function copy2DArray(array)
{
    let newArray = new Array(array.length);

    for(let i = 0; i < array.length; i++)
    {
        newArray[i] = array[i].slice();
    }

    return newArray;
}


/**
 * Returns true if the two given 2D arrays are similar in shape and content
 * @param {array} a
 * @param {array} b
 */
//100% functionnal
function compare2DArray(a, b)
{
    let same = true;

    //TODO: use XOR to be more correct
    if(a === undefined || b === undefined)
    {
        same = false;
    }
    else if(a.length !== b.length)
    {
        same = false;
    }
    else
    {
        for(let x = 0; x < a.length && same; x++)
        {
            if(a[x].length !== b[x].length)
            {
                same = false;
            }
            else
            {

                for(let y = 0; y < a[x].length && same; y++)
                {
                    if(a[x][y] !== b[x][y])
                    {
                        same = false;
                    }
                }
            }
        }
    }

    return same;
}


/**
 * Returns whether or not a given point is inside the canvas
 * @param {number} x the x position of the point
 * @param {number} y the y position of the point
 */
//100% functionnal
function isPointInCanvas(x, y)
{
    return y >= 0 && x >= 0 && y < height && x < width;
}


/**
 * Creates a grid of div elements representing pixels.
 * 
 * Returns a 2D array with references to each div.
 * @param {Document} d the document in which to create the canvas
 */
//100% functionnal
function createCanvas(d)
{
    let canvas = d.createElement("div");
    canvas.id = "canvas";
    canvas.style.cursor = "crosshair";
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    d.body.appendChild(canvas);

    for(let y = 0; y < rows; y++)
    {
        for(let x = 0; x < cols; x++)
        {
            let node = d.createElement("div");
            node.className = "pixel";

            node.style.width  = scale + "px";
            node.style.height = scale + "px";
            node.style.top    = (scale * y) + "px";
            node.style.left   = (scale * x) + "px";

            node.onfocus = (e) =>
            {
                console.log(e);
            }

            canvas.appendChild(node);
        }
    }

    return canvas;
}


/**
 * Returns whether a key is currently beeing pressed or not
 * @param {string} key 
 */
//100% functionnal
function isKeyDown(key)
{
    return keysDown.indexOf(key) !== -1;
}

function isButtonDown(button)
{
    let i = 0;

    switch(button)
    {
        case "LEFT":   i = 1; break;
        case "MIDDLE": i = 2; break;
        case "RIGHT":  i = 3; break;
    }

    return buttonsDown[i];
}


let brushModes = 
{
    DRAWING: 0,
    PICKING: 1,
};

function setupDom()
{
    //drawing importing
    let domImportJson = document.getElementById("importJson");
    domImportJson.onchange = (e) =>
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
    let domExportJson = document.getElementById("exportJson");
    domExportJson.onclick = (e) =>
    {
        window.open(drawing.exportJson(), "drawing.json");
    };

    //drawing exporting as bitmap
    let domExportBitmap = document.getElementById("exportBitmap");
    domExportBitmap.onclick = (e) =>
    {
        //TODO: reimplement
        /*
        //we hide the cursor so it isn't drawn on thse canvas
        brush.hide();
        //we redraw the canvas without the cursor
        redraw();
        //we save the canvas as a drawing.bmp
        saveCanvas("drawing","bmp");
        //we show the cursor again
        brush.reveal();
        */
        console.log("To implement");
    };

    //palette viewing mode
    let domPaletteViewer = document.getElementById("paletteViewer");
    domPaletteViewer.onclick = (e) =>
    {
        //brush.mode = brush.mode === brushMode.DRAWING ? brushMode.PALETTE : brushMode.DRAWING;
        console.log("To implement");
    };

    //palette editor (complicated because we may want to do more stuff)
    let domPaletteEditor = document.getElementById("paletteEditor");
    domPaletteEditor.onclick = (e) =>
    {
        open("editor.html", "_self");
    };
}


function setupEvents()
{
    /*****
     * document events
     *****/

    document.ondragstart = (e) =>
    {
        //prevent dragging the divs when drawing
        return false;
    };


    document.onmousedown = (e) =>
    {
        buttonsDown[e.which] = true;

        mouseDown();
    };


    document.onmouseup = (e) =>
    {
        buttonsDown[e.which] = false;

        mouseUp();
    };


    document.onmousemove = (e) =>
    {
        mouseX = e.pageX - canvasOffset.left;
        mouseY = e.pageY - canvasOffset.top;
        
        mouseMove();
    };

    document.onkeypress = (e) =>
    {
        keyPressed();
    };

    document.onkeydown = (e) =>
    {
        let key = e.key.toUpperCase();
        //if the key is not already down, we add it to the list
        if(!isKeyDown(key))
        {
            keysDown.push(key);
        }
    }


    document.onkeyup = (e) =>
    {
        let key = e.key.toUpperCase();
        //if the key was down, we now remove it from the list
        if(isKeyDown(key))
        {
            keysDown.splice(keysDown.indexOf(key), 1);
        }

        //if we release shift, we empty the hole list to prevent keys from "staying" pressed
        if(key === "SHIFT")
        {
            keysDown = new Array();
        }
    }

    document.oncontextmenu = (e) =>
    {
        return enableRightClick;
    }

    /*****
     * additional window events
     *****/

    window.onresize = (e) =>
    {
        canvasOffset = canvas.getBoundingClientRect();
    }


    window.onbeforeunload = (e) =>
    {
        //confirm leaving
        return "Discard changes?";
    };
}


window.onload = (e) =>
{
    setupDom();

    setupEvents();

    setup();

    canvasOffset = canvas.getBoundingClientRect();

    setInterval(loop, refreshRate, 0);
};

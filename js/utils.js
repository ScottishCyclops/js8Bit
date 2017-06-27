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


/**
 * Returns true if the mouse position is inside the canvas, false otherwise
 */
function isMouseInCanvas()
{
    return mouseY >= 0 && mouseX >= 0 && mouseY < height && mouseX < width;
}


/**
 * Returns whether the two given arrays are equal or not
 * @param {Array} a
 * @param {Array} b
 */
function isEqual(a, b)
{
    let equal = true;

    if(typeof(a) !== typeof(b))
    {
        equal = false;
    }
    else if(a.length !== b.length)
    {
        equal = false;
    }
    else
    {
        for(let i = 0; i < a.length; i++)
        {
            if(a[i] !== b[i])
            {
                equal = false;
                break;
            }
        }
    }

    return equal;
}


let cursorMode = 
{
    DRAWING:   0,
    PICKING:   1,
    PALETTE:   2,
    SELECTION: 3,
};


/**
 * Returns the position of the mouse on X clamped between 0 and the cols - 1.
 * 
 * Essentially the X index of the pixel we are hovering
 */
function localMouseX()
{
    let local = int(map(mouseX, 0, width, 0, cols));

    if(local > cols - 1)
    {
        local = cols - 1;
    }
    else if(local < 0)
    {
        local = 0;
    }

    return local;
}


/**
 * Returns the position of the mouse on Y clamped between 0 and the rows - 1.
 * 
 * Essentially the Y index of the pixel we are hovering
 */
function localMouseY()
{
    let local = int(map(mouseY, 0, height, 0, rows));

    if(local > rows - 1)
    {
        local = rows - 1;
    }
    else if(local < 0)
    {
        local = 0;
    }

    return local;
}


const KEY_ZERO = 48;
const KEY_ONE = 49;
const KEY_TWO = 50;
const KEY_THREE = 51;
const KEY_FOUR = 52;
const KEY_FIVE = 53;
const KEY_SIX = 54;
const KEY_SEVEN = 55;
const KEY_EIGHT = 56;
const KEY_NINE = 57;
const KEY_LEFT_CTRL = 17;
const KEY_Z = 90;
const KEY_Y = 89;
const KEY_I = 73;
const KEY_O = 79;
const KEY_P = 80;


//TODO: fix function. appears to only return black or white
function getInvertedColor(c)
{
    return color(map(brightness(c), 0, 1, 255, 0));
}

//TODO: implement forrectly
let warned = false;
/**
 * Warning : for now, this function will overwrite the current drawing
 */
function changeCanvasSize(newCols, newRows)
{
    if(newCols !== cols || newRows !== rows)
    {
        if(!warned)
        {
            console.log("this fonction will overwrite the current drawing");
            console.log("run again to do it");
            warned = true;
        }
        else
        {
            if(newCols * newRows < 40000)
            {
                let ratio = newCols / cols;
                scale /= ratio;

                cols = newCols;
                rows = newRows;
                resizeCanvas(cols * scale, rows * scale)
                drawing.changeSize(cols, rows);
            }
            else
            {
                console.log("Values too big. aborted");
            }
        }
    }
}

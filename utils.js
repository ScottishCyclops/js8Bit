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

//utilities

/**
 * Returns whether the two given arrays are equal or not
 * @param {Array} a
 * @param {Array} b
 */
function isEqual(a,b)
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

//mouse

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
    drawing.undoPosition = 0
    cursor.picker = false;
}

function localMouseX()
{
    let local = int(map(mouseX,0,scale*cols,0,cols));    

    if(local >= cols)
        local = cols-1;
    return local;
}

function localMouseY()
{
    let local = int(map(mouseY,0,scale*rows,0,rows));

    if(local >= rows)
        local = rows-1;
    return local;
}

//keyboard

const ZERO = 48;
const ONE = 49;
const TWO = 50;
const THREE = 51;
const FOUR = 52;
const FIVE = 53;
const SIX = 54;
const SEVEN = 55;
const EIGHT = 56;
const NINE = 57;

const CTRL = 17;
const Z_KEY = 90;
const Y_KEY = 89;
const I_KEY = 73;
const O_KEY = 79;
const P_KEY = 80;

function keyPressed()
{
    //quick access colors
    if(keyIsDown(ZERO))
        drawing.setPaintingColor(0);
    if(keyIsDown(ONE))
        drawing.setPaintingColor(1);
    if(keyIsDown(TWO))
        drawing.setPaintingColor(2);
    if(keyIsDown(THREE))
        drawing.setPaintingColor(3);
    if(keyIsDown(FOUR))
        drawing.setPaintingColor(4);
    if(keyIsDown(FIVE))
        drawing.setPaintingColor(5);
    if(keyIsDown(SIX))
        drawing.setPaintingColor(6);
    if(keyIsDown(SEVEN))
        drawing.setPaintingColor(7);
    if(keyIsDown(EIGHT))
        drawing.setPaintingColor(8);
    if(keyIsDown(NINE))
        drawing.setPaintingColor(9);

    //importing palettes
    if(keyIsDown(I_KEY))
        palette.importJSON('palette.json')
    if(keyIsDown(O_KEY))
        palette.importJSON('palette2.json')
    //undo
     if(keyIsDown(CTRL) && keyIsDown(Z_KEY))
        drawing.undo();
    //redo
    if(keyIsDown(CTRL) && keyIsDown(Y_KEY))
        drawing.redo();

    //color picker
    if(keyIsDown(P_KEY))
        cursor.picker ? cursor.picker = false : cursor.picker = true;
}

//saveCanvas

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

const RGBA = 4;
const cols = 32;
const rows = 32;
const scale = 10;
const undoSteps = 10;
const paletteSize = 256;

let pressing;
let palette;
let drawing;
let cursor;

function setup()
{
    createCanvas(cols*scale,rows*scale);
    frameRate(120);

    palette = new Palette(paletteSize);
    palette.setColor(1,[255,255,255]);
    drawing = new Drawing(palette,cols,rows,scale,undoSteps);

    cursor = new Cursor(drawing);
    pressing = false;
}

function draw()
{
    background(100);

    if(pressing)
    {
        drawing.drawPixel(localMouseX(),localMouseY());
    }

    drawing.showPixels();
    cursor.draw();
}

function mousePressed()
{
    pressing = true;
}

function mouseReleased()
{
    pressing = false;
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

function keyPressed()
{
    //1 2 3 4 5 6 7 8 9 0
    //quick access colors
    if(keyCode == 49)
        drawing.setPaintingColor(1);
    if(keyCode == 50)
        drawing.setPaintingColor(2);
    if(keyCode == 51)
        drawing.setPaintingColor(3);
    if(keyCode == 52)
        drawing.setPaintingColor(4);
    if(keyCode == 53)
        drawing.setPaintingColor(5);
    if(keyCode == 54)
        drawing.setPaintingColor(6);
    if(keyCode == 55)
        drawing.setPaintingColor(7);
    if(keyCode == 56)
        drawing.setPaintingColor(8);
    if(keyCode == 57)
        drawing.setPaintingColor(9);
    if(keyCode == 48)
        drawing.setPaintingColor(0);

    //importing palette : I
    if(keyCode == 73)
        palette.importJSON('palette.json')

    //undo : Z
    if(keyCode == 90)
        drawing.undo();
    //redo : Y
    if(keyCode == 89)
        drawing.redo();

}

//saveCanvas
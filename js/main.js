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


function setup()
{
    canvas = createCanvas(document);

    //objects initialization
    palette = new Palette(256);    
    drawing = new Drawing(canvas.childNodes, palette, 12);
    //brush = new Brush(drawing);
    
    //default palette
    palette.importJson("palettes/default.json", function()
    {
        drawing.colorAllCells();
    });

    brush = brushModes.DRAWING;

}


function loop(delta)
{
    /*
    if(isButtonDown("LEFT"))
    {
        if(isPointInCanvas(mouseX, mouseY))
        {
            drawing.setPixel(hoveredColomn(mouseX), hoveredRow(mouseY));
        }
    }
    */
}

function draw()
{
    if(isButtonDown("LEFT"))
    {
        if(isPointInCanvas(mouseX, mouseY))
        {
            drawing.setPixel(hoveredColomn(mouseX), hoveredRow(mouseY));
        }
    }
}

function keyPressed()
{

    console.log(keysDown);
    //quick access colors
    if(isKeyDown("0"))
    {
        drawing.setPaintingColor(0);
    }
    if(isKeyDown("1"))
    {
        drawing.setPaintingColor(1);
    }
    if(isKeyDown("2"))
    {
        drawing.setPaintingColor(2);
    }
    if(isKeyDown("3"))
    {
        drawing.setPaintingColor(3);
    }
    if(isKeyDown("4"))
    {
        drawing.setPaintingColor(4);
    }
    if(isKeyDown("5"))
    {
        drawing.setPaintingColor(5);
    }
    if(isKeyDown("6"))
    {
        drawing.setPaintingColor(6);
    }
    if(isKeyDown("7"))
    {
        drawing.setPaintingColor(7);
    }
    if(isKeyDown("8"))
    {
        drawing.setPaintingColor(8);
    }
    if(isKeyDown("9"))
    {
        drawing.setPaintingColor(9);
    }

    //importing palettes
    if(isKeyDown("I"))
    {
        palette.importJson('palettes/default.json');
    }
    if(isKeyDown("O"))
    {
        palette.importJson('palettes/test.json');
    }

    //undo
     if(isKeyDown("CONTROL") && isKeyDown("Z"))
     {
        drawing.undo();
    }

    //redo
    if(isKeyDown("CONTROL") && isKeyDown("Y"))
    {
        drawing.redo();
    }
        
    //color picker
    if(isKeyDown("P"))
    {
        brush = brush === brushModes.DRAWING ? brushModes.PICKING : brushModes.DRAWING;
    }
}

function mouseMove()
{
    draw();
}

function mouseDown()
{
    drawing.pushUndo();
    draw();
}

function mouseUp()
{
    drawing.pushUndo();
    drawing.undoPosition = 0;
}
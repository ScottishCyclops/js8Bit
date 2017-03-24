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

class Drawing
{
    constructor(palette,cols,rows,pixelSize,maxUndoSteps)
    {
        this.palette = palette;
        this.cols = cols;
        this.rows = rows;
        this.pixelSize = pixelSize;
        this.maxUndoSteps = maxUndoSteps;
        this.undoPosition = 0;

        this.undoSteps = new Array();

        this.paintingColor = 0;
        this.pixels = new Array(this.cols*this.rows);

        for(let i = 0; i < this.pixels.length; i++)
        {
            this.pixels[i] = this.paintingColor;
        }
        this.pushUndo();
    }

    drawPixel(x,y)
    {
        let index = x+y*this.cols;
        if(this.pixels[index] != this.paintingColor)
        {
            this.pixels[index] = this.paintingColor;
        }
    }

    showPixels()
    {
        noStroke();
        for(let i = 0; i < this.pixels.length; i++)
        {
            let x = i%this.cols;
            let y = int(i/this.cols);
            fill(this.palette.getColor(this.pixels[i]));
            rect(x*this.pixelSize,y*this.pixelSize,this.pixelSize,this.pixelSize);
        }
    }

    setPaintingColor(i)
    {
        this.paintingColor = i;
    }

    pushUndo()
    {
        //only if they were modifications
        console.log(this.undoSteps);
        console.log(this.pixels);
        if(!isEqual(this.pixels,this.undoSteps[0]))
        {
            this.undoSteps.unshift(this.pixels.slice());
            //if we reached the max undo storage
            /*
            if(this.undoSteps.length > this.maxUndoSteps)
            {
                this.undoSteps = this.undoSteps.slice(0,this.maxUndoSteps-1);
            }
            */
        }
    }
    /*
    undo()
    {
        if(undoPosition == 0)
            this.pushUndo();

        undoPosition++;
        this.pixels = this.undoSteps[undoPosition];
    }

    redo()
    {
        this.pixels = this.undoSteps[undoPosition-1];
    }
    */
}
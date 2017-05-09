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
        this.pixels[index] = this.paintingColor;
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
        if(!isEqual(this.pixels,this.undoSteps[0]))
        {
            //we copy the array of pixels and put it into the undo array
            this.undoSteps.unshift(this.pixels.slice());
            //if we reached the max undo storage
            
            if(this.undoSteps.length > this.maxUndoSteps)
            {
                this.undoSteps = this.undoSteps.slice(0,this.maxUndoSteps);
            }
        }
    }
    
    undo()
    {
        if(this.undoPosition == 0)
        {
            //if we havn't undone yet, we need to save this stage for redo purpuses
            this.pushUndo();
        }

        if(this.undoPosition < this.undoSteps.length-1)
        {
            //we copy the array from the undo to the real pixels
            this.pixels = this.undoSteps[this.undoPosition+1].slice();
            this.undoPosition++;
        }
        else
        {
            console.log("nothing more to undo. try increasing undo steps")
        }

        //console.log(this.undoPosition);
    }

    redo()
    {
        if(this.undoPosition <= 0)
        {
            this.undoPosition = 0;
            console.log("nothing more to redo")
        }
        else
        {
            this.pixels = this.undoSteps[this.undoPosition-1].slice();
            this.undoPosition--;
        }

        //console.log(this.undoPosition);
    }
    importJson(file)
    {
        this.pixels = JSON.parse(file);
    }

    exportJson()
    {
        let jsonPixels = JSON.stringify(this.pixels);
        let dlLink = "data:application/octet-stream," + encodeURIComponent(jsonPixels);
        window.open(dlLink, 'drawing.json');
    }
    
}

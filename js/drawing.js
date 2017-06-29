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
    constructor(palette, maxUndoSteps)
    {
        this.palette = palette;
        this.maxUndoSteps = maxUndoSteps;

        this.undoPosition = 0;
        this.undoSteps = new Array();

        this.paintingColor = 0;

        this.pixels = D2Array(cols, rows);

        for(let x = 0; x < cols; x++)
        {
            //we fill every colomn
            this.pixels[x].fill(this.paintingColor);
        }

        this.pushUndo();
    }

    drawPixel(x, y)
    {
        this.pixels[x][y] = this.paintingColor;
    }

    showPixels()
    {
        push();

        noStroke();
        for(let x = 0; x < cols; x++)
        {
            for(let y = 0; y < rows; y++)
            {
                fill(this.palette.getColor(this.pixels[x][y]));
                //TODO: raw pixel access
                rect(x * scale, y * scale, scale, scale);
            }
        }

        pop();

        /*
        loadPixels();

        let size = cols*scale*rows*scale*4;

        for(let x = 0; x < cols; x++)
        {
            for(let y = 0; y < rows; y++)
            {
                let c = this.palette.getColor(this.pixels[x][y]);
                let i = ((x * scale) + (y * scale * rows)) * 4;

                for(let y = 0; y < scale; y++)
                {
                    pixels[i+y    ] = 255;
                    pixels[i + 1] = 0;
                    pixels[i + 2] = 0;
                    pixels[i + 3] = 255;
                }
            }
        }

        for(let i = 0; i < size; i+=4)
        {
            pixels[i    ] = 255;
            pixels[i + 1] = 0;
            pixels[i + 2] = 0;
            pixels[i + 3] = 255;
        }

        updatePixels();
        */
    }

    setPaintingColor(i)
    {
        this.paintingColor = i;
    }

    getPixel(x, y)
    {
        return this.pixels[x][y];
    }

    pushUndo()
    {
        //only if they were modifications
        if(!isEqual(this.pixels, this.undoSteps[0]))
        {
            //we copy the array of pixels and put it into the undo array
            //slicing without params makes a copy of the whole array
            this.undoSteps.unshift(copyD2Array(this.pixels));

            //if we reached the max undo storage we cut off the oldest undos
            if(this.undoSteps.length > this.maxUndoSteps)
            {
                this.undoSteps = this.undoSteps.slice(0, this.maxUndoSteps);
            }
        }
    }
    
    undo()
    {
        if(this.undoPosition === 0)
        {
            //if we havn't undone yet, we need to save this stage for redo purpuses
            this.pushUndo();
        }

        if(this.undoPosition < this.undoSteps.length - 1)
        {
            //we copy the array from the undo to the real pixels
            //TODO: cler next two lines, why ++ ?
            this.undoPosition++;
            this.pixels = copyD2Array(this.undoSteps[this.undoPosition]);
        }
        else
        {
            console.log("nothing more to undo. try increasing undo steps")
        }
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
            this.undoPosition--;
            this.pixels = copyD2Array(this.undoSteps[this.undoPosition]);
        }
    }

    importJson(file)
    {
        //TODO: import cols and rows from file
        this.pixels = JSON.parse(file);
    }

    exportJson()
    {
        let jsonPixels = JSON.stringify(this.pixels);
        let dlLink = "data:application/octet-stream," + encodeURIComponent(jsonPixels);
        window.open(dlLink, "drawing.json");
    }

    changeSize(newCols, newRows)
    {
        //TODO: don't delete drawing
        //TODO: remove duplicate from constructor

        this.pixels = D2Array(newCols, newRows);
 
        for(let x = 0; x < newCols; x++)
        {
            this.pixels[x].fill(this.paintingColor);
        }

        this.undoSteps = new Array();
        this.undoPosition = 0;
    }

    mirror()
    {
        /*
        let newPixels = this.pixels.slice();

        for(let x = 0; x < cols; x++)
        {
            for(let y = 0; y < rows; y++)
            {

            }
        }
        */
    }
}

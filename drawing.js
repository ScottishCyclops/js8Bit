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
    }

    drawPixel(x,y)
    {
        //this.pushUndo();
        this.pixels[x+y*this.cols] = this.paintingColor;
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
        this.undoSteps.unshift(this.pixels);
        //if we reached the max undo storage
        if(this.undoSteps.length > this.maxUndoSteps)
            this.undoSteps = this.undoSteps.slice(0,this.maxUndoSteps-1);
    }
    
    undo()
    {
        if(undoPosition == 0)
            this.pushUndo();

        undoPosition++;
        this.pixels = this.undoSteps[undoPosition];
    }

    redo()
    {
        this.pixels = this.undoSteps[0];
    }
}
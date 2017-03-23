class Drawing
{
    constructor(palette,cols,rows,pixelSize)
    {
        this.palette = palette;
        this.cols = cols;
        this.rows = rows;
        this.pixelSize = pixelSize;

        this.paintingColor = 0;
        this.pixels = new Array(this.cols*this.rows);

        for(let i = 0; i < this.pixels.length; i++)
        {
            this.pixels[i] = this.paintingColor;
        }
    }

    drawPixel(x,y)
    {
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
}
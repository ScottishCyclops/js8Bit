class Drawing
{
    constructor(palette,cols,rows,res)
    {
        this.palette = palette;
        this.cols = cols;
        this.rows = rows;

        this.pixelSize = int(res/this.cols);
        this.pixels = new Array(this.cols*this.rows);

        for(let i = 0; i < this.pixels.length; i++)
        {
            this.pixels[i] = this.palette.getColor(0);
        }
    }

    drawPixel(x,y,i)
    {
        this.pixels[x+y*this.cols] = this.palette.getColor(i);
    }

    showPixels()
    {
        noStroke();
        for(let i = 0; i < this.pixels.length; i++)
        {
            let x = i%this.cols;
            let y = int(i/this.cols);
            fill(this.pixels[i]);
            rect(x*this.pixelSize,y*this.pixelSize,this.pixelSize,this.pixelSize);
        }
    }
}
const RGBA = 4;
const scale = 300;
const cols = 8;
const rows = 8;

let pressing = false;
let c = [255, 102, 204];
let palette;
let drawing;

function setup()
{
    createCanvas(cols*scale,rows*scale);

    palette = new Palette(4);
    palette.setColor(1,c);
    drawing = new Drawing(palette,cols,rows,scale);
}

function draw()
{
    if(pressing)
    {
        console.log("pressing");
        drawing.drawPixel(int(mouseX/scale/cols),int(mouseY/scale/rows),1);
    }
    drawing.showPixels();
}

function mousePressed()
{
    pressing = true;
}

function mouseReleased()
{
    pressing = false;
}
/*
getLocalMouse()
{
    let localX = mouseX/scale;
    let localY = mouseY/scale;

    let finalX = localX;
    let finalY = localY;
    localX > cols ? finalX = null : finalX = localX;
    localY < rows ? finalY = null : finalY = localY;


    return new Array(finalX,finalY);
}
*/
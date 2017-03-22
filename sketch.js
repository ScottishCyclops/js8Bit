const RGBA = 4;
const cols = 32;
const rows = 32;
const scale = 10;

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
    background('#333');
    if(pressing)
    {
        drawing.drawPixel(localMouseX(),localMouseY(),1);
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


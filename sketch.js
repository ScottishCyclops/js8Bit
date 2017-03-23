const RGBA = 4;
const cols = 32;
const rows = 32;
const scale = 10;

let pressing = false;
let palette;
let drawing;

function setup()
{
    createCanvas(cols*scale,rows*scale);

    palette = new Palette(256);
    palette.setColor(1,[255,255,255]);
    drawing = new Drawing(palette,cols,rows,scale);
}

function draw()
{
    background(150);
    if(pressing)
    {
        drawing.drawPixel(localMouseX(),localMouseY());
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

    //importing palette
    if(keyCode == 73)
        palette.importJSON('palette.json')

}

//saveCanvas
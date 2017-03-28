const cols = 16;
const rows = 16;
const maxColor = cols;
const scale = 20;

let palette;

let hColor;
let sColor;
let vColor;


function setup()
{
    createCanvas(cols*scale,rows*scale)
    background(0);

    palette = new Array();

    //three axis : hue, saturation, value
    //hue is horizontal, saturation is vertical till half height, value the second half

    noStroke();
    colorMode(HSB, maxColor);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            hColor = x;

            if(y >= rows/2)
            {
                sColor = maxColor;
                vColor = map(y,0,maxColor,rows,0);
            }
            else
            {
                sColor = map(y,0,maxColor,maxColor,-maxColor);
                vColor = maxColor;
            }

            let c = color(hColor,sColor,vColor);
            palette.push([int(red(c)),int(green(c)),int(blue(c))]);
            fill(c);
            rect(x*scale,y*scale,scale,scale);
        }
    }

    console.log(JSON.stringify(palette));

}

function draw()
{

}
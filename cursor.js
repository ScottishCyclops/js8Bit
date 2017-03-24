class Cursor
{
    constructor(drawing)
    {
        this.drawing = drawing;
        //cursor(CROSS);
        noCursor();
    }
    draw()
    {
        let fillColor = this.drawing.palette.getColor(this.drawing.paintingColor);
        //inverted grey-scale color
        let strokeColor = map(brightness(fillColor),0,1,255,0);

        strokeWeight(1);
        stroke(strokeColor);
        fill(fillColor);
        rect(mouseX-scale/2,mouseY-scale/2,scale,scale);
    }
}
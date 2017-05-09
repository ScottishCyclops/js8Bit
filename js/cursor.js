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

class CustomCursor
{
    /**
     * Creates a cursor for a drawing
     * @param {Drawing} drawing the drawing associated with the cursor
     */
    constructor(drawing)
    {
        this.drawing = drawing;
        this.mode = cursorMode.DRAWING;

        this.hidden = false;
               
        cursor(CROSS);
    }

    /**
     * changes the cursor visibility so that it isn't drawn anymore
     */
    hide()
    {
        this.hidden = true;
    }

    /**
     * changes the cursor visibility so that it is drawn again
     */
    reveal()
    {
        this.hidden = false;
    }

    draw()
    {
        if(!this.hidden)
        {
            if(this.mode !== cursorMode.SELECTION)
            {
                let fillColor;
                switch(this.mode)
                {
                    case cursorMode.DRAWING:
                        //filling the cursor with the drawing color
                        fillColor = this.drawing.palette.getColor(this.drawing.paintingColor);
                        break;
                    case cursorMode.PICKING:
                        //filling the cursor with the hovering color
                        fillColor = this.drawing.palette.getColor(this.drawing.pixels[localMouseX()+localMouseY()*cols]);
                        break;
                    case cursorMode.PALETTE:
                        //TODO: fix color
                        fillColor = getInvertedColor(this.drawing.palette.getColor(this.drawing.pixels[localMouseX()+localMouseY()*cols]));
                        break;
                }

                if(this.mode !== cursorMode.PALETTE)
                {
                    let strokeColor = getInvertedColor(fillColor);
                    strokeWeight(1);
                    stroke(strokeColor);
                }
                else
                {
                    noStroke();
                }

                fill(fillColor);
                switch(this.mode)
                {
                    case cursorMode.PALETTE:
                    case cursorMode.DRAWING:
                        //we "snap" the drawing cursor to the pixels so we use the local mouse pos
                        rect(localMouseX()*scale,localMouseY()*scale,scale,scale);
                        break;
                    case cursorMode.PICKING:
                        //we don't "snap" here, so we use the default mouse pos
                        ellipse(mouseX,mouseY,scale,scale);
                        break;
                }
            }
        }
    }
}

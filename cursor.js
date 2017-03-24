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
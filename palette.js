 /*
    TThis is a simple 8bit painter made with P5.js
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

class Palette
{
    constructor(size)
    {
        this.size = size;
        this.colors = new Array(this.size);

        for(let i = 0; i < this.size; i++)
        {
            this.colors[i] = [0,0,0];
        }
    }

    setColor(i,color)
    {
        this.colors[i] = color;
    }

    getColor(i)
    {
        return this.colors[i];
    }

    importJson(file)
    {
        let newColors = new Array();
        let getter = new XMLHttpRequest();
        
        getter.open('GET', file);       
        getter.onloadend = ()=>{
            let json = JSON.parse(getter.responseText);
            this.colors = json.palette;
            this.size = json.palette.length;
        }
        //sending request
        getter.send();
    }

    showColors()
    {
        //strokeWeight(1);
        //stroke(0);
        noStroke();
        for(let i = 0; i < this.size; i++)
        {
            let x = (i%this.cols);
            let y = int(i/this.cols);

            fill(this.colors[i]);
            rect(x*scale,y*scale,scale,scale);
            //console.log(this.colors);
        }
    }
}

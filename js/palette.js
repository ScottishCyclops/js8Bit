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

//100% functionnal
class Palette
{
    constructor(size)
    {
        this.size = size;
        this.colors = new Array(this.size);

        //we fill the palette with black by default
        for(let i = 0; i < this.size; i++)
        {
            this.colors[i] = [0, 0, 0];
        }
    }

    setColor(index, color)
    {
        this.colors[index] = color;
    }

    getColor(index)
    {
        return this.colors[index];
    }

    importJson(file, callback = ()=>{})
    {
        let getter = new XMLHttpRequest();
        
        getter.open("GET", file);
        getter.onloadend = () =>
        {
            let json = JSON.parse(getter.responseText);

            if(json.palette)
            {
                this.colors = json.palette;
                this.size = json.palette.length;
            }
            else
            {
                console.log("No pallete found in the file");
            }

            callback();
        };

        //sending request
        getter.send();
    }

    showColors()
    {
        //TODO: reimplement
        /*
        push();
        
        //TODO: optimize, accessing pixels directly ?
        //this array stays as a 1D array and uses this horrible method to be drawn
        noStroke();
        for(let i = 0; i < this.colors.length; i++)
        {
            let x = i % cols;
            let y = int(i / cols);
            fill(this.colors[i]);
            rect(x * scale, y * scale, scale, scale);
        }

        pop();
        */
    }
}

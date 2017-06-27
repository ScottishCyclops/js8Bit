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

    importJson(file)
    {
        let getter = new XMLHttpRequest();
        
        getter.open("GET", file);
        getter.onloadend = () =>
        {
            let json = JSON.parse(getter.responseText);
            //for now, I have two formats for the palette. It either contains an object called "palette"
            //or a simple array
            if(json.palette)
            {
                this.colors = json.palette;
                this.size = json.palette.length;
            }
            else
            {
                this.colors = json;
                this.size = json.length;
            }
        };
        //sending request
        getter.send();
    }

    showColors()
    {
        push();
        
        //TODO: optimize, accessing pixels directly ?
        noStroke();
        for(let i = 0; i < this.colors.length; i++)
        {
            let x = i % cols;
            let y = int(i / cols);
            fill(this.colors[i]);
            rect(x * scale, y * scale, scale, scale);
        }

        pop();
    }
}

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

    importJSON(file)
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
}
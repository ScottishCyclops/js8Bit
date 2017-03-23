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

    /**
     * Imports new colors to the palette and returns the old ones
     */
    import(file)
    {
        //creating request object
        let getter = new XMLHttpRequest();
        let newColors = new Array();
        getter.open('GET', file);

        getter.onloadend = function() {
            let parser = new DOMParser();
            xml = parser.parseFromString(getter.responseText, "text/xml");
            
            if(xml.documentElement.nodeName == 'palette')
            {
                for(let i = 0; i < xml.documentElement.children.length; i++)
                {
                    let node = xml.documentElement.children.item(i)
                    if(node.nodeName == 'color')
                    {
                        newColors.push(node.innerHTML.split(','));
                    }
                }
            }
            console.log(newColors);
            
        }
        //sending request
        getter.send();

        this.size = newColors.length;
        let oldColors = this.colors;
        this.colors = newColors;

        return oldColors;
    }
}
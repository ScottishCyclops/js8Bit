class Palette
{
    constructor(size)
    {
        this.size = size;
        this.colors = new Array(this.size);

        for(let i = 0; i < this.colors.length; i++)
        {
            this.colors[i] = color(0,0,0);
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
}
/**
 * Returns whether the two given arrays are equal or not
 * @param {Array} a
 * @param {Array} b
 */
function isEqual(a,b)
{
    let equal = true;
    if(typeof(a) !== typeof(b))
    {
        equal = false;
    }
    else if(a.length !== b.length)
    {
        equal = false;
    }
    else
    {
        for(let i = 0; i < a.length; i++)
        {
            if(a[i] !== b[i])
            {
                equal = false;
                break;
            }
        }
    }
    return equal;
}
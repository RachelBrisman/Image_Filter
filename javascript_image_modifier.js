// Sets constants for each value in the pixel array
var RED = 0;
var GREEN = 1;
var BLUE = 2;

function start()
{
    // Create a new image with the given URL
    var image = new WebImage("https://codehs.com/static/img/library/landscapes/flowers.jpg");
    
    // Set the size of the image
    image.setSize(396, 396);
    
    // Set the position of the image
    image.setPosition(2, 42);
    
    // Add it to the canvas
    add(image);
    
    // Wait for the image to load before progressing
    setTimeout(function()
    {
        NumberOfSquares(image);
    }, 500);
}

/*
* This function allows the user to choose how many boxes they would like in their grid
*/
function NumberOfSquares(image)
{
    // Asks the user how many boxes they would like
    var squares = readInt("Would you like your image to be divided into 4 or 9 sections? "); 
    
    // Gives the user filter options 
    window.alert(" FILTER OPTIONS \n 1 = black and white \n 2 = invert \n 3 = brighten \n 4 = saturate \n 5 = pink \n 6 = blue \n 7 = green \n 8 = green and purple \n 9 = pink and green \n");
    println(" \n FILTER OPTIONS \n 1 = black and white \n 2 = invert \n 3 = brighten \n 4 = saturate \n 5 = pink \n 6 = blue \n 7 = green \n 8 = green and purple \n 9 = pink and green");
    
    // If the user chose 9, continue with the NineSquares function; if they choose 4, continue with the fourSquares function
    if(squares == 9)
    {
        nineSquares(image);
    }
    else if(squares == 4)
    {
        fourSquares(image);
    }
}

/* This function:
* Gives the user filter options 
* Loops through each of the image's 4 sections
* Asks the user what filter to apply to the section
* Applies the filter to that section's pixels
*/
function fourSquares(image)
{
    // Loops through each of the image's 4 sections
    for(var i = 0; i < 4; i++)
    {        
        // Asks the user which filter to apply to the section
        var filterChoice = readInt("What filter would you like to apply on section "+ (i + 1) +"? ");

        //modifies each pixel according to the filter the user chose for that section
        for(var x = (i % 2) * 198; x < ((i % 2) * 198) + 198; x++)
        {
            if(i < 2)
            {
                for(var y = 0; y < image.getHeight() / 2; y++)
                {
                    modifyPixel(x, y, filterChoice, image);
                }
            }
            if(i >= 2)
            {
                for(var y = image.getHeight() / 2; y < image.getHeight(); y++)
                {
                    modifyPixel(x, y, filterChoice, image);
                }
            }
        }
    }
}

/* This function:
* Gives the user filter options 
* Loops through each of the image's 9 sections
* Asks the user what filter to apply to the section
* Applies the filter to that section's pixels
*/
function nineSquares(image)
{
    //loops throguh each of the 9 sections
    for(var i = 0; i < 9; i++)
    {
        // Asks the user which filter to apply to the section
        var filterChoice = readInt("What filter would you like to apply on section "+ (i + 1) +"? ");

        //modifies each pixel according to the filter the user chose for that section
        for(var x = (i % 3) * 132; x < ((i % 3) * 132) + 132; x++)
        {
            if(i < 3)
            {
                for(var y = 0; y < 132; y++)
                {
                    modifyPixel(x, y, filterChoice, image);
                }
            }
            else if (i < 6)
            {
                for(var y = 132; y < 264; y++)
                {
                    modifyPixel(x, y, filterChoice, image);
                }
            }
            else
            {
                for(var y = 264; y < 396; y++)
                {
                    modifyPixel(x, y, filterChoice, image);
                }
            }
        }    
    }
}

/*
* This function:
* Retrieves the pixel at the given point 
* Modifies it according to the filter that the user chose
* Updates the R,G,B values of the pixel
*/
function modifyPixel(x, y, filterChoice, image)
{
    // Retrieves the pixel at x,y
    var pixel = image.getPixel(x, y);
    
    // Updates the pixel according to what the user chose
    if(filterChoice == 1)
    {
        pixel = blackAndWhite(pixel);
    }
    else if(filterChoice == 2)
    {
        pixel = invert(pixel);
    }
    else if(filterChoice == 3)
    {
        pixel = brighten(pixel);
    }
    else if(filterChoice == 4)
    {
        pixel = saturate(pixel);
    }
    else if(filterChoice == 5)
    {
        pixel = pink(pixel);
    }
    else if(filterChoice == 6)
    {
        pixel = blue(pixel);
    }
    else if(filterChoice == 7)
    {
        pixel = green(pixel);
    }
    else if(filterChoice == 8)
    {
        pixel = greenAndPurple(pixel);
    }
    else if(filterChoice == 9)
    {
        pixel = pinkAndGreen(pixel);
    }

    // Updates the pixel's R,G,B values
    image.setRed(x, y, pixel[RED]);
    image.setGreen(x, y, pixel[GREEN]);
    image.setBlue(x, y, pixel[BLUE]);
}

/*
* This function modifies the pixel to black and white 
* Returns the pixel
*/
function blackAndWhite(pixel)
{
    var value = (pixel[RED] + pixel[GREEN] + pixel[BLUE]) / 3;

    pixel[RED] = value;
    pixel[GREEN] = value;
    pixel[BLUE] = value;
    return pixel;
}

/*
* This function inverts the pixel
* Returns the pixel
*/
function invert(pixel) 
{
    var newRed = 255 - pixel[RED];
    var newGreen = 255 - pixel[GREEN];
    var newBlue = 255 - pixel[BLUE];
    pixel[RED] = newRed;
    pixel[GREEN] = newGreen;
    pixel[BLUE] = newBlue;
    return pixel;
}

/*
* This function brightens the pixel 
* Returns the pixel
*/
function brighten(pixel)
{
    var newRed = pixel[RED] + 50;
    var newGreen = pixel[GREEN] + 50;
    var newBlue = pixel[BLUE] + 50;

    newRed = Math.min(newRed, 255);
    newGreen = Math.min(newGreen, 255);
    newBlue = Math.min(newBlue, 255);

    pixel[RED] = newRed;
    pixel[GREEN] = newGreen;
    pixel[BLUE] = newBlue;
    
    // Return the modified pixel
    return pixel;
}

/*
* This function saturates the pixel
* Returns the pixel
*/
function saturate(pixel)
{
    if(pixel[RED] >= 128)
    {
        pixel[RED] = 255;
    }
    else
    {
        pixel[RED] = 0;
    }

    if(pixel[GREEN] >= 128)
    {
        pixel[GREEN] = 255;
    }
    else
    {
        pixel[GREEN] = 0;
    }

    if(pixel[BLUE] >= 128)
    {
        pixel[BLUE] = 255;
    }
    else
    {
        pixel[BLUE] = 0;
    }
    return pixel;
}

/*
* This function modifies the pixel to pink
* Returns the pixel
*/
function pink(pixel)
{
    pixel[GREEN] = 0;
    return pixel;
}

/*
* This function modifies the pixel to blue
* Returns the pixel
*/
function blue(pixel)
{
    pixel[RED] = 0;
    return pixel;
}

/*
* This function modifies the pixel to yellow
* Returns the pixel
*/
function green(pixel)
{
    pixel[BLUE] = 0;
    return pixel;
}

/*
* This function modifies the pixel to green and purple 
* Returns the pixel
*/
function greenAndPurple(pixel)
{
    var red = pixel[RED];
    var green = pixel[GREEN];
    var blue = pixel[BLUE];
    pixel[RED] = green;
    pixel[GREEN] = blue;
    pixel[BLUE] = red;
    return pixel;
}

/*
* This function modifies the pixel to pink and green
* Returns the pixel
*/
function pinkAndGreen(pixel)
{
    var red = pixel[RED];
    var green = pixel[GREEN];
    var blue = pixel[BLUE];
    pixel[RED] = blue;
    pixel[GREEN] = red;
    pixel[BLUE] = green;
    return pixel;
}

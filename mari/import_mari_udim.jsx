 // open a new blank document
var doc = app.documents.add(); 

// the default layer
var default_layer = doc.layers[0];
default_layer.name = "color";

// the default artboard
//default_artboard = doc.artboards[0];
//default_artboard.name = "default_artboard";
//var default_ab_index = doc.artboards.getActiveArtboardIndex(); 
//alert(default_ab_index)

//u = 0;
//v = 0;
size = 512;
// mari uses 10 hardcoded columns
max_col = 10;

function create_udim_tile(u, v, size, name)
{
    var l = size*u;
    var t = size*v;
    
    var r = size*u + size;
    // remeber the inverted y
    var b = (size*v)-size;

    var newAB = doc.artboards.add([l, t, r, b]);
    newAB.name = name;
}

//create_udim_tile(u, v, size, 'kayy')
                         
function udim_to_artboard(udim, size)
{
    u = (udim-1001) % max_col;
    v = Math.floor((udim-1001) / max_col)  
    create_udim_tile(u, v, size, udim)   
}

udim_to_artboard(1001, size);
udim_to_artboard(1002, size);
udim_to_artboard(1004, size);
udim_to_artboard(1015, size);

/*
for (x in default_artboard)
{
    $.writeln(x);
}
*/

// delete default artboard
doc.artboards.remove(0); 
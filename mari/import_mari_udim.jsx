var doc = app.activeDocument;

u = 0;
v = 0;
size = 128;
patch_name = "name_1001";
max_col = 10;

function create_udim_tile(u, v, size, patch_name)
{
    var l = size*u;
    var t = size*v;
    
    var r = size*u + size;
    // remeber the inverted y
    var b = (size*v)-size;

    var newAB = doc.artboards.add([l, t, r, b]);
    newAB.name = patch_name;
 
}

//create_udim_tile(u, v, size, 'kayy')

function udim_to_artboard(udim, size, name)
{
    u = (udim-1001) % max_col;
    v = Math.floor((udim-1001) / max_col)
    
    create_udim_tile(u, v, size, name+'_'+udim)   
}

udim_to_artboard(1001, size, 'color');
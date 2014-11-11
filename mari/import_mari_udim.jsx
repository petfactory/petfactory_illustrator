var doc = app.activeDocument;

u = 0;
v = 1;
size = 128;
patch_name = "name_1001";


var l = size*u;
var t = size*v;
var r = size*u + size;
// remeber the inverted y
var b = (size*v)-size;

var newAB = doc.artboards.add([l, t, r, b]);
newAB.name = patch_name;


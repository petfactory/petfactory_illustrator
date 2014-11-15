var num_col = 10;
//var tile_size = 1024;
var start_x = -7000;
var start_y = -5000;

function create_new_udim_document(tile_size)
{
    // open a new blank document
    var active_doc = app.documents.add(); 

    // the default layer
    var default_layer = active_doc.layers[0];

    // open the UDIM dir
    dir = Folder.selectDialog('Please select the folder to be imported:', Folder('~/Documents/projects/the_bot/bot_illustrator/'));
    
    if (dir)
    {
        var file_list = dir.getFiles();
        create_udim_tiles(img_list=file_list, size=tile_size, doc=active_doc, create_artboard=true, add_graphics_layer=true)
    }

    // If we have more than one artboard, remove the first
    if (active_doc.artboards.length > 1)
    {
        active_doc.artboards.remove(0); 
    }

    if (active_doc.layers.length > 1)
    {
        default_layer.remove(); 
    }
}

function add_to_udim_document(tile_size)
{
    // open the UDIM dir
    dir = Folder.selectDialog('Please select the folder to be imported:', Folder('~/Documents/projects/the_bot/bot_illustrator/'));

    if (dir)
    {
        var active_doc = app.activeDocument;
        var file_list = dir.getFiles();
        create_udim_tiles(img_list=file_list, size=tile_size, doc=active_doc, create_artboard=false, add_graphics_layer=false)
    }   
}
function basename(path)
{
    return path.replace(/\\/g,'/').replace( /.*\//, '' );
}
 
function dirname(path) 
{
    return path.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');
}

function create_udim_tiles(img_list, size, doc, create_artboard, add_graphics_layer)
{ 
    var udim_layer = doc.layers.add();
    udim_layer.name = "udim";

    var num_img = img_list.length;
    //num_img = 2;

    var pattern = /^[\w \.]*?(?:\.|_)([\d]{4})(.jpg|.jpeg|.tif|.tiff|.png)$/;

    for(var i = 0; i < num_img; i++)
    {
        file_path = img_list[i];
        file_name = basename(file_path.toString());

        var match_array = file_name.match(pattern);

        if(match_array)
        {
            udim = match_array[1];
            $.writeln(udim);
        }
    
        else
        { 
            //alert('skipping ' + file_name);
            continue;
        }

        var inc = udim - 1001;
   
        // Place the image on the artboard
        var placed_img = udim_layer.placedItems.add()
        placed_img.file = img_list[i];
        
        var left = (inc%num_col)*size;
        var top = Math.floor(inc/num_col)*size;
        placed_img.left = start_x + left;
        placed_img.top = start_y + top;
        placed_img.width = placed_img.height = size;

        if(create_artboard)
        {
            bounds = placed_img.geometricBounds;
            var art_board = doc.artboards.add(bounds);
            art_board.name = udim;      
        }  
    }

    udim_layer.locked = true;
    
    if(add_graphics_layer)
    {
        var new_layer = doc.layers.add();
        new_layer.name = "awesome graphics";
    } 
}

var size_list = ["128", "256", "512", "1024", "2048", "4096"];

var win = new Window ("dialog", "Create Mari UDIM", undefined);
win.alignChildren = "right";

var main = win.add ("group");
main.add ("statictext", undefined, "Patch size: ");

var group = main.add ("group {alignChildren: 'left', orientation: 'stack'}");

var e = group.add ("edittext", [0,0,120,20]);
e.text = size_list[3]; 
e.active = true;
var list = group.add ("dropdownlist", [0,0,140,20], size_list);
list.minimumSize.width = 120;

var radio_grp = win.add ("group");
radio_grp.orientation = "column";
radio_grp.alignChildren = "left";
var create_new_RB = radio_grp.add ("radiobutton", undefined, "Create new");
var add_to_existing_RB = radio_grp.add ("radiobutton", undefined, "Add to existing");
create_new_RB.value = true;

var buttons = win.add ("group")
browse_btn = buttons.add ("button", undefined, "Browse", {name: "browse"});
buttons.add ("button", undefined, "Cancel", {name: "cancel"});

list.onChange = function () {e.text = list.selection.text; e.active = true}

browse_btn.onClick = browse_for_img;

win.show ();

function browse_for_img(a)
{
    if (create_new_RB.value == true)
    {
        create_new_udim_document(e.text);
    }
    else
    {
        add_to_udim_document(e.text);
    }

    win.close();
}
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
        create_udim_tiles(size=tile_size, doc=active_doc, create_artboard=true, add_graphics_layer=true)
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
        create_udim_tiles(size=tile_size, doc=active_doc, create_artboard=false, add_graphics_layer=false)
    }   
}
function create_udim_tiles(size, doc, create_artboard, add_graphics_layer)
{
    var udim_layer = doc.layers.add();
    udim_layer.name = "udim";
    
    var img_list = dir.getFiles();
    var num_img = img_list.length;
    //num_img = 2;

    for(var i = 0; i < num_img; i++)
    {
        file_path = img_list[i];
        var file_name = file_path.name.toLowerCase();

        // skip everythin but tif images
        if(file_name.indexOf(".tif") == -1)
        {
            continue
        }

        split_name = file_name.split('.');
        
        // get the part before the extension
        last_part = split_name[split_name.length-2]
        
        // get the udim
        udim = last_part.slice(last_part.length-4, last_part.length);
        var inc = udim - 1001;
        $.writeln(inc);
   
        // Place the image on the artboard
        var placed_img = udim_layer.placedItems.add()
        placed_img.file = img_list[i];
        
        var left = (inc%num_col)*size;
        var top = Math.floor(inc/num_col)*size;
        placed_img.left = start_x + left;
        placed_img.top = start_y + top;
        placed_img.width = placed_img.height = size;
        /*
        for(x in placed_img)
        {
            $.writeln(x)
        }
        */
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
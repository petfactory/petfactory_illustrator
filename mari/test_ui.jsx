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
    var i = 1;
    else
    var i = 2;
    
    alert(i + "   " +e.text);
    win.close();
}
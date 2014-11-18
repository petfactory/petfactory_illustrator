var win = new Window ("palette");
var grp = win.add ("group");
grp.add ("statictext", undefined, "Size ( % ) :");
var myText = grp.add ("edittext", undefined, "100");
myText.active = true;
myText.characters = 15;

var btn_grp = win.add ("group");
btn_grp.alignment = "right";
var ok_btn = btn_grp.add ("button", undefined, "Resize");
//ok_btn.onClick = change_scale;
ok_btn.onClick = function (){CreateBridgeTalkMessage(myText.text); }
var close_btn = btn_grp.add ("button", undefined, "Cancel");
close_btn.onClick = function () {win.close()}
win.show ();

function CreateBridgeTalkMessage(size)
{
	var bt = new BridgeTalk();
	bt.target = "illustrator";
    
	var script = change_scale.toString() + "\r";
	script += "change_scale(" +size+");";
	bt.body = script;
    
	$.writeln(script);

    // asynchronous. will recieve the return value of the bridge Talk function
    /*
	bt.onResult = function(resObj)
    {
    var result = resObj.body;
    //alert(result);
	}
    */

	bt.send(100);  
}


function change_scale(size)
{
    doc = app.activeDocument;
    sel_list = doc.selection;

    if(sel_list.length < 1) 
    {
        alert("Nothing is selected!");
        return;
    }

    for (i in sel_list)
    {
        sel_list[i].resize(size,size);
    }
}

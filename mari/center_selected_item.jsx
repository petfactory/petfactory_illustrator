function zoom_to_fit(doc, bounds)
{
    var left = bounds[0];
    var top = bounds[1];
    var right = bounds[2];
    var bottom = bounds[3];

    var sel_width = right - left;
    var sel_height = top - bottom;
    var mid_x = left + sel_width*.5;
    var mid_y = bottom + sel_height*.5;

    // zoom 100%
    doc.views[0].zoom = 1;
    screen_bounds = doc.views[0].bounds;
    screen_width = screen_bounds[2] - screen_bounds[0]; // right - left
    screen_height = screen_bounds[1] - screen_bounds[3]; // top - bottom
    screen_ratio = screen_height/screen_width;
     
    zoom_factor_w = screen_width/sel_width;
    zoom_factor_h = screen_height/sel_height;

    //decide which proportion is larger...
    if((sel_width*screen_ratio) >= sel_height)
    {
        var zoom_factor = zoom_factor_w;
    }
    else
    {
        var zoom_factor = zoom_factor_h;
    }

    // center the view
    doc.views[0].centerPoint =  [mid_x, mid_y];
    doc.views[0].zoom = zoom_factor *.85;
}

function get_item_bounds(items)
{
    var bounds = items[0].visibleBounds;
    var left = bounds[0];
    var top = bounds[1];
    var right = bounds[2];
    var bottom = bounds[3];

    for (i in items)
    {
        bounds = items[i].visibleBounds;
        
        if (bounds[0] < left) left = bounds[0];
        if (bounds[1] > top) top = bounds[1];
        if (bounds[2] > right) right = bounds[2];
        if (bounds[3] < bottom) bottom = bounds[3];
    }
    return([left, top, right, bottom]);
}

doc = app.activeDocument;
sel = doc.selection;
item_bounds = get_item_bounds(sel)
zoom_to_fit(doc, item_bounds)

//bounds = sel[0].visibleBounds;
//zoom_to_fit(doc, bounds)
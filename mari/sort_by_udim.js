var f1 = "a_1002.tiff";
var f2 = "b_1003.tiff";
var f3 = "c_1001.tiff";
var f4 = "c_1005.tiff";

file_array = [f4, f2, f3, f1];
//var pattern = /^[\w ]*?_([\d]{4})(.jpg|.jpeg|.tif|.tiff|.png)$/;

// any word character [A-Za-z0-9_], period or white space
// followed by a dot or underscore (as a non capturing group ?:)
// followed by the UDIM 4 digit number as a capturing group
// followed by the file extension
var pattern = /^[\w \.]*?(?:\.|_)([\d]{4})(.jpg|.jpeg|.tif|.tiff|.png)$/;
var udim_object = {}

for (i in file_array)
{
	//debug(file_array[i]);
	var match_array = file_array[i].match(pattern);

	if(match_array)
	{
		udim_object[(match_array[1]).toString()] = file_array[i];
	}
}

/*
var keys = [];

for (k in udim_object)
{
    if (udim_object.hasOwnProperty(k))
    {
        keys.push(k);
    }
}
*/
keys = Object.keys(udim_object),
//len = keys.length;
//debug(len)

debug(keys)
keys.sort();
debug(keys)



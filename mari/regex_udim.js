var file_name = "1221.aksc.aks_apa.......____.a._1001.tiff";
//var pattern = /^[\w ]*?_([\d]{4})(.jpg|.jpeg|.tif|.tiff|.png)$/;

// any word character [A-Za-z0-9_], period or white space
// followed by a dot or underscore (as a non capturing group ?:)
// followed by the UDIM 4 digit number as a capturing group
// followed by the file extension
var pattern = /^[\w \.]*?(?:\.|_)([\d]{4})(.jpg|.jpeg|.tif|.tiff|.png)$/;

var match_array = file_name.match(pattern);

if(match_array)
{
	console.log(match_array[1]);
}
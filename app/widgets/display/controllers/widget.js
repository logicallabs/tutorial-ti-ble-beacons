/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false bitwise:true*/
/*global Alloy, arguments, $ */

var tmp = arguments; // We do this to get rid of JSLint warning.
var args = tmp[0] || {};

$.update = function(newValue) {
	$.valueLabel.backgroundColor = 'red';
	$.valueLabel.text = newValue;
	setTimeout(function() {
		$.valueLabel.backgroundColor = 'white';
	}, 100);
};

$.frontLabel.text = args.preText;
$.valueLabel.text = 'N/A';
$.backLabel.text = args.postText;
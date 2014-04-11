/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false bitwise:true*/
/*global Alloy, $ */

var 
	Beacons = Alloy.Globals.Beacons
;

Beacons.addEventListener('moduleReady', function() {
	$.label.text = 'Beacons Module is ready!';
});

$.index.open();

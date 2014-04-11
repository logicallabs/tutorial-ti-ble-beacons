/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false bitwise:true*/
/*global Alloy, $ */

var 
	Beacons = Alloy.Globals.Beacons,
	scanRunning = false
;

Beacons.addEventListener('moduleReady', function() {
	$.status.update('Beacons Module is ready!');
});

function toggleScan() {
	if (scanRunning) {
		scanRunning = false;
		$.toggleScanButton.title = 'Start scanning';
		$.status.update('Scanning stopped');
	} else {
		scanRunning = true;
		$.toggleScanButton.title = 'Stop scanning';
		$.status.update('Scanning started');
	}
}

$.index.open();

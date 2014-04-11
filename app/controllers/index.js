/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false bitwise:true*/
/*global Alloy, $ */

var 
	Beacons = Alloy.Globals.Beacons,
	scanRunning = false,
	beaconRegion,
	REGION_UUID = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
;

beaconRegion = Beacons.createBeaconRegion({
					UUID: REGION_UUID,
					identifier: 'Beacons'
			});
			
Beacons.addEventListener('moduleReady', function() {
	$.status.update('Beacons Module is ready!');
});

Beacons.addEventListener('regionStateUpdated', function(e) {
	var stateStr;
	
	switch(e.state) {
		case Beacons.REGION_STATE_UNKNOWN:
			stateStr = 'unknown';
			break;
		case Beacons.REGION_STATE_INSIDE:
			stateStr = 'inside.';
			break;
		case Beacons.REGION_STATE_OUTSIDE:
			stateStr = 'outside.';
			break;
	}
	$.status.update('Region state is now ' + stateStr);
});

function startScan() {
	Beacons.startRegionMonitoring({
		beaconRegion: beaconRegion
	});
}

function stopScan() {
	Beacons.stopRegionMonitoring({
		beaconRegion: beaconRegion
	});
}

function toggleScan() {
	if (scanRunning) {
		stopScan();
		scanRunning = false;
		$.toggleScanButton.title = 'Start scanning';
		$.status.update('Scanning stopped');
	} else {
		startScan();
		scanRunning = true;
		$.toggleScanButton.title = 'Stop scanning';
		$.status.update('Scanning started');
	}
}

$.index.open();

/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false bitwise:true*/
/*global Alloy, $ */

var 
	Beacons = Alloy.Globals.Beacons,
	scanRunning = false,
	rangingActive = false,
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

Beacons.addEventListener('rangedBeacons', function(e) {
	var tableData;

	if (!rangingActive) {
		// This is necessary because a rangedBeacons event might
		// be delivered after we call stopRangingBeacons.
		return;
	}
	
	tableData = [];
	e.beacons.forEach(function(beacon) {
		tableData.push({
			title: 'Major/minor/RSSI: ' +
					beacon.major + '/' + beacon.minor + '/' + beacon.RSSI
		});
	});
	$.table.setData(tableData);
});

function startRanging() {
	rangingActive = true;
	Beacons.startRangingBeacons({
		beaconRegion: beaconRegion
	});
}

function stopRanging() {
	rangingActive = false;
	Beacons.stopRangingBeacons({
		beaconRegion: beaconRegion
	});
	$.table.setData([]);
}

Beacons.addEventListener('regionStateUpdated', function(e) {
	var stateStr;
	
	switch(e.state) {
		case Beacons.REGION_STATE_UNKNOWN:
			stateStr = 'unknown';
			break;
		case Beacons.REGION_STATE_INSIDE:
			stateStr = 'inside.';
			startRanging();
			break;
		case Beacons.REGION_STATE_OUTSIDE:
			stateStr = 'outside.';
			stopRanging();
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
	stopRanging();
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

//BLE
let service        	= 0xBEEF;
let characteristic 	= 0xFEED;
let byteLength		= 20;
//IMU global vars for processing
let yaw   = 0.0;
let pitch = 0.0;
let roll  = 0.0;

window.onload = () => {
	document.getElementById('connect').onclick = connectBLE;
}

function connectBLE(){
	//BLE setup. Connect and get service/characteristic notifications
	navigator.bluetooth.requestDevice({ filters: [{ services: [service] }] })
	.then(device => device.gatt.connect())
	.then(server => server.getPrimaryService(service))
	.then(service => service.getCharacteristic(characteristic))
	.then(characteristic => {
		return characteristic.startNotifications()
		.then(_ => {
			characteristic.addEventListener('characteristicvaluechanged',
				handleCharacteristicValueChanged);
		});
	})
	.then(_ => {
		console.log('Notifications have been started.');
	})
	.catch(error => { console.log(error); });

	function handleCharacteristicValueChanged(event){
		var value 	= event.target.value;
		var str 	= "";

		//concat and split string for roll, pitch, yaw (e.g. "-0.58,2.20,328.76")
		for(var i=0; i<byteLength; i++){
			str = str + String.fromCharCode(value.getUint8(i));
		}
		var imu 	= str.split(',');

		//update globals
		roll 		= parseFloat(imu[0]);
		pitch 		= parseFloat(imu[1]);
		yaw 		= parseFloat(imu[2]);
	}
}


let deviceFilters = [
	{ vendorId: 0x1a86, productId: 0xe041 },
	{ vendorId: 0x1A86, productId: 0xE040 },
	{ vendorId: 0x5131, productId: 0x2007 }
];
let devices = [];

function handleConnectedDevice(event) {
	console.log("Device connected: " + event.device.productName);
	getDevices();
}

function handleDisconnectedDevice(event) {
	console.log("Device disconnected: " + event.device.productName);
	if(deviceFilters.some(df => event.device.vendorId === df.vendorId && event.device.productId === df.productId)) {
		// window.clearInterval(interval);
		event.device.close();
		//toggleButton("permissionsRequest", true);
		//toggleButton("switch", true);
	}
	getDevices();

}

function handleInputReport(e) {
	console.log(e.device.productName + ": got input report " + e.reportId);
	console.log(new Uint8Array(e.data.buffer));
}

navigator.hid.addEventListener("connect", handleConnectedDevice);
navigator.hid.addEventListener("disconnect", handleDisconnectedDevice);

document.addEventListener('DOMContentLoaded', async () => {
	getDevices();
	let permissionsRequestButton = document.getElementById("permissionsRequest");
	permissionsRequestButton.addEventListener("click", () => {
		navigator.hid.requestDevice({ 
			filters: deviceFilters
		}).then((devices) =>{
			getDevices();
		})
	});
});

function getDevices(){
	navigator.hid.getDevices({filters: deviceFilters}).then(d => {
		devices = d;
		let switches = document.getElementById("switches");
		switches.childNodes.forEach(c => switches.removeChild(c));
		devices.forEach((device, index) => {
			if(device.opened){
				addButton(index);
			}
			else{
				device.open().then(() => {
					addButton(index);
				}).catch(err => {
					console.log(err);
				});
			}
		});
	}).catch(err => {
		console.log(err);
	});
}
function addButton(whichButton){
	let but = document.createElement("button");
	but.innerText = "Switch " + whichButton;
	but.onclick = () => handleSwitchButton(whichButton);
	switches.appendChild(but);
}

function handleSwitchButton(whichButton){
	let device = devices[whichButton];
	const wValue = new Uint8Array([
		0x55, 0x02, 0x00, 0x00,
		0x00, 0x00, 0x00, 0x00
	]);
	device.sendReport(0, wValue).then(() => {
		console.log("Sent output report: "+ wValue);
	}).catch(err => {
		console.log(err + " " + wValue)
	})
}
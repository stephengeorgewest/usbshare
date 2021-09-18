document.addEventListener('DOMContentLoaded', async () => {
	let permissionsRequestButton = document.getElementById("switch");
	permissionsRequestButton.addEventListener("click", () => {
		navigator.hid.requestDevice({ 
			filters: [{ vendorId: 0x1a86, productId: 0xe041 }] 
		}).then((devices) =>{
			devices[0].open().then(() => {
				const wValue = new Uint8Array([
					0x55, 0x02, 0x00, 0x00,
					0x00, 0x00, 0x00, 0x00
				]);
				devices[0].sendReport(0, wValue).then(() => {
					console.log("Sent output report: "+ wValue);
				}).catch(err => {
					console.log(err + " " + wValue)
				})
			}).catch(err => {
				console.log(err);
			});
		}).catch(err => {
			console.log(err);
		});
	});
});
extern crate hidapi;

use hidapi::HidApi;
use tray_item::TrayItem;

fn main() {
	match TrayItem::new("Sharing Switch", "TRAYMISSINGICON"){
		Ok(mut tray) => {
			tray.add_menu_item("Switch", || {
				switch();
			}).unwrap();

			tray.add_menu_item("Quit", || {
				println!("Quit");
				std::process::exit(0);
			}).unwrap();

			tray.set_icon("TRAYREADYICON").unwrap();

			std::io::stdin().read_line(&mut String::new()).unwrap();
		},
		Err(e) => {
			eprintln!("tray creation error: {}", e);
		}
	}
}
fn switch() {
	let mut found = false;
	match HidApi::new() {
		Ok(api) => {
			for device in api.device_list() {
				if device.vendor_id() == 0x1a86 && device.product_id() == 0xe041 {
					found = true;
					println!("{:04x}:{:04x}, {:?}, {:?}",
						device.vendor_id(),
						device.product_id(),
						device.serial_number(),
						device.path()
					);
					
					match device.open_device(&api){
						Ok(hid_device) => {
							let data = [0x00, 0x55, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
							match hid_device.write(&data) {
								Ok(result) => {
									eprintln!("write: {}", result);
								},
								Err(e) => {
									eprintln!("write Error: {}", e);
								}
							}
						},
						Err(e) => {
							eprintln!("Open Error: {}", e);
						}
					}
				}
			}
		},
		Err(e) => {
			eprintln!("HIDApi Error: {}", e);
		},
	}
	if !found {
		println!("No device found");
	}
}
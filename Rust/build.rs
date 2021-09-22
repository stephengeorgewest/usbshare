#[cfg(windows)]
extern crate windres;
#[cfg(not(windows))]
extern crate gio;

#[cfg(windows)]
use windres::Build;

#[cfg(windows)]
fn main() { 
	Build::new().compile("resources/resources.rc").unwrap();
}

#[cfg(not(windows))]
fn main() {
	gio::compile_resources(
		"resources",
		"resources/resources.xml",
		"compiled.gresource",
	);
}
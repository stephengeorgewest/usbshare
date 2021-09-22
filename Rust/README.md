Build for windows dependencies listed in https://crates.io/crates/windres, I compiled using rc.exe from a windows 10 kit.

linux dependencies:
sudo apt install libappindicator3-dev
 which might not include
sudo apt instal libxapp-dev
 or
sudo apt-get install clang

sudo apt install libxml2-utils
 for glib-compile-resources --target=resources.c --generate-source resources.xml
sudo apt install libgtk-3-dev
 for glib-compile-resources
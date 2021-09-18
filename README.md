<h1>USBShare.exe</h1>

[Switch via WebHID](https://stephengeorgewest.github.io/usbshare/WebHID)

Usb sharing switch came with "drivers", an exe called "USBShare.exe". The active port connects to the internal hub, while all the other ports connect to a device "VID_1A86&PID_E041". That device switches to whichever port sends an HID report '0x5502000000000000' on interface 1.
```
Frame 31356: 44 bytes on wire (352 bits),
             44 bytes captured (352 bits) on interface wireshark_extcap2440, id 0
USB URB
    [Source: host]
    [Destination: 2.4.0]
    USBPcap pseudoheader length: 28
    IRP ID: 0xffff898c72c27010
    IRP USBD_STATUS: USBD_STATUS_SUCCESS (0x00000000)
    URB Function: URB_FUNCTION_CLASS_INTERFACE (0x001b)
    IRP information: 0x00, Direction: FDO -> PDO
        0000 000. = Reserved: 0x00
        .... ...0 = Direction: FDO -> PDO (0x0)
    URB bus id: 2
    Device address: 4
    Endpoint: 0x00, Direction: OUT
        0... .... = Direction: OUT (0)
        .... 0000 = Endpoint number: 0
    URB transfer type: URB_CONTROL (0x02)
    Packet Data Length: 16
    [Response in: 31357]
    Control transfer stage: Setup (0)
    [bInterfaceClass: HID (0x03)]
Setup Data
    bmRequestType: 0x21
        0... .... = Direction: Host-to-device
        .01. .... = Type: Class (0x1)
        ...0 0001 = Recipient: Interface (0x01)
    bRequest: SET_REPORT (0x09)
    wValue: 0x0200
        ReportID: 0
        ReportType: Output (2)
    wIndex: 0
    wLength: 8
    bRequest: 9
    wValue: 0x0200
    wIndex: 0 (0x0000)
    wLength: 8
    Data Fragment: 5502000000000000
```

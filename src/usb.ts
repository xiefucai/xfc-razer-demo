navigator.usb.getTotalDevices = async () => {
    const devices = await navigator.usb.getDevices();
    return devices.length;
}

navigator.usb.getDevices()
    .then(devices => {
        console.log("Total devices: " + devices.length);
        devices.forEach(device => {
            console.log("Product name: " + device.productName + ", serial number " + device.serialNumber);
        });
    });

document.getElementById('btn')?.addEventListener('click', () => {
    navigator.usb.getTotalDevices()
    .then((num) => {
        alert("getTotalDevices: " + num);
    });
}, false);

export { }
log = ChromeSamples.log;
function isWebBluetoothEnabled() {
  if (navigator.bluetooth) {
    return true;
  } else {
    ChromeSamples.setStatus('Web Bluetooth API is not available.\n' +
        'Please make sure the "Experimental Web Platform features" flag is enabled.');
    return false;
  }
}

import { Injectable } from '@angular/core';
import { BluetoothLe, BleClient, numberToUUID } from '@capacitor-community/bluetooth-le';
const HEART_RATE_SERVICE = numberToUUID(0x180d);
@Injectable({
  providedIn: 'root'
})
export class BleService {

  constructor() { }
  async scanForDevices() {
    await BleClient.initialize();
    const devices: any[] = []; // R
    const scanResult = await BleClient.requestLEScan({}, (result) => {
      if (result && result.device) {
        devices.push(result.device);
        console.log('Discovered device:', result.device);
      }
    });
    setTimeout(async () => {
      await BluetoothLe.stopLEScan();
    }, 5000);

    return devices;
  }
}

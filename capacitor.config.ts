import { BluetoothLe } from '@capacitor-community/bluetooth-le';
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'pre-testapp',
  webDir: 'www',
  "ios": {
    "icon":"os/App/App/Assets.xcassets/AppIcon.appiconset"
  },
  plugins:{
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: true,
      iosKeychainPrefix: 'angular-sqlite-app-starter',
      iosBiometric: {
        biometricAuth: false,
        biometricTitle : "Biometric login for capacitor sqlite"
      },
  },
  BluetoothLe: {
    "displayStrings": {
      "scanning": "Scanning...",
      "cancel": "Cancel",
      "availableDevices": "Available devices",
      "noDeviceFound": "No device found"
    }
  }
}};

export default config;

import { Device } from '../model/device';
import { DevicesMock } from './models';
export class DeviceProviderMock {
    constructor(private devicesMock: DevicesMock) {

    }
    all(): Promise<Device[]> {
        return new Promise((resolve) => {
            resolve(this.devicesMock.devices)
        })
    }

    get(id): Promise<Device> {
        return new Promise((resolve) => {
            resolve(this.devicesMock.devices[0])
        })
    }

    add(succeed): Promise<any> {
        return new Promise((resolve, reject) => {
            if (succeed) {
                resolve({ 'success': true });
            } else {
                reject({ 'success': false });
            }
        });
    }
    graphs() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}
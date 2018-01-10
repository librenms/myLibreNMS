import { Device } from '../model/device';
import { Port } from '../model/port';
import { Bill } from '../model/bill';
import { Alert } from '../model/alert';

export class DevicesMock {

    public devices: Device[] = [
        this.generate('host1'),
        this.generate('host2'),
        this.generate('host3'),
        this.generate('host4'),
        this.generate('host5', 0),
        this.generate('host6', 1, 1),
        this.generate('host7', 0, 0, 1)
    ]


    private generate(name, status: number = 1, ignore: number = 0, disabled: number = 0): Device {
        return new Device({
            device_id: (Math.random() * 1000) + 1,
            hostname: `${name}.example.com`,
            sysName: 'sysName',
            hardware: 'hardware',
            sysDesc: 'sysDesc',
            os: 'os',
            ip: `${this.ip()}.${this.ip()}.${this.ip()}.${this.ip()}`,
            notes: 'notes',
            status: status,
            ignore: ignore,
            disabled: disabled
        });
    }

    private ip(): number {
        return (Math.random() * 255) + 1;
    }
}


export class PortMock {

    public ports: Port[] = [
        this.generate('eth0'),
        this.generate('eth1'),
        this.generate('eth2'),
        this.generate('eth3'),
        this.generate('eth4')
    ]


    private generate(ifName): Port {
        return new Port({
            ifName: ifName
        });
    }
}

export class BillMock {

    public bills: Bill[] = [
        this.generate('bill1'),
        this.generate('bill2'),
        this.generate('bill3'),
        this.generate('bill4'),
        this.generate('bill5')
    ]


    private generate(name): Bill {
        return new Bill({
            bill_name: `${name}`,
            used: (Math.random() * 100) + 1,
            total_data_in: '10',
            total_data_out: '10',
            allowed: '100',
            bill_day: null,
            bill_last_calc: null
        });
    }
}


export class AlertMock {

    public alerts: Alert[] = [
        this.generate('host1'),
        this.generate('host2'),
        this.generate('host3'),
        this.generate('host4')
    ];

    private generate(name): Alert {
        return new Alert({
            id: (Math.random() * 1000) + 1,
            device_id: (Math.random() * 1000) + 1,
            hostname: `${name}.example.com`,
            hardware: 'hardware',
            rule_id: (Math.random() * 1000) + 1,
            timestamp: Date.now()
        });
    }
}

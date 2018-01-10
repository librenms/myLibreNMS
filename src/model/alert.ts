export class Alert {
    id: number;
    device_id: number;
    hostname: string;
    hardware: string;
    rule_id: number;
    timestamp: any;
    constructor(data) {
        this.device_id = data.device_id;
        this.hostname = data.hostname;
        this.id = data.id;
        this.hardware = data.hardware;
        this.rule_id = data.rule_id;
        this.timestamp = data.timestamp;
    }
}

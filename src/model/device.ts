export interface StatusInfo {
    status: boolean;
    colour: string;
    icon: string;
    state: string;
}

export class Device {
    device_id: number;
    hostname: string;
    sysName: string;
    hardware: string;
    sysDesc: string;
    os: string;
    ip: string;
    notes: string;
    status: any;
    ignore: any;
    disabled: any;
    constructor(data: any) {
        this.device_id = data.device_id;
        this.hostname = data.hostname;
        this.sysName = data.sysName;
        this.hardware = data.hardware;
        this.sysDesc = data.sysDesc;
        this.os = data.os;
        this.ip = data.ip;
        this.notes = data.notes;
        this.status = data.status;
        this.ignore = data.ignore;
        this.disabled = data.disabled;
    }

    isDown(): boolean {
        return this.status == "0" && this.disabled !== "1" && this.ignore !== "1";
    }

    isGood(): boolean {
        return this.status != "0";
    }

    isDisabled(): boolean {
        return this.disabled == "1";
    }

    isIgnored(): boolean {
        return this.ignore == "1" && !this.isDisabled();
    }

    getStatus(): StatusInfo {
        let statusInfo: StatusInfo = {
            status: this.isGood() && !this.isIgnored() && !this.isDisabled(),
            colour: '',
            icon: '',
            state: ''
        };

        if (this.isDisabled()) {
            statusInfo.colour = 'dark'
            statusInfo.icon = 'eye-off'
            statusInfo.state = 'disabled'
            return statusInfo;
        }

        if (this.isDown() && this.isIgnored()) {
            statusInfo.colour = 'danger'
            statusInfo.icon = 'volume-off'
            statusInfo.state = 'down & ignored'
            return statusInfo;
        }

        if (this.isDown()) {
            statusInfo.colour = 'danger'
            statusInfo.icon = 'alert'
            statusInfo.state = 'disabled'
            statusInfo.state = 'down'
            return statusInfo;
        }

        if (this.isIgnored()) {
            statusInfo.colour = 'dark'
            statusInfo.icon = 'volume-off'
            statusInfo.state = 'disabled'
            statusInfo.state = 'ignored'
            return statusInfo;
        }

        return statusInfo;
    }
}



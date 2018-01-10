export class Rule {
    hostname: string;
    name: string;
    severity: any;
    rule: string;
    timestamp: string;
    constructor(data) {
        this.hostname = data.hostname;
        this.name = data.name;
        this.severity = data.severity;
        this.rule = data.rule;
        this.timestamp = data.timestamp;
    }
}

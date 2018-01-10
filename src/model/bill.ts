export class Bill {
    bill_name: string;
    used: number;
    total_data_in: number;
    total_data_out: number;
    allowed: number;
    bill_day: any;
    bill_last_calc: any;
    constructor(data) {
        this.bill_name = data.bill_name;
        this.used = data.used;
        this.total_data_in = data.total_data_in;
        this.total_data_out = data.total_data_out;
        this.allowed = data.allowed;
        this.bill_day = data.bill_day;
        this.bill_last_calc = data.bill_last_calc;
    }
}

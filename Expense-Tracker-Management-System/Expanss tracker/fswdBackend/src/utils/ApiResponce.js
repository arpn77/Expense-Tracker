export class ApiResponce {
    constructor(statusCode, data, message = "Success", code = "SUCCESS") {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.code = code;
    }
}
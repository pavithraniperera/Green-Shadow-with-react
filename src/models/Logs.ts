export default class Logs{
    logId:string;
    logDetails:string;
    fieldId:string;
    cropId:string;
    staffId:string;
    status:string;
    image2:string;
    date:string | Date;

    constructor(
        logId: string,
        logDetails: string,
        fieldId: string,
        cropId: string,
        staffId: string,
        status: string,
        image2: string,
        date: string|Date
    ) {
        this.logId = logId;
        this.logDetails = logDetails;
        this.fieldId = fieldId;
        this.cropId = cropId;
        this.staffId = staffId;
        this.status = status;
        this.image2 = image2;
        this.date = date;
    }
}
export default class Logs{
    logId:string;
    description:string;
    field:string;
    crop:string;
    staff:string[];
    status:string;
    image:string;
    date:string | Date;

    constructor(
        logId: string,
        description: string,
        field: string,
        crop: string,
        staff: string[],
        status: string,
        image: string,
        date: string|Date
    ) {
        this.logId = logId;
        this.description = description;
        this.field = field;
        this.crop = crop;
        this.staff = staff;
        this.status = status;
        this.image = image;
        this.date = date;
    }
}
export class Field{
    fieldId: string;
    fieldname: string;
    fieldsize: number;
    location: string;
    image1: string;
    image2: string;

    constructor(fieldId: string, fieldname: string,fieldsize: number, location: string, image1: string, image2: string) {
        this.fieldId = fieldId;
        this.fieldname =fieldname;
        this.fieldsize=fieldsize;
        this.location=location;
        this.image1=image1;
        this.image2=image2;


    }
}

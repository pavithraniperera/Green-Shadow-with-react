export class Field{
    fieldId?: string;
    name: string;
    size: number;
    location: string;
    image1: string;
    image2: string;

    constructor( name: string,size: number, location: string, image1: string, image2: string,fieldId?: string,) {
        this.fieldId = fieldId;
        this.name =name;
        this.size=size;
        this.location=location;
        this.image1=image1;
        this.image2=image2;


    }
}

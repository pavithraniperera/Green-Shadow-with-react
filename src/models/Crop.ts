export default class Crop{
    cropId:string
    commonName:string
    specificName:string
    category:string
    season:string
    fieldId:string
    image1:string

    constructor(cropId:string,fieldId:string,commonName:string,specificName:string,category:string,season:string,image:string,){
        this.cropId = cropId;
        this.commonName = commonName;
        this.specificName = specificName;
        this.category = category;
        this.season = season;
        this.fieldId = fieldId;
        this.image1 = image;

    }

}
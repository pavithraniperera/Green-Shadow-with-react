export default class Equipment {
    equipmentId: string;
    name: string;
    type: string;
    status: string;
    remarks: string;
    staffId: string;
    fieldId: string;

    constructor(
        equipmentId: string,
        name: string,
        type: string,
        status: string,
        remarks: string,
        staffId: string ,
        fieldId: string
    ) {
        this.equipmentId = equipmentId;
        this.name = name;
        this.type = type;
        this.status = status;
        this.remarks = remarks;
        this.staffId = staffId;
        this.fieldId = fieldId;
    }


}
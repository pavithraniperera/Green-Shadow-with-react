export default class Equipment {
    equipmentId: string;
    name: string;
    type: string;
    status: string;
    remarks: string;
    assignedStaff: string;
    assignedFields: string;

    constructor(
        equipmentId: string,
        name: string,
        type: string,
        status: string,
        remarks: string,
        assignedStaff: string ,
        assignedFields: string
    ) {
        this.equipmentId = equipmentId;
        this.name = name;
        this.type = type;
        this.status = status;
        this.remarks = remarks;
        this.assignedStaff = assignedStaff;
        this.assignedFields = assignedFields;
    }


}
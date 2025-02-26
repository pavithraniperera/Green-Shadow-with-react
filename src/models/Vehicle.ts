export default class Vehicle {
    vehicleId: string;
    category: string;
    fuelType: string;
    plateNumber: string;
    status: string;
    staffId: string; // Array of staff IDs or names
    remarks: string;

    constructor(
        vehicleId: string,
        category: string,
        fuelType: string,
        licensePlate: string,
        status: string,
        allocatedStaff: string,
        remarks: string
    ) {
        this.vehicleId = vehicleId;
        this.category = category;
        this.fuelType = fuelType;
        this.plateNumber = licensePlate;
        this.status = status;
        this.staffId = allocatedStaff;
        this.remarks = remarks;
    }




}
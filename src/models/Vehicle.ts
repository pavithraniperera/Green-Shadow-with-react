export default class Vehicle {
    vehicleId: string;
    category: string;
    fuelType: string;
    licensePlate: string;
    status: string;
    allocatedStaff: string[]; // Array of staff IDs or names
    remarks: string;

    constructor(
        vehicleId: string,
        category: string,
        fuelType: string,
        licensePlate: string,
        status: string,
        allocatedStaff: string[],
        remarks: string
    ) {
        this.vehicleId = vehicleId;
        this.category = category;
        this.fuelType = fuelType;
        this.licensePlate = licensePlate;
        this.status = status;
        this.allocatedStaff = allocatedStaff;
        this.remarks = remarks;
    }




}
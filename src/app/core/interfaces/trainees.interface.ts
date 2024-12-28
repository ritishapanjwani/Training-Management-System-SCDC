
export interface Trainee {
  _id: string;
  name: string;
  hiringBusinessUnit: string;
  joiningDate: Date;
  location: string;
  mappedBusinessUnit: string;
  currentStatus: "In Training"| "Completed"| "On Leave";
}

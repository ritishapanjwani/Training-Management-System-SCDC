export interface Trainer {
    _id?: string;
    Trainername: string;
    businessUnit: string;
    expertise: string[];
    isAvailable: boolean;
    assignedPrograms: {
      program: string;
      module: string;
    }[];
    noOfHours: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
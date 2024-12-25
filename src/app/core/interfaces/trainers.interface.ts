export interface Trainer {
    _id: string;
    trainerName: string;
    businessUnit: string;
    status: 'Avilabel' | 'Not Availabel';
    expertise: string[],
    module: string[];
    topics: string[];
    noOfHours: number;
  }
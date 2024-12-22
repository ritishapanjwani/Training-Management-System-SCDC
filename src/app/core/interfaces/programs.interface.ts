import { Trainer } from "./trainers.interface";

export interface Program{
    _id?: string;
    module: string;
    topics: string[];
    dayHour: number;
    startDate: Date;
    endDate: Date;
    time: string;
    trainingMode: 'Online' | 'Offline';
    trainer: string | Trainer; // Can be either ID string or populated Trainer object
    status: 'Scheduled' | 'Ongoing' | 'Completed';
    referenceNotes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
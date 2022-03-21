import { Timestamp } from 'firebase/firestore';

export type todoGetDataType = {
  id: string|undefined;
  task: string;
  createdAt: Timestamp;
  isCompleted: boolean;
  isDeleted: boolean;
  isUpdated: boolean;
};

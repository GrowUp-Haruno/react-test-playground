import { Timestamp } from 'firebase/firestore';

export type todoDataType = {
  task: string;
  createdAt: Timestamp;
  isCompleted: boolean;
};

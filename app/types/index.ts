export interface Task {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface User {
    id: string;
    name: string | null;
    email: string | null;
  }
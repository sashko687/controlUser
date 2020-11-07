export interface FbResponse {
  name: string;
}

export interface User {
  id?: string;
  title?: string;
  type?: string;
  min?: number;
  max?: number ;
  maxLength: number;
  isRequired: string;
  order: string;
  сreated_at: string | number | Date;
  updated_at: string | number | Date;
}

/* Defines the product entity */
export interface Manager {
  id: number | null;
  managerName: string;
  company: string;
  description: string;
  tags?: string[];
  rating: number;
  imageUrl: string;
}


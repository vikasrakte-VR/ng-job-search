
export interface JobDetail {
  id: number;
  companyName: string;
  title: string;
  companyLogo: string;
  reference: string;
  location?: string;
  industries?: string[];
  types?: string[];
  description?: string;
  publishDate?: string;
  isFavorite ?: boolean;
}

export interface JobSummary {
  id: number;
  companyName: string;
  title: string;
  companyLogo: string;
  reference: string;
  isFavorite ?: boolean;
}

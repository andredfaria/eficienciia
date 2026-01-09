export interface BlogPost {
  id: number;
  title: string;
  url: string;
  published_date: string;
  score: string | number;
  content: string;
  raw_content: string;
  count: number;
  createdAt: string;
  updatedAt: string;
}

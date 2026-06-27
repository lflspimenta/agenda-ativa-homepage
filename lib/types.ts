export type UserAccess = {
  id: string;
  email: string;
  first_name: string | null;
  purchase_date: string;
  created_at: string;
};

export type DailyContent = {
  id: number;
  day: number;
  title: string;
  body: string;
  cta: string;
};

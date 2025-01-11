export type PaymentStatus = "Pending" | "Approved" | "Rejected";

export type DocumentStatus = "Pending" | "Approved" | "Rejected";

export type Payment = {
  id: string;
  title: string;
  amount: number;
  status: PaymentStatus;
  user_id: string;
  created_at: Date;
};

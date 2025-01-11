export type Role = "Admin" | "User";

export type PaymentStatus = "Pending" | "Approved" | "Rejected";

export type DocumentStatus = "Pending" | "Approved" | "Rejected";

export type User = {
  id: string;
  email: string;
  password: string;
  role: Role;
  created_at: Date;
};

export type Payment = {
  id: string;
  title: string;
  amount: number;
  status: PaymentStatus;
  user_id: string;
  created_at: Date;
};

export type Document = {
  id: string;
  user_id: string;
  file_url: string;
  status: DocumentStatus;
  uploaded_at: Date;
};

import Link from "next/link";
import { updatePaymentStatus } from "../services/services";
import { cookies } from "next/headers";
import { PaymentStatus } from "@/lib/types";

const approved: PaymentStatus = "Approved";

export default async function PaymentSuccess() {
  if ((await cookies()).get("last_payment")) {
    updatePaymentStatus(approved);
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <div className="mb-6">
          Thank you for your payment. Your transaction was successful. You will
          receive a confirmation email shortly.
        </div>
        <Link
          href="/"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

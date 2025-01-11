import { cookies } from "next/headers";
import Link from "next/link";
import { updatePaymentStatus } from "../services/services";
import { PaymentStatus } from "@/lib/types";

const rejected: PaymentStatus = "Rejected";

export default async function PaymentCancel() {
  if ((await cookies()).get("last_payment")) {
    updatePaymentStatus(rejected);
  }
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="mb-6">
          Your payment was not completed. If you believe this was an error,
          please try again or contact support.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

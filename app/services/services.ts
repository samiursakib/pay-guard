import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const createPaymentHistory = async (title: string, amount: number) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("payments")
    .insert([
      {
        title,
        amount,
        user_id: user?.id,
      },
    ])
    .select();
  if (error) {
    console.error(error);
  } else {
    console.log(data);
    return data?.[0].id;
  }
};

export const updatePaymentStatus = async (status: string) => {
  const supabase = await createClient();
  const lastPayment = (await cookies()).get("last_payment")?.value;
  console.log(lastPayment);
  const { data, error } = await supabase
    .from("payments")
    .update({ status })
    .eq("id", lastPayment);
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
};

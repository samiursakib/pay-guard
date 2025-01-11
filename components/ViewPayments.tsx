import { createClient } from "@/utils/supabase/server";
import { DataTable } from "./data-table";

export async function ViewPayments() {
  const supabase = await createClient();
  const { data } = await supabase.from("payments").select();
  console.log(data);
  return (
    <div>
      <DataTable data={data!} />
    </div>
  );
}

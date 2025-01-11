import CreatePayment from "@/components/CreatePayment";
import Hero from "@/components/hero";
import { ViewPayments } from "@/components/ViewPayments";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <>
      <main className="flex flex-col px-4">
        <Tabs defaultValue="create" className="w-full">
          <TabsList>
            <TabsTrigger value="create">
              <Hero text="Create A Payment" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <Hero text="View Payments" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <CreatePayment />
          </TabsContent>
          <TabsContent value="list">
            <ViewPayments />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

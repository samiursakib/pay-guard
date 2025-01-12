import CreatePayment from "@/components/CreatePayment";
import Hero from "@/components/hero";
import { ViewPayments } from "@/components/ViewPayments";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadDocumentForm from "@/components/UploadDocument";
import { ViewDocuments } from "@/components/ViewDocuments";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const isAdmin = user.user_metadata.role === "admin";
  return (
    <>
      <main className="flex flex-col px-4">
        <Tabs defaultValue={isAdmin ? "list" : "create"} className="w-full">
          <TabsList>
            {isAdmin ? (
              <></>
            ) : (
              <>
                <TabsTrigger value="create">
                  <Hero text="Create A Payment" />
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <Hero text="Upload a file" />
                </TabsTrigger>
              </>
            )}
            <TabsTrigger value="list">
              <Hero text="View Payments" />
            </TabsTrigger>
            <TabsTrigger value="documents">
              <Hero text="View Documents" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <CreatePayment />
          </TabsContent>
          <TabsContent value="list">
            <ViewPayments />
          </TabsContent>
          <TabsContent value="upload">
            <UploadDocumentForm />
          </TabsContent>
          <TabsContent value="documents">
            <ViewDocuments />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

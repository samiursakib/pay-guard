import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const supabase = await createClient();

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded", success: false },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.storage
      .from("pay_guard_bucket")
      .upload((file as File).name, file);

    if (error) {
      return NextResponse.json(
        { error: error.message, success: false },
        { status: 500 }
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error: insertError } = await supabase.from("documents").insert([
      {
        user_id: user?.id,
        file_url: data.fullPath,
      },
    ]);
    if (insertError) {
      console.error(insertError);
    }

    return NextResponse.json(
      { message: "File uploaded successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, success: false },
      { status: 500 }
    );
  }
}

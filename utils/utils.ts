import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export async function signInWithRole(
  email: string,
  password: string,
  role: string,
  supabase: SupabaseClient
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  const res = await supabase.from("users").select();

  if (error) {
    console.error("Error signing in:", error);
    return { data: null, error: new Error("Error signing in") };
  }

  const { data: userRoleData, error: roleError } = await supabase
    .from("users")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (roleError) {
    console.error("Error fetching user role:", roleError);
    return { data: null, error: new Error("Error fetching user role") };
  }

  if (userRoleData.role !== role) {
    console.error("Role mismatch: Access denied");
    await supabase.auth.signOut();
    return { data: null, error: new Error("Role mismatch: Access denied") };
  }

  return { data: true, error: null };
}

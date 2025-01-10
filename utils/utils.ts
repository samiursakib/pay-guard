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
  // Step 1: Sign in the user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  const res = await supabase.from("users").select();

  if (error) {
    console.error("Error signing in:", error);
    return { data: null, error: new Error("Error signing in") };
  }

  // Step 2: Fetch the user's role from the database
  const { data: userRoleData, error: roleError } = await supabase
    .from("users") // Adjust this to your users table name
    .select("role")
    .eq("id", data.user.id) // Match the authenticated user ID
    .single(); // Fetch a single record

  if (roleError) {
    console.error("Error fetching user role:", roleError);
    return { data: null, error: new Error("Error fetching user role") };
  }

  // Step 3: Check if the role matches
  if (userRoleData.role !== role) {
    console.error("Role mismatch: Access denied");
    // Optional: Sign out the user if role is incorrect
    await supabase.auth.signOut();
    return { data: null, error: new Error("Role mismatch: Access denied") };
  }

  return { data: true, error: null };
}

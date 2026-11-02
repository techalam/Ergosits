import supabase from "./supabase";

/** Checks the trusted Supabase app_metadata role for the current user. */
export async function isAdmin() {
  const { data, error } = await supabase.auth.getUser();
  return !error && data.user?.app_metadata?.role === "admin";
}

export async function requireAdmin(router) {
  const allowed = await isAdmin();
  if (!allowed) {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }
  return allowed;
}

export const isAdminRoute = (pathname) => pathname === "/admin" || pathname.startsWith("/admin/");

export function getAdminDestination({ pathname, standalone, admin = false }) {
  if (!standalone) return isAdminRoute(pathname) ? "/" : null;

  const landing = admin ? "/admin/dashboard" : "/admin/login";
  if (!isAdminRoute(pathname) || pathname === "/admin") return landing;
  if (pathname === "/admin/login") return admin ? landing : null;
  return admin ? null : landing;
}

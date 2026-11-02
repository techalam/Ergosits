import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";
import { isAdmin } from "@/lib/adminAuth";
import Loader from "./admin/Loader";

export default function AdminBoundary({ children }) {
  const router = useRouter();
  const [checkedPath, setCheckedPath] = useState(null);
  const [error, setError] = useState(false);
  const adminRoute = router.pathname === "/admin" || router.pathname.startsWith("/admin/");

  useEffect(() => {
    let active = true;
    let revision = 0;
    const check = async () => {
      const current = ++revision;
      try {
        const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
        const { data } = await supabase.auth.getSession();
        const admin = data.session ? await isAdmin() : false;
        if (!active || current !== revision) return;
        let destination;
        if (admin && (!adminRoute || router.pathname === "/admin/login")) destination = "/admin/dashboard";
        else if (standalone && !adminRoute) destination = admin ? "/admin/dashboard" : "/admin/login";
        else if (adminRoute && router.pathname !== "/admin/login" && !admin) destination = "/admin/login";
        if (destination) {
          setCheckedPath(null);
          await router.replace(destination);
        } else setCheckedPath(router.asPath);
      } catch {
        if (active && current === revision) setError(true);
      }
    };
    check();
    // Defer Supabase calls until the auth callback releases its internal lock.
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      // Keep open forms mounted during token refresh and failed login attempts.
      if (event === "SIGNED_OUT" && adminRoute && router.pathname !== "/admin/login") setCheckedPath(null);
      setTimeout(() => { if (active) check(); }, 0);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, [router.asPath, router.pathname, adminRoute, router]);

  if (error) return (
    <div role="alert" className="min-h-screen flex flex-col items-center justify-center gap-4 bg-canvas text-foreground px-6 text-center">
      <p>Unable to verify your session. Check your connection and try again.</p>
      <button onClick={() => window.location.reload()} className="rounded-full border px-6 py-3">Try again</button>
    </div>
  );
  return checkedPath === router.asPath ? children : <Loader />;
}

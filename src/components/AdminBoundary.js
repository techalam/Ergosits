import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "@/lib/supabase";
import { isAdmin } from "@/lib/adminAuth";
import Loader from "./admin/Loader";
import { getAdminDestination, isAdminRoute } from "@/lib/adminRouting.mjs";

export default function AdminBoundary({ children }) {
  const router = useRouter();
  const [checkedPath, setCheckedPath] = useState(null);
  const [error, setError] = useState(false);
  const adminRoute = isAdminRoute(router.pathname);

  useEffect(() => {
    let active = true;
    let revision = 0;
    const displayMode = window.matchMedia("(display-mode: standalone)");
    const check = async () => {
      const current = ++revision;
      try {
        const standalone = displayMode.matches || window.navigator.standalone === true;
        let admin = false;
        // Browser tabs only serve the storefront, regardless of any saved login.
        if (standalone) {
          const { data } = await supabase.auth.getSession();
          admin = data.session ? await isAdmin() : false;
        }
        if (!active || current !== revision) return;
        const destination = getAdminDestination({ pathname: router.pathname, standalone, admin });
        if (destination) {
          setCheckedPath(null);
          await router.replace(destination);
        } else setCheckedPath(router.asPath);
      } catch {
        if (active && current === revision) setError(true);
      }
    };
    const handleDisplayChange = () => {
      setCheckedPath(null);
      check();
    };
    displayMode.addEventListener("change", handleDisplayChange);
    check();
    // Defer Supabase calls until the auth callback releases its internal lock.
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      // Keep open forms mounted during token refresh and failed login attempts.
      if (event === "SIGNED_OUT" && adminRoute && router.pathname !== "/admin/login") setCheckedPath(null);
      setTimeout(() => { if (active) check(); }, 0);
    });
    return () => {
      active = false;
      displayMode.removeEventListener("change", handleDisplayChange);
      listener.subscription.unsubscribe();
    };
  }, [router.asPath, router.pathname, adminRoute, router]);

  if (error) return (
    <div role="alert" className="min-h-screen flex flex-col items-center justify-center gap-4 bg-canvas text-foreground px-6 text-center">
      <p>Unable to verify your session. Check your connection and try again.</p>
      <button onClick={() => window.location.reload()} className="rounded-full border px-6 py-3">Try again</button>
    </div>
  );
  return checkedPath === router.asPath ? children : <Loader />;
}

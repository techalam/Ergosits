import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/supabase";
import ThemeToggle from "../../components/ThemeToggle";
import { FiLock } from "react-icons/fi";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
      if (data.user?.app_metadata?.role !== "admin") {
        await supabase.auth.signOut();
        throw new Error("This account does not have admin access.");
      }
      await router.replace("/admin/dashboard");
    } catch (error) {
      setError(error.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-foreground">
      <header className="flex items-center justify-between px-6 py-5">
        <span className="text-xl font-bold tracking-tight">Ergosits <span className="text-muted text-xs font-medium ml-2">ADMIN</span></span>
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-10">

      <form
        onSubmit={handleLogin}
        className="bg-surface border border-line p-6 sm:p-10 rounded-3xl shadow-xl shadow-black/5 w-full max-w-md"
      >

        <div className="mx-auto mb-5 w-14 h-14 bg-canvas rounded-2xl flex items-center justify-center"><FiLock size={24} /></div>
        <h1 className="text-3xl font-semibold mb-2 text-center">
          Admin Login
        </h1>

        <p className="text-muted text-sm text-center mb-8">Sign in to manage your store.</p>

        {error && (
          <p role="alert" className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <label htmlFor="admin-email" className="block text-sm font-medium mb-2">Email address</label>
        <input
          id="admin-email"
          autoComplete="username"
          required
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl px-4 py-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="admin-password" className="block text-sm font-medium mb-2">Password</label>
        <input
          id="admin-password"
          autoComplete="current-password"
          required
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl px-4 py-3 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded-xl"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
      </main>

    </div>
  );
}

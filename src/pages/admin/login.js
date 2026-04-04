import { useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../lib/supabase";

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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // 🔐 Only allow YOU
    if (data.user.email !== "support.ergosits@gmail.com") {
      await supabase.auth.signOut();
      setError("Unauthorized access");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">

      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-semibold mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl px-4 py-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
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

    </div>
  );
}
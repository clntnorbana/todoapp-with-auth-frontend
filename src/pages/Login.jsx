import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <form
      className="flex flex-col gap-2 bg-zinc-600 p-7 rounded-md"
      onSubmit={handleSubmit}
    >
      <h3 className="text-3xl mb-5">Login</h3>

      <label className="font-bold">Email:</label>
      <input
        className="p-2 rounded-md focus:outline-none bg-zinc-500 focus:bg-zinc-600 focus:ring"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label className="font-bold">Password:</label>
      <input
        className="p-2 rounded-md focus:outline-none bg-zinc-500 focus:bg-zinc-600 focus:ring"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button
        disabled={isLoading}
        type="submit"
        className="bg-blue-400 p-2 rounded-md mt-4 shadow-md font-bold hover:bg-blue-300"
      >
        Login
      </button>
      {error && (
        <div className="text-center text-sm border-2 border-red-300 mt-3 p-2">
          {error}
        </div>
      )}
    </form>
  );
};

export default Login;

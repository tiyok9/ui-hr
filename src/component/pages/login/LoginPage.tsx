import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "../../../hooks/useAuth";
import api from "../../../services/axios";
import toast from "react-hot-toast";

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post("/login", {
        username: data.username,
        password: data.password,
        expiresInMins: 30,
      });

      login({
        token: res.data.access_token,
        refreshToken: res.data.refresh_token,
        role: "admin",
      });
    } catch (error: any) {
      toast.error("Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("username")}
            placeholder="Username"
            className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-2 rounded pr-10 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 hover:cursor-pointer  top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 transition hover:cursor-pointer text-white p-2 rounded font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

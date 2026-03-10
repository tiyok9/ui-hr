import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, User, Lock } from "lucide-react";

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
        role: res.data.user.role,
        user: res.data.user,
      });
    } catch (error: any) {
      toast.error("Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
          <p className="text-purple-100">
            Login untuk mengakses dashboard dan melihat semua aktivitas terbaru
            dari sistem Anda.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-[380px]">
          <h2 className="text-2xl font-bold text-center mb-2">Login Account</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Masukkan username dan password Anda
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                {...register("username")}
                placeholder="Username"
                className="w-full border border-gray-200 pl-10 pr-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-gray-200 pl-10 pr-10 py-2 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

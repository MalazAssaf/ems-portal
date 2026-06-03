"use client";

import { loginApi } from "@/api/auth";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import useAuthStore from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");

      const response = await loginApi(data);
      const { username, role } = response.data;

      setAuth({ username, role });

      if (role === "ADMIN") router.push("/admin/dashboard");
      else if (role === "MANAGER") router.push("/manager/dashboard");
      else router.push("/employee/profile");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errors = err.response?.data?.errors;
        setServerError(errors?.[0]?.message ?? "Invalid username or password");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center text-white text-xs font-medium"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            EMS
          </div>
          <span
            className="text-base font-medium"
            style={{ color: "var(--color-ink)" }}
          >
            EMS Portal
          </span>
        </div>

        {/* Card */}
        <div
          className="bg-white px-6 py-8 rounded-lg border-2 shadow-md"
          style={{ borderColor: "var(--color-border)" }}
        >
          <h1
            className="text-lg font-medium mb-1 text-center"
            style={{ color: "var(--color-ink)" }}
          >
            Welcome back
          </h1>
          <p
            className="text-sm mb-6 text-center"
            style={{ color: "var(--color-ink-secondary)" }}
          >
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Server error */}
            {serverError && (
              <div
                className="text-sm px-4 py-3 rounded-md border"
                style={{
                  backgroundColor: "var(--color-danger-light)",
                  borderColor: "var(--color-danger-border)",
                  color: "var(--color-danger-text)",
                }}
              >
                {serverError}
              </div>
            )}

            {/* Username */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--color-ink-secondary)" }}
              >
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                placeholder="Enter your username"
                className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-all"
                style={{
                  borderColor: errors.username
                    ? "var(--color-danger)"
                    : "var(--color-border)",
                  backgroundColor: errors.username
                    ? "var(--color-danger-light)"
                    : "white",
                  color: "var(--color-ink)",
                }}
              />
              {errors.username && (
                <p
                  className="text-xs mt-1.5"
                  style={{ color: "var(--color-danger-text)" }}
                >
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="text-sm font-medium"
                  style={{ color: "var(--color-ink-secondary)" }}
                >
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="text-sm"
                  style={{ color: "var(--color-primary)" }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2.5 pr-10 text-sm rounded-md border outline-none transition-all"
                  style={{
                    borderColor: errors.password
                      ? "var(--color-danger)"
                      : "var(--color-border)",
                    backgroundColor: errors.password
                      ? "var(--color-danger-light)"
                      : "white",
                    color: "var(--color-ink)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--color-ink-tertiary)" }}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  className="text-xs mt-1.5"
                  style={{ color: "var(--color-danger-text)" }}
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="text-center text-sm mt-6"
          style={{ color: "var(--color-ink-tertiary)" }}
        >
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer"
            style={{ color: "var(--color-primary)" }}
          >
            Contact your admin
          </span>
        </p>
      </div>
    </div>
  );
}

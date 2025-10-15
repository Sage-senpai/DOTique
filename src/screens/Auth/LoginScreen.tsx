import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../stores/authStore";
import AuthLayout from "./AuthLayout";
import "./login.scss";

type LoginForm = { email: string; password: string };

export default function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [loading, setLoading] = useState(false);
  const setSession = useAuthStore((s) => s.setSession);

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) return alert(error.message);
      setSession(loginData.session);
      alert("Welcome back!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your account">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-input-group">
          <label>Email</label>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email required" }}
            render={({ field: { onChange, value } }) => (
              <input
                type="email"
                className={`auth-input ${errors.email ? "input-error" : ""}`}
                placeholder="Enter your email"
                value={value || ""}
                onChange={onChange}
              />
            )}
          />
          {errors.email && <p className="auth-error">{errors.email.message}</p>}
        </div>

        <div className="auth-input-group">
          <label>Password</label>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password required" }}
            render={({ field: { onChange, value } }) => (
              <input
                type="password"
                className={`auth-input ${errors.password ? "input-error" : ""}`}
                placeholder="Enter your password"
                value={value || ""}
                onChange={onChange}
              />
            )}
          />
          {errors.password && <p className="auth-error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-footer">
          Forgot password? <a href="/forgot-password" className="auth-link">Reset</a>
        </p>
      </form>
    </AuthLayout>
  );
}

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../stores/authStore";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./authlayout.scss";

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
      if (error) {
        alert(error.message);
        return;
      }
      setSession(loginData.session ?? null);
    } catch (err: any) {
      alert(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your account">
      <motion.form
        className="auth-form"
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="auth-input-group">
          <label htmlFor="email">Email</label>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email required" }}
            render={({ field: { onChange, value } }) => (
              <input
                id="email"
                type="email"
                className={`auth-input ${errors.email ? "input-error" : ""}`}
                placeholder="Enter your email"
                value={value ?? ""}
                onChange={onChange}
                autoComplete="email"
              />
            )}
          />
          {errors.email && <p className="auth-error">{errors.email.message}</p>}
        </div>

        <div className="auth-input-group">
          <label htmlFor="password">Password</label>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password required" }}
            render={({ field: { onChange, value } }) => (
              <input
                id="password"
                type="password"
                className={`auth-input ${errors.password ? "input-error" : ""}`}
                placeholder="Enter your password"
                value={value ?? ""}
                onChange={onChange}
                autoComplete="current-password"
              />
            )}
          />
          {errors.password && <p className="auth-error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="auth-footer">
          <Link to="/forgot-password" className="auth-link subtle">
            Forgot password?
          </Link>

          <div className="auth-switch">
            <span>Don’t have an account?</span>
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </div>
        </div>
      </motion.form>
    </AuthLayout>
  );
}

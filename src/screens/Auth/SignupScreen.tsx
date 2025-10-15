import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../stores/authStore";
import AuthLayout from "./AuthLayout";
import "./signup.scss";

type SignupForm = { email: string; password: string; confirmPassword: string };

export default function SignupScreen() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<SignupForm>();
  const [loading, setLoading] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const session = useAuthStore((s) => s.session);
  const setProfile = useAuthStore((s) => s.setProfile);
  const setSession = useAuthStore((s) => s.setSession);

  const password = watch("password");

  const onSubmit = async (data: SignupForm) => {
    if (!agreedToPolicy) {
      alert("Please agree to the privacy policy to continue.");
      return;
    }

    try {
      setLoading(true);
      const { data: signUpData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        alert(authError.message);
        return;
      }

      if (signUpData?.user) {
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("auth_uid", signUpData.user.id)
          .single();

        setSession(signUpData.session);
        setProfile(profile);
        alert("Account created successfully!");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Sign up to continue">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-input-group">
          <label>Email Address</label>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="email"
                className={`auth-input ${errors.email ? "input-error" : ""}`}
                placeholder="Enter email address"
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
            rules={{ required: "Password required", minLength: { value: 6, message: "Min 6 characters" } }}
            render={({ field: { onChange, value } }) => (
              <input
                type="password"
                className={`auth-input ${errors.password ? "input-error" : ""}`}
                placeholder="Create password"
                value={value || ""}
                onChange={onChange}
              />
            )}
          />
          {errors.password && <p className="auth-error">{errors.password.message}</p>}
        </div>

        <div className="auth-input-group">
          <label>Confirm Password</label>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Confirm password",
              validate: (value) => value === password || "Passwords don't match",
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="password"
                className={`auth-input ${errors.confirmPassword ? "input-error" : ""}`}
                placeholder="Re-enter password"
                value={value || ""}
                onChange={onChange}
              />
            )}
          />
          {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword.message}</p>}
        </div>

        <div className="auth-checkbox">
          <input type="checkbox" checked={agreedToPolicy} onChange={() => setAgreedToPolicy(!agreedToPolicy)} />
          <span>I agree with privacy policy</span>
        </div>

        <button type="submit" className="auth-button" disabled={loading || !agreedToPolicy}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="auth-footer">
          Already have an account? <a href="/login" className="auth-link">Login</a>
        </p>
      </form>
    </AuthLayout>
  );
}

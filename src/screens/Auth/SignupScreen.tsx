import  { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../stores/authStore";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./authlayout.scss";

type SignupForm = { email: string; password: string; confirmPassword: string };

export default function SignupScreen() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<SignupForm>();
  const [loading, setLoading] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

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

        setSession(signUpData.session ?? null);
        setProfile(profile ?? null);
        alert("Account created successfully!");
      }
    } catch (err: any) {
      alert(err.message ?? "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Sign up to continue">
      <motion.form
        className="auth-form"
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="auth-input-group">
          <label htmlFor="email">Email Address</label>
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
                id="email"
                type="email"
                className={`auth-input ${errors.email ? "input-error" : ""}`}
                placeholder="Enter email address"
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
            rules={{ required: "Password required", minLength: { value: 6, message: "Min 6 characters" } }}
            render={({ field: { onChange, value } }) => (
              <input
                id="password"
                type="password"
                className={`auth-input ${errors.password ? "input-error" : ""}`}
                placeholder="Create password"
                value={value ?? ""}
                onChange={onChange}
                autoComplete="new-password"
              />
            )}
          />
          {errors.password && <p className="auth-error">{errors.password.message}</p>}
        </div>

        <div className="auth-input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Confirm password",
              validate: (value) => value === password || "Passwords don't match",
            }}
            render={({ field: { onChange, value } }) => (
              <input
                id="confirmPassword"
                type="password"
                className={`auth-input ${errors.confirmPassword ? "input-error" : ""}`}
                placeholder="Re-enter password"
                value={value ?? ""}
                onChange={onChange}
                autoComplete="new-password"
              />
            )}
          />
          {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword.message}</p>}
        </div>

        <label className="auth-checkbox">
          <input
            type="checkbox"
            checked={agreedToPolicy}
            onChange={() => setAgreedToPolicy((s) => !s)}
          />
          <span>I agree with privacy policy</span>
        </label>

        <button type="submit" className="auth-button" disabled={loading || !agreedToPolicy}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <div className="auth-footer">
          <div>
            <span>Already have an account?</span>{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </div>
        </div>
      </motion.form>
    </AuthLayout>
  );
}

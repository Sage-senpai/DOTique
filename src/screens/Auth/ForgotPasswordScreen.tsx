import React from "react";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "./AuthLayout";
import { supabase } from "../../services/supabase";
import "./forgotpassword.scss";

type ForgotForm = { email: string };

const ForgotPasswordScreen: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ForgotForm>();

  const onSubmit = async (data: ForgotForm) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email);
      if (error) throw error;
      alert("Reset link sent! Check your email.");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="Reset your account access">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="auth-label">Email Address</label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="Enter your email"
              className={`auth-input ${errors.email ? "input-error" : ""}`}
            />
          )}
        />
        {errors.email && <p className="auth-error">{errors.email.message}</p>}

        <button className="auth-button">Send Reset Link</button>

        <p className="auth-footer">
          Remembered your password?{" "}
          <a href="/login" className="auth-link">
            Back to Login
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;

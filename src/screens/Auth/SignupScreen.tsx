// src/screens/Auth/SignupScreen.tsx 
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../stores/authStore";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./authlayout.scss";

type SignupForm = { email: string; password: string; confirmPassword: string };

export default function SignupScreen() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<SignupForm>();
  const [loading, setLoading] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const setProfile = useAuthStore((s) => s.setProfile);
  const setSession = useAuthStore((s) => s.setSession);

  const password = watch("password");

  // Helper to check Supabase connection
  const checkConnection = async () => {
    try {
      const { error } = await supabase.from('profiles').select('count').limit(1);
      return !error;
    } catch {
      return false;
    }
  };

  const onSubmit = async (data: SignupForm) => {
    if (!agreedToPolicy) {
      setErrorMessage("Please agree to the privacy policy to continue.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      console.log("🔐 Starting signup process...");
      
      // Pre-flight check
      const isConnected = await checkConnection();
      if (!isConnected) {
        throw new Error("Cannot connect to Supabase. Please check your internet connection and Supabase configuration.");
      }

      // Step 1: Sign up with Supabase Auth
      console.log("📝 Creating auth user...");
      const { data: signUpData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            display_name: "New User",
            username: `user_${Date.now().toString().slice(-8)}`,
          }
        }
      });

      if (authError) {
        console.error("❌ Auth error:", authError);
        
        // Better error messages
        if (authError.message.includes("fetch")) {
          throw new Error("Network error. Please check your Supabase configuration and try again.");
        } else if (authError.message.includes("already registered")) {
          throw new Error("This email is already registered. Please login instead.");
        } else {
          throw new Error(authError.message);
        }
      }

      if (!signUpData?.user) {
        throw new Error("Signup failed: No user data returned.");
      }

      console.log("✅ Auth user created:", signUpData.user.id);

      // Step 2: Check if email confirmation is required
      if (signUpData.user.identities?.length === 0) {
        setErrorMessage("⚠️ Please check your email to confirm your account before logging in.");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      // Step 3: Create or fetch profile
      console.log("👤 Setting up profile...");
      
      // Wait a moment for any database triggers
      await new Promise(resolve => setTimeout(resolve, 500));

      let profile = null;
      
      // Try to fetch existing profile first
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("auth_uid", signUpData.user.id)
        .maybeSingle();

      if (existingProfile) {
        profile = existingProfile;
        console.log("✅ Profile found via trigger:", profile.id);
      } else {
        // Create profile manually
        console.log("🧩 Creating profile manually...");
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert({
            auth_uid: signUpData.user.id,
            email: data.email,
            username: `user_${signUpData.user.id.slice(0, 8)}`,
            display_name: "New User",
          })
          .select()
          .single();

        if (createError) {
          console.error("❌ Profile creation error:", createError);
          throw new Error(`Failed to create profile: ${createError.message}`);
        }

        profile = newProfile;
        console.log("✅ Profile created:", profile.id);
      }

      // Step 4: Set session and profile in store
      if (signUpData.session) {
        setSession(signUpData.session);
        console.log("✅ Session set");
      }

      if (profile) {
        setProfile(profile);
        console.log("✅ Profile set in store");
      }

      // Step 5: Success - navigate to home
      console.log("🎉 Signup complete!");
      navigate("/home");

    } catch (err: any) {
      console.error("❌ Signup error:", err);
      
      // User-friendly error message
      const message = err.message || "Sign up failed. Please try again.";
      setErrorMessage(message);
      
      // Log detailed error for debugging
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        console.error("🔴 FETCH ERROR - Possible causes:");
        console.error("1. Supabase URL/Key not configured");
        console.error("2. CORS issues");
        console.error("3. Network connectivity");
        console.error("4. Supabase project paused");
        setErrorMessage("Connection failed. Please check your Supabase configuration.");
      }
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
        {errorMessage && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#fee', 
            border: '1px solid #fcc',
            borderRadius: '8px',
            marginBottom: '16px',
            color: '#c33'
          }}>
            {errorMessage}
          </div>
        )}

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
          {loading ? "Creating Account..." : "Sign Up"}
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
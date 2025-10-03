// src/screens/Auth/SignupScreen.tsx
import React from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../store/authStore";
import { styles } from "./SignupScreen.styles";

type SignupForm = { email: string; password: string };

export default function SignupScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm<SignupForm>();
  const [loading, setLoading] = React.useState(false);

  const setProfile = useAuthStore((s) => s.setProfile);
  const setSession = useAuthStore((s) => s.setSession);

  const onSubmit = async (data: SignupForm) => {
    try {
      setLoading(true);

      // Step 1: Create Supabase Auth user
      const { data: signUpData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        console.error("Auth signup error:", authError);
        Alert.alert("Signup Error", authError.message);
        return;
      }

      if (signUpData?.user) {
        // Step 2: Upsert into profiles table
        const { data: upsertedProfile, error: dbError } = await supabase
          .from("profiles") // ✅ now using profiles
          .upsert(
            [{
              auth_uid: signUpData.user.id,
              email: signUpData.user.email,
              username: signUpData.user.email?.split("@")[0],
              display_name: signUpData.user.email,
              profile_image_url: null,
              dotvatar_config: {}, // ✅ default
            }],
            { onConflict: "email" } // ✅ avoids duplicate key errors
          )
          .select("*")
          .single();

        if (dbError) {
          console.error("DB Error inserting profile:", dbError);
          Alert.alert("Database Error", dbError.message);
          return;
        }

        // Step 3: Save in Zustand
        setSession(signUpData.session);
        setProfile(upsertedProfile);

        // ✅ Success + redirect
        Alert.alert("Account Created ✅", "Your account has been created successfully!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    } catch (err: any) {
      console.error("Unexpected signup error:", err);
      Alert.alert("Unexpected Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Controller
        control={control}
        name="email"
        rules={{ required: "Email required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password required",
          minLength: { value: 6, message: "Min 6 characters" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
      )}

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Log in
      </Text>
    </View>
  );
}

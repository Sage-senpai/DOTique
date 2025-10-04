// src/screens/Auth/LoginScreen.tsx
import React, { useEffect } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../store/authStore";
import { styles } from "./LoginScreen.styles";

type LoginForm = { email: string; password: string };

export default function LoginScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [loading, setLoading] = React.useState(false);

  const session = useAuthStore((s) => s.session);
  const setSession = useAuthStore((s) => s.setSession);
  const setProfile = useAuthStore((s) => s.setProfile);

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (session) {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  }, [session]);

  const onSubmit = async (formData: LoginForm) => {
    try {
      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        Alert.alert("Login Failed", authError.message);
        return;
      }
      if (!authData.user) {
        Alert.alert("Error", "No user returned from authentication.");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("auth_uid", authData.user.id)
        .single();

      if (profileError) {
        Alert.alert("Profile Error", profileError.message);
        return;
      }

      setSession(authData.session);
      setProfile(profile);

      // ✅ Decide: Onboarding or Home
      const seen = await AsyncStorage.getItem("hasSeenOnboarding");
      if (!seen) {
        navigation.reset({ index: 0, routes: [{ name: "Onboarding" }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
    } catch (err: any) {
      Alert.alert("Unexpected Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        rules={{ required: "Password required" }}
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

      {loading ? <ActivityIndicator /> : <Button title="Login" onPress={handleSubmit(onSubmit)} />}

      <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
        Don’t have an account? Sign up
      </Text>
      <Text style={styles.link} onPress={() => navigation.navigate("ForgotPassword")}>
        Forgot password?
      </Text>
    </View>
  );
}

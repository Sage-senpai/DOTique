import React, { useEffect } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../services/supabase";
import { useAuthStore } from "../../store/authStore";
import { styles } from "./SignupScreen.styles";

type SignupForm = { email: string; password: string };

export default function SignupScreen({ navigation }: any) {
  const { control, handleSubmit, formState: { errors } } = useForm<SignupForm>();
  const [loading, setLoading] = React.useState(false);

  const session = useAuthStore((s) => s.session);
  const setProfile = useAuthStore((s) => s.setProfile);
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    if (session) {
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  }, [session]);

  const onSubmit = async (data: SignupForm) => {
    try {
      setLoading(true);

      const { data: signUpData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        Alert.alert("Signup Error", authError.message);
        return;
      }

      if (signUpData?.user) {
        // Reset onboarding so it shows for this new user
        await AsyncStorage.removeItem("hasSeenOnboarding");

        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("auth_uid", signUpData.user.id)
          .single();

        if (profileError) {
          Alert.alert("Profile Error", profileError.message);
          return;
        }

        setSession(signUpData.session);
        setProfile(profile);

        Alert.alert("Account Created ✅", "Welcome to DOTique!");
        navigation.reset({ index: 0, routes: [{ name: "Onboarding" }] });
      }
    } catch (err: any) {
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

      {loading ? <ActivityIndicator /> : <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />}

      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Log in
      </Text>
    </View>
  );
}

import React from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../../services/supabase";
import { styles } from "./ForgotPasswordScreen.styles";

type ResetForm = { email: string };

export default function ForgotPasswordScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<ResetForm>();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: ResetForm) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        // 👇 dev: use your Expo localhost redirect or deployed URL
        redirectTo: "http://localhost:19006/reset-password",
      });

      if (error) {
        Alert.alert("Reset Error", error.message);
        return;
      }

      Alert.alert("Check your email", "Password reset link has been sent.");
      // ✅ No navigation here — Router decides after reset if user logs in again
    } catch (err: any) {
      Alert.alert("Unexpected Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

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

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Send Reset Link" onPress={handleSubmit(onSubmit)} />
      )}
    </View>
  );
}

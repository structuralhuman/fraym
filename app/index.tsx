import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFraym } from "../context/FraymContext";

export default function Index() {
  const router = useRouter();
  const { session, setSession, resetSession } = useFraym();

  const [eventInput, setEventInput] = useState(session.event ?? "");
  const [error, setError] = useState<string | null>(null);

  const onNext = () => {
    const value = eventInput.trim();

    if (value.length === 0) {
      setError("Event required.");
      return;
    }

    if (value.length > 140) {
      setError("140 character limit exceeded.");
      return;
    }

    setError(null);

    setSession({
      ...session,
      event: value,
    });

    router.push("/assumption");
  };

  const onCancel = () => {
    resetSession();
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.step}>1 of 5</Text>
          <Text style={styles.title}>Event</Text>

          <TextInput
            value={eventInput}
            onChangeText={setEventInput}
            multiline
            maxLength={140}
            style={styles.input}
            textAlignVertical="top"
            autoCapitalize="sentences"
            autoCorrect={false}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>

          <Pressable style={styles.cancelWrap} onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel Run</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  step: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    color: "#1F1F1F",
    marginBottom: 16,
  },
  input: {
    minHeight: 160,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1F1F1F",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },
  error: {
    marginBottom: 12,
    fontSize: 14,
    color: "#4A4A4A",
  },
  nextButton: {
    backgroundColor: "#1F1F1F",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  cancelWrap: {
    marginTop: 12,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 14,
    color: "#707070",
  },
});
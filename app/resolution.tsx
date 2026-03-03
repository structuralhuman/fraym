import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFraym } from "../context/FraymContext";

export default function Resolution() {
  const router = useRouter();
  const { session, resetSession } = useFraym();

  useEffect(() => {
    if (!session.resolution) {
      router.replace("/");
    }
  }, [session.resolution, router]);

  if (!session.resolution) {
    return null;
  }

  const onAcknowledge = () => {
    resetSession();
    router.replace("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.content}>
        <Text style={styles.step}>5 of 5</Text>
        <Text style={styles.title}>Resolution</Text>

        <Text style={styles.body}>{session.resolution.summary}</Text>

        <View style={styles.spacing} />

        <Text style={styles.body}>{session.resolution.action}</Text>

        <Pressable style={styles.button} onPress={onAcknowledge}>
          <Text style={styles.buttonText}>Acknowledge & Reset</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },
  content: {
    flex: 1,
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
  body: {
    fontSize: 16,
    color: "#1F1F1F",
  },
  spacing: {
    height: 20,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#1F1F1F",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

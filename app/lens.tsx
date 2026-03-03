import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LENS_LABELS } from "../constants/controls";
import { LensKey } from "../constants/types";
import { useFraym } from "../context/FraymContext";
import { computeResolution } from "../engine/computeResolution";

const lensOptions = Object.entries(LENS_LABELS) as [LensKey, string][];

export default function Lens() {
  const router = useRouter();
  const { session, setSession, resetSession } = useFraym();

  const [selectedLens, setSelectedLens] = useState<LensKey | null>(
    session.lens
  );
  const [error, setError] = useState<string | null>(null);

  const onNext = () => {
    if (!selectedLens) {
      setError("Select one alternative lens.");
      return;
    }

    setError(null);

    const updatedSession = {
      ...session,
      lens: selectedLens,
    };

    const resolution = computeResolution(updatedSession);

    setSession({
      ...updatedSession,
      resolution,
    });

    router.push("/resolution");
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
          <View>
            <Text style={styles.step}>4 of 5</Text>
            <Text style={styles.title}>Alternative Lens</Text>
            <Text style={styles.sectionTitle}>Lens Selection</Text>

            <View style={styles.optionsWrap}>
              {lensOptions.map(([key, label]) => {
                const selected = selectedLens === key;

                return (
                  <Pressable
                    key={key}
                    onPress={() => {
                      setSelectedLens(key);
                      setError(null);
                    }}
                    style={[
                      styles.option,
                      selected && styles.optionSelected,
                    ]}
                  >
                    <Text style={styles.optionText}>{label}</Text>
                  </Pressable>
                );
              })}
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.nextButton} onPress={onNext}>
              <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>

            <Pressable style={styles.cancelWrap} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel Run</Text>
            </Pressable>
          </View>
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
  sectionTitle: {
    fontSize: 16,
    color: "#1F1F1F",
    marginBottom: 8,
  },
  optionsWrap: {
    marginBottom: 12,
  },
  option: {
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  optionSelected: {
    borderColor: "#1F1F1F",
    backgroundColor: "#EDEDED",
  },
  optionText: {
    fontSize: 15,
    color: "#1F1F1F",
  },
  error: {
    marginBottom: 12,
    fontSize: 14,
    color: "#4A4A4A",
  },
  actions: {
    marginTop: "auto",
  },
  nextButton: {
    backgroundColor: "#1F1F1F",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  cancelWrap: {
    marginTop: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  cancelText: {
    fontSize: 14,
    color: "#707070",
  },
});
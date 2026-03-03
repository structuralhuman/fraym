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
import {
  EXTERNAL_NON_CONTROL_LABELS,
  INTERNAL_CONTROL_LABELS,
} from "../constants/controls";
import {
  ExternalNonControlKey,
  InternalControlKey,
} from "../constants/types";
import { useFraym } from "../context/FraymContext";

const internalOptions = Object.entries(INTERNAL_CONTROL_LABELS) as [
  InternalControlKey,
  string,
][];
const externalOptions = Object.entries(EXTERNAL_NON_CONTROL_LABELS) as [
  ExternalNonControlKey,
  string,
][];

export default function Boundary() {
  const router = useRouter();
  const { session, setSession, resetSession } = useFraym();

  const [selectedInternal, setSelectedInternal] = useState<InternalControlKey | null>(
    session.internalControl
  );
  const [selectedExternal, setSelectedExternal] = useState<ExternalNonControlKey | null>(
    session.externalNonControl
  );
  const [internalError, setInternalError] = useState<string | null>(null);
  const [externalError, setExternalError] = useState<string | null>(null);

  const onNext = () => {
    const nextInternalError = selectedInternal ? null : "Select one internal control.";
    const nextExternalError = selectedExternal
      ? null
      : "Select one external non-control.";

    setInternalError(nextInternalError);
    setExternalError(nextExternalError);

    if (nextInternalError || nextExternalError) {
      return;
    }

    setSession({
      ...session,
      internalControl: selectedInternal,
      externalNonControl: selectedExternal,
    });

    router.push("/lens");
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
          <Text style={styles.step}>3 of 5</Text>
          <Text style={styles.title}>Control Boundary</Text>

          <Text style={styles.sectionTitle}>Internal Control</Text>
          <View style={styles.optionsWrap}>
            {internalOptions.map(([key, label]) => {
              const selected = selectedInternal === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => setSelectedInternal(key)}
                  style={[styles.option, selected && styles.optionSelected]}
                >
                  <Text style={styles.optionText}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
          {internalError ? <Text style={styles.error}>{internalError}</Text> : null}

          <Text style={styles.sectionTitle}>External Non-Control</Text>
          <View style={styles.optionsWrap}>
            {externalOptions.map(([key, label]) => {
              const selected = selectedExternal === key;
              return (
                <Pressable
                  key={key}
                  onPress={() => setSelectedExternal(key)}
                  style={[styles.option, selected && styles.optionSelected]}
                >
                  <Text style={styles.optionText}>{label}</Text>
                </Pressable>
              );
            })}
          </View>
          {externalError ? <Text style={styles.error}>{externalError}</Text> : null}

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

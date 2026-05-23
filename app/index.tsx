import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import { THEME } from "../constants/theme";

export default function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin() {
    setError("");

    setLoading(true);

    setTimeout(() => {
      if (
        email ===
          "admin@ford.com" &&
        password === "123456"
      ) {
        router.replace(
          "/dashboard"
        );
      } else {
        setError(
          "Email ou senha inválidos."
        );
      }

      setLoading(false);
    }, 1500);
  }

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* TITULO */}
      <Text style={styles.title}>
        MarketLens Auto
      </Text>

      <Text style={styles.subtitle}>
        Plataforma estratégica de
        inteligência competitiva
        automotiva.
      </Text>

      {/* INPUT EMAIL */}
      <TextInput
        placeholder="Email corporativo"
        placeholderTextColor="#64748B"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* INPUT SENHA */}
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#64748B"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {/* ERRO */}
      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {/* BOTÃO */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text
            style={styles.buttonText}
          >
            Entrar
          </Text>
        )}
      </TouchableOpacity>

      {/* CREDENCIAIS */}
      <View style={styles.demoBox}>
        <Text style={styles.demoTitle}>
          Credenciais Demo
        </Text>

        <Text style={styles.demoText}>
          admin@ford.com
        </Text>

        <Text style={styles.demoText}>
          123456
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      THEME.colors.background,

    justifyContent: "center",

    paddingHorizontal: 28,
  },

  logo: {
    width: 140,

    height: 140,

    alignSelf: "center",

    marginBottom: 24,
  },

  title: {
    color: "#fff",

    fontSize: 38,

    fontWeight: "bold",

    textAlign: "center",
  },

  subtitle: {
    color: "#94A3B8",

    fontSize: 16,

    textAlign: "center",

    marginTop: 10,

    marginBottom: 50,

    lineHeight: 24,
  },

  input: {
    backgroundColor: "#071426",

    borderRadius: 18,

    padding: 18,

    color: "#fff",

    marginBottom: 18,

    borderWidth: 1,

    borderColor: "#132238",

    fontSize: 16,
  },

  error: {
    color: "#EF4444",

    marginBottom: 18,

    textAlign: "center",

    fontWeight: "600",
  },

  button: {
    backgroundColor:
      THEME.colors.primary,

    padding: 20,

    borderRadius: 18,

    alignItems: "center",

    marginTop: 10,
  },

  buttonText: {
    color: "#fff",

    fontSize: 18,

    fontWeight: "bold",
  },

  demoBox: {
    backgroundColor: "#071426",

    borderRadius: 20,

    padding: 20,

    marginTop: 30,

    borderWidth: 1,

    borderColor: "#132238",
  },

  demoTitle: {
    color: "#fff",

    fontWeight: "bold",

    marginBottom: 10,

    fontSize: 16,
  },

  demoText: {
    color: "#94A3B8",

    marginBottom: 6,
  },
});
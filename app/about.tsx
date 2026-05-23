import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { THEME } from "../constants/theme";

import { BottomNav } from "../components/BottomNav";

export default function About() {
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.title}>
          Sobre o Projeto
        </Text>

        <Text style={styles.subtitle}>
          MarketLens Auto
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Problema Ford
          </Text>

          <Text style={styles.cardText}>
            A Ford precisa de uma
            solução capaz de
            comparar veículos e
            gerar inteligência
            competitiva automotiva.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Nossa Solução
          </Text>

          <Text style={styles.cardText}>
            O MarketLens Auto
            permite comparar
            veículos de maneira
            técnica e estratégica,
            auxiliando analistas na
            tomada de decisão.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Tecnologias
          </Text>

          <Text style={styles.cardText}>
            React Native, Expo,
            TypeScript, Zustand,
            Expo Router e API FIPE.
          </Text>
        </View>
      </ScrollView>

      <BottomNav />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      THEME.colors.background,
  },

  content: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  title: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
  },

  subtitle: {
    color:
      THEME.colors.primary,
    marginTop: 10,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#071426",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#132238",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 14,
  },

  cardText: {
    color: "#CBD5E1",
    lineHeight: 26,
    fontSize: 16,
  },
});
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { router } from "expo-router";

import { THEME } from "../constants/theme";

import { BottomNav } from "../components/BottomNav";

export default function Dashboard() {
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />

          <View>
            <Text style={styles.title}>
              MarketLens Auto
            </Text>

            <Text
              style={styles.subtitle}
            >
              Inteligência
              Competitiva
            </Text>
          </View>
        </View>

        {/* KPI */}
        <View
          style={styles.kpiContainer}
        >
          <View style={styles.kpiCard}>
            <Text
              style={styles.kpiLabel}
            >
              ⚡ Mais Potente
            </Text>

            <Text
              style={styles.kpiValue}
            >
              Ranger Raptor
            </Text>
          </View>

          <View style={styles.kpiCard}>
            <Text
              style={styles.kpiLabel}
            >
              💰 Melhor Custo
            </Text>

            <Text
              style={styles.kpiValue}
            >
              Rampage
            </Text>
          </View>
        </View>

        {/* AÇÕES */}
        <Text
          style={styles.sectionTitle}
        >
          Navegação
        </Text>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() =>
            router.push("/brands")
          }
        >
          <Text
            style={styles.actionTitle}
          >
            Marcas Automotivas
          </Text>

          <Text
            style={styles.actionText}
          >
            Explore fabricantes e
            modelos disponíveis.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() =>
            router.push("/compare")
          }
        >
          <Text
            style={styles.actionTitle}
          >
            Comparativo Inteligente
          </Text>

          <Text
            style={styles.actionText}
          >
            Compare veículos com IA
            competitiva.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() =>
            router.push("/favorites")
          }
        >
          <Text
            style={styles.actionTitle}
          >
            Favoritos
          </Text>

          <Text
            style={styles.actionText}
          >
            Acesse veículos salvos.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() =>
            router.push("/about")
          }
        >
          <Text
            style={styles.actionTitle}
          >
            Sobre o Projeto
          </Text>

          <Text
            style={styles.actionText}
          >
            Visão estratégica e
            solução Ford.
          </Text>
        </TouchableOpacity>
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },

  logo: {
    width: 80,
    height: 80,
    marginRight: 18,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 6,
    fontSize: 16,
  },

  kpiContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 36,
  },

  kpiCard: {
    flex: 1,
    backgroundColor: "#071426",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#132238",
  },

  kpiLabel: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 12,
  },

  kpiValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  actionCard: {
    backgroundColor: "#071426",
    borderRadius: 24,
    padding: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#132238",
  },

  actionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  actionText: {
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 24,
  },
});
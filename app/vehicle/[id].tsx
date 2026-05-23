import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import vehicles from "../../data/vehicles.json";

import { VEHICLE_IMAGES } from "../../constants/images";

import { THEME } from "../../constants/theme";

import { formatCurrency } from "../../utils/formatCurrency";

export default function VehicleDetails() {
  const { id } = useLocalSearchParams();

  const vehicle = vehicles.find(
    (item) => item.id === id
  );

  if (!vehicle) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>
          Veículo não encontrado
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            VEHICLE_IMAGES[
              vehicle.image as keyof typeof VEHICLE_IMAGES
            ]
          }
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            PREMIUM
          </Text>
        </View>
      </View>

      <Text style={styles.brand}>
        {vehicle.brand}
      </Text>

      <Text style={styles.model}>
        {vehicle.model} {vehicle.version}
      </Text>

      <Text style={styles.price}>
        {formatCurrency(vehicle.price)}
      </Text>

      <View style={styles.specsContainer}>
        <View style={styles.specCard}>
          <Text style={styles.specLabel}>
            Motor
          </Text>

          <Text style={styles.specValue}>
            {vehicle.engine}
          </Text>
        </View>

        <View style={styles.specCard}>
          <Text style={styles.specLabel}>
            Potência
          </Text>

          <Text style={styles.specValue}>
            {vehicle.power}
          </Text>
        </View>

        <View style={styles.specCard}>
          <Text style={styles.specLabel}>
            Tração
          </Text>

          <Text style={styles.specValue}>
            {vehicle.traction}
          </Text>
        </View>

        <View style={styles.specCard}>
          <Text style={styles.specLabel}>
            Consumo
          </Text>

          <Text style={styles.specValue}>
            {vehicle.consumption}
          </Text>
        </View>
      </View>

      <View style={styles.analysisCard}>
        <Text style={styles.analysisTitle}>
          Análise Inteligente
        </Text>

        <Text style={styles.analysisText}>
          O {vehicle.model}{" "}
          {vehicle.version} apresenta um
          excelente equilíbrio entre
          desempenho, tecnologia e
          capacidade off-road,
          posicionando-se como uma
          opção premium dentro do
          segmento.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      THEME.colors.background,
  },

  content: {
    paddingBottom: 50,
  },

  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      THEME.colors.background,
  },

  notFoundText: {
    color: THEME.colors.text,
    fontSize: 20,
    fontWeight: "bold",
  },

  imageContainer: {
    height: 320,
    backgroundColor: "#071426",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 30,
  },

  image: {
    width: "90%",
    height: 240,
  },

  badge: {
    position: "absolute",
    top: 60,
    right: 24,
    backgroundColor:
      THEME.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  brand: {
    color: "#94A3B8",
    fontSize: 16,
    paddingHorizontal: 24,
    marginBottom: 6,
  },

  model: {
    color: THEME.colors.text,
    fontSize: 34,
    fontWeight: "bold",
    paddingHorizontal: 24,
    marginBottom: 14,
  },

  price: {
    color: THEME.colors.primary,
    fontSize: 30,
    fontWeight: "bold",
    paddingHorizontal: 24,
    marginBottom: 30,
  },

  specsContainer: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 30,
  },

  specCard: {
    backgroundColor: "#0F172A",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#132238",
  },

  specLabel: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 8,
  },

  specValue: {
    color: THEME.colors.text,
    fontSize: 20,
    fontWeight: "600",
  },

  analysisCard: {
    marginHorizontal: 24,
    backgroundColor: "#071426",
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: THEME.colors.primary,
  },

  analysisTitle: {
    color: THEME.colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  analysisText: {
    color: "#CBD5E1",
    fontSize: 16,
    lineHeight: 28,
  },
});
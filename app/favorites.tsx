import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { THEME } from "../constants/theme";

import { useVehicleStore } from "../store/useVehicleStore";

import { VehicleCard } from "../components/VehicleCard";

import { BottomNav } from "../components/BottomNav";

export default function Favorites() {
  const { favoriteVehicles } =
    useVehicleStore();

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.title}>
          Favoritos
        </Text>

        <Text style={styles.subtitle}>
          Veículos salvos para
          comparação.
        </Text>

        {favoriteVehicles.length ===
        0 ? (
          <View style={styles.empty}>
            <Text
              style={styles.emptyText}
            >
              Nenhum veículo
              favoritado.
            </Text>
          </View>
        ) : (
          favoriteVehicles.map(
            (vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onPress={() => {}}
              />
            )
          )
        )}
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
    color: "#94A3B8",
    marginTop: 10,
    marginBottom: 30,
  },

  empty: {
    marginTop: 80,
    alignItems: "center",
  },

  emptyText: {
    color: "#64748B",
    fontSize: 16,
  },
});
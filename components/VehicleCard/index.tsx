import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { Vehicle } from "../../types/vehicle";

import { VEHICLE_IMAGES } from "../../constants/images";

import { THEME } from "../../constants/theme";

import { formatCurrency } from "../../utils/formatCurrency";

import { useVehicleStore } from "../../store/useVehicleStore";

interface Props {
  vehicle: Vehicle;

  onPress: () => void;

  selected?: boolean;
}

export function VehicleCard({
  vehicle,
  onPress,
  selected,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [modalVisible, setModalVisible] =
    useState(false);

  const {
    favoriteVehicles,
    toggleFavorite,
  } = useVehicleStore();

  const isFavorite =
    favoriteVehicles.some(
      (item) => item.id === vehicle.id
    );

  async function handleCompare() {
    setLoading(true);

    setTimeout(() => {
      onPress();

      setLoading(false);

      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
      }, 1800);
    }, 1000);
  }

  return (
    <>
      {/* MODAL */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons
              name="checkmark-circle"
              size={64}
              color="#22C55E"
            />

            <Text style={styles.modalTitle}>
              Veículo Adicionado
            </Text>

            <Text style={styles.modalText}>
              {vehicle.model} foi
              adicionado ao
              comparativo.
            </Text>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={[
          styles.card,

          selected &&
            styles.selectedCard,
        ]}
        activeOpacity={0.9}
        onPress={() =>
          router.push({
            pathname: "/vehicle/[id]",

            params: {
              id: vehicle.id,
            },
          } as any)
        }
      >
        {/* FAVORITO */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => {
            toggleFavorite(vehicle);
          }}
        >
          <Ionicons
            name={
              isFavorite
                ? "heart"
                : "heart-outline"
            }
            size={26}
            color="#FF4D6D"
          />
        </TouchableOpacity>

        {/* BADGE */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            PREMIUM
          </Text>
        </View>

        {/* IMAGE */}
        <Image
          source={
            VEHICLE_IMAGES[
              vehicle.image as keyof typeof VEHICLE_IMAGES
            ]
          }
          style={styles.image}
          resizeMode="contain"
        />

        {/* BRAND */}
        <Text style={styles.brand}>
          {vehicle.brand}
        </Text>

        {/* MODEL */}
        <Text style={styles.model}>
          {vehicle.model}{" "}
          {vehicle.version}
        </Text>

        {/* PRICE */}
        <Text style={styles.price}>
          {formatCurrency(vehicle.price)}
        </Text>

        {/* SPECS */}
        <View style={styles.specs}>
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
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={[
            styles.compareButton,

            selected &&
              styles.compareButtonSelected,
          ]}
          onPress={handleCompare}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              color="#fff"
            />
          ) : (
            <Text
              style={
                styles.compareButtonText
              }
            >
              {selected
                ? "Selecionado"
                : "Comparar Veículo"}
            </Text>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#071426",

    borderRadius: 28,

    padding: 22,

    marginBottom: 24,

    borderWidth: 1,

    borderColor: "#11213A",

    overflow: "hidden",
  },

  selectedCard: {
    borderColor:
      THEME.colors.primary,
  },

  favoriteButton: {
    position: "absolute",

    top: 20,

    left: 20,

    zIndex: 10,
  },

  badge: {
    position: "absolute",

    top: 18,

    right: 18,

    backgroundColor:
      THEME.colors.primary,

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 999,
  },

  badgeText: {
    color: "#fff",

    fontSize: 10,

    fontWeight: "bold",
  },

  image: {
    width: "100%",

    height: 180,

    marginBottom: 20,
  },

  brand: {
    color: "#94A3B8",

    fontSize: 15,

    marginBottom: 6,
  },

  model: {
    color: "#fff",

    fontSize: 34,

    fontWeight: "bold",

    marginBottom: 18,
  },

  price: {
    color: THEME.colors.primary,

    fontSize: 26,

    fontWeight: "bold",

    marginBottom: 24,
  },

  specs: {
    gap: 14,

    marginBottom: 24,
  },

  specCard: {
    backgroundColor: "#0B172A",

    borderRadius: 18,

    padding: 16,
  },

  specLabel: {
    color: "#94A3B8",

    fontSize: 13,

    marginBottom: 6,
  },

  specValue: {
    color: "#fff",

    fontSize: 20,

    fontWeight: "600",
  },

  compareButton: {
    backgroundColor:
      THEME.colors.primary,

    paddingVertical: 16,

    borderRadius: 18,

    justifyContent: "center",

    alignItems: "center",
  },

  compareButtonSelected: {
    backgroundColor: "#22C55E",
  },

  compareButtonText: {
    color: "#fff",

    fontWeight: "bold",

    fontSize: 15,
  },

  modalOverlay: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.6)",

    justifyContent: "center",

    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#071426",

    width: "80%",

    borderRadius: 28,

    padding: 30,

    alignItems: "center",

    borderWidth: 1,

    borderColor:
      THEME.colors.primary,
  },

  modalTitle: {
    color: "#fff",

    fontSize: 24,

    fontWeight: "bold",

    marginTop: 18,

    marginBottom: 10,
  },

  modalText: {
    color: "#CBD5E1",

    fontSize: 16,

    textAlign: "center",

    lineHeight: 24,
  },
});
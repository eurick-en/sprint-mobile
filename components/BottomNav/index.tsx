import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { router, usePathname } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { THEME } from "../../constants/theme";

export function BottomNav() {
  const pathname = usePathname();

  function isActive(path: string) {
    return pathname === path;
  }

  return (
    <View style={styles.container}>
      {/* DASHBOARD */}
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          router.push("/dashboard")
        }
      >
        <Ionicons
          name="home"
          size={24}
          color={
            isActive("/dashboard")
              ? THEME.colors.primary
              : "#94A3B8"
          }
        />

        <Text
          style={[
            styles.label,

            isActive("/dashboard") &&
              styles.activeLabel,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      {/* BRANDS */}
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          router.push("/brands")
        }
      >
        <Ionicons
          name="car-sport"
          size={24}
          color={
            isActive("/brands")
              ? THEME.colors.primary
              : "#94A3B8"
          }
        />

        <Text
          style={[
            styles.label,

            isActive("/brands") &&
              styles.activeLabel,
          ]}
        >
          Marcas
        </Text>
      </TouchableOpacity>

      {/* COMPARE */}
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          router.push("/compare")
        }
      >
        <Ionicons
          name="swap-horizontal"
          size={24}
          color={
            isActive("/compare")
              ? THEME.colors.primary
              : "#94A3B8"
          }
        />

        <Text
          style={[
            styles.label,

            isActive("/compare") &&
              styles.activeLabel,
          ]}
        >
          Comparar
        </Text>
      </TouchableOpacity>

      {/* FAVORITES */}
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          router.push("/favorites")
        }
      >
        <Ionicons
          name="heart"
          size={24}
          color={
            isActive("/favorites")
              ? THEME.colors.primary
              : "#94A3B8"
          }
        />

        <Text
          style={[
            styles.label,

            isActive("/favorites") &&
              styles.activeLabel,
          ]}
        >
          Favoritos
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    bottom: 20,

    left: 20,

    right: 20,

    backgroundColor: "#071426",

    borderRadius: 24,

    flexDirection: "row",

    justifyContent:
      "space-around",

    paddingVertical: 16,

    borderWidth: 1,

    borderColor: "#132238",
  },

  item: {
    alignItems: "center",
  },

  label: {
    color: "#94A3B8",

    fontSize: 12,

    marginTop: 6,
  },

  activeLabel: {
    color:
      THEME.colors.primary,

    fontWeight: "bold",
  },
});
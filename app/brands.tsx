import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useMemo, useState } from "react";

import { router } from "expo-router";

import { THEME } from "../constants/theme";

import { BottomNav } from "../components/BottomNav";

const brands = [
  "Ford",
  "Toyota",
  "BMW",
  "Audi",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
];

export default function Brands() {
  const [search, setSearch] =
    useState("");

  const filteredBrands =
    useMemo(() => {
      return brands.filter((brand) =>
        brand
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }, [search]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.title}>
          Marcas
        </Text>

        <Text style={styles.subtitle}>
          Explore fabricantes
          automotivos.
        </Text>

        <TextInput
          placeholder="Buscar marca..."
          placeholderTextColor="#64748B"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        {filteredBrands.map(
          (brand) => (
            <TouchableOpacity
              key={brand}
              style={styles.brandCard}
              onPress={() =>
                router.push(
                  `/models/1?brandName=${brand}`
                )
              }
            >
              <Text
                style={
                  styles.brandName
                }
              >
                {brand}
              </Text>

              <Text
                style={
                  styles.brandText
                }
              >
                Ver modelos
              </Text>
            </TouchableOpacity>
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
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
  },

  searchInput: {
    backgroundColor: "#071426",
    borderRadius: 18,
    padding: 18,
    color: "#fff",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#132238",
  },

  brandCard: {
    backgroundColor: "#071426",
    borderRadius: 24,
    padding: 24,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#132238",
  },

  brandName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  brandText: {
    color: "#94A3B8",
  },
});
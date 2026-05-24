import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";

import { useMemo, useState } from "react";

import vehicles from "../data/vehicles.json";

import { VehicleCard } from "../components/VehicleCard";

import { BottomNav } from "../components/BottomNav";

import { THEME } from "../constants/theme";

import { useVehicleStore } from "../store/useVehicleStore";

import { formatCurrency } from "../utils/formatCurrency";

export default function Compare() {
  const [search, setSearch] =
    useState("");

  const [modalVisible, setModalVisible] =
    useState(false);

  const [loadingCompare, setLoadingCompare] =
    useState(false);

  const {
    selectedVehicles,
    addVehicle,
    clearVehicles,
    selectedAttributes,
    toggleAttribute,
  } = useVehicleStore();

  const filteredVehicles =
    useMemo(() => {
      return vehicles.filter(
        (vehicle) =>
          vehicle.model
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          vehicle.brand
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [search]);

  const attributes = [
    {
      label: "Potência",
      value: "power",
    },

    {
      label: "Preço",
      value: "price",
    },

    {
      label: "Consumo",
      value: "consumption",
    },

    {
      label: "Tração",
      value: "traction",
    },

    {
      label: "Motor",
      value: "engine",
    },

    {
      label: "Câmbio",
      value: "transmission",
    },

    {
      label: "Combustível",
      value: "fuel",
    },

    {
      label: "Torque",
      value: "torque",
    },

    {
      label: "Direção",
      value: "steering",
    },

    {
      label: "Tanque",
      value: "tank",
    },
  ];

  async function handleSelectVehicle(
    vehicle: any
  ) {
    addVehicle(vehicle);

    if (
      selectedVehicles.length === 1
    ) {
      setLoadingCompare(true);

      setTimeout(() => {
        setLoadingCompare(false);

        setModalVisible(true);
      }, 1500);
    }
  }

  function generateAnalysis() {
    if (
      selectedVehicles.length < 2
    ) {
      return "";
    }

    const vehicle1 =
      selectedVehicles[0];

    const vehicle2 =
      selectedVehicles[1];

    const priceWinner =
      vehicle1.price <
      vehicle2.price
        ? vehicle1.model
        : vehicle2.model;

    const powerWinner =
      parseInt(vehicle1.power) >
      parseInt(vehicle2.power)
        ? vehicle1.model
        : vehicle2.model;

    const consumptionWinner =
      parseInt(vehicle1.consumption) >
      parseInt(vehicle2.consumption)
        ? vehicle1.model
        : vehicle2.model;

    return `
${powerWinner} apresenta maior potência e perfil mais esportivo.

${priceWinner} oferece melhor custo-benefício competitivo.

${consumptionWinner} demonstra maior eficiência operacional considerando consumo energético.

A análise comparativa permite identificar vantagens estratégicas entre os veículos para diferentes cenários automotivos.
`;
  }

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
        <Text style={styles.title}>
          Comparativo Inteligente
        </Text>

        <Text style={styles.subtitle}>
          Compare veículos e gere
          inteligência competitiva.
        </Text>

        {/* FILTROS */}
        <View
          style={
            styles.filtersContainer
          }
        >
          <Text
            style={styles.filtersTitle}
          >
            Atributos Técnicos
          </Text>

          <View style={styles.filters}>
            {attributes.map((item) => {
              const selected =
                selectedAttributes.includes(
                  item.value
                );

              return (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.filterButton,

                    selected &&
                      styles.filterButtonActive,
                  ]}
                  onPress={() =>
                    toggleAttribute(
                      item.value
                    )
                  }
                >
                  <Text
                    style={[
                      styles.filterText,

                      selected &&
                        styles.filterTextActive,
                    ]}
                  >
                    {selected
                      ? "☑ "
                      : "☐ "}
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* SEARCH */}
        <TextInput
          placeholder="Buscar veículo..."
          placeholderTextColor="#777"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />

        {/* EMPTY */}
        {selectedVehicles.length <
          2 && (
          <View style={styles.emptyBox}>
            <Text
              style={styles.emptyText}
            >
              Selecione 2 veículos
              para iniciar a análise
              inteligente.
            </Text>
          </View>
        )}

        {/* VEÍCULOS */}
        <FlatList
          scrollEnabled={false}
          data={filteredVehicles}
          keyExtractor={(item) =>
            item.id
          }
          renderItem={({ item }) => (
            <VehicleCard
              vehicle={item}
              selected={selectedVehicles.some(
                (vehicle) =>
                  vehicle.id ===
                  item.id
              )}
              onPress={() =>
                handleSelectVehicle(
                  item
                )
              }
            />
          )}
        />
      </ScrollView>

      <BottomNav />

      {/* LOADING IA */}
      <Modal
        visible={loadingCompare}
        transparent
        animationType="fade"
      >
        <View
          style={styles.loadingOverlay}
        >
          <View
            style={styles.loadingBox}
          >
            <ActivityIndicator
              size="large"
              color={
                THEME.colors.primary
              }
            />

            <Text
              style={styles.loadingTitle}
            >
              Analisando veículos...
            </Text>

            <Text
              style={styles.loadingText}
            >
              Gerando insights
              competitivos com IA
            </Text>
          </View>
        </View>
      </Modal>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
      >
        <ScrollView
          style={styles.modalContainer}
          contentContainerStyle={{
            paddingBottom: 60,
          }}
        >
          <View
            style={styles.modalHeader}
          >
            <Text
              style={
                styles.compareTitle
              }
            >
              Comparativo Técnico
            </Text>

            <TouchableOpacity
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text
                style={
                  styles.closeText
                }
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </View>

          {/* TABELA */}
          <View style={styles.table}>
            <View
              style={
                styles.tableHeader
              }
            >
              <Text
                style={
                  styles.tableHeaderText
                }
              >
                Atributo
              </Text>

              <Text
                style={
                  styles.tableHeaderText
                }
              >
                {
                  selectedVehicles[0]
                    ?.model
                }
              </Text>

              <Text
                style={
                  styles.tableHeaderText
                }
              >
                {
                  selectedVehicles[1]
                    ?.model
                }
              </Text>
            </View>

            {selectedAttributes.map(
              (attribute) => (
                <View
                  key={attribute}
                  style={
                    styles.tableRow
                  }
                >
                  <Text
                    style={
                      styles.tableLabel
                    }
                  >
                    {
                      attributes.find(
                        (item) =>
                          item.value ===
                          attribute
                      )?.label
                    }
                  </Text>

                  <Text
                    style={
                      styles.tableValue
                    }
                  >
                    {attribute ===
                    "price"
                      ? formatCurrency(
                          selectedVehicles[0]
                            ?.price
                        )
                      : selectedVehicles[0]?.[
                          attribute as keyof typeof selectedVehicles[0]
                        ] || "N/D"}
                  </Text>

                  <Text
                    style={
                      styles.tableValue
                    }
                  >
                    {attribute ===
                    "price"
                      ? formatCurrency(
                          selectedVehicles[1]
                            ?.price
                        )
                      : selectedVehicles[1]?.[
                          attribute as keyof typeof selectedVehicles[1]
                        ] || "N/D"}
                  </Text>
                </View>
              )
            )}
          </View>

          {/* IA */}
          <View
            style={styles.analysisBox}
          >
            <Text
              style={
                styles.analysisTitle
              }
            >
              Análise Inteligente
            </Text>

            <Text
              style={
                styles.analysisText
              }
            >
              {generateAnalysis()}
            </Text>
          </View>

          {/* LIMPAR */}
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              clearVehicles();

              setModalVisible(false);
            }}
          >
            <Text
              style={
                styles.clearButtonText
              }
            >
              Limpar Comparação
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
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

  filtersContainer: {
    marginBottom: 26,
  },

  filtersTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },

  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  filterButton: {
    backgroundColor: "#071426",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#132238",
  },

  filterButtonActive: {
    backgroundColor:
      THEME.colors.primary,
  },

  filterText: {
    color: "#fff",
    fontSize: 14,
  },

  filterTextActive: {
    fontWeight: "bold",
  },

  searchInput: {
    backgroundColor: "#071426",
    borderRadius: 18,
    padding: 18,
    color: "#fff",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#132238",
  },

  emptyBox: {
    backgroundColor: "#071426",
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#132238",
  },

  emptyText: {
    color: "#94A3B8",
    textAlign: "center",
  },

  loadingOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingBox: {
    backgroundColor: "#071426",
    padding: 40,
    borderRadius: 24,
    alignItems: "center",
    width: 300,
    borderWidth: 1,
    borderColor:
      THEME.colors.primary,
  },

  loadingTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 24,
  },

  loadingText: {
    color: "#94A3B8",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 24,
  },

  modalContainer: {
    flex: 1,
    backgroundColor:
      THEME.colors.background,
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  compareTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  closeText: {
    color:
      THEME.colors.primary,
    fontWeight: "bold",
  },

  table: {
    backgroundColor: "#071426",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor:
      THEME.colors.primary,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#132238",
    padding: 18,
  },

  tableHeaderText: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  tableRow: {
    flexDirection: "row",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#132238",
  },

  tableLabel: {
    flex: 1,
    color: "#94A3B8",
  },

  tableValue: {
    flex: 1,
    color: "#fff",
    textAlign: "center",
  },

  analysisBox: {
    backgroundColor: "#071426",
    borderRadius: 24,
    padding: 24,
    marginTop: 24,
  },

  analysisTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 14,
  },

  analysisText: {
    color: "#CBD5E1",
    lineHeight: 28,
    fontSize: 16,
  },

  clearButton: {
    backgroundColor:
      THEME.colors.primary,
    padding: 18,
    borderRadius: 18,
    marginTop: 24,
    alignItems: "center",
  },

  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
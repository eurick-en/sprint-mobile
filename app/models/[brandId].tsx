import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import { useEffect, useState } from "react";

import { THEME } from "../../constants/theme";

import { getModels } from "../../services/fipe";

import { Header } from "../../components/Header";

export default function Models() {
  const { brandId, brandName } =
    useLocalSearchParams();

  const [models, setModels] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchModels() {
      try {
        const data = await getModels(
          brandId as string
        );

        setModels(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={THEME.colors.primary}
        />

        <Text style={styles.loadingText}>
          Carregando modelos...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title={String(brandName)}
        subtitle="Modelos disponíveis"
      />

      <FlatList
        data={models}
        keyExtractor={(item: any) => item.codigo}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={styles.modelCard}
            onPress={() =>
              router.push({
                pathname: "/compare",
                params: {
                  model: item.nome,
                },
              } as any)
            }
          >
            <Text style={styles.modelText}>
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    paddingTop: 80,
    paddingHorizontal: 24,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: THEME.colors.text,
    marginTop: 16,
    fontSize: 16,
  },

  modelCard: {
    backgroundColor: THEME.colors.card,
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },

  modelText: {
    color: THEME.colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
});
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { THEME } from "../../constants/theme";

interface Props {
  title: string;
  subtitle?: string;
}

export function Header({
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },

  title: {
    color: THEME.colors.text,
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    color: THEME.colors.gray,
    fontSize: 16,
  },
});
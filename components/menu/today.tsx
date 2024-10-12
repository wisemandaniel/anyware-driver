import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import MenuItem from "../cards/meal";
import { Menu } from "@/functions/menu";

interface TodayMenuComponentProps {
  menuItems: Menu[];
}

const TodayMenuComponent: React.FC<TodayMenuComponentProps> = ({
  menuItems,
}) => {
  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>Today's Menu</Text>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <MenuItem
            menuItems={item}
            rating={0}
            ratingCount={0}
            isFavorite={false}
          />
        )}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    padding: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  row: {
    justifyContent: "space-between",
  },
});

export default TodayMenuComponent;

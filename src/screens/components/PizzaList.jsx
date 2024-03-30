import { StyleSheet, View, Button, Text, Image, ScrollView } from "react-native";
import PizzaListItem from "./PizzaListItem";
import {pizzaShops} from './dumb-data.js'

function PizzaList() {

  return (
    <ScrollView style={{ width: "100%", paddingHorizontal: 30 }}>
      <Text style={styles.title}>Pizza Store list</Text>
      <View>
        {
          pizzaShops.map((shop) => (<PizzaListItem key={shop} shop={shop} />))
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 4,
  }
});

export default PizzaList
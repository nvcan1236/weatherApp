import { Button, Image, StyleSheet, Text, View } from "react-native";

function PizzaListItem({shop}) {
  return (
    <View style={styles.PizzaListItemI}>
      <View style={styles.pizzaItem}>
        <Image
          style={styles.pizzaImageItem}
          source={{
            uri: shop.image,
          }}
        />
        <View style={styles.pizzaInfo}>
          <Text style={styles.pizzaName}>{shop.name}</Text>
          <Text style={styles.pizzaAddress}>{shop.address}</Text>
          <Text style={styles.pizzaAddress}>Rating: {shop.rating}</Text>
        </View>
        <Button title="detail" />
      </View>
    </View>
  );
}

export default PizzaListItem;

const styles = StyleSheet.create({
  pizzaItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#dbdbdb",
    borderRadius: 12,
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  pizzaInfo: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    paddingHorizontal: 12,
  },
  pizzaName: {
    fontWeight: "500",
    fontSize: 16,
  },
  pizzaAddress: {
    fontSize: 10,
    color: "#666",
  },
  pizzaImageItem: {
    width: 50,
    height: 50,
    objectFit: "cover",
    borderRadius: 6,
  },
  detailBtn: {
    backgroundColor: "#ffb702",
    borderRadius: 12,
    color: "white",
  },
});

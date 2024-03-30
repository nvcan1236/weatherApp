import React, {Component} from "react";
import {StyleSheet, View, Button, Text, Image} from "react-native"

function PizzaDetail() {
  return <View style={styles.center}>
    <Image style={styles.pizzaImage} source={{"uri": "https://res.cloudinary.com/dbd7vfk12/image/upload/v1698833545/samples/food/pot-mussels.jpg"}} />
    <Text style={styles.title}></Text>
    <Button title="list Item, click for Detail" />
  </View>
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 16,
  },
  pizzaImage: {
    width: 200,
    height: 200,
  }
})

export default PizzaDetail
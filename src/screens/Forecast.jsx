import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { APIKey } from "../weatherConfig";
const key = APIKey;

function Forecast() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [forecast, setForecast] = useState();
  const [location, setLocation] = useState({ id: 1580578 });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${key}`
      )
        .then((res) => res.json())
        .then((data) => setResult(data));
    }, 700);

    return () => {
      setResult([]);
      clearTimeout(timer);
    };
  }, [input]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?&units=metric&lang=vi&lat=${location.lat}&lon=${location.lon}&id=${location.id}&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult([]);
        setForecast(data);
      });
  }, [location]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <TextInput
          placeholder="Nhập tên địa điểm cần tìm kiếm ..."
          style={styles.input}
          onChangeText={(text) => setInput(text.trim() ? text : "")}
          value={input}
        />
        <Button title="Search" />
        {input && (
          <TouchableOpacity
            style={{ position: "absolute", right: 90 }}
            onPress={() => setInput("")}
          >
            <Ionicons name="close-outline" size={20} />
          </TouchableOpacity>
        )}
        {result.length > 0 && input && (
          <View style={styles.results}>
            {result.map((r) => (
              <TouchableOpacity
                key={r.lat}
                onPress={() => setLocation({ lat: r.lat, lon: r.lon })}
              >
                <View style={styles.result}>
                  <Text>
                    {r.name}, {r.country}
                  </Text>
                  <Text>
                    {r.lat}, {r.lon}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        {forecast && forecast.cod === "200" && (
          <View>
            <Text style={styles.location}>
              {forecast.city.name}, {forecast.city.country}
            </Text>
            <ScrollView
              style={{
                width: "100%",
                height: 600,
                paddingRight: 8,
                marginTop: 20,
              }}
            >
              {forecast.list.map((i) => (
                <View key={i.dt} style={styles.detailItem}>
                  <Text>{i.dt_txt} </Text>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`,
                    }}
                    style={styles.forecastImage}
                  />
                  <Text>{i.weather[0].main} </Text>
                  <Text>{i.main.temp} ºC </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginRight: 12,
    flex: 1,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  availbaleCity: {
    borderWidth: 1,
    borderRadius: 12,
    borderBlockColor: "#333",
    padding: 12,
    marginTop: 12,
  },
  location: {
    fontWeight: "600",
    fontSize: 16,
  },
  date: {
    fontSize: 14,
  },
  detailItem: {
    margin: 4,
    borderWidth: 1,
    borderBlockColor: "#333",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#ccc",
    color: "#fff",
    flexDirection: "row",
    width: "98%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  results: {
    position: "absolute",
    top: "100%",
    zIndex: 1,
    left: 0,
    right: 0,
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderBlockColor: "#333",
    marginTop: 8,
  },
  result: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forecastImage: {
    width: 40,
    height: 40,
  },
});

export default Forecast;

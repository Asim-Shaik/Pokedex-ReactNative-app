import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const PokeCard = ({ data }) => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    fetch(data.url)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.results);
        setInfo(response);
        // setOldData(response.results);
      });
  }, []);
  return (
    <View>
      <Text> {info.species.name}</Text>
    </View>
  );
};

export default PokeCard;

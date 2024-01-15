import React from "react";
import { styled } from "@mui/material/styles";

import icon from "../utils/icon.png";

import { View, Text, Image } from "@react-pdf/renderer";

const LetterHead = () => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View style={{ display: "flex" }}>
        <Image
          src={icon}
          alt="letter headed icon"
          style={{ width: "100%", height: "60px" }}
        />
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Text style={{ flexWrap: "wrap", flexGrow: 1 }} wrap>
          GENIUS RAISERS SCHOOL OFF RAMP ROAD,
        </Text>
        <Text>ZANGO-DAJI LOKOJA, KOGI STATE</Text>
      </View>
    </View>
  );
};

export default LetterHead;

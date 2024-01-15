import React from "react";
import LetterHead from "../../LetterHead";
import correctIcon from "../../../utils/correct.png";
import WrongIcon from "../../../utils/wrong.png";
import {
  Page,
  Text,
  Document,
  View,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

const StudentResult = ({ result, user }) => {
  return (
    <PDFViewer style={{ height: "100vh", width: "100%" }}>
      <Document>
        <Page style={{ padding: 20, width: "100%", height: "100%" }}>
          <View style={{ display: "flex" }}>
            <LetterHead />
            <View>
              <Text style={{ fontSize: "12px" }}> Score: {result.subject}</Text>
              <Text style={{ fontSize: "12px" }}> Term: {result.term}</Text>
              <Text style={{ fontSize: "12px" }}>
                {" "}
                Class: {result.subjectClass}
              </Text>
              <Text style={{ fontSize: "12px" }}>
                {" "}
                Name {`${user.firstName} ${user.lastName}`}
              </Text>
              <Text style={{ fontSize: "12px" }}> Score: {result.score}</Text>
              <Text style={{ fontSize: "12px" }}> Score: {result.score}</Text>
            </View>
            {result &&
              result.answeredQuestions.map((item, index) => {
                return (
                  <View key={index}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={{ fontSize: "15px" }}>{index + 1}.</Text>
                      <Text
                        wrap
                        style={{
                          fontSize: "15px",
                          marginLeft: "20px",
                          marginBottom: "10px",
                        }}
                      >
                        {" "}
                        {item.questionText}{" "}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingLeft: "20px",
                      }}
                    >
                      <View style={{ width: "70%" }}>
                        {item.answerOptions.map((item, index) => {
                          return (
                            <View
                              style={{
                                marginBottom: 10,
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "columns",
                                alignItems: "",
                                padding: "10px",
                                border: "1px solid #444",
                                backgroundColor: `${
                                  item.checked ? "green" : ""
                                }`,
                              }}
                            >
                              <Text wrap style={{ fontSize: "10px" }}>
                                {item.answerText}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                      <View style={{ display: "flex" }}>
                        <Image
                          src={item.isAnswerCorrect ? correctIcon : WrongIcon}
                          style={{ height: "20px" }}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default StudentResult;

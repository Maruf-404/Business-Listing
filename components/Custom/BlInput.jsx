import { TextInput } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors';

export default function BlInput({placeholder, height, multiline, numberOfLines, value, onchange}) {
    console.log(value);
    return (
    <TextInput
     numberOfLines={numberOfLines ? numberOfLines : 1}
      multiline={multiline}
      placeholder={placeholder}
      value={value}
      onChangeText={(value) => onchange(value)}
      style={{
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "#fff",
        borderColor: Colors.gray,
        marginTop: 10,
        fontFamily: "outfit",
        fontSize: 16,
        height: height ? height : ""
      }}
    />

  );
}
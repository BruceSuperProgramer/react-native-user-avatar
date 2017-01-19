import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import initials from 'initials';
import contrast from 'contrast';

// from https://flatuicolors.com/
const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

class UserAvatar extends Component {
  render() {
    let {
      borderRadius = 50,
      src,
      name,
      color,
      textColor = '#fff',
      colors = defaultColors,
      size,
      style,
    } = this.props;

    if (!name) throw new Error('Avatar requires a name');

    const abbr = initials(name);

    const imageStyle = {
      borderRadius
    };

    const innerStyle = {
      borderRadius,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    };

    if (size) {
      imageStyle.width = innerStyle.width = size;
      imageStyle.height = innerStyle.height = size;
    }

    let inner, classes;
    if (src) {
      inner = <Image style={imageStyle} source={{ uri: src }} />
    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // pick a deterministic color from the list
        let i = sumChars(name) % colors.length;
        background = colors[i];
      }

      innerStyle.backgroundColor = background;

      inner = <Text style={{ fontSize: size / 2.5, color: textColor }}>{abbr}</Text>
    }

    return (
      <View>
        <View style={innerStyle}>
          {inner}
        </View>
      </View>
    )
  }
}

module.exports = UserAvatar;
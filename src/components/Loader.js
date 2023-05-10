import React from 'react'
import { Text } from 'react-native';
import { View } from 'react-native';
// import AnimatedEllipsis from 'react-native-animated-ellipsis';

export default function Loader() {
    return (
        <View>
          <Text>
            Loading
            {/* <AnimatedEllipsis /> */}
          </Text>
        </View>
      );
    }

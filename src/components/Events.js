import { Center } from 'native-base';
import React from 'react';

export function Events({ events }) {
  return (
    <Center>
    {
      events.map((event, index) =>
        <Box key={ index }>{ event }</Box>
      )
    }
    </Center>
  );
}
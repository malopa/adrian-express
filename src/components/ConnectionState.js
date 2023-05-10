import { Box } from 'native-base';
import React from 'react';

export function ConnectionState({ isConnected }) {
  return <Box>State: { '' + isConnected }</Box>;
}
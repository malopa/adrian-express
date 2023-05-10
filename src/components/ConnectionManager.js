import { Box, Button } from 'native-base';
import React from 'react';
import { socket } from '../../socket';


export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (<Box>
      <Button  onClick={ connect } >Connect</Button>
      <Button  onClick={ disconnect } >
        Disconnect
      </Button>
    </Box>
  );
}
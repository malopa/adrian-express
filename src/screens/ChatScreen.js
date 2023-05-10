import { Box, Button, Input, StatusBar } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { socket } from '../../socket';
import { ConnectionManager } from '../components/ConnectionManager';
import { ConnectionState } from '../components/ConnectionState';
import { Events } from '../components/Events';
// import { socket } from '../socket';

export function ChatScreen() {

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fooEvents, setFooEvents] = useState([]);


  const [isConnected, setIsConnected] = useState(socket.connected);
//   const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);



  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit('create-something', value, () => {
      setIsLoading(false);
    });
  }



  function onFooEvent(value) {
    setFooEvents(previous => [...previous, value]);
  }

  return (
    <Box flex={1}>

        <Box mt={2} p={2}>
            <Events events={ fooEvents } />
            <ConnectionManager />
            <ConnectionState isConnected={ isConnected } />

            <Input 
            _focus={{bg:'white'}}
            onChangeText={ text => setValue(text) } />
            <Button 
            my={4}
            type="submit" 
                disabled={ isLoading }
                >
                Submit
            </Button>

        </Box>
            
    </Box>
  );
}
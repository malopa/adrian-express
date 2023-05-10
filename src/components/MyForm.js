import { Box, Button, Input } from 'native-base';
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { socket } from '../../socket';
// import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit('create-something', value, () => {
      setIsLoading(false);
    });
  }

  return (
    <Box>
      <Input onChangeText={ text => setValue(text) } />
      <Button 
      type="submit" 
        disabled={ isLoading }
        >
            Submit
        </Button>
            
    </Box>
  );
}
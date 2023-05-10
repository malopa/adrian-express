import { AlertDialog, Box, Center } from "native-base";
import { useRef } from "react";
import { AuthSpinner } from "./AuthSpinner";

export const AuthDialog = ({isOpen,setIsOpen}) => {
    // const [isOpen, setIsOpen] = React.useState(false);
  
    const onClose = () => setIsOpen(false);
  
    const cancelRef = useRef(null);
    return <Center>
        
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Body>
                <Box p={10} bg='white'>
                    <AuthSpinner />
                </Box>
            </AlertDialog.Body>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>;
  };
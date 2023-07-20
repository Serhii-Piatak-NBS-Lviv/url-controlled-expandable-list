import { useRef } from 'react';
import { ChakraProvider, SimpleGrid } from '@chakra-ui/react';

import ShiftingPopover from './components/ShiftingPopover';
import lettersApi from './rest';

function App() {

  const simpleGridRef = useRef();

  return (
    <ChakraProvider>
      <SimpleGrid ref={simpleGridRef} position={'relative'} minChildWidth='120px' spacing='20px' w={['100%', '90%']} mx="auto">
          { lettersApi.map((letter) => {
            return (
              <ShiftingPopover 
              name={letter.name} 
              title={letter.title} 
              description={letter.description}
              simpleGridRef={simpleGridRef}
              key={`letter-${letter.name}`} />              
            )}
          ) }
      </SimpleGrid>
    </ChakraProvider>    
  );
}

export default App;

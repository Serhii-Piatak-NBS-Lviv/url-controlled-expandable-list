import { ChakraProvider, SimpleGrid } from '@chakra-ui/react';

import ShiftingPopover from './components/ShiftingPopover';
import lettersApi from './rest';

function App() {

  return (
    <ChakraProvider>
      <SimpleGrid minChildWidth='120px' spacing='20px' w={['100%', '90%']}>
          { lettersApi.map((letter) => {
            return (
              <ShiftingPopover 
              name={letter.name} 
              title={letter.title} 
              description={letter.description}
              key={`letter-${letter.name}`} />
            )}
          ) }
      </SimpleGrid>
    </ChakraProvider>
    
  );
}

export default App;

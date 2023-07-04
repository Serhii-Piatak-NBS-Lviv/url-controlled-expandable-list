import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, GridItem, Card, CardHeader, CardBody, CardFooter, Heading, Text, Divider } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useToast } from '@chakra-ui/react';
import { selectItem } from './sftpopoverSlice';
import useURLParam from '../hooks/useURLParam';

/**
* @author
* @function ShiftingPopover
**/

const SplashDescription = ({name, title, description}) => {
    const toast = useToast();

    const handleShare = () => {
        const browserURL = new URL(window.location.href);
        const itmLink = `${browserURL.protocol}//${browserURL.host}?letter=${name}`;
        navigator.clipboard.writeText(itmLink);
        toast({
            title: 'Share link copied to clipboard.',
            description: itmLink,
            variant: 'left-accent',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
    };

  return(
    <Card w={[268, 320, 380, 430, 430, 568]}>
        <CardHeader>
            <Heading size='md'>{title}</Heading>
        </CardHeader>
        <CardBody>
            <Text>{description}</Text>
        </CardBody>
        <Divider />
        <CardFooter>
            <Button onClick={handleShare}> Share link</Button>
        </CardFooter>
    </Card>
   )
  }


const ShiftingPopover = ({name, title, description}) => {
    const [parent] = useAutoAnimate();
    const dispatch = useDispatch();
    const isInvokedAsParam = useURLParam('letter', name);

    if (isInvokedAsParam) dispatch(selectItem(name));

    const selectedLetter = useSelector((state) => state.sftpopover.item_id);
    const isOpen = (selectedLetter === name);

    
    const reveal = () => {
        const browserURL = new URL(window.location.href);
        if (browserURL.searchParams.get('letter')) {
            window.history.replaceState(null, document.title, "/");
        };
        isOpen ? dispatch(selectItem('')) : dispatch(selectItem(name));
    };

  return(
    <GridItem>
        <Button colorScheme='teal' size='lg' w='100%' m='3%' onClick={reveal} ref={parent} >
            {name}
        </Button>
        { isOpen && <SplashDescription name={name} title={title} description={description} /> }
    </GridItem>
   )
  }

export default ShiftingPopover;

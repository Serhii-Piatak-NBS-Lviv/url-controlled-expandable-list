import React, {useState, useRef, useEffect } from 'react';
import { CloseIcon } from '@chakra-ui/icons'
import { css } from '@emotion/css';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { Button, GridItem, Card, CardHeader, CardBody, CardFooter, Heading, Text, Divider} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { selectItem } from './sftpopoverSlice';
import useURLParam from '../hooks/useURLParam';

/**
* @author
* @function ShiftingPopover
**/

const cardWrapper = css`
    position: relative;
    border: solid 1px red !important;
`;

const arrow = css`
    position: absolute;
    height: 20px;
    width: 20px;
    top: -11px;
    border-left: solid 1px red;
    border-top: solid 1px red;
    background: #fff;
    transform: rotate(45deg);
`;

const SplashDescription = ({name, title, description, simpleGridRef, gridItemRef}) => {
    const toast = useToast();
    const cardRef = useRef();  
    const dispatch = useDispatch();
    
    const [cardPosition, setCardPosition] = useState({toLeft: null, arrowPosition: null});
    const [width, setWidth] = useState(null);

    useEffect(() => {
        function setCardPlacement() {
            setCardPosition({
                arrowPosition: gridItemRef.current ? (gridItemRef.current.offsetLeft + (gridItemRef.current.offsetWidth / 2) - 10) : null,
                toLeft: gridItemRef.current.offsetLeft - 10 || null
            });
            setWidth(simpleGridRef.current.offsetWidth);
        };
        window.addEventListener("resize", () => setCardPlacement());
        setCardPlacement();
      }, [gridItemRef, simpleGridRef]);
    
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

    const closePopup = () => {
        const urlWithoutQuery = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, urlWithoutQuery);
        dispatch(selectItem(''));
    }

  return(
    <Card
        className={cardWrapper}
        as={motion.div}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5 }}        
        ref={cardRef}
        w={width}
        mt='10px'
        right={ cardPosition.toLeft ? `${cardPosition.toLeft}px` : ''}
    >
        <span 
            className={arrow}
            style={{left: `${cardPosition.arrowPosition ? cardPosition.arrowPosition : 0}px`}}
        />
        <Button position='absolute' right='20px' top='20px' onClick={() => closePopup()}>
            <CloseIcon/>
        </Button>
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

const ShiftingPopover = ({name, title, description, simpleGridRef}) => {
    const dispatch = useDispatch();
    
    const gridItemRef = useRef();
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
        <Button 
            ref={gridItemRef}
            colorScheme='teal' 
            size='lg' w={'100%'} 
            m='3%' 
            onClick={reveal}> 
            {name} 
        </Button>
        { isOpen && <SplashDescription 
            name={name} 
            title={title} 
            description={description}
            simpleGridRef={simpleGridRef}
            gridItemRef={gridItemRef}/> }
    </GridItem>
   )
}

export default ShiftingPopover;
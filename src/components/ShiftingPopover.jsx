import React, {useState, useRef, useEffect } from 'react';
import { css } from '@emotion/css';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { Button, GridItem, Card, CardHeader, CardBody, CardFooter, Heading, Text, Divider,/* position */} from '@chakra-ui/react';
// import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useToast } from '@chakra-ui/react';
import { selectItem } from './sftpopoverSlice';
import useURLParam from '../hooks/useURLParam';

// ToDo: put a hook to monitor resizing of Simple Grid

/**
* @author
* @function ShiftingPopover
**/

const cardWrapper = css`
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
    
    const [cardPosition, setCardPosition] = useState({toLeft: null, arrowPosition: null})

    useEffect(() => {
        setCardPosition({
            arrowPosition: gridItemRef.current ? (gridItemRef.current.offsetLeft + (gridItemRef.current.offsetWidth / 2) - 10) : null, //calcArrowPosition(gridItemRef),
            toLeft: cardRef.current.offsetLeft || null //calcCardPosition(cardRef)
        })
      }, []);
    
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

    // function calcCardPosition(cardRef) {
    //     if (cardRef.current) {
    //         return cardRef.current.offsetLeft;
    //     }
    //     return null;
    // }

    // function calcArrowPosition(gridItemRef) {
    //     if(gridItemRef.current) {
    //         return gridItemRef.current.offsetLeft + (gridItemRef.current.offsetWidth / 2) - 10;
    //     }
    //     return null;
    // }

  return(
    <Card 
        // w={[268, 320, 380, 430, 430, 568]}
        className={cardWrapper}
        as={motion.div}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5 }}        
        ref={cardRef}
        w={simpleGridRef.current?.offsetWidth ? `${simpleGridRef.current.offsetWidth}px` : ''}
        mt='10px'
        right={ cardPosition.toLeft ? `${cardPosition.toLeft}px` : ''}
    >
        <span 
            className={arrow}
            style={{left: `${cardPosition.arrowPosition ? cardPosition.arrowPosition : 0}px`}}
        />
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
    // const [parent] = useAutoAnimate();
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
            onClick={reveal} /* ref={parent} */
        >
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

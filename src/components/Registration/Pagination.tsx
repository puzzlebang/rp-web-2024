import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaSave } from "react-icons/fa";
import { Flex, Center, Button, Spacer, IconButton, useMediaQuery } from "@chakra-ui/react";
import Config from "../../config";
import handleSubmit from "../../routes/Registration";

interface PaginationProps {
    pageNo: number;
    goPrevPage: () => void;
}

export function Pagination({pageNo, goPrevPage}: PaginationProps) {
	const [isMedium] = useMediaQuery("(max-width: 600px)");
	const [isSmall] = useMediaQuery("(max-width: 400px)");
	const [isTiny] = useMediaQuery("(max-width: 300px)");

	function shouldEnableBack() {
		console.log(pageNo);
		return pageNo != 0;
	}

	function shouldEnableNext() {
		return pageNo != Config.NUM_REGISTRATION_PAGES - 1;
	}

	function NextButton() {
		return <IconButton color='white' borderRadius='50%' bgColor='#EC99A7' m="10px" ml={isTiny ? '40px' :'80px'} maxHeight='40px' onMouseDown={(event)=>{event.preventDefault();}} type="submit" padding='20px' onClick={() => console.log("click!")} isDisabled={!shouldEnableNext()} aria-label='Next' height="40px" width="40px" icon={<ChevronRightIcon />} />;
	}

	function SubmitButton() {
		return <Button color='white' bgColor='#EC99A7' borderRadius='10px' type="submit" m="10px" padding={isTiny ? "10px" : "20px"} py='20px' aria-label='Next' maxHeight='40px' > Submit! </Button>;
	}

	return (
		<Flex width="full" padding="10px" maxWidth={isMedium ? '90vw': '80vw'} marginLeft={isMedium ? '5vw': '10vw'}>
			<Center> <Button color='white' bgColor='#EC99A7' borderRadius='10px' m="10px" maxHeight='40px' padding={isTiny ? "15px" : "20px"} variant="solid" minWidth='auto' maxWidth="160px">{isSmall ? <FaSave/> : "Save" } </Button> </Center>
			<Spacer />
			<Center>
				<IconButton color='white' bgColor='#EC99A7' borderRadius='50%' m="10px" maxHeight='40px' isDisabled={!shouldEnableBack()} onClick={goPrevPage} aria-label='Back' padding='20px' height="40px" width="40px" icon={<ChevronLeftIcon />} />
                
				{shouldEnableNext() ? <NextButton /> : <SubmitButton />}
			</Center>
		</Flex>

	);
}

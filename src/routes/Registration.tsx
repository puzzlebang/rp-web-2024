import { Box, VStack, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';
import { NavBar } from '../components/NavBar';
import AttendeeInformation from '../components/Registration/Pages/AttendeeInformation';
import Education from '../components/Registration/Pages/Education';
import Diversity from "../components/Registration/Pages/Diversity";
import Engagement from '../components/Registration/Pages/Engagement';
import { useToast } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BlueSands from '/Registration/blue_desert.svg';
import MobileBG from '/Registration/mobile_bg.svg';
import Career from '../components/Registration/Pages/Career';
import Config from '../config';

export interface PageProps {
	pageNo: number;
	goNextPage: () => void;
	goPrevPage: () => void;
	setAttendeeData: React.Dispatch<React.SetStateAction<object>>;
	attendeeData: object;
}

export interface FormikValues {
    [key: string]: unknown;
}

export default function Registration() {
	const [isSmall] = useMediaQuery("(max-width: 600px)");
	const [isShort] = useMediaQuery("(max-height: 735px)");
	const [pageNo, setPageNo] = useState(4);
    const [attendeeData, setAttendeeData] = useState({
		name: "",
		email: "",
		university: "",
		graduation: "",
		major: "",
		dietaryRestrictions: [""],
		age: 1,
		gender: "",
		race: [""],
		ethnicity: [""],
		allergies: [],
		firstGen: "",
		hearAboutRP: [""],
		portfolio: "",
		jobInterest: [""],
		isInterestedMechMania: false,
		isInterestedPuzzleBang: false,
		hasResume: true,
		hasSubmitted: false,
	});
    const [searchParams] = useSearchParams();
    const toast = useToast();

	function goNextPage() {
		setPageNo(pageNo + 1);
	}

	function goPrevPage() {
		setPageNo(pageNo - 1);
	}

	function handleSave(values: object) {	
		console.log("in save")
		if(pageNo==Config.NUM_REGISTRATION_PAGES - 1){
			console.log("go submit")

			setAttendeeData((prevData) => {
				const newData = { ...prevData, ...values };
				handleSubmit(newData);
				return newData;
			});
		}else{
			console.log("go save")
			setAttendeeData((prevData) => {
				const newData = { ...prevData, ...values };
				saveData(newData);
				return newData;
			});
		}
	}
	

async function saveData(data: object) {
    try {
        const jwt = localStorage.getItem("jwt") || searchParams.get("token");
        if (!jwt) {
            console.log("JWT token not found, redirecting...");
            window.location.href = Config.BASE_URL + "auth/login/web";
            return;
        }

        console.log("JWT token found:", jwt);

        const promise = axios.post(
            Config.BASE_URL + "registration/save",
            {
                ...data,
                hasSubmitted: false,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${jwt}`,
                },
            }
        );

        toast.promise(promise, {
            success: {
                title: "Success!",
                description: "Your data has been saved.",
            },
            error: {
                title: "Oops!",
                description: "Something went wrong - please try again.",
            },
            loading: { title: "Saving", description: "Please wait..." },
        });
    } catch (error) {
        // console.log("Error in saveData:", error.response?.data);
        console.error("Error saving data:", error);
    }
}

async function handleSubmit(data: object) {
	try {
		const jwt = localStorage.getItem("jwt") || searchParams.get("token");
		if (!jwt) {
			window.location.href = Config.BASE_URL + "auth/login/web";
			return;
		}

		const promise = axios.post(
			Config.BASE_URL + "registration/submit",
			{
				...data,
				hasSubmitted: true,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `${jwt}`,
				},
			}
		);

		toast.promise(promise, {
			success: {
				title: "Success!",
				description: "Your data has been submitted.",
			},
			error: {
				title: "Oops!",
				description: "Something went wrong - please try again.",
			},
			loading: { title: "Submitting", description: "Please wait..." },
		});
	} catch (error) {
		console.error("Error submitting data:", error);
	}
}



	const props: PageProps = {
		pageNo: pageNo,
		goNextPage: goNextPage,
		goPrevPage: goPrevPage, 
		setAttendeeData: handleSave,
		attendeeData: attendeeData,
	};

	function getPage() {
		switch (pageNo) {
		case 0: return <AttendeeInformation {...props}/>;
		case 1: return <Education {...props}/>;
		case 2: return <Career {...props} />
		case 3: return <Diversity {...props}/>;
		case 4: return <Engagement {...props}/>;
		}
	}

	return (
		<VStack spacing={0}>
			<NavBar />
			<Box bgImage={isSmall ? MobileBG : isShort ? MobileBG : BlueSands} bgSize="115% 105%" bgPosition="center calc(100% + 55px)" bgRepeat="no-repeat" minH="100vh" minW="100vw">
				{getPage()}
			</Box>
		</VStack>

	);
}

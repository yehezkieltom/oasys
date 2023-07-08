import {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {Provider} from "react-native-paper";
//import {NativeModules} from 'react-native';
import AddWaterIntake from "../../components/addWaterIntake";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import StockImage from "../../assets/successful-man-giving-glass-water-600w-444674071.webp";

//const {MyNativeModule} = NativeModules;



const HomeScreen = () => {
    const [consumedWater, setConsumedWater] = useState(0);
    const [currentGoal, setCurrentGoal] = useState(0);
    const [dateOfBirth, setDateOfBirth] = useState(new Date(Date.now()));
    const [gender, setGender] = useState(null);
    const [breastfeeding, setBreastfeeding] = useState(false);
    const [pregnant, setPregnant] = useState(false);
    const [diarrhea, setDiarrhea] = useState(false);
    const [reloadCount, setReloadCount] = useState(0);
    const [reloadTrigger, setReloadTrigger] = useState(false);

    const loadWaterProgress = async () => {
        let waterProgress = 0;
        try {
            const storedWaterProgress = await AsyncStorage.getItem(new Date(Date.now())
                .toLocaleString('de',{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                }));
            if (storedWaterProgress) {
                const fetchedWaterProgress = JSON.parse(storedWaterProgress);
                waterProgress = fetchedWaterProgress.waterProgress;
            }
        } catch (e) {
            console.warn(e);
        }
        setConsumedWater(waterProgress);
    }

    const loadUserInfo = async () => {
        try {
            const storedData = await AsyncStorage.getItem('userInfo');
            if (storedData) {
                const fetchedUserInfo = JSON.parse(storedData);
                if (fetchedUserInfo.gender) {
                    setGender(fetchedUserInfo.gender)
                }
                if (fetchedUserInfo.dateBirth) {
                    setDateOfBirth(fetchedUserInfo.dateBirth)
                }
                if (fetchedUserInfo.breastfeeding) {
                    setBreastfeeding(fetchedUserInfo.breastfeeding)
                }
                if (fetchedUserInfo.pregnant) {
                    setPregnant(fetchedUserInfo.pregnant)
                }
                if (fetchedUserInfo.diarrhea) {
                    setDiarrhea(fetchedUserInfo.diarrhea)
                }
            }
        } catch (e) {
            console.error('Error loading user info:', e);
        }
    }
    //trigger data update on UI
    useEffect(() => {
        let reloadInterval = setInterval(() => {
            loadUserInfo().then(() => {
                let calculatedDailyGoal;
                const currentTime = new Date(Date.now());
                const userAge = Math.abs(Math.round((currentTime.getTime() - dateOfBirth.getTime())/31557600000));
                switch (userAge) {
                    case (userAge >= 1 && userAge <= 3):
                        calculatedDailyGoal = 950; //ml
                        break;
                    case (userAge >= 4 && userAge <= 8):
                        calculatedDailyGoal = 1185; //ml
                        break;
                    case (userAge >= 9 && userAge <= 13):
                        calculatedDailyGoal = 1656; //ml
                        break;
                    case (userAge >= 14 && userAge <= 18):
                        calculatedDailyGoal = 1893; //ml
                        break;
                    case (userAge >= 19):
                        calculatedDailyGoal = 2130; //ml
                        break;
                    default:
                        calculatedDailyGoal = 1893; //ml

                }
                if (gender === 'Male' && userAge >= 14) {
                    calculatedDailyGoal *= 1.375;
                }

                if (pregnant) {
                    calculatedDailyGoal = 2366; //ml
                }

                if (breastfeeding) {
                    calculatedDailyGoal = 3076; //ml
                }
                if (diarrhea) {
                    calculatedDailyGoal += 1182; //ml
                }
                //interpolate the daily goal to the current hours of the day
                const currentHour = currentTime.getHours() === 0 ? 1 : currentTime.getHours();
                setCurrentGoal(Math.round(calculatedDailyGoal*(currentHour/24)));

            }).then(() => loadWaterProgress());
        }, 2000);//reloads every 1 min

        return () => clearInterval(reloadInterval);
    }, []);

    //update data on UI
    // useEffect(() => {
    //
    // },[reloadTrigger]);

    return (
        <Provider>
            <View style={styles.fullScreenView}>
                {/*<ImageBackground source={StockImage} resizeMode="cover" style={styles.image}></ImageBackground>*/}
                <View style={styles.consumedAndGoal}>
                    <Text style={styles.consumedWater}>{consumedWater}/</Text>
                    <Text style={styles.currentGoal}>{currentGoal}</Text>
                </View>
            </View>

            <View style={styles.fabContainer}>
                <AddWaterIntake />
            </View>
        </Provider>
    )
};

const styles = StyleSheet.create({
    consumedAndGoal: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        paddingRight: 36
    },
    consumedWater: {
      fontSize: 72
    },
    currentGoal: {
       fontSize: 72
    },

    fullScreenView: {
        flex: 1,
        backgroundColor: '#aaa',
        zIndex: 0,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        zIndex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    }
});


export default HomeScreen;
import React from 'react';
import { FAB, Portal } from "react-native-paper";
import {useNavigation} from '@react-navigation/native'

const AddWaterIntake = () => {



    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({open});
    const navigation = useNavigation();
    const { open } = state;
    return (
            <Portal>
                <FAB.Group
                    open={open}
                    visible
                    color='#fff'
                    icon={open ? 'close' : 'plus' }
                    label='consume water'
                    actions={[
                        {
                            icon: 'clipboard-arrow-down',
                            label: 'retrieve record',
                            onPress: () => {
                                navigation.navigate('NFC Screen', {
                                    operationMode: 2,
                                    desiredSetting: 0
                                });
                            }
                        },
                        {
                            icon: 'cup',
                            label: 'add manually',
                            onPress: () => navigation.navigate('Manual Add Water'),
                        },
                        {
                            icon: 'countertop',
                            label: 'dispense water',
                            onPress: () => navigation.navigate('Dispense Water'),
                        },
                        {
                            icon: 'water-pump',
                            label: 'refill water tank',
                            onPress: () => navigation.navigate('Refill Water'),
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {}}
                    fabStyle={{
                        backgroundColor: '#19A7CE'
                    }}
                />
            </Portal>
    );
};

export default AddWaterIntake;

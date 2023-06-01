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
                    actions={[
                        {
                            icon: 'cup',
                            label: 'add manually',
                            onPress: () => console.log('\'add manually\' pressed!'),
                        },
                        {
                            icon: 'countertop',
                            label: 'dispense water',
                            onPress: () => navigation.navigate('Dispense Water')
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

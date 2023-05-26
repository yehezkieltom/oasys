import React from 'react';
import { FAB, Portal } from "react-native-paper";


const AddWaterIntake = () => {
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({open});

    const { open } = state;
    return (
            <Portal>
                <FAB.Group
                    open={open}
                    visible
                    icon={open ? 'close' : 'plus' }
                    actions={[
                        {
                            icon: 'cup',
                            label: 'add manually',
                            onPress: () => console.log('\'add manually\' pressed!')
                        },
                        {
                            icon: 'countertop',
                            label: 'dispense water',
                            onPress: () => console.log('\'dispense water\' pressed!')
                        },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {}}
                />
            </Portal>
    );
};

export default AddWaterIntake;

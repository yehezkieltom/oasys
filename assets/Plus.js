import React from 'react';
import Svg, { Polygon } from 'react-native-svg';
const Plus = props => (
    <Svg xmlns="http://www.w3.org/2000/svg" {...props}>
        <Polygon className="cls-1"
                 points="40 13.5 26.5 13.5 26.5 0 13.5 0 13.5 13.5 0 13.5 0 26.5 13.5 26.5 13.5 40 26.5 40 26.5 26.5 40 26.5 40 13.5"/>
    </Svg>
);

export default Plus;
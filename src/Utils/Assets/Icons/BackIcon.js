import React from 'react';

import Svg, {Path} from 'react-native-svg';

const BackIcon = ({color}) => {
    return (
        <Svg height="30" width="30" viewBox="0 0 312 512">
            <Path
                style={{
                    fill: color ? color : '#fff',
                }}
                d="m68.69 184.48 443.31.55v34.98l-438.96-.54 173.67 159.15-23.6 25.79L0 199.94 218.6.02l23.6 25.79z"
            />
        </Svg>
    );
};

export default BackIcon;

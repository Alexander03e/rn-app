import Svg, { Path, SvgProps } from 'react-native-svg';

export const List = (props: SvgProps) => {
    return (
        <Svg
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            width={20}
            height={20}
            stroke='white'
            {...props}
        >
            <Path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z'
            />
        </Svg>
    );
};

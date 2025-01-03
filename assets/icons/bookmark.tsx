import Svg, { Path, SvgProps } from 'react-native-svg';

export const Bookmark = (props: SvgProps) => {
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
                d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
            />
        </Svg>
    );
};

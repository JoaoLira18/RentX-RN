import React from 'react';

import LottieView from 'lottie-react-native';
import load_animated from '../../assets/load_animated.json'

import {
    Container,
} from './styles'

export function LoadAnimation() {
    return (
        <Container>
            <LottieView
                source={load_animated}
                autoPlay
                style={{height: 200}}
                resizeMode="contain"
                loop
            />
        </Container>
    );
}
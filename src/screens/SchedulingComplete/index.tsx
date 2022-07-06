import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import {
   Container,
   Content,
   Title,
   Message,
   Footer,
} from './styles'

import { ConfirmButton } from '../../components/ConfirmButton';
import { StatusBar } from 'react-native';

export function SchedulingComplete(){
    const { width } = useWindowDimensions()
    const navigation = useNavigation()

    function handleConfirm() {
       navigation.navigate('Home')
    }

    return (
        <Container>
            <StatusBar
                barStyle='light-content'
                translucent
                backgroundColor="transparent"
        />
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro Alugado</Title>

                <Message>
                  Agora voce so precisa ir {`\n`}
                  ate a concessionaria da RENTX {`\n`}
                  pegar seu automovel
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title='OK' onPress={handleConfirm} />
            </Footer>
        </Container>
    );
}
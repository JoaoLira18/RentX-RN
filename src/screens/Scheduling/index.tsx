import React, { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import ArrowSvg from '../../assets/arrow.svg'
import { Button } from '../../components/Button';
import {
    Calendar,
    DayProps,
    generatorInterval,
    MarkedDateProps
} from '../../components/Calendar';

import { StatusBar } from 'react-native';

import { format } from 'date-fns';
import { CarDTO } from '../../dtos/carDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DataInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
    BackButtonWrapper,
} from './styles'

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO
}

export function Scheduling() {
    const theme = useTheme()
    const navigation = useNavigation()
    const route = useRoute()
    const { car } = route.params as Params

    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

    function handleConfirmRental() {
        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDates)
        })
    }

    function handleBack() {
        navigation.goBack()
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if (start.timestamp > end.timestamp) {
            start = end
            end = start
        }

        setLastSelectedDate(end)
        const interval = generatorInterval(start, end)
        setMarkedDates(interval)

        const firstDate = Object.keys(interval)[0]
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1]

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })

    }

    return (
        <Container>
            <Header>
                <StatusBar
                    barStyle='light-content'
                    translucent
                    backgroundColor="transparent"
                />
                <BackButtonWrapper>
                    <BackButton
                        onPress={handleBack}
                        color={theme.colors.shape}
                    />
                </BackButtonWrapper>

                <Title>
                    Escolha uma {'\n'}
                    data de inicio e{'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DataInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted}>
                            {rentalPeriod.startFormatted}
                        </DateValue>
                    </DataInfo>

                    <ArrowSvg />

                    <DataInfo>
                        <DateTitle>Ate</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DataInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}
                />
            </Content>

            <Footer>
                <Button
                    title="Confirmar"
                    onPress={handleConfirmRental}
                    disabled={!rentalPeriod.startFormatted}
                />
            </Footer>
        </Container>
    );
}
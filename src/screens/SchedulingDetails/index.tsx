import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { CarDTO } from '../../dtos/carDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from '../../utils/getPlatformDate';
import { format } from 'date-fns';

import {
   Container,
   Header,
   CarImages,
   Content,
   Details,
   Description,
   Brand,
   Name,
   Rent,
   Period,
   Price,
   Accessories,
   Footer,
   RentalPeriod,
   CalendarICon,
   DateInfo,
   DateTitle,
   DateValue,
   RentalPrice,
   RentalPriceLabel,
   RentalPriceDetails,
   RentalPriceQuota,
   RentalPriceTotal,
} from './styles'

import api from '../../services/api';
import { Alert, StatusBar } from 'react-native';

interface Params {
   car: CarDTO,
   dates: string[]
}

interface RentalPeriod {
   start: string,
   end: string,
}

export function SchedulingDetails(){
   const [loading, setLoading] = useState(false)
   const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

   const theme = useTheme()
   const navigation = useNavigation()
   const route = useRoute()
   const { car, dates } = route.params as Params

   const rentTotal = Number(dates.length * car.rent.price)

   async function handleConfirmRental() {
      setLoading(true)
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

      const unavailable_dates = [
         ...schedulesByCar.data.unavailable_dates,
         ...dates,
      ];

      await api.post('schedules_byuser', {
         user_id: 1,
         car,
         startDate: String(format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy')),
         endDate: String(format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')),
      })

      api.put(`/schedules_bycars/${car.id}`, {
         id: car.id,
         unavailable_dates,
      })
      .then(() => navigation.navigate('SchedulingComplete'))
      .catch(() => {
         setLoading(false)
         Alert.alert('Nao foi possivel confirmar o agendamento')
      })
   }

   function handleBack() {
      navigation.goBack();
   }

   useEffect(() => {
      setRentalPeriod({
         start: String(format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy')),
         end: String(format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'))
      })

   }, [])

   return (
      <Container>
         <StatusBar
            barStyle='dark-content'
            backgroundColor="transparent"
            translucent
         />
         <Header>
            <BackButton onPress={handleBack} />

         </Header>

         <CarImages>
            <ImageSlider
               imagesUri={car.photos}
            />
         </CarImages>

         <Content>
            <Details>
               <Description>
                  <Brand>{car.brand}</Brand>
                  <Name>{car.name}</Name>
               </Description>

               <Rent>
                  <Period>{car.rent.period}</Period>
                  <Price>{car.rent.price}</Price>
               </Rent>
            </Details>

            <Accessories>
               {
                  car.accessories.map(accessory => (
                     <Accessory
                        key={accessory.type}
                        name={accessory.name}
                        icon={getAccessoryIcon(accessory.type)} />
                  ))
               }
            </Accessories>

            <RentalPeriod>
                  <CalendarICon>
                     <Feather
                        name='calendar'
                        size={RFValue(24)}
                        color={theme.colors.shape}
                     />
                  </CalendarICon>

                  <DateInfo>
                     <DateTitle>De</DateTitle>
                     <DateValue>{rentalPeriod.start}</DateValue>
                  </DateInfo>

                  <Feather
                     name='chevron-right'
                     size={RFValue(10)}
                     color={theme.colors.shape}
                  />

                  <DateInfo>
                     <DateTitle>Ate</DateTitle>
                     <DateValue>{rentalPeriod.end}</DateValue>
                  </DateInfo>
               
            </RentalPeriod>

            <RentalPrice>
               <RentalPriceLabel>Total</RentalPriceLabel>
               <RentalPriceDetails>
                  <RentalPriceQuota>{`R$ ${car.rent.price} ${dates.length}X diarias`}</RentalPriceQuota>
                  <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
               </RentalPriceDetails>
            </RentalPrice>

         </Content>

         <Footer>
            <Button
               title={'Alugar agora'}
               color={theme.colors.success}
               onPress={handleConfirmRental}
               loading={loading}
               disabled={loading}
            />
         </Footer>

      </Container>
   );
}
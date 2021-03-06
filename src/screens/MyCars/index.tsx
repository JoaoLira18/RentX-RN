import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/carDTO';
import api from '../../services/api';
import { AntDesign } from '@expo/vector-icons'

import {
   Container,
   Header,
   Title,
   SubTitle,
   Content,
   Appointments,
   AppointmentsTitle,
   AppointmentsQuantity,
   CarWrapper,
   CarFooter,
   CarFooterTitle,
   CarFooterPeriod,
   CarFooterDate,
   BackButtonWrapper,
} from './styles'
import { LoadAnimation } from '../../components/LoadAnimation';

interface CarProps {
   id: string,
   user_id: string,
   car: CarDTO,
   startDate: string,
   endDate: string,
}

export function MyCars() {
   const theme = useTheme()
   const [cars, setCars] = useState<CarProps[]>([])
   const [loading, setLoading] = useState(true)
   const navigation = useNavigation()

   function handleBack() {
      navigation.goBack()
   }

   useEffect(() => {
      async function fetchCars() {
         try {
            const response = await api.get('schedules_byuser?user_id=1')
            setCars(response.data)
         } catch (error) {
            console.log(error)
         } finally {
            setLoading(false)
         }
      }

      fetchCars()
   }, [])

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
               Seus agendamentos, {'\n'}
               estao aqui
            </Title>

            <SubTitle>Conforto, seguranca e praticidade</SubTitle>
         </Header>
         {loading ? <LoadAnimation /> :
            <Content>
               <Appointments>
                  <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                  <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
               </Appointments>

               <FlatList
                  data={cars}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                     <CarWrapper>
                        <Car data={item.car} />
                        <CarFooter>
                           <CarFooterTitle>Periodo</CarFooterTitle>
                           <CarFooterPeriod>
                              <CarFooterDate>{item.startDate}</CarFooterDate>
                              <AntDesign
                                 name='arrowright'
                                 size={20}
                                 color={theme.colors.title}
                                 style={{ marginHorizontal: 10 }}
                              />
                              <CarFooterDate>{item.endDate}</CarFooterDate>
                           </CarFooterPeriod>
                        </CarFooter>
                     </CarWrapper>
                  )}
               />
            </Content>
         }
      </Container>
   );
}
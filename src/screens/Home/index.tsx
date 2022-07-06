import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
   useSharedValue,
   useAnimatedStyle,
   useAnimatedGestureHandler,
   withSpring,
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

import Logo from '../../assets/logo.svg'
import api from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
   Container,
   Header,
   TotalCars,
   HeaderContent,
   CarList,
   MyCarsButton
} from './styles'
import { useTheme } from 'styled-components';
import theme from '../../styles/theme';

export function Home() {
   const theme = useTheme()
   const [cars, setCars] = useState<CarDTO[]>([])
   const [loading, setLoading] = useState(true)
   const navigation = useNavigation()

   const positionY = useSharedValue(0)
   const positionX = useSharedValue(0)

   const onGestureEvent = useAnimatedGestureHandler({
      onStart(_event, ctx: any) {
         ctx.positionX = positionX.value
         ctx.positionY = positionY.value
      },
      onActive(event, ctx: any) {
         positionX.value = ctx.positionX + event.translationX
         positionY.value = ctx.positionY + event.translationY
      },
      onEnd() {
         positionX.value = withSpring(0);
         positionY.value = withSpring(0);
      }
   })

   const myCarsButtonStyle = useAnimatedStyle(() => {
      return {
         transform: [
            { translateX: positionX.value },
            { translateY: positionY.value }
         ]
      }
   })

   useEffect(() => {
      const back = BackHandler.addEventListener('hardwareBackPress', () => true)

      async function fetchCars() {
         try {
            const response = await api.get('/cars')
            setCars(response.data)
         } catch (error) {
            console.log(error)
         } finally {
            setLoading(false)
         }
      }

      fetchCars()

      return () => back.remove()
   }, [])

   function handleCarDetails(car: CarDTO) {
      navigation.navigate('CarDetails', { car })
   }

   function handleOpenMyCars() {
      navigation.navigate('MyCars')
   }

   return (
      <Container>
         <StatusBar
            barStyle='light-content'
            backgroundColor="transparent"
            translucent
         />
         <Header>
            <HeaderContent>
               <Logo
                  width={RFValue(108)}
                  height={RFValue(12)}
               />
               { !loading &&
                  <TotalCars>
                     Total de {cars.length} cars
                  </TotalCars>
               }
            </HeaderContent>
         </Header>
 
         {loading ? <LoadAnimation /> :
            <CarList
               data={cars}
               keyExtractor={(item) => item.id}
               renderItem={({ item }) =>
                  <Car
                     data={item}
                     onPress={() => handleCarDetails(item)}
                  />
               }
            />
         }

         <PanGestureHandler onGestureEvent={onGestureEvent} >
           <Animated.View
               style={[
                  myCarsButtonStyle,
                  {
                     position: 'absolute',
                     bottom: 13,
                     right: 22,
                  },
               ]}
            >
               <ButtonAnimated
                  onPress={handleOpenMyCars}
                  style={[styles.button, { backgroundColor: theme.colors.main }]}
               >
                  <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape} />
               </ButtonAnimated>
            </Animated.View>
         </PanGestureHandler>

      </Container>
   );
}

const styles = StyleSheet.create({
   button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
   }
})
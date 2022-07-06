import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CarDetails } from '../screens/CarDetails'
import { Home } from '../screens/Home'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingComplete } from '../screens/SchedulingComplete'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash'

export type RootStackParamList = {
    Splash: undefined;
    Home: undefined;
    CarDetails: { car: {}};
    Scheduling: { car: {}};
    SchedulingDetails: { car: {}, dates: {}};
    SchedulingComplete: undefined;
    MyCars: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function StackRoutes() {
    return (
        <Navigator screenOptions={{headerShown: false}} initialRouteName="Splash" >
            <Screen
                name='Splash'
                component={Splash}
                options={{gestureEnabled: false}}
            />
            <Screen
                name='Home'
                component={Home}
                options={{gestureEnabled: false}} // it disable to return to the last screen on IOS
            />
            <Screen
                name='CarDetails'
                component={CarDetails}
            />
            <Screen
                name='Scheduling'
                component={Scheduling}
            />
            <Screen
                name='SchedulingDetails'
                component={SchedulingDetails}
            />
            <Screen
                name='SchedulingComplete'
                component={SchedulingComplete}
            />
            <Screen
                name='MyCars'
                component={MyCars}
            />
        </Navigator>
    )
}
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import {
   Container,
   Title,
} from './styles'

interface Props {
   title: String;
   color?: string;
   onPress: () => void;
   disabled?: boolean;
   loading?: boolean
}

export function Button({
   title,
   color,
   onPress,
   disabled = false,
   loading = false,
}: Props){

   const theme = useTheme()
   return (
      <Container
         color={color ? color : theme.colors.main}
         onPress={onPress}
         disabled={disabled}
         style={{ opacity: (disabled === true || loading === true) ? .5 : 1 }}
      >
         { loading
            ? <ActivityIndicator color={theme.colors.shape} />
            : <Title>{title}</Title>
         }
      </Container>
   );
}
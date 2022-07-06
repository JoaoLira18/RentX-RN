import styled from 'styled-components/native';
import theme from '../../styles/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
   flex: 1;
   background-color: ${({ theme }) => theme.colors.header};

   padding-top: 76px;
`;

export const Content = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

    bottom: 40px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(35)}px;
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.secondary_600};

    padding-top: 20px;
`;

export const Message = styled.Text`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text_detail};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    text-align: center;
    line-height: ${RFValue(30)}px;

    margin-top: 16px;
`;

export const Footer = styled.View`
    width: 100%;
    align-items: center;

    margin: 50px 0;
`;
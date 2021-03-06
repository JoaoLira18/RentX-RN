import { forHorizontalIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
    Container,
    ImageIndexes,
    ImageIndex,
    CarImageWrapper,
    CarImage,
} from './styles'

interface Props {
    imagesUri: string[];
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({ imagesUri }: Props){
    const [imageIndex, setImageIndex] = useState(0)
    
    const indexChange = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index!
        setImageIndex(index)
    })

    return (
        <Container>
            <ImageIndexes>
                {
                    imagesUri.map((item, index) => (
                        <ImageIndex
                            key={index}
                            active={index === imageIndex}
                        />
                    ))
                }

            </ImageIndexes>
            
            <FlatList
                data={imagesUri}
                keyExtractor={key => key}
                renderItem={({ item }) => (
                    <CarImageWrapper>
                        <CarImage
                            source={{ uri: item }}
                            resizeMode="contain"
                        />
                    </CarImageWrapper>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={indexChange.current}
            />
        </Container>
   );
}
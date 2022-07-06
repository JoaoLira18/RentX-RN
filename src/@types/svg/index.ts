// this file works by taking all svg and putting the SvgProps so i can import the svg as a component

declare module "*.svg" {
    import React from "react";
    import { SvgProps } from 'react-native-svg'
    const content: React.FC<SvgProps>;
    export default content
}
import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

export default function CarouselPage() {
    return (
        <AwesomeSlider>
            <div data-src="/path/to/image-0.png" />
            <div data-src="/path/to/image-1.png" />
            <div data-src="/path/to/image-2.jpg" />
        </AwesomeSlider>
    );
}
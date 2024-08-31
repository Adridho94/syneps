import { Carousel, Container } from "react-bootstrap";
import { useState } from "react";

const CarouselComponent = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <Container className="mt-5">
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img src="/src/assets/slide1.png" alt="" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/src/assets/slide2.png" alt="" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/src/assets/slide3.png" alt="" />
                    </Carousel.Item>
                </Carousel>
            </Container>
        </>
    );
}

export default CarouselComponent;
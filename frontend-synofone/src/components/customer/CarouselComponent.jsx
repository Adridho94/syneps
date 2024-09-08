import { Carousel, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Api from "../../routes/Api";
const CarouselComponent = () => {
    const [index, setIndex] = useState(0);
    const [banners, setBanners] = useState([]);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const getBanner = async () => {
        try {
            const response = await Api.get('/banners');
            // console.log(response.data.data)
            setBanners(response.data.data)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        getBanner();
    }, [0])
    return (
        <>
            <Container className="mt-5">
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    {banners.map((item, index) => (
                        <Carousel.Item key={item.id || index}>
                            <img src={item.image} alt={item.keterangan} />
                        </Carousel.Item>
                    ))}
                    {/* <Carousel.Item>
                        <img src="/src/assets/slide2.png" alt="" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="/src/assets/slide3.png" alt="" />
                    </Carousel.Item> */}
                </Carousel>
            </Container>
        </>
    );
}

export default CarouselComponent;
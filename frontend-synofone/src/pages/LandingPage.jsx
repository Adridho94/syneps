import BrandComponent from "../components/BrandComponent";
import CarouselComponent from "../components/CarouselComponent";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import SmartphoneComponent from "../components/SmartphoneComponent";
import UnggulanComponent from "../components/UnggulanComponent";

const LandingPage = () => {
    return (
        <>
            <NavbarComponent />
            <div id="banner">
                <CarouselComponent />
                <BrandComponent/>
            </div>

            <div id="unggulan">
                <UnggulanComponent/>
            </div>

            <div id="lainnya">
                <SmartphoneComponent/>
            </div>
            <FooterComponent/>
        </>
    );
}

export default LandingPage;
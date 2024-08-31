import BrandComponent from "../../components/customer/BrandComponent";
import CarouselComponent from "../../components/customer/CarouselComponent";
import FooterComponent from "../../components/customer/FooterComponent";
import NavbarComponent from "../../components/customer/NavbarComponent";
import SmartphoneComponent from "../../components/customer/SmartphoneComponent";
import UnggulanComponent from "../../components/customer/UnggulanComponent";



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
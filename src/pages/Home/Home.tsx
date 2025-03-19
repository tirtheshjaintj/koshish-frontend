import StaticNavbar from "../../components/home/StaticNavbar";
import Hero from "../../components/home/Hero/Hero";
import ImageSlider from "../../components/home/ImageSlider/ImageSlider";
import Featured from "../../components/home/Featured/Featured";
import Upcomings from "../../components/home/Upcoming/Upcomings";
import Footer from "../../components/Footer";
import BookingSteps from "../../components/home/BookingSteps/BookingSteps";

export default function Home() {
  return (
    <div className="">
      <StaticNavbar />
      <Hero />
      <ImageSlider />
      <Upcomings/>
      <BookingSteps/>
      <Featured />
      <Footer/>
    </div>
  );
}

// import styles from './MainSlider.module.css';
import Slider from 'react-slick'
import slide1 from '../../assets/images/slider-image-1.jpeg';
import slide2 from '../../assets/images/slider-image-2.jpeg';
import slide3 from '../../assets/images/slider-image-3.jpeg';
import slide4 from '../../assets/images/blog-img-1.jpeg';
import slide5 from '../../assets/images/blog-img-2.jpeg';

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }
  return <>
  <div className='d-flex my-5'>
    <div className='w-75'>
      <Slider {...settings}>
        <img className='w-100' height={400} src={slide1} alt="" />
        <img className='w-100' height={400} src={slide2} alt="" />
        <img className='w-100' height={400} src={slide3} alt="" />
    </Slider>
    </div>
    <div className='w-25'>
      <img className='w-100' height={200} src={slide4} alt="" />
      <img className='w-100' height={200} src={slide5} alt="" />
    </div>
  </div>
  </>
}

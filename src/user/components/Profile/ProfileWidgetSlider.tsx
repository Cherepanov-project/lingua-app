import type { SliderItem } from '../../../types/swiperTypes'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideItem } from './SlideItem'
import 'swiper/css'
import 'swiper/css/pagination'
import './ProfileWidgetSlider.css'

interface ProfileWidgetSliderProps {
  itemList: SliderItem[]
}

const ProfileWidgetSlider: React.FC<ProfileWidgetSliderProps> = ({ itemList }) => {
  return (
    <Swiper
      className="ProfileWidgetSlider"
      modules={[Pagination]}
      slidesPerView={3}
      pagination={{ clickable: true }}
    >
      {itemList.map((item) => {
        return (
          <SwiperSlide>
            <SlideItem title={item.title} imageUrl={item.imageUrl}></SlideItem>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export { ProfileWidgetSlider }

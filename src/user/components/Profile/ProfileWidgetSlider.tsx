import type { SliderItem } from "../../../types/swiperTypes";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideItem } from "./SlideItem";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "./ProfileWidgetSlider.css";

interface ProfileWidgetSliderProps {
  itemList: SliderItem[];
}

const ProfileWidgetSlider: React.FC<ProfileWidgetSliderProps> = ({
  itemList,
}) => {
  return (
    <Swiper
      className="ProfileWidgetSlider"
      modules={[Pagination]}
      slidesPerView={3}
      pagination={{ clickable: true }}
    >
      {itemList.map((item, index) => (
        <SwiperSlide key={item.id || item.link || index}>
          {item.link ? (
            <Link
              component={RouterLink}
              to={item.link}
              underline="none"
              color="inherit"
              sx={{
                display: "block",
                textDecoration: "none",
              }}
            >
              <SlideItem title={item.title} imageUrl={item.imageUrl} />
            </Link>
          ) : (
            <SlideItem title={item.title} imageUrl={item.imageUrl} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export { ProfileWidgetSlider };

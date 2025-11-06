import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideItem } from "./SlideItem";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "./ProfileWidgetSlider.css";
import type { Grammar } from "../../../types/grammar";

interface ProfileWidgetGrammarSlider {
  itemList: Grammar[];
}

const ProfileWidgetGrammarSlider: React.FC<ProfileWidgetGrammarSlider> = ({
  itemList,
}) => {
  return (
    <Swiper
      className="ProfileWidgetSlider"
      modules={[Pagination]}
      slidesPerView={3}
      pagination={{ clickable: true }}
      style={{
        paddingBottom: "60px",
      }}
    >
      {itemList.map((item, index) => (
        <SwiperSlide key={item.id || item.slug || index}>
          {item.slug ? (
            <Link
              component={RouterLink}
              to={`/profile/grammar/${item.slug}`}
              underline="none"
              color="inherit"
              sx={{
                display: "block",
                textDecoration: "none",
              }}
            >
              <SlideItem
                title={item.title}
                imageUrl={"./grammar-image-document.png"}
              />
            </Link>
          ) : (
            <SlideItem
              title={item.title}
              imageUrl={"./grammar-image-document.png"}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export { ProfileWidgetGrammarSlider };

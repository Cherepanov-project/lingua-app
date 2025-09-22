import { Box, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { reviews } from "../../shared/constants/reviews";

const Reviews = () => {
  let count = 0;
  return (
    <Box sx={{ p: "32px 40px" }}>
      <Box>
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "34px",
            lineHeight: "175%",
            color: "#000",
          }}
        >
          Отзывы
        </Typography>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "150%",
            color: "#878787",
          }}
        >
          Отзывы пользователей о платформе
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          mt: "34px",
        }}
      >
        {reviews.map((review) => {
          return (
            <Box
              sx={{
                border: "0.5px solid #878787",
                borderRadius: "20px",
                maxWidth: "927px",
                p: "16px",
              }}
              key={review.id}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <PersonOutlineIcon
                    sx={{
                      color: "white",
                      bgcolor: "#7e94f9",
                      fontSize: "44px",
                      borderRadius: "100%",
                      p: "6px",
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "#000",
                      }}
                    >
                      {review.name}
                    </Typography>
                    {new Array(5)
                      .fill("outlined")
                      .map((star) => {
                        if (count < review.stars) {
                          count++;
                          return "filled";
                        } else {
                          return star;
                        }
                      })
                      .map((star) => {
                        count = 0;
                        if (star === "filled") {
                          return (
                            <StarIcon
                              sx={{ fontSize: "20px", color: "#7e94f9" }}
                            />
                          );
                        } else {
                          return (
                            <StarBorderOutlinedIcon
                              sx={{ fontSize: "20px", color: "#7e94f9" }}
                            />
                          );
                        }
                      })}
                  </Box>
                </Box>
                <Typography
                  sx={{ fontWeight: "500", fontSize: "14px", color: "#878787" }}
                >
                  {review.date}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#000",
                  my: "18px",
                }}
              >
                {review.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Reviews;

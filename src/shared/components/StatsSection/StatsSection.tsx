import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";

import { statsConfig } from "../../constants/statsConfig";
import { starStyle } from "../StatsSection/StatsSection.styles";

const StatsSection = () => {
  return (
    <Box py={8}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 4,
        }}>
        {statsConfig.map((item) => (
          <Box
            key={item.id}
            sx={{
              p: 2,
              borderRadius: 8,
              backgroundColor: "#F5F5F5",
              textAlign: "center",
              height: item.height,
              minWidth: item.minWidth,
              maxWidth: item.maxWidth,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}>
            {item.type === "avatars" && item.avatars && (
              <Stack
                direction="row"
                justifyContent="center"
                spacing={0.5}
                mb={1}>
                {item.avatars.map((color, i) => (
                  <Avatar
                    key={i}
                    sx={{ bgcolor: color, width: 20, height: 20 }}
                  />
                ))}
              </Stack>
            )}

            {item.type === "icon" && item.icon && (
              <Avatar sx={{ bgcolor: item.bgColor, mx: "auto", mb: 1 }}>
                <item.icon />
              </Avatar>
            )}

            {item.type === "stars" && (
              <Stack
                direction="row"
                justifyContent="center"
                spacing={0.3}
                mb={1}>
                <StarIcon fontSize="small" sx={starStyle} />
                <StarIcon fontSize="small" sx={starStyle} />
                <StarIcon fontSize="small" sx={starStyle} />
                <StarIcon fontSize="small" sx={starStyle} />
                <StarIcon fontSize="small" sx={starStyle} />
              </Stack>
            )}

            {item.title && (
              <Typography variant="h6" fontWeight={700}>
                {item.title}
              </Typography>
            )}
            <Typography variant="body2" sx={{ whiteSpace: "normal" }}>
              {item.subtitle}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StatsSection;

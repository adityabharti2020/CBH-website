import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import Carousel from "react-multi-carousel";

import { IMG_PATH } from "../../../utils/url";

import "react-multi-carousel/lib/styles.css";

const RequestHolderCard = ({ cardData, index ,handleOpenModal}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Card
        sx={{
          width: "100%",
          backgroundColor: cardData?.emergency
            ? "rgba(250,241,226,1)"
            : cardData?.status === "closed"
            ? "rgba(204, 255, 204,0.5)"
            : "rgba(204, 204, 255,1)",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
          }}
        >
          {cardData?.status === "pending" ? (
            <Button
              variant="outlined"
              color="error"
              sx={{ borderRadius: "15px" }}
              size="small"
              onClick={()=>handleOpenModal(cardData)}
            > 
              Notify As concerned
            </Button>
          ) : (
            <Chip
              label={cardData?.status}
              size="small"
              color={
                cardData?.status === "closed"
                  ? "success"
                  : cardData?.status === "resolved"
                  ? "info"
                  : "warning"
              }
            />
          )}
        </Box>
        {/* <CardActionArea> */}
        <CardContent>
          <Stack
            // direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <img
              width={"25px"}
              height={"25px"}
              src={`${IMG_PATH}${cardData?.problemId?.problemIcon?.url}`}
              alt={cardData?.problemId?.problemType}
            />
            <Typography gutterBottom variant="h5" component="div">
              {cardData?.problemId?.problemType}
              <Typography
                variant="body2"
                fontFamily={"monospace"}
                fontSize={"15px"}
                fontWeight={"bold"}
                component={"span"}
                color={"error.dark"}
              >
                {cardData?.emergency ? "(urgent)" : ""}
              </Typography>
            </Typography>
          </Stack>

          <Stack>
            <Typography color={"error.dark"}>
              Request Raised From {cardData?.shop?.type} :{" "}
              {cardData?.shop?.shopNo} on Floor : {cardData?.shop?.floor?.floor}
            </Typography>
            <Typography variant="h6">Problem Desicription</Typography>
            <Typography variant="body2" color="text.secondary">
              {cardData?.description}
            </Typography>
          </Stack>
          <Stack>
            <Typography variant="h6" component={"address"}>
              Images Shared By User
            </Typography>
            <Carousel
              swipeable={"false"}
              draggable={"false"}
              showDots={"true"}
              responsive={responsive}
              ssr={"true"} // means to
              infinite={"true"}
              autoPlay={responsive.deviceType !== "mobile"}
              autoPlaySpeed={1000}
              keyBoardControl={"true"}
              transitionDuration={1000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {cardData?.images?.map((item, i) => {
                if (
                  item?.filename?.split(".")[
                    item?.filename?.split(".").length - 1
                  ] === "mp4"
                ) {
                  return (
                    <Box
                      key={i}
                      height={{ md: "150px", xs: "250px" }}
                      width={{ md: "150px", xs: "250px" }}
                    >
                      <video
                        autoPlay
                        controls
                        loop
                        muted
                        poster="https://assets.codepen.io/6093409/river.jpg"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <source
                          src={`${IMG_PATH}${item?.filePath}`}
                          type="video/mp4"
                        />
                      </video>
                    </Box>
                  );
                }
                return (
                  <Box
                    key={i}
                    height={{ md: "150px", xs: "250px" }}
                    width={{ md: "150px", xs: "250px" }}
                  >
                    <img
                      srcSet={`${IMG_PATH}${item?.filePath}`}
                      src={`${item.filePath}`}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                );
              })}
            </Carousel>
          </Stack>

          {cardData?.adminImages?.length > 0 ? (
            <Stack>
              <Typography variant="h6" component={"address"}>
                Maintenace Done Shared Images/Videos
              </Typography>
              <Carousel
                swipeable={"true"}
                draggable={"true"}
                showDots={"true"}
                responsive={responsive}
                ssr={"true"} // means to
                infinite={"true"}
                autoPlay={responsive.deviceType !== "mobile"}
                autoPlaySpeed={1000}
                keyBoardControl={"true"}
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
              >
                {cardData?.adminImages?.map((item, i) => {
                  if (
                    item?.filename?.split(".")[
                      item?.filename?.split(".").length - 1
                    ] === "mp4"
                  ) {
                    return (
                      <Box
                        key={i}
                        height={{ md: "150px", xs: "250px" }}
                        width={{ md: "150px", xs: "250px" }}
                      >
                        <video
                          autoPlay
                          controls
                          loop
                          muted
                          poster="https://assets.codepen.io/6093409/river.jpg"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <source
                            src={`${IMG_PATH}${item?.filePath}`}
                            type="video/mp4"
                          />
                        </video>
                      </Box>
                    );
                  }
                  return (
                    <Box
                      key={i}
                      height={{ md: "150px", xs: "250px" }}
                      width={{ md: "150px", xs: "250px" }}
                    >
                      <img
                        srcSet={`${IMG_PATH}${item?.filePath}`}
                        src={`${item.filePath}`}
                        alt={item.title}
                        loading="lazy"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                  );
                })}
              </Carousel>
            </Stack>
          ) : (
            ""
          )}
        </CardContent>
        {/* </CardActionArea> */}
      </Card>
    </>
  );
};

export default RequestHolderCard;

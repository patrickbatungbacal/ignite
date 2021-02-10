import React from "react";

//Styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

//Tippy for tooltips
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

//Redux
import { useSelector } from "react-redux";

//React Router
import { useHistory } from "react-router-dom";
import { smallImage } from "../util";

//platform images
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";

//star images
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";

const GameDetail = ({ pathId }) => {
  const history = useHistory();

  //events here
  const exitDetailHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("shadow")) {
      document.body.style.overflow = "auto";
      history.push("/");
    }
  };

  const getPlatform = (platform) => {
    switch (platform) {
      case "PlayStation 5":
        return playstation;
      case "PlayStation 4":
        return playstation;
      case "Xbox Series S/X":
        return xbox;
      case "Xbox One":
        return xbox;
      case "PC":
        return steam;
      case "Nintendo Switch":
        return nintendo;
      case "iOS":
        return apple;
      default:
        return gamepad;
    }
  };

  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img src={starFull} alt="star"></img>);
      } else {
        stars.push(<img src={starEmpty} alt="star"></img>);
      }
    }
    return stars;
  };

  //Data
  const { game, screenshots, isLoading } = useSelector(
    (state) => state.details
  );
  return (
    <>
      {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandler}>
          <Detail layoutId={pathId}>
            <Stats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>

              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms.map((data) => (
                    <Tippy
                      key={`tip ${data.platform.id}`}
                      content={data.platform.name}
                      placement="bottom"
                    >
                      <img
                        alt={data.platform.name}
                        src={getPlatform(data.platform.name)}
                        key={data.platform.id}
                      />
                    </Tippy>
                  ))}
                </Platforms>
              </Info>
            </Stats>

            <Media>
              <motion.img
                layoutId={`image ${pathId}`}
                src={smallImage(game.background_image, 1280)}
                alt="background"
              />
            </Media>

            <Description>
              <p>{game.description_raw}</p>
            </Description>

            <div className="gallery">
              {screenshots.results.map((data) => (
                <img
                  key={data.id}
                  src={smallImage(data.image, 1280)}
                  alt="screenies"
                />
              ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 2rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  img {
    width: 100%;
  }

  @media (max-width: 750px) {
    width: 85%;
    left: 7.5%;
    padding: 1rem;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }

  @media (max-width: 750px) {
    display: block;
    h3 {
      font-size: 1rem;
    }

    img {
      display: inline-block;
      height: 1rem;
      width: 1rem;
    }
  }
`;

const Info = styled(motion.div)`
  text-align: center;

  @media (max-width: 750px) {
    text-align: left;

    h3 {
      padding-bottom: 1rem;
    }
  }
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }

  @media (max-width: 750px) {
    display: block;
    img {
      margin: 0rem 1.5rem 0rem 0rem;
    }
  }
`;

const Media = styled(motion.div)`
  margin-top: 2rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 3rem 0rem;
`;

export default GameDetail;

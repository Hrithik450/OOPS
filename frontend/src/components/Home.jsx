import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./globle";
import "./Home.css";

function Hero() {
  return (
    <>
      <Wrapper className="wrapper">
        <div className="Hero-container" style={{ marginTop: "12rem" }}>
          <div className="grid grid-two-column">
            <div className="hero-data">
              <p className="intro">Introducing</p>
              <h1>SoftKART</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                dolor quia maxime! Sint quia, ducimus error ipsa minus sapiente
                quae rem. Nulla facere dolore ab molestias. Consequuntur animi
                eligendi omnis minima tempore officia modi quasi.
              </p>
              <NavLink>
                <Button>Explore</Button>
              </NavLink>
            </div>
            <div>
              <figure>
                <img src="/hero.png" alt="img" className="img-style" />
              </figure>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`'
padding-block: 6rem;
`;

export default Hero;

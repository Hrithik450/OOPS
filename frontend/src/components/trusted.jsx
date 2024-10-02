import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { SiMeta } from "react-icons/si";
import { BsApple } from "react-icons/bs";
import { GrAmazon } from "react-icons/gr";
import { TfiMicrosoftAlt } from "react-icons/tfi";

const Trusted = () => {
  return (
    <>
      <Wrapper style={{ color: "white" }}>
        <div className="Hero-container" style={{ marginTop: "4rem" }}>
          <h3 style={{ color: "white" }}>Trusted By 1000+ Companies</h3>
          <div className="brand-section-slider">
            <div className="slide">
              <FcGoogle style={{ fontSize: "5rem" }} />
            </div>
            <div className="slide">
              <SiMeta style={{ fontSize: "5rem" }} />
            </div>
            <div className="slide">
              <BsApple style={{ fontSize: "5rem" }} />
            </div>
            <div className="slide">
              <GrAmazon style={{ fontSize: "5rem" }} />
            </div>
            <div className="slide">
              <TfiMicrosoftAlt style={{ fontSize: "5rem" }} />
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  border-top: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1rem;

  .brand-section {
    padding: 12rem 0 0 0;
  }

  h3 {
    text-align: center;
    text-transform: capitalize;
    color: rgba(255, 255, 255, 0.7);
    font-size: 2rem;
    font-weight: bold;
  }

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .brand-section-slider {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 3.2rem;
    gap: 5rem;
  }

  .header-man {
    font-weight: 800;
    margin-block: 4rem;
    text-decoration: underline;
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .brand-section-slider {
      display: grid;
      text-align: center;
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default Trusted;

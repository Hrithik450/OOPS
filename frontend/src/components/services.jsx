import styled from "styled-components";
import { IoIosSpeedometer } from "react-icons/io";
import { GiCheckedShield } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { RiSecurePaymentFill } from "react-icons/ri";

const Services = () => {
  return (
    <>
      <Wrapper style={{ color: "white" }}>
        <h2
          style={{
            fontWeight: "700",
            marginBlock: "4rem",
            color: "white",
          }}
        >
          Services
        </h2>
        <div className="Hero-container">
          <div className="grid grid-three-column">
            <div className="services-1">
              <div>
                <IoIosSpeedometer style={{ fontSize: "100px" }} />
                <p style={{ fontWeight: "700", fontSize: "20px" }}>
                  Fastest Hosting Ever!
                </p>
              </div>
            </div>
            <div className="services-2">
              <div className="services-column-2">
                <GiCheckedShield style={{ fontSize: "45px" }} />
                <p style={{ fontSize: "19px", fontWeight: "700" }}>
                  Secured & Authorized
                </p>
              </div>
              <div className="services-column-2">
                <GrMoney style={{ fontSize: "45px" }} />
                <p style={{ fontSize: "19px", fontWeight: "700" }}>
                  Money Back Guarntee
                </p>
              </div>
            </div>
            <div className="services-3">
              <div>
                <RiSecurePaymentFill style={{ fontSize: "100px" }} />
                <p style={{ fontSize: "19px", fontWeight: "700" }}>
                  Super secure payment system
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  border-top: 1px solid rgba(255, 255, 255, 0.6);
  margin: 4rem 0;

  .grid {
    gap: 4.8rem;
  }

  .services-1,
  .services-2,
  .services-3 {
    width: auto;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: ${({ theme }) => theme.colors.bg};
    text-align: center;
    border-radius: 2rem;

    box-shadow: 0px 0px 3px 2px rgba(255, 255, 255, 0.5);
  }

  .services-2 {
    background-color: transparent;
    box-shadow: none;
    gap: 4rem;
  }

  .services-column-2 {
    background: ${({ theme }) => theme.colors.bg};
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;
    box-shadow: 0px 0px 3px 2px rgba(255, 255, 255, 0.5);
    gap: 1rem;
  }
`;

export default Services;

import CardOverview from "./cardoverview";
import Protect from "./protect";
import Main from "./zmain";

function Admin() {
  return (
    <Protect>
      <CardOverview>
        <Main />
      </CardOverview>
    </Protect>
  );
}

export default Admin;

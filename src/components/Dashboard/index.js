import Dashboard from "./Dashboard";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setCountryStateCityData } from "../../actions/app";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setCountryStateCityData,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Dashboard);

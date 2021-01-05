import SignUp from './SignUp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleShowToast, handleHideToast } from '../../../actions/ui';


function mapDispatchToProps(dispatch, props) {
  return bindActionCreators(
    {
      handleHideToast,
      handleShowToast
    },
    dispatch
  );
}
export default connect(null, mapDispatchToProps)(SignUp);

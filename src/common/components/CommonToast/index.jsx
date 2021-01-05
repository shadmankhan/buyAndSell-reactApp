import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { handleShowToast, handleHideToast } from '../../../actions/ui';
import CommonToast from './CommonToast';

function mapStateToProps(state) {
  const toastProperty = _.get(state, 'ui.toastProperty', {});
  return {
    toastProperty
  };
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators(
    {
      handleHideToast,
      handleShowToast
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(CommonToast);

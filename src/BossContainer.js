import Boss from './Boss';
import { connect } from 'react-redux';
import { makeHitBossAction } from './actions';

const mapStateToBossProps = function (state) {
  return state.boss;
};

const mapDispatchToBossProps = function (dispatch) {
  return {
    onClickFunction: function () {
      dispatch(makeHitBossAction(15));
    }
  }
};

const BossContainer = connect(mapStateToBossProps, mapDispatchToBossProps)(Boss);

export default BossContainer;
import { combineReducers } from 'redux';

import { machine } from './features';

export default combineReducers({
  machines: machine,
});

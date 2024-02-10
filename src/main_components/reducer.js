import { reducer as toastrReducer } from "react-redux-toastr";
import { combineReducers } from "redux";
import { loadingReducer } from "../pages/spinner/reducer";
import {
  botReducer,
  candlestickReducer,
  symbolInfoReducer,
  symbolReducer,
} from "../pages/bots/reducer";
import { testBotsReducer } from "../pages/paper-trading/reducer";
import { settingsReducer } from "../pages/bots/reducer";
import { blacklistReducer } from "../pages/research/reducer";
import {
  balanceRawReducer,
  estimateReducer,
} from "../state/balances/reducer";
import { gainersLosersReducer, btcBenchmarkReducer, gainersLosersSeriesReducer } from "../pages/dashboard/reducer";

const rootReducer = combineReducers({
  balanceRawReducer,
  botReducer,
  symbolInfoReducer,
  symbolReducer,
  candlestickReducer,
  toastr: toastrReducer,
  loadingReducer,
  blacklistReducer,
  settingsReducer,
  estimateReducer,
  testBotsReducer,
  gainersLosersReducer,
  btcBenchmarkReducer,
  gainersLosersSeriesReducer,
});
export default rootReducer;

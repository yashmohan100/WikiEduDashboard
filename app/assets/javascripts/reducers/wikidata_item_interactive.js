import {
  SUBMIT_WIKIDATA_ITEM,
  RECEIVE_WIKIDATA_ITEM,
  INVALID_WIKIDATA_ITEM_SUBMITTED
} from '../constants/wikidata_item_interactive.js';

const initialState = {};

export default function wikidataItemInteractive(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_WIKIDATA_ITEM:
      return { ...state, input: action.input };
    case INVALID_WIKIDATA_ITEM_SUBMITTED:
      return { ...state };
    case RECEIVE_WIKIDATA_ITEM:
      console.log(action);
      console.log(action.item);
      return { ...state, item: action.item, qNumber: action.qNumber };
    default:
      return state;
  }
}

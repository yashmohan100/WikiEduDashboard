import {
  SUBMIT_WIKIDATA_ITEM,
  RECEIVE_WIKIDATA_ITEM,
  INVALID_WIKIDATA_ITEM_SUBMITTED
} from '../constants/wikidata_item_interactive.js';
import fetch from 'cross-fetch';

const wikidataApiBase = 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*';

const qItemMatcher = /wikidata\.org\/wiki\/(Q[0-9]+)/;
const wikidataItemFromUrl = (url) => {
  const match = url.match(qItemMatcher);
  return match && match[1];
};

export const fetchWikidataItem = input => (dispatch) => {
  dispatch({ type: SUBMIT_WIKIDATA_ITEM, input });

  const qItem = wikidataItemFromUrl(input);
  if (qItem === null) {
    dispatch({ type: INVALID_WIKIDATA_ITEM_SUBMITTED });
    return;
  }

  const itemQuery = `${wikidataApiBase}&ids=${qItem}`;
  fetch(itemQuery)
    .then(response => response.json())
    .then((data) => {
      dispatch({
        type: RECEIVE_WIKIDATA_ITEM,
        qNumber: qItem,
        item: data.entities[qItem]
      });
    });
};

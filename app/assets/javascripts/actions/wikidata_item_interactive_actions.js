import {
  SUBMIT_WIKIDATA_ITEM,
  RECEIVE_WIKIDATA_ITEM
} from '../constants/wikidata_item_interactive.js';
import fetch from 'cross-fetch';

const wikidataApiBase = 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*';

const qItemMatcher = /wikidata\.org\/wiki\/(Q[0-9]+)/;
const wikidataItemFromUrl = url => url.match(qItemMatcher)[1];

export const fetchWikidataItem = input => (dispatch) => {
  dispatch({ type: SUBMIT_WIKIDATA_ITEM, input });
  const qItem = wikidataItemFromUrl(input);
  const itemQuery = `${wikidataApiBase}&ids=${qItem}`;
  fetch(itemQuery)
    .then((response) => {
      return null;
    });
  // parse input to QITEM
  // API call to wikidata, then extract item data and dispatch it
};

import React from 'react';
import { connect } from 'react-redux';

const WikidataItemInfo = ({ wikidataItem }) => {
  console.log('wat');
  console.log(wikidataItem);
  if (!wikidataItem) { return null; }

  return (
    <div>
      <p>
        Item: { wikidataItem.id }
      </p>
      <p>
        Label: { wikidataItem.labels.en.value }
      </p>
      <p>
        Description: { wikidataItem.descriptions.en.value }
      </p>
      <p>
        Number of claims: { Object.keys(wikidataItem.claims).length }
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  wikidataItem: state.wikidataItemInteractive.item
});


export default connect(mapStateToProps)(WikidataItemInfo);

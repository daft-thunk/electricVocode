//npm install react react-redux
import React from 'react';
import { connect } from 'react-redux';
import { List, Card } from 'antd';
import { baseDictionary, urlDictionary } from '../../utils/dictionary';

const dictKeys = Object.keys(baseDictionary);
const urlKeys = Object.keys(urlDictionary);
const byTitle = (a, b) => {
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
};

const baseData = dictKeys.map(key => {
  let content = baseDictionary[key]([]);
  if (content.length > 60) {
    content = content.slice(0, 300) + '...';
  }
  return {
    title: key,
    content: content
  };
}).sort(byTitle);

let urlData = urlKeys.map(key => {
  return {
    title: key,
    content: `View ${key}'s web page`
  };
}).sort(byTitle);

// data = data.sort((a, b) => {
//   if (a.title < b.title) return -1;
//   if (a.title > b.title) return 1;
//   else return 0;
// });

const VoiceCommands = props => {
  return (
    <div>
      <List grid={{ gutter: 20, column: 1 }}>
        {baseData.map((card, i) => (
          <div key={i}>
            <List.Item>
              <Card title={'Command: ' + card.title.toUpperCase()}>
              { !card.noCode &&
                <h5>Copied to clipboard:</h5>
              }
                <pre>{card.content}</pre>
              </Card>
            </List.Item>
          </div>
        ))}
      </List>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {};
};

const mapDispatch = (dispatch, ownProps) => {
  return {};
};

export default connect(mapState, mapDispatch)(VoiceCommands);

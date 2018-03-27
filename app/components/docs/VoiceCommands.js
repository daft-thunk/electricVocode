//npm install react react-redux
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { baseDictionary, urlDictionary } from '../../utils/dictionary';

// todo: remove inline styles
const colStyle = {
  padding: '4px',
  border: '1px #e7e7e7 solid',
  background: 'white',
  textAlign: 'center',
  marginLeft: '-1px',
  marginBottom: '-1px'
};
const cardStyle = {
  padding: '4px',
  textAlign: 'left',
  marginLeft: '-1px',
  marginBottom: '-1px'
};
const preStyle = {
  border: '1px #e7e7e7 solid',
  padding: 10,
  background: 'white'
};

const dictKeys = Object.keys(baseDictionary);
const urlKeys = Object.keys(urlDictionary);
const byTitle = (a, b) => {
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
};

const baseData = dictKeys
  .map(key => {
    let content = baseDictionary[key]([]);
    if (content.length > 60) {
      content = content.slice(0, 300) + '...';
    }
    return {
      title: key,
      content: content
    };
  })
  .sort(byTitle);

let urlData = urlKeys
  .map(key => {
    return {
      title: key
    };
  })
  .sort(byTitle);

const VoiceCommands = props => {
  return (
    <div className="main-content">
      <div style={{ width: '75%', marginLeft: 8 }}>
        <h2>Voice Commands (copied to clipboard)</h2>
        <Row>
          {baseData.map((item, i) => {
            return (
              <Col md={6} style={colStyle} key={i}>
                <a href={`#keyCommand-${i}`}>{item.title.toUpperCase()}</a>
              </Col>
            );
          })}
        </Row>
        <h2 style={{ marginTop: 15 }}>Urls</h2>
        <Row>
          {urlData.map((item, i) => {
            return (
              <Col md={12} style={colStyle} key={i}>
                <h4>Command: {item.title.toUpperCase()}</h4>
                View {item.title}'s webpage
              </Col>
            );
          })}
        </Row>
      </div>
      <Row style={{ marginTop: 15 }}>
        {baseData.map((card, i) => (
          <div key={i} id={`keyCommand-${i}`}>
            <Col md={18} style={cardStyle}>
              <h2>{'Command: ' + card.title.toUpperCase()}</h2>
              <pre style={preStyle}>{card.content}</pre>
            </Col>
          </div>
        ))}
      </Row>
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

// //npm install react react-redux
// import React from 'react';
// import { connect } from 'react-redux';
// import { List, Card } from 'antd';
// import { baseDictionary } from '../../utils/dictionary';

// const dictKeys = Object.keys(baseDictionary);

// // keys that render pages put in here:
// const badKeys = new Set(['github', 'stackoverflow']);

// let data = dictKeys.filter(key => !badKeys.has(key)).map(key => {
//   let content = baseDictionary[key]([]);
//   if (content.length > 60) {
//     content = content.slice(0, 300) + '...';
//   }
//   return {
//     title: key,
//     content: content
//   };
// });

// // keys that render pages put here:
// data.push(
//   ...[
//     {
//       title: 'github',
//       content: 'View github.com',
//       noCode: true
//     },
//     {
//       title: 'stackoverflow',
//       content: 'View stackoverflow.com',
//       noCode: true
//     }
//   ]
// );

// data = data.sort((a, b) => {
//   if (a.title < b.title) return -1;
//   if (a.title > b.title) return 1;
//   else return 0;
// });

// const VoiceCommands = props => {
//   return (
//     <div>
//       <List grid={{ gutter: 20, column: 1 }}>
//         {data.map((card, i) => (
//           <div key={i}>
//             <List.Item>
//               <Card title={'Say: ' + card.title.toUpperCase()}>
//               { !card.noCode &&
//                 <h5>Copied to clipboard:</h5>
//               }
//                 <pre>{card.content}</pre>
//               </Card>
//             </List.Item>
//           </div>
//         ))}
//       </List>
//     </div>
//   );
// };

// /**
//  * CONTAINER
//  */
// const mapState = (state, ownProps) => {
//   return {};
// };

// const mapDispatch = (dispatch, ownProps) => {
//   return {};
// };

// export default connect(mapState, mapDispatch)(VoiceCommands);

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

const history = createBrowserHistory();
const router = routerMiddleware(history);

export default { history };

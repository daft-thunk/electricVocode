let url = `https://vocode.herokuapp.com`;
if (process.env.NODE_ENV === 'development') url = 'http://localhost:8080';
export default url;

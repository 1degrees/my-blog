const DEV_URL = {url:"http://localhost:8080"}
const PROD_URL = {url:"http://www.aka.today:8080"}
const TEST_URL = {url:"http://localhost:8080"}
let BASE_URL;
switch(process.env.NODE_ENV){
    case 'development':
        BASE_URL = DEV_URL;
    break;

    case 'production':
        BASE_URL = PROD_URL;
    break;

    case 'testing':
        BASE_URL = TEST_URL;
    break;
}
export default BASE_URL;
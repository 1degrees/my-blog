import { post, get } from '../comUtils/api-requester';
export const getHomeArticles = (params) => post("articles/list",params);

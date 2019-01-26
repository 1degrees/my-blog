const isBuild = process.env.NODE_ENV == 'production';
const BLOG_URL = process.env.BLOG_URL;
const BLOG_API = process.env.BLOG_API;
export {
    isBuild,
    BLOG_URL,
    BLOG_API
};
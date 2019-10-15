export default  [
    { title: "网站首页", link : "/"},
    { title: "学无止境", link : "", child:[
        {title: "HTML5标签语意", link:'/htm', href:{pathname: '/content', query: { id: 'htm' }}}, 
        {title: "CSS3运用总结", link:"/css", href:{pathname: '/content', query: { id: 'css' }}}, 
        {title: "JavaScript基础", link:"/js", href:{pathname: '/content', query: { id: 'js' }}}, 
        {title: "前端框架相关", link:"/frame", href:{pathname: '/content', query: { id: 'frame' }}}
    ]},
    { title: "慢生活", link : "", child:[
        {title: "程序人生", link:"/lifes", href:{pathname: '/articles', query: { id: 'lifes' }}}, 
        {title: "旅游日记", link:"/travel", href:{pathname: '/articles', query: { id: 'travel' }}}, 
        {title: "语录心得", link:"/ngc", href:{pathname: '/articles', query: { id: 'ngc' }}}
    ]},
    { title: "时间轴", link : "/time" },
    { title: "记录瞬间", link : "/note" },
    { title: "小游戏", link : "/game" },
    { title: "关于我", link : "/about"}
];
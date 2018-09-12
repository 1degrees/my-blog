import Head from 'next/head';

export default () => (
  <div className="sidebar">
    <div className="about">
      <p className="avatar"> <img src="/static/images/photo.jpg" alt=""/> </p>
      <p className="abname">1degrees | 张啸</p>
      <p className="abposition">Web前端攻城狮,前端架构</p>
      <p className="abtext"> 一个90后草根站长！入行4年。一直潜心研究web技术，一边工作一边积累经验，同时给大家分享一些开发技术经验。 </p>
    </div>
    <div className="weixin">
      <h2 className="hometitle">微信关注</h2>
      <ul>
        <img src="/static/images/wx.jpg"/>
      </ul>
    </div>
  </div>
)

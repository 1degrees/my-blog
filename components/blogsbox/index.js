function ImageList({ images, link, index}){
  let ele = null;
  if(images && images.length > 1){
    ele = (<span className="bplist">
            <a href={ link } target="_blank">
              {
                images.slice(0,3).map((e,i)=> (<li key={ i }><img src={ e } alt=""/></li>))
              }
            </a>
          </span>);
  } else if(images) {
    let picClass = index % 3 === 1 ? 'bigpic' : 'blogpic';
    ele = (<span className={ picClass }>
              <a href={ link }  target="_blank">
                <img src={ images[0] } alt=""/>
              </a>
            </span>);
  }
  return ele;
}

export default ({ articles }) => (
  <div className="blogsbox">
    {
      articles.map((e,i)=>{
        return (
          <div className="blogs" data-scroll-reveal="enter bottom over 1s" key={ i }>
            <h3 className="blogtitle"><a href={ e.link } target="_blank">{ e.title }</a></h3>
            <ImageList images={ e.images } link= { e.link } index={ i } />
            <p className="blogtext">{ e.description }</p>
            <div className="bloginfo">
              <ul>
                <li className="author"><a>{ e.author }</a></li>
                <li className="lmname"><a>{ e.tag }</a></li>
                <li className="timer">{ e.time }</li>
                <li className="view"><span>{ e.views }</span>已阅读</li>
                <li className="like">{ e.likes }</li>
              </ul>
            </div>
          </div>
        )
      })
    }
  </div>
)

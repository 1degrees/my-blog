export default ( { articles } ) => (
  <div className="picsbox"> 
    <div className="banner">
      <div id="banner" className="fader">
        {
          articles.slice(0,3).map((e,i)=>{
            return <li className="slide" key={ e.link } ><a href={ e.link } target="_blank"><img src={e.images[0]}/><span className="imginfo">{ e.title }</span></a></li>
          })
        }
        <div className="fader_controls">
          <div className="page prev" data-target="prev">&lsaquo;</div>
          <div className="page next" data-target="next">&rsaquo;</div>
          <ul className="pager_list">
          </ul>
        </div>
      </div>
    </div>
    <div className="toppic">
      {
        articles.slice(3,5).map((e,i)=>{
          return (
            <li key={ e.link }> 
                <a href={ e.link } target="_blank">
                <i><img src={ e.images[0] }/></i>
                <h2>{ e.title }</h2>
                <span>{ e.tag }</span> 
                </a>
            </li>
          )
        })
      }
    </div>
  </div>
)

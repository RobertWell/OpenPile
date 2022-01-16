import React from "react"

interface Props {}

const Header = () => {
  return (
    <div className="ui grid">
      <div className="ui two column grid  middle aligned">
        <div className="column">
          <h3 className="ui header teal ">部落格</h3>
        </div>
        <div className="column right aligned">
          共 <span className="ui header orange m-inline-block">14</span>篇
        </div>
      </div>
    </div>
  )
}

const Bottom = () => {
  return (
    <div className="ui grid">
      <div className="ui two column grid  middle aligned">
        <div className="column">
          <a href="#" className="ui teal basic mini button">
            上一頁
          </a>
        </div>
        <div className="column right aligned">
          <a href="#" className="ui teal basic mini button">
            下一頁
          </a>
        </div>
      </div>
    </div>
  )
}
const Card = () => {
  return (
    <div className="ui vertical padded segment m-padding-tb-large">
      <div className="ui grid stackable mobile reversed">
        <div className="eleven wide column ">
          <h3 className="ui header">aaaaaaaaaaaaaaa</h3>
          <p className="m-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet id
            consequatur consequuntur rerum nesciunt nemo tempora cumque,
          </p>
          <div className="ui grid">
            <div className="eleven wide column">
              <div className="ui link list horizontal mini">
                <div className="item">
                  <img
                    src="https://source.unsplash.com/random/100x100"
                    alt=""
                    className="ui avatar image"
                  />
                  <div className="content">
                    <div className="header">李李仁</div>
                  </div>
                </div>
                <div className="item">
                  <i className="calendar icon"></i>2017-10-01
                </div>
                <div className="item">
                  <i className="eye icon"></i>2314
                </div>
              </div>
            </div>
            <div className="five wide column right aligned">
              <a href="#" className="ui teal label m-padded-tiny basic">
                認知升級
              </a>
            </div>
          </div>
        </div>
        <div className="five wide column">
          <a href="#" target={"_blank"}>
            <img
              src="https://source.unsplash.com/random/800x450"
              alt="_blank"
              className="ui rounded image"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

const MainPanel = (props: Props) => {
  return (
    <>
      <div className="ui segment top attached">
        <Header />
      </div>
      <div className="ui padded attached segment">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="ui bottom attached segment">
        <Bottom />
      </div>
    </>
  )
}

export default MainPanel

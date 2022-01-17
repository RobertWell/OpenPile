import React, { useState, useRef } from "react"
import "./index.scss"
import address from "../../assets/2維碼.png"
import { Button, Popup, Grid } from "semantic-ui-react"
interface Props {}

interface HeaderProps {}
interface PaidProps {
  open: boolean
  showPaid: () => void
}

const Header = (props: HeaderProps) => {
  return (
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
  )
}

const FigureContent = () => {
  return (
    <>
      <a href="#" target={"_blank"}>
        <img
          src="https://source.unsplash.com/random/800x450"
          alt="_blank"
          className="ui rounded image"
        />
      </a>
    </>
  )
}

const Content = () => {
  return (
    <>
      <div className="ui right aligned basic segment">
        <div className="ui orange label">原創</div>
      </div>
      <div className="ui center aligned header">
        <h2 className="ui center aligned header">某篇文章的Title</h2>
        <div className="content m-padded-lr">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab
            voluptatum error debitis. Veniam harum quod id dolores totam modi,
            voluptas eum ad ipsum earum ullam nisi, voluptatem nobis ab quas.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab
            voluptatum error debitis. Veniam harum quod id dolores totam modi,
            voluptas eum ad ipsum earum ullam nisi, voluptatem nobis ab quas.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab
            voluptatum error debitis. Veniam harum quod id dolores totam modi,
            voluptas eum ad ipsum earum ullam nisi, voluptatem nobis ab quas.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab
            voluptatum error debitis. Veniam harum quod id dolores totam modi,
            voluptas eum ad ipsum earum ullam nisi, voluptatem nobis ab quas.
          </p>
        </div>
      </div>
    </>
  )
}

const Tags = () => {
  return <div className="ui basic teal left pointing label">方法論</div>
}

const Paid = ({ open, showPaid }: PaidProps) => {
  const btn = useRef(null)
  return (
    <>
      <Popup
        trigger={
          <button className="ui orange basic button circular">讚</button>
        }
        flowing
        hoverable
        position="bottom center"
      >
        <div className="ui orange basic label">
          <div className="ui images" style={{ fontSize: "inherit" }}>
            <div className="image">
              <img
                src={address}
                alt=""
                className="ui images rounded bordered"
                style={{ width: "120px" }}
              />
              <div>123</div>
            </div>
            <div className="image">
              <img
                src={address}
                alt=""
                className="ui images rounded bordered"
                style={{ width: "120px" }}
              />
              <div>123</div>
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

const MessageRow = () => {
  return (
    <div>
      <div className="ui middle aligned grid">
        <div className="eleven wide column">
          <ul className="list">
            <li>作者: Robert</li>
            <li>Published: 2022-01-16</li>
            <li>Copyright</li>
          </ul>
        </div>
        <div className="five wide column">
          <img
            src={address}
            alt=""
            className="ui rounded bordered image right floated"
            style={{ width: "110px" }}
          />
        </div>
      </div>
    </div>
  )
}

const Comments = () => {
  return (
    <div className="ui comments">
      <form className="ui reply form">
        <div className="field">
          <textarea name="content" placeholder="請輸入評論"></textarea>
        </div>
        <div className="fields">
          <div className="field">
            <div className="ui left icon input">
              <i className="user icon " />
              <input type="text" name="nickname" placeholder="姓名" />
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="mail icon" />
              <input type="email" name="email" placeholder="信箱" />
            </div>
          </div>
        </div>
        <div className="field">
          <button className="ui teal button">
            <i className="icon edit"></i> 發佈
          </button>
        </div>
      </form>
    </div>
  )
}

const Blog = () => {
  const [openPaid, setOpenPaid] = useState<boolean>(false)
  const showPaid = () => {
    setOpenPaid(!openPaid)
  }
  return (
    <div className="ui container blog m-container-small">
      <div className="ui top attached segment">
        <Header />
      </div>
      <div className="ui attached segment">
        <FigureContent />
      </div>
      <div className="ui attached segment padded">
        <Content />
        <div className="m-padded-lr">
          <Tags />
        </div>
        <div className="ui segment center aligned basic">
          <Paid open={openPaid} showPaid={showPaid} />
        </div>
      </div>
      <div className="ui attached positive message ">
        <MessageRow />
      </div>
      <div className="ui attached segment">
        <Comments />
      </div>
      <div className="ui attached segment">按鈕</div>
    </div>
  )
}

export default Blog

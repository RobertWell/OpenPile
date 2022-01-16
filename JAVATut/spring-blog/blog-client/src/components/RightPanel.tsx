import React from "react"
import Address from "../assets/2維碼.png"
interface HeaderProps {
  title: string
  icon: string
}

interface TagsProps {
  name: string
  count: number
}
interface RecommandsProps {
  name: string
}

const Header = ({ title, icon }: HeaderProps) => {
  return (
    <div className="ui secondary segment">
      <div className="ui two column grid">
        <div className="column">
          <i className={`${icon} icon`} />
          {title}
        </div>
        <div className="column right aligned">
          <a href="#">
            more
            <i className="angle double right icon" />
          </a>
        </div>
      </div>
    </div>
  )
}

const Content = () => {
  return (
    <a href="#" className="item">
      學習日誌
      <div className="ui label teal basic left pointing">13</div>
    </a>
  )
}

const Tags = ({ name, count }: TagsProps) => {
  return (
    <a href="#" className="ui teal basic  left pointing label m-margin-tb-tiny">
      {name} <div className="detail">{count}</div>
    </a>
  )
}

const Recommands = ({ name }: RecommandsProps) => {
  return (
    <div className="ui segment">
      <a href="" className="m-black">
        {name}
      </a>
    </div>
  )
}

const RightPanel = () => {
  return (
    <>
      <div className="ui segments">
        <Header title={"分類"} icon="idea" />
        <div className="ui teal segment">
          <div className="ui vertical menu fluid">
            <Content />
            <Content />
            <Content />
          </div>
        </div>
      </div>
      <div className="ui segments m-margin-top-large">
        <Header title={"標籤"} icon="book" />
        <div className="ui teal segment">
          <Tags name={"方法論"} count={13} />
          <Tags name={"論"} count={13} />
          <Tags name={"論"} count={13} />
          <Tags name={"方法論"} count={13} />
          <Tags name={"方法論"} count={13} />
          <Tags name={"方法論"} count={13} />
          <Tags name={"方法論"} count={13} />
        </div>
      </div>
      <div className="ui segments secondary m-margin-top-large ">
        <Header title={"最新推薦"} icon="bookmark" />

        <Recommands name={"用戶"} />
        <Recommands name={"用戶"} />
        <Recommands name={"用戶"} />
        <Recommands name={"用戶"} />
        <Recommands name={"用戶"} />
      </div>

      <div className="ui horizontal divider m-margin-top-large">
        掃碼關注
      </div>

      <div className="card ui centered"  style={{width:'11rem'}}>
        <img src={Address} alt="" className="rounded image"/>
      </div>
    </>
  )
}

export default RightPanel

import React, { useState } from "react"

interface Props {}

const AppNav = () => {
  const [open, setOpen] = useState<boolean>(false)

  const toggleNav = () => {
    setOpen(!open)
  }
  return (
    <nav className="ui inverted attached segment m-padded-tb-mini">
      <div className="ui container ">
        {/* stackable: 給手機使用!!! */}
        <div className="ui inverted menu secondary stackable">
          <h2 className="ui teal header item">Blog</h2>
          {/*  m-mobile-hide: 手機時藏起來 */}

          <a href="#" className={`item ${open ? "" : "m-mobile-hide"}`}>
            <i className="home icon" />
            首頁
          </a>
          <a href="/blog" className={`item ${open ? "" : "m-mobile-hide"}`}>
            <i className="icon idea" />
            分類
          </a>
          <a href="#" className={`item ${open ? "" : "m-mobile-hide"}`}>
            <i className="icon tags" />
            標籤
          </a>
          <a href="#" className={`item ${open ? "" : "m-mobile-hide"}`}>
            <i className="icon clone" />
            歸檔
          </a>
          <a href="#" className={`item ${open ? "" : "m-mobile-hide"}`}>
            <i className="icon info" />
            關於我
          </a>
          <div className="right item m-mobile-hide">
            <div className="ui icon transparent input">
              <input type="text" className="ui input" placeholder="Search..." />
              <i className="search icon link" />
            </div>
          </div>
        </div>
      </div>
      {/* 指定絕對位置 */}
      <button
        className="ui black icon button m-right-top m-mobile-show menu toggle"
        onClick={toggleNav}
      >
        <i className="sidebar icon" />
      </button>
    </nav>
  )
}

export default AppNav

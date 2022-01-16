import React from "react"
import address from "../assets/2維碼.png"
interface Props {}

const Footer = (props: Props) => {
  return (
    <footer className="ui inverted segment vertical center aligned m-padding-tb-massive">
      <div className="ui container">
        <div className="ui inverted divided grid stackable">
          <div className="three wide column">
            <div className="ui inverted link list">
              <div className="item">
                <img
                  src={address}
                  alt="http://localhost:3000/"
                  className="ui round image "
                  style={{ width: "100px" }}
                />
              </div>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="ui inverted header m-opacity-mini">最新內容</h4>
            <div className="ui inverted link list">
              <a href="#" className="item">
                用戶故事1
              </a>
            </div>
            <div className="ui inverted link list">
              <a href="#" className="item">
                用戶故事2
              </a>
            </div>
            <div className="ui inverted link list">
              <a href="#" className="item">
                用戶故事3
              </a>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="ui inverted header m-opacity-mini">最新內容</h4>
            <div className="ui inverted link list">
              <a href="#" className="item">
                用戶故事
              </a>
            </div>
            <div className="ui inverted link list">
              <a href="#" className="item">
                用戶故事
              </a>
            </div>
            <div className="ui inverted link list">
              <a href="#" className="item">
                用戶故事
              </a>
            </div>{" "}
          </div>
          <div className="seven wide column">
            <h4 className="ui inverted header m-opacity-mini">最新內容</h4>
            <p className="m-opacity-mini">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur asperiores excepturi cupiditate necessitatibus, eaque
            </p>
          </div>
        </div>
        <div className="ui inverted section divider" />
        <p className="m-text-thin m-text-spaced m-opacity-mini">
          Copyright © 2022-1-15 TUT
        </p>
      </div>
    </footer>
  )
}

export default Footer

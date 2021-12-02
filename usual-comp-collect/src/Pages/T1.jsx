import React, { useState } from "react";
import './T1.scss'
export default function T1() {
  const [img, setImg] = useState("");
  const onChange = (e) => {
    const files = e.target.files;
    let reader = new FileReader(files);
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      const formData = { file: e.target.result };
      console.log(formData);
      //   const url = "http://localhost:3000/api/service";
      //   return axios.post(url, formData).then((resp) => console.log(resp));
    };
  };
  const uniqueId = "unique-id";
  return (
    <div className="t1">
      <h1>React JS File Upload Tutorial</h1>
      <h6># 可選擇某Folder中所有檔案，但無法選擇Folder Path，亦無法遍歷</h6>
      <h2>Upload 一個檔案</h2>
      <input type="file" name="file" onChange={onChange} />
      <h2>Upload 多個檔案</h2>
      <input
        type="file"
        webkitdirectory={""}
        directory={""}
        multiple={""}
      />
      <h2>以Label包裹 (不將Input包在裡面也行，但id需相同)</h2>

      <label htmlFor={uniqueId}>
        <span  style={{display:"inline-block",border:"1px solid black", borderRadius:"10px", padding:"10px"}}>點擊上傳</span>
        <input
          id={uniqueId}
          type="file"
          webkitdirectory={""}
          directory={""}
          multiple={""}
          style={{ display: "none" }}
          onChange={e=>{
            console.log('----e', e.target.files);
          }}

        />
      </label>
    </div>
  );
}

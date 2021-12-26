import { isTesting } from "../common/inTesting";
import axios from 'axios'
test("Hello", async () => {
  console.log("========isTesting", isTesting());
  expect(3 + 4).toBe(7);
  try{
    // console.log(process.env);
    const res  = await axios.get("/api/movies");
    
    console.log('============res.data',res);
  }catch(e){
    console.log('=========e.data',e);
  }
});

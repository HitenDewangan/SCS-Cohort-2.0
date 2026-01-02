import box from "./app.js";
import circle from "./test.js";

const parent = ()=>{
    return React.createElement("div", {id:'parent', style: { display: "flex", gap: "20px" }}, [box(), circle()]);
}
export default parent;
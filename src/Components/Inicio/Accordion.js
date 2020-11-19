import React,{useState, useRef} from "react";
import './accordion.css';

const Accordion = (props) => {
  const collapse = useRef("");
  const [height,setHeight] = useState(0);
  const currentHeight = props.active === props.title ? height : 0;
  const toogle = () =>{
    if(props.active ===props.title){
      props.setActive("");
    }else{
      props.setActive(props.title);
      setHeight(collapse.current.clientHeight);
    }
  }
  return (
    <div className="accordion">
      <div className="accordionHead" onClick={()=>toogle()}>
        <div className="rowdiesFont accordionTitle">{props.title}</div>
      </div>
      <div className="accordionContent"  style={{height: currentHeight + 'px'}}>
        <div ref={collapse} className="accordContent">{props.children}</div>
      </div>
    </div>
  );
};

export default Accordion;

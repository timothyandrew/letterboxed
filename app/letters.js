import _ from "lodash";

export default function Letters(props) {
  const onChange = (e) => {
    props.setSides(_.chunk(e.target.value, 3));
  }

  return (
    <div>
      <input type="text" autoComplete="off" autoCorrect="off" onChange={onChange}/>
    </div>
  )
}
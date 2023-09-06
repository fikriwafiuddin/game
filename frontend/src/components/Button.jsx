/* eslint-disable react/prop-types */
import "./style.css"

export default function Button(props) {
  return (
    <button type="submit" className="btn">
      {props.text}
    </button>
  )
}

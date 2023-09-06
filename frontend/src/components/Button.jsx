/* eslint-disable react/prop-types */

export default function Button(props) {
  return (
    <button type="submit" className="btn">
      {props.text}
    </button>
  )
}

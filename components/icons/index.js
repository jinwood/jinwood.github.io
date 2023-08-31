const Icon = ({ kind = 'gallery', onClick, size = 8 }) => {
  return (
    <button onClick={onClick}>
      <span className="sr-only">{kind}</span>
      📷
    </button>
  )
}

export default Icon

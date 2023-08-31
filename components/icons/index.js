import Gallery from './gallery.svg'

const components = {
  gallery: Gallery,
}

const Icon = ({ kind, onClick, size = 8 }) => {
  const Svg = components[kind]
  return (
    <button onClick={onClick}>
      <span className="sr-only">{kind}</span>
      <Svg
        className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`}
      />
    </button>
  )
}

export default Icon

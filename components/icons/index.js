import Gallery from './gallery.svg'

const components = {
  gallery: Gallery,
}

const Icon = ({ kind, size = 8 }) => {
  console.log(kind, components)
  const Svg = components[kind]
  console.log(Svg)
  return (
    <>
      <span className="sr-only">{kind}</span>
      <Svg
        className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`}
      />
    </>
  )
}

export default Icon

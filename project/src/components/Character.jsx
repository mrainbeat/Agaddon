import characterImg from '../assets/텅장이.png'

function Character({ size = 120 }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-[radial-gradient(circle,#FFE7D6_0%,rgba(255,231,214,0)_70%)]"
      style={{ width: size * 1.7, height: size * 1.7 }}
    >
      <img
        src={characterImg}
        alt="텅장이 캐릭터"
        style={{ width: size, height: size }}
        className="object-contain"
      />
    </div>
  )
}

export default Character

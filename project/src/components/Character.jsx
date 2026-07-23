import characterImg from '../assets/텅장이.png'

function Character({ size = 120 }) {
  const glowSize = size * 2.1
  const discSize = size * 1.3
  const imgSize = size * 2.05

  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: glowSize,
        height: glowSize,
        background: 'radial-gradient(circle, #FFD3A0 0%, #FFE3C4 40%, rgba(255,227,196,0) 72%)',
      }}
    >
      <div
        className="relative overflow-hidden rounded-full bg-white shadow-[0_12px_28px_rgba(255,159,67,0.28)]"
        style={{ width: discSize, height: discSize }}
      >
        <img
          src={characterImg}
          alt="텅장이 캐릭터"
          style={{
            width: imgSize,
            height: imgSize,
            position: 'absolute',
            left: '50%',
            top: '62%',
            transform: 'translate(-50%, -50%)',
          }}
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default Character

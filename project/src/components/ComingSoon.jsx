// 아직 디자인/기능이 정해지지 않은 화면을 위한 자리표시자
function ComingSoon({ title, description }) {
  return (
    <div className="screen coming-soon">
      <div className="coming-soon-badge">준비 중</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export default ComingSoon

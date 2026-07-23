import ComingSoon from '../components/ComingSoon.jsx'

// 마이페이지: 실제 화면은 프론트 팀원이 새 목업(리스트형)대로 만들 예정이라
// 여기서는 자리만 잡아둔다.
//
// 연동 방법: "생활비 설정" 메뉴 항목을 만들고 아래처럼 연결하면
// 우리가 만든 플랜세우기(기간+예산 입력, 넘패드, 캐릭터 확인화면)로 이동함.
//
//   import { Link } from 'react-router-dom'
//   <Link to="/plan">생활비 설정</Link>
//
// /plan 라우트와 그 안의 로직(src/pages/PlanSetup.jsx, src/lib/store.js)은
// 이미 완성되어 있어서 그대로 재사용하면 됨. 저장하면 budget.nextPayday /
// budget.maxAmount가 갱신되고 홈 화면에 바로 반영됨.
function MyPage() {
  return (
    <ComingSoon
      title="마이페이지"
      description="리스트형 마이페이지는 팀원이 작업 중이에요. (생활비 설정 → /plan 라우트로 연결 예정)"
    />
  )
}

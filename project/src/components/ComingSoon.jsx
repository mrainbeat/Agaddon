function ComingSoon({ title, description }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-3 px-5 pb-2 pt-24 text-center">
      <div className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">준비 중</div>
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="max-w-[280px] text-sm leading-relaxed text-ink-muted">{description}</p>
    </div>
  )
}

export default ComingSoon

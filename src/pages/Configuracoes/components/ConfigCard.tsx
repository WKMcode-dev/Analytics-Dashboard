type Props = {
  title: string
  children: React.ReactNode
}

export default function ConfigCard({ title, children }: Props) {
  return (
    <div className="card">
      <h3 className="config-title">{title}</h3>
      <div className="config-content">{children}</div>
    </div>
  )
}
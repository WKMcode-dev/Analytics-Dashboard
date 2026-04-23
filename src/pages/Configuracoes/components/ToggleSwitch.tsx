type Props = {
  label: string
  checked: boolean
  onChange: () => void
}

export default function ToggleSwitch({ label, checked, onChange }: Props) {
  return (
    <div className="toggle">
      <span>{label}</span>

      <button
        className={`switch ${checked ? "on" : ""}`}
        onClick={onChange}
      >
        <div className="thumb" />
      </button>
    </div>
  )
}
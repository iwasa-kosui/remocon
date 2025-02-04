import './displayItem.css'

type Props = {
  title?: string
  children: React.ReactNode
}

export const DisplayItem = ({ title = '', children }: Props) => {
  return (
    <div className="display-item">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  )
}

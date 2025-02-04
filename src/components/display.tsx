import './display.css'

type Props = {
  children: React.ReactNode
}

export const Display = ({ children }: Props) => {
  return <section className="display">{children}</section>
}

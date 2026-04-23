// src\components\Layout\Layout.tsx
import type { ReactNode } from "react"
import Sidebar from "../Sidebar/Sidebar"
import "./Layout.css"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        {children}
      </main>
    </div>
  )
}
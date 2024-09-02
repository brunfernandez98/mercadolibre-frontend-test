import React from 'react'
import './BreadCrumb.scss'

interface BreadCrumbProps {
  paths: string[]
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ paths }) => {
  return (
    <nav className="breadcrumb">
      {paths.map((path, index) => (
        <span key={path} className="breadcrumb__item">
          {path}
          {index < paths.length - 1 && (
            <span className="breadcrumb__separator">/</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export default BreadCrumb

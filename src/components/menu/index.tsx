import React from 'react'

const index = () => {

  const menuItems = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ]

  const configMenuItems = [
    '',
    '',
    ''
  ]

  return (
    <div className="menu mini-mode">
      <div className='content'>
        <div className='main-menu-items'>
          {menuItems.map((item) => (
            <>{item}</>
          ))}
        </div>
        <div className='configuration-menu-items'>
          {configMenuItems.map((item) => (
            <>{item}</>
          ))}
        </div>
      </div>
    </div>
  )
}

export default index
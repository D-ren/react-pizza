import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const HeaderLayout = () => {
	return (
		<div className="wrapper">
		<React.StrictMode>
				<Header/>
					<div className="content">
						<Outlet />
					</div>
      </React.StrictMode>
    </div>
	)
}

export default HeaderLayout
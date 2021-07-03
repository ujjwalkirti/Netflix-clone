import React from 'react'
import "./Nav.css"

function Nav() {
    return (
			<div>
				<nav class="navbar">
					<a class="navbar-brand" href="/">
						<img
							src="https://spng.pngfind.com/pngs/s/55-550764_netflix-n-logo-logo-n-de-netflix-hd.png"
							width="90"
							height="90"
							class="d-inline-block align-top"
							alt=""
						/>
					</a>
					<span>
						<button className="btn btn-success mr-4">Login</button>
						<button className="btn btn-primary">Sign-Up</button>
					</span>
				</nav>
			</div>
		);
}

export default Nav

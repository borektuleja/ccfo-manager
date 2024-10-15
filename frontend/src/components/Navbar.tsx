import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<header className="__navbar">
			<nav className="__navbar__navigation">
				<ul className="__navbar__list">
					<li className="__navbar__item">
						<Link to="/prehled">Seznam událostí</Link>
					</li>
					<li className="__navbar__item">
						<Link to="/vytvorit">Nová událost</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

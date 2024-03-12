import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/about" activeClassName="active">About</NavLink></li>
                <li><NavLink to="/articles" activeClassName="active">Articles</NavLink></li>
            </ul>
        </nav>
    )
}
export default NavBar;
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import "./Header.scss"

function Header({ showLinks }){
    return (
        <header>
            {showLinks && (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/create-course">Create Course</Link>
                    <Link to="/courses">List Courses</Link>
                    <Link to="/create-student">Create Student</Link>
                    <Link to="/students">List Students</Link>
                </>
            )}
        </header>
    );
}

Header.propTypes = {
    showLinks: PropTypes.bool
};

export default Header;

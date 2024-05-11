import React from 'react';
import {Link} from "react-router-dom";

const DropdownMenu = ({isOpen, category}) => {
    return (
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
            {category.subMenu.map((subcategory, index) => (
                <Link
                    to={`/${category.name.toLowerCase()}/${subcategory.name.toLowerCase().split(" ").join("")}`}
                    state={{category: category, subcategory: subcategory}}
                    key={subcategory.subcategoryId}
                    className='dropdown-link'
                >
                    {subcategory.name}
                </Link>
            ))}
        </div>
    );
};

export default DropdownMenu;

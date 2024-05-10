import React from 'react';
import {Link} from "react-router-dom";

const DropdownMenu = ({ items, isOpen,slug}) => {
    return (
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
            {items.map((item, index) => (
                <Link to={`/${slug}/${item.title}`} className={item.cName} key={index}>
                    {item.title}
                </Link>
            ))}
        </div>
    );
};

export default DropdownMenu;

import React from 'react';
import styles from './Header.module.css';
import withMousePosition from '../../hoc/withMousePosition';

function Header(props) {
    const paralaxStyles = {
        transform: `translate(
        ${props.mouseX / -20}px,
        ${props.mouseY / 120}px 
        )`,
    };

    return (
        <header className={`${styles.header}`}>
            <div className='text-light'>
                <div className={styles.headerImage}
                    style={paralaxStyles}></div>
            </div>
            {props.children}
        </header>
    )
}

export default withMousePosition(Header);
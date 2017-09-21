// in src/Menu.js
import React from 'react';
import { connect } from 'react-redux';
import { translate, DashboardMenuItem, MenuItemLink } from 'admin-on-rest';
import compose from 'recompose/compose';

import PersonIcon from 'material-ui/svg-icons/social/person';
import BookIcon from 'material-ui/svg-icons/action/book';
import GroupIcon from 'material-ui/svg-icons/social/group';

const items = [
    { name: 'Experiments', icon: <BookIcon /> },
];

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
};

const Menu = ({ onMenuTap, translate, logout }) => (
    <div style={styles.main}>
        <DashboardMenuItem onClick={onMenuTap} />
        {items.map(item => (
            <MenuItemLink
                key={item.name}
                to={`/${item.name}`}
                primaryText={item.name}
                leftIcon={item.icon}
                onClick={onMenuTap}
            />
        ))}
        <MenuItemLink
            to="/configuration"
            primaryText={"Configuration"}
            leftIcon={<PersonIcon />}
            onClick={onMenuTap}
        />
        {logout}
    </div>
);

const enhance = compose(
    connect(state => ({
        theme: state.theme,
        locale: state.locale,
    })),
    translate,
);

export default enhance(Menu);
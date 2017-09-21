import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';


const FullNameField = ({ record = {} }) => <span></span>;
FullNameField.defaultProps = { label: 'Name' };

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <FullNameField  />
        </Datagrid>
    </List>
);
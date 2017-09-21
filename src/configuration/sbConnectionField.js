import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';
import { sbConfig } from './config'


const FullNameField = ({ record = {} }) => <span>{record.firstName} {record.lastName}</span>;
FullNameField.defaultProps = { label: 'Name' };

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <FullNameField source="lastName" />
        </Datagrid>
    </List>
);
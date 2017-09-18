// in src/exp.js
import React from 'react';
import { List, Datagrid, TextField } from 'admin-on-rest';

export const ExpList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
			<TextField source="name" />
        </Datagrid>
    </List>
);



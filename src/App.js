// in src/App.js

import React from 'react';
import themeReducer from './themeReducer';
import { Admin, Resource, Delete  } from 'admin-on-rest';
import { ExpList, ExpEdit, ExpCreate } from './exp';
import Login from './Login';
import Dashboard from './Dashboard';
import authClient from './authClient';
import Menu from './Menu';
import customRoutes from './routes';
import Layout from './Layout';
//import { sbConfig } from './config'

import streamingBanditClient from './streamingBanditClient';


const App = () => (
    <Admin authClient={authClient} 
			menu={Menu}
	        dashboard={Dashboard} 
			title="StreamingBandit"
            appLayout={Layout}
            customRoutes={customRoutes}
			customReducers={{ theme: themeReducer }}
			loginPage={Login}
			restClient={streamingBanditClient(localStorage.getItem('serverurl'))}>

				<Resource name="Experiments" list={ExpList} edit={ExpEdit} create={ExpCreate} remove={Delete}/>

    </Admin>
);


export default App;

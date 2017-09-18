// in src/App.js

import React from 'react';

import { Admin, Resource } from 'admin-on-rest';
import { ExpList } from './exp';
import Login from './Login';
import Dashboard from './Dashboard';
import authClient from './authClient';


import streamingBanditClient from './streamingBanditClient';

const App = () => (
    <Admin authClient={authClient} 
	        dashboard={Dashboard} 
			title="StreamingBandit"
			loginPage={Login}
			restClient={streamingBanditClient('http://strm.mnds.org:7070')}>
			

				<Resource name="Experiments" list={ExpList} />

    </Admin>
);


export default App;

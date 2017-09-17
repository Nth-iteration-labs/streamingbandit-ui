// in src/App.js

import React from 'react';

import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';

import { PostList } from './posts';

import Login from './Login';
import Dashboard from './Dashboard';
import authClient from './authClient';

const App = () => (
    <Admin authClient={authClient} 
	        dashboard={Dashboard} 
			title="StreamingBandit"
			loginPage={Login}
			restClient={jsonServerRestClient('http://strm.mnds.org:7070')}>

				<Resource name="posts" list={PostList} />

    </Admin>
);


export default App;

import React, { Component } from 'react';
import themeReducer from './themeReducer';
import { Admin, Resource, Delete  } from 'admin-on-rest';
import { ExpList, ExpEdit, ExpCreate } from './exp';
import Login from './Login';
import Dashboard from './Dashboard';
import authClient from './authClient';
import Menu from './Menu';
import customRoutes from './routes';
import Layout from './Layout';


import streamingBanditClient from './streamingBanditClient';
import { easyComp } from 'react-easy-state'
import store from './store'

class App extends Component {


	constructor(props) {
		super(props);
		this.props = props
		this.state = { 
					   defaultExps : [],
				     }
	 }

    componentDidMount() {
		
	}

    render(props,state) {
        return (
			
    <Admin authClient={authClient} 
			menu={Menu}
	        dashboard={Dashboard} 
			title="StreamingBandit"
            appLayout={Layout}
            customRoutes={customRoutes}
			customReducers={{ theme: themeReducer }}
			loginPage={Login}
			restClient={streamingBanditClient(store.serverurl)}>

			<Resource serverurl={store.serverurl} name="Experiments" list={ExpList} edit={ExpEdit} create={ExpCreate} remove={Delete}/>

    </Admin>
		
		)
	}
}

export default  easyComp(App);

import React, {Component} from 'react';
import themeReducer from '../reducers/themeReducer';
import {Admin, Delete, Resource} from 'admin-on-rest';
import {ExpCreate, ExpEdit, ExpList} from '../components/Experiment';
import Login from './Login';
import Dashboard from '../components/Dashboard';
import authClient from '../network/authClient';
import Menu from './Menu';
import customRoutes from '../routes/routes';
import Layout from './Layout';


import streamingBanditClient from '../network/streamingBanditClient';
import {easyComp} from 'react-easy-state'
import store from '../stores/store'

class App extends Component {


    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            defaultExps: [],
        }
    }

    render(props, state) {
        return (

            <Admin authClient={authClient}
                   menu={Menu}
                   dashboard={Dashboard}
                   title="StreamingBandit"
                   appLayout={Layout}
                   customRoutes={customRoutes}
                   customReducers={{theme: themeReducer}}
                   loginPage={Login}
                   restClient={streamingBanditClient(store.serverurl)}>

                <Resource {...props} serverurl={store.serverurl} name="Experiments" list={ExpList} edit={ExpEdit}
                          create={ExpCreate} remove={Delete}/>

            </Admin>

        )
    }
}

export default easyComp(App);

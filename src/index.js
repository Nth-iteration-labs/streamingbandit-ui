import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './core/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();

/* control-s save code - refactor */

var isCtrl = false;

document.onkeyup=function(e){
    if(e.keyCode === 17) isCtrl=false;
}

document.onkeydown=function(e){
    if(e.keyCode === 17) isCtrl=true;
    if(e.keyCode === 83 && isCtrl === true) {
		let button = document.querySelector('button[type="submit"]')
		if (button)
		{
			if (button.innerHTML.indexOf('Save') !== -1)
			{
				button.click()
			}
		}
        return false;
    }
}
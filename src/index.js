import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/*if (localStorage.getItem("serverurl") === null || localStorage.getItem("serverurl") === "unset" || localStorage.getItem("serverurl") === "") {
	fetch('./config.json')
	  .then(response => response.text())
	  .then(text => {
			try {
				var data = JSON.parse(text);
				this.defaultServerUrl = data.serverurl

				console.log("json"+data.serverurl)
				startApp(data.serverurl)
			} catch(err) {
				startApp("http://localhost:8080")
				console.log("error1")
			}
	  }).catch(function(error) {
			startApp("http://localhost:8080")
			console.log("error2")
	  });
} else {
	console.log("localstore")
	startApp(localStorage.getItem("serverurl"))
}

function startApp(server) {
	ReactDOM.render(<App defaultServerUrl={server} />, document.getElementById('root'));
	registerServiceWorker();
}*/

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
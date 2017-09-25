// in src/config.js

// StreamingBandit client configuration

let clientUrl = { sbConnectionUrl: 'http://strm.mnds.org:7070' };

if(localStorage.getItem('serverurl') !== null) {  
	clientUrl = localStorage.getItem('serverurl') 
}

// Set StreamingBandit connection URL
export const sbConfig = { sbConnectionUrl: clientUrl };
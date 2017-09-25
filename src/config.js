// in src/config.js

// StreamingBandit client configuration

let clientUrl = "http://strm.mnds.org:7070"

if (localStorage.getItem("serverurl") === null) {
  localStorage.setItem('serverurl',clientUrl)
} else { 
	clientUrl = localStorage.getItem('serverurl') 
}

// Set StreamingBandit connection URL
export const sbConfig = { sbConnectionUrl: clientUrl };

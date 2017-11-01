#  StreamingBanditUI

StreamingBanditUI is an open source software tool written in Javascript (particularly, in [React](https://reactjs.org/)), intended to handle the administration of [StreamingBandit server(s)](https://github.com/Nth-iteration-labs/streamingbandit-ui) over the Web or from your Desktop.

##  How to install and use StreamingBanditUI 

To start, first make sure you have installed [StreamingBandit server](https://github.com/Nth-iteration-labs/streamingbandit-ui).

Then just follow these steps.

1. Download and unzip the StreamingBanditUI package [here](https://github.com/Nth-iteration-labs/streamingbandit-ui/releases/download/v1.0/StreamingBanditUI.zip), if you haven't already. 
The StreamingBanditUI package will extract into a folder called StreamingBanditUI in the same directory that you downloaded StreamingBanditUI.zip
2. Upload the all of the files contained in the StreamingBanditUI folder to the desired location on your web server and visit index.html.

OR

2. Run StreamingBanditUI by clicking on index.html in the StreamingBanditUI directory. This works in most, but not all browsers. Recent versions of Firefox, Microsoft Edge and Google Chrome should work fine.
3. Now enter the IP or domain together with the port on StreamingBandit is running (default: http://localhost:8080) and login to the StreamingBandit server.

That's it! You should now be able to access your StreamingBandit server, and start experimenting! 

###  Browser compatibility

StreamingBandit Client is compatible with the following browsers:

| Desktop | Mobile |
|-----------------------|---------------------------|
| Chrome 49.0 + | Android 56 + |
| MS Edge 12 (10240) +  | Safari Mobile 10.0 + |
| Firefox 18 + | Edge (Yes) + |
| Safari 10.0 + | Firefox Mobile 18 + |
| Opera 36 + | IE Mobile 13 (10586) + |
|  | Opera Mobile 37 + |
|  | Chrome for Android 49.0 + |

StreamingBandit Client is *not* compatible with Internet Explorer, and does not run locally (by clicking index.html) in Safari.

<img style="max-width:100%;border: 1px solid;" src="https://raw.githubusercontent.com/Nth-iteration-labs/streamingbandit-ui/master/img/experiments.png" width="435"/> &nbsp;&nbsp;<img style="max-width:100%;border: 1px solid;" src="https://raw.githubusercontent.com/Nth-iteration-labs/streamingbandit-ui/master/img/ab_test.png" width="435"/>

##  Specifications

RESTful frontend for [StreamingBandit](https://github.com/Nth-iteration-labs/streamingbandit).

Build on [Admin-on-rest](https://github.com/marmelab/admin-on-rest) and [React](https://reactjs.org/).

To explore the source code, start with [src/index.js](https://github.com/Nth-iteration-labs/streamingbandit-ui/blob/master/src/index.js).

**Note**: This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Available Scripts

The StreamingBandit team makes use of [Yarn](https://yarnpkg.com/en/), but NPM should build StreamingBanditUI fine too. In that case, replace "yarn" below with "npm".

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

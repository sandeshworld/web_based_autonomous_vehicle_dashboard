# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

--------------------------------------------------------------------------------------------------------------------------------

# Project Overview

The Dashboard is the last leg of sending ROS2 data over to a web application to display the data live. 

The data made it's journey from:

1. LGSVL Simulator
2. LGSVL's Rosbridge
3. A node I have running that subscribes to the CAN_BUS topic, and then relays the information via UDP
4. A python flask server that subscribes to the UDP messages and then publishes it over SocketIO
5. This application subscribes to the SocketIO messages and then publishes it. 


Here is an image of it running on a browser:
![image](https://user-images.githubusercontent.com/28467603/135752434-548c9354-6239-4a75-8a20-00f75a4769ba.png)


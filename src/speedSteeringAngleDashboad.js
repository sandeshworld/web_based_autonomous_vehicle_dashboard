import React, { Component, useState, useEffect } from 'react';
// import * as ROSLIB from 'roslib';
// import io from 'socket.io-client';
// import Messages from './Messages';
// import MessageInput from './MessageInput';

// const ENDPOINT = "ws://localhost:9090";

import io from 'socket.io-client';
// import {SocketContext} from 'context/socket';
import ReactSpeedometer from "react-d3-speedometer"
// import { Transition } from 'react-d3-speedometer'
import {CanvasJSChart} from 'canvasjs-react-charts'

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation
} from "react-simple-maps";


var dps = [];
var updateInterval = 100;
var xVal = 0;

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

// can have a parent class called ros handler to handle ros connection stuff
class SteeringSpeedDashboard extends React.Component {
      constructor() {
        super();
        this.state = {
            response: {'test': '1'},
            endpoint: "http://localhost:5001",
            speed: 0,
            rpm: 0
        };
        this.updateChart = this.updateChart.bind(this);
    }


    componentDidMount() {
      const {endpoint} = this.state;
      //Very simply connect to the socket
      const socket = io(endpoint);
      //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
      socket.on("data", data => {
        var mph = 2.23694 * parseFloat(data['data']['speed_mps']);
        var rpm_Data = Math.trunc(parseFloat(data['data']['engine_rpm']));
        this.setState({response: data['data'], speed: Math.trunc(mph), rpm: rpm_Data}); 
        // console.log(data['data']['speed_mps']);
        // console.log(parseFloat(data['data']['speed_mps']))
      });
      setInterval(this.updateChart, updateInterval);


  }

  updateChart() {
		dps.push({x: xVal, y: this.state.speed});
		xVal++;
		if (dps.length >  200 ) {
			dps.shift();
		}
		this.chart.render();
	}
  

    render() { 
        // console.log(this.state.response)
        const {response} = JSON.stringify(this.state.response)
        const {speed} = this.state.speed
        // console.log(speed)
        const options = {
          title :{
            text: "Speed History"
          },
          axisX:{
            title:"Time",
           },
           axisY:{
            title:"MPH",
           },
          data: [{
            type: "line",
            dataPoints : dps
          }]
        }
        return (
        <div>
          <div style={{width: "30%", display:'inline-block'}}>
            <h2>Speedometer</h2>
            <ReactSpeedometer
              value={this.state.speed}
              //  fluidWidth={true}
              // forceRender={true}
              // segments={5000}
              needleTransition="easeLinear" //for smooth motion
              customSegmentStops={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110]}
              minValue={0}
              maxValue={110}
              currentValueText= "Speed: ${value} MPH"
              startColor="yellow"
              endColor="red"
              />
            </div>

            <div style={{width: "30%", display:'inline-block'}}>
            <h2>Tachometer</h2>
            <ReactSpeedometer
              value={this.state.rpm}
              //  fluidWidth={true}
              // forceRender={true}
              // segments={5000}
              needleTransition="easeLinear" //for smooth motion
              minValue={0}
              maxValue={10000}
              currentValueText= "RPM: ${value}"
              startColor="yellow"
              endColor="red"
              />
            </div>

            <div style={{width: "50%", marginRight: 'auto', marginLeft: 'auto'}}> 
            <CanvasJSChart options = {options}
              onRef={ref => this.chart = ref}
            /> {

            }
            </div>

            <h3>Built by Sandesh Banskota</h3>
        </div>
        );
        
    }
}
 
export default SteeringSpeedDashboard;

// IF I COULD USE THE ROSLIBJS WITHOUT ISSUE - the code I had written looks like this
// var ros = new ROSLIB.Ros({
        //     url : 'ws://localhost:9090'
        //   });

        // // things that could go on ROS parent class
        // ros.on('connection', function() { console.log('Connected to websocket server.');});

        // ros.on('error', function(error) { console.log('Error connecting to websocket server: ', error); window.alert('Error connecting to websocket server'); });
      
        // ros.on('close', function() { console.log('Connection to websocket server closed.');});

        // // ros.authenticate();
        // // var topics = [];
        // // var types = [];
        // // ros.getTopics(topics, types);
        // // console.log(topics);
        // // for (var j in topics) {
        // //     console.log(j);
        // //     console.log('1');
        // // }
        // var cmdVel = new ROSLIB.Topic({
        //     ros : ros,
        //     name : '/cmd_vel',
        //     messageType : 'geometry_msgs/Twist'
        //   });
          
        //   var twist = new ROSLIB.Message({
        //   linear : {
        //     x : 0.1,
        //     y : 0.2,
        //     z : 0.3
        //   },
        //   angular : {
        //     x : -0.1,
        //     y : -0.2,
        //     z : -0.3
        //   }
        //   });
          
        //   console.log("Publishing cmd_vel");
        //   cmdVel.publish(twist);


        // var imuTopicListener = new ROSLIB.Topic({
        //     ros : ros,
        //     name : '/imu/imu_raw',
        //     messageType : 'sensor_msgs/Imu'
        // });

        // //this works... now what about message published from lgsvl
        // cmdVel.subscribe(function(message) {
        //     console.log('Received message on ' + cmdVel.name + ': ' + JSON.stringify(message));
        //   });

        //           //doesn't work
        // imuTopicListener.subscribe(function(message) {
        //     console.log('Received message on ' + imuTopicListener.name + ': ' + JSON.stringify(message));
        //   });
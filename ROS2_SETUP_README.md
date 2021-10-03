# Things to Install

Install:
ros2-web-bridge -> https://www.npmjs.com/package/ros2-web-bridge
roslibjs -> https://www.npmjs.com/package/roslib, (dev note: https://github.com/RobotWebTools/roslibjs/issues/252)



I keep encountering this issue with the lgsvl issue with ros2 compatibility issue. basically the get command being used by roslibjs is old and
thus the lgsvl_bridge gets a error (71) issue.

To fix this, I am going to try to write my own code to tap into port 9090, using socketio.
I am looking at these two documents for hints on how to do that: 


good socketio tutorial: https://socket.io/docs/v4/
Socketio: https://www.valentinog.com/blog/socket-react/
Using socketio: https://titanwolf.org/Network/Articles/Article?AID=6b39a4d4-91ae-4923-9fcd-54724a84c829#gsc.tab=0 with ros
Rosbridge protocol to follow: https://github.com/RobotWebTools/rosbridge_suite/blob/groovy-devel/ROSBRIDGE_PROTOCOL.md


Using, wireshark, I can tell that the following is true:

NEW APPROACH:

My new idea. I will create a ros package/node that will iterate through all the topics, and subscribe to them, then it will publish it using socket.io, the user will just have to write the socket.io client side to subscribe and then publish to webpage. rather than trying to directly get ros topics from the web browser.


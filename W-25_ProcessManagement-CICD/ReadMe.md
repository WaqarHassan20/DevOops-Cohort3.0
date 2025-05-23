# use of pm2 in ec2 VMs

- Reliable Process Management: PM2 automatically restarts our application if it crashes or exits unexpectedly.
- Scalability: PM2 allows us to scale our application horizontally by running multiple instances of our application on a single VM.
- Monitoring and Logging: PM2 provides built-in monitoring and logging features, making it easier to debug and troubleshoot issues.

•	Keeps apps running continuously.
•	Automatically restarts crashed apps.
•	Provides monitoring and logging.
•	Supports running multiple app instances for better performance.

# install using : npm i -g pm2
# then create a file test.js or someone else name
# then run the command : pm2 start app.js
- rest of all commands of pm2 can be get from the documentation of pm2

### Terms to understand
- curl: similar to postman but for terminal
- lsof: this gives you the process id for a given port
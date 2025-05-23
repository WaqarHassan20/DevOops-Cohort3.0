## For all other info like VM and platforms for cloud services, go to onedrive account and folder having ScreenShots of video lectures of Kirat Singh.

# SOME MAIN IMP TOPICS 

## SSH keys

SSH keys work using a cryptographic system called public-key authentication, which allows secure access to remote servers without using passwords. When you generate an SSH key pair, you get a private key (which stays on your computer) and a public key (which you place on the server). When you try to connect to the server, your computer uses the private key to prove its identity. The server checks this against the public key you added earlier. If they match, access is granted — no password needed. This method is safer and more convenient than using passwords, especially for automated or repeated logins.




## Ngnix 

Yes — in simple terms, Nginx acts like a third-party middleman between the client and your actual backend server.



## 🔁 Role of Nginx as a Reverse Proxy:

Client sends a request to your domain (e.g., example.com).

Nginx receives it first, not your backend directly.

Nginx forwards it to your app server (e.g., running on port 3000).

Your app sends back a response to Nginx.

Nginx returns the response to the client.



## 🔒 Why It's Useful:

Security: hides your backend

Performance: adds caching, gzip, etc.

Flexibility: handles multiple apps/domains easily

SSL: offloads HTTPS handling

So yes, Nginx is a powerful "smart gatekeeper" between users and your server.
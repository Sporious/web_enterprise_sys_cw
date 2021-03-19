#!/bin/bash
#startup script for dev, 
#includes prisma studio which opens on port 5555 and allows DB control
#includes apollo graphql tools on port 4000
run_client() { cd ./client;npm run dev;}
run_server() { cd ./server;npm run dev;}
run_prisma_studio() { cd ./server;npx prisma studio;}
run_client & run_server & run_prisma_studio;
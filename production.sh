#!/bin/bash
#startup script for production, 
run_client() { cd ./client;npm run build;npm run start;}
run_server() { cd ./server;npm run dev;}
run_client & run_server;
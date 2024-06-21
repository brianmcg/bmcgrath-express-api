#!/bin/bash

# scp -r dist/* bm:~/www/
scp -rp dist/* azure:~/www/bmcgrath-express-api
scp -rp dist/.env azure:~/www/bmcgrath-express-api

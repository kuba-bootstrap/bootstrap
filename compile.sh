#!/bin/bash
killall node
npm install
cd './build'
node 'compile-css.js' $1
#!/bin/bash

[[ -d release ]] && rm -rf release
mkdir -p release
cp -R dist/* release
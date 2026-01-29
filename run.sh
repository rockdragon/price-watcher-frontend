#!/bin/bash


if [ "$1" == "docker" ]; then
    echo "run the frontend in DOCKER mode..."
    ./docker_run.sh
else
    echo "run the frontend in SHELL mode..."
    npm run dev
fi

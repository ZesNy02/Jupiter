#!/bin/bash

if [[ $(uname -s) == "Linux" ]]; then
    apt-get update && apt-get install -y python3 python3-pip python3-venv
    python3 -m venv /opt/venv
    export PATH="/opt/venv/bin:$PATH"
    start.sh
else
    echo "You are not on a Linux environment."
fi
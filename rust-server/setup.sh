#!/bin/bash

if [[ $(uname -s) == "Linux" ]]; then
    apt-get update && apt-get install -y python3 python3-pip python3-venv
    python3 -m venv /opt/venv
    export PATH="/opt/venv/bin:$PATH"
    pip install --upgrade langchain langchain-community langchainhub langchain-openai langchain-chroma bs4 pypdf sentence_transformers
    python3 ./scripts/python/vectorstore.py
    cargo build
    cargo run
else
    echo "You are not on a Linux environment."
fi
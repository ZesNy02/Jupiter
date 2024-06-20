#!/bin/bash

pip install --upgrade -r requirements.txt --no-index
python3 ./scripts/python/ai/vectorstore.py
cargo build --release
#!/bin/bash

pip install --upgrade -r python_dependencies.txt --no-index
python3 ./scripts/python/ai/vectorstore.py
cargo build --release
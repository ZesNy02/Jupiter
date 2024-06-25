@echo off

pip install --upgrade -r python_dependencies.txt --no-index
cargo build --release
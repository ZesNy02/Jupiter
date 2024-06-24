import sys

# This scripts purpose is to test the call to a python script from Rust

if len(sys.argv) != 2:
    sys.exit(1)

if sys.argv[1] == "hello":
    print("World")
elif sys.argv[1] == "err":
    print("Error: Test argument provided")

sys.exit(0)

import sys

if len(sys.argv) != 2:
    print("No argument provided")
    sys.exit(1)

if sys.argv[1] == "hello":
    print("World")
elif sys.argv[1] == "err":
    print("Error: Test argument provided")

sys.exit(0)
import subprocess


def build_docker_image(image_name, tag="latest"):
    try:
        subprocess.run(
            ["docker", "build", "-t", f"{image_name}:{tag}", "."], check=True
        )
        print(f"Successfully built Docker image: {image_name}:{tag}")
    except subprocess.CalledProcessError as e:
        print(f"Error building Docker image: {e}")


def tag_and_push_image(image_name, tag="latest"):
    try:
        subprocess.run(
            ["docker", "tag", f"{image_name}:{tag}", f"{image_name}:{tag}"], check=True
        )
        subprocess.run(["docker", "push", f"{image_name}:{tag}"], check=True)
        print(f"Successfully tagged and pushed Docker image: {image_name}:{tag}")
    except subprocess.CalledProcessError as e:
        print(f"Error tagging and pushing Docker image: {e}")


if __name__ == "__main__":
    docker_image_name = "devtonka/jupiter-website"
    docker_image_tag = "latest"
    build_docker_image(docker_image_name, docker_image_tag)
    tag_and_push_image(docker_image_name, docker_image_tag)

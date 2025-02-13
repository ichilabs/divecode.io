import os
import shutil
import subprocess


def print_info(message):
    print(f"[INFO] {message}")


def print_success(message):
    print(f"[SUCCESS] {message}")


def print_warning(message):
    print(f"[WARNING] {message}")


def print_error(message):
    print(f"[ERROR] {message}")


# Check if .gitignore exists and handle venv addition
def handle_gitignore():
    gitignore_path = ".gitignore"
    venv_entry = "venv/"

    if os.path.exists(gitignore_path):
        with open(gitignore_path, "r") as file:
            gitignore_content = file.readlines()

        # Check if 'venv/' is already ignored
        if any(venv_entry.strip() == line.strip() for line in gitignore_content):
            print_info("'venv/' is already in .gitignore.")
        else:
            with open(gitignore_path, "a") as file:
                file.write(f"\n# Ignore the virtual environment folder\n{venv_entry}\n")
            print_success("Added 'venv/' to .gitignore with a comment.")
    else:
        with open(gitignore_path, "w") as file:
            file.write(f"# Ignore the virtual environment folder\n{venv_entry}\n")
        print_success("Created .gitignore and added 'venv/' with a comment.")


# Delete and recreate virtual environment
def recreate_venv():
    venv_dir = "venv"

    # Remove venv if it exists
    if os.path.exists(venv_dir):
        shutil.rmtree(venv_dir)
        print_info("Existing virtual environment removed.")

    # Create a new virtual environment
    subprocess.run(["python3", "-m", "venv", venv_dir], check=True)
    print_success("Virtual environment created successfully.")

    # Upgrade pip to the latest version
    subprocess.run(["venv/bin/pip", "install", "--upgrade", "pip"], check=True)
    print_success("Upgraded pip to the latest version.")


# Install dependencies from requirements.txt
def install_requirements():
    requirements_file = "requirements.txt"
    if os.path.exists(requirements_file):
        subprocess.run(["venv/bin/pip", "install", "-r", requirements_file], check=True)
        print_success("Dependencies installed from requirements.txt.")
    else:
        print_warning("requirements.txt not found. No dependencies installed.")


# Main script execution
def main():
    print_info("Setting up the virtual environment...")
    recreate_venv()
    handle_gitignore()
    install_requirements()
    print_success("Setup complete! You're ready to go.")


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as e:
        print_error(f"A subprocess error occurred: {e}")
    except Exception as e:
        print_error(f"An unexpected error occurred: {e}")

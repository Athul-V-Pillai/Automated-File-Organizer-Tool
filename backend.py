import os
import shutil
import sys
import time

# Folder extensions categorized into types
FILE_TYPES = {
    "Images": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    "Videos": [".webm", ".mov", ".mp4", ".m4p", ".m4v"],
    "Documents": [".doc", ".docx", ".pdf", ".key"],
    "Code": [".py", ".java", ".html", ".css", ".js", ".sql", ".cpp", ".c"],
    "Text": [".txt", ".md", ".xml"],
}

DEFAULT_FOLDER = "Other"  # For uncategorized files


# Function to create subdirectories for file types
def create_subdirectories(base_dir):
    for folder in FILE_TYPES.keys():
        os.makedirs(os.path.join(base_dir, folder), exist_ok=True)
    os.makedirs(os.path.join(base_dir, DEFAULT_FOLDER), exist_ok=True)


# Function to categorize files based on their extensions
def categorize_file(file_name):
    for folder, extensions in FILE_TYPES.items():
        if file_name.endswith(tuple(extensions)):
            return folder
    return DEFAULT_FOLDER


# Function to move files to appropriate subdirectories
def move_file(file_name, base_dir):
    source_path = os.path.join(base_dir, file_name)
    target_folder = categorize_file(file_name)
    target_path = os.path.join(base_dir, target_folder, file_name)

    # Handle duplicate filenames
    if os.path.exists(target_path):
        base, ext = os.path.splitext(file_name)
        counter = 1
        while os.path.exists(os.path.join(base_dir, target_folder, f"{base}_{counter}{ext}")):
            counter += 1
        target_path = os.path.join(base_dir, target_folder, f"{base}_{counter}{ext}")

    shutil.move(source_path, target_path)
    print(f"Moved: {file_name} -> {target_folder}")


# Main function to monitor and organize files
def monitor_and_organize(folder_path):
    create_subdirectories(folder_path)
    print(f"Monitoring folder: {folder_path}")

    try:
        while True:
            files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
            for file in files:
                move_file(file, folder_path)
            time.sleep(3)  # Check every 3 seconds
    except KeyboardInterrupt:
        print("\nMonitoring stopped. Exiting...")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No folder path provided!")
        sys.exit(1)

    folder_to_monitor = sys.argv[1]
    monitor_and_organize(folder_to_monitor)

#!/bin/bash

VENV_DIR=".venv"

PROJECTS_DIR="/app"

PYTHON_SCRIPT="mkdocs"
SERVE_SCRIPT="mkdocs serve --dev-addr 0.0.0.0:5990 --config-file /app/mkdocs-weekly-report.yml"
DEPS_FILE="requirements.txt"
DEPS="mkdocs"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python3 is not installed. Please install it and try again.";
    exit 1;
fi

# Check Virtual Environmentm (.venv) is exist or not
if [ ! -d "$VENV_DIR" ]; then
    echo "Virtual Environment Isn't Exsist,Creating The New One.....";
    python -m venv $VENV_DIR;
    echo ".venv Folder Created";
    # echo "`ls $VENV_DIR/ -la`";


    if [ $? -ne 0 ]; then
        echo "Failed To Create Virtual Environment";
        exit 1;
    fi
fi

# Active The Virtual Environment
echo "Activating Virtual Environment";
# echo "`pwd`"
# echo "`ls $VENV_DIR/bin/ -la`";

# DEPS="mkdocs mkdocs-material"

source "$VENV_DIR/bin/activate";

pip install wheel
pip install --upgrade pip wheel

pip install libsass
pip install --upgrade libsass

pip install -r $DEPS_FILE;


# Move To Projects Directory
# Check Virtual Environmentm (.venv) is exist or not
if [ -d "$PROJECTS_DIR" ]; then
    echo "Moving Into Projects Directory";
    cd $PROJECTS_DIR;
else
    echo "Projects Directories Not Found";
fi


# Run Server Initialization
echo "Running Server Initialization";
echo "`$SERVE_SCRIPT`";


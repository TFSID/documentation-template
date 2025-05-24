# Use an official Python image as a base
FROM python:3.11.9-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies required for building Python packages and MkDocs
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    build-essential \
    libffi-dev \
    git \
    libgtk-3-dev \
    libgdk-pixbuf2.0-dev \
    libglib2.0-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install virtualenv
RUN pip install --no-cache-dir virtualenv

# Create and activate a virtual environment
RUN virtualenv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"

# Copy the application code to the container
COPY . /app

# Install Python dependencies including MkDocs
RUN pip install --no-cache-dir -r requirements.txt

# Install MkDocs and additional plugins if needed
RUN pip install --no-cache-dir mkdocs mkdocs-material

# Expose the MkDocs development server port
EXPOSE 5990

# Run MkDocs development server
CMD ["/bin/bash", "/app/run.sh"]

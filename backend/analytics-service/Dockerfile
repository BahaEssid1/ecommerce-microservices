# ==================== Builder Stage ====================
FROM python:3.11-slim AS builder

# Set working directory
WORKDIR /app

# Install build dependencies (if needed for any wheels)
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install dependencies in a virtual env-like way
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the app source code
COPY . .

# ==================== Runtime Stage ====================
FROM python:3.11-slim AS runner

WORKDIR /app

# Create a non-root user for security
RUN adduser --system --group --no-create-home appuser

# Copy installed dependencies from builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copy the app code
COPY --from=builder /app .

# Set ownership and switch to non-root user
RUN chown -R appuser:appuser /app
USER appuser

# Expose port 8003
EXPOSE 8003

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV PORT=8003

# Start the FastAPI app with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8003"]
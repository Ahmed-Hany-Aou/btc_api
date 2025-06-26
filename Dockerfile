# STEP 1: Define the Base Image
# We start by choosing a base image. This is like selecting the operating system
# and pre-installed software (Node.js in this case) for our container.
# "node:20-alpine" means:
#   - "node": Official Node.js image.
#   - "20": Specific version of Node.js (matches your v20.13.1).
#   - "alpine": A very small, lightweight Linux distribution, making the final image smaller.
FROM node:20-alpine

# STEP 2: Set the Working Directory
# This command sets the default directory where our application code will live
# inside the Docker container. All subsequent commands (like COPY, RUN, CMD)
# will be executed relative to this directory.
WORKDIR /app

# STEP 3: Copy Dependency Files
# We copy 'package.json' and 'package-lock.json' (if you have one) first.
# Docker builds images in layers. By copying these files first, Docker can cache
# the 'npm install' layer. If only your application code changes later, Docker
# won't need to re-run 'npm install', saving time.
COPY package*.json ./

# STEP 4: Install Node.js Dependencies
# This command runs 'npm install' inside the container. It reads the package.json
# and downloads all your project's dependencies into the 'node_modules' folder
# within the container.
RUN npm install

# STEP 5: Copy the Rest of Your Application Code
# Now that dependencies are installed, we copy all other files from your
# project's root directory into the container's /app directory.
# The '.' after COPY means "copy everything from the current directory on my host machine".
# The '.' after that means "to the current working directory inside the container (/app)".
COPY . .

# STEP 6: Expose the Application Port
# This informs Docker that the container will listen on a specific network port.
# Your Express app listens on port 3000 (from your index.js: app.listen(port = 3000)).
# This is a documentation step; it doesn't actually publish the port. That's done with 'docker run -p' or Kubernetes service.
EXPOSE 3000

# STEP 7: Define the Command to Run the Application
# This is the command that will be executed when a Docker container is started
# from this image. It tells the container how to launch your application.
# "node index.js" is how you run your Express app locally.
CMD [ "node", "index.js" ]
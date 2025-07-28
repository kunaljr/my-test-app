module.exports = {
  apps: [
    {
      name: "my-express-app",
      script: "./index.js", // or your main entry point
      instances: "max",      // uses all CPU cores
      exec_mode: "cluster",  // enables cluster mode
      watch: false,          // set to true only in dev
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080
      }
    }
  ]
};

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'wx-server',
      script    : './app.js',
      env: {
        "NODE_ENV": "dev"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : '140.82.43.167',
      ref  : 'origin/master',
      repo : 'git@github.com:yozosann/wx-server.git',
      path : '/root/www/wx-server',
      'post-deploy' : 'yarn && pm2 reload ecosystem.config.js --env production',
      env  : {
        NODE_ENV: 'production'
      }
    },
    // dev : {
    //   user : 'node',
    //   host : '212.83.163.1',
    //   ref  : 'origin/master',
    //   repo : 'git@github.com:repo.git',
    //   path : '/var/www/development',
    //   'post-deploy' : 'bash ./bin/post-deploy.sh',
    //   env  : {
    //     NODE_ENV: 'test'
    //   }
    // }
  }
};

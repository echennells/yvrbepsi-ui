module.exports = {
  apps: [{
    name: 'yvrbepsi-ui',
    script: 'npm',
    args: 'run dev',
    cwd: '/home/ubuntu/bepsi-pi/yvrbepsi-ui',
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    },
    max_restarts: 10,
    min_uptime: '10s',
    watch: false,
    error_file: '/home/ubuntu/.pm2/logs/yvrbepsi-ui-error.log',
    out_file: '/home/ubuntu/.pm2/logs/yvrbepsi-ui-out.log',
    log_file: '/home/ubuntu/.pm2/logs/yvrbepsi-ui-combined.log',
    time: true
  }]
};
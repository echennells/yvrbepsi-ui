module.exports = {
  apps: [{
    name: 'yvrbepsi-ui',
    script: 'npm',
    args: 'start',
    cwd: '/home/pi/yvrbepsi-ui',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
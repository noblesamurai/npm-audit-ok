const { spawn } = require('child_process');

async function run () {
  const audit = spawn('npm', ['audit', '--json']);
  const output = JSON.parse(await require('get-stream')(audit.stdout));
  const critical = output.metadata.vulnerabilities.critical;
  if (critical > 0) process.exit(1);
}

run();

const { execSync } = require('child_process');

try {
  console.log('Running npm install to regenerate package-lock.json...');
  execSync('npm install --package-lock-only', { 
    cwd: '/vercel/share/v0-project',
    stdio: 'inherit' 
  });
  console.log('package-lock.json regenerated successfully!');
} catch (error) {
  console.error('Error regenerating lock file:', error.message);
  process.exit(1);
}

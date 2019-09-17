// var replace = require('replace-in-file');

// var buildVersion = process.argv[2];

// const options = {
//   files: 'src/environments/environment.prod.ts',
//   from: /{BUILD_VERSION}/g,
//   to: buildVersion,
//   allowEmptyPaths: false,
// };

// try {
//   let changedFiles = replace.sync(options);
//   console.log('Build version set: ' + buildVersion);
// } catch (error) {
//   console.error('Error occurred:', error);
// }



const fs = require('fs');
const semver = require('semver');

function readNgVersion() {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  let environmentStr = fs.readFileSync('./src/environments/environment.prod.ts', 'utf8');

  const replace = 'export const environment = ';
  const replaceend = ';';
  environmentStr = environmentStr.replace(replace, '');
  environmentStr = environmentStr.replace(replaceend, '');
  const environment = JSON.parse(environmentStr);
  environment['version'] = packageJson['version'];
  fs.writeFile('./src/environments/environment.prod.ts', replace + JSON.stringify(environment) + replaceend, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!", environment['version']);
  });
  fs.wri

}
readNgVersion()

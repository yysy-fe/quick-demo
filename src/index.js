
import packageJson from '../package.json';
import program from 'commander';
import inquirer from 'inquirer';
import download from 'download-git-repo';

program.version(packageJson.version, '-v, --version', '查看版本号');
program.usage('<command> [options]');

const initTemplate = config => {
  console.log('config', config)
  download('github:https://github.com/yysy-fe/quick-demo-templates.git', 'test/tmp', function (err) {
    console.log(err)
  })
};

const initHandler = async e => {
  const usrInput = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'template',
      choices: [
        'normal',
        'react'
      ]
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Please enter the project name: ',
      validate: value => {
        if (value === '') {
          return '请输入项目名';
        }
        return true;
      }
    },
    {
      name: 'author',
      message: 'Please enter the author name: '
    }
  ]);
  initTemplate(usrInput);
};
program.command('').description('初始化项目').action(initHandler);
program.command('init').description('初始化项目').action(initHandler);

program.parse(process.argv);

if (program.args.length === 0) {
  initHandler();
}

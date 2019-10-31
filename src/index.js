
import packageJson from '../package.json';
import program from 'commander';
import inquirer from 'inquirer';

program.version(packageJson.version, '-v, --version', '查看版本号');
program.usage('<command> [options]');

const initTemplate = config => {
  console.log('config', config)
};

program.command('init').description('初始化项目').action(async e  =>   {
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
});

program.parse(process.argv);



// console.log(packageJson .version)
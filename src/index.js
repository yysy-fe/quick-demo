
import packageJson from '../package.json';
import program from 'commander';
import inquirer from 'inquirer';
import download from 'download-git-repo';
import fs from 'fs';
import path from 'path';
import util from 'util';

program.version(packageJson.version, '-v, --version', '查看版本号');
program.usage('<command> [options]');

const templateDir = __dirname + '/qd-temps';
let targetDir = path.join('./');

const initTemplate = () => {
  return new Promise(resolve => {
    download('yysy-fe/quick-demo-templates#master', templateDir, function (err) {
      resolve(err);
    });
  });
};

const errlog = msg => {
  console.error(msg);
  return false;
}

const updateTemp = async (config) => {
  return new Promise(res => {
    fs.readFile(path.join(targetDir, 'package.json'), {}, (err, data) => {
      if (err) res(errlog(err)); 
      let json = JSON.parse(data);
      json.name = 'test4';
      json.author = 'yy';
      json = JSON.stringify(json, null, 2);
      fs.writeFile('package.json', json, 'utf8', (err, data) => {
        if (err) {
          res(errlog(err))
        } else {
          res(true);
        }
      });
    });
  });
}

const getTemplate = async (config) => {
  const { template, projectName } = config;
  const downTempErr = await initTemplate();
  if (downTempErr) {
    return errlog("获取模板失败");
  }
  const sourceDir = path.join(templateDir, template);
  targetDir = path.join('./', projectName)
  fs.renameSync(sourceDir, targetDir);
  fs.renameSync(templateDir, path.resolve(templateDir, '../temp-del'));


  return true;
}

const getUserInput = () => {
  return inquirer.prompt([
    {
      type: 'rawlist',
      name: 'template',
      choices: [
        'react',
        'normal',
      ]
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Please enter the project name: ',
      validate: value => {
        const targetDir = path.join('./', value)
        if (value === '') {
          return '请输入项目名';
        } else if (fs.existsSync(targetDir)) {
          return `当前目录已存在【${value}】文件夹`;
        }
        return true;
      }
    },
    {
      name: 'author',
      message: 'Please enter the author name: '
    }
  ]);
}

const initHandler = async e => {
  const userInput = await getUserInput();

  await getTemplate(userInput);
  updateTemp(userInput);
  
  

  

};
program.command('').description('初始化项目').action(initHandler);
program.command('init').description('初始化项目').action(initHandler);

program.parse(process.argv);

if (program.args.length === 0) {
  initHandler();
}

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _package = _interopRequireDefault(require("../package.json"));

var _commander = _interopRequireDefault(require("commander"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

_commander["default"].version(_package["default"].version, '-v, --version', '查看版本号');

_commander["default"].usage('<command> [options]');

var initTemplate = function initTemplate(config) {
  console.log('config', config);
  (0, _downloadGitRepo["default"])('github:https://github.com/yysy-fe/quick-demo-templates.git', 'test/tmp', function (err) {
    console.log(err);
  });
};

var initHandler =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(e) {
    var usrInput;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _inquirer["default"].prompt([{
              type: 'rawlist',
              name: 'template',
              choices: ['normal', 'react']
            }, {
              type: 'input',
              name: 'projectName',
              message: 'Please enter the project name: ',
              validate: function validate(value) {
                if (value === '') {
                  return '请输入项目名';
                }

                return true;
              }
            }, {
              name: 'author',
              message: 'Please enter the author name: '
            }]);

          case 2:
            usrInput = _context.sent;
            initTemplate(usrInput);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initHandler(_x) {
    return _ref.apply(this, arguments);
  };
}();

_commander["default"].command('').description('初始化项目').action(initHandler);

_commander["default"].command('init').description('初始化项目').action(initHandler);

_commander["default"].parse(process.argv);

if (_commander["default"].args.length === 0) {
  initHandler();
}

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _package = _interopRequireDefault(require("../package.json"));

var _commander = _interopRequireDefault(require("commander"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

_commander["default"].version(_package["default"].version, '-v, --version', '查看版本号');

_commander["default"].usage('<command> [options]');

var templateDir = __dirname + '/qd-temps';

var initTemplate = function initTemplate() {
  return new Promise(function (resolve) {
    (0, _downloadGitRepo["default"])('yysy-fe/quick-demo-templates#master', templateDir, function (err) {
      resolve(err);
    });
  });
};

var errlog = function errlog(msg) {
  console.error(msg);
  return false;
};

var getTemplate =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(config) {
    var template, projectName, downTempErr, sourceDir, targetDir;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            template = config.template, projectName = config.projectName;
            _context.next = 3;
            return initTemplate();

          case 3:
            downTempErr = _context.sent;

            if (!downTempErr) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", error("获取模板失败"));

          case 6:
            sourceDir = _path["default"].join(templateDir, template);
            targetDir = _path["default"].join('./', projectName);

            if (!_fs["default"].existsSync(targetDir)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", error("\u5F53\u524D\u76EE\u5F55\u5DF2\u5B58\u5728\u3010".concat(projectName, "\u3011\u6587\u4EF6\u5939")));

          case 10:
            _fs["default"].renameSync(sourceDir, targetDir);

            return _context.abrupt("return", true);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTemplate(_x) {
    return _ref.apply(this, arguments);
  };
}();

var initHandler =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(e) {
    var usrInput;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
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
            usrInput = _context2.sent;
            _context2.next = 5;
            return getTemplate(usrInput);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function initHandler(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

_commander["default"].command('').description('初始化项目').action(initHandler);

_commander["default"].command('init').description('初始化项目').action(initHandler);

_commander["default"].parse(process.argv);

if (_commander["default"].args.length === 0) {
  initHandler();
}

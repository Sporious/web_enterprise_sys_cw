module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/dashboard/see_ab_tests.tsx":
/*!******************************************!*\
  !*** ./pages/dashboard/see_ab_tests.tsx ***!
  \******************************************/
/*! exports provided: RenderTestRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RenderTestRow\", function() { return RenderTestRow; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nvar _jsxFileName = \"/home/iksf/web-enterprise/client/pages/dashboard/see_ab_tests.tsx\";\nconst demoElement = {\n  id: 123,\n  name: \"The Demo element\",\n  total_votes: 5,\n  option_a: {\n    name: \"Option a name\",\n    votes: 2,\n    result: \"Demo result A \"\n  },\n  option_b: {\n    name: \"Option b name\",\n    votes: 3,\n    result: \"Demo result B \"\n  }\n};\n\nconst ABRow = (props, args) => {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h3\", {\n      children: props.ab_element.name\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 38,\n      columnNumber: 13\n    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h4\", {\n      children: [\"Validity : \", isABElementValid(props.ab_element).toString()]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 39,\n      columnNumber: 13\n    }, undefined)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 37,\n    columnNumber: 9\n  }, undefined);\n};\n\nconst RenderTestRow = (props, state) => {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(ABRow, {\n    ab_element: demoElement\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 50,\n    columnNumber: 9\n  }, undefined);\n};\n\nconst isABElementValid = ab_element => {\n  return ab_element.total_votes - ab_element.option_a.votes - ab_element.option_b.votes === 0;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9kYXNoYm9hcmQvc2VlX2FiX3Rlc3RzLnRzeD9hZGVjIl0sIm5hbWVzIjpbImRlbW9FbGVtZW50IiwiaWQiLCJuYW1lIiwidG90YWxfdm90ZXMiLCJvcHRpb25fYSIsInZvdGVzIiwicmVzdWx0Iiwib3B0aW9uX2IiLCJBQlJvdyIsInByb3BzIiwiYXJncyIsImFiX2VsZW1lbnQiLCJpc0FCRWxlbWVudFZhbGlkIiwidG9TdHJpbmciLCJSZW5kZXJUZXN0Um93Iiwic3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQWtCQSxNQUFNQSxXQUE4QixHQUFHO0FBQ25DQyxJQUFFLEVBQUUsR0FEK0I7QUFFbkNDLE1BQUksRUFBRSxrQkFGNkI7QUFHbkNDLGFBQVcsRUFBRSxDQUhzQjtBQUluQ0MsVUFBUSxFQUFFO0FBQ05GLFFBQUksRUFBRSxlQURBO0FBRU5HLFNBQUssRUFBRSxDQUZEO0FBR05DLFVBQU0sRUFBRTtBQUhGLEdBSnlCO0FBU25DQyxVQUFRLEVBQUU7QUFDTkwsUUFBSSxFQUFFLGVBREE7QUFFTkcsU0FBSyxFQUFFLENBRkQ7QUFHTkMsVUFBTSxFQUFFO0FBSEY7QUFUeUIsQ0FBdkM7O0FBZUEsTUFBTUUsS0FBSyxHQUFHLENBQUNDLEtBQUQsRUFBMkNDLElBQTNDLEtBQW9EO0FBRTlELHNCQUNJO0FBQUEsNEJBQ0k7QUFBQSxnQkFBS0QsS0FBSyxDQUFDRSxVQUFOLENBQWlCVDtBQUF0QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURKLGVBRUk7QUFBQSxnQ0FDSVUsZ0JBQWdCLENBQUNILEtBQUssQ0FBQ0UsVUFBUCxDQUFoQixDQUFtQ0UsUUFBbkMsRUFESjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRko7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREo7QUFVSCxDQVpEOztBQWNPLE1BQU1DLGFBQWEsR0FBRyxDQUFDTCxLQUFELEVBQVFNLEtBQVIsS0FBZ0M7QUFDekQsc0JBQ0kscUVBQUMsS0FBRDtBQUFPLGNBQVUsRUFBRWY7QUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURKO0FBR0gsQ0FKTTs7QUFPUCxNQUFNWSxnQkFBZ0IsR0FBSUQsVUFBRCxJQUF5QztBQUU5RCxTQUFPQSxVQUFVLENBQUNSLFdBQVgsR0FBeUJRLFVBQVUsQ0FBQ1AsUUFBWCxDQUFvQkMsS0FBN0MsR0FBcURNLFVBQVUsQ0FBQ0osUUFBWCxDQUFvQkYsS0FBekUsS0FBbUYsQ0FBMUY7QUFDSCxDQUhEIiwiZmlsZSI6Ii4vcGFnZXMvZGFzaGJvYXJkL3NlZV9hYl90ZXN0cy50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge0hUTUx9IGZyb20gXCJtZGFzdFwiO1xuXG50eXBlIEFCRWxlbWVudDxUPiA9IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBvcHRpb25fYTogQUJPcHRpb248VD4sXG4gICAgb3B0aW9uX2I6IEFCT3B0aW9uPFQ+LFxuICAgIHRvdGFsX3ZvdGVzOiBudW1iZXJcbn1cblxudHlwZSBBQk9wdGlvbjxUPiA9IHtcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcmVzdWx0OiBULFxuICAgIHZvdGVzOiBudW1iZXJcbn1cblxuXG5jb25zdCBkZW1vRWxlbWVudDogQUJFbGVtZW50PHN0cmluZz4gPSB7XG4gICAgaWQ6IDEyMyxcbiAgICBuYW1lOiBcIlRoZSBEZW1vIGVsZW1lbnRcIixcbiAgICB0b3RhbF92b3RlczogNSxcbiAgICBvcHRpb25fYToge1xuICAgICAgICBuYW1lOiBcIk9wdGlvbiBhIG5hbWVcIixcbiAgICAgICAgdm90ZXM6IDIsXG4gICAgICAgIHJlc3VsdDogXCJEZW1vIHJlc3VsdCBBIFwiXG4gICAgfSxcbiAgICBvcHRpb25fYjoge1xuICAgICAgICBuYW1lOiBcIk9wdGlvbiBiIG5hbWVcIixcbiAgICAgICAgdm90ZXM6IDMsXG4gICAgICAgIHJlc3VsdDogXCJEZW1vIHJlc3VsdCBCIFwiXG4gICAgfVxufVxuY29uc3QgQUJSb3cgPSAocHJvcHM6IHsgYWJfZWxlbWVudDogQUJFbGVtZW50PHN0cmluZz4gfSwgYXJncykgPT4ge1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMz57cHJvcHMuYWJfZWxlbWVudC5uYW1lfTwvaDM+XG4gICAgICAgICAgICA8aDQ+VmFsaWRpdHkgOiB7XG4gICAgICAgICAgICAgICAgaXNBQkVsZW1lbnRWYWxpZChwcm9wcy5hYl9lbGVtZW50KS50b1N0cmluZygpXG4gICAgICAgICAgICB9PC9oND5cbiAgICAgICAgPC9kaXY+XG4gICAgKVxuXG5cbn1cblxuZXhwb3J0IGNvbnN0IFJlbmRlclRlc3RSb3cgPSAocHJvcHMsIHN0YXRlKSA6IEpTWC5FbGVtZW50ID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8QUJSb3cgYWJfZWxlbWVudD17ZGVtb0VsZW1lbnR9Lz5cbiAgICApO1xufVxuXG5cbmNvbnN0IGlzQUJFbGVtZW50VmFsaWQgPSAoYWJfZWxlbWVudDogQUJFbGVtZW50PGFueT4pOiBib29sZWFuID0+IHtcblxuICAgIHJldHVybiBhYl9lbGVtZW50LnRvdGFsX3ZvdGVzIC0gYWJfZWxlbWVudC5vcHRpb25fYS52b3RlcyAtIGFiX2VsZW1lbnQub3B0aW9uX2Iudm90ZXMgPT09IDA7XG59XG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/dashboard/see_ab_tests.tsx\n");

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Home; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _pages_dashboard_see_ab_tests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/dashboard/see_ab_tests */ \"./pages/dashboard/see_ab_tests.tsx\");\n\nvar _jsxFileName = \"/home/iksf/web-enterprise/client/pages/index.tsx\";\n\nfunction Home({}) {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_pages_dashboard_see_ab_tests__WEBPACK_IMPORTED_MODULE_1__[\"RenderTestRow\"], {}, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 6,\n    columnNumber: 7\n  }, this);\n}\n\nconst getStaticProps = async props => {\n  const allPostsData = \"\";\n  return {\n    props: {}\n  };\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC50c3g/ZGI3NiJdLCJuYW1lcyI6WyJIb21lIiwiZ2V0U3RhdGljUHJvcHMiLCJwcm9wcyIsImFsbFBvc3RzRGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBO0FBQ2UsU0FBU0EsSUFBVCxDQUFjLEVBQWQsRUFBbUI7QUFDaEMsc0JBQ0kscUVBQUMsMkVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURKO0FBR0Q7O0FBS0QsTUFBTUMsY0FBK0IsR0FBRyxNQUFPQyxLQUFQLElBQWlCO0FBQ3ZELFFBQU1DLFlBQVksR0FBRyxFQUFyQjtBQUNBLFNBQU87QUFDTEQsU0FBSyxFQUFFO0FBREYsR0FBUDtBQUlELENBTkQiLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0dldFN0YXRpY1Byb3BzfSBmcm9tIFwibmV4dFwiO1xuXG5pbXBvcnQge1JlbmRlclRlc3RSb3d9IGZyb20gXCIuLi9wYWdlcy9kYXNoYm9hcmQvc2VlX2FiX3Rlc3RzXCJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoeyB9KSB7XG4gIHJldHVybiAoXG4gICAgICA8UmVuZGVyVGVzdFJvdyAvPlxuICApXG59XG5cblxuXG5cbmNvbnN0IGdldFN0YXRpY1Byb3BzIDogR2V0U3RhdGljUHJvcHMgPSBhc3luYyAocHJvcHMpID0+IHtcbiAgY29uc3QgYWxsUG9zdHNEYXRhID0gXCJcIlxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7XG4gICAgfVxuICB9XG59XG5cblxuXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });
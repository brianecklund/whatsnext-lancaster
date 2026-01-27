"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/imgix-url-builder";
exports.ids = ["vendor-chunks/imgix-url-builder"];
exports.modules = {

/***/ "(rsc)/./node_modules/imgix-url-builder/dist/buildPixelDensitySrcSet.js":
/*!************************************************************************!*\
  !*** ./node_modules/imgix-url-builder/dist/buildPixelDensitySrcSet.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildPixelDensitySrcSet: () => (/* binding */ buildPixelDensitySrcSet)\n/* harmony export */ });\n/* harmony import */ var _buildURL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildURL.js */ \"(rsc)/./node_modules/imgix-url-builder/dist/buildURL.js\");\n\nconst buildPixelDensitySrcSet = (url, { pixelDensities, ...params }) => {\n  return pixelDensities.map((dpr) => {\n    return `${(0,_buildURL_js__WEBPACK_IMPORTED_MODULE_0__.buildURL)(url, { ...params, dpr })} ${dpr}x`;\n  }).join(\", \");\n};\n\n//# sourceMappingURL=buildPixelDensitySrcSet.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaW1naXgtdXJsLWJ1aWxkZXIvZGlzdC9idWlsZFBpeGVsRGVuc2l0eVNyY1NldC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUF5QztBQUN6Qyx3Q0FBd0MsMkJBQTJCO0FBQ25FO0FBQ0EsY0FBYyxzREFBUSxRQUFRLGdCQUFnQixHQUFHLEVBQUUsSUFBSTtBQUN2RCxHQUFHO0FBQ0g7QUFHRTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2hhdHNuZXh0LWxhbmNhc3Rlci8uL25vZGVfbW9kdWxlcy9pbWdpeC11cmwtYnVpbGRlci9kaXN0L2J1aWxkUGl4ZWxEZW5zaXR5U3JjU2V0LmpzP2E3NDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYnVpbGRVUkwgfSBmcm9tIFwiLi9idWlsZFVSTC5qc1wiO1xuY29uc3QgYnVpbGRQaXhlbERlbnNpdHlTcmNTZXQgPSAodXJsLCB7IHBpeGVsRGVuc2l0aWVzLCAuLi5wYXJhbXMgfSkgPT4ge1xuICByZXR1cm4gcGl4ZWxEZW5zaXRpZXMubWFwKChkcHIpID0+IHtcbiAgICByZXR1cm4gYCR7YnVpbGRVUkwodXJsLCB7IC4uLnBhcmFtcywgZHByIH0pfSAke2Rwcn14YDtcbiAgfSkuam9pbihcIiwgXCIpO1xufTtcbmV4cG9ydCB7XG4gIGJ1aWxkUGl4ZWxEZW5zaXR5U3JjU2V0XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVpbGRQaXhlbERlbnNpdHlTcmNTZXQuanMubWFwXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/imgix-url-builder/dist/buildPixelDensitySrcSet.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/imgix-url-builder/dist/buildURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/imgix-url-builder/dist/buildURL.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildURL: () => (/* binding */ buildURL)\n/* harmony export */ });\nconst camelCaseToParamCase = (input) => {\n  return input.replace(/[A-Z]/g, (match) => {\n    return `-${match.toLowerCase()}`;\n  });\n};\nconst buildURL = (url, params) => {\n  const instance = new URL(url);\n  for (const camelCasedParamKey in params) {\n    const paramKey = camelCaseToParamCase(camelCasedParamKey);\n    const paramValue = params[camelCasedParamKey];\n    if (paramValue === void 0) {\n      instance.searchParams.delete(paramKey);\n    } else if (Array.isArray(paramValue)) {\n      instance.searchParams.set(paramKey, paramValue.join(\",\"));\n    } else {\n      instance.searchParams.set(paramKey, `${paramValue}`);\n    }\n  }\n  const s = instance.searchParams.get(\"s\");\n  if (s) {\n    instance.searchParams.delete(\"s\");\n    instance.searchParams.append(\"s\", s);\n  }\n  return instance.toString();\n};\n\n//# sourceMappingURL=buildURL.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaW1naXgtdXJsLWJ1aWxkZXIvZGlzdC9idWlsZFVSTC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBLGVBQWUsb0JBQW9CO0FBQ25DLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOLDZDQUE2QyxXQUFXO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aGF0c25leHQtbGFuY2FzdGVyLy4vbm9kZV9tb2R1bGVzL2ltZ2l4LXVybC1idWlsZGVyL2Rpc3QvYnVpbGRVUkwuanM/YjEzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjYW1lbENhc2VUb1BhcmFtQ2FzZSA9IChpbnB1dCkgPT4ge1xuICByZXR1cm4gaW5wdXQucmVwbGFjZSgvW0EtWl0vZywgKG1hdGNoKSA9PiB7XG4gICAgcmV0dXJuIGAtJHttYXRjaC50b0xvd2VyQ2FzZSgpfWA7XG4gIH0pO1xufTtcbmNvbnN0IGJ1aWxkVVJMID0gKHVybCwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGluc3RhbmNlID0gbmV3IFVSTCh1cmwpO1xuICBmb3IgKGNvbnN0IGNhbWVsQ2FzZWRQYXJhbUtleSBpbiBwYXJhbXMpIHtcbiAgICBjb25zdCBwYXJhbUtleSA9IGNhbWVsQ2FzZVRvUGFyYW1DYXNlKGNhbWVsQ2FzZWRQYXJhbUtleSk7XG4gICAgY29uc3QgcGFyYW1WYWx1ZSA9IHBhcmFtc1tjYW1lbENhc2VkUGFyYW1LZXldO1xuICAgIGlmIChwYXJhbVZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgIGluc3RhbmNlLnNlYXJjaFBhcmFtcy5kZWxldGUocGFyYW1LZXkpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwYXJhbVZhbHVlKSkge1xuICAgICAgaW5zdGFuY2Uuc2VhcmNoUGFyYW1zLnNldChwYXJhbUtleSwgcGFyYW1WYWx1ZS5qb2luKFwiLFwiKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RhbmNlLnNlYXJjaFBhcmFtcy5zZXQocGFyYW1LZXksIGAke3BhcmFtVmFsdWV9YCk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHMgPSBpbnN0YW5jZS5zZWFyY2hQYXJhbXMuZ2V0KFwic1wiKTtcbiAgaWYgKHMpIHtcbiAgICBpbnN0YW5jZS5zZWFyY2hQYXJhbXMuZGVsZXRlKFwic1wiKTtcbiAgICBpbnN0YW5jZS5zZWFyY2hQYXJhbXMuYXBwZW5kKFwic1wiLCBzKTtcbiAgfVxuICByZXR1cm4gaW5zdGFuY2UudG9TdHJpbmcoKTtcbn07XG5leHBvcnQge1xuICBidWlsZFVSTFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJ1aWxkVVJMLmpzLm1hcFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/imgix-url-builder/dist/buildURL.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/imgix-url-builder/dist/buildWidthSrcSet.js":
/*!*****************************************************************!*\
  !*** ./node_modules/imgix-url-builder/dist/buildWidthSrcSet.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildWidthSrcSet: () => (/* binding */ buildWidthSrcSet)\n/* harmony export */ });\n/* harmony import */ var _buildURL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildURL.js */ \"(rsc)/./node_modules/imgix-url-builder/dist/buildURL.js\");\n\nconst buildWidthSrcSet = (url, { widths, ...params }) => {\n  return widths.map((width) => {\n    return `${(0,_buildURL_js__WEBPACK_IMPORTED_MODULE_0__.buildURL)(url, { ...params, w: void 0, h: void 0, height: void 0, width })} ${width}w`;\n  }).join(\", \");\n};\n\n//# sourceMappingURL=buildWidthSrcSet.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaW1naXgtdXJsLWJ1aWxkZXIvZGlzdC9idWlsZFdpZHRoU3JjU2V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXlDO0FBQ3pDLGlDQUFpQyxtQkFBbUI7QUFDcEQ7QUFDQSxjQUFjLHNEQUFRLFFBQVEsd0RBQXdELEdBQUcsRUFBRSxNQUFNO0FBQ2pHLEdBQUc7QUFDSDtBQUdFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93aGF0c25leHQtbGFuY2FzdGVyLy4vbm9kZV9tb2R1bGVzL2ltZ2l4LXVybC1idWlsZGVyL2Rpc3QvYnVpbGRXaWR0aFNyY1NldC5qcz9kYWNmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJ1aWxkVVJMIH0gZnJvbSBcIi4vYnVpbGRVUkwuanNcIjtcbmNvbnN0IGJ1aWxkV2lkdGhTcmNTZXQgPSAodXJsLCB7IHdpZHRocywgLi4ucGFyYW1zIH0pID0+IHtcbiAgcmV0dXJuIHdpZHRocy5tYXAoKHdpZHRoKSA9PiB7XG4gICAgcmV0dXJuIGAke2J1aWxkVVJMKHVybCwgeyAuLi5wYXJhbXMsIHc6IHZvaWQgMCwgaDogdm9pZCAwLCBoZWlnaHQ6IHZvaWQgMCwgd2lkdGggfSl9ICR7d2lkdGh9d2A7XG4gIH0pLmpvaW4oXCIsIFwiKTtcbn07XG5leHBvcnQge1xuICBidWlsZFdpZHRoU3JjU2V0XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVpbGRXaWR0aFNyY1NldC5qcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/imgix-url-builder/dist/buildWidthSrcSet.js\n");

/***/ })

};
;
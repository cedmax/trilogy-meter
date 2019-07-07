export function debounce(fn, delay) {
  var timer = null;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

export function camelCasify(prefix, method) {
  return prefix
    ? prefix + method.charAt(0).toUpperCase() + method.slice(1)
    : method;
}

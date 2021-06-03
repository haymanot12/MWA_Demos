function fib(num) {

  if (num < 2)
    return num;

  return fib(num - 1) + fib(num - 2);

}

function promises(num) {
  return new Promise(function (resolve, reject) {
    if (fib(num) > 2)
      resolve(fib(num))
    else resolve(fib(num - 1) + fib(num - 2));

  });
}

console.log('start');
promises(44)
  .then(n => {
    console.log(n);
  });
console.log('end...');



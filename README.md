# Calculator HTTP service

## Installation

```
git clone https://github.com/alexeimoisseev/tocaboca-assignment
cd tocaboca-assignment
npm i
```

## Running

```
npm start
```

## Testing

```
$ curl localhost:3000/1+2
3
```

## Details of implementation

To make calculations I used existing library [@hkh12/node-calc](https://www.npmjs.com/package/@hkh12/node-calc). It provides:
* Parsing input string
* Evaluating expression
* Supporting operations `+, -, *, /` and ^ operators, parenthesis, functions `sin, cos, tan, cot, sqrt, cbrt, abs, log, ln`, factorial `x!` or `fact(x)`.
* Not using `eval`, but tokenizing string properly.

I fixed version of it in `package.json` to prevent hacker attack.

The rest is done by just utilizing functions of `nestjs`.

## Things to consider

* Using expressions in path can cause uncertain behaviour, especially when you use `+` sign. It can be treated as space. Should be considered in client libraries.
* URI encoding seem to working fine with strings like `1%2B2`, but it is also a reason to worry because you mainly rely on `nest` magic there. So another point of using query strings instead of path.
* Extending functionality of calculations can be tricky, because here we rely on that `@hkh12/node-calc` module. But so far I think it is good enough to save time and not to invent a bicycle.
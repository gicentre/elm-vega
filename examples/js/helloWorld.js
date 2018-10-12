(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.L.A === region.Q.A)
	{
		return 'on line ' + region.L.A;
	}
	return 'on lines ' + region.L.A + ' through ' + region.Q.A;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.at,
		impl.aB,
		impl.az,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}
var elm$core$Basics$identity = function (x) {
	return x;
};
var author$project$HelloWorld$elmToJS = _Platform_outgoingPort('elmToJS', elm$core$Basics$identity);
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$LT = 0;
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = 2;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.a) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.c),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.c);
		} else {
			var treeLen = builder.a * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.d) : builder.d;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.a);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.c) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.c);
		}
	});
var elm$core$Basics$False = 1;
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{d: nodeList, a: (len / elm$core$Array$branchFactor) | 0, c: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Vega$foDataTypeSpec = function (dType) {
	switch (dType.$) {
		case 0:
			return elm$json$Json$Encode$string('number');
		case 1:
			return elm$json$Json$Encode$string('boolean');
		case 2:
			var dateFmt = dType.a;
			return (dateFmt === '') ? elm$json$Json$Encode$string('date') : elm$json$Json$Encode$string('date:\'' + (dateFmt + '\''));
		default:
			var dateFmt = dType.a;
			return (dateFmt === '') ? elm$json$Json$Encode$string('utc') : elm$json$Json$Encode$string('utc:\'' + (dateFmt + '\''));
	}
};
var author$project$Vega$signalReferenceProperty = function (sigRef) {
	return _Utils_Tuple2(
		'signal',
		elm$json$Json$Encode$string(sigRef));
};
var author$project$Vega$expressionSpec = elm$json$Json$Encode$string;
var author$project$Vega$exprProperty = function (ex) {
	if (!ex.$) {
		var f = ex.a;
		return _Utils_Tuple2(
			'field',
			elm$json$Json$Encode$string(f));
	} else {
		var e = ex.a;
		return _Utils_Tuple2(
			'expr',
			author$project$Vega$expressionSpec(e));
	}
};
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var elm$json$Json$Encode$null = _Json_encodeNull;
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var author$project$Vega$strSpec = function (string) {
	switch (string.$) {
		case 0:
			var s = string.a;
			return elm$json$Json$Encode$string(s);
		case 1:
			var ss = string.a;
			return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, ss);
		case 4:
			var ss = string.a;
			return A2(elm$json$Json$Encode$list, author$project$Vega$strSpec, ss);
		case 2:
			var sig = string.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
		case 3:
			var sigs = string.a;
			return A2(
				elm$json$Json$Encode$list,
				function (sig) {
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								author$project$Vega$signalReferenceProperty(sig)
							]));
				},
				sigs);
		case 5:
			var ex = string.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$exprProperty(ex)
					]));
		default:
			return elm$json$Json$Encode$null;
	}
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var author$project$Vega$formatProperty = function (fmt) {
	switch (fmt.$) {
		case 0:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('json'))
				]);
		case 1:
			var s = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('json')),
					_Utils_Tuple2(
					'property',
					author$project$Vega$strSpec(s))
				]);
		case 2:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('csv'))
				]);
		case 3:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('tsv'))
				]);
		case 4:
			var s = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('dsv')),
					_Utils_Tuple2(
					'delimiter',
					author$project$Vega$strSpec(s))
				]);
		case 5:
			var s = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('topojson')),
					_Utils_Tuple2(
					'feature',
					author$project$Vega$strSpec(s))
				]);
		case 6:
			var s = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('topojson')),
					_Utils_Tuple2(
					'mesh',
					author$project$Vega$strSpec(s))
				]);
		case 7:
			var fmts = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'parse',
					elm$json$Json$Encode$object(
						A2(
							elm$core$List$map,
							function (_n1) {
								var f = _n1.a;
								var fm = _n1.b;
								return _Utils_Tuple2(
									f,
									author$project$Vega$foDataTypeSpec(fm));
							},
							fmts)))
				]);
		case 8:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'parse',
					elm$json$Json$Encode$string('auto'))
				]);
		default:
			var sigName = fmt.a;
			return _List_fromArray(
				[
					author$project$Vega$signalReferenceProperty(sigName)
				]);
	}
};
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var author$project$Vega$dataFromRows = F3(
	function (name, fmts, rows) {
		var fmt = _Utils_eq(fmts, _List_Nil) ? _List_Nil : _List_fromArray(
			[
				_Utils_Tuple2(
				'format',
				elm$json$Json$Encode$object(
					A2(elm$core$List$concatMap, author$project$Vega$formatProperty, fmts)))
			]);
		return _Utils_ap(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'name',
					elm$json$Json$Encode$string(name)),
					_Utils_Tuple2(
					'values',
					A2(elm$json$Json$Encode$list, elm$core$Basics$identity, rows))
				]),
			fmt);
	});
var elm$json$Json$Encode$bool = _Json_wrap;
var author$project$Vega$booSpec = function (boo) {
	switch (boo.$) {
		case 0:
			var b = boo.a;
			return elm$json$Json$Encode$bool(b);
		case 1:
			var bs = boo.a;
			return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$bool, bs);
		case 2:
			var sig = boo.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
		case 3:
			var sigs = boo.a;
			return A2(
				elm$json$Json$Encode$list,
				function (sig) {
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								author$project$Vega$signalReferenceProperty(sig)
							]));
				},
				sigs);
		default:
			var ex = boo.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$exprProperty(ex)
					]));
	}
};
var author$project$Vega$Expr = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$expr = author$project$Vega$Expr;
var author$project$Vega$StrExpr = function (a) {
	return {$: 5, a: a};
};
var author$project$Vega$strExpr = author$project$Vega$StrExpr;
var author$project$Vega$fieldSpec = function (fVal) {
	switch (fVal.$) {
		case 0:
			var fName = fVal.a;
			return elm$json$Json$Encode$string(fName);
		case 1:
			var ex = fVal.a;
			return author$project$Vega$strSpec(
				author$project$Vega$strExpr(
					author$project$Vega$expr(ex)));
		case 2:
			var sig = fVal.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
		case 3:
			var fv = fVal.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'datum',
						author$project$Vega$fieldSpec(fv))
					]));
		case 4:
			var fv = fVal.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'group',
						author$project$Vega$fieldSpec(fv))
					]));
		default:
			var fv = fVal.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'parent',
						author$project$Vega$fieldSpec(fv))
					]));
	}
};
var elm$json$Json$Encode$float = _Json_wrap;
var author$project$Vega$numSpec = function (nm) {
	switch (nm.$) {
		case 0:
			var n = nm.a;
			return elm$json$Json$Encode$float(n);
		case 1:
			var ns = nm.a;
			return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, ns);
		case 2:
			var sig = nm.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
		case 3:
			var sigs = nm.a;
			return A2(
				elm$json$Json$Encode$list,
				function (sig) {
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								author$project$Vega$signalReferenceProperty(sig)
							]));
				},
				sigs);
		case 5:
			var ex = nm.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$exprProperty(ex)
					]));
		case 4:
			var ns = nm.a;
			return A2(elm$json$Json$Encode$list, author$project$Vega$numSpec, ns);
		default:
			return elm$json$Json$Encode$null;
	}
};
var author$project$Vega$colorProperty = function (cVal) {
	switch (cVal.$) {
		case 0:
			var r = cVal.a;
			var g = cVal.b;
			var b = cVal.c;
			return _Utils_Tuple2(
				'color',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'r',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, r))),
							_Utils_Tuple2(
							'g',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, g))),
							_Utils_Tuple2(
							'b',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, b)))
						])));
		case 1:
			var h = cVal.a;
			var s = cVal.b;
			var l = cVal.c;
			return _Utils_Tuple2(
				'color',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'h',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, h))),
							_Utils_Tuple2(
							's',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, s))),
							_Utils_Tuple2(
							'l',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, l)))
						])));
		case 2:
			var l = cVal.a;
			var a = cVal.b;
			var b = cVal.c;
			return _Utils_Tuple2(
				'color',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'l',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, l))),
							_Utils_Tuple2(
							'a',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, a))),
							_Utils_Tuple2(
							'b',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, b)))
						])));
		default:
			var h = cVal.a;
			var c = cVal.b;
			var l = cVal.c;
			return _Utils_Tuple2(
				'color',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'h',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, h))),
							_Utils_Tuple2(
							'c',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, c))),
							_Utils_Tuple2(
							'l',
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, l)))
						])));
	}
};
var author$project$Vega$valueProperties = function (val) {
	switch (val.$) {
		case 0:
			var s = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					elm$json$Json$Encode$string(s))
				]);
		case 1:
			var ss = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, ss))
				]);
		case 9:
			var sig = val.a;
			return _List_fromArray(
				[
					author$project$Vega$signalReferenceProperty(sig)
				]);
		case 10:
			var cVal = val.a;
			return _List_fromArray(
				[
					author$project$Vega$colorProperty(cVal)
				]);
		case 11:
			var fVal = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					author$project$Vega$fieldSpec(fVal))
				]);
		case 12:
			var fVal = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'scale',
					author$project$Vega$fieldSpec(fVal))
				]);
		case 7:
			var key = val.a;
			var v = val.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					key,
					author$project$Vega$valueSpec(v))
				]);
		case 13:
			var n = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'band',
					author$project$Vega$numSpec(n))
				]);
		case 14:
			var v = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'exponent',
					author$project$Vega$valueSpec(v))
				]);
		case 15:
			var v = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'mult',
					author$project$Vega$valueSpec(v))
				]);
		case 16:
			var v = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'offset',
					author$project$Vega$valueSpec(v))
				]);
		case 17:
			var b = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'round',
					author$project$Vega$booSpec(b))
				]);
		case 2:
			var n = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					elm$json$Json$Encode$float(n))
				]);
		case 3:
			var ns = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, ns))
				]);
		case 6:
			var vals = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					elm$json$Json$Encode$object(
						A2(elm$core$List$concatMap, author$project$Vega$valueProperties, vals)))
				]);
		case 8:
			var vals = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					A2(elm$json$Json$Encode$list, author$project$Vega$valueSpec, vals))
				]);
		case 4:
			var b = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					elm$json$Json$Encode$bool(b))
				]);
		case 5:
			var bs = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					A2(elm$json$Json$Encode$list, elm$json$Json$Encode$bool, bs))
				]);
		case 18:
			return _List_fromArray(
				[
					_Utils_Tuple2('value', elm$json$Json$Encode$null)
				]);
		default:
			var ex = val.a;
			var ifs = val.b;
			var elses = val.c;
			return A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					'test',
					elm$json$Json$Encode$string(ex)),
				A2(elm$core$List$concatMap, author$project$Vega$valueProperties, ifs));
	}
};
var author$project$Vega$valueSpec = function (val) {
	switch (val.$) {
		case 0:
			var s = val.a;
			return elm$json$Json$Encode$string(s);
		case 1:
			var ss = val.a;
			return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, ss);
		case 9:
			var sig = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
		case 10:
			var cVal = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$colorProperty(cVal)
					]));
		case 11:
			var fName = val.a;
			return author$project$Vega$fieldSpec(fName);
		case 12:
			var fName = val.a;
			return author$project$Vega$fieldSpec(fName);
		case 13:
			var n = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'band',
						author$project$Vega$numSpec(n))
					]));
		case 14:
			var v = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'exponent',
						author$project$Vega$valueSpec(v))
					]));
		case 15:
			var v = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'mult',
						author$project$Vega$valueSpec(v))
					]));
		case 16:
			var v = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'offset',
						author$project$Vega$valueSpec(v))
					]));
		case 17:
			var b = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'round',
						author$project$Vega$booSpec(b))
					]));
		case 2:
			var n = val.a;
			return elm$json$Json$Encode$float(n);
		case 3:
			var ns = val.a;
			return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, ns);
		case 7:
			var key = val.a;
			var v = val.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						key,
						author$project$Vega$valueSpec(v))
					]));
		case 6:
			var objs = val.a;
			return elm$json$Json$Encode$object(
				A2(elm$core$List$concatMap, author$project$Vega$valueProperties, objs));
		case 8:
			var objs = val.a;
			return A2(elm$json$Json$Encode$list, author$project$Vega$valueSpec, objs);
		case 4:
			var b = val.a;
			return elm$json$Json$Encode$bool(b);
		case 5:
			var bs = val.a;
			return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$bool, bs);
		case 18:
			return elm$json$Json$Encode$null;
		default:
			return elm$json$Json$Encode$null;
	}
};
var author$project$Vega$dataRow = function (row) {
	return elm$core$List$cons(
		elm$json$Json$Encode$object(
			A2(
				elm$core$List$map,
				function (_n0) {
					var colName = _n0.a;
					var val = _n0.b;
					return _Utils_Tuple2(
						colName,
						author$project$Vega$valueSpec(val));
				},
				row)));
};
var author$project$Vega$VData = 8;
var author$project$Vega$dataSource = function (dataTables) {
	return _Utils_Tuple2(
		8,
		A2(elm$json$Json$Encode$list, elm$json$Json$Encode$object, dataTables));
};
var author$project$Vega$Enter = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$enEnter = author$project$Vega$Enter;
var author$project$Vega$FName = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$field = author$project$Vega$FName;
var author$project$Vega$MEncode = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$mEncode = author$project$Vega$MEncode;
var author$project$Vega$MFrom = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$mFrom = author$project$Vega$MFrom;
var author$project$Vega$MText = function (a) {
	return {$: 53, a: a};
};
var author$project$Vega$maText = author$project$Vega$MText;
var author$project$Vega$MType = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$clipSpec = function (clip) {
	switch (clip.$) {
		case 0:
			var b = clip.a;
			return author$project$Vega$booSpec(b);
		case 1:
			var p = clip.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'path',
						author$project$Vega$strSpec(p))
					]));
		default:
			var s = clip.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'sphere',
						author$project$Vega$strSpec(s))
					]));
	}
};
var author$project$Vega$orderSpec = function (order) {
	switch (order.$) {
		case 0:
			return elm$json$Json$Encode$string('ascending');
		case 1:
			return elm$json$Json$Encode$string('descending');
		default:
			var sig = order.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var elm$core$List$unzip = function (pairs) {
	var step = F2(
		function (_n0, _n1) {
			var x = _n0.a;
			var y = _n0.b;
			var xs = _n1.a;
			var ys = _n1.b;
			return _Utils_Tuple2(
				A2(elm$core$List$cons, x, xs),
				A2(elm$core$List$cons, y, ys));
		});
	return A3(
		elm$core$List$foldr,
		step,
		_Utils_Tuple2(_List_Nil, _List_Nil),
		pairs);
};
var author$project$Vega$comparatorProperties = function (comp) {
	var _n0 = elm$core$List$unzip(comp);
	var fs = _n0.a;
	var os = _n0.b;
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'field',
			A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs)),
			_Utils_Tuple2(
			'order',
			A2(elm$json$Json$Encode$list, author$project$Vega$orderSpec, os))
		]);
};
var author$project$Vega$valIfElse = F4(
	function (ex, ifVals, elseVals, ifSpecs) {
		valIfElse:
		while (true) {
			if ((elseVals.b && (elseVals.a.$ === 19)) && (!elseVals.b.b)) {
				var _n3 = elseVals.a;
				var ex2 = _n3.a;
				var ifVals2 = _n3.b;
				var elseVals2 = _n3.c;
				var $temp$ex = ex2,
					$temp$ifVals = ifVals2,
					$temp$elseVals = elseVals2,
					$temp$ifSpecs = _Utils_ap(
					ifSpecs,
					_List_fromArray(
						[
							elm$json$Json$Encode$object(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									'test',
									elm$json$Json$Encode$string(ex2)),
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, ifVals2)))
						]));
				ex = $temp$ex;
				ifVals = $temp$ifVals;
				elseVals = $temp$elseVals;
				ifSpecs = $temp$ifSpecs;
				continue valIfElse;
			} else {
				return _Utils_ap(
					ifSpecs,
					_List_fromArray(
						[
							author$project$Vega$valRef(elseVals)
						]));
			}
		}
	});
var author$project$Vega$valRef = function (vs) {
	if ((vs.b && (vs.a.$ === 19)) && (!vs.b.b)) {
		var _n1 = vs.a;
		var ex = _n1.a;
		var ifs = _n1.b;
		var elses = _n1.c;
		return A2(
			elm$json$Json$Encode$list,
			elm$core$Basics$identity,
			A4(
				author$project$Vega$valIfElse,
				ex,
				ifs,
				elses,
				_List_fromArray(
					[
						elm$json$Json$Encode$object(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								'test',
								elm$json$Json$Encode$string(ex)),
							A2(elm$core$List$concatMap, author$project$Vega$valueProperties, ifs)))
					])));
	} else {
		return elm$json$Json$Encode$object(
			A2(elm$core$List$concatMap, author$project$Vega$valueProperties, vs));
	}
};
var author$project$Vega$markProperty = function (mProp) {
	switch (mProp.$) {
		case 0:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'x',
				author$project$Vega$valRef(vals));
		case 4:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'y',
				author$project$Vega$valRef(vals));
		case 1:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'x2',
				author$project$Vega$valRef(vals));
		case 5:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'y2',
				author$project$Vega$valRef(vals));
		case 2:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'xc',
				author$project$Vega$valRef(vals));
		case 6:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'yc',
				author$project$Vega$valRef(vals));
		case 3:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'width',
				author$project$Vega$valRef(vals));
		case 7:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'height',
				author$project$Vega$valRef(vals));
		case 8:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'opacity',
				author$project$Vega$valRef(vals));
		case 9:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'fill',
				author$project$Vega$valRef(vals));
		case 10:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'fillOpacity',
				author$project$Vega$valRef(vals));
		case 11:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'stroke',
				author$project$Vega$valRef(vals));
		case 12:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'strokeOpacity',
				author$project$Vega$valRef(vals));
		case 13:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'strokeWidth',
				author$project$Vega$valRef(vals));
		case 14:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'strokeCap',
				author$project$Vega$valRef(vals));
		case 15:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'strokeDash',
				author$project$Vega$valRef(vals));
		case 16:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'strokeDashOffset',
				author$project$Vega$valRef(vals));
		case 17:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'strokeJoin',
				author$project$Vega$valRef(vals));
		case 18:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'strokeMiterLimit',
				author$project$Vega$valRef(vals));
		case 19:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'cursor',
				author$project$Vega$valRef(vals));
		case 20:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'href',
				author$project$Vega$valRef(vals));
		case 21:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'tooltip',
				author$project$Vega$valRef(vals));
		case 22:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'zindex',
				author$project$Vega$valRef(vals));
		case 30:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'startAngle',
				author$project$Vega$valRef(vals));
		case 31:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'endAngle',
				author$project$Vega$valRef(vals));
		case 32:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'padAngle',
				author$project$Vega$valRef(vals));
		case 33:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'innerRadius',
				author$project$Vega$valRef(vals));
		case 34:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'outerRadius',
				author$project$Vega$valRef(vals));
		case 25:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'cornerRadius',
				author$project$Vega$valRef(vals));
		case 35:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'orient',
				author$project$Vega$valRef(vals));
		case 26:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'interpolate',
				author$project$Vega$valRef(vals));
		case 27:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'tension',
				author$project$Vega$valRef(vals));
		case 28:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'defined',
				author$project$Vega$valRef(vals));
		case 36:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'clip',
				author$project$Vega$valRef(vals));
		case 38:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'aspect',
				author$project$Vega$valRef(vals));
		case 37:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'url',
				author$project$Vega$valRef(vals));
		case 39:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'path',
				author$project$Vega$valRef(vals));
		case 40:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'shape',
				author$project$Vega$valRef(vals));
		case 29:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'size',
				author$project$Vega$valRef(vals));
		case 41:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'shape',
				author$project$Vega$valRef(vals));
		case 23:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'align',
				author$project$Vega$valRef(vals));
		case 42:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'angle',
				author$project$Vega$valRef(vals));
		case 24:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'baseline',
				author$project$Vega$valRef(vals));
		case 43:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'dir',
				author$project$Vega$valRef(vals));
		case 44:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'dx',
				author$project$Vega$valRef(vals));
		case 45:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'dy',
				author$project$Vega$valRef(vals));
		case 46:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'ellipsis',
				author$project$Vega$valRef(vals));
		case 47:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'font',
				author$project$Vega$valRef(vals));
		case 48:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'fontSize',
				author$project$Vega$valRef(vals));
		case 49:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'fontWeight',
				author$project$Vega$valRef(vals));
		case 50:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'fontStyle',
				author$project$Vega$valRef(vals));
		case 51:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'limit',
				author$project$Vega$valRef(vals));
		case 52:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'radius',
				author$project$Vega$valRef(vals));
		case 53:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'text',
				author$project$Vega$valRef(vals));
		case 54:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'theta',
				author$project$Vega$valRef(vals));
		default:
			var s = mProp.a;
			var vals = mProp.b;
			return _Utils_Tuple2(
				s,
				author$project$Vega$valRef(vals));
	}
};
var author$project$Vega$encodingProperty = function (ep) {
	switch (ep.$) {
		case 0:
			var mProps = ep.a;
			return _Utils_Tuple2(
				'enter',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$markProperty, mProps)));
		case 1:
			var mProps = ep.a;
			return _Utils_Tuple2(
				'update',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$markProperty, mProps)));
		case 2:
			var mProps = ep.a;
			return _Utils_Tuple2(
				'exit',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$markProperty, mProps)));
		case 3:
			var mProps = ep.a;
			return _Utils_Tuple2(
				'hover',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$markProperty, mProps)));
		case 4:
			var s = ep.a;
			return _Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(s));
		case 5:
			var b = ep.a;
			return _Utils_Tuple2(
				'interactive',
				author$project$Vega$booSpec(b));
		default:
			var s = ep.a;
			var mProps = ep.b;
			return _Utils_Tuple2(
				s,
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$markProperty, mProps)));
	}
};
var author$project$Vega$markLabel = function (m) {
	switch (m) {
		case 0:
			return 'arc';
		case 1:
			return 'area';
		case 2:
			return 'image';
		case 3:
			return 'group';
		case 4:
			return 'line';
		case 5:
			return 'path';
		case 6:
			return 'rect';
		case 7:
			return 'rule';
		case 8:
			return 'shape';
		case 9:
			return 'symbol';
		case 10:
			return 'text';
		default:
			return 'trail';
	}
};
var author$project$Vega$FaData = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$FaName = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$opSpec = function (op) {
	switch (op.$) {
		case 0:
			return elm$json$Json$Encode$string('argmax');
		case 1:
			return elm$json$Json$Encode$string('argmin');
		case 4:
			return elm$json$Json$Encode$string('count');
		case 2:
			return elm$json$Json$Encode$string('ci0');
		case 3:
			return elm$json$Json$Encode$string('ci1');
		case 5:
			return elm$json$Json$Encode$string('distinct');
		case 6:
			return elm$json$Json$Encode$string('max');
		case 7:
			return elm$json$Json$Encode$string('mean');
		case 8:
			return elm$json$Json$Encode$string('median');
		case 9:
			return elm$json$Json$Encode$string('min');
		case 10:
			return elm$json$Json$Encode$string('missing');
		case 11:
			return elm$json$Json$Encode$string('q1');
		case 12:
			return elm$json$Json$Encode$string('q3');
		case 14:
			return elm$json$Json$Encode$string('stdev');
		case 15:
			return elm$json$Json$Encode$string('stdevp');
		case 16:
			return elm$json$Json$Encode$string('sum');
		case 13:
			return elm$json$Json$Encode$string('stderr');
		case 17:
			return elm$json$Json$Encode$string('valid');
		case 18:
			return elm$json$Json$Encode$string('variance');
		case 19:
			return elm$json$Json$Encode$string('variancep');
		default:
			var sigName = op.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sigName)
					]));
	}
};
var author$project$Vega$aggregateProperty = function (ap) {
	switch (ap.$) {
		case 0:
			var fs = ap.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 1:
			var fs = ap.a;
			return _Utils_Tuple2(
				'fields',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 2:
			var ops = ap.a;
			return _Utils_Tuple2(
				'ops',
				A2(elm$json$Json$Encode$list, author$project$Vega$opSpec, ops));
		case 3:
			var labels = ap.a;
			return _Utils_Tuple2(
				'as',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, labels));
		case 4:
			var b = ap.a;
			return _Utils_Tuple2(
				'cross',
				author$project$Vega$booSpec(b));
		case 5:
			var b = ap.a;
			return _Utils_Tuple2(
				'drop',
				author$project$Vega$booSpec(b));
		default:
			var f = ap.a;
			return _Utils_Tuple2(
				'key',
				author$project$Vega$fieldSpec(f));
	}
};
var author$project$Vega$facetProperty = function (fct) {
	switch (fct.$) {
		case 0:
			var s = fct.a;
			return _Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(s));
		case 1:
			var s = fct.a;
			return _Utils_Tuple2(
				'data',
				author$project$Vega$strSpec(s));
		case 2:
			var f = fct.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$fieldSpec(f));
		case 4:
			var fs = fct.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		default:
			var aps = fct.a;
			return _Utils_Tuple2(
				'aggregate',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$aggregateProperty, aps)));
	}
};
var author$project$Vega$sourceProperty = function (src) {
	if (!src.$) {
		var sName = src.a;
		return _Utils_Tuple2(
			'data',
			author$project$Vega$strSpec(sName));
	} else {
		var d = src.a;
		var name = src.b;
		var fcts = src.c;
		return _Utils_Tuple2(
			'facet',
			elm$json$Json$Encode$object(
				A2(
					elm$core$List$map,
					author$project$Vega$facetProperty,
					A2(
						elm$core$List$cons,
						author$project$Vega$FaData(d),
						A2(
							elm$core$List$cons,
							author$project$Vega$FaName(name),
							fcts)))));
	}
};
var author$project$Vega$binProperty = function (bnProp) {
	switch (bnProp.$) {
		case 0:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'anchor',
				author$project$Vega$numSpec(n));
		case 1:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'maxbins',
				author$project$Vega$numSpec(n));
		case 2:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'base',
				author$project$Vega$numSpec(n));
		case 3:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'step',
				author$project$Vega$numSpec(n));
		case 4:
			var ns = bnProp.a;
			switch (ns.$) {
				case 0:
					return _Utils_Tuple2(
						'steps',
						A2(
							elm$json$Json$Encode$list,
							author$project$Vega$numSpec,
							_List_fromArray(
								[ns])));
				case 2:
					return _Utils_Tuple2(
						'steps',
						A2(
							elm$json$Json$Encode$list,
							author$project$Vega$numSpec,
							_List_fromArray(
								[ns])));
				default:
					return _Utils_Tuple2(
						'steps',
						author$project$Vega$numSpec(ns));
			}
		case 5:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'minstep',
				author$project$Vega$numSpec(n));
		case 6:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'divide',
				author$project$Vega$numSpec(n));
		case 7:
			var b = bnProp.a;
			return _Utils_Tuple2(
				'nice',
				author$project$Vega$booSpec(b));
		case 8:
			var s = bnProp.a;
			return _Utils_Tuple2(
				'signal',
				elm$json$Json$Encode$string(s));
		default:
			var mn = bnProp.a;
			var mx = bnProp.b;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[mn, mx])));
	}
};
var author$project$Vega$contourProperty = function (cnProp) {
	switch (cnProp.$) {
		case 0:
			var n = cnProp.a;
			if (!n.$) {
				return _Utils_Tuple2('values', elm$json$Json$Encode$null);
			} else {
				return _Utils_Tuple2(
					'values',
					author$project$Vega$numSpec(n));
			}
		case 1:
			var f = cnProp.a;
			return _Utils_Tuple2(
				'x',
				author$project$Vega$fieldSpec(f));
		case 2:
			var f = cnProp.a;
			return _Utils_Tuple2(
				'y',
				author$project$Vega$fieldSpec(f));
		case 3:
			var n = cnProp.a;
			return _Utils_Tuple2(
				'cellSize',
				author$project$Vega$numSpec(n));
		case 4:
			var n = cnProp.a;
			return _Utils_Tuple2(
				'bandwidth',
				author$project$Vega$numSpec(n));
		case 5:
			var b = cnProp.a;
			return _Utils_Tuple2(
				'smooth',
				author$project$Vega$booSpec(b));
		case 6:
			var n = cnProp.a;
			if (!n.$) {
				return _Utils_Tuple2('thresholds', elm$json$Json$Encode$null);
			} else {
				return _Utils_Tuple2(
					'thresholds',
					author$project$Vega$numSpec(n));
			}
		case 7:
			var n = cnProp.a;
			return _Utils_Tuple2(
				'count',
				author$project$Vega$numSpec(n));
		default:
			var b = cnProp.a;
			return _Utils_Tuple2(
				'nice',
				author$project$Vega$booSpec(b));
	}
};
var author$project$Vega$caseLabel = function (c) {
	switch (c) {
		case 0:
			return 'lower';
		case 1:
			return 'upper';
		default:
			return 'mixed';
	}
};
var author$project$Vega$countPatternProperty = function (cpProp) {
	switch (cpProp.$) {
		case 0:
			var s = cpProp.a;
			return _Utils_Tuple2(
				'pattern',
				author$project$Vega$strSpec(s));
		case 1:
			var c = cpProp.a;
			return _Utils_Tuple2(
				'case',
				elm$json$Json$Encode$string(
					author$project$Vega$caseLabel(c)));
		case 2:
			var s = cpProp.a;
			return _Utils_Tuple2(
				'stopwords',
				author$project$Vega$strSpec(s));
		default:
			var s1 = cpProp.a;
			var s2 = cpProp.b;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[s1, s2])));
	}
};
var author$project$Vega$crossProperty = function (crProp) {
	if (!crProp.$) {
		var ex = crProp.a;
		return _Utils_Tuple2(
			'filter',
			elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$exprProperty(ex)
					])));
	} else {
		var a = crProp.a;
		var b = crProp.b;
		return _Utils_Tuple2(
			'as',
			A2(
				elm$json$Json$Encode$list,
				elm$json$Json$Encode$string,
				_List_fromArray(
					[a, b])));
	}
};
var author$project$Vega$NumSignal = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$NumSignals = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$numArrayProperty = F3(
	function (len, name, n) {
		switch (n.$) {
			case 1:
				var ns = n.a;
				return _Utils_eq(
					elm$core$List$length(ns),
					len) ? _Utils_Tuple2(
					name,
					A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, ns)) : _Utils_Tuple2(name, elm$json$Json$Encode$null);
			case 2:
				var sig = n.a;
				return _Utils_Tuple2(
					name,
					author$project$Vega$numSpec(
						author$project$Vega$NumSignal(sig)));
			case 3:
				var sigs = n.a;
				return _Utils_eq(
					elm$core$List$length(sigs),
					len) ? _Utils_Tuple2(
					name,
					author$project$Vega$numSpec(
						author$project$Vega$NumSignals(sigs))) : _Utils_Tuple2(name, elm$json$Json$Encode$null);
			case 4:
				var ns = n.a;
				return _Utils_eq(
					elm$core$List$length(ns),
					len) ? _Utils_Tuple2(
					name,
					A2(elm$json$Json$Encode$list, author$project$Vega$numSpec, ns)) : _Utils_Tuple2(name, elm$json$Json$Encode$null);
			default:
				return _Utils_Tuple2(name, elm$json$Json$Encode$null);
		}
	});
var author$project$Vega$densityProperty = function (dnp) {
	switch (dnp.$) {
		case 0:
			var ns = dnp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'extent', ns);
		case 1:
			var df = dnp.a;
			switch (df.$) {
				case 0:
					return _Utils_Tuple2(
						'method',
						elm$json$Json$Encode$string('pdf'));
				case 1:
					return _Utils_Tuple2(
						'method',
						elm$json$Json$Encode$string('cdf'));
				default:
					var sig = df.a;
					return _Utils_Tuple2(
						'method',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'signal',
									elm$json$Json$Encode$string(sig))
								])));
			}
		case 2:
			var n = dnp.a;
			return _Utils_Tuple2(
				'steps',
				author$project$Vega$numSpec(n));
		default:
			var s1 = dnp.a;
			var s2 = dnp.b;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[s1, s2])));
	}
};
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var author$project$Vega$distributionSpec = function (dist) {
	switch (dist.$) {
		case 0:
			var mean = dist.a;
			var stdev = dist.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'function',
						elm$json$Json$Encode$string('normal')),
						_Utils_Tuple2(
						'mean',
						author$project$Vega$numSpec(mean)),
						_Utils_Tuple2(
						'stdev',
						author$project$Vega$numSpec(stdev))
					]));
		case 1:
			var mn = dist.a;
			var mx = dist.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'function',
						elm$json$Json$Encode$string('uniform')),
						_Utils_Tuple2(
						'min',
						author$project$Vega$numSpec(mn)),
						_Utils_Tuple2(
						'max',
						author$project$Vega$numSpec(mx))
					]));
		case 2:
			var dSource = dist.a;
			var f = dist.b;
			var bw = dist.c;
			return (dSource === '') ? elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'function',
						elm$json$Json$Encode$string('kde')),
						_Utils_Tuple2(
						'field',
						author$project$Vega$fieldSpec(f)),
						_Utils_Tuple2(
						'bandwidth',
						author$project$Vega$numSpec(bw))
					])) : elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'function',
						elm$json$Json$Encode$string('kde')),
						_Utils_Tuple2(
						'from',
						elm$json$Json$Encode$string(dSource)),
						_Utils_Tuple2(
						'field',
						author$project$Vega$fieldSpec(f)),
						_Utils_Tuple2(
						'bandwidth',
						author$project$Vega$numSpec(bw))
					]));
		default:
			var dProbs = dist.a;
			var probs = A2(
				elm$core$List$map,
				author$project$Vega$numSpec,
				elm$core$List$unzip(dProbs).b);
			var dists = A2(
				elm$core$List$map,
				author$project$Vega$distributionSpec,
				elm$core$List$unzip(dProbs).a);
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'function',
						elm$json$Json$Encode$string('mixture')),
						_Utils_Tuple2(
						'distributions',
						A2(elm$json$Json$Encode$list, elm$core$Basics$identity, dists)),
						_Utils_Tuple2(
						'weights',
						A2(elm$json$Json$Encode$list, elm$core$Basics$identity, probs))
					]));
	}
};
var author$project$Vega$forceProperty = function (fp) {
	switch (fp.$) {
		case 2:
			var f = fp.a;
			return _Utils_Tuple2(
				'x',
				author$project$Vega$fieldSpec(f));
		case 3:
			var f = fp.a;
			return _Utils_Tuple2(
				'y',
				author$project$Vega$fieldSpec(f));
		case 0:
			var n = fp.a;
			return _Utils_Tuple2(
				'x',
				author$project$Vega$numSpec(n));
		case 1:
			var n = fp.a;
			return _Utils_Tuple2(
				'y',
				author$project$Vega$numSpec(n));
		case 4:
			var n = fp.a;
			return _Utils_Tuple2(
				'radius',
				author$project$Vega$numSpec(n));
		case 5:
			var n = fp.a;
			return _Utils_Tuple2(
				'strength',
				author$project$Vega$numSpec(n));
		case 6:
			var n = fp.a;
			return _Utils_Tuple2(
				'iterations',
				author$project$Vega$numSpec(n));
		case 7:
			var n = fp.a;
			return _Utils_Tuple2(
				'theta',
				author$project$Vega$numSpec(n));
		case 8:
			var n = fp.a;
			return _Utils_Tuple2(
				'distanceMin',
				author$project$Vega$numSpec(n));
		case 9:
			var n = fp.a;
			return _Utils_Tuple2(
				'distanceMax',
				author$project$Vega$numSpec(n));
		case 10:
			var s = fp.a;
			return _Utils_Tuple2(
				'links',
				author$project$Vega$strSpec(s));
		case 11:
			var f = fp.a;
			return _Utils_Tuple2(
				'id',
				author$project$Vega$fieldSpec(f));
		default:
			var n = fp.a;
			return _Utils_Tuple2(
				'distance',
				author$project$Vega$numSpec(n));
	}
};
var author$project$Vega$forceSpec = function (force) {
	switch (force.$) {
		case 0:
			var fps = force.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'force',
						elm$json$Json$Encode$string('center')),
					A2(elm$core$List$map, author$project$Vega$forceProperty, fps)));
		case 1:
			var fps = force.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'force',
						elm$json$Json$Encode$string('collide')),
					A2(elm$core$List$map, author$project$Vega$forceProperty, fps)));
		case 2:
			var fps = force.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'force',
						elm$json$Json$Encode$string('nbody')),
					A2(elm$core$List$map, author$project$Vega$forceProperty, fps)));
		case 3:
			var fps = force.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'force',
						elm$json$Json$Encode$string('link')),
					A2(elm$core$List$map, author$project$Vega$forceProperty, fps)));
		case 4:
			var f = force.a;
			var fps = force.b;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'force',
						elm$json$Json$Encode$string('x')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'x',
							author$project$Vega$fieldSpec(f)),
						A2(elm$core$List$map, author$project$Vega$forceProperty, fps))));
		default:
			var f = force.a;
			var fps = force.b;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'force',
						elm$json$Json$Encode$string('y')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'y',
							author$project$Vega$fieldSpec(f)),
						A2(elm$core$List$map, author$project$Vega$forceProperty, fps))));
	}
};
var author$project$Vega$forceSimulationProperty = function (fProp) {
	switch (fProp.$) {
		case 0:
			var b = fProp.a;
			return _Utils_Tuple2(
				'static',
				author$project$Vega$booSpec(b));
		case 1:
			var b = fProp.a;
			return _Utils_Tuple2(
				'restart',
				author$project$Vega$booSpec(b));
		case 2:
			var n = fProp.a;
			return _Utils_Tuple2(
				'iterations',
				author$project$Vega$numSpec(n));
		case 3:
			var n = fProp.a;
			return _Utils_Tuple2(
				'alpha',
				author$project$Vega$numSpec(n));
		case 4:
			var n = fProp.a;
			return _Utils_Tuple2(
				'alphaMin',
				author$project$Vega$numSpec(n));
		case 5:
			var n = fProp.a;
			return _Utils_Tuple2(
				'alphaTarget',
				author$project$Vega$numSpec(n));
		case 6:
			var n = fProp.a;
			return _Utils_Tuple2(
				'velocityDecay',
				author$project$Vega$numSpec(n));
		case 7:
			var forces = fProp.a;
			return _Utils_Tuple2(
				'forces',
				A2(elm$json$Json$Encode$list, author$project$Vega$forceSpec, forces));
		default:
			var x = fProp.a;
			var y = fProp.b;
			var vx = fProp.c;
			var vy = fProp.d;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[x, y, vx, vy])));
	}
};
var author$project$Vega$formulaUpdateSpec = function (update) {
	if (!update) {
		return elm$json$Json$Encode$bool(true);
	} else {
		return elm$json$Json$Encode$bool(false);
	}
};
var author$project$Vega$geoJsonProperty = function (gjProp) {
	switch (gjProp.$) {
		case 0:
			var lng = gjProp.a;
			var lat = gjProp.b;
			return _Utils_Tuple2(
				'fields',
				A2(
					elm$json$Json$Encode$list,
					author$project$Vega$fieldSpec,
					_List_fromArray(
						[lng, lat])));
		case 1:
			var f = gjProp.a;
			return _Utils_Tuple2(
				'geojson',
				author$project$Vega$fieldSpec(f));
		default:
			var s = gjProp.a;
			return _Utils_Tuple2(
				'signal',
				elm$json$Json$Encode$string(s));
	}
};
var author$project$Vega$geoPathProperty = function (gpProp) {
	switch (gpProp.$) {
		case 0:
			var f = gpProp.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$fieldSpec(f));
		case 1:
			var n = gpProp.a;
			return _Utils_Tuple2(
				'pointRadius',
				author$project$Vega$numSpec(n));
		default:
			var s = gpProp.a;
			return _Utils_Tuple2(
				'as',
				elm$json$Json$Encode$string(s));
	}
};
var author$project$Vega$graticuleProperty = function (grProp) {
	switch (grProp.$) {
		case 0:
			var f = grProp.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$fieldSpec(f));
		case 1:
			var n = grProp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'extentMajor', n);
		case 2:
			var n = grProp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'extentMinor', n);
		case 3:
			var n = grProp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'extentr', n);
		case 4:
			var n = grProp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'stepMajor', n);
		case 5:
			var n = grProp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'stepMinor', n);
		case 6:
			var n = grProp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'step', n);
		default:
			var n = grProp.a;
			return _Utils_Tuple2(
				'precision',
				author$project$Vega$numSpec(n));
	}
};
var author$project$Vega$imputeMethodLabel = function (im) {
	switch (im) {
		case 0:
			return 'value';
		case 1:
			return 'mean';
		case 2:
			return 'median';
		case 3:
			return 'max';
		default:
			return 'min';
	}
};
var author$project$Vega$imputeProperty = function (ip) {
	switch (ip.$) {
		case 0:
			var val = ip.a;
			return _Utils_Tuple2(
				'keyvals',
				author$project$Vega$valueSpec(val));
		case 1:
			var m = ip.a;
			return _Utils_Tuple2(
				'method',
				elm$json$Json$Encode$string(
					author$project$Vega$imputeMethodLabel(m)));
		case 2:
			var fs = ip.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		default:
			var val = ip.a;
			return _Utils_Tuple2(
				'value',
				author$project$Vega$valueSpec(val));
	}
};
var author$project$Vega$joinAggregateProperty = function (ap) {
	switch (ap.$) {
		case 0:
			var fs = ap.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 1:
			var fs = ap.a;
			return _Utils_Tuple2(
				'fields',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 2:
			var ops = ap.a;
			return _Utils_Tuple2(
				'ops',
				A2(elm$json$Json$Encode$list, author$project$Vega$opSpec, ops));
		default:
			var labels = ap.a;
			return _Utils_Tuple2(
				'as',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, labels));
	}
};
var author$project$Vega$linkShapeSpec = function (ls) {
	switch (ls.$) {
		case 0:
			return elm$json$Json$Encode$string('line');
		case 1:
			return elm$json$Json$Encode$string('arc');
		case 2:
			return elm$json$Json$Encode$string('curve');
		case 3:
			return elm$json$Json$Encode$string('diagonal');
		case 4:
			return elm$json$Json$Encode$string('orthogonal');
		default:
			var sig = ls.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$orientationSpec = function (orient) {
	switch (orient.$) {
		case 0:
			return elm$json$Json$Encode$string('horizontal');
		case 1:
			return elm$json$Json$Encode$string('vertical');
		case 2:
			return elm$json$Json$Encode$string('radial');
		default:
			var sig = orient.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$linkPathProperty = function (lpProp) {
	switch (lpProp.$) {
		case 0:
			var f = lpProp.a;
			return _Utils_Tuple2(
				'sourceX',
				author$project$Vega$fieldSpec(f));
		case 1:
			var f = lpProp.a;
			return _Utils_Tuple2(
				'sourceY',
				author$project$Vega$fieldSpec(f));
		case 2:
			var f = lpProp.a;
			return _Utils_Tuple2(
				'targetX',
				author$project$Vega$fieldSpec(f));
		case 3:
			var f = lpProp.a;
			return _Utils_Tuple2(
				'targetY',
				author$project$Vega$fieldSpec(f));
		case 4:
			var o = lpProp.a;
			return _Utils_Tuple2(
				'orient',
				author$project$Vega$orientationSpec(o));
		case 5:
			var ls = lpProp.a;
			return _Utils_Tuple2(
				'shape',
				author$project$Vega$linkShapeSpec(ls));
		case 6:
			var sig = lpProp.a;
			return _Utils_Tuple2(
				'require',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'signal',
							elm$json$Json$Encode$string(sig))
						])));
		default:
			var s = lpProp.a;
			return _Utils_Tuple2(
				'as',
				elm$json$Json$Encode$string(s));
	}
};
var author$project$Vega$lookupProperty = function (luProp) {
	switch (luProp.$) {
		case 0:
			var fields = luProp.a;
			return _Utils_Tuple2(
				'values',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fields));
		case 1:
			var fields = luProp.a;
			return _Utils_Tuple2(
				'as',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, fields));
		default:
			var val = luProp.a;
			return _Utils_Tuple2(
				'default',
				author$project$Vega$valueSpec(val));
	}
};
var author$project$Vega$packProperty = function (pp) {
	switch (pp.$) {
		case 0:
			var f = pp.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$fieldSpec(f));
		case 1:
			var comp = pp.a;
			return _Utils_Tuple2(
				'sort',
				elm$json$Json$Encode$object(
					author$project$Vega$comparatorProperties(comp)));
		case 2:
			var n = pp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'size', n);
		case 3:
			var fOrNull = pp.a;
			if (!fOrNull.$) {
				var f = fOrNull.a;
				return _Utils_Tuple2(
					'radius',
					author$project$Vega$fieldSpec(f));
			} else {
				return _Utils_Tuple2('radius', elm$json$Json$Encode$null);
			}
		case 4:
			var padSize = pp.a;
			return _Utils_Tuple2(
				'padding',
				author$project$Vega$numSpec(padSize));
		default:
			var x = pp.a;
			var y = pp.b;
			var r = pp.c;
			var depth = pp.d;
			var children = pp.e;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[x, y, r, depth, children])));
	}
};
var author$project$Vega$partitionProperty = function (pp) {
	switch (pp.$) {
		case 0:
			var f = pp.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$fieldSpec(f));
		case 1:
			var comp = pp.a;
			return _Utils_Tuple2(
				'sort',
				elm$json$Json$Encode$object(
					author$project$Vega$comparatorProperties(comp)));
		case 2:
			var n = pp.a;
			return _Utils_Tuple2(
				'padding',
				author$project$Vega$numSpec(n));
		case 3:
			var b = pp.a;
			return _Utils_Tuple2(
				'round',
				author$project$Vega$booSpec(b));
		case 4:
			var n = pp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'size', n);
		default:
			var x0 = pp.a;
			var y0 = pp.b;
			var x1 = pp.c;
			var y1 = pp.d;
			var depth = pp.e;
			var children = pp.f;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[x0, y0, x1, y1, depth, children])));
	}
};
var author$project$Vega$pieProperty = function (pp) {
	switch (pp.$) {
		case 0:
			var f = pp.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$fieldSpec(f));
		case 1:
			var x = pp.a;
			return _Utils_Tuple2(
				'startAngle',
				author$project$Vega$numSpec(x));
		case 2:
			var x = pp.a;
			return _Utils_Tuple2(
				'endAngle',
				author$project$Vega$numSpec(x));
		case 3:
			var b = pp.a;
			return _Utils_Tuple2(
				'sort',
				author$project$Vega$booSpec(b));
		default:
			var y0 = pp.a;
			var y1 = pp.b;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[y0, y1])));
	}
};
var author$project$Vega$pivotProperty = function (pp) {
	switch (pp.$) {
		case 0:
			var fs = pp.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 1:
			var n = pp.a;
			return _Utils_Tuple2(
				'limit',
				author$project$Vega$numSpec(n));
		default:
			var o = pp.a;
			return _Utils_Tuple2(
				'op',
				author$project$Vega$opSpec(o));
	}
};
var author$project$Vega$stackOffsetSpec = function (off) {
	switch (off.$) {
		case 0:
			return elm$json$Json$Encode$string('zero');
		case 1:
			return elm$json$Json$Encode$string('center');
		case 2:
			return elm$json$Json$Encode$string('normalize');
		default:
			var sig = off.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$stackProperty = function (sp) {
	switch (sp.$) {
		case 0:
			var f = sp.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$fieldSpec(f));
		case 1:
			var fs = sp.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 2:
			var comp = sp.a;
			return _Utils_Tuple2(
				'sort',
				elm$json$Json$Encode$object(
					author$project$Vega$comparatorProperties(comp)));
		case 3:
			var off = sp.a;
			return _Utils_Tuple2(
				'offset',
				author$project$Vega$stackOffsetSpec(off));
		default:
			var y0 = sp.a;
			var y1 = sp.b;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[y0, y1])));
	}
};
var author$project$Vega$teMethodSpec = function (m) {
	switch (m.$) {
		case 0:
			return elm$json$Json$Encode$string('tidy');
		case 1:
			return elm$json$Json$Encode$string('cluster');
		default:
			var sigName = m.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sigName)
					]));
	}
};
var author$project$Vega$treeProperty = function (tp) {
	switch (tp.$) {
		case 0:
			var f = tp.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$fieldSpec(f));
		case 1:
			var comp = tp.a;
			return _Utils_Tuple2(
				'sort',
				elm$json$Json$Encode$object(
					author$project$Vega$comparatorProperties(comp)));
		case 2:
			var m = tp.a;
			return _Utils_Tuple2(
				'method',
				author$project$Vega$teMethodSpec(m));
		case 4:
			var n = tp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'size', n);
		case 3:
			var b = tp.a;
			return _Utils_Tuple2(
				'separation',
				author$project$Vega$booSpec(b));
		case 5:
			var n = tp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'nodeSize', n);
		default:
			var x = tp.a;
			var y = tp.b;
			var depth = tp.c;
			var children = tp.d;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[x, y, depth, children])));
	}
};
var author$project$Vega$tmMethodSpec = function (m) {
	switch (m.$) {
		case 0:
			return elm$json$Json$Encode$string('squarify');
		case 1:
			return elm$json$Json$Encode$string('resquarify');
		case 2:
			return elm$json$Json$Encode$string('binary');
		case 3:
			return elm$json$Json$Encode$string('dice');
		case 4:
			return elm$json$Json$Encode$string('slice');
		case 5:
			return elm$json$Json$Encode$string('slicedice');
		default:
			var sigName = m.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sigName)
					]));
	}
};
var author$project$Vega$treemapProperty = function (tp) {
	switch (tp.$) {
		case 0:
			var f = tp.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$fieldSpec(f));
		case 1:
			var comp = tp.a;
			return _Utils_Tuple2(
				'sort',
				elm$json$Json$Encode$object(
					author$project$Vega$comparatorProperties(comp)));
		case 2:
			var m = tp.a;
			return _Utils_Tuple2(
				'method',
				author$project$Vega$tmMethodSpec(m));
		case 3:
			var n = tp.a;
			return _Utils_Tuple2(
				'padding',
				author$project$Vega$numSpec(n));
		case 4:
			var n = tp.a;
			return _Utils_Tuple2(
				'paddingInner',
				author$project$Vega$numSpec(n));
		case 5:
			var n = tp.a;
			return _Utils_Tuple2(
				'paddingOuter',
				author$project$Vega$numSpec(n));
		case 6:
			var n = tp.a;
			return _Utils_Tuple2(
				'paddingTop',
				author$project$Vega$numSpec(n));
		case 7:
			var n = tp.a;
			return _Utils_Tuple2(
				'paddingRight',
				author$project$Vega$numSpec(n));
		case 8:
			var n = tp.a;
			return _Utils_Tuple2(
				'paddingBottom',
				author$project$Vega$numSpec(n));
		case 9:
			var n = tp.a;
			return _Utils_Tuple2(
				'paddingLeft',
				author$project$Vega$numSpec(n));
		case 10:
			var n = tp.a;
			return _Utils_Tuple2(
				'ratio',
				author$project$Vega$numSpec(n));
		case 11:
			var b = tp.a;
			return _Utils_Tuple2(
				'round',
				author$project$Vega$booSpec(b));
		case 12:
			var n = tp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'size', n);
		default:
			var x0 = tp.a;
			var y0 = tp.b;
			var x1 = tp.c;
			var y1 = tp.d;
			var depth = tp.e;
			var children = tp.f;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[x0, y0, x1, y1, depth, children])));
	}
};
var author$project$Vega$voronoiProperty = function (vp) {
	var numPairSpec = function (ns) {
		_n1$4:
		while (true) {
			switch (ns.$) {
				case 1:
					if ((ns.a.b && ns.a.b.b) && (!ns.a.b.b.b)) {
						var _n2 = ns.a;
						var _n3 = _n2.b;
						return author$project$Vega$numSpec(ns);
					} else {
						break _n1$4;
					}
				case 2:
					return author$project$Vega$numSpec(ns);
				case 3:
					if ((ns.a.b && ns.a.b.b) && (!ns.a.b.b.b)) {
						var _n4 = ns.a;
						var _n5 = _n4.b;
						return author$project$Vega$numSpec(ns);
					} else {
						break _n1$4;
					}
				case 4:
					if ((ns.a.b && ns.a.b.b) && (!ns.a.b.b.b)) {
						var _n6 = ns.a;
						var _n7 = _n6.b;
						return author$project$Vega$numSpec(ns);
					} else {
						break _n1$4;
					}
				default:
					break _n1$4;
			}
		}
		return elm$json$Json$Encode$null;
	};
	switch (vp.$) {
		case 0:
			var tl = vp.a;
			var br = vp.b;
			return _Utils_Tuple2(
				'extent',
				A2(
					elm$json$Json$Encode$list,
					numPairSpec,
					_List_fromArray(
						[tl, br])));
		case 1:
			var sz = vp.a;
			return _Utils_Tuple2(
				'size',
				numPairSpec(sz));
		default:
			var s = vp.a;
			return _Utils_Tuple2(
				'as',
				elm$json$Json$Encode$string(s));
	}
};
var author$project$Vega$wOperationSpec = function (wnOp) {
	switch (wnOp.$) {
		case 0:
			return elm$json$Json$Encode$string('row_number');
		case 1:
			return elm$json$Json$Encode$string('rank');
		case 2:
			return elm$json$Json$Encode$string('dense_rank');
		case 3:
			return elm$json$Json$Encode$string('percent_rank');
		case 4:
			return elm$json$Json$Encode$string('cume_dist');
		case 5:
			return elm$json$Json$Encode$string('ntile');
		case 6:
			return elm$json$Json$Encode$string('lag');
		case 7:
			return elm$json$Json$Encode$string('lead');
		case 8:
			return elm$json$Json$Encode$string('first_value');
		case 9:
			return elm$json$Json$Encode$string('last_value');
		case 10:
			return elm$json$Json$Encode$string('nth_value');
		default:
			var sigName = wnOp.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sigName)
					]));
	}
};
var author$project$Vega$windowOperationProperties = function (wos) {
	var windowParamSpec = function (wo) {
		if (!wo.$) {
			var mn = wo.b;
			if (!mn.$) {
				var n = mn.a;
				return author$project$Vega$numSpec(n);
			} else {
				return elm$json$Json$Encode$null;
			}
		} else {
			var mn = wo.b;
			if (!mn.$) {
				var n = mn.a;
				return author$project$Vega$numSpec(n);
			} else {
				return elm$json$Json$Encode$null;
			}
		}
	};
	var windowOpSpec = function (wo) {
		if (!wo.$) {
			var wOp = wo.a;
			return author$project$Vega$wOperationSpec(wOp);
		} else {
			var aOp = wo.a;
			return author$project$Vega$opSpec(aOp);
		}
	};
	var windowFieldSpec = function (wo) {
		if (!wo.$) {
			var mf = wo.c;
			if (!mf.$) {
				var f = mf.a;
				return author$project$Vega$fieldSpec(f);
			} else {
				return elm$json$Json$Encode$null;
			}
		} else {
			var mf = wo.c;
			if (!mf.$) {
				var f = mf.a;
				return author$project$Vega$fieldSpec(f);
			} else {
				return elm$json$Json$Encode$null;
			}
		}
	};
	var windowAsSpec = function (wo) {
		if (!wo.$) {
			var s = wo.d;
			return elm$json$Json$Encode$string(s);
		} else {
			var s = wo.d;
			return elm$json$Json$Encode$string(s);
		}
	};
	return _List_fromArray(
		[
			_Utils_Tuple2(
			'ops',
			A2(elm$json$Json$Encode$list, windowOpSpec, wos)),
			_Utils_Tuple2(
			'params',
			A2(elm$json$Json$Encode$list, windowParamSpec, wos)),
			_Utils_Tuple2(
			'fields',
			A2(elm$json$Json$Encode$list, windowFieldSpec, wos)),
			_Utils_Tuple2(
			'as',
			A2(elm$json$Json$Encode$list, windowAsSpec, wos))
		]);
};
var author$project$Vega$windowProperty = function (wp) {
	switch (wp.$) {
		case 0:
			var comp = wp.a;
			return _Utils_Tuple2(
				'sort',
				elm$json$Json$Encode$object(
					author$project$Vega$comparatorProperties(comp)));
		case 1:
			var fs = wp.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 2:
			var n = wp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'frame', n);
		default:
			var b = wp.a;
			return _Utils_Tuple2(
				'ignorePeers',
				author$project$Vega$booSpec(b));
	}
};
var author$project$Vega$spiralSpec = function (sp) {
	switch (sp.$) {
		case 0:
			return elm$json$Json$Encode$string('archimedean');
		case 1:
			return elm$json$Json$Encode$string('rectangular');
		default:
			var sig = sp.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$wordcloudProperty = function (wcp) {
	switch (wcp.$) {
		case 0:
			var s = wcp.a;
			return _Utils_Tuple2(
				'font',
				author$project$Vega$strSpec(s));
		case 1:
			var s = wcp.a;
			return _Utils_Tuple2(
				'fontStyle',
				author$project$Vega$strSpec(s));
		case 2:
			var s = wcp.a;
			return _Utils_Tuple2(
				'fontWeight',
				author$project$Vega$strSpec(s));
		case 3:
			var n = wcp.a;
			return _Utils_Tuple2(
				'fontSize',
				author$project$Vega$numSpec(n));
		case 4:
			var ns = wcp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'fontSizeRange', ns);
		case 5:
			var n = wcp.a;
			return _Utils_Tuple2(
				'padding',
				author$project$Vega$numSpec(n));
		case 6:
			var n = wcp.a;
			return _Utils_Tuple2(
				'rotate',
				author$project$Vega$numSpec(n));
		case 7:
			var f = wcp.a;
			return _Utils_Tuple2(
				'text',
				author$project$Vega$fieldSpec(f));
		case 8:
			var ns = wcp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'size', ns);
		case 9:
			var sp = wcp.a;
			return _Utils_Tuple2(
				'spiral',
				author$project$Vega$spiralSpec(sp));
		default:
			var x = wcp.a;
			var y = wcp.b;
			var fnt = wcp.c;
			var fntSz = wcp.d;
			var fntSt = wcp.e;
			var fntW = wcp.f;
			var angle = wcp.g;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[x, y, fnt, fntSz, fntSt, fntW, angle])));
	}
};
var author$project$Vega$transformSpec = function (trans) {
	switch (trans.$) {
		case 0:
			var aps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('aggregate')),
					A2(elm$core$List$map, author$project$Vega$aggregateProperty, aps)));
		case 1:
			var f = trans.a;
			var extent = trans.b;
			var bps = trans.c;
			var extSpec = function () {
				if (!extent.$) {
					return elm$json$Json$Encode$null;
				} else {
					return author$project$Vega$numSpec(extent);
				}
			}();
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('bin')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'field',
							author$project$Vega$fieldSpec(f)),
						A2(
							elm$core$List$cons,
							_Utils_Tuple2('extent', extSpec),
							A2(elm$core$List$map, author$project$Vega$binProperty, bps)))));
		case 2:
			var comp = trans.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('collect')),
						_Utils_Tuple2(
						'sort',
						elm$json$Json$Encode$object(
							author$project$Vega$comparatorProperties(comp)))
					]));
		case 4:
			var f = trans.a;
			var cpps = trans.b;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('countpattern')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'field',
							author$project$Vega$fieldSpec(f)),
						A2(elm$core$List$map, author$project$Vega$countPatternProperty, cpps))));
		case 5:
			var cps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('cross')),
					A2(elm$core$List$map, author$project$Vega$crossProperty, cps)));
		case 6:
			var tuples = trans.a;
			var _n2 = elm$core$List$unzip(tuples);
			var fs = _n2.a;
			var ns = _n2.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('crossfilter')),
						_Utils_Tuple2(
						'fields',
						A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs)),
						_Utils_Tuple2(
						'query',
						A2(elm$json$Json$Encode$list, author$project$Vega$numSpec, ns))
					]));
		case 7:
			var tuples = trans.a;
			var s = trans.b;
			var _n3 = elm$core$List$unzip(tuples);
			var fs = _n3.a;
			var ns = _n3.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('crossfilter')),
						_Utils_Tuple2(
						'fields',
						A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs)),
						_Utils_Tuple2(
						'query',
						A2(elm$json$Json$Encode$list, author$project$Vega$numSpec, ns)),
						_Utils_Tuple2(
						'signal',
						elm$json$Json$Encode$string(s))
					]));
		case 8:
			var dist = trans.a;
			var dnps = trans.b;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('density')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'distribution',
							author$project$Vega$distributionSpec(dist)),
						A2(elm$core$List$map, author$project$Vega$densityProperty, dnps))));
		case 9:
			var f = trans.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('extent')),
						_Utils_Tuple2(
						'field',
						author$project$Vega$fieldSpec(f))
					]));
		case 10:
			var f = trans.a;
			var sigName = trans.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('extent')),
						_Utils_Tuple2(
						'field',
						author$project$Vega$fieldSpec(f)),
						_Utils_Tuple2(
						'signal',
						elm$json$Json$Encode$string(sigName))
					]));
		case 11:
			var ex = trans.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('filter')),
						author$project$Vega$exprProperty(ex)
					]));
		case 12:
			var fs = trans.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('flatten')),
						_Utils_Tuple2(
						'fields',
						A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs))
					]));
		case 13:
			var fs = trans.a;
			var ss = trans.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('flatten')),
						_Utils_Tuple2(
						'fields',
						A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs)),
						_Utils_Tuple2(
						'as',
						A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, ss))
					]));
		case 14:
			var fs = trans.a;
			if (fs.b && (!fs.b.b)) {
				var f = fs.a;
				return elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('fold')),
							_Utils_Tuple2(
							'fields',
							author$project$Vega$fieldSpec(f))
						]));
			} else {
				return elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('fold')),
							_Utils_Tuple2(
							'fields',
							A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs))
						]));
			}
		case 15:
			var fs = trans.a;
			var k = trans.b;
			var v = trans.c;
			if (fs.b && (!fs.b.b)) {
				var f = fs.a;
				return elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('fold')),
							_Utils_Tuple2(
							'fields',
							author$project$Vega$fieldSpec(f)),
							_Utils_Tuple2(
							'as',
							A2(
								elm$json$Json$Encode$list,
								elm$json$Json$Encode$string,
								_List_fromArray(
									[k, v])))
						]));
			} else {
				return elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('fold')),
							_Utils_Tuple2(
							'fields',
							A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs)),
							_Utils_Tuple2(
							'as',
							A2(
								elm$json$Json$Encode$list,
								elm$json$Json$Encode$string,
								_List_fromArray(
									[k, v])))
						]));
			}
		case 17:
			var ex = trans.a;
			var name = trans.b;
			var update = trans.c;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('formula')),
						_Utils_Tuple2(
						'expr',
						author$project$Vega$expressionSpec(ex)),
						_Utils_Tuple2(
						'as',
						elm$json$Json$Encode$string(name)),
						_Utils_Tuple2(
						'initonly',
						author$project$Vega$formulaUpdateSpec(update))
					]));
		case 24:
			var s = trans.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('identifier')),
						_Utils_Tuple2(
						'as',
						elm$json$Json$Encode$string(s))
					]));
		case 25:
			var f = trans.a;
			var key = trans.b;
			var ips = trans.c;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('impute')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'field',
							author$project$Vega$fieldSpec(f)),
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								'key',
								author$project$Vega$fieldSpec(key)),
							A2(elm$core$List$map, author$project$Vega$imputeProperty, ips)))));
		case 26:
			var japs = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('joinaggregate')),
					A2(elm$core$List$map, author$project$Vega$joinAggregateProperty, japs)));
		case 28:
			var from = trans.a;
			var key = trans.b;
			var fields = trans.c;
			var lups = trans.d;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('lookup')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'from',
							elm$json$Json$Encode$string(from)),
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								'key',
								author$project$Vega$fieldSpec(key)),
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									'fields',
									A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fields)),
								A2(elm$core$List$map, author$project$Vega$lookupProperty, lups))))));
		case 33:
			var f = trans.a;
			var v = trans.b;
			var pps = trans.c;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('pivot')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'field',
							author$project$Vega$fieldSpec(f)),
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								'value',
								author$project$Vega$fieldSpec(v)),
							A2(elm$core$List$map, author$project$Vega$pivotProperty, pps)))));
		case 34:
			var fns = trans.a;
			var _n6 = elm$core$List$unzip(fns);
			var fields = _n6.a;
			var names = _n6.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('project')),
						_Utils_Tuple2(
						'fields',
						A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fields)),
						_Utils_Tuple2(
						'as',
						A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, names))
					]));
		case 36:
			var n = trans.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('sample')),
						_Utils_Tuple2(
						'size',
						author$project$Vega$numSpec(n))
					]));
		case 37:
			var start = trans.a;
			var stop = trans.b;
			var step = trans.c;
			var stepProp = function () {
				_n7$4:
				while (true) {
					switch (step.$) {
						case 6:
							return _List_Nil;
						case 0:
							var n = step.a;
							return (!n) ? _List_Nil : _List_fromArray(
								[
									_Utils_Tuple2(
									'step',
									author$project$Vega$numSpec(step))
								]);
						case 1:
							if (!step.a.b) {
								return _List_Nil;
							} else {
								break _n7$4;
							}
						case 4:
							if (!step.a.b) {
								return _List_Nil;
							} else {
								break _n7$4;
							}
						default:
							break _n7$4;
					}
				}
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'step',
						author$project$Vega$numSpec(step))
					]);
			}();
			return elm$json$Json$Encode$object(
				_Utils_ap(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('sequence')),
							_Utils_Tuple2(
							'start',
							author$project$Vega$numSpec(start)),
							_Utils_Tuple2(
							'stop',
							author$project$Vega$numSpec(stop))
						]),
					stepProp));
		case 38:
			var start = trans.a;
			var stop = trans.b;
			var step = trans.c;
			var out = trans.d;
			var stepProp = function () {
				_n8$4:
				while (true) {
					switch (step.$) {
						case 6:
							return _List_Nil;
						case 0:
							var n = step.a;
							return (!n) ? _List_Nil : _List_fromArray(
								[
									_Utils_Tuple2(
									'step',
									author$project$Vega$numSpec(step))
								]);
						case 1:
							if (!step.a.b) {
								return _List_Nil;
							} else {
								break _n8$4;
							}
						case 4:
							if (!step.a.b) {
								return _List_Nil;
							} else {
								break _n8$4;
							}
						default:
							break _n8$4;
					}
				}
				return _List_fromArray(
					[
						_Utils_Tuple2(
						'step',
						author$project$Vega$numSpec(step))
					]);
			}();
			return elm$json$Json$Encode$object(
				_Utils_ap(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('sequence')),
							_Utils_Tuple2(
							'start',
							author$project$Vega$numSpec(start)),
							_Utils_Tuple2(
							'stop',
							author$project$Vega$numSpec(stop)),
							_Utils_Tuple2(
							'as',
							elm$json$Json$Encode$string(out))
						]),
					stepProp));
		case 45:
			var wos = trans.a;
			var wps = trans.b;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('window')),
					_Utils_ap(
						author$project$Vega$windowOperationProperties(wos),
						A2(elm$core$List$map, author$project$Vega$windowProperty, wps))));
		case 3:
			var x = trans.a;
			var y = trans.b;
			var cps = trans.c;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('contour')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'size',
							A2(
								elm$json$Json$Encode$list,
								author$project$Vega$numSpec,
								_List_fromArray(
									[x, y]))),
						A2(elm$core$List$map, author$project$Vega$contourProperty, cps))));
		case 18:
			var gjps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('geojson')),
					A2(elm$core$List$map, author$project$Vega$geoJsonProperty, gjps)));
		case 19:
			var pName = trans.a;
			var gpps = trans.b;
			if (pName === '') {
				return elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('geopath')),
						A2(elm$core$List$map, author$project$Vega$geoPathProperty, gpps)));
			} else {
				return elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('geopath')),
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								'projection',
								elm$json$Json$Encode$string(pName)),
							A2(elm$core$List$map, author$project$Vega$geoPathProperty, gpps))));
			}
		case 20:
			var pName = trans.a;
			var fLon = trans.b;
			var fLat = trans.c;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('geopoint')),
						_Utils_Tuple2(
						'projection',
						elm$json$Json$Encode$string(pName)),
						_Utils_Tuple2(
						'fields',
						A2(
							elm$json$Json$Encode$list,
							author$project$Vega$fieldSpec,
							_List_fromArray(
								[fLon, fLat])))
					]));
		case 21:
			var pName = trans.a;
			var fLon = trans.b;
			var fLat = trans.c;
			var asLon = trans.d;
			var asLat = trans.e;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('geopoint')),
						_Utils_Tuple2(
						'projection',
						elm$json$Json$Encode$string(pName)),
						_Utils_Tuple2(
						'fields',
						A2(
							elm$json$Json$Encode$list,
							author$project$Vega$fieldSpec,
							_List_fromArray(
								[fLon, fLat]))),
						_Utils_Tuple2(
						'as',
						A2(
							elm$json$Json$Encode$list,
							elm$json$Json$Encode$string,
							_List_fromArray(
								[asLon, asLat])))
					]));
		case 22:
			var pName = trans.a;
			var gsps = trans.b;
			if (pName === '') {
				return elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('geoshape')),
						A2(elm$core$List$map, author$project$Vega$geoPathProperty, gsps)));
			} else {
				return elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('geoshape')),
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								'projection',
								elm$json$Json$Encode$string(pName)),
							A2(elm$core$List$map, author$project$Vega$geoPathProperty, gsps))));
			}
		case 23:
			var grps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('graticule')),
					A2(elm$core$List$map, author$project$Vega$graticuleProperty, grps)));
		case 27:
			var lpps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('linkpath')),
					A2(elm$core$List$map, author$project$Vega$linkPathProperty, lpps)));
		case 32:
			var pps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('pie')),
					A2(elm$core$List$map, author$project$Vega$pieProperty, pps)));
		case 39:
			var sps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('stack')),
					A2(elm$core$List$map, author$project$Vega$stackProperty, sps)));
		case 16:
			var fps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('force')),
					A2(elm$core$List$map, author$project$Vega$forceSimulationProperty, fps)));
		case 44:
			var x = trans.a;
			var y = trans.b;
			var vps = trans.c;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('voronoi')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'x',
							author$project$Vega$fieldSpec(x)),
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								'y',
								author$project$Vega$fieldSpec(y)),
							A2(elm$core$List$map, author$project$Vega$voronoiProperty, vps)))));
		case 46:
			var wcps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('wordcloud')),
					A2(elm$core$List$map, author$project$Vega$wordcloudProperty, wcps)));
		case 29:
			var fs = trans.a;
			var b = trans.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('nest')),
						_Utils_Tuple2(
						'keys',
						A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs)),
						_Utils_Tuple2(
						'generate',
						author$project$Vega$booSpec(b))
					]));
		case 40:
			var key = trans.a;
			var parent = trans.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('stratify')),
						_Utils_Tuple2(
						'key',
						author$project$Vega$fieldSpec(key)),
						_Utils_Tuple2(
						'parentKey',
						author$project$Vega$fieldSpec(parent))
					]));
		case 42:
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('treelinks'))
					]));
		case 30:
			var pps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('pack')),
					A2(elm$core$List$map, author$project$Vega$packProperty, pps)));
		case 31:
			var pps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('partition')),
					A2(elm$core$List$map, author$project$Vega$partitionProperty, pps)));
		case 41:
			var tps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('tree')),
					A2(elm$core$List$map, author$project$Vega$treeProperty, tps)));
		case 43:
			var tps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('treemap')),
					A2(elm$core$List$map, author$project$Vega$treemapProperty, tps)));
		default:
			var sig = trans.a;
			var bitmask = trans.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('resolvefilter')),
						_Utils_Tuple2(
						'filter',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'signal',
									elm$json$Json$Encode$string(sig))
								]))),
						_Utils_Tuple2(
						'ignore',
						author$project$Vega$numSpec(bitmask))
					]));
	}
};
var author$project$Vega$vPropertyLabel = function (spec) {
	switch (spec) {
		case 0:
			return 'description';
		case 1:
			return 'background';
		case 13:
			return 'title';
		case 2:
			return 'width';
		case 5:
			return 'autosize';
		case 3:
			return 'height';
		case 4:
			return 'padding';
		case 6:
			return 'config';
		case 7:
			return 'signals';
		case 8:
			return 'data';
		case 9:
			return 'scales';
		case 10:
			return 'projections';
		case 11:
			return 'axes';
		case 12:
			return 'legends';
		case 15:
			return 'marks';
		case 16:
			return 'encode';
		default:
			return 'layout';
	}
};
var author$project$Vega$topMarkProperty = function (mProp) {
	switch (mProp.$) {
		case 0:
			var m = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string(
						author$project$Vega$markLabel(m)))
				]);
		case 1:
			var clip = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'clip',
					author$project$Vega$clipSpec(clip))
				]);
		case 2:
			var s = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'description',
					elm$json$Json$Encode$string(s))
				]);
		case 3:
			var eps = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'encode',
					elm$json$Json$Encode$object(
						A2(elm$core$List$map, author$project$Vega$encodingProperty, eps)))
				]);
		case 4:
			var src = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'from',
					elm$json$Json$Encode$object(
						A2(elm$core$List$map, author$project$Vega$sourceProperty, src)))
				]);
		case 5:
			var b = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'interactive',
					author$project$Vega$booSpec(b))
				]);
		case 6:
			var f = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'key',
					author$project$Vega$fieldSpec(f))
				]);
		case 7:
			var s = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'name',
					elm$json$Json$Encode$string(s))
				]);
		case 8:
			var triggers = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'on',
					A2(elm$json$Json$Encode$list, elm$core$Basics$identity, triggers))
				]);
		case 12:
			var s = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'role',
					elm$json$Json$Encode$string(s))
				]);
		case 9:
			var comp = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'sort',
					elm$json$Json$Encode$object(
						author$project$Vega$comparatorProperties(comp)))
				]);
		case 11:
			var trans = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'transform',
					A2(elm$json$Json$Encode$list, author$project$Vega$transformSpec, trans))
				]);
		case 13:
			var ss = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'style',
					A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, ss))
				]);
		case 14:
			var props = mProp.a;
			return A2(
				elm$core$List$map,
				function (_n1) {
					var vProp = _n1.a;
					var spec = _n1.b;
					return _Utils_Tuple2(
						author$project$Vega$vPropertyLabel(vProp),
						spec);
				},
				props);
		default:
			var n = mProp.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'zindex',
					author$project$Vega$numSpec(n))
				]);
	}
};
var author$project$Vega$mark = F2(
	function (m, mps) {
		return elm$core$List$cons(
			elm$json$Json$Encode$object(
				A2(
					elm$core$List$concatMap,
					author$project$Vega$topMarkProperty,
					A2(
						elm$core$List$cons,
						author$project$Vega$MType(m),
						mps))));
	});
var author$project$Vega$VMarks = 15;
var author$project$Vega$marks = function (axs) {
	return _Utils_Tuple2(
		15,
		A2(elm$json$Json$Encode$list, elm$core$Basics$identity, axs));
};
var author$project$Vega$SData = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$srData = author$project$Vega$SData;
var author$project$Vega$Str = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$str = author$project$Vega$Str;
var author$project$Vega$Text = 10;
var author$project$Vega$text = 10;
var author$project$Vega$toVega = function (spec) {
	return elm$json$Json$Encode$object(
		A2(
			elm$core$List$cons,
			_Utils_Tuple2(
				'$schema',
				elm$json$Json$Encode$string('https://vega.github.io/schema/vega/v4.0.json')),
			A2(
				elm$core$List$map,
				function (_n0) {
					var s = _n0.a;
					var v = _n0.b;
					return _Utils_Tuple2(
						author$project$Vega$vPropertyLabel(s),
						v);
				},
				spec)));
};
var author$project$Vega$VField = function (a) {
	return {$: 11, a: a};
};
var author$project$Vega$vField = author$project$Vega$VField;
var author$project$Vega$VStr = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$vStr = author$project$Vega$VStr;
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var author$project$HelloWorld$helloWorld = function () {
	var mk = A2(
		elm$core$Basics$composeL,
		author$project$Vega$marks,
		A2(
			author$project$Vega$mark,
			author$project$Vega$text,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('myData'))
						])),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enEnter(
							_List_fromArray(
								[
									author$project$Vega$maText(
									_List_fromArray(
										[
											author$project$Vega$vField(
											author$project$Vega$field('label'))
										]))
								]))
						]))
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A3(
				author$project$Vega$dataFromRows,
				'myData',
				_List_Nil,
				A2(
					author$project$Vega$dataRow,
					_List_fromArray(
						[
							_Utils_Tuple2(
							'label',
							author$project$Vega$vStr('Hello from Vega'))
						]),
					_List_Nil))
			]));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				ds,
				mk(_List_Nil)
			]));
}();
var author$project$Vega$combineSpecs = function (specs) {
	return elm$json$Json$Encode$object(specs);
};
var author$project$HelloWorld$mySpecs = author$project$Vega$combineSpecs(
	_List_fromArray(
		[
			_Utils_Tuple2('helloWorld', author$project$HelloWorld$helloWorld)
		]));
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$Platform$worker = _Platform_worker;
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$HelloWorld$main = elm$core$Platform$worker(
	{
		at: elm$core$Basics$always(
			_Utils_Tuple2(
				author$project$HelloWorld$mySpecs,
				author$project$HelloWorld$elmToJS(author$project$HelloWorld$mySpecs))),
		az: elm$core$Basics$always(elm$core$Platform$Sub$none),
		aB: F2(
			function (_n0, model) {
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			})
	});
_Platform_export({'HelloWorld':{'init':author$project$HelloWorld$main(
	elm$json$Json$Decode$succeed(0))(0)}});}(this));
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
var author$project$GalleryMulti$elmToJS = _Platform_outgoingPort('elmToJS', elm$core$Basics$identity);
var author$project$VegaLite$Interval = 2;
var author$project$VegaLite$Quantitative = 2;
var author$project$VegaLite$Temporal = 3;
var author$project$VegaLite$X = 0;
var author$project$VegaLite$Y = 1;
var author$project$VegaLite$Area = 0;
var author$project$VegaLite$VLMark = 10;
var author$project$VegaLite$markLabel = function (m) {
	switch (m) {
		case 0:
			return 'area';
		case 1:
			return 'bar';
		case 2:
			return 'boxplot';
		case 5:
			return 'circle';
		case 3:
			return 'errorband';
		case 4:
			return 'errorbar';
		case 7:
			return 'line';
		case 6:
			return 'geoshape';
		case 8:
			return 'point';
		case 9:
			return 'rect';
		case 10:
			return 'rule';
		case 11:
			return 'square';
		case 12:
			return 'text';
		case 13:
			return 'tick';
		default:
			return 'trail';
	}
};
var author$project$VegaLite$cursorLabel = function (cur) {
	switch (cur) {
		case 0:
			return 'auto';
		case 1:
			return 'default';
		case 2:
			return 'none';
		case 3:
			return 'context-menu';
		case 4:
			return 'help';
		case 5:
			return 'pointer';
		case 6:
			return 'progress';
		case 7:
			return 'wait';
		case 8:
			return 'cell';
		case 9:
			return 'crosshair';
		case 10:
			return 'text';
		case 11:
			return 'vertical-text';
		case 12:
			return 'alias';
		case 13:
			return 'copy';
		case 14:
			return 'move';
		case 15:
			return 'no-drop';
		case 16:
			return 'not-allowed';
		case 17:
			return 'all-scroll';
		case 18:
			return 'col-resize';
		case 19:
			return 'row-resize';
		case 20:
			return 'n-resize';
		case 21:
			return 'e-resize';
		case 22:
			return 's-resize';
		case 23:
			return 'w-resize';
		case 24:
			return 'ne-resize';
		case 25:
			return 'nw-resize';
		case 26:
			return 'se-resize';
		case 27:
			return 'sw-resize';
		case 28:
			return 'ew-resize';
		case 29:
			return 'ns-resize';
		case 30:
			return 'nesw-resize';
		case 31:
			return 'nwse-resize';
		case 32:
			return 'zoom-in';
		case 33:
			return 'zoom-out';
		case 34:
			return 'grab';
		default:
			return 'grabbing';
	}
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
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
var elm$core$List$cons = _List_cons;
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
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
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
var elm$core$Basics$eq = _Utils_equal;
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
var elm$core$Basics$append = _Utils_append;
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
var elm$json$Json$Encode$float = _Json_wrap;
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$VegaLite$extentSpec = function (ext) {
	switch (ext.$) {
		case 0:
			return elm$json$Json$Encode$string('ci');
		case 1:
			return elm$json$Json$Encode$string('stderr');
		case 2:
			return elm$json$Json$Encode$string('stdev');
		case 3:
			return elm$json$Json$Encode$string('iqr');
		case 4:
			return elm$json$Json$Encode$string('min-max');
		default:
			var sc = ext.a;
			return elm$json$Json$Encode$float(sc);
	}
};
var author$project$VegaLite$fontWeightSpec = function (w) {
	switch (w) {
		case 3:
			return elm$json$Json$Encode$string('normal');
		case 0:
			return elm$json$Json$Encode$string('bold');
		case 1:
			return elm$json$Json$Encode$string('bolder');
		case 2:
			return elm$json$Json$Encode$string('lighter');
		case 4:
			return elm$json$Json$Encode$float(100);
		case 5:
			return elm$json$Json$Encode$float(200);
		case 6:
			return elm$json$Json$Encode$float(300);
		case 7:
			return elm$json$Json$Encode$float(400);
		case 8:
			return elm$json$Json$Encode$float(500);
		case 9:
			return elm$json$Json$Encode$float(600);
		case 10:
			return elm$json$Json$Encode$float(700);
		case 11:
			return elm$json$Json$Encode$float(800);
		default:
			return elm$json$Json$Encode$float(900);
	}
};
var author$project$VegaLite$hAlignLabel = function (al) {
	switch (al) {
		case 1:
			return 'left';
		case 0:
			return 'center';
		default:
			return 'right';
	}
};
var author$project$VegaLite$markInterpolationLabel = function (interp) {
	switch (interp) {
		case 7:
			return 'linear';
		case 8:
			return 'linear-closed';
		case 12:
			return 'step';
		case 11:
			return 'step-before';
		case 10:
			return 'step-after';
		case 0:
			return 'basis';
		case 2:
			return 'basis-open';
		case 1:
			return 'basis-closed';
		case 4:
			return 'cardinal';
		case 6:
			return 'cardinal-open';
		case 5:
			return 'cardinal-closed';
		case 3:
			return 'bundle';
		default:
			return 'monotone';
	}
};
var author$project$VegaLite$markOrientationLabel = function (orient) {
	if (!orient) {
		return 'horizontal';
	} else {
		return 'vertical';
	}
};
var author$project$VegaLite$strokeCapLabel = function (cap) {
	switch (cap) {
		case 0:
			return 'butt';
		case 1:
			return 'round';
		default:
			return 'square';
	}
};
var author$project$VegaLite$strokeJoinLabel = function (jn) {
	switch (jn) {
		case 0:
			return 'miter';
		case 1:
			return 'round';
		default:
			return 'bevel';
	}
};
var author$project$VegaLite$symbolLabel = function (sym) {
	switch (sym.$) {
		case 0:
			return 'circle';
		case 1:
			return 'square';
		case 2:
			return 'cross';
		case 3:
			return 'diamond';
		case 4:
			return 'triangle-up';
		case 5:
			return 'triangle-down';
		default:
			var svgPath = sym.a;
			return svgPath;
	}
};
var author$project$VegaLite$ttContentLabel = function (ttContent) {
	if (!ttContent) {
		return 'encoding';
	} else {
		return 'data';
	}
};
var author$project$VegaLite$vAlignLabel = function (al) {
	switch (al) {
		case 0:
			return 'top';
		case 1:
			return 'middle';
		default:
			return 'bottom';
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
var elm$json$Json$Encode$bool = _Json_wrap;
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
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
var author$project$VegaLite$lineMarkerSpec = function (pm) {
	if (!pm.$) {
		return elm$json$Json$Encode$bool(false);
	} else {
		var mps = pm.a;
		return elm$json$Json$Encode$object(
			A2(elm$core$List$map, author$project$VegaLite$markProperty, mps));
	}
};
var author$project$VegaLite$markProperty = function (mProp) {
	switch (mProp.$) {
		case 16:
			var b = mProp.a;
			return _Utils_Tuple2(
				'filled',
				elm$json$Json$Encode$bool(b));
		case 6:
			var b = mProp.a;
			return _Utils_Tuple2(
				'clip',
				elm$json$Json$Encode$bool(b));
		case 7:
			var col = mProp.a;
			return _Utils_Tuple2(
				'color',
				elm$json$Json$Encode$string(col));
		case 8:
			var cur = mProp.a;
			return _Utils_Tuple2(
				'cursor',
				elm$json$Json$Encode$string(
					author$project$VegaLite$cursorLabel(cur)));
		case 14:
			var ext = mProp.a;
			return _Utils_Tuple2(
				'extent',
				author$project$VegaLite$extentSpec(ext));
		case 9:
			var s = mProp.a;
			return _Utils_Tuple2(
				'href',
				elm$json$Json$Encode$string(s));
		case 15:
			var col = mProp.a;
			return _Utils_Tuple2(
				'fill',
				elm$json$Json$Encode$string(col));
		case 32:
			var col = mProp.a;
			return _Utils_Tuple2(
				'stroke',
				elm$json$Json$Encode$string(col));
		case 33:
			var sc = mProp.a;
			return _Utils_Tuple2(
				'strokeCap',
				elm$json$Json$Encode$string(
					author$project$VegaLite$strokeCapLabel(sc)));
		case 36:
			var sj = mProp.a;
			return _Utils_Tuple2(
				'strokeJoin',
				elm$json$Json$Encode$string(
					author$project$VegaLite$strokeJoinLabel(sj)));
		case 37:
			var ml = mProp.a;
			return _Utils_Tuple2(
				'strokeMiterLimit',
				elm$json$Json$Encode$float(ml));
		case 24:
			var x = mProp.a;
			return _Utils_Tuple2(
				'opacity',
				elm$json$Json$Encode$float(x));
		case 17:
			var x = mProp.a;
			return _Utils_Tuple2(
				'fillOpacity',
				elm$json$Json$Encode$float(x));
		case 38:
			var x = mProp.a;
			return _Utils_Tuple2(
				'strokeOpacity',
				elm$json$Json$Encode$float(x));
		case 39:
			var x = mProp.a;
			return _Utils_Tuple2(
				'strokeWidth',
				elm$json$Json$Encode$float(x));
		case 34:
			var xs = mProp.a;
			return _Utils_Tuple2(
				'strokeDash',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, xs));
		case 35:
			var x = mProp.a;
			return _Utils_Tuple2(
				'strokeDashOffset',
				elm$json$Json$Encode$float(x));
		case 40:
			var styles = mProp.a;
			return _Utils_Tuple2(
				'style',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, styles));
		case 22:
			var interp = mProp.a;
			return _Utils_Tuple2(
				'interpolate',
				elm$json$Json$Encode$string(
					author$project$VegaLite$markInterpolationLabel(interp)));
		case 41:
			var x = mProp.a;
			return _Utils_Tuple2(
				'tension',
				elm$json$Json$Encode$float(x));
		case 25:
			var orient = mProp.a;
			return _Utils_Tuple2(
				'orient',
				elm$json$Json$Encode$string(
					author$project$VegaLite$markOrientationLabel(orient)));
		case 29:
			var sym = mProp.a;
			return _Utils_Tuple2(
				'shape',
				elm$json$Json$Encode$string(
					author$project$VegaLite$symbolLabel(sym)));
		case 31:
			var x = mProp.a;
			return _Utils_Tuple2(
				'size',
				elm$json$Json$Encode$float(x));
		case 1:
			var x = mProp.a;
			return _Utils_Tuple2(
				'angle',
				elm$json$Json$Encode$float(x));
		case 0:
			var al = mProp.a;
			return _Utils_Tuple2(
				'align',
				elm$json$Json$Encode$string(
					author$project$VegaLite$hAlignLabel(al)));
		case 3:
			var va = mProp.a;
			return _Utils_Tuple2(
				'baseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 12:
			var dx = mProp.a;
			return _Utils_Tuple2(
				'dx',
				elm$json$Json$Encode$float(dx));
		case 13:
			var dy = mProp.a;
			return _Utils_Tuple2(
				'dy',
				elm$json$Json$Encode$float(dy));
		case 18:
			var fnt = mProp.a;
			return _Utils_Tuple2(
				'font',
				elm$json$Json$Encode$string(fnt));
		case 19:
			var x = mProp.a;
			return _Utils_Tuple2(
				'fontSize',
				elm$json$Json$Encode$float(x));
		case 20:
			var fSty = mProp.a;
			return _Utils_Tuple2(
				'fontStyle',
				elm$json$Json$Encode$string(fSty));
		case 21:
			var w = mProp.a;
			return _Utils_Tuple2(
				'fontWeight',
				author$project$VegaLite$fontWeightSpec(w));
		case 27:
			var x = mProp.a;
			return _Utils_Tuple2(
				'radius',
				elm$json$Json$Encode$float(x));
		case 42:
			var txt = mProp.a;
			return _Utils_Tuple2(
				'text',
				elm$json$Json$Encode$string(txt));
		case 43:
			var x = mProp.a;
			return _Utils_Tuple2(
				'theta',
				elm$json$Json$Encode$float(x));
		case 4:
			var x = mProp.a;
			return _Utils_Tuple2(
				'binSpacing',
				elm$json$Json$Encode$float(x));
		case 10:
			var x = mProp.a;
			return _Utils_Tuple2(
				'continuousBandSize',
				elm$json$Json$Encode$float(x));
		case 11:
			var x = mProp.a;
			return _Utils_Tuple2(
				'discreteBandSize',
				elm$json$Json$Encode$float(x));
		case 30:
			var b = mProp.a;
			return _Utils_Tuple2(
				'shortTimeLabels',
				elm$json$Json$Encode$bool(b));
		case 2:
			var x = mProp.a;
			return _Utils_Tuple2(
				'bandSize',
				elm$json$Json$Encode$float(x));
		case 44:
			var x = mProp.a;
			return _Utils_Tuple2(
				'thickness',
				elm$json$Json$Encode$float(x));
		case 28:
			var props = mProp.a;
			return _Utils_Tuple2(
				'rule',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, props)));
		case 5:
			var props = mProp.a;
			return _Utils_Tuple2(
				'borders',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, props)));
		case 45:
			var props = mProp.a;
			return _Utils_Tuple2(
				'ticks',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, props)));
		case 46:
			var ttContent = mProp.a;
			return _Utils_Tuple2(
				'tooltip',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'content',
							elm$json$Json$Encode$string(
								author$project$VegaLite$ttContentLabel(ttContent)))
						])));
		case 26:
			var pm = mProp.a;
			return _Utils_Tuple2(
				'point',
				author$project$VegaLite$pointMarkerSpec(pm));
		case 23:
			var lm = mProp.a;
			return _Utils_Tuple2(
				'line',
				author$project$VegaLite$lineMarkerSpec(lm));
		case 47:
			var o = mProp.a;
			return _Utils_Tuple2(
				'xOffset',
				elm$json$Json$Encode$float(o));
		case 49:
			var o = mProp.a;
			return _Utils_Tuple2(
				'x2Offset',
				elm$json$Json$Encode$float(o));
		case 48:
			var o = mProp.a;
			return _Utils_Tuple2(
				'yOffset',
				elm$json$Json$Encode$float(o));
		default:
			var o = mProp.a;
			return _Utils_Tuple2(
				'y2Offset',
				elm$json$Json$Encode$float(o));
	}
};
var author$project$VegaLite$pointMarkerSpec = function (pm) {
	switch (pm.$) {
		case 0:
			return elm$json$Json$Encode$string('transparent');
		case 1:
			return elm$json$Json$Encode$bool(false);
		default:
			var mps = pm.a;
			return elm$json$Json$Encode$object(
				A2(elm$core$List$map, author$project$VegaLite$markProperty, mps));
	}
};
var author$project$VegaLite$mark = F2(
	function (m, mProps) {
		if (!mProps.b) {
			return _Utils_Tuple2(
				10,
				elm$json$Json$Encode$string(
					author$project$VegaLite$markLabel(m)));
		} else {
			return _Utils_Tuple2(
				10,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string(
								author$project$VegaLite$markLabel(m))),
						A2(elm$core$List$map, author$project$VegaLite$markProperty, mProps))));
		}
	});
var author$project$VegaLite$area = author$project$VegaLite$mark(0);
var author$project$VegaLite$vlPropertyLabel = function (spec) {
	switch (spec) {
		case 0:
			return 'name';
		case 1:
			return 'description';
		case 2:
			return 'title';
		case 3:
			return 'width';
		case 4:
			return 'height';
		case 6:
			return 'padding';
		case 5:
			return 'autosize';
		case 7:
			return 'background';
		case 8:
			return 'data';
		case 9:
			return 'datasets';
		case 12:
			return 'projection';
		case 10:
			return 'mark';
		case 11:
			return 'transform';
		case 13:
			return 'encoding';
		case 25:
			return 'config';
		case 26:
			return 'selection';
		case 15:
			return 'hconcat';
		case 16:
			return 'vconcat';
		case 14:
			return 'layer';
		case 17:
			return 'repeat';
		case 18:
			return 'facet';
		case 21:
			return 'spacing';
		case 22:
			return 'align';
		case 23:
			return 'bounds';
		case 24:
			return 'center';
		case 19:
			return 'spec';
		default:
			return 'resolve';
	}
};
var author$project$VegaLite$asSpec = function (specs) {
	return elm$json$Json$Encode$object(
		A2(
			elm$core$List$map,
			function (_n0) {
				var s = _n0.a;
				var v = _n0.b;
				return _Utils_Tuple2(
					author$project$VegaLite$vlPropertyLabel(s),
					v);
			},
			specs));
};
var author$project$VegaLite$AxFormat = function (a) {
	return {$: 5, a: a};
};
var author$project$VegaLite$axFormat = author$project$VegaLite$AxFormat;
var author$project$VegaLite$AxGrid = function (a) {
	return {$: 6, a: a};
};
var author$project$VegaLite$axGrid = author$project$VegaLite$AxGrid;
var author$project$VegaLite$AxTickCount = function (a) {
	return {$: 28, a: a};
};
var author$project$VegaLite$axTickCount = author$project$VegaLite$AxTickCount;
var author$project$VegaLite$AxTitle = function (a) {
	return {$: 37, a: a};
};
var author$project$VegaLite$axTitle = author$project$VegaLite$AxTitle;
var author$project$VegaLite$ChX = 0;
var author$project$VegaLite$chX = 0;
var author$project$VegaLite$VLData = 8;
var author$project$VegaLite$dataTypeSpec = function (dType) {
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
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$String$trim = _String_trim;
var elm$json$Json$Encode$null = _Json_encodeNull;
var author$project$VegaLite$formatProperty = function (fmt) {
	switch (fmt.$) {
		case 0:
			var propertyName = fmt.a;
			return (elm$core$String$trim(propertyName) === '') ? _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('json'))
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('json')),
					_Utils_Tuple2(
					'property',
					elm$json$Json$Encode$string(propertyName))
				]);
		case 1:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('csv'))
				]);
		case 2:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('tsv'))
				]);
		case 3:
			var delim = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('dsv')),
					_Utils_Tuple2(
					'delimiter',
					elm$json$Json$Encode$string(
						elm$core$String$fromChar(delim)))
				]);
		case 4:
			var objectSet = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('topojson')),
					_Utils_Tuple2(
					'feature',
					elm$json$Json$Encode$string(objectSet))
				]);
		case 5:
			var objectSet = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('topojson')),
					_Utils_Tuple2(
					'mesh',
					elm$json$Json$Encode$string(objectSet))
				]);
		default:
			var fmts = fmt.a;
			return _Utils_eq(fmts, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('parse', elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'parse',
					elm$json$Json$Encode$object(
						A2(
							elm$core$List$map,
							function (_n1) {
								var field = _n1.a;
								var fFormat = _n1.b;
								return _Utils_Tuple2(
									field,
									author$project$VegaLite$dataTypeSpec(fFormat));
							},
							fmts)))
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
var author$project$VegaLite$dataFromUrl = F2(
	function (url, fmts) {
		return _Utils_eq(fmts, _List_Nil) ? _Utils_Tuple2(
			8,
			elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'url',
						elm$json$Json$Encode$string(url))
					]))) : _Utils_Tuple2(
			8,
			elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'url',
						elm$json$Json$Encode$string(url)),
						_Utils_Tuple2(
						'format',
						elm$json$Json$Encode$object(
							A2(elm$core$List$concatMap, author$project$VegaLite$formatProperty, fmts)))
					])));
	});
var author$project$VegaLite$VLDescription = 1;
var author$project$VegaLite$description = function (s) {
	return _Utils_Tuple2(
		1,
		elm$json$Json$Encode$string(s));
};
var author$project$VegaLite$DSelection = function (a) {
	return {$: 3, a: a};
};
var author$project$VegaLite$doSelection = author$project$VegaLite$DSelection;
var author$project$VegaLite$VLEncoding = 13;
var author$project$VegaLite$encoding = function (channels) {
	return _Utils_Tuple2(
		13,
		elm$json$Json$Encode$object(channels));
};
var author$project$VegaLite$VLHeight = 4;
var author$project$VegaLite$height = function (h) {
	return _Utils_Tuple2(
		4,
		elm$json$Json$Encode$float(h));
};
var author$project$VegaLite$PAxis = function (a) {
	return {$: 11, a: a};
};
var author$project$VegaLite$pAxis = author$project$VegaLite$PAxis;
var author$project$VegaLite$PmType = function (a) {
	return {$: 4, a: a};
};
var author$project$VegaLite$pMType = author$project$VegaLite$PmType;
var author$project$VegaLite$PName = function (a) {
	return {$: 0, a: a};
};
var author$project$VegaLite$pName = author$project$VegaLite$PName;
var author$project$VegaLite$PScale = function (a) {
	return {$: 10, a: a};
};
var author$project$VegaLite$pScale = author$project$VegaLite$PScale;
var author$project$VegaLite$Latitude = 5;
var author$project$VegaLite$Latitude2 = 7;
var author$project$VegaLite$Longitude = 4;
var author$project$VegaLite$Longitude2 = 6;
var author$project$VegaLite$X2 = 2;
var author$project$VegaLite$Y2 = 3;
var author$project$VegaLite$arrangementLabel = function (arrng) {
	if (arrng === 1) {
		return 'row';
	} else {
		return 'column';
	}
};
var author$project$VegaLite$dayLabel = function (dayName) {
	switch (dayName) {
		case 0:
			return 'Mon';
		case 1:
			return 'Tue';
		case 2:
			return 'Wed';
		case 3:
			return 'Thu';
		case 4:
			return 'Fri';
		case 5:
			return 'Sat';
		default:
			return 'Sun';
	}
};
var author$project$VegaLite$monthNameLabel = function (mon) {
	switch (mon) {
		case 0:
			return 'Jan';
		case 1:
			return 'Feb';
		case 2:
			return 'Mar';
		case 3:
			return 'Apr';
		case 4:
			return 'May';
		case 5:
			return 'Jun';
		case 6:
			return 'Jul';
		case 7:
			return 'Aug';
		case 8:
			return 'Sep';
		case 9:
			return 'Oct';
		case 10:
			return 'Nov';
		default:
			return 'Dec';
	}
};
var elm$json$Json$Encode$int = _Json_wrap;
var author$project$VegaLite$dateTimeProperty = function (dtp) {
	switch (dtp.$) {
		case 0:
			var y = dtp.a;
			return _Utils_Tuple2(
				'year',
				elm$json$Json$Encode$int(y));
		case 1:
			var q = dtp.a;
			return _Utils_Tuple2(
				'quarter',
				elm$json$Json$Encode$int(q));
		case 2:
			var mon = dtp.a;
			return _Utils_Tuple2(
				'month',
				elm$json$Json$Encode$string(
					author$project$VegaLite$monthNameLabel(mon)));
		case 3:
			var d = dtp.a;
			return _Utils_Tuple2(
				'date',
				elm$json$Json$Encode$int(d));
		case 4:
			var d = dtp.a;
			return _Utils_Tuple2(
				'day',
				elm$json$Json$Encode$string(
					author$project$VegaLite$dayLabel(d)));
		case 5:
			var h = dtp.a;
			return _Utils_Tuple2(
				'hours',
				elm$json$Json$Encode$int(h));
		case 6:
			var m = dtp.a;
			return _Utils_Tuple2(
				'minutes',
				elm$json$Json$Encode$int(m));
		case 7:
			var s = dtp.a;
			return _Utils_Tuple2(
				'seconds',
				elm$json$Json$Encode$int(s));
		default:
			var ms = dtp.a;
			return _Utils_Tuple2(
				'milliseconds',
				elm$json$Json$Encode$int(ms));
	}
};
var author$project$VegaLite$overlapStrategyLabel = function (strat) {
	switch (strat) {
		case 0:
			return 'false';
		case 1:
			return 'parity';
		default:
			return 'greedy';
	}
};
var author$project$VegaLite$sideLabel = function (side) {
	switch (side) {
		case 0:
			return 'top';
		case 1:
			return 'bottom';
		case 2:
			return 'left';
		default:
			return 'right';
	}
};
var author$project$VegaLite$axisProperty = function (axisProp) {
	switch (axisProp.$) {
		case 0:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'bandPosition',
				elm$json$Json$Encode$float(n));
		case 5:
			var fmt = axisProp.a;
			return _Utils_Tuple2(
				'format',
				elm$json$Json$Encode$string(fmt));
		case 21:
			var b = axisProp.a;
			return _Utils_Tuple2(
				'labels',
				elm$json$Json$Encode$bool(b));
		case 7:
			var ha = axisProp.a;
			return _Utils_Tuple2(
				'labelAlign',
				elm$json$Json$Encode$string(
					author$project$VegaLite$hAlignLabel(ha)));
		case 9:
			var va = axisProp.a;
			return _Utils_Tuple2(
				'labelBaseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 10:
			var mn = axisProp.a;
			if (!mn.$) {
				var n = mn.a;
				return (n === 1) ? _Utils_Tuple2(
					'labelBound',
					elm$json$Json$Encode$bool(true)) : _Utils_Tuple2(
					'labelBound',
					elm$json$Json$Encode$float(n));
			} else {
				return _Utils_Tuple2(
					'labelBound',
					elm$json$Json$Encode$bool(false));
			}
		case 8:
			var angle = axisProp.a;
			return _Utils_Tuple2(
				'labelAngle',
				elm$json$Json$Encode$float(angle));
		case 11:
			var s = axisProp.a;
			return _Utils_Tuple2(
				'labelColor',
				elm$json$Json$Encode$string(s));
		case 12:
			var mn = axisProp.a;
			if (!mn.$) {
				var n = mn.a;
				return (n === 1) ? _Utils_Tuple2(
					'labelFlush',
					elm$json$Json$Encode$bool(true)) : _Utils_Tuple2(
					'labelFlush',
					elm$json$Json$Encode$float(n));
			} else {
				return _Utils_Tuple2(
					'labelFlush',
					elm$json$Json$Encode$bool(false));
			}
		case 13:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'labelFlushOffset',
				elm$json$Json$Encode$float(n));
		case 14:
			var s = axisProp.a;
			return _Utils_Tuple2(
				'labelFont',
				elm$json$Json$Encode$string(s));
		case 15:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'labelFontSize',
				elm$json$Json$Encode$float(n));
		case 16:
			var fw = axisProp.a;
			return _Utils_Tuple2(
				'labelFontWeight',
				author$project$VegaLite$fontWeightSpec(fw));
		case 17:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'labelLimit',
				elm$json$Json$Encode$float(n));
		case 18:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'labelOpacity',
				elm$json$Json$Encode$float(n));
		case 19:
			var strat = axisProp.a;
			return _Utils_Tuple2(
				'labelOverlap',
				elm$json$Json$Encode$string(
					author$project$VegaLite$overlapStrategyLabel(strat)));
		case 20:
			var pad = axisProp.a;
			return _Utils_Tuple2(
				'labelPadding',
				elm$json$Json$Encode$float(pad));
		case 1:
			var b = axisProp.a;
			return _Utils_Tuple2(
				'domain',
				elm$json$Json$Encode$bool(b));
		case 2:
			var c = axisProp.a;
			return _Utils_Tuple2(
				'domainColor',
				elm$json$Json$Encode$string(c));
		case 3:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'domainOpacity',
				elm$json$Json$Encode$float(n));
		case 4:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'domainWidth',
				elm$json$Json$Encode$float(n));
		case 6:
			var b = axisProp.a;
			return _Utils_Tuple2(
				'grid',
				elm$json$Json$Encode$bool(b));
		case 22:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'maxExtent',
				elm$json$Json$Encode$float(n));
		case 23:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'minExtent',
				elm$json$Json$Encode$float(n));
		case 25:
			var side = axisProp.a;
			return _Utils_Tuple2(
				'orient',
				elm$json$Json$Encode$string(
					author$project$VegaLite$sideLabel(side)));
		case 24:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'offset',
				elm$json$Json$Encode$float(n));
		case 26:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'position',
				elm$json$Json$Encode$float(n));
		case 52:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'zindex',
				elm$json$Json$Encode$int(n));
		case 33:
			var b = axisProp.a;
			return _Utils_Tuple2(
				'ticks',
				elm$json$Json$Encode$bool(b));
		case 27:
			var s = axisProp.a;
			return _Utils_Tuple2(
				'tickColor',
				elm$json$Json$Encode$string(s));
		case 28:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'tickCount',
				elm$json$Json$Encode$int(n));
		case 29:
			var b = axisProp.a;
			return _Utils_Tuple2(
				'tickExtra',
				elm$json$Json$Encode$bool(b));
		case 30:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'tickOffset',
				elm$json$Json$Encode$float(n));
		case 31:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'tickOpacity',
				elm$json$Json$Encode$float(n));
		case 32:
			var b = axisProp.a;
			return _Utils_Tuple2(
				'tickRound',
				elm$json$Json$Encode$bool(b));
		case 35:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'tickStep',
				elm$json$Json$Encode$float(n));
		case 34:
			var sz = axisProp.a;
			return _Utils_Tuple2(
				'tickSize',
				elm$json$Json$Encode$float(sz));
		case 36:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'tickWidth',
				elm$json$Json$Encode$float(n));
		case 50:
			var vals = axisProp.a;
			return _Utils_Tuple2(
				'values',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, vals));
		case 51:
			var dtss = axisProp.a;
			return _Utils_Tuple2(
				'values',
				A2(
					elm$json$Json$Encode$list,
					function (ds) {
						return elm$json$Json$Encode$object(
							A2(elm$core$List$map, author$project$VegaLite$dateTimeProperty, ds));
					},
					dtss));
		case 37:
			var s = axisProp.a;
			return _Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(s));
		case 38:
			var al = axisProp.a;
			return _Utils_Tuple2(
				'titleAlign',
				elm$json$Json$Encode$string(
					author$project$VegaLite$hAlignLabel(al)));
		case 39:
			var angle = axisProp.a;
			return _Utils_Tuple2(
				'titleAngle',
				elm$json$Json$Encode$float(angle));
		case 40:
			var va = axisProp.a;
			return _Utils_Tuple2(
				'titleBaseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 41:
			var s = axisProp.a;
			return _Utils_Tuple2(
				'titleColor',
				elm$json$Json$Encode$string(s));
		case 42:
			var s = axisProp.a;
			return _Utils_Tuple2(
				'titleFont',
				elm$json$Json$Encode$string(s));
		case 43:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'titleFontSize',
				elm$json$Json$Encode$float(n));
		case 44:
			var fw = axisProp.a;
			return _Utils_Tuple2(
				'titleFontWeight',
				author$project$VegaLite$fontWeightSpec(fw));
		case 45:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'titleLimit',
				elm$json$Json$Encode$float(n));
		case 46:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'titleOpacity',
				elm$json$Json$Encode$float(n));
		case 47:
			var pad = axisProp.a;
			return _Utils_Tuple2(
				'titlePadding',
				elm$json$Json$Encode$float(pad));
		case 48:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'titleX',
				elm$json$Json$Encode$float(n));
		default:
			var n = axisProp.a;
			return _Utils_Tuple2(
				'titleY',
				elm$json$Json$Encode$float(n));
	}
};
var author$project$VegaLite$binProperty = function (binProp) {
	switch (binProp.$) {
		case 3:
			var n = binProp.a;
			return _Utils_Tuple2(
				'maxbins',
				elm$json$Json$Encode$int(n));
		case 0:
			var x = binProp.a;
			return _Utils_Tuple2(
				'base',
				elm$json$Json$Encode$float(x));
		case 6:
			var x = binProp.a;
			return _Utils_Tuple2(
				'step',
				elm$json$Json$Encode$float(x));
		case 7:
			var xs = binProp.a;
			return _Utils_Tuple2(
				'steps',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, xs));
		case 4:
			var x = binProp.a;
			return _Utils_Tuple2(
				'minstep',
				elm$json$Json$Encode$float(x));
		case 1:
			var xs = binProp.a;
			return _Utils_Tuple2(
				'divide',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, xs));
		case 2:
			var mn = binProp.a;
			var mx = binProp.b;
			return _Utils_Tuple2(
				'extent',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$float,
					_List_fromArray(
						[mn, mx])));
		default:
			var b = binProp.a;
			return _Utils_Tuple2(
				'nice',
				elm$json$Json$Encode$bool(b));
	}
};
var author$project$VegaLite$bin = function (bProps) {
	return _Utils_eq(bProps, _List_Nil) ? _Utils_Tuple2(
		'bin',
		elm$json$Json$Encode$bool(true)) : _Utils_Tuple2(
		'bin',
		elm$json$Json$Encode$object(
			A2(elm$core$List$map, author$project$VegaLite$binProperty, bProps)));
};
var author$project$VegaLite$dataValuesSpecs = function (dvs) {
	switch (dvs.$) {
		case 2:
			var xs = dvs.a;
			return A2(elm$core$List$map, elm$json$Json$Encode$float, xs);
		case 3:
			var ss = dvs.a;
			return A2(elm$core$List$map, elm$json$Json$Encode$string, ss);
		case 1:
			var dtss = dvs.a;
			return A2(
				elm$core$List$map,
				function (ds) {
					return elm$json$Json$Encode$object(
						A2(elm$core$List$map, author$project$VegaLite$dateTimeProperty, ds));
				},
				dtss);
		default:
			var bs = dvs.a;
			return A2(elm$core$List$map, elm$json$Json$Encode$bool, bs);
	}
};
var author$project$VegaLite$dataValueSpec = function (val) {
	switch (val.$) {
		case 2:
			var x = val.a;
			return elm$json$Json$Encode$float(x);
		case 3:
			var s = val.a;
			return elm$json$Json$Encode$string(s);
		case 0:
			var b = val.a;
			return elm$json$Json$Encode$bool(b);
		default:
			var d = val.a;
			return elm$json$Json$Encode$object(
				A2(elm$core$List$map, author$project$VegaLite$dateTimeProperty, d));
	}
};
var author$project$VegaLite$imMethodLabel = function (method) {
	switch (method) {
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
var author$project$VegaLite$toList = elm$json$Json$Encode$list(elm$core$Basics$identity);
var author$project$VegaLite$imputeProperty = function (ip) {
	switch (ip.$) {
		case 0:
			if (!ip.a.$) {
				if (!ip.b.$) {
					var n1 = ip.a.a;
					var n2 = ip.b.a;
					return _Utils_Tuple2(
						'frame',
						A2(
							elm$json$Json$Encode$list,
							elm$json$Json$Encode$int,
							_List_fromArray(
								[n1, n2])));
				} else {
					var n1 = ip.a.a;
					var _n2 = ip.b;
					return _Utils_Tuple2(
						'frame',
						author$project$VegaLite$toList(
							_List_fromArray(
								[
									elm$json$Json$Encode$int(n1),
									elm$json$Json$Encode$null
								])));
				}
			} else {
				if (!ip.b.$) {
					var _n1 = ip.a;
					var n2 = ip.b.a;
					return _Utils_Tuple2(
						'frame',
						author$project$VegaLite$toList(
							_List_fromArray(
								[
									elm$json$Json$Encode$null,
									elm$json$Json$Encode$int(n2)
								])));
				} else {
					var _n3 = ip.a;
					var _n4 = ip.b;
					return _Utils_Tuple2(
						'frame',
						author$project$VegaLite$toList(
							_List_fromArray(
								[elm$json$Json$Encode$null, elm$json$Json$Encode$null])));
				}
			}
		case 1:
			var dVals = ip.a;
			return _Utils_Tuple2(
				'keyvals',
				author$project$VegaLite$toList(
					author$project$VegaLite$dataValuesSpecs(dVals)));
		case 2:
			var start = ip.a;
			var stop = ip.b;
			var step = ip.c;
			return _Utils_Tuple2(
				'keyvals',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'start',
							elm$json$Json$Encode$float(start)),
							_Utils_Tuple2(
							'stop',
							elm$json$Json$Encode$float(stop)),
							_Utils_Tuple2(
							'step',
							elm$json$Json$Encode$float(step))
						])));
		case 3:
			var method = ip.a;
			return _Utils_Tuple2(
				'method',
				elm$json$Json$Encode$string(
					author$project$VegaLite$imMethodLabel(method)));
		case 5:
			var dVal = ip.a;
			return _Utils_Tuple2(
				'value',
				author$project$VegaLite$dataValueSpec(dVal));
		default:
			return _Utils_Tuple2('groupby', elm$json$Json$Encode$null);
	}
};
var author$project$VegaLite$measurementLabel = function (mType) {
	switch (mType) {
		case 0:
			return 'nominal';
		case 1:
			return 'ordinal';
		case 2:
			return 'quantitative';
		case 3:
			return 'temporal';
		default:
			return 'geojson';
	}
};
var author$project$VegaLite$operationLabel = function (op) {
	switch (op) {
		case 0:
			return 'argmax';
		case 1:
			return 'argmin';
		case 4:
			return 'count';
		case 2:
			return 'ci0';
		case 3:
			return 'ci1';
		case 5:
			return 'distinct';
		case 6:
			return 'max';
		case 7:
			return 'mean';
		case 8:
			return 'median';
		case 9:
			return 'min';
		case 10:
			return 'missing';
		case 11:
			return 'q1';
		case 12:
			return 'q3';
		case 14:
			return 'stdev';
		case 15:
			return 'stdevp';
		case 16:
			return 'sum';
		case 13:
			return 'stderr';
		case 17:
			return 'valid';
		case 18:
			return 'variance';
		default:
			return 'variancep';
	}
};
var author$project$VegaLite$cInterpolateSpec = function (iType) {
	switch (iType.$) {
		case 7:
			var gamma = iType.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('rgb')),
						_Utils_Tuple2(
						'gamma',
						elm$json$Json$Encode$float(gamma))
					]));
		case 4:
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('hsl'))
					]));
		case 5:
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('hsl-long'))
					]));
		case 6:
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('lab'))
					]));
		case 2:
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('hcl'))
					]));
		case 3:
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('hcl-long'))
					]));
		case 0:
			var gamma = iType.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('cubehelix')),
						_Utils_Tuple2(
						'gamma',
						elm$json$Json$Encode$float(gamma))
					]));
		default:
			var gamma = iType.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('cubehelix-long')),
						_Utils_Tuple2(
						'gamma',
						elm$json$Json$Encode$float(gamma))
					]));
	}
};
var author$project$VegaLite$scaleDomainSpec = function (sdType) {
	switch (sdType.$) {
		case 0:
			var ns = sdType.a;
			return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, ns);
		case 2:
			var ds = sdType.a;
			return A2(
				elm$json$Json$Encode$list,
				function (d) {
					return elm$json$Json$Encode$object(
						A2(elm$core$List$map, author$project$VegaLite$dateTimeProperty, d));
				},
				ds);
		case 1:
			var cats = sdType.a;
			return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, cats);
		case 3:
			var selName = sdType.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'selection',
						elm$json$Json$Encode$string(selName))
					]));
		default:
			return elm$json$Json$Encode$string('unaggregated');
	}
};
var author$project$VegaLite$scaleLabel = function (sc) {
	switch (sc) {
		case 0:
			return 'linear';
		case 1:
			return 'pow';
		case 2:
			return 'sqrt';
		case 3:
			return 'log';
		case 4:
			return 'time';
		case 5:
			return 'utc';
		case 6:
			return 'sequential';
		case 7:
			return 'ordinal';
		case 8:
			return 'band';
		case 9:
			return 'point';
		case 10:
			return 'bin-linear';
		case 11:
			return 'bin-ordinal';
		case 12:
			return 'quantile';
		case 13:
			return 'quantize';
		default:
			return 'threshold';
	}
};
var author$project$VegaLite$timeUnitLabel = function (tu) {
	switch (tu.$) {
		case 0:
			return 'year';
		case 1:
			return 'yearquarter';
		case 2:
			return 'yearquartermonth';
		case 3:
			return 'yearmonth';
		case 4:
			return 'yearmonthdate';
		case 5:
			return 'yearmonthdatehours';
		case 6:
			return 'yearmonthdatehoursminutes';
		case 7:
			return 'yearmonthdatehoursminutesseconds';
		case 8:
			return 'quarter';
		case 9:
			return 'quartermonth';
		case 10:
			return 'month';
		case 11:
			return 'monthdate';
		case 12:
			return 'date';
		case 13:
			return 'day';
		case 14:
			return 'hours';
		case 15:
			return 'hoursminutes';
		case 16:
			return 'hoursminutesseconds';
		case 17:
			return 'minutes';
		case 18:
			return 'minutesseconds';
		case 19:
			return 'seconds';
		case 20:
			return 'secondsmilliseconds';
		case 21:
			return 'milliseconds';
		default:
			var timeUnit = tu.a;
			return 'utc' + author$project$VegaLite$timeUnitLabel(timeUnit);
	}
};
var author$project$VegaLite$scaleNiceSpec = function (ni) {
	switch (ni.$) {
		case 0:
			return elm$json$Json$Encode$string('millisecond');
		case 1:
			return elm$json$Json$Encode$string('second');
		case 2:
			return elm$json$Json$Encode$string('minute');
		case 3:
			return elm$json$Json$Encode$string('hour');
		case 4:
			return elm$json$Json$Encode$string('day');
		case 5:
			return elm$json$Json$Encode$string('week');
		case 6:
			return elm$json$Json$Encode$string('month');
		case 7:
			return elm$json$Json$Encode$string('year');
		case 10:
			var tu = ni.a;
			var step = ni.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'interval',
						elm$json$Json$Encode$string(
							author$project$VegaLite$timeUnitLabel(tu))),
						_Utils_Tuple2(
						'step',
						elm$json$Json$Encode$int(step))
					]));
		case 8:
			return elm$json$Json$Encode$bool(true);
		case 9:
			return elm$json$Json$Encode$bool(false);
		default:
			var n = ni.a;
			return elm$json$Json$Encode$int(n);
	}
};
var author$project$VegaLite$schemeProperty = F2(
	function (schName, extent) {
		if (!extent.b) {
			return _Utils_Tuple2(
				'scheme',
				elm$json$Json$Encode$string(schName));
		} else {
			if (!extent.b.b) {
				var n = extent.a;
				return _Utils_Tuple2(
					'scheme',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'name',
								elm$json$Json$Encode$string(schName)),
								_Utils_Tuple2(
								'count',
								elm$json$Json$Encode$float(n))
							])));
			} else {
				if (!extent.b.b.b) {
					var mn = extent.a;
					var _n1 = extent.b;
					var mx = _n1.a;
					return _Utils_Tuple2(
						'scheme',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'name',
									elm$json$Json$Encode$string(schName)),
									_Utils_Tuple2(
									'extent',
									A2(
										elm$json$Json$Encode$list,
										elm$json$Json$Encode$float,
										_List_fromArray(
											[mn, mx])))
								])));
				} else {
					return _Utils_Tuple2(
						'scheme',
						elm$json$Json$Encode$string(schName));
				}
			}
		}
	});
var author$project$VegaLite$scaleProperty = function (scaleProp) {
	switch (scaleProp.$) {
		case 0:
			var sType = scaleProp.a;
			return _Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string(
					author$project$VegaLite$scaleLabel(sType)));
		case 1:
			var sdType = scaleProp.a;
			return _Utils_Tuple2(
				'domain',
				author$project$VegaLite$scaleDomainSpec(sdType));
		case 2:
			var range = scaleProp.a;
			switch (range.$) {
				case 0:
					var xs = range.a;
					return _Utils_Tuple2(
						'range',
						A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, xs));
				case 1:
					var ss = range.a;
					return _Utils_Tuple2(
						'range',
						A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, ss));
				default:
					var s = range.a;
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$string(s));
			}
		case 3:
			var schName = scaleProp.a;
			var extent = scaleProp.b;
			return A2(author$project$VegaLite$schemeProperty, schName, extent);
		case 4:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'padding',
				elm$json$Json$Encode$float(x));
		case 5:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'paddingInner',
				elm$json$Json$Encode$float(x));
		case 6:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'paddingOuter',
				elm$json$Json$Encode$float(x));
		case 7:
			var numOrNull = scaleProp.a;
			if (!numOrNull.$) {
				var x = numOrNull.a;
				return _Utils_Tuple2(
					'rangeStep',
					elm$json$Json$Encode$float(x));
			} else {
				return _Utils_Tuple2('rangeStep', elm$json$Json$Encode$null);
			}
		case 8:
			var b = scaleProp.a;
			return _Utils_Tuple2(
				'round',
				elm$json$Json$Encode$bool(b));
		case 9:
			var b = scaleProp.a;
			return _Utils_Tuple2(
				'clamp',
				elm$json$Json$Encode$bool(b));
		case 10:
			var interp = scaleProp.a;
			return _Utils_Tuple2(
				'interpolate',
				author$project$VegaLite$cInterpolateSpec(interp));
		case 11:
			var ni = scaleProp.a;
			return _Utils_Tuple2(
				'nice',
				author$project$VegaLite$scaleNiceSpec(ni));
		case 12:
			var b = scaleProp.a;
			return _Utils_Tuple2(
				'zero',
				elm$json$Json$Encode$bool(b));
		default:
			var b = scaleProp.a;
			return _Utils_Tuple2(
				'reverse',
				elm$json$Json$Encode$bool(b));
	}
};
var author$project$VegaLite$sortProperty = function (sp) {
	switch (sp.$) {
		case 0:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'order',
					elm$json$Json$Encode$string('ascending'))
				]);
		case 1:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'order',
					elm$json$Json$Encode$string('descending'))
				]);
		case 4:
			var field = sp.a;
			var op = sp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					elm$json$Json$Encode$string(field)),
					_Utils_Tuple2(
					'op',
					elm$json$Json$Encode$string(
						author$project$VegaLite$operationLabel(op)))
				]);
		case 3:
			var arr = sp.a;
			var op = sp.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								elm$json$Json$Encode$string(
									author$project$VegaLite$arrangementLabel(arr)))
							]))),
					_Utils_Tuple2(
					'op',
					elm$json$Json$Encode$string(
						author$project$VegaLite$operationLabel(op)))
				]);
		default:
			var dvs = sp.a;
			return _List_Nil;
	}
};
var author$project$VegaLite$stackOffsetSpec = function (sp) {
	switch (sp) {
		case 0:
			return elm$json$Json$Encode$string('zero');
		case 1:
			return elm$json$Json$Encode$string('normalize');
		case 2:
			return elm$json$Json$Encode$string('center');
		default:
			return elm$json$Json$Encode$null;
	}
};
var author$project$VegaLite$stackOffset = function (offset) {
	return _Utils_Tuple2(
		'stack',
		author$project$VegaLite$stackOffsetSpec(offset));
};
var author$project$VegaLite$positionChannelProperty = function (pDef) {
	switch (pDef.$) {
		case 0:
			var s = pDef.a;
			return _Utils_Tuple2(
				'field',
				elm$json$Json$Encode$string(s));
		case 4:
			var measure = pDef.a;
			return _Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string(
					author$project$VegaLite$measurementLabel(measure)));
		case 5:
			var bps = pDef.a;
			return author$project$VegaLite$bin(bps);
		case 6:
			return _Utils_Tuple2(
				'bin',
				elm$json$Json$Encode$string('binned'));
		case 9:
			var op = pDef.a;
			return _Utils_Tuple2(
				'aggregate',
				elm$json$Json$Encode$string(
					author$project$VegaLite$operationLabel(op)));
		case 7:
			var tu = pDef.a;
			return _Utils_Tuple2(
				'timeUnit',
				elm$json$Json$Encode$string(
					author$project$VegaLite$timeUnitLabel(tu)));
		case 8:
			var t = pDef.a;
			return _Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(t));
		case 12:
			var sps = pDef.a;
			_n1$4:
			while (true) {
				if (!sps.b) {
					return _Utils_Tuple2('sort', elm$json$Json$Encode$null);
				} else {
					if (!sps.b.b) {
						switch (sps.a.$) {
							case 0:
								var _n2 = sps.a;
								return _Utils_Tuple2(
									'sort',
									elm$json$Json$Encode$string('ascending'));
							case 1:
								var _n3 = sps.a;
								return _Utils_Tuple2(
									'sort',
									elm$json$Json$Encode$string('descending'));
							case 2:
								var dvs = sps.a.a;
								return _Utils_Tuple2(
									'sort',
									author$project$VegaLite$toList(
										author$project$VegaLite$dataValuesSpecs(dvs)));
							default:
								break _n1$4;
						}
					} else {
						break _n1$4;
					}
				}
			}
			return _Utils_Tuple2(
				'sort',
				elm$json$Json$Encode$object(
					A2(elm$core$List$concatMap, author$project$VegaLite$sortProperty, sps)));
		case 10:
			var sps = pDef.a;
			return _Utils_eq(sps, _List_Nil) ? _Utils_Tuple2('scale', elm$json$Json$Encode$null) : _Utils_Tuple2(
				'scale',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$scaleProperty, sps)));
		case 11:
			var aps = pDef.a;
			return _Utils_eq(aps, _List_Nil) ? _Utils_Tuple2('axis', elm$json$Json$Encode$null) : _Utils_Tuple2(
				'axis',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$axisProperty, aps)));
		case 13:
			var so = pDef.a;
			return author$project$VegaLite$stackOffset(so);
		case 3:
			var arr = pDef.a;
			return _Utils_Tuple2(
				'field',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'repeat',
							elm$json$Json$Encode$string(
								author$project$VegaLite$arrangementLabel(arr)))
						])));
		case 1:
			return _Utils_Tuple2(
				'value',
				elm$json$Json$Encode$string('width'));
		case 2:
			return _Utils_Tuple2(
				'value',
				elm$json$Json$Encode$string('height'));
		default:
			var ips = pDef.a;
			return _Utils_Tuple2(
				'impute',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$imputeProperty, ips)));
	}
};
var author$project$VegaLite$positionLabel = function (pChannel) {
	switch (pChannel) {
		case 0:
			return 'x';
		case 1:
			return 'y';
		case 2:
			return 'x2';
		case 3:
			return 'y2';
		case 4:
			return 'longitude';
		case 5:
			return 'latitude';
		case 6:
			return 'longitude2';
		default:
			return 'latitude2';
	}
};
var author$project$VegaLite$position = F2(
	function (pos, pDefs) {
		var isNotPmType = function (pp) {
			if (pp.$ === 4) {
				var t = pp.a;
				return false;
			} else {
				return true;
			}
		};
		switch (pos) {
			case 0:
				return elm$core$List$cons(
					_Utils_Tuple2(
						author$project$VegaLite$positionLabel(0),
						elm$json$Json$Encode$object(
							A2(elm$core$List$map, author$project$VegaLite$positionChannelProperty, pDefs))));
			case 1:
				return elm$core$List$cons(
					_Utils_Tuple2(
						author$project$VegaLite$positionLabel(1),
						elm$json$Json$Encode$object(
							A2(elm$core$List$map, author$project$VegaLite$positionChannelProperty, pDefs))));
			case 2:
				return elm$core$List$cons(
					_Utils_Tuple2(
						author$project$VegaLite$positionLabel(2),
						elm$json$Json$Encode$object(
							A2(elm$core$List$map, author$project$VegaLite$positionChannelProperty, pDefs))));
			case 3:
				return elm$core$List$cons(
					_Utils_Tuple2(
						author$project$VegaLite$positionLabel(3),
						elm$json$Json$Encode$object(
							A2(elm$core$List$map, author$project$VegaLite$positionChannelProperty, pDefs))));
			case 4:
				return elm$core$List$cons(
					_Utils_Tuple2(
						author$project$VegaLite$positionLabel(4),
						elm$json$Json$Encode$object(
							A2(elm$core$List$map, author$project$VegaLite$positionChannelProperty, pDefs))));
			case 5:
				return elm$core$List$cons(
					_Utils_Tuple2(
						author$project$VegaLite$positionLabel(5),
						elm$json$Json$Encode$object(
							A2(elm$core$List$map, author$project$VegaLite$positionChannelProperty, pDefs))));
			case 6:
				return elm$core$List$cons(
					_Utils_Tuple2(
						author$project$VegaLite$positionLabel(6),
						elm$json$Json$Encode$object(
							A2(elm$core$List$map, author$project$VegaLite$positionChannelProperty, pDefs))));
			default:
				return elm$core$List$cons(
					_Utils_Tuple2(
						author$project$VegaLite$positionLabel(7),
						elm$json$Json$Encode$object(
							A2(elm$core$List$map, author$project$VegaLite$positionChannelProperty, pDefs))));
		}
	});
var author$project$VegaLite$SDomain = function (a) {
	return {$: 1, a: a};
};
var author$project$VegaLite$scDomain = author$project$VegaLite$SDomain;
var author$project$VegaLite$Encodings = function (a) {
	return {$: 6, a: a};
};
var author$project$VegaLite$seEncodings = author$project$VegaLite$Encodings;
var author$project$VegaLite$selectionLabel = function (seType) {
	switch (seType) {
		case 0:
			return 'single';
		case 1:
			return 'multi';
		default:
			return 'interval';
	}
};
var author$project$VegaLite$inputProperty = function (prop) {
	switch (prop.$) {
		case 3:
			var x = prop.a;
			return _Utils_Tuple2(
				'min',
				elm$json$Json$Encode$float(x));
		case 4:
			var x = prop.a;
			return _Utils_Tuple2(
				'max',
				elm$json$Json$Encode$float(x));
		case 6:
			var x = prop.a;
			return _Utils_Tuple2(
				'step',
				elm$json$Json$Encode$float(x));
		case 0:
			var x = prop.a;
			return _Utils_Tuple2(
				'debounce',
				elm$json$Json$Encode$float(x));
		case 5:
			var s = prop.a;
			return _Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(s));
		case 2:
			var opts = prop.a;
			return _Utils_Tuple2(
				'options',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, opts));
		case 7:
			var el = prop.a;
			return _Utils_Tuple2(
				'placeholder',
				elm$json$Json$Encode$string(el));
		default:
			var el = prop.a;
			return _Utils_Tuple2(
				'element',
				elm$json$Json$Encode$string(el));
	}
};
var author$project$VegaLite$bindingSpec = function (bnd) {
	switch (bnd.$) {
		case 0:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('range')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 1:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('checkbox')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 2:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('radio')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 3:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('select')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 4:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('text')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 5:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('number')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 6:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('date')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 7:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('time')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 8:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('month')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 9:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('week')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 10:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('datetimelocal')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		case 11:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('tel')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
		default:
			var label = bnd.a;
			var props = bnd.b;
			return _Utils_Tuple2(
				label,
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string('color')),
						A2(elm$core$List$map, author$project$VegaLite$inputProperty, props))));
	}
};
var author$project$VegaLite$channelLabel = function (ch) {
	switch (ch) {
		case 0:
			return 'x';
		case 1:
			return 'y';
		case 2:
			return 'x2';
		case 3:
			return 'y2';
		case 4:
			return 'color';
		case 5:
			return 'opacity';
		case 6:
			return 'shape';
		default:
			return 'size';
	}
};
var author$project$VegaLite$selectionMarkProperty = function (markProp) {
	switch (markProp.$) {
		case 0:
			var colour = markProp.a;
			return _Utils_Tuple2(
				'fill',
				elm$json$Json$Encode$string(colour));
		case 1:
			var x = markProp.a;
			return _Utils_Tuple2(
				'fillOpacity',
				elm$json$Json$Encode$float(x));
		case 2:
			var colour = markProp.a;
			return _Utils_Tuple2(
				'stroke',
				elm$json$Json$Encode$string(colour));
		case 3:
			var x = markProp.a;
			return _Utils_Tuple2(
				'strokeOpacity',
				elm$json$Json$Encode$float(x));
		case 4:
			var x = markProp.a;
			return _Utils_Tuple2(
				'strokeWidth',
				elm$json$Json$Encode$float(x));
		case 5:
			var xs = markProp.a;
			return _Utils_Tuple2(
				'strokeDash',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, xs));
		default:
			var x = markProp.a;
			return _Utils_Tuple2(
				'strokeDashOffset',
				elm$json$Json$Encode$float(x));
	}
};
var author$project$VegaLite$selectionResolutionLabel = function (res) {
	switch (res) {
		case 0:
			return 'global';
		case 1:
			return 'union';
		default:
			return 'intersect';
	}
};
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var author$project$VegaLite$selectionProperty = function (selProp) {
	switch (selProp.$) {
		case 5:
			var fNames = selProp.a;
			return _Utils_Tuple2(
				'fields',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, fNames));
		case 6:
			var channels = selProp.a;
			return _Utils_Tuple2(
				'encodings',
				A2(
					elm$json$Json$Encode$list,
					A2(elm$core$Basics$composeL, elm$json$Json$Encode$string, author$project$VegaLite$channelLabel),
					channels));
		case 2:
			var e = selProp.a;
			return _Utils_Tuple2(
				'on',
				elm$json$Json$Encode$string(e));
		case 0:
			return _Utils_Tuple2(
				'empty',
				elm$json$Json$Encode$string('none'));
		case 7:
			var res = selProp.a;
			return _Utils_Tuple2(
				'resolve',
				elm$json$Json$Encode$string(
					author$project$VegaLite$selectionResolutionLabel(res)));
		case 8:
			var markProps = selProp.a;
			return _Utils_Tuple2(
				'mark',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$selectionMarkProperty, markProps)));
		case 1:
			return _Utils_Tuple2(
				'bind',
				elm$json$Json$Encode$string('scales'));
		case 9:
			var binds = selProp.a;
			return _Utils_Tuple2(
				'bind',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$bindingSpec, binds)));
		case 10:
			var b = selProp.a;
			return _Utils_Tuple2(
				'nearest',
				elm$json$Json$Encode$bool(b));
		case 11:
			var ex = selProp.a;
			return _Utils_Tuple2(
				'toggle',
				elm$json$Json$Encode$string(ex));
		case 3:
			var e = selProp.a;
			return (e === '') ? _Utils_Tuple2(
				'translate',
				elm$json$Json$Encode$bool(false)) : _Utils_Tuple2(
				'translate',
				elm$json$Json$Encode$string(e));
		default:
			var e = selProp.a;
			return (e === '') ? _Utils_Tuple2(
				'zoom',
				elm$json$Json$Encode$bool(false)) : _Utils_Tuple2(
				'zoom',
				elm$json$Json$Encode$string(e));
	}
};
var author$project$VegaLite$select = F3(
	function (selName, sType, options) {
		var selProps = A2(
			elm$core$List$cons,
			_Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string(
					author$project$VegaLite$selectionLabel(sType))),
			A2(elm$core$List$map, author$project$VegaLite$selectionProperty, options));
		return elm$core$List$cons(
			_Utils_Tuple2(
				selName,
				elm$json$Json$Encode$object(selProps)));
	});
var author$project$VegaLite$VLSelection = 26;
var author$project$VegaLite$selection = function (sels) {
	return _Utils_Tuple2(
		26,
		elm$json$Json$Encode$object(sels));
};
var author$project$VegaLite$toVegaLite = function (spec) {
	return elm$json$Json$Encode$object(
		A2(
			elm$core$List$cons,
			_Utils_Tuple2(
				'$schema',
				elm$json$Json$Encode$string('https://vega.github.io/schema/vega-lite/v3.json')),
			A2(
				elm$core$List$map,
				function (_n0) {
					var s = _n0.a;
					var v = _n0.b;
					return _Utils_Tuple2(
						author$project$VegaLite$vlPropertyLabel(s),
						v);
				},
				spec)));
};
var author$project$VegaLite$VLVConcat = 16;
var author$project$VegaLite$vConcat = function (specs) {
	return _Utils_Tuple2(
		16,
		author$project$VegaLite$toList(specs));
};
var author$project$VegaLite$VLWidth = 3;
var author$project$VegaLite$width = function (w) {
	return _Utils_Tuple2(
		3,
		elm$json$Json$Encode$float(w));
};
var author$project$GalleryMulti$multi1 = function () {
	var sel = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$selection,
		A3(
			author$project$VegaLite$select,
			'myBrush',
			2,
			_List_fromArray(
				[
					author$project$VegaLite$seEncodings(
					_List_fromArray(
						[author$project$VegaLite$chX]))
				])));
	var enc2 = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$VegaLite$encoding,
			A2(
				author$project$VegaLite$position,
				0,
				_List_fromArray(
					[
						author$project$VegaLite$pName('date'),
						author$project$VegaLite$pMType(3),
						author$project$VegaLite$pAxis(
						_List_fromArray(
							[
								author$project$VegaLite$axFormat('%Y')
							]))
					]))),
		A2(
			author$project$VegaLite$position,
			1,
			_List_fromArray(
				[
					author$project$VegaLite$pName('price'),
					author$project$VegaLite$pMType(2),
					author$project$VegaLite$pAxis(
					_List_fromArray(
						[
							author$project$VegaLite$axTickCount(3),
							author$project$VegaLite$axGrid(false)
						]))
				])));
	var spec2 = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				author$project$VegaLite$width(480),
				author$project$VegaLite$height(60),
				sel(_List_Nil),
				author$project$VegaLite$area(_List_Nil),
				enc2(_List_Nil)
			]));
	var enc1 = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$VegaLite$encoding,
			A2(
				author$project$VegaLite$position,
				0,
				_List_fromArray(
					[
						author$project$VegaLite$pName('date'),
						author$project$VegaLite$pMType(3),
						author$project$VegaLite$pScale(
						_List_fromArray(
							[
								author$project$VegaLite$scDomain(
								author$project$VegaLite$doSelection('myBrush'))
							])),
						author$project$VegaLite$pAxis(
						_List_fromArray(
							[
								author$project$VegaLite$axTitle('')
							]))
					]))),
		A2(
			author$project$VegaLite$position,
			1,
			_List_fromArray(
				[
					author$project$VegaLite$pName('price'),
					author$project$VegaLite$pMType(2)
				])));
	var spec1 = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				author$project$VegaLite$width(500),
				author$project$VegaLite$area(_List_Nil),
				enc1(_List_Nil)
			]));
	var des = author$project$VegaLite$description('Overview and detail.');
	return author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				des,
				A2(author$project$VegaLite$dataFromUrl, 'https://vega.github.io/vega-lite/data/sp500.csv', _List_Nil),
				author$project$VegaLite$vConcat(
				_List_fromArray(
					[spec1, spec2]))
			]));
}();
var author$project$VegaLite$Column = 0;
var author$project$VegaLite$Bar = 1;
var author$project$VegaLite$bar = author$project$VegaLite$mark(1);
var author$project$VegaLite$MaxBins = function (a) {
	return {$: 3, a: a};
};
var author$project$VegaLite$biMaxBins = author$project$VegaLite$MaxBins;
var author$project$VegaLite$calculateAs = F2(
	function (ex, label) {
		return elm$core$List$cons(
			_Utils_Tuple2(
				'calculate',
				author$project$VegaLite$toList(
					_List_fromArray(
						[
							elm$json$Json$Encode$string(ex),
							elm$json$Json$Encode$string(label)
						]))));
	});
var author$project$VegaLite$booleanOpSpec = function (bo) {
	switch (bo.$) {
		case 0:
			var ex = bo.a;
			return elm$json$Json$Encode$string(ex);
		case 2:
			var selName = bo.a;
			return elm$json$Json$Encode$string(selName);
		case 1:
			var sel = bo.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'selection',
						elm$json$Json$Encode$string(sel))
					]));
		case 3:
			var operand1 = bo.a;
			var operand2 = bo.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'and',
						A2(
							elm$json$Json$Encode$list,
							author$project$VegaLite$booleanOpSpec,
							_List_fromArray(
								[operand1, operand2])))
					]));
		case 4:
			var operand1 = bo.a;
			var operand2 = bo.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'or',
						A2(
							elm$json$Json$Encode$list,
							author$project$VegaLite$booleanOpSpec,
							_List_fromArray(
								[operand1, operand2])))
					]));
		default:
			var operand = bo.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'not',
						author$project$VegaLite$booleanOpSpec(operand))
					]));
	}
};
var author$project$VegaLite$compositionAlignmentSpec = function (ca) {
	switch (ca) {
		case 0:
			return elm$json$Json$Encode$string('none');
		case 1:
			return elm$json$Json$Encode$string('each');
		default:
			return elm$json$Json$Encode$string('all');
	}
};
var author$project$VegaLite$legendOrientLabel = function (orient) {
	switch (orient) {
		case 2:
			return 'left';
		case 0:
			return 'bottom-left';
		case 1:
			return 'bottom-right';
		case 4:
			return 'right';
		case 5:
			return 'top-left';
		case 6:
			return 'top-right';
		default:
			return 'none';
	}
};
var author$project$VegaLite$legendProperty = function (legendProp) {
	switch (legendProp.$) {
		case 0:
			var h = legendProp.a;
			return _Utils_Tuple2(
				'clipHeight',
				elm$json$Json$Encode$float(h));
		case 1:
			var n = legendProp.a;
			return _Utils_Tuple2(
				'columnPadding',
				elm$json$Json$Encode$float(n));
		case 23:
			var n = legendProp.a;
			return _Utils_Tuple2(
				'rowPadding',
				elm$json$Json$Encode$float(n));
		case 2:
			var n = legendProp.a;
			return _Utils_Tuple2(
				'columns',
				elm$json$Json$Encode$float(n));
		case 3:
			var r = legendProp.a;
			return _Utils_Tuple2(
				'cornerRadius',
				elm$json$Json$Encode$float(r));
		case 5:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'fillColor',
				elm$json$Json$Encode$string(s));
		case 4:
			var d = legendProp.a;
			return _Utils_Tuple2(
				'direction',
				elm$json$Json$Encode$string(
					author$project$VegaLite$markOrientationLabel(d)));
		case 41:
			var lType = legendProp.a;
			if (!lType) {
				return _Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('gradient'));
			} else {
				return _Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('symbol'));
			}
		case 6:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'format',
				elm$json$Json$Encode$string(s));
		case 7:
			var n = legendProp.a;
			return _Utils_Tuple2(
				'gradientLength',
				elm$json$Json$Encode$float(n));
		case 8:
			var n = legendProp.a;
			return _Utils_Tuple2(
				'gradientThickness',
				elm$json$Json$Encode$float(n));
		case 9:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'gradientStrokeColor',
				elm$json$Json$Encode$string(s));
		case 10:
			var n = legendProp.a;
			return _Utils_Tuple2(
				'gradientStrokeWidth',
				elm$json$Json$Encode$float(n));
		case 11:
			var ga = legendProp.a;
			return _Utils_Tuple2(
				'gridAlign',
				author$project$VegaLite$compositionAlignmentSpec(ga));
		case 12:
			var ha = legendProp.a;
			return _Utils_Tuple2(
				'labelAlign',
				elm$json$Json$Encode$string(
					author$project$VegaLite$hAlignLabel(ha)));
		case 13:
			var va = legendProp.a;
			return _Utils_Tuple2(
				'labelBaseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 14:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'labelColor',
				elm$json$Json$Encode$string(s));
		case 15:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'labelFont',
				elm$json$Json$Encode$string(s));
		case 16:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'labelFontSize',
				elm$json$Json$Encode$float(x));
		case 17:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'labelLimit',
				elm$json$Json$Encode$float(x));
		case 18:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'labelOffset',
				elm$json$Json$Encode$float(x));
		case 19:
			var lo = legendProp.a;
			return _Utils_Tuple2(
				'labelOverlap',
				elm$json$Json$Encode$string(
					author$project$VegaLite$overlapStrategyLabel(lo)));
		case 20:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'offset',
				elm$json$Json$Encode$float(x));
		case 21:
			var orient = legendProp.a;
			return _Utils_Tuple2(
				'orient',
				elm$json$Json$Encode$string(
					author$project$VegaLite$legendOrientLabel(orient)));
		case 22:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'padding',
				elm$json$Json$Encode$float(x));
		case 24:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'strokeColor',
				elm$json$Json$Encode$string(s));
		case 25:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'strokeWidth',
				elm$json$Json$Encode$float(x));
		case 26:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'symbolFillColor',
				elm$json$Json$Encode$string(s));
		case 30:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'symbolStrokeColor',
				elm$json$Json$Encode$string(s));
		case 27:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'symbolType',
				elm$json$Json$Encode$string(
					author$project$VegaLite$symbolLabel(s)));
		case 28:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'symbolSize',
				elm$json$Json$Encode$float(x));
		case 29:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'symbolStrokeWidth',
				elm$json$Json$Encode$float(x));
		case 31:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'tickCount',
				elm$json$Json$Encode$float(x));
		case 32:
			var s = legendProp.a;
			return (s === '') ? _Utils_Tuple2('title', elm$json$Json$Encode$null) : _Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(s));
		case 33:
			var ha = legendProp.a;
			return _Utils_Tuple2(
				'titleAlign',
				elm$json$Json$Encode$string(
					author$project$VegaLite$hAlignLabel(ha)));
		case 34:
			var va = legendProp.a;
			return _Utils_Tuple2(
				'titleBaseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 35:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'titleColor',
				elm$json$Json$Encode$string(s));
		case 36:
			var s = legendProp.a;
			return _Utils_Tuple2(
				'titleFont',
				elm$json$Json$Encode$string(s));
		case 37:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'titleFontSize',
				elm$json$Json$Encode$float(x));
		case 38:
			var fw = legendProp.a;
			return _Utils_Tuple2(
				'titleFontWeight',
				author$project$VegaLite$fontWeightSpec(fw));
		case 39:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'titleLimit',
				elm$json$Json$Encode$float(x));
		case 40:
			var x = legendProp.a;
			return _Utils_Tuple2(
				'titlePadding',
				elm$json$Json$Encode$float(x));
		case 42:
			var vals = legendProp.a;
			var list = function () {
				switch (vals.$) {
					case 1:
						var xs = vals.a;
						return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, xs);
					case 0:
						var ds = vals.a;
						return A2(
							elm$json$Json$Encode$list,
							function (d) {
								return elm$json$Json$Encode$object(
									A2(elm$core$List$map, author$project$VegaLite$dateTimeProperty, d));
							},
							ds);
					default:
						var ss = vals.a;
						return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, ss);
				}
			}();
			return _Utils_Tuple2('values', list);
		default:
			var n = legendProp.a;
			return _Utils_Tuple2(
				'zindex',
				elm$json$Json$Encode$int(n));
	}
};
var author$project$VegaLite$markChannelProperty = function (field) {
	switch (field.$) {
		case 0:
			var s = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					elm$json$Json$Encode$string(s))
				]);
		case 1:
			var arr = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'repeat',
								elm$json$Json$Encode$string(
									author$project$VegaLite$arrangementLabel(arr)))
							])))
				]);
		case 2:
			var t = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string(
						author$project$VegaLite$measurementLabel(t)))
				]);
		case 3:
			var sps = field.a;
			return _Utils_eq(sps, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('scale', elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'scale',
					elm$json$Json$Encode$object(
						A2(elm$core$List$map, author$project$VegaLite$scaleProperty, sps)))
				]);
		case 10:
			var lps = field.a;
			return _Utils_eq(lps, _List_Nil) ? _List_fromArray(
				[
					_Utils_Tuple2('legend', elm$json$Json$Encode$null)
				]) : _List_fromArray(
				[
					_Utils_Tuple2(
					'legend',
					elm$json$Json$Encode$object(
						A2(elm$core$List$map, author$project$VegaLite$legendProperty, lps)))
				]);
		case 4:
			var bps = field.a;
			return _List_fromArray(
				[
					author$project$VegaLite$bin(bps)
				]);
		case 5:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'bin',
					elm$json$Json$Encode$string('binned'))
				]);
		case 6:
			var ips = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'impute',
					elm$json$Json$Encode$object(
						A2(elm$core$List$map, author$project$VegaLite$imputeProperty, ips)))
				]);
		case 11:
			var selName = field.a;
			var ifClause = field.b;
			var elseClause = field.c;
			return A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					elm$json$Json$Encode$object(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								'selection',
								author$project$VegaLite$booleanOpSpec(selName)),
							A2(elm$core$List$concatMap, author$project$VegaLite$markChannelProperty, ifClause)))),
				A2(elm$core$List$concatMap, author$project$VegaLite$markChannelProperty, elseClause));
		case 12:
			var tests = field.a;
			var elseClause = field.b;
			var testClause = function (_n1) {
				var predicate = _n1.a;
				var ifClause = _n1.b;
				return elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'test',
							author$project$VegaLite$booleanOpSpec(predicate)),
						A2(elm$core$List$concatMap, author$project$VegaLite$markChannelProperty, ifClause)));
			};
			return A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					'condition',
					A2(elm$json$Json$Encode$list, testClause, tests)),
				A2(elm$core$List$concatMap, author$project$VegaLite$markChannelProperty, elseClause));
		case 7:
			var tu = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'timeUnit',
					elm$json$Json$Encode$string(
						author$project$VegaLite$timeUnitLabel(tu)))
				]);
		case 8:
			var t = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'title',
					elm$json$Json$Encode$string(t))
				]);
		case 9:
			var op = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'aggregate',
					elm$json$Json$Encode$string(
						author$project$VegaLite$operationLabel(op)))
				]);
		case 13:
			var s = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					elm$json$Json$Encode$string(s))
				]);
		case 14:
			var x = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					elm$json$Json$Encode$float(x))
				]);
		case 15:
			var s = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					elm$json$Json$Encode$string(s))
				]);
		default:
			var b = field.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					elm$json$Json$Encode$bool(b))
				]);
	}
};
var author$project$VegaLite$color = function (markProps) {
	return elm$core$List$cons(
		_Utils_Tuple2(
			'color',
			elm$json$Json$Encode$object(
				A2(elm$core$List$concatMap, author$project$VegaLite$markChannelProperty, markProps))));
};
var author$project$VegaLite$ColumnFields = function (a) {
	return {$: 1, a: a};
};
var author$project$VegaLite$columnFields = author$project$VegaLite$ColumnFields;
var author$project$VegaLite$FSelection = function (a) {
	return {$: 7, a: a};
};
var author$project$VegaLite$fiSelection = author$project$VegaLite$FSelection;
var author$project$VegaLite$filter = function (f) {
	switch (f.$) {
		case 5:
			var ex = f.a;
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$string(ex)));
		case 6:
			var boolExpr = f.a;
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					author$project$VegaLite$booleanOpSpec(boolExpr)));
		case 0:
			var field = f.a;
			var val = f.b;
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'field',
								elm$json$Json$Encode$string(field)),
								_Utils_Tuple2(
								'equal',
								author$project$VegaLite$dataValueSpec(val))
							]))));
		case 1:
			var field = f.a;
			var val = f.b;
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'field',
								elm$json$Json$Encode$string(field)),
								_Utils_Tuple2(
								'lt',
								author$project$VegaLite$dataValueSpec(val))
							]))));
		case 2:
			var field = f.a;
			var val = f.b;
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'field',
								elm$json$Json$Encode$string(field)),
								_Utils_Tuple2(
								'lte',
								author$project$VegaLite$dataValueSpec(val))
							]))));
		case 3:
			var field = f.a;
			var val = f.b;
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'field',
								elm$json$Json$Encode$string(field)),
								_Utils_Tuple2(
								'gt',
								author$project$VegaLite$dataValueSpec(val))
							]))));
		case 4:
			var field = f.a;
			var val = f.b;
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'field',
								elm$json$Json$Encode$string(field)),
								_Utils_Tuple2(
								'gte',
								author$project$VegaLite$dataValueSpec(val))
							]))));
		case 7:
			var selName = f.a;
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'selection',
								elm$json$Json$Encode$string(selName))
							]))));
		case 9:
			var field = f.a;
			var vals = f.b;
			var values = function () {
				if (!vals.$) {
					var mn = vals.a;
					var mx = vals.b;
					return A2(
						elm$json$Json$Encode$list,
						elm$json$Json$Encode$float,
						_List_fromArray(
							[mn, mx]));
				} else {
					if (!vals.a.b) {
						if (!vals.b.b) {
							return author$project$VegaLite$toList(
								_List_fromArray(
									[elm$json$Json$Encode$null, elm$json$Json$Encode$null]));
						} else {
							var dMax = vals.b;
							return author$project$VegaLite$toList(
								_List_fromArray(
									[
										elm$json$Json$Encode$null,
										elm$json$Json$Encode$object(
										A2(elm$core$List$map, author$project$VegaLite$dateTimeProperty, dMax))
									]));
						}
					} else {
						if (!vals.b.b) {
							var dMin = vals.a;
							return author$project$VegaLite$toList(
								_List_fromArray(
									[
										elm$json$Json$Encode$object(
										A2(elm$core$List$map, author$project$VegaLite$dateTimeProperty, dMin)),
										elm$json$Json$Encode$null
									]));
						} else {
							var dMin = vals.a;
							var dMax = vals.b;
							return A2(
								elm$json$Json$Encode$list,
								elm$json$Json$Encode$object,
								_List_fromArray(
									[
										A2(elm$core$List$map, author$project$VegaLite$dateTimeProperty, dMin),
										A2(elm$core$List$map, author$project$VegaLite$dateTimeProperty, dMax)
									]));
						}
					}
				}
			}();
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'field',
								elm$json$Json$Encode$string(field)),
								_Utils_Tuple2('range', values)
							]))));
		case 8:
			var field = f.a;
			var vals = f.b;
			var values = function () {
				switch (vals.$) {
					case 2:
						var xs = vals.a;
						return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, xs);
					case 1:
						var ds = vals.a;
						return A2(
							elm$json$Json$Encode$list,
							function (d) {
								return elm$json$Json$Encode$object(
									A2(elm$core$List$map, author$project$VegaLite$dateTimeProperty, d));
							},
							ds);
					case 3:
						var ss = vals.a;
						return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, ss);
					default:
						var bs = vals.a;
						return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$bool, bs);
				}
			}();
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'field',
								elm$json$Json$Encode$string(field)),
								_Utils_Tuple2('oneOf', values)
							]))));
		default:
			var field = f.a;
			return elm$core$List$cons(
				_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'field',
								elm$json$Json$Encode$string(field)),
								_Utils_Tuple2(
								'valid',
								elm$json$Json$Encode$bool(true))
							]))));
	}
};
var author$project$VegaLite$FoDate = function (a) {
	return {$: 2, a: a};
};
var author$project$VegaLite$foDate = author$project$VegaLite$FoDate;
var author$project$VegaLite$VLLayer = 14;
var author$project$VegaLite$layer = function (specs) {
	return _Utils_Tuple2(
		14,
		author$project$VegaLite$toList(specs));
};
var author$project$VegaLite$MString = function (a) {
	return {$: 15, a: a};
};
var author$project$VegaLite$mStr = author$project$VegaLite$MString;
var author$project$VegaLite$Count = 4;
var author$project$VegaLite$opCount = 4;
var author$project$VegaLite$PAggregate = function (a) {
	return {$: 9, a: a};
};
var author$project$VegaLite$pAggregate = author$project$VegaLite$PAggregate;
var author$project$VegaLite$PBin = function (a) {
	return {$: 5, a: a};
};
var author$project$VegaLite$pBin = author$project$VegaLite$PBin;
var author$project$VegaLite$PRepeat = function (a) {
	return {$: 3, a: a};
};
var author$project$VegaLite$pRepeat = author$project$VegaLite$PRepeat;
var author$project$VegaLite$Parse = function (a) {
	return {$: 6, a: a};
};
var author$project$VegaLite$parse = author$project$VegaLite$Parse;
var author$project$VegaLite$VLRepeat = 17;
var author$project$VegaLite$repeatFieldsProperty = function (fields) {
	if (!fields.$) {
		var fs = fields.a;
		return _Utils_Tuple2(
			'row',
			A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, fs));
	} else {
		var fs = fields.a;
		return _Utils_Tuple2(
			'column',
			A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, fs));
	}
};
var author$project$VegaLite$repeat = function (fields) {
	return _Utils_Tuple2(
		17,
		elm$json$Json$Encode$object(
			A2(elm$core$List$map, author$project$VegaLite$repeatFieldsProperty, fields)));
};
var author$project$VegaLite$VLSpec = 19;
var author$project$VegaLite$specification = function (spec) {
	return _Utils_Tuple2(19, spec);
};
var author$project$VegaLite$VLTransform = 11;
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$decodeString = _Json_runOnString;
var elm$json$Json$Decode$list = _Json_decodeList;
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$VegaLite$transform = function (transforms) {
	var assemble = function (_n54) {
		var trName = _n54.a;
		var val = _n54.b;
		switch (trName) {
			case 'aggregate':
				var _n1 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if ((((!_n1.$) && _n1.a.b) && _n1.a.b.b) && (!_n1.a.b.b.b)) {
					var _n2 = _n1.a;
					var ops = _n2.a;
					var _n3 = _n2.b;
					var groups = _n3.a;
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2('aggregate', ops),
								_Utils_Tuple2('groupby', groups)
							]));
				} else {
					return elm$json$Json$Encode$null;
				}
			case 'bin':
				var _n4 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if (((((!_n4.$) && _n4.a.b) && _n4.a.b.b) && _n4.a.b.b.b) && (!_n4.a.b.b.b.b)) {
					var _n5 = _n4.a;
					var binParams = _n5.a;
					var _n6 = _n5.b;
					var field = _n6.a;
					var _n7 = _n6.b;
					var label = _n7.a;
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2('bin', binParams),
								_Utils_Tuple2('field', field),
								_Utils_Tuple2('as', label)
							]));
				} else {
					return elm$json$Json$Encode$null;
				}
			case 'calculate':
				var _n8 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if ((((!_n8.$) && _n8.a.b) && _n8.a.b.b) && (!_n8.a.b.b.b)) {
					var _n9 = _n8.a;
					var ex = _n9.a;
					var _n10 = _n9.b;
					var label = _n10.a;
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2('calculate', ex),
								_Utils_Tuple2('as', label)
							]));
				} else {
					return elm$json$Json$Encode$null;
				}
			case 'impute':
				var _n11 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if ((((((((((!_n11.$) && _n11.a.b) && _n11.a.b.b) && _n11.a.b.b.b) && _n11.a.b.b.b.b) && _n11.a.b.b.b.b.b) && _n11.a.b.b.b.b.b.b) && _n11.a.b.b.b.b.b.b.b) && _n11.a.b.b.b.b.b.b.b.b) && (!_n11.a.b.b.b.b.b.b.b.b.b)) {
					var _n12 = _n11.a;
					var imp = _n12.a;
					var _n13 = _n12.b;
					var key = _n13.a;
					var _n14 = _n13.b;
					var frameObj = _n14.a;
					var _n15 = _n14.b;
					var keyValsObj = _n15.a;
					var _n16 = _n15.b;
					var keyValSequenceObj = _n16.a;
					var _n17 = _n16.b;
					var methodObj = _n17.a;
					var _n18 = _n17.b;
					var groupbyObj = _n18.a;
					var _n19 = _n18.b;
					var valueObj = _n19.a;
					return elm$json$Json$Encode$object(
						_Utils_ap(
							_List_fromArray(
								[
									_Utils_Tuple2('impute', imp),
									_Utils_Tuple2('key', key)
								]),
							_Utils_ap(
								_Utils_eq(frameObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
									[
										_Utils_Tuple2('frame', frameObj)
									]),
								_Utils_ap(
									_Utils_eq(keyValsObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
										[
											_Utils_Tuple2('keyvals', keyValsObj)
										]),
									_Utils_ap(
										_Utils_eq(keyValSequenceObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
											[
												_Utils_Tuple2('keyvals', keyValSequenceObj)
											]),
										_Utils_ap(
											_Utils_eq(methodObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
												[
													_Utils_Tuple2('method', methodObj)
												]),
											_Utils_ap(
												_Utils_eq(groupbyObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
													[
														_Utils_Tuple2('groupby', groupbyObj)
													]),
												_Utils_eq(valueObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
													[
														_Utils_Tuple2('value', valueObj)
													]))))))));
				} else {
					return elm$json$Json$Encode$null;
				}
			case 'lookup':
				var _n20 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if ((((((!_n20.$) && _n20.a.b) && _n20.a.b.b) && _n20.a.b.b.b) && _n20.a.b.b.b.b) && (!_n20.a.b.b.b.b.b)) {
					var _n21 = _n20.a;
					var key1 = _n21.a;
					var _n22 = _n21.b;
					var dataSpec = _n22.a;
					var _n23 = _n22.b;
					var key2 = _n23.a;
					var _n24 = _n23.b;
					var fields = _n24.a;
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2('lookup', key1),
								_Utils_Tuple2(
								'from',
								elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2('data', dataSpec),
											_Utils_Tuple2('key', key2),
											_Utils_Tuple2('fields', fields)
										])))
							]));
				} else {
					return elm$json$Json$Encode$null;
				}
			case 'lookupAs':
				var _n25 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if ((((((!_n25.$) && _n25.a.b) && _n25.a.b.b) && _n25.a.b.b.b) && _n25.a.b.b.b.b) && (!_n25.a.b.b.b.b.b)) {
					var _n26 = _n25.a;
					var key1 = _n26.a;
					var _n27 = _n26.b;
					var dataSpec = _n27.a;
					var _n28 = _n27.b;
					var key2 = _n28.a;
					var _n29 = _n28.b;
					var asName = _n29.a;
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2('lookup', key1),
								_Utils_Tuple2(
								'from',
								elm$json$Json$Encode$object(
									_List_fromArray(
										[
											_Utils_Tuple2('data', dataSpec),
											_Utils_Tuple2('key', key2)
										]))),
								_Utils_Tuple2('as', asName)
							]));
				} else {
					return elm$json$Json$Encode$null;
				}
			case 'flattenAs':
				var _n30 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if ((((!_n30.$) && _n30.a.b) && _n30.a.b.b) && (!_n30.a.b.b.b)) {
					var _n31 = _n30.a;
					var fields = _n31.a;
					var _n32 = _n31.b;
					var names = _n32.a;
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2('flatten', fields),
								_Utils_Tuple2('as', names)
							]));
				} else {
					return elm$json$Json$Encode$null;
				}
			case 'foldAs':
				var _n33 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if (((((!_n33.$) && _n33.a.b) && _n33.a.b.b) && _n33.a.b.b.b) && (!_n33.a.b.b.b.b)) {
					var _n34 = _n33.a;
					var fields = _n34.a;
					var _n35 = _n34.b;
					var keyName = _n35.a;
					var _n36 = _n35.b;
					var valName = _n36.a;
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2('fold', fields),
								_Utils_Tuple2(
								'as',
								author$project$VegaLite$toList(
									_List_fromArray(
										[keyName, valName])))
							]));
				} else {
					return elm$json$Json$Encode$null;
				}
			case 'stack':
				var _n37 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if ((((((((!_n37.$) && _n37.a.b) && _n37.a.b.b) && _n37.a.b.b.b) && _n37.a.b.b.b.b) && _n37.a.b.b.b.b.b) && _n37.a.b.b.b.b.b.b) && (!_n37.a.b.b.b.b.b.b.b)) {
					var _n38 = _n37.a;
					var field = _n38.a;
					var _n39 = _n38.b;
					var grp = _n39.a;
					var _n40 = _n39.b;
					var start = _n40.a;
					var _n41 = _n40.b;
					var end = _n41.a;
					var _n42 = _n41.b;
					var offsetObj = _n42.a;
					var _n43 = _n42.b;
					var sortObj = _n43.a;
					return elm$json$Json$Encode$object(
						_Utils_ap(
							_List_fromArray(
								[
									_Utils_Tuple2('stack', field),
									_Utils_Tuple2('groupby', grp),
									_Utils_Tuple2(
									'as',
									author$project$VegaLite$toList(
										_List_fromArray(
											[start, end])))
								]),
							_Utils_ap(
								_Utils_eq(offsetObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
									[
										_Utils_Tuple2('offset', offsetObj)
									]),
								_Utils_eq(sortObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
									[
										_Utils_Tuple2('sort', sortObj)
									]))));
				} else {
					return elm$json$Json$Encode$null;
				}
			case 'timeUnit':
				var _n44 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if (((((!_n44.$) && _n44.a.b) && _n44.a.b.b) && _n44.a.b.b.b) && (!_n44.a.b.b.b.b)) {
					var _n45 = _n44.a;
					var tu = _n45.a;
					var _n46 = _n45.b;
					var field = _n46.a;
					var _n47 = _n46.b;
					var label = _n47.a;
					return elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2('timeUnit', tu),
								_Utils_Tuple2('field', field),
								_Utils_Tuple2('as', label)
							]));
				} else {
					return elm$json$Json$Encode$null;
				}
			case 'window':
				var _n48 = A2(
					elm$json$Json$Decode$decodeString,
					elm$json$Json$Decode$list(elm$json$Json$Decode$value),
					A2(elm$json$Json$Encode$encode, 0, val));
				if (((((((!_n48.$) && _n48.a.b) && _n48.a.b.b) && _n48.a.b.b.b) && _n48.a.b.b.b.b) && _n48.a.b.b.b.b.b) && (!_n48.a.b.b.b.b.b.b)) {
					var _n49 = _n48.a;
					var winObj = _n49.a;
					var _n50 = _n49.b;
					var frameObj = _n50.a;
					var _n51 = _n50.b;
					var peersObj = _n51.a;
					var _n52 = _n51.b;
					var groupbyObj = _n52.a;
					var _n53 = _n52.b;
					var sortObj = _n53.a;
					return elm$json$Json$Encode$object(
						_Utils_ap(
							_List_fromArray(
								[
									_Utils_Tuple2('window', winObj)
								]),
							_Utils_ap(
								_Utils_eq(frameObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
									[
										_Utils_Tuple2('frame', frameObj)
									]),
								_Utils_ap(
									_Utils_eq(peersObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
										[
											_Utils_Tuple2('ignorePeers', peersObj)
										]),
									_Utils_ap(
										_Utils_eq(groupbyObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
											[
												_Utils_Tuple2('groupby', groupbyObj)
											]),
										_Utils_eq(sortObj, elm$json$Json$Encode$null) ? _List_Nil : _List_fromArray(
											[
												_Utils_Tuple2('sort', sortObj)
											]))))));
				} else {
					return elm$json$Json$Encode$null;
				}
			default:
				return elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(trName, val)
						]));
		}
	};
	return elm$core$List$isEmpty(transforms) ? _Utils_Tuple2(11, elm$json$Json$Encode$null) : _Utils_Tuple2(
		11,
		A2(elm$json$Json$Encode$list, assemble, transforms));
};
var author$project$GalleryMulti$multi2 = function () {
	var trans = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$transform,
		A2(author$project$VegaLite$calculateAs, 'hours(datum.date)', 'time'));
	var selTrans = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$transform,
		author$project$VegaLite$filter(
			author$project$VegaLite$fiSelection('myBrush')));
	var spec2 = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				selTrans(_List_Nil),
				author$project$VegaLite$bar(_List_Nil),
				author$project$VegaLite$encoding(
				A2(
					author$project$VegaLite$color,
					_List_fromArray(
						[
							author$project$VegaLite$mStr('goldenrod')
						]),
					_List_Nil))
			]));
	var sel = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$selection,
		A3(
			author$project$VegaLite$select,
			'myBrush',
			2,
			_List_fromArray(
				[
					author$project$VegaLite$seEncodings(
					_List_fromArray(
						[author$project$VegaLite$chX]))
				])));
	var spec1 = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				sel(_List_Nil),
				author$project$VegaLite$bar(_List_Nil)
			]));
	var encPosition = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$VegaLite$encoding,
			A2(
				author$project$VegaLite$position,
				0,
				_List_fromArray(
					[
						author$project$VegaLite$pRepeat(0),
						author$project$VegaLite$pMType(2),
						author$project$VegaLite$pBin(
						_List_fromArray(
							[
								author$project$VegaLite$biMaxBins(20)
							]))
					]))),
		A2(
			author$project$VegaLite$position,
			1,
			_List_fromArray(
				[
					author$project$VegaLite$pAggregate(author$project$VegaLite$opCount),
					author$project$VegaLite$pMType(2)
				])));
	var des = author$project$VegaLite$description('Cross-filter.');
	var spec = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				des,
				A2(
				author$project$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/flights-2k.json',
				_List_fromArray(
					[
						author$project$VegaLite$parse(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'date',
								author$project$VegaLite$foDate(''))
							]))
					])),
				trans(_List_Nil),
				encPosition(_List_Nil),
				author$project$VegaLite$layer(
				_List_fromArray(
					[spec1, spec2]))
			]));
	return author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				author$project$VegaLite$repeat(
				_List_fromArray(
					[
						author$project$VegaLite$columnFields(
						_List_fromArray(
							['distance', 'delay', 'time']))
					])),
				author$project$VegaLite$specification(spec)
			]));
}();
var author$project$VegaLite$Global = 0;
var author$project$VegaLite$Nominal = 0;
var author$project$VegaLite$Row = 1;
var author$project$VegaLite$Union = 1;
var author$project$VegaLite$MmType = function (a) {
	return {$: 2, a: a};
};
var author$project$VegaLite$mMType = author$project$VegaLite$MmType;
var author$project$VegaLite$MName = function (a) {
	return {$: 0, a: a};
};
var author$project$VegaLite$mName = author$project$VegaLite$MName;
var author$project$VegaLite$MSelectionCondition = F3(
	function (a, b, c) {
		return {$: 11, a: a, b: b, c: c};
	});
var author$project$VegaLite$mSelectionCondition = author$project$VegaLite$MSelectionCondition;
var author$project$VegaLite$Point = 8;
var author$project$VegaLite$point = author$project$VegaLite$mark(8);
var author$project$VegaLite$RowFields = function (a) {
	return {$: 0, a: a};
};
var author$project$VegaLite$rowFields = author$project$VegaLite$RowFields;
var author$project$VegaLite$BindScales = {$: 1};
var author$project$VegaLite$seBindScales = author$project$VegaLite$BindScales;
var author$project$VegaLite$On = function (a) {
	return {$: 2, a: a};
};
var author$project$VegaLite$seOn = author$project$VegaLite$On;
var author$project$VegaLite$ResolveSelections = function (a) {
	return {$: 7, a: a};
};
var author$project$VegaLite$seResolve = author$project$VegaLite$ResolveSelections;
var author$project$VegaLite$Translate = function (a) {
	return {$: 3, a: a};
};
var author$project$VegaLite$seTranslate = author$project$VegaLite$Translate;
var author$project$VegaLite$Zoom = function (a) {
	return {$: 4, a: a};
};
var author$project$VegaLite$seZoom = author$project$VegaLite$Zoom;
var author$project$VegaLite$SelectionName = function (a) {
	return {$: 2, a: a};
};
var author$project$VegaLite$selectionName = author$project$VegaLite$SelectionName;
var author$project$GalleryMulti$multi3 = function () {
	var sel = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$VegaLite$selection,
			A3(
				author$project$VegaLite$select,
				'myBrush',
				2,
				_List_fromArray(
					[
						author$project$VegaLite$seOn('[mousedown[event.shiftKey], window:mouseup] > window:mousemove!'),
						author$project$VegaLite$seTranslate('[mousedown[event.shiftKey], window:mouseup] > window:mousemove!'),
						author$project$VegaLite$seZoom('wheel![event.shiftKey]'),
						author$project$VegaLite$seResolve(1)
					]))),
		A3(
			author$project$VegaLite$select,
			'',
			2,
			_List_fromArray(
				[
					author$project$VegaLite$seBindScales,
					author$project$VegaLite$seTranslate('[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!'),
					author$project$VegaLite$seZoom('wheel![event.shiftKey]'),
					author$project$VegaLite$seResolve(0)
				])));
	var enc = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				author$project$VegaLite$encoding,
				A2(
					author$project$VegaLite$position,
					0,
					_List_fromArray(
						[
							author$project$VegaLite$pRepeat(0),
							author$project$VegaLite$pMType(2)
						]))),
			A2(
				author$project$VegaLite$position,
				1,
				_List_fromArray(
					[
						author$project$VegaLite$pRepeat(1),
						author$project$VegaLite$pMType(2)
					]))),
		author$project$VegaLite$color(
			_List_fromArray(
				[
					A3(
					author$project$VegaLite$mSelectionCondition,
					author$project$VegaLite$selectionName('myBrush'),
					_List_fromArray(
						[
							author$project$VegaLite$mName('Origin'),
							author$project$VegaLite$mMType(0)
						]),
					_List_fromArray(
						[
							author$project$VegaLite$mStr('grey')
						]))
				])));
	var spec = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				A2(author$project$VegaLite$dataFromUrl, 'https://vega.github.io/vega-lite/data/cars.json', _List_Nil),
				author$project$VegaLite$point(_List_Nil),
				sel(_List_Nil),
				enc(_List_Nil)
			]));
	var des = author$project$VegaLite$description('Scatterplot matrix');
	return author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				des,
				author$project$VegaLite$repeat(
				_List_fromArray(
					[
						author$project$VegaLite$rowFields(
						_List_fromArray(
							['Horsepower', 'Acceleration', 'Miles_per_Gallon'])),
						author$project$VegaLite$columnFields(
						_List_fromArray(
							['Miles_per_Gallon', 'Acceleration', 'Horsepower']))
					])),
				author$project$VegaLite$specification(spec)
			]));
}();
var author$project$VegaLite$Independent = 1;
var author$project$VegaLite$Single = 0;
var author$project$VegaLite$AxLabelAngle = function (a) {
	return {$: 8, a: a};
};
var author$project$VegaLite$axLabelAngle = author$project$VegaLite$AxLabelAngle;
var author$project$VegaLite$ChColor = 4;
var author$project$VegaLite$chColor = 4;
var author$project$VegaLite$ChSize = 7;
var author$project$VegaLite$chSize = 7;
var author$project$VegaLite$Range = function (a) {
	return {$: 25, a: a};
};
var author$project$VegaLite$coRange = author$project$VegaLite$Range;
var author$project$VegaLite$autosizeProperty = function (asCfg) {
	switch (asCfg) {
		case 3:
			return _Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string('pad'));
		case 1:
			return _Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string('fit'));
		case 2:
			return _Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string('none'));
		case 5:
			return _Utils_Tuple2(
				'resize',
				elm$json$Json$Encode$bool(true));
		case 0:
			return _Utils_Tuple2(
				'contains',
				elm$json$Json$Encode$string('content'));
		default:
			return _Utils_Tuple2(
				'contains',
				elm$json$Json$Encode$string('padding'));
	}
};
var author$project$VegaLite$axisConfigProperty = function (axisCfg) {
	switch (axisCfg.$) {
		case 0:
			var x = axisCfg.a;
			return _Utils_Tuple2(
				'bandPosition',
				elm$json$Json$Encode$float(x));
		case 1:
			var b = axisCfg.a;
			return _Utils_Tuple2(
				'domain',
				elm$json$Json$Encode$bool(b));
		case 2:
			var c = axisCfg.a;
			return _Utils_Tuple2(
				'domainColor',
				elm$json$Json$Encode$string(c));
		case 3:
			var n = axisCfg.a;
			return _Utils_Tuple2(
				'domainOpacity',
				elm$json$Json$Encode$float(n));
		case 4:
			var w = axisCfg.a;
			return _Utils_Tuple2(
				'domainWidth',
				elm$json$Json$Encode$float(w));
		case 25:
			var n = axisCfg.a;
			return _Utils_Tuple2(
				'maxExtent',
				elm$json$Json$Encode$float(n));
		case 26:
			var n = axisCfg.a;
			return _Utils_Tuple2(
				'minExtent',
				elm$json$Json$Encode$float(n));
		case 5:
			var b = axisCfg.a;
			return _Utils_Tuple2(
				'grid',
				elm$json$Json$Encode$bool(b));
		case 6:
			var c = axisCfg.a;
			return _Utils_Tuple2(
				'gridColor',
				elm$json$Json$Encode$string(c));
		case 7:
			var ds = axisCfg.a;
			return _Utils_Tuple2(
				'gridDash',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, ds));
		case 8:
			var o = axisCfg.a;
			return _Utils_Tuple2(
				'gridOpacity',
				elm$json$Json$Encode$float(o));
		case 9:
			var x = axisCfg.a;
			return _Utils_Tuple2(
				'gridWidth',
				elm$json$Json$Encode$float(x));
		case 10:
			var b = axisCfg.a;
			return _Utils_Tuple2(
				'labels',
				elm$json$Json$Encode$bool(b));
		case 11:
			var ha = axisCfg.a;
			return _Utils_Tuple2(
				'labelAlign',
				elm$json$Json$Encode$string(
					author$project$VegaLite$hAlignLabel(ha)));
		case 12:
			var angle = axisCfg.a;
			return _Utils_Tuple2(
				'labelAngle',
				elm$json$Json$Encode$float(angle));
		case 13:
			var va = axisCfg.a;
			return _Utils_Tuple2(
				'labelBaseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 14:
			var mn = axisCfg.a;
			if (!mn.$) {
				var n = mn.a;
				return (n === 1) ? _Utils_Tuple2(
					'labelBound',
					elm$json$Json$Encode$bool(true)) : _Utils_Tuple2(
					'labelBound',
					elm$json$Json$Encode$float(n));
			} else {
				return _Utils_Tuple2(
					'labelBound',
					elm$json$Json$Encode$bool(false));
			}
		case 17:
			var c = axisCfg.a;
			return _Utils_Tuple2(
				'labelColor',
				elm$json$Json$Encode$string(c));
		case 15:
			var mn = axisCfg.a;
			if (!mn.$) {
				var n = mn.a;
				return (!n) ? _Utils_Tuple2(
					'labelFlush',
					elm$json$Json$Encode$bool(true)) : _Utils_Tuple2(
					'labelFlush',
					elm$json$Json$Encode$float(n));
			} else {
				return _Utils_Tuple2(
					'labelFlush',
					elm$json$Json$Encode$bool(false));
			}
		case 16:
			var n = axisCfg.a;
			return _Utils_Tuple2(
				'labelFlushOffset',
				elm$json$Json$Encode$float(n));
		case 18:
			var f = axisCfg.a;
			return _Utils_Tuple2(
				'labelFont',
				elm$json$Json$Encode$string(f));
		case 19:
			var x = axisCfg.a;
			return _Utils_Tuple2(
				'labelFontSize',
				elm$json$Json$Encode$float(x));
		case 20:
			var fw = axisCfg.a;
			return _Utils_Tuple2(
				'labelFontWeight',
				author$project$VegaLite$fontWeightSpec(fw));
		case 21:
			var x = axisCfg.a;
			return _Utils_Tuple2(
				'labelLimit',
				elm$json$Json$Encode$float(x));
		case 22:
			var n = axisCfg.a;
			return _Utils_Tuple2(
				'labelOpacity',
				elm$json$Json$Encode$float(n));
		case 23:
			var strat = axisCfg.a;
			return _Utils_Tuple2(
				'labelOverlap',
				elm$json$Json$Encode$string(
					author$project$VegaLite$overlapStrategyLabel(strat)));
		case 24:
			var pad = axisCfg.a;
			return _Utils_Tuple2(
				'labelPadding',
				elm$json$Json$Encode$float(pad));
		case 27:
			var b = axisCfg.a;
			return _Utils_Tuple2(
				'shortTimeLabels',
				elm$json$Json$Encode$bool(b));
		case 28:
			var b = axisCfg.a;
			return _Utils_Tuple2(
				'ticks',
				elm$json$Json$Encode$bool(b));
		case 29:
			var c = axisCfg.a;
			return _Utils_Tuple2(
				'tickColor',
				elm$json$Json$Encode$string(c));
		case 30:
			var b = axisCfg.a;
			return _Utils_Tuple2(
				'tickExtra',
				elm$json$Json$Encode$bool(b));
		case 31:
			var n = axisCfg.a;
			return _Utils_Tuple2(
				'tickOffset',
				elm$json$Json$Encode$float(n));
		case 32:
			var n = axisCfg.a;
			return _Utils_Tuple2(
				'tickOpacity',
				elm$json$Json$Encode$float(n));
		case 35:
			var n = axisCfg.a;
			return _Utils_Tuple2(
				'tickStep',
				elm$json$Json$Encode$float(n));
		case 33:
			var b = axisCfg.a;
			return _Utils_Tuple2(
				'tickRound',
				elm$json$Json$Encode$bool(b));
		case 34:
			var x = axisCfg.a;
			return _Utils_Tuple2(
				'tickSize',
				elm$json$Json$Encode$float(x));
		case 36:
			var x = axisCfg.a;
			return _Utils_Tuple2(
				'tickWidth',
				elm$json$Json$Encode$float(x));
		case 37:
			var al = axisCfg.a;
			return _Utils_Tuple2(
				'titleAlign',
				elm$json$Json$Encode$string(
					author$project$VegaLite$hAlignLabel(al)));
		case 38:
			var angle = axisCfg.a;
			return _Utils_Tuple2(
				'titleAngle',
				elm$json$Json$Encode$float(angle));
		case 39:
			var va = axisCfg.a;
			return _Utils_Tuple2(
				'titleBaseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 40:
			var c = axisCfg.a;
			return _Utils_Tuple2(
				'titleColor',
				elm$json$Json$Encode$string(c));
		case 41:
			var f = axisCfg.a;
			return _Utils_Tuple2(
				'titleFont',
				elm$json$Json$Encode$string(f));
		case 43:
			var w = axisCfg.a;
			return _Utils_Tuple2(
				'titleFontWeight',
				author$project$VegaLite$fontWeightSpec(w));
		case 42:
			var x = axisCfg.a;
			return _Utils_Tuple2(
				'titleFontSize',
				elm$json$Json$Encode$float(x));
		case 44:
			var x = axisCfg.a;
			return _Utils_Tuple2(
				'titleLimit',
				elm$json$Json$Encode$float(x));
		case 45:
			var n = axisCfg.a;
			return _Utils_Tuple2(
				'titleOpacity',
				elm$json$Json$Encode$float(n));
		case 46:
			var x = axisCfg.a;
			return _Utils_Tuple2(
				'titlePadding',
				elm$json$Json$Encode$float(x));
		case 47:
			var x = axisCfg.a;
			return _Utils_Tuple2(
				'titleX',
				elm$json$Json$Encode$float(x));
		default:
			var y = axisCfg.a;
			return _Utils_Tuple2(
				'titleY',
				elm$json$Json$Encode$float(y));
	}
};
var author$project$VegaLite$fieldTitleLabel = function (ftp) {
	switch (ftp) {
		case 0:
			return 'verbal';
		case 1:
			return 'function';
		default:
			return 'plain';
	}
};
var author$project$VegaLite$anchorLabel = function (an) {
	switch (an) {
		case 0:
			return 'start';
		case 1:
			return 'middle';
		default:
			return 'end';
	}
};
var author$project$VegaLite$headerProperty = function (hProp) {
	switch (hProp.$) {
		case 0:
			var fmt = hProp.a;
			return _Utils_Tuple2(
				'format',
				elm$json$Json$Encode$string(fmt));
		case 2:
			var x = hProp.a;
			return _Utils_Tuple2(
				'labelAngle',
				elm$json$Json$Encode$float(x));
		case 3:
			var s = hProp.a;
			return _Utils_Tuple2(
				'labelColor',
				elm$json$Json$Encode$string(s));
		case 4:
			var s = hProp.a;
			return _Utils_Tuple2(
				'labelFont',
				elm$json$Json$Encode$string(s));
		case 5:
			var x = hProp.a;
			return _Utils_Tuple2(
				'labelFontSize',
				elm$json$Json$Encode$float(x));
		case 6:
			var x = hProp.a;
			return _Utils_Tuple2(
				'labelLimit',
				elm$json$Json$Encode$float(x));
		case 7:
			var x = hProp.a;
			return _Utils_Tuple2(
				'labelPadding',
				elm$json$Json$Encode$float(x));
		case 1:
			var s = hProp.a;
			return _Utils_Tuple2(
				'title',
				elm$json$Json$Encode$string(s));
		case 8:
			var a = hProp.a;
			return _Utils_Tuple2(
				'titleAnchor',
				elm$json$Json$Encode$string(
					author$project$VegaLite$anchorLabel(a)));
		case 9:
			var x = hProp.a;
			return _Utils_Tuple2(
				'titleAngle',
				elm$json$Json$Encode$float(x));
		case 10:
			var va = hProp.a;
			return _Utils_Tuple2(
				'titleBaseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 11:
			var s = hProp.a;
			return _Utils_Tuple2(
				'titleColor',
				elm$json$Json$Encode$string(s));
		case 12:
			var s = hProp.a;
			return _Utils_Tuple2(
				'titleFont',
				elm$json$Json$Encode$string(s));
		case 13:
			var s = hProp.a;
			return _Utils_Tuple2(
				'titleFontWeight',
				elm$json$Json$Encode$string(s));
		case 14:
			var x = hProp.a;
			return _Utils_Tuple2(
				'titleFontSize',
				elm$json$Json$Encode$float(x));
		case 15:
			var x = hProp.a;
			return _Utils_Tuple2(
				'titleLimit',
				elm$json$Json$Encode$float(x));
		default:
			var x = hProp.a;
			return _Utils_Tuple2(
				'titlePadding',
				elm$json$Json$Encode$float(x));
	}
};
var author$project$VegaLite$legendConfigProperty = function (legendConfig) {
	switch (legendConfig.$) {
		case 0:
			var h = legendConfig.a;
			return _Utils_Tuple2(
				'clipHeight',
				elm$json$Json$Encode$float(h));
		case 1:
			var n = legendConfig.a;
			return _Utils_Tuple2(
				'columnPadding',
				elm$json$Json$Encode$float(n));
		case 26:
			var n = legendConfig.a;
			return _Utils_Tuple2(
				'rowPadding',
				elm$json$Json$Encode$float(n));
		case 2:
			var n = legendConfig.a;
			return _Utils_Tuple2(
				'columns',
				elm$json$Json$Encode$float(n));
		case 3:
			var r = legendConfig.a;
			return _Utils_Tuple2(
				'cornerRadius',
				elm$json$Json$Encode$float(r));
		case 5:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'fillColor',
				elm$json$Json$Encode$string(s));
		case 24:
			var orient = legendConfig.a;
			return _Utils_Tuple2(
				'orient',
				elm$json$Json$Encode$string(
					author$project$VegaLite$legendOrientLabel(orient)));
		case 23:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'offset',
				elm$json$Json$Encode$float(x));
		case 28:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'strokeColor',
				elm$json$Json$Encode$string(s));
		case 29:
			var xs = legendConfig.a;
			return _Utils_Tuple2(
				'strokeDash',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, xs));
		case 30:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'strokeWidth',
				elm$json$Json$Encode$float(x));
		case 25:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'padding',
				elm$json$Json$Encode$float(x));
		case 6:
			var d = legendConfig.a;
			return _Utils_Tuple2(
				'gradientDirection',
				elm$json$Json$Encode$string(
					author$project$VegaLite$markOrientationLabel(d)));
		case 8:
			var va = legendConfig.a;
			return _Utils_Tuple2(
				'gradientLabelBaseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 9:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'gradientLabelLimit',
				elm$json$Json$Encode$float(x));
		case 10:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'gradientLabelOffset',
				elm$json$Json$Encode$float(x));
		case 11:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'gradientStrokeColor',
				elm$json$Json$Encode$string(s));
		case 12:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'gradientStrokeWidth',
				elm$json$Json$Encode$float(x));
		case 7:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'gradientHeight',
				elm$json$Json$Encode$float(x));
		case 13:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'gradientWidth',
				elm$json$Json$Encode$float(x));
		case 14:
			var ga = legendConfig.a;
			return _Utils_Tuple2(
				'gridAlign',
				author$project$VegaLite$compositionAlignmentSpec(ga));
		case 15:
			var ha = legendConfig.a;
			return _Utils_Tuple2(
				'labelAlign',
				elm$json$Json$Encode$string(
					author$project$VegaLite$hAlignLabel(ha)));
		case 16:
			var va = legendConfig.a;
			return _Utils_Tuple2(
				'labelBaseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 17:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'labelColor',
				elm$json$Json$Encode$string(s));
		case 18:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'labelFont',
				elm$json$Json$Encode$string(s));
		case 19:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'labelFontSize',
				elm$json$Json$Encode$float(x));
		case 20:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'labelLimit',
				elm$json$Json$Encode$float(x));
		case 21:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'labelOffset',
				elm$json$Json$Encode$float(x));
		case 22:
			var lo = legendConfig.a;
			return _Utils_Tuple2(
				'labelOverlap',
				elm$json$Json$Encode$string(
					author$project$VegaLite$overlapStrategyLabel(lo)));
		case 27:
			var b = legendConfig.a;
			return _Utils_Tuple2(
				'shortTimeLabels',
				elm$json$Json$Encode$bool(b));
		case 4:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'entryPadding',
				elm$json$Json$Encode$float(x));
		case 33:
			var d = legendConfig.a;
			return _Utils_Tuple2(
				'symbolDirection',
				elm$json$Json$Encode$string(
					author$project$VegaLite$markOrientationLabel(d)));
		case 34:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'symbolFillColor',
				elm$json$Json$Encode$string(s));
		case 31:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'symbolBaseFillColor',
				elm$json$Json$Encode$string(s));
		case 39:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'symbolStrokeColor',
				elm$json$Json$Encode$string(s));
		case 32:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'symbolBaseStrokeColor',
				elm$json$Json$Encode$string(s));
		case 35:
			var o = legendConfig.a;
			return _Utils_Tuple2(
				'symbolOffset',
				elm$json$Json$Encode$float(o));
		case 36:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'symbolType',
				elm$json$Json$Encode$string(
					author$project$VegaLite$symbolLabel(s)));
		case 37:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'symbolSize',
				elm$json$Json$Encode$float(x));
		case 38:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'symbolStrokeWidth',
				elm$json$Json$Encode$float(x));
		case 40:
			var ha = legendConfig.a;
			return _Utils_Tuple2(
				'titleAlign',
				elm$json$Json$Encode$string(
					author$project$VegaLite$hAlignLabel(ha)));
		case 41:
			var va = legendConfig.a;
			return _Utils_Tuple2(
				'titleBaseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 42:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'titleColor',
				elm$json$Json$Encode$string(s));
		case 43:
			var s = legendConfig.a;
			return _Utils_Tuple2(
				'titleFont',
				elm$json$Json$Encode$string(s));
		case 44:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'titleFontSize',
				elm$json$Json$Encode$float(x));
		case 45:
			var fw = legendConfig.a;
			return _Utils_Tuple2(
				'titleFontWeight',
				author$project$VegaLite$fontWeightSpec(fw));
		case 46:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'titleLimit',
				elm$json$Json$Encode$float(x));
		default:
			var x = legendConfig.a;
			return _Utils_Tuple2(
				'titlePadding',
				elm$json$Json$Encode$float(x));
	}
};
var author$project$VegaLite$paddingSpec = function (pad) {
	if (!pad.$) {
		var p = pad.a;
		return elm$json$Json$Encode$float(p);
	} else {
		var l = pad.a;
		var t = pad.b;
		var r = pad.c;
		var b = pad.d;
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'left',
					elm$json$Json$Encode$float(l)),
					_Utils_Tuple2(
					'top',
					elm$json$Json$Encode$float(t)),
					_Utils_Tuple2(
					'right',
					elm$json$Json$Encode$float(r)),
					_Utils_Tuple2(
					'bottom',
					elm$json$Json$Encode$float(b))
				]));
	}
};
var author$project$VegaLite$projectionLabel = function (proj) {
	switch (proj.$) {
		case 0:
			return 'albers';
		case 1:
			return 'albersUsa';
		case 2:
			return 'azimuthalEqualArea';
		case 3:
			return 'azimuthalEquidistant';
		case 4:
			return 'conicConformal';
		case 5:
			return 'conicEqualarea';
		case 6:
			return 'conicEquidistant';
		case 7:
			var projName = proj.a;
			return projName;
		case 8:
			return 'equirectangular';
		case 9:
			return 'gnomonic';
		case 10:
			return 'mercator';
		case 11:
			return 'orthographic';
		case 12:
			return 'stereographic';
		default:
			return 'transverseMercator';
	}
};
var author$project$VegaLite$projectionProperty = function (pp) {
	switch (pp.$) {
		case 0:
			var proj = pp.a;
			return _Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string(
					author$project$VegaLite$projectionLabel(proj)));
		case 1:
			var numOrNull = pp.a;
			if (!numOrNull.$) {
				var x = numOrNull.a;
				return _Utils_Tuple2(
					'clipAngle',
					elm$json$Json$Encode$float(x));
			} else {
				return _Utils_Tuple2('clipAngle', elm$json$Json$Encode$null);
			}
		case 2:
			var rClip = pp.a;
			if (!rClip.$) {
				return _Utils_Tuple2('clipExtent', elm$json$Json$Encode$null);
			} else {
				var l = rClip.a;
				var t = rClip.b;
				var r = rClip.c;
				var b = rClip.d;
				return _Utils_Tuple2(
					'clipExtent',
					A2(
						elm$json$Json$Encode$list,
						elm$json$Json$Encode$float,
						_List_fromArray(
							[l, t, r, b])));
			}
		case 3:
			var lon = pp.a;
			var lat = pp.b;
			return _Utils_Tuple2(
				'center',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$float,
					_List_fromArray(
						[lon, lat])));
		case 4:
			var lambda = pp.a;
			var phi = pp.b;
			var gamma = pp.c;
			return _Utils_Tuple2(
				'rotate',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$float,
					_List_fromArray(
						[lambda, phi, gamma])));
		case 5:
			var pr = pp.a;
			return _Utils_Tuple2(
				'precision',
				elm$json$Json$Encode$float(pr));
		case 6:
			var x = pp.a;
			return _Utils_Tuple2(
				'coefficient',
				elm$json$Json$Encode$float(x));
		case 7:
			var x = pp.a;
			return _Utils_Tuple2(
				'distance',
				elm$json$Json$Encode$float(x));
		case 8:
			var x = pp.a;
			return _Utils_Tuple2(
				'fraction',
				elm$json$Json$Encode$float(x));
		case 9:
			var n = pp.a;
			return _Utils_Tuple2(
				'lobes',
				elm$json$Json$Encode$int(n));
		case 10:
			var x = pp.a;
			return _Utils_Tuple2(
				'parallel',
				elm$json$Json$Encode$float(x));
		case 11:
			var x = pp.a;
			return _Utils_Tuple2(
				'radius',
				elm$json$Json$Encode$float(x));
		case 12:
			var x = pp.a;
			return _Utils_Tuple2(
				'ratio',
				elm$json$Json$Encode$float(x));
		case 13:
			var x = pp.a;
			return _Utils_Tuple2(
				'spacing',
				elm$json$Json$Encode$float(x));
		default:
			var x = pp.a;
			return _Utils_Tuple2(
				'tilt',
				elm$json$Json$Encode$float(x));
	}
};
var author$project$VegaLite$rangeConfigProperty = function (rangeCfg) {
	switch (rangeCfg.$) {
		case 0:
			var schemeName = rangeCfg.a;
			return _Utils_Tuple2(
				'category',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2(author$project$VegaLite$schemeProperty, schemeName, _List_Nil)
						])));
		case 1:
			var schemeName = rangeCfg.a;
			return _Utils_Tuple2(
				'diverging',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2(author$project$VegaLite$schemeProperty, schemeName, _List_Nil)
						])));
		case 2:
			var schemeName = rangeCfg.a;
			return _Utils_Tuple2(
				'heatmap',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2(author$project$VegaLite$schemeProperty, schemeName, _List_Nil)
						])));
		case 3:
			var schemeName = rangeCfg.a;
			return _Utils_Tuple2(
				'ordinal',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2(author$project$VegaLite$schemeProperty, schemeName, _List_Nil)
						])));
		case 4:
			var schemeName = rangeCfg.a;
			return _Utils_Tuple2(
				'ramp',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2(author$project$VegaLite$schemeProperty, schemeName, _List_Nil)
						])));
		default:
			var schemeName = rangeCfg.a;
			return _Utils_Tuple2(
				'symbol',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							A2(author$project$VegaLite$schemeProperty, schemeName, _List_Nil)
						])));
	}
};
var author$project$VegaLite$scaleConfigProperty = function (scaleCfg) {
	switch (scaleCfg.$) {
		case 0:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'bandPaddingInner',
				elm$json$Json$Encode$float(x));
		case 1:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'bandPaddingOuter',
				elm$json$Json$Encode$float(x));
		case 2:
			var b = scaleCfg.a;
			return _Utils_Tuple2(
				'clamp',
				elm$json$Json$Encode$bool(b));
		case 3:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'maxBandSize',
				elm$json$Json$Encode$float(x));
		case 4:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'minBandSize',
				elm$json$Json$Encode$float(x));
		case 5:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'maxFontSize',
				elm$json$Json$Encode$float(x));
		case 6:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'minFontSize',
				elm$json$Json$Encode$float(x));
		case 7:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'maxOpacity',
				elm$json$Json$Encode$float(x));
		case 8:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'minOpacity',
				elm$json$Json$Encode$float(x));
		case 9:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'maxSize',
				elm$json$Json$Encode$float(x));
		case 10:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'minSize',
				elm$json$Json$Encode$float(x));
		case 11:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'maxStrokeWidth',
				elm$json$Json$Encode$float(x));
		case 12:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'minStrokeWidth',
				elm$json$Json$Encode$float(x));
		case 13:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'pointPadding',
				elm$json$Json$Encode$float(x));
		case 14:
			var numOrNull = scaleCfg.a;
			if (!numOrNull.$) {
				var x = numOrNull.a;
				return _Utils_Tuple2(
					'rangeStep',
					elm$json$Json$Encode$float(x));
			} else {
				return _Utils_Tuple2('rangeStep', elm$json$Json$Encode$null);
			}
		case 15:
			var b = scaleCfg.a;
			return _Utils_Tuple2(
				'round',
				elm$json$Json$Encode$bool(b));
		case 16:
			var x = scaleCfg.a;
			return _Utils_Tuple2(
				'textXRangeStep',
				elm$json$Json$Encode$float(x));
		default:
			var b = scaleCfg.a;
			return _Utils_Tuple2(
				'useUnaggregatedDomain',
				elm$json$Json$Encode$bool(b));
	}
};
var author$project$VegaLite$titleConfigSpec = function (titleCfg) {
	switch (titleCfg.$) {
		case 0:
			var an = titleCfg.a;
			return _Utils_Tuple2(
				'anchor',
				elm$json$Json$Encode$string(
					author$project$VegaLite$anchorLabel(an)));
		case 1:
			var x = titleCfg.a;
			return _Utils_Tuple2(
				'angle',
				elm$json$Json$Encode$float(x));
		case 2:
			var va = titleCfg.a;
			return _Utils_Tuple2(
				'baseline',
				elm$json$Json$Encode$string(
					author$project$VegaLite$vAlignLabel(va)));
		case 3:
			var clr = titleCfg.a;
			return _Utils_Tuple2(
				'color',
				elm$json$Json$Encode$string(clr));
		case 4:
			var fnt = titleCfg.a;
			return _Utils_Tuple2(
				'font',
				elm$json$Json$Encode$string(fnt));
		case 5:
			var x = titleCfg.a;
			return _Utils_Tuple2(
				'fontSize',
				elm$json$Json$Encode$float(x));
		case 6:
			var w = titleCfg.a;
			return _Utils_Tuple2(
				'fontWeight',
				author$project$VegaLite$fontWeightSpec(w));
		case 7:
			var x = titleCfg.a;
			return _Utils_Tuple2(
				'limit',
				elm$json$Json$Encode$float(x));
		case 8:
			var x = titleCfg.a;
			return _Utils_Tuple2(
				'offset',
				elm$json$Json$Encode$float(x));
		default:
			var sd = titleCfg.a;
			return _Utils_Tuple2(
				'orient',
				elm$json$Json$Encode$string(
					author$project$VegaLite$sideLabel(sd)));
	}
};
var author$project$VegaLite$viewConfigProperty = function (viewCfg) {
	switch (viewCfg.$) {
		case 0:
			var x = viewCfg.a;
			return _Utils_Tuple2(
				'width',
				elm$json$Json$Encode$float(x));
		case 1:
			var x = viewCfg.a;
			return _Utils_Tuple2(
				'height',
				elm$json$Json$Encode$float(x));
		case 2:
			var b = viewCfg.a;
			return _Utils_Tuple2(
				'clip',
				elm$json$Json$Encode$bool(b));
		case 3:
			var ms = viewCfg.a;
			if (!ms.$) {
				var s = ms.a;
				return _Utils_Tuple2(
					'fill',
					elm$json$Json$Encode$string(s));
			} else {
				return _Utils_Tuple2(
					'fill',
					elm$json$Json$Encode$string(''));
			}
		case 4:
			var x = viewCfg.a;
			return _Utils_Tuple2(
				'fillOpacity',
				elm$json$Json$Encode$float(x));
		case 5:
			var ms = viewCfg.a;
			if (!ms.$) {
				var s = ms.a;
				return _Utils_Tuple2(
					'stroke',
					elm$json$Json$Encode$string(s));
			} else {
				return _Utils_Tuple2(
					'stroke',
					elm$json$Json$Encode$string(''));
			}
		case 6:
			var x = viewCfg.a;
			return _Utils_Tuple2(
				'strokeOpacity',
				elm$json$Json$Encode$float(x));
		case 7:
			var x = viewCfg.a;
			return _Utils_Tuple2(
				'strokeWidth',
				elm$json$Json$Encode$float(x));
		case 8:
			var xs = viewCfg.a;
			return _Utils_Tuple2(
				'strokeDash',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, xs));
		default:
			var x = viewCfg.a;
			return _Utils_Tuple2(
				'strokeDashOffset',
				elm$json$Json$Encode$float(x));
	}
};
var author$project$VegaLite$configProperty = function (configProp) {
	switch (configProp.$) {
		case 1:
			var aus = configProp.a;
			return _Utils_Tuple2(
				'autosize',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$autosizeProperty, aus)));
		case 10:
			var bg = configProp.a;
			return _Utils_Tuple2(
				'background',
				elm$json$Json$Encode$string(bg));
		case 13:
			var s = configProp.a;
			return _Utils_Tuple2(
				'countTitle',
				elm$json$Json$Encode$string(s));
		case 14:
			var ftp = configProp.a;
			return _Utils_Tuple2(
				'fieldTitle',
				elm$json$Json$Encode$string(
					author$project$VegaLite$fieldTitleLabel(ftp)));
		case 27:
			var b = configProp.a;
			return b ? _Utils_Tuple2(
				'invalidValues',
				elm$json$Json$Encode$string('filter')) : _Utils_Tuple2('invalidValues', elm$json$Json$Encode$null);
		case 21:
			var fmt = configProp.a;
			return _Utils_Tuple2(
				'numberFormat',
				elm$json$Json$Encode$string(fmt));
		case 22:
			var pad = configProp.a;
			return _Utils_Tuple2(
				'padding',
				author$project$VegaLite$paddingSpec(pad));
		case 36:
			var fmt = configProp.a;
			return _Utils_Tuple2(
				'timeFormat',
				elm$json$Json$Encode$string(fmt));
		case 2:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axis',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$axisConfigProperty, acs)));
		case 3:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisX',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$axisConfigProperty, acs)));
		case 4:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisY',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$axisConfigProperty, acs)));
		case 5:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisLeft',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$axisConfigProperty, acs)));
		case 6:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisRight',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$axisConfigProperty, acs)));
		case 7:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisTop',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$axisConfigProperty, acs)));
		case 8:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisBottom',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$axisConfigProperty, acs)));
		case 9:
			var acs = configProp.a;
			return _Utils_Tuple2(
				'axisBand',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$axisConfigProperty, acs)));
		case 16:
			var lcs = configProp.a;
			return _Utils_Tuple2(
				'legend',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$legendConfigProperty, lcs)));
		case 19:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'mark',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 24:
			var pps = configProp.a;
			return _Utils_Tuple2(
				'projection',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$projectionProperty, pps)));
		case 0:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'area',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 11:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'bar',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 12:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'circle',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 15:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'geoshape',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 18:
			var hps = configProp.a;
			return _Utils_Tuple2(
				'header',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$headerProperty, hps)));
		case 17:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'line',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 23:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'point',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 26:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'rect',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 28:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'rule',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 31:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'square',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 33:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'text',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 34:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'tick',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
		case 35:
			var tcs = configProp.a;
			return _Utils_Tuple2(
				'title',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$titleConfigSpec, tcs)));
		case 20:
			var styleName = configProp.a;
			var mps = configProp.b;
			return _Utils_Tuple2(
				'style',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							styleName,
							elm$json$Json$Encode$object(
								A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)))
						])));
		case 29:
			var scs = configProp.a;
			return _Utils_Tuple2(
				'scale',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$scaleConfigProperty, scs)));
		case 32:
			var so = configProp.a;
			return author$project$VegaLite$stackOffset(so);
		case 25:
			var rcs = configProp.a;
			return _Utils_Tuple2(
				'range',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$rangeConfigProperty, rcs)));
		case 30:
			var selConfig = configProp.a;
			var selProp = function (_n1) {
				var sel = _n1.a;
				var sps = _n1.b;
				return _Utils_Tuple2(
					author$project$VegaLite$selectionLabel(sel),
					elm$json$Json$Encode$object(
						A2(elm$core$List$map, author$project$VegaLite$selectionProperty, sps)));
			};
			return _Utils_Tuple2(
				'selection',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, selProp, selConfig)));
		case 38:
			var vcs = configProp.a;
			return _Utils_Tuple2(
				'view',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$viewConfigProperty, vcs)));
		default:
			var mps = configProp.a;
			return _Utils_Tuple2(
				'trail',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$VegaLite$markProperty, mps)));
	}
};
var author$project$VegaLite$configuration = function (cfg) {
	return elm$core$List$cons(
		author$project$VegaLite$configProperty(cfg));
};
var author$project$VegaLite$VLConfig = 25;
var author$project$VegaLite$configure = function (configs) {
	return _Utils_Tuple2(
		25,
		elm$json$Json$Encode$object(configs));
};
var author$project$VegaLite$LTitle = function (a) {
	return {$: 32, a: a};
};
var author$project$VegaLite$leTitle = author$project$VegaLite$LTitle;
var author$project$VegaLite$MAggregate = function (a) {
	return {$: 9, a: a};
};
var author$project$VegaLite$mAggregate = author$project$VegaLite$MAggregate;
var author$project$VegaLite$MLegend = function (a) {
	return {$: 10, a: a};
};
var author$project$VegaLite$mLegend = author$project$VegaLite$MLegend;
var author$project$VegaLite$RHeatmap = function (a) {
	return {$: 2, a: a};
};
var author$project$VegaLite$racoHeatmap = author$project$VegaLite$RHeatmap;
var author$project$VegaLite$RLegend = function (a) {
	return {$: 1, a: a};
};
var author$project$VegaLite$reLegend = author$project$VegaLite$RLegend;
var author$project$VegaLite$Rect = 9;
var author$project$VegaLite$rect = author$project$VegaLite$mark(9);
var author$project$VegaLite$resolutionLabel = function (res) {
	if (!res) {
		return 'shared';
	} else {
		return 'independent';
	}
};
var author$project$VegaLite$resolveProperty = function (res) {
	switch (res.$) {
		case 0:
			var chRules = res.a;
			return _Utils_Tuple2(
				'axis',
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$map,
						function (_n1) {
							var ch = _n1.a;
							var chRule = _n1.b;
							return _Utils_Tuple2(
								author$project$VegaLite$channelLabel(ch),
								elm$json$Json$Encode$string(
									author$project$VegaLite$resolutionLabel(chRule)));
						},
						chRules)));
		case 1:
			var chRules = res.a;
			return _Utils_Tuple2(
				'legend',
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$map,
						function (_n2) {
							var ch = _n2.a;
							var chRule = _n2.b;
							return _Utils_Tuple2(
								author$project$VegaLite$channelLabel(ch),
								elm$json$Json$Encode$string(
									author$project$VegaLite$resolutionLabel(chRule)));
						},
						chRules)));
		default:
			var chRules = res.a;
			return _Utils_Tuple2(
				'scale',
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$map,
						function (_n3) {
							var ch = _n3.a;
							var chRule = _n3.b;
							return _Utils_Tuple2(
								author$project$VegaLite$channelLabel(ch),
								elm$json$Json$Encode$string(
									author$project$VegaLite$resolutionLabel(chRule)));
						},
						chRules)));
	}
};
var author$project$VegaLite$resolution = function (res) {
	return elm$core$List$cons(
		author$project$VegaLite$resolveProperty(res));
};
var author$project$VegaLite$VLResolve = 20;
var author$project$VegaLite$resolve = function (res) {
	return _Utils_Tuple2(
		20,
		elm$json$Json$Encode$object(res));
};
var author$project$VegaLite$size = function (markProps) {
	return elm$core$List$cons(
		_Utils_Tuple2(
			'size',
			elm$json$Json$Encode$object(
				A2(elm$core$List$concatMap, author$project$VegaLite$markChannelProperty, markProps))));
};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var author$project$GalleryMulti$multi4 = function () {
	var selTrans = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$transform,
		author$project$VegaLite$filter(
			author$project$VegaLite$fiSelection('myPts')));
	var sel = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$selection,
		A3(
			author$project$VegaLite$select,
			'myPts',
			0,
			_List_fromArray(
				[
					author$project$VegaLite$seEncodings(
					_List_fromArray(
						[author$project$VegaLite$chX]))
				])));
	var res = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$resolve,
		author$project$VegaLite$resolution(
			author$project$VegaLite$reLegend(
				_List_fromArray(
					[
						_Utils_Tuple2(author$project$VegaLite$chColor, 1),
						_Utils_Tuple2(author$project$VegaLite$chSize, 1)
					]))));
	var encPosition = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$VegaLite$encoding,
			A2(
				author$project$VegaLite$position,
				0,
				_List_fromArray(
					[
						author$project$VegaLite$pName('IMDB_Rating'),
						author$project$VegaLite$pMType(2),
						author$project$VegaLite$pBin(
						_List_fromArray(
							[
								author$project$VegaLite$biMaxBins(10)
							]))
					]))),
		A2(
			author$project$VegaLite$position,
			1,
			_List_fromArray(
				[
					author$project$VegaLite$pName('Rotten_Tomatoes_Rating'),
					author$project$VegaLite$pMType(2),
					author$project$VegaLite$pBin(
					_List_fromArray(
						[
							author$project$VegaLite$biMaxBins(10)
						]))
				])));
	var encBar = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				author$project$VegaLite$encoding,
				A2(
					author$project$VegaLite$position,
					0,
					_List_fromArray(
						[
							author$project$VegaLite$pName('Major_Genre'),
							author$project$VegaLite$pMType(0),
							author$project$VegaLite$pAxis(
							_List_fromArray(
								[
									author$project$VegaLite$axLabelAngle(-40)
								]))
						]))),
			A2(
				author$project$VegaLite$position,
				1,
				_List_fromArray(
					[
						author$project$VegaLite$pAggregate(author$project$VegaLite$opCount),
						author$project$VegaLite$pMType(2)
					]))),
		author$project$VegaLite$color(
			_List_fromArray(
				[
					A3(
					author$project$VegaLite$mSelectionCondition,
					author$project$VegaLite$selectionName('myPts'),
					_List_fromArray(
						[
							author$project$VegaLite$mStr('steelblue')
						]),
					_List_fromArray(
						[
							author$project$VegaLite$mStr('grey')
						]))
				])));
	var enc2 = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$VegaLite$encoding,
			author$project$VegaLite$size(
				_List_fromArray(
					[
						author$project$VegaLite$mAggregate(author$project$VegaLite$opCount),
						author$project$VegaLite$mMType(2),
						author$project$VegaLite$mLegend(
						_List_fromArray(
							[
								author$project$VegaLite$leTitle('In Selected Category')
							]))
					]))),
		author$project$VegaLite$color(
			_List_fromArray(
				[
					author$project$VegaLite$mStr('#666')
				])));
	var spec2 = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				selTrans(_List_Nil),
				author$project$VegaLite$point(_List_Nil),
				enc2(_List_Nil)
			]));
	var enc1 = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$encoding,
		author$project$VegaLite$color(
			_List_fromArray(
				[
					author$project$VegaLite$mAggregate(author$project$VegaLite$opCount),
					author$project$VegaLite$mMType(2),
					author$project$VegaLite$mLegend(
					_List_fromArray(
						[
							author$project$VegaLite$leTitle('')
						]))
				])));
	var spec1 = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				author$project$VegaLite$width(300),
				author$project$VegaLite$rect(_List_Nil),
				enc1(_List_Nil)
			]));
	var heatSpec = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				encPosition(_List_Nil),
				author$project$VegaLite$layer(
				_List_fromArray(
					[spec1, spec2]))
			]));
	var des = author$project$VegaLite$description('A dashboard with cross-highlighting');
	var config = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$configure,
		author$project$VegaLite$configuration(
			author$project$VegaLite$coRange(
				_List_fromArray(
					[
						author$project$VegaLite$racoHeatmap('greenblue')
					]))));
	var barSpec = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				author$project$VegaLite$width(420),
				author$project$VegaLite$height(120),
				author$project$VegaLite$bar(_List_Nil),
				sel(_List_Nil),
				encBar(_List_Nil)
			]));
	return author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				des,
				A2(author$project$VegaLite$dataFromUrl, 'https://vega.github.io/vega-lite/data/movies.json', _List_Nil),
				author$project$VegaLite$vConcat(
				_List_fromArray(
					[heatSpec, barSpec])),
				res(_List_Nil),
				config(_List_Nil)
			]));
}();
var author$project$VegaLite$Multi = 1;
var author$project$VegaLite$DStrings = function (a) {
	return {$: 1, a: a};
};
var author$project$VegaLite$RStrings = function (a) {
	return {$: 1, a: a};
};
var author$project$VegaLite$SRange = function (a) {
	return {$: 2, a: a};
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
var author$project$VegaLite$categoricalDomainMap = function (scaleDomainPairs) {
	var _n0 = elm$core$List$unzip(scaleDomainPairs);
	var domain = _n0.a;
	var range = _n0.b;
	return _List_fromArray(
		[
			author$project$VegaLite$SDomain(
			author$project$VegaLite$DStrings(domain)),
			author$project$VegaLite$SRange(
			author$project$VegaLite$RStrings(range))
		]);
};
var author$project$VegaLite$DNumbers = function (a) {
	return {$: 0, a: a};
};
var author$project$VegaLite$doNums = author$project$VegaLite$DNumbers;
var author$project$VegaLite$MScale = function (a) {
	return {$: 3, a: a};
};
var author$project$VegaLite$mScale = author$project$VegaLite$MScale;
var author$project$VegaLite$MTitle = function (a) {
	return {$: 8, a: a};
};
var author$project$VegaLite$mTitle = author$project$VegaLite$MTitle;
var author$project$VegaLite$MonthDate = {$: 11};
var author$project$VegaLite$monthDate = author$project$VegaLite$MonthDate;
var author$project$VegaLite$PTimeUnit = function (a) {
	return {$: 7, a: a};
};
var author$project$VegaLite$pTimeUnit = author$project$VegaLite$PTimeUnit;
var author$project$VegaLite$VLTitle = 2;
var author$project$VegaLite$title = function (s) {
	return _Utils_Tuple2(
		2,
		elm$json$Json$Encode$string(s));
};
var author$project$GalleryMulti$multi5 = function () {
	var weatherColors = author$project$VegaLite$categoricalDomainMap(
		_List_fromArray(
			[
				_Utils_Tuple2('sun', '#e7ba52'),
				_Utils_Tuple2('fog', '#c7c7c7'),
				_Utils_Tuple2('drizzle', '#aec7ea'),
				_Utils_Tuple2('rain', '#1f77b4'),
				_Utils_Tuple2('snow', '#9467bd')
			]));
	var trans2 = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$transform,
		author$project$VegaLite$filter(
			author$project$VegaLite$fiSelection('myBrush')));
	var trans1 = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$transform,
		author$project$VegaLite$filter(
			author$project$VegaLite$fiSelection('myClick')));
	var sel2 = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$selection,
		A3(
			author$project$VegaLite$select,
			'myClick',
			1,
			_List_fromArray(
				[
					author$project$VegaLite$seEncodings(
					_List_fromArray(
						[author$project$VegaLite$chColor]))
				])));
	var sel1 = A2(
		elm$core$Basics$composeL,
		author$project$VegaLite$selection,
		A3(
			author$project$VegaLite$select,
			'myBrush',
			2,
			_List_fromArray(
				[
					author$project$VegaLite$seEncodings(
					_List_fromArray(
						[author$project$VegaLite$chX]))
				])));
	var enc2 = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				author$project$VegaLite$encoding,
				A2(
					author$project$VegaLite$position,
					0,
					_List_fromArray(
						[
							author$project$VegaLite$pAggregate(author$project$VegaLite$opCount),
							author$project$VegaLite$pMType(2)
						]))),
			A2(
				author$project$VegaLite$position,
				1,
				_List_fromArray(
					[
						author$project$VegaLite$pName('weather'),
						author$project$VegaLite$pMType(0)
					]))),
		author$project$VegaLite$color(
			_List_fromArray(
				[
					A3(
					author$project$VegaLite$mSelectionCondition,
					author$project$VegaLite$selectionName('myClick'),
					_List_fromArray(
						[
							author$project$VegaLite$mName('weather'),
							author$project$VegaLite$mMType(0),
							author$project$VegaLite$mScale(weatherColors)
						]),
					_List_fromArray(
						[
							author$project$VegaLite$mStr('#acbf98')
						]))
				])));
	var spec2 = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				author$project$VegaLite$width(600),
				author$project$VegaLite$bar(_List_Nil),
				sel2(_List_Nil),
				trans2(_List_Nil),
				enc2(_List_Nil)
			]));
	var enc1 = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				A2(
					elm$core$Basics$composeL,
					author$project$VegaLite$encoding,
					A2(
						author$project$VegaLite$position,
						0,
						_List_fromArray(
							[
								author$project$VegaLite$pName('date'),
								author$project$VegaLite$pMType(3),
								author$project$VegaLite$pTimeUnit(author$project$VegaLite$monthDate),
								author$project$VegaLite$pAxis(
								_List_fromArray(
									[
										author$project$VegaLite$axTitle('Date'),
										author$project$VegaLite$axFormat('%b')
									]))
							]))),
				A2(
					author$project$VegaLite$position,
					1,
					_List_fromArray(
						[
							author$project$VegaLite$pName('temp_max'),
							author$project$VegaLite$pMType(2),
							author$project$VegaLite$pScale(
							_List_fromArray(
								[
									author$project$VegaLite$scDomain(
									author$project$VegaLite$doNums(
										_List_fromArray(
											[-5, 40])))
								])),
							author$project$VegaLite$pAxis(
							_List_fromArray(
								[
									author$project$VegaLite$axTitle('Maximum Daily Temperature (C)')
								]))
						]))),
			author$project$VegaLite$color(
				_List_fromArray(
					[
						A3(
						author$project$VegaLite$mSelectionCondition,
						author$project$VegaLite$selectionName('myBrush'),
						_List_fromArray(
							[
								author$project$VegaLite$mName('weather'),
								author$project$VegaLite$mTitle('Weather'),
								author$project$VegaLite$mMType(0),
								author$project$VegaLite$mScale(weatherColors)
							]),
						_List_fromArray(
							[
								author$project$VegaLite$mStr('#cfdebe')
							]))
					]))),
		author$project$VegaLite$size(
			_List_fromArray(
				[
					author$project$VegaLite$mName('precipitation'),
					author$project$VegaLite$mMType(2),
					author$project$VegaLite$mScale(
					_List_fromArray(
						[
							author$project$VegaLite$scDomain(
							author$project$VegaLite$doNums(
								_List_fromArray(
									[-1, 50])))
						]))
				])));
	var spec1 = author$project$VegaLite$asSpec(
		_List_fromArray(
			[
				author$project$VegaLite$width(600),
				author$project$VegaLite$height(300),
				author$project$VegaLite$point(_List_Nil),
				sel1(_List_Nil),
				trans1(_List_Nil),
				enc1(_List_Nil)
			]));
	var des = author$project$VegaLite$description('A dashboard with cross-highlighting');
	return author$project$VegaLite$toVegaLite(
		_List_fromArray(
			[
				author$project$VegaLite$title('Seattle Weather, 2012-2015'),
				des,
				A2(author$project$VegaLite$dataFromUrl, 'https://vega.github.io/vega-lite/data/seattle-weather.csv', _List_Nil),
				author$project$VegaLite$vConcat(
				_List_fromArray(
					[spec1, spec2]))
			]));
}();
var author$project$VegaLite$combineSpecs = function (specs) {
	return elm$json$Json$Encode$object(specs);
};
var author$project$GalleryMulti$mySpecs = author$project$VegaLite$combineSpecs(
	_List_fromArray(
		[
			_Utils_Tuple2('multi1', author$project$GalleryMulti$multi1),
			_Utils_Tuple2('multi2', author$project$GalleryMulti$multi2),
			_Utils_Tuple2('multi3', author$project$GalleryMulti$multi3),
			_Utils_Tuple2('multi4', author$project$GalleryMulti$multi4),
			_Utils_Tuple2('multi5', author$project$GalleryMulti$multi5)
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
var author$project$GalleryMulti$main = elm$core$Platform$worker(
	{
		at: elm$core$Basics$always(
			_Utils_Tuple2(
				author$project$GalleryMulti$mySpecs,
				author$project$GalleryMulti$elmToJS(author$project$GalleryMulti$mySpecs))),
		az: elm$core$Basics$always(elm$core$Platform$Sub$none),
		aB: F2(
			function (_n0, model) {
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			})
	});
_Platform_export({'GalleryMulti':{'init':author$project$GalleryMulti$main(
	elm$json$Json$Decode$succeed(0))(0)}});}(this));
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
		impl.as,
		impl.aA,
		impl.ay,
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




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		k: func(record.k),
		M: record.M,
		K: record.K
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || key !== 'checked' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.k;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.M;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.K) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.as,
		impl.aA,
		impl.ay,
		function(sendToApp, initialModel) {
			var view = impl.aC;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.as,
		impl.aA,
		impl.ay,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.B && impl.B(sendToApp)
			var view = impl.aC;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.al);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.az) && (_VirtualDom_doc.title = title = doc.az);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.au;
	var onUrlRequest = impl.av;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		B: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.ab === next.ab
							&& curr.T === next.T
							&& curr.Z.a === next.Z.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		as: function(flags)
		{
			return A3(impl.as, flags, _Browser_getUrl(), key);
		},
		aC: impl.aC,
		aA: impl.aA,
		ay: impl.ay
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { aq: 'hidden', z: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { aq: 'mozHidden', z: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { aq: 'msHidden', z: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { aq: 'webkitHidden', z: 'webkitvisibilitychange' }
		: { aq: 'hidden', z: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		af: _Browser_getScene(),
		ai: {
			G: _Browser_window.pageXOffset,
			H: _Browser_window.pageYOffset,
			x: _Browser_doc.documentElement.clientWidth,
			s: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		x: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		s: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			af: {
				x: node.scrollWidth,
				s: node.scrollHeight
			},
			ai: {
				G: node.scrollLeft,
				H: node.scrollTop,
				x: node.clientWidth,
				s: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			af: _Browser_getScene(),
			ai: {
				G: x,
				H: y,
				x: _Browser_doc.documentElement.clientWidth,
				s: _Browser_doc.documentElement.clientHeight
			},
			an: {
				G: x + rect.left,
				H: y + rect.top,
				x: rect.width,
				s: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var elm$core$Basics$identity = function (x) {
	return x;
};
var author$project$TransformTests$elmToJS = _Platform_outgoingPort('elmToJS', elm$core$Basics$identity);
var author$project$Vega$APad = {$: 5};
var author$project$Vega$asPad = author$project$Vega$APad;
var author$project$Vega$VAutosize = 5;
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
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Vega$signalReferenceProperty = function (sigRef) {
	return _Utils_Tuple2(
		'signal',
		elm$json$Json$Encode$string(sigRef));
};
var elm$json$Json$Encode$bool = _Json_wrap;
var author$project$Vega$autosizeProperty = function (asCfg) {
	switch (asCfg.$) {
		case 5:
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
				elm$json$Json$Encode$string('fit-x'));
		case 3:
			return _Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string('fit-y'));
		case 4:
			return _Utils_Tuple2(
				'type',
				elm$json$Json$Encode$string('none'));
		case 7:
			return _Utils_Tuple2(
				'resize',
				elm$json$Json$Encode$bool(true));
		case 0:
			return _Utils_Tuple2(
				'contains',
				elm$json$Json$Encode$string('content'));
		case 6:
			return _Utils_Tuple2(
				'contains',
				elm$json$Json$Encode$string('padding'));
		default:
			var sigName = asCfg.a;
			return author$project$Vega$signalReferenceProperty(sigName);
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
var author$project$Vega$autosize = function (aus) {
	return _Utils_Tuple2(
		5,
		elm$json$Json$Encode$object(
			A2(elm$core$List$map, author$project$Vega$autosizeProperty, aus)));
};
var author$project$Vega$AxDomain = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$axDomain = author$project$Vega$AxDomain;
var author$project$Vega$AxGrid = function (a) {
	return {$: 13, a: a};
};
var author$project$Vega$axGrid = author$project$Vega$AxGrid;
var author$project$Vega$AxTitle = function (a) {
	return {$: 54, a: a};
};
var author$project$Vega$axTitle = author$project$Vega$AxTitle;
var author$project$Vega$VAxes = 11;
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var author$project$Vega$axes = function (axs) {
	return _Utils_Tuple2(
		11,
		A2(elm$json$Json$Encode$list, elm$core$Basics$identity, axs));
};
var author$project$Vega$AxScale = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$AxSide = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$anchorSpec = function (anchor) {
	switch (anchor.$) {
		case 0:
			return elm$json$Json$Encode$string('start');
		case 1:
			return elm$json$Json$Encode$string('middle');
		case 2:
			return elm$json$Json$Encode$string('end');
		default:
			var sigName = anchor.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sigName)
					]));
	}
};
var author$project$Vega$axisElementLabel = function (el) {
	switch (el) {
		case 0:
			return 'axis';
		case 1:
			return 'ticks';
		case 2:
			return 'grid';
		case 3:
			return 'labels';
		case 4:
			return 'title';
		default:
			return 'domain';
	}
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
var author$project$Vega$VGradientScale = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var author$project$Vega$colorGradientSpec = function (gr) {
	if (!gr) {
		return elm$json$Json$Encode$string('linear');
	} else {
		return elm$json$Json$Encode$string('radial');
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
var elm$json$Json$Encode$null = _Json_encodeNull;
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
var author$project$Vega$stopSpec = function (_n0) {
	var n = _n0.a;
	var c = _n0.b;
	return elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'offset',
				author$project$Vega$numSpec(n)),
				_Utils_Tuple2(
				'color',
				elm$json$Json$Encode$string(c))
			]));
};
var author$project$Vega$gradientProperty = function (gp) {
	switch (gp.$) {
		case 0:
			var n = gp.a;
			return _Utils_Tuple2(
				'x1',
				author$project$Vega$numSpec(n));
		case 1:
			var n = gp.a;
			return _Utils_Tuple2(
				'y1',
				author$project$Vega$numSpec(n));
		case 2:
			var n = gp.a;
			return _Utils_Tuple2(
				'x2',
				author$project$Vega$numSpec(n));
		case 3:
			var n = gp.a;
			return _Utils_Tuple2(
				'y2',
				author$project$Vega$numSpec(n));
		case 4:
			var n = gp.a;
			return _Utils_Tuple2(
				'r1',
				author$project$Vega$numSpec(n));
		case 5:
			var n = gp.a;
			return _Utils_Tuple2(
				'r2',
				author$project$Vega$numSpec(n));
		default:
			var grs = gp.a;
			return _Utils_Tuple2(
				'stops',
				A2(elm$json$Json$Encode$list, author$project$Vega$stopSpec, grs));
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
var author$project$Vega$gradientScaleProperty = function (gp) {
	switch (gp.$) {
		case 0:
			var n = gp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'start', n);
		case 1:
			var n = gp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'stop', n);
		default:
			var n = gp.a;
			return _Utils_Tuple2(
				'count',
				author$project$Vega$numSpec(n));
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
			var cGrad = val.a;
			var gps = val.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'value',
					elm$json$Json$Encode$object(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								'gradient',
								author$project$Vega$colorGradientSpec(cGrad)),
							A2(elm$core$List$map, author$project$Vega$gradientProperty, gps))))
				]);
		case 12:
			var v = val.a;
			var gps = val.b;
			return A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					'gradient',
					author$project$Vega$valueSpec(v)),
				A2(elm$core$List$map, author$project$Vega$gradientScaleProperty, gps));
		case 13:
			var fVal = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'field',
					author$project$Vega$fieldSpec(fVal))
				]);
		case 14:
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
		case 15:
			var n = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'band',
					author$project$Vega$numSpec(n))
				]);
		case 16:
			var v = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'exponent',
					author$project$Vega$valueSpec(v))
				]);
		case 17:
			var v = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'mult',
					author$project$Vega$valueSpec(v))
				]);
		case 18:
			var v = val.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'offset',
					author$project$Vega$valueSpec(v))
				]);
		case 19:
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
		case 20:
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
			var cGrad = val.a;
			var gps = val.b;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'gradient',
						author$project$Vega$colorGradientSpec(cGrad)),
					A2(elm$core$List$map, author$project$Vega$gradientProperty, gps)));
		case 12:
			var v = val.a;
			var gps = val.b;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'gradient',
						author$project$Vega$valueSpec(v)),
					A2(elm$core$List$map, author$project$Vega$gradientScaleProperty, gps)));
		case 13:
			var fName = val.a;
			return author$project$Vega$fieldSpec(fName);
		case 14:
			var fName = val.a;
			return author$project$Vega$fieldSpec(fName);
		case 15:
			var n = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'band',
						author$project$Vega$numSpec(n))
					]));
		case 16:
			var v = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'exponent',
						author$project$Vega$valueSpec(v))
					]));
		case 17:
			var v = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'mult',
						author$project$Vega$valueSpec(v))
					]));
		case 18:
			var v = val.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'offset',
						author$project$Vega$valueSpec(v))
					]));
		case 19:
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
		case 20:
			return elm$json$Json$Encode$null;
		default:
			return elm$json$Json$Encode$null;
	}
};
var author$project$Vega$valIfElse = F4(
	function (ex, ifVals, elseVals, ifSpecs) {
		valIfElse:
		while (true) {
			if ((elseVals.b && (elseVals.a.$ === 21)) && (!elseVals.b.b)) {
				var _n4 = elseVals.a;
				var ex2 = _n4.a;
				var ifVals2 = _n4.b;
				var elseVals2 = _n4.c;
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
	_n0$2:
	while (true) {
		if (vs.b && (!vs.b.b)) {
			switch (vs.a.$) {
				case 21:
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
				case 12:
					var _n2 = vs.a;
					var v = _n2.a;
					var gps = _n2.b;
					return author$project$Vega$valueSpec(
						A2(author$project$Vega$VGradientScale, v, gps));
				default:
					break _n0$2;
			}
		} else {
			break _n0$2;
		}
	}
	return elm$json$Json$Encode$object(
		A2(elm$core$List$concatMap, author$project$Vega$valueProperties, vs));
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
		case 53:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'limit',
				author$project$Vega$valRef(vals));
		case 51:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'lineBreak',
				author$project$Vega$valRef(vals));
		case 52:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'lineHeight',
				author$project$Vega$valRef(vals));
		case 54:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'radius',
				author$project$Vega$valRef(vals));
		case 55:
			var vals = mProp.a;
			return _Utils_Tuple2(
				'text',
				author$project$Vega$valRef(vals));
		case 56:
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
var author$project$Vega$hAlignSpec = function (align) {
	switch (align.$) {
		case 1:
			return elm$json$Json$Encode$string('left');
		case 0:
			return elm$json$Json$Encode$string('center');
		case 2:
			return elm$json$Json$Encode$string('right');
		default:
			var sig = align.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$overlapStrategySpec = function (strat) {
	switch (strat.$) {
		case 0:
			return elm$json$Json$Encode$string('false');
		case 1:
			return elm$json$Json$Encode$string('parity');
		case 2:
			return elm$json$Json$Encode$string('greedy');
		default:
			var sig = strat.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$sideSpec = function (orient) {
	switch (orient.$) {
		case 0:
			return elm$json$Json$Encode$string('left');
		case 3:
			return elm$json$Json$Encode$string('bottom');
		case 1:
			return elm$json$Json$Encode$string('right');
		case 2:
			return elm$json$Json$Encode$string('top');
		default:
			var sig = orient.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$timeUnitSpec = function (tUnit) {
	var timeUnitLabel = function (tu) {
		switch (tu.$) {
			case 0:
				return 'year';
			case 1:
				return 'month';
			case 2:
				return 'week';
			case 3:
				return 'day';
			case 4:
				return 'hour';
			case 5:
				return 'minute';
			case 6:
				return 'second';
			case 7:
				return 'millisecond';
			default:
				var sig = tu.a;
				return '';
		}
	};
	if (tUnit.$ === 8) {
		var sig = tUnit.a;
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					author$project$Vega$signalReferenceProperty(sig)
				]));
	} else {
		return elm$json$Json$Encode$string(
			timeUnitLabel(tUnit));
	}
};
var author$project$Vega$vAlignSpec = function (align) {
	switch (align.$) {
		case 0:
			return elm$json$Json$Encode$string('top');
		case 1:
			return elm$json$Json$Encode$string('middle');
		case 2:
			return elm$json$Json$Encode$string('bottom');
		case 3:
			return elm$json$Json$Encode$string('alphabetic');
		default:
			var sig = align.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$axisProperty = function (ap) {
	switch (ap.$) {
		case 0:
			var scName = ap.a;
			return _Utils_Tuple2(
				'scale',
				elm$json$Json$Encode$string(scName));
		case 1:
			var axSide = ap.a;
			return _Utils_Tuple2(
				'orient',
				author$project$Vega$sideSpec(axSide));
		case 2:
			var n = ap.a;
			return _Utils_Tuple2(
				'bandPosition',
				author$project$Vega$numSpec(n));
		case 3:
			var b = ap.a;
			return _Utils_Tuple2(
				'domain',
				author$project$Vega$booSpec(b));
		case 6:
			var s = ap.a;
			return _Utils_Tuple2(
				'domainColor',
				author$project$Vega$strSpec(s));
		case 4:
			var vals = ap.a;
			return _Utils_Tuple2(
				'domainDash',
				author$project$Vega$valRef(vals));
		case 5:
			var n = ap.a;
			return _Utils_Tuple2(
				'domainDashOffset',
				author$project$Vega$numSpec(n));
		case 7:
			var n = ap.a;
			return _Utils_Tuple2(
				'domainOpacity',
				author$project$Vega$numSpec(n));
		case 8:
			var n = ap.a;
			return _Utils_Tuple2(
				'domainWidth',
				author$project$Vega$numSpec(n));
		case 9:
			var elEncs = ap.a;
			var enc = function (_n1) {
				var el = _n1.a;
				var encProps = _n1.b;
				return _Utils_Tuple2(
					author$project$Vega$axisElementLabel(el),
					elm$json$Json$Encode$object(
						A2(elm$core$List$map, author$project$Vega$encodingProperty, encProps)));
			};
			return _Utils_Tuple2(
				'encode',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, enc, elEncs)));
		case 10:
			var fmt = ap.a;
			return _Utils_Tuple2(
				'format',
				author$project$Vega$strSpec(fmt));
		case 11:
			return _Utils_Tuple2(
				'formatType',
				elm$json$Json$Encode$string('number'));
		case 12:
			return _Utils_Tuple2(
				'formatType',
				elm$json$Json$Encode$string('time'));
		case 13:
			var b = ap.a;
			return _Utils_Tuple2(
				'grid',
				author$project$Vega$booSpec(b));
		case 14:
			var s = ap.a;
			return _Utils_Tuple2(
				'gridColor',
				author$project$Vega$strSpec(s));
		case 15:
			var vals = ap.a;
			return _Utils_Tuple2(
				'gridDash',
				author$project$Vega$valRef(vals));
		case 16:
			var n = ap.a;
			return _Utils_Tuple2(
				'gridDashOffset',
				author$project$Vega$numSpec(n));
		case 17:
			var n = ap.a;
			return _Utils_Tuple2(
				'gridOpacity',
				author$project$Vega$numSpec(n));
		case 18:
			var s = ap.a;
			return _Utils_Tuple2(
				'gridScale',
				elm$json$Json$Encode$string(s));
		case 19:
			var n = ap.a;
			return _Utils_Tuple2(
				'gridWidth',
				author$project$Vega$numSpec(n));
		case 20:
			var b = ap.a;
			return _Utils_Tuple2(
				'labels',
				author$project$Vega$booSpec(b));
		case 21:
			var ha = ap.a;
			return _Utils_Tuple2(
				'labelAlign',
				author$project$Vega$hAlignSpec(ha));
		case 22:
			var n = ap.a;
			return _Utils_Tuple2(
				'labelAngle',
				author$project$Vega$numSpec(n));
		case 23:
			var va = ap.a;
			return _Utils_Tuple2(
				'labelBaseline',
				author$project$Vega$vAlignSpec(va));
		case 24:
			var n = ap.a;
			if (n.$ === 6) {
				return _Utils_Tuple2(
					'labelBound',
					elm$json$Json$Encode$bool(false));
			} else {
				return _Utils_Tuple2(
					'labelBound',
					author$project$Vega$numSpec(n));
			}
		case 25:
			var s = ap.a;
			return _Utils_Tuple2(
				'labelColor',
				author$project$Vega$strSpec(s));
		case 26:
			var n = ap.a;
			if (n.$ === 6) {
				return _Utils_Tuple2(
					'labelFlush',
					elm$json$Json$Encode$bool(false));
			} else {
				return _Utils_Tuple2(
					'labelFlush',
					author$project$Vega$numSpec(n));
			}
		case 27:
			var pad = ap.a;
			return _Utils_Tuple2(
				'labelFlushOffset',
				author$project$Vega$numSpec(pad));
		case 28:
			var s = ap.a;
			return _Utils_Tuple2(
				'labelFont',
				author$project$Vega$strSpec(s));
		case 29:
			var n = ap.a;
			return _Utils_Tuple2(
				'labelFontSize',
				author$project$Vega$numSpec(n));
		case 30:
			var s = ap.a;
			return _Utils_Tuple2(
				'labelFontStyle',
				author$project$Vega$strSpec(s));
		case 31:
			var val = ap.a;
			return _Utils_Tuple2(
				'labelFontWeight',
				author$project$Vega$valueSpec(val));
		case 32:
			var n = ap.a;
			return _Utils_Tuple2(
				'labelLimit',
				author$project$Vega$numSpec(n));
		case 33:
			var n = ap.a;
			return _Utils_Tuple2(
				'labelOpacity',
				author$project$Vega$numSpec(n));
		case 34:
			var strat = ap.a;
			return _Utils_Tuple2(
				'labelOverlap',
				author$project$Vega$overlapStrategySpec(strat));
		case 35:
			var pad = ap.a;
			return _Utils_Tuple2(
				'labelPadding',
				author$project$Vega$numSpec(pad));
		case 36:
			var n = ap.a;
			return _Utils_Tuple2(
				'labelSeparation',
				author$project$Vega$numSpec(n));
		case 38:
			var val = ap.a;
			return _Utils_Tuple2(
				'maxExtent',
				author$project$Vega$valueSpec(val));
		case 37:
			var val = ap.a;
			return _Utils_Tuple2(
				'minExtent',
				author$project$Vega$valueSpec(val));
		case 39:
			var val = ap.a;
			return _Utils_Tuple2(
				'offset',
				author$project$Vega$valueSpec(val));
		case 40:
			var val = ap.a;
			return _Utils_Tuple2(
				'position',
				author$project$Vega$valueSpec(val));
		case 41:
			var b = ap.a;
			return _Utils_Tuple2(
				'ticks',
				author$project$Vega$booSpec(b));
		case 42:
			var s = ap.a;
			return _Utils_Tuple2(
				'tickColor',
				author$project$Vega$strSpec(s));
		case 43:
			var n = ap.a;
			return _Utils_Tuple2(
				'tickCount',
				author$project$Vega$numSpec(n));
		case 44:
			var tu = ap.a;
			var n = ap.b;
			switch (n.$) {
				case 0:
					var step = n.a;
					return (step <= 0) ? _Utils_Tuple2(
						'tickCount',
						author$project$Vega$timeUnitSpec(tu)) : _Utils_Tuple2(
						'tickCount',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'interval',
									author$project$Vega$timeUnitSpec(tu)),
									_Utils_Tuple2(
									'step',
									author$project$Vega$numSpec(n))
								])));
				case 2:
					return _Utils_Tuple2(
						'tickCount',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'interval',
									author$project$Vega$timeUnitSpec(tu)),
									_Utils_Tuple2(
									'step',
									author$project$Vega$numSpec(n))
								])));
				case 5:
					return _Utils_Tuple2(
						'tickCount',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'interval',
									author$project$Vega$timeUnitSpec(tu)),
									_Utils_Tuple2(
									'step',
									author$project$Vega$numSpec(n))
								])));
				default:
					return _Utils_Tuple2(
						'tickCount',
						author$project$Vega$timeUnitSpec(tu));
			}
		case 45:
			var vals = ap.a;
			return _Utils_Tuple2(
				'tickDash',
				author$project$Vega$valRef(vals));
		case 46:
			var n = ap.a;
			return _Utils_Tuple2(
				'tickDashOffset',
				author$project$Vega$numSpec(n));
		case 48:
			var b = ap.a;
			return _Utils_Tuple2(
				'tickExtra',
				author$project$Vega$booSpec(b));
		case 47:
			var n = ap.a;
			return _Utils_Tuple2(
				'tickMinStep',
				author$project$Vega$numSpec(n));
		case 49:
			var n = ap.a;
			return _Utils_Tuple2(
				'tickOffset',
				author$project$Vega$numSpec(n));
		case 50:
			var n = ap.a;
			return _Utils_Tuple2(
				'tickOpacity',
				author$project$Vega$numSpec(n));
		case 51:
			var b = ap.a;
			return _Utils_Tuple2(
				'tickRound',
				author$project$Vega$booSpec(b));
		case 52:
			var n = ap.a;
			return _Utils_Tuple2(
				'tickSize',
				author$project$Vega$numSpec(n));
		case 53:
			var n = ap.a;
			return _Utils_Tuple2(
				'tickWidth',
				author$project$Vega$numSpec(n));
		case 54:
			var s = ap.a;
			return _Utils_Tuple2(
				'title',
				author$project$Vega$strSpec(s));
		case 56:
			var ha = ap.a;
			return _Utils_Tuple2(
				'titleAlign',
				author$project$Vega$hAlignSpec(ha));
		case 55:
			var an = ap.a;
			return _Utils_Tuple2(
				'titleAnchor',
				author$project$Vega$anchorSpec(an));
		case 57:
			var n = ap.a;
			return _Utils_Tuple2(
				'titleAngle',
				author$project$Vega$numSpec(n));
		case 58:
			var va = ap.a;
			return _Utils_Tuple2(
				'titleBaseline',
				author$project$Vega$vAlignSpec(va));
		case 59:
			var s = ap.a;
			return _Utils_Tuple2(
				'titleColor',
				author$project$Vega$strSpec(s));
		case 60:
			var s = ap.a;
			return _Utils_Tuple2(
				'titleFont',
				author$project$Vega$strSpec(s));
		case 61:
			var n = ap.a;
			return _Utils_Tuple2(
				'titleFontSize',
				author$project$Vega$numSpec(n));
		case 62:
			var s = ap.a;
			return _Utils_Tuple2(
				'titleFontStyle',
				author$project$Vega$strSpec(s));
		case 63:
			var val = ap.a;
			return _Utils_Tuple2(
				'titleFontWeight',
				author$project$Vega$valueSpec(val));
		case 64:
			var n = ap.a;
			return _Utils_Tuple2(
				'titleLimit',
				author$project$Vega$numSpec(n));
		case 65:
			var n = ap.a;
			return _Utils_Tuple2(
				'titleLineHeight',
				author$project$Vega$numSpec(n));
		case 66:
			var n = ap.a;
			return _Utils_Tuple2(
				'titleOpacity',
				author$project$Vega$numSpec(n));
		case 67:
			var val = ap.a;
			return _Utils_Tuple2(
				'titlePadding',
				author$project$Vega$valueSpec(val));
		case 68:
			var n = ap.a;
			return _Utils_Tuple2(
				'titleX',
				author$project$Vega$numSpec(n));
		case 69:
			var n = ap.a;
			return _Utils_Tuple2(
				'titleY',
				author$project$Vega$numSpec(n));
		case 70:
			var vals = ap.a;
			return _Utils_Tuple2(
				'values',
				author$project$Vega$valueSpec(vals));
		default:
			var n = ap.a;
			return _Utils_Tuple2(
				'zindex',
				author$project$Vega$numSpec(n));
	}
};
var author$project$Vega$axis = F3(
	function (scName, side, aps) {
		return elm$core$List$cons(
			elm$json$Json$Encode$object(
				A2(
					elm$core$List$map,
					author$project$Vega$axisProperty,
					A2(
						elm$core$List$cons,
						author$project$Vega$AxScale(scName),
						A2(
							elm$core$List$cons,
							author$project$Vega$AxSide(side),
							aps)))));
	});
var author$project$Vega$VStr = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$vStr = author$project$Vega$VStr;
var author$project$Vega$black = author$project$Vega$vStr('black');
var author$project$Vega$CfScaleRange = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var author$project$Vega$cfScaleRange = author$project$Vega$CfScaleRange;
var author$project$Vega$CnCount = function (a) {
	return {$: 8, a: a};
};
var author$project$Vega$cnCount = author$project$Vega$CnCount;
var author$project$Vega$CnWeight = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$cnWeight = author$project$Vega$CnWeight;
var author$project$Vega$CnX = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$cnX = author$project$Vega$CnX;
var author$project$Vega$CnY = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$cnY = author$project$Vega$CnY;
var author$project$Vega$VConfig = 6;
var author$project$Vega$SScheme = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$axTypeLabel = function (axType) {
	switch (axType) {
		case 0:
			return 'axis';
		case 1:
			return 'axisLeft';
		case 2:
			return 'axisTop';
		case 3:
			return 'axisRight';
		case 4:
			return 'axisBottom';
		case 5:
			return 'axisX';
		case 6:
			return 'axisY';
		default:
			return 'axisBand';
	}
};
var author$project$Vega$Allow = 1;
var author$project$Vega$eventTypeLabel = function (et) {
	switch (et) {
		case 0:
			return 'click';
		case 1:
			return 'dblclick';
		case 2:
			return 'dragenter';
		case 3:
			return 'dragleave';
		case 4:
			return 'dragover';
		case 5:
			return 'keydown';
		case 6:
			return 'keypress';
		case 7:
			return 'keyup';
		case 8:
			return 'mousedown';
		case 9:
			return 'mousemove';
		case 10:
			return 'mouseout';
		case 11:
			return 'mouseover';
		case 12:
			return 'mouseup';
		case 13:
			return 'mousewheel';
		case 14:
			return 'touchend';
		case 15:
			return 'touchmove';
		case 16:
			return 'touchstart';
		case 17:
			return 'wheel';
		default:
			return 'timer';
	}
};
var author$project$Vega$signalBindSpec = function (sb) {
	switch (sb) {
		case 0:
			return elm$json$Json$Encode$string('any');
		case 1:
			return elm$json$Json$Encode$string('container');
		default:
			return elm$json$Json$Encode$string('none');
	}
};
var author$project$Vega$configEventProperty = function (ceh) {
	switch (ceh.$) {
		case 0:
			var sb = ceh.a;
			return _Utils_Tuple2(
				'bind',
				author$project$Vega$signalBindSpec(sb));
		case 1:
			var ef = ceh.a;
			var ets = ceh.b;
			var listSpec = _Utils_eq(ets, _List_Nil) ? elm$json$Json$Encode$bool(true) : A2(
				elm$json$Json$Encode$list,
				function (et) {
					return elm$json$Json$Encode$string(
						author$project$Vega$eventTypeLabel(et));
				},
				ets);
			var filterLabel = (ef === 1) ? 'allow' : 'prevent';
			return _Utils_Tuple2(
				'defaults',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(filterLabel, listSpec)
						])));
		case 2:
			var ets = ceh.a;
			var listSpec = _Utils_eq(ets, _List_Nil) ? elm$json$Json$Encode$bool(false) : A2(
				elm$json$Json$Encode$list,
				function (et) {
					return elm$json$Json$Encode$string(
						author$project$Vega$eventTypeLabel(et));
				},
				ets);
			return _Utils_Tuple2('selector', listSpec);
		case 3:
			var b = ceh.a;
			return _Utils_Tuple2(
				'timer',
				author$project$Vega$booSpec(b));
		case 4:
			var ets = ceh.a;
			var listSpec = _Utils_eq(ets, _List_Nil) ? elm$json$Json$Encode$bool(false) : A2(
				elm$json$Json$Encode$list,
				function (et) {
					return elm$json$Json$Encode$string(
						author$project$Vega$eventTypeLabel(et));
				},
				ets);
			return _Utils_Tuple2('view', listSpec);
		default:
			var ets = ceh.a;
			var listSpec = _Utils_eq(ets, _List_Nil) ? elm$json$Json$Encode$bool(false) : A2(
				elm$json$Json$Encode$list,
				function (et) {
					return elm$json$Json$Encode$string(
						author$project$Vega$eventTypeLabel(et));
				},
				ets);
			return _Utils_Tuple2('window', listSpec);
	}
};
var author$project$Vega$groupMarkProperty = function (mProp) {
	_n0$24:
	while (true) {
		switch (mProp.$) {
			case 36:
				if ((mProp.a.b && (mProp.a.a.$ === 4)) && (!mProp.a.b.b)) {
					var _n1 = mProp.a;
					var b = _n1.a.a;
					return _Utils_Tuple2(
						'clip',
						elm$json$Json$Encode$bool(b));
				} else {
					break _n0$24;
				}
			case 25:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n2 = mProp.a;
					var x = _n2.a.a;
					return _Utils_Tuple2(
						'cornerRadius',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 0:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n3 = mProp.a;
					var x = _n3.a.a;
					return _Utils_Tuple2(
						'x',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 1:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n4 = mProp.a;
					var x = _n4.a.a;
					return _Utils_Tuple2(
						'x2',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 2:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n5 = mProp.a;
					var x = _n5.a.a;
					return _Utils_Tuple2(
						'xc',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 3:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n6 = mProp.a;
					var x = _n6.a.a;
					return _Utils_Tuple2(
						'width',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 4:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n7 = mProp.a;
					var y = _n7.a.a;
					return _Utils_Tuple2(
						'y',
						elm$json$Json$Encode$float(y));
				} else {
					break _n0$24;
				}
			case 5:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n8 = mProp.a;
					var y = _n8.a.a;
					return _Utils_Tuple2(
						'y2',
						elm$json$Json$Encode$float(y));
				} else {
					break _n0$24;
				}
			case 6:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n9 = mProp.a;
					var y = _n9.a.a;
					return _Utils_Tuple2(
						'yc',
						elm$json$Json$Encode$float(y));
				} else {
					break _n0$24;
				}
			case 7:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n10 = mProp.a;
					var y = _n10.a.a;
					return _Utils_Tuple2(
						'height',
						elm$json$Json$Encode$float(y));
				} else {
					break _n0$24;
				}
			case 8:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n11 = mProp.a;
					var x = _n11.a.a;
					return _Utils_Tuple2(
						'opacity',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 9:
				if ((mProp.a.b && (!mProp.a.a.$)) && (!mProp.a.b.b)) {
					var _n12 = mProp.a;
					var s = _n12.a.a;
					return _Utils_Tuple2(
						'fill',
						elm$json$Json$Encode$string(s));
				} else {
					break _n0$24;
				}
			case 10:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n13 = mProp.a;
					var x = _n13.a.a;
					return _Utils_Tuple2(
						'fillOpacity',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 11:
				if ((mProp.a.b && (!mProp.a.a.$)) && (!mProp.a.b.b)) {
					var _n14 = mProp.a;
					var s = _n14.a.a;
					return _Utils_Tuple2(
						'stroke',
						elm$json$Json$Encode$string(s));
				} else {
					break _n0$24;
				}
			case 12:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n15 = mProp.a;
					var x = _n15.a.a;
					return _Utils_Tuple2(
						'strokeOpacity',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 13:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n16 = mProp.a;
					var x = _n16.a.a;
					return _Utils_Tuple2(
						'strokeWidth',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 14:
				if ((mProp.a.b && (!mProp.a.a.$)) && (!mProp.a.b.b)) {
					var _n17 = mProp.a;
					var s = _n17.a.a;
					return _Utils_Tuple2(
						'strokeCap',
						elm$json$Json$Encode$string(s));
				} else {
					break _n0$24;
				}
			case 15:
				if ((mProp.a.b && (mProp.a.a.$ === 3)) && (!mProp.a.b.b)) {
					var _n18 = mProp.a;
					var xs = _n18.a.a;
					return _Utils_Tuple2(
						'strokeDash',
						A2(elm$json$Json$Encode$list, elm$json$Json$Encode$float, xs));
				} else {
					break _n0$24;
				}
			case 16:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n19 = mProp.a;
					var x = _n19.a.a;
					return _Utils_Tuple2(
						'strokeDashOffset',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 17:
				if ((mProp.a.b && (!mProp.a.a.$)) && (!mProp.a.b.b)) {
					var _n20 = mProp.a;
					var s = _n20.a.a;
					return _Utils_Tuple2(
						'strokeJoin',
						elm$json$Json$Encode$string(s));
				} else {
					break _n0$24;
				}
			case 18:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n21 = mProp.a;
					var x = _n21.a.a;
					return _Utils_Tuple2(
						'strokeMiterLimit',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			case 19:
				if ((mProp.a.b && (!mProp.a.a.$)) && (!mProp.a.b.b)) {
					var _n22 = mProp.a;
					var s = _n22.a.a;
					return _Utils_Tuple2(
						'cursor',
						elm$json$Json$Encode$string(s));
				} else {
					break _n0$24;
				}
			case 20:
				if ((mProp.a.b && (!mProp.a.a.$)) && (!mProp.a.b.b)) {
					var _n23 = mProp.a;
					var s = _n23.a.a;
					return _Utils_Tuple2(
						'href',
						elm$json$Json$Encode$string(s));
				} else {
					break _n0$24;
				}
			case 22:
				if ((mProp.a.b && (mProp.a.a.$ === 2)) && (!mProp.a.b.b)) {
					var _n24 = mProp.a;
					var x = _n24.a.a;
					return _Utils_Tuple2(
						'zIndex',
						elm$json$Json$Encode$float(x));
				} else {
					break _n0$24;
				}
			default:
				break _n0$24;
		}
	}
	return author$project$Vega$markProperty(mProp);
};
var author$project$Vega$gridAlignSpec = function (ga) {
	switch (ga.$) {
		case 0:
			return elm$json$Json$Encode$string('all');
		case 1:
			return elm$json$Json$Encode$string('each');
		case 2:
			return elm$json$Json$Encode$string('none');
		case 3:
			var align = ga.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'row',
						author$project$Vega$gridAlignSpec(align))
					]));
		case 4:
			var align = ga.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'column',
						author$project$Vega$gridAlignSpec(align))
					]));
		default:
			var sig = ga.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$legendEncodingProperty = function (le) {
	switch (le.$) {
		case 0:
			var eps = le.a;
			return _Utils_Tuple2(
				'legend',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$encodingProperty, eps)));
		case 1:
			var eps = le.a;
			return _Utils_Tuple2(
				'title',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$encodingProperty, eps)));
		case 2:
			var eps = le.a;
			return _Utils_Tuple2(
				'labels',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$encodingProperty, eps)));
		case 3:
			var eps = le.a;
			return _Utils_Tuple2(
				'symbols',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$encodingProperty, eps)));
		default:
			var eps = le.a;
			return _Utils_Tuple2(
				'gradient',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$encodingProperty, eps)));
	}
};
var author$project$Vega$boundsCalculationSpec = function (bc) {
	switch (bc.$) {
		case 0:
			return elm$json$Json$Encode$string('full');
		case 1:
			return elm$json$Json$Encode$string('flush');
		default:
			var sigName = bc.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sigName)
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
var author$project$Vega$legendLayoutProperty = function (ll) {
	switch (ll.$) {
		case 0:
			var an = ll.a;
			return _Utils_Tuple2(
				'anchor',
				author$project$Vega$anchorSpec(an));
		case 1:
			var bc = ll.a;
			return _Utils_Tuple2(
				'bounds',
				author$project$Vega$boundsCalculationSpec(bc));
		case 2:
			var b = ll.a;
			return _Utils_Tuple2(
				'center',
				author$project$Vega$booSpec(b));
		case 3:
			var o = ll.a;
			return _Utils_Tuple2(
				'direction',
				author$project$Vega$orientationSpec(o));
		case 4:
			var n = ll.a;
			return _Utils_Tuple2(
				'margin',
				author$project$Vega$numSpec(n));
		default:
			var n = ll.a;
			return _Utils_Tuple2(
				'offset',
				author$project$Vega$numSpec(n));
	}
};
var author$project$Vega$legendOrientLabel = function (orient) {
	switch (orient.$) {
		case 0:
			return 'left';
		case 1:
			return 'top-left';
		case 2:
			return 'top';
		case 3:
			return 'top-right';
		case 4:
			return 'right';
		case 5:
			return 'bottom-right';
		case 6:
			return 'bottom';
		case 7:
			return 'bottom-left';
		case 8:
			return 'none';
		default:
			var sig = orient.a;
			return sig;
	}
};
var author$project$Vega$legendOrientSpec = function (orient) {
	if (orient.$ === 9) {
		var sig = orient.a;
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					author$project$Vega$signalReferenceProperty(sig)
				]));
	} else {
		return elm$json$Json$Encode$string(
			author$project$Vega$legendOrientLabel(orient));
	}
};
var author$project$Vega$legendTypeSpec = function (lt) {
	switch (lt.$) {
		case 0:
			return elm$json$Json$Encode$string('symbol');
		case 1:
			return elm$json$Json$Encode$string('gradient');
		default:
			var sig = lt.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$symbolLabel = function (sym) {
	switch (sym.$) {
		case 0:
			return 'circle';
		case 1:
			return 'square';
		case 2:
			return 'cross';
		case 3:
			return 'wedge';
		case 4:
			return 'arrow';
		case 5:
			return 'stroke';
		case 6:
			return 'diamond';
		case 7:
			return 'triangle';
		case 8:
			return 'triangle-up';
		case 9:
			return 'triangle-down';
		case 11:
			return 'triangle-right';
		case 10:
			return 'triangle-left';
		case 12:
			var svgPath = sym.a;
			return svgPath;
		default:
			var sig = sym.a;
			return sig;
	}
};
var author$project$Vega$symbolSpec = function (sym) {
	if (sym.$ === 13) {
		var sig = sym.a;
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					author$project$Vega$signalReferenceProperty(sig)
				]));
	} else {
		return elm$json$Json$Encode$string(
			author$project$Vega$symbolLabel(sym));
	}
};
var author$project$Vega$legendProperty = function (lp) {
	switch (lp.$) {
		case 0:
			var lt = lp.a;
			return _Utils_Tuple2(
				'type',
				author$project$Vega$legendTypeSpec(lt));
		case 47:
			var ll = lp.a;
			return _Utils_Tuple2(
				'layout',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$legendLayoutProperty, ll)));
		case 48:
			var oLayouts = lp.a;
			return _Utils_Tuple2(
				'layout',
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$map,
						function (_n1) {
							var lo = _n1.a;
							var ll = _n1.b;
							return _Utils_Tuple2(
								author$project$Vega$legendOrientLabel(lo),
								elm$json$Json$Encode$object(
									A2(elm$core$List$map, author$project$Vega$legendLayoutProperty, ll)));
						},
						oLayouts)));
		case 1:
			var o = lp.a;
			return _Utils_Tuple2(
				'direction',
				author$project$Vega$orientationSpec(o));
		case 2:
			var lo = lp.a;
			return _Utils_Tuple2(
				'orient',
				author$project$Vega$legendOrientSpec(lo));
		case 3:
			var fScale = lp.a;
			return _Utils_Tuple2(
				'fill',
				elm$json$Json$Encode$string(fScale));
		case 4:
			var oScale = lp.a;
			return _Utils_Tuple2(
				'opacity',
				elm$json$Json$Encode$string(oScale));
		case 5:
			var sScale = lp.a;
			return _Utils_Tuple2(
				'shape',
				elm$json$Json$Encode$string(sScale));
		case 6:
			var sScale = lp.a;
			return _Utils_Tuple2(
				'size',
				elm$json$Json$Encode$string(sScale));
		case 7:
			var sScale = lp.a;
			return _Utils_Tuple2(
				'stroke',
				elm$json$Json$Encode$string(sScale));
		case 8:
			var sdScale = lp.a;
			return _Utils_Tuple2(
				'strokeDash',
				elm$json$Json$Encode$string(sdScale));
		case 10:
			var vals = lp.a;
			return _Utils_Tuple2(
				'strokeDash',
				author$project$Vega$valRef(vals));
		case 12:
			var les = lp.a;
			return _Utils_Tuple2(
				'encode',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$legendEncodingProperty, les)));
		case 13:
			var s = lp.a;
			return _Utils_Tuple2(
				'format',
				author$project$Vega$strSpec(s));
		case 14:
			return _Utils_Tuple2(
				'formatType',
				elm$json$Json$Encode$string('number'));
		case 15:
			return _Utils_Tuple2(
				'formatType',
				elm$json$Json$Encode$string('time'));
		case 16:
			var ga = lp.a;
			return _Utils_Tuple2(
				'gridAlign',
				author$project$Vega$gridAlignSpec(ga));
		case 17:
			var h = lp.a;
			return _Utils_Tuple2(
				'clipHeight',
				author$project$Vega$numSpec(h));
		case 18:
			var n = lp.a;
			return _Utils_Tuple2(
				'columns',
				author$project$Vega$numSpec(n));
		case 19:
			var x = lp.a;
			return _Utils_Tuple2(
				'columnPadding',
				author$project$Vega$numSpec(x));
		case 20:
			var x = lp.a;
			return _Utils_Tuple2(
				'rowPadding',
				author$project$Vega$numSpec(x));
		case 21:
			var x = lp.a;
			return _Utils_Tuple2(
				'cornerRadius',
				author$project$Vega$numSpec(x));
		case 22:
			var s = lp.a;
			return _Utils_Tuple2(
				'fillColor',
				author$project$Vega$strSpec(s));
		case 23:
			var n = lp.a;
			return _Utils_Tuple2(
				'offset',
				author$project$Vega$numSpec(n));
		case 24:
			var n = lp.a;
			return _Utils_Tuple2(
				'padding',
				author$project$Vega$numSpec(n));
		case 25:
			var s = lp.a;
			return _Utils_Tuple2(
				'strokeColor',
				author$project$Vega$strSpec(s));
		case 9:
			var s = lp.a;
			return _Utils_Tuple2(
				'strokeWidth',
				elm$json$Json$Encode$string(s));
		case 11:
			var n = lp.a;
			return _Utils_Tuple2(
				'strokeWidth',
				author$project$Vega$numSpec(n));
		case 29:
			var n = lp.a;
			return _Utils_Tuple2(
				'gradientOpacity',
				author$project$Vega$numSpec(n));
		case 26:
			var x = lp.a;
			return _Utils_Tuple2(
				'gradientLabelLimit',
				author$project$Vega$numSpec(x));
		case 27:
			var x = lp.a;
			return _Utils_Tuple2(
				'gradientLabelOffset',
				author$project$Vega$numSpec(x));
		case 28:
			var x = lp.a;
			return _Utils_Tuple2(
				'gradientLength',
				author$project$Vega$numSpec(x));
		case 30:
			var x = lp.a;
			return _Utils_Tuple2(
				'gradientThickness',
				author$project$Vega$numSpec(x));
		case 31:
			var s = lp.a;
			return _Utils_Tuple2(
				'gradientStrokeColor',
				author$project$Vega$strSpec(s));
		case 32:
			var x = lp.a;
			return _Utils_Tuple2(
				'gradientStrokeWidth',
				author$project$Vega$numSpec(x));
		case 33:
			var ha = lp.a;
			return _Utils_Tuple2(
				'labelAlign',
				author$project$Vega$hAlignSpec(ha));
		case 34:
			var va = lp.a;
			return _Utils_Tuple2(
				'labelBaseline',
				author$project$Vega$vAlignSpec(va));
		case 35:
			var s = lp.a;
			return _Utils_Tuple2(
				'labelColor',
				author$project$Vega$strSpec(s));
		case 42:
			var n = lp.a;
			return _Utils_Tuple2(
				'labelOpacity',
				author$project$Vega$numSpec(n));
		case 36:
			var s = lp.a;
			return _Utils_Tuple2(
				'labelFont',
				author$project$Vega$strSpec(s));
		case 37:
			var x = lp.a;
			return _Utils_Tuple2(
				'labelFontSize',
				author$project$Vega$numSpec(x));
		case 38:
			var s = lp.a;
			return _Utils_Tuple2(
				'labelFontStyle',
				author$project$Vega$strSpec(s));
		case 39:
			var val = lp.a;
			return _Utils_Tuple2(
				'labelFontWeight',
				author$project$Vega$valueSpec(val));
		case 40:
			var x = lp.a;
			return _Utils_Tuple2(
				'labelLimit',
				author$project$Vega$numSpec(x));
		case 41:
			var x = lp.a;
			return _Utils_Tuple2(
				'labelOffset',
				author$project$Vega$numSpec(x));
		case 43:
			var os = lp.a;
			return _Utils_Tuple2(
				'labelOverlap',
				author$project$Vega$overlapStrategySpec(os));
		case 44:
			var x = lp.a;
			return _Utils_Tuple2(
				'labelSeparation',
				author$project$Vega$numSpec(x));
		case 49:
			var s = lp.a;
			return _Utils_Tuple2(
				'symbolBaseFillColor',
				author$project$Vega$strSpec(s));
		case 50:
			var s = lp.a;
			return _Utils_Tuple2(
				'symbolBaseStrokeColor',
				author$project$Vega$strSpec(s));
		case 51:
			var vals = lp.a;
			return _Utils_Tuple2(
				'symbolDash',
				author$project$Vega$valRef(vals));
		case 52:
			var n = lp.a;
			return _Utils_Tuple2(
				'symbolDashOffset',
				author$project$Vega$numSpec(n));
		case 53:
			var o = lp.a;
			return _Utils_Tuple2(
				'symbolDirection',
				author$project$Vega$orientationSpec(o));
		case 54:
			var s = lp.a;
			return _Utils_Tuple2(
				'symbolFillColor',
				author$project$Vega$strSpec(s));
		case 55:
			var n = lp.a;
			return _Utils_Tuple2(
				'symbolLimit',
				author$project$Vega$numSpec(n));
		case 56:
			var x = lp.a;
			return _Utils_Tuple2(
				'symbolOffset',
				author$project$Vega$numSpec(x));
		case 58:
			var x = lp.a;
			return _Utils_Tuple2(
				'symbolSize',
				author$project$Vega$numSpec(x));
		case 59:
			var s = lp.a;
			return _Utils_Tuple2(
				'symbolStrokeColor',
				author$project$Vega$strSpec(s));
		case 60:
			var x = lp.a;
			return _Utils_Tuple2(
				'symbolStrokeWidth',
				author$project$Vega$numSpec(x));
		case 57:
			var n = lp.a;
			return _Utils_Tuple2(
				'symbolOpacity',
				author$project$Vega$numSpec(n));
		case 61:
			var s = lp.a;
			return _Utils_Tuple2(
				'symbolType',
				author$project$Vega$symbolSpec(s));
		case 62:
			var n = lp.a;
			return _Utils_Tuple2(
				'tickCount',
				author$project$Vega$numSpec(n));
		case 64:
			var n = lp.a;
			return _Utils_Tuple2(
				'tickMinStep',
				author$project$Vega$numSpec(n));
		case 63:
			var tu = lp.a;
			var n = lp.b;
			switch (n.$) {
				case 0:
					var step = n.a;
					return (step <= 0) ? _Utils_Tuple2(
						'tickCount',
						author$project$Vega$timeUnitSpec(tu)) : _Utils_Tuple2(
						'tickCount',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'interval',
									author$project$Vega$timeUnitSpec(tu)),
									_Utils_Tuple2(
									'step',
									author$project$Vega$numSpec(n))
								])));
				case 2:
					return _Utils_Tuple2(
						'tickCount',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'interval',
									author$project$Vega$timeUnitSpec(tu)),
									_Utils_Tuple2(
									'step',
									author$project$Vega$numSpec(n))
								])));
				case 5:
					return _Utils_Tuple2(
						'tickCount',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'interval',
									author$project$Vega$timeUnitSpec(tu)),
									_Utils_Tuple2(
									'step',
									author$project$Vega$numSpec(n))
								])));
				default:
					return _Utils_Tuple2(
						'tickCount',
						author$project$Vega$timeUnitSpec(tu));
			}
		case 78:
			var n = lp.a;
			return _Utils_Tuple2(
				'titlePadding',
				author$project$Vega$numSpec(n));
		case 65:
			var t = lp.a;
			return _Utils_Tuple2(
				'title',
				author$project$Vega$strSpec(t));
		case 67:
			var ha = lp.a;
			return _Utils_Tuple2(
				'titleAlign',
				author$project$Vega$hAlignSpec(ha));
		case 66:
			var an = lp.a;
			return _Utils_Tuple2(
				'titleAnchor',
				author$project$Vega$anchorSpec(an));
		case 68:
			var va = lp.a;
			return _Utils_Tuple2(
				'titleBaseline',
				author$project$Vega$vAlignSpec(va));
		case 69:
			var s = lp.a;
			return _Utils_Tuple2(
				'titleColor',
				author$project$Vega$strSpec(s));
		case 70:
			var s = lp.a;
			return _Utils_Tuple2(
				'titleFont',
				author$project$Vega$strSpec(s));
		case 71:
			var x = lp.a;
			return _Utils_Tuple2(
				'titleFontSize',
				author$project$Vega$numSpec(x));
		case 72:
			var s = lp.a;
			return _Utils_Tuple2(
				'titleFontStyle',
				author$project$Vega$strSpec(s));
		case 73:
			var val = lp.a;
			return _Utils_Tuple2(
				'titleFontWeight',
				author$project$Vega$valueSpec(val));
		case 74:
			var x = lp.a;
			return _Utils_Tuple2(
				'titleLimit',
				author$project$Vega$numSpec(x));
		case 75:
			var n = lp.a;
			return _Utils_Tuple2(
				'titleLineHeight',
				author$project$Vega$numSpec(n));
		case 76:
			var n = lp.a;
			return _Utils_Tuple2(
				'titleOpacity',
				author$project$Vega$numSpec(n));
		case 77:
			var s = lp.a;
			return _Utils_Tuple2(
				'titleOrient',
				author$project$Vega$sideSpec(s));
		case 79:
			var vals = lp.a;
			return _Utils_Tuple2(
				'values',
				A2(elm$json$Json$Encode$list, author$project$Vega$valueSpec, vals));
		case 45:
			var n = lp.a;
			return _Utils_Tuple2(
				'legendX',
				author$project$Vega$numSpec(n));
		case 46:
			var n = lp.a;
			return _Utils_Tuple2(
				'legendY',
				author$project$Vega$numSpec(n));
		default:
			var n = lp.a;
			return _Utils_Tuple2(
				'zindex',
				author$project$Vega$numSpec(n));
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
var author$project$Vega$schemeProperty = function (sProps) {
	switch (sProps.$) {
		case 0:
			var s = sProps.a;
			return _Utils_Tuple2(
				'scheme',
				author$project$Vega$strSpec(s));
		case 1:
			var n = sProps.a;
			return _Utils_Tuple2(
				'count',
				author$project$Vega$numSpec(n));
		default:
			var n = sProps.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'extent', n);
	}
};
var author$project$Vega$TeTitle = 0;
var author$project$Vega$teTitle = 0;
var author$project$Vega$titleElementLabel = function (te) {
	switch (te) {
		case 0:
			return 'title';
		case 1:
			return 'subtitle';
		default:
			return 'group';
	}
};
var author$project$Vega$titleEncodingSpec = function (encs) {
	return elm$json$Json$Encode$object(
		A2(
			elm$core$List$map,
			function (_n0) {
				var el = _n0.a;
				var eps = _n0.b;
				return _Utils_Tuple2(
					author$project$Vega$titleElementLabel(el),
					elm$json$Json$Encode$object(
						A2(elm$core$List$map, author$project$Vega$encodingProperty, eps)));
			},
			encs));
};
var author$project$Vega$titleFrameSpec = function (tf) {
	switch (tf.$) {
		case 1:
			return elm$json$Json$Encode$string('group');
		case 0:
			return elm$json$Json$Encode$string('bounds');
		default:
			var sig = tf.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$titleProperty = function (tProp) {
	switch (tProp.$) {
		case 0:
			var s = tProp.a;
			return _Utils_Tuple2(
				'text',
				author$project$Vega$strSpec(s));
		case 19:
			var s = tProp.a;
			return _Utils_Tuple2(
				'orient',
				author$project$Vega$sideSpec(s));
		case 1:
			var ha = tProp.a;
			return _Utils_Tuple2(
				'align',
				author$project$Vega$hAlignSpec(ha));
		case 2:
			var a = tProp.a;
			return _Utils_Tuple2(
				'anchor',
				author$project$Vega$anchorSpec(a));
		case 3:
			var n = tProp.a;
			return _Utils_Tuple2(
				'angle',
				author$project$Vega$numSpec(n));
		case 4:
			var va = tProp.a;
			return _Utils_Tuple2(
				'baseline',
				author$project$Vega$vAlignSpec(va));
		case 5:
			var s = tProp.a;
			return _Utils_Tuple2(
				'color',
				author$project$Vega$strSpec(s));
		case 6:
			var n = tProp.a;
			return _Utils_Tuple2(
				'dx',
				author$project$Vega$numSpec(n));
		case 7:
			var n = tProp.a;
			return _Utils_Tuple2(
				'dy',
				author$project$Vega$numSpec(n));
		case 8:
			var eps = tProp.a;
			return _Utils_Tuple2(
				'encode',
				author$project$Vega$titleEncodingSpec(
					_List_fromArray(
						[
							_Utils_Tuple2(author$project$Vega$teTitle, eps)
						])));
		case 9:
			var encs = tProp.a;
			return _Utils_Tuple2(
				'encode',
				author$project$Vega$titleEncodingSpec(encs));
		case 10:
			var s = tProp.a;
			return _Utils_Tuple2(
				'font',
				author$project$Vega$strSpec(s));
		case 11:
			var n = tProp.a;
			return _Utils_Tuple2(
				'fontSize',
				author$project$Vega$numSpec(n));
		case 12:
			var s = tProp.a;
			return _Utils_Tuple2(
				'fontStyle',
				author$project$Vega$strSpec(s));
		case 13:
			var v = tProp.a;
			return _Utils_Tuple2(
				'fontWeight',
				author$project$Vega$valueSpec(v));
		case 14:
			var fr = tProp.a;
			return _Utils_Tuple2(
				'fame',
				author$project$Vega$titleFrameSpec(fr));
		case 15:
			var b = tProp.a;
			return _Utils_Tuple2(
				'interactive',
				author$project$Vega$booSpec(b));
		case 16:
			var n = tProp.a;
			return _Utils_Tuple2(
				'limit',
				author$project$Vega$numSpec(n));
		case 17:
			var n = tProp.a;
			return _Utils_Tuple2(
				'lineHeight',
				author$project$Vega$numSpec(n));
		case 20:
			var s = tProp.a;
			return _Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(s));
		case 21:
			var s = tProp.a;
			return _Utils_Tuple2(
				'style',
				author$project$Vega$strSpec(s));
		case 22:
			var s = tProp.a;
			return _Utils_Tuple2(
				'subtitle',
				author$project$Vega$strSpec(s));
		case 23:
			var s = tProp.a;
			return _Utils_Tuple2(
				'subtitleColor',
				author$project$Vega$strSpec(s));
		case 24:
			var s = tProp.a;
			return _Utils_Tuple2(
				'subtitleFont',
				author$project$Vega$strSpec(s));
		case 25:
			var n = tProp.a;
			return _Utils_Tuple2(
				'subtitleFontSize',
				author$project$Vega$numSpec(n));
		case 26:
			var s = tProp.a;
			return _Utils_Tuple2(
				'subtitleFontStyle',
				author$project$Vega$strSpec(s));
		case 27:
			var v = tProp.a;
			return _Utils_Tuple2(
				'subtitleFontWeight',
				author$project$Vega$valueSpec(v));
		case 28:
			var n = tProp.a;
			return _Utils_Tuple2(
				'subtitleLineHeight',
				author$project$Vega$numSpec(n));
		case 29:
			var n = tProp.a;
			return _Utils_Tuple2(
				'subtitlePadding',
				author$project$Vega$numSpec(n));
		case 18:
			var n = tProp.a;
			return _Utils_Tuple2(
				'offset',
				author$project$Vega$numSpec(n));
		default:
			var n = tProp.a;
			return _Utils_Tuple2(
				'zindex',
				author$project$Vega$numSpec(n));
	}
};
var author$project$Vega$configProperty = function (cp) {
	switch (cp.$) {
		case 0:
			var aps = cp.a;
			return _Utils_Tuple2(
				'autosize',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$autosizeProperty, aps)));
		case 1:
			var s = cp.a;
			return _Utils_Tuple2(
				'background',
				author$project$Vega$strSpec(s));
		case 3:
			var ceps = cp.a;
			return _Utils_Tuple2(
				'events',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$configEventProperty, ceps)));
		case 2:
			var mps = cp.a;
			return _Utils_Tuple2(
				'group',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$groupMarkProperty, mps)));
		case 4:
			var mk = cp.a;
			var mps = cp.b;
			return _Utils_Tuple2(
				author$project$Vega$markLabel(mk),
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$markProperty, mps)));
		case 5:
			var mps = cp.a;
			return _Utils_Tuple2(
				'mark',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$markProperty, mps)));
		case 6:
			var sName = cp.a;
			var mps = cp.b;
			return _Utils_Tuple2(
				'style',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							sName,
							elm$json$Json$Encode$object(
								A2(elm$core$List$map, author$project$Vega$markProperty, mps)))
						])));
		case 7:
			var axType = cp.a;
			var aps = cp.b;
			return _Utils_Tuple2(
				author$project$Vega$axTypeLabel(axType),
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$axisProperty, aps)));
		case 8:
			var lps = cp.a;
			return _Utils_Tuple2(
				'legend',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$legendProperty, lps)));
		case 9:
			var tps = cp.a;
			return _Utils_Tuple2(
				'title',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$titleProperty, tps)));
		case 10:
			var ra1 = cp.a;
			var ra2 = cp.b;
			var raVals = function () {
				switch (ra2.$) {
					case 1:
						var ss = ra2.a;
						return A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, ss);
					case 15:
						var sig = ra2.a;
						return elm$json$Json$Encode$object(
							_List_fromArray(
								[
									author$project$Vega$signalReferenceProperty(sig)
								]));
					case 3:
						var name = ra2.a;
						var options = ra2.b;
						return elm$json$Json$Encode$object(
							A2(
								elm$core$List$map,
								author$project$Vega$schemeProperty,
								A2(
									elm$core$List$cons,
									author$project$Vega$SScheme(name),
									options)));
					default:
						return elm$json$Json$Encode$null;
				}
			}();
			var raLabel = function () {
				switch (ra1.$) {
					case 8:
						return 'symbol';
					case 9:
						return 'category';
					case 10:
						return 'diverging';
					case 11:
						return 'ordinal';
					case 12:
						return 'ramp';
					case 13:
						return 'heatmap';
					default:
						return '';
				}
			}();
			return _Utils_Tuple2(
				'range',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(raLabel, raVals)
						])));
		default:
			var sigs = cp.a;
			return _Utils_Tuple2(
				'signals',
				A2(elm$json$Json$Encode$list, elm$core$Basics$identity, sigs));
	}
};
var author$project$Vega$config = function (cps) {
	return _Utils_Tuple2(
		6,
		elm$json$Json$Encode$object(
			A2(elm$core$List$map, author$project$Vega$configProperty, cps)));
};
var author$project$Vega$DDataset = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$daDataset = author$project$Vega$DDataset;
var author$project$Vega$DField = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$daField = author$project$Vega$DField;
var author$project$Vega$DaSource = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$daSource = author$project$Vega$DaSource;
var author$project$Vega$DaUrl = function (a) {
	return {$: 6, a: a};
};
var author$project$Vega$daUrl = author$project$Vega$DaUrl;
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
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('arrow'))
				]);
		case 6:
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
		case 7:
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
		case 8:
			var s = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('topojson')),
					_Utils_Tuple2(
					'mesh',
					author$project$Vega$strSpec(s)),
					_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$string('exterior'))
				]);
		case 9:
			var s = fmt.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string('topojson')),
					_Utils_Tuple2(
					'mesh',
					author$project$Vega$strSpec(s)),
					_Utils_Tuple2(
					'filter',
					elm$json$Json$Encode$string('interior'))
				]);
		case 10:
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
		case 11:
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
var author$project$Vega$dataProperty = function (dProp) {
	switch (dProp.$) {
		case 0:
			var fmts = dProp.a;
			return _Utils_Tuple2(
				'format',
				elm$json$Json$Encode$object(
					A2(elm$core$List$concatMap, author$project$Vega$formatProperty, fmts)));
		case 1:
			var src = dProp.a;
			return _Utils_Tuple2(
				'source',
				elm$json$Json$Encode$string(src));
		case 2:
			var srcs = dProp.a;
			return _Utils_Tuple2(
				'source',
				A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, srcs));
		case 5:
			var triggers = dProp.a;
			return _Utils_Tuple2(
				'on',
				A2(elm$json$Json$Encode$list, elm$core$Basics$identity, triggers));
		case 6:
			var url = dProp.a;
			return _Utils_Tuple2(
				'url',
				author$project$Vega$strSpec(url));
		case 3:
			var val = dProp.a;
			return _Utils_Tuple2(
				'values',
				author$project$Vega$valueSpec(val));
		default:
			return _Utils_Tuple2(
				'values',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'type',
							elm$json$Json$Encode$string('Sphere'))
						])));
	}
};
var author$project$Vega$data = F2(
	function (name, dProps) {
		return A2(
			elm$core$List$cons,
			_Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(name)),
			A2(elm$core$List$map, author$project$Vega$dataProperty, dProps));
	});
var author$project$Vega$VData = 8;
var author$project$Vega$dataSource = function (dataTables) {
	return _Utils_Tuple2(
		8,
		A2(elm$json$Json$Encode$list, elm$json$Json$Encode$object, dataTables));
};
var author$project$Vega$DoData = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$doData = author$project$Vega$DoData;
var author$project$Vega$Enter = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$enEnter = author$project$Vega$Enter;
var author$project$Vega$Update = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$enUpdate = author$project$Vega$Update;
var author$project$Vega$FExpr = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$fExpr = author$project$Vega$FExpr;
var author$project$Vega$Boo = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$false = author$project$Vega$Boo(false);
var author$project$Vega$FName = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$field = author$project$Vega$FName;
var author$project$Vega$GeField = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$gpField = author$project$Vega$GeField;
var author$project$Vega$VHeight = 3;
var author$project$Vega$height = function (w) {
	return _Utils_Tuple2(
		3,
		elm$json$Json$Encode$float(w));
};
var author$project$Vega$ICheckbox = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$iCheckbox = author$project$Vega$ICheckbox;
var author$project$Vega$ISelect = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$iSelect = author$project$Vega$ISelect;
var author$project$Vega$VIfElse = F3(
	function (a, b, c) {
		return {$: 21, a: a, b: b, c: c};
	});
var author$project$Vega$ifElse = F3(
	function (condition, thenVals, elseVals) {
		return A3(author$project$Vega$VIfElse, condition, thenVals, elseVals);
	});
var author$project$Vega$InOptions = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$inOptions = author$project$Vega$InOptions;
var author$project$Vega$LeFill = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$leFill = author$project$Vega$LeFill;
var author$project$Vega$LeType = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$leType = author$project$Vega$LeType;
var author$project$Vega$legend = function (lps) {
	return elm$core$List$cons(
		elm$json$Json$Encode$object(
			A2(elm$core$List$map, author$project$Vega$legendProperty, lps)));
};
var author$project$Vega$VLegends = 12;
var author$project$Vega$legends = function (lgs) {
	return _Utils_Tuple2(
		12,
		A2(elm$json$Json$Encode$list, elm$core$Basics$identity, lgs));
};
var author$project$Vega$LGradient = {$: 1};
var author$project$Vega$ltGradient = author$project$Vega$LGradient;
var author$project$Vega$MEncode = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$mEncode = author$project$Vega$MEncode;
var author$project$Vega$MFrom = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$mFrom = author$project$Vega$MFrom;
var author$project$Vega$MName = function (a) {
	return {$: 7, a: a};
};
var author$project$Vega$mName = author$project$Vega$MName;
var author$project$Vega$MTransform = function (a) {
	return {$: 11, a: a};
};
var author$project$Vega$mTransform = author$project$Vega$MTransform;
var author$project$Vega$MFill = function (a) {
	return {$: 9, a: a};
};
var author$project$Vega$maFill = author$project$Vega$MFill;
var author$project$Vega$MFillOpacity = function (a) {
	return {$: 10, a: a};
};
var author$project$Vega$maFillOpacity = author$project$Vega$MFillOpacity;
var author$project$Vega$MSize = function (a) {
	return {$: 29, a: a};
};
var author$project$Vega$maSize = author$project$Vega$MSize;
var author$project$Vega$MStroke = function (a) {
	return {$: 11, a: a};
};
var author$project$Vega$maStroke = author$project$Vega$MStroke;
var author$project$Vega$MStrokeWidth = function (a) {
	return {$: 13, a: a};
};
var author$project$Vega$maStrokeWidth = author$project$Vega$MStrokeWidth;
var author$project$Vega$MX = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$maX = author$project$Vega$MX;
var author$project$Vega$MY = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$maY = author$project$Vega$MY;
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
		case 3:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'span',
				author$project$Vega$numSpec(n));
		case 2:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'base',
				author$project$Vega$numSpec(n));
		case 4:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'step',
				author$project$Vega$numSpec(n));
		case 5:
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
		case 9:
			var ns = bnProp.a;
			switch (ns.$) {
				case 0:
					return _Utils_Tuple2(
						'bins',
						A2(
							elm$json$Json$Encode$list,
							author$project$Vega$numSpec,
							_List_fromArray(
								[ns])));
				case 2:
					return _Utils_Tuple2(
						'bins',
						A2(
							elm$json$Json$Encode$list,
							author$project$Vega$numSpec,
							_List_fromArray(
								[ns])));
				default:
					return _Utils_Tuple2(
						'bins',
						author$project$Vega$numSpec(ns));
			}
		case 6:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'minstep',
				author$project$Vega$numSpec(n));
		case 7:
			var n = bnProp.a;
			return _Utils_Tuple2(
				'divide',
				author$project$Vega$numSpec(n));
		case 8:
			var b = bnProp.a;
			return _Utils_Tuple2(
				'nice',
				author$project$Vega$booSpec(b));
		case 10:
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
			var f = cnProp.a;
			return _Utils_Tuple2(
				'weight',
				author$project$Vega$fieldSpec(f));
		case 4:
			var n = cnProp.a;
			return _Utils_Tuple2(
				'cellSize',
				author$project$Vega$numSpec(n));
		case 5:
			var n = cnProp.a;
			return _Utils_Tuple2(
				'bandwidth',
				author$project$Vega$numSpec(n));
		case 6:
			var b = cnProp.a;
			return _Utils_Tuple2(
				'smooth',
				author$project$Vega$booSpec(b));
		case 7:
			var n = cnProp.a;
			if (!n.$) {
				return _Utils_Tuple2('thresholds', elm$json$Json$Encode$null);
			} else {
				return _Utils_Tuple2(
					'thresholds',
					author$project$Vega$numSpec(n));
			}
		case 8:
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
		case 4:
			var n = dnp.a;
			return _Utils_Tuple2(
				'steps',
				author$project$Vega$numSpec(n));
		case 2:
			var n = dnp.a;
			return _Utils_Tuple2(
				'minsteps',
				author$project$Vega$numSpec(n));
		case 3:
			var n = dnp.a;
			return _Utils_Tuple2(
				'maxsteps',
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
var author$project$Vega$dotBinProperty = function (dbp) {
	switch (dbp.$) {
		case 0:
			var fs = dbp.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 1:
			var n = dbp.a;
			return _Utils_Tuple2(
				'step',
				author$project$Vega$numSpec(n));
		case 2:
			var b = dbp.a;
			return _Utils_Tuple2(
				'smooth',
				author$project$Vega$booSpec(b));
		case 3:
			var s = dbp.a;
			return _Utils_Tuple2(
				'signal',
				elm$json$Json$Encode$string(s));
		default:
			var s = dbp.a;
			return _Utils_Tuple2(
				'as',
				elm$json$Json$Encode$string(s));
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
var author$project$Vega$resolutionSpec = function (res) {
	if (!res) {
		return elm$json$Json$Encode$string('shared');
	} else {
		return elm$json$Json$Encode$string('independent');
	}
};
var author$project$Vega$kdeProperty = function (kp) {
	switch (kp.$) {
		case 0:
			var fs = kp.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 1:
			var b = kp.a;
			return _Utils_Tuple2(
				'cumulative',
				author$project$Vega$booSpec(b));
		case 2:
			var b = kp.a;
			return _Utils_Tuple2(
				'counts',
				author$project$Vega$booSpec(b));
		case 3:
			var n = kp.a;
			return _Utils_Tuple2(
				'bandwidth',
				author$project$Vega$numSpec(n));
		case 4:
			var n = kp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'extent', n);
		case 5:
			var n = kp.a;
			return _Utils_Tuple2(
				'minsteps',
				author$project$Vega$numSpec(n));
		case 6:
			var n = kp.a;
			return _Utils_Tuple2(
				'maxsteps',
				author$project$Vega$numSpec(n));
		case 7:
			var r = kp.a;
			return _Utils_Tuple2(
				'resolve',
				author$project$Vega$resolutionSpec(r));
		case 8:
			var n = kp.a;
			return _Utils_Tuple2(
				'steps',
				author$project$Vega$numSpec(n));
		default:
			var s1 = kp.a;
			var s2 = kp.b;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[s1, s2])));
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
var author$project$Vega$loessProperty = function (lp) {
	switch (lp.$) {
		case 0:
			var fs = lp.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 1:
			var n = lp.a;
			return _Utils_Tuple2(
				'bandwidth',
				author$project$Vega$numSpec(n));
		default:
			var s1 = lp.a;
			var s2 = lp.b;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[s1, s2])));
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
var author$project$Vega$quantileProperty = function (qp) {
	switch (qp.$) {
		case 0:
			var fs = qp.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 1:
			var n = qp.a;
			return _Utils_Tuple2(
				'probs',
				author$project$Vega$numSpec(n));
		case 2:
			var n = qp.a;
			return _Utils_Tuple2(
				'step',
				author$project$Vega$numSpec(n));
		default:
			var s1 = qp.a;
			var s2 = qp.b;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[s1, s2])));
	}
};
var author$project$Vega$reModelLabel = function (m) {
	switch (m.$) {
		case 0:
			return 'linear';
		case 1:
			return 'log';
		case 2:
			return 'exp';
		case 3:
			return 'pow';
		case 4:
			return 'quad';
		case 5:
			return 'poly';
		default:
			var sig = m.a;
			return '';
	}
};
var author$project$Vega$reMethodSpec = function (proj) {
	if (proj.$ === 6) {
		var sig = proj.a;
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					author$project$Vega$signalReferenceProperty(sig)
				]));
	} else {
		return elm$json$Json$Encode$string(
			author$project$Vega$reModelLabel(proj));
	}
};
var author$project$Vega$regressionProperty = function (rp) {
	switch (rp.$) {
		case 0:
			var fs = rp.a;
			return _Utils_Tuple2(
				'groupby',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 1:
			var m = rp.a;
			return _Utils_Tuple2(
				'method',
				author$project$Vega$reMethodSpec(m));
		case 2:
			var n = rp.a;
			return _Utils_Tuple2(
				'order',
				author$project$Vega$numSpec(n));
		case 3:
			var n = rp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'extent', n);
		case 4:
			var b = rp.a;
			return _Utils_Tuple2(
				'params',
				author$project$Vega$booSpec(b));
		default:
			var s1 = rp.a;
			var s2 = rp.b;
			return _Utils_Tuple2(
				'as',
				A2(
					elm$json$Json$Encode$list,
					elm$json$Json$Encode$string,
					_List_fromArray(
						[s1, s2])));
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
		case 12:
			return elm$json$Json$Encode$string('nth_value');
		case 10:
			return elm$json$Json$Encode$string('prev_value');
		case 11:
			return elm$json$Json$Encode$string('next_value');
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
			var dbps = trans.b;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('dotbin')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'field',
							author$project$Vega$fieldSpec(f)),
						A2(elm$core$List$map, author$project$Vega$dotBinProperty, dbps))));
		case 30:
			var x = trans.a;
			var y = trans.b;
			var lps = trans.c;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('loess')),
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
							A2(elm$core$List$map, author$project$Vega$loessProperty, lps)))));
		case 39:
			var x = trans.a;
			var y = trans.b;
			var rps = trans.c;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('regression')),
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
							A2(elm$core$List$map, author$project$Vega$regressionProperty, rps)))));
		case 10:
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
		case 11:
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
		case 12:
			var ex = trans.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('filter')),
						author$project$Vega$exprProperty(ex)
					]));
		case 13:
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
		case 14:
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
		case 15:
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
		case 16:
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
		case 18:
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
		case 25:
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
		case 26:
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
		case 27:
			var japs = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('joinaggregate')),
					A2(elm$core$List$map, author$project$Vega$joinAggregateProperty, japs)));
		case 31:
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
		case 28:
			var f = trans.a;
			var kps = trans.b;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('kde')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'field',
							author$project$Vega$fieldSpec(f)),
						A2(elm$core$List$map, author$project$Vega$kdeProperty, kps))));
		case 36:
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
		case 37:
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
		case 38:
			var f = trans.a;
			var qps = trans.b;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('quantile')),
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'field',
							author$project$Vega$fieldSpec(f)),
						A2(elm$core$List$map, author$project$Vega$quantileProperty, qps))));
		case 41:
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
		case 42:
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
		case 43:
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
		case 50:
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
		case 19:
			var gjps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('geojson')),
					A2(elm$core$List$map, author$project$Vega$geoJsonProperty, gjps)));
		case 20:
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
		case 21:
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
		case 22:
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
		case 23:
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
		case 24:
			var grps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('graticule')),
					A2(elm$core$List$map, author$project$Vega$graticuleProperty, grps)));
		case 29:
			var lpps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('linkpath')),
					A2(elm$core$List$map, author$project$Vega$linkPathProperty, lpps)));
		case 35:
			var pps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('pie')),
					A2(elm$core$List$map, author$project$Vega$pieProperty, pps)));
		case 44:
			var sps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('stack')),
					A2(elm$core$List$map, author$project$Vega$stackProperty, sps)));
		case 17:
			var fps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('force')),
					A2(elm$core$List$map, author$project$Vega$forceSimulationProperty, fps)));
		case 49:
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
		case 51:
			var wcps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('wordcloud')),
					A2(elm$core$List$map, author$project$Vega$wordcloudProperty, wcps)));
		case 32:
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
		case 45:
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
		case 47:
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('treelinks'))
					]));
		case 33:
			var pps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('pack')),
					A2(elm$core$List$map, author$project$Vega$packProperty, pps)));
		case 34:
			var pps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('partition')),
					A2(elm$core$List$map, author$project$Vega$partitionProperty, pps)));
		case 46:
			var tps = trans.a;
			return elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'type',
						elm$json$Json$Encode$string('tree')),
					A2(elm$core$List$map, author$project$Vega$treeProperty, tps)));
		case 48:
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
		case 17:
			return 'usermeta';
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
var author$project$Vega$NTrue = {$: 9};
var author$project$Vega$niTrue = author$project$Vega$NTrue;
var author$project$Vega$numSignal = author$project$Vega$NumSignal;
var author$project$Vega$VPadding = 4;
var author$project$Vega$padding = function (p) {
	return _Utils_Tuple2(
		4,
		elm$json$Json$Encode$float(p));
};
var author$project$Vega$Path = 5;
var author$project$Vega$path = 5;
var author$project$Vega$RaHeatmap = {$: 13};
var author$project$Vega$raHeatmap = author$project$Vega$RaHeatmap;
var author$project$Vega$RaHeight = {$: 7};
var author$project$Vega$raHeight = author$project$Vega$RaHeight;
var author$project$Vega$RaScheme = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var author$project$Vega$raScheme = author$project$Vega$RaScheme;
var author$project$Vega$RaWidth = {$: 6};
var author$project$Vega$raWidth = author$project$Vega$RaWidth;
var author$project$Vega$SDomain = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$scDomain = author$project$Vega$SDomain;
var author$project$Vega$ScLinear = {$: 0};
var author$project$Vega$scLinear = author$project$Vega$ScLinear;
var author$project$Vega$SNice = function (a) {
	return {$: 13, a: a};
};
var author$project$Vega$scNice = author$project$Vega$SNice;
var author$project$Vega$SRange = function (a) {
	return {$: 6, a: a};
};
var author$project$Vega$scRange = author$project$Vega$SRange;
var author$project$Vega$SRound = function (a) {
	return {$: 9, a: a};
};
var author$project$Vega$scRound = author$project$Vega$SRound;
var author$project$Vega$scSequential = author$project$Vega$ScLinear;
var author$project$Vega$SType = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$scType = author$project$Vega$SType;
var author$project$Vega$SZero = function (a) {
	return {$: 14, a: a};
};
var author$project$Vega$scZero = author$project$Vega$SZero;
var author$project$Vega$BnsStep = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$binsProperty = function (bProps) {
	switch (bProps.$) {
		case 0:
			var n = bProps.a;
			return _Utils_Tuple2(
				'step',
				author$project$Vega$numSpec(n));
		case 1:
			var n = bProps.a;
			return _Utils_Tuple2(
				'start',
				author$project$Vega$numSpec(n));
		default:
			var n = bProps.a;
			return _Utils_Tuple2(
				'stop',
				author$project$Vega$numSpec(n));
	}
};
var author$project$Vega$Ascending = {$: 0};
var author$project$Vega$sortProperty = function (sp) {
	switch (sp.$) {
		case 0:
			return _Utils_Tuple2(
				'order',
				elm$json$Json$Encode$string('ascending'));
		case 1:
			return _Utils_Tuple2(
				'order',
				elm$json$Json$Encode$string('descending'));
		case 3:
			var f = sp.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$strSpec(f));
		case 2:
			var op = sp.a;
			return _Utils_Tuple2(
				'op',
				author$project$Vega$opSpec(op));
		default:
			var sig = sp.a;
			return _Utils_Tuple2(
				'order',
				elm$json$Json$Encode$object(
					_List_fromArray(
						[
							author$project$Vega$signalReferenceProperty(sig)
						])));
	}
};
var author$project$Vega$dataRefProperty = function (dataRef) {
	var nestedSpec = function (dRef2) {
		if ((dRef2.b && (dRef2.a.$ === 4)) && (!dRef2.b.b)) {
			var val = dRef2.a.a;
			return author$project$Vega$valueSpec(val);
		} else {
			return elm$json$Json$Encode$object(
				A2(elm$core$List$map, author$project$Vega$dataRefProperty, dRef2));
		}
	};
	switch (dataRef.$) {
		case 0:
			var ds = dataRef.a;
			return _Utils_Tuple2(
				'data',
				elm$json$Json$Encode$string(ds));
		case 1:
			var f = dataRef.a;
			return _Utils_Tuple2(
				'field',
				author$project$Vega$fieldSpec(f));
		case 2:
			var fs = dataRef.a;
			return _Utils_Tuple2(
				'fields',
				A2(elm$json$Json$Encode$list, author$project$Vega$fieldSpec, fs));
		case 4:
			var val = dataRef.a;
			return _Utils_Tuple2(
				'values',
				author$project$Vega$valueSpec(val));
		case 3:
			var sig = dataRef.a;
			return _Utils_Tuple2(
				'signal',
				elm$json$Json$Encode$string(sig));
		case 5:
			var drss = dataRef.a;
			return _Utils_Tuple2(
				'fields',
				A2(
					elm$json$Json$Encode$list,
					function (drs) {
						return nestedSpec(drs);
					},
					drss));
		default:
			var sps = dataRef.a;
			return (_Utils_eq(
				sps,
				_List_fromArray(
					[author$project$Vega$Ascending])) || _Utils_eq(sps, _List_Nil)) ? _Utils_Tuple2(
				'sort',
				elm$json$Json$Encode$bool(true)) : _Utils_Tuple2(
				'sort',
				elm$json$Json$Encode$object(
					A2(elm$core$List$map, author$project$Vega$sortProperty, sps)));
	}
};
var author$project$Vega$interpolateSpec = function (iType) {
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
var elm$json$Json$Encode$int = _Json_wrap;
var author$project$Vega$niceSpec = function (ni) {
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
		case 8:
			var tu = ni.a;
			var step = ni.b;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'interval',
						author$project$Vega$timeUnitSpec(tu)),
						_Utils_Tuple2(
						'step',
						elm$json$Json$Encode$int(step))
					]));
		case 9:
			return elm$json$Json$Encode$bool(true);
		case 10:
			return elm$json$Json$Encode$bool(false);
		case 11:
			var n = ni.a;
			return elm$json$Json$Encode$int(n);
		default:
			var sig = ni.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$scaleDomainSpec = function (sdType) {
	switch (sdType.$) {
		case 0:
			var ns = sdType.a;
			return author$project$Vega$numSpec(ns);
		case 1:
			var cats = sdType.a;
			return author$project$Vega$strSpec(cats);
		default:
			var dataRef = sdType.a;
			return elm$json$Json$Encode$object(
				A2(elm$core$List$map, author$project$Vega$dataRefProperty, dataRef));
	}
};
var author$project$Vega$scaleSpec = function (sct) {
	switch (sct.$) {
		case 0:
			return elm$json$Json$Encode$string('linear');
		case 1:
			return elm$json$Json$Encode$string('pow');
		case 2:
			return elm$json$Json$Encode$string('sqrt');
		case 3:
			return elm$json$Json$Encode$string('log');
		case 4:
			return elm$json$Json$Encode$string('symlog');
		case 5:
			return elm$json$Json$Encode$string('time');
		case 6:
			return elm$json$Json$Encode$string('utc');
		case 7:
			return elm$json$Json$Encode$string('ordinal');
		case 8:
			return elm$json$Json$Encode$string('band');
		case 9:
			return elm$json$Json$Encode$string('point');
		case 13:
			return elm$json$Json$Encode$string('bin-ordinal');
		case 10:
			return elm$json$Json$Encode$string('quantile');
		case 11:
			return elm$json$Json$Encode$string('quantize');
		case 12:
			return elm$json$Json$Encode$string('threshold');
		case 14:
			var s = sct.a;
			return elm$json$Json$Encode$string(s);
		default:
			var sig = sct.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
	}
};
var author$project$Vega$scaleProperty = function (scaleProp) {
	switch (scaleProp.$) {
		case 0:
			var sType = scaleProp.a;
			return _Utils_Tuple2(
				'type',
				author$project$Vega$scaleSpec(sType));
		case 1:
			var sdType = scaleProp.a;
			return _Utils_Tuple2(
				'domain',
				author$project$Vega$scaleDomainSpec(sdType));
		case 2:
			var sdMax = scaleProp.a;
			return _Utils_Tuple2(
				'domainMax',
				author$project$Vega$numSpec(sdMax));
		case 3:
			var sdMin = scaleProp.a;
			return _Utils_Tuple2(
				'domainMin',
				author$project$Vega$numSpec(sdMin));
		case 4:
			var sdMid = scaleProp.a;
			return _Utils_Tuple2(
				'domainMid',
				author$project$Vega$numSpec(sdMid));
		case 5:
			var sdRaw = scaleProp.a;
			return _Utils_Tuple2(
				'domainRaw',
				author$project$Vega$valueSpec(sdRaw));
		case 6:
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
				case 2:
					var vals = range.a;
					return _Utils_Tuple2(
						'range',
						A2(elm$json$Json$Encode$list, author$project$Vega$valueSpec, vals));
				case 15:
					var sig = range.a;
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									author$project$Vega$signalReferenceProperty(sig)
								])));
				case 3:
					var name = range.a;
					var options = range.b;
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$object(
							A2(
								elm$core$List$map,
								author$project$Vega$schemeProperty,
								A2(
									elm$core$List$cons,
									author$project$Vega$SScheme(name),
									options))));
				case 4:
					var dRefs = range.a;
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$object(
							A2(elm$core$List$map, author$project$Vega$dataRefProperty, dRefs)));
				case 5:
					var val = range.a;
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'step',
									author$project$Vega$valueSpec(val))
								])));
				case 6:
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$string('width'));
				case 7:
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$string('height'));
				case 8:
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$string('symbol'));
				case 9:
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$string('category'));
				case 10:
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$string('diverging'));
				case 11:
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$string('ordinal'));
				case 12:
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$string('ramp'));
				case 13:
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$string('heatmap'));
				default:
					var name = range.a;
					return _Utils_Tuple2(
						'range',
						elm$json$Json$Encode$string(name));
			}
		case 7:
			var bsProps = scaleProp.a;
			switch (bsProps.$) {
				case 0:
					var ns = bsProps.a;
					return _Utils_Tuple2(
						'bins',
						author$project$Vega$numSpec(ns));
				case 2:
					var sig = bsProps.a;
					return _Utils_Tuple2(
						'bins',
						elm$json$Json$Encode$object(
							_List_fromArray(
								[
									author$project$Vega$signalReferenceProperty(sig)
								])));
				default:
					var step = bsProps.a;
					var options = bsProps.b;
					return _Utils_Tuple2(
						'bins',
						elm$json$Json$Encode$object(
							A2(
								elm$core$List$map,
								author$project$Vega$binsProperty,
								A2(
									elm$core$List$cons,
									author$project$Vega$BnsStep(step),
									options))));
			}
		case 12:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'padding',
				author$project$Vega$numSpec(x));
		case 20:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'paddingInner',
				author$project$Vega$numSpec(x));
		case 21:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'paddingOuter',
				author$project$Vega$numSpec(x));
		case 22:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'rangeStep',
				author$project$Vega$numSpec(x));
		case 9:
			var b = scaleProp.a;
			return _Utils_Tuple2(
				'round',
				author$project$Vega$booSpec(b));
		case 10:
			var b = scaleProp.a;
			return _Utils_Tuple2(
				'clamp',
				author$project$Vega$booSpec(b));
		case 11:
			var interp = scaleProp.a;
			return _Utils_Tuple2(
				'interpolate',
				author$project$Vega$interpolateSpec(interp));
		case 13:
			var ni = scaleProp.a;
			return _Utils_Tuple2(
				'nice',
				author$project$Vega$niceSpec(ni));
		case 14:
			var b = scaleProp.a;
			return _Utils_Tuple2(
				'zero',
				author$project$Vega$booSpec(b));
		case 8:
			var b = scaleProp.a;
			return _Utils_Tuple2(
				'reverse',
				author$project$Vega$booSpec(b));
		case 15:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'exponent',
				author$project$Vega$numSpec(x));
		case 16:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'constant',
				author$project$Vega$numSpec(x));
		case 17:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'base',
				author$project$Vega$numSpec(x));
		case 18:
			var x = scaleProp.a;
			return _Utils_Tuple2(
				'align',
				author$project$Vega$numSpec(x));
		default:
			var b = scaleProp.a;
			return _Utils_Tuple2(
				'domainImplicit',
				author$project$Vega$booSpec(b));
	}
};
var author$project$Vega$scale = F2(
	function (name, sps) {
		return elm$core$List$cons(
			elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'name',
						elm$json$Json$Encode$string(name)),
					A2(elm$core$List$map, author$project$Vega$scaleProperty, sps))));
	});
var author$project$Vega$VScales = 9;
var author$project$Vega$scales = function (scs) {
	return _Utils_Tuple2(
		9,
		A2(elm$json$Json$Encode$list, elm$core$Basics$identity, scs));
};
var author$project$Vega$SiBind = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$siBind = author$project$Vega$SiBind;
var author$project$Vega$SBottom = {$: 3};
var author$project$Vega$siBottom = author$project$Vega$SBottom;
var author$project$Vega$SLeft = {$: 0};
var author$project$Vega$siLeft = author$project$Vega$SLeft;
var author$project$Vega$SiValue = function (a) {
	return {$: 7, a: a};
};
var author$project$Vega$siValue = author$project$Vega$SiValue;
var author$project$Vega$SiName = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$inputProperty = function (prop) {
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
		case 5:
			var x = prop.a;
			return _Utils_Tuple2(
				'step',
				elm$json$Json$Encode$float(x));
		case 0:
			var x = prop.a;
			return _Utils_Tuple2(
				'debounce',
				elm$json$Json$Encode$float(x));
		case 2:
			var opts = prop.a;
			return _Utils_Tuple2(
				'options',
				author$project$Vega$valueSpec(opts));
		case 6:
			var el = prop.a;
			return _Utils_Tuple2(
				'placeholder',
				elm$json$Json$Encode$string(el));
		case 1:
			var el = prop.a;
			return _Utils_Tuple2(
				'element',
				elm$json$Json$Encode$string(el));
		default:
			var b = prop.a;
			return b ? _Utils_Tuple2(
				'autocomplete',
				elm$json$Json$Encode$string('on')) : _Utils_Tuple2(
				'autocomplete',
				elm$json$Json$Encode$string('off'));
	}
};
var author$project$Vega$bindingProperty = function (bnd) {
	var bSpec = F2(
		function (iType, props) {
			return _Utils_Tuple2(
				'bind',
				elm$json$Json$Encode$object(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(
							'input',
							elm$json$Json$Encode$string(iType)),
						A2(elm$core$List$map, author$project$Vega$inputProperty, props))));
		});
	switch (bnd.$) {
		case 0:
			var props = bnd.a;
			return A2(bSpec, 'range', props);
		case 1:
			var props = bnd.a;
			return A2(bSpec, 'checkbox', props);
		case 2:
			var props = bnd.a;
			return A2(bSpec, 'radio', props);
		case 3:
			var props = bnd.a;
			return A2(bSpec, 'select', props);
		case 4:
			var props = bnd.a;
			return A2(bSpec, 'text', props);
		case 5:
			var props = bnd.a;
			return A2(bSpec, 'number', props);
		case 6:
			var props = bnd.a;
			return A2(bSpec, 'date', props);
		case 7:
			var props = bnd.a;
			return A2(bSpec, 'time', props);
		case 8:
			var props = bnd.a;
			return A2(bSpec, 'month', props);
		case 9:
			var props = bnd.a;
			return A2(bSpec, 'week', props);
		case 10:
			var props = bnd.a;
			return A2(bSpec, 'datetimelocal', props);
		case 11:
			var props = bnd.a;
			return A2(bSpec, 'tel', props);
		default:
			var props = bnd.a;
			return A2(bSpec, 'color', props);
	}
};
var author$project$Vega$eventSourceLabel = function (es) {
	switch (es.$) {
		case 0:
			return '*';
		case 1:
			return 'view';
		case 2:
			return 'scope';
		case 3:
			return 'window';
		default:
			var s = es.a;
			return s;
	}
};
var author$project$Vega$eventStreamObjectSpec = function (ess) {
	var esProperty = function (es) {
		switch (es.$) {
			case 0:
				var src = es.a;
				return _Utils_Tuple2(
					'source',
					elm$json$Json$Encode$string(
						author$project$Vega$eventSourceLabel(src)));
			case 1:
				var et = es.a;
				return _Utils_Tuple2(
					'type',
					elm$json$Json$Encode$string(
						author$project$Vega$eventTypeLabel(et)));
			case 2:
				var ess1 = es.a;
				var ess2 = es.b;
				return _Utils_Tuple2(
					'between',
					A2(
						elm$json$Json$Encode$list,
						author$project$Vega$eventStreamObjectSpec,
						_List_fromArray(
							[ess1, ess2])));
			case 3:
				var b = es.a;
				return _Utils_Tuple2(
					'consume',
					author$project$Vega$booSpec(b));
			case 4:
				var ex = es.a;
				if (ex.b && (!ex.b.b)) {
					var s = ex.a;
					return _Utils_Tuple2(
						'filter',
						elm$json$Json$Encode$string(s));
				} else {
					return _Utils_Tuple2(
						'filter',
						A2(elm$json$Json$Encode$list, elm$json$Json$Encode$string, ex));
				}
			case 5:
				var n = es.a;
				return _Utils_Tuple2(
					'debounce',
					author$project$Vega$numSpec(n));
			case 6:
				var s = es.a;
				return _Utils_Tuple2(
					'markname',
					elm$json$Json$Encode$string(s));
			case 7:
				var mk = es.a;
				return _Utils_Tuple2(
					'marktype',
					elm$json$Json$Encode$string(
						author$project$Vega$markLabel(mk)));
			case 8:
				var n = es.a;
				return _Utils_Tuple2(
					'throttle',
					author$project$Vega$numSpec(n));
			default:
				var evStream = es.a;
				return _Utils_Tuple2(
					'stream',
					author$project$Vega$eventStreamSpec(evStream));
		}
	};
	return elm$json$Json$Encode$object(
		A2(elm$core$List$map, esProperty, ess));
};
var author$project$Vega$eventStreamSpec = function (es) {
	switch (es.$) {
		case 1:
			var s = es.a;
			return author$project$Vega$strSpec(s);
		case 0:
			var ess = es.a;
			return author$project$Vega$eventStreamObjectSpec(ess);
		case 2:
			var esSig = es.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'signal',
						elm$json$Json$Encode$string(esSig))
					]));
		default:
			var ess = es.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						_Utils_Tuple2(
						'merge',
						A2(elm$json$Json$Encode$list, author$project$Vega$eventStreamSpec, ess))
					]));
	}
};
var author$project$Vega$eventHandlerSpec = function (ehs) {
	var eventHandler = function (eh) {
		switch (eh.$) {
			case 0:
				var ess = eh.a;
				if (ess.b && (!ess.b.b)) {
					var es = ess.a;
					return _Utils_Tuple2(
						'events',
						author$project$Vega$eventStreamSpec(es));
				} else {
					return _Utils_Tuple2(
						'events',
						A2(elm$json$Json$Encode$list, author$project$Vega$eventStreamSpec, ess));
				}
			case 1:
				var s = eh.a;
				return (s === '') ? _Utils_Tuple2(
					'update',
					elm$json$Json$Encode$string('{}')) : _Utils_Tuple2(
					'update',
					elm$json$Json$Encode$string(s));
			case 2:
				var s = eh.a;
				return _Utils_Tuple2(
					'encode',
					elm$json$Json$Encode$string(s));
			default:
				var b = eh.a;
				return _Utils_Tuple2(
					'force',
					author$project$Vega$booSpec(b));
		}
	};
	return elm$json$Json$Encode$object(
		A2(elm$core$List$map, eventHandler, ehs));
};
var author$project$Vega$signalProperty = function (sigProp) {
	switch (sigProp.$) {
		case 0:
			var s = sigProp.a;
			return _Utils_Tuple2(
				'name',
				elm$json$Json$Encode$string(s));
		case 1:
			var bd = sigProp.a;
			return author$project$Vega$bindingProperty(bd);
		case 2:
			var s = sigProp.a;
			return _Utils_Tuple2(
				'description',
				elm$json$Json$Encode$string(s));
		case 3:
			var ex = sigProp.a;
			return _Utils_Tuple2(
				'init',
				author$project$Vega$expressionSpec(ex));
		case 5:
			var ex = sigProp.a;
			return _Utils_Tuple2(
				'update',
				author$project$Vega$expressionSpec(ex));
		case 4:
			var ehs = sigProp.a;
			return _Utils_Tuple2(
				'on',
				A2(elm$json$Json$Encode$list, author$project$Vega$eventHandlerSpec, ehs));
		case 6:
			var b = sigProp.a;
			return _Utils_Tuple2(
				'react',
				author$project$Vega$booSpec(b));
		case 7:
			var v = sigProp.a;
			return _Utils_Tuple2(
				'value',
				author$project$Vega$valueSpec(v));
		default:
			return _Utils_Tuple2(
				'push',
				elm$json$Json$Encode$string('outer'));
	}
};
var author$project$Vega$signal = F2(
	function (sigName, sps) {
		return elm$core$List$cons(
			elm$json$Json$Encode$object(
				A2(
					elm$core$List$map,
					author$project$Vega$signalProperty,
					A2(
						elm$core$List$cons,
						author$project$Vega$SiName(sigName),
						sps))));
	});
var author$project$Vega$VSignals = 7;
var author$project$Vega$signals = function (sigs) {
	return _Utils_Tuple2(
		7,
		A2(elm$json$Json$Encode$list, elm$core$Basics$identity, sigs));
};
var author$project$Vega$SData = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$srData = author$project$Vega$SData;
var author$project$Vega$Str = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$str = author$project$Vega$Str;
var author$project$Vega$Symbol = 9;
var author$project$Vega$symbol = 9;
var author$project$Vega$toVega = function (spec) {
	return elm$json$Json$Encode$object(
		A2(
			elm$core$List$cons,
			_Utils_Tuple2(
				'$schema',
				elm$json$Json$Encode$string('https://vega.github.io/schema/vega/v5.json')),
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
var author$project$Vega$TContour = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var author$project$Vega$trContour = author$project$Vega$TContour;
var author$project$Vega$TFilter = function (a) {
	return {$: 12, a: a};
};
var author$project$Vega$trFilter = author$project$Vega$TFilter;
var author$project$Vega$TGeoPath = F2(
	function (a, b) {
		return {$: 20, a: a, b: b};
	});
var author$project$Vega$trGeoPath = author$project$Vega$TGeoPath;
var author$project$Vega$transform = F2(
	function (transforms, dTable) {
		return _Utils_ap(
			dTable,
			_List_fromArray(
				[
					_Utils_Tuple2(
					'transform',
					A2(elm$json$Json$Encode$list, author$project$Vega$transformSpec, transforms))
				]));
	});
var author$project$Vega$transparent = author$project$Vega$vStr('transparent');
var author$project$Vega$true = author$project$Vega$Boo(true);
var author$project$Vega$VField = function (a) {
	return {$: 13, a: a};
};
var author$project$Vega$vField = author$project$Vega$VField;
var author$project$Vega$VNum = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$vNum = author$project$Vega$VNum;
var author$project$Vega$VNums = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$vNums = author$project$Vega$VNums;
var author$project$Vega$VScale = function (a) {
	return {$: 14, a: a};
};
var author$project$Vega$vScale = function (s) {
	return author$project$Vega$VScale(
		author$project$Vega$field(s));
};
var author$project$Vega$VBoo = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$vTrue = author$project$Vega$VBoo(true);
var author$project$Vega$VWidth = 2;
var author$project$Vega$width = function (w) {
	return _Utils_Tuple2(
		2,
		elm$json$Json$Encode$float(w));
};
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var author$project$TransformTests$contourTest1 = function () {
	var si = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$Vega$signals,
			A2(
				author$project$Vega$signal,
				'count',
				_List_fromArray(
					[
						author$project$Vega$siValue(
						author$project$Vega$vNum(10)),
						author$project$Vega$siBind(
						author$project$Vega$iSelect(
							_List_fromArray(
								[
									author$project$Vega$inOptions(
									author$project$Vega$vNums(
										_List_fromArray(
											[1, 5, 10, 20])))
								])))
					]))),
		A2(
			author$project$Vega$signal,
			'points',
			_List_fromArray(
				[
					author$project$Vega$siValue(author$project$Vega$vTrue),
					author$project$Vega$siBind(
					author$project$Vega$iCheckbox(_List_Nil))
				])));
	var sc = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				author$project$Vega$scales,
				A2(
					author$project$Vega$scale,
					'xScale',
					_List_fromArray(
						[
							author$project$Vega$scType(author$project$Vega$scLinear),
							author$project$Vega$scRange(author$project$Vega$raWidth),
							author$project$Vega$scDomain(
							author$project$Vega$doData(
								_List_fromArray(
									[
										author$project$Vega$daDataset('source'),
										author$project$Vega$daField(
										author$project$Vega$field('Horsepower'))
									]))),
							author$project$Vega$scRound(author$project$Vega$true),
							author$project$Vega$scNice(author$project$Vega$niTrue),
							author$project$Vega$scZero(author$project$Vega$false)
						]))),
			A2(
				author$project$Vega$scale,
				'yScale',
				_List_fromArray(
					[
						author$project$Vega$scType(author$project$Vega$scLinear),
						author$project$Vega$scRange(author$project$Vega$raHeight),
						author$project$Vega$scDomain(
						author$project$Vega$doData(
							_List_fromArray(
								[
									author$project$Vega$daDataset('source'),
									author$project$Vega$daField(
									author$project$Vega$field('Miles_per_Gallon'))
								]))),
						author$project$Vega$scRound(author$project$Vega$true),
						author$project$Vega$scNice(author$project$Vega$niTrue),
						author$project$Vega$scZero(author$project$Vega$false)
					]))),
		A2(
			author$project$Vega$scale,
			'cScale',
			_List_fromArray(
				[
					author$project$Vega$scType(author$project$Vega$scSequential),
					author$project$Vega$scDomain(
					author$project$Vega$doData(
						_List_fromArray(
							[
								author$project$Vega$daDataset('contours'),
								author$project$Vega$daField(
								author$project$Vega$field('value'))
							]))),
					author$project$Vega$scRange(author$project$Vega$raHeatmap),
					author$project$Vega$scZero(author$project$Vega$true)
				])));
	var mk = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$Vega$marks,
			A2(
				author$project$Vega$mark,
				author$project$Vega$path,
				_List_fromArray(
					[
						author$project$Vega$mFrom(
						_List_fromArray(
							[
								author$project$Vega$srData(
								author$project$Vega$str('contours'))
							])),
						author$project$Vega$mEncode(
						_List_fromArray(
							[
								author$project$Vega$enEnter(
								_List_fromArray(
									[
										author$project$Vega$maStroke(
										_List_fromArray(
											[
												author$project$Vega$vStr('#888')
											])),
										author$project$Vega$maStrokeWidth(
										_List_fromArray(
											[
												author$project$Vega$vNum(1)
											])),
										author$project$Vega$maFill(
										_List_fromArray(
											[
												author$project$Vega$vScale('cScale'),
												author$project$Vega$vField(
												author$project$Vega$field('value'))
											])),
										author$project$Vega$maFillOpacity(
										_List_fromArray(
											[
												author$project$Vega$vNum(0.35)
											]))
									]))
							])),
						author$project$Vega$mTransform(
						_List_fromArray(
							[
								A2(
								author$project$Vega$trGeoPath,
								'',
								_List_fromArray(
									[
										author$project$Vega$gpField(
										author$project$Vega$field('datum'))
									]))
							]))
					]))),
		A2(
			author$project$Vega$mark,
			author$project$Vega$symbol,
			_List_fromArray(
				[
					author$project$Vega$mName('marks'),
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('source'))
						])),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enUpdate(
							_List_fromArray(
								[
									author$project$Vega$maX(
									_List_fromArray(
										[
											author$project$Vega$vScale('xScale'),
											author$project$Vega$vField(
											author$project$Vega$field('Horsepower'))
										])),
									author$project$Vega$maY(
									_List_fromArray(
										[
											author$project$Vega$vScale('yScale'),
											author$project$Vega$vField(
											author$project$Vega$field('Miles_per_Gallon'))
										])),
									author$project$Vega$maSize(
									_List_fromArray(
										[
											author$project$Vega$vNum(4)
										])),
									author$project$Vega$maFill(
									_List_fromArray(
										[
											A3(
											author$project$Vega$ifElse,
											'points',
											_List_fromArray(
												[author$project$Vega$black]),
											_List_fromArray(
												[author$project$Vega$transparent]))
										]))
								]))
						]))
				])));
	var le = A2(
		elm$core$Basics$composeL,
		author$project$Vega$legends,
		author$project$Vega$legend(
			_List_fromArray(
				[
					author$project$Vega$leFill('cScale'),
					author$project$Vega$leType(author$project$Vega$ltGradient)
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						author$project$Vega$trFilter(
						author$project$Vega$expr('datum[\'Horsepower\'] != null && datum[\'Miles_per_Gallon\'] != null'))
					]),
				A2(
					author$project$Vega$data,
					'source',
					_List_fromArray(
						[
							author$project$Vega$daUrl(
							author$project$Vega$str('https://vega.github.io/vega/data/cars.json'))
						]))),
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A3(
						author$project$Vega$trContour,
						author$project$Vega$numSignal('width'),
						author$project$Vega$numSignal('height'),
						_List_fromArray(
							[
								author$project$Vega$cnX(
								author$project$Vega$fExpr('scale(\'xScale\', datum.Horsepower)')),
								author$project$Vega$cnY(
								author$project$Vega$fExpr('scale(\'yScale\', datum.Miles_per_Gallon)')),
								author$project$Vega$cnWeight(
								author$project$Vega$fExpr('scale(\'xScale\', datum.Horsepower)')),
								author$project$Vega$cnCount(
								author$project$Vega$numSignal('count'))
							]))
					]),
				A2(
					author$project$Vega$data,
					'contours',
					_List_fromArray(
						[
							author$project$Vega$daSource('source')
						])))
			]));
	var cf = author$project$Vega$config(
		_List_fromArray(
			[
				A2(
				author$project$Vega$cfScaleRange,
				author$project$Vega$raHeatmap,
				A2(
					author$project$Vega$raScheme,
					author$project$Vega$str('greenblue'),
					_List_Nil))
			]));
	var ax = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$Vega$axes,
			A3(
				author$project$Vega$axis,
				'xScale',
				author$project$Vega$siBottom,
				_List_fromArray(
					[
						author$project$Vega$axGrid(author$project$Vega$true),
						author$project$Vega$axDomain(author$project$Vega$false),
						author$project$Vega$axTitle(
						author$project$Vega$str('Horsepower'))
					]))),
		A3(
			author$project$Vega$axis,
			'yScale',
			author$project$Vega$siLeft,
			_List_fromArray(
				[
					author$project$Vega$axGrid(author$project$Vega$true),
					author$project$Vega$axDomain(author$project$Vega$false),
					author$project$Vega$axTitle(
					author$project$Vega$str('Miles per gallon'))
				])));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				cf,
				author$project$Vega$width(500),
				author$project$Vega$height(400),
				author$project$Vega$padding(5),
				author$project$Vega$autosize(
				_List_fromArray(
					[author$project$Vega$asPad])),
				ds,
				si(_List_Nil),
				sc(_List_Nil),
				ax(_List_Nil),
				le(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$AgAs = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$agAs = author$project$Vega$AgAs;
var author$project$Vega$AgFields = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$agFields = author$project$Vega$AgFields;
var author$project$Vega$AgOps = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$agOps = author$project$Vega$AgOps;
var author$project$Vega$Area = 1;
var author$project$Vega$area = 1;
var author$project$Vega$AxZIndex = function (a) {
	return {$: 71, a: a};
};
var author$project$Vega$axZIndex = author$project$Vega$AxZIndex;
var author$project$Vega$DReferences = function (a) {
	return {$: 5, a: a};
};
var author$project$Vega$daReferences = author$project$Vega$DReferences;
var author$project$Vega$DiKde = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var author$project$Vega$diKde = author$project$Vega$DiKde;
var author$project$Vega$DiNormal = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var author$project$Vega$diNormal = author$project$Vega$DiNormal;
var author$project$Vega$DnExtent = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$dnExtent = author$project$Vega$DnExtent;
var author$project$Vega$DnMaxSteps = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$dnMaxSteps = author$project$Vega$DnMaxSteps;
var author$project$Vega$DnMethod = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$dnMethod = author$project$Vega$DnMethod;
var author$project$Vega$DnMinSteps = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$dnMinSteps = author$project$Vega$DnMinSteps;
var author$project$Vega$DensityFunctionSignal = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$dnSignal = author$project$Vega$DensityFunctionSignal;
var author$project$Vega$DoStrs = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$doStrs = author$project$Vega$DoStrs;
var author$project$Vega$IRadio = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$iRadio = author$project$Vega$IRadio;
var author$project$Vega$IRange = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$iRange = author$project$Vega$IRange;
var author$project$Vega$InMax = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$inMax = author$project$Vega$InMax;
var author$project$Vega$InMin = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$inMin = author$project$Vega$InMin;
var author$project$Vega$InStep = function (a) {
	return {$: 5, a: a};
};
var author$project$Vega$inStep = author$project$Vega$InStep;
var author$project$Vega$LeOffset = function (a) {
	return {$: 23, a: a};
};
var author$project$Vega$leOffset = author$project$Vega$LeOffset;
var author$project$Vega$LeOrient = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$leOrient = author$project$Vega$LeOrient;
var author$project$Vega$LeZIndex = function (a) {
	return {$: 80, a: a};
};
var author$project$Vega$leZIndex = author$project$Vega$LeZIndex;
var author$project$Vega$Line = 4;
var author$project$Vega$line = 4;
var author$project$Vega$TopLeft = {$: 1};
var author$project$Vega$loTopLeft = author$project$Vega$TopLeft;
var author$project$Vega$MY2 = function (a) {
	return {$: 5, a: a};
};
var author$project$Vega$maY2 = author$project$Vega$MY2;
var author$project$Vega$Num = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$num = author$project$Vega$Num;
var author$project$Vega$Mean = {$: 7};
var author$project$Vega$opMean = author$project$Vega$Mean;
var author$project$Vega$Stdev = {$: 14};
var author$project$Vega$opStdev = author$project$Vega$Stdev;
var author$project$Vega$RaStrs = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$raStrs = author$project$Vega$RaStrs;
var author$project$Vega$ScOrdinal = {$: 7};
var author$project$Vega$scOrdinal = author$project$Vega$ScOrdinal;
var author$project$Vega$Strs = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$strs = author$project$Vega$Strs;
var author$project$Vega$TAggregate = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$trAggregate = author$project$Vega$TAggregate;
var author$project$Vega$TDensity = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var author$project$Vega$trDensity = author$project$Vega$TDensity;
var author$project$Vega$VSignal = function (a) {
	return {$: 9, a: a};
};
var author$project$Vega$vSignal = author$project$Vega$VSignal;
var author$project$Vega$VStrs = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$vStrs = author$project$Vega$VStrs;
var author$project$TransformTests$densityTest1 = function () {
	var si = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				A2(
					elm$core$Basics$composeL,
					author$project$Vega$signals,
					A2(
						author$project$Vega$signal,
						'bandwidth',
						_List_fromArray(
							[
								author$project$Vega$siValue(
								author$project$Vega$vNum(0)),
								author$project$Vega$siBind(
								author$project$Vega$iRange(
									_List_fromArray(
										[
											author$project$Vega$inMin(0),
											author$project$Vega$inMax(0.1),
											author$project$Vega$inStep(1.0e-3)
										])))
							]))),
				A2(
					author$project$Vega$signal,
					'minSteps',
					_List_fromArray(
						[
							author$project$Vega$siValue(
							author$project$Vega$vNum(100)),
							author$project$Vega$siBind(
							author$project$Vega$iRange(
								_List_fromArray(
									[
										author$project$Vega$inMin(10),
										author$project$Vega$inMax(500),
										author$project$Vega$inStep(1)
									])))
						]))),
			A2(
				author$project$Vega$signal,
				'maxSteps',
				_List_fromArray(
					[
						author$project$Vega$siValue(
						author$project$Vega$vNum(100)),
						author$project$Vega$siBind(
						author$project$Vega$iRange(
							_List_fromArray(
								[
									author$project$Vega$inMin(10),
									author$project$Vega$inMax(500),
									author$project$Vega$inStep(1)
								])))
					]))),
		A2(
			author$project$Vega$signal,
			'method',
			_List_fromArray(
				[
					author$project$Vega$siValue(
					author$project$Vega$vStr('pdf')),
					author$project$Vega$siBind(
					author$project$Vega$iRadio(
						_List_fromArray(
							[
								author$project$Vega$inOptions(
								author$project$Vega$vStrs(
									_List_fromArray(
										['pdf', 'cdf'])))
							])))
				])));
	var sc = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				author$project$Vega$scales,
				A2(
					author$project$Vega$scale,
					'xScale',
					_List_fromArray(
						[
							author$project$Vega$scType(author$project$Vega$scLinear),
							author$project$Vega$scRange(author$project$Vega$raWidth),
							author$project$Vega$scDomain(
							author$project$Vega$doData(
								_List_fromArray(
									[
										author$project$Vega$daDataset('points'),
										author$project$Vega$daField(
										author$project$Vega$field('u'))
									]))),
							author$project$Vega$scNice(author$project$Vega$niTrue)
						]))),
			A2(
				author$project$Vega$scale,
				'yScale',
				_List_fromArray(
					[
						author$project$Vega$scType(author$project$Vega$scLinear),
						author$project$Vega$scRange(author$project$Vega$raHeight),
						author$project$Vega$scRound(author$project$Vega$true),
						author$project$Vega$scDomain(
						author$project$Vega$doData(
							_List_fromArray(
								[
									author$project$Vega$daReferences(
									_List_fromArray(
										[
											_List_fromArray(
											[
												author$project$Vega$daDataset('density'),
												author$project$Vega$daField(
												author$project$Vega$field('density'))
											]),
											_List_fromArray(
											[
												author$project$Vega$daDataset('normal'),
												author$project$Vega$daField(
												author$project$Vega$field('density'))
											])
										]))
								])))
					]))),
		A2(
			author$project$Vega$scale,
			'cScale',
			_List_fromArray(
				[
					author$project$Vega$scType(author$project$Vega$scOrdinal),
					author$project$Vega$scDomain(
					author$project$Vega$doStrs(
						author$project$Vega$strs(
							_List_fromArray(
								['Normal Estimate', 'Kernel Density Estimate'])))),
					author$project$Vega$scRange(
					author$project$Vega$raStrs(
						_List_fromArray(
							['#444', 'steelblue'])))
				])));
	var mk = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$Vega$marks,
			A2(
				author$project$Vega$mark,
				author$project$Vega$area,
				_List_fromArray(
					[
						author$project$Vega$mFrom(
						_List_fromArray(
							[
								author$project$Vega$srData(
								author$project$Vega$str('density'))
							])),
						author$project$Vega$mEncode(
						_List_fromArray(
							[
								author$project$Vega$enUpdate(
								_List_fromArray(
									[
										author$project$Vega$maX(
										_List_fromArray(
											[
												author$project$Vega$vScale('xScale'),
												author$project$Vega$vField(
												author$project$Vega$field('value'))
											])),
										author$project$Vega$maY(
										_List_fromArray(
											[
												author$project$Vega$vScale('yScale'),
												author$project$Vega$vField(
												author$project$Vega$field('density'))
											])),
										author$project$Vega$maY2(
										_List_fromArray(
											[
												author$project$Vega$vScale('yScale'),
												author$project$Vega$vNum(0)
											])),
										author$project$Vega$maFill(
										_List_fromArray(
											[
												author$project$Vega$vSignal('scale(\'cScale\', \'Kernel Density Estimate\')')
											]))
									]))
							]))
					]))),
		A2(
			author$project$Vega$mark,
			author$project$Vega$line,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('normal'))
						])),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enUpdate(
							_List_fromArray(
								[
									author$project$Vega$maX(
									_List_fromArray(
										[
											author$project$Vega$vScale('xScale'),
											author$project$Vega$vField(
											author$project$Vega$field('value'))
										])),
									author$project$Vega$maY(
									_List_fromArray(
										[
											author$project$Vega$vScale('yScale'),
											author$project$Vega$vField(
											author$project$Vega$field('density'))
										])),
									author$project$Vega$maStroke(
									_List_fromArray(
										[
											author$project$Vega$vSignal('scale(\'cScale\', \'Normal Estimate\')')
										])),
									author$project$Vega$maStrokeWidth(
									_List_fromArray(
										[
											author$project$Vega$vNum(2)
										]))
								]))
						]))
				])));
	var le = A2(
		elm$core$Basics$composeL,
		author$project$Vega$legends,
		author$project$Vega$legend(
			_List_fromArray(
				[
					author$project$Vega$leOrient(author$project$Vega$loTopLeft),
					author$project$Vega$leOffset(
					author$project$Vega$num(0)),
					author$project$Vega$leZIndex(
					author$project$Vega$num(1)),
					author$project$Vega$leFill('cScale')
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$data,
				'points',
				_List_fromArray(
					[
						author$project$Vega$daUrl(
						author$project$Vega$str('https://vega.github.io/vega/data/normal-2d.json'))
					])),
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						author$project$Vega$trAggregate(
						_List_fromArray(
							[
								author$project$Vega$agFields(
								_List_fromArray(
									[
										author$project$Vega$field('u'),
										author$project$Vega$field('u')
									])),
								author$project$Vega$agOps(
								_List_fromArray(
									[author$project$Vega$opMean, author$project$Vega$opStdev])),
								author$project$Vega$agAs(
								_List_fromArray(
									['mean', 'stdev']))
							]))
					]),
				A2(
					author$project$Vega$data,
					'summary',
					_List_fromArray(
						[
							author$project$Vega$daSource('points')
						]))),
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A2(
						author$project$Vega$trDensity,
						A3(
							author$project$Vega$diKde,
							'points',
							author$project$Vega$field('u'),
							author$project$Vega$numSignal('bandwidth')),
						_List_fromArray(
							[
								author$project$Vega$dnExtent(
								author$project$Vega$numSignal('domain(\'xScale\')')),
								author$project$Vega$dnMinSteps(
								author$project$Vega$numSignal('minSteps')),
								author$project$Vega$dnMaxSteps(
								author$project$Vega$numSignal('maxSteps')),
								author$project$Vega$dnMethod(
								author$project$Vega$dnSignal('method'))
							]))
					]),
				A2(
					author$project$Vega$data,
					'density',
					_List_fromArray(
						[
							author$project$Vega$daSource('points')
						]))),
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A2(
						author$project$Vega$trDensity,
						A2(
							author$project$Vega$diNormal,
							author$project$Vega$numSignal('data(\'summary\')[0].mean'),
							author$project$Vega$numSignal('data(\'summary\')[0].stdev')),
						_List_fromArray(
							[
								author$project$Vega$dnExtent(
								author$project$Vega$numSignal('domain(\'xScale\')')),
								author$project$Vega$dnMinSteps(
								author$project$Vega$numSignal('minSteps')),
								author$project$Vega$dnMaxSteps(
								author$project$Vega$numSignal('maxSteps')),
								author$project$Vega$dnMethod(
								author$project$Vega$dnSignal('method'))
							]))
					]),
				A2(author$project$Vega$data, 'normal', _List_Nil))
			]));
	var ax = A2(
		elm$core$Basics$composeL,
		author$project$Vega$axes,
		A3(
			author$project$Vega$axis,
			'xScale',
			author$project$Vega$siBottom,
			_List_fromArray(
				[
					author$project$Vega$axZIndex(
					author$project$Vega$num(1))
				])));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				author$project$Vega$width(500),
				author$project$Vega$height(250),
				author$project$Vega$padding(5),
				ds,
				si(_List_Nil),
				sc(_List_Nil),
				ax(_List_Nil),
				le(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$ANone = {$: 4};
var author$project$Vega$asNone = author$project$Vega$ANone;
var author$project$Vega$BooSignal = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$booSignal = author$project$Vega$BooSignal;
var author$project$Vega$CPointer = 5;
var author$project$Vega$cuPointer = 5;
var author$project$Vega$cursorValue = function (cur) {
	switch (cur) {
		case 0:
			return author$project$Vega$vStr('auto');
		case 1:
			return author$project$Vega$vStr('default');
		case 2:
			return author$project$Vega$vStr('none');
		case 3:
			return author$project$Vega$vStr('context-menu');
		case 4:
			return author$project$Vega$vStr('help');
		case 5:
			return author$project$Vega$vStr('pointer');
		case 6:
			return author$project$Vega$vStr('progress');
		case 7:
			return author$project$Vega$vStr('wait');
		case 8:
			return author$project$Vega$vStr('cell');
		case 9:
			return author$project$Vega$vStr('crosshair');
		case 10:
			return author$project$Vega$vStr('text');
		case 11:
			return author$project$Vega$vStr('vertical-text');
		case 12:
			return author$project$Vega$vStr('alias');
		case 13:
			return author$project$Vega$vStr('copy');
		case 14:
			return author$project$Vega$vStr('move');
		case 15:
			return author$project$Vega$vStr('no-drop');
		case 16:
			return author$project$Vega$vStr('not-allowed');
		case 17:
			return author$project$Vega$vStr('all-scroll');
		case 18:
			return author$project$Vega$vStr('col-resize');
		case 19:
			return author$project$Vega$vStr('row-resize');
		case 20:
			return author$project$Vega$vStr('n-resize');
		case 21:
			return author$project$Vega$vStr('e-resize');
		case 22:
			return author$project$Vega$vStr('s-resize');
		case 23:
			return author$project$Vega$vStr('w-resize');
		case 24:
			return author$project$Vega$vStr('ne-resize');
		case 25:
			return author$project$Vega$vStr('nw-resize');
		case 26:
			return author$project$Vega$vStr('se-resize');
		case 27:
			return author$project$Vega$vStr('sw-resize');
		case 28:
			return author$project$Vega$vStr('ew-resize');
		case 29:
			return author$project$Vega$vStr('ns-resize');
		case 30:
			return author$project$Vega$vStr('nesw-resize');
		case 31:
			return author$project$Vega$vStr('nwse-resize');
		case 32:
			return author$project$Vega$vStr('zoom-in');
		case 33:
			return author$project$Vega$vStr('zoom-out');
		case 34:
			return author$project$Vega$vStr('grab');
		default:
			return author$project$Vega$vStr('grabbing');
	}
};
var author$project$Vega$DaFormat = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$daFormat = author$project$Vega$DaFormat;
var author$project$Vega$ESBetween = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$Vega$esBetween = author$project$Vega$ESBetween;
var author$project$Vega$ESConsume = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$esConsume = author$project$Vega$ESConsume;
var author$project$Vega$ESFilter = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$esFilter = author$project$Vega$ESFilter;
var author$project$Vega$ESMark = function (a) {
	return {$: 7, a: a};
};
var author$project$Vega$esMark = author$project$Vega$ESMark;
var author$project$Vega$ESMerge = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$esMerge = author$project$Vega$ESMerge;
var author$project$Vega$ESObject = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$esObject = author$project$Vega$ESObject;
var author$project$Vega$ESSelector = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$esSelector = author$project$Vega$ESSelector;
var author$project$Vega$ESSource = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$esSource = author$project$Vega$ESSource;
var author$project$Vega$ESType = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$esType = author$project$Vega$ESType;
var author$project$Vega$ESWindow = {$: 3};
var author$project$Vega$esWindow = author$project$Vega$ESWindow;
var author$project$Vega$MouseDown = 8;
var author$project$Vega$etMouseDown = 8;
var author$project$Vega$MouseMove = 9;
var author$project$Vega$etMouseMove = 9;
var author$project$Vega$MouseOut = 10;
var author$project$Vega$etMouseOut = 10;
var author$project$Vega$MouseOver = 11;
var author$project$Vega$etMouseOver = 11;
var author$project$Vega$MouseUp = 12;
var author$project$Vega$etMouseUp = 12;
var author$project$Vega$EForce = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$evForce = author$project$Vega$EForce;
var author$project$Vega$EEvents = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$evHandler = F2(
	function (ess, eHandlers) {
		return A2(
			elm$core$List$cons,
			author$project$Vega$EEvents(ess),
			eHandlers);
	});
var author$project$Vega$EUpdate = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$evUpdate = author$project$Vega$EUpdate;
var author$project$Vega$FCenter = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$FpCx = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$FpCy = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$foCenter = F2(
	function (x, y) {
		return author$project$Vega$FCenter(
			_List_fromArray(
				[
					author$project$Vega$FpCx(x),
					author$project$Vega$FpCy(y)
				]));
	});
var author$project$Vega$FCollide = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$FpRadius = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$foCollide = F2(
	function (r, fps) {
		return author$project$Vega$FCollide(
			A2(
				elm$core$List$cons,
				author$project$Vega$FpRadius(r),
				fps));
	});
var author$project$Vega$FLink = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$FpLinks = function (a) {
	return {$: 10, a: a};
};
var author$project$Vega$foLink = F2(
	function (links, fps) {
		return author$project$Vega$FLink(
			A2(
				elm$core$List$cons,
				author$project$Vega$FpLinks(links),
				fps));
	});
var author$project$Vega$FNBody = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$foNBody = author$project$Vega$FNBody;
var author$project$Vega$FpDistance = function (a) {
	return {$: 12, a: a};
};
var author$project$Vega$fpDistance = author$project$Vega$FpDistance;
var author$project$Vega$FpStrength = function (a) {
	return {$: 5, a: a};
};
var author$project$Vega$fpStrength = author$project$Vega$FpStrength;
var author$project$Vega$FsForces = function (a) {
	return {$: 7, a: a};
};
var author$project$Vega$fsForces = author$project$Vega$FsForces;
var author$project$Vega$FsIterations = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$fsIterations = author$project$Vega$FsIterations;
var author$project$Vega$FsRestart = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$fsRestart = author$project$Vega$FsRestart;
var author$project$Vega$FsStatic = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$fsStatic = author$project$Vega$FsStatic;
var author$project$Vega$FsVelocityDecay = function (a) {
	return {$: 6, a: a};
};
var author$project$Vega$fsVelocityDecay = author$project$Vega$FsVelocityDecay;
var author$project$Vega$JSONProperty = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$jsonProperty = author$project$Vega$JSONProperty;
var author$project$Vega$LPShape = function (a) {
	return {$: 5, a: a};
};
var author$project$Vega$lpShape = author$project$Vega$LPShape;
var author$project$Vega$LPSourceX = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$lpSourceX = author$project$Vega$LPSourceX;
var author$project$Vega$LPSourceY = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$lpSourceY = author$project$Vega$LPSourceY;
var author$project$Vega$LPTargetX = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$lpTargetX = author$project$Vega$LPTargetX;
var author$project$Vega$LPTargetY = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$lpTargetY = author$project$Vega$LPTargetY;
var author$project$Vega$LinkDiagonal = {$: 3};
var author$project$Vega$lsDiagonal = author$project$Vega$LinkDiagonal;
var author$project$Vega$MInteractive = function (a) {
	return {$: 5, a: a};
};
var author$project$Vega$mInteractive = author$project$Vega$MInteractive;
var author$project$Vega$MOn = function (a) {
	return {$: 8, a: a};
};
var author$project$Vega$mOn = author$project$Vega$MOn;
var author$project$Vega$MTopZIndex = function (a) {
	return {$: 10, a: a};
};
var author$project$Vega$mZIndex = author$project$Vega$MTopZIndex;
var author$project$Vega$MCursor = function (a) {
	return {$: 19, a: a};
};
var author$project$Vega$maCursor = author$project$Vega$MCursor;
var author$project$Vega$SiDescription = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$siDescription = author$project$Vega$SiDescription;
var author$project$Vega$SiOn = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$siOn = author$project$Vega$SiOn;
var author$project$Vega$SiUpdate = function (a) {
	return {$: 5, a: a};
};
var author$project$Vega$siUpdate = author$project$Vega$SiUpdate;
var author$project$Vega$StrSignal = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$strSignal = author$project$Vega$StrSignal;
var author$project$Vega$TgModifyValues = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var author$project$Vega$tgModifyValues = author$project$Vega$TgModifyValues;
var author$project$Vega$TForce = function (a) {
	return {$: 17, a: a};
};
var author$project$Vega$trForce = author$project$Vega$TForce;
var author$project$Vega$TLinkPath = function (a) {
	return {$: 29, a: a};
};
var author$project$Vega$trLinkPath = author$project$Vega$TLinkPath;
var author$project$Vega$TgTrigger = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$triggerProperties = function (trans) {
	switch (trans.$) {
		case 0:
			var ex = trans.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'trigger',
					author$project$Vega$expressionSpec(ex))
				]);
		case 1:
			var ex = trans.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'insert',
					author$project$Vega$expressionSpec(ex))
				]);
		case 2:
			var ex = trans.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'remove',
					author$project$Vega$expressionSpec(ex))
				]);
		case 3:
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'remove',
					elm$json$Json$Encode$bool(true))
				]);
		case 4:
			var ex = trans.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'toggle',
					author$project$Vega$expressionSpec(ex))
				]);
		default:
			var modExpr = trans.a;
			var valExpr = trans.b;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'modify',
					author$project$Vega$expressionSpec(modExpr)),
					_Utils_Tuple2(
					'values',
					author$project$Vega$expressionSpec(valExpr))
				]);
	}
};
var author$project$Vega$trigger = F2(
	function (trName, trProps) {
		return elm$json$Json$Encode$object(
			A2(
				elm$core$List$concatMap,
				author$project$Vega$triggerProperties,
				A2(
					elm$core$List$cons,
					author$project$Vega$TgTrigger(trName),
					trProps)));
	});
var author$project$Vega$vFalse = author$project$Vega$VBoo(false);
var author$project$Vega$VNull = {$: 20};
var author$project$Vega$vNull = author$project$Vega$VNull;
var author$project$Vega$white = author$project$Vega$vStr('white');
var elm$core$Basics$negate = function (n) {
	return -n;
};
var author$project$TransformTests$forceTest1 = function () {
	var si = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				A2(
					elm$core$Basics$composeL,
					A2(
						elm$core$Basics$composeL,
						A2(
							elm$core$Basics$composeL,
							A2(
								elm$core$Basics$composeL,
								A2(
									elm$core$Basics$composeL,
									A2(
										elm$core$Basics$composeL,
										A2(
											elm$core$Basics$composeL,
											author$project$Vega$signals,
											A2(
												author$project$Vega$signal,
												'cx',
												_List_fromArray(
													[
														author$project$Vega$siUpdate('width /2')
													]))),
										A2(
											author$project$Vega$signal,
											'cy',
											_List_fromArray(
												[
													author$project$Vega$siUpdate('height /2')
												]))),
									A2(
										author$project$Vega$signal,
										'collideRadius',
										_List_fromArray(
											[
												author$project$Vega$siValue(
												author$project$Vega$vNum(5)),
												author$project$Vega$siBind(
												author$project$Vega$iRange(
													_List_fromArray(
														[
															author$project$Vega$inMin(3),
															author$project$Vega$inMax(20),
															author$project$Vega$inStep(1)
														])))
											]))),
								A2(
									author$project$Vega$signal,
									'nbodyStrength',
									_List_fromArray(
										[
											author$project$Vega$siValue(
											author$project$Vega$vNum(-10)),
											author$project$Vega$siBind(
											author$project$Vega$iRange(
												_List_fromArray(
													[
														author$project$Vega$inMin(-50),
														author$project$Vega$inMax(10),
														author$project$Vega$inStep(1)
													])))
										]))),
							A2(
								author$project$Vega$signal,
								'linkDistance',
								_List_fromArray(
									[
										author$project$Vega$siValue(
										author$project$Vega$vNum(15)),
										author$project$Vega$siBind(
										author$project$Vega$iRange(
											_List_fromArray(
												[
													author$project$Vega$inMin(5),
													author$project$Vega$inMax(100),
													author$project$Vega$inStep(1)
												])))
									]))),
						A2(
							author$project$Vega$signal,
							'velocityDecay',
							_List_fromArray(
								[
									author$project$Vega$siValue(
									author$project$Vega$vNum(0.4)),
									author$project$Vega$siBind(
									author$project$Vega$iRange(
										_List_fromArray(
											[
												author$project$Vega$inMin(0),
												author$project$Vega$inMax(1),
												author$project$Vega$inStep(1.0e-2)
											])))
								]))),
					A2(
						author$project$Vega$signal,
						'static',
						_List_fromArray(
							[
								author$project$Vega$siValue(author$project$Vega$vTrue),
								author$project$Vega$siBind(
								author$project$Vega$iCheckbox(_List_Nil))
							]))),
				A2(
					author$project$Vega$signal,
					'fix',
					_List_fromArray(
						[
							author$project$Vega$siDescription('State variable for active node fix status.'),
							author$project$Vega$siValue(
							author$project$Vega$vNum(0)),
							author$project$Vega$siOn(
							_List_fromArray(
								[
									A2(
									author$project$Vega$evHandler,
									_List_fromArray(
										[
											author$project$Vega$esMerge(
											_List_fromArray(
												[
													author$project$Vega$esObject(
													_List_fromArray(
														[
															author$project$Vega$esMark(author$project$Vega$symbol),
															author$project$Vega$esType(author$project$Vega$etMouseOut),
															author$project$Vega$esFilter(
															_List_fromArray(
																['!event.buttons']))
														])),
													author$project$Vega$esObject(
													_List_fromArray(
														[
															author$project$Vega$esSource(author$project$Vega$esWindow),
															author$project$Vega$esType(author$project$Vega$etMouseUp)
														]))
												]))
										]),
									_List_fromArray(
										[
											author$project$Vega$evUpdate('0')
										])),
									A2(
									author$project$Vega$evHandler,
									_List_fromArray(
										[
											author$project$Vega$esObject(
											_List_fromArray(
												[
													author$project$Vega$esMark(author$project$Vega$symbol),
													author$project$Vega$esType(author$project$Vega$etMouseOver)
												]))
										]),
									_List_fromArray(
										[
											author$project$Vega$evUpdate('fix || 1')
										])),
									A2(
									author$project$Vega$evHandler,
									_List_fromArray(
										[
											author$project$Vega$esObject(
											_List_fromArray(
												[
													A2(
													author$project$Vega$esBetween,
													_List_fromArray(
														[
															author$project$Vega$esMark(author$project$Vega$symbol),
															author$project$Vega$esType(author$project$Vega$etMouseDown)
														]),
													_List_fromArray(
														[
															author$project$Vega$esSource(author$project$Vega$esWindow),
															author$project$Vega$esType(author$project$Vega$etMouseUp)
														])),
													author$project$Vega$esSource(author$project$Vega$esWindow),
													author$project$Vega$esType(author$project$Vega$etMouseMove),
													author$project$Vega$esConsume(author$project$Vega$true)
												]))
										]),
									_List_fromArray(
										[
											author$project$Vega$evUpdate('2'),
											author$project$Vega$evForce(author$project$Vega$true)
										]))
								]))
						]))),
			A2(
				author$project$Vega$signal,
				'node',
				_List_fromArray(
					[
						author$project$Vega$siDescription('Graph node most recently interacted with.'),
						author$project$Vega$siValue(author$project$Vega$vNull),
						author$project$Vega$siOn(
						_List_fromArray(
							[
								A2(
								author$project$Vega$evHandler,
								_List_fromArray(
									[
										author$project$Vega$esObject(
										_List_fromArray(
											[
												author$project$Vega$esMark(author$project$Vega$symbol),
												author$project$Vega$esType(author$project$Vega$etMouseOver)
											]))
									]),
								_List_fromArray(
									[
										author$project$Vega$evUpdate('fix === 1 ? item() : node')
									]))
							]))
					]))),
		A2(
			author$project$Vega$signal,
			'restart',
			_List_fromArray(
				[
					author$project$Vega$siDescription('Flag to restart Force simulation upon data changes.'),
					author$project$Vega$siValue(author$project$Vega$vFalse),
					author$project$Vega$siOn(
					_List_fromArray(
						[
							A2(
							author$project$Vega$evHandler,
							_List_fromArray(
								[
									author$project$Vega$esSelector(
									author$project$Vega$strSignal('fix'))
								]),
							_List_fromArray(
								[
									author$project$Vega$evUpdate('fix > 1 ')
								]))
						]))
				])));
	var sc = A2(
		elm$core$Basics$composeL,
		author$project$Vega$scales,
		A2(
			author$project$Vega$scale,
			'cScale',
			_List_fromArray(
				[
					author$project$Vega$scType(author$project$Vega$scOrdinal),
					author$project$Vega$scRange(
					A2(
						author$project$Vega$raScheme,
						author$project$Vega$str('category20c'),
						_List_Nil))
				])));
	var mk = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$Vega$marks,
			A2(
				author$project$Vega$mark,
				author$project$Vega$symbol,
				_List_fromArray(
					[
						author$project$Vega$mName('nodes'),
						author$project$Vega$mFrom(
						_List_fromArray(
							[
								author$project$Vega$srData(
								author$project$Vega$str('node-data'))
							])),
						author$project$Vega$mZIndex(
						author$project$Vega$num(1)),
						author$project$Vega$mOn(
						_List_fromArray(
							[
								A2(
								author$project$Vega$trigger,
								'fix',
								_List_fromArray(
									[
										A2(author$project$Vega$tgModifyValues, 'node', 'fix === 1 ? {fx:node.x, fy:node.y} : {fx:x(), fy:y()}')
									])),
								A2(
								author$project$Vega$trigger,
								'!fix',
								_List_fromArray(
									[
										A2(author$project$Vega$tgModifyValues, 'node', '{fx: null, fy: null}')
									]))
							])),
						author$project$Vega$mEncode(
						_List_fromArray(
							[
								author$project$Vega$enEnter(
								_List_fromArray(
									[
										author$project$Vega$maFill(
										_List_fromArray(
											[
												author$project$Vega$vScale('cScale'),
												author$project$Vega$vField(
												author$project$Vega$field('group'))
											])),
										author$project$Vega$maStroke(
										_List_fromArray(
											[author$project$Vega$white]))
									])),
								author$project$Vega$enUpdate(
								_List_fromArray(
									[
										author$project$Vega$maSize(
										_List_fromArray(
											[
												author$project$Vega$vSignal('2 * collideRadius * collideRadius')
											])),
										author$project$Vega$maCursor(
										_List_fromArray(
											[
												author$project$Vega$cursorValue(author$project$Vega$cuPointer)
											]))
									]))
							])),
						author$project$Vega$mTransform(
						_List_fromArray(
							[
								author$project$Vega$trForce(
								_List_fromArray(
									[
										author$project$Vega$fsIterations(
										author$project$Vega$num(300)),
										author$project$Vega$fsVelocityDecay(
										author$project$Vega$numSignal('velocityDecay')),
										author$project$Vega$fsRestart(
										author$project$Vega$booSignal('restart')),
										author$project$Vega$fsStatic(
										author$project$Vega$booSignal('static')),
										author$project$Vega$fsForces(
										_List_fromArray(
											[
												A2(
												author$project$Vega$foCenter,
												author$project$Vega$numSignal('cx'),
												author$project$Vega$numSignal('cy')),
												A2(
												author$project$Vega$foCollide,
												author$project$Vega$numSignal('collideRadius'),
												_List_Nil),
												author$project$Vega$foNBody(
												_List_fromArray(
													[
														author$project$Vega$fpStrength(
														author$project$Vega$numSignal('nbodyStrength'))
													])),
												A2(
												author$project$Vega$foLink,
												author$project$Vega$str('link-data'),
												_List_fromArray(
													[
														author$project$Vega$fpDistance(
														author$project$Vega$numSignal('linkDistance'))
													]))
											]))
									]))
							]))
					]))),
		A2(
			author$project$Vega$mark,
			author$project$Vega$path,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('link-data'))
						])),
					author$project$Vega$mInteractive(author$project$Vega$false),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enUpdate(
							_List_fromArray(
								[
									author$project$Vega$maStroke(
									_List_fromArray(
										[
											author$project$Vega$vStr('#ccc')
										])),
									author$project$Vega$maStrokeWidth(
									_List_fromArray(
										[
											author$project$Vega$vNum(0.5)
										]))
								]))
						])),
					author$project$Vega$mTransform(
					_List_fromArray(
						[
							author$project$Vega$trLinkPath(
							_List_fromArray(
								[
									author$project$Vega$lpShape(author$project$Vega$lsDiagonal),
									author$project$Vega$lpSourceX(
									author$project$Vega$field('datum.source.x')),
									author$project$Vega$lpSourceY(
									author$project$Vega$field('datum.source.y')),
									author$project$Vega$lpTargetX(
									author$project$Vega$field('datum.target.x')),
									author$project$Vega$lpTargetY(
									author$project$Vega$field('datum.target.y'))
								]))
						]))
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$data,
				'node-data',
				_List_fromArray(
					[
						author$project$Vega$daUrl(
						author$project$Vega$str('https://vega.github.io/vega/data/miserables.json')),
						author$project$Vega$daFormat(
						_List_fromArray(
							[
								author$project$Vega$jsonProperty(
								author$project$Vega$str('nodes'))
							]))
					])),
				A2(
				author$project$Vega$data,
				'link-data',
				_List_fromArray(
					[
						author$project$Vega$daUrl(
						author$project$Vega$str('https://vega.github.io/vega/data/miserables.json')),
						author$project$Vega$daFormat(
						_List_fromArray(
							[
								author$project$Vega$jsonProperty(
								author$project$Vega$str('links'))
							]))
					]))
			]));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				author$project$Vega$width(400),
				author$project$Vega$height(275),
				author$project$Vega$autosize(
				_List_fromArray(
					[author$project$Vega$asNone])),
				ds,
				si(_List_Nil),
				sc(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$KdBandwidth = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$kdBandwidth = author$project$Vega$KdBandwidth;
var author$project$Vega$KdCounts = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$kdCounts = author$project$Vega$KdCounts;
var author$project$Vega$KdCumulative = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$kdCumulative = author$project$Vega$KdCumulative;
var author$project$Vega$KdExtent = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$kdExtent = author$project$Vega$KdExtent;
var author$project$Vega$KdSteps = function (a) {
	return {$: 8, a: a};
};
var author$project$Vega$kdSteps = author$project$Vega$KdSteps;
var author$project$Vega$numSignals = author$project$Vega$NumSignals;
var author$project$Vega$TKde = F2(
	function (a, b) {
		return {$: 28, a: a, b: b};
	});
var author$project$Vega$trKde = author$project$Vega$TKde;
var author$project$TransformTests$kdeTest1 = function () {
	var si = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				A2(
					elm$core$Basics$composeL,
					A2(
						elm$core$Basics$composeL,
						A2(
							elm$core$Basics$composeL,
							author$project$Vega$signals,
							A2(
								author$project$Vega$signal,
								'bandwidth',
								_List_fromArray(
									[
										author$project$Vega$siValue(
										author$project$Vega$vNum(2.0e-2)),
										author$project$Vega$siBind(
										author$project$Vega$iRange(
											_List_fromArray(
												[
													author$project$Vega$inMin(1.0e-3),
													author$project$Vega$inMax(0.1),
													author$project$Vega$inStep(1.0e-3)
												])))
									]))),
						A2(
							author$project$Vega$signal,
							'steps',
							_List_fromArray(
								[
									author$project$Vega$siValue(
									author$project$Vega$vNum(50)),
									author$project$Vega$siBind(
									author$project$Vega$iRange(
										_List_fromArray(
											[
												author$project$Vega$inMin(10),
												author$project$Vega$inMax(500),
												author$project$Vega$inStep(1)
											])))
								]))),
					A2(
						author$project$Vega$signal,
						'isCumulative',
						_List_fromArray(
							[
								author$project$Vega$siValue(author$project$Vega$vFalse),
								author$project$Vega$siBind(
								author$project$Vega$iCheckbox(_List_Nil))
							]))),
				A2(
					author$project$Vega$signal,
					'counts',
					_List_fromArray(
						[
							author$project$Vega$siValue(author$project$Vega$vFalse),
							author$project$Vega$siBind(
							author$project$Vega$iCheckbox(_List_Nil))
						]))),
			A2(
				author$project$Vega$signal,
				'minExtent',
				_List_fromArray(
					[
						author$project$Vega$siValue(
						author$project$Vega$vNum(-0.6)),
						author$project$Vega$siBind(
						author$project$Vega$iRange(
							_List_fromArray(
								[
									author$project$Vega$inMin(-0.6),
									author$project$Vega$inMax(0.6)
								])))
					]))),
		A2(
			author$project$Vega$signal,
			'maxExtent',
			_List_fromArray(
				[
					author$project$Vega$siValue(
					author$project$Vega$vNum(0.6)),
					author$project$Vega$siBind(
					author$project$Vega$iRange(
						_List_fromArray(
							[
								author$project$Vega$inMin(-0.6),
								author$project$Vega$inMax(0.6)
							])))
				])));
	var sc = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$Vega$scales,
			A2(
				author$project$Vega$scale,
				'xScale',
				_List_fromArray(
					[
						author$project$Vega$scRange(author$project$Vega$raWidth),
						author$project$Vega$scDomain(
						author$project$Vega$doData(
							_List_fromArray(
								[
									author$project$Vega$daDataset('points'),
									author$project$Vega$daField(
									author$project$Vega$field('u'))
								]))),
						author$project$Vega$scNice(author$project$Vega$niTrue)
					]))),
		A2(
			author$project$Vega$scale,
			'yScale',
			_List_fromArray(
				[
					author$project$Vega$scRange(author$project$Vega$raHeight),
					author$project$Vega$scRound(author$project$Vega$true),
					author$project$Vega$scDomain(
					author$project$Vega$doData(
						_List_fromArray(
							[
								author$project$Vega$daReferences(
								_List_fromArray(
									[
										_List_fromArray(
										[
											author$project$Vega$daDataset('density'),
											author$project$Vega$daField(
											author$project$Vega$field('density'))
										])
									]))
							])))
				])));
	var mk = A2(
		elm$core$Basics$composeL,
		author$project$Vega$marks,
		A2(
			author$project$Vega$mark,
			author$project$Vega$area,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('density'))
						])),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enUpdate(
							_List_fromArray(
								[
									author$project$Vega$maX(
									_List_fromArray(
										[
											author$project$Vega$vScale('xScale'),
											author$project$Vega$vField(
											author$project$Vega$field('value'))
										])),
									author$project$Vega$maY(
									_List_fromArray(
										[
											author$project$Vega$vScale('yScale'),
											author$project$Vega$vField(
											author$project$Vega$field('density'))
										])),
									author$project$Vega$maY2(
									_List_fromArray(
										[
											author$project$Vega$vScale('yScale'),
											author$project$Vega$vNum(0)
										])),
									author$project$Vega$maFill(
									_List_fromArray(
										[
											author$project$Vega$vStr('steelblue')
										]))
								]))
						]))
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$data,
				'points',
				_List_fromArray(
					[
						author$project$Vega$daUrl(
						author$project$Vega$str('https://vega.github.io/vega/data/normal-2d.json'))
					])),
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A2(
						author$project$Vega$trKde,
						author$project$Vega$field('u'),
						_List_fromArray(
							[
								author$project$Vega$kdCumulative(
								author$project$Vega$booSignal('isCumulative')),
								author$project$Vega$kdCounts(
								author$project$Vega$booSignal('counts')),
								author$project$Vega$kdBandwidth(
								author$project$Vega$numSignal('bandwidth')),
								author$project$Vega$kdSteps(
								author$project$Vega$numSignal('steps')),
								author$project$Vega$kdExtent(
								author$project$Vega$numSignals(
									_List_fromArray(
										['minExtent', 'maxExtent'])))
							]))
					]),
				A2(
					author$project$Vega$data,
					'density',
					_List_fromArray(
						[
							author$project$Vega$daSource('points')
						])))
			]));
	var ax = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$Vega$axes,
			A3(author$project$Vega$axis, 'xScale', author$project$Vega$siBottom, _List_Nil)),
		A3(author$project$Vega$axis, 'yScale', author$project$Vega$siLeft, _List_Nil));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				author$project$Vega$width(500),
				author$project$Vega$height(250),
				author$project$Vega$padding(20),
				ds,
				si(_List_Nil),
				sc(_List_Nil),
				ax(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$dataColumn = F2(
	function (colName, val) {
		switch (val.$) {
			case 3:
				var ns = val.a;
				return elm$core$List$cons(
					A2(
						elm$core$List$map,
						function (n) {
							return _Utils_Tuple2(
								colName,
								elm$json$Json$Encode$float(n));
						},
						ns));
			case 2:
				var n = val.a;
				return elm$core$List$cons(
					_List_fromArray(
						[
							_Utils_Tuple2(
							colName,
							elm$json$Json$Encode$float(n))
						]));
			case 5:
				var bs = val.a;
				return elm$core$List$cons(
					A2(
						elm$core$List$map,
						function (b) {
							return _Utils_Tuple2(
								colName,
								elm$json$Json$Encode$bool(b));
						},
						bs));
			case 4:
				var b = val.a;
				return elm$core$List$cons(
					_List_fromArray(
						[
							_Utils_Tuple2(
							colName,
							elm$json$Json$Encode$bool(b))
						]));
			case 1:
				var ss = val.a;
				return elm$core$List$cons(
					A2(
						elm$core$List$map,
						function (s) {
							return _Utils_Tuple2(
								colName,
								elm$json$Json$Encode$string(s));
						},
						ss));
			case 0:
				var s = val.a;
				return elm$core$List$cons(
					_List_fromArray(
						[
							_Utils_Tuple2(
							colName,
							elm$json$Json$Encode$string(s))
						]));
			case 6:
				var vals = val.a;
				return elm$core$List$cons(
					_List_fromArray(
						[
							_Utils_Tuple2(
							colName,
							elm$json$Json$Encode$object(
								A2(elm$core$List$concatMap, author$project$Vega$valueProperties, vals)))
						]));
			case 8:
				var vals = val.a;
				return elm$core$List$cons(
					_List_fromArray(
						[
							_Utils_Tuple2(
							colName,
							A2(elm$json$Json$Encode$list, author$project$Vega$valueSpec, vals))
						]));
			default:
				return elm$core$List$cons(
					_List_fromArray(
						[
							_Utils_Tuple2(colName, elm$json$Json$Encode$null)
						]));
		}
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var author$project$Vega$transpose = function (xss) {
	var numCols = A2(
		elm$core$Basics$composeR,
		elm$core$List$head,
		A2(
			elm$core$Basics$composeR,
			elm$core$Maybe$withDefault(_List_Nil),
			elm$core$List$length));
	return A3(
		elm$core$List$foldr,
		elm$core$List$map2(elm$core$List$cons),
		A2(
			elm$core$List$repeat,
			numCols(xss),
			_List_Nil),
		xss);
};
var author$project$Vega$dataFromColumns = F3(
	function (name, fmts, cols) {
		var fmt = _Utils_eq(fmts, _List_Nil) ? _List_Nil : _List_fromArray(
			[
				_Utils_Tuple2(
				'format',
				elm$json$Json$Encode$object(
					A2(elm$core$List$concatMap, author$project$Vega$formatProperty, fmts)))
			]);
		var dataArray = A2(
			elm$json$Json$Encode$list,
			elm$json$Json$Encode$object,
			author$project$Vega$transpose(cols));
		return _Utils_ap(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'name',
					elm$json$Json$Encode$string(name)),
					_Utils_Tuple2('values', dataArray)
				]),
			fmt);
	});
var author$project$Vega$FaGroupBy = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$faGroupBy = author$project$Vega$FaGroupBy;
var author$project$Vega$Group = 3;
var author$project$Vega$group = 3;
var author$project$Vega$KdGroupBy = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$kdGroupBy = author$project$Vega$KdGroupBy;
var author$project$Vega$KdResolve = function (a) {
	return {$: 7, a: a};
};
var author$project$Vega$kdResolve = author$project$Vega$KdResolve;
var author$project$Vega$MGroup = function (a) {
	return {$: 14, a: a};
};
var author$project$Vega$mGroup = author$project$Vega$MGroup;
var author$project$Vega$Nums = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$nums = author$project$Vega$Nums;
var author$project$Vega$RaCategory = {$: 9};
var author$project$Vega$raCategory = author$project$Vega$RaCategory;
var author$project$Vega$RShared = 0;
var author$project$Vega$reShared = 0;
var author$project$Vega$SFacet = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var author$project$Vega$srFacet = F2(
	function (d, name) {
		return A2(author$project$Vega$SFacet, d, name);
	});
var author$project$Vega$StAs = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var author$project$Vega$stAs = F2(
	function (y0, y1) {
		return A2(author$project$Vega$StAs, y0, y1);
	});
var author$project$Vega$OfCenter = {$: 1};
var author$project$Vega$stCenter = author$project$Vega$OfCenter;
var author$project$Vega$StField = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$stField = author$project$Vega$StField;
var author$project$Vega$StGroupBy = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$stGroupBy = author$project$Vega$StGroupBy;
var author$project$Vega$StOffset = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$stOffset = author$project$Vega$StOffset;
var author$project$Vega$TStack = function (a) {
	return {$: 44, a: a};
};
var author$project$Vega$trStack = author$project$Vega$TStack;
var author$project$TransformTests$kdeTest2 = function () {
	var table = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(author$project$Vega$dataFromColumns, 'table', _List_Nil),
			A2(
				author$project$Vega$dataColumn,
				'obs',
				author$project$Vega$vNums(
					_List_fromArray(
						[1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 9, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 12, 12, 13, 13, 14, 15])))),
		A2(
			author$project$Vega$dataColumn,
			'cat',
			author$project$Vega$vNums(
				_List_fromArray(
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2]))));
	var sc = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				author$project$Vega$scales,
				A2(
					author$project$Vega$scale,
					'xScale',
					_List_fromArray(
						[
							author$project$Vega$scRange(author$project$Vega$raWidth),
							author$project$Vega$scDomain(
							author$project$Vega$doData(
								_List_fromArray(
									[
										author$project$Vega$daDataset('table'),
										author$project$Vega$daField(
										author$project$Vega$field('value'))
									]))),
							author$project$Vega$scZero(author$project$Vega$false)
						]))),
			A2(
				author$project$Vega$scale,
				'yScale',
				_List_fromArray(
					[
						author$project$Vega$scRange(author$project$Vega$raHeight),
						author$project$Vega$scDomain(
						author$project$Vega$doData(
							_List_fromArray(
								[
									author$project$Vega$daDataset('table'),
									author$project$Vega$daField(
									author$project$Vega$field('upper'))
								]))),
						author$project$Vega$scNice(author$project$Vega$niTrue),
						author$project$Vega$scZero(author$project$Vega$true)
					]))),
		A2(
			author$project$Vega$scale,
			'cScale',
			_List_fromArray(
				[
					author$project$Vega$scType(author$project$Vega$scOrdinal),
					author$project$Vega$scRange(author$project$Vega$raCategory)
				])));
	var nestedMk = A2(
		elm$core$Basics$composeL,
		author$project$Vega$marks,
		A2(
			author$project$Vega$mark,
			author$project$Vega$area,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('stackedFacets'))
						])),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enEnter(
							_List_fromArray(
								[
									author$project$Vega$maX(
									_List_fromArray(
										[
											author$project$Vega$vScale('xScale'),
											author$project$Vega$vField(
											author$project$Vega$field('value'))
										])),
									author$project$Vega$maY(
									_List_fromArray(
										[
											author$project$Vega$vScale('yScale'),
											author$project$Vega$vField(
											author$project$Vega$field('lower'))
										])),
									author$project$Vega$maY2(
									_List_fromArray(
										[
											author$project$Vega$vScale('yScale'),
											author$project$Vega$vField(
											author$project$Vega$field('upper'))
										])),
									author$project$Vega$maFill(
									_List_fromArray(
										[
											author$project$Vega$vScale('cScale'),
											author$project$Vega$vField(
											author$project$Vega$field('cat'))
										]))
								]))
						]))
				])));
	var mk = A2(
		elm$core$Basics$composeL,
		author$project$Vega$marks,
		A2(
			author$project$Vega$mark,
			author$project$Vega$group,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							A3(
							author$project$Vega$srFacet,
							author$project$Vega$str('table'),
							'stackedFacets',
							_List_fromArray(
								[
									author$project$Vega$faGroupBy(
									_List_fromArray(
										[
											author$project$Vega$field('cat')
										]))
								]))
						])),
					author$project$Vega$mGroup(
					_List_fromArray(
						[
							nestedMk(_List_Nil)
						]))
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A2(
						author$project$Vega$trKde,
						author$project$Vega$field('obs'),
						_List_fromArray(
							[
								author$project$Vega$kdGroupBy(
								_List_fromArray(
									[
										author$project$Vega$field('cat')
									])),
								author$project$Vega$kdBandwidth(
								author$project$Vega$num(1)),
								author$project$Vega$kdExtent(
								author$project$Vega$nums(
									_List_fromArray(
										[1, 15]))),
								author$project$Vega$kdSteps(
								author$project$Vega$num(100)),
								author$project$Vega$kdResolve(author$project$Vega$reShared)
							])),
						author$project$Vega$trStack(
						_List_fromArray(
							[
								author$project$Vega$stField(
								author$project$Vega$field('density')),
								author$project$Vega$stGroupBy(
								_List_fromArray(
									[
										author$project$Vega$field('value')
									])),
								author$project$Vega$stOffset(author$project$Vega$stCenter),
								A2(author$project$Vega$stAs, 'lower', 'upper')
							]))
					]),
				table(_List_Nil))
			]));
	var ax = A2(
		elm$core$Basics$composeL,
		author$project$Vega$axes,
		A3(
			author$project$Vega$axis,
			'xScale',
			author$project$Vega$siBottom,
			_List_fromArray(
				[
					author$project$Vega$axTitle(
					author$project$Vega$str('observation'))
				])));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				author$project$Vega$width(500),
				author$project$Vega$height(200),
				ds,
				sc(_List_Nil),
				ax(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$hCenter = author$project$Vega$vStr('center');
var author$project$Vega$MAlign = function (a) {
	return {$: 23, a: a};
};
var author$project$Vega$maAlign = author$project$Vega$MAlign;
var author$project$Vega$MBaseline = function (a) {
	return {$: 24, a: a};
};
var author$project$Vega$maBaseline = author$project$Vega$MBaseline;
var author$project$Vega$MFontSize = function (a) {
	return {$: 48, a: a};
};
var author$project$Vega$maFontSize = author$project$Vega$MFontSize;
var author$project$Vega$MFontWeight = function (a) {
	return {$: 49, a: a};
};
var author$project$Vega$maFontWeight = author$project$Vega$MFontWeight;
var author$project$Vega$MPath = function (a) {
	return {$: 39, a: a};
};
var author$project$Vega$maPath = author$project$Vega$MPath;
var author$project$Vega$MText = function (a) {
	return {$: 55, a: a};
};
var author$project$Vega$maText = author$project$Vega$MText;
var author$project$Vega$Tidy = {$: 0};
var author$project$Vega$meTidy = author$project$Vega$Tidy;
var author$project$Vega$TeMethod = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$teMethod = author$project$Vega$TeMethod;
var author$project$Vega$TeSize = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$teSize = author$project$Vega$TeSize;
var author$project$Vega$Text = 10;
var author$project$Vega$text = 10;
var author$project$Vega$TNest = F2(
	function (a, b) {
		return {$: 32, a: a, b: b};
	});
var author$project$Vega$trNest = author$project$Vega$TNest;
var author$project$Vega$TTree = function (a) {
	return {$: 46, a: a};
};
var author$project$Vega$trTree = author$project$Vega$TTree;
var author$project$Vega$TTreeLinks = {$: 47};
var author$project$Vega$trTreeLinks = author$project$Vega$TTreeLinks;
var author$project$Vega$vMiddle = author$project$Vega$vStr('middle');
var author$project$TransformTests$nestTest1 = function () {
	var table = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				A2(author$project$Vega$dataFromColumns, 'tree', _List_Nil),
				A2(
					author$project$Vega$dataColumn,
					'id',
					author$project$Vega$vStrs(
						_List_fromArray(
							['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])))),
			A2(
				author$project$Vega$dataColumn,
				'job',
				author$project$Vega$vStrs(
					_List_fromArray(
						['Doctor', 'Doctor', 'Lawyer', 'Lawyer', 'Doctor', 'Doctor', 'Lawyer', 'Lawyer'])))),
		A2(
			author$project$Vega$dataColumn,
			'region',
			author$project$Vega$vStrs(
				_List_fromArray(
					['East', 'East', 'East', 'East', 'West', 'West', 'West', 'West']))));
	var si = A2(
		elm$core$Basics$composeL,
		author$project$Vega$signals,
		A2(
			author$project$Vega$signal,
			'generate',
			_List_fromArray(
				[
					author$project$Vega$siValue(author$project$Vega$vTrue),
					author$project$Vega$siBind(
					author$project$Vega$iCheckbox(_List_Nil))
				])));
	var sc = A2(
		elm$core$Basics$composeL,
		author$project$Vega$scales,
		A2(
			author$project$Vega$scale,
			'cScale',
			_List_fromArray(
				[
					author$project$Vega$scType(author$project$Vega$scOrdinal),
					author$project$Vega$scRange(
					A2(
						author$project$Vega$raScheme,
						author$project$Vega$str('category20'),
						_List_Nil))
				])));
	var mk = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				author$project$Vega$marks,
				A2(
					author$project$Vega$mark,
					author$project$Vega$path,
					_List_fromArray(
						[
							author$project$Vega$mFrom(
							_List_fromArray(
								[
									author$project$Vega$srData(
									author$project$Vega$str('links'))
								])),
							author$project$Vega$mEncode(
							_List_fromArray(
								[
									author$project$Vega$enUpdate(
									_List_fromArray(
										[
											author$project$Vega$maStroke(
											_List_fromArray(
												[
													author$project$Vega$vStr('#ccc')
												])),
											author$project$Vega$maPath(
											_List_fromArray(
												[
													author$project$Vega$vField(
													author$project$Vega$field('path'))
												]))
										]))
								]))
						]))),
			A2(
				author$project$Vega$mark,
				author$project$Vega$symbol,
				_List_fromArray(
					[
						author$project$Vega$mFrom(
						_List_fromArray(
							[
								author$project$Vega$srData(
								author$project$Vega$str('tree'))
							])),
						author$project$Vega$mEncode(
						_List_fromArray(
							[
								author$project$Vega$enUpdate(
								_List_fromArray(
									[
										author$project$Vega$maFill(
										_List_fromArray(
											[
												author$project$Vega$vScale('cScale'),
												author$project$Vega$vField(
												author$project$Vega$field('id'))
											])),
										author$project$Vega$maStroke(
										_List_fromArray(
											[author$project$Vega$white])),
										author$project$Vega$maSize(
										_List_fromArray(
											[
												author$project$Vega$vNum(600)
											])),
										author$project$Vega$maX(
										_List_fromArray(
											[
												author$project$Vega$vField(
												author$project$Vega$field('x'))
											])),
										author$project$Vega$maY(
										_List_fromArray(
											[
												author$project$Vega$vField(
												author$project$Vega$field('y'))
											]))
									]))
							]))
					]))),
		A2(
			author$project$Vega$mark,
			author$project$Vega$text,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('tree'))
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
											author$project$Vega$field('id'))
										])),
									author$project$Vega$maStroke(
									_List_fromArray(
										[author$project$Vega$white])),
									author$project$Vega$maFill(
									_List_fromArray(
										[author$project$Vega$white])),
									author$project$Vega$maAlign(
									_List_fromArray(
										[author$project$Vega$hCenter])),
									author$project$Vega$maBaseline(
									_List_fromArray(
										[author$project$Vega$vMiddle])),
									author$project$Vega$maFontWeight(
									_List_fromArray(
										[
											author$project$Vega$vStr('normal')
										])),
									author$project$Vega$maFontSize(
									_List_fromArray(
										[
											author$project$Vega$vNum(16)
										]))
								])),
							author$project$Vega$enUpdate(
							_List_fromArray(
								[
									author$project$Vega$maX(
									_List_fromArray(
										[
											author$project$Vega$vField(
											author$project$Vega$field('x'))
										])),
									author$project$Vega$maY(
									_List_fromArray(
										[
											author$project$Vega$vField(
											author$project$Vega$field('y'))
										]))
								]))
						]))
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A2(
						author$project$Vega$trNest,
						_List_fromArray(
							[
								author$project$Vega$field('job'),
								author$project$Vega$field('region')
							]),
						author$project$Vega$booSignal('generate')),
						author$project$Vega$trTree(
						_List_fromArray(
							[
								author$project$Vega$teMethod(author$project$Vega$meTidy),
								author$project$Vega$teSize(
								author$project$Vega$numSignals(
									_List_fromArray(
										['width', 'height'])))
							]))
					]),
				table(_List_Nil)),
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						author$project$Vega$trTreeLinks,
						author$project$Vega$trLinkPath(_List_Nil)
					]),
				A2(
					author$project$Vega$data,
					'links',
					_List_fromArray(
						[
							author$project$Vega$daSource('tree')
						])))
			]));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				author$project$Vega$width(300),
				author$project$Vega$height(100),
				author$project$Vega$padding(5),
				ds,
				si(_List_Nil),
				sc(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$PaField = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$paField = author$project$Vega$PaField;
var author$project$Vega$PaPadding = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$paPadding = author$project$Vega$PaPadding;
var author$project$Vega$PaSize = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$paSize = function (n) {
	return author$project$Vega$PaSize(n);
};
var author$project$Vega$TPack = function (a) {
	return {$: 33, a: a};
};
var author$project$Vega$trPack = author$project$Vega$TPack;
var author$project$Vega$TStratify = F2(
	function (a, b) {
		return {$: 45, a: a, b: b};
	});
var author$project$Vega$trStratify = author$project$Vega$TStratify;
var author$project$TransformTests$packTest1 = function () {
	var table = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				A2(author$project$Vega$dataFromColumns, 'tree', _List_Nil),
				A2(
					author$project$Vega$dataColumn,
					'id',
					author$project$Vega$vStrs(
						_List_fromArray(
							['A', 'B', 'C', 'D', 'E'])))),
			A2(
				author$project$Vega$dataColumn,
				'parent',
				author$project$Vega$vStrs(
					_List_fromArray(
						['', 'A', 'A', 'C', 'C'])))),
		A2(
			author$project$Vega$dataColumn,
			'value',
			author$project$Vega$vNums(
				_List_fromArray(
					[0, 1, 0, 1, 1]))));
	var si = A2(
		elm$core$Basics$composeL,
		author$project$Vega$signals,
		A2(
			author$project$Vega$signal,
			'padding between circles',
			_List_fromArray(
				[
					author$project$Vega$siValue(
					author$project$Vega$vNum(0)),
					author$project$Vega$siBind(
					author$project$Vega$iRange(
						_List_fromArray(
							[
								author$project$Vega$inMin(0),
								author$project$Vega$inMax(10),
								author$project$Vega$inStep(0.1)
							])))
				])));
	var sc = A2(
		elm$core$Basics$composeL,
		author$project$Vega$scales,
		A2(
			author$project$Vega$scale,
			'cScale',
			_List_fromArray(
				[
					author$project$Vega$scType(author$project$Vega$scOrdinal),
					author$project$Vega$scRange(
					A2(
						author$project$Vega$raScheme,
						author$project$Vega$str('category20'),
						_List_Nil))
				])));
	var mk = A2(
		elm$core$Basics$composeL,
		author$project$Vega$marks,
		A2(
			author$project$Vega$mark,
			author$project$Vega$symbol,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('tree'))
						])),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enEnter(
							_List_fromArray(
								[
									author$project$Vega$maFill(
									_List_fromArray(
										[
											author$project$Vega$vScale('cScale'),
											author$project$Vega$vField(
											author$project$Vega$field('id'))
										])),
									author$project$Vega$maStroke(
									_List_fromArray(
										[author$project$Vega$white]))
								])),
							author$project$Vega$enUpdate(
							_List_fromArray(
								[
									author$project$Vega$maX(
									_List_fromArray(
										[
											author$project$Vega$vField(
											author$project$Vega$field('x'))
										])),
									author$project$Vega$maY(
									_List_fromArray(
										[
											author$project$Vega$vField(
											author$project$Vega$field('y'))
										])),
									author$project$Vega$maSize(
									_List_fromArray(
										[
											author$project$Vega$vSignal('4*datum.r*datum.r')
										]))
								]))
						]))
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A2(
						author$project$Vega$trStratify,
						author$project$Vega$field('id'),
						author$project$Vega$field('parent')),
						author$project$Vega$trPack(
						_List_fromArray(
							[
								author$project$Vega$paField(
								author$project$Vega$field('value')),
								author$project$Vega$paPadding(
								author$project$Vega$numSignal('padding between circles')),
								author$project$Vega$paSize(
								author$project$Vega$numSignals(
									_List_fromArray(
										['width', 'height'])))
							]))
					]),
				table(_List_Nil))
			]));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				author$project$Vega$width(300),
				author$project$Vega$height(200),
				author$project$Vega$padding(5),
				ds,
				si(_List_Nil),
				sc(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$FSignal = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$fSignal = author$project$Vega$FSignal;
var author$project$Vega$MWidth = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$maWidth = author$project$Vega$MWidth;
var author$project$Vega$on = F2(
	function (triggerSpecs, dTable) {
		return _Utils_ap(
			dTable,
			_List_fromArray(
				[
					_Utils_Tuple2(
					'on',
					A2(elm$json$Json$Encode$list, elm$core$Basics$identity, triggerSpecs))
				]));
	});
var author$project$Vega$OrderSignal = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$orderSignal = author$project$Vega$OrderSignal;
var author$project$Vega$Rect = 6;
var author$project$Vega$rect = 6;
var author$project$Vega$ScBand = {$: 8};
var author$project$Vega$scBand = author$project$Vega$ScBand;
var author$project$Vega$StackOffsetSignal = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$stSignal = author$project$Vega$StackOffsetSignal;
var author$project$Vega$StSort = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$stSort = author$project$Vega$StSort;
var author$project$Vega$TgInsert = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$tgInsert = author$project$Vega$TgInsert;
var author$project$Vega$TgRemove = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$tgRemove = author$project$Vega$TgRemove;
var author$project$Vega$VBand = function (a) {
	return {$: 15, a: a};
};
var author$project$Vega$vBand = author$project$Vega$VBand;
var author$project$Vega$VObject = function (a) {
	return {$: 6, a: a};
};
var author$project$Vega$vObject = author$project$Vega$VObject;
var author$project$Vega$VOffset = function (a) {
	return {$: 18, a: a};
};
var author$project$Vega$vOffset = author$project$Vega$VOffset;
var author$project$TransformTests$stackTest1 = function () {
	var table = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(author$project$Vega$dataFromColumns, 'table', _List_Nil),
			A2(
				author$project$Vega$dataColumn,
				'key',
				author$project$Vega$vStrs(
					_List_fromArray(
						['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c', 'c'])))),
		A2(
			author$project$Vega$dataColumn,
			'value',
			author$project$Vega$vNums(
				_List_fromArray(
					[5, 8, 3, 2, 7, 4, 1, 4, 6]))));
	var si = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				A2(
					elm$core$Basics$composeL,
					A2(
						elm$core$Basics$composeL,
						author$project$Vega$signals,
						A2(
							author$project$Vega$signal,
							'offset',
							_List_fromArray(
								[
									author$project$Vega$siValue(
									author$project$Vega$vStr('zero')),
									author$project$Vega$siBind(
									author$project$Vega$iSelect(
										_List_fromArray(
											[
												author$project$Vega$inOptions(
												author$project$Vega$vStrs(
													_List_fromArray(
														['zero', 'center', 'normalize'])))
											])))
								]))),
					A2(
						author$project$Vega$signal,
						'sortField',
						_List_fromArray(
							[
								author$project$Vega$siValue(author$project$Vega$vNull),
								author$project$Vega$siBind(
								author$project$Vega$iRadio(
									_List_fromArray(
										[
											author$project$Vega$inOptions(
											author$project$Vega$vStrs(
												_List_fromArray(
													['null', 'value'])))
										])))
							]))),
				A2(
					author$project$Vega$signal,
					'sortOrder',
					_List_fromArray(
						[
							author$project$Vega$siValue(
							author$project$Vega$vStr('ascending')),
							author$project$Vega$siBind(
							author$project$Vega$iRadio(
								_List_fromArray(
									[
										author$project$Vega$inOptions(
										author$project$Vega$vStrs(
											_List_fromArray(
												['ascending', 'descending'])))
									])))
						]))),
			A2(
				author$project$Vega$signal,
				'add',
				_List_fromArray(
					[
						author$project$Vega$siValue(
						author$project$Vega$vObject(_List_Nil)),
						author$project$Vega$siOn(
						_List_fromArray(
							[
								A2(
								author$project$Vega$evHandler,
								_List_fromArray(
									[
										author$project$Vega$esObject(
										_List_fromArray(
											[
												author$project$Vega$esType(author$project$Vega$etMouseDown),
												author$project$Vega$esConsume(author$project$Vega$true),
												author$project$Vega$esFilter(
												_List_fromArray(
													['!event.shiftKey']))
											]))
									]),
								_List_fromArray(
									[
										author$project$Vega$evUpdate('{key: invert(\'xScale\', x()), value: ~~(1 + 9 * random())}')
									]))
							]))
					]))),
		A2(
			author$project$Vega$signal,
			'rem',
			_List_fromArray(
				[
					author$project$Vega$siValue(
					author$project$Vega$vObject(_List_Nil)),
					author$project$Vega$siOn(
					_List_fromArray(
						[
							A2(
							author$project$Vega$evHandler,
							_List_fromArray(
								[
									author$project$Vega$esObject(
									_List_fromArray(
										[
											author$project$Vega$esMark(author$project$Vega$rect),
											author$project$Vega$esType(author$project$Vega$etMouseDown),
											author$project$Vega$esConsume(author$project$Vega$true),
											author$project$Vega$esFilter(
											_List_fromArray(
												['event.shiftKey']))
										]))
								]),
							_List_fromArray(
								[
									author$project$Vega$evUpdate('datum')
								]))
						]))
				])));
	var sc = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				author$project$Vega$scales,
				A2(
					author$project$Vega$scale,
					'xScale',
					_List_fromArray(
						[
							author$project$Vega$scType(author$project$Vega$scBand),
							author$project$Vega$scDomain(
							author$project$Vega$doStrs(
								author$project$Vega$strs(
									_List_fromArray(
										['a', 'b', 'c'])))),
							author$project$Vega$scRange(author$project$Vega$raWidth)
						]))),
			A2(
				author$project$Vega$scale,
				'yScale',
				_List_fromArray(
					[
						author$project$Vega$scType(author$project$Vega$scLinear),
						author$project$Vega$scDomain(
						author$project$Vega$doData(
							_List_fromArray(
								[
									author$project$Vega$daDataset('table'),
									author$project$Vega$daField(
									author$project$Vega$field('y1'))
								]))),
						author$project$Vega$scRange(author$project$Vega$raHeight),
						author$project$Vega$scRound(author$project$Vega$true)
					]))),
		A2(
			author$project$Vega$scale,
			'cScale',
			_List_fromArray(
				[
					author$project$Vega$scType(author$project$Vega$scOrdinal),
					author$project$Vega$scRange(
					A2(
						author$project$Vega$raScheme,
						author$project$Vega$str('category10'),
						_List_Nil))
				])));
	var mk = A2(
		elm$core$Basics$composeL,
		author$project$Vega$marks,
		A2(
			author$project$Vega$mark,
			author$project$Vega$rect,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('table'))
						])),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enEnter(
							_List_fromArray(
								[
									author$project$Vega$maFill(
									_List_fromArray(
										[
											author$project$Vega$vScale('cScale'),
											author$project$Vega$vField(
											author$project$Vega$field('key'))
										])),
									author$project$Vega$maStroke(
									_List_fromArray(
										[author$project$Vega$white])),
									author$project$Vega$maStrokeWidth(
									_List_fromArray(
										[
											author$project$Vega$vNum(1)
										])),
									author$project$Vega$maX(
									_List_fromArray(
										[
											author$project$Vega$vScale('xScale'),
											author$project$Vega$vField(
											author$project$Vega$field('key')),
											author$project$Vega$vOffset(
											author$project$Vega$vNum(0.5))
										])),
									author$project$Vega$maWidth(
									_List_fromArray(
										[
											author$project$Vega$vScale('xScale'),
											author$project$Vega$vBand(
											author$project$Vega$num(1))
										]))
								])),
							author$project$Vega$enUpdate(
							_List_fromArray(
								[
									author$project$Vega$maY(
									_List_fromArray(
										[
											author$project$Vega$vScale('yScale'),
											author$project$Vega$vField(
											author$project$Vega$field('y0')),
											author$project$Vega$vOffset(
											author$project$Vega$vNum(0.5))
										])),
									author$project$Vega$maY2(
									_List_fromArray(
										[
											author$project$Vega$vScale('yScale'),
											author$project$Vega$vField(
											author$project$Vega$field('y1')),
											author$project$Vega$vOffset(
											author$project$Vega$vNum(0.5))
										]))
								]))
						]))
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$on,
				_List_fromArray(
					[
						A2(
						author$project$Vega$trigger,
						'add',
						_List_fromArray(
							[
								author$project$Vega$tgInsert('add')
							])),
						A2(
						author$project$Vega$trigger,
						'rem',
						_List_fromArray(
							[
								author$project$Vega$tgRemove('rem')
							]))
					]),
				A2(
					author$project$Vega$transform,
					_List_fromArray(
						[
							author$project$Vega$trStack(
							_List_fromArray(
								[
									author$project$Vega$stField(
									author$project$Vega$field('value')),
									author$project$Vega$stGroupBy(
									_List_fromArray(
										[
											author$project$Vega$field('key')
										])),
									author$project$Vega$stOffset(
									author$project$Vega$stSignal('offset')),
									author$project$Vega$stSort(
									_List_fromArray(
										[
											_Utils_Tuple2(
											author$project$Vega$fSignal('sortField'),
											author$project$Vega$orderSignal('sortOrder'))
										]))
								]))
						]),
					table(_List_Nil)))
			]));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				author$project$Vega$width(300),
				author$project$Vega$height(200),
				author$project$Vega$autosize(
				_List_fromArray(
					[author$project$Vega$asNone])),
				ds,
				si(_List_Nil),
				sc(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$TreeMethodSignal = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$meSignal = author$project$Vega$TreeMethodSignal;
var author$project$Vega$TeSeparation = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$teSeparation = author$project$Vega$TeSeparation;
var author$project$TransformTests$treeTest1 = function () {
	var table = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(author$project$Vega$dataFromColumns, 'tree', _List_Nil),
			A2(
				author$project$Vega$dataColumn,
				'id',
				author$project$Vega$vStrs(
					_List_fromArray(
						['A', 'B', 'C', 'D', 'E'])))),
		A2(
			author$project$Vega$dataColumn,
			'parent',
			author$project$Vega$vStrs(
				_List_fromArray(
					['', 'A', 'A', 'C', 'C']))));
	var si = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$Vega$signals,
			A2(
				author$project$Vega$signal,
				'method',
				_List_fromArray(
					[
						author$project$Vega$siValue(
						author$project$Vega$vStr('tidy')),
						author$project$Vega$siBind(
						author$project$Vega$iSelect(
							_List_fromArray(
								[
									author$project$Vega$inOptions(
									author$project$Vega$vStrs(
										_List_fromArray(
											['tidy', 'cluster'])))
								])))
					]))),
		A2(
			author$project$Vega$signal,
			'separation',
			_List_fromArray(
				[
					author$project$Vega$siValue(author$project$Vega$vTrue),
					author$project$Vega$siBind(
					author$project$Vega$iCheckbox(_List_Nil))
				])));
	var sc = A2(
		elm$core$Basics$composeL,
		author$project$Vega$scales,
		A2(
			author$project$Vega$scale,
			'cScale',
			_List_fromArray(
				[
					author$project$Vega$scType(author$project$Vega$scOrdinal),
					author$project$Vega$scRange(
					A2(
						author$project$Vega$raScheme,
						author$project$Vega$str('category20'),
						_List_Nil))
				])));
	var mk = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$Vega$marks,
			A2(
				author$project$Vega$mark,
				author$project$Vega$path,
				_List_fromArray(
					[
						author$project$Vega$mFrom(
						_List_fromArray(
							[
								author$project$Vega$srData(
								author$project$Vega$str('links'))
							])),
						author$project$Vega$mEncode(
						_List_fromArray(
							[
								author$project$Vega$enEnter(
								_List_fromArray(
									[
										author$project$Vega$maStroke(
										_List_fromArray(
											[
												author$project$Vega$vStr('#ccc')
											]))
									])),
								author$project$Vega$enUpdate(
								_List_fromArray(
									[
										author$project$Vega$maPath(
										_List_fromArray(
											[
												author$project$Vega$vField(
												author$project$Vega$field('path'))
											]))
									]))
							]))
					]))),
		A2(
			author$project$Vega$mark,
			author$project$Vega$symbol,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('tree'))
						])),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enEnter(
							_List_fromArray(
								[
									author$project$Vega$maFill(
									_List_fromArray(
										[
											author$project$Vega$vScale('cScale'),
											author$project$Vega$vField(
											author$project$Vega$field('id'))
										])),
									author$project$Vega$maStroke(
									_List_fromArray(
										[author$project$Vega$white])),
									author$project$Vega$maSize(
									_List_fromArray(
										[
											author$project$Vega$vNum(400)
										]))
								])),
							author$project$Vega$enUpdate(
							_List_fromArray(
								[
									author$project$Vega$maX(
									_List_fromArray(
										[
											author$project$Vega$vField(
											author$project$Vega$field('x'))
										])),
									author$project$Vega$maY(
									_List_fromArray(
										[
											author$project$Vega$vField(
											author$project$Vega$field('y'))
										]))
								]))
						]))
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A2(
						author$project$Vega$trStratify,
						author$project$Vega$field('id'),
						author$project$Vega$field('parent')),
						author$project$Vega$trTree(
						_List_fromArray(
							[
								author$project$Vega$teMethod(
								author$project$Vega$meSignal('method')),
								author$project$Vega$teSeparation(
								author$project$Vega$booSignal('separation')),
								author$project$Vega$teSize(
								author$project$Vega$numSignals(
									_List_fromArray(
										['width', 'height'])))
							]))
					]),
				table(_List_Nil)),
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						author$project$Vega$trTreeLinks,
						author$project$Vega$trLinkPath(_List_Nil)
					]),
				A2(
					author$project$Vega$data,
					'links',
					_List_fromArray(
						[
							author$project$Vega$daSource('tree')
						])))
			]));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				author$project$Vega$width(200),
				author$project$Vega$height(100),
				author$project$Vega$padding(5),
				ds,
				si(_List_Nil),
				sc(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$PrScale = function (a) {
	return {$: 3, a: a};
};
var author$project$Vega$prScale = author$project$Vega$PrScale;
var author$project$Vega$PrTranslate = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$prTranslate = author$project$Vega$PrTranslate;
var author$project$Vega$PrType = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$prType = author$project$Vega$PrType;
var author$project$Vega$NumList = function (a) {
	return {$: 4, a: a};
};
var author$project$Vega$projectionLabel = function (pr) {
	switch (pr.$) {
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
			return 'conicEqualArea';
		case 6:
			return 'conicEquidistant';
		case 7:
			return 'equalEarth';
		case 8:
			return 'equirectangular';
		case 9:
			return 'gnomonic';
		case 10:
			return 'identity';
		case 11:
			return 'mercator';
		case 12:
			return 'naturalEarth1';
		case 13:
			return 'orthographic';
		case 14:
			return 'stereographic';
		case 15:
			return 'transverseMercator';
		case 16:
			var s = pr.a;
			return '';
		default:
			var sig = pr.a;
			return '';
	}
};
var author$project$Vega$projectionSpec = function (proj) {
	switch (proj.$) {
		case 16:
			var s = proj.a;
			return author$project$Vega$strSpec(s);
		case 17:
			var sig = proj.a;
			return elm$json$Json$Encode$object(
				_List_fromArray(
					[
						author$project$Vega$signalReferenceProperty(sig)
					]));
		default:
			return elm$json$Json$Encode$string(
				author$project$Vega$projectionLabel(proj));
	}
};
var author$project$Vega$projectionProperty = function (projProp) {
	switch (projProp.$) {
		case 0:
			var pType = projProp.a;
			return _Utils_Tuple2(
				'type',
				author$project$Vega$projectionSpec(pType));
		case 1:
			var nm = projProp.a;
			if (!nm.$) {
				var n = nm.a;
				return (!n) ? _Utils_Tuple2('clipAngle', elm$json$Json$Encode$null) : _Utils_Tuple2(
					'clipAngle',
					elm$json$Json$Encode$float(n));
			} else {
				return _Utils_Tuple2(
					'clipAngle',
					author$project$Vega$numSpec(nm));
			}
		case 2:
			var n = projProp.a;
			_n2$3:
			while (true) {
				switch (n.$) {
					case 1:
						if ((((n.a.b && n.a.b.b) && n.a.b.b.b) && n.a.b.b.b.b) && (!n.a.b.b.b.b.b)) {
							var _n3 = n.a;
							var x0 = _n3.a;
							var _n4 = _n3.b;
							var y0 = _n4.a;
							var _n5 = _n4.b;
							var x1 = _n5.a;
							var _n6 = _n5.b;
							var y1 = _n6.a;
							return _Utils_Tuple2(
								'clipExtent',
								A2(
									elm$json$Json$Encode$list,
									elm$json$Json$Encode$list(elm$json$Json$Encode$float),
									_List_fromArray(
										[
											_List_fromArray(
											[x0, y0]),
											_List_fromArray(
											[x1, y1])
										])));
						} else {
							break _n2$3;
						}
					case 2:
						var sig = n.a;
						return _Utils_Tuple2(
							'clipExtent',
							author$project$Vega$numSpec(
								author$project$Vega$NumSignal(sig)));
					case 3:
						if ((((n.a.b && n.a.b.b) && n.a.b.b.b) && n.a.b.b.b.b) && (!n.a.b.b.b.b.b)) {
							var _n7 = n.a;
							var sigX0 = _n7.a;
							var _n8 = _n7.b;
							var sigY0 = _n8.a;
							var _n9 = _n8.b;
							var sigX1 = _n9.a;
							var _n10 = _n9.b;
							var sigY1 = _n10.a;
							return _Utils_Tuple2(
								'clipExtent',
								A2(
									elm$json$Json$Encode$list,
									author$project$Vega$numSpec,
									_List_fromArray(
										[
											author$project$Vega$NumSignals(
											_List_fromArray(
												[sigX0, sigY0])),
											author$project$Vega$NumSignals(
											_List_fromArray(
												[sigX1, sigY1]))
										])));
						} else {
							break _n2$3;
						}
					default:
						break _n2$3;
				}
			}
			return _Utils_Tuple2('clipExtent', elm$json$Json$Encode$null);
		case 3:
			var n = projProp.a;
			return _Utils_Tuple2(
				'scale',
				author$project$Vega$numSpec(n));
		case 4:
			var n = projProp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'translate', n);
		case 5:
			var n = projProp.a;
			return _Utils_Tuple2(
				'center',
				author$project$Vega$numSpec(n));
		case 6:
			var n = projProp.a;
			_n11$7:
			while (true) {
				switch (n.$) {
					case 1:
						if (n.a.b && n.a.b.b) {
							if (!n.a.b.b.b) {
								var _n12 = n.a;
								var lambda = _n12.a;
								var _n13 = _n12.b;
								var phi = _n13.a;
								return _Utils_Tuple2(
									'rotate',
									A2(
										elm$json$Json$Encode$list,
										elm$json$Json$Encode$float,
										_List_fromArray(
											[lambda, phi])));
							} else {
								if (!n.a.b.b.b.b) {
									var _n14 = n.a;
									var lambda = _n14.a;
									var _n15 = _n14.b;
									var phi = _n15.a;
									var _n16 = _n15.b;
									var gamma = _n16.a;
									return _Utils_Tuple2(
										'rotate',
										A2(
											elm$json$Json$Encode$list,
											elm$json$Json$Encode$float,
											_List_fromArray(
												[lambda, phi, gamma])));
								} else {
									break _n11$7;
								}
							}
						} else {
							break _n11$7;
						}
					case 2:
						var sig = n.a;
						return _Utils_Tuple2(
							'rotate',
							author$project$Vega$numSpec(
								author$project$Vega$NumSignal(sig)));
					case 3:
						if (n.a.b && n.a.b.b) {
							if (!n.a.b.b.b) {
								var _n17 = n.a;
								var sigLambda = _n17.a;
								var _n18 = _n17.b;
								var sigPhi = _n18.a;
								return _Utils_Tuple2(
									'rotate',
									author$project$Vega$numSpec(
										author$project$Vega$NumSignals(
											_List_fromArray(
												[sigLambda, sigPhi]))));
							} else {
								if (!n.a.b.b.b.b) {
									var _n19 = n.a;
									var sigLambda = _n19.a;
									var _n20 = _n19.b;
									var sigPhi = _n20.a;
									var _n21 = _n20.b;
									var sigGamma = _n21.a;
									return _Utils_Tuple2(
										'rotate',
										author$project$Vega$numSpec(
											author$project$Vega$NumSignals(
												_List_fromArray(
													[sigLambda, sigPhi, sigGamma]))));
								} else {
									break _n11$7;
								}
							}
						} else {
							break _n11$7;
						}
					case 4:
						if (n.a.b && n.a.b.b) {
							if (!n.a.b.b.b) {
								var _n22 = n.a;
								var numLambda = _n22.a;
								var _n23 = _n22.b;
								var numPhi = _n23.a;
								return _Utils_Tuple2(
									'rotate',
									author$project$Vega$numSpec(
										author$project$Vega$NumList(
											_List_fromArray(
												[numLambda, numPhi]))));
							} else {
								if (!n.a.b.b.b.b) {
									var _n24 = n.a;
									var numLambda = _n24.a;
									var _n25 = _n24.b;
									var numPhi = _n25.a;
									var _n26 = _n25.b;
									var numGamma = _n26.a;
									return _Utils_Tuple2(
										'rotate',
										author$project$Vega$numSpec(
											author$project$Vega$NumList(
												_List_fromArray(
													[numLambda, numPhi, numGamma]))));
								} else {
									break _n11$7;
								}
							}
						} else {
							break _n11$7;
						}
					default:
						break _n11$7;
				}
			}
			return _Utils_Tuple2('rotate', elm$json$Json$Encode$null);
		case 7:
			var n = projProp.a;
			return _Utils_Tuple2(
				'pointRadius',
				author$project$Vega$numSpec(n));
		case 8:
			var n = projProp.a;
			return _Utils_Tuple2(
				'precision',
				author$project$Vega$numSpec(n));
		case 9:
			var feat = projProp.a;
			if (feat.$ === 1) {
				var s = feat.a;
				return _Utils_Tuple2(
					'fit',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'signal',
								elm$json$Json$Encode$string('data(\'' + (s + '\')')))
							])));
			} else {
				var s = feat.a;
				return _Utils_Tuple2(
					'fit',
					elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'signal',
								elm$json$Json$Encode$string(s))
							])));
			}
		case 10:
			var n = projProp.a;
			_n28$3:
			while (true) {
				switch (n.$) {
					case 1:
						if ((((n.a.b && n.a.b.b) && n.a.b.b.b) && n.a.b.b.b.b) && (!n.a.b.b.b.b.b)) {
							var _n29 = n.a;
							var x0 = _n29.a;
							var _n30 = _n29.b;
							var y0 = _n30.a;
							var _n31 = _n30.b;
							var x1 = _n31.a;
							var _n32 = _n31.b;
							var y1 = _n32.a;
							return _Utils_Tuple2(
								'extent',
								A2(
									elm$json$Json$Encode$list,
									elm$json$Json$Encode$list(elm$json$Json$Encode$float),
									_List_fromArray(
										[
											_List_fromArray(
											[x0, y0]),
											_List_fromArray(
											[x1, y1])
										])));
						} else {
							break _n28$3;
						}
					case 2:
						var sig = n.a;
						return _Utils_Tuple2(
							'extent',
							author$project$Vega$numSpec(
								author$project$Vega$NumSignal(sig)));
					case 3:
						if ((((n.a.b && n.a.b.b) && n.a.b.b.b) && n.a.b.b.b.b) && (!n.a.b.b.b.b.b)) {
							var _n33 = n.a;
							var sigX0 = _n33.a;
							var _n34 = _n33.b;
							var sigY0 = _n34.a;
							var _n35 = _n34.b;
							var sigX1 = _n35.a;
							var _n36 = _n35.b;
							var sigY1 = _n36.a;
							return _Utils_Tuple2(
								'extent',
								A2(
									elm$json$Json$Encode$list,
									author$project$Vega$numSpec,
									_List_fromArray(
										[
											author$project$Vega$NumSignals(
											_List_fromArray(
												[sigX0, sigY0])),
											author$project$Vega$NumSignals(
											_List_fromArray(
												[sigX1, sigY1]))
										])));
						} else {
							break _n28$3;
						}
					default:
						break _n28$3;
				}
			}
			return _Utils_Tuple2('extent', elm$json$Json$Encode$null);
		case 11:
			var n = projProp.a;
			return A3(author$project$Vega$numArrayProperty, 2, 'size', n);
		case 12:
			var n = projProp.a;
			return _Utils_Tuple2(
				'coefficient',
				author$project$Vega$numSpec(n));
		case 13:
			var n = projProp.a;
			return _Utils_Tuple2(
				'distance',
				author$project$Vega$numSpec(n));
		case 14:
			var n = projProp.a;
			return _Utils_Tuple2(
				'fraction',
				author$project$Vega$numSpec(n));
		case 15:
			var n = projProp.a;
			return _Utils_Tuple2(
				'lobes',
				author$project$Vega$numSpec(n));
		case 16:
			var n = projProp.a;
			return _Utils_Tuple2(
				'parallel',
				author$project$Vega$numSpec(n));
		case 17:
			var n = projProp.a;
			return _Utils_Tuple2(
				'radius',
				author$project$Vega$numSpec(n));
		case 18:
			var n = projProp.a;
			return _Utils_Tuple2(
				'ratio',
				author$project$Vega$numSpec(n));
		case 19:
			var n = projProp.a;
			return _Utils_Tuple2(
				'spacing',
				author$project$Vega$numSpec(n));
		case 20:
			var n = projProp.a;
			return _Utils_Tuple2(
				'tilt',
				author$project$Vega$numSpec(n));
		case 21:
			var b = projProp.a;
			return _Utils_Tuple2(
				'reflectX',
				author$project$Vega$booSpec(b));
		default:
			var b = projProp.a;
			return _Utils_Tuple2(
				'reflectY',
				author$project$Vega$booSpec(b));
	}
};
var author$project$Vega$projection = F2(
	function (name, pps) {
		return elm$core$List$cons(
			elm$json$Json$Encode$object(
				A2(
					elm$core$List$cons,
					_Utils_Tuple2(
						'name',
						elm$json$Json$Encode$string(name)),
					A2(elm$core$List$map, author$project$Vega$projectionProperty, pps))));
	});
var author$project$Vega$VProjections = 10;
var author$project$Vega$projections = function (prs) {
	return _Utils_Tuple2(
		10,
		A2(elm$json$Json$Encode$list, elm$core$Basics$identity, prs));
};
var author$project$Vega$TransverseMercator = {$: 15};
var author$project$Vega$transverseMercator = author$project$Vega$TransverseMercator;
var author$project$TransformTests$pr = A2(
	elm$core$Basics$composeL,
	author$project$Vega$projections,
	A2(
		author$project$Vega$projection,
		'projection',
		_List_fromArray(
			[
				author$project$Vega$prType(author$project$Vega$transverseMercator),
				author$project$Vega$prScale(
				author$project$Vega$num(3700)),
				author$project$Vega$prTranslate(
				author$project$Vega$nums(
					_List_fromArray(
						[320, 3855])))
			])));
var author$project$Vega$ClPath = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$clPath = author$project$Vega$ClPath;
var author$project$Vega$CSV = {$: 2};
var author$project$Vega$csv = author$project$Vega$CSV;
var author$project$Vega$MClip = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$mClip = author$project$Vega$MClip;
var author$project$Vega$ParseAuto = {$: 11};
var author$project$Vega$parseAuto = author$project$Vega$ParseAuto;
var author$project$Vega$TopojsonFeature = function (a) {
	return {$: 6, a: a};
};
var author$project$Vega$topojsonFeature = author$project$Vega$TopojsonFeature;
var author$project$Vega$TGeoPoint = F3(
	function (a, b, c) {
		return {$: 21, a: a, b: b, c: c};
	});
var author$project$Vega$trGeoPoint = author$project$Vega$TGeoPoint;
var author$project$Vega$TVoronoi = F3(
	function (a, b, c) {
		return {$: 49, a: a, b: b, c: c};
	});
var author$project$Vega$trVoronoi = author$project$Vega$TVoronoi;
var author$project$Vega$VoAs = function (a) {
	return {$: 2, a: a};
};
var author$project$Vega$voAs = author$project$Vega$VoAs;
var author$project$Vega$VoSize = function (a) {
	return {$: 1, a: a};
};
var author$project$Vega$voSize = author$project$Vega$VoSize;
var author$project$TransformTests$voronoiTest1 = function () {
	var mk = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				author$project$Vega$marks,
				A2(
					author$project$Vega$mark,
					author$project$Vega$path,
					_List_fromArray(
						[
							author$project$Vega$mFrom(
							_List_fromArray(
								[
									author$project$Vega$srData(
									author$project$Vega$str('centroids'))
								])),
							author$project$Vega$mClip(
							author$project$Vega$clPath(
								author$project$Vega$strSignal('data(\'hull\')[0][\'path\']'))),
							author$project$Vega$mEncode(
							_List_fromArray(
								[
									author$project$Vega$enEnter(
									_List_fromArray(
										[
											author$project$Vega$maFill(
											_List_fromArray(
												[author$project$Vega$transparent])),
											author$project$Vega$maStroke(
											_List_fromArray(
												[author$project$Vega$black])),
											author$project$Vega$maStrokeWidth(
											_List_fromArray(
												[
													author$project$Vega$vNum(0.2)
												])),
											author$project$Vega$maPath(
											_List_fromArray(
												[
													author$project$Vega$vField(
													author$project$Vega$field('voronoi'))
												]))
										]))
								]))
						]))),
			A2(
				author$project$Vega$mark,
				author$project$Vega$path,
				_List_fromArray(
					[
						author$project$Vega$mFrom(
						_List_fromArray(
							[
								author$project$Vega$srData(
								author$project$Vega$str('hull'))
							])),
						author$project$Vega$mEncode(
						_List_fromArray(
							[
								author$project$Vega$enEnter(
								_List_fromArray(
									[
										author$project$Vega$maFill(
										_List_fromArray(
											[author$project$Vega$transparent])),
										author$project$Vega$maStroke(
										_List_fromArray(
											[author$project$Vega$black])),
										author$project$Vega$maStrokeWidth(
										_List_fromArray(
											[
												author$project$Vega$vNum(0.2)
											])),
										author$project$Vega$maPath(
										_List_fromArray(
											[
												author$project$Vega$vField(
												author$project$Vega$field('path'))
											]))
									]))
							]))
					]))),
		A2(
			author$project$Vega$mark,
			author$project$Vega$symbol,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('centroids'))
						])),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enEnter(
							_List_fromArray(
								[
									author$project$Vega$maSize(
									_List_fromArray(
										[
											author$project$Vega$vNum(2)
										])),
									author$project$Vega$maX(
									_List_fromArray(
										[
											author$project$Vega$vField(
											author$project$Vega$field('x'))
										])),
									author$project$Vega$maY(
									_List_fromArray(
										[
											author$project$Vega$vField(
											author$project$Vega$field('y'))
										]))
								]))
						]))
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A2(author$project$Vega$trGeoPath, 'projection', _List_Nil)
					]),
				A2(
					author$project$Vega$data,
					'hull',
					_List_fromArray(
						[
							author$project$Vega$daUrl(
							author$project$Vega$str('https://gicentre.github.io/data/uk/ukConvexHull.json')),
							author$project$Vega$daFormat(
							_List_fromArray(
								[
									author$project$Vega$topojsonFeature(
									author$project$Vega$str('convexHull'))
								]))
						]))),
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A3(
						author$project$Vega$trGeoPoint,
						'projection',
						author$project$Vega$field('longitude'),
						author$project$Vega$field('latitude')),
						A3(
						author$project$Vega$trVoronoi,
						author$project$Vega$field('x'),
						author$project$Vega$field('y'),
						_List_fromArray(
							[
								author$project$Vega$voSize(
								author$project$Vega$numSignals(
									_List_fromArray(
										['width', 'height']))),
								author$project$Vega$voAs('voronoi')
							]))
					]),
				A2(
					author$project$Vega$data,
					'centroids',
					_List_fromArray(
						[
							author$project$Vega$daUrl(
							author$project$Vega$str('https://gicentre.github.io/data/uk/constituencyCentroids.csv')),
							author$project$Vega$daFormat(
							_List_fromArray(
								[author$project$Vega$csv, author$project$Vega$parseAuto]))
						])))
			]));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				author$project$Vega$width(420),
				author$project$Vega$height(670),
				author$project$Vega$padding(5),
				ds,
				author$project$TransformTests$pr(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$DoNums = function (a) {
	return {$: 0, a: a};
};
var author$project$Vega$doNums = author$project$Vega$DoNums;
var author$project$Vega$RaSignal = function (a) {
	return {$: 15, a: a};
};
var author$project$Vega$raSignal = author$project$Vega$RaSignal;
var author$project$TransformTests$voronoiTest2 = function () {
	var si = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				A2(
					elm$core$Basics$composeL,
					author$project$Vega$signals,
					A2(
						author$project$Vega$signal,
						'centroidFile',
						_List_fromArray(
							[
								author$project$Vega$siValue(
								author$project$Vega$vStr('https://gicentre.github.io/data/uk/constituencyCentroidsWithSpacers.csv')),
								author$project$Vega$siBind(
								author$project$Vega$iSelect(
									_List_fromArray(
										[
											author$project$Vega$inOptions(
											author$project$Vega$vStrs(
												_List_fromArray(
													['https://gicentre.github.io/data/uk/constituencyCentroidsWithSpacers.csv', 'https://gicentre.github.io/data/uk/constituencySpacedCentroidsWithSpacers.csv'])))
										])))
							]))),
				A2(
					author$project$Vega$signal,
					'showRegions',
					_List_fromArray(
						[
							author$project$Vega$siValue(author$project$Vega$vTrue),
							author$project$Vega$siBind(
							author$project$Vega$iCheckbox(_List_Nil))
						]))),
			A2(
				author$project$Vega$signal,
				'showVoronoi',
				_List_fromArray(
					[
						author$project$Vega$siBind(
						author$project$Vega$iCheckbox(_List_Nil))
					]))),
		A2(
			author$project$Vega$signal,
			'colors',
			_List_fromArray(
				[
					author$project$Vega$siValue(
					author$project$Vega$vStrs(
						_List_fromArray(
							['white', 'rgb(225,174,218)', 'rgb(136,136,136)', 'rgb(161,200,136)', 'rgb(181,156,149)', 'rgb(240,180,122)', 'rgb(185,165,215)', 'rgb(195,149,148)', 'rgb(215,131,130)', 'rgb(167,216,227)', 'rgb(215,217,135)', 'rgb(146,173,210)', 'rgb(180,160,120)'])))
				])));
	var sc = A2(
		elm$core$Basics$composeL,
		author$project$Vega$scales,
		A2(
			author$project$Vega$scale,
			'cScale',
			_List_fromArray(
				[
					author$project$Vega$scType(author$project$Vega$scOrdinal),
					author$project$Vega$scDomain(
					author$project$Vega$doNums(
						author$project$Vega$nums(
							_List_fromArray(
								[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])))),
					author$project$Vega$scRange(
					author$project$Vega$raSignal('colors'))
				])));
	var mk = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			author$project$Vega$marks,
			A2(
				author$project$Vega$mark,
				author$project$Vega$path,
				_List_fromArray(
					[
						author$project$Vega$mFrom(
						_List_fromArray(
							[
								author$project$Vega$srData(
								author$project$Vega$str('regions'))
							])),
						author$project$Vega$mEncode(
						_List_fromArray(
							[
								author$project$Vega$enEnter(
								_List_fromArray(
									[
										author$project$Vega$maStroke(
										_List_fromArray(
											[
												author$project$Vega$vStr('#eee')
											])),
										author$project$Vega$maStrokeWidth(
										_List_fromArray(
											[
												author$project$Vega$vNum(0.2)
											]))
									])),
								author$project$Vega$enUpdate(
								_List_fromArray(
									[
										author$project$Vega$maPath(
										_List_fromArray(
											[
												author$project$Vega$vField(
												author$project$Vega$field('path'))
											])),
										author$project$Vega$maFill(
										_List_fromArray(
											[
												A3(
												author$project$Vega$ifElse,
												'!showRegions',
												_List_fromArray(
													[
														author$project$Vega$vStr('#eee')
													]),
												_List_fromArray(
													[
														A3(
														author$project$Vega$ifElse,
														'datum.region == 0',
														_List_fromArray(
															[author$project$Vega$transparent]),
														_List_fromArray(
															[
																author$project$Vega$vScale('cScale'),
																author$project$Vega$vField(
																author$project$Vega$field('id'))
															]))
													]))
											]))
									]))
							]))
					]))),
		A2(
			author$project$Vega$mark,
			author$project$Vega$path,
			_List_fromArray(
				[
					author$project$Vega$mFrom(
					_List_fromArray(
						[
							author$project$Vega$srData(
							author$project$Vega$str('centroids'))
						])),
					author$project$Vega$mClip(
					author$project$Vega$clPath(
						author$project$Vega$strSignal('data(\'hull\')[0][\'path\']'))),
					author$project$Vega$mEncode(
					_List_fromArray(
						[
							author$project$Vega$enEnter(
							_List_fromArray(
								[
									author$project$Vega$maStrokeWidth(
									_List_fromArray(
										[
											author$project$Vega$vNum(0.2)
										])),
									author$project$Vega$maPath(
									_List_fromArray(
										[
											author$project$Vega$vField(
											author$project$Vega$field('voronoi'))
										]))
								])),
							author$project$Vega$enUpdate(
							_List_fromArray(
								[
									author$project$Vega$maFill(
									_List_fromArray(
										[
											A3(
											author$project$Vega$ifElse,
											'!showVoronoi || datum.region == 0',
											_List_fromArray(
												[author$project$Vega$transparent]),
											_List_fromArray(
												[
													author$project$Vega$vScale('cScale'),
													author$project$Vega$vField(
													author$project$Vega$field('region'))
												]))
										])),
									author$project$Vega$maStroke(
									_List_fromArray(
										[
											A3(
											author$project$Vega$ifElse,
											'!showVoronoi || datum.region == 0',
											_List_fromArray(
												[author$project$Vega$transparent]),
											_List_fromArray(
												[
													author$project$Vega$vStr('white')
												]))
										]))
								]))
						]))
				])));
	var ds = author$project$Vega$dataSource(
		_List_fromArray(
			[
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A2(author$project$Vega$trGeoPath, 'projection', _List_Nil)
					]),
				A2(
					author$project$Vega$data,
					'regions',
					_List_fromArray(
						[
							author$project$Vega$daUrl(
							author$project$Vega$str('https://gicentre.github.io/data/uk/ukConstituencies.json')),
							author$project$Vega$daFormat(
							_List_fromArray(
								[
									author$project$Vega$topojsonFeature(
									author$project$Vega$str('constituencies'))
								]))
						]))),
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A2(author$project$Vega$trGeoPath, 'projection', _List_Nil)
					]),
				A2(
					author$project$Vega$data,
					'hull',
					_List_fromArray(
						[
							author$project$Vega$daUrl(
							author$project$Vega$str('https://gicentre.github.io/data/uk/ukConvexHull.json')),
							author$project$Vega$daFormat(
							_List_fromArray(
								[
									author$project$Vega$topojsonFeature(
									author$project$Vega$str('convexHull'))
								]))
						]))),
				A2(
				author$project$Vega$transform,
				_List_fromArray(
					[
						A3(
						author$project$Vega$trGeoPoint,
						'projection',
						author$project$Vega$field('longitude'),
						author$project$Vega$field('latitude')),
						A3(
						author$project$Vega$trVoronoi,
						author$project$Vega$field('x'),
						author$project$Vega$field('y'),
						_List_fromArray(
							[
								author$project$Vega$voSize(
								author$project$Vega$numSignals(
									_List_fromArray(
										['width', 'height']))),
								author$project$Vega$voAs('voronoi')
							]))
					]),
				A2(
					author$project$Vega$data,
					'centroids',
					_List_fromArray(
						[
							author$project$Vega$daUrl(
							author$project$Vega$strSignal('centroidFile')),
							author$project$Vega$daFormat(
							_List_fromArray(
								[author$project$Vega$csv, author$project$Vega$parseAuto]))
						])))
			]));
	return author$project$Vega$toVega(
		_List_fromArray(
			[
				author$project$Vega$width(420),
				author$project$Vega$height(670),
				author$project$Vega$padding(5),
				ds,
				si(_List_Nil),
				author$project$TransformTests$pr(_List_Nil),
				sc(_List_Nil),
				mk(_List_Nil)
			]));
}();
var author$project$Vega$combineSpecs = function (specs) {
	return elm$json$Json$Encode$object(specs);
};
var author$project$TransformTests$mySpecs = author$project$Vega$combineSpecs(
	_List_fromArray(
		[
			_Utils_Tuple2('packTest1', author$project$TransformTests$packTest1),
			_Utils_Tuple2('stackTest1', author$project$TransformTests$stackTest1),
			_Utils_Tuple2('forceTest1', author$project$TransformTests$forceTest1),
			_Utils_Tuple2('nestTest1', author$project$TransformTests$nestTest1),
			_Utils_Tuple2('treeTest1', author$project$TransformTests$treeTest1),
			_Utils_Tuple2('voronoiTest1', author$project$TransformTests$voronoiTest1),
			_Utils_Tuple2('voronoiTest2', author$project$TransformTests$voronoiTest2),
			_Utils_Tuple2('contourTest1', author$project$TransformTests$contourTest1),
			_Utils_Tuple2('densityTest1', author$project$TransformTests$densityTest1),
			_Utils_Tuple2('kdeTest1', author$project$TransformTests$kdeTest1),
			_Utils_Tuple2('kdeTest2', author$project$TransformTests$kdeTest2)
		]));
var author$project$TransformTests$sourceExample = author$project$TransformTests$kdeTest2;
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$pre = _VirtualDom_node('pre');
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var author$project$TransformTests$view = function (spec) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('specSource')
					]),
				_List_Nil),
				A2(
				elm$html$Html$pre,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text(
						A2(elm$json$Json$Encode$encode, 2, author$project$TransformTests$sourceExample))
					]))
			]));
};
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {S: fragment, T: host, X: path, Z: port_, ab: protocol, ac: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$element = _Browser_element;
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var author$project$TransformTests$main = elm$browser$Browser$element(
	{
		as: elm$core$Basics$always(
			_Utils_Tuple2(
				author$project$TransformTests$mySpecs,
				author$project$TransformTests$elmToJS(author$project$TransformTests$mySpecs))),
		ay: elm$core$Basics$always(elm$core$Platform$Sub$none),
		aA: F2(
			function (_n0, model) {
				return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
			}),
		aC: author$project$TransformTests$view
	});
_Platform_export({'TransformTests':{'init':author$project$TransformTests$main(
	elm$json$Json$Decode$succeed(0))(0)}});}(this));
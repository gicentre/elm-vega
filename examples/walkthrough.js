
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
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


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
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


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

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

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

var _gicentre$eve$Eve$viewConfig = function (viewCfg) {
	var _p0 = viewCfg;
	switch (_p0.ctor) {
		case 'VWidth':
			return {
				ctor: '_Tuple2',
				_0: 'width',
				_1: _elm_lang$core$Json_Encode$float(_p0._0)
			};
		case 'VHeight':
			return {
				ctor: '_Tuple2',
				_0: 'height',
				_1: _elm_lang$core$Json_Encode$float(_p0._0)
			};
		case 'Clip':
			return {
				ctor: '_Tuple2',
				_0: 'clip',
				_1: _elm_lang$core$Json_Encode$bool(_p0._0)
			};
		case 'Fill':
			var _p1 = _p0._0;
			if (_p1.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'fill',
					_1: _elm_lang$core$Json_Encode$string(_p1._0)
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'fill',
					_1: _elm_lang$core$Json_Encode$string('')
				};
			}
		case 'FillOpacity':
			var _p2 = _p0._0;
			if (_p2.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'fillOpacity',
					_1: _elm_lang$core$Json_Encode$float(_p2._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'fillOpacity', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'Stroke':
			var _p3 = _p0._0;
			if (_p3.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'stroke',
					_1: _elm_lang$core$Json_Encode$string(_p3._0)
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'stroke',
					_1: _elm_lang$core$Json_Encode$string('')
				};
			}
		case 'StrokeOpacity':
			var _p4 = _p0._0;
			if (_p4.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'strokeOpacity',
					_1: _elm_lang$core$Json_Encode$float(_p4._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'strokeOpacity', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'StrokeWidth':
			var _p5 = _p0._0;
			if (_p5.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'strokeWidth',
					_1: _elm_lang$core$Json_Encode$float(_p5._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'strokeWidth', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'StrokeDash':
			var _p6 = _p0._0;
			if (_p6.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'strokeDash',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p6._0))
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'strokeDash',
					_1: _elm_lang$core$Json_Encode$list(
						{ctor: '[]'})
				};
			}
		default:
			var _p7 = _p0._0;
			if (_p7.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'strokeDashOffset',
					_1: _elm_lang$core$Json_Encode$float(_p7._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'strokeDashOffset', _1: _elm_lang$core$Json_Encode$null};
			}
	}
};
var _gicentre$eve$Eve$vAlignLabel = function (align) {
	var _p8 = align;
	switch (_p8.ctor) {
		case 'AlignTop':
			return 'top';
		case 'AlignMiddle':
			return 'middle';
		default:
			return 'bottom';
	}
};
var _gicentre$eve$Eve$timeUnitLabel = function (tu) {
	var _p9 = tu;
	switch (_p9.ctor) {
		case 'Year':
			return 'year';
		case 'YearQuarter':
			return 'yearquarter';
		case 'YearQuarterMonth':
			return 'yearquartermonth';
		case 'YearMonth':
			return 'yearmonth';
		case 'YearMonthDate':
			return 'yearmonthdate';
		case 'YearMonthDateHours':
			return 'yearmonthdatehours';
		case 'YearMonthDateHoursMinutes':
			return 'yearmonthdatehoursminutes';
		case 'YearMonthDateHoursMinutesSeconds':
			return 'yearmonthdatehoursminutesseconds';
		case 'Quarter':
			return 'quarter';
		case 'QuarterMonth':
			return 'quartermonth';
		case 'Month':
			return 'month';
		case 'MonthDate':
			return 'monthdate';
		case 'Date':
			return 'date';
		case 'Day':
			return 'day';
		case 'Hours':
			return 'hours';
		case 'HoursMinutes':
			return 'hoursminutes';
		case 'HoursMinutesSeconds':
			return 'hoursminutesseconds';
		case 'Minutes':
			return 'minutes';
		case 'MinutesSeconds':
			return 'minutesseconds';
		case 'Seconds':
			return 'seconds';
		case 'SecondsMilliseconds':
			return 'secondsmilliseconds';
		default:
			return 'milliseconds';
	}
};
var _gicentre$eve$Eve$stackProperty = function (sp) {
	var _p10 = sp;
	switch (_p10.ctor) {
		case 'StZero':
			return {
				ctor: '_Tuple2',
				_0: 'stack',
				_1: _elm_lang$core$Json_Encode$string('zero')
			};
		case 'StNormalize':
			return {
				ctor: '_Tuple2',
				_0: 'stack',
				_1: _elm_lang$core$Json_Encode$string('normalize')
			};
		case 'StCenter':
			return {
				ctor: '_Tuple2',
				_0: 'stack',
				_1: _elm_lang$core$Json_Encode$string('center')
			};
		default:
			return {ctor: '_Tuple2', _0: 'stack', _1: _elm_lang$core$Json_Encode$null};
	}
};
var _gicentre$eve$Eve$propertyLabel = function (spec) {
	var _p11 = spec;
	switch (_p11.ctor) {
		case 'Name':
			return 'name';
		case 'Description':
			return 'description';
		case 'Title':
			return 'title';
		case 'Width':
			return 'width';
		case 'Height':
			return 'height';
		case 'Data':
			return 'data';
		case 'Mark':
			return 'mark';
		case 'Transform':
			return 'transform';
		case 'Encoding':
			return 'encoding';
		case 'Config':
			return 'config';
		case 'Selection':
			return 'selection';
		case 'HConcat':
			return 'hconcat';
		case 'VConcat':
			return 'vconcat';
		case 'Layer':
			return 'layer';
		case 'Repeat':
			return 'repeat';
		case 'Facet':
			return 'facet';
		case 'Spec':
			return 'spec';
		default:
			return 'resolve';
	}
};
var _gicentre$eve$Eve$symbolLabel = function (sym) {
	var _p12 = sym;
	switch (_p12.ctor) {
		case 'SymCircle':
			return 'circle';
		case 'SymSquare':
			return 'square';
		case 'Cross':
			return 'cross';
		case 'Diamond':
			return 'diamond';
		case 'TriangleUp':
			return 'triangle-up';
		case 'TriangleDown':
			return 'triangle-down';
		default:
			return _p12._0;
	}
};
var _gicentre$eve$Eve$sideLabel = function (side) {
	var _p13 = side;
	switch (_p13.ctor) {
		case 'STop':
			return 'top';
		case 'SBottom':
			return 'bottom';
		case 'SLeft':
			return 'left';
		default:
			return 'right';
	}
};
var _gicentre$eve$Eve$selectionMarkProperty = function (markProp) {
	var _p14 = markProp;
	switch (_p14.ctor) {
		case 'SMFill':
			return {
				ctor: '_Tuple2',
				_0: 'fill',
				_1: _elm_lang$core$Json_Encode$string(_p14._0)
			};
		case 'SMFillOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'fillOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SMStroke':
			return {
				ctor: '_Tuple2',
				_0: 'stroke',
				_1: _elm_lang$core$Json_Encode$string(_p14._0)
			};
		case 'SMStrokeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'strokeOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SMStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
		case 'SMStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p14._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'strokeDashOffset',
				_1: _elm_lang$core$Json_Encode$float(_p14._0)
			};
	}
};
var _gicentre$eve$Eve$selectionLabel = function (seType) {
	var _p15 = seType;
	switch (_p15.ctor) {
		case 'Single':
			return 'single';
		case 'Multi':
			return 'multi';
		default:
			return 'interval';
	}
};
var _gicentre$eve$Eve$scheme = F2(
	function (name, extent) {
		var _p16 = extent;
		if (((_p16.ctor === '::') && (_p16._1.ctor === '::')) && (_p16._1._1.ctor === '[]')) {
			return {
				ctor: '_Tuple2',
				_0: 'scheme',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'name',
							_1: _elm_lang$core$Json_Encode$string(name)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'extent',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$float(_p16._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p16._1._0),
											_1: {ctor: '[]'}
										}
									})
							},
							_1: {ctor: '[]'}
						}
					})
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: 'scheme',
				_1: _elm_lang$core$Json_Encode$string(name)
			};
		}
	});
var _gicentre$eve$Eve$scaleLabel = function (scType) {
	var _p17 = scType;
	switch (_p17.ctor) {
		case 'ScLinear':
			return 'linear';
		case 'ScPow':
			return 'pow';
		case 'ScSqrt':
			return 'sqrt';
		case 'ScLog':
			return 'log';
		case 'ScTime':
			return 'time';
		case 'ScUtc':
			return 'utc';
		case 'ScSequential':
			return 'sequential';
		case 'ScOrdinal':
			return 'ordinal';
		case 'ScBand':
			return 'band';
		case 'ScPoint':
			return 'point';
		case 'ScBinLinear':
			return 'bin-linear';
		default:
			return 'bin-ordinal';
	}
};
var _gicentre$eve$Eve$scaleRangeProperty = function (srType) {
	var _p18 = srType;
	switch (_p18.ctor) {
		case 'RNumbers':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p18._0));
		case 'RStrings':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p18._0));
		default:
			return _elm_lang$core$Json_Encode$string(_p18._0);
	}
};
var _gicentre$eve$Eve$scaleConfig = function (scaleCfg) {
	var _p19 = scaleCfg;
	switch (_p19.ctor) {
		case 'SCBandPaddingInner':
			return {
				ctor: '_Tuple2',
				_0: 'bandPaddingInner',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCBandPaddingOuter':
			return {
				ctor: '_Tuple2',
				_0: 'bandPaddingOuter',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCClamp':
			return {
				ctor: '_Tuple2',
				_0: 'clamp',
				_1: _elm_lang$core$Json_Encode$bool(_p19._0)
			};
		case 'SCMaxBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'maxBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCMinBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'minBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCMaxFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'maxFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCMinFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'minFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCMaxOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'maxOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCMinOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'minOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCMaxSize':
			return {
				ctor: '_Tuple2',
				_0: 'maxSize',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCMinSize':
			return {
				ctor: '_Tuple2',
				_0: 'minSize',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCMaxStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'maxStrokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCMinStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'minStrokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCPointPadding':
			return {
				ctor: '_Tuple2',
				_0: 'pointPadding',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		case 'SCRangeStep':
			var _p20 = _p19._0;
			if (_p20.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'rangeStep',
					_1: _elm_lang$core$Json_Encode$float(_p20._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'rangeStep', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'SCRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _elm_lang$core$Json_Encode$bool(_p19._0)
			};
		case 'SCTextXRangeStep':
			return {
				ctor: '_Tuple2',
				_0: 'textXRangeStep',
				_1: _elm_lang$core$Json_Encode$float(_p19._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'useUnaggregatedDomain',
				_1: _elm_lang$core$Json_Encode$bool(_p19._0)
			};
	}
};
var _gicentre$eve$Eve$selectionResolutionLabel = function (res) {
	var _p21 = res;
	switch (_p21.ctor) {
		case 'Global':
			return 'global';
		case 'Union':
			return 'union';
		default:
			return 'intersect';
	}
};
var _gicentre$eve$Eve$resolutionLabel = function (res) {
	var _p22 = res;
	if (_p22.ctor === 'Shared') {
		return 'shared';
	} else {
		return 'independent';
	}
};
var _gicentre$eve$Eve$repeatFields = function (fields) {
	var _p23 = fields;
	if (_p23.ctor === 'RowFields') {
		return {
			ctor: '_Tuple2',
			_0: 'row',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p23._0))
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'column',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p23._0))
		};
	}
};
var _gicentre$eve$Eve$rangeConfig = function (rangeCfg) {
	var _p24 = rangeCfg;
	switch (_p24.ctor) {
		case 'RCategory':
			return {
				ctor: '_Tuple2',
				_0: 'category',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$eve$Eve$scheme,
							_p24._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
		case 'RDiverging':
			return {
				ctor: '_Tuple2',
				_0: 'diverging',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$eve$Eve$scheme,
							_p24._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
		case 'RHeatmap':
			return {
				ctor: '_Tuple2',
				_0: 'heatmap',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$eve$Eve$scheme,
							_p24._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
		case 'ROrdinal':
			return {
				ctor: '_Tuple2',
				_0: 'ordinal',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$eve$Eve$scheme,
							_p24._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
		case 'RRamp':
			return {
				ctor: '_Tuple2',
				_0: 'ramp',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$eve$Eve$scheme,
							_p24._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'symbol',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$eve$Eve$scheme,
							_p24._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
	}
};
var _gicentre$eve$Eve$positionLabel = function (pChannel) {
	var _p25 = pChannel;
	switch (_p25.ctor) {
		case 'X':
			return 'x';
		case 'Y':
			return 'y';
		case 'X2':
			return 'x2';
		default:
			return 'y2';
	}
};
var _gicentre$eve$Eve$overlapStrategyLabel = function (strat) {
	var _p26 = strat;
	switch (_p26.ctor) {
		case 'ONone':
			return 'false';
		case 'OParity':
			return 'parity';
		default:
			return 'greedy';
	}
};
var _gicentre$eve$Eve$opLabel = function (op) {
	var _p27 = op;
	switch (_p27.ctor) {
		case 'Count':
			return 'count';
		case 'Valid':
			return 'valid';
		case 'Missing':
			return 'missing';
		case 'Distinct':
			return 'distinct';
		case 'Sum':
			return 'sum';
		case 'Mean':
			return 'mean';
		case 'Average':
			return 'average';
		case 'Variance':
			return 'variance';
		case 'VarianceP':
			return 'variancep';
		case 'Stdev':
			return 'stdev';
		case 'StdevP':
			return 'stdevp';
		case 'Stderr':
			return 'stderr';
		case 'Median':
			return 'median';
		case 'Q1':
			return 'q1';
		case 'Q3':
			return 'q3';
		case 'CI0':
			return 'ci0';
		case 'CI1':
			return 'ci1';
		case 'Min':
			return 'min';
		default:
			return 'max';
	}
};
var _gicentre$eve$Eve$nice = function (ni) {
	var _p28 = ni;
	switch (_p28.ctor) {
		case 'NMillisecond':
			return _elm_lang$core$Json_Encode$string('millisecond');
		case 'NSecond':
			return _elm_lang$core$Json_Encode$string('second');
		case 'NMinute':
			return _elm_lang$core$Json_Encode$string('minute');
		case 'NHour':
			return _elm_lang$core$Json_Encode$string('hour');
		case 'NDay':
			return _elm_lang$core$Json_Encode$string('day');
		case 'NWeek':
			return _elm_lang$core$Json_Encode$string('week');
		case 'NMonth':
			return _elm_lang$core$Json_Encode$string('month');
		case 'NYear':
			return _elm_lang$core$Json_Encode$string('year');
		case 'NInterval':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'interval',
						_1: _elm_lang$core$Json_Encode$string(
							_gicentre$eve$Eve$timeUnitLabel(_p28._0))
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'step',
							_1: _elm_lang$core$Json_Encode$int(_p28._1)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'IsNice':
			return _elm_lang$core$Json_Encode$bool(_p28._0);
		default:
			return _elm_lang$core$Json_Encode$int(_p28._0);
	}
};
var _gicentre$eve$Eve$monthLabel = function (mon) {
	var _p29 = mon;
	switch (_p29.ctor) {
		case 'Jan':
			return 'Jan';
		case 'Feb':
			return 'Feb';
		case 'Mar':
			return 'Mar';
		case 'Apr':
			return 'Apr';
		case 'May':
			return 'May';
		case 'Jun':
			return 'Jun';
		case 'Jul':
			return 'Jul';
		case 'Aug':
			return 'Aug';
		case 'Sep':
			return 'Sep';
		case 'Oct':
			return 'Oct';
		case 'Nov':
			return 'Nov';
		default:
			return 'Dec';
	}
};
var _gicentre$eve$Eve$measurementLabel = function (mType) {
	var _p30 = mType;
	switch (_p30.ctor) {
		case 'Nominal':
			return 'nominal';
		case 'Ordinal':
			return 'ordinal';
		case 'Quantitative':
			return 'quantitative';
		default:
			return 'temporal';
	}
};
var _gicentre$eve$Eve$markOrientLabel = function (orient) {
	var _p31 = orient;
	if (_p31.ctor === 'Horizontal') {
		return 'horizontal';
	} else {
		return 'vertical';
	}
};
var _gicentre$eve$Eve$markLabel = function (mark) {
	var _p32 = mark;
	switch (_p32.ctor) {
		case 'Area':
			return 'area';
		case 'Bar':
			return 'bar';
		case 'Circle':
			return 'circle';
		case 'Line':
			return 'line';
		case 'Point':
			return 'point';
		case 'Rect':
			return 'rect';
		case 'Rule':
			return 'rule';
		case 'Square':
			return 'square';
		case 'Text':
			return 'text';
		default:
			return 'tick';
	}
};
var _gicentre$eve$Eve$markInterpolationLabel = function (interp) {
	var _p33 = interp;
	switch (_p33.ctor) {
		case 'Linear':
			return 'linear';
		case 'LinearClosed':
			return 'linear-closed';
		case 'Stepwise':
			return 'step';
		case 'StepBefore':
			return 'step-before';
		case 'StepAfter':
			return 'step-after';
		case 'Basis':
			return 'basis';
		case 'BasisOpen':
			return 'basis-open';
		case 'BasisClosed':
			return 'basis-closed';
		case 'Cardinal':
			return 'cardinal';
		case 'CardinalOpen':
			return 'cardinal-open';
		case 'CardinalClosed':
			return 'cardinal-closed';
		case 'Bundle':
			return 'bundle';
		default:
			return 'monotone';
	}
};
var _gicentre$eve$Eve$legendOrientLabel = function (orient) {
	var _p34 = orient;
	switch (_p34.ctor) {
		case 'Left':
			return 'left';
		case 'BottomLeft':
			return 'bottom-left';
		case 'BottomRight':
			return 'bottom-right';
		case 'Right':
			return 'right';
		case 'TopLeft':
			return 'top-left';
		case 'TopRight':
			return 'top-right';
		default:
			return 'none';
	}
};
var _gicentre$eve$Eve$interpolateProperty = function (iType) {
	var _p35 = iType;
	switch (_p35.ctor) {
		case 'Rgb':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('rgb')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'gamma',
							_1: _elm_lang$core$Json_Encode$float(_p35._0)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'Hsl':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('hsl')
					},
					_1: {ctor: '[]'}
				});
		case 'HslLong':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('hsl-long')
					},
					_1: {ctor: '[]'}
				});
		case 'Lab':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('lab')
					},
					_1: {ctor: '[]'}
				});
		case 'Hcl':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('hcl')
					},
					_1: {ctor: '[]'}
				});
		case 'HclLong':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('hcl-long')
					},
					_1: {ctor: '[]'}
				});
		case 'CubeHelix':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('cubehelix')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'gamma',
							_1: _elm_lang$core$Json_Encode$float(_p35._0)
						},
						_1: {ctor: '[]'}
					}
				});
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('cubehelix-long')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'gamma',
							_1: _elm_lang$core$Json_Encode$float(_p35._0)
						},
						_1: {ctor: '[]'}
					}
				});
	}
};
var _gicentre$eve$Eve$inputProperty = function (prop) {
	var _p36 = prop;
	switch (_p36.ctor) {
		case 'InMin':
			return {
				ctor: '_Tuple2',
				_0: 'min',
				_1: _elm_lang$core$Json_Encode$float(_p36._0)
			};
		case 'InMax':
			return {
				ctor: '_Tuple2',
				_0: 'max',
				_1: _elm_lang$core$Json_Encode$float(_p36._0)
			};
		case 'InStep':
			return {
				ctor: '_Tuple2',
				_0: 'step',
				_1: _elm_lang$core$Json_Encode$float(_p36._0)
			};
		case 'Debounce':
			return {
				ctor: '_Tuple2',
				_0: 'debounce',
				_1: _elm_lang$core$Json_Encode$float(_p36._0)
			};
		case 'InOptions':
			return {
				ctor: '_Tuple2',
				_0: 'options',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p36._0))
			};
		case 'InPlaceholder':
			return {
				ctor: '_Tuple2',
				_0: 'placeholder',
				_1: _elm_lang$core$Json_Encode$string(_p36._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'element',
				_1: _elm_lang$core$Json_Encode$string(_p36._0)
			};
	}
};
var _gicentre$eve$Eve$hAlignLabel = function (align) {
	var _p37 = align;
	switch (_p37.ctor) {
		case 'AlignLeft':
			return 'left';
		case 'AlignCenter':
			return 'center';
		default:
			return 'right';
	}
};
var _gicentre$eve$Eve$foDataType = function (dType) {
	var _p38 = dType;
	switch (_p38.ctor) {
		case 'FoNumber':
			return _elm_lang$core$Json_Encode$string('number');
		case 'FoBoolean':
			return _elm_lang$core$Json_Encode$string('boolean');
		case 'FoDate':
			var _p39 = _p38._0;
			return _elm_lang$core$Native_Utils.eq(_p39, '') ? _elm_lang$core$Json_Encode$string('date') : _elm_lang$core$Json_Encode$string(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'date:\'',
					A2(_elm_lang$core$Basics_ops['++'], _p39, '\'')));
		default:
			var _p40 = _p38._0;
			return _elm_lang$core$Native_Utils.eq(_p40, '') ? _elm_lang$core$Json_Encode$string('utc') : _elm_lang$core$Json_Encode$string(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'utc:\'',
					A2(_elm_lang$core$Basics_ops['++'], _p40, '\'')));
	}
};
var _gicentre$eve$Eve$format = function (fmt) {
	var _p41 = fmt;
	switch (_p41.ctor) {
		case 'JSON':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('json')
				},
				_1: {ctor: '[]'}
			};
		case 'CSV':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('csv')
				},
				_1: {ctor: '[]'}
			};
		case 'TSV':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('tsv')
				},
				_1: {ctor: '[]'}
			};
		case 'TopojsonFeature':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('json')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'feature',
						_1: _elm_lang$core$Json_Encode$string(_p41._0)
					},
					_1: {ctor: '[]'}
				}
			};
		case 'TopojsonMesh':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('json')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'mesh',
						_1: _elm_lang$core$Json_Encode$string(_p41._0)
					},
					_1: {ctor: '[]'}
				}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'parse',
					_1: _elm_lang$core$Json_Encode$object(
						A2(
							_elm_lang$core$List$map,
							function (_p42) {
								var _p43 = _p42;
								return {
									ctor: '_Tuple2',
									_0: _p43._0,
									_1: _gicentre$eve$Eve$foDataType(_p43._1)
								};
							},
							_p41._0))
				},
				_1: {ctor: '[]'}
			};
	}
};
var _gicentre$eve$Eve$fontWeight = function (w) {
	var _p44 = w;
	switch (_p44.ctor) {
		case 'Normal':
			return _elm_lang$core$Json_Encode$string('normal');
		case 'Bold':
			return _elm_lang$core$Json_Encode$string('bold');
		case 'Bolder':
			return _elm_lang$core$Json_Encode$string('bolder');
		case 'Lighter':
			return _elm_lang$core$Json_Encode$string('lighter');
		case 'W100':
			return _elm_lang$core$Json_Encode$float(100);
		case 'W200':
			return _elm_lang$core$Json_Encode$float(200);
		case 'W300':
			return _elm_lang$core$Json_Encode$float(300);
		case 'W400':
			return _elm_lang$core$Json_Encode$float(400);
		case 'W500':
			return _elm_lang$core$Json_Encode$float(500);
		case 'W600':
			return _elm_lang$core$Json_Encode$float(600);
		case 'W700':
			return _elm_lang$core$Json_Encode$float(700);
		case 'W800':
			return _elm_lang$core$Json_Encode$float(800);
		default:
			return _elm_lang$core$Json_Encode$float(900);
	}
};
var _gicentre$eve$Eve$markProperty = function (mProp) {
	var _p45 = mProp;
	switch (_p45.ctor) {
		case 'MFilled':
			return {
				ctor: '_Tuple2',
				_0: 'filled',
				_1: _elm_lang$core$Json_Encode$bool(_p45._0)
			};
		case 'MClip':
			return {
				ctor: '_Tuple2',
				_0: 'clip',
				_1: _elm_lang$core$Json_Encode$bool(_p45._0)
			};
		case 'MColor':
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _elm_lang$core$Json_Encode$string(_p45._0)
			};
		case 'MFill':
			return {
				ctor: '_Tuple2',
				_0: 'fill',
				_1: _elm_lang$core$Json_Encode$string(_p45._0)
			};
		case 'MStroke':
			return {
				ctor: '_Tuple2',
				_0: 'stroke',
				_1: _elm_lang$core$Json_Encode$string(_p45._0)
			};
		case 'MOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'opacity',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MFillOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'fillOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MStrokeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'strokeOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p45._0))
			};
		case 'MStrokeDashOffset':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDashOffset',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MStyle':
			return {
				ctor: '_Tuple2',
				_0: 'style',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p45._0))
			};
		case 'MInterpolate':
			return {
				ctor: '_Tuple2',
				_0: 'interpolate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$markInterpolationLabel(_p45._0))
			};
		case 'MTension':
			return {
				ctor: '_Tuple2',
				_0: 'tension',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$markOrientLabel(_p45._0))
			};
		case 'MShape':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$symbolLabel(_p45._0))
			};
		case 'MSize':
			return {
				ctor: '_Tuple2',
				_0: 'size',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MAngle':
			return {
				ctor: '_Tuple2',
				_0: 'angle',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MAlign':
			return {
				ctor: '_Tuple2',
				_0: 'align',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$hAlignLabel(_p45._0))
			};
		case 'MBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'baseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$vAlignLabel(_p45._0))
			};
		case 'MdX':
			return {
				ctor: '_Tuple2',
				_0: 'dx',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MdY':
			return {
				ctor: '_Tuple2',
				_0: 'dy',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MFont':
			return {
				ctor: '_Tuple2',
				_0: 'font',
				_1: _elm_lang$core$Json_Encode$string(_p45._0)
			};
		case 'MFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'fontSize',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MFontStyle':
			return {
				ctor: '_Tuple2',
				_0: 'fontStyle',
				_1: _elm_lang$core$Json_Encode$string(_p45._0)
			};
		case 'MFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'fontWeight',
				_1: _gicentre$eve$Eve$fontWeight(_p45._0)
			};
		case 'MRadius':
			return {
				ctor: '_Tuple2',
				_0: 'radius',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MText':
			return {
				ctor: '_Tuple2',
				_0: 'text',
				_1: _elm_lang$core$Json_Encode$string(_p45._0)
			};
		case 'MTheta':
			return {
				ctor: '_Tuple2',
				_0: 'theta',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MBinSpacing':
			return {
				ctor: '_Tuple2',
				_0: 'binSpacing',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MContinuousBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'continuousBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MDiscreteBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'discreteBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		case 'MShortTimeLabels':
			return {
				ctor: '_Tuple2',
				_0: 'shortTimeLabels',
				_1: _elm_lang$core$Json_Encode$bool(_p45._0)
			};
		case 'MBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'bandSize',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'thickness',
				_1: _elm_lang$core$Json_Encode$float(_p45._0)
			};
	}
};
var _gicentre$eve$Eve$headerProperty = function (hProp) {
	var _p46 = hProp;
	if (_p46.ctor === 'HFormat') {
		return {
			ctor: '_Tuple2',
			_0: 'format',
			_1: _elm_lang$core$Json_Encode$string(_p46._0)
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'title',
			_1: _elm_lang$core$Json_Encode$string(_p46._0)
		};
	}
};
var _gicentre$eve$Eve$fieldTitleLabel = function (ftp) {
	var _p47 = ftp;
	switch (_p47.ctor) {
		case 'Verbal':
			return 'verbal';
		case 'Function':
			return 'function';
		default:
			return 'plain';
	}
};
var _gicentre$eve$Eve$dayLabel = function (day) {
	var _p48 = day;
	switch (_p48.ctor) {
		case 'Mon':
			return 'Mon';
		case 'Tue':
			return 'Tue';
		case 'Wed':
			return 'Wed';
		case 'Thu':
			return 'Thu';
		case 'Fri':
			return 'Fri';
		case 'Sat':
			return 'Sat';
		default:
			return 'Sun';
	}
};
var _gicentre$eve$Eve$dateTimeProperty = function (dt) {
	var _p49 = dt;
	switch (_p49.ctor) {
		case 'DTYear':
			return {
				ctor: '_Tuple2',
				_0: 'year',
				_1: _elm_lang$core$Json_Encode$int(_p49._0)
			};
		case 'DTQuarter':
			return {
				ctor: '_Tuple2',
				_0: 'quarter',
				_1: _elm_lang$core$Json_Encode$int(_p49._0)
			};
		case 'DTMonth':
			return {
				ctor: '_Tuple2',
				_0: 'month',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$monthLabel(_p49._0))
			};
		case 'DTDate':
			return {
				ctor: '_Tuple2',
				_0: 'date',
				_1: _elm_lang$core$Json_Encode$int(_p49._0)
			};
		case 'DTDay':
			return {
				ctor: '_Tuple2',
				_0: 'day',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$dayLabel(_p49._0))
			};
		case 'DTHours':
			return {
				ctor: '_Tuple2',
				_0: 'hours',
				_1: _elm_lang$core$Json_Encode$int(_p49._0)
			};
		case 'DTMinutes':
			return {
				ctor: '_Tuple2',
				_0: 'minutes',
				_1: _elm_lang$core$Json_Encode$int(_p49._0)
			};
		case 'DTSeconds':
			return {
				ctor: '_Tuple2',
				_0: 'seconds',
				_1: _elm_lang$core$Json_Encode$int(_p49._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'milliseconds',
				_1: _elm_lang$core$Json_Encode$int(_p49._0)
			};
	}
};
var _gicentre$eve$Eve$datavalue = function (val) {
	var _p50 = val;
	switch (_p50.ctor) {
		case 'Number':
			return _elm_lang$core$Json_Encode$float(_p50._0);
		case 'Str':
			return _elm_lang$core$Json_Encode$string(_p50._0);
		case 'Boolean':
			return _elm_lang$core$Json_Encode$bool(_p50._0);
		default:
			return _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$eve$Eve$dateTimeProperty, _p50._0));
	}
};
var _gicentre$eve$Eve$legendProperty = function (legendProp) {
	var _p51 = legendProp;
	switch (_p51.ctor) {
		case 'LType':
			var _p52 = _p51._0;
			if (_p52.ctor === 'Gradient') {
				return {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('gradient')
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('symbol')
				};
			}
		case 'LEntryPadding':
			return {
				ctor: '_Tuple2',
				_0: 'entryPadding',
				_1: _elm_lang$core$Json_Encode$float(_p51._0)
			};
		case 'LFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$string(_p51._0)
			};
		case 'LOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p51._0)
			};
		case 'LOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$legendOrientLabel(_p51._0))
			};
		case 'LPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _elm_lang$core$Json_Encode$float(_p51._0)
			};
		case 'LTickCount':
			return {
				ctor: '_Tuple2',
				_0: 'tickCount',
				_1: _elm_lang$core$Json_Encode$float(_p51._0)
			};
		case 'LTitle':
			var _p53 = _p51._0;
			return _elm_lang$core$Native_Utils.eq(_p53, '') ? {ctor: '_Tuple2', _0: 'title', _1: _elm_lang$core$Json_Encode$null} : {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$string(_p53)
			};
		case 'LValues':
			var _p56 = _p51._0;
			var list = function () {
				var _p54 = _p56;
				switch (_p54.ctor) {
					case 'Numbers':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p54._0));
					case 'DateTimes':
						return _elm_lang$core$Json_Encode$list(
							A2(
								_elm_lang$core$List$map,
								function (dt) {
									return _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$eve$Eve$dateTimeProperty, dt));
								},
								_p54._0));
					case 'Strings':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p54._0));
					default:
						var _p55 = A2(_elm_lang$core$Debug$log, 'Cannot create legend values with a list of Booleans ', _p56);
						return _elm_lang$core$Json_Encode$null;
				}
			}();
			return {ctor: '_Tuple2', _0: 'values', _1: list};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _elm_lang$core$Json_Encode$int(_p51._0)
			};
	}
};
var _gicentre$eve$Eve$scaleDomainProperty = function (sdType) {
	var _p57 = sdType;
	switch (_p57.ctor) {
		case 'DNumbers':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p57._0));
		case 'DDateTimes':
			return _elm_lang$core$Json_Encode$list(
				A2(
					_elm_lang$core$List$map,
					function (dt) {
						return _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$eve$Eve$dateTimeProperty, dt));
					},
					_p57._0));
		case 'DStrings':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p57._0));
		case 'DSelection':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'selection',
						_1: _elm_lang$core$Json_Encode$string(_p57._0)
					},
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$string('unaggregated');
	}
};
var _gicentre$eve$Eve$scaleProperty = function (scaleProp) {
	var _p58 = scaleProp;
	switch (_p58.ctor) {
		case 'SType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$scaleLabel(_p58._0))
			};
		case 'SDomain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _gicentre$eve$Eve$scaleDomainProperty(_p58._0)
			};
		case 'SRange':
			var _p59 = _p58._0;
			switch (_p59.ctor) {
				case 'RNumbers':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p59._0))
					};
				case 'RStrings':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p59._0))
					};
				default:
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string(_p59._0)
					};
			}
		case 'SScheme':
			return A2(_gicentre$eve$Eve$scheme, _p58._0, _p58._1);
		case 'SPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _elm_lang$core$Json_Encode$float(_p58._0)
			};
		case 'SPaddingInner':
			return {
				ctor: '_Tuple2',
				_0: 'paddingInner',
				_1: _elm_lang$core$Json_Encode$float(_p58._0)
			};
		case 'SPaddingOuter':
			return {
				ctor: '_Tuple2',
				_0: 'paddingOuter',
				_1: _elm_lang$core$Json_Encode$float(_p58._0)
			};
		case 'SRangeStep':
			var _p60 = _p58._0;
			if (_p60.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'rangeStep',
					_1: _elm_lang$core$Json_Encode$float(_p60._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'rangeStep', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'SRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _elm_lang$core$Json_Encode$bool(_p58._0)
			};
		case 'SClamp':
			return {
				ctor: '_Tuple2',
				_0: 'clamp',
				_1: _elm_lang$core$Json_Encode$bool(_p58._0)
			};
		case 'SInterpolate':
			return {
				ctor: '_Tuple2',
				_0: 'interpolate',
				_1: _gicentre$eve$Eve$interpolateProperty(_p58._0)
			};
		case 'SNice':
			return {
				ctor: '_Tuple2',
				_0: 'nice',
				_1: _gicentre$eve$Eve$nice(_p58._0)
			};
		case 'SZero':
			return {
				ctor: '_Tuple2',
				_0: 'zero',
				_1: _elm_lang$core$Json_Encode$bool(_p58._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'reverse',
				_1: _elm_lang$core$Json_Encode$bool(_p58._0)
			};
	}
};
var _gicentre$eve$Eve$channelLabel = function (ch) {
	var _p61 = ch;
	switch (_p61.ctor) {
		case 'ChX':
			return 'x';
		case 'ChY':
			return 'y';
		case 'ChX2':
			return 'x2';
		case 'ChY2':
			return 'y2';
		case 'ChColor':
			return 'color';
		case 'ChOpacity':
			return 'opacity';
		case 'ChShape':
			return 'shape';
		default:
			return 'size';
	}
};
var _gicentre$eve$Eve$resolveProperty = function (res) {
	var _p62 = res;
	switch (_p62.ctor) {
		case 'RAxis':
			return {
				ctor: '_Tuple2',
				_0: 'axis',
				_1: _elm_lang$core$Json_Encode$object(
					A2(
						_elm_lang$core$List$map,
						function (_p63) {
							var _p64 = _p63;
							return {
								ctor: '_Tuple2',
								_0: _gicentre$eve$Eve$channelLabel(_p64._0),
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$eve$Eve$resolutionLabel(_p64._1))
							};
						},
						_p62._0))
			};
		case 'RLegend':
			return {
				ctor: '_Tuple2',
				_0: 'legend',
				_1: _elm_lang$core$Json_Encode$object(
					A2(
						_elm_lang$core$List$map,
						function (_p65) {
							var _p66 = _p65;
							return {
								ctor: '_Tuple2',
								_0: _gicentre$eve$Eve$channelLabel(_p66._0),
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$eve$Eve$resolutionLabel(_p66._1))
							};
						},
						_p62._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$object(
					A2(
						_elm_lang$core$List$map,
						function (_p67) {
							var _p68 = _p67;
							return {
								ctor: '_Tuple2',
								_0: _gicentre$eve$Eve$channelLabel(_p68._0),
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$eve$Eve$resolutionLabel(_p68._1))
							};
						},
						_p62._0))
			};
	}
};
var _gicentre$eve$Eve$binding = function (bnd) {
	var _p69 = bnd;
	switch (_p69.ctor) {
		case 'IRange':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('range')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'ICheckbox':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('checkbox')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'IRadio':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('radio')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'ISelect':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('select')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'IText':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('text')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'INumber':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('number')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'IDate':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('date')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'ITime':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('time')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'IMonth':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('month')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'IWeek':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('week')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'IDateTimeLocal':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('datetimelocal')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		case 'ITel':
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('tel')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: _p69._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('color')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$inputProperty, _p69._1)
					})
			};
	}
};
var _gicentre$eve$Eve$selectionProperty = function (selProp) {
	var _p70 = selProp;
	switch (_p70.ctor) {
		case 'Fields':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p70._0))
			};
		case 'Encodings':
			return {
				ctor: '_Tuple2',
				_0: 'encodings',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						function (_p71) {
							return _elm_lang$core$Json_Encode$string(
								_gicentre$eve$Eve$channelLabel(_p71));
						},
						_p70._0))
			};
		case 'On':
			return {
				ctor: '_Tuple2',
				_0: 'on',
				_1: _elm_lang$core$Json_Encode$string(_p70._0)
			};
		case 'Empty':
			return {
				ctor: '_Tuple2',
				_0: 'empty',
				_1: _elm_lang$core$Json_Encode$string('none')
			};
		case 'ResolveSelections':
			return {
				ctor: '_Tuple2',
				_0: 'resolve',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$selectionResolutionLabel(_p70._0))
			};
		case 'SelectionMark':
			return {
				ctor: '_Tuple2',
				_0: 'mark',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$selectionMarkProperty, _p70._0))
			};
		case 'BindScales':
			return {
				ctor: '_Tuple2',
				_0: 'bind',
				_1: _elm_lang$core$Json_Encode$string('scales')
			};
		case 'Bind':
			return {
				ctor: '_Tuple2',
				_0: 'bind',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$binding, _p70._0))
			};
		case 'Nearest':
			return {
				ctor: '_Tuple2',
				_0: 'nearest',
				_1: _elm_lang$core$Json_Encode$bool(_p70._0)
			};
		case 'Toggle':
			return {
				ctor: '_Tuple2',
				_0: 'toggle',
				_1: _elm_lang$core$Json_Encode$string(_p70._0)
			};
		case 'Translate':
			var _p72 = _p70._0;
			return _elm_lang$core$Native_Utils.eq(_p72, '') ? {
				ctor: '_Tuple2',
				_0: 'translate',
				_1: _elm_lang$core$Json_Encode$bool(false)
			} : {
				ctor: '_Tuple2',
				_0: 'translate',
				_1: _elm_lang$core$Json_Encode$string(_p72)
			};
		default:
			var _p73 = _p70._0;
			return _elm_lang$core$Native_Utils.eq(_p73, '') ? {
				ctor: '_Tuple2',
				_0: 'zoom',
				_1: _elm_lang$core$Json_Encode$bool(false)
			} : {
				ctor: '_Tuple2',
				_0: 'zoom',
				_1: _elm_lang$core$Json_Encode$string(_p73)
			};
	}
};
var _gicentre$eve$Eve$binProperty = function (binProp) {
	var _p74 = binProp;
	switch (_p74.ctor) {
		case 'MaxBins':
			return {
				ctor: '_Tuple2',
				_0: 'maxbins',
				_1: _elm_lang$core$Json_Encode$int(_p74._0)
			};
		case 'Base':
			return {
				ctor: '_Tuple2',
				_0: 'base',
				_1: _elm_lang$core$Json_Encode$float(_p74._0)
			};
		case 'Step':
			return {
				ctor: '_Tuple2',
				_0: 'step',
				_1: _elm_lang$core$Json_Encode$float(_p74._0)
			};
		case 'Steps':
			return {
				ctor: '_Tuple2',
				_0: 'steps',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p74._0))
			};
		case 'MinStep':
			return {
				ctor: '_Tuple2',
				_0: 'minstep',
				_1: _elm_lang$core$Json_Encode$float(_p74._0)
			};
		case 'Divide':
			return {
				ctor: '_Tuple2',
				_0: 'divide',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$float(_p74._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$float(_p74._1),
							_1: {ctor: '[]'}
						}
					})
			};
		case 'Extent':
			return {
				ctor: '_Tuple2',
				_0: 'extent',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$float(_p74._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$float(_p74._1),
							_1: {ctor: '[]'}
						}
					})
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'nice',
				_1: _elm_lang$core$Json_Encode$bool(_p74._0)
			};
	}
};
var _gicentre$eve$Eve$axisProperty = function (axisProp) {
	var _p75 = axisProp;
	switch (_p75.ctor) {
		case 'Format':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$string(_p75._0)
			};
		case 'Labels':
			return {
				ctor: '_Tuple2',
				_0: 'labels',
				_1: _elm_lang$core$Json_Encode$bool(_p75._0)
			};
		case 'LabelAngle':
			return {
				ctor: '_Tuple2',
				_0: 'labelAngle',
				_1: _elm_lang$core$Json_Encode$float(_p75._0)
			};
		case 'LabelOverlap':
			return {
				ctor: '_Tuple2',
				_0: 'labelOverlap',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$overlapStrategyLabel(_p75._0))
			};
		case 'LabelPadding':
			return {
				ctor: '_Tuple2',
				_0: 'labelPadding',
				_1: _elm_lang$core$Json_Encode$float(_p75._0)
			};
		case 'Domain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _elm_lang$core$Json_Encode$bool(_p75._0)
			};
		case 'Grid':
			return {
				ctor: '_Tuple2',
				_0: 'grid',
				_1: _elm_lang$core$Json_Encode$bool(_p75._0)
			};
		case 'MaxExtent':
			return {
				ctor: '_Tuple2',
				_0: 'maxExtent',
				_1: _elm_lang$core$Json_Encode$float(_p75._0)
			};
		case 'MinExtent':
			return {
				ctor: '_Tuple2',
				_0: 'minExtent',
				_1: _elm_lang$core$Json_Encode$float(_p75._0)
			};
		case 'Orient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$sideLabel(_p75._0))
			};
		case 'Offset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p75._0)
			};
		case 'Position':
			return {
				ctor: '_Tuple2',
				_0: 'position',
				_1: _elm_lang$core$Json_Encode$float(_p75._0)
			};
		case 'ZIndex':
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _elm_lang$core$Json_Encode$int(_p75._0)
			};
		case 'Ticks':
			return {
				ctor: '_Tuple2',
				_0: 'ticks',
				_1: _elm_lang$core$Json_Encode$bool(_p75._0)
			};
		case 'TickCount':
			return {
				ctor: '_Tuple2',
				_0: 'tickCount',
				_1: _elm_lang$core$Json_Encode$int(_p75._0)
			};
		case 'TickSize':
			return {
				ctor: '_Tuple2',
				_0: 'tickSize',
				_1: _elm_lang$core$Json_Encode$float(_p75._0)
			};
		case 'Values':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p75._0))
			};
		case 'AxTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$string(_p75._0)
			};
		case 'AxTitleAlign':
			return {
				ctor: '_Tuple2',
				_0: 'titleAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$hAlignLabel(_p75._0))
			};
		case 'AxTitleAngle':
			return {
				ctor: '_Tuple2',
				_0: 'titleAngle',
				_1: _elm_lang$core$Json_Encode$float(_p75._0)
			};
		case 'AxTitleMaxLength':
			return {
				ctor: '_Tuple2',
				_0: 'titleMaxLength',
				_1: _elm_lang$core$Json_Encode$float(_p75._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _elm_lang$core$Json_Encode$float(_p75._0)
			};
	}
};
var _gicentre$eve$Eve$axisConfig = function (axisCfg) {
	var _p76 = axisCfg;
	switch (_p76.ctor) {
		case 'BandPosition':
			return {
				ctor: '_Tuple2',
				_0: 'bandPosition',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'DomainColor':
			return {
				ctor: '_Tuple2',
				_0: 'domainColor',
				_1: _elm_lang$core$Json_Encode$string(_p76._0)
			};
		case 'DomainWidth':
			return {
				ctor: '_Tuple2',
				_0: 'domainWidth',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'GridColor':
			return {
				ctor: '_Tuple2',
				_0: 'gridColor',
				_1: _elm_lang$core$Json_Encode$string(_p76._0)
			};
		case 'GridDash':
			return {
				ctor: '_Tuple2',
				_0: 'gridDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p76._0))
			};
		case 'GridOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'gridOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'GridWidth':
			return {
				ctor: '_Tuple2',
				_0: 'gridWidth',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'LabelColor':
			return {
				ctor: '_Tuple2',
				_0: 'labelColor',
				_1: _elm_lang$core$Json_Encode$string(_p76._0)
			};
		case 'LabelFont':
			return {
				ctor: '_Tuple2',
				_0: 'labelFont',
				_1: _elm_lang$core$Json_Encode$string(_p76._0)
			};
		case 'LabelFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'LabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'labelLimit',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'ShortTimeLabels':
			return {
				ctor: '_Tuple2',
				_0: 'shortTimeLabels',
				_1: _elm_lang$core$Json_Encode$bool(_p76._0)
			};
		case 'TickColor':
			return {
				ctor: '_Tuple2',
				_0: 'tickColor',
				_1: _elm_lang$core$Json_Encode$string(_p76._0)
			};
		case 'TickRound':
			return {
				ctor: '_Tuple2',
				_0: 'tickRound',
				_1: _elm_lang$core$Json_Encode$bool(_p76._0)
			};
		case 'TickWidth':
			return {
				ctor: '_Tuple2',
				_0: 'tickWidth',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'TitleBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'titleBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$vAlignLabel(_p76._0))
			};
		case 'TitleColor':
			return {
				ctor: '_Tuple2',
				_0: 'titleColor',
				_1: _elm_lang$core$Json_Encode$string(_p76._0)
			};
		case 'TitleFont':
			return {
				ctor: '_Tuple2',
				_0: 'titleFont',
				_1: _elm_lang$core$Json_Encode$string(_p76._0)
			};
		case 'TitleFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontWeight',
				_1: _gicentre$eve$Eve$fontWeight(_p76._0)
			};
		case 'TitleFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'TitleLimit':
			return {
				ctor: '_Tuple2',
				_0: 'titleLimit',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		case 'TitleX':
			return {
				ctor: '_Tuple2',
				_0: 'titleX',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'titleY',
				_1: _elm_lang$core$Json_Encode$float(_p76._0)
			};
	}
};
var _gicentre$eve$Eve$autosizeConfig = function (asCfg) {
	var _p77 = asCfg;
	switch (_p77.ctor) {
		case 'APad':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string('pad')
			};
		case 'AFit':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string('fit')
			};
		case 'ANone':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string('none')
			};
		case 'AResize':
			return {
				ctor: '_Tuple2',
				_0: 'resize',
				_1: _elm_lang$core$Json_Encode$bool(_p77._0)
			};
		case 'AContent':
			return {
				ctor: '_Tuple2',
				_0: 'contains',
				_1: _elm_lang$core$Json_Encode$string('content')
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'contains',
				_1: _elm_lang$core$Json_Encode$string('padding')
			};
	}
};
var _gicentre$eve$Eve$arrangementLabel = function (arrng) {
	var _p78 = arrng;
	if (_p78.ctor === 'Row') {
		return 'row';
	} else {
		return 'column';
	}
};
var _gicentre$eve$Eve$sortProperty = function (sp) {
	var _p79 = sp;
	switch (_p79.ctor) {
		case 'Ascending':
			return {
				ctor: '_Tuple2',
				_0: 'order',
				_1: _elm_lang$core$Json_Encode$string('ascending')
			};
		case 'Descending':
			return {
				ctor: '_Tuple2',
				_0: 'order',
				_1: _elm_lang$core$Json_Encode$string('descending')
			};
		case 'ByField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p79._0)
			};
		case 'Op':
			return {
				ctor: '_Tuple2',
				_0: 'op',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$opLabel(_p79._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'repeat',
							_1: _elm_lang$core$Json_Encode$string(
								_gicentre$eve$Eve$arrangementLabel(_p79._0))
						},
						_1: {ctor: '[]'}
					})
			};
	}
};
var _gicentre$eve$Eve$anchorLabel = function (an) {
	var _p80 = an;
	switch (_p80.ctor) {
		case 'AStart':
			return 'start';
		case 'AMiddle':
			return 'middle';
		default:
			return 'end';
	}
};
var _gicentre$eve$Eve$titleConfig = function (titleCfg) {
	var _p81 = titleCfg;
	switch (_p81.ctor) {
		case 'TAnchor':
			return {
				ctor: '_Tuple2',
				_0: 'anchor',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$anchorLabel(_p81._0))
			};
		case 'TAngle':
			return {
				ctor: '_Tuple2',
				_0: 'angle',
				_1: _elm_lang$core$Json_Encode$float(_p81._0)
			};
		case 'TBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'baseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$vAlignLabel(_p81._0))
			};
		case 'TColor':
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _elm_lang$core$Json_Encode$string(_p81._0)
			};
		case 'TFont':
			return {
				ctor: '_Tuple2',
				_0: 'font',
				_1: _elm_lang$core$Json_Encode$string(_p81._0)
			};
		case 'TFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'fontSize',
				_1: _elm_lang$core$Json_Encode$float(_p81._0)
			};
		case 'TFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'fontWeight',
				_1: _gicentre$eve$Eve$fontWeight(_p81._0)
			};
		case 'TLimit':
			return {
				ctor: '_Tuple2',
				_0: 'limit',
				_1: _elm_lang$core$Json_Encode$float(_p81._0)
			};
		case 'TOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p81._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$sideLabel(_p81._0))
			};
	}
};
var _gicentre$eve$Eve$configProperty = function (configProp) {
	var _p82 = configProp;
	switch (_p82.ctor) {
		case 'Autosize':
			return {
				ctor: '_Tuple2',
				_0: 'autosize',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$autosizeConfig(_p82._0),
						_1: {ctor: '[]'}
					})
			};
		case 'Background':
			return {
				ctor: '_Tuple2',
				_0: 'background',
				_1: _elm_lang$core$Json_Encode$string(_p82._0)
			};
		case 'CountTitle':
			return {
				ctor: '_Tuple2',
				_0: 'countTitle',
				_1: _elm_lang$core$Json_Encode$string(_p82._0)
			};
		case 'FieldTitle':
			return {
				ctor: '_Tuple2',
				_0: 'fieldTitle',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$fieldTitleLabel(_p82._0))
			};
		case 'RemoveInvalid':
			return _p82._0 ? {
				ctor: '_Tuple2',
				_0: 'invalidValues',
				_1: _elm_lang$core$Json_Encode$string('filter')
			} : {ctor: '_Tuple2', _0: 'invalidValues', _1: _elm_lang$core$Json_Encode$null};
		case 'NumberFormat':
			return {
				ctor: '_Tuple2',
				_0: 'numberFormat',
				_1: _elm_lang$core$Json_Encode$string(_p82._0)
			};
		case 'Padding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'left',
							_1: _elm_lang$core$Json_Encode$float(_p82._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'top',
								_1: _elm_lang$core$Json_Encode$float(_p82._1)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'right',
									_1: _elm_lang$core$Json_Encode$float(_p82._2)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'bottom',
										_1: _elm_lang$core$Json_Encode$float(_p82._3)
									},
									_1: {ctor: '[]'}
								}
							}
						}
					})
			};
		case 'TimeFormat':
			return {
				ctor: '_Tuple2',
				_0: 'timeFormat',
				_1: _elm_lang$core$Json_Encode$string(_p82._0)
			};
		case 'Axis':
			return {
				ctor: '_Tuple2',
				_0: 'axis',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$axisConfig, _p82._0))
			};
		case 'AxisX':
			return {
				ctor: '_Tuple2',
				_0: 'axisX',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$axisConfig, _p82._0))
			};
		case 'AxisY':
			return {
				ctor: '_Tuple2',
				_0: 'axisY',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$axisConfig, _p82._0))
			};
		case 'AxisLeft':
			return {
				ctor: '_Tuple2',
				_0: 'axisLeft',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$axisConfig, _p82._0))
			};
		case 'AxisRight':
			return {
				ctor: '_Tuple2',
				_0: 'axisRight',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$axisConfig, _p82._0))
			};
		case 'AxisTop':
			return {
				ctor: '_Tuple2',
				_0: 'axisTop',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$axisConfig, _p82._0))
			};
		case 'AxisBottom':
			return {
				ctor: '_Tuple2',
				_0: 'axisBottom',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$axisConfig, _p82._0))
			};
		case 'AxisBand':
			return {
				ctor: '_Tuple2',
				_0: 'axisBand',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$axisConfig, _p82._0))
			};
		case 'Legend':
			return {
				ctor: '_Tuple2',
				_0: 'legend',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$legendProperty, _p82._0))
			};
		case 'MarkStyle':
			return {
				ctor: '_Tuple2',
				_0: 'mark',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'AreaStyle':
			return {
				ctor: '_Tuple2',
				_0: 'area',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'BarStyle':
			return {
				ctor: '_Tuple2',
				_0: 'bar',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'CircleStyle':
			return {
				ctor: '_Tuple2',
				_0: 'circle',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'LineStyle':
			return {
				ctor: '_Tuple2',
				_0: 'line',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'PointStyle':
			return {
				ctor: '_Tuple2',
				_0: 'point',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'RectStyle':
			return {
				ctor: '_Tuple2',
				_0: 'rect',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'RuleStyle':
			return {
				ctor: '_Tuple2',
				_0: 'rule',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'SquareStyle':
			return {
				ctor: '_Tuple2',
				_0: 'square',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'TextStyle':
			return {
				ctor: '_Tuple2',
				_0: 'text',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'TickStyle':
			return {
				ctor: '_Tuple2',
				_0: 'tick',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._0))
			};
		case 'TitleStyle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$titleConfig, _p82._0))
			};
		case 'NamedStyle':
			return {
				ctor: '_Tuple2',
				_0: 'style',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _p82._0,
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, _p82._1))
						},
						_1: {ctor: '[]'}
					})
			};
		case 'Scale':
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$scaleConfig, _p82._0))
			};
		case 'Stack':
			return _gicentre$eve$Eve$stackProperty(_p82._0);
		case 'Range':
			return {
				ctor: '_Tuple2',
				_0: 'range',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$rangeConfig, _p82._0))
			};
		case 'SelectionStyle':
			var selProp = function (_p83) {
				var _p84 = _p83;
				return {
					ctor: '_Tuple2',
					_0: _gicentre$eve$Eve$selectionLabel(_p84._0),
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$eve$Eve$selectionProperty, _p84._1))
				};
			};
			return {
				ctor: '_Tuple2',
				_0: 'selection',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, selProp, _p82._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'view',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$viewConfig, _p82._0))
			};
	}
};
var _gicentre$eve$Eve$transpose = function (ll) {
	transpose:
	while (true) {
		var _p85 = ll;
		if (_p85.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p85._0.ctor === '[]') {
				var _v73 = _p85._1;
				ll = _v73;
				continue transpose;
			} else {
				var _p86 = _p85._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p86);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p86);
				return {
					ctor: '::',
					_0: {ctor: '::', _0: _p85._0._0, _1: heads},
					_1: _gicentre$eve$Eve$transpose(
						{ctor: '::', _0: _p85._0._1, _1: tails})
				};
			}
		}
	}
};
var _gicentre$eve$Eve$toVegaLite = function (spec) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: '$schema',
				_1: _elm_lang$core$Json_Encode$string('https://vega.github.io/schema/vega-lite/v2.json')
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p87) {
					var _p88 = _p87;
					return {
						ctor: '_Tuple2',
						_0: _gicentre$eve$Eve$propertyLabel(_p88._0),
						_1: _p88._1
					};
				},
				spec)
		});
};
var _gicentre$eve$Eve$select = F3(
	function (name, sType, options) {
		var selProps = {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$selectionLabel(sType))
			},
			_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$selectionProperty, options)
		};
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: name,
				_1: _elm_lang$core$Json_Encode$object(selProps)
			});
	});
var _gicentre$eve$Eve$resolution = function (res) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_gicentre$eve$Eve$resolveProperty(res));
};
var _gicentre$eve$Eve$opAs = F3(
	function (op, field, label) {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'op',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$eve$Eve$opLabel(op))
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'field',
						_1: _elm_lang$core$Json_Encode$string(field)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'as',
							_1: _elm_lang$core$Json_Encode$string(label)
						},
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _gicentre$eve$Eve$filter = function (f) {
	var _p89 = f;
	switch (_p89.ctor) {
		case 'FExpr':
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$string(_p89._0)
				});
		case 'FEqual':
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'field',
								_1: _elm_lang$core$Json_Encode$string(_p89._0)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'equal',
									_1: _gicentre$eve$Eve$datavalue(_p89._1)
								},
								_1: {ctor: '[]'}
							}
						})
				});
		case 'FSelection':
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'selection',
								_1: _elm_lang$core$Json_Encode$string(_p89._0)
							},
							_1: {ctor: '[]'}
						})
				});
		case 'FRange':
			var _p93 = _p89._1;
			var values = function () {
				var _p90 = _p93;
				switch (_p90.ctor) {
					case 'Numbers':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p90._0));
					case 'DateTimes':
						return _elm_lang$core$Json_Encode$list(
							A2(
								_elm_lang$core$List$map,
								function (dt) {
									return _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$eve$Eve$dateTimeProperty, dt));
								},
								_p90._0));
					case 'Strings':
						var _p91 = A2(_elm_lang$core$Debug$log, 'Cannot filter with range of strings ', _p93);
						return _elm_lang$core$Json_Encode$null;
					default:
						var _p92 = A2(_elm_lang$core$Debug$log, 'Cannot filter with range of Booleans ', _p93);
						return _elm_lang$core$Json_Encode$null;
				}
			}();
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'field',
								_1: _elm_lang$core$Json_Encode$string(_p89._0)
							},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'range', _1: values},
								_1: {ctor: '[]'}
							}
						})
				});
		default:
			var values = function () {
				var _p94 = _p89._1;
				switch (_p94.ctor) {
					case 'Numbers':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p94._0));
					case 'DateTimes':
						return _elm_lang$core$Json_Encode$list(
							A2(
								_elm_lang$core$List$map,
								function (dt) {
									return _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$eve$Eve$dateTimeProperty, dt));
								},
								_p94._0));
					case 'Strings':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p94._0));
					default:
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$bool, _p94._0));
				}
			}();
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'field',
								_1: _elm_lang$core$Json_Encode$string(_p89._0)
							},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'oneOf', _1: values},
								_1: {ctor: '[]'}
							}
						})
				});
	}
};
var _gicentre$eve$Eve$dataRow = function (row) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$List$map,
				function (_p95) {
					var _p96 = _p95;
					return {
						ctor: '_Tuple2',
						_0: _p96._0,
						_1: _gicentre$eve$Eve$datavalue(_p96._1)
					};
				},
				row)));
};
var _gicentre$eve$Eve$dataColumn = F2(
	function (colName, data) {
		var _p97 = data;
		switch (_p97.ctor) {
			case 'Numbers':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					A2(
						_elm_lang$core$List$map,
						function (x) {
							return {
								ctor: '_Tuple2',
								_0: colName,
								_1: _elm_lang$core$Json_Encode$float(x)
							};
						},
						_p97._0));
			case 'Strings':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					A2(
						_elm_lang$core$List$map,
						function (s) {
							return {
								ctor: '_Tuple2',
								_0: colName,
								_1: _elm_lang$core$Json_Encode$string(s)
							};
						},
						_p97._0));
			case 'DateTimes':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					A2(
						_elm_lang$core$List$map,
						function (dts) {
							return {
								ctor: '_Tuple2',
								_0: colName,
								_1: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$map, _gicentre$eve$Eve$dateTimeProperty, dts))
							};
						},
						_p97._0));
			default:
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					A2(
						_elm_lang$core$List$map,
						function (b) {
							return {
								ctor: '_Tuple2',
								_0: colName,
								_1: _elm_lang$core$Json_Encode$bool(b)
							};
						},
						_p97._0));
		}
	});
var _gicentre$eve$Eve$configuration = function (cfg) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_gicentre$eve$Eve$configProperty(cfg));
};
var _gicentre$eve$Eve$calculate = F2(
	function (expr, label) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'calculate',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(expr),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(label),
							_1: {ctor: '[]'}
						}
					})
			});
	});
var _gicentre$eve$Eve$bin = function (bProps) {
	return _elm_lang$core$Native_Utils.eq(
		bProps,
		{ctor: '[]'}) ? {
		ctor: '_Tuple2',
		_0: 'bin',
		_1: _elm_lang$core$Json_Encode$bool(true)
	} : {
		ctor: '_Tuple2',
		_0: 'bin',
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$eve$Eve$binProperty, bProps))
	};
};
var _gicentre$eve$Eve$detailChannelProperty = function (field) {
	var _p98 = field;
	switch (_p98.ctor) {
		case 'DName':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p98._0)
			};
		case 'DmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$measurementLabel(_p98._0))
			};
		case 'DBin':
			return _gicentre$eve$Eve$bin(_p98._0);
		case 'DTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$timeUnitLabel(_p98._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$opLabel(_p98._0))
			};
	}
};
var _gicentre$eve$Eve$detail = function (detailProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'detail',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$eve$Eve$detailChannelProperty, detailProps))
		});
};
var _gicentre$eve$Eve$facetChannelProperty = function (fMap) {
	var _p99 = fMap;
	switch (_p99.ctor) {
		case 'FName':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p99._0)
			};
		case 'FmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$measurementLabel(_p99._0))
			};
		case 'FBin':
			return _gicentre$eve$Eve$bin(_p99._0);
		case 'FAggregate':
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$opLabel(_p99._0))
			};
		case 'FTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$timeUnitLabel(_p99._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'header',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$headerProperty, _p99._0))
			};
	}
};
var _gicentre$eve$Eve$column = function (fFields) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'column',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$eve$Eve$facetChannelProperty, fFields))
		});
};
var _gicentre$eve$Eve$row = function (fFields) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'row',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$eve$Eve$facetChannelProperty, fFields))
		});
};
var _gicentre$eve$Eve$facetMappingProperty = function (fMap) {
	var _p100 = fMap;
	if (_p100.ctor === 'RowBy') {
		return {
			ctor: '_Tuple2',
			_0: 'row',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$eve$Eve$facetChannelProperty, _p100._0))
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'column',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$eve$Eve$facetChannelProperty, _p100._0))
		};
	}
};
var _gicentre$eve$Eve$markChannelProperty = function (field) {
	var _p101 = field;
	switch (_p101.ctor) {
		case 'MName':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$string(_p101._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MRepeat':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'repeat',
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$eve$Eve$arrangementLabel(_p101._0))
							},
							_1: {ctor: '[]'}
						})
				},
				_1: {ctor: '[]'}
			};
		case 'MmType':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$eve$Eve$measurementLabel(_p101._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MScale':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'scale',
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$eve$Eve$scaleProperty, _p101._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MLegend':
			var _p102 = _p101._0;
			return _elm_lang$core$Native_Utils.eq(
				_p102,
				{ctor: '[]'}) ? {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'legend', _1: _elm_lang$core$Json_Encode$null},
				_1: {ctor: '[]'}
			} : {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'legend',
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$eve$Eve$legendProperty, _p102))
				},
				_1: {ctor: '[]'}
			};
		case 'MBin':
			return {
				ctor: '::',
				_0: _gicentre$eve$Eve$bin(_p101._0),
				_1: {ctor: '[]'}
			};
		case 'MCondition':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'condition',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'selection',
								_1: _elm_lang$core$Json_Encode$string(_p101._0)
							},
							_1: A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$markChannelProperty, _p101._1)
						})
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$markChannelProperty, _p101._2)
			};
		case 'MTimeUnit':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'timeUnit',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$eve$Eve$timeUnitLabel(_p101._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MAggregate':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'aggregate',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$eve$Eve$opLabel(_p101._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MPath':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$string(_p101._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MNumber':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$float(_p101._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MString':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$string(_p101._0)
				},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$bool(_p101._0)
				},
				_1: {ctor: '[]'}
			};
	}
};
var _gicentre$eve$Eve$color = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'color',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$markChannelProperty, markProps))
		});
};
var _gicentre$eve$Eve$opacity = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'opacity',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$markChannelProperty, markProps))
		});
};
var _gicentre$eve$Eve$shape = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'shape',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$markChannelProperty, markProps))
		});
};
var _gicentre$eve$Eve$size = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'size',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$markChannelProperty, markProps))
		});
};
var _gicentre$eve$Eve$orderChannelProperty = function (oDef) {
	var _p103 = oDef;
	switch (_p103.ctor) {
		case 'OName':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p103._0)
			};
		case 'ORepeat':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'repeat',
							_1: _elm_lang$core$Json_Encode$string(
								_gicentre$eve$Eve$arrangementLabel(_p103._0))
						},
						_1: {ctor: '[]'}
					})
			};
		case 'OmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$measurementLabel(_p103._0))
			};
		case 'OBin':
			return _gicentre$eve$Eve$bin(_p103._0);
		case 'OAggregate':
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$opLabel(_p103._0))
			};
		case 'OTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$timeUnitLabel(_p103._0))
			};
		default:
			var _p105 = _p103._0;
			var _p104 = _p105;
			_v85_3:
			do {
				if (_p104.ctor === '[]') {
					return {ctor: '_Tuple2', _0: 'sort', _1: _elm_lang$core$Json_Encode$null};
				} else {
					if (_p104._1.ctor === '[]') {
						switch (_p104._0.ctor) {
							case 'Ascending':
								return {
									ctor: '_Tuple2',
									_0: 'sort',
									_1: _elm_lang$core$Json_Encode$string('ascending')
								};
							case 'Descending':
								return {
									ctor: '_Tuple2',
									_0: 'sort',
									_1: _elm_lang$core$Json_Encode$string('descending')
								};
							default:
								break _v85_3;
						}
					} else {
						break _v85_3;
					}
				}
			} while(false);
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$sortProperty, _p105))
			};
	}
};
var _gicentre$eve$Eve$order = function (oDefs) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'order',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$eve$Eve$orderChannelProperty, oDefs))
		});
};
var _gicentre$eve$Eve$positionChannelProperty = function (pDef) {
	var _p106 = pDef;
	switch (_p106.ctor) {
		case 'PName':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p106._0)
			};
		case 'PmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$measurementLabel(_p106._0))
			};
		case 'PBin':
			return _gicentre$eve$Eve$bin(_p106._0);
		case 'PAggregate':
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$opLabel(_p106._0))
			};
		case 'PTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$timeUnitLabel(_p106._0))
			};
		case 'PSort':
			var _p108 = _p106._0;
			var _p107 = _p108;
			_v87_3:
			do {
				if (_p107.ctor === '[]') {
					return {ctor: '_Tuple2', _0: 'sort', _1: _elm_lang$core$Json_Encode$null};
				} else {
					if (_p107._1.ctor === '[]') {
						switch (_p107._0.ctor) {
							case 'Ascending':
								return {
									ctor: '_Tuple2',
									_0: 'sort',
									_1: _elm_lang$core$Json_Encode$string('ascending')
								};
							case 'Descending':
								return {
									ctor: '_Tuple2',
									_0: 'sort',
									_1: _elm_lang$core$Json_Encode$string('descending')
								};
							default:
								break _v87_3;
						}
					} else {
						break _v87_3;
					}
				}
			} while(false);
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$sortProperty, _p108))
			};
		case 'PScale':
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$scaleProperty, _p106._0))
			};
		case 'PAxis':
			var _p109 = _p106._0;
			return _elm_lang$core$Native_Utils.eq(
				_p109,
				{ctor: '[]'}) ? {ctor: '_Tuple2', _0: 'axis', _1: _elm_lang$core$Json_Encode$null} : {
				ctor: '_Tuple2',
				_0: 'axis',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$axisProperty, _p109))
			};
		case 'PStack':
			return _gicentre$eve$Eve$stackProperty(_p106._0);
		default:
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'repeat',
							_1: _elm_lang$core$Json_Encode$string(
								_gicentre$eve$Eve$arrangementLabel(_p106._0))
						},
						_1: {ctor: '[]'}
					})
			};
	}
};
var _gicentre$eve$Eve$position = F2(
	function (pos, pDefs) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: _gicentre$eve$Eve$positionLabel(pos),
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$eve$Eve$positionChannelProperty, pDefs))
			});
	});
var _gicentre$eve$Eve$textChannelProperty = function (tDef) {
	var _p110 = tDef;
	switch (_p110.ctor) {
		case 'TName':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$string(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'TRepeat':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'repeat',
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$eve$Eve$arrangementLabel(_p110._0))
							},
							_1: {ctor: '[]'}
						})
				},
				_1: {ctor: '[]'}
			};
		case 'TmType':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$eve$Eve$measurementLabel(_p110._0))
				},
				_1: {ctor: '[]'}
			};
		case 'TBin':
			return {
				ctor: '::',
				_0: _gicentre$eve$Eve$bin(_p110._0),
				_1: {ctor: '[]'}
			};
		case 'TAggregate':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'aggregate',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$eve$Eve$opLabel(_p110._0))
				},
				_1: {ctor: '[]'}
			};
		case 'TTimeUnit':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'timeUnit',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$eve$Eve$timeUnitLabel(_p110._0))
				},
				_1: {ctor: '[]'}
			};
		case 'TFormat':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'format',
					_1: _elm_lang$core$Json_Encode$string(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'condition',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'selection',
								_1: _elm_lang$core$Json_Encode$string(_p110._0)
							},
							_1: A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$textChannelProperty, _p110._1)
						})
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$textChannelProperty, _p110._2)
			};
	}
};
var _gicentre$eve$Eve$text = function (tDefs) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'text',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$textChannelProperty, tDefs))
		});
};
var _gicentre$eve$Eve$tooltip = function (tDefs) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'tooltip',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$textChannelProperty, tDefs))
		});
};
var _gicentre$eve$Eve$asSpec = function (specs) {
	return _elm_lang$core$Json_Encode$object(
		A2(
			_elm_lang$core$List$map,
			function (_p111) {
				var _p112 = _p111;
				return {
					ctor: '_Tuple2',
					_0: _gicentre$eve$Eve$propertyLabel(_p112._0),
					_1: _p112._1
				};
			},
			specs));
};
var _gicentre$eve$Eve$aggregate = F2(
	function (ops, groups) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$list(ops),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, groups)),
							_1: {ctor: '[]'}
						}
					})
			});
	});
var _gicentre$eve$Eve$AEnd = {ctor: 'AEnd'};
var _gicentre$eve$Eve$AMiddle = {ctor: 'AMiddle'};
var _gicentre$eve$Eve$AStart = {ctor: 'AStart'};
var _gicentre$eve$Eve$Row = {ctor: 'Row'};
var _gicentre$eve$Eve$Column = {ctor: 'Column'};
var _gicentre$eve$Eve$AResize = function (a) {
	return {ctor: 'AResize', _0: a};
};
var _gicentre$eve$Eve$APadding = {ctor: 'APadding'};
var _gicentre$eve$Eve$APad = {ctor: 'APad'};
var _gicentre$eve$Eve$ANone = {ctor: 'ANone'};
var _gicentre$eve$Eve$AFit = {ctor: 'AFit'};
var _gicentre$eve$Eve$AContent = {ctor: 'AContent'};
var _gicentre$eve$Eve$TitleY = function (a) {
	return {ctor: 'TitleY', _0: a};
};
var _gicentre$eve$Eve$TitleX = function (a) {
	return {ctor: 'TitleX', _0: a};
};
var _gicentre$eve$Eve$TitleLimit = function (a) {
	return {ctor: 'TitleLimit', _0: a};
};
var _gicentre$eve$Eve$TitleFontSize = function (a) {
	return {ctor: 'TitleFontSize', _0: a};
};
var _gicentre$eve$Eve$TitleFontWeight = function (a) {
	return {ctor: 'TitleFontWeight', _0: a};
};
var _gicentre$eve$Eve$TitleFont = function (a) {
	return {ctor: 'TitleFont', _0: a};
};
var _gicentre$eve$Eve$TitleColor = function (a) {
	return {ctor: 'TitleColor', _0: a};
};
var _gicentre$eve$Eve$TitleBaseline = function (a) {
	return {ctor: 'TitleBaseline', _0: a};
};
var _gicentre$eve$Eve$TickWidth = function (a) {
	return {ctor: 'TickWidth', _0: a};
};
var _gicentre$eve$Eve$TickRound = function (a) {
	return {ctor: 'TickRound', _0: a};
};
var _gicentre$eve$Eve$TickColor = function (a) {
	return {ctor: 'TickColor', _0: a};
};
var _gicentre$eve$Eve$ShortTimeLabels = function (a) {
	return {ctor: 'ShortTimeLabels', _0: a};
};
var _gicentre$eve$Eve$LabelLimit = function (a) {
	return {ctor: 'LabelLimit', _0: a};
};
var _gicentre$eve$Eve$LabelFontSize = function (a) {
	return {ctor: 'LabelFontSize', _0: a};
};
var _gicentre$eve$Eve$LabelFont = function (a) {
	return {ctor: 'LabelFont', _0: a};
};
var _gicentre$eve$Eve$LabelColor = function (a) {
	return {ctor: 'LabelColor', _0: a};
};
var _gicentre$eve$Eve$GridWidth = function (a) {
	return {ctor: 'GridWidth', _0: a};
};
var _gicentre$eve$Eve$GridOpacity = function (a) {
	return {ctor: 'GridOpacity', _0: a};
};
var _gicentre$eve$Eve$GridDash = function (a) {
	return {ctor: 'GridDash', _0: a};
};
var _gicentre$eve$Eve$GridColor = function (a) {
	return {ctor: 'GridColor', _0: a};
};
var _gicentre$eve$Eve$DomainWidth = function (a) {
	return {ctor: 'DomainWidth', _0: a};
};
var _gicentre$eve$Eve$DomainColor = function (a) {
	return {ctor: 'DomainColor', _0: a};
};
var _gicentre$eve$Eve$BandPosition = function (a) {
	return {ctor: 'BandPosition', _0: a};
};
var _gicentre$eve$Eve$ZIndex = function (a) {
	return {ctor: 'ZIndex', _0: a};
};
var _gicentre$eve$Eve$Values = function (a) {
	return {ctor: 'Values', _0: a};
};
var _gicentre$eve$Eve$AxTitlePadding = function (a) {
	return {ctor: 'AxTitlePadding', _0: a};
};
var _gicentre$eve$Eve$AxTitleMaxLength = function (a) {
	return {ctor: 'AxTitleMaxLength', _0: a};
};
var _gicentre$eve$Eve$AxTitleAngle = function (a) {
	return {ctor: 'AxTitleAngle', _0: a};
};
var _gicentre$eve$Eve$AxTitleAlign = function (a) {
	return {ctor: 'AxTitleAlign', _0: a};
};
var _gicentre$eve$Eve$AxTitle = function (a) {
	return {ctor: 'AxTitle', _0: a};
};
var _gicentre$eve$Eve$TickSize = function (a) {
	return {ctor: 'TickSize', _0: a};
};
var _gicentre$eve$Eve$TickCount = function (a) {
	return {ctor: 'TickCount', _0: a};
};
var _gicentre$eve$Eve$Ticks = function (a) {
	return {ctor: 'Ticks', _0: a};
};
var _gicentre$eve$Eve$Position = function (a) {
	return {ctor: 'Position', _0: a};
};
var _gicentre$eve$Eve$Orient = function (a) {
	return {ctor: 'Orient', _0: a};
};
var _gicentre$eve$Eve$Offset = function (a) {
	return {ctor: 'Offset', _0: a};
};
var _gicentre$eve$Eve$MinExtent = function (a) {
	return {ctor: 'MinExtent', _0: a};
};
var _gicentre$eve$Eve$MaxExtent = function (a) {
	return {ctor: 'MaxExtent', _0: a};
};
var _gicentre$eve$Eve$Labels = function (a) {
	return {ctor: 'Labels', _0: a};
};
var _gicentre$eve$Eve$LabelPadding = function (a) {
	return {ctor: 'LabelPadding', _0: a};
};
var _gicentre$eve$Eve$LabelOverlap = function (a) {
	return {ctor: 'LabelOverlap', _0: a};
};
var _gicentre$eve$Eve$LabelAngle = function (a) {
	return {ctor: 'LabelAngle', _0: a};
};
var _gicentre$eve$Eve$Grid = function (a) {
	return {ctor: 'Grid', _0: a};
};
var _gicentre$eve$Eve$Format = function (a) {
	return {ctor: 'Format', _0: a};
};
var _gicentre$eve$Eve$Domain = function (a) {
	return {ctor: 'Domain', _0: a};
};
var _gicentre$eve$Eve$Steps = function (a) {
	return {ctor: 'Steps', _0: a};
};
var _gicentre$eve$Eve$Step = function (a) {
	return {ctor: 'Step', _0: a};
};
var _gicentre$eve$Eve$Nice = function (a) {
	return {ctor: 'Nice', _0: a};
};
var _gicentre$eve$Eve$MinStep = function (a) {
	return {ctor: 'MinStep', _0: a};
};
var _gicentre$eve$Eve$MaxBins = function (a) {
	return {ctor: 'MaxBins', _0: a};
};
var _gicentre$eve$Eve$Extent = F2(
	function (a, b) {
		return {ctor: 'Extent', _0: a, _1: b};
	});
var _gicentre$eve$Eve$Divide = F2(
	function (a, b) {
		return {ctor: 'Divide', _0: a, _1: b};
	});
var _gicentre$eve$Eve$Base = function (a) {
	return {ctor: 'Base', _0: a};
};
var _gicentre$eve$Eve$IColor = F2(
	function (a, b) {
		return {ctor: 'IColor', _0: a, _1: b};
	});
var _gicentre$eve$Eve$ITel = F2(
	function (a, b) {
		return {ctor: 'ITel', _0: a, _1: b};
	});
var _gicentre$eve$Eve$IDateTimeLocal = F2(
	function (a, b) {
		return {ctor: 'IDateTimeLocal', _0: a, _1: b};
	});
var _gicentre$eve$Eve$IWeek = F2(
	function (a, b) {
		return {ctor: 'IWeek', _0: a, _1: b};
	});
var _gicentre$eve$Eve$IMonth = F2(
	function (a, b) {
		return {ctor: 'IMonth', _0: a, _1: b};
	});
var _gicentre$eve$Eve$ITime = F2(
	function (a, b) {
		return {ctor: 'ITime', _0: a, _1: b};
	});
var _gicentre$eve$Eve$IDate = F2(
	function (a, b) {
		return {ctor: 'IDate', _0: a, _1: b};
	});
var _gicentre$eve$Eve$INumber = F2(
	function (a, b) {
		return {ctor: 'INumber', _0: a, _1: b};
	});
var _gicentre$eve$Eve$IText = F2(
	function (a, b) {
		return {ctor: 'IText', _0: a, _1: b};
	});
var _gicentre$eve$Eve$ISelect = F2(
	function (a, b) {
		return {ctor: 'ISelect', _0: a, _1: b};
	});
var _gicentre$eve$Eve$IRadio = F2(
	function (a, b) {
		return {ctor: 'IRadio', _0: a, _1: b};
	});
var _gicentre$eve$Eve$ICheckbox = F2(
	function (a, b) {
		return {ctor: 'ICheckbox', _0: a, _1: b};
	});
var _gicentre$eve$Eve$IRange = F2(
	function (a, b) {
		return {ctor: 'IRange', _0: a, _1: b};
	});
var _gicentre$eve$Eve$ChSize = {ctor: 'ChSize'};
var _gicentre$eve$Eve$ChShape = {ctor: 'ChShape'};
var _gicentre$eve$Eve$ChOpacity = {ctor: 'ChOpacity'};
var _gicentre$eve$Eve$ChColor = {ctor: 'ChColor'};
var _gicentre$eve$Eve$ChY2 = {ctor: 'ChY2'};
var _gicentre$eve$Eve$ChX2 = {ctor: 'ChX2'};
var _gicentre$eve$Eve$ChY = {ctor: 'ChY'};
var _gicentre$eve$Eve$ChX = {ctor: 'ChX'};
var _gicentre$eve$Eve$Rgb = function (a) {
	return {ctor: 'Rgb', _0: a};
};
var _gicentre$eve$Eve$Lab = {ctor: 'Lab'};
var _gicentre$eve$Eve$HslLong = {ctor: 'HslLong'};
var _gicentre$eve$Eve$Hsl = {ctor: 'Hsl'};
var _gicentre$eve$Eve$HclLong = {ctor: 'HclLong'};
var _gicentre$eve$Eve$Hcl = {ctor: 'Hcl'};
var _gicentre$eve$Eve$CubeHelixLong = function (a) {
	return {ctor: 'CubeHelixLong', _0: a};
};
var _gicentre$eve$Eve$CubeHelix = function (a) {
	return {ctor: 'CubeHelix', _0: a};
};
var _gicentre$eve$Eve$View = function (a) {
	return {ctor: 'View', _0: a};
};
var _gicentre$eve$Eve$TimeFormat = function (a) {
	return {ctor: 'TimeFormat', _0: a};
};
var _gicentre$eve$Eve$TitleStyle = function (a) {
	return {ctor: 'TitleStyle', _0: a};
};
var _gicentre$eve$Eve$TickStyle = function (a) {
	return {ctor: 'TickStyle', _0: a};
};
var _gicentre$eve$Eve$TextStyle = function (a) {
	return {ctor: 'TextStyle', _0: a};
};
var _gicentre$eve$Eve$Stack = function (a) {
	return {ctor: 'Stack', _0: a};
};
var _gicentre$eve$Eve$SquareStyle = function (a) {
	return {ctor: 'SquareStyle', _0: a};
};
var _gicentre$eve$Eve$SelectionStyle = function (a) {
	return {ctor: 'SelectionStyle', _0: a};
};
var _gicentre$eve$Eve$Scale = function (a) {
	return {ctor: 'Scale', _0: a};
};
var _gicentre$eve$Eve$RuleStyle = function (a) {
	return {ctor: 'RuleStyle', _0: a};
};
var _gicentre$eve$Eve$RemoveInvalid = function (a) {
	return {ctor: 'RemoveInvalid', _0: a};
};
var _gicentre$eve$Eve$RectStyle = function (a) {
	return {ctor: 'RectStyle', _0: a};
};
var _gicentre$eve$Eve$Range = function (a) {
	return {ctor: 'Range', _0: a};
};
var _gicentre$eve$Eve$PointStyle = function (a) {
	return {ctor: 'PointStyle', _0: a};
};
var _gicentre$eve$Eve$Padding = F4(
	function (a, b, c, d) {
		return {ctor: 'Padding', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$eve$Eve$NumberFormat = function (a) {
	return {ctor: 'NumberFormat', _0: a};
};
var _gicentre$eve$Eve$NamedStyle = F2(
	function (a, b) {
		return {ctor: 'NamedStyle', _0: a, _1: b};
	});
var _gicentre$eve$Eve$MarkStyle = function (a) {
	return {ctor: 'MarkStyle', _0: a};
};
var _gicentre$eve$Eve$LineStyle = function (a) {
	return {ctor: 'LineStyle', _0: a};
};
var _gicentre$eve$Eve$Legend = function (a) {
	return {ctor: 'Legend', _0: a};
};
var _gicentre$eve$Eve$FieldTitle = function (a) {
	return {ctor: 'FieldTitle', _0: a};
};
var _gicentre$eve$Eve$CountTitle = function (a) {
	return {ctor: 'CountTitle', _0: a};
};
var _gicentre$eve$Eve$CircleStyle = function (a) {
	return {ctor: 'CircleStyle', _0: a};
};
var _gicentre$eve$Eve$BarStyle = function (a) {
	return {ctor: 'BarStyle', _0: a};
};
var _gicentre$eve$Eve$Background = function (a) {
	return {ctor: 'Background', _0: a};
};
var _gicentre$eve$Eve$AxisBand = function (a) {
	return {ctor: 'AxisBand', _0: a};
};
var _gicentre$eve$Eve$AxisBottom = function (a) {
	return {ctor: 'AxisBottom', _0: a};
};
var _gicentre$eve$Eve$AxisTop = function (a) {
	return {ctor: 'AxisTop', _0: a};
};
var _gicentre$eve$Eve$AxisRight = function (a) {
	return {ctor: 'AxisRight', _0: a};
};
var _gicentre$eve$Eve$AxisLeft = function (a) {
	return {ctor: 'AxisLeft', _0: a};
};
var _gicentre$eve$Eve$AxisY = function (a) {
	return {ctor: 'AxisY', _0: a};
};
var _gicentre$eve$Eve$AxisX = function (a) {
	return {ctor: 'AxisX', _0: a};
};
var _gicentre$eve$Eve$Axis = function (a) {
	return {ctor: 'Axis', _0: a};
};
var _gicentre$eve$Eve$Autosize = function (a) {
	return {ctor: 'Autosize', _0: a};
};
var _gicentre$eve$Eve$AreaStyle = function (a) {
	return {ctor: 'AreaStyle', _0: a};
};
var _gicentre$eve$Eve$Str = function (a) {
	return {ctor: 'Str', _0: a};
};
var _gicentre$eve$Eve$Number = function (a) {
	return {ctor: 'Number', _0: a};
};
var _gicentre$eve$Eve$DateTime = function (a) {
	return {ctor: 'DateTime', _0: a};
};
var _gicentre$eve$Eve$Boolean = function (a) {
	return {ctor: 'Boolean', _0: a};
};
var _gicentre$eve$Eve$Strings = function (a) {
	return {ctor: 'Strings', _0: a};
};
var _gicentre$eve$Eve$Numbers = function (a) {
	return {ctor: 'Numbers', _0: a};
};
var _gicentre$eve$Eve$DateTimes = function (a) {
	return {ctor: 'DateTimes', _0: a};
};
var _gicentre$eve$Eve$Booleans = function (a) {
	return {ctor: 'Booleans', _0: a};
};
var _gicentre$eve$Eve$DTMilliseconds = function (a) {
	return {ctor: 'DTMilliseconds', _0: a};
};
var _gicentre$eve$Eve$DTSeconds = function (a) {
	return {ctor: 'DTSeconds', _0: a};
};
var _gicentre$eve$Eve$DTMinutes = function (a) {
	return {ctor: 'DTMinutes', _0: a};
};
var _gicentre$eve$Eve$DTHours = function (a) {
	return {ctor: 'DTHours', _0: a};
};
var _gicentre$eve$Eve$DTDay = function (a) {
	return {ctor: 'DTDay', _0: a};
};
var _gicentre$eve$Eve$DTDate = function (a) {
	return {ctor: 'DTDate', _0: a};
};
var _gicentre$eve$Eve$DTMonth = function (a) {
	return {ctor: 'DTMonth', _0: a};
};
var _gicentre$eve$Eve$DTQuarter = function (a) {
	return {ctor: 'DTQuarter', _0: a};
};
var _gicentre$eve$Eve$DTYear = function (a) {
	return {ctor: 'DTYear', _0: a};
};
var _gicentre$eve$Eve$Sun = {ctor: 'Sun'};
var _gicentre$eve$Eve$Sat = {ctor: 'Sat'};
var _gicentre$eve$Eve$Fri = {ctor: 'Fri'};
var _gicentre$eve$Eve$Thu = {ctor: 'Thu'};
var _gicentre$eve$Eve$Wed = {ctor: 'Wed'};
var _gicentre$eve$Eve$Tue = {ctor: 'Tue'};
var _gicentre$eve$Eve$Mon = {ctor: 'Mon'};
var _gicentre$eve$Eve$DAggregate = function (a) {
	return {ctor: 'DAggregate', _0: a};
};
var _gicentre$eve$Eve$DTimeUnit = function (a) {
	return {ctor: 'DTimeUnit', _0: a};
};
var _gicentre$eve$Eve$DBin = function (a) {
	return {ctor: 'DBin', _0: a};
};
var _gicentre$eve$Eve$DmType = function (a) {
	return {ctor: 'DmType', _0: a};
};
var _gicentre$eve$Eve$DName = function (a) {
	return {ctor: 'DName', _0: a};
};
var _gicentre$eve$Eve$FHeader = function (a) {
	return {ctor: 'FHeader', _0: a};
};
var _gicentre$eve$Eve$FTimeUnit = function (a) {
	return {ctor: 'FTimeUnit', _0: a};
};
var _gicentre$eve$Eve$FAggregate = function (a) {
	return {ctor: 'FAggregate', _0: a};
};
var _gicentre$eve$Eve$FBin = function (a) {
	return {ctor: 'FBin', _0: a};
};
var _gicentre$eve$Eve$FmType = function (a) {
	return {ctor: 'FmType', _0: a};
};
var _gicentre$eve$Eve$FName = function (a) {
	return {ctor: 'FName', _0: a};
};
var _gicentre$eve$Eve$RowBy = function (a) {
	return {ctor: 'RowBy', _0: a};
};
var _gicentre$eve$Eve$ColumnBy = function (a) {
	return {ctor: 'ColumnBy', _0: a};
};
var _gicentre$eve$Eve$FoUtc = function (a) {
	return {ctor: 'FoUtc', _0: a};
};
var _gicentre$eve$Eve$FoDate = function (a) {
	return {ctor: 'FoDate', _0: a};
};
var _gicentre$eve$Eve$FoBoolean = {ctor: 'FoBoolean'};
var _gicentre$eve$Eve$FoNumber = {ctor: 'FoNumber'};
var _gicentre$eve$Eve$FRange = F2(
	function (a, b) {
		return {ctor: 'FRange', _0: a, _1: b};
	});
var _gicentre$eve$Eve$FOneOf = F2(
	function (a, b) {
		return {ctor: 'FOneOf', _0: a, _1: b};
	});
var _gicentre$eve$Eve$FSelection = function (a) {
	return {ctor: 'FSelection', _0: a};
};
var _gicentre$eve$Eve$FExpr = function (a) {
	return {ctor: 'FExpr', _0: a};
};
var _gicentre$eve$Eve$FEqual = F2(
	function (a, b) {
		return {ctor: 'FEqual', _0: a, _1: b};
	});
var _gicentre$eve$Eve$Parse = function (a) {
	return {ctor: 'Parse', _0: a};
};
var _gicentre$eve$Eve$TopojsonMesh = function (a) {
	return {ctor: 'TopojsonMesh', _0: a};
};
var _gicentre$eve$Eve$TopojsonFeature = function (a) {
	return {ctor: 'TopojsonFeature', _0: a};
};
var _gicentre$eve$Eve$TSV = {ctor: 'TSV'};
var _gicentre$eve$Eve$CSV = {ctor: 'CSV'};
var _gicentre$eve$Eve$JSON = {ctor: 'JSON'};
var _gicentre$eve$Eve$W900 = {ctor: 'W900'};
var _gicentre$eve$Eve$W800 = {ctor: 'W800'};
var _gicentre$eve$Eve$W700 = {ctor: 'W700'};
var _gicentre$eve$Eve$W600 = {ctor: 'W600'};
var _gicentre$eve$Eve$W500 = {ctor: 'W500'};
var _gicentre$eve$Eve$W400 = {ctor: 'W400'};
var _gicentre$eve$Eve$W300 = {ctor: 'W300'};
var _gicentre$eve$Eve$W200 = {ctor: 'W200'};
var _gicentre$eve$Eve$W100 = {ctor: 'W100'};
var _gicentre$eve$Eve$Normal = {ctor: 'Normal'};
var _gicentre$eve$Eve$Lighter = {ctor: 'Lighter'};
var _gicentre$eve$Eve$Bolder = {ctor: 'Bolder'};
var _gicentre$eve$Eve$Bold = {ctor: 'Bold'};
var _gicentre$eve$Eve$AlignRight = {ctor: 'AlignRight'};
var _gicentre$eve$Eve$AlignLeft = {ctor: 'AlignLeft'};
var _gicentre$eve$Eve$AlignCenter = {ctor: 'AlignCenter'};
var _gicentre$eve$Eve$HTitle = function (a) {
	return {ctor: 'HTitle', _0: a};
};
var _gicentre$eve$Eve$HFormat = function (a) {
	return {ctor: 'HFormat', _0: a};
};
var _gicentre$eve$Eve$InPlaceholder = function (a) {
	return {ctor: 'InPlaceholder', _0: a};
};
var _gicentre$eve$Eve$InStep = function (a) {
	return {ctor: 'InStep', _0: a};
};
var _gicentre$eve$Eve$InMax = function (a) {
	return {ctor: 'InMax', _0: a};
};
var _gicentre$eve$Eve$InMin = function (a) {
	return {ctor: 'InMin', _0: a};
};
var _gicentre$eve$Eve$InOptions = function (a) {
	return {ctor: 'InOptions', _0: a};
};
var _gicentre$eve$Eve$Element = function (a) {
	return {ctor: 'Element', _0: a};
};
var _gicentre$eve$Eve$Debounce = function (a) {
	return {ctor: 'Debounce', _0: a};
};
var _gicentre$eve$Eve$Symbol = {ctor: 'Symbol'};
var _gicentre$eve$Eve$Gradient = {ctor: 'Gradient'};
var _gicentre$eve$Eve$TopRight = {ctor: 'TopRight'};
var _gicentre$eve$Eve$TopLeft = {ctor: 'TopLeft'};
var _gicentre$eve$Eve$Right = {ctor: 'Right'};
var _gicentre$eve$Eve$None = {ctor: 'None'};
var _gicentre$eve$Eve$Left = {ctor: 'Left'};
var _gicentre$eve$Eve$BottomRight = {ctor: 'BottomRight'};
var _gicentre$eve$Eve$BottomLeft = {ctor: 'BottomLeft'};
var _gicentre$eve$Eve$LZIndex = function (a) {
	return {ctor: 'LZIndex', _0: a};
};
var _gicentre$eve$Eve$LValues = function (a) {
	return {ctor: 'LValues', _0: a};
};
var _gicentre$eve$Eve$LType = function (a) {
	return {ctor: 'LType', _0: a};
};
var _gicentre$eve$Eve$LTitle = function (a) {
	return {ctor: 'LTitle', _0: a};
};
var _gicentre$eve$Eve$LTickCount = function (a) {
	return {ctor: 'LTickCount', _0: a};
};
var _gicentre$eve$Eve$LPadding = function (a) {
	return {ctor: 'LPadding', _0: a};
};
var _gicentre$eve$Eve$LOrient = function (a) {
	return {ctor: 'LOrient', _0: a};
};
var _gicentre$eve$Eve$LOffset = function (a) {
	return {ctor: 'LOffset', _0: a};
};
var _gicentre$eve$Eve$LFormat = function (a) {
	return {ctor: 'LFormat', _0: a};
};
var _gicentre$eve$Eve$LEntryPadding = function (a) {
	return {ctor: 'LEntryPadding', _0: a};
};
var _gicentre$eve$Eve$Tick = {ctor: 'Tick'};
var _gicentre$eve$Eve$Text = {ctor: 'Text'};
var _gicentre$eve$Eve$Square = {ctor: 'Square'};
var _gicentre$eve$Eve$Rule = {ctor: 'Rule'};
var _gicentre$eve$Eve$Rect = {ctor: 'Rect'};
var _gicentre$eve$Eve$Point = {ctor: 'Point'};
var _gicentre$eve$Eve$Line = {ctor: 'Line'};
var _gicentre$eve$Eve$Circle = {ctor: 'Circle'};
var _gicentre$eve$Eve$Bar = {ctor: 'Bar'};
var _gicentre$eve$Eve$Area = {ctor: 'Area'};
var _gicentre$eve$Eve$Stepwise = {ctor: 'Stepwise'};
var _gicentre$eve$Eve$StepBefore = {ctor: 'StepBefore'};
var _gicentre$eve$Eve$StepAfter = {ctor: 'StepAfter'};
var _gicentre$eve$Eve$Monotone = {ctor: 'Monotone'};
var _gicentre$eve$Eve$LinearClosed = {ctor: 'LinearClosed'};
var _gicentre$eve$Eve$Linear = {ctor: 'Linear'};
var _gicentre$eve$Eve$CardinalOpen = {ctor: 'CardinalOpen'};
var _gicentre$eve$Eve$CardinalClosed = {ctor: 'CardinalClosed'};
var _gicentre$eve$Eve$Cardinal = {ctor: 'Cardinal'};
var _gicentre$eve$Eve$Bundle = {ctor: 'Bundle'};
var _gicentre$eve$Eve$BasisOpen = {ctor: 'BasisOpen'};
var _gicentre$eve$Eve$BasisClosed = {ctor: 'BasisClosed'};
var _gicentre$eve$Eve$Basis = {ctor: 'Basis'};
var _gicentre$eve$Eve$MBoolean = function (a) {
	return {ctor: 'MBoolean', _0: a};
};
var _gicentre$eve$Eve$MString = function (a) {
	return {ctor: 'MString', _0: a};
};
var _gicentre$eve$Eve$MNumber = function (a) {
	return {ctor: 'MNumber', _0: a};
};
var _gicentre$eve$Eve$MPath = function (a) {
	return {ctor: 'MPath', _0: a};
};
var _gicentre$eve$Eve$MCondition = F3(
	function (a, b, c) {
		return {ctor: 'MCondition', _0: a, _1: b, _2: c};
	});
var _gicentre$eve$Eve$MLegend = function (a) {
	return {ctor: 'MLegend', _0: a};
};
var _gicentre$eve$Eve$MAggregate = function (a) {
	return {ctor: 'MAggregate', _0: a};
};
var _gicentre$eve$Eve$MTimeUnit = function (a) {
	return {ctor: 'MTimeUnit', _0: a};
};
var _gicentre$eve$Eve$MBin = function (a) {
	return {ctor: 'MBin', _0: a};
};
var _gicentre$eve$Eve$MScale = function (a) {
	return {ctor: 'MScale', _0: a};
};
var _gicentre$eve$Eve$MmType = function (a) {
	return {ctor: 'MmType', _0: a};
};
var _gicentre$eve$Eve$MRepeat = function (a) {
	return {ctor: 'MRepeat', _0: a};
};
var _gicentre$eve$Eve$MName = function (a) {
	return {ctor: 'MName', _0: a};
};
var _gicentre$eve$Eve$Vertical = {ctor: 'Vertical'};
var _gicentre$eve$Eve$Horizontal = {ctor: 'Horizontal'};
var _gicentre$eve$Eve$MThickness = function (a) {
	return {ctor: 'MThickness', _0: a};
};
var _gicentre$eve$Eve$MTheta = function (a) {
	return {ctor: 'MTheta', _0: a};
};
var _gicentre$eve$Eve$MText = function (a) {
	return {ctor: 'MText', _0: a};
};
var _gicentre$eve$Eve$MTension = function (a) {
	return {ctor: 'MTension', _0: a};
};
var _gicentre$eve$Eve$MStyle = function (a) {
	return {ctor: 'MStyle', _0: a};
};
var _gicentre$eve$Eve$MStrokeWidth = function (a) {
	return {ctor: 'MStrokeWidth', _0: a};
};
var _gicentre$eve$Eve$MStrokeOpacity = function (a) {
	return {ctor: 'MStrokeOpacity', _0: a};
};
var _gicentre$eve$Eve$MStrokeDashOffset = function (a) {
	return {ctor: 'MStrokeDashOffset', _0: a};
};
var _gicentre$eve$Eve$MStrokeDash = function (a) {
	return {ctor: 'MStrokeDash', _0: a};
};
var _gicentre$eve$Eve$MStroke = function (a) {
	return {ctor: 'MStroke', _0: a};
};
var _gicentre$eve$Eve$MSize = function (a) {
	return {ctor: 'MSize', _0: a};
};
var _gicentre$eve$Eve$MShortTimeLabels = function (a) {
	return {ctor: 'MShortTimeLabels', _0: a};
};
var _gicentre$eve$Eve$MShape = function (a) {
	return {ctor: 'MShape', _0: a};
};
var _gicentre$eve$Eve$MRadius = function (a) {
	return {ctor: 'MRadius', _0: a};
};
var _gicentre$eve$Eve$MOrient = function (a) {
	return {ctor: 'MOrient', _0: a};
};
var _gicentre$eve$Eve$MOpacity = function (a) {
	return {ctor: 'MOpacity', _0: a};
};
var _gicentre$eve$Eve$MInterpolate = function (a) {
	return {ctor: 'MInterpolate', _0: a};
};
var _gicentre$eve$Eve$MFontWeight = function (a) {
	return {ctor: 'MFontWeight', _0: a};
};
var _gicentre$eve$Eve$MFontStyle = function (a) {
	return {ctor: 'MFontStyle', _0: a};
};
var _gicentre$eve$Eve$MFontSize = function (a) {
	return {ctor: 'MFontSize', _0: a};
};
var _gicentre$eve$Eve$MFont = function (a) {
	return {ctor: 'MFont', _0: a};
};
var _gicentre$eve$Eve$MFillOpacity = function (a) {
	return {ctor: 'MFillOpacity', _0: a};
};
var _gicentre$eve$Eve$MFilled = function (a) {
	return {ctor: 'MFilled', _0: a};
};
var _gicentre$eve$Eve$MFill = function (a) {
	return {ctor: 'MFill', _0: a};
};
var _gicentre$eve$Eve$MdY = function (a) {
	return {ctor: 'MdY', _0: a};
};
var _gicentre$eve$Eve$MdX = function (a) {
	return {ctor: 'MdX', _0: a};
};
var _gicentre$eve$Eve$MDiscreteBandSize = function (a) {
	return {ctor: 'MDiscreteBandSize', _0: a};
};
var _gicentre$eve$Eve$MContinuousBandSize = function (a) {
	return {ctor: 'MContinuousBandSize', _0: a};
};
var _gicentre$eve$Eve$MColor = function (a) {
	return {ctor: 'MColor', _0: a};
};
var _gicentre$eve$Eve$MClip = function (a) {
	return {ctor: 'MClip', _0: a};
};
var _gicentre$eve$Eve$MBinSpacing = function (a) {
	return {ctor: 'MBinSpacing', _0: a};
};
var _gicentre$eve$Eve$MBaseline = function (a) {
	return {ctor: 'MBaseline', _0: a};
};
var _gicentre$eve$Eve$MBandSize = function (a) {
	return {ctor: 'MBandSize', _0: a};
};
var _gicentre$eve$Eve$MAngle = function (a) {
	return {ctor: 'MAngle', _0: a};
};
var _gicentre$eve$Eve$MAlign = function (a) {
	return {ctor: 'MAlign', _0: a};
};
var _gicentre$eve$Eve$Temporal = {ctor: 'Temporal'};
var _gicentre$eve$Eve$Quantitative = {ctor: 'Quantitative'};
var _gicentre$eve$Eve$Ordinal = {ctor: 'Ordinal'};
var _gicentre$eve$Eve$Nominal = {ctor: 'Nominal'};
var _gicentre$eve$Eve$Dec = {ctor: 'Dec'};
var _gicentre$eve$Eve$Nov = {ctor: 'Nov'};
var _gicentre$eve$Eve$Oct = {ctor: 'Oct'};
var _gicentre$eve$Eve$Sep = {ctor: 'Sep'};
var _gicentre$eve$Eve$Aug = {ctor: 'Aug'};
var _gicentre$eve$Eve$Jul = {ctor: 'Jul'};
var _gicentre$eve$Eve$Jun = {ctor: 'Jun'};
var _gicentre$eve$Eve$May = {ctor: 'May'};
var _gicentre$eve$Eve$Apr = {ctor: 'Apr'};
var _gicentre$eve$Eve$Mar = {ctor: 'Mar'};
var _gicentre$eve$Eve$Feb = {ctor: 'Feb'};
var _gicentre$eve$Eve$Jan = {ctor: 'Jan'};
var _gicentre$eve$Eve$VarianceP = {ctor: 'VarianceP'};
var _gicentre$eve$Eve$Variance = {ctor: 'Variance'};
var _gicentre$eve$Eve$Valid = {ctor: 'Valid'};
var _gicentre$eve$Eve$Sum = {ctor: 'Sum'};
var _gicentre$eve$Eve$StdevP = {ctor: 'StdevP'};
var _gicentre$eve$Eve$Stdev = {ctor: 'Stdev'};
var _gicentre$eve$Eve$Stderr = {ctor: 'Stderr'};
var _gicentre$eve$Eve$Q3 = {ctor: 'Q3'};
var _gicentre$eve$Eve$Q1 = {ctor: 'Q1'};
var _gicentre$eve$Eve$Missing = {ctor: 'Missing'};
var _gicentre$eve$Eve$Min = {ctor: 'Min'};
var _gicentre$eve$Eve$Median = {ctor: 'Median'};
var _gicentre$eve$Eve$Mean = {ctor: 'Mean'};
var _gicentre$eve$Eve$Max = {ctor: 'Max'};
var _gicentre$eve$Eve$Distinct = {ctor: 'Distinct'};
var _gicentre$eve$Eve$Count = {ctor: 'Count'};
var _gicentre$eve$Eve$CI1 = {ctor: 'CI1'};
var _gicentre$eve$Eve$CI0 = {ctor: 'CI0'};
var _gicentre$eve$Eve$Average = {ctor: 'Average'};
var _gicentre$eve$Eve$OSort = function (a) {
	return {ctor: 'OSort', _0: a};
};
var _gicentre$eve$Eve$OTimeUnit = function (a) {
	return {ctor: 'OTimeUnit', _0: a};
};
var _gicentre$eve$Eve$OAggregate = function (a) {
	return {ctor: 'OAggregate', _0: a};
};
var _gicentre$eve$Eve$OBin = function (a) {
	return {ctor: 'OBin', _0: a};
};
var _gicentre$eve$Eve$OmType = function (a) {
	return {ctor: 'OmType', _0: a};
};
var _gicentre$eve$Eve$ORepeat = function (a) {
	return {ctor: 'ORepeat', _0: a};
};
var _gicentre$eve$Eve$OName = function (a) {
	return {ctor: 'OName', _0: a};
};
var _gicentre$eve$Eve$OGreedy = {ctor: 'OGreedy'};
var _gicentre$eve$Eve$OParity = {ctor: 'OParity'};
var _gicentre$eve$Eve$ONone = {ctor: 'ONone'};
var _gicentre$eve$Eve$Y2 = {ctor: 'Y2'};
var _gicentre$eve$Eve$X2 = {ctor: 'X2'};
var _gicentre$eve$Eve$Y = {ctor: 'Y'};
var _gicentre$eve$Eve$X = {ctor: 'X'};
var _gicentre$eve$Eve$PStack = function (a) {
	return {ctor: 'PStack', _0: a};
};
var _gicentre$eve$Eve$PSort = function (a) {
	return {ctor: 'PSort', _0: a};
};
var _gicentre$eve$Eve$PAxis = function (a) {
	return {ctor: 'PAxis', _0: a};
};
var _gicentre$eve$Eve$PScale = function (a) {
	return {ctor: 'PScale', _0: a};
};
var _gicentre$eve$Eve$PAggregate = function (a) {
	return {ctor: 'PAggregate', _0: a};
};
var _gicentre$eve$Eve$PTimeUnit = function (a) {
	return {ctor: 'PTimeUnit', _0: a};
};
var _gicentre$eve$Eve$PBin = function (a) {
	return {ctor: 'PBin', _0: a};
};
var _gicentre$eve$Eve$PmType = function (a) {
	return {ctor: 'PmType', _0: a};
};
var _gicentre$eve$Eve$PRepeat = function (a) {
	return {ctor: 'PRepeat', _0: a};
};
var _gicentre$eve$Eve$PName = function (a) {
	return {ctor: 'PName', _0: a};
};
var _gicentre$eve$Eve$Selection = {ctor: 'Selection'};
var _gicentre$eve$Eve$selection = function (sels) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Selection,
		_1: _elm_lang$core$Json_Encode$object(sels)
	};
};
var _gicentre$eve$Eve$Config = {ctor: 'Config'};
var _gicentre$eve$Eve$configure = function (configs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Config,
		_1: _elm_lang$core$Json_Encode$object(configs)
	};
};
var _gicentre$eve$Eve$Resolve = {ctor: 'Resolve'};
var _gicentre$eve$Eve$resolve = function (res) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Resolve,
		_1: _elm_lang$core$Json_Encode$object(res)
	};
};
var _gicentre$eve$Eve$Spec = {ctor: 'Spec'};
var _gicentre$eve$Eve$specification = function (spec) {
	return {ctor: '_Tuple2', _0: _gicentre$eve$Eve$Spec, _1: spec};
};
var _gicentre$eve$Eve$Facet = {ctor: 'Facet'};
var _gicentre$eve$Eve$facet = function (fMaps) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Facet,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$eve$Eve$facetMappingProperty, fMaps))
	};
};
var _gicentre$eve$Eve$Repeat = {ctor: 'Repeat'};
var _gicentre$eve$Eve$repeat = function (fields) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Repeat,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$eve$Eve$repeatFields, fields))
	};
};
var _gicentre$eve$Eve$VConcat = {ctor: 'VConcat'};
var _gicentre$eve$Eve$vConcat = function (specs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$VConcat,
		_1: _elm_lang$core$Json_Encode$list(specs)
	};
};
var _gicentre$eve$Eve$HConcat = {ctor: 'HConcat'};
var _gicentre$eve$Eve$hConcat = function (specs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$HConcat,
		_1: _elm_lang$core$Json_Encode$list(specs)
	};
};
var _gicentre$eve$Eve$Layer = {ctor: 'Layer'};
var _gicentre$eve$Eve$layer = function (specs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Layer,
		_1: _elm_lang$core$Json_Encode$list(specs)
	};
};
var _gicentre$eve$Eve$Encoding = {ctor: 'Encoding'};
var _gicentre$eve$Eve$encoding = function (channels) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Encoding,
		_1: _elm_lang$core$Json_Encode$object(channels)
	};
};
var _gicentre$eve$Eve$Transform = {ctor: 'Transform'};
var _gicentre$eve$Eve$transform = function (transforms) {
	var assemble = function (_p113) {
		var _p114 = _p113;
		var _p119 = _p114._1;
		var _p118 = _p114._0;
		var _p115 = _p118;
		switch (_p115) {
			case 'calculate':
				var _p116 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p119));
				if ((((_p116.ctor === 'Ok') && (_p116._0.ctor === '::')) && (_p116._0._1.ctor === '::')) && (_p116._0._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'calculate', _1: _p116._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'as', _1: _p116._0._1._0},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'aggregate':
				var _p117 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p119));
				if ((((_p117.ctor === 'Ok') && (_p117._0.ctor === '::')) && (_p117._0._1.ctor === '::')) && (_p117._0._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'aggregate', _1: _p117._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'groupby', _1: _p117._0._1._0},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			default:
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p118, _1: _p119},
						_1: {ctor: '[]'}
					});
		}
	};
	return _elm_lang$core$List$isEmpty(transforms) ? {ctor: '_Tuple2', _0: _gicentre$eve$Eve$Transform, _1: _elm_lang$core$Json_Encode$null} : {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Transform,
		_1: _elm_lang$core$Json_Encode$list(
			A2(_elm_lang$core$List$map, assemble, transforms))
	};
};
var _gicentre$eve$Eve$Mark = {ctor: 'Mark'};
var _gicentre$eve$Eve$mark = F2(
	function (mark, mProps) {
		var _p120 = mProps;
		if (_p120.ctor === '[]') {
			return {
				ctor: '_Tuple2',
				_0: _gicentre$eve$Eve$Mark,
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$eve$Eve$markLabel(mark))
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: _gicentre$eve$Eve$Mark,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string(
								_gicentre$eve$Eve$markLabel(mark))
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$eve$Eve$markProperty, mProps)
					})
			};
		}
	});
var _gicentre$eve$Eve$Data = {ctor: 'Data'};
var _gicentre$eve$Eve$dataFromColumns = F2(
	function (fmts, cols) {
		var dataArray = _elm_lang$core$Json_Encode$list(
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Json_Encode$object,
				_gicentre$eve$Eve$transpose(cols)));
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$eve$Eve$Data,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'values', _1: dataArray},
					_1: {ctor: '[]'}
				})
		} : {
			ctor: '_Tuple2',
			_0: _gicentre$eve$Eve$Data,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'values', _1: dataArray},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'format',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$format, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$eve$Eve$dataFromRows = F2(
	function (fmts, rows) {
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$eve$Eve$Data,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'values',
						_1: _elm_lang$core$Json_Encode$list(rows)
					},
					_1: {ctor: '[]'}
				})
		} : {
			ctor: '_Tuple2',
			_0: _gicentre$eve$Eve$Data,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'values',
						_1: _elm_lang$core$Json_Encode$list(rows)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'format',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$format, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$eve$Eve$dataFromUrl = F2(
	function (url, fmts) {
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$eve$Eve$Data,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'url',
						_1: _elm_lang$core$Json_Encode$string(url)
					},
					_1: {ctor: '[]'}
				})
		} : {
			ctor: '_Tuple2',
			_0: _gicentre$eve$Eve$Data,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'url',
						_1: _elm_lang$core$Json_Encode$string(url)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'format',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$eve$Eve$format, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$eve$Eve$Height = {ctor: 'Height'};
var _gicentre$eve$Eve$height = function (h) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Height,
		_1: _elm_lang$core$Json_Encode$float(h)
	};
};
var _gicentre$eve$Eve$Width = {ctor: 'Width'};
var _gicentre$eve$Eve$width = function (w) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Width,
		_1: _elm_lang$core$Json_Encode$float(w)
	};
};
var _gicentre$eve$Eve$Title = {ctor: 'Title'};
var _gicentre$eve$Eve$title = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Title,
		_1: _elm_lang$core$Json_Encode$string(s)
	};
};
var _gicentre$eve$Eve$Description = {ctor: 'Description'};
var _gicentre$eve$Eve$description = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Description,
		_1: _elm_lang$core$Json_Encode$string(s)
	};
};
var _gicentre$eve$Eve$Name = {ctor: 'Name'};
var _gicentre$eve$Eve$name = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$eve$Eve$Name,
		_1: _elm_lang$core$Json_Encode$string(s)
	};
};
var _gicentre$eve$Eve$RSymbol = function (a) {
	return {ctor: 'RSymbol', _0: a};
};
var _gicentre$eve$Eve$RRamp = function (a) {
	return {ctor: 'RRamp', _0: a};
};
var _gicentre$eve$Eve$ROrdinal = function (a) {
	return {ctor: 'ROrdinal', _0: a};
};
var _gicentre$eve$Eve$RHeatmap = function (a) {
	return {ctor: 'RHeatmap', _0: a};
};
var _gicentre$eve$Eve$RDiverging = function (a) {
	return {ctor: 'RDiverging', _0: a};
};
var _gicentre$eve$Eve$RCategory = function (a) {
	return {ctor: 'RCategory', _0: a};
};
var _gicentre$eve$Eve$ColumnFields = function (a) {
	return {ctor: 'ColumnFields', _0: a};
};
var _gicentre$eve$Eve$RowFields = function (a) {
	return {ctor: 'RowFields', _0: a};
};
var _gicentre$eve$Eve$Independent = {ctor: 'Independent'};
var _gicentre$eve$Eve$Shared = {ctor: 'Shared'};
var _gicentre$eve$Eve$RScale = function (a) {
	return {ctor: 'RScale', _0: a};
};
var _gicentre$eve$Eve$RLegend = function (a) {
	return {ctor: 'RLegend', _0: a};
};
var _gicentre$eve$Eve$RAxis = function (a) {
	return {ctor: 'RAxis', _0: a};
};
var _gicentre$eve$Eve$ScBinOrdinal = {ctor: 'ScBinOrdinal'};
var _gicentre$eve$Eve$ScBinLinear = {ctor: 'ScBinLinear'};
var _gicentre$eve$Eve$ScPoint = {ctor: 'ScPoint'};
var _gicentre$eve$Eve$ScBand = {ctor: 'ScBand'};
var _gicentre$eve$Eve$ScOrdinal = {ctor: 'ScOrdinal'};
var _gicentre$eve$Eve$ScSequential = {ctor: 'ScSequential'};
var _gicentre$eve$Eve$ScUtc = {ctor: 'ScUtc'};
var _gicentre$eve$Eve$ScTime = {ctor: 'ScTime'};
var _gicentre$eve$Eve$ScLog = {ctor: 'ScLog'};
var _gicentre$eve$Eve$ScSqrt = {ctor: 'ScSqrt'};
var _gicentre$eve$Eve$ScPow = {ctor: 'ScPow'};
var _gicentre$eve$Eve$ScLinear = {ctor: 'ScLinear'};
var _gicentre$eve$Eve$SCUseUnaggregatedDomain = function (a) {
	return {ctor: 'SCUseUnaggregatedDomain', _0: a};
};
var _gicentre$eve$Eve$SCTextXRangeStep = function (a) {
	return {ctor: 'SCTextXRangeStep', _0: a};
};
var _gicentre$eve$Eve$SCRound = function (a) {
	return {ctor: 'SCRound', _0: a};
};
var _gicentre$eve$Eve$SCRangeStep = function (a) {
	return {ctor: 'SCRangeStep', _0: a};
};
var _gicentre$eve$Eve$SCPointPadding = function (a) {
	return {ctor: 'SCPointPadding', _0: a};
};
var _gicentre$eve$Eve$SCMinStrokeWidth = function (a) {
	return {ctor: 'SCMinStrokeWidth', _0: a};
};
var _gicentre$eve$Eve$SCMaxStrokeWidth = function (a) {
	return {ctor: 'SCMaxStrokeWidth', _0: a};
};
var _gicentre$eve$Eve$SCMinSize = function (a) {
	return {ctor: 'SCMinSize', _0: a};
};
var _gicentre$eve$Eve$SCMaxSize = function (a) {
	return {ctor: 'SCMaxSize', _0: a};
};
var _gicentre$eve$Eve$SCMinOpacity = function (a) {
	return {ctor: 'SCMinOpacity', _0: a};
};
var _gicentre$eve$Eve$SCMaxOpacity = function (a) {
	return {ctor: 'SCMaxOpacity', _0: a};
};
var _gicentre$eve$Eve$SCMinFontSize = function (a) {
	return {ctor: 'SCMinFontSize', _0: a};
};
var _gicentre$eve$Eve$SCMaxFontSize = function (a) {
	return {ctor: 'SCMaxFontSize', _0: a};
};
var _gicentre$eve$Eve$SCMinBandSize = function (a) {
	return {ctor: 'SCMinBandSize', _0: a};
};
var _gicentre$eve$Eve$SCMaxBandSize = function (a) {
	return {ctor: 'SCMaxBandSize', _0: a};
};
var _gicentre$eve$Eve$SCClamp = function (a) {
	return {ctor: 'SCClamp', _0: a};
};
var _gicentre$eve$Eve$SCBandPaddingOuter = function (a) {
	return {ctor: 'SCBandPaddingOuter', _0: a};
};
var _gicentre$eve$Eve$SCBandPaddingInner = function (a) {
	return {ctor: 'SCBandPaddingInner', _0: a};
};
var _gicentre$eve$Eve$Unaggregated = {ctor: 'Unaggregated'};
var _gicentre$eve$Eve$DSelection = function (a) {
	return {ctor: 'DSelection', _0: a};
};
var _gicentre$eve$Eve$DDateTimes = function (a) {
	return {ctor: 'DDateTimes', _0: a};
};
var _gicentre$eve$Eve$DStrings = function (a) {
	return {ctor: 'DStrings', _0: a};
};
var _gicentre$eve$Eve$DNumbers = function (a) {
	return {ctor: 'DNumbers', _0: a};
};
var _gicentre$eve$Eve$NTickCount = function (a) {
	return {ctor: 'NTickCount', _0: a};
};
var _gicentre$eve$Eve$IsNice = function (a) {
	return {ctor: 'IsNice', _0: a};
};
var _gicentre$eve$Eve$NInterval = F2(
	function (a, b) {
		return {ctor: 'NInterval', _0: a, _1: b};
	});
var _gicentre$eve$Eve$NYear = {ctor: 'NYear'};
var _gicentre$eve$Eve$NMonth = {ctor: 'NMonth'};
var _gicentre$eve$Eve$NWeek = {ctor: 'NWeek'};
var _gicentre$eve$Eve$NDay = {ctor: 'NDay'};
var _gicentre$eve$Eve$NHour = {ctor: 'NHour'};
var _gicentre$eve$Eve$NMinute = {ctor: 'NMinute'};
var _gicentre$eve$Eve$NSecond = {ctor: 'NSecond'};
var _gicentre$eve$Eve$NMillisecond = {ctor: 'NMillisecond'};
var _gicentre$eve$Eve$SReverse = function (a) {
	return {ctor: 'SReverse', _0: a};
};
var _gicentre$eve$Eve$SZero = function (a) {
	return {ctor: 'SZero', _0: a};
};
var _gicentre$eve$Eve$SNice = function (a) {
	return {ctor: 'SNice', _0: a};
};
var _gicentre$eve$Eve$SInterpolate = function (a) {
	return {ctor: 'SInterpolate', _0: a};
};
var _gicentre$eve$Eve$SClamp = function (a) {
	return {ctor: 'SClamp', _0: a};
};
var _gicentre$eve$Eve$SRound = function (a) {
	return {ctor: 'SRound', _0: a};
};
var _gicentre$eve$Eve$SRangeStep = function (a) {
	return {ctor: 'SRangeStep', _0: a};
};
var _gicentre$eve$Eve$SPaddingOuter = function (a) {
	return {ctor: 'SPaddingOuter', _0: a};
};
var _gicentre$eve$Eve$SPaddingInner = function (a) {
	return {ctor: 'SPaddingInner', _0: a};
};
var _gicentre$eve$Eve$SPadding = function (a) {
	return {ctor: 'SPadding', _0: a};
};
var _gicentre$eve$Eve$SScheme = F2(
	function (a, b) {
		return {ctor: 'SScheme', _0: a, _1: b};
	});
var _gicentre$eve$Eve$SRange = function (a) {
	return {ctor: 'SRange', _0: a};
};
var _gicentre$eve$Eve$SDomain = function (a) {
	return {ctor: 'SDomain', _0: a};
};
var _gicentre$eve$Eve$SType = function (a) {
	return {ctor: 'SType', _0: a};
};
var _gicentre$eve$Eve$RName = function (a) {
	return {ctor: 'RName', _0: a};
};
var _gicentre$eve$Eve$RStrings = function (a) {
	return {ctor: 'RStrings', _0: a};
};
var _gicentre$eve$Eve$categoricalDomainMap = function (scaleDomainPairs) {
	var _p121 = _elm_lang$core$List$unzip(scaleDomainPairs);
	var domain = _p121._0;
	var range = _p121._1;
	return {
		ctor: '::',
		_0: _gicentre$eve$Eve$SDomain(
			_gicentre$eve$Eve$DStrings(domain)),
		_1: {
			ctor: '::',
			_0: _gicentre$eve$Eve$SRange(
				_gicentre$eve$Eve$RStrings(range)),
			_1: {ctor: '[]'}
		}
	};
};
var _gicentre$eve$Eve$domainRangeMap = F2(
	function (lowerMap, upperMap) {
		var _p122 = _elm_lang$core$List$unzip(
			{
				ctor: '::',
				_0: lowerMap,
				_1: {
					ctor: '::',
					_0: upperMap,
					_1: {ctor: '[]'}
				}
			});
		var domain = _p122._0;
		var range = _p122._1;
		return {
			ctor: '::',
			_0: _gicentre$eve$Eve$SDomain(
				_gicentre$eve$Eve$DNumbers(domain)),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$SRange(
					_gicentre$eve$Eve$RStrings(range)),
				_1: {ctor: '[]'}
			}
		};
	});
var _gicentre$eve$Eve$RNumbers = function (a) {
	return {ctor: 'RNumbers', _0: a};
};
var _gicentre$eve$Eve$Interval = {ctor: 'Interval'};
var _gicentre$eve$Eve$Multi = {ctor: 'Multi'};
var _gicentre$eve$Eve$Single = {ctor: 'Single'};
var _gicentre$eve$Eve$SMStrokeDashOffset = function (a) {
	return {ctor: 'SMStrokeDashOffset', _0: a};
};
var _gicentre$eve$Eve$SMStrokeDash = function (a) {
	return {ctor: 'SMStrokeDash', _0: a};
};
var _gicentre$eve$Eve$SMStrokeWidth = function (a) {
	return {ctor: 'SMStrokeWidth', _0: a};
};
var _gicentre$eve$Eve$SMStrokeOpacity = function (a) {
	return {ctor: 'SMStrokeOpacity', _0: a};
};
var _gicentre$eve$Eve$SMStroke = function (a) {
	return {ctor: 'SMStroke', _0: a};
};
var _gicentre$eve$Eve$SMFillOpacity = function (a) {
	return {ctor: 'SMFillOpacity', _0: a};
};
var _gicentre$eve$Eve$SMFill = function (a) {
	return {ctor: 'SMFill', _0: a};
};
var _gicentre$eve$Eve$Toggle = function (a) {
	return {ctor: 'Toggle', _0: a};
};
var _gicentre$eve$Eve$Nearest = function (a) {
	return {ctor: 'Nearest', _0: a};
};
var _gicentre$eve$Eve$Bind = function (a) {
	return {ctor: 'Bind', _0: a};
};
var _gicentre$eve$Eve$BindScales = {ctor: 'BindScales'};
var _gicentre$eve$Eve$SelectionMark = function (a) {
	return {ctor: 'SelectionMark', _0: a};
};
var _gicentre$eve$Eve$ResolveSelections = function (a) {
	return {ctor: 'ResolveSelections', _0: a};
};
var _gicentre$eve$Eve$Empty = {ctor: 'Empty'};
var _gicentre$eve$Eve$Encodings = function (a) {
	return {ctor: 'Encodings', _0: a};
};
var _gicentre$eve$Eve$Fields = function (a) {
	return {ctor: 'Fields', _0: a};
};
var _gicentre$eve$Eve$Zoom = function (a) {
	return {ctor: 'Zoom', _0: a};
};
var _gicentre$eve$Eve$Translate = function (a) {
	return {ctor: 'Translate', _0: a};
};
var _gicentre$eve$Eve$On = function (a) {
	return {ctor: 'On', _0: a};
};
var _gicentre$eve$Eve$Intersection = {ctor: 'Intersection'};
var _gicentre$eve$Eve$Union = {ctor: 'Union'};
var _gicentre$eve$Eve$Global = {ctor: 'Global'};
var _gicentre$eve$Eve$SRight = {ctor: 'SRight'};
var _gicentre$eve$Eve$SLeft = {ctor: 'SLeft'};
var _gicentre$eve$Eve$SBottom = {ctor: 'SBottom'};
var _gicentre$eve$Eve$STop = {ctor: 'STop'};
var _gicentre$eve$Eve$ByRepeat = function (a) {
	return {ctor: 'ByRepeat', _0: a};
};
var _gicentre$eve$Eve$ByField = function (a) {
	return {ctor: 'ByField', _0: a};
};
var _gicentre$eve$Eve$Op = function (a) {
	return {ctor: 'Op', _0: a};
};
var _gicentre$eve$Eve$Descending = {ctor: 'Descending'};
var _gicentre$eve$Eve$Ascending = {ctor: 'Ascending'};
var _gicentre$eve$Eve$NoStack = {ctor: 'NoStack'};
var _gicentre$eve$Eve$StCenter = {ctor: 'StCenter'};
var _gicentre$eve$Eve$StNormalize = {ctor: 'StNormalize'};
var _gicentre$eve$Eve$StZero = {ctor: 'StZero'};
var _gicentre$eve$Eve$Path = function (a) {
	return {ctor: 'Path', _0: a};
};
var _gicentre$eve$Eve$TriangleDown = {ctor: 'TriangleDown'};
var _gicentre$eve$Eve$TriangleUp = {ctor: 'TriangleUp'};
var _gicentre$eve$Eve$Diamond = {ctor: 'Diamond'};
var _gicentre$eve$Eve$Cross = {ctor: 'Cross'};
var _gicentre$eve$Eve$SymSquare = {ctor: 'SymSquare'};
var _gicentre$eve$Eve$SymCircle = {ctor: 'SymCircle'};
var _gicentre$eve$Eve$TFormat = function (a) {
	return {ctor: 'TFormat', _0: a};
};
var _gicentre$eve$Eve$TCondition = F3(
	function (a, b, c) {
		return {ctor: 'TCondition', _0: a, _1: b, _2: c};
	});
var _gicentre$eve$Eve$TTimeUnit = function (a) {
	return {ctor: 'TTimeUnit', _0: a};
};
var _gicentre$eve$Eve$TAggregate = function (a) {
	return {ctor: 'TAggregate', _0: a};
};
var _gicentre$eve$Eve$TBin = function (a) {
	return {ctor: 'TBin', _0: a};
};
var _gicentre$eve$Eve$TmType = function (a) {
	return {ctor: 'TmType', _0: a};
};
var _gicentre$eve$Eve$TRepeat = function (a) {
	return {ctor: 'TRepeat', _0: a};
};
var _gicentre$eve$Eve$TName = function (a) {
	return {ctor: 'TName', _0: a};
};
var _gicentre$eve$Eve$Milliseconds = {ctor: 'Milliseconds'};
var _gicentre$eve$Eve$SecondsMilliseconds = {ctor: 'SecondsMilliseconds'};
var _gicentre$eve$Eve$Seconds = {ctor: 'Seconds'};
var _gicentre$eve$Eve$MinutesSeconds = {ctor: 'MinutesSeconds'};
var _gicentre$eve$Eve$Minutes = {ctor: 'Minutes'};
var _gicentre$eve$Eve$HoursMinutesSeconds = {ctor: 'HoursMinutesSeconds'};
var _gicentre$eve$Eve$HoursMinutes = {ctor: 'HoursMinutes'};
var _gicentre$eve$Eve$Hours = {ctor: 'Hours'};
var _gicentre$eve$Eve$Day = {ctor: 'Day'};
var _gicentre$eve$Eve$Date = {ctor: 'Date'};
var _gicentre$eve$Eve$MonthDate = {ctor: 'MonthDate'};
var _gicentre$eve$Eve$Month = {ctor: 'Month'};
var _gicentre$eve$Eve$QuarterMonth = {ctor: 'QuarterMonth'};
var _gicentre$eve$Eve$Quarter = {ctor: 'Quarter'};
var _gicentre$eve$Eve$YearMonthDateHoursMinutesSeconds = {ctor: 'YearMonthDateHoursMinutesSeconds'};
var _gicentre$eve$Eve$YearMonthDateHoursMinutes = {ctor: 'YearMonthDateHoursMinutes'};
var _gicentre$eve$Eve$YearMonthDateHours = {ctor: 'YearMonthDateHours'};
var _gicentre$eve$Eve$YearMonthDate = {ctor: 'YearMonthDate'};
var _gicentre$eve$Eve$YearMonth = {ctor: 'YearMonth'};
var _gicentre$eve$Eve$YearQuarterMonth = {ctor: 'YearQuarterMonth'};
var _gicentre$eve$Eve$YearQuarter = {ctor: 'YearQuarter'};
var _gicentre$eve$Eve$Year = {ctor: 'Year'};
var _gicentre$eve$Eve$TOrient = function (a) {
	return {ctor: 'TOrient', _0: a};
};
var _gicentre$eve$Eve$TOffset = function (a) {
	return {ctor: 'TOffset', _0: a};
};
var _gicentre$eve$Eve$TLimit = function (a) {
	return {ctor: 'TLimit', _0: a};
};
var _gicentre$eve$Eve$TFontWeight = function (a) {
	return {ctor: 'TFontWeight', _0: a};
};
var _gicentre$eve$Eve$TFontSize = function (a) {
	return {ctor: 'TFontSize', _0: a};
};
var _gicentre$eve$Eve$TFont = function (a) {
	return {ctor: 'TFont', _0: a};
};
var _gicentre$eve$Eve$TColor = function (a) {
	return {ctor: 'TColor', _0: a};
};
var _gicentre$eve$Eve$TBaseline = function (a) {
	return {ctor: 'TBaseline', _0: a};
};
var _gicentre$eve$Eve$TAngle = function (a) {
	return {ctor: 'TAngle', _0: a};
};
var _gicentre$eve$Eve$TAnchor = function (a) {
	return {ctor: 'TAnchor', _0: a};
};
var _gicentre$eve$Eve$Plain = {ctor: 'Plain'};
var _gicentre$eve$Eve$Function = {ctor: 'Function'};
var _gicentre$eve$Eve$Verbal = {ctor: 'Verbal'};
var _gicentre$eve$Eve$AlignBottom = {ctor: 'AlignBottom'};
var _gicentre$eve$Eve$AlignMiddle = {ctor: 'AlignMiddle'};
var _gicentre$eve$Eve$AlignTop = {ctor: 'AlignTop'};
var _gicentre$eve$Eve$StrokeDashOffset = function (a) {
	return {ctor: 'StrokeDashOffset', _0: a};
};
var _gicentre$eve$Eve$StrokeDash = function (a) {
	return {ctor: 'StrokeDash', _0: a};
};
var _gicentre$eve$Eve$StrokeWidth = function (a) {
	return {ctor: 'StrokeWidth', _0: a};
};
var _gicentre$eve$Eve$StrokeOpacity = function (a) {
	return {ctor: 'StrokeOpacity', _0: a};
};
var _gicentre$eve$Eve$Stroke = function (a) {
	return {ctor: 'Stroke', _0: a};
};
var _gicentre$eve$Eve$FillOpacity = function (a) {
	return {ctor: 'FillOpacity', _0: a};
};
var _gicentre$eve$Eve$Fill = function (a) {
	return {ctor: 'Fill', _0: a};
};
var _gicentre$eve$Eve$Clip = function (a) {
	return {ctor: 'Clip', _0: a};
};
var _gicentre$eve$Eve$VHeight = function (a) {
	return {ctor: 'VHeight', _0: a};
};
var _gicentre$eve$Eve$VWidth = function (a) {
	return {ctor: 'VWidth', _0: a};
};

var _gicentre$eve$Walkthrough$crossFilter = function () {
	var selectedEnc = function (_p0) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$eve$Eve$color,
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$MString('goldenrod'),
							_1: {ctor: '[]'}
						},
						_p0))));
	};
	var totalEnc = function (_p1) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p1)));
	};
	var filterTrans = function (_p2) {
		return _gicentre$eve$Eve$transform(
			A2(
				_gicentre$eve$Eve$filter,
				_gicentre$eve$Eve$FSelection('brush'),
				_p2));
	};
	var sel = function (_p3) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'brush',
				_gicentre$eve$Eve$Interval,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$Encodings(
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p3));
	};
	var hourTrans = function (_p4) {
		return _gicentre$eve$Eve$transform(
			A3(_gicentre$eve$Eve$calculate, 'hours(datum.date)', 'hour', _p4));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$repeat(
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$ColumnFields(
						{
							ctor: '::',
							_0: 'hour',
							_1: {
								ctor: '::',
								_0: 'delay',
								_1: {
									ctor: '::',
									_0: 'distance',
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$specification(
					_gicentre$eve$Eve$asSpec(
						{
							ctor: '::',
							_0: A2(
								_gicentre$eve$Eve$dataFromUrl,
								'data/flights-2k.json',
								{
									ctor: '::',
									_0: _gicentre$eve$Eve$Parse(
										{
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'date',
												_1: _gicentre$eve$Eve$FoDate('%Y/%m/%d %H:%M')
											},
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: hourTrans(
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: _gicentre$eve$Eve$layer(
										{
											ctor: '::',
											_0: _gicentre$eve$Eve$asSpec(
												{
													ctor: '::',
													_0: A2(
														_gicentre$eve$Eve$mark,
														_gicentre$eve$Eve$Bar,
														{ctor: '[]'}),
													_1: {
														ctor: '::',
														_0: totalEnc(
															{ctor: '[]'}),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$eve$Eve$asSpec(
													{
														ctor: '::',
														_0: sel(
															{ctor: '[]'}),
														_1: {
															ctor: '::',
															_0: filterTrans(
																{ctor: '[]'}),
															_1: {
																ctor: '::',
																_0: A2(
																	_gicentre$eve$Eve$mark,
																	_gicentre$eve$Eve$Bar,
																	{ctor: '[]'}),
																_1: {
																	ctor: '::',
																	_0: selectedEnc(
																		{ctor: '[]'}),
																	_1: {ctor: '[]'}
																}
															}
														}
													}),
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
							}
						})),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$eve$Walkthrough$contextAndFocus = function () {
	var encDetail = function (_p5) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PScale(
								{
									ctor: '::',
									_0: _gicentre$eve$Eve$SDomain(
										_gicentre$eve$Eve$DSelection('brush')),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PAxis(
									{
										ctor: '::',
										_0: _gicentre$eve$Eve$AxTitle(''),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PName('price'),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p5)));
	};
	var specDetail = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$width(400),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Area,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: encDetail(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var encContext = function (_p6) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PAxis(
								{
									ctor: '::',
									_0: _gicentre$eve$Eve$Format('%Y'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PName('price'),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PAxis(
									{
										ctor: '::',
										_0: _gicentre$eve$Eve$TickCount(3),
										_1: {
											ctor: '::',
											_0: _gicentre$eve$Eve$Grid(false),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					_p6)));
	};
	var sel = function (_p7) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'brush',
				_gicentre$eve$Eve$Interval,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$Encodings(
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p7));
	};
	var specContext = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$width(400),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$height(80),
				_1: {
					ctor: '::',
					_0: sel(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$eve$Eve$mark,
							_gicentre$eve$Eve$Area,
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: encContext(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/sp500.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$vConcat(
					{
						ctor: '::',
						_0: specContext,
						_1: {
							ctor: '::',
							_0: specDetail,
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$eve$Walkthrough$coordinatedScatter2 = function () {
	var sel = function (_p8) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Interval,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$BindScales,
					_1: {ctor: '[]'}
				},
				_p8));
	};
	var enc = function (_p9) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$eve$Eve$color,
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$MName('Origin'),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$MmType(_gicentre$eve$Eve$Nominal),
								_1: {ctor: '[]'}
							}
						},
						_p9))));
	};
	var spec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/cars.json',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Circle,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: sel(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$repeat(
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$RowFields(
						{
							ctor: '::',
							_0: 'Displacement',
							_1: {
								ctor: '::',
								_0: 'Miles_per_Gallon',
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$ColumnFields(
							{
								ctor: '::',
								_0: 'Horsepower',
								_1: {
									ctor: '::',
									_0: 'Miles_per_Gallon',
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$specification(spec),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$eve$Walkthrough$coordinatedScatter1 = function () {
	var sel = function (_p10) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Interval,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$Encodings(
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p10));
	};
	var enc = function (_p11) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$eve$Eve$color,
						{
							ctor: '::',
							_0: A3(
								_gicentre$eve$Eve$MCondition,
								'picked',
								{
									ctor: '::',
									_0: _gicentre$eve$Eve$MName('Origin'),
									_1: {
										ctor: '::',
										_0: _gicentre$eve$Eve$MmType(_gicentre$eve$Eve$Nominal),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _gicentre$eve$Eve$MString('grey'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						_p11))));
	};
	var spec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/cars.json',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Circle,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: sel(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$repeat(
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$RowFields(
						{
							ctor: '::',
							_0: 'Displacement',
							_1: {
								ctor: '::',
								_0: 'Miles_per_Gallon',
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$ColumnFields(
							{
								ctor: '::',
								_0: 'Horsepower',
								_1: {
									ctor: '::',
									_0: 'Miles_per_Gallon',
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$specification(spec),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$eve$Walkthrough$scatterProps = function () {
	var enc = function (_p12) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$eve$Eve$color,
						{
							ctor: '::',
							_0: A3(
								_gicentre$eve$Eve$MCondition,
								'picked',
								{
									ctor: '::',
									_0: _gicentre$eve$Eve$MName('Origin'),
									_1: {
										ctor: '::',
										_0: _gicentre$eve$Eve$MmType(_gicentre$eve$Eve$Nominal),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _gicentre$eve$Eve$MString('grey'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						_p12))));
	};
	var trans = function (_p13) {
		return _gicentre$eve$Eve$transform(
			A3(_gicentre$eve$Eve$calculate, 'year(datum.Year)', 'Year', _p13));
	};
	return {
		ctor: '::',
		_0: A2(
			_gicentre$eve$Eve$dataFromUrl,
			'data/cars.json',
			{ctor: '[]'}),
		_1: {
			ctor: '::',
			_0: trans(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Circle,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		}
	};
}();
var _gicentre$eve$Walkthrough$interactiveScatter1 = function () {
	var sel = function (_p14) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Single,
				{ctor: '[]'},
				_p14));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$eve$Walkthrough$scatterProps
		});
}();
var _gicentre$eve$Walkthrough$interactiveScatter2 = function () {
	var sel = function (_p15) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Multi,
				{ctor: '[]'},
				_p15));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$eve$Walkthrough$scatterProps
		});
}();
var _gicentre$eve$Walkthrough$interactiveScatter3 = function () {
	var sel = function (_p16) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Multi,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$On('mouseover'),
					_1: {ctor: '[]'}
				},
				_p16));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$eve$Walkthrough$scatterProps
		});
}();
var _gicentre$eve$Walkthrough$interactiveScatter4 = function () {
	var sel = function (_p17) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Single,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$Empty,
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$Fields(
							{
								ctor: '::',
								_0: 'Cylinders',
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				},
				_p17));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$eve$Walkthrough$scatterProps
		});
}();
var _gicentre$eve$Walkthrough$interactiveScatter5 = function () {
	var sel = function (_p18) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Single,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$Fields(
						{
							ctor: '::',
							_0: 'Cylinders',
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$Bind(
							{
								ctor: '::',
								_0: A2(
									_gicentre$eve$Eve$IRange,
									'Cylinders',
									{
										ctor: '::',
										_0: _gicentre$eve$Eve$InMin(3),
										_1: {
											ctor: '::',
											_0: _gicentre$eve$Eve$InMax(8),
											_1: {
												ctor: '::',
												_0: _gicentre$eve$Eve$InStep(1),
												_1: {ctor: '[]'}
											}
										}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				},
				_p18));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$eve$Walkthrough$scatterProps
		});
}();
var _gicentre$eve$Walkthrough$interactiveScatter6 = function () {
	var sel = function (_p19) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Single,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$Fields(
						{
							ctor: '::',
							_0: 'Cylinders',
							_1: {
								ctor: '::',
								_0: 'Year',
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$Bind(
							{
								ctor: '::',
								_0: A2(
									_gicentre$eve$Eve$IRange,
									'Cylinders',
									{
										ctor: '::',
										_0: _gicentre$eve$Eve$InMin(3),
										_1: {
											ctor: '::',
											_0: _gicentre$eve$Eve$InMax(8),
											_1: {
												ctor: '::',
												_0: _gicentre$eve$Eve$InStep(1),
												_1: {ctor: '[]'}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_gicentre$eve$Eve$IRange,
										'Year',
										{
											ctor: '::',
											_0: _gicentre$eve$Eve$InMin(1969),
											_1: {
												ctor: '::',
												_0: _gicentre$eve$Eve$InMax(1981),
												_1: {
													ctor: '::',
													_0: _gicentre$eve$Eve$InStep(1),
													_1: {ctor: '[]'}
												}
											}
										}),
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				},
				_p19));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$eve$Walkthrough$scatterProps
		});
}();
var _gicentre$eve$Walkthrough$interactiveScatter7 = function () {
	var sel = function (_p20) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Interval,
				{ctor: '[]'},
				_p20));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$eve$Walkthrough$scatterProps
		});
}();
var _gicentre$eve$Walkthrough$interactiveScatter8 = function () {
	var sel = function (_p21) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Interval,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$Encodings(
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p21));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$eve$Walkthrough$scatterProps
		});
}();
var _gicentre$eve$Walkthrough$interactiveScatter9 = function () {
	var sel = function (_p22) {
		return _gicentre$eve$Eve$selection(
			A4(
				_gicentre$eve$Eve$select,
				'picked',
				_gicentre$eve$Eve$Interval,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$Encodings(
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$BindScales,
						_1: {ctor: '[]'}
					}
				},
				_p22));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$eve$Walkthrough$scatterProps
		});
}();
var _gicentre$eve$Walkthrough$dashboard1 = function () {
	var annotationEnc = function (_p23) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$Y,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('precipitation'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Mean),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PScale(
									{
										ctor: '::',
										_0: _gicentre$eve$Eve$SDomain(
											_gicentre$eve$Eve$DNumbers(
												{
													ctor: '::',
													_0: 0,
													_1: {
														ctor: '::',
														_0: 5.5,
														_1: {ctor: '[]'}
													}
												})),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				_p23));
	};
	var annotationSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$title('Annotation'),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$width(200),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$eve$Eve$mark,
						_gicentre$eve$Eve$Rule,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: annotationEnc(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				}
			}
		});
	var barEnc = function (_p24) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PTimeUnit(_gicentre$eve$Eve$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p24)));
	};
	var barSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$title('Bar chart'),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: barEnc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var scatterEnc = function (_p25) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p25)));
	};
	var scatterSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$title('Scatterplot'),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Point,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: scatterEnc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	var histoEnc = function (_p26) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p26)));
	};
	var histoSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$title('Frequency histogram'),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: histoEnc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$hConcat(
					{
						ctor: '::',
						_0: histoSpec,
						_1: {
							ctor: '::',
							_0: scatterSpec,
							_1: {
								ctor: '::',
								_0: barSpec,
								_1: {
									ctor: '::',
									_0: annotationSpec,
									_1: {ctor: '[]'}
								}
							}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$eve$Walkthrough$splom = function () {
	var enc = function (_p27) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p27)));
	};
	var spec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Point,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$repeat(
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$RowFields(
						{
							ctor: '::',
							_0: 'temp_max',
							_1: {
								ctor: '::',
								_0: 'precipitation',
								_1: {
									ctor: '::',
									_0: 'wind',
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$ColumnFields(
							{
								ctor: '::',
								_0: 'wind',
								_1: {
									ctor: '::',
									_0: 'precipitation',
									_1: {
										ctor: '::',
										_0: 'temp_max',
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$specification(spec),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$eve$Walkthrough$barChartTriplet = function () {
	var enc = function (_p28) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PTimeUnit(_gicentre$eve$Eve$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p28)));
	};
	var spec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$repeat(
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$RowFields(
						{
							ctor: '::',
							_0: 'precipitation',
							_1: {
								ctor: '::',
								_0: 'temp_max',
								_1: {
									ctor: '::',
									_0: 'wind',
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$specification(spec),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$eve$Walkthrough$barChartPair = function () {
	var bar2Enc = function (_p29) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PTimeUnit(_gicentre$eve$Eve$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PName('temp_max'),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p29)));
	};
	var bar2Spec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$mark,
				_gicentre$eve$Eve$Bar,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: bar2Enc(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var bar1Enc = function (_p30) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PTimeUnit(_gicentre$eve$Eve$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p30)));
	};
	var bar1Spec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$mark,
				_gicentre$eve$Eve$Bar,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: bar1Enc(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$vConcat(
					{
						ctor: '::',
						_0: bar1Spec,
						_1: {
							ctor: '::',
							_0: bar2Spec,
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$eve$Walkthrough$barChartWithAverage = function () {
	var avLineEnc = function (_p31) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$Y,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('precipitation'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Mean),
							_1: {ctor: '[]'}
						}
					}
				},
				_p31));
	};
	var avLineSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$mark,
				_gicentre$eve$Eve$Rule,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: avLineEnc(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var barEnc = function (_p32) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PTimeUnit(_gicentre$eve$Eve$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p32)));
	};
	var barSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$mark,
				_gicentre$eve$Eve$Bar,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: barEnc(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$layer(
					{
						ctor: '::',
						_0: barSpec,
						_1: {
							ctor: '::',
							_0: avLineSpec,
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$eve$Walkthrough$barChart = function () {
	var enc = function (_p33) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PTimeUnit(_gicentre$eve$Eve$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p33)));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$eve$Walkthrough$weatherColors = _gicentre$eve$Eve$categoricalDomainMap(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'sun', _1: '#e7ba52'},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'fog', _1: '#c7c7c7'},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'drizzle', _1: '#aec7ea'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'rain', _1: '#1f77b4'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'snow', _1: '#9467bd'},
						_1: {ctor: '[]'}
					}
				}
			}
		}
	});
var _gicentre$eve$Walkthrough$stackedHistogram2 = function () {
	var enc = function (_p34) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$eve$Eve$color,
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$MName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$MmType(_gicentre$eve$Eve$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$eve$Eve$MScale(_gicentre$eve$Walkthrough$weatherColors),
									_1: {ctor: '[]'}
								}
							}
						},
						_p34))));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$eve$Walkthrough$lineChart = function () {
	var enc = function (_p35) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$eve$Eve$color,
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$MName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$MmType(_gicentre$eve$Eve$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$eve$Eve$MScale(_gicentre$eve$Walkthrough$weatherColors),
									_1: {ctor: '[]'}
								}
							}
						},
						_p35))));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Line,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$eve$Walkthrough$multiBar = function () {
	var enc = function (_p36) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$eve$Eve$color,
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$MName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$MmType(_gicentre$eve$Eve$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$eve$Eve$MLegend(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _gicentre$eve$Eve$MScale(_gicentre$eve$Walkthrough$weatherColors),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						A2(
							_gicentre$eve$Eve$column,
							{
								ctor: '::',
								_0: _gicentre$eve$Eve$FName('weather'),
								_1: {
									ctor: '::',
									_0: _gicentre$eve$Eve$FmType(_gicentre$eve$Eve$Nominal),
									_1: {ctor: '[]'}
								}
							},
							_p36)))));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$eve$Walkthrough$dashboard2 = function () {
	var annotationEnc = function (_p37) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$Y,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Row),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Mean),
							_1: {ctor: '[]'}
						}
					}
				},
				_p37));
	};
	var barEnc = function (_p38) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PTimeUnit(_gicentre$eve$Eve$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p38)));
	};
	var layerSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$layer(
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$asSpec(
						{
							ctor: '::',
							_0: A2(
								_gicentre$eve$Eve$mark,
								_gicentre$eve$Eve$Bar,
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: barEnc(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$asSpec(
							{
								ctor: '::',
								_0: A2(
									_gicentre$eve$Eve$mark,
									_gicentre$eve$Eve$Rule,
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: annotationEnc(
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		});
	var barsSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$repeat(
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$RowFields(
						{
							ctor: '::',
							_0: 'precipitation',
							_1: {
								ctor: '::',
								_0: 'temp_max',
								_1: {
									ctor: '::',
									_0: 'wind',
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$specification(layerSpec),
				_1: {ctor: '[]'}
			}
		});
	var scatterEnc = function (_p39) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PRepeat(_gicentre$eve$Eve$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p39)));
	};
	var scatterSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$mark,
				_gicentre$eve$Eve$Point,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: scatterEnc(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var splomSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: _gicentre$eve$Eve$repeat(
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$RowFields(
						{
							ctor: '::',
							_0: 'temp_max',
							_1: {
								ctor: '::',
								_0: 'precipitation',
								_1: {
									ctor: '::',
									_0: 'wind',
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$ColumnFields(
							{
								ctor: '::',
								_0: 'wind',
								_1: {
									ctor: '::',
									_0: 'precipitation',
									_1: {
										ctor: '::',
										_0: 'temp_max',
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$specification(scatterSpec),
				_1: {ctor: '[]'}
			}
		});
	var histoEnc = function (_p40) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$eve$Eve$color,
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$MName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$MmType(_gicentre$eve$Eve$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$eve$Eve$MLegend(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _gicentre$eve$Eve$MScale(_gicentre$eve$Walkthrough$weatherColors),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						A2(
							_gicentre$eve$Eve$column,
							{
								ctor: '::',
								_0: _gicentre$eve$Eve$FName('weather'),
								_1: {
									ctor: '::',
									_0: _gicentre$eve$Eve$FmType(_gicentre$eve$Eve$Nominal),
									_1: {ctor: '[]'}
								}
							},
							_p40)))));
	};
	var histoSpec = _gicentre$eve$Eve$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$mark,
				_gicentre$eve$Eve$Bar,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: histoEnc(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$vConcat(
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$asSpec(
							{
								ctor: '::',
								_0: _gicentre$eve$Eve$hConcat(
									{
										ctor: '::',
										_0: splomSpec,
										_1: {
											ctor: '::',
											_0: barsSpec,
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: histoSpec,
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$eve$Walkthrough$stackedHistogram = function () {
	var enc = function (_p41) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$eve$Eve$color,
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$MName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$MmType(_gicentre$eve$Eve$Nominal),
								_1: {ctor: '[]'}
							}
						},
						_p41))));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$eve$Walkthrough$histogram = function () {
	var enc = function (_p42) {
		return _gicentre$eve$Eve$encoding(
			A3(
				_gicentre$eve$Eve$position,
				_gicentre$eve$Eve$X,
				{
					ctor: '::',
					_0: _gicentre$eve$Eve$PName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$eve$Eve$position,
					_gicentre$eve$Eve$Y,
					{
						ctor: '::',
						_0: _gicentre$eve$Eve$PAggregate(_gicentre$eve$Eve$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p42)));
	};
	return _gicentre$eve$Eve$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$dataFromUrl,
				'data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$eve$Eve$mark,
					_gicentre$eve$Eve$Bar,
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$eve$Walkthrough$stripPlot = _gicentre$eve$Eve$toVegaLite(
	{
		ctor: '::',
		_0: A2(
			_gicentre$eve$Eve$dataFromUrl,
			'data/seattle-weather.csv',
			{ctor: '[]'}),
		_1: {
			ctor: '::',
			_0: A2(
				_gicentre$eve$Eve$mark,
				_gicentre$eve$Eve$Tick,
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Eve$encoding(
					A3(
						_gicentre$eve$Eve$position,
						_gicentre$eve$Eve$X,
						{
							ctor: '::',
							_0: _gicentre$eve$Eve$PName('temp_max'),
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Eve$PmType(_gicentre$eve$Eve$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						{ctor: '[]'})),
				_1: {ctor: '[]'}
			}
		}
	});
var _gicentre$eve$Walkthrough$specs = {
	ctor: '::',
	_0: _gicentre$eve$Walkthrough$stripPlot,
	_1: {
		ctor: '::',
		_0: _gicentre$eve$Walkthrough$histogram,
		_1: {
			ctor: '::',
			_0: _gicentre$eve$Walkthrough$stackedHistogram,
			_1: {
				ctor: '::',
				_0: _gicentre$eve$Walkthrough$stackedHistogram2,
				_1: {
					ctor: '::',
					_0: _gicentre$eve$Walkthrough$lineChart,
					_1: {
						ctor: '::',
						_0: _gicentre$eve$Walkthrough$multiBar,
						_1: {
							ctor: '::',
							_0: _gicentre$eve$Walkthrough$barChart,
							_1: {
								ctor: '::',
								_0: _gicentre$eve$Walkthrough$barChartWithAverage,
								_1: {
									ctor: '::',
									_0: _gicentre$eve$Walkthrough$barChartPair,
									_1: {
										ctor: '::',
										_0: _gicentre$eve$Walkthrough$barChartTriplet,
										_1: {
											ctor: '::',
											_0: _gicentre$eve$Walkthrough$splom,
											_1: {
												ctor: '::',
												_0: _gicentre$eve$Walkthrough$dashboard1,
												_1: {
													ctor: '::',
													_0: _gicentre$eve$Walkthrough$dashboard2,
													_1: {
														ctor: '::',
														_0: _gicentre$eve$Walkthrough$interactiveScatter1,
														_1: {
															ctor: '::',
															_0: _gicentre$eve$Walkthrough$interactiveScatter2,
															_1: {
																ctor: '::',
																_0: _gicentre$eve$Walkthrough$interactiveScatter3,
																_1: {
																	ctor: '::',
																	_0: _gicentre$eve$Walkthrough$interactiveScatter4,
																	_1: {
																		ctor: '::',
																		_0: _gicentre$eve$Walkthrough$interactiveScatter5,
																		_1: {
																			ctor: '::',
																			_0: _gicentre$eve$Walkthrough$interactiveScatter6,
																			_1: {
																				ctor: '::',
																				_0: _gicentre$eve$Walkthrough$interactiveScatter7,
																				_1: {
																					ctor: '::',
																					_0: _gicentre$eve$Walkthrough$interactiveScatter8,
																					_1: {
																						ctor: '::',
																						_0: _gicentre$eve$Walkthrough$interactiveScatter9,
																						_1: {
																							ctor: '::',
																							_0: _gicentre$eve$Walkthrough$coordinatedScatter1,
																							_1: {
																								ctor: '::',
																								_0: _gicentre$eve$Walkthrough$coordinatedScatter2,
																								_1: {
																									ctor: '::',
																									_0: _gicentre$eve$Walkthrough$contextAndFocus,
																									_1: {
																										ctor: '::',
																										_0: _gicentre$eve$Walkthrough$crossFilter,
																										_1: {ctor: '[]'}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _gicentre$eve$Walkthrough$fromElm = _elm_lang$core$Native_Platform.outgoingPort(
	'fromElm',
	function (v) {
		return v;
	});
var _gicentre$eve$Walkthrough$init = function (specs) {
	return {
		ctor: '_Tuple2',
		_0: specs,
		_1: _gicentre$eve$Walkthrough$fromElm(
			_elm_lang$core$Json_Encode$list(specs))
	};
};
var _gicentre$eve$Walkthrough$main = _elm_lang$core$Platform$program(
	{
		init: _gicentre$eve$Walkthrough$init(_gicentre$eve$Walkthrough$specs),
		update: F2(
			function (_p43, model) {
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			}),
		subscriptions: function (_p44) {
			return _elm_lang$core$Platform_Sub$none;
		}
	})();
var _gicentre$eve$Walkthrough$FromElm = {ctor: 'FromElm'};

var Elm = {};
Elm['Walkthrough'] = Elm['Walkthrough'] || {};
if (typeof _gicentre$eve$Walkthrough$main !== 'undefined') {
    _gicentre$eve$Walkthrough$main(Elm['Walkthrough'], 'Walkthrough', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);



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

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
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
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
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


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _gicentre$elm_vega$Vega$vPropertyLabel = function (spec) {
	var _p0 = spec;
	switch (_p0.ctor) {
		case 'VDescription':
			return 'description';
		case 'VBackground':
			return 'background';
		case 'VTitle':
			return 'title';
		case 'VWidth':
			return 'width';
		case 'VAutosize':
			return 'autosize';
		case 'VHeight':
			return 'height';
		case 'VPadding':
			return 'padding';
		case 'VConfig':
			return 'config';
		case 'VSignals':
			return 'signals';
		case 'VData':
			return 'data';
		case 'VScales':
			return 'scales';
		case 'VProjections':
			return 'projections';
		case 'VAxes':
			return 'axes';
		case 'VLegends':
			return 'legends';
		case 'VMarks':
			return 'marks';
		case 'VEncode':
			return 'encode';
		default:
			return 'layout';
	}
};
var _gicentre$elm_vega$Vega$transpose = function (ll) {
	transpose:
	while (true) {
		var _p1 = ll;
		if (_p1.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p1._0.ctor === '[]') {
				var _v2 = _p1._1;
				ll = _v2;
				continue transpose;
			} else {
				var _p2 = _p1._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p2);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p2);
				return {
					ctor: '::',
					_0: {ctor: '::', _0: _p1._0._0, _1: heads},
					_1: _gicentre$elm_vega$Vega$transpose(
						{ctor: '::', _0: _p1._0._1, _1: tails})
				};
			}
		}
	}
};
var _gicentre$elm_vega$Vega$symbolLabel = function (sym) {
	var _p3 = sym;
	switch (_p3.ctor) {
		case 'SymCircle':
			return 'circle';
		case 'SymSquare':
			return 'square';
		case 'SymCross':
			return 'cross';
		case 'SymDiamond':
			return 'diamond';
		case 'SymTriangleUp':
			return 'triangle-up';
		case 'SymTriangleDown':
			return 'triangle-down';
		case 'SymTriangleRight':
			return 'triangle-right';
		case 'SymTriangleLeft':
			return 'triangle-left';
		case 'SymPath':
			return _p3._0;
		default:
			return A2(_elm_lang$core$Debug$log, 'Warning: Attempting to provide a signal name to signalValue', _p3._0);
	}
};
var _gicentre$elm_vega$Vega$signalReferenceProperty = function (sigRef) {
	return {
		ctor: '_Tuple2',
		_0: 'signal',
		_1: _elm_lang$core$Json_Encode$string(sigRef)
	};
};
var _gicentre$elm_vega$Vega$spiralSpec = function (sp) {
	var _p4 = sp;
	switch (_p4.ctor) {
		case 'Archimedean':
			return _elm_lang$core$Json_Encode$string('archimedean');
		case 'Rectangular':
			return _elm_lang$core$Json_Encode$string('rectangular');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p4._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$stackOffsetSpec = function (off) {
	var _p5 = off;
	switch (_p5.ctor) {
		case 'OfZero':
			return _elm_lang$core$Json_Encode$string('zero');
		case 'OfCenter':
			return _elm_lang$core$Json_Encode$string('center');
		case 'OfNormalize':
			return _elm_lang$core$Json_Encode$string('normalize');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p5._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$symbolSpec = function (sym) {
	var _p6 = sym;
	if (_p6.ctor === 'SymbolSignal') {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p6._0),
				_1: {ctor: '[]'}
			});
	} else {
		return _elm_lang$core$Json_Encode$string(
			_gicentre$elm_vega$Vega$symbolLabel(sym));
	}
};
var _gicentre$elm_vega$Vega$teMethodSpec = function (m) {
	var _p7 = m;
	switch (_p7.ctor) {
		case 'Tidy':
			return _elm_lang$core$Json_Encode$string('tidy');
		case 'Cluster':
			return _elm_lang$core$Json_Encode$string('cluster');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p7._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$timeUnitSpec = function (tu) {
	var timeUnitLabel = function (tu) {
		var _p8 = tu;
		switch (_p8.ctor) {
			case 'Year':
				return 'year';
			case 'Month':
				return 'month';
			case 'Week':
				return 'week';
			case 'Day':
				return 'day';
			case 'Hour':
				return 'hour';
			case 'Minute':
				return 'minute';
			case 'Second':
				return 'second';
			case 'Millisecond':
				return 'millisecond';
			default:
				return '';
		}
	};
	var _p9 = tu;
	if (_p9.ctor === 'TimeUnitSignal') {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p9._0),
				_1: {ctor: '[]'}
			});
	} else {
		return _elm_lang$core$Json_Encode$string(
			timeUnitLabel(tu));
	}
};
var _gicentre$elm_vega$Vega$titleFrameSpec = function (tf) {
	var _p10 = tf;
	switch (_p10.ctor) {
		case 'FrGroup':
			return _elm_lang$core$Json_Encode$string('group');
		case 'FrBounds':
			return _elm_lang$core$Json_Encode$string('bounds');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p10._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$tmMethodSpec = function (m) {
	var _p11 = m;
	switch (_p11.ctor) {
		case 'Squarify':
			return _elm_lang$core$Json_Encode$string('squarify');
		case 'Resquarify':
			return _elm_lang$core$Json_Encode$string('resquarify');
		case 'Binary':
			return _elm_lang$core$Json_Encode$string('binary');
		case 'Dice':
			return _elm_lang$core$Json_Encode$string('dice');
		case 'Slice':
			return _elm_lang$core$Json_Encode$string('slice');
		case 'SliceDice':
			return _elm_lang$core$Json_Encode$string('slicedice');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p11._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$vAlignSpec = function (align) {
	var _p12 = align;
	switch (_p12.ctor) {
		case 'AlignTop':
			return _elm_lang$core$Json_Encode$string('top');
		case 'AlignMiddle':
			return _elm_lang$core$Json_Encode$string('middle');
		case 'AlignBottom':
			return _elm_lang$core$Json_Encode$string('bottom');
		case 'Alphabetic':
			return _elm_lang$core$Json_Encode$string('alphabetic');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p12._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$wOperationSpec = function (wnOp) {
	var _p13 = wnOp;
	switch (_p13.ctor) {
		case 'RowNumber':
			return _elm_lang$core$Json_Encode$string('row_number');
		case 'Rank':
			return _elm_lang$core$Json_Encode$string('rank');
		case 'DenseRank':
			return _elm_lang$core$Json_Encode$string('dense_rank');
		case 'PercentRank':
			return _elm_lang$core$Json_Encode$string('percent_rank');
		case 'CumeDist':
			return _elm_lang$core$Json_Encode$string('cume_dist');
		case 'Ntile':
			return _elm_lang$core$Json_Encode$string('ntile');
		case 'Lag':
			return _elm_lang$core$Json_Encode$string('lag');
		case 'Lead':
			return _elm_lang$core$Json_Encode$string('lead');
		case 'FirstValue':
			return _elm_lang$core$Json_Encode$string('first_value');
		case 'LastValue':
			return _elm_lang$core$Json_Encode$string('last_value');
		case 'NthValue':
			return _elm_lang$core$Json_Encode$string('nth_value');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p13._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$sideSpec = function (orient) {
	var _p14 = orient;
	switch (_p14.ctor) {
		case 'SLeft':
			return _elm_lang$core$Json_Encode$string('left');
		case 'SBottom':
			return _elm_lang$core$Json_Encode$string('bottom');
		case 'SRight':
			return _elm_lang$core$Json_Encode$string('right');
		case 'STop':
			return _elm_lang$core$Json_Encode$string('top');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p14._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$scaleSpec = function (scType) {
	var _p15 = scType;
	switch (_p15.ctor) {
		case 'ScLinear':
			return _elm_lang$core$Json_Encode$string('linear');
		case 'ScPow':
			return _elm_lang$core$Json_Encode$string('pow');
		case 'ScSqrt':
			return _elm_lang$core$Json_Encode$string('sqrt');
		case 'ScLog':
			return _elm_lang$core$Json_Encode$string('log');
		case 'ScTime':
			return _elm_lang$core$Json_Encode$string('time');
		case 'ScUtc':
			return _elm_lang$core$Json_Encode$string('utc');
		case 'ScSequential':
			return _elm_lang$core$Json_Encode$string('sequential');
		case 'ScOrdinal':
			return _elm_lang$core$Json_Encode$string('ordinal');
		case 'ScBand':
			return _elm_lang$core$Json_Encode$string('band');
		case 'ScPoint':
			return _elm_lang$core$Json_Encode$string('point');
		case 'ScBinLinear':
			return _elm_lang$core$Json_Encode$string('bin-linear');
		case 'ScBinOrdinal':
			return _elm_lang$core$Json_Encode$string('bin-ordinal');
		case 'ScQuantile':
			return _elm_lang$core$Json_Encode$string('quantile');
		case 'ScQuantize':
			return _elm_lang$core$Json_Encode$string('quantize');
		case 'ScCustom':
			return _elm_lang$core$Json_Encode$string(_p15._0);
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p15._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$paddingSpec = function (pad) {
	var _p16 = pad;
	if (_p16.ctor === 'PSize') {
		return _elm_lang$core$Json_Encode$float(_p16._0);
	} else {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'left',
					_1: _elm_lang$core$Json_Encode$float(_p16._0)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'top',
						_1: _elm_lang$core$Json_Encode$float(_p16._1)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'right',
							_1: _elm_lang$core$Json_Encode$float(_p16._2)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'bottom',
								_1: _elm_lang$core$Json_Encode$float(_p16._3)
							},
							_1: {ctor: '[]'}
						}
					}
				}
			});
	}
};
var _gicentre$elm_vega$Vega$overlapStrategySpec = function (strat) {
	var _p17 = strat;
	switch (_p17.ctor) {
		case 'ONone':
			return _elm_lang$core$Json_Encode$string('false');
		case 'OParity':
			return _elm_lang$core$Json_Encode$string('parity');
		case 'OGreedy':
			return _elm_lang$core$Json_Encode$string('greedy');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p17._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$orientationSpec = function (orient) {
	var _p18 = orient;
	switch (_p18.ctor) {
		case 'Horizontal':
			return _elm_lang$core$Json_Encode$string('horizontal');
		case 'Vertical':
			return _elm_lang$core$Json_Encode$string('vertical');
		case 'Radial':
			return _elm_lang$core$Json_Encode$string('radial');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p18._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$orderSpec = function (order) {
	var _p19 = order;
	switch (_p19.ctor) {
		case 'Ascend':
			return _elm_lang$core$Json_Encode$string('ascending');
		case 'Descend':
			return _elm_lang$core$Json_Encode$string('descending');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p19._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$opSpec = function (op) {
	var _p20 = op;
	switch (_p20.ctor) {
		case 'ArgMax':
			return _elm_lang$core$Json_Encode$string('argmax');
		case 'ArgMin':
			return _elm_lang$core$Json_Encode$string('argmin');
		case 'Average':
			return _elm_lang$core$Json_Encode$string('average');
		case 'Count':
			return _elm_lang$core$Json_Encode$string('count');
		case 'CI0':
			return _elm_lang$core$Json_Encode$string('ci0');
		case 'CI1':
			return _elm_lang$core$Json_Encode$string('ci1');
		case 'Distinct':
			return _elm_lang$core$Json_Encode$string('distinct');
		case 'Max':
			return _elm_lang$core$Json_Encode$string('max');
		case 'Mean':
			return _elm_lang$core$Json_Encode$string('mean');
		case 'Median':
			return _elm_lang$core$Json_Encode$string('median');
		case 'Min':
			return _elm_lang$core$Json_Encode$string('min');
		case 'Missing':
			return _elm_lang$core$Json_Encode$string('missing');
		case 'Q1':
			return _elm_lang$core$Json_Encode$string('q1');
		case 'Q3':
			return _elm_lang$core$Json_Encode$string('q3');
		case 'Stdev':
			return _elm_lang$core$Json_Encode$string('stdev');
		case 'Stdevp':
			return _elm_lang$core$Json_Encode$string('stdevp');
		case 'Sum':
			return _elm_lang$core$Json_Encode$string('sum');
		case 'Stderr':
			return _elm_lang$core$Json_Encode$string('stderr');
		case 'Valid':
			return _elm_lang$core$Json_Encode$string('valid');
		case 'Variance':
			return _elm_lang$core$Json_Encode$string('variance');
		case 'Variancep':
			return _elm_lang$core$Json_Encode$string('variancep');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p20._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$niceSpec = function (ni) {
	var _p21 = ni;
	switch (_p21.ctor) {
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
						_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p21._0)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'step',
							_1: _elm_lang$core$Json_Encode$int(_p21._1)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'NTrue':
			return _elm_lang$core$Json_Encode$bool(true);
		case 'NFalse':
			return _elm_lang$core$Json_Encode$bool(false);
		case 'NTickCount':
			return _elm_lang$core$Json_Encode$int(_p21._0);
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p21._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$markLabel = function (m) {
	var _p22 = m;
	switch (_p22.ctor) {
		case 'Arc':
			return 'arc';
		case 'Area':
			return 'area';
		case 'Image':
			return 'image';
		case 'Group':
			return 'group';
		case 'Line':
			return 'line';
		case 'Path':
			return 'path';
		case 'Rect':
			return 'rect';
		case 'Rule':
			return 'rule';
		case 'Shape':
			return 'shape';
		case 'Symbol':
			return 'symbol';
		case 'Text':
			return 'text';
		default:
			return 'trail';
	}
};
var _gicentre$elm_vega$Vega$linkShapeSpec = function (ls) {
	var _p23 = ls;
	switch (_p23.ctor) {
		case 'LinkLine':
			return _elm_lang$core$Json_Encode$string('line');
		case 'LinkArc':
			return _elm_lang$core$Json_Encode$string('arc');
		case 'LinkCurve':
			return _elm_lang$core$Json_Encode$string('curve');
		case 'LinkDiagonal':
			return _elm_lang$core$Json_Encode$string('diagonal');
		case 'LinkOrthogonal':
			return _elm_lang$core$Json_Encode$string('orthogonal');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p23._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$legendTypeSpec = function (lt) {
	var _p24 = lt;
	switch (_p24.ctor) {
		case 'LSymbol':
			return _elm_lang$core$Json_Encode$string('symbol');
		case 'LGradient':
			return _elm_lang$core$Json_Encode$string('gradient');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p24._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$legendOrientSpec = function (orient) {
	var _p25 = orient;
	switch (_p25.ctor) {
		case 'Left':
			return _elm_lang$core$Json_Encode$string('left');
		case 'TopLeft':
			return _elm_lang$core$Json_Encode$string('top-left');
		case 'Top':
			return _elm_lang$core$Json_Encode$string('top');
		case 'TopRight':
			return _elm_lang$core$Json_Encode$string('top-right');
		case 'Right':
			return _elm_lang$core$Json_Encode$string('right');
		case 'BottomRight':
			return _elm_lang$core$Json_Encode$string('bottom-right');
		case 'Bottom':
			return _elm_lang$core$Json_Encode$string('bottom');
		case 'BottomLeft':
			return _elm_lang$core$Json_Encode$string('bottom-left');
		case 'None':
			return _elm_lang$core$Json_Encode$string('none');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p25._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$interpolateSpec = function (iType) {
	var _p26 = iType;
	switch (_p26.ctor) {
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
							_1: _elm_lang$core$Json_Encode$float(_p26._0)
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
							_1: _elm_lang$core$Json_Encode$float(_p26._0)
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
							_1: _elm_lang$core$Json_Encode$float(_p26._0)
						},
						_1: {ctor: '[]'}
					}
				});
	}
};
var _gicentre$elm_vega$Vega$imputeMethodLabel = function (im) {
	var _p27 = im;
	switch (_p27.ctor) {
		case 'ByValue':
			return 'value';
		case 'ByMean':
			return 'mean';
		case 'ByMedian':
			return 'median';
		case 'ByMax':
			return 'max';
		default:
			return 'min';
	}
};
var _gicentre$elm_vega$Vega$hAlignSpec = function (align) {
	var _p28 = align;
	switch (_p28.ctor) {
		case 'AlignLeft':
			return _elm_lang$core$Json_Encode$string('left');
		case 'AlignCenter':
			return _elm_lang$core$Json_Encode$string('center');
		case 'AlignRight':
			return _elm_lang$core$Json_Encode$string('right');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p28._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$gridAlignSpec = function (ga) {
	var _p29 = ga;
	switch (_p29.ctor) {
		case 'AlignAll':
			return _elm_lang$core$Json_Encode$string('all');
		case 'AlignEach':
			return _elm_lang$core$Json_Encode$string('each');
		case 'AlignNone':
			return _elm_lang$core$Json_Encode$string('none');
		case 'AlignRow':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'row',
						_1: _gicentre$elm_vega$Vega$gridAlignSpec(_p29._0)
					},
					_1: {ctor: '[]'}
				});
		case 'AlignColumn':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'column',
						_1: _gicentre$elm_vega$Vega$gridAlignSpec(_p29._0)
					},
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p29._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$formulaUpdateSpec = function (update) {
	var _p30 = update;
	if (_p30.ctor === 'InitOnly') {
		return _elm_lang$core$Json_Encode$bool(true);
	} else {
		return _elm_lang$core$Json_Encode$bool(false);
	}
};
var _gicentre$elm_vega$Vega$foDataTypeSpec = function (dType) {
	var _p31 = dType;
	switch (_p31.ctor) {
		case 'FoNum':
			return _elm_lang$core$Json_Encode$string('number');
		case 'FoBoo':
			return _elm_lang$core$Json_Encode$string('boolean');
		case 'FoDate':
			var _p32 = _p31._0;
			return _elm_lang$core$Native_Utils.eq(_p32, '') ? _elm_lang$core$Json_Encode$string('date') : _elm_lang$core$Json_Encode$string(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'date:\'',
					A2(_elm_lang$core$Basics_ops['++'], _p32, '\'')));
		default:
			var _p33 = _p31._0;
			return _elm_lang$core$Native_Utils.eq(_p33, '') ? _elm_lang$core$Json_Encode$string('utc') : _elm_lang$core$Json_Encode$string(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'utc:\'',
					A2(_elm_lang$core$Basics_ops['++'], _p33, '\'')));
	}
};
var _gicentre$elm_vega$Vega$expressionSpec = function (expr) {
	return _elm_lang$core$Json_Encode$string(expr);
};
var _gicentre$elm_vega$Vega$triggerProperties = function (trans) {
	var _p34 = trans;
	switch (_p34.ctor) {
		case 'TgTrigger':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'trigger',
					_1: _gicentre$elm_vega$Vega$expressionSpec(_p34._0)
				},
				_1: {ctor: '[]'}
			};
		case 'TgInsert':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'insert',
					_1: _gicentre$elm_vega$Vega$expressionSpec(_p34._0)
				},
				_1: {ctor: '[]'}
			};
		case 'TgRemove':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'remove',
					_1: _gicentre$elm_vega$Vega$expressionSpec(_p34._0)
				},
				_1: {ctor: '[]'}
			};
		case 'TgRemoveAll':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'remove',
					_1: _elm_lang$core$Json_Encode$bool(true)
				},
				_1: {ctor: '[]'}
			};
		case 'TgToggle':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'toggle',
					_1: _gicentre$elm_vega$Vega$expressionSpec(_p34._0)
				},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'modify',
					_1: _gicentre$elm_vega$Vega$expressionSpec(_p34._0)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'values',
						_1: _gicentre$elm_vega$Vega$expressionSpec(_p34._1)
					},
					_1: {ctor: '[]'}
				}
			};
	}
};
var _gicentre$elm_vega$Vega$exprProperty = function (expr) {
	var _p35 = expr;
	if (_p35.ctor === 'ExField') {
		return {
			ctor: '_Tuple2',
			_0: 'field',
			_1: _elm_lang$core$Json_Encode$string(_p35._0)
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'expr',
			_1: _gicentre$elm_vega$Vega$expressionSpec(_p35._0)
		};
	}
};
var _gicentre$elm_vega$Vega$numSpec = function (num) {
	var _p36 = num;
	switch (_p36.ctor) {
		case 'Num':
			return _elm_lang$core$Json_Encode$float(_p36._0);
		case 'Nums':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p36._0));
		case 'NumSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p36._0),
					_1: {ctor: '[]'}
				});
		case 'NumSignals':
			return _elm_lang$core$Json_Encode$list(
				A2(
					_elm_lang$core$List$map,
					function (sig) {
						return _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$signalReferenceProperty(sig),
								_1: {ctor: '[]'}
							});
					},
					_p36._0));
		case 'NumExpr':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$exprProperty(_p36._0),
					_1: {ctor: '[]'}
				});
		case 'NumList':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$numSpec, _p36._0));
		default:
			return _elm_lang$core$Json_Encode$null;
	}
};
var _gicentre$elm_vega$Vega$voronoiProperty = function (vp) {
	var numPairSpec = function (ns) {
		var _p37 = ns;
		_v35_4:
		do {
			switch (_p37.ctor) {
				case 'Nums':
					if (((_p37._0.ctor === '::') && (_p37._0._1.ctor === '::')) && (_p37._0._1._1.ctor === '[]')) {
						return _gicentre$elm_vega$Vega$numSpec(ns);
					} else {
						break _v35_4;
					}
				case 'NumSignal':
					return _gicentre$elm_vega$Vega$numSpec(ns);
				case 'NumSignals':
					if (((_p37._0.ctor === '::') && (_p37._0._1.ctor === '::')) && (_p37._0._1._1.ctor === '[]')) {
						return _gicentre$elm_vega$Vega$numSpec(ns);
					} else {
						break _v35_4;
					}
				case 'NumList':
					if (((_p37._0.ctor === '::') && (_p37._0._1.ctor === '::')) && (_p37._0._1._1.ctor === '[]')) {
						return _gicentre$elm_vega$Vega$numSpec(ns);
					} else {
						break _v35_4;
					}
				default:
					break _v35_4;
			}
		} while(false);
		return A2(
			_elm_lang$core$Debug$log,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'Warning: voProperty expecting list of 2 numbers but was given ',
				_elm_lang$core$Basics$toString(ns)),
			_elm_lang$core$Json_Encode$null);
	};
	var _p38 = vp;
	switch (_p38.ctor) {
		case 'VoExtent':
			return {
				ctor: '_Tuple2',
				_0: 'extent',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: numPairSpec(_p38._0),
						_1: {
							ctor: '::',
							_0: numPairSpec(_p38._1),
							_1: {ctor: '[]'}
						}
					})
			};
		case 'VoSize':
			return {
				ctor: '_Tuple2',
				_0: 'size',
				_1: numPairSpec(_p38._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$string(_p38._0)
			};
	}
};
var _gicentre$elm_vega$Vega$strSpec = function (str) {
	var _p39 = str;
	switch (_p39.ctor) {
		case 'Str':
			return _elm_lang$core$Json_Encode$string(_p39._0);
		case 'Strs':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p39._0));
		case 'StrList':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$strSpec, _p39._0));
		case 'StrSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p39._0),
					_1: {ctor: '[]'}
				});
		case 'StrSignals':
			return _elm_lang$core$Json_Encode$list(
				A2(
					_elm_lang$core$List$map,
					function (sig) {
						return _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$signalReferenceProperty(sig),
								_1: {ctor: '[]'}
							});
					},
					_p39._0));
		case 'StrExpr':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$exprProperty(_p39._0),
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$null;
	}
};
var _gicentre$elm_vega$Vega$formatProperty = function (fmt) {
	var _p40 = fmt;
	switch (_p40.ctor) {
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
		case 'JSONProperty':
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
						_0: 'property',
						_1: _gicentre$elm_vega$Vega$strSpec(_p40._0)
					},
					_1: {ctor: '[]'}
				}
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
		case 'DSV':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('dsv')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'delimiter',
						_1: _gicentre$elm_vega$Vega$strSpec(_p40._0)
					},
					_1: {ctor: '[]'}
				}
			};
		case 'TopojsonFeature':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('topojson')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'feature',
						_1: _gicentre$elm_vega$Vega$strSpec(_p40._0)
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
					_1: _elm_lang$core$Json_Encode$string('topojson')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'mesh',
						_1: _gicentre$elm_vega$Vega$strSpec(_p40._0)
					},
					_1: {ctor: '[]'}
				}
			};
		case 'Parse':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'parse',
					_1: _elm_lang$core$Json_Encode$object(
						A2(
							_elm_lang$core$List$map,
							function (_p41) {
								var _p42 = _p41;
								return {
									ctor: '_Tuple2',
									_0: _p42._0,
									_1: _gicentre$elm_vega$Vega$foDataTypeSpec(_p42._1)
								};
							},
							_p40._0))
				},
				_1: {ctor: '[]'}
			};
		case 'ParseAuto':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'parse',
					_1: _elm_lang$core$Json_Encode$string('auto')
				},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p40._0),
				_1: {ctor: '[]'}
			};
	}
};
var _gicentre$elm_vega$Vega$sortProperty = function (sp) {
	var _p43 = sp;
	switch (_p43.ctor) {
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
				_1: _gicentre$elm_vega$Vega$strSpec(_p43._0)
			};
		case 'Op':
			return {
				ctor: '_Tuple2',
				_0: 'op',
				_1: _gicentre$elm_vega$Vega$opSpec(_p43._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'order',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p43._0),
						_1: {ctor: '[]'}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$eventTypeLabel = function (et) {
	var _p44 = et;
	switch (_p44.ctor) {
		case 'Click':
			return 'click';
		case 'DblClick':
			return 'dblclick';
		case 'DragEnter':
			return 'dragenter';
		case 'DragLeave':
			return 'dragleave';
		case 'DragOver':
			return 'dragover';
		case 'KeyDown':
			return 'keydown';
		case 'KeyPress':
			return 'keypress';
		case 'KeyUp':
			return 'keyup';
		case 'MouseDown':
			return 'mousedown';
		case 'MouseMove':
			return 'mousemove';
		case 'MouseOut':
			return 'mouseout';
		case 'MouseOver':
			return 'mouseover';
		case 'MouseUp':
			return 'mouseup';
		case 'MouseWheel':
			return 'mousewheel';
		case 'TouchEnd':
			return 'touchend';
		case 'TouchMove':
			return 'touchmove';
		case 'TouchStart':
			return 'touchstart';
		case 'Wheel':
			return 'wheel';
		default:
			return 'timer';
	}
};
var _gicentre$elm_vega$Vega$eventSourceLabel = function (es) {
	var _p45 = es;
	switch (_p45.ctor) {
		case 'ESAll':
			return '*';
		case 'ESView':
			return 'view';
		case 'ESScope':
			return 'scope';
		case 'ESWindow':
			return 'window';
		default:
			return _p45._0;
	}
};
var _gicentre$elm_vega$Vega$crossProperty = function (crProp) {
	var _p46 = crProp;
	if (_p46.ctor === 'CrFilter') {
		return {
			ctor: '_Tuple2',
			_0: 'filter',
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$exprProperty(_p46._0),
					_1: {ctor: '[]'}
				})
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'as',
			_1: _elm_lang$core$Json_Encode$list(
				{
					ctor: '::',
					_0: _elm_lang$core$Json_Encode$string(_p46._0),
					_1: {
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(_p46._1),
						_1: {ctor: '[]'}
					}
				})
		};
	}
};
var _gicentre$elm_vega$Vega$caseLabel = function (c) {
	var _p47 = c;
	switch (_p47.ctor) {
		case 'Lowercase':
			return 'lower';
		case 'Uppercase':
			return 'upper';
		default:
			return 'mixed';
	}
};
var _gicentre$elm_vega$Vega$countPatternProperty = function (cpProp) {
	var _p48 = cpProp;
	switch (_p48.ctor) {
		case 'CPPattern':
			return {
				ctor: '_Tuple2',
				_0: 'pattern',
				_1: _gicentre$elm_vega$Vega$strSpec(_p48._0)
			};
		case 'CPCase':
			return {
				ctor: '_Tuple2',
				_0: 'case',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$caseLabel(_p48._0))
			};
		case 'CPStopwords':
			return {
				ctor: '_Tuple2',
				_0: 'stopwords',
				_1: _gicentre$elm_vega$Vega$strSpec(_p48._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(_p48._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(_p48._1),
							_1: {ctor: '[]'}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$boundsCalculationSpec = function (bc) {
	var _p49 = bc;
	switch (_p49.ctor) {
		case 'Full':
			return _elm_lang$core$Json_Encode$string('full');
		case 'Flush':
			return _elm_lang$core$Json_Encode$string('flush');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p49._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$layoutProperty = function (prop) {
	var _p50 = prop;
	switch (_p50.ctor) {
		case 'LAlign':
			return {
				ctor: '_Tuple2',
				_0: 'align',
				_1: _gicentre$elm_vega$Vega$gridAlignSpec(_p50._0)
			};
		case 'LBounds':
			return {
				ctor: '_Tuple2',
				_0: 'bounds',
				_1: _gicentre$elm_vega$Vega$boundsCalculationSpec(_p50._0)
			};
		case 'LColumns':
			return {
				ctor: '_Tuple2',
				_0: 'columns',
				_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
			};
		case 'LPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
			};
		case 'LPaddingRC':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'row',
							_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'col',
								_1: _gicentre$elm_vega$Vega$numSpec(_p50._1)
							},
							_1: {ctor: '[]'}
						}
					})
			};
		case 'LOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
			};
		case 'LOffsetRC':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'row',
							_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'col',
								_1: _gicentre$elm_vega$Vega$numSpec(_p50._1)
							},
							_1: {ctor: '[]'}
						}
					})
			};
		case 'LHeaderBand':
			return {
				ctor: '_Tuple2',
				_0: 'headerBand',
				_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
			};
		case 'LHeaderBandRC':
			return {
				ctor: '_Tuple2',
				_0: 'headerBand',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'row',
							_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'col',
								_1: _gicentre$elm_vega$Vega$numSpec(_p50._1)
							},
							_1: {ctor: '[]'}
						}
					})
			};
		case 'LFooterBand':
			return {
				ctor: '_Tuple2',
				_0: 'footerBand',
				_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
			};
		case 'LFooterBandRC':
			return {
				ctor: '_Tuple2',
				_0: 'footerBand',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'row',
							_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'col',
								_1: _gicentre$elm_vega$Vega$numSpec(_p50._1)
							},
							_1: {ctor: '[]'}
						}
					})
			};
		case 'LTitleBand':
			return {
				ctor: '_Tuple2',
				_0: 'titleBand',
				_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'titleBand',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'row',
							_1: _gicentre$elm_vega$Vega$numSpec(_p50._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'col',
								_1: _gicentre$elm_vega$Vega$numSpec(_p50._1)
							},
							_1: {ctor: '[]'}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$booSpec = function (b) {
	var _p51 = b;
	switch (_p51.ctor) {
		case 'Boo':
			return _elm_lang$core$Json_Encode$bool(_p51._0);
		case 'Boos':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$bool, _p51._0));
		case 'BooSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p51._0),
					_1: {ctor: '[]'}
				});
		case 'BooSignals':
			return _elm_lang$core$Json_Encode$list(
				A2(
					_elm_lang$core$List$map,
					function (sig) {
						return _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$signalReferenceProperty(sig),
								_1: {ctor: '[]'}
							});
					},
					_p51._0));
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$exprProperty(_p51._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$clipSpec = function (clip) {
	var _p52 = clip;
	switch (_p52.ctor) {
		case 'ClEnabled':
			return _gicentre$elm_vega$Vega$booSpec(_p52._0);
		case 'ClPath':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'path',
						_1: _gicentre$elm_vega$Vega$strSpec(_p52._0)
					},
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'sphere',
						_1: _gicentre$elm_vega$Vega$strSpec(_p52._0)
					},
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$eventStreamObjectSpec = function (ess) {
	var esProperty = function (es) {
		var _p53 = es;
		switch (_p53.ctor) {
			case 'ESSource':
				return {
					ctor: '_Tuple2',
					_0: 'source',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$Vega$eventSourceLabel(_p53._0))
				};
			case 'ESType':
				return {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$Vega$eventTypeLabel(_p53._0))
				};
			case 'ESBetween':
				return {
					ctor: '_Tuple2',
					_0: 'between',
					_1: _elm_lang$core$Json_Encode$list(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$eventStreamObjectSpec(_p53._0),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$eventStreamObjectSpec(_p53._1),
								_1: {ctor: '[]'}
							}
						})
				};
			case 'ESConsume':
				return {
					ctor: '_Tuple2',
					_0: 'consume',
					_1: _gicentre$elm_vega$Vega$booSpec(_p53._0)
				};
			case 'ESFilter':
				var _p55 = _p53._0;
				var _p54 = _p55;
				if ((_p54.ctor === '::') && (_p54._1.ctor === '[]')) {
					return {
						ctor: '_Tuple2',
						_0: 'filter',
						_1: _elm_lang$core$Json_Encode$string(_p54._0)
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: 'filter',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p55))
					};
				}
			case 'ESDebounce':
				return {
					ctor: '_Tuple2',
					_0: 'debounce',
					_1: _gicentre$elm_vega$Vega$numSpec(_p53._0)
				};
			case 'ESMarkName':
				return {
					ctor: '_Tuple2',
					_0: 'markname',
					_1: _elm_lang$core$Json_Encode$string(_p53._0)
				};
			case 'ESMark':
				return {
					ctor: '_Tuple2',
					_0: 'marktype',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$Vega$markLabel(_p53._0))
				};
			case 'ESThrottle':
				return {
					ctor: '_Tuple2',
					_0: 'throttle',
					_1: _gicentre$elm_vega$Vega$numSpec(_p53._0)
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: 'stream',
					_1: _gicentre$elm_vega$Vega$eventStreamSpec(_p53._0)
				};
		}
	};
	return _elm_lang$core$Json_Encode$object(
		A2(_elm_lang$core$List$map, esProperty, ess));
};
var _gicentre$elm_vega$Vega$eventStreamSpec = function (es) {
	var _p56 = es;
	switch (_p56.ctor) {
		case 'ESSelector':
			return _gicentre$elm_vega$Vega$strSpec(_p56._0);
		case 'ESObject':
			return _gicentre$elm_vega$Vega$eventStreamObjectSpec(_p56._0);
		case 'ESSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'signal',
						_1: _elm_lang$core$Json_Encode$string(_p56._0)
					},
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'merge',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$eventStreamSpec, _p56._0))
					},
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$eventHandlerSpec = function (ehs) {
	var eventHandler = function (eh) {
		var _p57 = eh;
		switch (_p57.ctor) {
			case 'EEvents':
				var _p59 = _p57._0;
				var _p58 = _p59;
				if ((_p58.ctor === '::') && (_p58._1.ctor === '[]')) {
					return {
						ctor: '_Tuple2',
						_0: 'events',
						_1: _gicentre$elm_vega$Vega$eventStreamSpec(_p58._0)
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: 'events',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$eventStreamSpec, _p59))
					};
				}
			case 'EUpdate':
				var _p60 = _p57._0;
				return _elm_lang$core$Native_Utils.eq(_p60, '') ? {
					ctor: '_Tuple2',
					_0: 'update',
					_1: _elm_lang$core$Json_Encode$string('{}')
				} : {
					ctor: '_Tuple2',
					_0: 'update',
					_1: _elm_lang$core$Json_Encode$string(_p60)
				};
			case 'EEncode':
				return {
					ctor: '_Tuple2',
					_0: 'encode',
					_1: _elm_lang$core$Json_Encode$string(_p57._0)
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: 'force',
					_1: _gicentre$elm_vega$Vega$booSpec(_p57._0)
				};
		}
	};
	return _elm_lang$core$Json_Encode$object(
		A2(_elm_lang$core$List$map, eventHandler, ehs));
};
var _gicentre$elm_vega$Vega$binProperty = function (bnProp) {
	var _p61 = bnProp;
	switch (_p61.ctor) {
		case 'BnAnchor':
			return {
				ctor: '_Tuple2',
				_0: 'anchor',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'BnMaxBins':
			return {
				ctor: '_Tuple2',
				_0: 'maxbins',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'BnBase':
			return {
				ctor: '_Tuple2',
				_0: 'base',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'BnStep':
			return {
				ctor: '_Tuple2',
				_0: 'step',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'BnSteps':
			var _p63 = _p61._0;
			var _p62 = _p63;
			switch (_p62.ctor) {
				case 'Num':
					return {
						ctor: '_Tuple2',
						_0: 'steps',
						_1: _elm_lang$core$Json_Encode$list(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$numSpec(_p63),
								_1: {ctor: '[]'}
							})
					};
				case 'NumSignal':
					return {
						ctor: '_Tuple2',
						_0: 'steps',
						_1: _elm_lang$core$Json_Encode$list(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$numSpec(_p63),
								_1: {ctor: '[]'}
							})
					};
				default:
					return {
						ctor: '_Tuple2',
						_0: 'steps',
						_1: _gicentre$elm_vega$Vega$numSpec(_p63)
					};
			}
		case 'BnMinStep':
			return {
				ctor: '_Tuple2',
				_0: 'minstep',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'BnDivide':
			return {
				ctor: '_Tuple2',
				_0: 'divide',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'BnNice':
			return {
				ctor: '_Tuple2',
				_0: 'nice',
				_1: _gicentre$elm_vega$Vega$booSpec(_p61._0)
			};
		case 'BnSignal':
			return {
				ctor: '_Tuple2',
				_0: 'signal',
				_1: _elm_lang$core$Json_Encode$string(_p61._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(_p61._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(_p61._1),
							_1: {ctor: '[]'}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$axTypeLabel = function (axType) {
	var _p64 = axType;
	switch (_p64.ctor) {
		case 'AxAll':
			return 'axis';
		case 'AxLeft':
			return 'axisLeft';
		case 'AxTop':
			return 'axisTop';
		case 'AxRight':
			return 'axisRight';
		case 'AxBottom':
			return 'axisBottom';
		case 'AxX':
			return 'axisX';
		case 'AxY':
			return 'axisY';
		default:
			return 'axisBand';
	}
};
var _gicentre$elm_vega$Vega$axisElementLabel = function (el) {
	var _p65 = el;
	switch (_p65.ctor) {
		case 'EAxis':
			return 'axis';
		case 'ETicks':
			return 'ticks';
		case 'EGrid':
			return 'grid';
		case 'ELabels':
			return 'labels';
		case 'ETitle':
			return 'title';
		default:
			return 'domain';
	}
};
var _gicentre$elm_vega$Vega$autosizeProperty = function (asCfg) {
	var _p66 = asCfg;
	switch (_p66.ctor) {
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
		case 'AFitX':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string('fit-x')
			};
		case 'AFitY':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string('fit-y')
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
				_1: _elm_lang$core$Json_Encode$bool(true)
			};
		case 'AContent':
			return {
				ctor: '_Tuple2',
				_0: 'contains',
				_1: _elm_lang$core$Json_Encode$string('content')
			};
		case 'APadding':
			return {
				ctor: '_Tuple2',
				_0: 'contains',
				_1: _elm_lang$core$Json_Encode$string('padding')
			};
		default:
			return _gicentre$elm_vega$Vega$signalReferenceProperty(_p66._0);
	}
};
var _gicentre$elm_vega$Vega$anchorSpec = function (anchor) {
	var _p67 = anchor;
	switch (_p67.ctor) {
		case 'Start':
			return _elm_lang$core$Json_Encode$string('start');
		case 'Middle':
			return _elm_lang$core$Json_Encode$string('middle');
		case 'End':
			return _elm_lang$core$Json_Encode$string('end');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p67._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$toVega = function (spec) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: '$schema',
				_1: _elm_lang$core$Json_Encode$string('https://vega.github.io/schema/vega/v4.0.json')
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p68) {
					var _p69 = _p68;
					return {
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$Vega$vPropertyLabel(_p69._0),
						_1: _p69._1
					};
				},
				spec)
		});
};
var _gicentre$elm_vega$Vega$on = F2(
	function (triggerSpecs, dTable) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			dTable,
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'on',
					_1: _elm_lang$core$Json_Encode$list(triggerSpecs)
				},
				_1: {ctor: '[]'}
			});
	});
var _gicentre$elm_vega$Vega$dataFromRows = F3(
	function (name, fmts, rows) {
		var fmt = _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {ctor: '[]'} : {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$formatProperty, fmts))
			},
			_1: {ctor: '[]'}
		};
		return A2(
			_elm_lang$core$Basics_ops['++'],
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
						_0: 'values',
						_1: _elm_lang$core$Json_Encode$list(rows)
					},
					_1: {ctor: '[]'}
				}
			},
			fmt);
	});
var _gicentre$elm_vega$Vega$dataFromColumns = F3(
	function (name, fmts, cols) {
		var fmt = _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {ctor: '[]'} : {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$formatProperty, fmts))
			},
			_1: {ctor: '[]'}
		};
		var dataArray = _elm_lang$core$Json_Encode$list(
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Json_Encode$object,
				_gicentre$elm_vega$Vega$transpose(cols)));
		return A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'name',
					_1: _elm_lang$core$Json_Encode$string(name)
				},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'values', _1: dataArray},
					_1: {ctor: '[]'}
				}
			},
			fmt);
	});
var _gicentre$elm_vega$Vega$combineSpecs = function (specs) {
	return _elm_lang$core$Json_Encode$object(specs);
};
var _gicentre$elm_vega$Vega$AgKey = function (a) {
	return {ctor: 'AgKey', _0: a};
};
var _gicentre$elm_vega$Vega$agKey = _gicentre$elm_vega$Vega$AgKey;
var _gicentre$elm_vega$Vega$AgDrop = function (a) {
	return {ctor: 'AgDrop', _0: a};
};
var _gicentre$elm_vega$Vega$agDrop = _gicentre$elm_vega$Vega$AgDrop;
var _gicentre$elm_vega$Vega$AgCross = function (a) {
	return {ctor: 'AgCross', _0: a};
};
var _gicentre$elm_vega$Vega$agCross = _gicentre$elm_vega$Vega$AgCross;
var _gicentre$elm_vega$Vega$AgAs = function (a) {
	return {ctor: 'AgAs', _0: a};
};
var _gicentre$elm_vega$Vega$agAs = _gicentre$elm_vega$Vega$AgAs;
var _gicentre$elm_vega$Vega$AgOps = function (a) {
	return {ctor: 'AgOps', _0: a};
};
var _gicentre$elm_vega$Vega$agOps = _gicentre$elm_vega$Vega$AgOps;
var _gicentre$elm_vega$Vega$AgFields = function (a) {
	return {ctor: 'AgFields', _0: a};
};
var _gicentre$elm_vega$Vega$agFields = _gicentre$elm_vega$Vega$AgFields;
var _gicentre$elm_vega$Vega$AgGroupBy = function (a) {
	return {ctor: 'AgGroupBy', _0: a};
};
var _gicentre$elm_vega$Vega$agGroupBy = _gicentre$elm_vega$Vega$AgGroupBy;
var _gicentre$elm_vega$Vega$AxZIndex = function (a) {
	return {ctor: 'AxZIndex', _0: a};
};
var _gicentre$elm_vega$Vega$axZIndex = _gicentre$elm_vega$Vega$AxZIndex;
var _gicentre$elm_vega$Vega$AxValues = function (a) {
	return {ctor: 'AxValues', _0: a};
};
var _gicentre$elm_vega$Vega$axValues = _gicentre$elm_vega$Vega$AxValues;
var _gicentre$elm_vega$Vega$AxTitleY = function (a) {
	return {ctor: 'AxTitleY', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleY = _gicentre$elm_vega$Vega$AxTitleY;
var _gicentre$elm_vega$Vega$AxTitleX = function (a) {
	return {ctor: 'AxTitleX', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleX = _gicentre$elm_vega$Vega$AxTitleX;
var _gicentre$elm_vega$Vega$AxTitlePadding = function (a) {
	return {ctor: 'AxTitlePadding', _0: a};
};
var _gicentre$elm_vega$Vega$axTitlePadding = _gicentre$elm_vega$Vega$AxTitlePadding;
var _gicentre$elm_vega$Vega$AxTitleOpacity = function (a) {
	return {ctor: 'AxTitleOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleOpacity = _gicentre$elm_vega$Vega$AxTitleOpacity;
var _gicentre$elm_vega$Vega$AxTitleLimit = function (a) {
	return {ctor: 'AxTitleLimit', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleLimit = _gicentre$elm_vega$Vega$AxTitleLimit;
var _gicentre$elm_vega$Vega$AxTitleFontWeight = function (a) {
	return {ctor: 'AxTitleFontWeight', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleFontWeight = _gicentre$elm_vega$Vega$AxTitleFontWeight;
var _gicentre$elm_vega$Vega$AxTitleFontSize = function (a) {
	return {ctor: 'AxTitleFontSize', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleFontSize = _gicentre$elm_vega$Vega$AxTitleFontSize;
var _gicentre$elm_vega$Vega$AxTitleFont = function (a) {
	return {ctor: 'AxTitleFont', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleFont = _gicentre$elm_vega$Vega$AxTitleFont;
var _gicentre$elm_vega$Vega$AxTitleColor = function (a) {
	return {ctor: 'AxTitleColor', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleColor = _gicentre$elm_vega$Vega$AxTitleColor;
var _gicentre$elm_vega$Vega$AxTitleBaseline = function (a) {
	return {ctor: 'AxTitleBaseline', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleBaseline = _gicentre$elm_vega$Vega$AxTitleBaseline;
var _gicentre$elm_vega$Vega$AxTitleAngle = function (a) {
	return {ctor: 'AxTitleAngle', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleAngle = _gicentre$elm_vega$Vega$AxTitleAngle;
var _gicentre$elm_vega$Vega$AxTitleAlign = function (a) {
	return {ctor: 'AxTitleAlign', _0: a};
};
var _gicentre$elm_vega$Vega$axTitleAlign = _gicentre$elm_vega$Vega$AxTitleAlign;
var _gicentre$elm_vega$Vega$AxTitle = function (a) {
	return {ctor: 'AxTitle', _0: a};
};
var _gicentre$elm_vega$Vega$axTitle = _gicentre$elm_vega$Vega$AxTitle;
var _gicentre$elm_vega$Vega$AxTickWidth = function (a) {
	return {ctor: 'AxTickWidth', _0: a};
};
var _gicentre$elm_vega$Vega$axTickWidth = _gicentre$elm_vega$Vega$AxTickWidth;
var _gicentre$elm_vega$Vega$AxTickSize = function (a) {
	return {ctor: 'AxTickSize', _0: a};
};
var _gicentre$elm_vega$Vega$axTickSize = _gicentre$elm_vega$Vega$AxTickSize;
var _gicentre$elm_vega$Vega$AxTickRound = function (a) {
	return {ctor: 'AxTickRound', _0: a};
};
var _gicentre$elm_vega$Vega$axTickRound = _gicentre$elm_vega$Vega$AxTickRound;
var _gicentre$elm_vega$Vega$AxTickOpacity = function (a) {
	return {ctor: 'AxTickOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$axTickOpacity = _gicentre$elm_vega$Vega$AxTickOpacity;
var _gicentre$elm_vega$Vega$AxTickOffset = function (a) {
	return {ctor: 'AxTickOffset', _0: a};
};
var _gicentre$elm_vega$Vega$axTickOffset = _gicentre$elm_vega$Vega$AxTickOffset;
var _gicentre$elm_vega$Vega$AxTickExtra = function (a) {
	return {ctor: 'AxTickExtra', _0: a};
};
var _gicentre$elm_vega$Vega$axTickExtra = _gicentre$elm_vega$Vega$AxTickExtra;
var _gicentre$elm_vega$Vega$AxTemporalTickCount = F2(
	function (a, b) {
		return {ctor: 'AxTemporalTickCount', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$axTemporalTickCount = _gicentre$elm_vega$Vega$AxTemporalTickCount;
var _gicentre$elm_vega$Vega$AxTickCount = function (a) {
	return {ctor: 'AxTickCount', _0: a};
};
var _gicentre$elm_vega$Vega$axTickCount = _gicentre$elm_vega$Vega$AxTickCount;
var _gicentre$elm_vega$Vega$AxTickColor = function (a) {
	return {ctor: 'AxTickColor', _0: a};
};
var _gicentre$elm_vega$Vega$axTickColor = _gicentre$elm_vega$Vega$AxTickColor;
var _gicentre$elm_vega$Vega$AxTicks = function (a) {
	return {ctor: 'AxTicks', _0: a};
};
var _gicentre$elm_vega$Vega$axTicks = _gicentre$elm_vega$Vega$AxTicks;
var _gicentre$elm_vega$Vega$AxPosition = function (a) {
	return {ctor: 'AxPosition', _0: a};
};
var _gicentre$elm_vega$Vega$axPosition = _gicentre$elm_vega$Vega$AxPosition;
var _gicentre$elm_vega$Vega$AxOffset = function (a) {
	return {ctor: 'AxOffset', _0: a};
};
var _gicentre$elm_vega$Vega$axOffset = _gicentre$elm_vega$Vega$AxOffset;
var _gicentre$elm_vega$Vega$AxMaxExtent = function (a) {
	return {ctor: 'AxMaxExtent', _0: a};
};
var _gicentre$elm_vega$Vega$axMaxExtent = _gicentre$elm_vega$Vega$AxMaxExtent;
var _gicentre$elm_vega$Vega$AxMinExtent = function (a) {
	return {ctor: 'AxMinExtent', _0: a};
};
var _gicentre$elm_vega$Vega$axMinExtent = _gicentre$elm_vega$Vega$AxMinExtent;
var _gicentre$elm_vega$Vega$AxLabelPadding = function (a) {
	return {ctor: 'AxLabelPadding', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelPadding = _gicentre$elm_vega$Vega$AxLabelPadding;
var _gicentre$elm_vega$Vega$AxLabelOverlap = function (a) {
	return {ctor: 'AxLabelOverlap', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelOverlap = _gicentre$elm_vega$Vega$AxLabelOverlap;
var _gicentre$elm_vega$Vega$AxLabelOpacity = function (a) {
	return {ctor: 'AxLabelOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelOpacity = _gicentre$elm_vega$Vega$AxLabelOpacity;
var _gicentre$elm_vega$Vega$AxLabelLimit = function (a) {
	return {ctor: 'AxLabelLimit', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelLimit = _gicentre$elm_vega$Vega$AxLabelLimit;
var _gicentre$elm_vega$Vega$AxLabelFontWeight = function (a) {
	return {ctor: 'AxLabelFontWeight', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelFontWeight = _gicentre$elm_vega$Vega$AxLabelFontWeight;
var _gicentre$elm_vega$Vega$AxLabelFontSize = function (a) {
	return {ctor: 'AxLabelFontSize', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelFontSize = _gicentre$elm_vega$Vega$AxLabelFontSize;
var _gicentre$elm_vega$Vega$AxLabelFont = function (a) {
	return {ctor: 'AxLabelFont', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelFont = _gicentre$elm_vega$Vega$AxLabelFont;
var _gicentre$elm_vega$Vega$AxLabelFlushOffset = function (a) {
	return {ctor: 'AxLabelFlushOffset', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelFlushOffset = _gicentre$elm_vega$Vega$AxLabelFlushOffset;
var _gicentre$elm_vega$Vega$AxLabelFlush = function (a) {
	return {ctor: 'AxLabelFlush', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelFlush = _gicentre$elm_vega$Vega$AxLabelFlush;
var _gicentre$elm_vega$Vega$AxLabelColor = function (a) {
	return {ctor: 'AxLabelColor', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelColor = _gicentre$elm_vega$Vega$AxLabelColor;
var _gicentre$elm_vega$Vega$AxLabelBound = function (a) {
	return {ctor: 'AxLabelBound', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelBound = _gicentre$elm_vega$Vega$AxLabelBound;
var _gicentre$elm_vega$Vega$AxLabelBaseline = function (a) {
	return {ctor: 'AxLabelBaseline', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelBaseline = _gicentre$elm_vega$Vega$AxLabelBaseline;
var _gicentre$elm_vega$Vega$AxLabelAngle = function (a) {
	return {ctor: 'AxLabelAngle', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelAngle = _gicentre$elm_vega$Vega$AxLabelAngle;
var _gicentre$elm_vega$Vega$AxLabelAlign = function (a) {
	return {ctor: 'AxLabelAlign', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelAlign = _gicentre$elm_vega$Vega$AxLabelAlign;
var _gicentre$elm_vega$Vega$AxLabels = function (a) {
	return {ctor: 'AxLabels', _0: a};
};
var _gicentre$elm_vega$Vega$axLabels = _gicentre$elm_vega$Vega$AxLabels;
var _gicentre$elm_vega$Vega$AxGridWidth = function (a) {
	return {ctor: 'AxGridWidth', _0: a};
};
var _gicentre$elm_vega$Vega$axGridWidth = _gicentre$elm_vega$Vega$AxGridWidth;
var _gicentre$elm_vega$Vega$AxGridScale = function (a) {
	return {ctor: 'AxGridScale', _0: a};
};
var _gicentre$elm_vega$Vega$axGridScale = _gicentre$elm_vega$Vega$AxGridScale;
var _gicentre$elm_vega$Vega$AxGridOpacity = function (a) {
	return {ctor: 'AxGridOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$axGridOpacity = _gicentre$elm_vega$Vega$AxGridOpacity;
var _gicentre$elm_vega$Vega$AxGridDash = function (a) {
	return {ctor: 'AxGridDash', _0: a};
};
var _gicentre$elm_vega$Vega$axGridDash = _gicentre$elm_vega$Vega$AxGridDash;
var _gicentre$elm_vega$Vega$AxGridColor = function (a) {
	return {ctor: 'AxGridColor', _0: a};
};
var _gicentre$elm_vega$Vega$axGridColor = _gicentre$elm_vega$Vega$AxGridColor;
var _gicentre$elm_vega$Vega$AxGrid = function (a) {
	return {ctor: 'AxGrid', _0: a};
};
var _gicentre$elm_vega$Vega$axGrid = _gicentre$elm_vega$Vega$AxGrid;
var _gicentre$elm_vega$Vega$AxFormat = function (a) {
	return {ctor: 'AxFormat', _0: a};
};
var _gicentre$elm_vega$Vega$axFormat = _gicentre$elm_vega$Vega$AxFormat;
var _gicentre$elm_vega$Vega$AxEncode = function (a) {
	return {ctor: 'AxEncode', _0: a};
};
var _gicentre$elm_vega$Vega$axEncode = _gicentre$elm_vega$Vega$AxEncode;
var _gicentre$elm_vega$Vega$AxDomainWidth = function (a) {
	return {ctor: 'AxDomainWidth', _0: a};
};
var _gicentre$elm_vega$Vega$axDomainWidth = _gicentre$elm_vega$Vega$AxDomainWidth;
var _gicentre$elm_vega$Vega$AxDomainOpacity = function (a) {
	return {ctor: 'AxDomainOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$axDomainOpacity = _gicentre$elm_vega$Vega$AxDomainOpacity;
var _gicentre$elm_vega$Vega$AxDomainColor = function (a) {
	return {ctor: 'AxDomainColor', _0: a};
};
var _gicentre$elm_vega$Vega$axDomainColor = _gicentre$elm_vega$Vega$AxDomainColor;
var _gicentre$elm_vega$Vega$AxDomain = function (a) {
	return {ctor: 'AxDomain', _0: a};
};
var _gicentre$elm_vega$Vega$axDomain = _gicentre$elm_vega$Vega$AxDomain;
var _gicentre$elm_vega$Vega$AxBandPosition = function (a) {
	return {ctor: 'AxBandPosition', _0: a};
};
var _gicentre$elm_vega$Vega$axBandPosition = _gicentre$elm_vega$Vega$AxBandPosition;
var _gicentre$elm_vega$Vega$AxSide = function (a) {
	return {ctor: 'AxSide', _0: a};
};
var _gicentre$elm_vega$Vega$AxScale = function (a) {
	return {ctor: 'AxScale', _0: a};
};
var _gicentre$elm_vega$Vega$IColor = function (a) {
	return {ctor: 'IColor', _0: a};
};
var _gicentre$elm_vega$Vega$iColor = _gicentre$elm_vega$Vega$IColor;
var _gicentre$elm_vega$Vega$ITel = function (a) {
	return {ctor: 'ITel', _0: a};
};
var _gicentre$elm_vega$Vega$iTel = _gicentre$elm_vega$Vega$ITel;
var _gicentre$elm_vega$Vega$IDateTimeLocal = function (a) {
	return {ctor: 'IDateTimeLocal', _0: a};
};
var _gicentre$elm_vega$Vega$iDateTimeLocal = _gicentre$elm_vega$Vega$IDateTimeLocal;
var _gicentre$elm_vega$Vega$IWeek = function (a) {
	return {ctor: 'IWeek', _0: a};
};
var _gicentre$elm_vega$Vega$iWeek = _gicentre$elm_vega$Vega$IWeek;
var _gicentre$elm_vega$Vega$IMonth = function (a) {
	return {ctor: 'IMonth', _0: a};
};
var _gicentre$elm_vega$Vega$iMonth = _gicentre$elm_vega$Vega$IMonth;
var _gicentre$elm_vega$Vega$ITime = function (a) {
	return {ctor: 'ITime', _0: a};
};
var _gicentre$elm_vega$Vega$iTime = _gicentre$elm_vega$Vega$ITime;
var _gicentre$elm_vega$Vega$IDate = function (a) {
	return {ctor: 'IDate', _0: a};
};
var _gicentre$elm_vega$Vega$iDate = _gicentre$elm_vega$Vega$IDate;
var _gicentre$elm_vega$Vega$INumber = function (a) {
	return {ctor: 'INumber', _0: a};
};
var _gicentre$elm_vega$Vega$iNumber = _gicentre$elm_vega$Vega$INumber;
var _gicentre$elm_vega$Vega$IText = function (a) {
	return {ctor: 'IText', _0: a};
};
var _gicentre$elm_vega$Vega$iText = _gicentre$elm_vega$Vega$IText;
var _gicentre$elm_vega$Vega$ISelect = function (a) {
	return {ctor: 'ISelect', _0: a};
};
var _gicentre$elm_vega$Vega$iSelect = _gicentre$elm_vega$Vega$ISelect;
var _gicentre$elm_vega$Vega$IRadio = function (a) {
	return {ctor: 'IRadio', _0: a};
};
var _gicentre$elm_vega$Vega$iRadio = _gicentre$elm_vega$Vega$IRadio;
var _gicentre$elm_vega$Vega$ICheckbox = function (a) {
	return {ctor: 'ICheckbox', _0: a};
};
var _gicentre$elm_vega$Vega$iCheckbox = _gicentre$elm_vega$Vega$ICheckbox;
var _gicentre$elm_vega$Vega$IRange = function (a) {
	return {ctor: 'IRange', _0: a};
};
var _gicentre$elm_vega$Vega$iRange = _gicentre$elm_vega$Vega$IRange;
var _gicentre$elm_vega$Vega$BnAs = F2(
	function (a, b) {
		return {ctor: 'BnAs', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$bnAs = _gicentre$elm_vega$Vega$BnAs;
var _gicentre$elm_vega$Vega$BnSignal = function (a) {
	return {ctor: 'BnSignal', _0: a};
};
var _gicentre$elm_vega$Vega$bnSignal = _gicentre$elm_vega$Vega$BnSignal;
var _gicentre$elm_vega$Vega$BnNice = function (a) {
	return {ctor: 'BnNice', _0: a};
};
var _gicentre$elm_vega$Vega$bnNice = _gicentre$elm_vega$Vega$BnNice;
var _gicentre$elm_vega$Vega$BnDivide = function (a) {
	return {ctor: 'BnDivide', _0: a};
};
var _gicentre$elm_vega$Vega$bnDivide = _gicentre$elm_vega$Vega$BnDivide;
var _gicentre$elm_vega$Vega$BnMinStep = function (a) {
	return {ctor: 'BnMinStep', _0: a};
};
var _gicentre$elm_vega$Vega$bnMinStep = _gicentre$elm_vega$Vega$BnMinStep;
var _gicentre$elm_vega$Vega$BnSteps = function (a) {
	return {ctor: 'BnSteps', _0: a};
};
var _gicentre$elm_vega$Vega$bnSteps = _gicentre$elm_vega$Vega$BnSteps;
var _gicentre$elm_vega$Vega$BnStep = function (a) {
	return {ctor: 'BnStep', _0: a};
};
var _gicentre$elm_vega$Vega$bnStep = _gicentre$elm_vega$Vega$BnStep;
var _gicentre$elm_vega$Vega$BnBase = function (a) {
	return {ctor: 'BnBase', _0: a};
};
var _gicentre$elm_vega$Vega$bnBase = _gicentre$elm_vega$Vega$BnBase;
var _gicentre$elm_vega$Vega$BnMaxBins = function (a) {
	return {ctor: 'BnMaxBins', _0: a};
};
var _gicentre$elm_vega$Vega$bnMaxBins = _gicentre$elm_vega$Vega$BnMaxBins;
var _gicentre$elm_vega$Vega$BnAnchor = function (a) {
	return {ctor: 'BnAnchor', _0: a};
};
var _gicentre$elm_vega$Vega$bnAnchor = _gicentre$elm_vega$Vega$BnAnchor;
var _gicentre$elm_vega$Vega$BooExpr = function (a) {
	return {ctor: 'BooExpr', _0: a};
};
var _gicentre$elm_vega$Vega$booExpr = _gicentre$elm_vega$Vega$BooExpr;
var _gicentre$elm_vega$Vega$BooSignals = function (a) {
	return {ctor: 'BooSignals', _0: a};
};
var _gicentre$elm_vega$Vega$booSignals = _gicentre$elm_vega$Vega$BooSignals;
var _gicentre$elm_vega$Vega$BooSignal = function (a) {
	return {ctor: 'BooSignal', _0: a};
};
var _gicentre$elm_vega$Vega$booSignal = _gicentre$elm_vega$Vega$BooSignal;
var _gicentre$elm_vega$Vega$Boos = function (a) {
	return {ctor: 'Boos', _0: a};
};
var _gicentre$elm_vega$Vega$boos = _gicentre$elm_vega$Vega$Boos;
var _gicentre$elm_vega$Vega$Boo = function (a) {
	return {ctor: 'Boo', _0: a};
};
var _gicentre$elm_vega$Vega$false = _gicentre$elm_vega$Vega$Boo(false);
var _gicentre$elm_vega$Vega$true = _gicentre$elm_vega$Vega$Boo(true);
var _gicentre$elm_vega$Vega$ClSphere = function (a) {
	return {ctor: 'ClSphere', _0: a};
};
var _gicentre$elm_vega$Vega$clSphere = _gicentre$elm_vega$Vega$ClSphere;
var _gicentre$elm_vega$Vega$ClPath = function (a) {
	return {ctor: 'ClPath', _0: a};
};
var _gicentre$elm_vega$Vega$clPath = _gicentre$elm_vega$Vega$ClPath;
var _gicentre$elm_vega$Vega$ClEnabled = function (a) {
	return {ctor: 'ClEnabled', _0: a};
};
var _gicentre$elm_vega$Vega$clEnabled = _gicentre$elm_vega$Vega$ClEnabled;
var _gicentre$elm_vega$Vega$SExtent = function (a) {
	return {ctor: 'SExtent', _0: a};
};
var _gicentre$elm_vega$Vega$csExtent = _gicentre$elm_vega$Vega$SExtent;
var _gicentre$elm_vega$Vega$SCount = function (a) {
	return {ctor: 'SCount', _0: a};
};
var _gicentre$elm_vega$Vega$csCount = _gicentre$elm_vega$Vega$SCount;
var _gicentre$elm_vega$Vega$SScheme = function (a) {
	return {ctor: 'SScheme', _0: a};
};
var _gicentre$elm_vega$Vega$csScheme = _gicentre$elm_vega$Vega$SScheme;
var _gicentre$elm_vega$Vega$HCL = F3(
	function (a, b, c) {
		return {ctor: 'HCL', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$cHCL = _gicentre$elm_vega$Vega$HCL;
var _gicentre$elm_vega$Vega$LAB = F3(
	function (a, b, c) {
		return {ctor: 'LAB', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$cLAB = _gicentre$elm_vega$Vega$LAB;
var _gicentre$elm_vega$Vega$HSL = F3(
	function (a, b, c) {
		return {ctor: 'HSL', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$cHSL = _gicentre$elm_vega$Vega$HSL;
var _gicentre$elm_vega$Vega$RGB = F3(
	function (a, b, c) {
		return {ctor: 'RGB', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$cRGB = _gicentre$elm_vega$Vega$RGB;
var _gicentre$elm_vega$Vega$CfScaleRange = F2(
	function (a, b) {
		return {ctor: 'CfScaleRange', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$cfScaleRange = _gicentre$elm_vega$Vega$CfScaleRange;
var _gicentre$elm_vega$Vega$CfTitle = function (a) {
	return {ctor: 'CfTitle', _0: a};
};
var _gicentre$elm_vega$Vega$cfTitle = _gicentre$elm_vega$Vega$CfTitle;
var _gicentre$elm_vega$Vega$CfLegend = function (a) {
	return {ctor: 'CfLegend', _0: a};
};
var _gicentre$elm_vega$Vega$cfLegend = _gicentre$elm_vega$Vega$CfLegend;
var _gicentre$elm_vega$Vega$CfAxis = F2(
	function (a, b) {
		return {ctor: 'CfAxis', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$cfAxis = _gicentre$elm_vega$Vega$CfAxis;
var _gicentre$elm_vega$Vega$CfStyle = F2(
	function (a, b) {
		return {ctor: 'CfStyle', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$cfStyle = _gicentre$elm_vega$Vega$CfStyle;
var _gicentre$elm_vega$Vega$CfMarks = function (a) {
	return {ctor: 'CfMarks', _0: a};
};
var _gicentre$elm_vega$Vega$cfMarks = _gicentre$elm_vega$Vega$CfMarks;
var _gicentre$elm_vega$Vega$CfMark = F2(
	function (a, b) {
		return {ctor: 'CfMark', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$cfMark = _gicentre$elm_vega$Vega$CfMark;
var _gicentre$elm_vega$Vega$CfEvents = F2(
	function (a, b) {
		return {ctor: 'CfEvents', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$cfEvents = _gicentre$elm_vega$Vega$CfEvents;
var _gicentre$elm_vega$Vega$CfGroup = function (a) {
	return {ctor: 'CfGroup', _0: a};
};
var _gicentre$elm_vega$Vega$cfGroup = _gicentre$elm_vega$Vega$CfGroup;
var _gicentre$elm_vega$Vega$CfBackground = function (a) {
	return {ctor: 'CfBackground', _0: a};
};
var _gicentre$elm_vega$Vega$cfBackground = _gicentre$elm_vega$Vega$CfBackground;
var _gicentre$elm_vega$Vega$CfAutosize = function (a) {
	return {ctor: 'CfAutosize', _0: a};
};
var _gicentre$elm_vega$Vega$cfAutosize = _gicentre$elm_vega$Vega$CfAutosize;
var _gicentre$elm_vega$Vega$CnNice = function (a) {
	return {ctor: 'CnNice', _0: a};
};
var _gicentre$elm_vega$Vega$cnNice = _gicentre$elm_vega$Vega$CnNice;
var _gicentre$elm_vega$Vega$CnCount = function (a) {
	return {ctor: 'CnCount', _0: a};
};
var _gicentre$elm_vega$Vega$cnCount = _gicentre$elm_vega$Vega$CnCount;
var _gicentre$elm_vega$Vega$CnThresholds = function (a) {
	return {ctor: 'CnThresholds', _0: a};
};
var _gicentre$elm_vega$Vega$cnThresholds = _gicentre$elm_vega$Vega$CnThresholds;
var _gicentre$elm_vega$Vega$CnSmooth = function (a) {
	return {ctor: 'CnSmooth', _0: a};
};
var _gicentre$elm_vega$Vega$cnSmooth = _gicentre$elm_vega$Vega$CnSmooth;
var _gicentre$elm_vega$Vega$CnBandwidth = function (a) {
	return {ctor: 'CnBandwidth', _0: a};
};
var _gicentre$elm_vega$Vega$cnBandwidth = _gicentre$elm_vega$Vega$CnBandwidth;
var _gicentre$elm_vega$Vega$CnCellSize = function (a) {
	return {ctor: 'CnCellSize', _0: a};
};
var _gicentre$elm_vega$Vega$cnCellSize = _gicentre$elm_vega$Vega$CnCellSize;
var _gicentre$elm_vega$Vega$CnY = function (a) {
	return {ctor: 'CnY', _0: a};
};
var _gicentre$elm_vega$Vega$cnY = _gicentre$elm_vega$Vega$CnY;
var _gicentre$elm_vega$Vega$CnX = function (a) {
	return {ctor: 'CnX', _0: a};
};
var _gicentre$elm_vega$Vega$cnX = _gicentre$elm_vega$Vega$CnX;
var _gicentre$elm_vega$Vega$CnValues = function (a) {
	return {ctor: 'CnValues', _0: a};
};
var _gicentre$elm_vega$Vega$cnValues = _gicentre$elm_vega$Vega$CnValues;
var _gicentre$elm_vega$Vega$CPAs = F2(
	function (a, b) {
		return {ctor: 'CPAs', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$cpAs = _gicentre$elm_vega$Vega$CPAs;
var _gicentre$elm_vega$Vega$CPStopwords = function (a) {
	return {ctor: 'CPStopwords', _0: a};
};
var _gicentre$elm_vega$Vega$cpStopwords = _gicentre$elm_vega$Vega$CPStopwords;
var _gicentre$elm_vega$Vega$CPCase = function (a) {
	return {ctor: 'CPCase', _0: a};
};
var _gicentre$elm_vega$Vega$cpCase = _gicentre$elm_vega$Vega$CPCase;
var _gicentre$elm_vega$Vega$CPPattern = function (a) {
	return {ctor: 'CPPattern', _0: a};
};
var _gicentre$elm_vega$Vega$cpPattern = _gicentre$elm_vega$Vega$CPPattern;
var _gicentre$elm_vega$Vega$CrAs = F2(
	function (a, b) {
		return {ctor: 'CrAs', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$crAs = _gicentre$elm_vega$Vega$CrAs;
var _gicentre$elm_vega$Vega$CrFilter = function (a) {
	return {ctor: 'CrFilter', _0: a};
};
var _gicentre$elm_vega$Vega$crFilter = _gicentre$elm_vega$Vega$CrFilter;
var _gicentre$elm_vega$Vega$DSort = function (a) {
	return {ctor: 'DSort', _0: a};
};
var _gicentre$elm_vega$Vega$daSort = _gicentre$elm_vega$Vega$DSort;
var _gicentre$elm_vega$Vega$DReferences = function (a) {
	return {ctor: 'DReferences', _0: a};
};
var _gicentre$elm_vega$Vega$daReferences = _gicentre$elm_vega$Vega$DReferences;
var _gicentre$elm_vega$Vega$DValues = function (a) {
	return {ctor: 'DValues', _0: a};
};
var _gicentre$elm_vega$Vega$daValues = _gicentre$elm_vega$Vega$DValues;
var _gicentre$elm_vega$Vega$DSignal = function (a) {
	return {ctor: 'DSignal', _0: a};
};
var _gicentre$elm_vega$Vega$daSignal = _gicentre$elm_vega$Vega$DSignal;
var _gicentre$elm_vega$Vega$DFields = function (a) {
	return {ctor: 'DFields', _0: a};
};
var _gicentre$elm_vega$Vega$daFields = _gicentre$elm_vega$Vega$DFields;
var _gicentre$elm_vega$Vega$DField = function (a) {
	return {ctor: 'DField', _0: a};
};
var _gicentre$elm_vega$Vega$daField = _gicentre$elm_vega$Vega$DField;
var _gicentre$elm_vega$Vega$DDataset = function (a) {
	return {ctor: 'DDataset', _0: a};
};
var _gicentre$elm_vega$Vega$daDataset = _gicentre$elm_vega$Vega$DDataset;
var _gicentre$elm_vega$Vega$DnAs = F2(
	function (a, b) {
		return {ctor: 'DnAs', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$dnAs = _gicentre$elm_vega$Vega$DnAs;
var _gicentre$elm_vega$Vega$DnSteps = function (a) {
	return {ctor: 'DnSteps', _0: a};
};
var _gicentre$elm_vega$Vega$dnSteps = _gicentre$elm_vega$Vega$DnSteps;
var _gicentre$elm_vega$Vega$DnMethod = function (a) {
	return {ctor: 'DnMethod', _0: a};
};
var _gicentre$elm_vega$Vega$dnMethod = _gicentre$elm_vega$Vega$DnMethod;
var _gicentre$elm_vega$Vega$DnExtent = function (a) {
	return {ctor: 'DnExtent', _0: a};
};
var _gicentre$elm_vega$Vega$dnExtent = _gicentre$elm_vega$Vega$DnExtent;
var _gicentre$elm_vega$Vega$DiMixture = function (a) {
	return {ctor: 'DiMixture', _0: a};
};
var _gicentre$elm_vega$Vega$diMixture = _gicentre$elm_vega$Vega$DiMixture;
var _gicentre$elm_vega$Vega$DiKde = F3(
	function (a, b, c) {
		return {ctor: 'DiKde', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$diKde = _gicentre$elm_vega$Vega$DiKde;
var _gicentre$elm_vega$Vega$DiUniform = F2(
	function (a, b) {
		return {ctor: 'DiUniform', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$diUniform = _gicentre$elm_vega$Vega$DiUniform;
var _gicentre$elm_vega$Vega$DiNormal = F2(
	function (a, b) {
		return {ctor: 'DiNormal', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$diNormal = _gicentre$elm_vega$Vega$DiNormal;
var _gicentre$elm_vega$Vega$EForce = function (a) {
	return {ctor: 'EForce', _0: a};
};
var _gicentre$elm_vega$Vega$evForce = _gicentre$elm_vega$Vega$EForce;
var _gicentre$elm_vega$Vega$EEncode = function (a) {
	return {ctor: 'EEncode', _0: a};
};
var _gicentre$elm_vega$Vega$evEncode = _gicentre$elm_vega$Vega$EEncode;
var _gicentre$elm_vega$Vega$EUpdate = function (a) {
	return {ctor: 'EUpdate', _0: a};
};
var _gicentre$elm_vega$Vega$evUpdate = _gicentre$elm_vega$Vega$EUpdate;
var _gicentre$elm_vega$Vega$EEvents = function (a) {
	return {ctor: 'EEvents', _0: a};
};
var _gicentre$elm_vega$Vega$evHandler = F2(
	function (ess, eHandlers) {
		return {
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$EEvents(ess),
			_1: eHandlers
		};
	});
var _gicentre$elm_vega$Vega$ESMerge = function (a) {
	return {ctor: 'ESMerge', _0: a};
};
var _gicentre$elm_vega$Vega$esMerge = _gicentre$elm_vega$Vega$ESMerge;
var _gicentre$elm_vega$Vega$ESSignal = function (a) {
	return {ctor: 'ESSignal', _0: a};
};
var _gicentre$elm_vega$Vega$esSignal = _gicentre$elm_vega$Vega$ESSignal;
var _gicentre$elm_vega$Vega$ESSelector = function (a) {
	return {ctor: 'ESSelector', _0: a};
};
var _gicentre$elm_vega$Vega$esSelector = _gicentre$elm_vega$Vega$ESSelector;
var _gicentre$elm_vega$Vega$evStreamSelector = _gicentre$elm_vega$Vega$ESSelector;
var _gicentre$elm_vega$Vega$ESObject = function (a) {
	return {ctor: 'ESObject', _0: a};
};
var _gicentre$elm_vega$Vega$esObject = _gicentre$elm_vega$Vega$ESObject;
var _gicentre$elm_vega$Vega$ESDerived = function (a) {
	return {ctor: 'ESDerived', _0: a};
};
var _gicentre$elm_vega$Vega$esStream = _gicentre$elm_vega$Vega$ESDerived;
var _gicentre$elm_vega$Vega$ESThrottle = function (a) {
	return {ctor: 'ESThrottle', _0: a};
};
var _gicentre$elm_vega$Vega$esThrottle = _gicentre$elm_vega$Vega$ESThrottle;
var _gicentre$elm_vega$Vega$ESMark = function (a) {
	return {ctor: 'ESMark', _0: a};
};
var _gicentre$elm_vega$Vega$esMark = _gicentre$elm_vega$Vega$ESMark;
var _gicentre$elm_vega$Vega$ESMarkName = function (a) {
	return {ctor: 'ESMarkName', _0: a};
};
var _gicentre$elm_vega$Vega$esMarkName = _gicentre$elm_vega$Vega$ESMarkName;
var _gicentre$elm_vega$Vega$ESDebounce = function (a) {
	return {ctor: 'ESDebounce', _0: a};
};
var _gicentre$elm_vega$Vega$esDebounce = _gicentre$elm_vega$Vega$ESDebounce;
var _gicentre$elm_vega$Vega$ESFilter = function (a) {
	return {ctor: 'ESFilter', _0: a};
};
var _gicentre$elm_vega$Vega$esFilter = _gicentre$elm_vega$Vega$ESFilter;
var _gicentre$elm_vega$Vega$ESConsume = function (a) {
	return {ctor: 'ESConsume', _0: a};
};
var _gicentre$elm_vega$Vega$esConsume = _gicentre$elm_vega$Vega$ESConsume;
var _gicentre$elm_vega$Vega$ESBetween = F2(
	function (a, b) {
		return {ctor: 'ESBetween', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$esBetween = _gicentre$elm_vega$Vega$ESBetween;
var _gicentre$elm_vega$Vega$ESType = function (a) {
	return {ctor: 'ESType', _0: a};
};
var _gicentre$elm_vega$Vega$esType = _gicentre$elm_vega$Vega$ESType;
var _gicentre$elm_vega$Vega$ESSource = function (a) {
	return {ctor: 'ESSource', _0: a};
};
var _gicentre$elm_vega$Vega$esSource = _gicentre$elm_vega$Vega$ESSource;
var _gicentre$elm_vega$Vega$Custom = F2(
	function (a, b) {
		return {ctor: 'Custom', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$enCustom = function (name) {
	return _gicentre$elm_vega$Vega$Custom(name);
};
var _gicentre$elm_vega$Vega$EnInteractive = function (a) {
	return {ctor: 'EnInteractive', _0: a};
};
var _gicentre$elm_vega$Vega$enInteractive = _gicentre$elm_vega$Vega$EnInteractive;
var _gicentre$elm_vega$Vega$EnName = function (a) {
	return {ctor: 'EnName', _0: a};
};
var _gicentre$elm_vega$Vega$enName = _gicentre$elm_vega$Vega$EnName;
var _gicentre$elm_vega$Vega$Hover = function (a) {
	return {ctor: 'Hover', _0: a};
};
var _gicentre$elm_vega$Vega$enHover = _gicentre$elm_vega$Vega$Hover;
var _gicentre$elm_vega$Vega$Exit = function (a) {
	return {ctor: 'Exit', _0: a};
};
var _gicentre$elm_vega$Vega$enExit = _gicentre$elm_vega$Vega$Exit;
var _gicentre$elm_vega$Vega$Update = function (a) {
	return {ctor: 'Update', _0: a};
};
var _gicentre$elm_vega$Vega$enUpdate = _gicentre$elm_vega$Vega$Update;
var _gicentre$elm_vega$Vega$Enter = function (a) {
	return {ctor: 'Enter', _0: a};
};
var _gicentre$elm_vega$Vega$enEnter = _gicentre$elm_vega$Vega$Enter;
var _gicentre$elm_vega$Vega$Expr = function (a) {
	return {ctor: 'Expr', _0: a};
};
var _gicentre$elm_vega$Vega$expr = _gicentre$elm_vega$Vega$Expr;
var _gicentre$elm_vega$Vega$ExField = function (a) {
	return {ctor: 'ExField', _0: a};
};
var _gicentre$elm_vega$Vega$exField = _gicentre$elm_vega$Vega$ExField;
var _gicentre$elm_vega$Vega$FaGroupBy = function (a) {
	return {ctor: 'FaGroupBy', _0: a};
};
var _gicentre$elm_vega$Vega$faGroupBy = _gicentre$elm_vega$Vega$FaGroupBy;
var _gicentre$elm_vega$Vega$FaAggregate = function (a) {
	return {ctor: 'FaAggregate', _0: a};
};
var _gicentre$elm_vega$Vega$faAggregate = _gicentre$elm_vega$Vega$FaAggregate;
var _gicentre$elm_vega$Vega$FaField = function (a) {
	return {ctor: 'FaField', _0: a};
};
var _gicentre$elm_vega$Vega$faField = _gicentre$elm_vega$Vega$FaField;
var _gicentre$elm_vega$Vega$FaData = function (a) {
	return {ctor: 'FaData', _0: a};
};
var _gicentre$elm_vega$Vega$FaName = function (a) {
	return {ctor: 'FaName', _0: a};
};
var _gicentre$elm_vega$Vega$FeName = function (a) {
	return {ctor: 'FeName', _0: a};
};
var _gicentre$elm_vega$Vega$feName = _gicentre$elm_vega$Vega$FeName;
var _gicentre$elm_vega$Vega$FeatureSignal = function (a) {
	return {ctor: 'FeatureSignal', _0: a};
};
var _gicentre$elm_vega$Vega$featureSignal = _gicentre$elm_vega$Vega$FeatureSignal;
var _gicentre$elm_vega$Vega$FParent = function (a) {
	return {ctor: 'FParent', _0: a};
};
var _gicentre$elm_vega$Vega$fParent = _gicentre$elm_vega$Vega$FParent;
var _gicentre$elm_vega$Vega$FGroup = function (a) {
	return {ctor: 'FGroup', _0: a};
};
var _gicentre$elm_vega$Vega$fGroup = _gicentre$elm_vega$Vega$FGroup;
var _gicentre$elm_vega$Vega$FDatum = function (a) {
	return {ctor: 'FDatum', _0: a};
};
var _gicentre$elm_vega$Vega$fDatum = _gicentre$elm_vega$Vega$FDatum;
var _gicentre$elm_vega$Vega$FSignal = function (a) {
	return {ctor: 'FSignal', _0: a};
};
var _gicentre$elm_vega$Vega$fSignal = _gicentre$elm_vega$Vega$FSignal;
var _gicentre$elm_vega$Vega$FExpr = function (a) {
	return {ctor: 'FExpr', _0: a};
};
var _gicentre$elm_vega$Vega$fExpr = _gicentre$elm_vega$Vega$FExpr;
var _gicentre$elm_vega$Vega$FName = function (a) {
	return {ctor: 'FName', _0: a};
};
var _gicentre$elm_vega$Vega$field = _gicentre$elm_vega$Vega$FName;
var _gicentre$elm_vega$Vega$FY = F2(
	function (a, b) {
		return {ctor: 'FY', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$foY = F2(
	function (y, fps) {
		return A2(_gicentre$elm_vega$Vega$FY, y, fps);
	});
var _gicentre$elm_vega$Vega$FX = F2(
	function (a, b) {
		return {ctor: 'FX', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$foX = F2(
	function (x, fps) {
		return A2(_gicentre$elm_vega$Vega$FX, x, fps);
	});
var _gicentre$elm_vega$Vega$FLink = function (a) {
	return {ctor: 'FLink', _0: a};
};
var _gicentre$elm_vega$Vega$FNBody = function (a) {
	return {ctor: 'FNBody', _0: a};
};
var _gicentre$elm_vega$Vega$foNBody = _gicentre$elm_vega$Vega$FNBody;
var _gicentre$elm_vega$Vega$FCollide = function (a) {
	return {ctor: 'FCollide', _0: a};
};
var _gicentre$elm_vega$Vega$FCenter = function (a) {
	return {ctor: 'FCenter', _0: a};
};
var _gicentre$elm_vega$Vega$FpDistance = function (a) {
	return {ctor: 'FpDistance', _0: a};
};
var _gicentre$elm_vega$Vega$fpDistance = _gicentre$elm_vega$Vega$FpDistance;
var _gicentre$elm_vega$Vega$FpId = function (a) {
	return {ctor: 'FpId', _0: a};
};
var _gicentre$elm_vega$Vega$fpId = _gicentre$elm_vega$Vega$FpId;
var _gicentre$elm_vega$Vega$FpLinks = function (a) {
	return {ctor: 'FpLinks', _0: a};
};
var _gicentre$elm_vega$Vega$foLink = F2(
	function (links, fps) {
		return _gicentre$elm_vega$Vega$FLink(
			{
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$FpLinks(links),
				_1: fps
			});
	});
var _gicentre$elm_vega$Vega$FpDistanceMax = function (a) {
	return {ctor: 'FpDistanceMax', _0: a};
};
var _gicentre$elm_vega$Vega$fpDistanceMax = _gicentre$elm_vega$Vega$FpDistanceMax;
var _gicentre$elm_vega$Vega$FpDistanceMin = function (a) {
	return {ctor: 'FpDistanceMin', _0: a};
};
var _gicentre$elm_vega$Vega$fpDistanceMin = _gicentre$elm_vega$Vega$FpDistanceMin;
var _gicentre$elm_vega$Vega$FpTheta = function (a) {
	return {ctor: 'FpTheta', _0: a};
};
var _gicentre$elm_vega$Vega$fpTheta = _gicentre$elm_vega$Vega$FpTheta;
var _gicentre$elm_vega$Vega$FpIterations = function (a) {
	return {ctor: 'FpIterations', _0: a};
};
var _gicentre$elm_vega$Vega$fpIterations = _gicentre$elm_vega$Vega$FpIterations;
var _gicentre$elm_vega$Vega$FpStrength = function (a) {
	return {ctor: 'FpStrength', _0: a};
};
var _gicentre$elm_vega$Vega$fpStrength = _gicentre$elm_vega$Vega$FpStrength;
var _gicentre$elm_vega$Vega$FpRadius = function (a) {
	return {ctor: 'FpRadius', _0: a};
};
var _gicentre$elm_vega$Vega$foCollide = F2(
	function (r, fps) {
		return _gicentre$elm_vega$Vega$FCollide(
			{
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$FpRadius(r),
				_1: fps
			});
	});
var _gicentre$elm_vega$Vega$FpY = function (a) {
	return {ctor: 'FpY', _0: a};
};
var _gicentre$elm_vega$Vega$FpX = function (a) {
	return {ctor: 'FpX', _0: a};
};
var _gicentre$elm_vega$Vega$FpCy = function (a) {
	return {ctor: 'FpCy', _0: a};
};
var _gicentre$elm_vega$Vega$FpCx = function (a) {
	return {ctor: 'FpCx', _0: a};
};
var _gicentre$elm_vega$Vega$foCenter = F2(
	function (x, y) {
		return _gicentre$elm_vega$Vega$FCenter(
			{
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$FpCx(x),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$FpCy(y),
					_1: {ctor: '[]'}
				}
			});
	});
var _gicentre$elm_vega$Vega$FsAs = F4(
	function (a, b, c, d) {
		return {ctor: 'FsAs', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$Vega$fsAs = F4(
	function (x, y, vx, vy) {
		return A4(_gicentre$elm_vega$Vega$FsAs, x, y, vx, vy);
	});
var _gicentre$elm_vega$Vega$FsForces = function (a) {
	return {ctor: 'FsForces', _0: a};
};
var _gicentre$elm_vega$Vega$fsForces = _gicentre$elm_vega$Vega$FsForces;
var _gicentre$elm_vega$Vega$FsVelocityDecay = function (a) {
	return {ctor: 'FsVelocityDecay', _0: a};
};
var _gicentre$elm_vega$Vega$fsVelocityDecay = _gicentre$elm_vega$Vega$FsVelocityDecay;
var _gicentre$elm_vega$Vega$FsAlphaTarget = function (a) {
	return {ctor: 'FsAlphaTarget', _0: a};
};
var _gicentre$elm_vega$Vega$fsAlphaTarget = _gicentre$elm_vega$Vega$FsAlphaTarget;
var _gicentre$elm_vega$Vega$FsAlphaMin = function (a) {
	return {ctor: 'FsAlphaMin', _0: a};
};
var _gicentre$elm_vega$Vega$fsAlphaMin = _gicentre$elm_vega$Vega$FsAlphaMin;
var _gicentre$elm_vega$Vega$FsAlpha = function (a) {
	return {ctor: 'FsAlpha', _0: a};
};
var _gicentre$elm_vega$Vega$fsAlpha = _gicentre$elm_vega$Vega$FsAlpha;
var _gicentre$elm_vega$Vega$FsIterations = function (a) {
	return {ctor: 'FsIterations', _0: a};
};
var _gicentre$elm_vega$Vega$fsIterations = _gicentre$elm_vega$Vega$FsIterations;
var _gicentre$elm_vega$Vega$FsRestart = function (a) {
	return {ctor: 'FsRestart', _0: a};
};
var _gicentre$elm_vega$Vega$fsRestart = _gicentre$elm_vega$Vega$FsRestart;
var _gicentre$elm_vega$Vega$FsStatic = function (a) {
	return {ctor: 'FsStatic', _0: a};
};
var _gicentre$elm_vega$Vega$fsStatic = _gicentre$elm_vega$Vega$FsStatic;
var _gicentre$elm_vega$Vega$GjSignal = function (a) {
	return {ctor: 'GjSignal', _0: a};
};
var _gicentre$elm_vega$Vega$gjSignal = _gicentre$elm_vega$Vega$GjSignal;
var _gicentre$elm_vega$Vega$GjFeature = function (a) {
	return {ctor: 'GjFeature', _0: a};
};
var _gicentre$elm_vega$Vega$gjFeature = _gicentre$elm_vega$Vega$GjFeature;
var _gicentre$elm_vega$Vega$GjFields = F2(
	function (a, b) {
		return {ctor: 'GjFields', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$gjFields = _gicentre$elm_vega$Vega$GjFields;
var _gicentre$elm_vega$Vega$GeAs = function (a) {
	return {ctor: 'GeAs', _0: a};
};
var _gicentre$elm_vega$Vega$gpAs = _gicentre$elm_vega$Vega$GeAs;
var _gicentre$elm_vega$Vega$GePointRadius = function (a) {
	return {ctor: 'GePointRadius', _0: a};
};
var _gicentre$elm_vega$Vega$gpPointRadius = _gicentre$elm_vega$Vega$GePointRadius;
var _gicentre$elm_vega$Vega$GeField = function (a) {
	return {ctor: 'GeField', _0: a};
};
var _gicentre$elm_vega$Vega$gpField = _gicentre$elm_vega$Vega$GeField;
var _gicentre$elm_vega$Vega$GrPrecision = function (a) {
	return {ctor: 'GrPrecision', _0: a};
};
var _gicentre$elm_vega$Vega$grPrecision = _gicentre$elm_vega$Vega$GrPrecision;
var _gicentre$elm_vega$Vega$GrStep = function (a) {
	return {ctor: 'GrStep', _0: a};
};
var _gicentre$elm_vega$Vega$grStep = _gicentre$elm_vega$Vega$GrStep;
var _gicentre$elm_vega$Vega$GrStepMinor = function (a) {
	return {ctor: 'GrStepMinor', _0: a};
};
var _gicentre$elm_vega$Vega$grStepMinor = _gicentre$elm_vega$Vega$GrStepMinor;
var _gicentre$elm_vega$Vega$GrStepMajor = function (a) {
	return {ctor: 'GrStepMajor', _0: a};
};
var _gicentre$elm_vega$Vega$grStepMajor = _gicentre$elm_vega$Vega$GrStepMajor;
var _gicentre$elm_vega$Vega$GrExtent = function (a) {
	return {ctor: 'GrExtent', _0: a};
};
var _gicentre$elm_vega$Vega$grExtent = _gicentre$elm_vega$Vega$GrExtent;
var _gicentre$elm_vega$Vega$GrExtentMinor = function (a) {
	return {ctor: 'GrExtentMinor', _0: a};
};
var _gicentre$elm_vega$Vega$grExtentMinor = _gicentre$elm_vega$Vega$GrExtentMinor;
var _gicentre$elm_vega$Vega$GrExtentMajor = function (a) {
	return {ctor: 'GrExtentMajor', _0: a};
};
var _gicentre$elm_vega$Vega$grExtentMajor = _gicentre$elm_vega$Vega$GrExtentMajor;
var _gicentre$elm_vega$Vega$GrField = function (a) {
	return {ctor: 'GrField', _0: a};
};
var _gicentre$elm_vega$Vega$grField = _gicentre$elm_vega$Vega$GrField;
var _gicentre$elm_vega$Vega$ImValue = function (a) {
	return {ctor: 'ImValue', _0: a};
};
var _gicentre$elm_vega$Vega$imValue = _gicentre$elm_vega$Vega$ImValue;
var _gicentre$elm_vega$Vega$ImGroupBy = function (a) {
	return {ctor: 'ImGroupBy', _0: a};
};
var _gicentre$elm_vega$Vega$imGroupBy = _gicentre$elm_vega$Vega$ImGroupBy;
var _gicentre$elm_vega$Vega$ImMethod = function (a) {
	return {ctor: 'ImMethod', _0: a};
};
var _gicentre$elm_vega$Vega$imMethod = _gicentre$elm_vega$Vega$ImMethod;
var _gicentre$elm_vega$Vega$ImKeyVals = function (a) {
	return {ctor: 'ImKeyVals', _0: a};
};
var _gicentre$elm_vega$Vega$imKeyVals = _gicentre$elm_vega$Vega$ImKeyVals;
var _gicentre$elm_vega$Vega$ByMin = {ctor: 'ByMin'};
var _gicentre$elm_vega$Vega$ByMax = {ctor: 'ByMax'};
var _gicentre$elm_vega$Vega$ByMedian = {ctor: 'ByMedian'};
var _gicentre$elm_vega$Vega$ByMean = {ctor: 'ByMean'};
var _gicentre$elm_vega$Vega$ByValue = {ctor: 'ByValue'};
var _gicentre$elm_vega$Vega$InAutocomplete = function (a) {
	return {ctor: 'InAutocomplete', _0: a};
};
var _gicentre$elm_vega$Vega$inAutocomplete = _gicentre$elm_vega$Vega$InAutocomplete;
var _gicentre$elm_vega$Vega$InPlaceholder = function (a) {
	return {ctor: 'InPlaceholder', _0: a};
};
var _gicentre$elm_vega$Vega$inPlaceholder = _gicentre$elm_vega$Vega$InPlaceholder;
var _gicentre$elm_vega$Vega$InStep = function (a) {
	return {ctor: 'InStep', _0: a};
};
var _gicentre$elm_vega$Vega$inStep = _gicentre$elm_vega$Vega$InStep;
var _gicentre$elm_vega$Vega$InMax = function (a) {
	return {ctor: 'InMax', _0: a};
};
var _gicentre$elm_vega$Vega$inMax = _gicentre$elm_vega$Vega$InMax;
var _gicentre$elm_vega$Vega$InMin = function (a) {
	return {ctor: 'InMin', _0: a};
};
var _gicentre$elm_vega$Vega$inMin = _gicentre$elm_vega$Vega$InMin;
var _gicentre$elm_vega$Vega$InOptions = function (a) {
	return {ctor: 'InOptions', _0: a};
};
var _gicentre$elm_vega$Vega$inOptions = _gicentre$elm_vega$Vega$InOptions;
var _gicentre$elm_vega$Vega$InElement = function (a) {
	return {ctor: 'InElement', _0: a};
};
var _gicentre$elm_vega$Vega$inElement = _gicentre$elm_vega$Vega$InElement;
var _gicentre$elm_vega$Vega$InDebounce = function (a) {
	return {ctor: 'InDebounce', _0: a};
};
var _gicentre$elm_vega$Vega$inDebounce = _gicentre$elm_vega$Vega$InDebounce;
var _gicentre$elm_vega$Vega$JAAs = function (a) {
	return {ctor: 'JAAs', _0: a};
};
var _gicentre$elm_vega$Vega$jaAs = _gicentre$elm_vega$Vega$JAAs;
var _gicentre$elm_vega$Vega$JAOps = function (a) {
	return {ctor: 'JAOps', _0: a};
};
var _gicentre$elm_vega$Vega$jaOps = _gicentre$elm_vega$Vega$JAOps;
var _gicentre$elm_vega$Vega$JAFields = function (a) {
	return {ctor: 'JAFields', _0: a};
};
var _gicentre$elm_vega$Vega$jaFields = _gicentre$elm_vega$Vega$JAFields;
var _gicentre$elm_vega$Vega$JAGroupBy = function (a) {
	return {ctor: 'JAGroupBy', _0: a};
};
var _gicentre$elm_vega$Vega$jaGroupBy = _gicentre$elm_vega$Vega$JAGroupBy;
var _gicentre$elm_vega$Vega$LTitleBandRC = F2(
	function (a, b) {
		return {ctor: 'LTitleBandRC', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$loTitleBandRC = F2(
	function (r, c) {
		return A2(_gicentre$elm_vega$Vega$LTitleBandRC, r, c);
	});
var _gicentre$elm_vega$Vega$LTitleBand = function (a) {
	return {ctor: 'LTitleBand', _0: a};
};
var _gicentre$elm_vega$Vega$loTitleBand = _gicentre$elm_vega$Vega$LTitleBand;
var _gicentre$elm_vega$Vega$LFooterBandRC = F2(
	function (a, b) {
		return {ctor: 'LFooterBandRC', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$loFooterBandRC = F2(
	function (r, c) {
		return A2(_gicentre$elm_vega$Vega$LFooterBandRC, r, c);
	});
var _gicentre$elm_vega$Vega$LFooterBand = function (a) {
	return {ctor: 'LFooterBand', _0: a};
};
var _gicentre$elm_vega$Vega$loFooterBand = _gicentre$elm_vega$Vega$LFooterBand;
var _gicentre$elm_vega$Vega$LHeaderBandRC = F2(
	function (a, b) {
		return {ctor: 'LHeaderBandRC', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$loHeaderBandRC = F2(
	function (r, c) {
		return A2(_gicentre$elm_vega$Vega$LHeaderBandRC, r, c);
	});
var _gicentre$elm_vega$Vega$LHeaderBand = function (a) {
	return {ctor: 'LHeaderBand', _0: a};
};
var _gicentre$elm_vega$Vega$loHeaderBand = _gicentre$elm_vega$Vega$LHeaderBand;
var _gicentre$elm_vega$Vega$LOffsetRC = F2(
	function (a, b) {
		return {ctor: 'LOffsetRC', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$loOffsetRC = F2(
	function (r, c) {
		return A2(_gicentre$elm_vega$Vega$LOffsetRC, r, c);
	});
var _gicentre$elm_vega$Vega$LOffset = function (a) {
	return {ctor: 'LOffset', _0: a};
};
var _gicentre$elm_vega$Vega$loOffset = _gicentre$elm_vega$Vega$LOffset;
var _gicentre$elm_vega$Vega$LPaddingRC = F2(
	function (a, b) {
		return {ctor: 'LPaddingRC', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$loPaddingRC = F2(
	function (r, c) {
		return A2(_gicentre$elm_vega$Vega$LPaddingRC, r, c);
	});
var _gicentre$elm_vega$Vega$LPadding = function (a) {
	return {ctor: 'LPadding', _0: a};
};
var _gicentre$elm_vega$Vega$loPadding = _gicentre$elm_vega$Vega$LPadding;
var _gicentre$elm_vega$Vega$LColumns = function (a) {
	return {ctor: 'LColumns', _0: a};
};
var _gicentre$elm_vega$Vega$loColumns = _gicentre$elm_vega$Vega$LColumns;
var _gicentre$elm_vega$Vega$LBounds = function (a) {
	return {ctor: 'LBounds', _0: a};
};
var _gicentre$elm_vega$Vega$loBounds = _gicentre$elm_vega$Vega$LBounds;
var _gicentre$elm_vega$Vega$LAlign = function (a) {
	return {ctor: 'LAlign', _0: a};
};
var _gicentre$elm_vega$Vega$loAlign = _gicentre$elm_vega$Vega$LAlign;
var _gicentre$elm_vega$Vega$EnGradient = function (a) {
	return {ctor: 'EnGradient', _0: a};
};
var _gicentre$elm_vega$Vega$enGradient = _gicentre$elm_vega$Vega$EnGradient;
var _gicentre$elm_vega$Vega$EnSymbols = function (a) {
	return {ctor: 'EnSymbols', _0: a};
};
var _gicentre$elm_vega$Vega$enSymbols = _gicentre$elm_vega$Vega$EnSymbols;
var _gicentre$elm_vega$Vega$EnLabels = function (a) {
	return {ctor: 'EnLabels', _0: a};
};
var _gicentre$elm_vega$Vega$enLabels = _gicentre$elm_vega$Vega$EnLabels;
var _gicentre$elm_vega$Vega$EnTitle = function (a) {
	return {ctor: 'EnTitle', _0: a};
};
var _gicentre$elm_vega$Vega$enTitle = _gicentre$elm_vega$Vega$EnTitle;
var _gicentre$elm_vega$Vega$EnLegend = function (a) {
	return {ctor: 'EnLegend', _0: a};
};
var _gicentre$elm_vega$Vega$enLegend = _gicentre$elm_vega$Vega$EnLegend;
var _gicentre$elm_vega$Vega$LeZIndex = function (a) {
	return {ctor: 'LeZIndex', _0: a};
};
var _gicentre$elm_vega$Vega$leZIndex = _gicentre$elm_vega$Vega$LeZIndex;
var _gicentre$elm_vega$Vega$LeValues = function (a) {
	return {ctor: 'LeValues', _0: a};
};
var _gicentre$elm_vega$Vega$leValues = _gicentre$elm_vega$Vega$LeValues;
var _gicentre$elm_vega$Vega$LeTitlePadding = function (a) {
	return {ctor: 'LeTitlePadding', _0: a};
};
var _gicentre$elm_vega$Vega$leTitlePadding = _gicentre$elm_vega$Vega$LeTitlePadding;
var _gicentre$elm_vega$Vega$LeTitleLimit = function (a) {
	return {ctor: 'LeTitleLimit', _0: a};
};
var _gicentre$elm_vega$Vega$leTitleLimit = _gicentre$elm_vega$Vega$LeTitleLimit;
var _gicentre$elm_vega$Vega$LeTitleFontWeight = function (a) {
	return {ctor: 'LeTitleFontWeight', _0: a};
};
var _gicentre$elm_vega$Vega$leTitleFontWeight = _gicentre$elm_vega$Vega$LeTitleFontWeight;
var _gicentre$elm_vega$Vega$LeTitleFontSize = function (a) {
	return {ctor: 'LeTitleFontSize', _0: a};
};
var _gicentre$elm_vega$Vega$leTitleFontSize = _gicentre$elm_vega$Vega$LeTitleFontSize;
var _gicentre$elm_vega$Vega$LeTitleFont = function (a) {
	return {ctor: 'LeTitleFont', _0: a};
};
var _gicentre$elm_vega$Vega$leTitleFont = _gicentre$elm_vega$Vega$LeTitleFont;
var _gicentre$elm_vega$Vega$LeTitleOpacity = function (a) {
	return {ctor: 'LeTitleOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$leTitleOpacity = _gicentre$elm_vega$Vega$LeTitleOpacity;
var _gicentre$elm_vega$Vega$LeTitleColor = function (a) {
	return {ctor: 'LeTitleColor', _0: a};
};
var _gicentre$elm_vega$Vega$leTitleColor = _gicentre$elm_vega$Vega$LeTitleColor;
var _gicentre$elm_vega$Vega$LeTitleBaseline = function (a) {
	return {ctor: 'LeTitleBaseline', _0: a};
};
var _gicentre$elm_vega$Vega$leTitleBaseline = _gicentre$elm_vega$Vega$LeTitleBaseline;
var _gicentre$elm_vega$Vega$LeTitleAlign = function (a) {
	return {ctor: 'LeTitleAlign', _0: a};
};
var _gicentre$elm_vega$Vega$leTitleAlign = _gicentre$elm_vega$Vega$LeTitleAlign;
var _gicentre$elm_vega$Vega$LeTitle = function (a) {
	return {ctor: 'LeTitle', _0: a};
};
var _gicentre$elm_vega$Vega$leTitle = _gicentre$elm_vega$Vega$LeTitle;
var _gicentre$elm_vega$Vega$LeTemporalTickCount = F2(
	function (a, b) {
		return {ctor: 'LeTemporalTickCount', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$leTemporalTickCount = _gicentre$elm_vega$Vega$LeTemporalTickCount;
var _gicentre$elm_vega$Vega$LeTickCount = function (a) {
	return {ctor: 'LeTickCount', _0: a};
};
var _gicentre$elm_vega$Vega$leTickCount = _gicentre$elm_vega$Vega$LeTickCount;
var _gicentre$elm_vega$Vega$LeSymbolType = function (a) {
	return {ctor: 'LeSymbolType', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolType = _gicentre$elm_vega$Vega$LeSymbolType;
var _gicentre$elm_vega$Vega$LeSymbolStrokeWidth = function (a) {
	return {ctor: 'LeSymbolStrokeWidth', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolStrokeWidth = _gicentre$elm_vega$Vega$LeSymbolStrokeWidth;
var _gicentre$elm_vega$Vega$LeSymbolStrokeColor = function (a) {
	return {ctor: 'LeSymbolStrokeColor', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolStrokeColor = _gicentre$elm_vega$Vega$LeSymbolStrokeColor;
var _gicentre$elm_vega$Vega$LeSymbolSize = function (a) {
	return {ctor: 'LeSymbolSize', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolSize = _gicentre$elm_vega$Vega$LeSymbolSize;
var _gicentre$elm_vega$Vega$LeSymbolOffset = function (a) {
	return {ctor: 'LeSymbolOffset', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolOffset = _gicentre$elm_vega$Vega$LeSymbolOffset;
var _gicentre$elm_vega$Vega$LeSymbolOpacity = function (a) {
	return {ctor: 'LeSymbolOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolOpacity = _gicentre$elm_vega$Vega$LeSymbolOpacity;
var _gicentre$elm_vega$Vega$LeSymbolFillColor = function (a) {
	return {ctor: 'LeSymbolFillColor', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolFillColor = _gicentre$elm_vega$Vega$LeSymbolFillColor;
var _gicentre$elm_vega$Vega$LeSymbolDirection = function (a) {
	return {ctor: 'LeSymbolDirection', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolDirection = _gicentre$elm_vega$Vega$LeSymbolDirection;
var _gicentre$elm_vega$Vega$LeSymbolBaseStrokeColor = function (a) {
	return {ctor: 'LeSymbolBaseStrokeColor', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolBaseStrokeColor = _gicentre$elm_vega$Vega$LeSymbolBaseStrokeColor;
var _gicentre$elm_vega$Vega$LeSymbolBaseFillColor = function (a) {
	return {ctor: 'LeSymbolBaseFillColor', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolBaseFillColor = _gicentre$elm_vega$Vega$LeSymbolBaseFillColor;
var _gicentre$elm_vega$Vega$LeLabelOverlap = function (a) {
	return {ctor: 'LeLabelOverlap', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelOverlap = _gicentre$elm_vega$Vega$LeLabelOverlap;
var _gicentre$elm_vega$Vega$LeLabelOpacity = function (a) {
	return {ctor: 'LeLabelOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelOpacity = _gicentre$elm_vega$Vega$LeLabelOpacity;
var _gicentre$elm_vega$Vega$LeLabelOffset = function (a) {
	return {ctor: 'LeLabelOffset', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelOffset = _gicentre$elm_vega$Vega$LeLabelOffset;
var _gicentre$elm_vega$Vega$LeLabelLimit = function (a) {
	return {ctor: 'LeLabelLimit', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelLimit = _gicentre$elm_vega$Vega$LeLabelLimit;
var _gicentre$elm_vega$Vega$LeLabelFontWeight = function (a) {
	return {ctor: 'LeLabelFontWeight', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelFontWeight = _gicentre$elm_vega$Vega$LeLabelFontWeight;
var _gicentre$elm_vega$Vega$LeLabelFontSize = function (a) {
	return {ctor: 'LeLabelFontSize', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelFontSize = _gicentre$elm_vega$Vega$LeLabelFontSize;
var _gicentre$elm_vega$Vega$LeLabelFont = function (a) {
	return {ctor: 'LeLabelFont', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelFont = _gicentre$elm_vega$Vega$LeLabelFont;
var _gicentre$elm_vega$Vega$LeLabelColor = function (a) {
	return {ctor: 'LeLabelColor', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelColor = _gicentre$elm_vega$Vega$LeLabelColor;
var _gicentre$elm_vega$Vega$LeLabelBaseline = function (a) {
	return {ctor: 'LeLabelBaseline', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelBaseline = _gicentre$elm_vega$Vega$LeLabelBaseline;
var _gicentre$elm_vega$Vega$LeLabelAlign = function (a) {
	return {ctor: 'LeLabelAlign', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelAlign = _gicentre$elm_vega$Vega$LeLabelAlign;
var _gicentre$elm_vega$Vega$LeGradientStrokeWidth = function (a) {
	return {ctor: 'LeGradientStrokeWidth', _0: a};
};
var _gicentre$elm_vega$Vega$leGradientStrokeWidth = _gicentre$elm_vega$Vega$LeGradientStrokeWidth;
var _gicentre$elm_vega$Vega$LeGradientStrokeColor = function (a) {
	return {ctor: 'LeGradientStrokeColor', _0: a};
};
var _gicentre$elm_vega$Vega$leGradientStrokeColor = _gicentre$elm_vega$Vega$LeGradientStrokeColor;
var _gicentre$elm_vega$Vega$LeGradientThickness = function (a) {
	return {ctor: 'LeGradientThickness', _0: a};
};
var _gicentre$elm_vega$Vega$leGradientThickness = _gicentre$elm_vega$Vega$LeGradientThickness;
var _gicentre$elm_vega$Vega$LeGradientOpacity = function (a) {
	return {ctor: 'LeGradientOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$leGradientOpacity = _gicentre$elm_vega$Vega$LeGradientOpacity;
var _gicentre$elm_vega$Vega$LeGradientLength = function (a) {
	return {ctor: 'LeGradientLength', _0: a};
};
var _gicentre$elm_vega$Vega$leGradientLength = _gicentre$elm_vega$Vega$LeGradientLength;
var _gicentre$elm_vega$Vega$LeGradientLabelOffset = function (a) {
	return {ctor: 'LeGradientLabelOffset', _0: a};
};
var _gicentre$elm_vega$Vega$leGradientLabelOffset = _gicentre$elm_vega$Vega$LeGradientLabelOffset;
var _gicentre$elm_vega$Vega$LeGradientLabelLimit = function (a) {
	return {ctor: 'LeGradientLabelLimit', _0: a};
};
var _gicentre$elm_vega$Vega$leGradientLabelLimit = _gicentre$elm_vega$Vega$LeGradientLabelLimit;
var _gicentre$elm_vega$Vega$LeStrokeWidth = function (a) {
	return {ctor: 'LeStrokeWidth', _0: a};
};
var _gicentre$elm_vega$Vega$leStrokeWidth = _gicentre$elm_vega$Vega$LeStrokeWidth;
var _gicentre$elm_vega$Vega$LeStrokeColor = function (a) {
	return {ctor: 'LeStrokeColor', _0: a};
};
var _gicentre$elm_vega$Vega$leStrokeColor = _gicentre$elm_vega$Vega$LeStrokeColor;
var _gicentre$elm_vega$Vega$LePadding = function (a) {
	return {ctor: 'LePadding', _0: a};
};
var _gicentre$elm_vega$Vega$lePadding = _gicentre$elm_vega$Vega$LePadding;
var _gicentre$elm_vega$Vega$LeOffset = function (a) {
	return {ctor: 'LeOffset', _0: a};
};
var _gicentre$elm_vega$Vega$leOffset = _gicentre$elm_vega$Vega$LeOffset;
var _gicentre$elm_vega$Vega$LeFillColor = function (a) {
	return {ctor: 'LeFillColor', _0: a};
};
var _gicentre$elm_vega$Vega$leFillColor = _gicentre$elm_vega$Vega$LeFillColor;
var _gicentre$elm_vega$Vega$LeCornerRadius = function (a) {
	return {ctor: 'LeCornerRadius', _0: a};
};
var _gicentre$elm_vega$Vega$leCornerRadius = _gicentre$elm_vega$Vega$LeCornerRadius;
var _gicentre$elm_vega$Vega$LeRowPadding = function (a) {
	return {ctor: 'LeRowPadding', _0: a};
};
var _gicentre$elm_vega$Vega$leRowPadding = _gicentre$elm_vega$Vega$LeRowPadding;
var _gicentre$elm_vega$Vega$LeColumnPadding = function (a) {
	return {ctor: 'LeColumnPadding', _0: a};
};
var _gicentre$elm_vega$Vega$leColumnPadding = _gicentre$elm_vega$Vega$LeColumnPadding;
var _gicentre$elm_vega$Vega$LeColumns = function (a) {
	return {ctor: 'LeColumns', _0: a};
};
var _gicentre$elm_vega$Vega$leColumns = _gicentre$elm_vega$Vega$LeColumns;
var _gicentre$elm_vega$Vega$LeClipHeight = function (a) {
	return {ctor: 'LeClipHeight', _0: a};
};
var _gicentre$elm_vega$Vega$leClipHeight = _gicentre$elm_vega$Vega$LeClipHeight;
var _gicentre$elm_vega$Vega$LeGridAlign = function (a) {
	return {ctor: 'LeGridAlign', _0: a};
};
var _gicentre$elm_vega$Vega$leGridAlign = _gicentre$elm_vega$Vega$LeGridAlign;
var _gicentre$elm_vega$Vega$LeFormat = function (a) {
	return {ctor: 'LeFormat', _0: a};
};
var _gicentre$elm_vega$Vega$leFormat = _gicentre$elm_vega$Vega$LeFormat;
var _gicentre$elm_vega$Vega$LeEncode = function (a) {
	return {ctor: 'LeEncode', _0: a};
};
var _gicentre$elm_vega$Vega$leEncode = _gicentre$elm_vega$Vega$LeEncode;
var _gicentre$elm_vega$Vega$LeStrokeDash = function (a) {
	return {ctor: 'LeStrokeDash', _0: a};
};
var _gicentre$elm_vega$Vega$leStrokeDash = _gicentre$elm_vega$Vega$LeStrokeDash;
var _gicentre$elm_vega$Vega$LeStroke = function (a) {
	return {ctor: 'LeStroke', _0: a};
};
var _gicentre$elm_vega$Vega$leStroke = _gicentre$elm_vega$Vega$LeStroke;
var _gicentre$elm_vega$Vega$LeSize = function (a) {
	return {ctor: 'LeSize', _0: a};
};
var _gicentre$elm_vega$Vega$leSize = _gicentre$elm_vega$Vega$LeSize;
var _gicentre$elm_vega$Vega$LeShape = function (a) {
	return {ctor: 'LeShape', _0: a};
};
var _gicentre$elm_vega$Vega$leShape = _gicentre$elm_vega$Vega$LeShape;
var _gicentre$elm_vega$Vega$LeOpacity = function (a) {
	return {ctor: 'LeOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$leOpacity = _gicentre$elm_vega$Vega$LeOpacity;
var _gicentre$elm_vega$Vega$LeFill = function (a) {
	return {ctor: 'LeFill', _0: a};
};
var _gicentre$elm_vega$Vega$leFill = _gicentre$elm_vega$Vega$LeFill;
var _gicentre$elm_vega$Vega$LeOrient = function (a) {
	return {ctor: 'LeOrient', _0: a};
};
var _gicentre$elm_vega$Vega$leOrient = _gicentre$elm_vega$Vega$LeOrient;
var _gicentre$elm_vega$Vega$LeDirection = function (a) {
	return {ctor: 'LeDirection', _0: a};
};
var _gicentre$elm_vega$Vega$leDirection = _gicentre$elm_vega$Vega$LeDirection;
var _gicentre$elm_vega$Vega$LeType = function (a) {
	return {ctor: 'LeType', _0: a};
};
var _gicentre$elm_vega$Vega$leType = _gicentre$elm_vega$Vega$LeType;
var _gicentre$elm_vega$Vega$LPAs = function (a) {
	return {ctor: 'LPAs', _0: a};
};
var _gicentre$elm_vega$Vega$lpAs = _gicentre$elm_vega$Vega$LPAs;
var _gicentre$elm_vega$Vega$LPShape = function (a) {
	return {ctor: 'LPShape', _0: a};
};
var _gicentre$elm_vega$Vega$lpShape = _gicentre$elm_vega$Vega$LPShape;
var _gicentre$elm_vega$Vega$LPOrient = function (a) {
	return {ctor: 'LPOrient', _0: a};
};
var _gicentre$elm_vega$Vega$lpOrient = _gicentre$elm_vega$Vega$LPOrient;
var _gicentre$elm_vega$Vega$LPTargetY = function (a) {
	return {ctor: 'LPTargetY', _0: a};
};
var _gicentre$elm_vega$Vega$lpTargetY = _gicentre$elm_vega$Vega$LPTargetY;
var _gicentre$elm_vega$Vega$LPTargetX = function (a) {
	return {ctor: 'LPTargetX', _0: a};
};
var _gicentre$elm_vega$Vega$lpTargetX = _gicentre$elm_vega$Vega$LPTargetX;
var _gicentre$elm_vega$Vega$LPSourceY = function (a) {
	return {ctor: 'LPSourceY', _0: a};
};
var _gicentre$elm_vega$Vega$lpSourceY = _gicentre$elm_vega$Vega$LPSourceY;
var _gicentre$elm_vega$Vega$LPSourceX = function (a) {
	return {ctor: 'LPSourceX', _0: a};
};
var _gicentre$elm_vega$Vega$lpSourceX = _gicentre$elm_vega$Vega$LPSourceX;
var _gicentre$elm_vega$Vega$LDefault = function (a) {
	return {ctor: 'LDefault', _0: a};
};
var _gicentre$elm_vega$Vega$luDefault = _gicentre$elm_vega$Vega$LDefault;
var _gicentre$elm_vega$Vega$LAs = function (a) {
	return {ctor: 'LAs', _0: a};
};
var _gicentre$elm_vega$Vega$luAs = _gicentre$elm_vega$Vega$LAs;
var _gicentre$elm_vega$Vega$LValues = function (a) {
	return {ctor: 'LValues', _0: a};
};
var _gicentre$elm_vega$Vega$luValues = _gicentre$elm_vega$Vega$LValues;
var _gicentre$elm_vega$Vega$MCustom = F2(
	function (a, b) {
		return {ctor: 'MCustom', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$maCustom = _gicentre$elm_vega$Vega$MCustom;
var _gicentre$elm_vega$Vega$MTheta = function (a) {
	return {ctor: 'MTheta', _0: a};
};
var _gicentre$elm_vega$Vega$maTheta = _gicentre$elm_vega$Vega$MTheta;
var _gicentre$elm_vega$Vega$MText = function (a) {
	return {ctor: 'MText', _0: a};
};
var _gicentre$elm_vega$Vega$maText = _gicentre$elm_vega$Vega$MText;
var _gicentre$elm_vega$Vega$MRadius = function (a) {
	return {ctor: 'MRadius', _0: a};
};
var _gicentre$elm_vega$Vega$maRadius = _gicentre$elm_vega$Vega$MRadius;
var _gicentre$elm_vega$Vega$MLimit = function (a) {
	return {ctor: 'MLimit', _0: a};
};
var _gicentre$elm_vega$Vega$maLimit = _gicentre$elm_vega$Vega$MLimit;
var _gicentre$elm_vega$Vega$MFontStyle = function (a) {
	return {ctor: 'MFontStyle', _0: a};
};
var _gicentre$elm_vega$Vega$maFontStyle = _gicentre$elm_vega$Vega$MFontStyle;
var _gicentre$elm_vega$Vega$MFontWeight = function (a) {
	return {ctor: 'MFontWeight', _0: a};
};
var _gicentre$elm_vega$Vega$maFontWeight = _gicentre$elm_vega$Vega$MFontWeight;
var _gicentre$elm_vega$Vega$MFontSize = function (a) {
	return {ctor: 'MFontSize', _0: a};
};
var _gicentre$elm_vega$Vega$maFontSize = _gicentre$elm_vega$Vega$MFontSize;
var _gicentre$elm_vega$Vega$MFont = function (a) {
	return {ctor: 'MFont', _0: a};
};
var _gicentre$elm_vega$Vega$maFont = _gicentre$elm_vega$Vega$MFont;
var _gicentre$elm_vega$Vega$MEllipsis = function (a) {
	return {ctor: 'MEllipsis', _0: a};
};
var _gicentre$elm_vega$Vega$maEllipsis = _gicentre$elm_vega$Vega$MEllipsis;
var _gicentre$elm_vega$Vega$MdY = function (a) {
	return {ctor: 'MdY', _0: a};
};
var _gicentre$elm_vega$Vega$maDy = _gicentre$elm_vega$Vega$MdY;
var _gicentre$elm_vega$Vega$MdX = function (a) {
	return {ctor: 'MdX', _0: a};
};
var _gicentre$elm_vega$Vega$maDx = _gicentre$elm_vega$Vega$MdX;
var _gicentre$elm_vega$Vega$MDir = function (a) {
	return {ctor: 'MDir', _0: a};
};
var _gicentre$elm_vega$Vega$maDir = _gicentre$elm_vega$Vega$MDir;
var _gicentre$elm_vega$Vega$MAngle = function (a) {
	return {ctor: 'MAngle', _0: a};
};
var _gicentre$elm_vega$Vega$maAngle = _gicentre$elm_vega$Vega$MAngle;
var _gicentre$elm_vega$Vega$MSymbol = function (a) {
	return {ctor: 'MSymbol', _0: a};
};
var _gicentre$elm_vega$Vega$maSymbol = _gicentre$elm_vega$Vega$MSymbol;
var _gicentre$elm_vega$Vega$MShape = function (a) {
	return {ctor: 'MShape', _0: a};
};
var _gicentre$elm_vega$Vega$maShape = _gicentre$elm_vega$Vega$MShape;
var _gicentre$elm_vega$Vega$MPath = function (a) {
	return {ctor: 'MPath', _0: a};
};
var _gicentre$elm_vega$Vega$maPath = _gicentre$elm_vega$Vega$MPath;
var _gicentre$elm_vega$Vega$MAspect = function (a) {
	return {ctor: 'MAspect', _0: a};
};
var _gicentre$elm_vega$Vega$maAspect = _gicentre$elm_vega$Vega$MAspect;
var _gicentre$elm_vega$Vega$MUrl = function (a) {
	return {ctor: 'MUrl', _0: a};
};
var _gicentre$elm_vega$Vega$maUrl = _gicentre$elm_vega$Vega$MUrl;
var _gicentre$elm_vega$Vega$MGroupClip = function (a) {
	return {ctor: 'MGroupClip', _0: a};
};
var _gicentre$elm_vega$Vega$maGroupClip = _gicentre$elm_vega$Vega$MGroupClip;
var _gicentre$elm_vega$Vega$MOrient = function (a) {
	return {ctor: 'MOrient', _0: a};
};
var _gicentre$elm_vega$Vega$maOrient = _gicentre$elm_vega$Vega$MOrient;
var _gicentre$elm_vega$Vega$MOuterRadius = function (a) {
	return {ctor: 'MOuterRadius', _0: a};
};
var _gicentre$elm_vega$Vega$maOuterRadius = _gicentre$elm_vega$Vega$MOuterRadius;
var _gicentre$elm_vega$Vega$MInnerRadius = function (a) {
	return {ctor: 'MInnerRadius', _0: a};
};
var _gicentre$elm_vega$Vega$maInnerRadius = _gicentre$elm_vega$Vega$MInnerRadius;
var _gicentre$elm_vega$Vega$MPadAngle = function (a) {
	return {ctor: 'MPadAngle', _0: a};
};
var _gicentre$elm_vega$Vega$maPadAngle = _gicentre$elm_vega$Vega$MPadAngle;
var _gicentre$elm_vega$Vega$MEndAngle = function (a) {
	return {ctor: 'MEndAngle', _0: a};
};
var _gicentre$elm_vega$Vega$maEndAngle = _gicentre$elm_vega$Vega$MEndAngle;
var _gicentre$elm_vega$Vega$MStartAngle = function (a) {
	return {ctor: 'MStartAngle', _0: a};
};
var _gicentre$elm_vega$Vega$maStartAngle = _gicentre$elm_vega$Vega$MStartAngle;
var _gicentre$elm_vega$Vega$MSize = function (a) {
	return {ctor: 'MSize', _0: a};
};
var _gicentre$elm_vega$Vega$maSize = _gicentre$elm_vega$Vega$MSize;
var _gicentre$elm_vega$Vega$MDefined = function (a) {
	return {ctor: 'MDefined', _0: a};
};
var _gicentre$elm_vega$Vega$maDefined = _gicentre$elm_vega$Vega$MDefined;
var _gicentre$elm_vega$Vega$MTension = function (a) {
	return {ctor: 'MTension', _0: a};
};
var _gicentre$elm_vega$Vega$maTension = _gicentre$elm_vega$Vega$MTension;
var _gicentre$elm_vega$Vega$MInterpolate = function (a) {
	return {ctor: 'MInterpolate', _0: a};
};
var _gicentre$elm_vega$Vega$maInterpolate = _gicentre$elm_vega$Vega$MInterpolate;
var _gicentre$elm_vega$Vega$MCornerRadius = function (a) {
	return {ctor: 'MCornerRadius', _0: a};
};
var _gicentre$elm_vega$Vega$maCornerRadius = _gicentre$elm_vega$Vega$MCornerRadius;
var _gicentre$elm_vega$Vega$MBaseline = function (a) {
	return {ctor: 'MBaseline', _0: a};
};
var _gicentre$elm_vega$Vega$maBaseline = _gicentre$elm_vega$Vega$MBaseline;
var _gicentre$elm_vega$Vega$MAlign = function (a) {
	return {ctor: 'MAlign', _0: a};
};
var _gicentre$elm_vega$Vega$maAlign = _gicentre$elm_vega$Vega$MAlign;
var _gicentre$elm_vega$Vega$MZIndex = function (a) {
	return {ctor: 'MZIndex', _0: a};
};
var _gicentre$elm_vega$Vega$maZIndex = _gicentre$elm_vega$Vega$MZIndex;
var _gicentre$elm_vega$Vega$MTooltip = function (a) {
	return {ctor: 'MTooltip', _0: a};
};
var _gicentre$elm_vega$Vega$maTooltip = _gicentre$elm_vega$Vega$MTooltip;
var _gicentre$elm_vega$Vega$MHRef = function (a) {
	return {ctor: 'MHRef', _0: a};
};
var _gicentre$elm_vega$Vega$maHRef = _gicentre$elm_vega$Vega$MHRef;
var _gicentre$elm_vega$Vega$MCursor = function (a) {
	return {ctor: 'MCursor', _0: a};
};
var _gicentre$elm_vega$Vega$maCursor = _gicentre$elm_vega$Vega$MCursor;
var _gicentre$elm_vega$Vega$MStrokeMiterLimit = function (a) {
	return {ctor: 'MStrokeMiterLimit', _0: a};
};
var _gicentre$elm_vega$Vega$maStrokeMiterLimit = _gicentre$elm_vega$Vega$MStrokeMiterLimit;
var _gicentre$elm_vega$Vega$MStrokeJoin = function (a) {
	return {ctor: 'MStrokeJoin', _0: a};
};
var _gicentre$elm_vega$Vega$maStrokeJoin = _gicentre$elm_vega$Vega$MStrokeJoin;
var _gicentre$elm_vega$Vega$MStrokeDashOffset = function (a) {
	return {ctor: 'MStrokeDashOffset', _0: a};
};
var _gicentre$elm_vega$Vega$maStrokeDashOffset = _gicentre$elm_vega$Vega$MStrokeDashOffset;
var _gicentre$elm_vega$Vega$MStrokeDash = function (a) {
	return {ctor: 'MStrokeDash', _0: a};
};
var _gicentre$elm_vega$Vega$maStrokeDash = _gicentre$elm_vega$Vega$MStrokeDash;
var _gicentre$elm_vega$Vega$MStrokeCap = function (a) {
	return {ctor: 'MStrokeCap', _0: a};
};
var _gicentre$elm_vega$Vega$maStrokeCap = _gicentre$elm_vega$Vega$MStrokeCap;
var _gicentre$elm_vega$Vega$MStrokeWidth = function (a) {
	return {ctor: 'MStrokeWidth', _0: a};
};
var _gicentre$elm_vega$Vega$maStrokeWidth = _gicentre$elm_vega$Vega$MStrokeWidth;
var _gicentre$elm_vega$Vega$MStrokeOpacity = function (a) {
	return {ctor: 'MStrokeOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$maStrokeOpacity = _gicentre$elm_vega$Vega$MStrokeOpacity;
var _gicentre$elm_vega$Vega$MStroke = function (a) {
	return {ctor: 'MStroke', _0: a};
};
var _gicentre$elm_vega$Vega$maStroke = _gicentre$elm_vega$Vega$MStroke;
var _gicentre$elm_vega$Vega$MFillOpacity = function (a) {
	return {ctor: 'MFillOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$maFillOpacity = _gicentre$elm_vega$Vega$MFillOpacity;
var _gicentre$elm_vega$Vega$MFill = function (a) {
	return {ctor: 'MFill', _0: a};
};
var _gicentre$elm_vega$Vega$maFill = _gicentre$elm_vega$Vega$MFill;
var _gicentre$elm_vega$Vega$MOpacity = function (a) {
	return {ctor: 'MOpacity', _0: a};
};
var _gicentre$elm_vega$Vega$maOpacity = _gicentre$elm_vega$Vega$MOpacity;
var _gicentre$elm_vega$Vega$MHeight = function (a) {
	return {ctor: 'MHeight', _0: a};
};
var _gicentre$elm_vega$Vega$maHeight = _gicentre$elm_vega$Vega$MHeight;
var _gicentre$elm_vega$Vega$MYC = function (a) {
	return {ctor: 'MYC', _0: a};
};
var _gicentre$elm_vega$Vega$maYC = _gicentre$elm_vega$Vega$MYC;
var _gicentre$elm_vega$Vega$MY2 = function (a) {
	return {ctor: 'MY2', _0: a};
};
var _gicentre$elm_vega$Vega$maY2 = _gicentre$elm_vega$Vega$MY2;
var _gicentre$elm_vega$Vega$MY = function (a) {
	return {ctor: 'MY', _0: a};
};
var _gicentre$elm_vega$Vega$maY = _gicentre$elm_vega$Vega$MY;
var _gicentre$elm_vega$Vega$MWidth = function (a) {
	return {ctor: 'MWidth', _0: a};
};
var _gicentre$elm_vega$Vega$maWidth = _gicentre$elm_vega$Vega$MWidth;
var _gicentre$elm_vega$Vega$MXC = function (a) {
	return {ctor: 'MXC', _0: a};
};
var _gicentre$elm_vega$Vega$maXC = _gicentre$elm_vega$Vega$MXC;
var _gicentre$elm_vega$Vega$MX2 = function (a) {
	return {ctor: 'MX2', _0: a};
};
var _gicentre$elm_vega$Vega$maX2 = _gicentre$elm_vega$Vega$MX2;
var _gicentre$elm_vega$Vega$MX = function (a) {
	return {ctor: 'MX', _0: a};
};
var _gicentre$elm_vega$Vega$maX = _gicentre$elm_vega$Vega$MX;
var _gicentre$elm_vega$Vega$NumNull = {ctor: 'NumNull'};
var _gicentre$elm_vega$Vega$numNull = _gicentre$elm_vega$Vega$NumNull;
var _gicentre$elm_vega$Vega$NumExpr = function (a) {
	return {ctor: 'NumExpr', _0: a};
};
var _gicentre$elm_vega$Vega$numExpr = _gicentre$elm_vega$Vega$NumExpr;
var _gicentre$elm_vega$Vega$NumList = function (a) {
	return {ctor: 'NumList', _0: a};
};
var _gicentre$elm_vega$Vega$numList = _gicentre$elm_vega$Vega$NumList;
var _gicentre$elm_vega$Vega$NumSignals = function (a) {
	return {ctor: 'NumSignals', _0: a};
};
var _gicentre$elm_vega$Vega$numSignals = _gicentre$elm_vega$Vega$NumSignals;
var _gicentre$elm_vega$Vega$NumSignal = function (a) {
	return {ctor: 'NumSignal', _0: a};
};
var _gicentre$elm_vega$Vega$numSignal = _gicentre$elm_vega$Vega$NumSignal;
var _gicentre$elm_vega$Vega$numArrayProperty = F3(
	function (len, name, n) {
		var _p70 = n;
		switch (_p70.ctor) {
			case 'Nums':
				var _p71 = _p70._0;
				return _elm_lang$core$Native_Utils.eq(
					_elm_lang$core$List$length(_p71),
					len) ? {
					ctor: '_Tuple2',
					_0: name,
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p71))
				} : A2(
					_elm_lang$core$Debug$log,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'Warning: ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							name,
							A2(
								_elm_lang$core$Basics_ops['++'],
								' expecting list of ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(len),
									A2(
										_elm_lang$core$Basics_ops['++'],
										' numbers but was given ',
										_elm_lang$core$Basics$toString(_p71)))))),
					{ctor: '_Tuple2', _0: name, _1: _elm_lang$core$Json_Encode$null});
			case 'NumSignal':
				return {
					ctor: '_Tuple2',
					_0: name,
					_1: _gicentre$elm_vega$Vega$numSpec(
						_gicentre$elm_vega$Vega$NumSignal(_p70._0))
				};
			case 'NumSignals':
				var _p72 = _p70._0;
				return _elm_lang$core$Native_Utils.eq(
					_elm_lang$core$List$length(_p72),
					len) ? {
					ctor: '_Tuple2',
					_0: name,
					_1: _gicentre$elm_vega$Vega$numSpec(
						_gicentre$elm_vega$Vega$NumSignals(_p72))
				} : A2(
					_elm_lang$core$Debug$log,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'Warning: ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							name,
							A2(
								_elm_lang$core$Basics_ops['++'],
								' expecting list of ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(len),
									A2(
										_elm_lang$core$Basics_ops['++'],
										' signals but was given ',
										_elm_lang$core$Basics$toString(_p72)))))),
					{ctor: '_Tuple2', _0: name, _1: _elm_lang$core$Json_Encode$null});
			case 'NumList':
				var _p73 = _p70._0;
				return _elm_lang$core$Native_Utils.eq(
					_elm_lang$core$List$length(_p73),
					len) ? {
					ctor: '_Tuple2',
					_0: name,
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$numSpec, _p73))
				} : A2(
					_elm_lang$core$Debug$log,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'Warning: ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							name,
							A2(
								_elm_lang$core$Basics_ops['++'],
								' expecting list of ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(len),
									A2(
										_elm_lang$core$Basics_ops['++'],
										' nums but was given ',
										_elm_lang$core$Basics$toString(_p73)))))),
					{ctor: '_Tuple2', _0: name, _1: _elm_lang$core$Json_Encode$null});
			default:
				return A2(
					_elm_lang$core$Debug$log,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'Warning: ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							name,
							A2(
								_elm_lang$core$Basics_ops['++'],
								' expecting list of 2 numbers but was given ',
								_elm_lang$core$Basics$toString(n)))),
					{ctor: '_Tuple2', _0: name, _1: _elm_lang$core$Json_Encode$null});
		}
	});
var _gicentre$elm_vega$Vega$densityProperty = function (dnp) {
	var _p74 = dnp;
	switch (_p74.ctor) {
		case 'DnExtent':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'extent', _p74._0);
		case 'DnMethod':
			var _p75 = _p74._0;
			switch (_p75.ctor) {
				case 'PDF':
					return {
						ctor: '_Tuple2',
						_0: 'method',
						_1: _elm_lang$core$Json_Encode$string('pdf')
					};
				case 'CDF':
					return {
						ctor: '_Tuple2',
						_0: 'method',
						_1: _elm_lang$core$Json_Encode$string('cdf')
					};
				default:
					return {
						ctor: '_Tuple2',
						_0: 'method',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'signal',
									_1: _elm_lang$core$Json_Encode$string(_p75._0)
								},
								_1: {ctor: '[]'}
							})
					};
			}
		case 'DnSteps':
			return {
				ctor: '_Tuple2',
				_0: 'steps',
				_1: _gicentre$elm_vega$Vega$numSpec(_p74._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(_p74._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(_p74._1),
							_1: {ctor: '[]'}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$schemeProperty = function (sProps) {
	var _p76 = sProps;
	switch (_p76.ctor) {
		case 'SScheme':
			return {
				ctor: '_Tuple2',
				_0: 'scheme',
				_1: _gicentre$elm_vega$Vega$strSpec(_p76._0)
			};
		case 'SCount':
			return {
				ctor: '_Tuple2',
				_0: 'count',
				_1: _gicentre$elm_vega$Vega$numSpec(_p76._0)
			};
		default:
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'extent', _p76._0);
	}
};
var _gicentre$elm_vega$Vega$Nums = function (a) {
	return {ctor: 'Nums', _0: a};
};
var _gicentre$elm_vega$Vega$nums = _gicentre$elm_vega$Vega$Nums;
var _gicentre$elm_vega$Vega$Num = function (a) {
	return {ctor: 'Num', _0: a};
};
var _gicentre$elm_vega$Vega$num = _gicentre$elm_vega$Vega$Num;
var _gicentre$elm_vega$Vega$PaAs = F5(
	function (a, b, c, d, e) {
		return {ctor: 'PaAs', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _gicentre$elm_vega$Vega$paAs = F5(
	function (x, y, r, depth, children) {
		return A5(_gicentre$elm_vega$Vega$PaAs, x, y, r, depth, children);
	});
var _gicentre$elm_vega$Vega$PaPadding = function (a) {
	return {ctor: 'PaPadding', _0: a};
};
var _gicentre$elm_vega$Vega$paPadding = _gicentre$elm_vega$Vega$PaPadding;
var _gicentre$elm_vega$Vega$PaRadius = function (a) {
	return {ctor: 'PaRadius', _0: a};
};
var _gicentre$elm_vega$Vega$paRadius = _gicentre$elm_vega$Vega$PaRadius;
var _gicentre$elm_vega$Vega$PaSize = function (a) {
	return {ctor: 'PaSize', _0: a};
};
var _gicentre$elm_vega$Vega$paSize = function (n) {
	return _gicentre$elm_vega$Vega$PaSize(n);
};
var _gicentre$elm_vega$Vega$PaSort = function (a) {
	return {ctor: 'PaSort', _0: a};
};
var _gicentre$elm_vega$Vega$paSort = _gicentre$elm_vega$Vega$PaSort;
var _gicentre$elm_vega$Vega$PaField = function (a) {
	return {ctor: 'PaField', _0: a};
};
var _gicentre$elm_vega$Vega$paField = _gicentre$elm_vega$Vega$PaField;
var _gicentre$elm_vega$Vega$PtAs = F6(
	function (a, b, c, d, e, f) {
		return {ctor: 'PtAs', _0: a, _1: b, _2: c, _3: d, _4: e, _5: f};
	});
var _gicentre$elm_vega$Vega$ptAs = _gicentre$elm_vega$Vega$PtAs;
var _gicentre$elm_vega$Vega$PtSize = function (a) {
	return {ctor: 'PtSize', _0: a};
};
var _gicentre$elm_vega$Vega$ptSize = _gicentre$elm_vega$Vega$PtSize;
var _gicentre$elm_vega$Vega$PtRound = function (a) {
	return {ctor: 'PtRound', _0: a};
};
var _gicentre$elm_vega$Vega$ptRound = _gicentre$elm_vega$Vega$PtRound;
var _gicentre$elm_vega$Vega$PtPadding = function (a) {
	return {ctor: 'PtPadding', _0: a};
};
var _gicentre$elm_vega$Vega$ptPadding = _gicentre$elm_vega$Vega$PtPadding;
var _gicentre$elm_vega$Vega$PtSort = function (a) {
	return {ctor: 'PtSort', _0: a};
};
var _gicentre$elm_vega$Vega$ptSort = _gicentre$elm_vega$Vega$PtSort;
var _gicentre$elm_vega$Vega$PtField = function (a) {
	return {ctor: 'PtField', _0: a};
};
var _gicentre$elm_vega$Vega$ptField = _gicentre$elm_vega$Vega$PtField;
var _gicentre$elm_vega$Vega$PiAs = F2(
	function (a, b) {
		return {ctor: 'PiAs', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$piAs = F2(
	function (start, end) {
		return A2(_gicentre$elm_vega$Vega$PiAs, start, end);
	});
var _gicentre$elm_vega$Vega$PiSort = function (a) {
	return {ctor: 'PiSort', _0: a};
};
var _gicentre$elm_vega$Vega$piSort = _gicentre$elm_vega$Vega$PiSort;
var _gicentre$elm_vega$Vega$PiEndAngle = function (a) {
	return {ctor: 'PiEndAngle', _0: a};
};
var _gicentre$elm_vega$Vega$piEndAngle = _gicentre$elm_vega$Vega$PiEndAngle;
var _gicentre$elm_vega$Vega$PiStartAngle = function (a) {
	return {ctor: 'PiStartAngle', _0: a};
};
var _gicentre$elm_vega$Vega$piStartAngle = _gicentre$elm_vega$Vega$PiStartAngle;
var _gicentre$elm_vega$Vega$PiField = function (a) {
	return {ctor: 'PiField', _0: a};
};
var _gicentre$elm_vega$Vega$piField = _gicentre$elm_vega$Vega$PiField;
var _gicentre$elm_vega$Vega$PiOp = function (a) {
	return {ctor: 'PiOp', _0: a};
};
var _gicentre$elm_vega$Vega$piOp = _gicentre$elm_vega$Vega$PiOp;
var _gicentre$elm_vega$Vega$PiLimit = function (a) {
	return {ctor: 'PiLimit', _0: a};
};
var _gicentre$elm_vega$Vega$piLimit = _gicentre$elm_vega$Vega$PiLimit;
var _gicentre$elm_vega$Vega$PiGroupBy = function (a) {
	return {ctor: 'PiGroupBy', _0: a};
};
var _gicentre$elm_vega$Vega$piGroupBy = _gicentre$elm_vega$Vega$PiGroupBy;
var _gicentre$elm_vega$Vega$PrTilt = function (a) {
	return {ctor: 'PrTilt', _0: a};
};
var _gicentre$elm_vega$Vega$prTilt = _gicentre$elm_vega$Vega$PrTilt;
var _gicentre$elm_vega$Vega$PrSpacing = function (a) {
	return {ctor: 'PrSpacing', _0: a};
};
var _gicentre$elm_vega$Vega$prSpacing = _gicentre$elm_vega$Vega$PrSpacing;
var _gicentre$elm_vega$Vega$PrRatio = function (a) {
	return {ctor: 'PrRatio', _0: a};
};
var _gicentre$elm_vega$Vega$prRatio = _gicentre$elm_vega$Vega$PrRatio;
var _gicentre$elm_vega$Vega$PrRadius = function (a) {
	return {ctor: 'PrRadius', _0: a};
};
var _gicentre$elm_vega$Vega$prRadius = _gicentre$elm_vega$Vega$PrRadius;
var _gicentre$elm_vega$Vega$PrParallel = function (a) {
	return {ctor: 'PrParallel', _0: a};
};
var _gicentre$elm_vega$Vega$prParallel = _gicentre$elm_vega$Vega$PrParallel;
var _gicentre$elm_vega$Vega$PrLobes = function (a) {
	return {ctor: 'PrLobes', _0: a};
};
var _gicentre$elm_vega$Vega$prLobes = _gicentre$elm_vega$Vega$PrLobes;
var _gicentre$elm_vega$Vega$PrFraction = function (a) {
	return {ctor: 'PrFraction', _0: a};
};
var _gicentre$elm_vega$Vega$prFraction = _gicentre$elm_vega$Vega$PrFraction;
var _gicentre$elm_vega$Vega$PrDistance = function (a) {
	return {ctor: 'PrDistance', _0: a};
};
var _gicentre$elm_vega$Vega$prDistance = _gicentre$elm_vega$Vega$PrDistance;
var _gicentre$elm_vega$Vega$PrCoefficient = function (a) {
	return {ctor: 'PrCoefficient', _0: a};
};
var _gicentre$elm_vega$Vega$prCoefficient = _gicentre$elm_vega$Vega$PrCoefficient;
var _gicentre$elm_vega$Vega$PrSize = function (a) {
	return {ctor: 'PrSize', _0: a};
};
var _gicentre$elm_vega$Vega$prSize = _gicentre$elm_vega$Vega$PrSize;
var _gicentre$elm_vega$Vega$PrExtent = function (a) {
	return {ctor: 'PrExtent', _0: a};
};
var _gicentre$elm_vega$Vega$prExtent = _gicentre$elm_vega$Vega$PrExtent;
var _gicentre$elm_vega$Vega$PrFit = function (a) {
	return {ctor: 'PrFit', _0: a};
};
var _gicentre$elm_vega$Vega$prFit = _gicentre$elm_vega$Vega$PrFit;
var _gicentre$elm_vega$Vega$PrPrecision = function (a) {
	return {ctor: 'PrPrecision', _0: a};
};
var _gicentre$elm_vega$Vega$prPrecision = _gicentre$elm_vega$Vega$PrPrecision;
var _gicentre$elm_vega$Vega$PrPointRadius = function (a) {
	return {ctor: 'PrPointRadius', _0: a};
};
var _gicentre$elm_vega$Vega$prPointRadius = _gicentre$elm_vega$Vega$PrPointRadius;
var _gicentre$elm_vega$Vega$PrRotate = function (a) {
	return {ctor: 'PrRotate', _0: a};
};
var _gicentre$elm_vega$Vega$prRotate = _gicentre$elm_vega$Vega$PrRotate;
var _gicentre$elm_vega$Vega$PrCenter = function (a) {
	return {ctor: 'PrCenter', _0: a};
};
var _gicentre$elm_vega$Vega$prCenter = _gicentre$elm_vega$Vega$PrCenter;
var _gicentre$elm_vega$Vega$PrTranslate = function (a) {
	return {ctor: 'PrTranslate', _0: a};
};
var _gicentre$elm_vega$Vega$prTranslate = _gicentre$elm_vega$Vega$PrTranslate;
var _gicentre$elm_vega$Vega$PrScale = function (a) {
	return {ctor: 'PrScale', _0: a};
};
var _gicentre$elm_vega$Vega$prScale = _gicentre$elm_vega$Vega$PrScale;
var _gicentre$elm_vega$Vega$PrClipExtent = function (a) {
	return {ctor: 'PrClipExtent', _0: a};
};
var _gicentre$elm_vega$Vega$prClipExtent = _gicentre$elm_vega$Vega$PrClipExtent;
var _gicentre$elm_vega$Vega$PrClipAngle = function (a) {
	return {ctor: 'PrClipAngle', _0: a};
};
var _gicentre$elm_vega$Vega$prClipAngle = _gicentre$elm_vega$Vega$PrClipAngle;
var _gicentre$elm_vega$Vega$PrType = function (a) {
	return {ctor: 'PrType', _0: a};
};
var _gicentre$elm_vega$Vega$prType = _gicentre$elm_vega$Vega$PrType;
var _gicentre$elm_vega$Vega$DoData = function (a) {
	return {ctor: 'DoData', _0: a};
};
var _gicentre$elm_vega$Vega$doData = _gicentre$elm_vega$Vega$DoData;
var _gicentre$elm_vega$Vega$DoStrs = function (a) {
	return {ctor: 'DoStrs', _0: a};
};
var _gicentre$elm_vega$Vega$doStrs = _gicentre$elm_vega$Vega$DoStrs;
var _gicentre$elm_vega$Vega$DoNums = function (a) {
	return {ctor: 'DoNums', _0: a};
};
var _gicentre$elm_vega$Vega$doNums = _gicentre$elm_vega$Vega$DoNums;
var _gicentre$elm_vega$Vega$SRangeStep = function (a) {
	return {ctor: 'SRangeStep', _0: a};
};
var _gicentre$elm_vega$Vega$scRangeStep = _gicentre$elm_vega$Vega$SRangeStep;
var _gicentre$elm_vega$Vega$SPaddingOuter = function (a) {
	return {ctor: 'SPaddingOuter', _0: a};
};
var _gicentre$elm_vega$Vega$scPaddingOuter = _gicentre$elm_vega$Vega$SPaddingOuter;
var _gicentre$elm_vega$Vega$SPaddingInner = function (a) {
	return {ctor: 'SPaddingInner', _0: a};
};
var _gicentre$elm_vega$Vega$scPaddingInner = _gicentre$elm_vega$Vega$SPaddingInner;
var _gicentre$elm_vega$Vega$SDomainImplicit = function (a) {
	return {ctor: 'SDomainImplicit', _0: a};
};
var _gicentre$elm_vega$Vega$scDomainImplicit = _gicentre$elm_vega$Vega$SDomainImplicit;
var _gicentre$elm_vega$Vega$SAlign = function (a) {
	return {ctor: 'SAlign', _0: a};
};
var _gicentre$elm_vega$Vega$scAlign = _gicentre$elm_vega$Vega$SAlign;
var _gicentre$elm_vega$Vega$SBase = function (a) {
	return {ctor: 'SBase', _0: a};
};
var _gicentre$elm_vega$Vega$scBase = _gicentre$elm_vega$Vega$SBase;
var _gicentre$elm_vega$Vega$SExponent = function (a) {
	return {ctor: 'SExponent', _0: a};
};
var _gicentre$elm_vega$Vega$scExponent = _gicentre$elm_vega$Vega$SExponent;
var _gicentre$elm_vega$Vega$SZero = function (a) {
	return {ctor: 'SZero', _0: a};
};
var _gicentre$elm_vega$Vega$scZero = _gicentre$elm_vega$Vega$SZero;
var _gicentre$elm_vega$Vega$SNice = function (a) {
	return {ctor: 'SNice', _0: a};
};
var _gicentre$elm_vega$Vega$scNice = _gicentre$elm_vega$Vega$SNice;
var _gicentre$elm_vega$Vega$SPadding = function (a) {
	return {ctor: 'SPadding', _0: a};
};
var _gicentre$elm_vega$Vega$scPadding = _gicentre$elm_vega$Vega$SPadding;
var _gicentre$elm_vega$Vega$SInterpolate = function (a) {
	return {ctor: 'SInterpolate', _0: a};
};
var _gicentre$elm_vega$Vega$scInterpolate = _gicentre$elm_vega$Vega$SInterpolate;
var _gicentre$elm_vega$Vega$SClamp = function (a) {
	return {ctor: 'SClamp', _0: a};
};
var _gicentre$elm_vega$Vega$scClamp = _gicentre$elm_vega$Vega$SClamp;
var _gicentre$elm_vega$Vega$SRound = function (a) {
	return {ctor: 'SRound', _0: a};
};
var _gicentre$elm_vega$Vega$scRound = _gicentre$elm_vega$Vega$SRound;
var _gicentre$elm_vega$Vega$SReverse = function (a) {
	return {ctor: 'SReverse', _0: a};
};
var _gicentre$elm_vega$Vega$scReverse = _gicentre$elm_vega$Vega$SReverse;
var _gicentre$elm_vega$Vega$SRange = function (a) {
	return {ctor: 'SRange', _0: a};
};
var _gicentre$elm_vega$Vega$scRange = _gicentre$elm_vega$Vega$SRange;
var _gicentre$elm_vega$Vega$SDomainRaw = function (a) {
	return {ctor: 'SDomainRaw', _0: a};
};
var _gicentre$elm_vega$Vega$scDomainRaw = _gicentre$elm_vega$Vega$SDomainRaw;
var _gicentre$elm_vega$Vega$SDomainMid = function (a) {
	return {ctor: 'SDomainMid', _0: a};
};
var _gicentre$elm_vega$Vega$scDomainMid = _gicentre$elm_vega$Vega$SDomainMid;
var _gicentre$elm_vega$Vega$SDomainMin = function (a) {
	return {ctor: 'SDomainMin', _0: a};
};
var _gicentre$elm_vega$Vega$scDomainMin = _gicentre$elm_vega$Vega$SDomainMin;
var _gicentre$elm_vega$Vega$SDomainMax = function (a) {
	return {ctor: 'SDomainMax', _0: a};
};
var _gicentre$elm_vega$Vega$scDomainMax = _gicentre$elm_vega$Vega$SDomainMax;
var _gicentre$elm_vega$Vega$SDomain = function (a) {
	return {ctor: 'SDomain', _0: a};
};
var _gicentre$elm_vega$Vega$scDomain = _gicentre$elm_vega$Vega$SDomain;
var _gicentre$elm_vega$Vega$SType = function (a) {
	return {ctor: 'SType', _0: a};
};
var _gicentre$elm_vega$Vega$scType = _gicentre$elm_vega$Vega$SType;
var _gicentre$elm_vega$Vega$ScaleRangeSignal = function (a) {
	return {ctor: 'ScaleRangeSignal', _0: a};
};
var _gicentre$elm_vega$Vega$scaleRangeSignal = _gicentre$elm_vega$Vega$ScaleRangeSignal;
var _gicentre$elm_vega$Vega$RaHeatmap = {ctor: 'RaHeatmap'};
var _gicentre$elm_vega$Vega$RaRamp = {ctor: 'RaRamp'};
var _gicentre$elm_vega$Vega$RaOrdinal = {ctor: 'RaOrdinal'};
var _gicentre$elm_vega$Vega$RaDiverging = {ctor: 'RaDiverging'};
var _gicentre$elm_vega$Vega$RaCategory = {ctor: 'RaCategory'};
var _gicentre$elm_vega$Vega$RaSymbol = {ctor: 'RaSymbol'};
var _gicentre$elm_vega$Vega$RaHeight = {ctor: 'RaHeight'};
var _gicentre$elm_vega$Vega$RaWidth = {ctor: 'RaWidth'};
var _gicentre$elm_vega$Vega$RCustom = function (a) {
	return {ctor: 'RCustom', _0: a};
};
var _gicentre$elm_vega$Vega$raCustomDefault = _gicentre$elm_vega$Vega$RCustom;
var _gicentre$elm_vega$Vega$RStep = function (a) {
	return {ctor: 'RStep', _0: a};
};
var _gicentre$elm_vega$Vega$raStep = _gicentre$elm_vega$Vega$RStep;
var _gicentre$elm_vega$Vega$RData = function (a) {
	return {ctor: 'RData', _0: a};
};
var _gicentre$elm_vega$Vega$raData = _gicentre$elm_vega$Vega$RData;
var _gicentre$elm_vega$Vega$RScheme = F2(
	function (a, b) {
		return {ctor: 'RScheme', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$raScheme = _gicentre$elm_vega$Vega$RScheme;
var _gicentre$elm_vega$Vega$RSignal = function (a) {
	return {ctor: 'RSignal', _0: a};
};
var _gicentre$elm_vega$Vega$raSignal = _gicentre$elm_vega$Vega$RSignal;
var _gicentre$elm_vega$Vega$RValues = function (a) {
	return {ctor: 'RValues', _0: a};
};
var _gicentre$elm_vega$Vega$raValues = _gicentre$elm_vega$Vega$RValues;
var _gicentre$elm_vega$Vega$RStrs = function (a) {
	return {ctor: 'RStrs', _0: a};
};
var _gicentre$elm_vega$Vega$raStrs = _gicentre$elm_vega$Vega$RStrs;
var _gicentre$elm_vega$Vega$RNums = function (a) {
	return {ctor: 'RNums', _0: a};
};
var _gicentre$elm_vega$Vega$raNums = _gicentre$elm_vega$Vega$RNums;
var _gicentre$elm_vega$Vega$SiPushOuter = {ctor: 'SiPushOuter'};
var _gicentre$elm_vega$Vega$siPushOuter = _gicentre$elm_vega$Vega$SiPushOuter;
var _gicentre$elm_vega$Vega$SiValue = function (a) {
	return {ctor: 'SiValue', _0: a};
};
var _gicentre$elm_vega$Vega$siValue = _gicentre$elm_vega$Vega$SiValue;
var _gicentre$elm_vega$Vega$SiReact = function (a) {
	return {ctor: 'SiReact', _0: a};
};
var _gicentre$elm_vega$Vega$siReact = _gicentre$elm_vega$Vega$SiReact;
var _gicentre$elm_vega$Vega$SiUpdate = function (a) {
	return {ctor: 'SiUpdate', _0: a};
};
var _gicentre$elm_vega$Vega$siUpdate = _gicentre$elm_vega$Vega$SiUpdate;
var _gicentre$elm_vega$Vega$SiOn = function (a) {
	return {ctor: 'SiOn', _0: a};
};
var _gicentre$elm_vega$Vega$siOn = _gicentre$elm_vega$Vega$SiOn;
var _gicentre$elm_vega$Vega$SiDescription = function (a) {
	return {ctor: 'SiDescription', _0: a};
};
var _gicentre$elm_vega$Vega$siDescription = _gicentre$elm_vega$Vega$SiDescription;
var _gicentre$elm_vega$Vega$SiBind = function (a) {
	return {ctor: 'SiBind', _0: a};
};
var _gicentre$elm_vega$Vega$siBind = _gicentre$elm_vega$Vega$SiBind;
var _gicentre$elm_vega$Vega$SiName = function (a) {
	return {ctor: 'SiName', _0: a};
};
var _gicentre$elm_vega$Vega$siName = _gicentre$elm_vega$Vega$SiName;
var _gicentre$elm_vega$Vega$SFacet = F3(
	function (a, b, c) {
		return {ctor: 'SFacet', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$srFacet = F2(
	function (d, name) {
		return A2(_gicentre$elm_vega$Vega$SFacet, d, name);
	});
var _gicentre$elm_vega$Vega$SData = function (a) {
	return {ctor: 'SData', _0: a};
};
var _gicentre$elm_vega$Vega$srData = _gicentre$elm_vega$Vega$SData;
var _gicentre$elm_vega$Vega$StAs = F2(
	function (a, b) {
		return {ctor: 'StAs', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$stAs = F2(
	function (y0, y1) {
		return A2(_gicentre$elm_vega$Vega$StAs, y0, y1);
	});
var _gicentre$elm_vega$Vega$StOffset = function (a) {
	return {ctor: 'StOffset', _0: a};
};
var _gicentre$elm_vega$Vega$stOffset = _gicentre$elm_vega$Vega$StOffset;
var _gicentre$elm_vega$Vega$StSort = function (a) {
	return {ctor: 'StSort', _0: a};
};
var _gicentre$elm_vega$Vega$stSort = _gicentre$elm_vega$Vega$StSort;
var _gicentre$elm_vega$Vega$StGroupBy = function (a) {
	return {ctor: 'StGroupBy', _0: a};
};
var _gicentre$elm_vega$Vega$stGroupBy = _gicentre$elm_vega$Vega$StGroupBy;
var _gicentre$elm_vega$Vega$StField = function (a) {
	return {ctor: 'StField', _0: a};
};
var _gicentre$elm_vega$Vega$stField = _gicentre$elm_vega$Vega$StField;
var _gicentre$elm_vega$Vega$StrNull = {ctor: 'StrNull'};
var _gicentre$elm_vega$Vega$strNull = _gicentre$elm_vega$Vega$StrNull;
var _gicentre$elm_vega$Vega$StrExpr = function (a) {
	return {ctor: 'StrExpr', _0: a};
};
var _gicentre$elm_vega$Vega$strExpr = _gicentre$elm_vega$Vega$StrExpr;
var _gicentre$elm_vega$Vega$fieldSpec = function (fVal) {
	var _p77 = fVal;
	switch (_p77.ctor) {
		case 'FName':
			return _elm_lang$core$Json_Encode$string(_p77._0);
		case 'FExpr':
			return _gicentre$elm_vega$Vega$strSpec(
				_gicentre$elm_vega$Vega$strExpr(
					_gicentre$elm_vega$Vega$expr(_p77._0)));
		case 'FSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p77._0),
					_1: {ctor: '[]'}
				});
		case 'FDatum':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'datum',
						_1: _gicentre$elm_vega$Vega$fieldSpec(_p77._0)
					},
					_1: {ctor: '[]'}
				});
		case 'FGroup':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'group',
						_1: _gicentre$elm_vega$Vega$fieldSpec(_p77._0)
					},
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'parent',
						_1: _gicentre$elm_vega$Vega$fieldSpec(_p77._0)
					},
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$aggregateProperty = function (ap) {
	var _p78 = ap;
	switch (_p78.ctor) {
		case 'AgGroupBy':
			return {
				ctor: '_Tuple2',
				_0: 'groupby',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p78._0))
			};
		case 'AgFields':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p78._0))
			};
		case 'AgOps':
			return {
				ctor: '_Tuple2',
				_0: 'ops',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$opSpec, _p78._0))
			};
		case 'AgAs':
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p78._0))
			};
		case 'AgCross':
			return {
				ctor: '_Tuple2',
				_0: 'cross',
				_1: _gicentre$elm_vega$Vega$booSpec(_p78._0)
			};
		case 'AgDrop':
			return {
				ctor: '_Tuple2',
				_0: 'drop',
				_1: _gicentre$elm_vega$Vega$booSpec(_p78._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'key',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p78._0)
			};
	}
};
var _gicentre$elm_vega$Vega$comparatorProperties = function (comp) {
	var _p79 = _elm_lang$core$List$unzip(comp);
	var fs = _p79._0;
	var os = _p79._1;
	return {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'field',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, fs))
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'order',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$orderSpec, os))
			},
			_1: {ctor: '[]'}
		}
	};
};
var _gicentre$elm_vega$Vega$contourProperty = function (cnProp) {
	var _p80 = cnProp;
	switch (_p80.ctor) {
		case 'CnValues':
			var _p82 = _p80._0;
			var _p81 = _p82;
			if (_p81.ctor === 'Num') {
				return A2(
					_elm_lang$core$Debug$log,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'Warning: cnValues expecting list of numbers or signals but was given ',
						_elm_lang$core$Basics$toString(_p82)),
					{ctor: '_Tuple2', _0: 'values', _1: _elm_lang$core$Json_Encode$null});
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'values',
					_1: _gicentre$elm_vega$Vega$numSpec(_p82)
				};
			}
		case 'CnX':
			return {
				ctor: '_Tuple2',
				_0: 'x',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p80._0)
			};
		case 'CnY':
			return {
				ctor: '_Tuple2',
				_0: 'y',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p80._0)
			};
		case 'CnCellSize':
			return {
				ctor: '_Tuple2',
				_0: 'cellSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p80._0)
			};
		case 'CnBandwidth':
			return {
				ctor: '_Tuple2',
				_0: 'bandwidth',
				_1: _gicentre$elm_vega$Vega$numSpec(_p80._0)
			};
		case 'CnSmooth':
			return {
				ctor: '_Tuple2',
				_0: 'smooth',
				_1: _gicentre$elm_vega$Vega$booSpec(_p80._0)
			};
		case 'CnThresholds':
			var _p84 = _p80._0;
			var _p83 = _p84;
			if (_p83.ctor === 'Num') {
				return A2(
					_elm_lang$core$Debug$log,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'Warning: cnThresholds expecting list of numbers or signals but was given ',
						_elm_lang$core$Basics$toString(_p84)),
					{ctor: '_Tuple2', _0: 'thresholds', _1: _elm_lang$core$Json_Encode$null});
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'thresholds',
					_1: _gicentre$elm_vega$Vega$numSpec(_p84)
				};
			}
		case 'CnCount':
			return {
				ctor: '_Tuple2',
				_0: 'count',
				_1: _gicentre$elm_vega$Vega$numSpec(_p80._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'nice',
				_1: _gicentre$elm_vega$Vega$booSpec(_p80._0)
			};
	}
};
var _gicentre$elm_vega$Vega$distributionSpec = function (dist) {
	var _p85 = dist;
	switch (_p85.ctor) {
		case 'DiNormal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'function',
						_1: _elm_lang$core$Json_Encode$string('normal')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'mean',
							_1: _gicentre$elm_vega$Vega$numSpec(_p85._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'stdev',
								_1: _gicentre$elm_vega$Vega$numSpec(_p85._1)
							},
							_1: {ctor: '[]'}
						}
					}
				});
		case 'DiUniform':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'function',
						_1: _elm_lang$core$Json_Encode$string('uniform')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'min',
							_1: _gicentre$elm_vega$Vega$numSpec(_p85._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'max',
								_1: _gicentre$elm_vega$Vega$numSpec(_p85._1)
							},
							_1: {ctor: '[]'}
						}
					}
				});
		case 'DiKde':
			var _p88 = _p85._1;
			var _p87 = _p85._0;
			var _p86 = _p85._2;
			return _elm_lang$core$Native_Utils.eq(_p87, '') ? _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'function',
						_1: _elm_lang$core$Json_Encode$string('kde')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'field',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p88)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'bandwidth',
								_1: _gicentre$elm_vega$Vega$numSpec(_p86)
							},
							_1: {ctor: '[]'}
						}
					}
				}) : _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'function',
						_1: _elm_lang$core$Json_Encode$string('kde')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'from',
							_1: _elm_lang$core$Json_Encode$string(_p87)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'field',
								_1: _gicentre$elm_vega$Vega$fieldSpec(_p88)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'bandwidth',
									_1: _gicentre$elm_vega$Vega$numSpec(_p86)
								},
								_1: {ctor: '[]'}
							}
						}
					}
				});
		default:
			var _p89 = _p85._0;
			var probs = A2(
				_elm_lang$core$List$map,
				_gicentre$elm_vega$Vega$numSpec,
				_elm_lang$core$Tuple$second(
					_elm_lang$core$List$unzip(_p89)));
			var dists = A2(
				_elm_lang$core$List$map,
				_gicentre$elm_vega$Vega$distributionSpec,
				_elm_lang$core$Tuple$first(
					_elm_lang$core$List$unzip(_p89)));
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'function',
						_1: _elm_lang$core$Json_Encode$string('mixture')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'distributions',
							_1: _elm_lang$core$Json_Encode$list(dists)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'weights',
								_1: _elm_lang$core$Json_Encode$list(probs)
							},
							_1: {ctor: '[]'}
						}
					}
				});
	}
};
var _gicentre$elm_vega$Vega$facetProperty = function (fct) {
	var _p90 = fct;
	switch (_p90.ctor) {
		case 'FaName':
			return {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(_p90._0)
			};
		case 'FaData':
			return {
				ctor: '_Tuple2',
				_0: 'data',
				_1: _gicentre$elm_vega$Vega$strSpec(_p90._0)
			};
		case 'FaField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p90._0)
			};
		case 'FaGroupBy':
			return {
				ctor: '_Tuple2',
				_0: 'groupby',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p90._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$aggregateProperty, _p90._0))
			};
	}
};
var _gicentre$elm_vega$Vega$sourceProperty = function (src) {
	var _p91 = src;
	if (_p91.ctor === 'SData') {
		return {
			ctor: '_Tuple2',
			_0: 'data',
			_1: _gicentre$elm_vega$Vega$strSpec(_p91._0)
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'facet',
			_1: _elm_lang$core$Json_Encode$object(
				A2(
					_elm_lang$core$List$map,
					_gicentre$elm_vega$Vega$facetProperty,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$FaData(_p91._0),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$FaName(_p91._1),
							_1: _p91._2
						}
					}))
		};
	}
};
var _gicentre$elm_vega$Vega$forceProperty = function (fp) {
	var _p92 = fp;
	switch (_p92.ctor) {
		case 'FpX':
			return {
				ctor: '_Tuple2',
				_0: 'x',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p92._0)
			};
		case 'FpY':
			return {
				ctor: '_Tuple2',
				_0: 'y',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p92._0)
			};
		case 'FpCx':
			return {
				ctor: '_Tuple2',
				_0: 'x',
				_1: _gicentre$elm_vega$Vega$numSpec(_p92._0)
			};
		case 'FpCy':
			return {
				ctor: '_Tuple2',
				_0: 'y',
				_1: _gicentre$elm_vega$Vega$numSpec(_p92._0)
			};
		case 'FpRadius':
			return {
				ctor: '_Tuple2',
				_0: 'radius',
				_1: _gicentre$elm_vega$Vega$numSpec(_p92._0)
			};
		case 'FpStrength':
			return {
				ctor: '_Tuple2',
				_0: 'strength',
				_1: _gicentre$elm_vega$Vega$numSpec(_p92._0)
			};
		case 'FpIterations':
			return {
				ctor: '_Tuple2',
				_0: 'iterations',
				_1: _gicentre$elm_vega$Vega$numSpec(_p92._0)
			};
		case 'FpTheta':
			return {
				ctor: '_Tuple2',
				_0: 'theta',
				_1: _gicentre$elm_vega$Vega$numSpec(_p92._0)
			};
		case 'FpDistanceMin':
			return {
				ctor: '_Tuple2',
				_0: 'distanceMin',
				_1: _gicentre$elm_vega$Vega$numSpec(_p92._0)
			};
		case 'FpDistanceMax':
			return {
				ctor: '_Tuple2',
				_0: 'distanceMax',
				_1: _gicentre$elm_vega$Vega$numSpec(_p92._0)
			};
		case 'FpLinks':
			return {
				ctor: '_Tuple2',
				_0: 'links',
				_1: _gicentre$elm_vega$Vega$strSpec(_p92._0)
			};
		case 'FpId':
			return {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p92._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'distance',
				_1: _gicentre$elm_vega$Vega$numSpec(_p92._0)
			};
	}
};
var _gicentre$elm_vega$Vega$forceSpec = function (f) {
	var _p93 = f;
	switch (_p93.ctor) {
		case 'FCenter':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'force',
						_1: _elm_lang$core$Json_Encode$string('center')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p93._0)
				});
		case 'FCollide':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'force',
						_1: _elm_lang$core$Json_Encode$string('collide')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p93._0)
				});
		case 'FNBody':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'force',
						_1: _elm_lang$core$Json_Encode$string('nbody')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p93._0)
				});
		case 'FLink':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'force',
						_1: _elm_lang$core$Json_Encode$string('link')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p93._0)
				});
		case 'FX':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'force',
						_1: _elm_lang$core$Json_Encode$string('x')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'x',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p93._0)
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p93._1)
					}
				});
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'force',
						_1: _elm_lang$core$Json_Encode$string('y')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'y',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p93._0)
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p93._1)
					}
				});
	}
};
var _gicentre$elm_vega$Vega$forceSimulationProperty = function (fProp) {
	var _p94 = fProp;
	switch (_p94.ctor) {
		case 'FsStatic':
			return {
				ctor: '_Tuple2',
				_0: 'static',
				_1: _gicentre$elm_vega$Vega$booSpec(_p94._0)
			};
		case 'FsRestart':
			return {
				ctor: '_Tuple2',
				_0: 'restart',
				_1: _gicentre$elm_vega$Vega$booSpec(_p94._0)
			};
		case 'FsIterations':
			return {
				ctor: '_Tuple2',
				_0: 'iterations',
				_1: _gicentre$elm_vega$Vega$numSpec(_p94._0)
			};
		case 'FsAlpha':
			return {
				ctor: '_Tuple2',
				_0: 'alpha',
				_1: _gicentre$elm_vega$Vega$numSpec(_p94._0)
			};
		case 'FsAlphaMin':
			return {
				ctor: '_Tuple2',
				_0: 'alphaMin',
				_1: _gicentre$elm_vega$Vega$numSpec(_p94._0)
			};
		case 'FsAlphaTarget':
			return {
				ctor: '_Tuple2',
				_0: 'alphaTarget',
				_1: _gicentre$elm_vega$Vega$numSpec(_p94._0)
			};
		case 'FsVelocityDecay':
			return {
				ctor: '_Tuple2',
				_0: 'velocityDecay',
				_1: _gicentre$elm_vega$Vega$numSpec(_p94._0)
			};
		case 'FsForces':
			return {
				ctor: '_Tuple2',
				_0: 'forces',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceSpec, _p94._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(_p94._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(_p94._1),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(_p94._2),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$string(_p94._3),
									_1: {ctor: '[]'}
								}
							}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$geoJsonProperty = function (gjProp) {
	var _p95 = gjProp;
	switch (_p95.ctor) {
		case 'GjFields':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$fieldSpec(_p95._0),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$fieldSpec(_p95._1),
							_1: {ctor: '[]'}
						}
					})
			};
		case 'GjFeature':
			return {
				ctor: '_Tuple2',
				_0: 'geojson',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p95._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'signal',
				_1: _elm_lang$core$Json_Encode$string(_p95._0)
			};
	}
};
var _gicentre$elm_vega$Vega$geoPathProperty = function (gpProp) {
	var _p96 = gpProp;
	switch (_p96.ctor) {
		case 'GeField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p96._0)
			};
		case 'GePointRadius':
			return {
				ctor: '_Tuple2',
				_0: 'pointRadius',
				_1: _gicentre$elm_vega$Vega$numSpec(_p96._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$string(_p96._0)
			};
	}
};
var _gicentre$elm_vega$Vega$graticuleProperty = function (grProp) {
	var _p97 = grProp;
	switch (_p97.ctor) {
		case 'GrField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p97._0)
			};
		case 'GrExtentMajor':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'extentMajor', _p97._0);
		case 'GrExtentMinor':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'extentMinor', _p97._0);
		case 'GrExtent':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'extentr', _p97._0);
		case 'GrStepMajor':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'stepMajor', _p97._0);
		case 'GrStepMinor':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'stepMinor', _p97._0);
		case 'GrStep':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'step', _p97._0);
		default:
			return {
				ctor: '_Tuple2',
				_0: 'precision',
				_1: _gicentre$elm_vega$Vega$numSpec(_p97._0)
			};
	}
};
var _gicentre$elm_vega$Vega$joinAggregateProperty = function (ap) {
	var _p98 = ap;
	switch (_p98.ctor) {
		case 'JAGroupBy':
			return {
				ctor: '_Tuple2',
				_0: 'groupby',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p98._0))
			};
		case 'JAFields':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p98._0))
			};
		case 'JAOps':
			return {
				ctor: '_Tuple2',
				_0: 'ops',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$opSpec, _p98._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p98._0))
			};
	}
};
var _gicentre$elm_vega$Vega$linkPathProperty = function (lpProp) {
	var _p99 = lpProp;
	switch (_p99.ctor) {
		case 'LPSourceX':
			return {
				ctor: '_Tuple2',
				_0: 'sourceX',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p99._0)
			};
		case 'LPSourceY':
			return {
				ctor: '_Tuple2',
				_0: 'sourceY',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p99._0)
			};
		case 'LPTargetX':
			return {
				ctor: '_Tuple2',
				_0: 'targetX',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p99._0)
			};
		case 'LPTargetY':
			return {
				ctor: '_Tuple2',
				_0: 'targetY',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p99._0)
			};
		case 'LPOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _gicentre$elm_vega$Vega$orientationSpec(_p99._0)
			};
		case 'LPShape':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _gicentre$elm_vega$Vega$linkShapeSpec(_p99._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$string(_p99._0)
			};
	}
};
var _gicentre$elm_vega$Vega$packProperty = function (pp) {
	var _p100 = pp;
	switch (_p100.ctor) {
		case 'PaField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p100._0)
			};
		case 'PaSort':
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					_gicentre$elm_vega$Vega$comparatorProperties(_p100._0))
			};
		case 'PaSize':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'size', _p100._0);
		case 'PaRadius':
			var _p101 = _p100._0;
			if (_p101.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'radius',
					_1: _gicentre$elm_vega$Vega$fieldSpec(_p101._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'radius', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'PaPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p100._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						_elm_lang$core$Json_Encode$string,
						{
							ctor: '::',
							_0: _p100._0,
							_1: {
								ctor: '::',
								_0: _p100._1,
								_1: {
									ctor: '::',
									_0: _p100._2,
									_1: {
										ctor: '::',
										_0: _p100._3,
										_1: {
											ctor: '::',
											_0: _p100._4,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}))
			};
	}
};
var _gicentre$elm_vega$Vega$partitionProperty = function (pp) {
	var _p102 = pp;
	switch (_p102.ctor) {
		case 'PtField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p102._0)
			};
		case 'PtSort':
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					_gicentre$elm_vega$Vega$comparatorProperties(_p102._0))
			};
		case 'PtPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p102._0)
			};
		case 'PtRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _gicentre$elm_vega$Vega$booSpec(_p102._0)
			};
		case 'PtSize':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'size', _p102._0);
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(_p102._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(_p102._1),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(_p102._2),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$string(_p102._3),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$string(_p102._4),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$string(_p102._5),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$pieProperty = function (pp) {
	var _p103 = pp;
	switch (_p103.ctor) {
		case 'PiField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p103._0)
			};
		case 'PiStartAngle':
			return {
				ctor: '_Tuple2',
				_0: 'startAngle',
				_1: _gicentre$elm_vega$Vega$numSpec(_p103._0)
			};
		case 'PiEndAngle':
			return {
				ctor: '_Tuple2',
				_0: 'endAngle',
				_1: _gicentre$elm_vega$Vega$numSpec(_p103._0)
			};
		case 'PiSort':
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _gicentre$elm_vega$Vega$booSpec(_p103._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						_elm_lang$core$Json_Encode$string,
						{
							ctor: '::',
							_0: _p103._0,
							_1: {
								ctor: '::',
								_0: _p103._1,
								_1: {ctor: '[]'}
							}
						}))
			};
	}
};
var _gicentre$elm_vega$Vega$pivotProperty = function (pp) {
	var _p104 = pp;
	switch (_p104.ctor) {
		case 'PiGroupBy':
			return {
				ctor: '_Tuple2',
				_0: 'groupby',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p104._0))
			};
		case 'PiLimit':
			return {
				ctor: '_Tuple2',
				_0: 'limit',
				_1: _gicentre$elm_vega$Vega$numSpec(_p104._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'op',
				_1: _gicentre$elm_vega$Vega$opSpec(_p104._0)
			};
	}
};
var _gicentre$elm_vega$Vega$stackProperty = function (sp) {
	var _p105 = sp;
	switch (_p105.ctor) {
		case 'StField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p105._0)
			};
		case 'StGroupBy':
			return {
				ctor: '_Tuple2',
				_0: 'groupby',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p105._0))
			};
		case 'StSort':
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					_gicentre$elm_vega$Vega$comparatorProperties(_p105._0))
			};
		case 'StOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$stackOffsetSpec(_p105._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						_elm_lang$core$Json_Encode$string,
						{
							ctor: '::',
							_0: _p105._0,
							_1: {
								ctor: '::',
								_0: _p105._1,
								_1: {ctor: '[]'}
							}
						}))
			};
	}
};
var _gicentre$elm_vega$Vega$treemapProperty = function (tp) {
	var _p106 = tp;
	switch (_p106.ctor) {
		case 'TmField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p106._0)
			};
		case 'TmSort':
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					_gicentre$elm_vega$Vega$comparatorProperties(_p106._0))
			};
		case 'TmMethod':
			return {
				ctor: '_Tuple2',
				_0: 'method',
				_1: _gicentre$elm_vega$Vega$tmMethodSpec(_p106._0)
			};
		case 'TmPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p106._0)
			};
		case 'TmPaddingInner':
			return {
				ctor: '_Tuple2',
				_0: 'paddingInner',
				_1: _gicentre$elm_vega$Vega$numSpec(_p106._0)
			};
		case 'TmPaddingOuter':
			return {
				ctor: '_Tuple2',
				_0: 'paddingOuter',
				_1: _gicentre$elm_vega$Vega$numSpec(_p106._0)
			};
		case 'TmPaddingTop':
			return {
				ctor: '_Tuple2',
				_0: 'paddingTop',
				_1: _gicentre$elm_vega$Vega$numSpec(_p106._0)
			};
		case 'TmPaddingRight':
			return {
				ctor: '_Tuple2',
				_0: 'paddingRight',
				_1: _gicentre$elm_vega$Vega$numSpec(_p106._0)
			};
		case 'TmPaddingBottom':
			return {
				ctor: '_Tuple2',
				_0: 'paddingBottom',
				_1: _gicentre$elm_vega$Vega$numSpec(_p106._0)
			};
		case 'TmPaddingLeft':
			return {
				ctor: '_Tuple2',
				_0: 'paddingLeft',
				_1: _gicentre$elm_vega$Vega$numSpec(_p106._0)
			};
		case 'TmRatio':
			return {
				ctor: '_Tuple2',
				_0: 'ratio',
				_1: _gicentre$elm_vega$Vega$numSpec(_p106._0)
			};
		case 'TmRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _gicentre$elm_vega$Vega$booSpec(_p106._0)
			};
		case 'TmSize':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'size', _p106._0);
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(_p106._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(_p106._1),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(_p106._2),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$string(_p106._3),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$string(_p106._4),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$string(_p106._5),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$treeProperty = function (tp) {
	var _p107 = tp;
	switch (_p107.ctor) {
		case 'TeField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p107._0)
			};
		case 'TeSort':
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					_gicentre$elm_vega$Vega$comparatorProperties(_p107._0))
			};
		case 'TeMethod':
			return {
				ctor: '_Tuple2',
				_0: 'method',
				_1: _gicentre$elm_vega$Vega$teMethodSpec(_p107._0)
			};
		case 'TeSize':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'size', _p107._0);
		case 'TeNodeSize':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'nodeSize', _p107._0);
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(_p107._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(_p107._1),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(_p107._2),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$string(_p107._3),
									_1: {ctor: '[]'}
								}
							}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$valueSpec = function (val) {
	var _p108 = val;
	switch (_p108.ctor) {
		case 'VStr':
			return _elm_lang$core$Json_Encode$string(_p108._0);
		case 'VStrs':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p108._0));
		case 'VSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p108._0),
					_1: {ctor: '[]'}
				});
		case 'VColor':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$colorProperty(_p108._0),
					_1: {ctor: '[]'}
				});
		case 'VField':
			return _gicentre$elm_vega$Vega$fieldSpec(_p108._0);
		case 'VScale':
			return _gicentre$elm_vega$Vega$fieldSpec(_p108._0);
		case 'VBand':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'band',
						_1: _gicentre$elm_vega$Vega$numSpec(_p108._0)
					},
					_1: {ctor: '[]'}
				});
		case 'VExponent':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'exponent',
						_1: _gicentre$elm_vega$Vega$valueSpec(_p108._0)
					},
					_1: {ctor: '[]'}
				});
		case 'VMultiply':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'mult',
						_1: _gicentre$elm_vega$Vega$valueSpec(_p108._0)
					},
					_1: {ctor: '[]'}
				});
		case 'VOffset':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'offset',
						_1: _gicentre$elm_vega$Vega$valueSpec(_p108._0)
					},
					_1: {ctor: '[]'}
				});
		case 'VRound':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'round',
						_1: _gicentre$elm_vega$Vega$booSpec(_p108._0)
					},
					_1: {ctor: '[]'}
				});
		case 'VNum':
			return _elm_lang$core$Json_Encode$float(_p108._0);
		case 'VNums':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p108._0));
		case 'VKeyValue':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _p108._0,
						_1: _gicentre$elm_vega$Vega$valueSpec(_p108._1)
					},
					_1: {ctor: '[]'}
				});
		case 'VObject':
			return _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p108._0));
		case 'Values':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueSpec, _p108._0));
		case 'VBoo':
			return _elm_lang$core$Json_Encode$bool(_p108._0);
		case 'VBoos':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$bool, _p108._0));
		case 'VNull':
			return _elm_lang$core$Json_Encode$null;
		default:
			return _elm_lang$core$Json_Encode$null;
	}
};
var _gicentre$elm_vega$Vega$colorProperty = function (cVal) {
	var _p109 = cVal;
	switch (_p109.ctor) {
		case 'RGB':
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'r',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._0))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'g',
								_1: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._1))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'b',
									_1: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._2))
								},
								_1: {ctor: '[]'}
							}
						}
					})
			};
		case 'HSL':
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'h',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._0))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 's',
								_1: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._1))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'l',
									_1: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._2))
								},
								_1: {ctor: '[]'}
							}
						}
					})
			};
		case 'LAB':
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'l',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._0))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'a',
								_1: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._1))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'b',
									_1: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._2))
								},
								_1: {ctor: '[]'}
							}
						}
					})
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'h',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._0))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'c',
								_1: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._1))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'l',
									_1: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p109._2))
								},
								_1: {ctor: '[]'}
							}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$valueProperties = function (val) {
	var _p110 = val;
	switch (_p110.ctor) {
		case 'VStr':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$string(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'VStrs':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p110._0))
				},
				_1: {ctor: '[]'}
			};
		case 'VSignal':
			return {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p110._0),
				_1: {ctor: '[]'}
			};
		case 'VColor':
			return {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$colorProperty(_p110._0),
				_1: {ctor: '[]'}
			};
		case 'VField':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _gicentre$elm_vega$Vega$fieldSpec(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'VScale':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'scale',
					_1: _gicentre$elm_vega$Vega$fieldSpec(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'VKeyValue':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: _p110._0,
					_1: _gicentre$elm_vega$Vega$valueSpec(_p110._1)
				},
				_1: {ctor: '[]'}
			};
		case 'VBand':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'band',
					_1: _gicentre$elm_vega$Vega$numSpec(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'VExponent':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'exponent',
					_1: _gicentre$elm_vega$Vega$valueSpec(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'VMultiply':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'mult',
					_1: _gicentre$elm_vega$Vega$valueSpec(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'VOffset':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'offset',
					_1: _gicentre$elm_vega$Vega$valueSpec(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'VRound':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'round',
					_1: _gicentre$elm_vega$Vega$booSpec(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'VNum':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$float(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'VNums':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p110._0))
				},
				_1: {ctor: '[]'}
			};
		case 'VObject':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p110._0))
				},
				_1: {ctor: '[]'}
			};
		case 'Values':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueSpec, _p110._0))
				},
				_1: {ctor: '[]'}
			};
		case 'VBoo':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$bool(_p110._0)
				},
				_1: {ctor: '[]'}
			};
		case 'VBoos':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$bool, _p110._0))
				},
				_1: {ctor: '[]'}
			};
		case 'VNull':
			return {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'value', _1: _elm_lang$core$Json_Encode$null},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'test',
					_1: _elm_lang$core$Json_Encode$string(_p110._0)
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p110._1)
			};
	}
};
var _gicentre$elm_vega$Vega$dataRow = function (row) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$List$map,
				function (_p111) {
					var _p112 = _p111;
					return {
						ctor: '_Tuple2',
						_0: _p112._0,
						_1: _gicentre$elm_vega$Vega$valueSpec(_p112._1)
					};
				},
				row)));
};
var _gicentre$elm_vega$Vega$dataProperty = function (dProp) {
	var _p113 = dProp;
	switch (_p113.ctor) {
		case 'DaFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$formatProperty, _p113._0))
			};
		case 'DaSource':
			return {
				ctor: '_Tuple2',
				_0: 'source',
				_1: _elm_lang$core$Json_Encode$string(_p113._0)
			};
		case 'DaSources':
			return {
				ctor: '_Tuple2',
				_0: 'source',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p113._0))
			};
		case 'DaOn':
			return {
				ctor: '_Tuple2',
				_0: 'on',
				_1: _elm_lang$core$Json_Encode$list(_p113._0)
			};
		case 'DaUrl':
			return {
				ctor: '_Tuple2',
				_0: 'url',
				_1: _gicentre$elm_vega$Vega$strSpec(_p113._0)
			};
		case 'DaValue':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p113._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string('Sphere')
						},
						_1: {ctor: '[]'}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$data = F2(
	function (name, dProps) {
		return {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(name)
			},
			_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$dataProperty, dProps)
		};
	});
var _gicentre$elm_vega$Vega$imputeProperty = function (ip) {
	var _p114 = ip;
	switch (_p114.ctor) {
		case 'ImKeyVals':
			return {
				ctor: '_Tuple2',
				_0: 'keyvals',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p114._0)
			};
		case 'ImMethod':
			return {
				ctor: '_Tuple2',
				_0: 'method',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$imputeMethodLabel(_p114._0))
			};
		case 'ImGroupBy':
			return {
				ctor: '_Tuple2',
				_0: 'groupby',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p114._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p114._0)
			};
	}
};
var _gicentre$elm_vega$Vega$inputProperty = function (prop) {
	var _p115 = prop;
	switch (_p115.ctor) {
		case 'InMin':
			return {
				ctor: '_Tuple2',
				_0: 'min',
				_1: _elm_lang$core$Json_Encode$float(_p115._0)
			};
		case 'InMax':
			return {
				ctor: '_Tuple2',
				_0: 'max',
				_1: _elm_lang$core$Json_Encode$float(_p115._0)
			};
		case 'InStep':
			return {
				ctor: '_Tuple2',
				_0: 'step',
				_1: _elm_lang$core$Json_Encode$float(_p115._0)
			};
		case 'InDebounce':
			return {
				ctor: '_Tuple2',
				_0: 'debounce',
				_1: _elm_lang$core$Json_Encode$float(_p115._0)
			};
		case 'InOptions':
			return {
				ctor: '_Tuple2',
				_0: 'options',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p115._0)
			};
		case 'InPlaceholder':
			return {
				ctor: '_Tuple2',
				_0: 'placeholder',
				_1: _elm_lang$core$Json_Encode$string(_p115._0)
			};
		case 'InElement':
			return {
				ctor: '_Tuple2',
				_0: 'element',
				_1: _elm_lang$core$Json_Encode$string(_p115._0)
			};
		default:
			return _p115._0 ? {
				ctor: '_Tuple2',
				_0: 'autocomplete',
				_1: _elm_lang$core$Json_Encode$string('on')
			} : {
				ctor: '_Tuple2',
				_0: 'autocomplete',
				_1: _elm_lang$core$Json_Encode$string('off')
			};
	}
};
var _gicentre$elm_vega$Vega$bindingProperty = function (bnd) {
	var bSpec = F2(
		function (iType, props) {
			return {
				ctor: '_Tuple2',
				_0: 'bind',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string(iType)
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$inputProperty, props)
					})
			};
		});
	var _p116 = bnd;
	switch (_p116.ctor) {
		case 'IRange':
			return A2(bSpec, 'range', _p116._0);
		case 'ICheckbox':
			return A2(bSpec, 'checkbox', _p116._0);
		case 'IRadio':
			return A2(bSpec, 'radio', _p116._0);
		case 'ISelect':
			return A2(bSpec, 'select', _p116._0);
		case 'IText':
			return A2(bSpec, 'text', _p116._0);
		case 'INumber':
			return A2(bSpec, 'number', _p116._0);
		case 'IDate':
			return A2(bSpec, 'date', _p116._0);
		case 'ITime':
			return A2(bSpec, 'time', _p116._0);
		case 'IMonth':
			return A2(bSpec, 'month', _p116._0);
		case 'IWeek':
			return A2(bSpec, 'week', _p116._0);
		case 'IDateTimeLocal':
			return A2(bSpec, 'datetimelocal', _p116._0);
		case 'ITel':
			return A2(bSpec, 'tel', _p116._0);
		default:
			return A2(bSpec, 'color', _p116._0);
	}
};
var _gicentre$elm_vega$Vega$lookupProperty = function (luProp) {
	var _p117 = luProp;
	switch (_p117.ctor) {
		case 'LValues':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p117._0))
			};
		case 'LAs':
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p117._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'default',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p117._0)
			};
	}
};
var _gicentre$elm_vega$Vega$signalProperty = function (sigProp) {
	var _p118 = sigProp;
	switch (_p118.ctor) {
		case 'SiName':
			return {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(_p118._0)
			};
		case 'SiBind':
			return _gicentre$elm_vega$Vega$bindingProperty(_p118._0);
		case 'SiDescription':
			return {
				ctor: '_Tuple2',
				_0: 'description',
				_1: _elm_lang$core$Json_Encode$string(_p118._0)
			};
		case 'SiUpdate':
			return {
				ctor: '_Tuple2',
				_0: 'update',
				_1: _gicentre$elm_vega$Vega$expressionSpec(_p118._0)
			};
		case 'SiOn':
			return {
				ctor: '_Tuple2',
				_0: 'on',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$eventHandlerSpec, _p118._0))
			};
		case 'SiReact':
			return {
				ctor: '_Tuple2',
				_0: 'react',
				_1: _gicentre$elm_vega$Vega$booSpec(_p118._0)
			};
		case 'SiValue':
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p118._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'push',
				_1: _elm_lang$core$Json_Encode$string('outer')
			};
	}
};
var _gicentre$elm_vega$Vega$signal = F2(
	function (sigName, sps) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			_elm_lang$core$Json_Encode$object(
				A2(
					_elm_lang$core$List$map,
					_gicentre$elm_vega$Vega$signalProperty,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$SiName(sigName),
						_1: sps
					})));
	});
var _gicentre$elm_vega$Vega$dataColumn = F2(
	function (colName, val) {
		var _p119 = val;
		switch (_p119.ctor) {
			case 'VNums':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					A2(
						_elm_lang$core$List$map,
						function (n) {
							return {
								ctor: '_Tuple2',
								_0: colName,
								_1: _elm_lang$core$Json_Encode$float(n)
							};
						},
						_p119._0));
			case 'VNum':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: colName,
							_1: _elm_lang$core$Json_Encode$float(_p119._0)
						},
						_1: {ctor: '[]'}
					});
			case 'VBoos':
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
						_p119._0));
			case 'VBoo':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: colName,
							_1: _elm_lang$core$Json_Encode$bool(_p119._0)
						},
						_1: {ctor: '[]'}
					});
			case 'VStrs':
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
						_p119._0));
			case 'VStr':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: colName,
							_1: _elm_lang$core$Json_Encode$string(_p119._0)
						},
						_1: {ctor: '[]'}
					});
			case 'VObject':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: colName,
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p119._0))
						},
						_1: {ctor: '[]'}
					});
			case 'Values':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: colName,
							_1: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueSpec, _p119._0))
						},
						_1: {ctor: '[]'}
					});
			default:
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: colName, _1: _elm_lang$core$Json_Encode$null},
						_1: {ctor: '[]'}
					});
		}
	});
var _gicentre$elm_vega$Vega$valRef = function (vs) {
	var _p120 = vs;
	if (((_p120.ctor === '::') && (_p120._0.ctor === 'VIfElse')) && (_p120._1.ctor === '[]')) {
		var _p122 = _p120._0._1;
		var _p121 = _p120._0._0;
		return _elm_lang$core$Json_Encode$list(
			A4(
				_gicentre$elm_vega$Vega$valIfElse,
				_p121,
				_p122,
				_p120._0._2,
				{
					ctor: '::',
					_0: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'test',
								_1: _elm_lang$core$Json_Encode$string(_p121)
							},
							_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p122)
						}),
					_1: {ctor: '[]'}
				}));
	} else {
		return _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, vs));
	}
};
var _gicentre$elm_vega$Vega$valIfElse = F4(
	function (ex, ifVals, elseVals, ifSpecs) {
		valIfElse:
		while (true) {
			var _p123 = elseVals;
			if (((_p123.ctor === '::') && (_p123._0.ctor === 'VIfElse')) && (_p123._1.ctor === '[]')) {
				var _p125 = _p123._0._1;
				var _p124 = _p123._0._0;
				var _v103 = _p124,
					_v104 = _p125,
					_v105 = _p123._0._2,
					_v106 = A2(
					_elm_lang$core$Basics_ops['++'],
					ifSpecs,
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'test',
									_1: _elm_lang$core$Json_Encode$string(_p124)
								},
								_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$Vega$valueProperties, _p125)
							}),
						_1: {ctor: '[]'}
					});
				ex = _v103;
				ifVals = _v104;
				elseVals = _v105;
				ifSpecs = _v106;
				continue valIfElse;
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					ifSpecs,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$valRef(elseVals),
						_1: {ctor: '[]'}
					});
			}
		}
	});
var _gicentre$elm_vega$Vega$markProperty = function (mProp) {
	var _p126 = mProp;
	switch (_p126.ctor) {
		case 'MX':
			return {
				ctor: '_Tuple2',
				_0: 'x',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MY':
			return {
				ctor: '_Tuple2',
				_0: 'y',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MX2':
			return {
				ctor: '_Tuple2',
				_0: 'x2',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MY2':
			return {
				ctor: '_Tuple2',
				_0: 'y2',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MXC':
			return {
				ctor: '_Tuple2',
				_0: 'xc',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MYC':
			return {
				ctor: '_Tuple2',
				_0: 'yc',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MWidth':
			return {
				ctor: '_Tuple2',
				_0: 'width',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MHeight':
			return {
				ctor: '_Tuple2',
				_0: 'height',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'opacity',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MFill':
			return {
				ctor: '_Tuple2',
				_0: 'fill',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MFillOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'fillOpacity',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MStroke':
			return {
				ctor: '_Tuple2',
				_0: 'stroke',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MStrokeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'strokeOpacity',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MStrokeCap':
			return {
				ctor: '_Tuple2',
				_0: 'strokeCap',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MStrokeDashOffset':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDashOffset',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MStrokeJoin':
			return {
				ctor: '_Tuple2',
				_0: 'strokeJoin',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MStrokeMiterLimit':
			return {
				ctor: '_Tuple2',
				_0: 'strokeMiterLimit',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MCursor':
			return {
				ctor: '_Tuple2',
				_0: 'cursor',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MHRef':
			return {
				ctor: '_Tuple2',
				_0: 'href',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MTooltip':
			return {
				ctor: '_Tuple2',
				_0: 'tooltip',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MZIndex':
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MStartAngle':
			return {
				ctor: '_Tuple2',
				_0: 'startAngle',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MEndAngle':
			return {
				ctor: '_Tuple2',
				_0: 'endAngle',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MPadAngle':
			return {
				ctor: '_Tuple2',
				_0: 'padAngle',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MInnerRadius':
			return {
				ctor: '_Tuple2',
				_0: 'innerRadius',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MOuterRadius':
			return {
				ctor: '_Tuple2',
				_0: 'outerRadius',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MCornerRadius':
			return {
				ctor: '_Tuple2',
				_0: 'cornerRadius',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MInterpolate':
			return {
				ctor: '_Tuple2',
				_0: 'interpolate',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MTension':
			return {
				ctor: '_Tuple2',
				_0: 'tension',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MDefined':
			return {
				ctor: '_Tuple2',
				_0: 'defined',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MGroupClip':
			return {
				ctor: '_Tuple2',
				_0: 'clip',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MAspect':
			return {
				ctor: '_Tuple2',
				_0: 'aspect',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MUrl':
			return {
				ctor: '_Tuple2',
				_0: 'url',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MPath':
			return {
				ctor: '_Tuple2',
				_0: 'path',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MShape':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MSize':
			return {
				ctor: '_Tuple2',
				_0: 'size',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MSymbol':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MAlign':
			return {
				ctor: '_Tuple2',
				_0: 'align',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MAngle':
			return {
				ctor: '_Tuple2',
				_0: 'angle',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'baseline',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MDir':
			return {
				ctor: '_Tuple2',
				_0: 'dir',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MdX':
			return {
				ctor: '_Tuple2',
				_0: 'dx',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MdY':
			return {
				ctor: '_Tuple2',
				_0: 'dy',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MEllipsis':
			return {
				ctor: '_Tuple2',
				_0: 'ellipsis',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MFont':
			return {
				ctor: '_Tuple2',
				_0: 'font',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'fontSize',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'fontWeight',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MFontStyle':
			return {
				ctor: '_Tuple2',
				_0: 'fontStyle',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MLimit':
			return {
				ctor: '_Tuple2',
				_0: 'limit',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MRadius':
			return {
				ctor: '_Tuple2',
				_0: 'radius',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MText':
			return {
				ctor: '_Tuple2',
				_0: 'text',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		case 'MTheta':
			return {
				ctor: '_Tuple2',
				_0: 'theta',
				_1: _gicentre$elm_vega$Vega$valRef(_p126._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: _p126._0,
				_1: _gicentre$elm_vega$Vega$valRef(_p126._1)
			};
	}
};
var _gicentre$elm_vega$Vega$encodingProperty = function (ep) {
	var _p127 = ep;
	switch (_p127.ctor) {
		case 'Enter':
			return {
				ctor: '_Tuple2',
				_0: 'enter',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p127._0))
			};
		case 'Update':
			return {
				ctor: '_Tuple2',
				_0: 'update',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p127._0))
			};
		case 'Exit':
			return {
				ctor: '_Tuple2',
				_0: 'exit',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p127._0))
			};
		case 'Hover':
			return {
				ctor: '_Tuple2',
				_0: 'hover',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p127._0))
			};
		case 'EnName':
			return {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(_p127._0)
			};
		case 'EnInteractive':
			return {
				ctor: '_Tuple2',
				_0: 'interactive',
				_1: _gicentre$elm_vega$Vega$booSpec(_p127._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: _p127._0,
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p127._1))
			};
	}
};
var _gicentre$elm_vega$Vega$axisProperty = function (ap) {
	var _p128 = ap;
	switch (_p128.ctor) {
		case 'AxScale':
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$string(_p128._0)
			};
		case 'AxSide':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _gicentre$elm_vega$Vega$sideSpec(_p128._0)
			};
		case 'AxBandPosition':
			return {
				ctor: '_Tuple2',
				_0: 'bandPosition',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxDomain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _gicentre$elm_vega$Vega$booSpec(_p128._0)
			};
		case 'AxDomainColor':
			return {
				ctor: '_Tuple2',
				_0: 'domainColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p128._0)
			};
		case 'AxDomainOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'domainOpacity',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxDomainWidth':
			return {
				ctor: '_Tuple2',
				_0: 'domainWidth',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxEncode':
			var enc = function (_p129) {
				var _p130 = _p129;
				return {
					ctor: '_Tuple2',
					_0: _gicentre$elm_vega$Vega$axisElementLabel(_p130._0),
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p130._1))
				};
			};
			return {
				ctor: '_Tuple2',
				_0: 'encode',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, enc, _p128._0))
			};
		case 'AxFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _gicentre$elm_vega$Vega$strSpec(_p128._0)
			};
		case 'AxGrid':
			return {
				ctor: '_Tuple2',
				_0: 'grid',
				_1: _gicentre$elm_vega$Vega$booSpec(_p128._0)
			};
		case 'AxGridColor':
			return {
				ctor: '_Tuple2',
				_0: 'gridColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p128._0)
			};
		case 'AxGridDash':
			return {
				ctor: '_Tuple2',
				_0: 'gridDash',
				_1: _gicentre$elm_vega$Vega$valRef(_p128._0)
			};
		case 'AxGridOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'gridOpacity',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxGridScale':
			return {
				ctor: '_Tuple2',
				_0: 'gridScale',
				_1: _elm_lang$core$Json_Encode$string(_p128._0)
			};
		case 'AxGridWidth':
			return {
				ctor: '_Tuple2',
				_0: 'gridWidth',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxLabels':
			return {
				ctor: '_Tuple2',
				_0: 'labels',
				_1: _gicentre$elm_vega$Vega$booSpec(_p128._0)
			};
		case 'AxLabelAlign':
			return {
				ctor: '_Tuple2',
				_0: 'labelAlign',
				_1: _gicentre$elm_vega$Vega$hAlignSpec(_p128._0)
			};
		case 'AxLabelAngle':
			return {
				ctor: '_Tuple2',
				_0: 'labelAngle',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxLabelBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'labelBaseline',
				_1: _gicentre$elm_vega$Vega$vAlignSpec(_p128._0)
			};
		case 'AxLabelBound':
			var _p132 = _p128._0;
			var _p131 = _p132;
			if (_p131.ctor === 'NumNull') {
				return {
					ctor: '_Tuple2',
					_0: 'labelBound',
					_1: _elm_lang$core$Json_Encode$bool(false)
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'labelBound',
					_1: _gicentre$elm_vega$Vega$numSpec(_p132)
				};
			}
		case 'AxLabelColor':
			return {
				ctor: '_Tuple2',
				_0: 'labelColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p128._0)
			};
		case 'AxLabelFlush':
			var _p134 = _p128._0;
			var _p133 = _p134;
			if (_p133.ctor === 'NumNull') {
				return {
					ctor: '_Tuple2',
					_0: 'labelFlush',
					_1: _elm_lang$core$Json_Encode$bool(false)
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'labelFlush',
					_1: _gicentre$elm_vega$Vega$numSpec(_p134)
				};
			}
		case 'AxLabelFlushOffset':
			return {
				ctor: '_Tuple2',
				_0: 'labelFlushOffset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxLabelFont':
			return {
				ctor: '_Tuple2',
				_0: 'labelFont',
				_1: _gicentre$elm_vega$Vega$strSpec(_p128._0)
			};
		case 'AxLabelFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxLabelFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontWeight',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p128._0)
			};
		case 'AxLabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'labelLimit',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxLabelOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'labelOpacity',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxLabelOverlap':
			return {
				ctor: '_Tuple2',
				_0: 'labelOverlap',
				_1: _gicentre$elm_vega$Vega$overlapStrategySpec(_p128._0)
			};
		case 'AxLabelPadding':
			return {
				ctor: '_Tuple2',
				_0: 'labelPadding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxMaxExtent':
			return {
				ctor: '_Tuple2',
				_0: 'maxExtent',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p128._0)
			};
		case 'AxMinExtent':
			return {
				ctor: '_Tuple2',
				_0: 'minExtent',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p128._0)
			};
		case 'AxOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p128._0)
			};
		case 'AxPosition':
			return {
				ctor: '_Tuple2',
				_0: 'position',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p128._0)
			};
		case 'AxTicks':
			return {
				ctor: '_Tuple2',
				_0: 'ticks',
				_1: _gicentre$elm_vega$Vega$booSpec(_p128._0)
			};
		case 'AxTickColor':
			return {
				ctor: '_Tuple2',
				_0: 'tickColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p128._0)
			};
		case 'AxTickCount':
			return {
				ctor: '_Tuple2',
				_0: 'tickCount',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxTemporalTickCount':
			var _p137 = _p128._0;
			var _p136 = _p128._1;
			var _p135 = _p136;
			switch (_p135.ctor) {
				case 'Num':
					return (_elm_lang$core$Native_Utils.cmp(_p135._0, 0) < 1) ? {
						ctor: '_Tuple2',
						_0: 'tickCount',
						_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p137)
					} : {
						ctor: '_Tuple2',
						_0: 'tickCount',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'interval',
									_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p137)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'step',
										_1: _gicentre$elm_vega$Vega$numSpec(_p136)
									},
									_1: {ctor: '[]'}
								}
							})
					};
				case 'NumSignal':
					return {
						ctor: '_Tuple2',
						_0: 'tickCount',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'interval',
									_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p137)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'step',
										_1: _gicentre$elm_vega$Vega$numSpec(_p136)
									},
									_1: {ctor: '[]'}
								}
							})
					};
				case 'NumExpr':
					return {
						ctor: '_Tuple2',
						_0: 'tickCount',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'interval',
									_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p137)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'step',
										_1: _gicentre$elm_vega$Vega$numSpec(_p136)
									},
									_1: {ctor: '[]'}
								}
							})
					};
				default:
					return {
						ctor: '_Tuple2',
						_0: 'tickCount',
						_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p137)
					};
			}
		case 'AxTickExtra':
			return {
				ctor: '_Tuple2',
				_0: 'tickExtra',
				_1: _gicentre$elm_vega$Vega$booSpec(_p128._0)
			};
		case 'AxTickOffset':
			return {
				ctor: '_Tuple2',
				_0: 'tickOffset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxTickOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'tickOpacity',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxTickRound':
			return {
				ctor: '_Tuple2',
				_0: 'tickRound',
				_1: _gicentre$elm_vega$Vega$booSpec(_p128._0)
			};
		case 'AxTickSize':
			return {
				ctor: '_Tuple2',
				_0: 'tickSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxTickWidth':
			return {
				ctor: '_Tuple2',
				_0: 'tickWidth',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _gicentre$elm_vega$Vega$strSpec(_p128._0)
			};
		case 'AxTitleAlign':
			return {
				ctor: '_Tuple2',
				_0: 'titleAlign',
				_1: _gicentre$elm_vega$Vega$hAlignSpec(_p128._0)
			};
		case 'AxTitleAngle':
			return {
				ctor: '_Tuple2',
				_0: 'titleAngle',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxTitleBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'titleBaseline',
				_1: _gicentre$elm_vega$Vega$vAlignSpec(_p128._0)
			};
		case 'AxTitleColor':
			return {
				ctor: '_Tuple2',
				_0: 'titleColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p128._0)
			};
		case 'AxTitleFont':
			return {
				ctor: '_Tuple2',
				_0: 'titleFont',
				_1: _gicentre$elm_vega$Vega$strSpec(_p128._0)
			};
		case 'AxTitleFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxTitleFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontWeight',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p128._0)
			};
		case 'AxTitleLimit':
			return {
				ctor: '_Tuple2',
				_0: 'titleLimit',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxTitleOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'titleOpacity',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxTitlePadding':
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p128._0)
			};
		case 'AxTitleX':
			return {
				ctor: '_Tuple2',
				_0: 'titleX',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxTitleY':
			return {
				ctor: '_Tuple2',
				_0: 'titleY',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
		case 'AxValues':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p128._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _gicentre$elm_vega$Vega$numSpec(_p128._0)
			};
	}
};
var _gicentre$elm_vega$Vega$axis = F3(
	function (scName, side, aps) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			_elm_lang$core$Json_Encode$object(
				A2(
					_elm_lang$core$List$map,
					_gicentre$elm_vega$Vega$axisProperty,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$AxScale(scName),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$AxSide(side),
							_1: aps
						}
					})));
	});
var _gicentre$elm_vega$Vega$legendEncodingProperty = function (le) {
	var _p138 = le;
	switch (_p138.ctor) {
		case 'EnLegend':
			return {
				ctor: '_Tuple2',
				_0: 'legend',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p138._0))
			};
		case 'EnTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p138._0))
			};
		case 'EnLabels':
			return {
				ctor: '_Tuple2',
				_0: 'labels',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p138._0))
			};
		case 'EnSymbols':
			return {
				ctor: '_Tuple2',
				_0: 'symbols',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p138._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'gradient',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p138._0))
			};
	}
};
var _gicentre$elm_vega$Vega$legendProperty = function (lp) {
	var _p139 = lp;
	switch (_p139.ctor) {
		case 'LeType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _gicentre$elm_vega$Vega$legendTypeSpec(_p139._0)
			};
		case 'LeDirection':
			return {
				ctor: '_Tuple2',
				_0: 'direction',
				_1: _gicentre$elm_vega$Vega$orientationSpec(_p139._0)
			};
		case 'LeOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _gicentre$elm_vega$Vega$legendOrientSpec(_p139._0)
			};
		case 'LeFill':
			return {
				ctor: '_Tuple2',
				_0: 'fill',
				_1: _elm_lang$core$Json_Encode$string(_p139._0)
			};
		case 'LeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'opacity',
				_1: _elm_lang$core$Json_Encode$string(_p139._0)
			};
		case 'LeShape':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _elm_lang$core$Json_Encode$string(_p139._0)
			};
		case 'LeSize':
			return {
				ctor: '_Tuple2',
				_0: 'size',
				_1: _elm_lang$core$Json_Encode$string(_p139._0)
			};
		case 'LeStroke':
			return {
				ctor: '_Tuple2',
				_0: 'stroke',
				_1: _elm_lang$core$Json_Encode$string(_p139._0)
			};
		case 'LeStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$string(_p139._0)
			};
		case 'LeEncode':
			return {
				ctor: '_Tuple2',
				_0: 'encode',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$legendEncodingProperty, _p139._0))
			};
		case 'LeFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeGridAlign':
			return {
				ctor: '_Tuple2',
				_0: 'gridAlign',
				_1: _gicentre$elm_vega$Vega$gridAlignSpec(_p139._0)
			};
		case 'LeClipHeight':
			return {
				ctor: '_Tuple2',
				_0: 'clipHeight',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeColumns':
			return {
				ctor: '_Tuple2',
				_0: 'columns',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeColumnPadding':
			return {
				ctor: '_Tuple2',
				_0: 'columnPadding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeRowPadding':
			return {
				ctor: '_Tuple2',
				_0: 'rowPadding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeCornerRadius':
			return {
				ctor: '_Tuple2',
				_0: 'cornerRadius',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeFillColor':
			return {
				ctor: '_Tuple2',
				_0: 'fillColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p139._0)
			};
		case 'LePadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p139._0)
			};
		case 'LeStrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'strokeColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeGradientOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'gradientOpacity',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeGradientLabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'gradientLabelLimit',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeGradientLabelOffset':
			return {
				ctor: '_Tuple2',
				_0: 'gradientLabelOffset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeGradientLength':
			return {
				ctor: '_Tuple2',
				_0: 'gradientLength',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeGradientThickness':
			return {
				ctor: '_Tuple2',
				_0: 'gradientThickness',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeGradientStrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'gradientStrokeColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeGradientStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'gradientStrokeWidth',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeLabelAlign':
			return {
				ctor: '_Tuple2',
				_0: 'labelAlign',
				_1: _gicentre$elm_vega$Vega$hAlignSpec(_p139._0)
			};
		case 'LeLabelBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'labelBaseline',
				_1: _gicentre$elm_vega$Vega$vAlignSpec(_p139._0)
			};
		case 'LeLabelColor':
			return {
				ctor: '_Tuple2',
				_0: 'labelColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeLabelOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'labelOpacity',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeLabelFont':
			return {
				ctor: '_Tuple2',
				_0: 'labelFont',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeLabelFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeLabelFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontWeight',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p139._0)
			};
		case 'LeLabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'labelLimit',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeLabelOffset':
			return {
				ctor: '_Tuple2',
				_0: 'labelOffset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeLabelOverlap':
			return {
				ctor: '_Tuple2',
				_0: 'labelOverlap',
				_1: _gicentre$elm_vega$Vega$overlapStrategySpec(_p139._0)
			};
		case 'LeSymbolBaseFillColor':
			return {
				ctor: '_Tuple2',
				_0: 'symbolBaseFillColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeSymbolBaseStrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'symbolBaseStrokeColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeSymbolDirection':
			return {
				ctor: '_Tuple2',
				_0: 'symbolDirection',
				_1: _gicentre$elm_vega$Vega$orientationSpec(_p139._0)
			};
		case 'LeSymbolFillColor':
			return {
				ctor: '_Tuple2',
				_0: 'symbolFillColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeSymbolOffset':
			return {
				ctor: '_Tuple2',
				_0: 'symbolOffset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeSymbolSize':
			return {
				ctor: '_Tuple2',
				_0: 'symbolSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeSymbolStrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'symbolStrokeColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeSymbolStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'symbolStokeWidth',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeSymbolOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'symbolOpacity',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeSymbolType':
			return {
				ctor: '_Tuple2',
				_0: 'symbolType',
				_1: _gicentre$elm_vega$Vega$symbolSpec(_p139._0)
			};
		case 'LeTickCount':
			return {
				ctor: '_Tuple2',
				_0: 'tickCount',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeTemporalTickCount':
			var _p142 = _p139._0;
			var _p141 = _p139._1;
			var _p140 = _p141;
			switch (_p140.ctor) {
				case 'Num':
					return (_elm_lang$core$Native_Utils.cmp(_p140._0, 0) < 1) ? {
						ctor: '_Tuple2',
						_0: 'tickCount',
						_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p142)
					} : {
						ctor: '_Tuple2',
						_0: 'tickCount',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'interval',
									_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p142)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'step',
										_1: _gicentre$elm_vega$Vega$numSpec(_p141)
									},
									_1: {ctor: '[]'}
								}
							})
					};
				case 'NumSignal':
					return {
						ctor: '_Tuple2',
						_0: 'tickCount',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'interval',
									_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p142)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'step',
										_1: _gicentre$elm_vega$Vega$numSpec(_p141)
									},
									_1: {ctor: '[]'}
								}
							})
					};
				case 'NumExpr':
					return {
						ctor: '_Tuple2',
						_0: 'tickCount',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'interval',
									_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p142)
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'step',
										_1: _gicentre$elm_vega$Vega$numSpec(_p141)
									},
									_1: {ctor: '[]'}
								}
							})
					};
				default:
					return {
						ctor: '_Tuple2',
						_0: 'tickCount',
						_1: _gicentre$elm_vega$Vega$timeUnitSpec(_p142)
					};
			}
		case 'LeTitlePadding':
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p139._0)
			};
		case 'LeTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeTitleAlign':
			return {
				ctor: '_Tuple2',
				_0: 'titleAlign',
				_1: _gicentre$elm_vega$Vega$hAlignSpec(_p139._0)
			};
		case 'LeTitleBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'titleBaseline',
				_1: _gicentre$elm_vega$Vega$vAlignSpec(_p139._0)
			};
		case 'LeTitleColor':
			return {
				ctor: '_Tuple2',
				_0: 'titleColor',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeTitleFont':
			return {
				ctor: '_Tuple2',
				_0: 'titleFont',
				_1: _gicentre$elm_vega$Vega$strSpec(_p139._0)
			};
		case 'LeTitleFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeTitleFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontWeight',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p139._0)
			};
		case 'LeTitleLimit':
			return {
				ctor: '_Tuple2',
				_0: 'titleLimit',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeTitleOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'titleOpacity',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
		case 'LeValues':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueSpec, _p139._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _gicentre$elm_vega$Vega$numSpec(_p139._0)
			};
	}
};
var _gicentre$elm_vega$Vega$legend = function (lps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$legendProperty, lps)));
};
var _gicentre$elm_vega$Vega$titleProperty = function (tProp) {
	var _p143 = tProp;
	switch (_p143.ctor) {
		case 'TText':
			return {
				ctor: '_Tuple2',
				_0: 'text',
				_1: _gicentre$elm_vega$Vega$strSpec(_p143._0)
			};
		case 'TOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _gicentre$elm_vega$Vega$sideSpec(_p143._0)
			};
		case 'TAnchor':
			return {
				ctor: '_Tuple2',
				_0: 'anchor',
				_1: _gicentre$elm_vega$Vega$anchorSpec(_p143._0)
			};
		case 'TAngle':
			return {
				ctor: '_Tuple2',
				_0: 'angle',
				_1: _gicentre$elm_vega$Vega$numSpec(_p143._0)
			};
		case 'TBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'baseline',
				_1: _gicentre$elm_vega$Vega$vAlignSpec(_p143._0)
			};
		case 'TColor':
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _gicentre$elm_vega$Vega$strSpec(_p143._0)
			};
		case 'TEncode':
			return {
				ctor: '_Tuple2',
				_0: 'encode',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p143._0))
			};
		case 'TFont':
			return {
				ctor: '_Tuple2',
				_0: 'font',
				_1: _gicentre$elm_vega$Vega$strSpec(_p143._0)
			};
		case 'TFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'fontSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p143._0)
			};
		case 'TFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'fontWeight',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p143._0)
			};
		case 'TFrame':
			return {
				ctor: '_Tuple2',
				_0: 'fame',
				_1: _gicentre$elm_vega$Vega$titleFrameSpec(_p143._0)
			};
		case 'TInteractive':
			return {
				ctor: '_Tuple2',
				_0: 'interactive',
				_1: _gicentre$elm_vega$Vega$booSpec(_p143._0)
			};
		case 'TLimit':
			return {
				ctor: '_Tuple2',
				_0: 'limit',
				_1: _gicentre$elm_vega$Vega$numSpec(_p143._0)
			};
		case 'TName':
			return {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(_p143._0)
			};
		case 'TStyle':
			return {
				ctor: '_Tuple2',
				_0: 'style',
				_1: _gicentre$elm_vega$Vega$strSpec(_p143._0)
			};
		case 'TOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p143._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _gicentre$elm_vega$Vega$numSpec(_p143._0)
			};
	}
};
var _gicentre$elm_vega$Vega$windowOperationProperties = function (wos) {
	var windowAsSpec = function (wo) {
		var _p144 = wo;
		if (_p144.ctor === 'WnOperation') {
			return _elm_lang$core$Json_Encode$string(_p144._3);
		} else {
			return _elm_lang$core$Json_Encode$string(_p144._3);
		}
	};
	var windowFieldSpec = function (wo) {
		var _p145 = wo;
		if (_p145.ctor === 'WnOperation') {
			var _p146 = _p145._2;
			if (_p146.ctor === 'Just') {
				return _gicentre$elm_vega$Vega$fieldSpec(_p146._0);
			} else {
				return _elm_lang$core$Json_Encode$null;
			}
		} else {
			var _p147 = _p145._2;
			if (_p147.ctor === 'Just') {
				return _gicentre$elm_vega$Vega$fieldSpec(_p147._0);
			} else {
				return _elm_lang$core$Json_Encode$null;
			}
		}
	};
	var windowParamSpec = function (wo) {
		var _p148 = wo;
		if (_p148.ctor === 'WnOperation') {
			var _p149 = _p148._1;
			if (_p149.ctor === 'Just') {
				return _gicentre$elm_vega$Vega$numSpec(_p149._0);
			} else {
				return _elm_lang$core$Json_Encode$null;
			}
		} else {
			var _p150 = _p148._1;
			if (_p150.ctor === 'Just') {
				return _gicentre$elm_vega$Vega$numSpec(_p150._0);
			} else {
				return _elm_lang$core$Json_Encode$null;
			}
		}
	};
	var windowOpSpec = function (wo) {
		var _p151 = wo;
		if (_p151.ctor === 'WnOperation') {
			return _gicentre$elm_vega$Vega$wOperationSpec(_p151._0);
		} else {
			return _gicentre$elm_vega$Vega$opSpec(_p151._0);
		}
	};
	return {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'ops',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, windowOpSpec, wos))
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'params',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, windowParamSpec, wos))
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'fields',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, windowFieldSpec, wos))
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'as',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, windowAsSpec, wos))
					},
					_1: {ctor: '[]'}
				}
			}
		}
	};
};
var _gicentre$elm_vega$Vega$windowProperty = function (wp) {
	var _p152 = wp;
	switch (_p152.ctor) {
		case 'WnSort':
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					_gicentre$elm_vega$Vega$comparatorProperties(_p152._0))
			};
		case 'WnGroupBy':
			return {
				ctor: '_Tuple2',
				_0: 'groupby',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p152._0))
			};
		case 'WnFrame':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'frame', _p152._0);
		default:
			return {
				ctor: '_Tuple2',
				_0: 'ignorePeers',
				_1: _gicentre$elm_vega$Vega$booSpec(_p152._0)
			};
	}
};
var _gicentre$elm_vega$Vega$wordcloudProperty = function (wcp) {
	var _p153 = wcp;
	switch (_p153.ctor) {
		case 'WcFont':
			return {
				ctor: '_Tuple2',
				_0: 'font',
				_1: _gicentre$elm_vega$Vega$strSpec(_p153._0)
			};
		case 'WcFontStyle':
			return {
				ctor: '_Tuple2',
				_0: 'fontStyle',
				_1: _gicentre$elm_vega$Vega$strSpec(_p153._0)
			};
		case 'WcFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'fontWeight',
				_1: _gicentre$elm_vega$Vega$strSpec(_p153._0)
			};
		case 'WcFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'fontSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p153._0)
			};
		case 'WcFontSizeRange':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'fontSizeRange', _p153._0);
		case 'WcPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p153._0)
			};
		case 'WcRotate':
			return {
				ctor: '_Tuple2',
				_0: 'rotate',
				_1: _gicentre$elm_vega$Vega$numSpec(_p153._0)
			};
		case 'WcText':
			return {
				ctor: '_Tuple2',
				_0: 'text',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p153._0)
			};
		case 'WcSize':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'size', _p153._0);
		case 'WcSpiral':
			return {
				ctor: '_Tuple2',
				_0: 'spiral',
				_1: _gicentre$elm_vega$Vega$spiralSpec(_p153._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						_elm_lang$core$Json_Encode$string,
						{
							ctor: '::',
							_0: _p153._0,
							_1: {
								ctor: '::',
								_0: _p153._1,
								_1: {
									ctor: '::',
									_0: _p153._2,
									_1: {
										ctor: '::',
										_0: _p153._3,
										_1: {
											ctor: '::',
											_0: _p153._4,
											_1: {
												ctor: '::',
												_0: _p153._5,
												_1: {
													ctor: '::',
													_0: _p153._6,
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}))
			};
	}
};
var _gicentre$elm_vega$Vega$transformSpec = function (trans) {
	var _p154 = trans;
	switch (_p154.ctor) {
		case 'TAggregate':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('aggregate')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$aggregateProperty, _p154._0)
				});
		case 'TBin':
			var _p156 = _p154._1;
			var extSpec = function () {
				var _p155 = _p156;
				if (_p155.ctor === 'Num') {
					return A2(
						_elm_lang$core$Debug$log,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'trBin expecting an extent list but was given ',
							_elm_lang$core$Basics$toString(_p156)),
						_elm_lang$core$Json_Encode$null);
				} else {
					return _gicentre$elm_vega$Vega$numSpec(_p156);
				}
			}();
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('bin')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'field',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._0)
						},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'extent', _1: extSpec},
							_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$binProperty, _p154._2)
						}
					}
				});
		case 'TCollect':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('collect')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'sort',
							_1: _elm_lang$core$Json_Encode$object(
								_gicentre$elm_vega$Vega$comparatorProperties(_p154._0))
						},
						_1: {ctor: '[]'}
					}
				});
		case 'TCountPattern':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('countpattern')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'field',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._0)
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$countPatternProperty, _p154._1)
					}
				});
		case 'TCross':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('cross')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$crossProperty, _p154._0)
				});
		case 'TCrossFilter':
			var _p157 = _elm_lang$core$List$unzip(_p154._0);
			var fs = _p157._0;
			var nums = _p157._1;
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('crossfilter')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'fields',
							_1: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, fs))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'query',
								_1: _elm_lang$core$Json_Encode$list(
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$numSpec, nums))
							},
							_1: {ctor: '[]'}
						}
					}
				});
		case 'TCrossFilterAsSignal':
			var _p158 = _elm_lang$core$List$unzip(_p154._0);
			var fs = _p158._0;
			var nums = _p158._1;
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('crossfilter')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'fields',
							_1: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, fs))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'query',
								_1: _elm_lang$core$Json_Encode$list(
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$numSpec, nums))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'signal',
									_1: _elm_lang$core$Json_Encode$string(_p154._1)
								},
								_1: {ctor: '[]'}
							}
						}
					}
				});
		case 'TDensity':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('density')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'distribution',
							_1: _gicentre$elm_vega$Vega$distributionSpec(_p154._0)
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$densityProperty, _p154._1)
					}
				});
		case 'TExtent':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('extent')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'field',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._0)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'TExtentAsSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('extent')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'field',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'signal',
								_1: _elm_lang$core$Json_Encode$string(_p154._1)
							},
							_1: {ctor: '[]'}
						}
					}
				});
		case 'TFilter':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('filter')
					},
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$exprProperty(_p154._0),
						_1: {ctor: '[]'}
					}
				});
		case 'TFlatten':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('flatten')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'fields',
							_1: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p154._0))
						},
						_1: {ctor: '[]'}
					}
				});
		case 'TFlattenAs':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('flatten')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'fields',
							_1: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p154._0))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'as',
								_1: _elm_lang$core$Json_Encode$list(
									A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p154._1))
							},
							_1: {ctor: '[]'}
						}
					}
				});
		case 'TFold':
			var _p160 = _p154._0;
			var _p159 = _p160;
			if ((_p159.ctor === '::') && (_p159._1.ctor === '[]')) {
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string('fold')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'fields',
								_1: _gicentre$elm_vega$Vega$fieldSpec(_p159._0)
							},
							_1: {ctor: '[]'}
						}
					});
			} else {
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string('fold')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'fields',
								_1: _elm_lang$core$Json_Encode$list(
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p160))
							},
							_1: {ctor: '[]'}
						}
					});
			}
		case 'TFoldAs':
			var _p164 = _p154._2;
			var _p163 = _p154._1;
			var _p162 = _p154._0;
			var _p161 = _p162;
			if ((_p161.ctor === '::') && (_p161._1.ctor === '[]')) {
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string('fold')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'fields',
								_1: _gicentre$elm_vega$Vega$fieldSpec(_p161._0)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'as',
									_1: _elm_lang$core$Json_Encode$list(
										{
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$string(_p163),
											_1: {
												ctor: '::',
												_0: _elm_lang$core$Json_Encode$string(_p164),
												_1: {ctor: '[]'}
											}
										})
								},
								_1: {ctor: '[]'}
							}
						}
					});
			} else {
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string('fold')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'fields',
								_1: _elm_lang$core$Json_Encode$list(
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p162))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'as',
									_1: _elm_lang$core$Json_Encode$list(
										{
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$string(_p163),
											_1: {
												ctor: '::',
												_0: _elm_lang$core$Json_Encode$string(_p164),
												_1: {ctor: '[]'}
											}
										})
								},
								_1: {ctor: '[]'}
							}
						}
					});
			}
		case 'TFormula':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('formula')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'expr',
							_1: _gicentre$elm_vega$Vega$expressionSpec(_p154._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'as',
								_1: _elm_lang$core$Json_Encode$string(_p154._1)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'initonly',
									_1: _gicentre$elm_vega$Vega$formulaUpdateSpec(_p154._2)
								},
								_1: {ctor: '[]'}
							}
						}
					}
				});
		case 'TIdentifier':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('identifier')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'as',
							_1: _elm_lang$core$Json_Encode$string(_p154._0)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'TImpute':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('impute')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'field',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'key',
								_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._1)
							},
							_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$imputeProperty, _p154._2)
						}
					}
				});
		case 'TJoinAggregate':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('joinaggregate')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$joinAggregateProperty, _p154._0)
				});
		case 'TLookup':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('lookup')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'from',
							_1: _elm_lang$core$Json_Encode$string(_p154._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'key',
								_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._1)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'fields',
									_1: _elm_lang$core$Json_Encode$list(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p154._2))
								},
								_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$lookupProperty, _p154._3)
							}
						}
					}
				});
		case 'TPivot':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('pivot')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'field',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'value',
								_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._1)
							},
							_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$pivotProperty, _p154._2)
						}
					}
				});
		case 'TProject':
			var _p165 = _elm_lang$core$List$unzip(_p154._0);
			var fields = _p165._0;
			var names = _p165._1;
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('project')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'fields',
							_1: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, fields))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'as',
								_1: _elm_lang$core$Json_Encode$list(
									A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, names))
							},
							_1: {ctor: '[]'}
						}
					}
				});
		case 'TSample':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('sample')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'size',
							_1: _gicentre$elm_vega$Vega$numSpec(_p154._0)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'TSequence':
			var _p167 = _p154._2;
			var stepProp = function () {
				var _p166 = _p167;
				_v132_4:
				do {
					switch (_p166.ctor) {
						case 'NumNull':
							return {ctor: '[]'};
						case 'Num':
							if (_p166._0 === 0) {
								return {ctor: '[]'};
							} else {
								break _v132_4;
							}
						case 'Nums':
							if (_p166._0.ctor === '[]') {
								return {ctor: '[]'};
							} else {
								break _v132_4;
							}
						case 'NumList':
							if (_p166._0.ctor === '[]') {
								return {ctor: '[]'};
							} else {
								break _v132_4;
							}
						default:
							break _v132_4;
					}
				} while(false);
				return {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'step',
						_1: _gicentre$elm_vega$Vega$numSpec(_p167)
					},
					_1: {ctor: '[]'}
				};
			}();
			return _elm_lang$core$Json_Encode$object(
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string('sequence')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'start',
								_1: _gicentre$elm_vega$Vega$numSpec(_p154._0)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'stop',
									_1: _gicentre$elm_vega$Vega$numSpec(_p154._1)
								},
								_1: {ctor: '[]'}
							}
						}
					},
					stepProp));
		case 'TWindow':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('window')
					},
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						_gicentre$elm_vega$Vega$windowOperationProperties(_p154._0),
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$windowProperty, _p154._1))
				});
		case 'TContour':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('contour')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'size',
							_1: _elm_lang$core$Json_Encode$list(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$numSpec(_p154._0),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$numSpec(_p154._1),
										_1: {ctor: '[]'}
									}
								})
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$contourProperty, _p154._2)
					}
				});
		case 'TGeoJson':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('geojson')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$geoJsonProperty, _p154._0)
				});
		case 'TGeoPath':
			var _p170 = _p154._0;
			var _p169 = _p154._1;
			var _p168 = _p170;
			if (_p168 === '') {
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string('geopath')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$geoPathProperty, _p169)
					});
			} else {
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string('geopath')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'projection',
								_1: _elm_lang$core$Json_Encode$string(_p170)
							},
							_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$geoPathProperty, _p169)
						}
					});
			}
		case 'TGeoPoint':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('geopoint')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'projection',
							_1: _elm_lang$core$Json_Encode$string(_p154._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'fields',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$fieldSpec(_p154._1),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$fieldSpec(_p154._2),
											_1: {ctor: '[]'}
										}
									})
							},
							_1: {ctor: '[]'}
						}
					}
				});
		case 'TGeoPointAs':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('geopoint')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'projection',
							_1: _elm_lang$core$Json_Encode$string(_p154._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'fields',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$fieldSpec(_p154._1),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$fieldSpec(_p154._2),
											_1: {ctor: '[]'}
										}
									})
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'as',
									_1: _elm_lang$core$Json_Encode$list(
										{
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$string(_p154._3),
											_1: {
												ctor: '::',
												_0: _elm_lang$core$Json_Encode$string(_p154._4),
												_1: {ctor: '[]'}
											}
										})
								},
								_1: {ctor: '[]'}
							}
						}
					}
				});
		case 'TGeoShape':
			var _p173 = _p154._0;
			var _p172 = _p154._1;
			var _p171 = _p173;
			if (_p171 === '') {
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string('geoshape')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$geoPathProperty, _p172)
					});
			} else {
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string('geoshape')
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'projection',
								_1: _elm_lang$core$Json_Encode$string(_p173)
							},
							_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$geoPathProperty, _p172)
						}
					});
			}
		case 'TGraticule':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('graticule')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$graticuleProperty, _p154._0)
				});
		case 'TLinkPath':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('linkpath')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$linkPathProperty, _p154._0)
				});
		case 'TPie':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('pie')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$pieProperty, _p154._0)
				});
		case 'TStack':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('stack')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$stackProperty, _p154._0)
				});
		case 'TForce':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('force')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceSimulationProperty, _p154._0)
				});
		case 'TVoronoi':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('voronoi')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'x',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'y',
								_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._1)
							},
							_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$voronoiProperty, _p154._2)
						}
					}
				});
		case 'TWordcloud':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('wordcloud')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$wordcloudProperty, _p154._0)
				});
		case 'TNest':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('nest')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'keys',
							_1: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p154._0))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'generate',
								_1: _gicentre$elm_vega$Vega$booSpec(_p154._1)
							},
							_1: {ctor: '[]'}
						}
					}
				});
		case 'TStratify':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('stratify')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'key',
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'parentKey',
								_1: _gicentre$elm_vega$Vega$fieldSpec(_p154._1)
							},
							_1: {ctor: '[]'}
						}
					}
				});
		case 'TTreeLinks':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('treelinks')
					},
					_1: {ctor: '[]'}
				});
		case 'TPack':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('pack')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$packProperty, _p154._0)
				});
		case 'TPartition':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('partition')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$partitionProperty, _p154._0)
				});
		case 'TTree':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('tree')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$treeProperty, _p154._0)
				});
		case 'TTreemap':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('treemap')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$treemapProperty, _p154._0)
				});
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('resolvefilter')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'filter',
							_1: _elm_lang$core$Json_Encode$object(
								{
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'signal',
										_1: _elm_lang$core$Json_Encode$string(_p154._0)
									},
									_1: {ctor: '[]'}
								})
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'ignore',
								_1: _gicentre$elm_vega$Vega$numSpec(_p154._1)
							},
							_1: {ctor: '[]'}
						}
					}
				});
	}
};
var _gicentre$elm_vega$Vega$transform = F2(
	function (transforms, dTable) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			dTable,
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'transform',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$transformSpec, transforms))
				},
				_1: {ctor: '[]'}
			});
	});
var _gicentre$elm_vega$Vega$topMarkProperty = function (mProp) {
	var _p174 = mProp;
	switch (_p174.ctor) {
		case 'MType':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$Vega$markLabel(_p174._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MClip':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'clip',
					_1: _gicentre$elm_vega$Vega$clipSpec(_p174._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MDescription':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'description',
					_1: _elm_lang$core$Json_Encode$string(_p174._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MEncode':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'encode',
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p174._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MFrom':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'from',
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$sourceProperty, _p174._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MInteractive':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'interactive',
					_1: _gicentre$elm_vega$Vega$booSpec(_p174._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MKey':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'key',
					_1: _gicentre$elm_vega$Vega$fieldSpec(_p174._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MName':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'name',
					_1: _elm_lang$core$Json_Encode$string(_p174._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MOn':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'on',
					_1: _elm_lang$core$Json_Encode$list(_p174._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MRole':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'role',
					_1: _elm_lang$core$Json_Encode$string(_p174._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MSort':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'sort',
					_1: _elm_lang$core$Json_Encode$object(
						_gicentre$elm_vega$Vega$comparatorProperties(_p174._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MTransform':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'transform',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$transformSpec, _p174._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MStyle':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'style',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p174._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MGroup':
			return A2(
				_elm_lang$core$List$map,
				function (_p175) {
					var _p176 = _p175;
					return {
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$Vega$vPropertyLabel(_p176._0),
						_1: _p176._1
					};
				},
				_p174._0);
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'zindex',
					_1: _gicentre$elm_vega$Vega$numSpec(_p174._0)
				},
				_1: {ctor: '[]'}
			};
	}
};
var _gicentre$elm_vega$Vega$StrList = function (a) {
	return {ctor: 'StrList', _0: a};
};
var _gicentre$elm_vega$Vega$strList = _gicentre$elm_vega$Vega$StrList;
var _gicentre$elm_vega$Vega$StrSignals = function (a) {
	return {ctor: 'StrSignals', _0: a};
};
var _gicentre$elm_vega$Vega$doSignals = function (ss) {
	return _gicentre$elm_vega$Vega$DoStrs(
		_gicentre$elm_vega$Vega$StrSignals(ss));
};
var _gicentre$elm_vega$Vega$strSignals = _gicentre$elm_vega$Vega$StrSignals;
var _gicentre$elm_vega$Vega$StrSignal = function (a) {
	return {ctor: 'StrSignal', _0: a};
};
var _gicentre$elm_vega$Vega$doSignal = function (s) {
	return _gicentre$elm_vega$Vega$DoStrs(
		_gicentre$elm_vega$Vega$StrSignal(s));
};
var _gicentre$elm_vega$Vega$strSignal = _gicentre$elm_vega$Vega$StrSignal;
var _gicentre$elm_vega$Vega$Strs = function (a) {
	return {ctor: 'Strs', _0: a};
};
var _gicentre$elm_vega$Vega$strs = _gicentre$elm_vega$Vega$Strs;
var _gicentre$elm_vega$Vega$Str = function (a) {
	return {ctor: 'Str', _0: a};
};
var _gicentre$elm_vega$Vega$str = _gicentre$elm_vega$Vega$Str;
var _gicentre$elm_vega$Vega$strString = function (strVal) {
	strString:
	while (true) {
		var _p177 = strVal;
		switch (_p177.ctor) {
			case 'Str':
				return _p177._0;
			case 'Strs':
				return _elm_lang$core$Basics$toString(_p177._0);
			case 'StrList':
				var _p179 = _p177._0;
				var _p178 = _p179;
				if (_p178.ctor === '[]') {
					return '[]';
				} else {
					if (_p178._1.ctor === '[]') {
						var _v139 = _p178._0;
						strVal = _v139;
						continue strString;
					} else {
						var lastStr = A2(
							_elm_lang$core$Maybe$withDefault,
							_gicentre$elm_vega$Vega$str(''),
							_elm_lang$core$List$head(
								_elm_lang$core$List$reverse(_p179)));
						var notLast = _elm_lang$core$List$reverse(
							A2(
								_elm_lang$core$List$drop,
								1,
								_elm_lang$core$List$reverse(_p179)));
						return A2(
							_elm_lang$core$Basics_ops['++'],
							'[',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$String$concat(
									A2(
										_elm_lang$core$List$map,
										function (s) {
											return A2(
												_elm_lang$core$Basics_ops['++'],
												_gicentre$elm_vega$Vega$strString(s),
												',');
										},
										notLast)),
								A2(
									_elm_lang$core$Basics_ops['++'],
									_gicentre$elm_vega$Vega$strString(lastStr),
									']')));
					}
				}
			case 'StrSignal':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'{\'signal\': \'',
					A2(_elm_lang$core$Basics_ops['++'], _p177._0, '\'}'));
			case 'StrSignals':
				return _elm_lang$core$Basics$toString(_p177._0);
			case 'StrExpr':
				return _elm_lang$core$Basics$toString(_p177._0);
			default:
				return 'null';
		}
	}
};
var _gicentre$elm_vega$Vega$projectionLabel = function (pr) {
	var _p180 = pr;
	switch (_p180.ctor) {
		case 'Albers':
			return 'albers';
		case 'AlbersUsa':
			return 'albersUsa';
		case 'AzimuthalEqualArea':
			return 'azimuthalEqualArea';
		case 'AzimuthalEquidistant':
			return 'azimuthalEquidistant';
		case 'ConicConformal':
			return 'conicConformal';
		case 'ConicEqualArea':
			return 'conicEqualArea';
		case 'ConicEquidistant':
			return 'conicEquidistant';
		case 'Equirectangular':
			return 'equirectangular';
		case 'Gnomonic':
			return 'gnomonic';
		case 'Mercator':
			return 'mercator';
		case 'NaturalEarth1':
			return 'naturalEarth1';
		case 'Orthographic':
			return 'orthographic';
		case 'Stereographic':
			return 'stereographic';
		case 'TransverseMercator':
			return 'transverseMercator';
		case 'Proj':
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: Attempting to set projection type to ',
					_gicentre$elm_vega$Vega$strString(_p180._0)),
				'');
		default:
			return A2(
				_elm_lang$core$Debug$log,
				A2(_elm_lang$core$Basics_ops['++'], 'Warning: Attempting to set projection type to ', _p180._0),
				'');
	}
};
var _gicentre$elm_vega$Vega$projectionSpec = function (proj) {
	var _p181 = proj;
	switch (_p181.ctor) {
		case 'Proj':
			return _gicentre$elm_vega$Vega$strSpec(_p181._0);
		case 'ProjectionSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p181._0),
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$string(
				_gicentre$elm_vega$Vega$projectionLabel(proj));
	}
};
var _gicentre$elm_vega$Vega$projectionProperty = function (projProp) {
	var _p182 = projProp;
	switch (_p182.ctor) {
		case 'PrType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _gicentre$elm_vega$Vega$projectionSpec(_p182._0)
			};
		case 'PrClipAngle':
			var _p184 = _p182._0;
			var _p183 = _p184;
			if ((_p183.ctor === 'Num') && (_p183._0 === 0)) {
				return {ctor: '_Tuple2', _0: 'clipAngle', _1: _elm_lang$core$Json_Encode$null};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'clipAngle',
					_1: _gicentre$elm_vega$Vega$numSpec(_p184)
				};
			}
		case 'PrClipExtent':
			var _p186 = _p182._0;
			var _p185 = _p186;
			_v144_3:
			do {
				switch (_p185.ctor) {
					case 'Nums':
						if (((((_p185._0.ctor === '::') && (_p185._0._1.ctor === '::')) && (_p185._0._1._1.ctor === '::')) && (_p185._0._1._1._1.ctor === '::')) && (_p185._0._1._1._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'clipExtent',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$list(
											{
												ctor: '::',
												_0: _elm_lang$core$Json_Encode$float(_p185._0._0),
												_1: {
													ctor: '::',
													_0: _elm_lang$core$Json_Encode$float(_p185._0._1._0),
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$list(
												{
													ctor: '::',
													_0: _elm_lang$core$Json_Encode$float(_p185._0._1._1._0),
													_1: {
														ctor: '::',
														_0: _elm_lang$core$Json_Encode$float(_p185._0._1._1._1._0),
														_1: {ctor: '[]'}
													}
												}),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v144_3;
						}
					case 'NumSignal':
						return {
							ctor: '_Tuple2',
							_0: 'clipExtent',
							_1: _gicentre$elm_vega$Vega$numSpec(
								_gicentre$elm_vega$Vega$NumSignal(_p185._0))
						};
					case 'NumSignals':
						if (((((_p185._0.ctor === '::') && (_p185._0._1.ctor === '::')) && (_p185._0._1._1.ctor === '::')) && (_p185._0._1._1._1.ctor === '::')) && (_p185._0._1._1._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'clipExtent',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$numSpec(
											_gicentre$elm_vega$Vega$NumSignals(
												{
													ctor: '::',
													_0: _p185._0._0,
													_1: {
														ctor: '::',
														_0: _p185._0._1._0,
														_1: {ctor: '[]'}
													}
												})),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$numSpec(
												_gicentre$elm_vega$Vega$NumSignals(
													{
														ctor: '::',
														_0: _p185._0._1._1._0,
														_1: {
															ctor: '::',
															_0: _p185._0._1._1._1._0,
															_1: {ctor: '[]'}
														}
													})),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v144_3;
						}
					default:
						break _v144_3;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: prClipExtent expecting list of 4 numbers but was given ',
					_elm_lang$core$Basics$toString(_p186)),
				{ctor: '_Tuple2', _0: 'clipExtent', _1: _elm_lang$core$Json_Encode$null});
		case 'PrScale':
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrTranslate':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'translate', _p182._0);
		case 'PrCenter':
			return {
				ctor: '_Tuple2',
				_0: 'center',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrRotate':
			var _p188 = _p182._0;
			var _p187 = _p188;
			_v145_7:
			do {
				switch (_p187.ctor) {
					case 'Nums':
						if ((_p187._0.ctor === '::') && (_p187._0._1.ctor === '::')) {
							if (_p187._0._1._1.ctor === '[]') {
								return {
									ctor: '_Tuple2',
									_0: 'rotate',
									_1: _elm_lang$core$Json_Encode$list(
										{
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p187._0._0),
											_1: {
												ctor: '::',
												_0: _elm_lang$core$Json_Encode$float(_p187._0._1._0),
												_1: {ctor: '[]'}
											}
										})
								};
							} else {
								if (_p187._0._1._1._1.ctor === '[]') {
									return {
										ctor: '_Tuple2',
										_0: 'rotate',
										_1: _elm_lang$core$Json_Encode$list(
											{
												ctor: '::',
												_0: _elm_lang$core$Json_Encode$float(_p187._0._0),
												_1: {
													ctor: '::',
													_0: _elm_lang$core$Json_Encode$float(_p187._0._1._0),
													_1: {
														ctor: '::',
														_0: _elm_lang$core$Json_Encode$float(_p187._0._1._1._0),
														_1: {ctor: '[]'}
													}
												}
											})
									};
								} else {
									break _v145_7;
								}
							}
						} else {
							break _v145_7;
						}
					case 'NumSignal':
						return {
							ctor: '_Tuple2',
							_0: 'rotate',
							_1: _gicentre$elm_vega$Vega$numSpec(
								_gicentre$elm_vega$Vega$NumSignal(_p187._0))
						};
					case 'NumSignals':
						if ((_p187._0.ctor === '::') && (_p187._0._1.ctor === '::')) {
							if (_p187._0._1._1.ctor === '[]') {
								return {
									ctor: '_Tuple2',
									_0: 'rotate',
									_1: _gicentre$elm_vega$Vega$numSpec(
										_gicentre$elm_vega$Vega$NumSignals(
											{
												ctor: '::',
												_0: _p187._0._0,
												_1: {
													ctor: '::',
													_0: _p187._0._1._0,
													_1: {ctor: '[]'}
												}
											}))
								};
							} else {
								if (_p187._0._1._1._1.ctor === '[]') {
									return {
										ctor: '_Tuple2',
										_0: 'rotate',
										_1: _gicentre$elm_vega$Vega$numSpec(
											_gicentre$elm_vega$Vega$NumSignals(
												{
													ctor: '::',
													_0: _p187._0._0,
													_1: {
														ctor: '::',
														_0: _p187._0._1._0,
														_1: {
															ctor: '::',
															_0: _p187._0._1._1._0,
															_1: {ctor: '[]'}
														}
													}
												}))
									};
								} else {
									break _v145_7;
								}
							}
						} else {
							break _v145_7;
						}
					case 'NumList':
						if ((_p187._0.ctor === '::') && (_p187._0._1.ctor === '::')) {
							if (_p187._0._1._1.ctor === '[]') {
								return {
									ctor: '_Tuple2',
									_0: 'rotate',
									_1: _gicentre$elm_vega$Vega$numSpec(
										_gicentre$elm_vega$Vega$NumList(
											{
												ctor: '::',
												_0: _p187._0._0,
												_1: {
													ctor: '::',
													_0: _p187._0._1._0,
													_1: {ctor: '[]'}
												}
											}))
								};
							} else {
								if (_p187._0._1._1._1.ctor === '[]') {
									return {
										ctor: '_Tuple2',
										_0: 'rotate',
										_1: _gicentre$elm_vega$Vega$numSpec(
											_gicentre$elm_vega$Vega$NumList(
												{
													ctor: '::',
													_0: _p187._0._0,
													_1: {
														ctor: '::',
														_0: _p187._0._1._0,
														_1: {
															ctor: '::',
															_0: _p187._0._1._1._0,
															_1: {ctor: '[]'}
														}
													}
												}))
									};
								} else {
									break _v145_7;
								}
							}
						} else {
							break _v145_7;
						}
					default:
						break _v145_7;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: prRotate expecting list of 2 or 3 numbers but was given ',
					_elm_lang$core$Basics$toString(_p188)),
				{ctor: '_Tuple2', _0: 'rotate', _1: _elm_lang$core$Json_Encode$null});
		case 'PrPointRadius':
			return {
				ctor: '_Tuple2',
				_0: 'pointRadius',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrPrecision':
			return {
				ctor: '_Tuple2',
				_0: 'precision',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrFit':
			var _p189 = _p182._0;
			if (_p189.ctor === 'FeName') {
				return {
					ctor: '_Tuple2',
					_0: 'fit',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'signal',
								_1: _elm_lang$core$Json_Encode$string(
									A2(
										_elm_lang$core$Basics_ops['++'],
										'data(\'',
										A2(_elm_lang$core$Basics_ops['++'], _p189._0, '\')')))
							},
							_1: {ctor: '[]'}
						})
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'fit',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'signal',
								_1: _elm_lang$core$Json_Encode$string(_p189._0)
							},
							_1: {ctor: '[]'}
						})
				};
			}
		case 'PrExtent':
			var _p191 = _p182._0;
			var _p190 = _p191;
			_v147_3:
			do {
				switch (_p190.ctor) {
					case 'Nums':
						if (((((_p190._0.ctor === '::') && (_p190._0._1.ctor === '::')) && (_p190._0._1._1.ctor === '::')) && (_p190._0._1._1._1.ctor === '::')) && (_p190._0._1._1._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'extent',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$list(
											{
												ctor: '::',
												_0: _elm_lang$core$Json_Encode$float(_p190._0._0),
												_1: {
													ctor: '::',
													_0: _elm_lang$core$Json_Encode$float(_p190._0._1._0),
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$list(
												{
													ctor: '::',
													_0: _elm_lang$core$Json_Encode$float(_p190._0._1._1._0),
													_1: {
														ctor: '::',
														_0: _elm_lang$core$Json_Encode$float(_p190._0._1._1._1._0),
														_1: {ctor: '[]'}
													}
												}),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v147_3;
						}
					case 'NumSignal':
						return {
							ctor: '_Tuple2',
							_0: 'extent',
							_1: _gicentre$elm_vega$Vega$numSpec(
								_gicentre$elm_vega$Vega$NumSignal(_p190._0))
						};
					case 'NumSignals':
						if (((((_p190._0.ctor === '::') && (_p190._0._1.ctor === '::')) && (_p190._0._1._1.ctor === '::')) && (_p190._0._1._1._1.ctor === '::')) && (_p190._0._1._1._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'extent',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$numSpec(
											_gicentre$elm_vega$Vega$NumSignals(
												{
													ctor: '::',
													_0: _p190._0._0,
													_1: {
														ctor: '::',
														_0: _p190._0._1._0,
														_1: {ctor: '[]'}
													}
												})),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$numSpec(
												_gicentre$elm_vega$Vega$NumSignals(
													{
														ctor: '::',
														_0: _p190._0._1._1._0,
														_1: {
															ctor: '::',
															_0: _p190._0._1._1._1._0,
															_1: {ctor: '[]'}
														}
													})),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v147_3;
						}
					default:
						break _v147_3;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: prExtent expecting list of 4 numbers but was given ',
					_elm_lang$core$Basics$toString(_p191)),
				{ctor: '_Tuple2', _0: 'extent', _1: _elm_lang$core$Json_Encode$null});
		case 'PrSize':
			return A3(_gicentre$elm_vega$Vega$numArrayProperty, 2, 'size', _p182._0);
		case 'PrCoefficient':
			return {
				ctor: '_Tuple2',
				_0: 'coefficient',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrDistance':
			return {
				ctor: '_Tuple2',
				_0: 'distance',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrFraction':
			return {
				ctor: '_Tuple2',
				_0: 'fraction',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrLobes':
			return {
				ctor: '_Tuple2',
				_0: 'lobes',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrParallel':
			return {
				ctor: '_Tuple2',
				_0: 'parallel',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrRadius':
			return {
				ctor: '_Tuple2',
				_0: 'radius',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrRatio':
			return {
				ctor: '_Tuple2',
				_0: 'ratio',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		case 'PrSpacing':
			return {
				ctor: '_Tuple2',
				_0: 'spacing',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'tilt',
				_1: _gicentre$elm_vega$Vega$numSpec(_p182._0)
			};
	}
};
var _gicentre$elm_vega$Vega$projection = F2(
	function (name, pps) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			_elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'name',
						_1: _elm_lang$core$Json_Encode$string(name)
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$projectionProperty, pps)
				}));
	});
var _gicentre$elm_vega$Vega$TZIndex = function (a) {
	return {ctor: 'TZIndex', _0: a};
};
var _gicentre$elm_vega$Vega$tiZIndex = _gicentre$elm_vega$Vega$TZIndex;
var _gicentre$elm_vega$Vega$TOffset = function (a) {
	return {ctor: 'TOffset', _0: a};
};
var _gicentre$elm_vega$Vega$tiOffset = _gicentre$elm_vega$Vega$TOffset;
var _gicentre$elm_vega$Vega$TStyle = function (a) {
	return {ctor: 'TStyle', _0: a};
};
var _gicentre$elm_vega$Vega$tiStyle = _gicentre$elm_vega$Vega$TStyle;
var _gicentre$elm_vega$Vega$TName = function (a) {
	return {ctor: 'TName', _0: a};
};
var _gicentre$elm_vega$Vega$tiName = _gicentre$elm_vega$Vega$TName;
var _gicentre$elm_vega$Vega$TLimit = function (a) {
	return {ctor: 'TLimit', _0: a};
};
var _gicentre$elm_vega$Vega$tiLimit = _gicentre$elm_vega$Vega$TLimit;
var _gicentre$elm_vega$Vega$TInteractive = function (a) {
	return {ctor: 'TInteractive', _0: a};
};
var _gicentre$elm_vega$Vega$tiInteractive = _gicentre$elm_vega$Vega$TInteractive;
var _gicentre$elm_vega$Vega$TFrame = function (a) {
	return {ctor: 'TFrame', _0: a};
};
var _gicentre$elm_vega$Vega$tiFrame = _gicentre$elm_vega$Vega$TFrame;
var _gicentre$elm_vega$Vega$TFontWeight = function (a) {
	return {ctor: 'TFontWeight', _0: a};
};
var _gicentre$elm_vega$Vega$tiFontWeight = _gicentre$elm_vega$Vega$TFontWeight;
var _gicentre$elm_vega$Vega$TFontSize = function (a) {
	return {ctor: 'TFontSize', _0: a};
};
var _gicentre$elm_vega$Vega$tiFontSize = _gicentre$elm_vega$Vega$TFontSize;
var _gicentre$elm_vega$Vega$TFont = function (a) {
	return {ctor: 'TFont', _0: a};
};
var _gicentre$elm_vega$Vega$tiFont = _gicentre$elm_vega$Vega$TFont;
var _gicentre$elm_vega$Vega$TEncode = function (a) {
	return {ctor: 'TEncode', _0: a};
};
var _gicentre$elm_vega$Vega$tiEncode = _gicentre$elm_vega$Vega$TEncode;
var _gicentre$elm_vega$Vega$TColor = function (a) {
	return {ctor: 'TColor', _0: a};
};
var _gicentre$elm_vega$Vega$tiColor = _gicentre$elm_vega$Vega$TColor;
var _gicentre$elm_vega$Vega$TBaseline = function (a) {
	return {ctor: 'TBaseline', _0: a};
};
var _gicentre$elm_vega$Vega$tiBaseline = _gicentre$elm_vega$Vega$TBaseline;
var _gicentre$elm_vega$Vega$TAngle = function (a) {
	return {ctor: 'TAngle', _0: a};
};
var _gicentre$elm_vega$Vega$tiAngle = _gicentre$elm_vega$Vega$TAngle;
var _gicentre$elm_vega$Vega$TAnchor = function (a) {
	return {ctor: 'TAnchor', _0: a};
};
var _gicentre$elm_vega$Vega$tiAnchor = _gicentre$elm_vega$Vega$TAnchor;
var _gicentre$elm_vega$Vega$TOrient = function (a) {
	return {ctor: 'TOrient', _0: a};
};
var _gicentre$elm_vega$Vega$tiOrient = _gicentre$elm_vega$Vega$TOrient;
var _gicentre$elm_vega$Vega$TText = function (a) {
	return {ctor: 'TText', _0: a};
};
var _gicentre$elm_vega$Vega$MGroup = function (a) {
	return {ctor: 'MGroup', _0: a};
};
var _gicentre$elm_vega$Vega$mGroup = _gicentre$elm_vega$Vega$MGroup;
var _gicentre$elm_vega$Vega$MStyle = function (a) {
	return {ctor: 'MStyle', _0: a};
};
var _gicentre$elm_vega$Vega$mStyle = _gicentre$elm_vega$Vega$MStyle;
var _gicentre$elm_vega$Vega$MRole = function (a) {
	return {ctor: 'MRole', _0: a};
};
var _gicentre$elm_vega$Vega$MTransform = function (a) {
	return {ctor: 'MTransform', _0: a};
};
var _gicentre$elm_vega$Vega$mTransform = _gicentre$elm_vega$Vega$MTransform;
var _gicentre$elm_vega$Vega$MTopZIndex = function (a) {
	return {ctor: 'MTopZIndex', _0: a};
};
var _gicentre$elm_vega$Vega$mZIndex = _gicentre$elm_vega$Vega$MTopZIndex;
var _gicentre$elm_vega$Vega$MSort = function (a) {
	return {ctor: 'MSort', _0: a};
};
var _gicentre$elm_vega$Vega$mSort = _gicentre$elm_vega$Vega$MSort;
var _gicentre$elm_vega$Vega$MOn = function (a) {
	return {ctor: 'MOn', _0: a};
};
var _gicentre$elm_vega$Vega$mOn = _gicentre$elm_vega$Vega$MOn;
var _gicentre$elm_vega$Vega$MName = function (a) {
	return {ctor: 'MName', _0: a};
};
var _gicentre$elm_vega$Vega$mName = _gicentre$elm_vega$Vega$MName;
var _gicentre$elm_vega$Vega$MKey = function (a) {
	return {ctor: 'MKey', _0: a};
};
var _gicentre$elm_vega$Vega$mKey = _gicentre$elm_vega$Vega$MKey;
var _gicentre$elm_vega$Vega$MInteractive = function (a) {
	return {ctor: 'MInteractive', _0: a};
};
var _gicentre$elm_vega$Vega$mInteractive = _gicentre$elm_vega$Vega$MInteractive;
var _gicentre$elm_vega$Vega$MFrom = function (a) {
	return {ctor: 'MFrom', _0: a};
};
var _gicentre$elm_vega$Vega$mFrom = _gicentre$elm_vega$Vega$MFrom;
var _gicentre$elm_vega$Vega$MEncode = function (a) {
	return {ctor: 'MEncode', _0: a};
};
var _gicentre$elm_vega$Vega$mEncode = _gicentre$elm_vega$Vega$MEncode;
var _gicentre$elm_vega$Vega$MDescription = function (a) {
	return {ctor: 'MDescription', _0: a};
};
var _gicentre$elm_vega$Vega$mDescription = _gicentre$elm_vega$Vega$MDescription;
var _gicentre$elm_vega$Vega$MClip = function (a) {
	return {ctor: 'MClip', _0: a};
};
var _gicentre$elm_vega$Vega$mClip = _gicentre$elm_vega$Vega$MClip;
var _gicentre$elm_vega$Vega$MType = function (a) {
	return {ctor: 'MType', _0: a};
};
var _gicentre$elm_vega$Vega$mark = F2(
	function (mark, mps) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			_elm_lang$core$Json_Encode$object(
				A2(
					_elm_lang$core$List$concatMap,
					_gicentre$elm_vega$Vega$topMarkProperty,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$MType(mark),
						_1: mps
					})));
	});
var _gicentre$elm_vega$Vega$TWordcloud = function (a) {
	return {ctor: 'TWordcloud', _0: a};
};
var _gicentre$elm_vega$Vega$trWordcloud = _gicentre$elm_vega$Vega$TWordcloud;
var _gicentre$elm_vega$Vega$TWindow = F2(
	function (a, b) {
		return {ctor: 'TWindow', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trWindow = _gicentre$elm_vega$Vega$TWindow;
var _gicentre$elm_vega$Vega$TVoronoi = F3(
	function (a, b, c) {
		return {ctor: 'TVoronoi', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$trVoronoi = _gicentre$elm_vega$Vega$TVoronoi;
var _gicentre$elm_vega$Vega$TTreemap = function (a) {
	return {ctor: 'TTreemap', _0: a};
};
var _gicentre$elm_vega$Vega$trTreemap = _gicentre$elm_vega$Vega$TTreemap;
var _gicentre$elm_vega$Vega$TTreeLinks = {ctor: 'TTreeLinks'};
var _gicentre$elm_vega$Vega$trTreeLinks = _gicentre$elm_vega$Vega$TTreeLinks;
var _gicentre$elm_vega$Vega$TTree = function (a) {
	return {ctor: 'TTree', _0: a};
};
var _gicentre$elm_vega$Vega$trTree = _gicentre$elm_vega$Vega$TTree;
var _gicentre$elm_vega$Vega$TStratify = F2(
	function (a, b) {
		return {ctor: 'TStratify', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trStratify = _gicentre$elm_vega$Vega$TStratify;
var _gicentre$elm_vega$Vega$TStack = function (a) {
	return {ctor: 'TStack', _0: a};
};
var _gicentre$elm_vega$Vega$trStack = _gicentre$elm_vega$Vega$TStack;
var _gicentre$elm_vega$Vega$TSequence = F3(
	function (a, b, c) {
		return {ctor: 'TSequence', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$trSequence = _gicentre$elm_vega$Vega$TSequence;
var _gicentre$elm_vega$Vega$TSample = function (a) {
	return {ctor: 'TSample', _0: a};
};
var _gicentre$elm_vega$Vega$trSample = _gicentre$elm_vega$Vega$TSample;
var _gicentre$elm_vega$Vega$TResolveFilter = F2(
	function (a, b) {
		return {ctor: 'TResolveFilter', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trResolveFilter = _gicentre$elm_vega$Vega$TResolveFilter;
var _gicentre$elm_vega$Vega$TProject = function (a) {
	return {ctor: 'TProject', _0: a};
};
var _gicentre$elm_vega$Vega$trProject = _gicentre$elm_vega$Vega$TProject;
var _gicentre$elm_vega$Vega$TPivot = F3(
	function (a, b, c) {
		return {ctor: 'TPivot', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$trPivot = _gicentre$elm_vega$Vega$TPivot;
var _gicentre$elm_vega$Vega$TPie = function (a) {
	return {ctor: 'TPie', _0: a};
};
var _gicentre$elm_vega$Vega$trPie = _gicentre$elm_vega$Vega$TPie;
var _gicentre$elm_vega$Vega$TPartition = function (a) {
	return {ctor: 'TPartition', _0: a};
};
var _gicentre$elm_vega$Vega$trPartition = _gicentre$elm_vega$Vega$TPartition;
var _gicentre$elm_vega$Vega$TPack = function (a) {
	return {ctor: 'TPack', _0: a};
};
var _gicentre$elm_vega$Vega$trPack = _gicentre$elm_vega$Vega$TPack;
var _gicentre$elm_vega$Vega$TNest = F2(
	function (a, b) {
		return {ctor: 'TNest', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trNest = _gicentre$elm_vega$Vega$TNest;
var _gicentre$elm_vega$Vega$TLookup = F4(
	function (a, b, c, d) {
		return {ctor: 'TLookup', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$Vega$trLookup = _gicentre$elm_vega$Vega$TLookup;
var _gicentre$elm_vega$Vega$TLinkPath = function (a) {
	return {ctor: 'TLinkPath', _0: a};
};
var _gicentre$elm_vega$Vega$trLinkPath = _gicentre$elm_vega$Vega$TLinkPath;
var _gicentre$elm_vega$Vega$TJoinAggregate = function (a) {
	return {ctor: 'TJoinAggregate', _0: a};
};
var _gicentre$elm_vega$Vega$trJoinAggregate = _gicentre$elm_vega$Vega$TJoinAggregate;
var _gicentre$elm_vega$Vega$TImpute = F3(
	function (a, b, c) {
		return {ctor: 'TImpute', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$trImpute = _gicentre$elm_vega$Vega$TImpute;
var _gicentre$elm_vega$Vega$TIdentifier = function (a) {
	return {ctor: 'TIdentifier', _0: a};
};
var _gicentre$elm_vega$Vega$trIdentifier = _gicentre$elm_vega$Vega$TIdentifier;
var _gicentre$elm_vega$Vega$TGraticule = function (a) {
	return {ctor: 'TGraticule', _0: a};
};
var _gicentre$elm_vega$Vega$trGraticule = _gicentre$elm_vega$Vega$TGraticule;
var _gicentre$elm_vega$Vega$TGeoShape = F2(
	function (a, b) {
		return {ctor: 'TGeoShape', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trGeoShape = _gicentre$elm_vega$Vega$TGeoShape;
var _gicentre$elm_vega$Vega$TGeoPointAs = F5(
	function (a, b, c, d, e) {
		return {ctor: 'TGeoPointAs', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _gicentre$elm_vega$Vega$trGeoPointAs = _gicentre$elm_vega$Vega$TGeoPointAs;
var _gicentre$elm_vega$Vega$TGeoPoint = F3(
	function (a, b, c) {
		return {ctor: 'TGeoPoint', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$trGeoPoint = _gicentre$elm_vega$Vega$TGeoPoint;
var _gicentre$elm_vega$Vega$TGeoPath = F2(
	function (a, b) {
		return {ctor: 'TGeoPath', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trGeoPath = _gicentre$elm_vega$Vega$TGeoPath;
var _gicentre$elm_vega$Vega$TGeoJson = function (a) {
	return {ctor: 'TGeoJson', _0: a};
};
var _gicentre$elm_vega$Vega$trGeoJson = _gicentre$elm_vega$Vega$TGeoJson;
var _gicentre$elm_vega$Vega$TFormula = F3(
	function (a, b, c) {
		return {ctor: 'TFormula', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$TForce = function (a) {
	return {ctor: 'TForce', _0: a};
};
var _gicentre$elm_vega$Vega$trForce = _gicentre$elm_vega$Vega$TForce;
var _gicentre$elm_vega$Vega$TFoldAs = F3(
	function (a, b, c) {
		return {ctor: 'TFoldAs', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$trFoldAs = _gicentre$elm_vega$Vega$TFoldAs;
var _gicentre$elm_vega$Vega$TFold = function (a) {
	return {ctor: 'TFold', _0: a};
};
var _gicentre$elm_vega$Vega$trFold = _gicentre$elm_vega$Vega$TFold;
var _gicentre$elm_vega$Vega$TFlattenAs = F2(
	function (a, b) {
		return {ctor: 'TFlattenAs', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trFlattenAs = _gicentre$elm_vega$Vega$TFlattenAs;
var _gicentre$elm_vega$Vega$TFlatten = function (a) {
	return {ctor: 'TFlatten', _0: a};
};
var _gicentre$elm_vega$Vega$trFlatten = _gicentre$elm_vega$Vega$TFlatten;
var _gicentre$elm_vega$Vega$TFilter = function (a) {
	return {ctor: 'TFilter', _0: a};
};
var _gicentre$elm_vega$Vega$trFilter = _gicentre$elm_vega$Vega$TFilter;
var _gicentre$elm_vega$Vega$TExtentAsSignal = F2(
	function (a, b) {
		return {ctor: 'TExtentAsSignal', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trExtentAsSignal = _gicentre$elm_vega$Vega$TExtentAsSignal;
var _gicentre$elm_vega$Vega$TExtent = function (a) {
	return {ctor: 'TExtent', _0: a};
};
var _gicentre$elm_vega$Vega$trExtent = _gicentre$elm_vega$Vega$TExtent;
var _gicentre$elm_vega$Vega$TDensity = F2(
	function (a, b) {
		return {ctor: 'TDensity', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trDensity = _gicentre$elm_vega$Vega$TDensity;
var _gicentre$elm_vega$Vega$TCrossFilterAsSignal = F2(
	function (a, b) {
		return {ctor: 'TCrossFilterAsSignal', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trCrossFilterAsSignal = _gicentre$elm_vega$Vega$TCrossFilterAsSignal;
var _gicentre$elm_vega$Vega$TCrossFilter = function (a) {
	return {ctor: 'TCrossFilter', _0: a};
};
var _gicentre$elm_vega$Vega$trCrossFilter = _gicentre$elm_vega$Vega$TCrossFilter;
var _gicentre$elm_vega$Vega$TCross = function (a) {
	return {ctor: 'TCross', _0: a};
};
var _gicentre$elm_vega$Vega$trCross = _gicentre$elm_vega$Vega$TCross;
var _gicentre$elm_vega$Vega$TCountPattern = F2(
	function (a, b) {
		return {ctor: 'TCountPattern', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trCountPattern = _gicentre$elm_vega$Vega$TCountPattern;
var _gicentre$elm_vega$Vega$TContour = F3(
	function (a, b, c) {
		return {ctor: 'TContour', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$trContour = _gicentre$elm_vega$Vega$TContour;
var _gicentre$elm_vega$Vega$TCollect = function (a) {
	return {ctor: 'TCollect', _0: a};
};
var _gicentre$elm_vega$Vega$trCollect = _gicentre$elm_vega$Vega$TCollect;
var _gicentre$elm_vega$Vega$TBin = F3(
	function (a, b, c) {
		return {ctor: 'TBin', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$trBin = _gicentre$elm_vega$Vega$TBin;
var _gicentre$elm_vega$Vega$TAggregate = function (a) {
	return {ctor: 'TAggregate', _0: a};
};
var _gicentre$elm_vega$Vega$trAggregate = _gicentre$elm_vega$Vega$TAggregate;
var _gicentre$elm_vega$Vega$TmAs = F6(
	function (a, b, c, d, e, f) {
		return {ctor: 'TmAs', _0: a, _1: b, _2: c, _3: d, _4: e, _5: f};
	});
var _gicentre$elm_vega$Vega$tmAs = _gicentre$elm_vega$Vega$TmAs;
var _gicentre$elm_vega$Vega$TmSize = function (a) {
	return {ctor: 'TmSize', _0: a};
};
var _gicentre$elm_vega$Vega$tmSize = _gicentre$elm_vega$Vega$TmSize;
var _gicentre$elm_vega$Vega$TmRound = function (a) {
	return {ctor: 'TmRound', _0: a};
};
var _gicentre$elm_vega$Vega$tmRound = _gicentre$elm_vega$Vega$TmRound;
var _gicentre$elm_vega$Vega$TmRatio = function (a) {
	return {ctor: 'TmRatio', _0: a};
};
var _gicentre$elm_vega$Vega$tmRatio = _gicentre$elm_vega$Vega$TmRatio;
var _gicentre$elm_vega$Vega$TmPaddingLeft = function (a) {
	return {ctor: 'TmPaddingLeft', _0: a};
};
var _gicentre$elm_vega$Vega$tmPaddingLeft = _gicentre$elm_vega$Vega$TmPaddingLeft;
var _gicentre$elm_vega$Vega$TmPaddingBottom = function (a) {
	return {ctor: 'TmPaddingBottom', _0: a};
};
var _gicentre$elm_vega$Vega$tmPaddingBottom = _gicentre$elm_vega$Vega$TmPaddingBottom;
var _gicentre$elm_vega$Vega$TmPaddingRight = function (a) {
	return {ctor: 'TmPaddingRight', _0: a};
};
var _gicentre$elm_vega$Vega$tmPaddingRight = _gicentre$elm_vega$Vega$TmPaddingRight;
var _gicentre$elm_vega$Vega$TmPaddingTop = function (a) {
	return {ctor: 'TmPaddingTop', _0: a};
};
var _gicentre$elm_vega$Vega$tmPaddingTop = _gicentre$elm_vega$Vega$TmPaddingTop;
var _gicentre$elm_vega$Vega$TmPaddingOuter = function (a) {
	return {ctor: 'TmPaddingOuter', _0: a};
};
var _gicentre$elm_vega$Vega$tmPaddingOuter = _gicentre$elm_vega$Vega$TmPaddingOuter;
var _gicentre$elm_vega$Vega$TmPaddingInner = function (a) {
	return {ctor: 'TmPaddingInner', _0: a};
};
var _gicentre$elm_vega$Vega$tmPaddingInner = _gicentre$elm_vega$Vega$TmPaddingInner;
var _gicentre$elm_vega$Vega$TmPadding = function (a) {
	return {ctor: 'TmPadding', _0: a};
};
var _gicentre$elm_vega$Vega$tmPadding = _gicentre$elm_vega$Vega$TmPadding;
var _gicentre$elm_vega$Vega$TmMethod = function (a) {
	return {ctor: 'TmMethod', _0: a};
};
var _gicentre$elm_vega$Vega$tmMethod = _gicentre$elm_vega$Vega$TmMethod;
var _gicentre$elm_vega$Vega$TmSort = function (a) {
	return {ctor: 'TmSort', _0: a};
};
var _gicentre$elm_vega$Vega$tmSort = _gicentre$elm_vega$Vega$TmSort;
var _gicentre$elm_vega$Vega$TmField = function (a) {
	return {ctor: 'TmField', _0: a};
};
var _gicentre$elm_vega$Vega$tmField = _gicentre$elm_vega$Vega$TmField;
var _gicentre$elm_vega$Vega$TeAs = F4(
	function (a, b, c, d) {
		return {ctor: 'TeAs', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$Vega$teAs = _gicentre$elm_vega$Vega$TeAs;
var _gicentre$elm_vega$Vega$TeNodeSize = function (a) {
	return {ctor: 'TeNodeSize', _0: a};
};
var _gicentre$elm_vega$Vega$teNodeSize = _gicentre$elm_vega$Vega$TeNodeSize;
var _gicentre$elm_vega$Vega$TeSize = function (a) {
	return {ctor: 'TeSize', _0: a};
};
var _gicentre$elm_vega$Vega$teSize = _gicentre$elm_vega$Vega$TeSize;
var _gicentre$elm_vega$Vega$TeMethod = function (a) {
	return {ctor: 'TeMethod', _0: a};
};
var _gicentre$elm_vega$Vega$teMethod = _gicentre$elm_vega$Vega$TeMethod;
var _gicentre$elm_vega$Vega$TeSort = function (a) {
	return {ctor: 'TeSort', _0: a};
};
var _gicentre$elm_vega$Vega$teSort = _gicentre$elm_vega$Vega$TeSort;
var _gicentre$elm_vega$Vega$TeField = function (a) {
	return {ctor: 'TeField', _0: a};
};
var _gicentre$elm_vega$Vega$teField = _gicentre$elm_vega$Vega$TeField;
var _gicentre$elm_vega$Vega$TgModifyValues = F2(
	function (a, b) {
		return {ctor: 'TgModifyValues', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$tgModifyValues = _gicentre$elm_vega$Vega$TgModifyValues;
var _gicentre$elm_vega$Vega$TgToggle = function (a) {
	return {ctor: 'TgToggle', _0: a};
};
var _gicentre$elm_vega$Vega$tgToggle = _gicentre$elm_vega$Vega$TgToggle;
var _gicentre$elm_vega$Vega$TgRemoveAll = {ctor: 'TgRemoveAll'};
var _gicentre$elm_vega$Vega$tgRemoveAll = _gicentre$elm_vega$Vega$TgRemoveAll;
var _gicentre$elm_vega$Vega$TgRemove = function (a) {
	return {ctor: 'TgRemove', _0: a};
};
var _gicentre$elm_vega$Vega$tgRemove = _gicentre$elm_vega$Vega$TgRemove;
var _gicentre$elm_vega$Vega$TgInsert = function (a) {
	return {ctor: 'TgInsert', _0: a};
};
var _gicentre$elm_vega$Vega$tgInsert = _gicentre$elm_vega$Vega$TgInsert;
var _gicentre$elm_vega$Vega$TgTrigger = function (a) {
	return {ctor: 'TgTrigger', _0: a};
};
var _gicentre$elm_vega$Vega$trigger = F2(
	function (trName, trProps) {
		return _elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$List$concatMap,
				_gicentre$elm_vega$Vega$triggerProperties,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$TgTrigger(trName),
					_1: trProps
				}));
	});
var _gicentre$elm_vega$Vega$VIfElse = F3(
	function (a, b, c) {
		return {ctor: 'VIfElse', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$ifElse = F3(
	function (condition, thenVals, elseVals) {
		return A3(_gicentre$elm_vega$Vega$VIfElse, condition, thenVals, elseVals);
	});
var _gicentre$elm_vega$Vega$VNull = {ctor: 'VNull'};
var _gicentre$elm_vega$Vega$vNull = _gicentre$elm_vega$Vega$VNull;
var _gicentre$elm_vega$Vega$VRound = function (a) {
	return {ctor: 'VRound', _0: a};
};
var _gicentre$elm_vega$Vega$vRound = _gicentre$elm_vega$Vega$VRound;
var _gicentre$elm_vega$Vega$VOffset = function (a) {
	return {ctor: 'VOffset', _0: a};
};
var _gicentre$elm_vega$Vega$vOffset = _gicentre$elm_vega$Vega$VOffset;
var _gicentre$elm_vega$Vega$VMultiply = function (a) {
	return {ctor: 'VMultiply', _0: a};
};
var _gicentre$elm_vega$Vega$vMultiply = _gicentre$elm_vega$Vega$VMultiply;
var _gicentre$elm_vega$Vega$VExponent = function (a) {
	return {ctor: 'VExponent', _0: a};
};
var _gicentre$elm_vega$Vega$vExponent = _gicentre$elm_vega$Vega$VExponent;
var _gicentre$elm_vega$Vega$VBand = function (a) {
	return {ctor: 'VBand', _0: a};
};
var _gicentre$elm_vega$Vega$vBand = _gicentre$elm_vega$Vega$VBand;
var _gicentre$elm_vega$Vega$VScale = function (a) {
	return {ctor: 'VScale', _0: a};
};
var _gicentre$elm_vega$Vega$vScale = function (s) {
	return _gicentre$elm_vega$Vega$VScale(
		_gicentre$elm_vega$Vega$field(s));
};
var _gicentre$elm_vega$Vega$vScaleField = _gicentre$elm_vega$Vega$VScale;
var _gicentre$elm_vega$Vega$VField = function (a) {
	return {ctor: 'VField', _0: a};
};
var _gicentre$elm_vega$Vega$vField = _gicentre$elm_vega$Vega$VField;
var _gicentre$elm_vega$Vega$VColor = function (a) {
	return {ctor: 'VColor', _0: a};
};
var _gicentre$elm_vega$Vega$vColor = _gicentre$elm_vega$Vega$VColor;
var _gicentre$elm_vega$Vega$VSignal = function (a) {
	return {ctor: 'VSignal', _0: a};
};
var _gicentre$elm_vega$Vega$vSignal = _gicentre$elm_vega$Vega$VSignal;
var _gicentre$elm_vega$Vega$Values = function (a) {
	return {ctor: 'Values', _0: a};
};
var _gicentre$elm_vega$Vega$vValues = _gicentre$elm_vega$Vega$Values;
var _gicentre$elm_vega$Vega$VKeyValue = F2(
	function (a, b) {
		return {ctor: 'VKeyValue', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$keyValue = _gicentre$elm_vega$Vega$VKeyValue;
var _gicentre$elm_vega$Vega$VObject = function (a) {
	return {ctor: 'VObject', _0: a};
};
var _gicentre$elm_vega$Vega$vObject = _gicentre$elm_vega$Vega$VObject;
var _gicentre$elm_vega$Vega$VBoos = function (a) {
	return {ctor: 'VBoos', _0: a};
};
var _gicentre$elm_vega$Vega$vBoos = _gicentre$elm_vega$Vega$VBoos;
var _gicentre$elm_vega$Vega$VBoo = function (a) {
	return {ctor: 'VBoo', _0: a};
};
var _gicentre$elm_vega$Vega$vFalse = _gicentre$elm_vega$Vega$VBoo(false);
var _gicentre$elm_vega$Vega$vTrue = _gicentre$elm_vega$Vega$VBoo(true);
var _gicentre$elm_vega$Vega$VNums = function (a) {
	return {ctor: 'VNums', _0: a};
};
var _gicentre$elm_vega$Vega$vNums = _gicentre$elm_vega$Vega$VNums;
var _gicentre$elm_vega$Vega$VNum = function (a) {
	return {ctor: 'VNum', _0: a};
};
var _gicentre$elm_vega$Vega$vNum = _gicentre$elm_vega$Vega$VNum;
var _gicentre$elm_vega$Vega$VStrs = function (a) {
	return {ctor: 'VStrs', _0: a};
};
var _gicentre$elm_vega$Vega$vStrs = _gicentre$elm_vega$Vega$VStrs;
var _gicentre$elm_vega$Vega$VStr = function (a) {
	return {ctor: 'VStr', _0: a};
};
var _gicentre$elm_vega$Vega$vStr = _gicentre$elm_vega$Vega$VStr;
var _gicentre$elm_vega$Vega$black = _gicentre$elm_vega$Vega$vStr('black');
var _gicentre$elm_vega$Vega$cursorValue = function (cur) {
	var _p192 = cur;
	switch (_p192.ctor) {
		case 'CAuto':
			return _gicentre$elm_vega$Vega$vStr('auto');
		case 'CDefault':
			return _gicentre$elm_vega$Vega$vStr('default');
		case 'CNone':
			return _gicentre$elm_vega$Vega$vStr('none');
		case 'CContextMenu':
			return _gicentre$elm_vega$Vega$vStr('context-menu');
		case 'CHelp':
			return _gicentre$elm_vega$Vega$vStr('help');
		case 'CPointer':
			return _gicentre$elm_vega$Vega$vStr('pointer');
		case 'CProgress':
			return _gicentre$elm_vega$Vega$vStr('progress');
		case 'CWait':
			return _gicentre$elm_vega$Vega$vStr('wait');
		case 'CCell':
			return _gicentre$elm_vega$Vega$vStr('cell');
		case 'CCrosshair':
			return _gicentre$elm_vega$Vega$vStr('crosshair');
		case 'CText':
			return _gicentre$elm_vega$Vega$vStr('text');
		case 'CVerticalText':
			return _gicentre$elm_vega$Vega$vStr('vertical-text');
		case 'CAlias':
			return _gicentre$elm_vega$Vega$vStr('alias');
		case 'CCopy':
			return _gicentre$elm_vega$Vega$vStr('copy');
		case 'CMove':
			return _gicentre$elm_vega$Vega$vStr('move');
		case 'CNoDrop':
			return _gicentre$elm_vega$Vega$vStr('no-drop');
		case 'CNotAllowed':
			return _gicentre$elm_vega$Vega$vStr('not-allowed');
		case 'CAllScroll':
			return _gicentre$elm_vega$Vega$vStr('all-scroll');
		case 'CColResize':
			return _gicentre$elm_vega$Vega$vStr('col-resize');
		case 'CRowResize':
			return _gicentre$elm_vega$Vega$vStr('row-resize');
		case 'CNResize':
			return _gicentre$elm_vega$Vega$vStr('n-resize');
		case 'CEResize':
			return _gicentre$elm_vega$Vega$vStr('e-resize');
		case 'CSResize':
			return _gicentre$elm_vega$Vega$vStr('s-resize');
		case 'CWResize':
			return _gicentre$elm_vega$Vega$vStr('w-resize');
		case 'CNEResize':
			return _gicentre$elm_vega$Vega$vStr('ne-resize');
		case 'CNWResize':
			return _gicentre$elm_vega$Vega$vStr('nw-resize');
		case 'CSEResize':
			return _gicentre$elm_vega$Vega$vStr('se-resize');
		case 'CSWResize':
			return _gicentre$elm_vega$Vega$vStr('sw-resize');
		case 'CEWResize':
			return _gicentre$elm_vega$Vega$vStr('ew-resize');
		case 'CNSResize':
			return _gicentre$elm_vega$Vega$vStr('ns-resize');
		case 'CNESWResize':
			return _gicentre$elm_vega$Vega$vStr('nesw-resize');
		case 'CNWSEResize':
			return _gicentre$elm_vega$Vega$vStr('nwse-resize');
		case 'CZoomIn':
			return _gicentre$elm_vega$Vega$vStr('zoom-in');
		case 'CZoomOut':
			return _gicentre$elm_vega$Vega$vStr('zoom-out');
		case 'CGrab':
			return _gicentre$elm_vega$Vega$vStr('grab');
		default:
			return _gicentre$elm_vega$Vega$vStr('grabbing');
	}
};
var _gicentre$elm_vega$Vega$hCenter = _gicentre$elm_vega$Vega$vStr('center');
var _gicentre$elm_vega$Vega$hLeft = _gicentre$elm_vega$Vega$vStr('left');
var _gicentre$elm_vega$Vega$hRight = _gicentre$elm_vega$Vega$vStr('right');
var _gicentre$elm_vega$Vega$markInterpolationValue = function (interp) {
	var _p193 = interp;
	switch (_p193.ctor) {
		case 'Basis':
			return _gicentre$elm_vega$Vega$vStr('basis');
		case 'Bundle':
			return _gicentre$elm_vega$Vega$vStr('bundle');
		case 'Cardinal':
			return _gicentre$elm_vega$Vega$vStr('cardinal');
		case 'CatmullRom':
			return _gicentre$elm_vega$Vega$vStr('catmull-rom');
		case 'Linear':
			return _gicentre$elm_vega$Vega$vStr('linear');
		case 'Monotone':
			return _gicentre$elm_vega$Vega$vStr('monotone');
		case 'Natural':
			return _gicentre$elm_vega$Vega$vStr('natural');
		case 'Stepwise':
			return _gicentre$elm_vega$Vega$vStr('step');
		case 'StepAfter':
			return _gicentre$elm_vega$Vega$vStr('step-after');
		default:
			return _gicentre$elm_vega$Vega$vStr('step-before');
	}
};
var _gicentre$elm_vega$Vega$orientationValue = function (orient) {
	var _p194 = orient;
	switch (_p194.ctor) {
		case 'Horizontal':
			return _gicentre$elm_vega$Vega$vStr('horizontal');
		case 'Vertical':
			return _gicentre$elm_vega$Vega$vStr('vertical');
		case 'Radial':
			return _gicentre$elm_vega$Vega$vStr('radial');
		default:
			return _gicentre$elm_vega$Vega$vSignal(_p194._0);
	}
};
var _gicentre$elm_vega$Vega$projectionValue = function (proj) {
	return _gicentre$elm_vega$Vega$vStr(
		_gicentre$elm_vega$Vega$projectionLabel(proj));
};
var _gicentre$elm_vega$Vega$strokeCapValue = function (cap) {
	var _p195 = cap;
	switch (_p195.ctor) {
		case 'CButt':
			return _gicentre$elm_vega$Vega$vStr('butt');
		case 'CRound':
			return _gicentre$elm_vega$Vega$vStr('round');
		case 'CSquare':
			return _gicentre$elm_vega$Vega$vStr('square');
		default:
			return _gicentre$elm_vega$Vega$vSignal(_p195._0);
	}
};
var _gicentre$elm_vega$Vega$strokeJoinValue = function (jn) {
	var _p196 = jn;
	switch (_p196.ctor) {
		case 'JMiter':
			return _gicentre$elm_vega$Vega$vStr('miter');
		case 'JRound':
			return _gicentre$elm_vega$Vega$vStr('round');
		case 'JBevel':
			return _gicentre$elm_vega$Vega$vStr('bevel');
		default:
			return _gicentre$elm_vega$Vega$vSignal(_p196._0);
	}
};
var _gicentre$elm_vega$Vega$symbolValue = function (sym) {
	return _gicentre$elm_vega$Vega$vStr(
		_gicentre$elm_vega$Vega$symbolLabel(sym));
};
var _gicentre$elm_vega$Vega$textDirectionValue = function (dir) {
	var _p197 = dir;
	switch (_p197.ctor) {
		case 'LeftToRight':
			return _gicentre$elm_vega$Vega$vStr('ltr');
		case 'RightToLeft':
			return _gicentre$elm_vega$Vega$vStr('rtl');
		default:
			return _gicentre$elm_vega$Vega$vSignal(_p197._0);
	}
};
var _gicentre$elm_vega$Vega$transparent = _gicentre$elm_vega$Vega$vStr('transparent');
var _gicentre$elm_vega$Vega$vAlphabetic = _gicentre$elm_vega$Vega$vStr('alphabetic');
var _gicentre$elm_vega$Vega$vBottom = _gicentre$elm_vega$Vega$vStr('bottom');
var _gicentre$elm_vega$Vega$vMiddle = _gicentre$elm_vega$Vega$vStr('middle');
var _gicentre$elm_vega$Vega$vTop = _gicentre$elm_vega$Vega$vStr('top');
var _gicentre$elm_vega$Vega$white = _gicentre$elm_vega$Vega$vStr('white');
var _gicentre$elm_vega$Vega$VoAs = function (a) {
	return {ctor: 'VoAs', _0: a};
};
var _gicentre$elm_vega$Vega$voAs = _gicentre$elm_vega$Vega$VoAs;
var _gicentre$elm_vega$Vega$VoSize = function (a) {
	return {ctor: 'VoSize', _0: a};
};
var _gicentre$elm_vega$Vega$voSize = _gicentre$elm_vega$Vega$VoSize;
var _gicentre$elm_vega$Vega$VoExtent = F2(
	function (a, b) {
		return {ctor: 'VoExtent', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$voExtent = _gicentre$elm_vega$Vega$VoExtent;
var _gicentre$elm_vega$Vega$WnAggOperation = F4(
	function (a, b, c, d) {
		return {ctor: 'WnAggOperation', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$Vega$wnAggOperation = F3(
	function (op, inField, outFieldName) {
		return A4(_gicentre$elm_vega$Vega$WnAggOperation, op, _elm_lang$core$Maybe$Nothing, inField, outFieldName);
	});
var _gicentre$elm_vega$Vega$WnOperation = F4(
	function (a, b, c, d) {
		return {ctor: 'WnOperation', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$Vega$wnOperation = F2(
	function (op, outField) {
		return A4(_gicentre$elm_vega$Vega$WnOperation, op, _elm_lang$core$Maybe$Nothing, _elm_lang$core$Maybe$Nothing, outField);
	});
var _gicentre$elm_vega$Vega$wnOperationOn = _gicentre$elm_vega$Vega$WnOperation;
var _gicentre$elm_vega$Vega$WnIgnorePeers = function (a) {
	return {ctor: 'WnIgnorePeers', _0: a};
};
var _gicentre$elm_vega$Vega$wnIgnorePeers = _gicentre$elm_vega$Vega$WnIgnorePeers;
var _gicentre$elm_vega$Vega$WnFrame = function (a) {
	return {ctor: 'WnFrame', _0: a};
};
var _gicentre$elm_vega$Vega$wnFrame = _gicentre$elm_vega$Vega$WnFrame;
var _gicentre$elm_vega$Vega$WnGroupBy = function (a) {
	return {ctor: 'WnGroupBy', _0: a};
};
var _gicentre$elm_vega$Vega$wnGroupBy = _gicentre$elm_vega$Vega$WnGroupBy;
var _gicentre$elm_vega$Vega$WnSort = function (a) {
	return {ctor: 'WnSort', _0: a};
};
var _gicentre$elm_vega$Vega$wnSort = _gicentre$elm_vega$Vega$WnSort;
var _gicentre$elm_vega$Vega$WcAs = F7(
	function (a, b, c, d, e, f, g) {
		return {ctor: 'WcAs', _0: a, _1: b, _2: c, _3: d, _4: e, _5: f, _6: g};
	});
var _gicentre$elm_vega$Vega$wcAs = _gicentre$elm_vega$Vega$WcAs;
var _gicentre$elm_vega$Vega$WcSpiral = function (a) {
	return {ctor: 'WcSpiral', _0: a};
};
var _gicentre$elm_vega$Vega$wcSpiral = _gicentre$elm_vega$Vega$WcSpiral;
var _gicentre$elm_vega$Vega$WcSize = function (a) {
	return {ctor: 'WcSize', _0: a};
};
var _gicentre$elm_vega$Vega$wcSize = _gicentre$elm_vega$Vega$WcSize;
var _gicentre$elm_vega$Vega$WcText = function (a) {
	return {ctor: 'WcText', _0: a};
};
var _gicentre$elm_vega$Vega$wcText = _gicentre$elm_vega$Vega$WcText;
var _gicentre$elm_vega$Vega$WcRotate = function (a) {
	return {ctor: 'WcRotate', _0: a};
};
var _gicentre$elm_vega$Vega$wcRotate = _gicentre$elm_vega$Vega$WcRotate;
var _gicentre$elm_vega$Vega$WcPadding = function (a) {
	return {ctor: 'WcPadding', _0: a};
};
var _gicentre$elm_vega$Vega$wcPadding = _gicentre$elm_vega$Vega$WcPadding;
var _gicentre$elm_vega$Vega$WcFontSizeRange = function (a) {
	return {ctor: 'WcFontSizeRange', _0: a};
};
var _gicentre$elm_vega$Vega$wcFontSizeRange = _gicentre$elm_vega$Vega$WcFontSizeRange;
var _gicentre$elm_vega$Vega$WcFontSize = function (a) {
	return {ctor: 'WcFontSize', _0: a};
};
var _gicentre$elm_vega$Vega$wcFontSize = _gicentre$elm_vega$Vega$WcFontSize;
var _gicentre$elm_vega$Vega$WcFontWeight = function (a) {
	return {ctor: 'WcFontWeight', _0: a};
};
var _gicentre$elm_vega$Vega$wcFontWeight = _gicentre$elm_vega$Vega$WcFontWeight;
var _gicentre$elm_vega$Vega$WcFontStyle = function (a) {
	return {ctor: 'WcFontStyle', _0: a};
};
var _gicentre$elm_vega$Vega$wcFontStyle = _gicentre$elm_vega$Vega$WcFontStyle;
var _gicentre$elm_vega$Vega$WcFont = function (a) {
	return {ctor: 'WcFont', _0: a};
};
var _gicentre$elm_vega$Vega$wcFont = _gicentre$elm_vega$Vega$WcFont;
var _gicentre$elm_vega$Vega$AnchorSignal = function (a) {
	return {ctor: 'AnchorSignal', _0: a};
};
var _gicentre$elm_vega$Vega$anchorSignal = _gicentre$elm_vega$Vega$AnchorSignal;
var _gicentre$elm_vega$Vega$End = {ctor: 'End'};
var _gicentre$elm_vega$Vega$Middle = {ctor: 'Middle'};
var _gicentre$elm_vega$Vega$Start = {ctor: 'Start'};
var _gicentre$elm_vega$Vega$AutosizeSignal = function (a) {
	return {ctor: 'AutosizeSignal', _0: a};
};
var _gicentre$elm_vega$Vega$autosizeSignal = _gicentre$elm_vega$Vega$AutosizeSignal;
var _gicentre$elm_vega$Vega$AResize = {ctor: 'AResize'};
var _gicentre$elm_vega$Vega$APadding = {ctor: 'APadding'};
var _gicentre$elm_vega$Vega$APad = {ctor: 'APad'};
var _gicentre$elm_vega$Vega$ANone = {ctor: 'ANone'};
var _gicentre$elm_vega$Vega$AFitY = {ctor: 'AFitY'};
var _gicentre$elm_vega$Vega$AFitX = {ctor: 'AFitX'};
var _gicentre$elm_vega$Vega$AFit = {ctor: 'AFit'};
var _gicentre$elm_vega$Vega$AContent = {ctor: 'AContent'};
var _gicentre$elm_vega$Vega$EDomain = {ctor: 'EDomain'};
var _gicentre$elm_vega$Vega$ETitle = {ctor: 'ETitle'};
var _gicentre$elm_vega$Vega$ELabels = {ctor: 'ELabels'};
var _gicentre$elm_vega$Vega$EGrid = {ctor: 'EGrid'};
var _gicentre$elm_vega$Vega$ETicks = {ctor: 'ETicks'};
var _gicentre$elm_vega$Vega$EAxis = {ctor: 'EAxis'};
var _gicentre$elm_vega$Vega$AxBand = {ctor: 'AxBand'};
var _gicentre$elm_vega$Vega$AxY = {ctor: 'AxY'};
var _gicentre$elm_vega$Vega$AxX = {ctor: 'AxX'};
var _gicentre$elm_vega$Vega$AxBottom = {ctor: 'AxBottom'};
var _gicentre$elm_vega$Vega$AxRight = {ctor: 'AxRight'};
var _gicentre$elm_vega$Vega$AxTop = {ctor: 'AxTop'};
var _gicentre$elm_vega$Vega$AxLeft = {ctor: 'AxLeft'};
var _gicentre$elm_vega$Vega$AxAll = {ctor: 'AxAll'};
var _gicentre$elm_vega$Vega$BoundsCalculationSignal = function (a) {
	return {ctor: 'BoundsCalculationSignal', _0: a};
};
var _gicentre$elm_vega$Vega$bcSignal = _gicentre$elm_vega$Vega$BoundsCalculationSignal;
var _gicentre$elm_vega$Vega$Flush = {ctor: 'Flush'};
var _gicentre$elm_vega$Vega$Full = {ctor: 'Full'};
var _gicentre$elm_vega$Vega$Mixedcase = {ctor: 'Mixedcase'};
var _gicentre$elm_vega$Vega$Uppercase = {ctor: 'Uppercase'};
var _gicentre$elm_vega$Vega$Lowercase = {ctor: 'Lowercase'};
var _gicentre$elm_vega$Vega$Rgb = function (a) {
	return {ctor: 'Rgb', _0: a};
};
var _gicentre$elm_vega$Vega$rgb = _gicentre$elm_vega$Vega$Rgb;
var _gicentre$elm_vega$Vega$Lab = {ctor: 'Lab'};
var _gicentre$elm_vega$Vega$HslLong = {ctor: 'HslLong'};
var _gicentre$elm_vega$Vega$hslLong = _gicentre$elm_vega$Vega$HslLong;
var _gicentre$elm_vega$Vega$Hsl = {ctor: 'Hsl'};
var _gicentre$elm_vega$Vega$HclLong = {ctor: 'HclLong'};
var _gicentre$elm_vega$Vega$hclLong = _gicentre$elm_vega$Vega$HclLong;
var _gicentre$elm_vega$Vega$Hcl = {ctor: 'Hcl'};
var _gicentre$elm_vega$Vega$CubeHelixLong = function (a) {
	return {ctor: 'CubeHelixLong', _0: a};
};
var _gicentre$elm_vega$Vega$cubeHelixLong = _gicentre$elm_vega$Vega$CubeHelixLong;
var _gicentre$elm_vega$Vega$CubeHelix = function (a) {
	return {ctor: 'CubeHelix', _0: a};
};
var _gicentre$elm_vega$Vega$cubeHelix = _gicentre$elm_vega$Vega$CubeHelix;
var _gicentre$elm_vega$Vega$CGrabbing = {ctor: 'CGrabbing'};
var _gicentre$elm_vega$Vega$CGrab = {ctor: 'CGrab'};
var _gicentre$elm_vega$Vega$CZoomOut = {ctor: 'CZoomOut'};
var _gicentre$elm_vega$Vega$CZoomIn = {ctor: 'CZoomIn'};
var _gicentre$elm_vega$Vega$CNWSEResize = {ctor: 'CNWSEResize'};
var _gicentre$elm_vega$Vega$CNESWResize = {ctor: 'CNESWResize'};
var _gicentre$elm_vega$Vega$CNSResize = {ctor: 'CNSResize'};
var _gicentre$elm_vega$Vega$CEWResize = {ctor: 'CEWResize'};
var _gicentre$elm_vega$Vega$CSWResize = {ctor: 'CSWResize'};
var _gicentre$elm_vega$Vega$CSEResize = {ctor: 'CSEResize'};
var _gicentre$elm_vega$Vega$CNWResize = {ctor: 'CNWResize'};
var _gicentre$elm_vega$Vega$CNEResize = {ctor: 'CNEResize'};
var _gicentre$elm_vega$Vega$CWResize = {ctor: 'CWResize'};
var _gicentre$elm_vega$Vega$CSResize = {ctor: 'CSResize'};
var _gicentre$elm_vega$Vega$CEResize = {ctor: 'CEResize'};
var _gicentre$elm_vega$Vega$CNResize = {ctor: 'CNResize'};
var _gicentre$elm_vega$Vega$CRowResize = {ctor: 'CRowResize'};
var _gicentre$elm_vega$Vega$CColResize = {ctor: 'CColResize'};
var _gicentre$elm_vega$Vega$CAllScroll = {ctor: 'CAllScroll'};
var _gicentre$elm_vega$Vega$CNotAllowed = {ctor: 'CNotAllowed'};
var _gicentre$elm_vega$Vega$CNoDrop = {ctor: 'CNoDrop'};
var _gicentre$elm_vega$Vega$CMove = {ctor: 'CMove'};
var _gicentre$elm_vega$Vega$CCopy = {ctor: 'CCopy'};
var _gicentre$elm_vega$Vega$CAlias = {ctor: 'CAlias'};
var _gicentre$elm_vega$Vega$CVerticalText = {ctor: 'CVerticalText'};
var _gicentre$elm_vega$Vega$CText = {ctor: 'CText'};
var _gicentre$elm_vega$Vega$CCrosshair = {ctor: 'CCrosshair'};
var _gicentre$elm_vega$Vega$CCell = {ctor: 'CCell'};
var _gicentre$elm_vega$Vega$CWait = {ctor: 'CWait'};
var _gicentre$elm_vega$Vega$CProgress = {ctor: 'CProgress'};
var _gicentre$elm_vega$Vega$CPointer = {ctor: 'CPointer'};
var _gicentre$elm_vega$Vega$CHelp = {ctor: 'CHelp'};
var _gicentre$elm_vega$Vega$CContextMenu = {ctor: 'CContextMenu'};
var _gicentre$elm_vega$Vega$CNone = {ctor: 'CNone'};
var _gicentre$elm_vega$Vega$CDefault = {ctor: 'CDefault'};
var _gicentre$elm_vega$Vega$CAuto = {ctor: 'CAuto'};
var _gicentre$elm_vega$Vega$DaUrl = function (a) {
	return {ctor: 'DaUrl', _0: a};
};
var _gicentre$elm_vega$Vega$daUrl = _gicentre$elm_vega$Vega$DaUrl;
var _gicentre$elm_vega$Vega$DaOn = function (a) {
	return {ctor: 'DaOn', _0: a};
};
var _gicentre$elm_vega$Vega$daOn = _gicentre$elm_vega$Vega$DaOn;
var _gicentre$elm_vega$Vega$DaSphere = {ctor: 'DaSphere'};
var _gicentre$elm_vega$Vega$DaValue = function (a) {
	return {ctor: 'DaValue', _0: a};
};
var _gicentre$elm_vega$Vega$daValue = _gicentre$elm_vega$Vega$DaValue;
var _gicentre$elm_vega$Vega$DaSources = function (a) {
	return {ctor: 'DaSources', _0: a};
};
var _gicentre$elm_vega$Vega$daSources = _gicentre$elm_vega$Vega$DaSources;
var _gicentre$elm_vega$Vega$DaSource = function (a) {
	return {ctor: 'DaSource', _0: a};
};
var _gicentre$elm_vega$Vega$daSource = _gicentre$elm_vega$Vega$DaSource;
var _gicentre$elm_vega$Vega$DaFormat = function (a) {
	return {ctor: 'DaFormat', _0: a};
};
var _gicentre$elm_vega$Vega$daFormat = _gicentre$elm_vega$Vega$DaFormat;
var _gicentre$elm_vega$Vega$FoUtc = function (a) {
	return {ctor: 'FoUtc', _0: a};
};
var _gicentre$elm_vega$Vega$foUtc = _gicentre$elm_vega$Vega$FoUtc;
var _gicentre$elm_vega$Vega$FoDate = function (a) {
	return {ctor: 'FoDate', _0: a};
};
var _gicentre$elm_vega$Vega$foDate = _gicentre$elm_vega$Vega$FoDate;
var _gicentre$elm_vega$Vega$FoBoo = {ctor: 'FoBoo'};
var _gicentre$elm_vega$Vega$FoNum = {ctor: 'FoNum'};
var _gicentre$elm_vega$Vega$DensityFunctionSignal = function (a) {
	return {ctor: 'DensityFunctionSignal', _0: a};
};
var _gicentre$elm_vega$Vega$densityFunctionSignal = _gicentre$elm_vega$Vega$DensityFunctionSignal;
var _gicentre$elm_vega$Vega$CDF = {ctor: 'CDF'};
var _gicentre$elm_vega$Vega$PDF = {ctor: 'PDF'};
var _gicentre$elm_vega$Vega$Allow = {ctor: 'Allow'};
var _gicentre$elm_vega$Vega$configProperty = function (cp) {
	var _p198 = cp;
	switch (_p198.ctor) {
		case 'CfAutosize':
			return {
				ctor: '_Tuple2',
				_0: 'autosize',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$autosizeProperty, _p198._0))
			};
		case 'CfBackground':
			return {
				ctor: '_Tuple2',
				_0: 'background',
				_1: _gicentre$elm_vega$Vega$strSpec(_p198._0)
			};
		case 'CfGroup':
			return {
				ctor: '_Tuple2',
				_0: 'group',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p198._0))
			};
		case 'CfEvents':
			var _p199 = _p198._1;
			var listSpec = _elm_lang$core$Native_Utils.eq(
				_p199,
				{ctor: '[]'}) ? _elm_lang$core$Json_Encode$bool(true) : _elm_lang$core$Json_Encode$list(
				A2(
					_elm_lang$core$List$map,
					function (et) {
						return _elm_lang$core$Json_Encode$string(
							_gicentre$elm_vega$Vega$eventTypeLabel(et));
					},
					_p199));
			var filterLabel = _elm_lang$core$Native_Utils.eq(_p198._0, _gicentre$elm_vega$Vega$Allow) ? 'allow' : 'prevent';
			return {
				ctor: '_Tuple2',
				_0: 'events',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'defaults',
							_1: _elm_lang$core$Json_Encode$object(
								{
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: filterLabel, _1: listSpec},
									_1: {ctor: '[]'}
								})
						},
						_1: {ctor: '[]'}
					})
			};
		case 'CfMark':
			return {
				ctor: '_Tuple2',
				_0: _gicentre$elm_vega$Vega$markLabel(_p198._0),
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p198._1))
			};
		case 'CfMarks':
			return {
				ctor: '_Tuple2',
				_0: 'mark',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p198._0))
			};
		case 'CfStyle':
			return {
				ctor: '_Tuple2',
				_0: 'style',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _p198._0,
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p198._1))
						},
						_1: {ctor: '[]'}
					})
			};
		case 'CfAxis':
			return {
				ctor: '_Tuple2',
				_0: _gicentre$elm_vega$Vega$axTypeLabel(_p198._0),
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$axisProperty, _p198._1))
			};
		case 'CfLegend':
			return {
				ctor: '_Tuple2',
				_0: 'legend',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$legendProperty, _p198._0))
			};
		case 'CfTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$titleProperty, _p198._0))
			};
		default:
			var _p203 = _p198._1;
			var _p202 = _p198._0;
			var raVals = function () {
				var _p200 = _p203;
				switch (_p200.ctor) {
					case 'RStrs':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p200._0));
					case 'RSignal':
						return _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p200._0),
								_1: {ctor: '[]'}
							});
					case 'RScheme':
						return _elm_lang$core$Json_Encode$object(
							A2(
								_elm_lang$core$List$map,
								_gicentre$elm_vega$Vega$schemeProperty,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$SScheme(_p200._0),
									_1: _p200._1
								}));
					default:
						return A2(
							_elm_lang$core$Debug$log,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Warning: cfScale range values should be color strings or scheme but was ',
								_elm_lang$core$Basics$toString(_p203)),
							_elm_lang$core$Json_Encode$null);
				}
			}();
			var raLabel = function () {
				var _p201 = _p202;
				switch (_p201.ctor) {
					case 'RaSymbol':
						return 'symbol';
					case 'RaCategory':
						return 'category';
					case 'RaDiverging':
						return 'diverging';
					case 'RaOrdinal':
						return 'ordinal';
					case 'RaRamp':
						return 'ramp';
					case 'RaHeatmap':
						return 'heatmap';
					default:
						return A2(
							_elm_lang$core$Debug$log,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'Warning: cfScale range should be a scale range definition but was ',
								_elm_lang$core$Basics$toString(_p202)),
							'');
				}
			}();
			return {
				ctor: '_Tuple2',
				_0: 'range',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: raLabel, _1: raVals},
						_1: {ctor: '[]'}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$Prevent = {ctor: 'Prevent'};
var _gicentre$elm_vega$Vega$ESDom = function (a) {
	return {ctor: 'ESDom', _0: a};
};
var _gicentre$elm_vega$Vega$esDom = _gicentre$elm_vega$Vega$ESDom;
var _gicentre$elm_vega$Vega$ESWindow = {ctor: 'ESWindow'};
var _gicentre$elm_vega$Vega$ESScope = {ctor: 'ESScope'};
var _gicentre$elm_vega$Vega$ESView = {ctor: 'ESView'};
var _gicentre$elm_vega$Vega$ESAll = {ctor: 'ESAll'};
var _gicentre$elm_vega$Vega$Timer = {ctor: 'Timer'};
var _gicentre$elm_vega$Vega$Wheel = {ctor: 'Wheel'};
var _gicentre$elm_vega$Vega$TouchStart = {ctor: 'TouchStart'};
var _gicentre$elm_vega$Vega$TouchMove = {ctor: 'TouchMove'};
var _gicentre$elm_vega$Vega$TouchEnd = {ctor: 'TouchEnd'};
var _gicentre$elm_vega$Vega$MouseWheel = {ctor: 'MouseWheel'};
var _gicentre$elm_vega$Vega$MouseUp = {ctor: 'MouseUp'};
var _gicentre$elm_vega$Vega$MouseOver = {ctor: 'MouseOver'};
var _gicentre$elm_vega$Vega$MouseOut = {ctor: 'MouseOut'};
var _gicentre$elm_vega$Vega$MouseMove = {ctor: 'MouseMove'};
var _gicentre$elm_vega$Vega$MouseDown = {ctor: 'MouseDown'};
var _gicentre$elm_vega$Vega$KeyUp = {ctor: 'KeyUp'};
var _gicentre$elm_vega$Vega$KeyPress = {ctor: 'KeyPress'};
var _gicentre$elm_vega$Vega$KeyDown = {ctor: 'KeyDown'};
var _gicentre$elm_vega$Vega$DragOver = {ctor: 'DragOver'};
var _gicentre$elm_vega$Vega$DragLeave = {ctor: 'DragLeave'};
var _gicentre$elm_vega$Vega$DragEnter = {ctor: 'DragEnter'};
var _gicentre$elm_vega$Vega$DblClick = {ctor: 'DblClick'};
var _gicentre$elm_vega$Vega$Click = {ctor: 'Click'};
var _gicentre$elm_vega$Vega$FormatPropertySignal = function (a) {
	return {ctor: 'FormatPropertySignal', _0: a};
};
var _gicentre$elm_vega$Vega$formatPropertySignal = _gicentre$elm_vega$Vega$FormatPropertySignal;
var _gicentre$elm_vega$Vega$ParseAuto = {ctor: 'ParseAuto'};
var _gicentre$elm_vega$Vega$Parse = function (a) {
	return {ctor: 'Parse', _0: a};
};
var _gicentre$elm_vega$Vega$parse = _gicentre$elm_vega$Vega$Parse;
var _gicentre$elm_vega$Vega$TopojsonMesh = function (a) {
	return {ctor: 'TopojsonMesh', _0: a};
};
var _gicentre$elm_vega$Vega$topojsonMesh = _gicentre$elm_vega$Vega$TopojsonMesh;
var _gicentre$elm_vega$Vega$TopojsonFeature = function (a) {
	return {ctor: 'TopojsonFeature', _0: a};
};
var _gicentre$elm_vega$Vega$topojsonFeature = _gicentre$elm_vega$Vega$TopojsonFeature;
var _gicentre$elm_vega$Vega$DSV = function (a) {
	return {ctor: 'DSV', _0: a};
};
var _gicentre$elm_vega$Vega$dsv = _gicentre$elm_vega$Vega$DSV;
var _gicentre$elm_vega$Vega$TSV = {ctor: 'TSV'};
var _gicentre$elm_vega$Vega$CSV = {ctor: 'CSV'};
var _gicentre$elm_vega$Vega$JSONProperty = function (a) {
	return {ctor: 'JSONProperty', _0: a};
};
var _gicentre$elm_vega$Vega$jsonProperty = _gicentre$elm_vega$Vega$JSONProperty;
var _gicentre$elm_vega$Vega$JSON = {ctor: 'JSON'};
var _gicentre$elm_vega$Vega$AlignSignal = function (a) {
	return {ctor: 'AlignSignal', _0: a};
};
var _gicentre$elm_vega$Vega$gridAlignSignal = _gicentre$elm_vega$Vega$AlignSignal;
var _gicentre$elm_vega$Vega$AlignColumn = function (a) {
	return {ctor: 'AlignColumn', _0: a};
};
var _gicentre$elm_vega$Vega$grAlignColumn = _gicentre$elm_vega$Vega$AlignColumn;
var _gicentre$elm_vega$Vega$AlignRow = function (a) {
	return {ctor: 'AlignRow', _0: a};
};
var _gicentre$elm_vega$Vega$grAlignRow = _gicentre$elm_vega$Vega$AlignRow;
var _gicentre$elm_vega$Vega$AlignNone = {ctor: 'AlignNone'};
var _gicentre$elm_vega$Vega$AlignEach = {ctor: 'AlignEach'};
var _gicentre$elm_vega$Vega$AlignAll = {ctor: 'AlignAll'};
var _gicentre$elm_vega$Vega$HAlignSignal = function (a) {
	return {ctor: 'HAlignSignal', _0: a};
};
var _gicentre$elm_vega$Vega$hAlignSignal = _gicentre$elm_vega$Vega$HAlignSignal;
var _gicentre$elm_vega$Vega$AlignRight = {ctor: 'AlignRight'};
var _gicentre$elm_vega$Vega$AlignLeft = {ctor: 'AlignLeft'};
var _gicentre$elm_vega$Vega$AlignCenter = {ctor: 'AlignCenter'};
var _gicentre$elm_vega$Vega$LegendOrientationSignal = function (a) {
	return {ctor: 'LegendOrientationSignal', _0: a};
};
var _gicentre$elm_vega$Vega$legendOrientationSignal = _gicentre$elm_vega$Vega$LegendOrientationSignal;
var _gicentre$elm_vega$Vega$None = {ctor: 'None'};
var _gicentre$elm_vega$Vega$BottomLeft = {ctor: 'BottomLeft'};
var _gicentre$elm_vega$Vega$Bottom = {ctor: 'Bottom'};
var _gicentre$elm_vega$Vega$BottomRight = {ctor: 'BottomRight'};
var _gicentre$elm_vega$Vega$Right = {ctor: 'Right'};
var _gicentre$elm_vega$Vega$TopRight = {ctor: 'TopRight'};
var _gicentre$elm_vega$Vega$Top = {ctor: 'Top'};
var _gicentre$elm_vega$Vega$TopLeft = {ctor: 'TopLeft'};
var _gicentre$elm_vega$Vega$Left = {ctor: 'Left'};
var _gicentre$elm_vega$Vega$LegendTypeSignal = function (a) {
	return {ctor: 'LegendTypeSignal', _0: a};
};
var _gicentre$elm_vega$Vega$legendTypeSignal = _gicentre$elm_vega$Vega$LegendTypeSignal;
var _gicentre$elm_vega$Vega$LGradient = {ctor: 'LGradient'};
var _gicentre$elm_vega$Vega$LSymbol = {ctor: 'LSymbol'};
var _gicentre$elm_vega$Vega$LinkShapeSignal = function (a) {
	return {ctor: 'LinkShapeSignal', _0: a};
};
var _gicentre$elm_vega$Vega$linkShapeSignal = _gicentre$elm_vega$Vega$LinkShapeSignal;
var _gicentre$elm_vega$Vega$LinkOrthogonal = {ctor: 'LinkOrthogonal'};
var _gicentre$elm_vega$Vega$LinkDiagonal = {ctor: 'LinkDiagonal'};
var _gicentre$elm_vega$Vega$LinkCurve = {ctor: 'LinkCurve'};
var _gicentre$elm_vega$Vega$LinkArc = {ctor: 'LinkArc'};
var _gicentre$elm_vega$Vega$LinkLine = {ctor: 'LinkLine'};
var _gicentre$elm_vega$Vega$Trail = {ctor: 'Trail'};
var _gicentre$elm_vega$Vega$Text = {ctor: 'Text'};
var _gicentre$elm_vega$Vega$Symbol = {ctor: 'Symbol'};
var _gicentre$elm_vega$Vega$Shape = {ctor: 'Shape'};
var _gicentre$elm_vega$Vega$Rule = {ctor: 'Rule'};
var _gicentre$elm_vega$Vega$Rect = {ctor: 'Rect'};
var _gicentre$elm_vega$Vega$Path = {ctor: 'Path'};
var _gicentre$elm_vega$Vega$Line = {ctor: 'Line'};
var _gicentre$elm_vega$Vega$Group = {ctor: 'Group'};
var _gicentre$elm_vega$Vega$Image = {ctor: 'Image'};
var _gicentre$elm_vega$Vega$Area = {ctor: 'Area'};
var _gicentre$elm_vega$Vega$Arc = {ctor: 'Arc'};
var _gicentre$elm_vega$Vega$StepBefore = {ctor: 'StepBefore'};
var _gicentre$elm_vega$Vega$StepAfter = {ctor: 'StepAfter'};
var _gicentre$elm_vega$Vega$Stepwise = {ctor: 'Stepwise'};
var _gicentre$elm_vega$Vega$Natural = {ctor: 'Natural'};
var _gicentre$elm_vega$Vega$Monotone = {ctor: 'Monotone'};
var _gicentre$elm_vega$Vega$Linear = {ctor: 'Linear'};
var _gicentre$elm_vega$Vega$CatmullRom = {ctor: 'CatmullRom'};
var _gicentre$elm_vega$Vega$Cardinal = {ctor: 'Cardinal'};
var _gicentre$elm_vega$Vega$Bundle = {ctor: 'Bundle'};
var _gicentre$elm_vega$Vega$Basis = {ctor: 'Basis'};
var _gicentre$elm_vega$Vega$OperationSignal = function (a) {
	return {ctor: 'OperationSignal', _0: a};
};
var _gicentre$elm_vega$Vega$operationSignal = _gicentre$elm_vega$Vega$OperationSignal;
var _gicentre$elm_vega$Vega$Variancep = {ctor: 'Variancep'};
var _gicentre$elm_vega$Vega$Variance = {ctor: 'Variance'};
var _gicentre$elm_vega$Vega$Valid = {ctor: 'Valid'};
var _gicentre$elm_vega$Vega$Sum = {ctor: 'Sum'};
var _gicentre$elm_vega$Vega$Stdevp = {ctor: 'Stdevp'};
var _gicentre$elm_vega$Vega$Stdev = {ctor: 'Stdev'};
var _gicentre$elm_vega$Vega$Stderr = {ctor: 'Stderr'};
var _gicentre$elm_vega$Vega$Q3 = {ctor: 'Q3'};
var _gicentre$elm_vega$Vega$Q1 = {ctor: 'Q1'};
var _gicentre$elm_vega$Vega$Missing = {ctor: 'Missing'};
var _gicentre$elm_vega$Vega$Min = {ctor: 'Min'};
var _gicentre$elm_vega$Vega$Median = {ctor: 'Median'};
var _gicentre$elm_vega$Vega$Mean = {ctor: 'Mean'};
var _gicentre$elm_vega$Vega$Max = {ctor: 'Max'};
var _gicentre$elm_vega$Vega$Distinct = {ctor: 'Distinct'};
var _gicentre$elm_vega$Vega$Count = {ctor: 'Count'};
var _gicentre$elm_vega$Vega$CI1 = {ctor: 'CI1'};
var _gicentre$elm_vega$Vega$CI0 = {ctor: 'CI0'};
var _gicentre$elm_vega$Vega$Average = {ctor: 'Average'};
var _gicentre$elm_vega$Vega$ArgMin = {ctor: 'ArgMin'};
var _gicentre$elm_vega$Vega$ArgMax = {ctor: 'ArgMax'};
var _gicentre$elm_vega$Vega$OrderSignal = function (a) {
	return {ctor: 'OrderSignal', _0: a};
};
var _gicentre$elm_vega$Vega$orderSignal = _gicentre$elm_vega$Vega$OrderSignal;
var _gicentre$elm_vega$Vega$Descend = {ctor: 'Descend'};
var _gicentre$elm_vega$Vega$Ascend = {ctor: 'Ascend'};
var _gicentre$elm_vega$Vega$OrientationSignal = function (a) {
	return {ctor: 'OrientationSignal', _0: a};
};
var _gicentre$elm_vega$Vega$orientationSignal = _gicentre$elm_vega$Vega$OrientationSignal;
var _gicentre$elm_vega$Vega$Radial = {ctor: 'Radial'};
var _gicentre$elm_vega$Vega$Vertical = {ctor: 'Vertical'};
var _gicentre$elm_vega$Vega$Horizontal = {ctor: 'Horizontal'};
var _gicentre$elm_vega$Vega$OverlapStrategySignal = function (a) {
	return {ctor: 'OverlapStrategySignal', _0: a};
};
var _gicentre$elm_vega$Vega$overlapStrategySignal = _gicentre$elm_vega$Vega$OverlapStrategySignal;
var _gicentre$elm_vega$Vega$OGreedy = {ctor: 'OGreedy'};
var _gicentre$elm_vega$Vega$OParity = {ctor: 'OParity'};
var _gicentre$elm_vega$Vega$ONone = {ctor: 'ONone'};
var _gicentre$elm_vega$Vega$PEdges = F4(
	function (a, b, c, d) {
		return {ctor: 'PEdges', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$Vega$PSize = function (a) {
	return {ctor: 'PSize', _0: a};
};
var _gicentre$elm_vega$Vega$ProjectionSignal = function (a) {
	return {ctor: 'ProjectionSignal', _0: a};
};
var _gicentre$elm_vega$Vega$projectionSignal = _gicentre$elm_vega$Vega$ProjectionSignal;
var _gicentre$elm_vega$Vega$Proj = function (a) {
	return {ctor: 'Proj', _0: a};
};
var _gicentre$elm_vega$Vega$prCustom = _gicentre$elm_vega$Vega$Proj;
var _gicentre$elm_vega$Vega$TransverseMercator = {ctor: 'TransverseMercator'};
var _gicentre$elm_vega$Vega$Stereographic = {ctor: 'Stereographic'};
var _gicentre$elm_vega$Vega$Orthographic = {ctor: 'Orthographic'};
var _gicentre$elm_vega$Vega$NaturalEarth1 = {ctor: 'NaturalEarth1'};
var _gicentre$elm_vega$Vega$Mercator = {ctor: 'Mercator'};
var _gicentre$elm_vega$Vega$Gnomonic = {ctor: 'Gnomonic'};
var _gicentre$elm_vega$Vega$Equirectangular = {ctor: 'Equirectangular'};
var _gicentre$elm_vega$Vega$ConicEquidistant = {ctor: 'ConicEquidistant'};
var _gicentre$elm_vega$Vega$ConicEqualArea = {ctor: 'ConicEqualArea'};
var _gicentre$elm_vega$Vega$ConicConformal = {ctor: 'ConicConformal'};
var _gicentre$elm_vega$Vega$AzimuthalEquidistant = {ctor: 'AzimuthalEquidistant'};
var _gicentre$elm_vega$Vega$AzimuthalEqualArea = {ctor: 'AzimuthalEqualArea'};
var _gicentre$elm_vega$Vega$AlbersUsa = {ctor: 'AlbersUsa'};
var _gicentre$elm_vega$Vega$Albers = {ctor: 'Albers'};
var _gicentre$elm_vega$Vega$ScaleSignal = function (a) {
	return {ctor: 'ScaleSignal', _0: a};
};
var _gicentre$elm_vega$Vega$scaleSignal = _gicentre$elm_vega$Vega$ScaleSignal;
var _gicentre$elm_vega$Vega$ScCustom = function (a) {
	return {ctor: 'ScCustom', _0: a};
};
var _gicentre$elm_vega$Vega$scCustom = _gicentre$elm_vega$Vega$ScCustom;
var _gicentre$elm_vega$Vega$ScBinOrdinal = {ctor: 'ScBinOrdinal'};
var _gicentre$elm_vega$Vega$ScBinLinear = {ctor: 'ScBinLinear'};
var _gicentre$elm_vega$Vega$ScQuantize = {ctor: 'ScQuantize'};
var _gicentre$elm_vega$Vega$ScQuantile = {ctor: 'ScQuantile'};
var _gicentre$elm_vega$Vega$ScPoint = {ctor: 'ScPoint'};
var _gicentre$elm_vega$Vega$ScBand = {ctor: 'ScBand'};
var _gicentre$elm_vega$Vega$ScOrdinal = {ctor: 'ScOrdinal'};
var _gicentre$elm_vega$Vega$ScSequential = {ctor: 'ScSequential'};
var _gicentre$elm_vega$Vega$ScUtc = {ctor: 'ScUtc'};
var _gicentre$elm_vega$Vega$ScTime = {ctor: 'ScTime'};
var _gicentre$elm_vega$Vega$ScLog = {ctor: 'ScLog'};
var _gicentre$elm_vega$Vega$ScSqrt = {ctor: 'ScSqrt'};
var _gicentre$elm_vega$Vega$ScPow = {ctor: 'ScPow'};
var _gicentre$elm_vega$Vega$ScLinear = {ctor: 'ScLinear'};
var _gicentre$elm_vega$Vega$ScaleNiceSignal = function (a) {
	return {ctor: 'ScaleNiceSignal', _0: a};
};
var _gicentre$elm_vega$Vega$scaleNiceSignal = _gicentre$elm_vega$Vega$ScaleNiceSignal;
var _gicentre$elm_vega$Vega$NTickCount = function (a) {
	return {ctor: 'NTickCount', _0: a};
};
var _gicentre$elm_vega$Vega$nTickCount = _gicentre$elm_vega$Vega$NTickCount;
var _gicentre$elm_vega$Vega$NFalse = {ctor: 'NFalse'};
var _gicentre$elm_vega$Vega$NTrue = {ctor: 'NTrue'};
var _gicentre$elm_vega$Vega$NInterval = F2(
	function (a, b) {
		return {ctor: 'NInterval', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$nInterval = F2(
	function (tu, step) {
		return A2(_gicentre$elm_vega$Vega$NInterval, tu, step);
	});
var _gicentre$elm_vega$Vega$NYear = {ctor: 'NYear'};
var _gicentre$elm_vega$Vega$NMonth = {ctor: 'NMonth'};
var _gicentre$elm_vega$Vega$NWeek = {ctor: 'NWeek'};
var _gicentre$elm_vega$Vega$NDay = {ctor: 'NDay'};
var _gicentre$elm_vega$Vega$NHour = {ctor: 'NHour'};
var _gicentre$elm_vega$Vega$NMinute = {ctor: 'NMinute'};
var _gicentre$elm_vega$Vega$NSecond = {ctor: 'NSecond'};
var _gicentre$elm_vega$Vega$NMillisecond = {ctor: 'NMillisecond'};
var _gicentre$elm_vega$Vega$SideSignal = function (a) {
	return {ctor: 'SideSignal', _0: a};
};
var _gicentre$elm_vega$Vega$sideSignal = _gicentre$elm_vega$Vega$SideSignal;
var _gicentre$elm_vega$Vega$SBottom = {ctor: 'SBottom'};
var _gicentre$elm_vega$Vega$STop = {ctor: 'STop'};
var _gicentre$elm_vega$Vega$SRight = {ctor: 'SRight'};
var _gicentre$elm_vega$Vega$SLeft = {ctor: 'SLeft'};
var _gicentre$elm_vega$Vega$SortPropertySignal = function (a) {
	return {ctor: 'SortPropertySignal', _0: a};
};
var _gicentre$elm_vega$Vega$sortPropertySignal = _gicentre$elm_vega$Vega$SortPropertySignal;
var _gicentre$elm_vega$Vega$ByField = function (a) {
	return {ctor: 'ByField', _0: a};
};
var _gicentre$elm_vega$Vega$soByField = _gicentre$elm_vega$Vega$ByField;
var _gicentre$elm_vega$Vega$Op = function (a) {
	return {ctor: 'Op', _0: a};
};
var _gicentre$elm_vega$Vega$soOp = _gicentre$elm_vega$Vega$Op;
var _gicentre$elm_vega$Vega$Descending = {ctor: 'Descending'};
var _gicentre$elm_vega$Vega$Ascending = {ctor: 'Ascending'};
var _gicentre$elm_vega$Vega$dataRefProperty = function (dataRef) {
	var nestedSpec = function (dRef2) {
		var _p204 = dRef2;
		if (((_p204.ctor === '::') && (_p204._0.ctor === 'DValues')) && (_p204._1.ctor === '[]')) {
			return _gicentre$elm_vega$Vega$valueSpec(_p204._0._0);
		} else {
			return _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$dataRefProperty, dRef2));
		}
	};
	var _p205 = dataRef;
	switch (_p205.ctor) {
		case 'DDataset':
			return {
				ctor: '_Tuple2',
				_0: 'data',
				_1: _elm_lang$core$Json_Encode$string(_p205._0)
			};
		case 'DField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p205._0)
			};
		case 'DFields':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p205._0))
			};
		case 'DValues':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p205._0)
			};
		case 'DSignal':
			return {
				ctor: '_Tuple2',
				_0: 'signal',
				_1: _elm_lang$core$Json_Encode$string(_p205._0)
			};
		case 'DReferences':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						function (drs) {
							return nestedSpec(drs);
						},
						_p205._0))
			};
		default:
			var _p206 = _p205._0;
			return (_elm_lang$core$Native_Utils.eq(
				_p206,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$Ascending,
					_1: {ctor: '[]'}
				}) || _elm_lang$core$Native_Utils.eq(
				_p206,
				{ctor: '[]'})) ? {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$bool(true)
			} : {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$sortProperty, _p206))
			};
	}
};
var _gicentre$elm_vega$Vega$scaleDomainSpec = function (sdType) {
	var _p207 = sdType;
	switch (_p207.ctor) {
		case 'DoNums':
			return _gicentre$elm_vega$Vega$numSpec(_p207._0);
		case 'DoStrs':
			return _gicentre$elm_vega$Vega$strSpec(_p207._0);
		default:
			return _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$dataRefProperty, _p207._0));
	}
};
var _gicentre$elm_vega$Vega$scaleProperty = function (scaleProp) {
	var _p208 = scaleProp;
	switch (_p208.ctor) {
		case 'SType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _gicentre$elm_vega$Vega$scaleSpec(_p208._0)
			};
		case 'SDomain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _gicentre$elm_vega$Vega$scaleDomainSpec(_p208._0)
			};
		case 'SDomainMax':
			return {
				ctor: '_Tuple2',
				_0: 'domainMax',
				_1: _gicentre$elm_vega$Vega$numSpec(_p208._0)
			};
		case 'SDomainMin':
			return {
				ctor: '_Tuple2',
				_0: 'domainMin',
				_1: _gicentre$elm_vega$Vega$numSpec(_p208._0)
			};
		case 'SDomainMid':
			return {
				ctor: '_Tuple2',
				_0: 'domainMid',
				_1: _gicentre$elm_vega$Vega$numSpec(_p208._0)
			};
		case 'SDomainRaw':
			return {
				ctor: '_Tuple2',
				_0: 'domainRaw',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p208._0)
			};
		case 'SRange':
			var _p209 = _p208._0;
			switch (_p209.ctor) {
				case 'RNums':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p209._0))
					};
				case 'RStrs':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p209._0))
					};
				case 'RValues':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueSpec, _p209._0))
					};
				case 'RSignal':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p209._0),
								_1: {ctor: '[]'}
							})
					};
				case 'RScheme':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$object(
							A2(
								_elm_lang$core$List$map,
								_gicentre$elm_vega$Vega$schemeProperty,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$SScheme(_p209._0),
									_1: _p209._1
								}))
					};
				case 'RData':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$dataRefProperty, _p209._0))
					};
				case 'RStep':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'step',
									_1: _gicentre$elm_vega$Vega$valueSpec(_p209._0)
								},
								_1: {ctor: '[]'}
							})
					};
				case 'RaWidth':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string('width')
					};
				case 'RaHeight':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string('height')
					};
				case 'RaSymbol':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string('symbol')
					};
				case 'RaCategory':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string('category')
					};
				case 'RaDiverging':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string('diverging')
					};
				case 'RaOrdinal':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string('ordinal')
					};
				case 'RaRamp':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string('ramp')
					};
				case 'RaHeatmap':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string('heatmap')
					};
				case 'RCustom':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string(_p209._0)
					};
				default:
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p209._0),
								_1: {ctor: '[]'}
							})
					};
			}
		case 'SPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p208._0)
			};
		case 'SPaddingInner':
			return {
				ctor: '_Tuple2',
				_0: 'paddingInner',
				_1: _gicentre$elm_vega$Vega$numSpec(_p208._0)
			};
		case 'SPaddingOuter':
			return {
				ctor: '_Tuple2',
				_0: 'paddingOuter',
				_1: _gicentre$elm_vega$Vega$numSpec(_p208._0)
			};
		case 'SRangeStep':
			return {
				ctor: '_Tuple2',
				_0: 'rangeStep',
				_1: _gicentre$elm_vega$Vega$numSpec(_p208._0)
			};
		case 'SRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _gicentre$elm_vega$Vega$booSpec(_p208._0)
			};
		case 'SClamp':
			return {
				ctor: '_Tuple2',
				_0: 'clamp',
				_1: _gicentre$elm_vega$Vega$booSpec(_p208._0)
			};
		case 'SInterpolate':
			return {
				ctor: '_Tuple2',
				_0: 'interpolate',
				_1: _gicentre$elm_vega$Vega$interpolateSpec(_p208._0)
			};
		case 'SNice':
			return {
				ctor: '_Tuple2',
				_0: 'nice',
				_1: _gicentre$elm_vega$Vega$niceSpec(_p208._0)
			};
		case 'SZero':
			return {
				ctor: '_Tuple2',
				_0: 'zero',
				_1: _gicentre$elm_vega$Vega$booSpec(_p208._0)
			};
		case 'SReverse':
			return {
				ctor: '_Tuple2',
				_0: 'reverse',
				_1: _gicentre$elm_vega$Vega$booSpec(_p208._0)
			};
		case 'SExponent':
			return {
				ctor: '_Tuple2',
				_0: 'exponent',
				_1: _gicentre$elm_vega$Vega$numSpec(_p208._0)
			};
		case 'SBase':
			return {
				ctor: '_Tuple2',
				_0: 'base',
				_1: _gicentre$elm_vega$Vega$numSpec(_p208._0)
			};
		case 'SAlign':
			return {
				ctor: '_Tuple2',
				_0: 'align',
				_1: _gicentre$elm_vega$Vega$numSpec(_p208._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'domainImplicit',
				_1: _gicentre$elm_vega$Vega$booSpec(_p208._0)
			};
	}
};
var _gicentre$elm_vega$Vega$scale = F2(
	function (name, sps) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			_elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'name',
						_1: _elm_lang$core$Json_Encode$string(name)
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$scaleProperty, sps)
				}));
	});
var _gicentre$elm_vega$Vega$SpiralSignal = function (a) {
	return {ctor: 'SpiralSignal', _0: a};
};
var _gicentre$elm_vega$Vega$spiralSignal = _gicentre$elm_vega$Vega$SpiralSignal;
var _gicentre$elm_vega$Vega$Rectangular = {ctor: 'Rectangular'};
var _gicentre$elm_vega$Vega$Archimedean = {ctor: 'Archimedean'};
var _gicentre$elm_vega$Vega$StackOffsetSignal = function (a) {
	return {ctor: 'StackOffsetSignal', _0: a};
};
var _gicentre$elm_vega$Vega$stackOffsetSignal = _gicentre$elm_vega$Vega$StackOffsetSignal;
var _gicentre$elm_vega$Vega$OfNormalize = {ctor: 'OfNormalize'};
var _gicentre$elm_vega$Vega$OfCenter = {ctor: 'OfCenter'};
var _gicentre$elm_vega$Vega$OfZero = {ctor: 'OfZero'};
var _gicentre$elm_vega$Vega$StrokeCapSignal = function (a) {
	return {ctor: 'StrokeCapSignal', _0: a};
};
var _gicentre$elm_vega$Vega$strokeCapSignal = _gicentre$elm_vega$Vega$StrokeCapSignal;
var _gicentre$elm_vega$Vega$CSquare = {ctor: 'CSquare'};
var _gicentre$elm_vega$Vega$CRound = {ctor: 'CRound'};
var _gicentre$elm_vega$Vega$CButt = {ctor: 'CButt'};
var _gicentre$elm_vega$Vega$StrokeJoinSignal = function (a) {
	return {ctor: 'StrokeJoinSignal', _0: a};
};
var _gicentre$elm_vega$Vega$strokeJoinSignal = _gicentre$elm_vega$Vega$StrokeJoinSignal;
var _gicentre$elm_vega$Vega$JBevel = {ctor: 'JBevel'};
var _gicentre$elm_vega$Vega$JRound = {ctor: 'JRound'};
var _gicentre$elm_vega$Vega$JMiter = {ctor: 'JMiter'};
var _gicentre$elm_vega$Vega$SymbolSignal = function (a) {
	return {ctor: 'SymbolSignal', _0: a};
};
var _gicentre$elm_vega$Vega$symbolSignal = _gicentre$elm_vega$Vega$SymbolSignal;
var _gicentre$elm_vega$Vega$SymPath = function (a) {
	return {ctor: 'SymPath', _0: a};
};
var _gicentre$elm_vega$Vega$symPath = _gicentre$elm_vega$Vega$SymPath;
var _gicentre$elm_vega$Vega$SymTriangleRight = {ctor: 'SymTriangleRight'};
var _gicentre$elm_vega$Vega$SymTriangleLeft = {ctor: 'SymTriangleLeft'};
var _gicentre$elm_vega$Vega$SymTriangleDown = {ctor: 'SymTriangleDown'};
var _gicentre$elm_vega$Vega$SymTriangleUp = {ctor: 'SymTriangleUp'};
var _gicentre$elm_vega$Vega$SymDiamond = {ctor: 'SymDiamond'};
var _gicentre$elm_vega$Vega$SymCross = {ctor: 'SymCross'};
var _gicentre$elm_vega$Vega$SymSquare = {ctor: 'SymSquare'};
var _gicentre$elm_vega$Vega$SymCircle = {ctor: 'SymCircle'};
var _gicentre$elm_vega$Vega$TextDirectionSignal = function (a) {
	return {ctor: 'TextDirectionSignal', _0: a};
};
var _gicentre$elm_vega$Vega$textDirectionSignal = _gicentre$elm_vega$Vega$TextDirectionSignal;
var _gicentre$elm_vega$Vega$RightToLeft = {ctor: 'RightToLeft'};
var _gicentre$elm_vega$Vega$LeftToRight = {ctor: 'LeftToRight'};
var _gicentre$elm_vega$Vega$TimeUnitSignal = function (a) {
	return {ctor: 'TimeUnitSignal', _0: a};
};
var _gicentre$elm_vega$Vega$timeUnitSignal = _gicentre$elm_vega$Vega$TimeUnitSignal;
var _gicentre$elm_vega$Vega$Millisecond = {ctor: 'Millisecond'};
var _gicentre$elm_vega$Vega$Second = {ctor: 'Second'};
var _gicentre$elm_vega$Vega$Minute = {ctor: 'Minute'};
var _gicentre$elm_vega$Vega$Hour = {ctor: 'Hour'};
var _gicentre$elm_vega$Vega$Day = {ctor: 'Day'};
var _gicentre$elm_vega$Vega$Week = {ctor: 'Week'};
var _gicentre$elm_vega$Vega$Month = {ctor: 'Month'};
var _gicentre$elm_vega$Vega$Year = {ctor: 'Year'};
var _gicentre$elm_vega$Vega$TitleFrameSignal = function (a) {
	return {ctor: 'TitleFrameSignal', _0: a};
};
var _gicentre$elm_vega$Vega$titleFrameSignal = _gicentre$elm_vega$Vega$TitleFrameSignal;
var _gicentre$elm_vega$Vega$FrGroup = {ctor: 'FrGroup'};
var _gicentre$elm_vega$Vega$FrBounds = {ctor: 'FrBounds'};
var _gicentre$elm_vega$Vega$TreemapMethodSignal = function (a) {
	return {ctor: 'TreemapMethodSignal', _0: a};
};
var _gicentre$elm_vega$Vega$treemapMethodSignal = _gicentre$elm_vega$Vega$TreemapMethodSignal;
var _gicentre$elm_vega$Vega$SliceDice = {ctor: 'SliceDice'};
var _gicentre$elm_vega$Vega$Slice = {ctor: 'Slice'};
var _gicentre$elm_vega$Vega$Dice = {ctor: 'Dice'};
var _gicentre$elm_vega$Vega$Binary = {ctor: 'Binary'};
var _gicentre$elm_vega$Vega$Resquarify = {ctor: 'Resquarify'};
var _gicentre$elm_vega$Vega$Squarify = {ctor: 'Squarify'};
var _gicentre$elm_vega$Vega$TreeMethodSignal = function (a) {
	return {ctor: 'TreeMethodSignal', _0: a};
};
var _gicentre$elm_vega$Vega$treeMethodSignal = _gicentre$elm_vega$Vega$TreeMethodSignal;
var _gicentre$elm_vega$Vega$Cluster = {ctor: 'Cluster'};
var _gicentre$elm_vega$Vega$Tidy = {ctor: 'Tidy'};
var _gicentre$elm_vega$Vega$VAlignSignal = function (a) {
	return {ctor: 'VAlignSignal', _0: a};
};
var _gicentre$elm_vega$Vega$vAlignSignal = _gicentre$elm_vega$Vega$VAlignSignal;
var _gicentre$elm_vega$Vega$Alphabetic = {ctor: 'Alphabetic'};
var _gicentre$elm_vega$Vega$AlignBottom = {ctor: 'AlignBottom'};
var _gicentre$elm_vega$Vega$AlignMiddle = {ctor: 'AlignMiddle'};
var _gicentre$elm_vega$Vega$AlignTop = {ctor: 'AlignTop'};
var _gicentre$elm_vega$Vega$VEncode = {ctor: 'VEncode'};
var _gicentre$elm_vega$Vega$encode = function (eps) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VEncode,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, eps))
	};
};
var _gicentre$elm_vega$Vega$VMarks = {ctor: 'VMarks'};
var _gicentre$elm_vega$Vega$marks = function (axs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VMarks,
		_1: _elm_lang$core$Json_Encode$list(axs)
	};
};
var _gicentre$elm_vega$Vega$VLayout = {ctor: 'VLayout'};
var _gicentre$elm_vega$Vega$layout = function (lps) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VLayout,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$layoutProperty, lps))
	};
};
var _gicentre$elm_vega$Vega$VTitle = {ctor: 'VTitle'};
var _gicentre$elm_vega$Vega$title = F2(
	function (s, tps) {
		return {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$Vega$VTitle,
			_1: _elm_lang$core$Json_Encode$object(
				A2(
					_elm_lang$core$List$map,
					_gicentre$elm_vega$Vega$titleProperty,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$TText(s),
						_1: tps
					}))
		};
	});
var _gicentre$elm_vega$Vega$VLegends = {ctor: 'VLegends'};
var _gicentre$elm_vega$Vega$legends = function (lgs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VLegends,
		_1: _elm_lang$core$Json_Encode$list(lgs)
	};
};
var _gicentre$elm_vega$Vega$VAxes = {ctor: 'VAxes'};
var _gicentre$elm_vega$Vega$axes = function (axs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VAxes,
		_1: _elm_lang$core$Json_Encode$list(axs)
	};
};
var _gicentre$elm_vega$Vega$VProjections = {ctor: 'VProjections'};
var _gicentre$elm_vega$Vega$projections = function (prs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VProjections,
		_1: _elm_lang$core$Json_Encode$list(prs)
	};
};
var _gicentre$elm_vega$Vega$VScales = {ctor: 'VScales'};
var _gicentre$elm_vega$Vega$scales = function (scs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VScales,
		_1: _elm_lang$core$Json_Encode$list(scs)
	};
};
var _gicentre$elm_vega$Vega$VData = {ctor: 'VData'};
var _gicentre$elm_vega$Vega$dataSource = function (dataTables) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VData,
		_1: _elm_lang$core$Json_Encode$list(
			A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$object, dataTables))
	};
};
var _gicentre$elm_vega$Vega$VSignals = {ctor: 'VSignals'};
var _gicentre$elm_vega$Vega$signals = function (sigs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VSignals,
		_1: _elm_lang$core$Json_Encode$list(sigs)
	};
};
var _gicentre$elm_vega$Vega$VConfig = {ctor: 'VConfig'};
var _gicentre$elm_vega$Vega$config = function (cps) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VConfig,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$configProperty, cps))
	};
};
var _gicentre$elm_vega$Vega$VAutosize = {ctor: 'VAutosize'};
var _gicentre$elm_vega$Vega$autosize = function (aus) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VAutosize,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$autosizeProperty, aus))
	};
};
var _gicentre$elm_vega$Vega$VPadding = {ctor: 'VPadding'};
var _gicentre$elm_vega$Vega$padding = function (p) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VPadding,
		_1: _gicentre$elm_vega$Vega$paddingSpec(
			_gicentre$elm_vega$Vega$PSize(p))
	};
};
var _gicentre$elm_vega$Vega$paddings = F4(
	function (l, t, r, b) {
		return {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$Vega$VPadding,
			_1: _gicentre$elm_vega$Vega$paddingSpec(
				A4(_gicentre$elm_vega$Vega$PEdges, l, t, r, b))
		};
	});
var _gicentre$elm_vega$Vega$VHeight = {ctor: 'VHeight'};
var _gicentre$elm_vega$Vega$height = function (w) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VHeight,
		_1: _elm_lang$core$Json_Encode$float(w)
	};
};
var _gicentre$elm_vega$Vega$VWidth = {ctor: 'VWidth'};
var _gicentre$elm_vega$Vega$width = function (w) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VWidth,
		_1: _elm_lang$core$Json_Encode$float(w)
	};
};
var _gicentre$elm_vega$Vega$VBackground = {ctor: 'VBackground'};
var _gicentre$elm_vega$Vega$background = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VBackground,
		_1: _gicentre$elm_vega$Vega$strSpec(s)
	};
};
var _gicentre$elm_vega$Vega$VDescription = {ctor: 'VDescription'};
var _gicentre$elm_vega$Vega$description = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$Vega$VDescription,
		_1: _elm_lang$core$Json_Encode$string(s)
	};
};
var _gicentre$elm_vega$Vega$WOperationSignal = function (a) {
	return {ctor: 'WOperationSignal', _0: a};
};
var _gicentre$elm_vega$Vega$wOperationSignal = _gicentre$elm_vega$Vega$WOperationSignal;
var _gicentre$elm_vega$Vega$NthValue = {ctor: 'NthValue'};
var _gicentre$elm_vega$Vega$LastValue = {ctor: 'LastValue'};
var _gicentre$elm_vega$Vega$FirstValue = {ctor: 'FirstValue'};
var _gicentre$elm_vega$Vega$Lead = {ctor: 'Lead'};
var _gicentre$elm_vega$Vega$Lag = {ctor: 'Lag'};
var _gicentre$elm_vega$Vega$Ntile = {ctor: 'Ntile'};
var _gicentre$elm_vega$Vega$CumeDist = {ctor: 'CumeDist'};
var _gicentre$elm_vega$Vega$PercentRank = {ctor: 'PercentRank'};
var _gicentre$elm_vega$Vega$DenseRank = {ctor: 'DenseRank'};
var _gicentre$elm_vega$Vega$Rank = {ctor: 'Rank'};
var _gicentre$elm_vega$Vega$RowNumber = {ctor: 'RowNumber'};
var _gicentre$elm_vega$Vega$AlwaysUpdate = {ctor: 'AlwaysUpdate'};
var _gicentre$elm_vega$Vega$trFormula = F2(
	function (exp, fName) {
		return A3(_gicentre$elm_vega$Vega$TFormula, exp, fName, _gicentre$elm_vega$Vega$AlwaysUpdate);
	});
var _gicentre$elm_vega$Vega$InitOnly = {ctor: 'InitOnly'};
var _gicentre$elm_vega$Vega$trFormulaInitOnly = F2(
	function (exp, fName) {
		return A3(_gicentre$elm_vega$Vega$TFormula, exp, fName, _gicentre$elm_vega$Vega$InitOnly);
	});

var _gicentre$elm_vega$GalleryInteraction$interaction8 = function () {
	var mk2 = function (_p0) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Symbol,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mStyle(
						{
							ctor: '::',
							_0: 'circle',
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mFrom(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$srData(
									_gicentre$elm_vega$Vega$str('pi_estimates')),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enUpdate(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maOpacity(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(0.7),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maFill(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vStr('#4c78a8'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maX(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale('data_point_scale'),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$field('data')),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maY(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vScale('pi_scale'),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vField(
																		_gicentre$elm_vega$Vega$field('estimate')),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maSize(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vNum(8),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maShape(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$symbolValue(_gicentre$elm_vega$Vega$SymCircle),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$mark,
					_gicentre$elm_vega$Vega$Rule,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mFrom(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$srData(
									_gicentre$elm_vega$Vega$str('pi')),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enUpdate(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maStroke(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vStr('darkgrey'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maX(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vNum(0),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale('pi_scale'),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$field('value')),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maX2(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$fGroup(
																		_gicentre$elm_vega$Vega$field('width'))),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$mark,
						_gicentre$elm_vega$Vega$Text,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mFrom(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$srData(
										_gicentre$elm_vega$Vega$str('pi')),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enUpdate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maAlign(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$hLeft,
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maX(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(10),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFill(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$black,
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maY(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vScale('pi_scale'),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vField(
																			_gicentre$elm_vega$Vega$field('value')),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vOffset(
																				_gicentre$elm_vega$Vega$vNum(-5)),
																			_1: {ctor: '[]'}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maText(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vStr('Real Pi: 3.1415...'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						},
						A3(
							_gicentre$elm_vega$Vega$mark,
							_gicentre$elm_vega$Vega$Text,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mFrom(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$srData(
											_gicentre$elm_vega$Vega$str('pi_estimate')),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mEncode(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$enUpdate(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maAlign(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$hRight,
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maX(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('height'),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vOffset(
																		_gicentre$elm_vega$Vega$vNum(-5)),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maDy(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vNum(-5),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maFill(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$black,
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maY(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vScale('pi_scale'),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vField(
																					_gicentre$elm_vega$Vega$field('value')),
																				_1: {ctor: '[]'}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maText(
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vSignal('\'Estimate: \' + format(datum.estimate, \',.3f\')'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							},
							_p0)))));
	};
	var mk1 = function (_p1) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Symbol,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mStyle(
						{
							ctor: '::',
							_0: 'circle',
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mFrom(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$srData(
									_gicentre$elm_vega$Vega$str('random_data')),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enUpdate(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maOpacity(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(0.6),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maFill(
													{
														ctor: '::',
														_0: A3(
															_gicentre$elm_vega$Vega$ifElse,
															'sqrt(datum.x * datum.x + datum.y * datum.y) <= 1',
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vStr('#003f5c'),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vStr('#ffa600'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maX(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale('xScale'),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$field('x')),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maY(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vScale('yScale'),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vField(
																		_gicentre$elm_vega$Vega$field('y')),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maShape(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$symbolValue(_gicentre$elm_vega$Vega$SymCircle),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				_p1));
	};
	var ti2 = A2(
		_gicentre$elm_vega$Vega$title,
		_gicentre$elm_vega$Vega$str('Pi Estimate'),
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$tiFrame(_gicentre$elm_vega$Vega$FrGroup),
			_1: {ctor: '[]'}
		});
	var ti1 = A2(
		_gicentre$elm_vega$Vega$title,
		_gicentre$elm_vega$Vega$str('In Points and Out Points'),
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$tiFrame(_gicentre$elm_vega$Vega$FrGroup),
			_1: {ctor: '[]'}
		});
	var ax2 = function (_p2) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'data_point_scale',
				_gicentre$elm_vega$Vega$SBottom,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axTitle(
						_gicentre$elm_vega$Vega$str('Number of points')),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axLabelFlush(
							_gicentre$elm_vega$Vega$num(1)),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axLabelOverlap(_gicentre$elm_vega$Vega$OParity),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axZIndex(
									_gicentre$elm_vega$Vega$num(1)),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A4(
					_gicentre$elm_vega$Vega$axis,
					'data_point_scale',
					_gicentre$elm_vega$Vega$SBottom,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axGrid(_gicentre$elm_vega$Vega$true),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axGridScale('pi_scale'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axLabels(_gicentre$elm_vega$Vega$false),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axMaxExtent(
											_gicentre$elm_vega$Vega$vNum(0)),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axMinExtent(
												_gicentre$elm_vega$Vega$vNum(0)),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$axTicks(_gicentre$elm_vega$Vega$false),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$axZIndex(
														_gicentre$elm_vega$Vega$num(0)),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					},
					A4(
						_gicentre$elm_vega$Vega$axis,
						'pi_scale',
						_gicentre$elm_vega$Vega$SLeft,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axTitle(
								_gicentre$elm_vega$Vega$str('Estimated pi value')),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axLabelOverlap(_gicentre$elm_vega$Vega$OParity),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axZIndex(
										_gicentre$elm_vega$Vega$num(1)),
									_1: {ctor: '[]'}
								}
							}
						},
						A4(
							_gicentre$elm_vega$Vega$axis,
							'pi_scale',
							_gicentre$elm_vega$Vega$SLeft,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axGrid(_gicentre$elm_vega$Vega$true),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axGridScale('data_point_scale'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axLabels(_gicentre$elm_vega$Vega$false),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$axMaxExtent(
													_gicentre$elm_vega$Vega$vNum(0)),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$axMinExtent(
														_gicentre$elm_vega$Vega$vNum(0)),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$axTicks(_gicentre$elm_vega$Vega$false),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$axZIndex(
																_gicentre$elm_vega$Vega$num(0)),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								}
							},
							_p2)))));
	};
	var ax1 = function (_p3) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'xScale',
				_gicentre$elm_vega$Vega$SBottom,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axTitle(
						_gicentre$elm_vega$Vega$str('x')),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axLabelFlush(
							_gicentre$elm_vega$Vega$num(1)),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axLabelOverlap(_gicentre$elm_vega$Vega$OParity),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axZIndex(
									_gicentre$elm_vega$Vega$num(1)),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A4(
					_gicentre$elm_vega$Vega$axis,
					'xScale',
					_gicentre$elm_vega$Vega$SBottom,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axGrid(_gicentre$elm_vega$Vega$true),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axGridScale('yScale'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axLabels(_gicentre$elm_vega$Vega$false),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axMaxExtent(
											_gicentre$elm_vega$Vega$vNum(0)),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axMinExtent(
												_gicentre$elm_vega$Vega$vNum(0)),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$axTicks(_gicentre$elm_vega$Vega$false),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$axZIndex(
														_gicentre$elm_vega$Vega$num(0)),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					},
					A4(
						_gicentre$elm_vega$Vega$axis,
						'yScale',
						_gicentre$elm_vega$Vega$SLeft,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axTitle(
								_gicentre$elm_vega$Vega$str('y')),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axLabelOverlap(_gicentre$elm_vega$Vega$OParity),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axZIndex(
										_gicentre$elm_vega$Vega$num(1)),
									_1: {ctor: '[]'}
								}
							}
						},
						A4(
							_gicentre$elm_vega$Vega$axis,
							'yScale',
							_gicentre$elm_vega$Vega$SLeft,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axGrid(_gicentre$elm_vega$Vega$true),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axGridScale('xScale'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axLabels(_gicentre$elm_vega$Vega$false),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$axMaxExtent(
													_gicentre$elm_vega$Vega$vNum(0)),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$axMinExtent(
														_gicentre$elm_vega$Vega$vNum(0)),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$axTicks(_gicentre$elm_vega$Vega$false),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$axZIndex(
																_gicentre$elm_vega$Vega$num(0)),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}
									}
								}
							},
							_p3)))));
	};
	var mk = function (_p4) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Group,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mStyle(
						{
							ctor: '::',
							_0: 'cell',
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mEncode(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$enUpdate(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$maWidth(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vSignal('height'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maHeight(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vSignal('height'),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mGroup(
								{
									ctor: '::',
									_0: ti1,
									_1: {
										ctor: '::',
										_0: mk1(
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: ax1(
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$mark,
					_gicentre$elm_vega$Vega$Group,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mStyle(
							{
								ctor: '::',
								_0: 'cell',
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mName('concat_1_group'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enUpdate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maWidth(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vSignal('height'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maHeight(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vSignal('height'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mGroup(
										{
											ctor: '::',
											_0: ti2,
											_1: {
												ctor: '::',
												_0: ax2(
													{ctor: '[]'}),
												_1: {
													ctor: '::',
													_0: mk2(
														{ctor: '[]'}),
													_1: {ctor: '[]'}
												}
											}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					_p4)));
	};
	var sc = function (_p5) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'xScale',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scDomain(
							_gicentre$elm_vega$Vega$doNums(
								_gicentre$elm_vega$Vega$nums(
									{
										ctor: '::',
										_0: 0,
										_1: {
											ctor: '::',
											_0: 1,
											_1: {ctor: '[]'}
										}
									}))),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaHeight),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scReverse(_gicentre$elm_vega$Vega$true),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$true),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$scale,
					'yScale',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scDomain(
								_gicentre$elm_vega$Vega$doNums(
									_gicentre$elm_vega$Vega$nums(
										{
											ctor: '::',
											_0: 0,
											_1: {
												ctor: '::',
												_0: 1,
												_1: {ctor: '[]'}
											}
										}))),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaHeight),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$true),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$scale,
						'data_point_scale',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doData(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daDataset('pi_estimates'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daField(
													_gicentre$elm_vega$Vega$field('data')),
												_1: {ctor: '[]'}
											}
										})),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaHeight),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scReverse(_gicentre$elm_vega$Vega$true),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$true),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						},
						A3(
							_gicentre$elm_vega$Vega$scale,
							'pi_scale',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scDomain(
										_gicentre$elm_vega$Vega$doData(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daReferences(
													{
														ctor: '::',
														_0: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$daValues(
																_gicentre$elm_vega$Vega$vNums(
																	{
																		ctor: '::',
																		_0: 2,
																		_1: {
																			ctor: '::',
																			_0: 4,
																			_1: {ctor: '[]'}
																		}
																	})),
															_1: {ctor: '[]'}
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$daDataset('pi'),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$daField(
																		_gicentre$elm_vega$Vega$field('value')),
																	_1: {ctor: '[]'}
																}
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$daDataset('pi_estimates'),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$daField(
																			_gicentre$elm_vega$Vega$field('estimate')),
																		_1: {ctor: '[]'}
																	}
																},
																_1: {ctor: '[]'}
															}
														}
													}),
												_1: {ctor: '[]'}
											})),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaHeight),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$false),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							},
							_p5)))));
	};
	var lo = _gicentre$elm_vega$Vega$layout(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$loPadding(
				_gicentre$elm_vega$Vega$num(10)),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$loOffset(
					_gicentre$elm_vega$Vega$num(20)),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$loBounds(_gicentre$elm_vega$Vega$Full),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$loAlign(_gicentre$elm_vega$Vega$AlignAll),
						_1: {ctor: '[]'}
					}
				}
			}
		});
	var si = function (_p6) {
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_gicentre$elm_vega$Vega$signal,
				'num_points',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siValue(
						_gicentre$elm_vega$Vega$vNum(1000)),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siBind(
							_gicentre$elm_vega$Vega$iRange(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$inMin(10),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$inMax(5000),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$inStep(1),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$inDebounce(10),
												_1: {ctor: '[]'}
											}
										}
									}
								})),
						_1: {ctor: '[]'}
					}
				},
				_p6));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$transform,
				{
					ctor: '::',
					_0: A3(
						_gicentre$elm_vega$Vega$trSequence,
						_gicentre$elm_vega$Vega$num(1),
						_gicentre$elm_vega$Vega$num(50001),
						_gicentre$elm_vega$Vega$num(1)),
					_1: {
						ctor: '::',
						_0: A2(_gicentre$elm_vega$Vega$trFormula, 'random()', 'x'),
						_1: {
							ctor: '::',
							_0: A2(_gicentre$elm_vega$Vega$trFormula, 'random()', 'y'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$trFilter(
									_gicentre$elm_vega$Vega$expr('datum.data <= num_points')),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A2(
					_gicentre$elm_vega$Vega$data,
					'random_data',
					{ctor: '[]'})),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$Vega$transform,
					{
						ctor: '::',
						_0: A2(_gicentre$elm_vega$Vega$trFormula, '(datum.x * datum.x + datum.y * datum.y) < 1', 'is_inside'),
						_1: {
							ctor: '::',
							_0: A2(
								_gicentre$elm_vega$Vega$trWindow,
								{
									ctor: '::',
									_0: A3(
										_gicentre$elm_vega$Vega$wnAggOperation,
										_gicentre$elm_vega$Vega$Sum,
										_elm_lang$core$Maybe$Just(
											_gicentre$elm_vega$Vega$field('is_inside')),
										'num_inside'),
									_1: {ctor: '[]'}
								},
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: A2(_gicentre$elm_vega$Vega$trFormula, '4 * datum.num_inside / datum.data', 'estimate'),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(
						_gicentre$elm_vega$Vega$data,
						'pi_estimates',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$daSource('random_data'),
							_1: {ctor: '[]'}
						})),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$Vega$transform,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$trFilter(
								_gicentre$elm_vega$Vega$expr('datum.data == num_points')),
							_1: {
								ctor: '::',
								_0: A2(_gicentre$elm_vega$Vega$trFormula, 'datum.estimate', 'value'),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$Vega$data,
							'pi_estimate',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$daSource('pi_estimates'),
								_1: {ctor: '[]'}
							})),
					_1: {
						ctor: '::',
						_0: A3(
							_gicentre$elm_vega$Vega$dataFromRows,
							'pi',
							{ctor: '[]'},
							A2(
								_gicentre$elm_vega$Vega$dataRow,
								{
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'value',
										_1: _gicentre$elm_vega$Vega$vNum(3.141592653589793)
									},
									_1: {ctor: '[]'}
								},
								{ctor: '[]'})),
						_1: {ctor: '[]'}
					}
				}
			}
		});
	var cf = _gicentre$elm_vega$Vega$config(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$cfAxis,
				_gicentre$elm_vega$Vega$AxY,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axMinExtent(
						_gicentre$elm_vega$Vega$vNum(30)),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		});
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: cf,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$height(380),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$padding(5),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$autosize(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$APad,
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: ds,
							_1: {
								ctor: '::',
								_0: si(
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: sc(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: lo,
										_1: {
											ctor: '::',
											_0: mk(
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$GalleryInteraction$sourceExample = _gicentre$elm_vega$GalleryInteraction$interaction8;
var _gicentre$elm_vega$GalleryInteraction$view = function (spec) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$id('specSource'),
					_1: {ctor: '[]'}
				},
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$pre,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							A2(_elm_lang$core$Json_Encode$encode, 2, _gicentre$elm_vega$GalleryInteraction$sourceExample)),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _gicentre$elm_vega$GalleryInteraction$interaction7 = function () {
	var mk1 = function (_p7) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Line,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mFrom(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$srData(
								_gicentre$elm_vega$Vega$str('series')),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mEncode(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$enUpdate(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$maX(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vScale('xScale'),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vField(
														_gicentre$elm_vega$Vega$field('date')),
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maY(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vScale('yScale'),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vField(
															_gicentre$elm_vega$Vega$field('indexed_price')),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maStroke(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale('cScale'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$field('symbol')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maStrokeWidth(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(2),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}
										}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$mark,
					_gicentre$elm_vega$Vega$Text,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mFrom(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$srData(
									_gicentre$elm_vega$Vega$str('label')),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enUpdate(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maX(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vScale('xScale'),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vField(
															_gicentre$elm_vega$Vega$field('date')),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vOffset(
																_gicentre$elm_vega$Vega$vNum(2)),
															_1: {ctor: '[]'}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale('yScale'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$field('indexed_price')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFill(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale('cScale'),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$field('symbol')),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maText(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$field('symbol')),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maBaseline(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vMiddle,
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					},
					_p7)));
	};
	var ds1 = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$transform,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$trFilter(
						_gicentre$elm_vega$Vega$expr('datum.date == maxDate')),
					_1: {ctor: '[]'}
				},
				A2(
					_gicentre$elm_vega$Vega$data,
					'label',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$daSource('series'),
						_1: {ctor: '[]'}
					})),
			_1: {ctor: '[]'}
		});
	var mk = function (_p8) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Group,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mFrom(
						{
							ctor: '::',
							_0: A3(
								_gicentre$elm_vega$Vega$srFacet,
								_gicentre$elm_vega$Vega$str('indexed_stocks'),
								'series',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$faGroupBy(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$field('symbol'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mGroup(
							{
								ctor: '::',
								_0: ds1,
								_1: {
									ctor: '::',
									_0: mk1(
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$mark,
					_gicentre$elm_vega$Vega$Rule,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mEncode(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$enUpdate(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$maX(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vField(
													_gicentre$elm_vega$Vega$fGroup(
														_gicentre$elm_vega$Vega$field('xScale'))),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maX2(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vField(
														_gicentre$elm_vega$Vega$fGroup(
															_gicentre$elm_vega$Vega$field('width'))),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vNum(0.5),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vOffset(
																_gicentre$elm_vega$Vega$vObject(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vScale('yScale'),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vNum(0),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vRound(_gicentre$elm_vega$Vega$true),
																				_1: {ctor: '[]'}
																			}
																		}
																	})),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maStroke(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$black,
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maStrokeWidth(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(1),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					},
					A3(
						_gicentre$elm_vega$Vega$mark,
						_gicentre$elm_vega$Vega$Rule,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enUpdate(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maX(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vScale('xScale'),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vSignal('indexDate'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vOffset(
																_gicentre$elm_vega$Vega$vNum(0.5)),
															_1: {ctor: '[]'}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vNum(0),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY2(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fGroup(
																	_gicentre$elm_vega$Vega$field('height'))),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maStroke(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vStr('firebrick'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						A3(
							_gicentre$elm_vega$Vega$mark,
							_gicentre$elm_vega$Vega$Text,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enUpdate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maX(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale('xScale'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vSignal('indexDate'),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY2(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fGroup(
																	_gicentre$elm_vega$Vega$field('height'))),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vOffset(
																	_gicentre$elm_vega$Vega$vNum(15)),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maAlign(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$hCenter,
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maText(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vSignal('timeFormat(indexDate, \'%b %Y\')'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maFill(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vStr('firebrick'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							},
							_p8)))));
	};
	var ax = function (_p9) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'yScale',
				_gicentre$elm_vega$Vega$SLeft,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axGrid(_gicentre$elm_vega$Vega$true),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axFormat(
							_gicentre$elm_vega$Vega$str('%')),
						_1: {ctor: '[]'}
					}
				},
				_p9));
	};
	var sc = function (_p10) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'xScale',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScTime),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scDomain(
							_gicentre$elm_vega$Vega$doData(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$daDataset('stocks'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daField(
											_gicentre$elm_vega$Vega$field('date')),
										_1: {ctor: '[]'}
									}
								})),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaWidth),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$scale,
					'yScale',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scDomain(
								_gicentre$elm_vega$Vega$doData(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daDataset('indexed_stocks'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daField(
												_gicentre$elm_vega$Vega$field('indexed_price')),
											_1: {ctor: '[]'}
										}
									})),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$true),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaHeight),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$scale,
						'cScale',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScOrdinal),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doData(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daDataset('stocks'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daField(
													_gicentre$elm_vega$Vega$field('symbol')),
												_1: {ctor: '[]'}
											}
										})),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaCategory),
									_1: {ctor: '[]'}
								}
							}
						},
						_p10))));
	};
	var si = function (_p11) {
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_gicentre$elm_vega$Vega$signal,
				'indexDate',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siUpdate('time(\'Jan 1 2005\')'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siOn(
							{
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$Vega$evHandler,
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$esSelector(
											_gicentre$elm_vega$Vega$str('mousemove')),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$evUpdate('invert(\'xScale\', clamp(x(), 0, width))'),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$signal,
					'maxDate',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siUpdate('time(\'Mar 1 2010\')'),
						_1: {ctor: '[]'}
					},
					_p11)));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$data,
				'stocks',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$daUrl(
						_gicentre$elm_vega$Vega$str('https://vega.github.io/vega/data/stocks.csv')),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$daFormat(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$CSV,
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$parse(
										{
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'price', _1: _gicentre$elm_vega$Vega$FoNum},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'date',
													_1: _gicentre$elm_vega$Vega$foDate('')
												},
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$Vega$transform,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$trFilter(
							_gicentre$elm_vega$Vega$expr('month(datum.date) == month(indexDate) && year(datum.date) == year(indexDate)')),
						_1: {ctor: '[]'}
					},
					A2(
						_gicentre$elm_vega$Vega$data,
						'index',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$daSource('stocks'),
							_1: {ctor: '[]'}
						})),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$Vega$transform,
						{
							ctor: '::',
							_0: A4(
								_gicentre$elm_vega$Vega$trLookup,
								'index',
								_gicentre$elm_vega$Vega$field('symbol'),
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$field('symbol'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$luAs(
										{
											ctor: '::',
											_0: 'index',
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$luDefault(
											_gicentre$elm_vega$Vega$vObject(
												{
													ctor: '::',
													_0: A2(
														_gicentre$elm_vega$Vega$keyValue,
														'price',
														_gicentre$elm_vega$Vega$vNum(0)),
													_1: {ctor: '[]'}
												})),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(_gicentre$elm_vega$Vega$trFormula, 'datum.index.price > 0 ? (datum.price - datum.index.price)/datum.index.price : 0', 'indexed_price'),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$Vega$data,
							'indexed_stocks',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$daSource('stocks'),
								_1: {ctor: '[]'}
							})),
					_1: {ctor: '[]'}
				}
			}
		});
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$width(650),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$height(300),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$padding(5),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$autosize(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$AFit,
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$APadding,
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: ds,
							_1: {
								ctor: '::',
								_0: si(
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: sc(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: ax(
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: mk(
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$GalleryInteraction$interaction6 = function () {
	var mk = function (_p12) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Rect,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mName('xAxis'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$true),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enEnter(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maX(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(0),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maHeight(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vNum(35),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFill(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$transparent,
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maCursor(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$cursorValue(_gicentre$elm_vega$Vega$CEWResize),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enUpdate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vSignal('height'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maWidth(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vSignal('span(range(\'xScale\'))'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$mark,
					_gicentre$elm_vega$Vega$Rect,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enEnter(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maY(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(0),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maHeight(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vSignal('height'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFill(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vStr('#ddd'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enUpdate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maX(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vSignal('brush[0]'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maX2(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vSignal('brush[1]'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFillOpacity(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('domain ? 0.2 : 0'),
																_1: {ctor: '[]'}
															}),
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
					A3(
						_gicentre$elm_vega$Vega$mark,
						_gicentre$elm_vega$Vega$Symbol,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mName('marks'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mFrom(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$srData(
											_gicentre$elm_vega$Vega$str('source')),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$mEncode(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enUpdate(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maX(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vScale('xScale'),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vField(
																		_gicentre$elm_vega$Vega$field('Horsepower')),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maY(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vScale('yScale'),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vField(
																			_gicentre$elm_vega$Vega$field('Miles_per_Gallon')),
																		_1: {ctor: '[]'}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maShape(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$symbolValue(_gicentre$elm_vega$Vega$SymCircle),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maStrokeWidth(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vNum(2),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maOpacity(
																			{
																				ctor: '::',
																				_0: A3(
																					_gicentre$elm_vega$Vega$ifElse,
																					'(!domain || inrange(datum.Horsepower, domain)) && (!length(data(\'selected\')) || indata(\'selected\', \'value\', datum.Origin))',
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$vNum(0.7),
																						_1: {ctor: '[]'}
																					},
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$vNum(0.15),
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$maStroke(
																				{
																					ctor: '::',
																					_0: A3(
																						_gicentre$elm_vega$Vega$ifElse,
																						'(!domain || inrange(datum.Horsepower, domain)) && (!length(data(\'selected\')) || indata(\'selected\', \'value\', datum.Origin))',
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$vScale('cScale'),
																							_1: {
																								ctor: '::',
																								_0: _gicentre$elm_vega$Vega$vField(
																									_gicentre$elm_vega$Vega$field('Origin')),
																								_1: {ctor: '[]'}
																							}
																						},
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$vStr('#ccc'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$maFill(
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$transparent,
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}
														}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						A3(
							_gicentre$elm_vega$Vega$mark,
							_gicentre$elm_vega$Vega$Rect,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mName('brush'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mEncode(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$enEnter(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(0),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maHeight(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('height'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maFill(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$transparent,
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enUpdate(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maX(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('brush[0]'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maX2(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vSignal('brush[1]'),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}),
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
							},
							A3(
								_gicentre$elm_vega$Vega$mark,
								_gicentre$elm_vega$Vega$Rect,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$mEncode(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enEnter(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maY(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(0),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maHeight(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vSignal('height'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maWidth(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vNum(1),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maFill(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vStr('firebrick'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}
															}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$enUpdate(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maFillOpacity(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vSignal('domain ? 1 : 0'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maX(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vSignal('brush[0]'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}),
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}
								},
								A3(
									_gicentre$elm_vega$Vega$mark,
									_gicentre$elm_vega$Vega$Rect,
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$mEncode(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$enEnter(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maY(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vNum(0),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maHeight(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vSignal('height'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maWidth(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vNum(1),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maFill(
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vStr('firebrick'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$enUpdate(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maFillOpacity(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vSignal('domain ? 1 : 0'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maX(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vSignal('brush[1]'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {ctor: '[]'}
													}
												}),
											_1: {ctor: '[]'}
										}
									},
									_p12)))))));
	};
	var le = function (_p13) {
		return _gicentre$elm_vega$Vega$legends(
			A2(
				_gicentre$elm_vega$Vega$legend,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$leStroke('cScale'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$leTitle(
							_gicentre$elm_vega$Vega$str('Origin')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$leEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enSymbols(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$enName('legendSymbol'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enInteractive(_gicentre$elm_vega$Vega$true),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$enUpdate(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maFill(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$transparent,
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maStrokeWidth(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vNum(2),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maOpacity(
																		{
																			ctor: '::',
																			_0: A3(
																				_gicentre$elm_vega$Vega$ifElse,
																				'!length(data(\'selected\')) || indata(\'selected\', \'value\', datum.value)',
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$vNum(0.7),
																					_1: {ctor: '[]'}
																				},
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$vNum(0.15),
																					_1: {ctor: '[]'}
																				}),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maSize(
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vNum(64),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}),
													_1: {ctor: '[]'}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enLabels(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enName('legendLabel'),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$enInteractive(_gicentre$elm_vega$Vega$true),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$enUpdate(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maOpacity(
																	{
																		ctor: '::',
																		_0: A3(
																			_gicentre$elm_vega$Vega$ifElse,
																			'!length(data(\'selected\')) || indata(\'selected\', \'value\', datum.value)',
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vNum(1),
																				_1: {ctor: '[]'}
																			},
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vNum(0.25),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				_p13));
	};
	var ax = function (_p14) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'xScale',
				_gicentre$elm_vega$Vega$SBottom,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axTitle(
						_gicentre$elm_vega$Vega$str('Horsepower')),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axGrid(_gicentre$elm_vega$Vega$true),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axTickCount(
									_gicentre$elm_vega$Vega$num(5)),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A4(
					_gicentre$elm_vega$Vega$axis,
					'yScale',
					_gicentre$elm_vega$Vega$SLeft,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axTitle(
							_gicentre$elm_vega$Vega$str('Miles per gallon')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axGrid(_gicentre$elm_vega$Vega$true),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axTitlePadding(
										_gicentre$elm_vega$Vega$vNum(5)),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					_p14)));
	};
	var sc = function (_p15) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'xScale',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scRound(_gicentre$elm_vega$Vega$true),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$true),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scDomain(
										_gicentre$elm_vega$Vega$doData(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daDataset('source'),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daField(
														_gicentre$elm_vega$Vega$field('Horsepower')),
													_1: {ctor: '[]'}
												}
											})),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scRange(
											_gicentre$elm_vega$Vega$raNums(
												{
													ctor: '::',
													_0: 0,
													_1: {
														ctor: '::',
														_0: 200,
														_1: {ctor: '[]'}
													}
												})),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$scale,
					'yScale',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRound(_gicentre$elm_vega$Vega$true),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$true),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scDomain(
											_gicentre$elm_vega$Vega$doData(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daDataset('source'),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$daField(
															_gicentre$elm_vega$Vega$field('Miles_per_Gallon')),
														_1: {ctor: '[]'}
													}
												})),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$scRange(
												_gicentre$elm_vega$Vega$raNums(
													{
														ctor: '::',
														_0: 200,
														_1: {
															ctor: '::',
															_0: 0,
															_1: {ctor: '[]'}
														}
													})),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$scale,
						'cScale',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScOrdinal),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doData(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daDataset('source'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daField(
													_gicentre$elm_vega$Vega$field('Origin')),
												_1: {ctor: '[]'}
											}
										})),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scRange(
										A2(
											_gicentre$elm_vega$Vega$raScheme,
											_gicentre$elm_vega$Vega$str('category10'),
											{ctor: '[]'})),
									_1: {ctor: '[]'}
								}
							}
						},
						_p15))));
	};
	var si = function (_p16) {
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_gicentre$elm_vega$Vega$signal,
				'clear',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vTrue),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siOn(
							{
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$Vega$evHandler,
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$esSelector(
											_gicentre$elm_vega$Vega$str('mouseup[!event.item]')),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$evUpdate('true'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$evForce(_gicentre$elm_vega$Vega$true),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$signal,
					'shift',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vFalse),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siOn(
								{
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$Vega$evHandler,
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$esSelector(
												_gicentre$elm_vega$Vega$str('@legendSymbol:click, @legendLabel:click')),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$evUpdate('event.shiftKey'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$evForce(_gicentre$elm_vega$Vega$true),
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$signal,
						'clicked',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vNull),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$siOn(
									{
										ctor: '::',
										_0: A2(
											_gicentre$elm_vega$Vega$evHandler,
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$esSelector(
													_gicentre$elm_vega$Vega$str('@legendSymbol:click, @legendLabel:click')),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$evUpdate('{value: datum.value}'),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$evForce(_gicentre$elm_vega$Vega$true),
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						},
						A3(
							_gicentre$elm_vega$Vega$signal,
							'brush',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$siValue(
									_gicentre$elm_vega$Vega$vNum(0)),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$siOn(
										{
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$Vega$evHandler,
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$esSignal('clear'),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$evUpdate('clear ? [0, 0] : brush'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_gicentre$elm_vega$Vega$evHandler,
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$esSelector(
															_gicentre$elm_vega$Vega$str('@xAxis:mousedown')),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$evUpdate('[x(), x()]'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_gicentre$elm_vega$Vega$evHandler,
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$esSelector(
																_gicentre$elm_vega$Vega$str('[@xAxis:mousedown, window:mouseup] > window:mousemove!')),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$evUpdate('[brush[0], clamp(x(), 0, width)]'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_gicentre$elm_vega$Vega$evHandler,
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$esSignal('delta'),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$evUpdate('clampRange([anchor[0] + delta, anchor[1] + delta], 0, width)'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}
							},
							A3(
								_gicentre$elm_vega$Vega$signal,
								'anchor',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vNull),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$siOn(
											{
												ctor: '::',
												_0: A2(
													_gicentre$elm_vega$Vega$evHandler,
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$esSelector(
															_gicentre$elm_vega$Vega$str('@brush:mousedown')),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$evUpdate('slice(brush)'),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								},
								A3(
									_gicentre$elm_vega$Vega$signal,
									'xDown',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$siValue(
											_gicentre$elm_vega$Vega$vNum(0)),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$siOn(
												{
													ctor: '::',
													_0: A2(
														_gicentre$elm_vega$Vega$evHandler,
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$esSelector(
																_gicentre$elm_vega$Vega$str('@brush:mousedown')),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$evUpdate('x()'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									},
									A3(
										_gicentre$elm_vega$Vega$signal,
										'delta',
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$siValue(
												_gicentre$elm_vega$Vega$vNum(0)),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$siOn(
													{
														ctor: '::',
														_0: A2(
															_gicentre$elm_vega$Vega$evHandler,
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$esSelector(
																	_gicentre$elm_vega$Vega$str('[@brush:mousedown, window:mouseup] > window:mousemove!')),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$evUpdate('x() - xDown'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}
										},
										A3(
											_gicentre$elm_vega$Vega$signal,
											'domain',
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$siOn(
													{
														ctor: '::',
														_0: A2(
															_gicentre$elm_vega$Vega$evHandler,
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$esSignal('brush'),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$evUpdate('span(brush) ? invert(\'xScale\', brush) : null'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											},
											_p16)))))))));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$transform,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$trFilter(
						_gicentre$elm_vega$Vega$expr('datum[\'Horsepower\'] != null && datum[\'Miles_per_Gallon\'] != null && datum[\'Origin\'] != null')),
					_1: {ctor: '[]'}
				},
				A2(
					_gicentre$elm_vega$Vega$data,
					'source',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$daUrl(
							_gicentre$elm_vega$Vega$str('https://vega.github.io/vega/data/cars.json')),
						_1: {ctor: '[]'}
					})),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$Vega$data,
					'selected',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$daOn(
							{
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$Vega$trigger,
									'clear',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$tgRemoveAll,
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$Vega$trigger,
										'!shift',
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$tgRemoveAll,
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_gicentre$elm_vega$Vega$trigger,
											'!shift && clicked',
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$tgInsert('clicked'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$Vega$trigger,
												'shift && clicked',
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$tgToggle('clicked'),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$width(200),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$height(200),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$padding(5),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$autosize(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$APad,
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: ds,
							_1: {
								ctor: '::',
								_0: si(
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: sc(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: ax(
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: le(
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: mk(
													{ctor: '[]'}),
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
		});
}();
var _gicentre$elm_vega$GalleryInteraction$interaction5 = function () {
	var mk = function (_p17) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Text,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mEncode(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$enUpdate(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$maText(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$vSignal('currentYear'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$maX(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vNum(300),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maY(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(300),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maFill(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vStr('grey'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFillOpacity(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(0.25),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFontSize(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(100),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				A3(
					_gicentre$elm_vega$Vega$mark,
					_gicentre$elm_vega$Vega$Text,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mFrom(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$srData(
									_gicentre$elm_vega$Vega$str('country_timeline')),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enEnter(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maX(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale('xScale'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$field('fertility')),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vOffset(
																	_gicentre$elm_vega$Vega$vNum(5)),
																_1: {ctor: '[]'}
															}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale('yScale'),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$field('life_expect')),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFill(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vStr('#555'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maFillOpacity(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vNum(0.6),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maText(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vField(
																			_gicentre$elm_vega$Vega$field('year')),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$mark,
						_gicentre$elm_vega$Vega$Line,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mFrom(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$srData(
										_gicentre$elm_vega$Vega$str('country_timeline')),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enUpdate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maX(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale('xScale'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$field('fertility')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale('yScale'),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$field('life_expect')),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maStroke(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vStr('#bbb'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maStrokeWidth(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vNum(5),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maFillOpacity(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vNum(0.5),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						},
						A3(
							_gicentre$elm_vega$Vega$mark,
							_gicentre$elm_vega$Vega$Symbol,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mName('point'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mFrom(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$srData(
												_gicentre$elm_vega$Vega$str('interpolate')),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$mEncode(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enEnter(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFill(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vScale('cScale'),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vField(
																		_gicentre$elm_vega$Vega$field('this.cluster')),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maSize(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vNum(150),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$enUpdate(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maX(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vScale('xScale'),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vField(
																			_gicentre$elm_vega$Vega$field('inter_fertility')),
																		_1: {ctor: '[]'}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maY(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vScale('yScale'),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vField(
																				_gicentre$elm_vega$Vega$field('inter_life_expect')),
																			_1: {ctor: '[]'}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maFillOpacity(
																		{
																			ctor: '::',
																			_0: A3(
																				_gicentre$elm_vega$Vega$ifElse,
																				'datum.country==timeline.country || indata(\'trackCountries\', \'country\', datum.country)',
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$vNum(1),
																					_1: {ctor: '[]'}
																				},
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$vNum(0.5),
																					_1: {ctor: '[]'}
																				}),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}
															}
														}),
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}
								}
							},
							A3(
								_gicentre$elm_vega$Vega$mark,
								_gicentre$elm_vega$Vega$Text,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mFrom(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$srData(
												_gicentre$elm_vega$Vega$str('interpolate')),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$mEncode(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$enEnter(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maFill(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vStr('#333'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maFontSize(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vNum(14),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maFontWeight(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vStr('bold'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maText(
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vField(
																					_gicentre$elm_vega$Vega$field('country')),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$maAlign(
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$hCenter,
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$maBaseline(
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$vBottom,
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$enUpdate(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maX(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vScale('xScale'),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vField(
																				_gicentre$elm_vega$Vega$field('inter_fertility')),
																			_1: {ctor: '[]'}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maY(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vScale('yScale'),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vField(
																					_gicentre$elm_vega$Vega$field('inter_life_expect')),
																				_1: {
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$vOffset(
																						_gicentre$elm_vega$Vega$vNum(-7)),
																					_1: {ctor: '[]'}
																				}
																			}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maFillOpacity(
																			{
																				ctor: '::',
																				_0: A3(
																					_gicentre$elm_vega$Vega$ifElse,
																					'datum.country==timeline.country || indata(\'trackCountries\', \'country\', datum.country)',
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$vNum(0.8),
																						_1: {ctor: '[]'}
																					},
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$vNum(0),
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	}
																}
															}),
														_1: {ctor: '[]'}
													}
												}),
											_1: {ctor: '[]'}
										}
									}
								},
								_p17))))));
	};
	var le = function (_p18) {
		return _gicentre$elm_vega$Vega$legends(
			A2(
				_gicentre$elm_vega$Vega$legend,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$leFill('cScale'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$leTitle(
							_gicentre$elm_vega$Vega$str('Region')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$leOrient(_gicentre$elm_vega$Vega$Right),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$leEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enSymbols(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enEnter(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFillOpacity(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(0.5),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$enLabels(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$enUpdate(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maText(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vScale('lScale'),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vField(
																			_gicentre$elm_vega$Vega$field('value')),
																		_1: {ctor: '[]'}
																	}
																}),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				_p18));
	};
	var ax = function (_p19) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'xScale',
				_gicentre$elm_vega$Vega$SBottom,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axTitle(
						_gicentre$elm_vega$Vega$str('Fertility')),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axGrid(_gicentre$elm_vega$Vega$true),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axTickCount(
								_gicentre$elm_vega$Vega$num(5)),
							_1: {ctor: '[]'}
						}
					}
				},
				A4(
					_gicentre$elm_vega$Vega$axis,
					'yScale',
					_gicentre$elm_vega$Vega$SLeft,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axTitle(
							_gicentre$elm_vega$Vega$str('Life Expectancy')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axGrid(_gicentre$elm_vega$Vega$true),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axTickCount(
									_gicentre$elm_vega$Vega$num(5)),
								_1: {ctor: '[]'}
							}
						}
					},
					_p19)));
	};
	var sc = function (_p20) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'xScale',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scDomain(
								_gicentre$elm_vega$Vega$doData(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daDataset('gapminder'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daField(
												_gicentre$elm_vega$Vega$field('fertility')),
											_1: {ctor: '[]'}
										}
									})),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaWidth),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$scale,
					'yScale',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$false),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scDomain(
										_gicentre$elm_vega$Vega$doData(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daDataset('gapminder'),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daField(
														_gicentre$elm_vega$Vega$field('life_expect')),
													_1: {ctor: '[]'}
												}
											})),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaHeight),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$scale,
						'cScale',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScOrdinal),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doData(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daDataset('gapminder'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daField(
													_gicentre$elm_vega$Vega$field('cluster')),
												_1: {ctor: '[]'}
											}
										})),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaCategory),
									_1: {ctor: '[]'}
								}
							}
						},
						A3(
							_gicentre$elm_vega$Vega$scale,
							'lScale',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScOrdinal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scDomain(
										_gicentre$elm_vega$Vega$doData(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daDataset('clusters'),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daField(
														_gicentre$elm_vega$Vega$field('id')),
													_1: {ctor: '[]'}
												}
											})),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scRange(
											_gicentre$elm_vega$Vega$raData(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daDataset('clusters'),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$daField(
															_gicentre$elm_vega$Vega$field('name')),
														_1: {ctor: '[]'}
													}
												})),
										_1: {ctor: '[]'}
									}
								}
							},
							_p20)))));
	};
	var si = function (_p21) {
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_gicentre$elm_vega$Vega$signal,
				'minYear',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siValue(
						_gicentre$elm_vega$Vega$vNum(1955)),
					_1: {ctor: '[]'}
				},
				A3(
					_gicentre$elm_vega$Vega$signal,
					'maxYear',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siValue(
							_gicentre$elm_vega$Vega$vNum(2005)),
						_1: {ctor: '[]'}
					},
					A3(
						_gicentre$elm_vega$Vega$signal,
						'stepYear',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siValue(
								_gicentre$elm_vega$Vega$vNum(5)),
							_1: {ctor: '[]'}
						},
						A3(
							_gicentre$elm_vega$Vega$signal,
							'active',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$siValue(
									_gicentre$elm_vega$Vega$vObject(
										{ctor: '[]'})),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$siOn(
										{
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$Vega$evHandler,
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$esSelector(
														_gicentre$elm_vega$Vega$str('@point:mousedown, @point:touchstart')),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$evUpdate('datum'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_gicentre$elm_vega$Vega$evHandler,
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$esSelector(
															_gicentre$elm_vega$Vega$str('window:mouseup, window:touchend')),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$evUpdate(''),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
							},
							A3(
								_gicentre$elm_vega$Vega$signal,
								'isActive',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$siUpdate('active.country'),
									_1: {ctor: '[]'}
								},
								A3(
									_gicentre$elm_vega$Vega$signal,
									'timeline',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$siValue(
											_gicentre$elm_vega$Vega$vObject(
												{ctor: '[]'})),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$siOn(
												{
													ctor: '::',
													_0: A2(
														_gicentre$elm_vega$Vega$evHandler,
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$esSelector(
																_gicentre$elm_vega$Vega$str('@point:mouseover')),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? active : datum'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_gicentre$elm_vega$Vega$evHandler,
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$esSelector(
																	_gicentre$elm_vega$Vega$str('@point:mouseout')),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$evUpdate('active'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_gicentre$elm_vega$Vega$evHandler,
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$esSignal('active'),
																	_1: {ctor: '[]'}
																},
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$evUpdate('active'),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}
												}),
											_1: {ctor: '[]'}
										}
									},
									A3(
										_gicentre$elm_vega$Vega$signal,
										'tX',
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$siOn(
												{
													ctor: '::',
													_0: A2(
														_gicentre$elm_vega$Vega$evHandler,
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$esSelector(
																_gicentre$elm_vega$Vega$str('mousemove!, touchmove!')),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? scale(\'xScale\', active.this.fertility) : tX'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										},
										A3(
											_gicentre$elm_vega$Vega$signal,
											'tY',
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$siOn(
													{
														ctor: '::',
														_0: A2(
															_gicentre$elm_vega$Vega$evHandler,
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$esSelector(
																	_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? scale(\'yScale\', active.this.life_expect) : tY'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											},
											A3(
												_gicentre$elm_vega$Vega$signal,
												'pX',
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$siOn(
														{
															ctor: '::',
															_0: A2(
																_gicentre$elm_vega$Vega$evHandler,
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$esSelector(
																		_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																	_1: {ctor: '[]'}
																},
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? scale(\'xScale\', active.prev.fertility) : pX'),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												},
												A3(
													_gicentre$elm_vega$Vega$signal,
													'pY',
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$siOn(
															{
																ctor: '::',
																_0: A2(
																	_gicentre$elm_vega$Vega$evHandler,
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$esSelector(
																			_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																		_1: {ctor: '[]'}
																	},
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? scale(\'yScale\', active.prev.life_expect) : pY'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													},
													A3(
														_gicentre$elm_vega$Vega$signal,
														'nX',
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$siOn(
																{
																	ctor: '::',
																	_0: A2(
																		_gicentre$elm_vega$Vega$evHandler,
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$esSelector(
																				_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																			_1: {ctor: '[]'}
																		},
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? scale(\'xScale\', active.next.fertility) : nX'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														},
														A3(
															_gicentre$elm_vega$Vega$signal,
															'nY',
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$siOn(
																	{
																		ctor: '::',
																		_0: A2(
																			_gicentre$elm_vega$Vega$evHandler,
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$esSelector(
																					_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																				_1: {ctor: '[]'}
																			},
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? scale(\'yScale\', active.next.life_expect) : nY'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															},
															A3(
																_gicentre$elm_vega$Vega$signal,
																'thisDist',
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$siValue(
																		_gicentre$elm_vega$Vega$vNum(0)),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$siOn(
																			{
																				ctor: '::',
																				_0: A2(
																					_gicentre$elm_vega$Vega$evHandler,
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$esSelector(
																							_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																						_1: {ctor: '[]'}
																					},
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? sqrt(pow(x()-tX, 2) + pow(y()-tY, 2)) : thisDist'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	}
																},
																A3(
																	_gicentre$elm_vega$Vega$signal,
																	'prevDist',
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$siValue(
																			_gicentre$elm_vega$Vega$vNum(0)),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$siOn(
																				{
																					ctor: '::',
																					_0: A2(
																						_gicentre$elm_vega$Vega$evHandler,
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$esSelector(
																								_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																							_1: {ctor: '[]'}
																						},
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? sqrt(pow(x()-pX, 2) + pow(y()-pY, 2)): prevDist'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {ctor: '[]'}
																				}),
																			_1: {ctor: '[]'}
																		}
																	},
																	A3(
																		_gicentre$elm_vega$Vega$signal,
																		'nextDist',
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$siValue(
																				_gicentre$elm_vega$Vega$vNum(0)),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$siOn(
																					{
																						ctor: '::',
																						_0: A2(
																							_gicentre$elm_vega$Vega$evHandler,
																							{
																								ctor: '::',
																								_0: _gicentre$elm_vega$Vega$esSelector(
																									_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																								_1: {ctor: '[]'}
																							},
																							{
																								ctor: '::',
																								_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? sqrt(pow(x()-nX, 2) + pow(y()-nY, 2)) : nextDist'),
																								_1: {ctor: '[]'}
																							}),
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			}
																		},
																		A3(
																			_gicentre$elm_vega$Vega$signal,
																			'prevScore',
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$siValue(
																					_gicentre$elm_vega$Vega$vNum(0)),
																				_1: {
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$siOn(
																						{
																							ctor: '::',
																							_0: A2(
																								_gicentre$elm_vega$Vega$evHandler,
																								{
																									ctor: '::',
																									_0: _gicentre$elm_vega$Vega$esSelector(
																										_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																									_1: {ctor: '[]'}
																								},
																								{
																									ctor: '::',
																									_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? ((pX-tX) * (x()-tX) + (pY-tY) * (y()-tY))/prevDist || -999999 : prevScore'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {ctor: '[]'}
																						}),
																					_1: {ctor: '[]'}
																				}
																			},
																			A3(
																				_gicentre$elm_vega$Vega$signal,
																				'nextScore',
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$siValue(
																						_gicentre$elm_vega$Vega$vNum(0)),
																					_1: {
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$siOn(
																							{
																								ctor: '::',
																								_0: A2(
																									_gicentre$elm_vega$Vega$evHandler,
																									{
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$esSelector(
																											_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																										_1: {ctor: '[]'}
																									},
																									{
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? ((nX-tX) * (x()-tX) + (nY-tY) * (y()-tY))/nextDist || -999999 : nextScore'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {ctor: '[]'}
																							}),
																						_1: {ctor: '[]'}
																					}
																				},
																				A3(
																					_gicentre$elm_vega$Vega$signal,
																					'interYear',
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$siValue(
																							_gicentre$elm_vega$Vega$vNum(1980)),
																						_1: {
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$siOn(
																								{
																									ctor: '::',
																									_0: A2(
																										_gicentre$elm_vega$Vega$evHandler,
																										{
																											ctor: '::',
																											_0: _gicentre$elm_vega$Vega$esSelector(
																												_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																											_1: {ctor: '[]'}
																										},
																										{
																											ctor: '::',
																											_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? (min(maxYear, currentYear+5, max(minYear, currentYear-5, prevScore > nextScore ? (currentYear - 2.5*prevScore/sqrt(pow(pX-tX, 2) + pow(pY-tY, 2))) : (currentYear + 2.5*nextScore/sqrt(pow(nX-tX, 2) + pow(nY-tY, 2)))))) : interYear'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {ctor: '[]'}
																								}),
																							_1: {ctor: '[]'}
																						}
																					},
																					A3(
																						_gicentre$elm_vega$Vega$signal,
																						'currentYear',
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$siValue(
																								_gicentre$elm_vega$Vega$vNum(1980)),
																							_1: {
																								ctor: '::',
																								_0: _gicentre$elm_vega$Vega$siOn(
																									{
																										ctor: '::',
																										_0: A2(
																											_gicentre$elm_vega$Vega$evHandler,
																											{
																												ctor: '::',
																												_0: _gicentre$elm_vega$Vega$esSelector(
																													_gicentre$elm_vega$Vega$str('mousemove, touchmove')),
																												_1: {ctor: '[]'}
																											},
																											{
																												ctor: '::',
																												_0: _gicentre$elm_vega$Vega$evUpdate('isActive ? (min(maxYear, max(minYear, prevScore > nextScore ? (thisDist < prevDist ? currentYear : currentYear-5) : (thisDist < nextDist ? currentYear : currentYear+5)))) : currentYear'),
																												_1: {ctor: '[]'}
																											}),
																										_1: {ctor: '[]'}
																									}),
																								_1: {ctor: '[]'}
																							}
																						},
																						_p21))))))))))))))))))));
	};
	var table = function (_p22) {
		return A3(
			_gicentre$elm_vega$Vega$dataFromColumns,
			'clusters',
			{ctor: '[]'},
			A3(
				_gicentre$elm_vega$Vega$dataColumn,
				'id',
				_gicentre$elm_vega$Vega$vNums(
					{
						ctor: '::',
						_0: 0,
						_1: {
							ctor: '::',
							_0: 1,
							_1: {
								ctor: '::',
								_0: 2,
								_1: {
									ctor: '::',
									_0: 3,
									_1: {
										ctor: '::',
										_0: 4,
										_1: {
											ctor: '::',
											_0: 5,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}),
				A3(
					_gicentre$elm_vega$Vega$dataColumn,
					'name',
					_gicentre$elm_vega$Vega$vStrs(
						{
							ctor: '::',
							_0: 'South Asia',
							_1: {
								ctor: '::',
								_0: 'Europe & Cental Asia',
								_1: {
									ctor: '::',
									_0: 'Sub-Saharan Africa',
									_1: {
										ctor: '::',
										_0: 'America',
										_1: {
											ctor: '::',
											_0: 'East Asia & Pacific',
											_1: {
												ctor: '::',
												_0: 'Middle East & North Africa',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}),
					_p22)));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$data,
				'gapminder',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$daUrl(
						_gicentre$elm_vega$Vega$str('https://vega.github.io/vega/data/gapminder.json')),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: table(
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$Vega$transform,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$trFilter(
								_gicentre$elm_vega$Vega$expr('timeline && datum.country == timeline.country')),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$trCollect(
									{
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: _gicentre$elm_vega$Vega$field('year'),
											_1: _gicentre$elm_vega$Vega$Ascend
										},
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$Vega$data,
							'country_timeline',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$daSource('gapminder'),
								_1: {ctor: '[]'}
							})),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$Vega$transform,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$trFilter(
									_gicentre$elm_vega$Vega$expr('datum.year == currentYear')),
								_1: {ctor: '[]'}
							},
							A2(
								_gicentre$elm_vega$Vega$data,
								'thisYear',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$daSource('gapminder'),
									_1: {ctor: '[]'}
								})),
						_1: {
							ctor: '::',
							_0: A2(
								_gicentre$elm_vega$Vega$transform,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$trFilter(
										_gicentre$elm_vega$Vega$expr('datum.year == currentYear - stepYear')),
									_1: {ctor: '[]'}
								},
								A2(
									_gicentre$elm_vega$Vega$data,
									'prevYear',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daSource('gapminder'),
										_1: {ctor: '[]'}
									})),
							_1: {
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$Vega$transform,
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$trFilter(
											_gicentre$elm_vega$Vega$expr('datum.year == currentYear + stepYear')),
										_1: {ctor: '[]'}
									},
									A2(
										_gicentre$elm_vega$Vega$data,
										'nextYear',
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daSource('gapminder'),
											_1: {ctor: '[]'}
										})),
								_1: {
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$Vega$transform,
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$trAggregate(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$agGroupBy(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$field('country'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										},
										A2(
											_gicentre$elm_vega$Vega$data,
											'countries',
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daSource('gapminder'),
												_1: {ctor: '[]'}
											})),
									_1: {
										ctor: '::',
										_0: A2(
											_gicentre$elm_vega$Vega$transform,
											{
												ctor: '::',
												_0: A4(
													_gicentre$elm_vega$Vega$trLookup,
													'thisYear',
													_gicentre$elm_vega$Vega$field('country'),
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$field('country'),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$luAs(
															{
																ctor: '::',
																_0: 'this',
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$luDefault(
																_gicentre$elm_vega$Vega$vObject(
																	{ctor: '[]'})),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: A4(
														_gicentre$elm_vega$Vega$trLookup,
														'prevYear',
														_gicentre$elm_vega$Vega$field('country'),
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$field('country'),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$luAs(
																{
																	ctor: '::',
																	_0: 'prev',
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$luDefault(
																	_gicentre$elm_vega$Vega$vObject(
																		{ctor: '[]'})),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: A4(
															_gicentre$elm_vega$Vega$trLookup,
															'nextYear',
															_gicentre$elm_vega$Vega$field('country'),
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$field('country'),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$luAs(
																	{
																		ctor: '::',
																		_0: 'next',
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$luDefault(
																		_gicentre$elm_vega$Vega$vObject(
																			{ctor: '[]'})),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: A2(_gicentre$elm_vega$Vega$trFormula, 'interYear > currentYear ? datum.next.fertility : (datum.prev.fertility||datum.this.fertility)', 'target_fertility'),
															_1: {
																ctor: '::',
																_0: A2(_gicentre$elm_vega$Vega$trFormula, 'interYear > currentYear ? datum.next.life_expect : (datum.prev.life_expect||datum.this.life_expect)', 'target_life_expect'),
																_1: {
																	ctor: '::',
																	_0: A2(_gicentre$elm_vega$Vega$trFormula, 'interYear==2000 ? datum.this.fertility : datum.this.fertility + (datum.target_fertility-datum.this.fertility) * abs(interYear-datum.this.year)/5', 'inter_fertility'),
																	_1: {
																		ctor: '::',
																		_0: A2(_gicentre$elm_vega$Vega$trFormula, 'interYear==2000 ? datum.this.life_expect : datum.this.life_expect + (datum.target_life_expect-datum.this.life_expect) * abs(interYear-datum.this.year)/5', 'inter_life_expect'),
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											},
											A2(
												_gicentre$elm_vega$Vega$data,
												'interpolate',
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daSource('countries'),
													_1: {ctor: '[]'}
												})),
										_1: {
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$Vega$data,
												'trackCountries',
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daOn(
														{
															ctor: '::',
															_0: A2(
																_gicentre$elm_vega$Vega$trigger,
																'active',
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$tgToggle('{country: active.country}'),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		});
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$width(800),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$height(600),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$padding(5),
					_1: {
						ctor: '::',
						_0: ds,
						_1: {
							ctor: '::',
							_0: si(
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: sc(
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: ax(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: le(
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: mk(
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$GalleryInteraction$interaction4 = function () {
	var mk = function (_p23) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Symbol,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mFrom(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$srData(
								_gicentre$elm_vega$Vega$str('points')),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mClip(
							_gicentre$elm_vega$Vega$clEnabled(_gicentre$elm_vega$Vega$true)),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enEnter(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maFillOpacity(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(0.6),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maFill(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vStr('steelblue'),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enUpdate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maX(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale('xScale'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$field('u')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale('yScale'),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$field('v')),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maSize(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('size'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$enHover(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFill(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vStr('firebrick'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_gicentre$elm_vega$Vega$enCustom,
													'leave',
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFill(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vStr('steelblue'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: A2(
														_gicentre$elm_vega$Vega$enCustom,
														'select',
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maSize(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vSignal('size'),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vMultiply(
																			_gicentre$elm_vega$Vega$vNum(5)),
																		_1: {ctor: '[]'}
																	}
																}),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_gicentre$elm_vega$Vega$enCustom,
															'release',
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maSize(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vSignal('size'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				_p23));
	};
	var ax = function (_p24) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'xScale',
				_gicentre$elm_vega$Vega$STop,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axOffset(
						_gicentre$elm_vega$Vega$vSignal('xOffset')),
					_1: {ctor: '[]'}
				},
				A4(
					_gicentre$elm_vega$Vega$axis,
					'yScale',
					_gicentre$elm_vega$Vega$SRight,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axOffset(
							_gicentre$elm_vega$Vega$vSignal('yOffset')),
						_1: {ctor: '[]'}
					},
					_p24)));
	};
	var sc = function (_p25) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'xScale',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$false),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scDomain(
							_gicentre$elm_vega$Vega$doSignal('xDom')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(
								_gicentre$elm_vega$Vega$raSignal('xRange')),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$scale,
					'yScale',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$false),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scDomain(
								_gicentre$elm_vega$Vega$doSignal('yDom')),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scRange(
									_gicentre$elm_vega$Vega$raSignal('yRange')),
								_1: {ctor: '[]'}
							}
						}
					},
					_p25)));
	};
	var si = function (_p26) {
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_gicentre$elm_vega$Vega$signal,
				'margin',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siValue(
						_gicentre$elm_vega$Vega$vNum(20)),
					_1: {ctor: '[]'}
				},
				A3(
					_gicentre$elm_vega$Vega$signal,
					'hover',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siOn(
							{
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$Vega$evHandler,
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$esSelector(
											_gicentre$elm_vega$Vega$str('*:mouseover')),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$evEncode('hover'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$Vega$evHandler,
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$esSelector(
												_gicentre$elm_vega$Vega$str('*:mouseout')),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$evEncode('leave'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_gicentre$elm_vega$Vega$evHandler,
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$esSelector(
													_gicentre$elm_vega$Vega$str('*:mousedown')),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$evEncode('select'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$Vega$evHandler,
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$esSelector(
														_gicentre$elm_vega$Vega$str('*:mousup')),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$evEncode('release'),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					},
					A3(
						_gicentre$elm_vega$Vega$signal,
						'xOffset',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siUpdate('-(height + padding.bottom)'),
							_1: {ctor: '[]'}
						},
						A3(
							_gicentre$elm_vega$Vega$signal,
							'yOffset',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$siUpdate('-(width + padding.left)'),
								_1: {ctor: '[]'}
							},
							A3(
								_gicentre$elm_vega$Vega$signal,
								'xRange',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$siUpdate('[0, width]'),
									_1: {ctor: '[]'}
								},
								A3(
									_gicentre$elm_vega$Vega$signal,
									'yRange',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$siUpdate('[height, 0]'),
										_1: {ctor: '[]'}
									},
									A3(
										_gicentre$elm_vega$Vega$signal,
										'down',
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vNull),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$siOn(
													{
														ctor: '::',
														_0: A2(
															_gicentre$elm_vega$Vega$evHandler,
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$esSelector(
																	_gicentre$elm_vega$Vega$str('touchend')),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$evUpdate('null'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_gicentre$elm_vega$Vega$evHandler,
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$esSelector(
																		_gicentre$elm_vega$Vega$str('mousedown, touchstart')),
																	_1: {ctor: '[]'}
																},
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$evUpdate('xy()'),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}),
												_1: {ctor: '[]'}
											}
										},
										A3(
											_gicentre$elm_vega$Vega$signal,
											'xCur',
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vNull),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$siOn(
														{
															ctor: '::',
															_0: A2(
																_gicentre$elm_vega$Vega$evHandler,
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$esSelector(
																		_gicentre$elm_vega$Vega$str('mousedown, touchstart, touchend')),
																	_1: {ctor: '[]'}
																},
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$evUpdate('slice(xDom)'),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											},
											A3(
												_gicentre$elm_vega$Vega$signal,
												'yCur',
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vNull),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$siOn(
															{
																ctor: '::',
																_0: A2(
																	_gicentre$elm_vega$Vega$evHandler,
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$esSelector(
																			_gicentre$elm_vega$Vega$str('mousedown, touchstart, touchend')),
																		_1: {ctor: '[]'}
																	},
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$evUpdate('slice(yDom)'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												},
												A3(
													_gicentre$elm_vega$Vega$signal,
													'delta',
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$siValue(
															_gicentre$elm_vega$Vega$vNums(
																{
																	ctor: '::',
																	_0: 0,
																	_1: {
																		ctor: '::',
																		_0: 0,
																		_1: {ctor: '[]'}
																	}
																})),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$siOn(
																{
																	ctor: '::',
																	_0: A2(
																		_gicentre$elm_vega$Vega$evHandler,
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$esObject(
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$esSource(_gicentre$elm_vega$Vega$ESWindow),
																					_1: {
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$esType(_gicentre$elm_vega$Vega$MouseMove),
																						_1: {
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$esConsume(_gicentre$elm_vega$Vega$true),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_gicentre$elm_vega$Vega$esBetween,
																									{
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$esType(_gicentre$elm_vega$Vega$MouseDown),
																										_1: {ctor: '[]'}
																									},
																									{
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$esSource(_gicentre$elm_vega$Vega$ESWindow),
																										_1: {
																											ctor: '::',
																											_0: _gicentre$elm_vega$Vega$esType(_gicentre$elm_vega$Vega$MouseUp),
																											_1: {ctor: '[]'}
																										}
																									}),
																								_1: {ctor: '[]'}
																							}
																						}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$esObject(
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$esType(_gicentre$elm_vega$Vega$TouchMove),
																						_1: {
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$esConsume(_gicentre$elm_vega$Vega$true),
																							_1: {
																								ctor: '::',
																								_0: _gicentre$elm_vega$Vega$esFilter(
																									{
																										ctor: '::',
																										_0: 'event.touches.length === 1',
																										_1: {ctor: '[]'}
																									}),
																								_1: {ctor: '[]'}
																							}
																						}
																					}),
																				_1: {ctor: '[]'}
																			}
																		},
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$evUpdate('down ? [down[0]-x(), y()-down[1]] : [0,0]'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													},
													A3(
														_gicentre$elm_vega$Vega$signal,
														'anchor',
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$siValue(
																_gicentre$elm_vega$Vega$vNums(
																	{
																		ctor: '::',
																		_0: 0,
																		_1: {
																			ctor: '::',
																			_0: 0,
																			_1: {ctor: '[]'}
																		}
																	})),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$siOn(
																	{
																		ctor: '::',
																		_0: A2(
																			_gicentre$elm_vega$Vega$evHandler,
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$esObject(
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$esType(_gicentre$elm_vega$Vega$Wheel),
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			},
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$evUpdate('[invert(\'xScale\', x()), invert(\'yScale\', y())]'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_gicentre$elm_vega$Vega$evHandler,
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$esObject(
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$esType(_gicentre$elm_vega$Vega$TouchStart),
																							_1: {
																								ctor: '::',
																								_0: _gicentre$elm_vega$Vega$esFilter(
																									{
																										ctor: '::',
																										_0: 'event.touches.length===2',
																										_1: {ctor: '[]'}
																									}),
																								_1: {ctor: '[]'}
																							}
																						}),
																					_1: {ctor: '[]'}
																				},
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$evUpdate('[(xDom[0] + xDom[1]) / 2, (yDom[0] + yDom[1]) / 2]'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {ctor: '[]'}
																		}
																	}),
																_1: {ctor: '[]'}
															}
														},
														A3(
															_gicentre$elm_vega$Vega$signal,
															'zoom',
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$siValue(
																	_gicentre$elm_vega$Vega$vNum(1)),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$siOn(
																		{
																			ctor: '::',
																			_0: A2(
																				_gicentre$elm_vega$Vega$evHandler,
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$esObject(
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$esType(_gicentre$elm_vega$Vega$Wheel),
																							_1: {
																								ctor: '::',
																								_0: _gicentre$elm_vega$Vega$esConsume(_gicentre$elm_vega$Vega$true),
																								_1: {ctor: '[]'}
																							}
																						}),
																					_1: {ctor: '[]'}
																				},
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$evForce(_gicentre$elm_vega$Vega$true),
																					_1: {
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$evUpdate('pow(1.001, event.deltaY * pow(16, event.deltaMode))'),
																						_1: {ctor: '[]'}
																					}
																				}),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_gicentre$elm_vega$Vega$evHandler,
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$esSignal('dist2'),
																						_1: {ctor: '[]'}
																					},
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$evForce(_gicentre$elm_vega$Vega$true),
																						_1: {
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$evUpdate('dist1 / dist2'),
																							_1: {ctor: '[]'}
																						}
																					}),
																				_1: {ctor: '[]'}
																			}
																		}),
																	_1: {ctor: '[]'}
																}
															},
															A3(
																_gicentre$elm_vega$Vega$signal,
																'dist1',
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$siValue(
																		_gicentre$elm_vega$Vega$vNum(0)),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$siOn(
																			{
																				ctor: '::',
																				_0: A2(
																					_gicentre$elm_vega$Vega$evHandler,
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$esObject(
																							{
																								ctor: '::',
																								_0: _gicentre$elm_vega$Vega$esType(_gicentre$elm_vega$Vega$TouchStart),
																								_1: {
																									ctor: '::',
																									_0: _gicentre$elm_vega$Vega$esFilter(
																										{
																											ctor: '::',
																											_0: 'event.touches.length===2',
																											_1: {ctor: '[]'}
																										}),
																									_1: {ctor: '[]'}
																								}
																							}),
																						_1: {ctor: '[]'}
																					},
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$evUpdate('pinchDistance(event)'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_gicentre$elm_vega$Vega$evHandler,
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$esSignal('dist2'),
																							_1: {ctor: '[]'}
																						},
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$evUpdate('dist2'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {ctor: '[]'}
																				}
																			}),
																		_1: {ctor: '[]'}
																	}
																},
																A3(
																	_gicentre$elm_vega$Vega$signal,
																	'dist2',
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$siValue(
																			_gicentre$elm_vega$Vega$vNum(0)),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$siOn(
																				{
																					ctor: '::',
																					_0: A2(
																						_gicentre$elm_vega$Vega$evHandler,
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$esObject(
																								{
																									ctor: '::',
																									_0: _gicentre$elm_vega$Vega$esType(_gicentre$elm_vega$Vega$TouchMove),
																									_1: {
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$esConsume(_gicentre$elm_vega$Vega$true),
																										_1: {
																											ctor: '::',
																											_0: _gicentre$elm_vega$Vega$esFilter(
																												{
																													ctor: '::',
																													_0: 'event.touches.length===2',
																													_1: {ctor: '[]'}
																												}),
																											_1: {ctor: '[]'}
																										}
																									}
																								}),
																							_1: {ctor: '[]'}
																						},
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$evUpdate('pinchDistance(event)'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {ctor: '[]'}
																				}),
																			_1: {ctor: '[]'}
																		}
																	},
																	A3(
																		_gicentre$elm_vega$Vega$signal,
																		'xDom',
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$siUpdate('slice(xExt)'),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$siReact(_gicentre$elm_vega$Vega$false),
																				_1: {
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$siOn(
																						{
																							ctor: '::',
																							_0: A2(
																								_gicentre$elm_vega$Vega$evHandler,
																								{
																									ctor: '::',
																									_0: _gicentre$elm_vega$Vega$esSignal('delta'),
																									_1: {ctor: '[]'}
																								},
																								{
																									ctor: '::',
																									_0: _gicentre$elm_vega$Vega$evUpdate('[xCur[0] + span(xCur) * delta[0] / width, xCur[1] + span(xCur) * delta[0] / width]'),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_gicentre$elm_vega$Vega$evHandler,
																									{
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$esSignal('zoom'),
																										_1: {ctor: '[]'}
																									},
																									{
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$evUpdate('[anchor[0] + (xDom[0] - anchor[0]) * zoom, anchor[0] + (xDom[1] - anchor[0]) * zoom]'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {ctor: '[]'}
																							}
																						}),
																					_1: {ctor: '[]'}
																				}
																			}
																		},
																		A3(
																			_gicentre$elm_vega$Vega$signal,
																			'yDom',
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$siUpdate('slice(yExt)'),
																				_1: {
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$siReact(_gicentre$elm_vega$Vega$false),
																					_1: {
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$siOn(
																							{
																								ctor: '::',
																								_0: A2(
																									_gicentre$elm_vega$Vega$evHandler,
																									{
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$esSignal('delta'),
																										_1: {ctor: '[]'}
																									},
																									{
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$evUpdate('[yCur[0] + span(yCur) * delta[1] / height, yCur[1] + span(yCur) * delta[1] / height]'),
																										_1: {ctor: '[]'}
																									}),
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_gicentre$elm_vega$Vega$evHandler,
																										{
																											ctor: '::',
																											_0: _gicentre$elm_vega$Vega$esSignal('zoom'),
																											_1: {ctor: '[]'}
																										},
																										{
																											ctor: '::',
																											_0: _gicentre$elm_vega$Vega$evUpdate('[anchor[1] + (yDom[0] - anchor[1]) * zoom, anchor[1] + (yDom[1] - anchor[1]) * zoom]'),
																											_1: {ctor: '[]'}
																										}),
																									_1: {ctor: '[]'}
																								}
																							}),
																						_1: {ctor: '[]'}
																					}
																				}
																			},
																			A3(
																				_gicentre$elm_vega$Vega$signal,
																				'size',
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$siUpdate('clamp(20 / span(xDom), 1, 1000)'),
																					_1: {ctor: '[]'}
																				},
																				_p26))))))))))))))))));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$transform,
				{
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$Vega$trExtentAsSignal,
						_gicentre$elm_vega$Vega$field('u'),
						'xExt'),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$Vega$trExtentAsSignal,
							_gicentre$elm_vega$Vega$field('v'),
							'yExt'),
						_1: {ctor: '[]'}
					}
				},
				A2(
					_gicentre$elm_vega$Vega$data,
					'points',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$daUrl(
							_gicentre$elm_vega$Vega$str('https://vega.github.io/vega/data/normal-2d.json')),
						_1: {ctor: '[]'}
					})),
			_1: {ctor: '[]'}
		});
	var cf = _gicentre$elm_vega$Vega$config(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$cfAxis,
				_gicentre$elm_vega$Vega$AxAll,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axTickSize(
							_gicentre$elm_vega$Vega$num(3)),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axTickColor(
								_gicentre$elm_vega$Vega$str('#888')),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axLabelFont(
									_gicentre$elm_vega$Vega$str('Monaco, Courier New')),
								_1: {ctor: '[]'}
							}
						}
					}
				}),
			_1: {ctor: '[]'}
		});
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: cf,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$width(500),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$height(300),
					_1: {
						ctor: '::',
						_0: A4(_gicentre$elm_vega$Vega$paddings, 40, 10, 10, 20),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$autosize(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$ANone,
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: ds,
								_1: {
									ctor: '::',
									_0: si(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: sc(
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: ax(
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: mk(
													{ctor: '[]'}),
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
		});
}();
var _gicentre$elm_vega$GalleryInteraction$interaction3 = function () {
	var mk1 = function (_p27) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Symbol,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mFrom(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$srData(
								_gicentre$elm_vega$Vega$str('iris')),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enEnter(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maX(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vScaleField(
														_gicentre$elm_vega$Vega$fParent(
															_gicentre$elm_vega$Vega$field('xScale'))),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vField(
															_gicentre$elm_vega$Vega$fDatum(
																_gicentre$elm_vega$Vega$fParent(
																	_gicentre$elm_vega$Vega$field('x.data')))),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScaleField(
															_gicentre$elm_vega$Vega$fParent(
																_gicentre$elm_vega$Vega$field('yScale'))),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fDatum(
																	_gicentre$elm_vega$Vega$fParent(
																		_gicentre$elm_vega$Vega$field('y.data')))),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFillOpacity(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(0.5),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maSize(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(36),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enUpdate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maFill(
													{
														ctor: '::',
														_0: A3(
															_gicentre$elm_vega$Vega$ifElse,
															'!cell || inrange(datum[cell.datum.x.data], rangeX) && inrange(datum[cell.datum.y.data], rangeY)',
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vScale('cScale'),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vField(
																		_gicentre$elm_vega$Vega$field('species')),
																	_1: {ctor: '[]'}
																}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vStr('#ddd'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				_p27));
	};
	var mk = function (_p28) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Rect,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mEncode(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$enEnter(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$maFill(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$vStr('#eee'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$enUpdate(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$maOpacity(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vSignal('cell ? 1 : 0'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maX(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vSignal('cell ? cell.x + brushX[0] : 0'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maX2(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vSignal('cell ? cell.x + brushX[1] : 0'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vSignal('cell ? cell.y + brushY[0] : 0'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maY2(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('cell ? cell.y + brushY[1] : 0'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}),
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				},
				A3(
					_gicentre$elm_vega$Vega$mark,
					_gicentre$elm_vega$Vega$Group,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mName('cell'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mFrom(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$srData(
										_gicentre$elm_vega$Vega$str('cross')),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enEnter(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maX(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale('groupX'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$field('x.data')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale('groupY'),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$field('y.data')),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maWidth(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('chartSize'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maHeight(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vSignal('chartSize'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maFill(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$transparent,
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maStroke(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vStr('#ddd'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}
															}
														}
													}
												}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mGroup(
										{
											ctor: '::',
											_0: mk1(
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$mark,
						_gicentre$elm_vega$Vega$Rect,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mName('brush'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enEnter(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maFill(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$transparent,
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$enUpdate(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maX(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vSignal('cell ? cell.x + brushX[0] : 0'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maX2(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('cell ? cell.x + brushX[1] : 0'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maY(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vSignal('cell ? cell.y + brushY[0] : 0'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maY2(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vSignal('cell ? cell.y + brushY[1] : 0'),
																		_1: {ctor: '[]'}
																	}),
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
						},
						_p28))));
	};
	var le = function (_p29) {
		return _gicentre$elm_vega$Vega$legends(
			A2(
				_gicentre$elm_vega$Vega$legend,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$leFill('cScale'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$leTitle(
							_gicentre$elm_vega$Vega$str('Species')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$leOffset(
								_gicentre$elm_vega$Vega$vNum(0)),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$leEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enSymbols(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enUpdate(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFillOpacity(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(0.5),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maStroke(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$transparent,
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				_p29));
	};
	var ax = function (_p30) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'petalWidthY',
				_gicentre$elm_vega$Vega$SLeft,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axTitle(
						_gicentre$elm_vega$Vega$str('Petal Width')),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axPosition(
							_gicentre$elm_vega$Vega$vSignal('3 * chartStep')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axMinExtent(
								_gicentre$elm_vega$Vega$vNum(25)),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axTickCount(
									_gicentre$elm_vega$Vega$num(5)),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				},
				A4(
					_gicentre$elm_vega$Vega$axis,
					'petalLengthY',
					_gicentre$elm_vega$Vega$SLeft,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axTitle(
							_gicentre$elm_vega$Vega$str('Petal Length')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axPosition(
								_gicentre$elm_vega$Vega$vSignal('2 * chartStep')),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axMinExtent(
									_gicentre$elm_vega$Vega$vNum(25)),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axTickCount(
										_gicentre$elm_vega$Vega$num(5)),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					A4(
						_gicentre$elm_vega$Vega$axis,
						'sepalWidthY',
						_gicentre$elm_vega$Vega$SLeft,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axTitle(
								_gicentre$elm_vega$Vega$str('Sepal Width')),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axPosition(
									_gicentre$elm_vega$Vega$vSignal('1 * chartStep')),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axMinExtent(
										_gicentre$elm_vega$Vega$vNum(25)),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axTickCount(
											_gicentre$elm_vega$Vega$num(5)),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						},
						A4(
							_gicentre$elm_vega$Vega$axis,
							'sepalLengthY',
							_gicentre$elm_vega$Vega$SLeft,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axTitle(
									_gicentre$elm_vega$Vega$str('Sepal Length')),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axMinExtent(
										_gicentre$elm_vega$Vega$vNum(25)),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axTickCount(
											_gicentre$elm_vega$Vega$num(5)),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
											_1: {ctor: '[]'}
										}
									}
								}
							},
							A4(
								_gicentre$elm_vega$Vega$axis,
								'petalWidthX',
								_gicentre$elm_vega$Vega$SBottom,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axTitle(
										_gicentre$elm_vega$Vega$str('Petal Width')),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axOffset(
											_gicentre$elm_vega$Vega$vSignal('-chartPad')),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axTickCount(
												_gicentre$elm_vega$Vega$num(5)),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
												_1: {ctor: '[]'}
											}
										}
									}
								},
								A4(
									_gicentre$elm_vega$Vega$axis,
									'petalLengthX',
									_gicentre$elm_vega$Vega$SBottom,
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axTitle(
											_gicentre$elm_vega$Vega$str('Petal Length')),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axPosition(
												_gicentre$elm_vega$Vega$vSignal('1 * chartStep')),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$axOffset(
													_gicentre$elm_vega$Vega$vSignal('-chartPad')),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$axTickCount(
														_gicentre$elm_vega$Vega$num(5)),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
														_1: {ctor: '[]'}
													}
												}
											}
										}
									},
									A4(
										_gicentre$elm_vega$Vega$axis,
										'sepalWidthX',
										_gicentre$elm_vega$Vega$SBottom,
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axTitle(
												_gicentre$elm_vega$Vega$str('Sepal Width')),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$axPosition(
													_gicentre$elm_vega$Vega$vSignal('2 * chartStep')),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$axOffset(
														_gicentre$elm_vega$Vega$vSignal('-chartPad')),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$axTickCount(
															_gicentre$elm_vega$Vega$num(5)),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										},
										A4(
											_gicentre$elm_vega$Vega$axis,
											'sepalLengthX',
											_gicentre$elm_vega$Vega$SBottom,
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$axTitle(
													_gicentre$elm_vega$Vega$str('Sepal Length')),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$axPosition(
														_gicentre$elm_vega$Vega$vSignal('3 * chartStep')),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$axOffset(
															_gicentre$elm_vega$Vega$vSignal('-chartPad')),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$axTickCount(
																_gicentre$elm_vega$Vega$num(5)),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$axDomain(_gicentre$elm_vega$Vega$false),
																_1: {ctor: '[]'}
															}
														}
													}
												}
											},
											_p30)))))))));
	};
	var si = function (_p31) {
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_gicentre$elm_vega$Vega$signal,
				'chartSize',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siValue(
						_gicentre$elm_vega$Vega$vNum(120)),
					_1: {ctor: '[]'}
				},
				A3(
					_gicentre$elm_vega$Vega$signal,
					'chartPad',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siValue(
							_gicentre$elm_vega$Vega$vNum(15)),
						_1: {ctor: '[]'}
					},
					A3(
						_gicentre$elm_vega$Vega$signal,
						'chartStep',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siUpdate('chartSize + chartPad'),
							_1: {ctor: '[]'}
						},
						A3(
							_gicentre$elm_vega$Vega$signal,
							'width',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$siUpdate('chartStep * 4'),
								_1: {ctor: '[]'}
							},
							A3(
								_gicentre$elm_vega$Vega$signal,
								'height',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$siUpdate('chartStep * 4'),
									_1: {ctor: '[]'}
								},
								A3(
									_gicentre$elm_vega$Vega$signal,
									'cell',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vNull),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$siOn(
												{
													ctor: '::',
													_0: A2(
														_gicentre$elm_vega$Vega$evHandler,
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$esSelector(
																_gicentre$elm_vega$Vega$str('@cell:mousedown')),
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$evUpdate('group()'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_gicentre$elm_vega$Vega$evHandler,
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$esSelector(
																	_gicentre$elm_vega$Vega$str('@cell:mouseup')),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$evUpdate('!span(brushX) && !span(brushY) ? null : cell'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}),
											_1: {ctor: '[]'}
										}
									},
									A3(
										_gicentre$elm_vega$Vega$signal,
										'brushX',
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$siValue(
												_gicentre$elm_vega$Vega$vNum(0)),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$siOn(
													{
														ctor: '::',
														_0: A2(
															_gicentre$elm_vega$Vega$evHandler,
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$esSelector(
																	_gicentre$elm_vega$Vega$str('@cell:mousedown')),
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$evUpdate('[x(cell), x(cell)]'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: A2(
																_gicentre$elm_vega$Vega$evHandler,
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$esSelector(
																		_gicentre$elm_vega$Vega$str('[@cell:mousedown, window:mouseup] > window:mousemove')),
																	_1: {ctor: '[]'}
																},
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$evUpdate('[brushX[0], clamp(x(cell), 0, chartSize)]'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_gicentre$elm_vega$Vega$evHandler,
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$esSignal('delta'),
																		_1: {ctor: '[]'}
																	},
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$evUpdate('clampRange([anchorX[0] + delta[0], anchorX[1] + delta[0]], 0, chartSize)'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}),
												_1: {ctor: '[]'}
											}
										},
										A3(
											_gicentre$elm_vega$Vega$signal,
											'brushY',
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$siValue(
													_gicentre$elm_vega$Vega$vNum(0)),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$siOn(
														{
															ctor: '::',
															_0: A2(
																_gicentre$elm_vega$Vega$evHandler,
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$esSelector(
																		_gicentre$elm_vega$Vega$str('@cell:mousedown')),
																	_1: {ctor: '[]'}
																},
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$evUpdate('[y(cell), y(cell)]'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: A2(
																	_gicentre$elm_vega$Vega$evHandler,
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$esSelector(
																			_gicentre$elm_vega$Vega$str('[@cell:mousedown, window:mouseup] > window:mousemove')),
																		_1: {ctor: '[]'}
																	},
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$evUpdate('[brushY[0], clamp(y(cell), 0, chartSize)]'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_gicentre$elm_vega$Vega$evHandler,
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$esSignal('delta'),
																			_1: {ctor: '[]'}
																		},
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$evUpdate('clampRange([anchorY[0] + delta[1], anchorY[1] + delta[1]], 0, chartSize)'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}
															}
														}),
													_1: {ctor: '[]'}
												}
											},
											A3(
												_gicentre$elm_vega$Vega$signal,
												'down',
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$siValue(
														_gicentre$elm_vega$Vega$vNums(
															{
																ctor: '::',
																_0: 0,
																_1: {
																	ctor: '::',
																	_0: 0,
																	_1: {ctor: '[]'}
																}
															})),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$siOn(
															{
																ctor: '::',
																_0: A2(
																	_gicentre$elm_vega$Vega$evHandler,
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$esSelector(
																			_gicentre$elm_vega$Vega$str('@brush:mousedown')),
																		_1: {ctor: '[]'}
																	},
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$evUpdate('[x(cell), y(cell)]'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												},
												A3(
													_gicentre$elm_vega$Vega$signal,
													'anchorX',
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vNull),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$siOn(
																{
																	ctor: '::',
																	_0: A2(
																		_gicentre$elm_vega$Vega$evHandler,
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$esSelector(
																				_gicentre$elm_vega$Vega$str('@brush:mousedown')),
																			_1: {ctor: '[]'}
																		},
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$evUpdate('slice(brushX)'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													},
													A3(
														_gicentre$elm_vega$Vega$signal,
														'anchorY',
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vNull),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$siOn(
																	{
																		ctor: '::',
																		_0: A2(
																			_gicentre$elm_vega$Vega$evHandler,
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$esSelector(
																					_gicentre$elm_vega$Vega$str('@brush:mousedown')),
																				_1: {ctor: '[]'}
																			},
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$evUpdate('slice(brushY)'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														},
														A3(
															_gicentre$elm_vega$Vega$signal,
															'delta',
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$siValue(
																	_gicentre$elm_vega$Vega$vNums(
																		{
																			ctor: '::',
																			_0: 0,
																			_1: {
																				ctor: '::',
																				_0: 0,
																				_1: {ctor: '[]'}
																			}
																		})),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$siOn(
																		{
																			ctor: '::',
																			_0: A2(
																				_gicentre$elm_vega$Vega$evHandler,
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$esSelector(
																						_gicentre$elm_vega$Vega$str('[@brush:mousedown, window:mouseup] > window:mousemove')),
																					_1: {ctor: '[]'}
																				},
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$evUpdate('[x(cell) - down[0], y(cell) - down[1]]'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}
															},
															A3(
																_gicentre$elm_vega$Vega$signal,
																'rangeX',
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$siValue(
																		_gicentre$elm_vega$Vega$vNums(
																			{
																				ctor: '::',
																				_0: 0,
																				_1: {
																					ctor: '::',
																					_0: 0,
																					_1: {ctor: '[]'}
																				}
																			})),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$siOn(
																			{
																				ctor: '::',
																				_0: A2(
																					_gicentre$elm_vega$Vega$evHandler,
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$esSignal('brushX'),
																						_1: {ctor: '[]'}
																					},
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$evUpdate('invert(cell.datum.x.data + \'X\', brushX)'),
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	}
																},
																A3(
																	_gicentre$elm_vega$Vega$signal,
																	'rangeY',
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$siValue(
																			_gicentre$elm_vega$Vega$vNums(
																				{
																					ctor: '::',
																					_0: 0,
																					_1: {
																						ctor: '::',
																						_0: 0,
																						_1: {ctor: '[]'}
																					}
																				})),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$siOn(
																				{
																					ctor: '::',
																					_0: A2(
																						_gicentre$elm_vega$Vega$evHandler,
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$esSignal('brushY'),
																							_1: {ctor: '[]'}
																						},
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$evUpdate('invert(cell.datum.y.data + \'Y\', brushY)'),
																							_1: {ctor: '[]'}
																						}),
																					_1: {ctor: '[]'}
																				}),
																			_1: {ctor: '[]'}
																		}
																	},
																	A3(
																		_gicentre$elm_vega$Vega$signal,
																		'cursor',
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$siValue(
																				_gicentre$elm_vega$Vega$vStr('\'default\'')),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$siOn(
																					{
																						ctor: '::',
																						_0: A2(
																							_gicentre$elm_vega$Vega$evHandler,
																							{
																								ctor: '::',
																								_0: _gicentre$elm_vega$Vega$esSelector(
																									_gicentre$elm_vega$Vega$str('[@cell:mousedown, window:mouseup] > window:mousemove!')),
																								_1: {ctor: '[]'}
																							},
																							{
																								ctor: '::',
																								_0: _gicentre$elm_vega$Vega$evUpdate('\'nwse-resize\''),
																								_1: {ctor: '[]'}
																							}),
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_gicentre$elm_vega$Vega$evHandler,
																								{
																									ctor: '::',
																									_0: _gicentre$elm_vega$Vega$esSelector(
																										_gicentre$elm_vega$Vega$str('@brush:mousemove, [@brush:mousedown, window:mouseup] > window:mousemove!')),
																									_1: {ctor: '[]'}
																								},
																								{
																									ctor: '::',
																									_0: _gicentre$elm_vega$Vega$evUpdate('\'move\''),
																									_1: {ctor: '[]'}
																								}),
																							_1: {
																								ctor: '::',
																								_0: A2(
																									_gicentre$elm_vega$Vega$evHandler,
																									{
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$esSelector(
																											_gicentre$elm_vega$Vega$str('@brush:mouseout, window:mouseup')),
																										_1: {ctor: '[]'}
																									},
																									{
																										ctor: '::',
																										_0: _gicentre$elm_vega$Vega$evUpdate('\'default\''),
																										_1: {ctor: '[]'}
																									}),
																								_1: {ctor: '[]'}
																							}
																						}
																					}),
																				_1: {ctor: '[]'}
																			}
																		},
																		_p31))))))))))))))));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$data,
				'iris',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$daUrl(
						_gicentre$elm_vega$Vega$str('https://vega.github.io/vega/data/iris.json')),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$Vega$data,
					'fields',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$daValue(
							_gicentre$elm_vega$Vega$vStrs(
								{
									ctor: '::',
									_0: 'petalWidth',
									_1: {
										ctor: '::',
										_0: 'petalLength',
										_1: {
											ctor: '::',
											_0: 'sepalWidth',
											_1: {
												ctor: '::',
												_0: 'sepalLength',
												_1: {ctor: '[]'}
											}
										}
									}
								})),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$Vega$transform,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$trCross(
								{
									ctor: '::',
									_0: A2(_gicentre$elm_vega$Vega$crAs, 'x', 'y'),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: A2(_gicentre$elm_vega$Vega$trFormula, 'datum.x.data + \'X\'', 'xScale'),
								_1: {
									ctor: '::',
									_0: A2(_gicentre$elm_vega$Vega$trFormula, 'datum.y.data + \'Y\'', 'yScale'),
									_1: {ctor: '[]'}
								}
							}
						},
						A2(
							_gicentre$elm_vega$Vega$data,
							'cross',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$daSource('fields'),
								_1: {ctor: '[]'}
							})),
					_1: {ctor: '[]'}
				}
			}
		});
	var cf = _gicentre$elm_vega$Vega$config(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$cfAxis,
				_gicentre$elm_vega$Vega$AxAll,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axTickColor(
						_gicentre$elm_vega$Vega$str('#ccc')),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		});
	var scGenerator = F2(
		function ($var, dir) {
			var ra = _elm_lang$core$Native_Utils.eq(dir, 'X') ? _gicentre$elm_vega$Vega$raValues(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$vNum(0),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$vSignal('chartSize'),
						_1: {ctor: '[]'}
					}
				}) : _gicentre$elm_vega$Vega$raValues(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$vSignal('chartSize'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$vNum(0),
						_1: {ctor: '[]'}
					}
				});
			return A2(
				_gicentre$elm_vega$Vega$scale,
				A2(_elm_lang$core$Basics_ops['++'], $var, dir),
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$false),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(ra),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doData(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daDataset('iris'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daField(
													_gicentre$elm_vega$Vega$field($var)),
												_1: {ctor: '[]'}
											}
										})),
								_1: {ctor: '[]'}
							}
						}
					}
				});
		});
	var sc = function (_p32) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'groupX',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScBand),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaWidth),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scDomain(
								_gicentre$elm_vega$Vega$doData(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daDataset('fields'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daField(
												_gicentre$elm_vega$Vega$field('data')),
											_1: {ctor: '[]'}
										}
									})),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$scale,
					'groupY',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScBand),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(
								_gicentre$elm_vega$Vega$raValues(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$vSignal('height'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$vNum(0),
											_1: {ctor: '[]'}
										}
									})),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doData(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daDataset('fields'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daField(
													_gicentre$elm_vega$Vega$field('data')),
												_1: {ctor: '[]'}
											}
										})),
								_1: {ctor: '[]'}
							}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$scale,
						'cScale',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScOrdinal),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaCategory),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scDomain(
										_gicentre$elm_vega$Vega$doData(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daDataset('iris'),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daField(
														_gicentre$elm_vega$Vega$field('species')),
													_1: {ctor: '[]'}
												}
											})),
									_1: {ctor: '[]'}
								}
							}
						},
						A3(
							scGenerator,
							'petalWidth',
							'X',
							A3(
								scGenerator,
								'petalLength',
								'X',
								A3(
									scGenerator,
									'sepalWidth',
									'X',
									A3(
										scGenerator,
										'sepalLength',
										'X',
										A3(
											scGenerator,
											'petalWidth',
											'Y',
											A3(
												scGenerator,
												'petalLength',
												'Y',
												A3(
													scGenerator,
													'sepalWidth',
													'Y',
													A3(scGenerator, 'sepalLength', 'Y', _p32))))))))))));
	};
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: cf,
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$padding(10),
				_1: {
					ctor: '::',
					_0: ds,
					_1: {
						ctor: '::',
						_0: si(
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: sc(
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: ax(
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: le(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: mk(
											{ctor: '[]'}),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$GalleryInteraction$interaction2 = function () {
	var mk3 = function (_p33) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Area,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mFrom(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$srData(
									_gicentre$elm_vega$Vega$str('sp500')),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enUpdate(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maX(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vScale('xOverview'),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vField(
															_gicentre$elm_vega$Vega$field('date')),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale('yOverview'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$field('price')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY2(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale('yOverview'),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(0),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFill(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vStr('steelblue'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$mark,
					_gicentre$elm_vega$Vega$Rect,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mName('brush'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enEnter(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maY(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(0),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maHeight(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vNum(70),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFill(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vStr('#333'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFillOpacity(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(0.2),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enUpdate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maX(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vSignal('brush[0]'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maX2(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vSignal('brush[1]'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$mark,
						_gicentre$elm_vega$Vega$Rect,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enEnter(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vNum(0),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maHeight(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(70),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maWidth(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(1),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maFill(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vStr('firebrick'),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}
												}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$enUpdate(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maX(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vSignal('brush[0]'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}
						},
						A3(
							_gicentre$elm_vega$Vega$mark,
							_gicentre$elm_vega$Vega$Rect,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mEncode(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$enEnter(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(0),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maHeight(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(70),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maWidth(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vNum(1),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maFill(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vStr('firebrick'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enUpdate(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maX(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('brush[1]'),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
							},
							_p33)))));
	};
	var ax2 = function (_p34) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'xOverview',
				_gicentre$elm_vega$Vega$SBottom,
				{ctor: '[]'},
				_p34));
	};
	var sc2 = function (_p35) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'xOverview',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScTime),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaWidth),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scDomain(
								_gicentre$elm_vega$Vega$doData(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daDataset('sp500'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daField(
												_gicentre$elm_vega$Vega$field('date')),
											_1: {ctor: '[]'}
										}
									})),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$scale,
					'yOverview',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(
								_gicentre$elm_vega$Vega$raNums(
									{
										ctor: '::',
										_0: 70,
										_1: {
											ctor: '::',
											_0: 0,
											_1: {ctor: '[]'}
										}
									})),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doData(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daDataset('sp500'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daField(
													_gicentre$elm_vega$Vega$field('price')),
												_1: {ctor: '[]'}
											}
										})),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$true),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					_p35)));
	};
	var si1 = function (_p36) {
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_gicentre$elm_vega$Vega$signal,
				'brush',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siValue(
						_gicentre$elm_vega$Vega$vNum(0)),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siOn(
							{
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$Vega$evHandler,
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$esSelector(
											_gicentre$elm_vega$Vega$str('@overview:mousedown')),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$evUpdate('[x(), x()]'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$Vega$evHandler,
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$esSelector(
												_gicentre$elm_vega$Vega$str('[@overview:mousedown, window:mouseup] > window:mousemove!')),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$evUpdate('[brush[0], clamp(x(), 0, width)]'),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_gicentre$elm_vega$Vega$evHandler,
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$esSignal('delta'),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$evUpdate('clampRange([anchor[0] + delta, anchor[1] + delta], 0, width)'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$signal,
					'anchor',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siValue(_gicentre$elm_vega$Vega$vNull),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siOn(
								{
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$Vega$evHandler,
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$esSelector(
												_gicentre$elm_vega$Vega$str('@brush:mousedown')),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$evUpdate('slice(brush)'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$signal,
						'xDown',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siValue(
								_gicentre$elm_vega$Vega$vNum(0)),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$siOn(
									{
										ctor: '::',
										_0: A2(
											_gicentre$elm_vega$Vega$evHandler,
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$esSelector(
													_gicentre$elm_vega$Vega$str('@brush:mousedown')),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$evUpdate('x()'),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						},
						A3(
							_gicentre$elm_vega$Vega$signal,
							'delta',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$siValue(
									_gicentre$elm_vega$Vega$vNum(0)),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$siOn(
										{
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$Vega$evHandler,
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$esSelector(
														_gicentre$elm_vega$Vega$str('[@brush:mousedown, window:mouseup] > window:mousemove!')),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$evUpdate('x() - xDown'),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							},
							A3(
								_gicentre$elm_vega$Vega$signal,
								'detailDomain',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$siPushOuter,
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$siOn(
											{
												ctor: '::',
												_0: A2(
													_gicentre$elm_vega$Vega$evHandler,
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$esSignal('brush'),
														_1: {ctor: '[]'}
													},
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$evUpdate('span(brush) ? invert(\'xOverview\', brush) : null'),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								},
								_p36))))));
	};
	var mk2 = function (_p37) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Area,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mFrom(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$srData(
								_gicentre$elm_vega$Vega$str('sp500')),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mEncode(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$enUpdate(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$maX(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vScale('xDetail'),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vField(
														_gicentre$elm_vega$Vega$field('date')),
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maY(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vScale('yDetail'),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vField(
															_gicentre$elm_vega$Vega$field('price')),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY2(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale('yDetail'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(0),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFill(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vStr('steelblue'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}
										}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				},
				_p37));
	};
	var mk1 = function (_p38) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Group,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mEncode(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$enEnter(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$maHeight(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$vField(
												_gicentre$elm_vega$Vega$fGroup(
													_gicentre$elm_vega$Vega$field('height'))),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$maWidth(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vField(
													_gicentre$elm_vega$Vega$fGroup(
														_gicentre$elm_vega$Vega$field('width'))),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maGroupClip(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vTrue,
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mGroup(
							{
								ctor: '::',
								_0: mk2(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				},
				_p38));
	};
	var ax1 = function (_p39) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'xDetail',
				_gicentre$elm_vega$Vega$SBottom,
				{ctor: '[]'},
				A4(
					_gicentre$elm_vega$Vega$axis,
					'yDetail',
					_gicentre$elm_vega$Vega$SLeft,
					{ctor: '[]'},
					_p39)));
	};
	var sc1 = function (_p40) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'xDetail',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScTime),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaWidth),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scDomain(
								_gicentre$elm_vega$Vega$doData(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daDataset('sp500'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daField(
												_gicentre$elm_vega$Vega$field('date')),
											_1: {ctor: '[]'}
										}
									})),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomainRaw(
									_gicentre$elm_vega$Vega$vSignal('detailDomain')),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$scale,
					'yDetail',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(
								_gicentre$elm_vega$Vega$raNums(
									{
										ctor: '::',
										_0: 390,
										_1: {
											ctor: '::',
											_0: 0,
											_1: {ctor: '[]'}
										}
									})),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doData(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daDataset('sp500'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daField(
													_gicentre$elm_vega$Vega$field('price')),
												_1: {ctor: '[]'}
											}
										})),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$NTrue),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scZero(_gicentre$elm_vega$Vega$true),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					_p40)));
	};
	var mk = function (_p41) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Group,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mName('detail'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mEncode(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$enEnter(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$maHeight(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vNum(390),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maWidth(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(720),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mGroup(
								{
									ctor: '::',
									_0: sc1(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: ax1(
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: mk1(
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$mark,
					_gicentre$elm_vega$Vega$Group,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mName('overview'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enEnter(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maX(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(0),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vNum(430),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maHeight(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(70),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maWidth(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(720),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maFill(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$transparent,
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}
												}
											}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mGroup(
									{
										ctor: '::',
										_0: si1(
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: sc2(
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: ax2(
													{ctor: '[]'}),
												_1: {
													ctor: '::',
													_0: mk3(
														{ctor: '[]'}),
													_1: {ctor: '[]'}
												}
											}
										}
									}),
								_1: {ctor: '[]'}
							}
						}
					},
					_p41)));
	};
	var si = function (_p42) {
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_gicentre$elm_vega$Vega$signal,
				'detailDomain',
				{ctor: '[]'},
				_p42));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$data,
				'sp500',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$daUrl(
						_gicentre$elm_vega$Vega$str('https://vega.github.io/vega/data/sp500.csv')),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$daFormat(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$CSV,
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$parse(
										{
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'price', _1: _gicentre$elm_vega$Vega$FoNum},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'date',
													_1: _gicentre$elm_vega$Vega$foDate('')
												},
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {ctor: '[]'}
		});
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$width(720),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$height(480),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$padding(5),
					_1: {
						ctor: '::',
						_0: ds,
						_1: {
							ctor: '::',
							_0: si(
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: mk(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$GalleryInteraction$interaction1 = function () {
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$transform,
				{
					ctor: '::',
					_0: A3(
						_gicentre$elm_vega$Vega$trBin,
						_gicentre$elm_vega$Vega$field('delay'),
						_gicentre$elm_vega$Vega$numSignal('delayExtent'),
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$bnStep(
								_gicentre$elm_vega$Vega$numSignal('delayStep')),
							_1: {
								ctor: '::',
								_0: A2(_gicentre$elm_vega$Vega$bnAs, 'delay0', 'delay1'),
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: A3(
							_gicentre$elm_vega$Vega$trBin,
							_gicentre$elm_vega$Vega$field('time'),
							_gicentre$elm_vega$Vega$numSignal('timeExtent'),
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$bnStep(
									_gicentre$elm_vega$Vega$numSignal('timeStep')),
								_1: {
									ctor: '::',
									_0: A2(_gicentre$elm_vega$Vega$bnAs, 'time0', 'time1'),
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: A3(
								_gicentre$elm_vega$Vega$trBin,
								_gicentre$elm_vega$Vega$field('distance'),
								_gicentre$elm_vega$Vega$numSignal('distanceExtent'),
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$bnStep(
										_gicentre$elm_vega$Vega$numSignal('distanceStep')),
									_1: {
										ctor: '::',
										_0: A2(_gicentre$elm_vega$Vega$bnAs, 'distance0', 'distance1'),
										_1: {ctor: '[]'}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$Vega$trCrossFilterAsSignal,
									{
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: _gicentre$elm_vega$Vega$field('delay'),
											_1: _gicentre$elm_vega$Vega$numSignal('delayRange')
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: _gicentre$elm_vega$Vega$field('time'),
												_1: _gicentre$elm_vega$Vega$numSignal('timeRange')
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: _gicentre$elm_vega$Vega$field('distance'),
													_1: _gicentre$elm_vega$Vega$numSignal('distanceRange')
												},
												_1: {ctor: '[]'}
											}
										}
									},
									'xFilter'),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A2(
					_gicentre$elm_vega$Vega$data,
					'flights',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$daUrl(
							_gicentre$elm_vega$Vega$str('https://vega.github.io/vega/data/flights-200k.json')),
						_1: {ctor: '[]'}
					})),
			_1: {ctor: '[]'}
		});
	var mkGenerator = function (core) {
		var titleText = function () {
			var _p43 = core;
			switch (_p43) {
				case 'delay':
					return _gicentre$elm_vega$Vega$vStr('Arrival Delay (min)');
				case 'time':
					return _gicentre$elm_vega$Vega$vStr('Local Departure Time (hour)');
				default:
					return _gicentre$elm_vega$Vega$vStr('Travel Distance (miles)');
			}
		}();
		return function (_p44) {
			return _gicentre$elm_vega$Vega$marks(
				A3(
					_gicentre$elm_vega$Vega$mark,
					_gicentre$elm_vega$Vega$Rect,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mName(
							A2(_elm_lang$core$Basics_ops['++'], core, 'Brush')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mEncode(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$enEnter(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maY(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(0),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maHeight(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vSignal('chartHeight'),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFill(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vStr('#fcfcfc'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enUpdate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maX(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vSignal(
															A2(
																_elm_lang$core$Basics_ops['++'],
																'scale(\'',
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	core,
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		'Scale\', ',
																		A2(_elm_lang$core$Basics_ops['++'], core, 'Range[0])'))))),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maX2(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vSignal(
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	'scale(\'',
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		core,
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			'Scale\', ',
																			A2(_elm_lang$core$Basics_ops['++'], core, 'Range[1])'))))),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$mark,
						_gicentre$elm_vega$Vega$Rect,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mFrom(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$srData(
											_gicentre$elm_vega$Vega$str(
												A2(_elm_lang$core$Basics_ops['++'], core, '-bins'))),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mEncode(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$enEnter(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFill(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vStr('steelblue'),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enUpdate(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maX(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vScale(
																	A2(_elm_lang$core$Basics_ops['++'], core, 'Scale')),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vField(
																		_gicentre$elm_vega$Vega$field(
																			A2(_elm_lang$core$Basics_ops['++'], core, '0'))),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maX2(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vScale(
																		A2(_elm_lang$core$Basics_ops['++'], core, 'Scale')),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vField(
																			_gicentre$elm_vega$Vega$field(
																				A2(_elm_lang$core$Basics_ops['++'], core, '1'))),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vOffset(
																				_gicentre$elm_vega$Vega$vNum(-1)),
																			_1: {ctor: '[]'}
																		}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maY(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vScale('yScale'),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vField(
																				_gicentre$elm_vega$Vega$field('count')),
																			_1: {ctor: '[]'}
																		}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maY2(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vScale('yScale'),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vNum(0),
																				_1: {ctor: '[]'}
																			}
																		}),
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
						},
						A3(
							_gicentre$elm_vega$Vega$mark,
							_gicentre$elm_vega$Vega$Rect,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mEncode(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$enEnter(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(0),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maHeight(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('chartHeight'),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maFill(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vStr('firebrick'),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enUpdate(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maX(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal(
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		'scale(\'',
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			core,
																			A2(
																				_elm_lang$core$Basics_ops['++'],
																				'Scale\', ',
																				A2(_elm_lang$core$Basics_ops['++'], core, 'Range[0])'))))),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maWidth(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vNum(1),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}),
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
							},
							A3(
								_gicentre$elm_vega$Vega$mark,
								_gicentre$elm_vega$Vega$Rect,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$mEncode(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enEnter(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maY(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(0),
																_1: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maHeight(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vSignal('chartHeight'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maFill(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vStr('firebrick'),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$enUpdate(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maX(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vSignal(
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			'scale(\'',
																			A2(
																				_elm_lang$core$Basics_ops['++'],
																				core,
																				A2(
																					_elm_lang$core$Basics_ops['++'],
																					'Scale\', ',
																					A2(_elm_lang$core$Basics_ops['++'], core, 'Range[1])'))))),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maWidth(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vNum(1),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														}),
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									}
								},
								A3(
									_gicentre$elm_vega$Vega$mark,
									_gicentre$elm_vega$Vega$Text,
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$mInteractive(_gicentre$elm_vega$Vega$false),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$mEncode(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$enEnter(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maY(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vNum(-5),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maText(
																	{
																		ctor: '::',
																		_0: titleText,
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maBaseline(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vBottom,
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maFontSize(
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vNum(14),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$maFontWeight(
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$vStr('500'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$maFill(
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$black,
																						_1: {ctor: '[]'}
																					}),
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}
														}),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									},
									_p44))))));
		};
	};
	var axGenerator = function (core) {
		return function (_p45) {
			return _gicentre$elm_vega$Vega$axes(
				A4(
					_gicentre$elm_vega$Vega$axis,
					A2(_elm_lang$core$Basics_ops['++'], core, 'Scale'),
					_gicentre$elm_vega$Vega$SBottom,
					{ctor: '[]'},
					_p45));
		};
	};
	var topScGenerator = function (core) {
		return A2(
			_gicentre$elm_vega$Vega$scale,
			A2(_elm_lang$core$Basics_ops['++'], core, 'Scale'),
			{
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scRound(_gicentre$elm_vega$Vega$true),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scDomain(
							_gicentre$elm_vega$Vega$doSignal(
								A2(_elm_lang$core$Basics_ops['++'], core, 'Extent'))),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaWidth),
							_1: {ctor: '[]'}
						}
					}
				}
			});
	};
	var scGenerator = function (core) {
		return function (_p46) {
			return _gicentre$elm_vega$Vega$scales(
				A3(
					_gicentre$elm_vega$Vega$scale,
					'yScale',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scDomain(
								_gicentre$elm_vega$Vega$doData(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daDataset(
											A2(_elm_lang$core$Basics_ops['++'], core, '-bins')),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daField(
												_gicentre$elm_vega$Vega$field('count')),
											_1: {ctor: '[]'}
										}
									})),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scRange(
									_gicentre$elm_vega$Vega$raValues(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$vSignal('chartHeight'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vNum(0),
												_1: {ctor: '[]'}
											}
										})),
								_1: {ctor: '[]'}
							}
						}
					},
					_p46));
		};
	};
	var dsGenerator = function (core) {
		var filterMask = function () {
			var _p47 = core;
			switch (_p47) {
				case 'delay':
					return _gicentre$elm_vega$Vega$num(1);
				case 'time':
					return _gicentre$elm_vega$Vega$num(2);
				default:
					return _gicentre$elm_vega$Vega$num(4);
			}
		}();
		return _gicentre$elm_vega$Vega$dataSource(
			{
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$Vega$transform,
					{
						ctor: '::',
						_0: A2(_gicentre$elm_vega$Vega$trResolveFilter, 'xFilter', filterMask),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$trAggregate(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$agGroupBy(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$field(
												A2(_elm_lang$core$Basics_ops['++'], core, '0')),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$field(
													A2(_elm_lang$core$Basics_ops['++'], core, '1')),
												_1: {ctor: '[]'}
											}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$agKey(
											_gicentre$elm_vega$Vega$field(
												A2(_elm_lang$core$Basics_ops['++'], core, '0'))),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$agDrop(_gicentre$elm_vega$Vega$false),
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$Vega$data,
						A2(_elm_lang$core$Basics_ops['++'], core, '-bins'),
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$daSource('flights'),
							_1: {ctor: '[]'}
						})),
				_1: {ctor: '[]'}
			});
	};
	var groupGenerator = function (core) {
		return A2(
			_gicentre$elm_vega$Vega$mark,
			_gicentre$elm_vega$Vega$Group,
			{
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$mName(core),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mEncode(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$enEnter(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$maY(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$vScale('layout'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vStr(core),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vOffset(
														_gicentre$elm_vega$Vega$vNum(20)),
													_1: {ctor: '[]'}
												}
											}
										}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$maWidth(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vSignal('width'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maHeight(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vSignal('chartHeight'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maFill(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$transparent,
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											}
										}
									}
								}),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mGroup(
							{
								ctor: '::',
								_0: dsGenerator(core),
								_1: {
									ctor: '::',
									_0: A2(
										scGenerator,
										core,
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: A2(
											axGenerator,
											core,
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: A2(
												mkGenerator,
												core,
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				}
			});
	};
	var sigGenerator = function (core) {
		return function (_p48) {
			return A3(
				_gicentre$elm_vega$Vega$signal,
				A2(_elm_lang$core$Basics_ops['++'], core, 'Range'),
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siUpdate(
						A2(_elm_lang$core$Basics_ops['++'], core, 'Extent')),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siOn(
							{
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$Vega$evHandler,
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$esSignal(
											A2(_elm_lang$core$Basics_ops['++'], core, 'Zoom')),
										_1: {ctor: '[]'}
									},
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$evUpdate(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'[(',
												A2(
													_elm_lang$core$Basics_ops['++'],
													core,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'Range[0]+',
														A2(
															_elm_lang$core$Basics_ops['++'],
															core,
															A2(
																_elm_lang$core$Basics_ops['++'],
																'Range[1])/2 - ',
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	core,
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		'Zoom, (',
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			core,
																			A2(
																				_elm_lang$core$Basics_ops['++'],
																				'Range[0]+',
																				A2(
																					_elm_lang$core$Basics_ops['++'],
																					core,
																					A2(
																						_elm_lang$core$Basics_ops['++'],
																						'Range[1])/2 + ',
																						A2(_elm_lang$core$Basics_ops['++'], core, 'Zoom]'))))))))))))),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$Vega$evHandler,
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$esSelector(
												_gicentre$elm_vega$Vega$str(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'@',
														A2(
															_elm_lang$core$Basics_ops['++'],
															core,
															A2(
																_elm_lang$core$Basics_ops['++'],
																':dblclick!, @',
																A2(_elm_lang$core$Basics_ops['++'], core, 'Brush:dblclick!')))))),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$evUpdate(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'[',
													A2(
														_elm_lang$core$Basics_ops['++'],
														core,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'Extent[0], ',
															A2(_elm_lang$core$Basics_ops['++'], core, 'Extent[1]]'))))),
											_1: {ctor: '[]'}
										}),
									_1: {
										ctor: '::',
										_0: A2(
											_gicentre$elm_vega$Vega$evHandler,
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$esSelector(
													_gicentre$elm_vega$Vega$str(
														A2(
															_elm_lang$core$Basics_ops['++'],
															'[@',
															A2(_elm_lang$core$Basics_ops['++'], core, 'Brush:mousedown, window:mouseup] > window:mousemove!')))),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$evUpdate(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'[',
														A2(
															_elm_lang$core$Basics_ops['++'],
															core,
															A2(
																_elm_lang$core$Basics_ops['++'],
																'Range[0] + invert(\'',
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	core,
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		'Scale\', x()) - invert(\'',
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			core,
																			A2(
																				_elm_lang$core$Basics_ops['++'],
																				'Scale\', xMove), ',
																				A2(
																					_elm_lang$core$Basics_ops['++'],
																					core,
																					A2(
																						_elm_lang$core$Basics_ops['++'],
																						'Range[1] + invert(\'',
																						A2(
																							_elm_lang$core$Basics_ops['++'],
																							core,
																							A2(
																								_elm_lang$core$Basics_ops['++'],
																								'Scale\', x()) - invert(\'',
																								A2(_elm_lang$core$Basics_ops['++'], core, 'Scale\', xMove)]'))))))))))))),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$Vega$evHandler,
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$esSelector(
														_gicentre$elm_vega$Vega$str(
															A2(
																_elm_lang$core$Basics_ops['++'],
																'[@',
																A2(_elm_lang$core$Basics_ops['++'], core, ':mousedown, window:mouseup] > window:mousemove!')))),
													_1: {ctor: '[]'}
												},
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$evUpdate(
														A2(
															_elm_lang$core$Basics_ops['++'],
															'[min(',
															A2(
																_elm_lang$core$Basics_ops['++'],
																core,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	'Anchor, invert(\'',
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		core,
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			'Scale\', x())), max(',
																			A2(
																				_elm_lang$core$Basics_ops['++'],
																				core,
																				A2(
																					_elm_lang$core$Basics_ops['++'],
																					'Anchor, invert(\'',
																					A2(_elm_lang$core$Basics_ops['++'], core, 'Scale\', x()))]'))))))))),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$signal,
					A2(_elm_lang$core$Basics_ops['++'], core, 'Zoom'),
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siValue(
							_gicentre$elm_vega$Vega$vNum(0)),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siOn(
								{
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$Vega$evHandler,
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$esSelector(
												_gicentre$elm_vega$Vega$str(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'@',
														A2(
															_elm_lang$core$Basics_ops['++'],
															core,
															A2(
																_elm_lang$core$Basics_ops['++'],
																':wheel!, @',
																A2(_elm_lang$core$Basics_ops['++'], core, 'Brush:wheel!')))))),
											_1: {ctor: '[]'}
										},
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$evUpdate(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'0.5 * abs(span(',
													A2(_elm_lang$core$Basics_ops['++'], core, 'Range)) * pow(1.0005, event.deltaY * pow(16, event.deltaMode))'))),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$signal,
						A2(_elm_lang$core$Basics_ops['++'], core, 'Anchor'),
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siValue(
								_gicentre$elm_vega$Vega$vNum(0)),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$siOn(
									{
										ctor: '::',
										_0: A2(
											_gicentre$elm_vega$Vega$evHandler,
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$esSelector(
													_gicentre$elm_vega$Vega$str(
														A2(
															_elm_lang$core$Basics_ops['++'],
															'@',
															A2(_elm_lang$core$Basics_ops['++'], core, ':mousedown!')))),
												_1: {ctor: '[]'}
											},
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$evUpdate(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'invert(\'',
														A2(_elm_lang$core$Basics_ops['++'], core, 'Scale\', x())'))),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						},
						_p48)));
		};
	};
	var facetNames = {
		ctor: '::',
		_0: 'delay',
		_1: {
			ctor: '::',
			_0: 'time',
			_1: {
				ctor: '::',
				_0: 'distance',
				_1: {ctor: '[]'}
			}
		}
	};
	var si = function () {
		var sigs = function (_p49) {
			return A3(
				_gicentre$elm_vega$Vega$signal,
				'chartHeight',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siValue(
						_gicentre$elm_vega$Vega$vNum(100)),
					_1: {ctor: '[]'}
				},
				A3(
					_gicentre$elm_vega$Vega$signal,
					'chartPadding',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siValue(
							_gicentre$elm_vega$Vega$vNum(50)),
						_1: {ctor: '[]'}
					},
					A3(
						_gicentre$elm_vega$Vega$signal,
						'height',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siUpdate('(chartHeight + chartPadding) * 3'),
							_1: {ctor: '[]'}
						},
						A3(
							_gicentre$elm_vega$Vega$signal,
							'delayExtent',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$siValue(
									_gicentre$elm_vega$Vega$vNums(
										{
											ctor: '::',
											_0: -60,
											_1: {
												ctor: '::',
												_0: 180,
												_1: {ctor: '[]'}
											}
										})),
								_1: {ctor: '[]'}
							},
							A3(
								_gicentre$elm_vega$Vega$signal,
								'timeExtent',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$siValue(
										_gicentre$elm_vega$Vega$vNums(
											{
												ctor: '::',
												_0: 0,
												_1: {
													ctor: '::',
													_0: 24,
													_1: {ctor: '[]'}
												}
											})),
									_1: {ctor: '[]'}
								},
								A3(
									_gicentre$elm_vega$Vega$signal,
									'distanceExtent',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$siValue(
											_gicentre$elm_vega$Vega$vNums(
												{
													ctor: '::',
													_0: 0,
													_1: {
														ctor: '::',
														_0: 2400,
														_1: {ctor: '[]'}
													}
												})),
										_1: {ctor: '[]'}
									},
									A3(
										_gicentre$elm_vega$Vega$signal,
										'delayStep',
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$siValue(
												_gicentre$elm_vega$Vega$vNum(10)),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$siBind(
													_gicentre$elm_vega$Vega$iRange(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$inMin(2),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$inMax(20),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$inStep(1),
																	_1: {ctor: '[]'}
																}
															}
														})),
												_1: {ctor: '[]'}
											}
										},
										A3(
											_gicentre$elm_vega$Vega$signal,
											'timeStep',
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$siValue(
													_gicentre$elm_vega$Vega$vNum(1)),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$siBind(
														_gicentre$elm_vega$Vega$iRange(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$inMin(0.25),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$inMax(2),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$inStep(0.25),
																		_1: {ctor: '[]'}
																	}
																}
															})),
													_1: {ctor: '[]'}
												}
											},
											A3(
												_gicentre$elm_vega$Vega$signal,
												'distanceStep',
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$siValue(
														_gicentre$elm_vega$Vega$vNum(100)),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$siBind(
															_gicentre$elm_vega$Vega$iRange(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$inMin(50),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$inMax(200),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$inStep(50),
																			_1: {ctor: '[]'}
																		}
																	}
																})),
														_1: {ctor: '[]'}
													}
												},
												A3(
													_gicentre$elm_vega$Vega$signal,
													'xMove',
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$siValue(
															_gicentre$elm_vega$Vega$vNum(0)),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$siOn(
																{
																	ctor: '::',
																	_0: A2(
																		_gicentre$elm_vega$Vega$evHandler,
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$esSelector(
																				_gicentre$elm_vega$Vega$str('window:mousemove')),
																			_1: {ctor: '[]'}
																		},
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$evUpdate('x()'),
																			_1: {ctor: '[]'}
																		}),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													},
													_p49))))))))));
		};
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_elm_lang$core$List$foldl,
				sigGenerator,
				sigs(
					{ctor: '[]'}),
				facetNames));
	}();
	var sc = function () {
		var layoutSc = A3(
			_gicentre$elm_vega$Vega$scale,
			'layout',
			{
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScBand),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scDomain(
						_gicentre$elm_vega$Vega$doStrs(
							_gicentre$elm_vega$Vega$strs(facetNames))),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scRange(_gicentre$elm_vega$Vega$RaHeight),
						_1: {ctor: '[]'}
					}
				}
			},
			{ctor: '[]'});
		return _gicentre$elm_vega$Vega$scales(
			A3(_elm_lang$core$List$foldl, topScGenerator, layoutSc, facetNames));
	}();
	var mk = _gicentre$elm_vega$Vega$marks(
		A3(
			_elm_lang$core$List$foldl,
			groupGenerator,
			{ctor: '[]'},
			facetNames));
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$width(500),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$padding(5),
				_1: {
					ctor: '::',
					_0: ds,
					_1: {
						ctor: '::',
						_0: si,
						_1: {
							ctor: '::',
							_0: sc,
							_1: {
								ctor: '::',
								_0: mk,
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		});
}();
var _gicentre$elm_vega$GalleryInteraction$mySpecs = _gicentre$elm_vega$Vega$combineSpecs(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'interaction1', _1: _gicentre$elm_vega$GalleryInteraction$interaction1},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'interaction2', _1: _gicentre$elm_vega$GalleryInteraction$interaction2},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'interaction3', _1: _gicentre$elm_vega$GalleryInteraction$interaction3},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'interaction4', _1: _gicentre$elm_vega$GalleryInteraction$interaction4},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'interaction5', _1: _gicentre$elm_vega$GalleryInteraction$interaction5},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'interaction6', _1: _gicentre$elm_vega$GalleryInteraction$interaction6},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'interaction7', _1: _gicentre$elm_vega$GalleryInteraction$interaction7},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'interaction8', _1: _gicentre$elm_vega$GalleryInteraction$interaction8},
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	});
var _gicentre$elm_vega$GalleryInteraction$elmToJS = _elm_lang$core$Native_Platform.outgoingPort(
	'elmToJS',
	function (v) {
		return v;
	});
var _gicentre$elm_vega$GalleryInteraction$main = _elm_lang$html$Html$program(
	{
		init: {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$GalleryInteraction$mySpecs,
			_1: _gicentre$elm_vega$GalleryInteraction$elmToJS(_gicentre$elm_vega$GalleryInteraction$mySpecs)
		},
		view: _gicentre$elm_vega$GalleryInteraction$view,
		update: F2(
			function (_p50, model) {
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			}),
		subscriptions: _elm_lang$core$Basics$always(_elm_lang$core$Platform_Sub$none)
	})();

var Elm = {};
Elm['GalleryInteraction'] = Elm['GalleryInteraction'] || {};
if (typeof _gicentre$elm_vega$GalleryInteraction$main !== 'undefined') {
    _gicentre$elm_vega$GalleryInteraction$main(Elm['GalleryInteraction'], 'GalleryInteraction', undefined);
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


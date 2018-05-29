
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
var _gicentre$elm_vega$Vega$timeUnitLabel = function (tu) {
	var _p3 = tu;
	switch (_p3.ctor) {
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
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'utc',
				_gicentre$elm_vega$Vega$timeUnitLabel(_p3._0));
	}
};
var _gicentre$elm_vega$Vega$strString = function (str) {
	var _p4 = str;
	switch (_p4.ctor) {
		case 'Str':
			return _p4._0;
		case 'Strs':
			return _elm_lang$core$Basics$toString(_p4._0);
		case 'StrSignal':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'{\'signal\': \'',
				A2(_elm_lang$core$Basics_ops['++'], _p4._0, '\'}'));
		default:
			return _elm_lang$core$Basics$toString(_p4._0);
	}
};
var _gicentre$elm_vega$Vega$signalReferenceProperty = function (sigRef) {
	return {
		ctor: '_Tuple2',
		_0: 'signal',
		_1: _elm_lang$core$Json_Encode$string(sigRef)
	};
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
var _gicentre$elm_vega$Vega$strSpec = function (str) {
	var _p6 = str;
	switch (_p6.ctor) {
		case 'Str':
			return _elm_lang$core$Json_Encode$string(_p6._0);
		case 'Strs':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p6._0));
		case 'StrSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p6._0),
					_1: {ctor: '[]'}
				});
		default:
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
					_p6._0));
	}
};
var _gicentre$elm_vega$Vega$sideLabel = function (orient) {
	var _p7 = orient;
	switch (_p7.ctor) {
		case 'SLeft':
			return 'left';
		case 'SBottom':
			return 'bottom';
		case 'SRight':
			return 'right';
		default:
			return 'top';
	}
};
var _gicentre$elm_vega$Vega$schemeProperty = function (sProps) {
	var _p8 = sProps;
	switch (_p8.ctor) {
		case 'SScheme':
			return {
				ctor: '_Tuple2',
				_0: 'scheme',
				_1: _elm_lang$core$Json_Encode$string(_p8._0)
			};
		case 'SCount':
			return {
				ctor: '_Tuple2',
				_0: 'count',
				_1: _elm_lang$core$Json_Encode$float(_p8._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'extent',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$float(_p8._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$float(_p8._1),
							_1: {ctor: '[]'}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$scaleLabel = function (scType) {
	var _p9 = scType;
	switch (_p9.ctor) {
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
		case 'ScBinOrdinal':
			return 'bin-ordinal';
		case 'ScQuantile':
			return 'quantile';
		case 'ScQuantize':
			return 'quantize';
		default:
			return _p9._0;
	}
};
var _gicentre$elm_vega$Vega$rangeDefaultLabel = function (rd) {
	var _p10 = rd;
	switch (_p10.ctor) {
		case 'RWidth':
			return 'width';
		case 'RHeight':
			return 'height';
		case 'RSymbol':
			return 'symbol';
		case 'RCategory':
			return 'category';
		case 'RDiverging':
			return 'diverging';
		case 'ROrdinal':
			return 'ordinal';
		case 'RRamp':
			return 'ramp';
		case 'RHeatmap':
			return 'heatmap';
		default:
			return _p10._0;
	}
};
var _gicentre$elm_vega$Vega$projectionSpec = function (proj) {
	var _p11 = proj;
	switch (_p11.ctor) {
		case 'Albers':
			return _elm_lang$core$Json_Encode$string('Albers');
		case 'AlbersUsa':
			return _elm_lang$core$Json_Encode$string('AlbersUsa');
		case 'AzimuthalEqualArea':
			return _elm_lang$core$Json_Encode$string('AzimuthalEqualArea');
		case 'AzimuthalEquidistant':
			return _elm_lang$core$Json_Encode$string('AzimuthalEquidistant');
		case 'ConicConformal':
			return _elm_lang$core$Json_Encode$string('ConicConformal');
		case 'ConicEqualArea':
			return _elm_lang$core$Json_Encode$string('ConicEqualArea');
		case 'ConicEquidistant':
			return _elm_lang$core$Json_Encode$string('ConicEquidistant');
		case 'Equirectangular':
			return _elm_lang$core$Json_Encode$string('Equirectangular');
		case 'Gnomonic':
			return _elm_lang$core$Json_Encode$string('Gnomonic');
		case 'Mercator':
			return _elm_lang$core$Json_Encode$string('Mercator');
		case 'Orthographic':
			return _elm_lang$core$Json_Encode$string('Orthographic');
		case 'Stereographic':
			return _elm_lang$core$Json_Encode$string('Stereographic');
		case 'TransverseMercator':
			return _elm_lang$core$Json_Encode$string('TransverseMercator');
		default:
			return _gicentre$elm_vega$Vega$strSpec(_p11._0);
	}
};
var _gicentre$elm_vega$Vega$paddingSpec = function (pad) {
	var _p12 = pad;
	if (_p12.ctor === 'PSize') {
		return _elm_lang$core$Json_Encode$float(_p12._0);
	} else {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'left',
					_1: _elm_lang$core$Json_Encode$float(_p12._0)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'top',
						_1: _elm_lang$core$Json_Encode$float(_p12._1)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'right',
							_1: _elm_lang$core$Json_Encode$float(_p12._2)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'bottom',
								_1: _elm_lang$core$Json_Encode$float(_p12._3)
							},
							_1: {ctor: '[]'}
						}
					}
				}
			});
	}
};
var _gicentre$elm_vega$Vega$overlapStrategyLabel = function (strat) {
	var _p13 = strat;
	switch (_p13.ctor) {
		case 'ONone':
			return 'false';
		case 'OParity':
			return 'parity';
		default:
			return 'greedy';
	}
};
var _gicentre$elm_vega$Vega$orderSpec = function (order) {
	var _p14 = order;
	switch (_p14.ctor) {
		case 'Ascend':
			return _elm_lang$core$Json_Encode$string('ascending');
		case 'Descend':
			return _elm_lang$core$Json_Encode$string('descending');
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p14._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$opSpec = function (op) {
	var _p15 = op;
	switch (_p15.ctor) {
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
		default:
			return _elm_lang$core$Json_Encode$string('variancep');
	}
};
var _gicentre$elm_vega$Vega$sortProperty = function (sp) {
	var _p16 = sp;
	switch (_p16.ctor) {
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
				_1: _gicentre$elm_vega$Vega$strSpec(_p16._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'op',
				_1: _gicentre$elm_vega$Vega$opSpec(_p16._0)
			};
	}
};
var _gicentre$elm_vega$Vega$niceSpec = function (ni) {
	var _p17 = ni;
	switch (_p17.ctor) {
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
							_gicentre$elm_vega$Vega$timeUnitLabel(_p17._0))
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'step',
							_1: _elm_lang$core$Json_Encode$int(_p17._1)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'NTrue':
			return _elm_lang$core$Json_Encode$bool(true);
		case 'NFalse':
			return _elm_lang$core$Json_Encode$bool(false);
		default:
			return _elm_lang$core$Json_Encode$int(_p17._0);
	}
};
var _gicentre$elm_vega$Vega$markLabel = function (m) {
	var _p18 = m;
	switch (_p18.ctor) {
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
var _gicentre$elm_vega$Vega$legendTypeLabel = function (lt) {
	var _p19 = lt;
	if (_p19.ctor === 'LSymbol') {
		return 'symbol';
	} else {
		return 'gradient';
	}
};
var _gicentre$elm_vega$Vega$legendOrientLabel = function (orient) {
	var _p20 = orient;
	switch (_p20.ctor) {
		case 'Left':
			return 'left';
		case 'TopLeft':
			return 'top-left';
		case 'Top':
			return 'top';
		case 'TopRight':
			return 'top-right';
		case 'Right':
			return 'right';
		case 'BottomRight':
			return 'bottom-right';
		case 'Bottom':
			return 'bottom';
		case 'BottomLeft':
			return 'bottom-left';
		default:
			return 'none';
	}
};
var _gicentre$elm_vega$Vega$interpolateSpec = function (iType) {
	var _p21 = iType;
	switch (_p21.ctor) {
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
							_1: _elm_lang$core$Json_Encode$float(_p21._0)
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
							_1: _elm_lang$core$Json_Encode$float(_p21._0)
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
							_1: _elm_lang$core$Json_Encode$float(_p21._0)
						},
						_1: {ctor: '[]'}
					}
				});
	}
};
var _gicentre$elm_vega$Vega$gridAlignSpec = function (ga) {
	var _p22 = ga;
	switch (_p22.ctor) {
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
						_1: _gicentre$elm_vega$Vega$gridAlignSpec(_p22._0)
					},
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'column',
						_1: _gicentre$elm_vega$Vega$gridAlignSpec(_p22._0)
					},
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$formulaUpdateSpec = function (update) {
	var _p23 = update;
	if (_p23.ctor === 'InitOnly') {
		return _elm_lang$core$Json_Encode$bool(true);
	} else {
		return _elm_lang$core$Json_Encode$bool(false);
	}
};
var _gicentre$elm_vega$Vega$foDataTypeSpec = function (dType) {
	var _p24 = dType;
	switch (_p24.ctor) {
		case 'FoNumber':
			return _elm_lang$core$Json_Encode$string('number');
		case 'FoBool':
			return _elm_lang$core$Json_Encode$string('boolean');
		case 'FoDate':
			var _p25 = _p24._0;
			return _elm_lang$core$Native_Utils.eq(_p25, '') ? _elm_lang$core$Json_Encode$string('date') : _elm_lang$core$Json_Encode$string(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'date:\'',
					A2(_elm_lang$core$Basics_ops['++'], _p25, '\'')));
		default:
			var _p26 = _p24._0;
			return _elm_lang$core$Native_Utils.eq(_p26, '') ? _elm_lang$core$Json_Encode$string('utc') : _elm_lang$core$Json_Encode$string(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'utc:\'',
					A2(_elm_lang$core$Basics_ops['++'], _p26, '\'')));
	}
};
var _gicentre$elm_vega$Vega$formatProperty = function (fmt) {
	var _p27 = fmt;
	switch (_p27.ctor) {
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
						_1: _elm_lang$core$Json_Encode$string(_p27._0)
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
						_0: 'delimeter',
						_1: _elm_lang$core$Json_Encode$string(_p27._0)
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
						_1: _elm_lang$core$Json_Encode$string(_p27._0)
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
						_1: _elm_lang$core$Json_Encode$string(_p27._0)
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
							function (_p28) {
								var _p29 = _p28;
								return {
									ctor: '_Tuple2',
									_0: _p29._0,
									_1: _gicentre$elm_vega$Vega$foDataTypeSpec(_p29._1)
								};
							},
							_p27._0))
				},
				_1: {ctor: '[]'}
			};
	}
};
var _gicentre$elm_vega$Vega$fieldValueSpec = function (fVal) {
	var _p30 = fVal;
	switch (_p30.ctor) {
		case 'FName':
			return _elm_lang$core$Json_Encode$string(_p30._0);
		case 'FSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p30._0),
					_1: {ctor: '[]'}
				});
		case 'FDatum':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'datum',
						_1: _gicentre$elm_vega$Vega$fieldValueSpec(_p30._0)
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
						_1: _gicentre$elm_vega$Vega$fieldValueSpec(_p30._0)
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
						_1: _gicentre$elm_vega$Vega$fieldValueSpec(_p30._0)
					},
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$fieldSpec = _gicentre$elm_vega$Vega$strSpec;
var _gicentre$elm_vega$Vega$linkPathProperty = function (lpProp) {
	var _p31 = lpProp;
	switch (_p31.ctor) {
		case 'LPSourceX':
			return {
				ctor: '_Tuple2',
				_0: 'sourceX',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p31._0)
			};
		case 'LPSourceY':
			return {
				ctor: '_Tuple2',
				_0: 'sourceY',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p31._0)
			};
		case 'LPTargetX':
			return {
				ctor: '_Tuple2',
				_0: 'targetX',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p31._0)
			};
		case 'LPTargetY':
			return {
				ctor: '_Tuple2',
				_0: 'targetY',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p31._0)
			};
		case 'LPOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _gicentre$elm_vega$Vega$strSpec(_p31._0)
			};
		case 'LPShape':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _gicentre$elm_vega$Vega$strSpec(_p31._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$string(_p31._0)
			};
	}
};
var _gicentre$elm_vega$Vega$expressionSpec = function (expr) {
	return _elm_lang$core$Json_Encode$string(expr);
};
var _gicentre$elm_vega$Vega$triggerProperties = function (trans) {
	var _p32 = trans;
	switch (_p32.ctor) {
		case 'TrTrigger':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'trigger',
					_1: _gicentre$elm_vega$Vega$expressionSpec(_p32._0)
				},
				_1: {ctor: '[]'}
			};
		case 'TrInsert':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'insert',
					_1: _gicentre$elm_vega$Vega$expressionSpec(_p32._0)
				},
				_1: {ctor: '[]'}
			};
		case 'TrRemove':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'remove',
					_1: _gicentre$elm_vega$Vega$expressionSpec(_p32._0)
				},
				_1: {ctor: '[]'}
			};
		case 'TrRemoveAll':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'remove',
					_1: _elm_lang$core$Json_Encode$bool(true)
				},
				_1: {ctor: '[]'}
			};
		case 'TrToggle':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'toggle',
					_1: _gicentre$elm_vega$Vega$expressionSpec(_p32._0)
				},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'modify',
					_1: _gicentre$elm_vega$Vega$expressionSpec(_p32._0)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'values',
						_1: _gicentre$elm_vega$Vega$expressionSpec(_p32._1)
					},
					_1: {ctor: '[]'}
				}
			};
	}
};
var _gicentre$elm_vega$Vega$exprProperty = function (expr) {
	var _p33 = expr;
	if (_p33.ctor === 'EField') {
		return {
			ctor: '_Tuple2',
			_0: 'field',
			_1: _elm_lang$core$Json_Encode$string(_p33._0)
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'expr',
			_1: _gicentre$elm_vega$Vega$expressionSpec(_p33._0)
		};
	}
};
var _gicentre$elm_vega$Vega$numSpec = function (num) {
	var _p34 = num;
	switch (_p34.ctor) {
		case 'Num':
			return _elm_lang$core$Json_Encode$float(_p34._0);
		case 'Nums':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p34._0));
		case 'NumSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p34._0),
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
					_p34._0));
		case 'NumExpr':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$exprProperty(_p34._0),
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$null;
	}
};
var _gicentre$elm_vega$Vega$forceProperty = function (fp) {
	var _p35 = fp;
	switch (_p35.ctor) {
		case 'FpX':
			return {
				ctor: '_Tuple2',
				_0: 'x',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p35._0)
			};
		case 'FpY':
			return {
				ctor: '_Tuple2',
				_0: 'y',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p35._0)
			};
		case 'FpCx':
			return {
				ctor: '_Tuple2',
				_0: 'x',
				_1: _gicentre$elm_vega$Vega$numSpec(_p35._0)
			};
		case 'FpCy':
			return {
				ctor: '_Tuple2',
				_0: 'y',
				_1: _gicentre$elm_vega$Vega$numSpec(_p35._0)
			};
		case 'FpRadius':
			return {
				ctor: '_Tuple2',
				_0: 'radius',
				_1: _gicentre$elm_vega$Vega$numSpec(_p35._0)
			};
		case 'FpStrength':
			return {
				ctor: '_Tuple2',
				_0: 'strength',
				_1: _gicentre$elm_vega$Vega$numSpec(_p35._0)
			};
		case 'FpIterations':
			return {
				ctor: '_Tuple2',
				_0: 'iterations',
				_1: _gicentre$elm_vega$Vega$numSpec(_p35._0)
			};
		case 'FpTheta':
			return {
				ctor: '_Tuple2',
				_0: 'theta',
				_1: _gicentre$elm_vega$Vega$numSpec(_p35._0)
			};
		case 'FpDistanceMin':
			return {
				ctor: '_Tuple2',
				_0: 'distanceMin',
				_1: _gicentre$elm_vega$Vega$numSpec(_p35._0)
			};
		case 'FpDistanceMax':
			return {
				ctor: '_Tuple2',
				_0: 'distanceMax',
				_1: _gicentre$elm_vega$Vega$numSpec(_p35._0)
			};
		case 'FpLinks':
			return {
				ctor: '_Tuple2',
				_0: 'links',
				_1: _elm_lang$core$Json_Encode$string(_p35._0)
			};
		case 'FpId':
			return {
				ctor: '_Tuple2',
				_0: 'id',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p35._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'distance',
				_1: _gicentre$elm_vega$Vega$numSpec(_p35._0)
			};
	}
};
var _gicentre$elm_vega$Vega$forceSpec = function (f) {
	var _p36 = f;
	switch (_p36.ctor) {
		case 'FCenter':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'force',
						_1: _elm_lang$core$Json_Encode$string('center')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p36._0)
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
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p36._0)
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
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p36._0)
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
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p36._0)
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
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p36._0)
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p36._1)
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
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p36._0)
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceProperty, _p36._1)
					}
				});
	}
};
var _gicentre$elm_vega$Vega$geoPathProperty = function (gpProp) {
	var _p37 = gpProp;
	switch (_p37.ctor) {
		case 'GeField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p37._0)
			};
		case 'GePointRadius':
			return {
				ctor: '_Tuple2',
				_0: 'pointRadius',
				_1: _gicentre$elm_vega$Vega$numSpec(_p37._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$string(_p37._0)
			};
	}
};
var _gicentre$elm_vega$Vega$eventTypeLabel = function (et) {
	var _p38 = et;
	switch (_p38.ctor) {
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
	var _p39 = es;
	switch (_p39.ctor) {
		case 'ESAll':
			return '*';
		case 'ESView':
			return 'view';
		case 'ESScope':
			return 'scope';
		case 'ESWindow':
			return 'window';
		default:
			return _p39._0;
	}
};
var _gicentre$elm_vega$Vega$eventStreamObjectSpec = function (ess) {
	var esProperty = function (es) {
		var _p40 = es;
		switch (_p40.ctor) {
			case 'ESSource':
				return {
					ctor: '_Tuple2',
					_0: 'source',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$Vega$eventSourceLabel(_p40._0))
				};
			case 'ESType':
				return {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$Vega$eventTypeLabel(_p40._0))
				};
			case 'ESBetween':
				return {
					ctor: '_Tuple2',
					_0: 'between',
					_1: _elm_lang$core$Json_Encode$list(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$eventStreamObjectSpec(_p40._0),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$eventStreamObjectSpec(_p40._1),
								_1: {ctor: '[]'}
							}
						})
				};
			case 'ESConsume':
				return {
					ctor: '_Tuple2',
					_0: 'consume',
					_1: _elm_lang$core$Json_Encode$bool(_p40._0)
				};
			case 'ESFilter':
				var _p42 = _p40._0;
				var _p41 = _p42;
				if ((_p41.ctor === '::') && (_p41._1.ctor === '[]')) {
					return {
						ctor: '_Tuple2',
						_0: 'filter',
						_1: _elm_lang$core$Json_Encode$string(_p41._0)
					};
				} else {
					return {
						ctor: '_Tuple2',
						_0: 'filter',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p42))
					};
				}
			case 'ESDebounce':
				return {
					ctor: '_Tuple2',
					_0: 'debounce',
					_1: _gicentre$elm_vega$Vega$numSpec(_p40._0)
				};
			case 'ESMarkName':
				return {
					ctor: '_Tuple2',
					_0: 'markname',
					_1: _elm_lang$core$Json_Encode$string(_p40._0)
				};
			case 'ESMark':
				return {
					ctor: '_Tuple2',
					_0: 'marktype',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$Vega$markLabel(_p40._0))
				};
			case 'ESThrottle':
				return {
					ctor: '_Tuple2',
					_0: 'throttle',
					_1: _gicentre$elm_vega$Vega$numSpec(_p40._0)
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: 'stream',
					_1: _gicentre$elm_vega$Vega$eventStreamSpec(_p40._0)
				};
		}
	};
	return _elm_lang$core$Json_Encode$object(
		A2(_elm_lang$core$List$map, esProperty, ess));
};
var _gicentre$elm_vega$Vega$eventStreamSpec = function (es) {
	var _p43 = es;
	switch (_p43.ctor) {
		case 'ESSelector':
			return _gicentre$elm_vega$Vega$strSpec(_p43._0);
		case 'ESObject':
			return _gicentre$elm_vega$Vega$eventStreamObjectSpec(_p43._0);
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'merge',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$eventStreamSpec, _p43._0))
					},
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$eventHandlerSpec = function (ehs) {
	var eventHandler = function (eh) {
		var _p44 = eh;
		switch (_p44.ctor) {
			case 'EEvents':
				return {
					ctor: '_Tuple2',
					_0: 'events',
					_1: _gicentre$elm_vega$Vega$eventStreamSpec(_p44._0)
				};
			case 'EUpdate':
				var _p45 = _p44._0;
				return _elm_lang$core$Native_Utils.eq(_p45, '') ? {
					ctor: '_Tuple2',
					_0: 'update',
					_1: _elm_lang$core$Json_Encode$string('{}')
				} : {
					ctor: '_Tuple2',
					_0: 'update',
					_1: _elm_lang$core$Json_Encode$string(_p45)
				};
			case 'EEncode':
				return {
					ctor: '_Tuple2',
					_0: 'encode',
					_1: _elm_lang$core$Json_Encode$string(_p44._0)
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: 'force',
					_1: _elm_lang$core$Json_Encode$bool(_p44._0)
				};
		}
	};
	return _elm_lang$core$Json_Encode$object(
		A2(_elm_lang$core$List$map, eventHandler, ehs));
};
var _gicentre$elm_vega$Vega$comparatorProperty = function (comp) {
	var _p46 = comp;
	if (_p46.ctor === 'CoField') {
		return {
			ctor: '_Tuple2',
			_0: 'field',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p46._0))
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'order',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$orderSpec, _p46._0))
		};
	}
};
var _gicentre$elm_vega$Vega$stackProperty = function (sp) {
	var _p47 = sp;
	switch (_p47.ctor) {
		case 'StField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p47._0)
			};
		case 'StGroupBy':
			return {
				ctor: '_Tuple2',
				_0: 'groupby',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p47._0))
			};
		case 'StSort':
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$comparatorProperty, _p47._0))
			};
		case 'StOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$stackOffsetSpec(_p47._0)
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
							_0: _p47._0,
							_1: {
								ctor: '::',
								_0: _p47._1,
								_1: {ctor: '[]'}
							}
						}))
			};
	}
};
var _gicentre$elm_vega$Vega$colorProperty = function (cVal) {
	var _p48 = cVal;
	switch (_p48.ctor) {
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
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._0))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'g',
								_1: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._1))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'b',
									_1: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._2))
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
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._0))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 's',
								_1: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._1))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'l',
									_1: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._2))
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
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._0))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'a',
								_1: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._1))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'b',
									_1: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._2))
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
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._0))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'c',
								_1: _elm_lang$core$Json_Encode$object(
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._1))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'l',
									_1: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p48._2))
								},
								_1: {ctor: '[]'}
							}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$valueProperty = function (val) {
	var _p49 = val;
	switch (_p49.ctor) {
		case 'VStr':
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _elm_lang$core$Json_Encode$string(_p49._0)
			};
		case 'VStrs':
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p49._0))
			};
		case 'VSignal':
			return _gicentre$elm_vega$Vega$signalReferenceProperty(_p49._0);
		case 'VColor':
			return _gicentre$elm_vega$Vega$colorProperty(_p49._0);
		case 'VField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldValueSpec(_p49._0)
			};
		case 'VScale':
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _gicentre$elm_vega$Vega$fieldValueSpec(_p49._0)
			};
		case 'VKeyValue':
			return {
				ctor: '_Tuple2',
				_0: _p49._0,
				_1: _gicentre$elm_vega$Vega$valueSpec(_p49._1)
			};
		case 'VBand':
			return {
				ctor: '_Tuple2',
				_0: 'band',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'VExponent':
			return {
				ctor: '_Tuple2',
				_0: 'exponent',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p49._0)
			};
		case 'VMultiply':
			return {
				ctor: '_Tuple2',
				_0: 'mult',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p49._0)
			};
		case 'VOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p49._0)
			};
		case 'VRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _elm_lang$core$Json_Encode$bool(_p49._0)
			};
		case 'VNum':
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'VNums':
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p49._0))
			};
		case 'VObject':
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p49._0))
			};
		case 'Values':
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueSpec, _p49._0))
			};
		case 'VBoo':
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _elm_lang$core$Json_Encode$bool(_p49._0)
			};
		case 'VBoos':
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$bool, _p49._0))
			};
		case 'VNull':
			return {ctor: '_Tuple2', _0: 'value', _1: _elm_lang$core$Json_Encode$null};
		default:
			return A2(
				_elm_lang$core$Debug$log,
				'Unexpected production rule passed to valueProperty',
				{
					ctor: '_Tuple2',
					_0: 'productionRule',
					_1: _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'test',
								_1: _elm_lang$core$Json_Encode$string(_p49._0)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'if',
									_1: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p49._1))
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'else',
										_1: _elm_lang$core$Json_Encode$object(
											A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p49._2))
									},
									_1: {ctor: '[]'}
								}
							}
						})
				});
	}
};
var _gicentre$elm_vega$Vega$valueSpec = function (val) {
	var _p50 = val;
	switch (_p50.ctor) {
		case 'VStr':
			return _elm_lang$core$Json_Encode$string(_p50._0);
		case 'VStrs':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p50._0));
		case 'VSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p50._0),
					_1: {ctor: '[]'}
				});
		case 'VColor':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$colorProperty(_p50._0),
					_1: {ctor: '[]'}
				});
		case 'VField':
			return _gicentre$elm_vega$Vega$fieldValueSpec(_p50._0);
		case 'VScale':
			return _gicentre$elm_vega$Vega$fieldValueSpec(_p50._0);
		case 'VBand':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'band',
						_1: _elm_lang$core$Json_Encode$float(_p50._0)
					},
					_1: {ctor: '[]'}
				});
		case 'VExponent':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$valueProperty(_p50._0),
					_1: {ctor: '[]'}
				});
		case 'VMultiply':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$valueProperty(_p50._0),
					_1: {ctor: '[]'}
				});
		case 'VOffset':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$valueProperty(_p50._0),
					_1: {ctor: '[]'}
				});
		case 'VRound':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'round',
						_1: _elm_lang$core$Json_Encode$bool(_p50._0)
					},
					_1: {ctor: '[]'}
				});
		case 'VNum':
			return _elm_lang$core$Json_Encode$float(_p50._0);
		case 'VNums':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p50._0));
		case 'VKeyValue':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _p50._0,
						_1: _gicentre$elm_vega$Vega$valueSpec(_p50._1)
					},
					_1: {ctor: '[]'}
				});
		case 'VObject':
			return _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p50._0));
		case 'Values':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueSpec, _p50._0));
		case 'VBoo':
			return _elm_lang$core$Json_Encode$bool(_p50._0);
		case 'VBoos':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$bool, _p50._0));
		case 'VNull':
			return _elm_lang$core$Json_Encode$null;
		default:
			return _elm_lang$core$Json_Encode$null;
	}
};
var _gicentre$elm_vega$Vega$dataProperty = function (dProp) {
	var _p51 = dProp;
	switch (_p51.ctor) {
		case 'DFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$object(
					_gicentre$elm_vega$Vega$formatProperty(_p51._0))
			};
		case 'DSource':
			return {
				ctor: '_Tuple2',
				_0: 'source',
				_1: _elm_lang$core$Json_Encode$string(_p51._0)
			};
		case 'DSources':
			return {
				ctor: '_Tuple2',
				_0: 'source',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p51._0))
			};
		case 'DOn':
			return {
				ctor: '_Tuple2',
				_0: 'on',
				_1: _elm_lang$core$Json_Encode$list(_p51._0)
			};
		case 'DUrl':
			return {
				ctor: '_Tuple2',
				_0: 'url',
				_1: _elm_lang$core$Json_Encode$string(_p51._0)
			};
		case 'DValue':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p51._0)
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
var _gicentre$elm_vega$Vega$inputProperty = function (prop) {
	var _p52 = prop;
	switch (_p52.ctor) {
		case 'InMin':
			return {
				ctor: '_Tuple2',
				_0: 'min',
				_1: _elm_lang$core$Json_Encode$float(_p52._0)
			};
		case 'InMax':
			return {
				ctor: '_Tuple2',
				_0: 'max',
				_1: _elm_lang$core$Json_Encode$float(_p52._0)
			};
		case 'InStep':
			return {
				ctor: '_Tuple2',
				_0: 'step',
				_1: _elm_lang$core$Json_Encode$float(_p52._0)
			};
		case 'InDebounce':
			return {
				ctor: '_Tuple2',
				_0: 'debounce',
				_1: _elm_lang$core$Json_Encode$float(_p52._0)
			};
		case 'InOptions':
			return {
				ctor: '_Tuple2',
				_0: 'options',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p52._0)
			};
		case 'InPlaceholder':
			return {
				ctor: '_Tuple2',
				_0: 'placeholder',
				_1: _elm_lang$core$Json_Encode$string(_p52._0)
			};
		case 'InElement':
			return {
				ctor: '_Tuple2',
				_0: 'element',
				_1: _elm_lang$core$Json_Encode$string(_p52._0)
			};
		default:
			return _p52._0 ? {
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
var _gicentre$elm_vega$Vega$lookupProperty = function (luProp) {
	var _p53 = luProp;
	switch (_p53.ctor) {
		case 'LValues':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p53._0))
			};
		case 'LAs':
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p53._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'default',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p53._0)
			};
	}
};
var _gicentre$elm_vega$Vega$packProperty = function (pp) {
	var _p54 = pp;
	switch (_p54.ctor) {
		case 'PaField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p54._0)
			};
		case 'PaSort':
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$comparatorProperty, _p54._0))
			};
		case 'PaSize':
			return {
				ctor: '_Tuple2',
				_0: 'size',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$valueSpec(_p54._0),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$valueSpec(_p54._1),
							_1: {ctor: '[]'}
						}
					})
			};
		case 'PaRadius':
			var _p55 = _p54._0;
			if (_p55.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'radius',
					_1: _gicentre$elm_vega$Vega$fieldSpec(_p55._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'radius', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'PaPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p54._0)
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
							_0: _p54._0,
							_1: {
								ctor: '::',
								_0: _p54._1,
								_1: {
									ctor: '::',
									_0: _p54._2,
									_1: {
										ctor: '::',
										_0: _p54._3,
										_1: {
											ctor: '::',
											_0: _p54._4,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}))
			};
	}
};
var _gicentre$elm_vega$Vega$valRef = function (vs) {
	var _p56 = vs;
	if (((_p56.ctor === '::') && (_p56._0.ctor === 'VIfElse')) && (_p56._1.ctor === '[]')) {
		return _elm_lang$core$Json_Encode$list(
			{
				ctor: '::',
				_0: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'test',
							_1: _elm_lang$core$Json_Encode$string(_p56._0._0)
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p56._0._1)
					}),
				_1: {
					ctor: '::',
					_0: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, _p56._0._2)),
					_1: {ctor: '[]'}
				}
			});
	} else {
		return _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueProperty, vs));
	}
};
var _gicentre$elm_vega$Vega$boundsCalculationLabel = function (bc) {
	var _p57 = bc;
	if (_p57.ctor === 'Full') {
		return 'full';
	} else {
		return 'flush';
	}
};
var _gicentre$elm_vega$Vega$layoutProperty = function (prop) {
	var _p58 = prop;
	switch (_p58.ctor) {
		case 'LAlign':
			return {
				ctor: '_Tuple2',
				_0: 'align',
				_1: _gicentre$elm_vega$Vega$gridAlignSpec(_p58._0)
			};
		case 'LBounds':
			return {
				ctor: '_Tuple2',
				_0: 'bounds',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$boundsCalculationLabel(_p58._0))
			};
		case 'LColumns':
			return {
				ctor: '_Tuple2',
				_0: 'columns',
				_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
			};
		case 'LPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
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
							_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'col',
								_1: _gicentre$elm_vega$Vega$numSpec(_p58._1)
							},
							_1: {ctor: '[]'}
						}
					})
			};
		case 'LOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
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
							_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'col',
								_1: _gicentre$elm_vega$Vega$numSpec(_p58._1)
							},
							_1: {ctor: '[]'}
						}
					})
			};
		case 'LHeaderBand':
			return {
				ctor: '_Tuple2',
				_0: 'headerBand',
				_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
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
							_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'col',
								_1: _gicentre$elm_vega$Vega$numSpec(_p58._1)
							},
							_1: {ctor: '[]'}
						}
					})
			};
		case 'LFooterBand':
			return {
				ctor: '_Tuple2',
				_0: 'footerBand',
				_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
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
							_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'col',
								_1: _gicentre$elm_vega$Vega$numSpec(_p58._1)
							},
							_1: {ctor: '[]'}
						}
					})
			};
		case 'LTitleBand':
			return {
				ctor: '_Tuple2',
				_0: 'titleBand',
				_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
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
							_1: _gicentre$elm_vega$Vega$numSpec(_p58._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'col',
								_1: _gicentre$elm_vega$Vega$numSpec(_p58._1)
							},
							_1: {ctor: '[]'}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$boolSpec = function (b) {
	var _p59 = b;
	switch (_p59.ctor) {
		case 'Boo':
			return _elm_lang$core$Json_Encode$bool(_p59._0);
		case 'Boos':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$bool, _p59._0));
		case 'BooSignal':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p59._0),
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
					_p59._0));
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$exprProperty(_p59._0),
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$clipSpec = function (clip) {
	var _p60 = clip;
	switch (_p60.ctor) {
		case 'ClEnabled':
			return _gicentre$elm_vega$Vega$boolSpec(_p60._0);
		case 'ClPath':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'path',
						_1: _gicentre$elm_vega$Vega$strSpec(_p60._0)
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
						_1: _gicentre$elm_vega$Vega$strSpec(_p60._0)
					},
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$Vega$forceSimulationProperty = function (fProp) {
	var _p61 = fProp;
	switch (_p61.ctor) {
		case 'FsStatic':
			return {
				ctor: '_Tuple2',
				_0: 'static',
				_1: _gicentre$elm_vega$Vega$boolSpec(_p61._0)
			};
		case 'FsRestart':
			return {
				ctor: '_Tuple2',
				_0: 'restart',
				_1: _gicentre$elm_vega$Vega$boolSpec(_p61._0)
			};
		case 'FsIterations':
			return {
				ctor: '_Tuple2',
				_0: 'iterations',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'FsAlpha':
			return {
				ctor: '_Tuple2',
				_0: 'alpha',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'FsAlphaMin':
			return {
				ctor: '_Tuple2',
				_0: 'alphaMin',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'FsAlphaTarget':
			return {
				ctor: '_Tuple2',
				_0: 'alphaTarget',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'FsVelocityDecay':
			return {
				ctor: '_Tuple2',
				_0: 'velocityDecay',
				_1: _gicentre$elm_vega$Vega$numSpec(_p61._0)
			};
		case 'FsForces':
			return {
				ctor: '_Tuple2',
				_0: 'forces',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceSpec, _p61._0))
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
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(_p61._2),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$string(_p61._3),
									_1: {ctor: '[]'}
								}
							}
						}
					})
			};
	}
};
var _gicentre$elm_vega$Vega$pieProperty = function (pp) {
	var _p62 = pp;
	switch (_p62.ctor) {
		case 'PiField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p62._0)
			};
		case 'PiStartAngle':
			return {
				ctor: '_Tuple2',
				_0: 'startAngle',
				_1: _gicentre$elm_vega$Vega$numSpec(_p62._0)
			};
		case 'PiEndAngle':
			return {
				ctor: '_Tuple2',
				_0: 'endAngle',
				_1: _gicentre$elm_vega$Vega$numSpec(_p62._0)
			};
		case 'PiSort':
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _gicentre$elm_vega$Vega$boolSpec(_p62._0)
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
							_0: _p62._0,
							_1: {
								ctor: '::',
								_0: _p62._1,
								_1: {ctor: '[]'}
							}
						}))
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
	var _p63 = bnd;
	switch (_p63.ctor) {
		case 'IRange':
			return A2(bSpec, 'range', _p63._0);
		case 'ICheckbox':
			return A2(bSpec, 'checkbox', _p63._0);
		case 'IRadio':
			return A2(bSpec, 'radio', _p63._0);
		case 'ISelect':
			return A2(bSpec, 'select', _p63._0);
		case 'IText':
			return A2(bSpec, 'text', _p63._0);
		case 'INumber':
			return A2(bSpec, 'number', _p63._0);
		case 'IDate':
			return A2(bSpec, 'date', _p63._0);
		case 'ITime':
			return A2(bSpec, 'time', _p63._0);
		case 'IMonth':
			return A2(bSpec, 'month', _p63._0);
		case 'IWeek':
			return A2(bSpec, 'week', _p63._0);
		case 'IDateTimeLocal':
			return A2(bSpec, 'datetimelocal', _p63._0);
		case 'ITel':
			return A2(bSpec, 'tel', _p63._0);
		default:
			return A2(bSpec, 'color', _p63._0);
	}
};
var _gicentre$elm_vega$Vega$signalProperty = function (sigProp) {
	var _p64 = sigProp;
	switch (_p64.ctor) {
		case 'SiName':
			return {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(_p64._0)
			};
		case 'SiBind':
			return _gicentre$elm_vega$Vega$bindingProperty(_p64._0);
		case 'SiDescription':
			return {
				ctor: '_Tuple2',
				_0: 'description',
				_1: _elm_lang$core$Json_Encode$string(_p64._0)
			};
		case 'SiUpdate':
			return {
				ctor: '_Tuple2',
				_0: 'update',
				_1: _gicentre$elm_vega$Vega$expressionSpec(_p64._0)
			};
		case 'SiOn':
			return {
				ctor: '_Tuple2',
				_0: 'on',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$eventHandlerSpec, _p64._0))
			};
		case 'SiReact':
			return {
				ctor: '_Tuple2',
				_0: 'react',
				_1: _elm_lang$core$Json_Encode$bool(_p64._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p64._0)
			};
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
		default:
			return {
				ctor: '_Tuple2',
				_0: 'contains',
				_1: _elm_lang$core$Json_Encode$string('padding')
			};
	}
};
var _gicentre$elm_vega$Vega$anchorLabel = function (anchor) {
	var _p67 = anchor;
	switch (_p67.ctor) {
		case 'Start':
			return 'start';
		case 'Middle':
			return 'middle';
		default:
			return 'end';
	}
};
var _gicentre$elm_vega$Vega$aggregateProperty = function (ap) {
	var _p68 = ap;
	switch (_p68.ctor) {
		case 'AgGroupBy':
			return {
				ctor: '_Tuple2',
				_0: 'groupby',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p68._0))
			};
		case 'AgFields':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p68._0))
			};
		case 'AgOps':
			return {
				ctor: '_Tuple2',
				_0: 'ops',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						function (op) {
							return _gicentre$elm_vega$Vega$opSpec(op);
						},
						_p68._0))
			};
		case 'AgAs':
			return {
				ctor: '_Tuple2',
				_0: 'as',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p68._0))
			};
		case 'AgCross':
			return {
				ctor: '_Tuple2',
				_0: 'cross',
				_1: _elm_lang$core$Json_Encode$bool(_p68._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'drop',
				_1: _elm_lang$core$Json_Encode$bool(_p68._0)
			};
	}
};
var _gicentre$elm_vega$Vega$facetProperty = function (fct) {
	var _p69 = fct;
	switch (_p69.ctor) {
		case 'FaName':
			return {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(_p69._0)
			};
		case 'FaData':
			return {
				ctor: '_Tuple2',
				_0: 'data',
				_1: _elm_lang$core$Json_Encode$string(_p69._0)
			};
		case 'FaField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p69._0)
			};
		case 'FaGroupBy':
			return {
				ctor: '_Tuple2',
				_0: 'groupby',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p69._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$aggregateProperty, _p69._0))
			};
	}
};
var _gicentre$elm_vega$Vega$vAlignLabel = function (align) {
	var _p70 = align;
	switch (_p70.ctor) {
		case 'AlignTop':
			return 'top';
		case 'AlignMiddle':
			return 'middle';
		case 'AlignBottom':
			return 'bottom';
		default:
			return 'alphabetic';
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
				function (_p71) {
					var _p72 = _p71;
					return {
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$Vega$vPropertyLabel(_p72._0),
						_1: _p72._1
					};
				},
				spec)
		});
};
var _gicentre$elm_vega$Vega$symbolLabel = function (sym) {
	var _p73 = sym;
	switch (_p73.ctor) {
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
		default:
			return _p73._0;
	}
};
var _gicentre$elm_vega$Vega$strokeJoinLabel = function (join) {
	var _p74 = join;
	switch (_p74.ctor) {
		case 'JMiter':
			return 'miter';
		case 'JRound':
			return 'round';
		default:
			return 'bevel';
	}
};
var _gicentre$elm_vega$Vega$markProperty = function (mProp) {
	var _p75 = mProp;
	switch (_p75.ctor) {
		case 'MX':
			return {
				ctor: '_Tuple2',
				_0: 'x',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MY':
			return {
				ctor: '_Tuple2',
				_0: 'y',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MX2':
			return {
				ctor: '_Tuple2',
				_0: 'x2',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MY2':
			return {
				ctor: '_Tuple2',
				_0: 'y2',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MXC':
			return {
				ctor: '_Tuple2',
				_0: 'xc',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MYC':
			return {
				ctor: '_Tuple2',
				_0: 'xc',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MWidth':
			return {
				ctor: '_Tuple2',
				_0: 'width',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MHeight':
			return {
				ctor: '_Tuple2',
				_0: 'height',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'opacity',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MFill':
			return {
				ctor: '_Tuple2',
				_0: 'fill',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MFillOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'fillOpacity',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MStroke':
			return {
				ctor: '_Tuple2',
				_0: 'stroke',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MStrokeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'strokeOpacity',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MStrokeCap':
			return {
				ctor: '_Tuple2',
				_0: 'strokeCap',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MStrokeDashOffset':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDashOffset',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MStrokeJoin':
			return {
				ctor: '_Tuple2',
				_0: 'strokeJoin',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$strokeJoinLabel(_p75._0))
			};
		case 'MStrokeMiterLimit':
			return {
				ctor: '_Tuple2',
				_0: 'strokeMiterLimit',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MCursor':
			return {
				ctor: '_Tuple2',
				_0: 'cursor',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MHRef':
			return {
				ctor: '_Tuple2',
				_0: 'href',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MTooltip':
			return {
				ctor: '_Tuple2',
				_0: 'tooltip',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MZIndex':
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MStartAngle':
			return {
				ctor: '_Tuple2',
				_0: 'startAngle',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MEndAngle':
			return {
				ctor: '_Tuple2',
				_0: 'endAngle',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MPadAngle':
			return {
				ctor: '_Tuple2',
				_0: 'padAngle',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MInnerRadius':
			return {
				ctor: '_Tuple2',
				_0: 'innerRadius',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MOuterRadius':
			return {
				ctor: '_Tuple2',
				_0: 'outerRadius',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MCornerRadius':
			return {
				ctor: '_Tuple2',
				_0: 'cornerRadius',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MInterpolate':
			return {
				ctor: '_Tuple2',
				_0: 'interpolate',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MTension':
			return {
				ctor: '_Tuple2',
				_0: 'tension',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MDefined':
			return {
				ctor: '_Tuple2',
				_0: 'defined',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MGroupClip':
			return {
				ctor: '_Tuple2',
				_0: 'clip',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MAspect':
			return {
				ctor: '_Tuple2',
				_0: 'aspect',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MUrl':
			return {
				ctor: '_Tuple2',
				_0: 'url',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MPath':
			return {
				ctor: '_Tuple2',
				_0: 'path',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MShape':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MSize':
			return {
				ctor: '_Tuple2',
				_0: 'size',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MSymbol':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MAlign':
			return {
				ctor: '_Tuple2',
				_0: 'align',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MAngle':
			return {
				ctor: '_Tuple2',
				_0: 'angle',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'baseline',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MDir':
			return {
				ctor: '_Tuple2',
				_0: 'dir',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MdX':
			return {
				ctor: '_Tuple2',
				_0: 'dx',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MdY':
			return {
				ctor: '_Tuple2',
				_0: 'dy',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MEllipsis':
			return {
				ctor: '_Tuple2',
				_0: 'ellipsis',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MFont':
			return {
				ctor: '_Tuple2',
				_0: 'font',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'fontSize',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'fontWeight',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MFontStyle':
			return {
				ctor: '_Tuple2',
				_0: 'fontStyle',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MLimit':
			return {
				ctor: '_Tuple2',
				_0: 'limit',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MRadius':
			return {
				ctor: '_Tuple2',
				_0: 'radius',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		case 'MText':
			return {
				ctor: '_Tuple2',
				_0: 'text',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'theta',
				_1: _gicentre$elm_vega$Vega$valRef(_p75._0)
			};
	}
};
var _gicentre$elm_vega$Vega$encodingProperty = function (ep) {
	var _p76 = ep;
	switch (_p76.ctor) {
		case 'Enter':
			return {
				ctor: '_Tuple2',
				_0: 'enter',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p76._0))
			};
		case 'Update':
			return {
				ctor: '_Tuple2',
				_0: 'update',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p76._0))
			};
		case 'Exit':
			return {
				ctor: '_Tuple2',
				_0: 'exit',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p76._0))
			};
		case 'Hover':
			return {
				ctor: '_Tuple2',
				_0: 'hover',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p76._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: _p76._0,
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$markProperty, _p76._1))
			};
	}
};
var _gicentre$elm_vega$Vega$axisProperty = function (ap) {
	var _p77 = ap;
	switch (_p77.ctor) {
		case 'AxScale':
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$string(_p77._0)
			};
		case 'AxSide':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$sideLabel(_p77._0))
			};
		case 'AxFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$string(_p77._0)
			};
		case 'AxDomain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _elm_lang$core$Json_Encode$bool(_p77._0)
			};
		case 'AxEncode':
			var enc = function (_p78) {
				var _p79 = _p78;
				return {
					ctor: '_Tuple2',
					_0: _gicentre$elm_vega$Vega$axisElementLabel(_p79._0),
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p79._1))
				};
			};
			return {
				ctor: '_Tuple2',
				_0: 'encode',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, enc, _p77._0))
			};
		case 'AxGrid':
			return {
				ctor: '_Tuple2',
				_0: 'grid',
				_1: _elm_lang$core$Json_Encode$bool(_p77._0)
			};
		case 'AxLabels':
			return {
				ctor: '_Tuple2',
				_0: 'labels',
				_1: _elm_lang$core$Json_Encode$bool(_p77._0)
			};
		case 'AxLabelOverlap':
			return {
				ctor: '_Tuple2',
				_0: 'labelOverlap',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$overlapStrategyLabel(_p77._0))
			};
		case 'AxLabelPadding':
			return {
				ctor: '_Tuple2',
				_0: 'labelPadding',
				_1: _elm_lang$core$Json_Encode$float(_p77._0)
			};
		case 'AxMaxExtent':
			return {
				ctor: '_Tuple2',
				_0: 'maxExtent',
				_1: _gicentre$elm_vega$Vega$numSpec(_p77._0)
			};
		case 'AxMinExtent':
			return {
				ctor: '_Tuple2',
				_0: 'minExtent',
				_1: _gicentre$elm_vega$Vega$numSpec(_p77._0)
			};
		case 'AxGridScale':
			return {
				ctor: '_Tuple2',
				_0: 'gridScale',
				_1: _elm_lang$core$Json_Encode$string(_p77._0)
			};
		case 'AxLabelBound':
			var _p80 = _p77._0;
			if (_p80.ctor === 'Nothing') {
				return {
					ctor: '_Tuple2',
					_0: 'labelBound',
					_1: _elm_lang$core$Json_Encode$bool(false)
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'labelBound',
					_1: _elm_lang$core$Json_Encode$float(_p80._0)
				};
			}
		case 'AxLabelFlush':
			var _p81 = _p77._0;
			if (_p81.ctor === 'Nothing') {
				return {
					ctor: '_Tuple2',
					_0: 'labelFlush',
					_1: _elm_lang$core$Json_Encode$bool(false)
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'labelFlush',
					_1: _elm_lang$core$Json_Encode$float(_p81._0)
				};
			}
		case 'AxLabelFlushOffset':
			return {
				ctor: '_Tuple2',
				_0: 'labelFlushOffset',
				_1: _elm_lang$core$Json_Encode$float(_p77._0)
			};
		case 'AxOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p77._0)
			};
		case 'AxPosition':
			return {
				ctor: '_Tuple2',
				_0: 'position',
				_1: _gicentre$elm_vega$Vega$numSpec(_p77._0)
			};
		case 'AxTicks':
			return {
				ctor: '_Tuple2',
				_0: 'ticks',
				_1: _elm_lang$core$Json_Encode$bool(_p77._0)
			};
		case 'AxTickCount':
			return {
				ctor: '_Tuple2',
				_0: 'tickCount',
				_1: _elm_lang$core$Json_Encode$int(_p77._0)
			};
		case 'AxTickSize':
			return {
				ctor: '_Tuple2',
				_0: 'tickSize',
				_1: _elm_lang$core$Json_Encode$float(_p77._0)
			};
		case 'AxTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _gicentre$elm_vega$Vega$strSpec(_p77._0)
			};
		case 'AxTitlePadding':
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _elm_lang$core$Json_Encode$float(_p77._0)
			};
		case 'AxValues':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueSpec, _p77._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _elm_lang$core$Json_Encode$int(_p77._0)
			};
	}
};
var _gicentre$elm_vega$Vega$legendEncodingProperty = function (le) {
	var _p82 = le;
	switch (_p82.ctor) {
		case 'EnLegend':
			return {
				ctor: '_Tuple2',
				_0: 'legend',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p82._0))
			};
		case 'EnTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p82._0))
			};
		case 'EnLabels':
			return {
				ctor: '_Tuple2',
				_0: 'labels',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p82._0))
			};
		case 'EnSymbols':
			return {
				ctor: '_Tuple2',
				_0: 'symbols',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p82._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'gradient',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p82._0))
			};
	}
};
var _gicentre$elm_vega$Vega$titleProperty = function (tProp) {
	var _p83 = tProp;
	switch (_p83.ctor) {
		case 'TOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$sideLabel(_p83._0))
			};
		case 'TAnchor':
			return {
				ctor: '_Tuple2',
				_0: 'anchor',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$anchorLabel(_p83._0))
			};
		case 'TEncode':
			return {
				ctor: '_Tuple2',
				_0: 'encode',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p83._0))
			};
		case 'TInteractive':
			return {
				ctor: '_Tuple2',
				_0: 'interactive',
				_1: _gicentre$elm_vega$Vega$boolSpec(_p83._0)
			};
		case 'TName':
			return {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(_p83._0)
			};
		case 'TStyle':
			return {
				ctor: '_Tuple2',
				_0: 'style',
				_1: _gicentre$elm_vega$Vega$strSpec(_p83._0)
			};
		case 'TOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p83._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _elm_lang$core$Json_Encode$int(_p83._0)
			};
	}
};
var _gicentre$elm_vega$Vega$strokeCapLabel = function (cap) {
	var _p84 = cap;
	switch (_p84.ctor) {
		case 'CButt':
			return 'butt';
		case 'CRound':
			return 'round';
		default:
			return 'square';
	}
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
var _gicentre$elm_vega$Vega$markOrientationLabel = function (orient) {
	var _p85 = orient;
	switch (_p85.ctor) {
		case 'Horizontal':
			return 'horizontal';
		case 'Vertical':
			return 'vertical';
		default:
			return 'radial';
	}
};
var _gicentre$elm_vega$Vega$markInterpolationLabel = function (interp) {
	var _p86 = interp;
	switch (_p86.ctor) {
		case 'Basis':
			return 'basis';
		case 'Cardinal':
			return 'cardinal';
		case 'CatmullRom':
			return 'catmull-rom';
		case 'Linear':
			return 'linear';
		case 'Monotone':
			return 'monotone';
		case 'Natural':
			return 'natural';
		case 'Stepwise':
			return 'step';
		case 'StepAfter':
			return 'step-after';
		default:
			return 'step-before';
	}
};
var _gicentre$elm_vega$Vega$linkShapeLabel = function (ls) {
	var _p87 = ls;
	switch (_p87.ctor) {
		case 'LinkLine':
			return 'line';
		case 'LinkArc':
			return 'arc';
		case 'LinkCurve':
			return 'curve';
		case 'LinkDiagonal':
			return 'diagonal';
		default:
			return 'orthogonal';
	}
};
var _gicentre$elm_vega$Vega$hAlignLabel = function (align) {
	var _p88 = align;
	switch (_p88.ctor) {
		case 'AlignLeft':
			return 'left';
		case 'AlignCenter':
			return 'center';
		default:
			return 'right';
	}
};
var _gicentre$elm_vega$Vega$legendProperty = function (lp) {
	var _p89 = lp;
	switch (_p89.ctor) {
		case 'LeType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$legendTypeLabel(_p89._0))
			};
		case 'LeDirection':
			return {
				ctor: '_Tuple2',
				_0: 'direction',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$markOrientationLabel(_p89._0))
			};
		case 'LeOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$legendOrientLabel(_p89._0))
			};
		case 'LeFill':
			return {
				ctor: '_Tuple2',
				_0: 'fill',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'opacity',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeShape':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeSize':
			return {
				ctor: '_Tuple2',
				_0: 'size',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeStroke':
			return {
				ctor: '_Tuple2',
				_0: 'stroke',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeEncode':
			return {
				ctor: '_Tuple2',
				_0: 'encode',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$legendEncodingProperty, _p89._0))
			};
		case 'LeFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeGridAlign':
			return {
				ctor: '_Tuple2',
				_0: 'gridAlign',
				_1: _gicentre$elm_vega$Vega$gridAlignSpec(_p89._0)
			};
		case 'LeClipHeight':
			return {
				ctor: '_Tuple2',
				_0: 'clipHeight',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeColumns':
			return {
				ctor: '_Tuple2',
				_0: 'columns',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeColumnPadding':
			return {
				ctor: '_Tuple2',
				_0: 'columnPadding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeRowPadding':
			return {
				ctor: '_Tuple2',
				_0: 'rowPadding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeCornerRadius':
			return {
				ctor: '_Tuple2',
				_0: 'cornerRadius',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeFillColor':
			return {
				ctor: '_Tuple2',
				_0: 'fillColor',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p89._0)
			};
		case 'LePadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p89._0)
			};
		case 'LeStrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'strokeColor',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeGradientLength':
			return {
				ctor: '_Tuple2',
				_0: 'gradientLength',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeGradientThickness':
			return {
				ctor: '_Tuple2',
				_0: 'gradientThickness',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeGradientStrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'gradientStrokeColor',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeGradientStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'gradientStrokeWidth',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeLabelAlign':
			return {
				ctor: '_Tuple2',
				_0: 'labelAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$hAlignLabel(_p89._0))
			};
		case 'LeLabelBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'labelBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$vAlignLabel(_p89._0))
			};
		case 'LeLabelColor':
			return {
				ctor: '_Tuple2',
				_0: 'labelColor',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeLabelFont':
			return {
				ctor: '_Tuple2',
				_0: 'labelFont',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeLabelFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeLabelFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontWeight',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p89._0)
			};
		case 'LeLabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'labelLimit',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeLabelOffset':
			return {
				ctor: '_Tuple2',
				_0: 'labelOffset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeLabelOverlap':
			return {
				ctor: '_Tuple2',
				_0: 'labelOverlap',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$overlapStrategyLabel(_p89._0))
			};
		case 'LeSymbolFillColor':
			return {
				ctor: '_Tuple2',
				_0: 'symbolFillColor',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeSymbolOffset':
			return {
				ctor: '_Tuple2',
				_0: 'symbolOffset',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeSymbolSize':
			return {
				ctor: '_Tuple2',
				_0: 'symbolSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeSymbolStrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'symbolStrokeColor',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeSymbolStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'symbolStokeWidth',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeSymbolType':
			return {
				ctor: '_Tuple2',
				_0: 'symbolType',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$symbolLabel(_p89._0))
			};
		case 'LeTickCount':
			return {
				ctor: '_Tuple2',
				_0: 'tickCount',
				_1: _elm_lang$core$Json_Encode$int(_p89._0)
			};
		case 'LeTitlePadding':
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p89._0)
			};
		case 'LeTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeTitleAlign':
			return {
				ctor: '_Tuple2',
				_0: 'titleAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$hAlignLabel(_p89._0))
			};
		case 'LeTitleBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'titleBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$vAlignLabel(_p89._0))
			};
		case 'LeTitleColor':
			return {
				ctor: '_Tuple2',
				_0: 'titleColor',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeTitleFont':
			return {
				ctor: '_Tuple2',
				_0: 'titleFont',
				_1: _elm_lang$core$Json_Encode$string(_p89._0)
			};
		case 'LeTitleFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontSize',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeTitleFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontWeight',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p89._0)
			};
		case 'LeTitleLimit':
			return {
				ctor: '_Tuple2',
				_0: 'titleLimit',
				_1: _gicentre$elm_vega$Vega$numSpec(_p89._0)
			};
		case 'LeValues':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueSpec, _p89._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _elm_lang$core$Json_Encode$int(_p89._0)
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
var _gicentre$elm_vega$Vega$dirLabel = function (dir) {
	var _p90 = dir;
	if (_p90.ctor === 'LeftToRight') {
		return 'ltr';
	} else {
		return 'rtl';
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
				function (_p91) {
					var _p92 = _p91;
					return {
						ctor: '_Tuple2',
						_0: _p92._0,
						_1: _gicentre$elm_vega$Vega$valueSpec(_p92._1)
					};
				},
				row)));
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
var _gicentre$elm_vega$Vega$dataColumn = F2(
	function (colName, data) {
		var _p93 = data;
		switch (_p93.ctor) {
			case 'DStrs':
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
						_p93._0));
			case 'DNums':
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
						_p93._0));
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
						_p93._0));
		}
	});
var _gicentre$elm_vega$Vega$cursorLabel = function (cur) {
	var _p94 = cur;
	switch (_p94.ctor) {
		case 'CAuto':
			return 'auto';
		case 'CDefault':
			return 'default';
		case 'CNone':
			return 'none';
		case 'CContextMenu':
			return 'context-menu';
		case 'CHelp':
			return 'help';
		case 'CPointer':
			return 'pointer';
		case 'CProgress':
			return 'progress';
		case 'CWait':
			return 'wait';
		case 'CCell':
			return 'cell';
		case 'CCrosshair':
			return 'crosshair';
		case 'CText':
			return 'text';
		case 'CVerticalText':
			return 'vertical-text';
		case 'CAlias':
			return 'alias';
		case 'CCopy':
			return 'copy';
		case 'CMove':
			return 'move';
		case 'CNoDrop':
			return 'no-drop';
		case 'CNotAllowed':
			return 'not-allowed';
		case 'CAllScroll':
			return 'all-scroll';
		case 'CColResize':
			return 'col-resize';
		case 'CRowResize':
			return 'row-resize';
		case 'CNResize':
			return 'n-resize';
		case 'CEResize':
			return 'e-resize';
		case 'CSResize':
			return 's-resize';
		case 'CWResize':
			return 'w-resize';
		case 'CNEResize':
			return 'ne-resize';
		case 'CNWResize':
			return 'nw-resize';
		case 'CSEResize':
			return 'se-resize';
		case 'CSWResize':
			return 'sw-resize';
		case 'CEWResize':
			return 'ew-resize';
		case 'CNSResize':
			return 'ns-resize';
		case 'CNESWResize':
			return 'nesw-resize';
		case 'CNWSEResize':
			return 'nwse-resize';
		case 'CZoomIn':
			return 'zoom-in';
		case 'CZoomOut':
			return 'zoom-out';
		case 'CGrab':
			return 'grab';
		default:
			return 'grabbing';
	}
};
var _gicentre$elm_vega$Vega$combineSpecs = function (specs) {
	return _elm_lang$core$Json_Encode$object(specs);
};
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
var _gicentre$elm_vega$Vega$End = {ctor: 'End'};
var _gicentre$elm_vega$Vega$Middle = {ctor: 'Middle'};
var _gicentre$elm_vega$Vega$Start = {ctor: 'Start'};
var _gicentre$elm_vega$Vega$AResize = {ctor: 'AResize'};
var _gicentre$elm_vega$Vega$APadding = {ctor: 'APadding'};
var _gicentre$elm_vega$Vega$APad = {ctor: 'APad'};
var _gicentre$elm_vega$Vega$ANone = {ctor: 'ANone'};
var _gicentre$elm_vega$Vega$AFit = {ctor: 'AFit'};
var _gicentre$elm_vega$Vega$AContent = {ctor: 'AContent'};
var _gicentre$elm_vega$Vega$EDomain = {ctor: 'EDomain'};
var _gicentre$elm_vega$Vega$ETitle = {ctor: 'ETitle'};
var _gicentre$elm_vega$Vega$ELabels = {ctor: 'ELabels'};
var _gicentre$elm_vega$Vega$EGrid = {ctor: 'EGrid'};
var _gicentre$elm_vega$Vega$ETicks = {ctor: 'ETicks'};
var _gicentre$elm_vega$Vega$EAxis = {ctor: 'EAxis'};
var _gicentre$elm_vega$Vega$AxZIndex = function (a) {
	return {ctor: 'AxZIndex', _0: a};
};
var _gicentre$elm_vega$Vega$axZIndex = _gicentre$elm_vega$Vega$AxZIndex;
var _gicentre$elm_vega$Vega$AxValues = function (a) {
	return {ctor: 'AxValues', _0: a};
};
var _gicentre$elm_vega$Vega$axValues = _gicentre$elm_vega$Vega$AxValues;
var _gicentre$elm_vega$Vega$AxTitlePadding = function (a) {
	return {ctor: 'AxTitlePadding', _0: a};
};
var _gicentre$elm_vega$Vega$axTitlePadding = _gicentre$elm_vega$Vega$AxTitlePadding;
var _gicentre$elm_vega$Vega$AxTitle = function (a) {
	return {ctor: 'AxTitle', _0: a};
};
var _gicentre$elm_vega$Vega$axTitle = _gicentre$elm_vega$Vega$AxTitle;
var _gicentre$elm_vega$Vega$AxTickSize = function (a) {
	return {ctor: 'AxTickSize', _0: a};
};
var _gicentre$elm_vega$Vega$axTickSize = _gicentre$elm_vega$Vega$AxTickSize;
var _gicentre$elm_vega$Vega$AxTickCount = function (a) {
	return {ctor: 'AxTickCount', _0: a};
};
var _gicentre$elm_vega$Vega$axTickCount = _gicentre$elm_vega$Vega$AxTickCount;
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
var _gicentre$elm_vega$Vega$AxLabelOverlap = function (a) {
	return {ctor: 'AxLabelOverlap', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelOverlap = _gicentre$elm_vega$Vega$AxLabelOverlap;
var _gicentre$elm_vega$Vega$AxLabelPadding = function (a) {
	return {ctor: 'AxLabelPadding', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelPadding = _gicentre$elm_vega$Vega$AxLabelPadding;
var _gicentre$elm_vega$Vega$AxLabelFlushOffset = function (a) {
	return {ctor: 'AxLabelFlushOffset', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelFlushOffset = _gicentre$elm_vega$Vega$AxLabelFlushOffset;
var _gicentre$elm_vega$Vega$AxLabelFlush = function (a) {
	return {ctor: 'AxLabelFlush', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelFlush = _gicentre$elm_vega$Vega$AxLabelFlush;
var _gicentre$elm_vega$Vega$AxLabelBound = function (a) {
	return {ctor: 'AxLabelBound', _0: a};
};
var _gicentre$elm_vega$Vega$axLabelBound = _gicentre$elm_vega$Vega$AxLabelBound;
var _gicentre$elm_vega$Vega$AxLabels = function (a) {
	return {ctor: 'AxLabels', _0: a};
};
var _gicentre$elm_vega$Vega$axLabels = _gicentre$elm_vega$Vega$AxLabels;
var _gicentre$elm_vega$Vega$AxGridScale = function (a) {
	return {ctor: 'AxGridScale', _0: a};
};
var _gicentre$elm_vega$Vega$axGridScale = _gicentre$elm_vega$Vega$AxGridScale;
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
var _gicentre$elm_vega$Vega$AxDomain = function (a) {
	return {ctor: 'AxDomain', _0: a};
};
var _gicentre$elm_vega$Vega$axDomain = _gicentre$elm_vega$Vega$AxDomain;
var _gicentre$elm_vega$Vega$AxSide = function (a) {
	return {ctor: 'AxSide', _0: a};
};
var _gicentre$elm_vega$Vega$AxScale = function (a) {
	return {ctor: 'AxScale', _0: a};
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
var _gicentre$elm_vega$Vega$boo = _gicentre$elm_vega$Vega$Boo;
var _gicentre$elm_vega$Vega$Flush = {ctor: 'Flush'};
var _gicentre$elm_vega$Vega$Full = {ctor: 'Full'};
var _gicentre$elm_vega$Vega$Rgb = function (a) {
	return {ctor: 'Rgb', _0: a};
};
var _gicentre$elm_vega$Vega$rgb = _gicentre$elm_vega$Vega$Rgb;
var _gicentre$elm_vega$Vega$Lab = {ctor: 'Lab'};
var _gicentre$elm_vega$Vega$lab = _gicentre$elm_vega$Vega$Lab;
var _gicentre$elm_vega$Vega$HslLong = {ctor: 'HslLong'};
var _gicentre$elm_vega$Vega$hslLong = _gicentre$elm_vega$Vega$HslLong;
var _gicentre$elm_vega$Vega$Hsl = {ctor: 'Hsl'};
var _gicentre$elm_vega$Vega$hsl = _gicentre$elm_vega$Vega$Hsl;
var _gicentre$elm_vega$Vega$HclLong = {ctor: 'HclLong'};
var _gicentre$elm_vega$Vega$hclLong = _gicentre$elm_vega$Vega$HclLong;
var _gicentre$elm_vega$Vega$Hcl = {ctor: 'Hcl'};
var _gicentre$elm_vega$Vega$hcl = _gicentre$elm_vega$Vega$Hcl;
var _gicentre$elm_vega$Vega$CubeHelixLong = function (a) {
	return {ctor: 'CubeHelixLong', _0: a};
};
var _gicentre$elm_vega$Vega$cubeHelixLong = _gicentre$elm_vega$Vega$CubeHelixLong;
var _gicentre$elm_vega$Vega$CubeHelix = function (a) {
	return {ctor: 'CubeHelix', _0: a};
};
var _gicentre$elm_vega$Vega$cubeHelix = _gicentre$elm_vega$Vega$CubeHelix;
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
var _gicentre$elm_vega$Vega$CoOrder = function (a) {
	return {ctor: 'CoOrder', _0: a};
};
var _gicentre$elm_vega$Vega$coOrder = _gicentre$elm_vega$Vega$CoOrder;
var _gicentre$elm_vega$Vega$CoField = function (a) {
	return {ctor: 'CoField', _0: a};
};
var _gicentre$elm_vega$Vega$coField = _gicentre$elm_vega$Vega$CoField;
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
var _gicentre$elm_vega$Vega$DUrl = function (a) {
	return {ctor: 'DUrl', _0: a};
};
var _gicentre$elm_vega$Vega$daUrl = _gicentre$elm_vega$Vega$DUrl;
var _gicentre$elm_vega$Vega$DOn = function (a) {
	return {ctor: 'DOn', _0: a};
};
var _gicentre$elm_vega$Vega$daOn = _gicentre$elm_vega$Vega$DOn;
var _gicentre$elm_vega$Vega$DSphere = {ctor: 'DSphere'};
var _gicentre$elm_vega$Vega$daSphere = _gicentre$elm_vega$Vega$DSphere;
var _gicentre$elm_vega$Vega$DValue = function (a) {
	return {ctor: 'DValue', _0: a};
};
var _gicentre$elm_vega$Vega$daValue = _gicentre$elm_vega$Vega$DValue;
var _gicentre$elm_vega$Vega$DSources = function (a) {
	return {ctor: 'DSources', _0: a};
};
var _gicentre$elm_vega$Vega$daSources = _gicentre$elm_vega$Vega$DSources;
var _gicentre$elm_vega$Vega$DSource = function (a) {
	return {ctor: 'DSource', _0: a};
};
var _gicentre$elm_vega$Vega$daSource = _gicentre$elm_vega$Vega$DSource;
var _gicentre$elm_vega$Vega$DFormat = function (a) {
	return {ctor: 'DFormat', _0: a};
};
var _gicentre$elm_vega$Vega$daFormat = _gicentre$elm_vega$Vega$DFormat;
var _gicentre$elm_vega$Vega$DSort = function (a) {
	return {ctor: 'DSort', _0: a};
};
var _gicentre$elm_vega$Vega$daSort = _gicentre$elm_vega$Vega$DSort;
var _gicentre$elm_vega$Vega$DReferences = function (a) {
	return {ctor: 'DReferences', _0: a};
};
var _gicentre$elm_vega$Vega$daReferences = _gicentre$elm_vega$Vega$DReferences;
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
var _gicentre$elm_vega$Vega$FoUtc = function (a) {
	return {ctor: 'FoUtc', _0: a};
};
var _gicentre$elm_vega$Vega$foUtc = _gicentre$elm_vega$Vega$FoUtc;
var _gicentre$elm_vega$Vega$FoDate = function (a) {
	return {ctor: 'FoDate', _0: a};
};
var _gicentre$elm_vega$Vega$foDate = _gicentre$elm_vega$Vega$FoDate;
var _gicentre$elm_vega$Vega$FoBool = {ctor: 'FoBool'};
var _gicentre$elm_vega$Vega$foBool = _gicentre$elm_vega$Vega$FoBool;
var _gicentre$elm_vega$Vega$FoNumber = {ctor: 'FoNumber'};
var _gicentre$elm_vega$Vega$foNumber = _gicentre$elm_vega$Vega$FoNumber;
var _gicentre$elm_vega$Vega$Custom = F2(
	function (a, b) {
		return {ctor: 'Custom', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$enCustom = function (name) {
	return _gicentre$elm_vega$Vega$Custom(name);
};
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
	function (es, eHandlers) {
		return {
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$EEvents(es),
			_1: eHandlers
		};
	});
var _gicentre$elm_vega$Vega$ESDom = function (a) {
	return {ctor: 'ESDom', _0: a};
};
var _gicentre$elm_vega$Vega$esDom = _gicentre$elm_vega$Vega$ESDom;
var _gicentre$elm_vega$Vega$ESWindow = {ctor: 'ESWindow'};
var _gicentre$elm_vega$Vega$ESScope = {ctor: 'ESScope'};
var _gicentre$elm_vega$Vega$ESView = {ctor: 'ESView'};
var _gicentre$elm_vega$Vega$ESAll = {ctor: 'ESAll'};
var _gicentre$elm_vega$Vega$ESMerge = function (a) {
	return {ctor: 'ESMerge', _0: a};
};
var _gicentre$elm_vega$Vega$esMerge = _gicentre$elm_vega$Vega$ESMerge;
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
var _gicentre$elm_vega$Vega$Expr = function (a) {
	return {ctor: 'Expr', _0: a};
};
var _gicentre$elm_vega$Vega$expr = _gicentre$elm_vega$Vega$Expr;
var _gicentre$elm_vega$Vega$EField = function (a) {
	return {ctor: 'EField', _0: a};
};
var _gicentre$elm_vega$Vega$eField = _gicentre$elm_vega$Vega$EField;
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
var _gicentre$elm_vega$Vega$sourceProperty = function (src) {
	var _p95 = src;
	if (_p95.ctor === 'SData') {
		return {
			ctor: '_Tuple2',
			_0: 'data',
			_1: _gicentre$elm_vega$Vega$strSpec(_p95._0)
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
						_0: _gicentre$elm_vega$Vega$FaData(_p95._0),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$FaName(_p95._1),
							_1: _p95._2
						}
					}))
		};
	}
};
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
var _gicentre$elm_vega$Vega$FName = function (a) {
	return {ctor: 'FName', _0: a};
};
var _gicentre$elm_vega$Vega$fName = _gicentre$elm_vega$Vega$FName;
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
var _gicentre$elm_vega$Vega$AlwaysUpdate = {ctor: 'AlwaysUpdate'};
var _gicentre$elm_vega$Vega$InitOnly = {ctor: 'InitOnly'};
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
var _gicentre$elm_vega$Vega$GrStep = function (a) {
	return {ctor: 'GrStep', _0: a};
};
var _gicentre$elm_vega$Vega$GrStepMinor = function (a) {
	return {ctor: 'GrStepMinor', _0: a};
};
var _gicentre$elm_vega$Vega$GrStepMajor = function (a) {
	return {ctor: 'GrStepMajor', _0: a};
};
var _gicentre$elm_vega$Vega$GrExtent = function (a) {
	return {ctor: 'GrExtent', _0: a};
};
var _gicentre$elm_vega$Vega$GrExtentMinor = function (a) {
	return {ctor: 'GrExtentMinor', _0: a};
};
var _gicentre$elm_vega$Vega$GrExtentMajor = function (a) {
	return {ctor: 'GrExtentMajor', _0: a};
};
var _gicentre$elm_vega$Vega$GrField = function (a) {
	return {ctor: 'GrField', _0: a};
};
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
var _gicentre$elm_vega$Vega$AlignRight = {ctor: 'AlignRight'};
var _gicentre$elm_vega$Vega$AlignLeft = {ctor: 'AlignLeft'};
var _gicentre$elm_vega$Vega$AlignCenter = {ctor: 'AlignCenter'};
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
var _gicentre$elm_vega$Vega$None = {ctor: 'None'};
var _gicentre$elm_vega$Vega$BottomLeft = {ctor: 'BottomLeft'};
var _gicentre$elm_vega$Vega$Bottom = {ctor: 'Bottom'};
var _gicentre$elm_vega$Vega$BottomRight = {ctor: 'BottomRight'};
var _gicentre$elm_vega$Vega$Right = {ctor: 'Right'};
var _gicentre$elm_vega$Vega$TopRight = {ctor: 'TopRight'};
var _gicentre$elm_vega$Vega$Top = {ctor: 'Top'};
var _gicentre$elm_vega$Vega$TopLeft = {ctor: 'TopLeft'};
var _gicentre$elm_vega$Vega$Left = {ctor: 'Left'};
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
var _gicentre$elm_vega$Vega$LeSymbolFillColor = function (a) {
	return {ctor: 'LeSymbolFillColor', _0: a};
};
var _gicentre$elm_vega$Vega$leSymbolFillColor = _gicentre$elm_vega$Vega$LeSymbolFillColor;
var _gicentre$elm_vega$Vega$LeLabelOverlap = function (a) {
	return {ctor: 'LeLabelOverlap', _0: a};
};
var _gicentre$elm_vega$Vega$leLabelOverlap = _gicentre$elm_vega$Vega$LeLabelOverlap;
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
var _gicentre$elm_vega$Vega$LeGradientLength = function (a) {
	return {ctor: 'LeGradientLength', _0: a};
};
var _gicentre$elm_vega$Vega$leGradientLength = _gicentre$elm_vega$Vega$LeGradientLength;
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
var _gicentre$elm_vega$Vega$LGradient = {ctor: 'LGradient'};
var _gicentre$elm_vega$Vega$LSymbol = {ctor: 'LSymbol'};
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
var _gicentre$elm_vega$Vega$LinkOrthogonal = {ctor: 'LinkOrthogonal'};
var _gicentre$elm_vega$Vega$LinkDiagonal = {ctor: 'LinkDiagonal'};
var _gicentre$elm_vega$Vega$LinkCurve = {ctor: 'LinkCurve'};
var _gicentre$elm_vega$Vega$LinkArc = {ctor: 'LinkArc'};
var _gicentre$elm_vega$Vega$LinkLine = {ctor: 'LinkLine'};
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
var _gicentre$elm_vega$Vega$Basis = {ctor: 'Basis'};
var _gicentre$elm_vega$Vega$Radial = {ctor: 'Radial'};
var _gicentre$elm_vega$Vega$Vertical = {ctor: 'Vertical'};
var _gicentre$elm_vega$Vega$Horizontal = {ctor: 'Horizontal'};
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
var _gicentre$elm_vega$Vega$Variancep = {ctor: 'Variancep'};
var _gicentre$elm_vega$Vega$variancep = _gicentre$elm_vega$Vega$Variancep;
var _gicentre$elm_vega$Vega$Variance = {ctor: 'Variance'};
var _gicentre$elm_vega$Vega$variance = _gicentre$elm_vega$Vega$Variance;
var _gicentre$elm_vega$Vega$Valid = {ctor: 'Valid'};
var _gicentre$elm_vega$Vega$valid = _gicentre$elm_vega$Vega$Valid;
var _gicentre$elm_vega$Vega$Sum = {ctor: 'Sum'};
var _gicentre$elm_vega$Vega$sum = _gicentre$elm_vega$Vega$Sum;
var _gicentre$elm_vega$Vega$Stdevp = {ctor: 'Stdevp'};
var _gicentre$elm_vega$Vega$stdevp = _gicentre$elm_vega$Vega$Stdevp;
var _gicentre$elm_vega$Vega$Stdev = {ctor: 'Stdev'};
var _gicentre$elm_vega$Vega$stdev = _gicentre$elm_vega$Vega$Stdev;
var _gicentre$elm_vega$Vega$Stderr = {ctor: 'Stderr'};
var _gicentre$elm_vega$Vega$stderr = _gicentre$elm_vega$Vega$Stderr;
var _gicentre$elm_vega$Vega$Q3 = {ctor: 'Q3'};
var _gicentre$elm_vega$Vega$q3 = _gicentre$elm_vega$Vega$Q3;
var _gicentre$elm_vega$Vega$Q1 = {ctor: 'Q1'};
var _gicentre$elm_vega$Vega$q1 = _gicentre$elm_vega$Vega$Q1;
var _gicentre$elm_vega$Vega$Missing = {ctor: 'Missing'};
var _gicentre$elm_vega$Vega$missing = _gicentre$elm_vega$Vega$Missing;
var _gicentre$elm_vega$Vega$Min = {ctor: 'Min'};
var _gicentre$elm_vega$Vega$minimum = _gicentre$elm_vega$Vega$Min;
var _gicentre$elm_vega$Vega$Median = {ctor: 'Median'};
var _gicentre$elm_vega$Vega$median = _gicentre$elm_vega$Vega$Median;
var _gicentre$elm_vega$Vega$Mean = {ctor: 'Mean'};
var _gicentre$elm_vega$Vega$mean = _gicentre$elm_vega$Vega$Mean;
var _gicentre$elm_vega$Vega$Max = {ctor: 'Max'};
var _gicentre$elm_vega$Vega$maximum = _gicentre$elm_vega$Vega$Max;
var _gicentre$elm_vega$Vega$Distinct = {ctor: 'Distinct'};
var _gicentre$elm_vega$Vega$distinct = _gicentre$elm_vega$Vega$Distinct;
var _gicentre$elm_vega$Vega$Count = {ctor: 'Count'};
var _gicentre$elm_vega$Vega$count = _gicentre$elm_vega$Vega$Count;
var _gicentre$elm_vega$Vega$CI1 = {ctor: 'CI1'};
var _gicentre$elm_vega$Vega$ci1 = _gicentre$elm_vega$Vega$CI1;
var _gicentre$elm_vega$Vega$CI0 = {ctor: 'CI0'};
var _gicentre$elm_vega$Vega$ci0 = _gicentre$elm_vega$Vega$CI0;
var _gicentre$elm_vega$Vega$Average = {ctor: 'Average'};
var _gicentre$elm_vega$Vega$average = _gicentre$elm_vega$Vega$Average;
var _gicentre$elm_vega$Vega$ArgMin = {ctor: 'ArgMin'};
var _gicentre$elm_vega$Vega$argMin = _gicentre$elm_vega$Vega$ArgMin;
var _gicentre$elm_vega$Vega$ArgMax = {ctor: 'ArgMax'};
var _gicentre$elm_vega$Vega$argMax = _gicentre$elm_vega$Vega$ArgMax;
var _gicentre$elm_vega$Vega$ORadial = {ctor: 'ORadial'};
var _gicentre$elm_vega$Vega$OVertical = {ctor: 'OVertical'};
var _gicentre$elm_vega$Vega$OHorizontal = {ctor: 'OHorizontal'};
var _gicentre$elm_vega$Vega$OGreedy = {ctor: 'OGreedy'};
var _gicentre$elm_vega$Vega$OParity = {ctor: 'OParity'};
var _gicentre$elm_vega$Vega$ONone = {ctor: 'ONone'};
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
var _gicentre$elm_vega$Vega$PaSize = F2(
	function (a, b) {
		return {ctor: 'PaSize', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$paSize = F2(
	function (w, h) {
		return A2(_gicentre$elm_vega$Vega$PaSize, w, h);
	});
var _gicentre$elm_vega$Vega$PaSort = function (a) {
	return {ctor: 'PaSort', _0: a};
};
var _gicentre$elm_vega$Vega$paSort = _gicentre$elm_vega$Vega$PaSort;
var _gicentre$elm_vega$Vega$PaField = function (a) {
	return {ctor: 'PaField', _0: a};
};
var _gicentre$elm_vega$Vega$paField = _gicentre$elm_vega$Vega$PaField;
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
var _gicentre$elm_vega$Vega$OrderSignal = function (a) {
	return {ctor: 'OrderSignal', _0: a};
};
var _gicentre$elm_vega$Vega$orSignal = _gicentre$elm_vega$Vega$OrderSignal;
var _gicentre$elm_vega$Vega$Descend = {ctor: 'Descend'};
var _gicentre$elm_vega$Vega$orDescending = _gicentre$elm_vega$Vega$Descend;
var _gicentre$elm_vega$Vega$Ascend = {ctor: 'Ascend'};
var _gicentre$elm_vega$Vega$orAscending = _gicentre$elm_vega$Vega$Ascend;
var _gicentre$elm_vega$Vega$PEdges = F4(
	function (a, b, c, d) {
		return {ctor: 'PEdges', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$Vega$PSize = function (a) {
	return {ctor: 'PSize', _0: a};
};
var _gicentre$elm_vega$Vega$Proj = function (a) {
	return {ctor: 'Proj', _0: a};
};
var _gicentre$elm_vega$Vega$prCustom = _gicentre$elm_vega$Vega$Proj;
var _gicentre$elm_vega$Vega$TransverseMercator = {ctor: 'TransverseMercator'};
var _gicentre$elm_vega$Vega$Stereographic = {ctor: 'Stereographic'};
var _gicentre$elm_vega$Vega$Orthographic = {ctor: 'Orthographic'};
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
var _gicentre$elm_vega$Vega$PrSize = {ctor: 'PrSize'};
var _gicentre$elm_vega$Vega$PrExtent = {ctor: 'PrExtent'};
var _gicentre$elm_vega$Vega$PrFit = {ctor: 'PrFit'};
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
var _gicentre$elm_vega$Vega$RCustom = function (a) {
	return {ctor: 'RCustom', _0: a};
};
var _gicentre$elm_vega$Vega$raCustom = _gicentre$elm_vega$Vega$RCustom;
var _gicentre$elm_vega$Vega$RHeatmap = {ctor: 'RHeatmap'};
var _gicentre$elm_vega$Vega$RRamp = {ctor: 'RRamp'};
var _gicentre$elm_vega$Vega$ROrdinal = {ctor: 'ROrdinal'};
var _gicentre$elm_vega$Vega$RDiverging = {ctor: 'RDiverging'};
var _gicentre$elm_vega$Vega$RCategory = {ctor: 'RCategory'};
var _gicentre$elm_vega$Vega$RSymbol = {ctor: 'RSymbol'};
var _gicentre$elm_vega$Vega$RHeight = {ctor: 'RHeight'};
var _gicentre$elm_vega$Vega$RWidth = {ctor: 'RWidth'};
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
var _gicentre$elm_vega$Vega$NTickCount = function (a) {
	return {ctor: 'NTickCount', _0: a};
};
var _gicentre$elm_vega$Vega$niTickCount = _gicentre$elm_vega$Vega$NTickCount;
var _gicentre$elm_vega$Vega$NFalse = {ctor: 'NFalse'};
var _gicentre$elm_vega$Vega$niFalse = _gicentre$elm_vega$Vega$NFalse;
var _gicentre$elm_vega$Vega$NTrue = {ctor: 'NTrue'};
var _gicentre$elm_vega$Vega$niTrue = _gicentre$elm_vega$Vega$NTrue;
var _gicentre$elm_vega$Vega$NInterval = F2(
	function (a, b) {
		return {ctor: 'NInterval', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$niInterval = F2(
	function (tu, step) {
		return A2(_gicentre$elm_vega$Vega$NInterval, tu, step);
	});
var _gicentre$elm_vega$Vega$NYear = {ctor: 'NYear'};
var _gicentre$elm_vega$Vega$niYear = _gicentre$elm_vega$Vega$NYear;
var _gicentre$elm_vega$Vega$NMonth = {ctor: 'NMonth'};
var _gicentre$elm_vega$Vega$niMonth = _gicentre$elm_vega$Vega$NMonth;
var _gicentre$elm_vega$Vega$NWeek = {ctor: 'NWeek'};
var _gicentre$elm_vega$Vega$niWeek = _gicentre$elm_vega$Vega$NWeek;
var _gicentre$elm_vega$Vega$NDay = {ctor: 'NDay'};
var _gicentre$elm_vega$Vega$niDay = _gicentre$elm_vega$Vega$NDay;
var _gicentre$elm_vega$Vega$NHour = {ctor: 'NHour'};
var _gicentre$elm_vega$Vega$niHour = _gicentre$elm_vega$Vega$NHour;
var _gicentre$elm_vega$Vega$NMinute = {ctor: 'NMinute'};
var _gicentre$elm_vega$Vega$niMinute = _gicentre$elm_vega$Vega$NMinute;
var _gicentre$elm_vega$Vega$NSecond = {ctor: 'NSecond'};
var _gicentre$elm_vega$Vega$niSecond = _gicentre$elm_vega$Vega$NSecond;
var _gicentre$elm_vega$Vega$NMillisecond = {ctor: 'NMillisecond'};
var _gicentre$elm_vega$Vega$niMillisecond = _gicentre$elm_vega$Vega$NMillisecond;
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
var _gicentre$elm_vega$Vega$RDefault = function (a) {
	return {ctor: 'RDefault', _0: a};
};
var _gicentre$elm_vega$Vega$raDefault = _gicentre$elm_vega$Vega$RDefault;
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
var _gicentre$elm_vega$Vega$raScheme = function (s) {
	return _gicentre$elm_vega$Vega$RScheme(s);
};
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
var _gicentre$elm_vega$Vega$SExtent = F2(
	function (a, b) {
		return {ctor: 'SExtent', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$csExtent = F2(
	function (mn, mx) {
		return A2(_gicentre$elm_vega$Vega$SExtent, mn, mx);
	});
var _gicentre$elm_vega$Vega$SCount = function (a) {
	return {ctor: 'SCount', _0: a};
};
var _gicentre$elm_vega$Vega$csCount = _gicentre$elm_vega$Vega$SCount;
var _gicentre$elm_vega$Vega$SScheme = function (a) {
	return {ctor: 'SScheme', _0: a};
};
var _gicentre$elm_vega$Vega$csScheme = _gicentre$elm_vega$Vega$SScheme;
var _gicentre$elm_vega$Vega$SBottom = {ctor: 'SBottom'};
var _gicentre$elm_vega$Vega$STop = {ctor: 'STop'};
var _gicentre$elm_vega$Vega$SRight = {ctor: 'SRight'};
var _gicentre$elm_vega$Vega$SLeft = {ctor: 'SLeft'};
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
var _gicentre$elm_vega$Vega$siName = _gicentre$elm_vega$Vega$SiName;
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
	var _p96 = dataRef;
	switch (_p96.ctor) {
		case 'DDataset':
			return {
				ctor: '_Tuple2',
				_0: 'data',
				_1: _elm_lang$core$Json_Encode$string(_p96._0)
			};
		case 'DField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$strSpec(_p96._0)
			};
		case 'DFields':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _gicentre$elm_vega$Vega$strSpec(_p96._0)
			};
		case 'DReferences':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$dataRefProperty, _p96._0))
			};
		default:
			var _p97 = _p96._0;
			return _elm_lang$core$Native_Utils.eq(
				_p97,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$Ascending,
					_1: {ctor: '[]'}
				}) ? {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$bool(true)
			} : {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$sortProperty, _p97))
			};
	}
};
var _gicentre$elm_vega$Vega$scaleDomainSpec = function (sdType) {
	var _p98 = sdType;
	switch (_p98.ctor) {
		case 'DoNums':
			return _gicentre$elm_vega$Vega$numSpec(_p98._0);
		case 'DoStrs':
			return _gicentre$elm_vega$Vega$strSpec(_p98._0);
		default:
			return _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$dataRefProperty, _p98._0));
	}
};
var _gicentre$elm_vega$Vega$scaleProperty = function (scaleProp) {
	var _p99 = scaleProp;
	switch (_p99.ctor) {
		case 'SType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$Vega$scaleLabel(_p99._0))
			};
		case 'SDomain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _gicentre$elm_vega$Vega$scaleDomainSpec(_p99._0)
			};
		case 'SDomainMax':
			return {
				ctor: '_Tuple2',
				_0: 'domainMax',
				_1: _gicentre$elm_vega$Vega$numSpec(_p99._0)
			};
		case 'SDomainMin':
			return {
				ctor: '_Tuple2',
				_0: 'domainMin',
				_1: _gicentre$elm_vega$Vega$numSpec(_p99._0)
			};
		case 'SDomainMid':
			return {
				ctor: '_Tuple2',
				_0: 'domainMid',
				_1: _gicentre$elm_vega$Vega$numSpec(_p99._0)
			};
		case 'SDomainRaw':
			return {
				ctor: '_Tuple2',
				_0: 'domainRaw',
				_1: _gicentre$elm_vega$Vega$valueSpec(_p99._0)
			};
		case 'SRange':
			var _p100 = _p99._0;
			switch (_p100.ctor) {
				case 'RNums':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p100._0))
					};
				case 'RStrs':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p100._0))
					};
				case 'RValues':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$valueSpec, _p100._0))
					};
				case 'RSignal':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$signalReferenceProperty(_p100._0),
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
									_0: _gicentre$elm_vega$Vega$SScheme(_p100._0),
									_1: _p100._1
								}))
					};
				case 'RData':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$dataRefProperty(_p100._0),
								_1: {ctor: '[]'}
							})
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
									_1: _gicentre$elm_vega$Vega$valueSpec(_p100._0)
								},
								_1: {ctor: '[]'}
							})
					};
				default:
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string(
							_gicentre$elm_vega$Vega$rangeDefaultLabel(_p100._0))
					};
			}
		case 'SPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$Vega$numSpec(_p99._0)
			};
		case 'SPaddingInner':
			return {
				ctor: '_Tuple2',
				_0: 'paddingInner',
				_1: _gicentre$elm_vega$Vega$numSpec(_p99._0)
			};
		case 'SPaddingOuter':
			return {
				ctor: '_Tuple2',
				_0: 'paddingOuter',
				_1: _gicentre$elm_vega$Vega$numSpec(_p99._0)
			};
		case 'SRangeStep':
			return {
				ctor: '_Tuple2',
				_0: 'rangeStep',
				_1: _gicentre$elm_vega$Vega$numSpec(_p99._0)
			};
		case 'SRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _gicentre$elm_vega$Vega$boolSpec(_p99._0)
			};
		case 'SClamp':
			return {
				ctor: '_Tuple2',
				_0: 'clamp',
				_1: _gicentre$elm_vega$Vega$boolSpec(_p99._0)
			};
		case 'SInterpolate':
			return {
				ctor: '_Tuple2',
				_0: 'interpolate',
				_1: _gicentre$elm_vega$Vega$interpolateSpec(_p99._0)
			};
		case 'SNice':
			return {
				ctor: '_Tuple2',
				_0: 'nice',
				_1: _gicentre$elm_vega$Vega$niceSpec(_p99._0)
			};
		case 'SZero':
			return {
				ctor: '_Tuple2',
				_0: 'zero',
				_1: _gicentre$elm_vega$Vega$boolSpec(_p99._0)
			};
		case 'SReverse':
			return {
				ctor: '_Tuple2',
				_0: 'reverse',
				_1: _gicentre$elm_vega$Vega$boolSpec(_p99._0)
			};
		case 'SExponent':
			return {
				ctor: '_Tuple2',
				_0: 'exponent',
				_1: _gicentre$elm_vega$Vega$numSpec(_p99._0)
			};
		case 'SBase':
			return {
				ctor: '_Tuple2',
				_0: 'base',
				_1: _gicentre$elm_vega$Vega$numSpec(_p99._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'align',
				_1: _gicentre$elm_vega$Vega$numSpec(_p99._0)
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
var _gicentre$elm_vega$Vega$OfSignal = function (a) {
	return {ctor: 'OfSignal', _0: a};
};
var _gicentre$elm_vega$Vega$ofSignal = _gicentre$elm_vega$Vega$OfSignal;
var _gicentre$elm_vega$Vega$OfNormalize = {ctor: 'OfNormalize'};
var _gicentre$elm_vega$Vega$OfCenter = {ctor: 'OfCenter'};
var _gicentre$elm_vega$Vega$OfZero = {ctor: 'OfZero'};
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
var _gicentre$elm_vega$Vega$CSquare = {ctor: 'CSquare'};
var _gicentre$elm_vega$Vega$CRound = {ctor: 'CRound'};
var _gicentre$elm_vega$Vega$CButt = {ctor: 'CButt'};
var _gicentre$elm_vega$Vega$JBevel = {ctor: 'JBevel'};
var _gicentre$elm_vega$Vega$JRound = {ctor: 'JRound'};
var _gicentre$elm_vega$Vega$JMiter = {ctor: 'JMiter'};
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
var _gicentre$elm_vega$Vega$RightToLeft = {ctor: 'RightToLeft'};
var _gicentre$elm_vega$Vega$LeftToRight = {ctor: 'LeftToRight'};
var _gicentre$elm_vega$Vega$Utc = function (a) {
	return {ctor: 'Utc', _0: a};
};
var _gicentre$elm_vega$Vega$utc = function (tu) {
	return _gicentre$elm_vega$Vega$Utc(tu);
};
var _gicentre$elm_vega$Vega$Millisecond = {ctor: 'Millisecond'};
var _gicentre$elm_vega$Vega$Second = {ctor: 'Second'};
var _gicentre$elm_vega$Vega$Minute = {ctor: 'Minute'};
var _gicentre$elm_vega$Vega$Hour = {ctor: 'Hour'};
var _gicentre$elm_vega$Vega$Day = {ctor: 'Day'};
var _gicentre$elm_vega$Vega$Week = {ctor: 'Week'};
var _gicentre$elm_vega$Vega$Month = {ctor: 'Month'};
var _gicentre$elm_vega$Vega$Year = {ctor: 'Year'};
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
var _gicentre$elm_vega$Vega$TInteractive = function (a) {
	return {ctor: 'TInteractive', _0: a};
};
var _gicentre$elm_vega$Vega$tiInteractive = _gicentre$elm_vega$Vega$TInteractive;
var _gicentre$elm_vega$Vega$TEncode = function (a) {
	return {ctor: 'TEncode', _0: a};
};
var _gicentre$elm_vega$Vega$tiEncode = _gicentre$elm_vega$Vega$TEncode;
var _gicentre$elm_vega$Vega$TAnchor = function (a) {
	return {ctor: 'TAnchor', _0: a};
};
var _gicentre$elm_vega$Vega$tiAnchor = _gicentre$elm_vega$Vega$TAnchor;
var _gicentre$elm_vega$Vega$TOrient = function (a) {
	return {ctor: 'TOrient', _0: a};
};
var _gicentre$elm_vega$Vega$tiOrient = _gicentre$elm_vega$Vega$TOrient;
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
var _gicentre$elm_vega$Vega$TResolveFilter = {ctor: 'TResolveFilter'};
var _gicentre$elm_vega$Vega$TCrossFilter = {ctor: 'TCrossFilter'};
var _gicentre$elm_vega$Vega$TTreeMap = {ctor: 'TTreeMap'};
var _gicentre$elm_vega$Vega$TTree = {ctor: 'TTree'};
var _gicentre$elm_vega$Vega$TPartition = {ctor: 'TPartition'};
var _gicentre$elm_vega$Vega$TPack = function (a) {
	return {ctor: 'TPack', _0: a};
};
var _gicentre$elm_vega$Vega$trPack = _gicentre$elm_vega$Vega$TPack;
var _gicentre$elm_vega$Vega$TTreeLinks = {ctor: 'TTreeLinks'};
var _gicentre$elm_vega$Vega$TStratify = F2(
	function (a, b) {
		return {ctor: 'TStratify', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trStratify = F2(
	function (key, parent) {
		return A2(_gicentre$elm_vega$Vega$TStratify, key, parent);
	});
var _gicentre$elm_vega$Vega$TNest = {ctor: 'TNest'};
var _gicentre$elm_vega$Vega$TWordCloud = {ctor: 'TWordCloud'};
var _gicentre$elm_vega$Vega$TVoronoi = {ctor: 'TVoronoi'};
var _gicentre$elm_vega$Vega$TForce = function (a) {
	return {ctor: 'TForce', _0: a};
};
var _gicentre$elm_vega$Vega$trForce = _gicentre$elm_vega$Vega$TForce;
var _gicentre$elm_vega$Vega$TStack = function (a) {
	return {ctor: 'TStack', _0: a};
};
var _gicentre$elm_vega$Vega$trStack = _gicentre$elm_vega$Vega$TStack;
var _gicentre$elm_vega$Vega$TPie = function (a) {
	return {ctor: 'TPie', _0: a};
};
var _gicentre$elm_vega$Vega$trPie = _gicentre$elm_vega$Vega$TPie;
var _gicentre$elm_vega$Vega$TLinkPath = function (a) {
	return {ctor: 'TLinkPath', _0: a};
};
var _gicentre$elm_vega$Vega$trLinkPath = function (lpProps) {
	return _gicentre$elm_vega$Vega$TLinkPath(lpProps);
};
var _gicentre$elm_vega$Vega$TGraticule = function (a) {
	return {ctor: 'TGraticule', _0: a};
};
var _gicentre$elm_vega$Vega$trGraticule = function (grProps) {
	return _gicentre$elm_vega$Vega$TGraticule(grProps);
};
var _gicentre$elm_vega$Vega$TGeoShape = F2(
	function (a, b) {
		return {ctor: 'TGeoShape', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trGeoShape = F2(
	function (pName, gsProps) {
		return A2(_gicentre$elm_vega$Vega$TGeoShape, pName, gsProps);
	});
var _gicentre$elm_vega$Vega$TGeoPoint = {ctor: 'TGeoPoint'};
var _gicentre$elm_vega$Vega$TGeoPath = F2(
	function (a, b) {
		return {ctor: 'TGeoPath', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trGeoPath = F2(
	function (pName, gpProps) {
		return A2(_gicentre$elm_vega$Vega$TGeoPath, pName, gpProps);
	});
var _gicentre$elm_vega$Vega$TGeoJson = {ctor: 'TGeoJson'};
var _gicentre$elm_vega$Vega$TContour = {ctor: 'TContour'};
var _gicentre$elm_vega$Vega$TWindow = {ctor: 'TWindow'};
var _gicentre$elm_vega$Vega$TSequence = {ctor: 'TSequence'};
var _gicentre$elm_vega$Vega$TSample = {ctor: 'TSample'};
var _gicentre$elm_vega$Vega$TProject = {ctor: 'TProject'};
var _gicentre$elm_vega$Vega$TLookup = F4(
	function (a, b, c, d) {
		return {ctor: 'TLookup', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$Vega$trLookup = F3(
	function (from, key, fields) {
		return A3(_gicentre$elm_vega$Vega$TLookup, from, key, fields);
	});
var _gicentre$elm_vega$Vega$TJoinAggregate = {ctor: 'TJoinAggregate'};
var _gicentre$elm_vega$Vega$TImpute = {ctor: 'TImpute'};
var _gicentre$elm_vega$Vega$TIdentifier = {ctor: 'TIdentifier'};
var _gicentre$elm_vega$Vega$TFormula = F3(
	function (a, b, c) {
		return {ctor: 'TFormula', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$Vega$trFormula = F2(
	function (ex, out) {
		return A2(_gicentre$elm_vega$Vega$TFormula, ex, out);
	});
var _gicentre$elm_vega$Vega$TFold = {ctor: 'TFold'};
var _gicentre$elm_vega$Vega$TFilter = function (a) {
	return {ctor: 'TFilter', _0: a};
};
var _gicentre$elm_vega$Vega$trFilter = _gicentre$elm_vega$Vega$TFilter;
var _gicentre$elm_vega$Vega$TExtentAsSignal = F2(
	function (a, b) {
		return {ctor: 'TExtentAsSignal', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trExtentAsSignal = F2(
	function (f, sigName) {
		return A2(_gicentre$elm_vega$Vega$TExtentAsSignal, f, sigName);
	});
var _gicentre$elm_vega$Vega$TExtent = function (a) {
	return {ctor: 'TExtent', _0: a};
};
var _gicentre$elm_vega$Vega$trExtent = _gicentre$elm_vega$Vega$TExtent;
var _gicentre$elm_vega$Vega$TDensity = {ctor: 'TDensity'};
var _gicentre$elm_vega$Vega$TCross = {ctor: 'TCross'};
var _gicentre$elm_vega$Vega$TCountPattern = {ctor: 'TCountPattern'};
var _gicentre$elm_vega$Vega$TCollect = {ctor: 'TCollect'};
var _gicentre$elm_vega$Vega$TBin = {ctor: 'TBin'};
var _gicentre$elm_vega$Vega$TAggregate = function (a) {
	return {ctor: 'TAggregate', _0: a};
};
var _gicentre$elm_vega$Vega$trAggregate = _gicentre$elm_vega$Vega$TAggregate;
var _gicentre$elm_vega$Vega$TrModifyValues = F2(
	function (a, b) {
		return {ctor: 'TrModifyValues', _0: a, _1: b};
	});
var _gicentre$elm_vega$Vega$trModifyValues = F2(
	function (key, val) {
		return A2(_gicentre$elm_vega$Vega$TrModifyValues, key, val);
	});
var _gicentre$elm_vega$Vega$TrToggle = function (a) {
	return {ctor: 'TrToggle', _0: a};
};
var _gicentre$elm_vega$Vega$trToggle = _gicentre$elm_vega$Vega$TrToggle;
var _gicentre$elm_vega$Vega$TrRemoveAll = {ctor: 'TrRemoveAll'};
var _gicentre$elm_vega$Vega$trRemoveAll = _gicentre$elm_vega$Vega$TrRemoveAll;
var _gicentre$elm_vega$Vega$TrRemove = function (a) {
	return {ctor: 'TrRemove', _0: a};
};
var _gicentre$elm_vega$Vega$trRemove = _gicentre$elm_vega$Vega$TrRemove;
var _gicentre$elm_vega$Vega$TrInsert = function (a) {
	return {ctor: 'TrInsert', _0: a};
};
var _gicentre$elm_vega$Vega$trInsert = _gicentre$elm_vega$Vega$TrInsert;
var _gicentre$elm_vega$Vega$TrTrigger = function (a) {
	return {ctor: 'TrTrigger', _0: a};
};
var _gicentre$elm_vega$Vega$trigger = F2(
	function (trName, trProps) {
		return _elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$List$concatMap,
				_gicentre$elm_vega$Vega$triggerProperties,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$TrTrigger(trName),
					_1: trProps
				}));
	});
var _gicentre$elm_vega$Vega$Alphabetic = {ctor: 'Alphabetic'};
var _gicentre$elm_vega$Vega$AlignBottom = {ctor: 'AlignBottom'};
var _gicentre$elm_vega$Vega$AlignMiddle = {ctor: 'AlignMiddle'};
var _gicentre$elm_vega$Vega$AlignTop = {ctor: 'AlignTop'};
var _gicentre$elm_vega$Vega$DBools = function (a) {
	return {ctor: 'DBools', _0: a};
};
var _gicentre$elm_vega$Vega$daBools = _gicentre$elm_vega$Vega$DBools;
var _gicentre$elm_vega$Vega$DNums = function (a) {
	return {ctor: 'DNums', _0: a};
};
var _gicentre$elm_vega$Vega$daNums = _gicentre$elm_vega$Vega$DNums;
var _gicentre$elm_vega$Vega$DStrs = function (a) {
	return {ctor: 'DStrs', _0: a};
};
var _gicentre$elm_vega$Vega$daStrs = _gicentre$elm_vega$Vega$DStrs;
var _gicentre$elm_vega$Vega$StrSignals = function (a) {
	return {ctor: 'StrSignals', _0: a};
};
var _gicentre$elm_vega$Vega$strSignals = _gicentre$elm_vega$Vega$StrSignals;
var _gicentre$elm_vega$Vega$StrSignal = function (a) {
	return {ctor: 'StrSignal', _0: a};
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
var _gicentre$elm_vega$Vega$NumNull = {ctor: 'NumNull'};
var _gicentre$elm_vega$Vega$NumExpr = function (a) {
	return {ctor: 'NumExpr', _0: a};
};
var _gicentre$elm_vega$Vega$numExpr = _gicentre$elm_vega$Vega$NumExpr;
var _gicentre$elm_vega$Vega$NumSignals = function (a) {
	return {ctor: 'NumSignals', _0: a};
};
var _gicentre$elm_vega$Vega$numSignals = _gicentre$elm_vega$Vega$NumSignals;
var _gicentre$elm_vega$Vega$graticuleProperty = function (grProp) {
	var _p101 = grProp;
	switch (_p101.ctor) {
		case 'GrField':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _gicentre$elm_vega$Vega$fieldSpec(_p101._0)
			};
		case 'GrExtentMajor':
			var _p103 = _p101._0;
			var _p102 = _p103;
			_v93_2:
			do {
				switch (_p102.ctor) {
					case 'Nums':
						if (((_p102._0.ctor === '::') && (_p102._0._1.ctor === '::')) && (_p102._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'extentMajor',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$float(_p102._0._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p102._0._1._0),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v93_2;
						}
					case 'NumSignals':
						if (((_p102._0.ctor === '::') && (_p102._0._1.ctor === '::')) && (_p102._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'extentMajor',
								_1: _gicentre$elm_vega$Vega$numSpec(
									_gicentre$elm_vega$Vega$NumSignals(
										{
											ctor: '::',
											_0: _p102._0._0,
											_1: {
												ctor: '::',
												_0: _p102._0._1._0,
												_1: {ctor: '[]'}
											}
										}))
							};
						} else {
							break _v93_2;
						}
					default:
						break _v93_2;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: grExtentMajor expecting array of 2 numbers or signals but was given ',
					_elm_lang$core$Basics$toString(_p103)),
				{ctor: '_Tuple2', _0: 'extentMajor', _1: _elm_lang$core$Json_Encode$null});
		case 'GrExtentMinor':
			var _p105 = _p101._0;
			var _p104 = _p105;
			_v94_2:
			do {
				switch (_p104.ctor) {
					case 'Nums':
						if (((_p104._0.ctor === '::') && (_p104._0._1.ctor === '::')) && (_p104._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'extentMinor',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$float(_p104._0._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p104._0._1._0),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v94_2;
						}
					case 'NumSignals':
						if (((_p104._0.ctor === '::') && (_p104._0._1.ctor === '::')) && (_p104._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'extentMinor',
								_1: _gicentre$elm_vega$Vega$numSpec(
									_gicentre$elm_vega$Vega$NumSignals(
										{
											ctor: '::',
											_0: _p104._0._0,
											_1: {
												ctor: '::',
												_0: _p104._0._1._0,
												_1: {ctor: '[]'}
											}
										}))
							};
						} else {
							break _v94_2;
						}
					default:
						break _v94_2;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: grExtentMinor expecting array of 2 numbers or signals but was given ',
					_elm_lang$core$Basics$toString(_p105)),
				{ctor: '_Tuple2', _0: 'extentMinor', _1: _elm_lang$core$Json_Encode$null});
		case 'GrExtent':
			var _p107 = _p101._0;
			var _p106 = _p107;
			_v95_2:
			do {
				switch (_p106.ctor) {
					case 'Nums':
						if (((_p106._0.ctor === '::') && (_p106._0._1.ctor === '::')) && (_p106._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'extent',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$float(_p106._0._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p106._0._1._0),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v95_2;
						}
					case 'NumSignals':
						if (((_p106._0.ctor === '::') && (_p106._0._1.ctor === '::')) && (_p106._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'extent',
								_1: _gicentre$elm_vega$Vega$numSpec(
									_gicentre$elm_vega$Vega$NumSignals(
										{
											ctor: '::',
											_0: _p106._0._0,
											_1: {
												ctor: '::',
												_0: _p106._0._1._0,
												_1: {ctor: '[]'}
											}
										}))
							};
						} else {
							break _v95_2;
						}
					default:
						break _v95_2;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: grExtent expecting array of 2 numbers or signals but was given ',
					_elm_lang$core$Basics$toString(_p107)),
				{ctor: '_Tuple2', _0: 'extent', _1: _elm_lang$core$Json_Encode$null});
		case 'GrStepMajor':
			var _p109 = _p101._0;
			var _p108 = _p109;
			_v96_2:
			do {
				switch (_p108.ctor) {
					case 'Nums':
						if (((_p108._0.ctor === '::') && (_p108._0._1.ctor === '::')) && (_p108._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'stepMajor',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$float(_p108._0._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p108._0._1._0),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v96_2;
						}
					case 'NumSignals':
						if (((_p108._0.ctor === '::') && (_p108._0._1.ctor === '::')) && (_p108._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'stepMajor',
								_1: _gicentre$elm_vega$Vega$numSpec(
									_gicentre$elm_vega$Vega$NumSignals(
										{
											ctor: '::',
											_0: _p108._0._0,
											_1: {
												ctor: '::',
												_0: _p108._0._1._0,
												_1: {ctor: '[]'}
											}
										}))
							};
						} else {
							break _v96_2;
						}
					default:
						break _v96_2;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: grStepMajor expecting array of 2 numbers or signals but was given ',
					_elm_lang$core$Basics$toString(_p109)),
				{ctor: '_Tuple2', _0: 'stepMajor', _1: _elm_lang$core$Json_Encode$null});
		case 'GrStepMinor':
			var _p111 = _p101._0;
			var _p110 = _p111;
			_v97_2:
			do {
				switch (_p110.ctor) {
					case 'Nums':
						if (((_p110._0.ctor === '::') && (_p110._0._1.ctor === '::')) && (_p110._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'stepMinor',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$float(_p110._0._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p110._0._1._0),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v97_2;
						}
					case 'NumSignals':
						if (((_p110._0.ctor === '::') && (_p110._0._1.ctor === '::')) && (_p110._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'stepMinor',
								_1: _gicentre$elm_vega$Vega$numSpec(
									_gicentre$elm_vega$Vega$NumSignals(
										{
											ctor: '::',
											_0: _p110._0._0,
											_1: {
												ctor: '::',
												_0: _p110._0._1._0,
												_1: {ctor: '[]'}
											}
										}))
							};
						} else {
							break _v97_2;
						}
					default:
						break _v97_2;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: grStepMinor expecting array of 2 numbers or signals but was given ',
					_elm_lang$core$Basics$toString(_p111)),
				{ctor: '_Tuple2', _0: 'stepMinor', _1: _elm_lang$core$Json_Encode$null});
		case 'GrStep':
			var _p113 = _p101._0;
			var _p112 = _p113;
			_v98_2:
			do {
				switch (_p112.ctor) {
					case 'Nums':
						if (((_p112._0.ctor === '::') && (_p112._0._1.ctor === '::')) && (_p112._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'step',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$float(_p112._0._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p112._0._1._0),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v98_2;
						}
					case 'NumSignals':
						if (((_p112._0.ctor === '::') && (_p112._0._1.ctor === '::')) && (_p112._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'step',
								_1: _gicentre$elm_vega$Vega$numSpec(
									_gicentre$elm_vega$Vega$NumSignals(
										{
											ctor: '::',
											_0: _p112._0._0,
											_1: {
												ctor: '::',
												_0: _p112._0._1._0,
												_1: {ctor: '[]'}
											}
										}))
							};
						} else {
							break _v98_2;
						}
					default:
						break _v98_2;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: grStep expecting array of 2 numbers or signals but was given ',
					_elm_lang$core$Basics$toString(_p113)),
				{ctor: '_Tuple2', _0: 'step', _1: _elm_lang$core$Json_Encode$null});
		default:
			return {
				ctor: '_Tuple2',
				_0: 'precision',
				_1: _gicentre$elm_vega$Vega$numSpec(_p101._0)
			};
	}
};
var _gicentre$elm_vega$Vega$transformSpec = function (trans) {
	var _p114 = trans;
	switch (_p114.ctor) {
		case 'TAggregate':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('aggregate')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$aggregateProperty, _p114._0)
				});
		case 'TBin':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('bin')
					},
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
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
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p114._0)
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
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p114._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'signal',
								_1: _elm_lang$core$Json_Encode$string(_p114._1)
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
						_0: _gicentre$elm_vega$Vega$exprProperty(_p114._0),
						_1: {ctor: '[]'}
					}
				});
		case 'TFold':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('fold')
					},
					_1: {ctor: '[]'}
				});
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
							_1: _gicentre$elm_vega$Vega$expressionSpec(_p114._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'as',
								_1: _elm_lang$core$Json_Encode$string(_p114._1)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'initonly',
									_1: _gicentre$elm_vega$Vega$formulaUpdateSpec(_p114._2)
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
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
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
							_1: _elm_lang$core$Json_Encode$string(_p114._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'key',
								_1: _gicentre$elm_vega$Vega$fieldSpec(_p114._1)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'fields',
									_1: _elm_lang$core$Json_Encode$list(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$fieldSpec, _p114._2))
								},
								_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$lookupProperty, _p114._3)
							}
						}
					}
				});
		case 'TProject':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('project')
					},
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
				});
		case 'TSequence':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('sequence')
					},
					_1: {ctor: '[]'}
				});
		case 'TWindow':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('window')
					},
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
				});
		case 'TGeoPath':
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
							_1: _elm_lang$core$Json_Encode$string(_p114._0)
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$geoPathProperty, _p114._1)
					}
				});
		case 'TGeoPoint':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('geopoint')
					},
					_1: {ctor: '[]'}
				});
		case 'TGeoShape':
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
							_1: _elm_lang$core$Json_Encode$string(_p114._0)
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$geoPathProperty, _p114._1)
					}
				});
		case 'TGraticule':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('graticule')
					},
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$graticuleProperty, _p114._0)
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
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$linkPathProperty, _p114._0)
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
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$pieProperty, _p114._0)
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
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$stackProperty, _p114._0)
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
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$forceSimulationProperty, _p114._0)
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
					_1: {ctor: '[]'}
				});
		case 'TWordCloud':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('wordcloud')
					},
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
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
							_1: _gicentre$elm_vega$Vega$fieldSpec(_p114._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'parentKey',
								_1: _gicentre$elm_vega$Vega$fieldSpec(_p114._1)
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
					_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$packProperty, _p114._0)
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
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
				});
		case 'TTreeMap':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('treemap')
					},
					_1: {ctor: '[]'}
				});
		case 'TCrossFilter':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('crossfilter')
					},
					_1: {ctor: '[]'}
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
					_1: {ctor: '[]'}
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
	var _p115 = mProp;
	switch (_p115.ctor) {
		case 'MType':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$Vega$markLabel(_p115._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MClip':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'clip',
					_1: _gicentre$elm_vega$Vega$clipSpec(_p115._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MDescription':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'description',
					_1: _elm_lang$core$Json_Encode$string(_p115._0)
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
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$encodingProperty, _p115._0))
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
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$sourceProperty, _p115._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MInteractive':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'interactive',
					_1: _gicentre$elm_vega$Vega$boolSpec(_p115._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MKey':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'key',
					_1: _gicentre$elm_vega$Vega$fieldSpec(_p115._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MName':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'name',
					_1: _elm_lang$core$Json_Encode$string(_p115._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MOn':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'on',
					_1: _elm_lang$core$Json_Encode$list(_p115._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MRole':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'role',
					_1: _elm_lang$core$Json_Encode$string(_p115._0)
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
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$comparatorProperty, _p115._0))
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
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$transformSpec, _p115._0))
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
						A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p115._0))
				},
				_1: {ctor: '[]'}
			};
		default:
			return A2(
				_elm_lang$core$List$map,
				function (_p116) {
					var _p117 = _p116;
					return {
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$Vega$vPropertyLabel(_p117._0),
						_1: _p117._1
					};
				},
				_p115._0);
	}
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
var _gicentre$elm_vega$Vega$NumSignal = function (a) {
	return {ctor: 'NumSignal', _0: a};
};
var _gicentre$elm_vega$Vega$numSignal = _gicentre$elm_vega$Vega$NumSignal;
var _gicentre$elm_vega$Vega$projectionProperty = function (projProp) {
	var _p118 = projProp;
	switch (_p118.ctor) {
		case 'PrType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _gicentre$elm_vega$Vega$projectionSpec(_p118._0)
			};
		case 'PrClipAngle':
			var _p120 = _p118._0;
			var _p119 = _p120;
			if ((_p119.ctor === 'Num') && (_p119._0 === 0)) {
				return {ctor: '_Tuple2', _0: 'clipAngle', _1: _elm_lang$core$Json_Encode$null};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'clipAngle',
					_1: _gicentre$elm_vega$Vega$numSpec(_p120)
				};
			}
		case 'PrClipExtent':
			var _p122 = _p118._0;
			var _p121 = _p122;
			_v104_3:
			do {
				switch (_p121.ctor) {
					case 'Nums':
						if (((((_p121._0.ctor === '::') && (_p121._0._1.ctor === '::')) && (_p121._0._1._1.ctor === '::')) && (_p121._0._1._1._1.ctor === '::')) && (_p121._0._1._1._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'clipExtent',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$list(
											{
												ctor: '::',
												_0: _elm_lang$core$Json_Encode$float(_p121._0._0),
												_1: {
													ctor: '::',
													_0: _elm_lang$core$Json_Encode$float(_p121._0._1._0),
													_1: {ctor: '[]'}
												}
											}),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$list(
												{
													ctor: '::',
													_0: _elm_lang$core$Json_Encode$float(_p121._0._1._1._0),
													_1: {
														ctor: '::',
														_0: _elm_lang$core$Json_Encode$float(_p121._0._1._1._1._0),
														_1: {ctor: '[]'}
													}
												}),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v104_3;
						}
					case 'NumSignal':
						return {
							ctor: '_Tuple2',
							_0: 'clipExtent',
							_1: _gicentre$elm_vega$Vega$numSpec(
								_gicentre$elm_vega$Vega$NumSignal(_p121._0))
						};
					case 'NumSignals':
						if (((((_p121._0.ctor === '::') && (_p121._0._1.ctor === '::')) && (_p121._0._1._1.ctor === '::')) && (_p121._0._1._1._1.ctor === '::')) && (_p121._0._1._1._1._1.ctor === '[]')) {
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
													_0: _p121._0._0,
													_1: {
														ctor: '::',
														_0: _p121._0._1._0,
														_1: {ctor: '[]'}
													}
												})),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$numSpec(
												_gicentre$elm_vega$Vega$NumSignals(
													{
														ctor: '::',
														_0: _p121._0._1._1._0,
														_1: {
															ctor: '::',
															_0: _p121._0._1._1._1._0,
															_1: {ctor: '[]'}
														}
													})),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v104_3;
						}
					default:
						break _v104_3;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: prClipExtent expecting array of 4 numbers but was given ',
					_elm_lang$core$Basics$toString(_p122)),
				{ctor: '_Tuple2', _0: 'clipExtent', _1: _elm_lang$core$Json_Encode$null});
		case 'PrScale':
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrTranslate':
			var _p124 = _p118._0;
			var _p123 = _p124;
			_v105_3:
			do {
				switch (_p123.ctor) {
					case 'Nums':
						if (((_p123._0.ctor === '::') && (_p123._0._1.ctor === '::')) && (_p123._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'translate',
								_1: _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$float(_p123._0._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p123._0._1._0),
											_1: {ctor: '[]'}
										}
									})
							};
						} else {
							break _v105_3;
						}
					case 'NumSignal':
						return {
							ctor: '_Tuple2',
							_0: 'translate',
							_1: _gicentre$elm_vega$Vega$numSpec(
								_gicentre$elm_vega$Vega$NumSignal(_p123._0))
						};
					case 'NumSignals':
						if (((_p123._0.ctor === '::') && (_p123._0._1.ctor === '::')) && (_p123._0._1._1.ctor === '[]')) {
							return {
								ctor: '_Tuple2',
								_0: 'translate',
								_1: _gicentre$elm_vega$Vega$numSpec(
									_gicentre$elm_vega$Vega$NumSignals(
										{
											ctor: '::',
											_0: _p123._0._0,
											_1: {
												ctor: '::',
												_0: _p123._0._1._0,
												_1: {ctor: '[]'}
											}
										}))
							};
						} else {
							break _v105_3;
						}
					default:
						break _v105_3;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: prTranslate expecting array of 2 numbers but was given ',
					_elm_lang$core$Basics$toString(_p124)),
				{ctor: '_Tuple2', _0: 'translate', _1: _elm_lang$core$Json_Encode$null});
		case 'PrCenter':
			return {
				ctor: '_Tuple2',
				_0: 'center',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrRotate':
			var _p126 = _p118._0;
			var _p125 = _p126;
			_v106_5:
			do {
				switch (_p125.ctor) {
					case 'Nums':
						if ((_p125._0.ctor === '::') && (_p125._0._1.ctor === '::')) {
							if (_p125._0._1._1.ctor === '[]') {
								return {
									ctor: '_Tuple2',
									_0: 'rotate',
									_1: _elm_lang$core$Json_Encode$list(
										{
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p125._0._0),
											_1: {
												ctor: '::',
												_0: _elm_lang$core$Json_Encode$float(_p125._0._1._0),
												_1: {ctor: '[]'}
											}
										})
								};
							} else {
								if (_p125._0._1._1._1.ctor === '[]') {
									return {
										ctor: '_Tuple2',
										_0: 'rotate',
										_1: _elm_lang$core$Json_Encode$list(
											{
												ctor: '::',
												_0: _elm_lang$core$Json_Encode$float(_p125._0._0),
												_1: {
													ctor: '::',
													_0: _elm_lang$core$Json_Encode$float(_p125._0._1._0),
													_1: {
														ctor: '::',
														_0: _elm_lang$core$Json_Encode$float(_p125._0._1._1._0),
														_1: {ctor: '[]'}
													}
												}
											})
									};
								} else {
									break _v106_5;
								}
							}
						} else {
							break _v106_5;
						}
					case 'NumSignal':
						return {
							ctor: '_Tuple2',
							_0: 'rotate',
							_1: _gicentre$elm_vega$Vega$numSpec(
								_gicentre$elm_vega$Vega$NumSignal(_p125._0))
						};
					case 'NumSignals':
						if ((_p125._0.ctor === '::') && (_p125._0._1.ctor === '::')) {
							if (_p125._0._1._1.ctor === '[]') {
								return {
									ctor: '_Tuple2',
									_0: 'rotate',
									_1: _gicentre$elm_vega$Vega$numSpec(
										_gicentre$elm_vega$Vega$NumSignals(
											{
												ctor: '::',
												_0: _p125._0._0,
												_1: {
													ctor: '::',
													_0: _p125._0._1._0,
													_1: {ctor: '[]'}
												}
											}))
								};
							} else {
								if (_p125._0._1._1._1.ctor === '[]') {
									return {
										ctor: '_Tuple2',
										_0: 'rotate',
										_1: _gicentre$elm_vega$Vega$numSpec(
											_gicentre$elm_vega$Vega$NumSignals(
												{
													ctor: '::',
													_0: _p125._0._0,
													_1: {
														ctor: '::',
														_0: _p125._0._1._0,
														_1: {
															ctor: '::',
															_0: _p125._0._1._1._0,
															_1: {ctor: '[]'}
														}
													}
												}))
									};
								} else {
									break _v106_5;
								}
							}
						} else {
							break _v106_5;
						}
					default:
						break _v106_5;
				}
			} while(false);
			return A2(
				_elm_lang$core$Debug$log,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Warning: prRotate expecting array of 2 or 3 numbers but was given ',
					_elm_lang$core$Basics$toString(_p126)),
				{ctor: '_Tuple2', _0: 'rotate', _1: _elm_lang$core$Json_Encode$null});
		case 'PrPointRadius':
			return {
				ctor: '_Tuple2',
				_0: 'pointRadius',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrPrecision':
			return {
				ctor: '_Tuple2',
				_0: 'precision',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrFit':
			return {ctor: '_Tuple2', _0: 'fit', _1: _elm_lang$core$Json_Encode$null};
		case 'PrExtent':
			return {ctor: '_Tuple2', _0: 'extent', _1: _elm_lang$core$Json_Encode$null};
		case 'PrSize':
			return {ctor: '_Tuple2', _0: 'size', _1: _elm_lang$core$Json_Encode$null};
		case 'PrCoefficient':
			return {
				ctor: '_Tuple2',
				_0: 'coefficient',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrDistance':
			return {
				ctor: '_Tuple2',
				_0: 'distance',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrFraction':
			return {
				ctor: '_Tuple2',
				_0: 'fraction',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrLobes':
			return {
				ctor: '_Tuple2',
				_0: 'lobes',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrParallel':
			return {
				ctor: '_Tuple2',
				_0: 'parallel',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrRadius':
			return {
				ctor: '_Tuple2',
				_0: 'radius',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrRatio':
			return {
				ctor: '_Tuple2',
				_0: 'ratio',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		case 'PrSpacing':
			return {
				ctor: '_Tuple2',
				_0: 'spacing',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'tilt',
				_1: _gicentre$elm_vega$Vega$numSpec(_p118._0)
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
var _gicentre$elm_vega$Vega$Nums = function (a) {
	return {ctor: 'Nums', _0: a};
};
var _gicentre$elm_vega$Vega$nums = _gicentre$elm_vega$Vega$Nums;
var _gicentre$elm_vega$Vega$Num = function (a) {
	return {ctor: 'Num', _0: a};
};
var _gicentre$elm_vega$Vega$num = _gicentre$elm_vega$Vega$Num;
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
var _gicentre$elm_vega$Vega$vScale = _gicentre$elm_vega$Vega$VScale;
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
var _gicentre$elm_vega$Vega$sigHeight = _gicentre$elm_vega$Vega$VSignal('height');
var _gicentre$elm_vega$Vega$sigPadding = _gicentre$elm_vega$Vega$VSignal('padding');
var _gicentre$elm_vega$Vega$sigWidth = _gicentre$elm_vega$Vega$VSignal('width');
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
var _gicentre$elm_vega$Vega$vBoo = _gicentre$elm_vega$Vega$VBoo;
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
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$Vega$titleProperty, tps))
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

var _gicentre$elm_vega$GalleryScatter$scatterplot4 = function () {
	var mk = function (_p0) {
		return _gicentre$elm_vega$Vega$marks(
			A3(
				_gicentre$elm_vega$Vega$mark,
				_gicentre$elm_vega$Vega$Rect,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$mFrom(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$srData(
								_gicentre$elm_vega$Vega$str('summary')),
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
												_0: _gicentre$elm_vega$Vega$vStr('black'),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maHeight(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(1),
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
													_0: _gicentre$elm_vega$Vega$vScale(
														_gicentre$elm_vega$Vega$fName('xScale')),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vSignal('datum[measure+\'0\']'),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale(
															_gicentre$elm_vega$Vega$fName('yScale')),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fName('variety')),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vBand(0.5),
																_1: {ctor: '[]'}
															}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maX2(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale(
																_gicentre$elm_vega$Vega$fName('xScale')),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vSignal('datum[measure+\'1\']'),
																_1: {ctor: '[]'}
															}
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
						_0: _gicentre$elm_vega$Vega$mFrom(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$srData(
									_gicentre$elm_vega$Vega$str('summary')),
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
													_0: _gicentre$elm_vega$Vega$vStr('back'),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maSize(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vNum(40),
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
														_0: _gicentre$elm_vega$Vega$vScale(
															_gicentre$elm_vega$Vega$fName('xScale')),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fName('mean')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale(
																_gicentre$elm_vega$Vega$fName('yScale')),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$fName('variety')),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vBand(0.5),
																	_1: {ctor: '[]'}
																}
															}
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
					_p0)));
	};
	var ax = function (_p1) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'xScale',
				_gicentre$elm_vega$Vega$SBottom,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axZIndex(1),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axTitle(
							_gicentre$elm_vega$Vega$str('Barley Yield')),
						_1: {ctor: '[]'}
					}
				},
				A4(
					_gicentre$elm_vega$Vega$axis,
					'yScale',
					_gicentre$elm_vega$Vega$SLeft,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axTickCount(5),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axZIndex(1),
							_1: {ctor: '[]'}
						}
					},
					_p1)));
	};
	var sc = function (_p2) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'xScale',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scRange(
							_gicentre$elm_vega$Vega$raDefault(_gicentre$elm_vega$Vega$RWidth)),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scDomain(
								_gicentre$elm_vega$Vega$doData(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daDataset('summary'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daFields(
												_gicentre$elm_vega$Vega$strs(
													{
														ctor: '::',
														_0: 'stdev0',
														_1: {
															ctor: '::',
															_0: 'stdev1',
															_1: {ctor: '[]'}
														}
													})),
											_1: {ctor: '[]'}
										}
									})),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scRound(
									_gicentre$elm_vega$Vega$boo(true)),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$niTrue),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scZero(
											_gicentre$elm_vega$Vega$boo(false)),
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
						_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScBand),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(
								_gicentre$elm_vega$Vega$raDefault(_gicentre$elm_vega$Vega$RHeight)),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doData(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daDataset('summary'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daField(
													_gicentre$elm_vega$Vega$str('variety')),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daSort(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$soOp(_gicentre$elm_vega$Vega$maximum),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$soByField(
																	_gicentre$elm_vega$Vega$str('mean')),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$Descending,
																	_1: {ctor: '[]'}
																}
															}
														}),
													_1: {ctor: '[]'}
												}
											}
										})),
								_1: {ctor: '[]'}
							}
						}
					},
					_p2)));
	};
	var si = function (_p3) {
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_gicentre$elm_vega$Vega$signal,
				'errorMeasure',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siValue(
						_gicentre$elm_vega$Vega$vStr('95% Confidence Interval')),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siBind(
							_gicentre$elm_vega$Vega$iSelect(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$inOptions(
										_gicentre$elm_vega$Vega$vStrs(
											{
												ctor: '::',
												_0: '95% Confidence Interval',
												_1: {
													ctor: '::',
													_0: 'Standard Error',
													_1: {
														ctor: '::',
														_0: 'Standard Deviation',
														_1: {
															ctor: '::',
															_0: 'Interquartile Range',
															_1: {ctor: '[]'}
														}
													}
												}
											})),
									_1: {ctor: '[]'}
								})),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$signal,
					'lookup',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siValue(
							_gicentre$elm_vega$Vega$vObject(
								{
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$Vega$keyValue,
										'95% Confidence Interval',
										_gicentre$elm_vega$Vega$vStr('ci')),
									_1: {
										ctor: '::',
										_0: A2(
											_gicentre$elm_vega$Vega$keyValue,
											'Standard Deviation',
											_gicentre$elm_vega$Vega$vStr('stdev')),
										_1: {
											ctor: '::',
											_0: A2(
												_gicentre$elm_vega$Vega$keyValue,
												'Standard Error',
												_gicentre$elm_vega$Vega$vStr('stderr')),
											_1: {
												ctor: '::',
												_0: A2(
													_gicentre$elm_vega$Vega$keyValue,
													'Interquartile Range',
													_gicentre$elm_vega$Vega$vStr('iqr')),
												_1: {ctor: '[]'}
											}
										}
									}
								})),
						_1: {ctor: '[]'}
					},
					A3(
						_gicentre$elm_vega$Vega$signal,
						'measure',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siUpdate('lookup[errorMeasure]'),
							_1: {ctor: '[]'}
						},
						_p3))));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$data,
				'barley',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$daUrl('https://vega.github.io/vega/data/barley.json'),
					_1: {ctor: '[]'}
				}),
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
										_0: _gicentre$elm_vega$Vega$str('variety'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$agFields(
										A2(
											_elm_lang$core$List$repeat,
											7,
											_gicentre$elm_vega$Vega$str('yield'))),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$agOps(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$mean,
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$stdev,
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$stderr,
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$ci0,
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$ci1,
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$q1,
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$q3,
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$agAs(
												{
													ctor: '::',
													_0: 'mean',
													_1: {
														ctor: '::',
														_0: 'stdev',
														_1: {
															ctor: '::',
															_0: 'stderr',
															_1: {
																ctor: '::',
																_0: 'ci0',
																_1: {
																	ctor: '::',
																	_0: 'ci1',
																	_1: {
																		ctor: '::',
																		_0: 'iqr0',
																		_1: {
																			ctor: '::',
																			_0: 'iqr1',
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}
														}
													}
												}),
											_1: {ctor: '[]'}
										}
									}
								}
							}),
						_1: {
							ctor: '::',
							_0: A3(_gicentre$elm_vega$Vega$trFormula, 'datum.mean - datum.stdev', 'stdev0', _gicentre$elm_vega$Vega$AlwaysUpdate),
							_1: {
								ctor: '::',
								_0: A3(_gicentre$elm_vega$Vega$trFormula, 'datum.mean + datum.stdev', 'stdev1', _gicentre$elm_vega$Vega$AlwaysUpdate),
								_1: {
									ctor: '::',
									_0: A3(_gicentre$elm_vega$Vega$trFormula, 'datum.mean - datum.stderr', 'stderr0', _gicentre$elm_vega$Vega$AlwaysUpdate),
									_1: {
										ctor: '::',
										_0: A3(_gicentre$elm_vega$Vega$trFormula, 'datum.mean + datum.stderr', 'stderr1', _gicentre$elm_vega$Vega$AlwaysUpdate),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					A2(
						_gicentre$elm_vega$Vega$data,
						'summary',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$daSource('barley'),
							_1: {ctor: '[]'}
						})),
				_1: {ctor: '[]'}
			}
		});
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$width(500),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$height(160),
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
var _gicentre$elm_vega$GalleryScatter$scatterplot3 = function () {
	var mk = function (_p4) {
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
								_gicentre$elm_vega$Vega$str('drive')),
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
										_0: _gicentre$elm_vega$Vega$maInterpolate(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vStr(
													_gicentre$elm_vega$Vega$markInterpolationLabel(_gicentre$elm_vega$Vega$Cardinal)),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maX(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vScale(
														_gicentre$elm_vega$Vega$fName('xScale')),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vField(
															_gicentre$elm_vega$Vega$fName('miles')),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale(
															_gicentre$elm_vega$Vega$fName('yScale')),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fName('gas')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maStroke(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vStr('#000'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maStrokeWidth(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(3),
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
						_0: _gicentre$elm_vega$Vega$mFrom(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$srData(
									_gicentre$elm_vega$Vega$str('drive')),
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
													_0: _gicentre$elm_vega$Vega$vScale(
														_gicentre$elm_vega$Vega$fName('xScale')),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vField(
															_gicentre$elm_vega$Vega$fName('miles')),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale(
															_gicentre$elm_vega$Vega$fName('yScale')),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fName('gas')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFill(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vStr('#fff'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maStroke(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vStr('#000'),
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
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maSize(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vNum(49),
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
					A3(
						_gicentre$elm_vega$Vega$mark,
						_gicentre$elm_vega$Vega$Text,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$mFrom(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$srData(
										_gicentre$elm_vega$Vega$str('drive')),
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
														_0: _gicentre$elm_vega$Vega$vScale(
															_gicentre$elm_vega$Vega$fName('xScale')),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fName('miles')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale(
																_gicentre$elm_vega$Vega$fName('yScale')),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$fName('gas')),
																_1: {ctor: '[]'}
															}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maDx(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vScale(
																	_gicentre$elm_vega$Vega$fName('dx')),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vField(
																		_gicentre$elm_vega$Vega$fName('side')),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maDy(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vScale(
																		_gicentre$elm_vega$Vega$fName('dy')),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vField(
																			_gicentre$elm_vega$Vega$fName('side')),
																		_1: {ctor: '[]'}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maFill(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vStr('#000'),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maText(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vField(
																				_gicentre$elm_vega$Vega$fName('year')),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maAlign(
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vScale(
																					_gicentre$elm_vega$Vega$fName('alignScale')),
																				_1: {
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$vField(
																						_gicentre$elm_vega$Vega$fName('side')),
																					_1: {ctor: '[]'}
																				}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$maBaseline(
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$vScale(
																						_gicentre$elm_vega$Vega$fName('baseScale')),
																					_1: {
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$vField(
																							_gicentre$elm_vega$Vega$fName('side')),
																						_1: {ctor: '[]'}
																					}
																				}),
																			_1: {ctor: '[]'}
																		}
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
						},
						_p4))));
	};
	var ax = function (_p5) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'xScale',
				_gicentre$elm_vega$Vega$STop,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axTickCount(5),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axTickSize(0),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axGrid(true),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axDomain(false),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axEncode(
										{
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: _gicentre$elm_vega$Vega$EDomain,
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$enEnter(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maStroke(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vStr('transparent'),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												}
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: _gicentre$elm_vega$Vega$ELabels,
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$enEnter(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maAlign(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vStr(
																			_gicentre$elm_vega$Vega$hAlignLabel(_gicentre$elm_vega$Vega$AlignLeft)),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maBaseline(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vStr(
																				_gicentre$elm_vega$Vega$vAlignLabel(_gicentre$elm_vega$Vega$AlignTop)),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maFontSize(
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vNum(12),
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
																			_1: {ctor: '[]'}
																		}
																	}
																}
															}),
														_1: {ctor: '[]'}
													}
												},
												_1: {ctor: '[]'}
											}
										}),
									_1: {ctor: '[]'}
								}
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
						_0: _gicentre$elm_vega$Vega$axTitle(
							_gicentre$elm_vega$Vega$str('Miles driven per capita each year')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axDomain(false),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axTicks(false),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axLabels(false),
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
							_0: _gicentre$elm_vega$Vega$axTickCount(5),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axTickSize(0),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axGrid(true),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axDomain(false),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axFormat('$0.2f'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$axEncode(
													{
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: _gicentre$elm_vega$Vega$EDomain,
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$enEnter(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maStroke(
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vStr('transparent'),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: _gicentre$elm_vega$Vega$ELabels,
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$enEnter(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$maAlign(
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$vStr(
																						_gicentre$elm_vega$Vega$hAlignLabel(_gicentre$elm_vega$Vega$AlignLeft)),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$maBaseline(
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$vStr(
																							_gicentre$elm_vega$Vega$vAlignLabel(_gicentre$elm_vega$Vega$AlignBottom)),
																						_1: {ctor: '[]'}
																					}),
																				_1: {
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$maFontSize(
																						{
																							ctor: '::',
																							_0: _gicentre$elm_vega$Vega$vNum(12),
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
																						_1: {ctor: '[]'}
																					}
																				}
																			}
																		}),
																	_1: {ctor: '[]'}
																}
															},
															_1: {ctor: '[]'}
														}
													}),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						},
						A4(
							_gicentre$elm_vega$Vega$axis,
							'yScale',
							_gicentre$elm_vega$Vega$SRight,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axTitle(
									_gicentre$elm_vega$Vega$str('Price of a gallon of gasoline (adjusted for inflation)')),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axDomain(false),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$axTicks(false),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$axLabels(false),
											_1: {ctor: '[]'}
										}
									}
								}
							},
							_p5)))));
	};
	var sc = function (_p6) {
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
							_gicentre$elm_vega$Vega$doData(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$daDataset('drive'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daField(
											_gicentre$elm_vega$Vega$str('miles')),
										_1: {ctor: '[]'}
									}
								})),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(
								_gicentre$elm_vega$Vega$raDefault(_gicentre$elm_vega$Vega$RWidth)),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$niTrue),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scZero(
										_gicentre$elm_vega$Vega$boo(false)),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scRound(
											_gicentre$elm_vega$Vega$boo(true)),
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
								_gicentre$elm_vega$Vega$doData(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daDataset('drive'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daField(
												_gicentre$elm_vega$Vega$str('gas')),
											_1: {ctor: '[]'}
										}
									})),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scRange(
									_gicentre$elm_vega$Vega$raDefault(_gicentre$elm_vega$Vega$RHeight)),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$niTrue),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scZero(
											_gicentre$elm_vega$Vega$boo(false)),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$scRound(
												_gicentre$elm_vega$Vega$boo(true)),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$scale,
						'alignScale',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScOrdinal),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doStrs(
										_gicentre$elm_vega$Vega$strs(
											{
												ctor: '::',
												_0: 'left',
												_1: {
													ctor: '::',
													_0: 'right',
													_1: {
														ctor: '::',
														_0: 'top',
														_1: {
															ctor: '::',
															_0: 'bottom',
															_1: {ctor: '[]'}
														}
													}
												}
											}))),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scRange(
										_gicentre$elm_vega$Vega$raStrs(
											{
												ctor: '::',
												_0: 'right',
												_1: {
													ctor: '::',
													_0: 'left',
													_1: {
														ctor: '::',
														_0: 'center',
														_1: {
															ctor: '::',
															_0: 'center',
															_1: {ctor: '[]'}
														}
													}
												}
											})),
									_1: {ctor: '[]'}
								}
							}
						},
						A3(
							_gicentre$elm_vega$Vega$scale,
							'baseScale',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScOrdinal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scDomain(
										_gicentre$elm_vega$Vega$doStrs(
											_gicentre$elm_vega$Vega$strs(
												{
													ctor: '::',
													_0: 'left',
													_1: {
														ctor: '::',
														_0: 'right',
														_1: {
															ctor: '::',
															_0: 'top',
															_1: {
																ctor: '::',
																_0: 'bottom',
																_1: {ctor: '[]'}
															}
														}
													}
												}))),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scRange(
											_gicentre$elm_vega$Vega$raStrs(
												{
													ctor: '::',
													_0: 'middle',
													_1: {
														ctor: '::',
														_0: 'middle',
														_1: {
															ctor: '::',
															_0: 'bottom',
															_1: {
																ctor: '::',
																_0: 'top',
																_1: {ctor: '[]'}
															}
														}
													}
												})),
										_1: {ctor: '[]'}
									}
								}
							},
							A3(
								_gicentre$elm_vega$Vega$scale,
								'dx',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScOrdinal),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scDomain(
											_gicentre$elm_vega$Vega$doStrs(
												_gicentre$elm_vega$Vega$strs(
													{
														ctor: '::',
														_0: 'left',
														_1: {
															ctor: '::',
															_0: 'right',
															_1: {
																ctor: '::',
																_0: 'top',
																_1: {
																	ctor: '::',
																	_0: 'bottom',
																	_1: {ctor: '[]'}
																}
															}
														}
													}))),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$scRange(
												_gicentre$elm_vega$Vega$raNums(
													{
														ctor: '::',
														_0: -7,
														_1: {
															ctor: '::',
															_0: 6,
															_1: {
																ctor: '::',
																_0: 0,
																_1: {
																	ctor: '::',
																	_0: 0,
																	_1: {ctor: '[]'}
																}
															}
														}
													})),
											_1: {ctor: '[]'}
										}
									}
								},
								A3(
									_gicentre$elm_vega$Vega$scale,
									'dy',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScOrdinal),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$scDomain(
												_gicentre$elm_vega$Vega$doStrs(
													_gicentre$elm_vega$Vega$strs(
														{
															ctor: '::',
															_0: 'left',
															_1: {
																ctor: '::',
																_0: 'right',
																_1: {
																	ctor: '::',
																	_0: 'top',
																	_1: {
																		ctor: '::',
																		_0: 'bottom',
																		_1: {ctor: '[]'}
																	}
																}
															}
														}))),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$scRange(
													_gicentre$elm_vega$Vega$raNums(
														{
															ctor: '::',
															_0: 1,
															_1: {
																ctor: '::',
																_0: 1,
																_1: {
																	ctor: '::',
																	_0: -5,
																	_1: {
																		ctor: '::',
																		_0: 6,
																		_1: {ctor: '[]'}
																	}
																}
															}
														})),
												_1: {ctor: '[]'}
											}
										}
									},
									_p6)))))));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$data,
				'drive',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$daUrl('https://vega.github.io/vega/data/driving.json'),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		});
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$width(800),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$height(500),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$padding(5),
					_1: {
						ctor: '::',
						_0: ds,
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
		});
}();
var _gicentre$elm_vega$GalleryScatter$scatterplot2 = function () {
	var mk = function (_p7) {
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
								_gicentre$elm_vega$Vega$str('valid')),
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
										_0: _gicentre$elm_vega$Vega$maSize(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$vNum(50),
												_1: {ctor: '[]'}
											}),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maTooltip(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vField(
														_gicentre$elm_vega$Vega$fName('tooltip')),
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
													_0: _gicentre$elm_vega$Vega$vScale(
														_gicentre$elm_vega$Vega$fName('xScale')),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vField(
															_gicentre$elm_vega$Vega$fSignal('xField')),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale(
															_gicentre$elm_vega$Vega$fName('yScale')),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fSignal('yField')),
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
															_0: _gicentre$elm_vega$Vega$maZIndex(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vNum(0),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														}
													}
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
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFillOpacity(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vNum(1),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maZIndex(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vNum(1),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}
											}),
										_1: {ctor: '[]'}
									}
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
						_0: _gicentre$elm_vega$Vega$mFrom(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$srData(
									_gicentre$elm_vega$Vega$str('nullY')),
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
											_0: _gicentre$elm_vega$Vega$maSize(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vNum(50),
													_1: {ctor: '[]'}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maTooltip(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vField(
															_gicentre$elm_vega$Vega$fName('tooltip')),
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
														_0: _gicentre$elm_vega$Vega$vScale(
															_gicentre$elm_vega$Vega$fName('xScale')),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fSignal('xField')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maY(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vSignal('height - nullSize/2'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFill(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vStr('#aaa'),
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
											_0: _gicentre$elm_vega$Vega$enHover(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maFill(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vStr('firebrick'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maFillOpacity(
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
							_0: _gicentre$elm_vega$Vega$mFrom(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$srData(
										_gicentre$elm_vega$Vega$str('nullX')),
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
												_0: _gicentre$elm_vega$Vega$maSize(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vNum(50),
														_1: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maTooltip(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fName('tooltip')),
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
															_0: _gicentre$elm_vega$Vega$vSignal('nullSize/2'),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$maY(
															{
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vScale(
																	_gicentre$elm_vega$Vega$fName('yScale')),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vField(
																		_gicentre$elm_vega$Vega$fSignal('yField')),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maFill(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vStr('#aaa'),
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
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maZIndex(
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
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maFillOpacity(
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
								_0: _gicentre$elm_vega$Vega$mInteractive(
									_gicentre$elm_vega$Vega$boo(false)),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$mFrom(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$srData(
												_gicentre$elm_vega$Vega$str('nullXY')),
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
																_0: _gicentre$elm_vega$Vega$vSignal('nullSize'),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vOffset(
																		_gicentre$elm_vega$Vega$vNum(-4)),
																	_1: {ctor: '[]'}
																}
															}),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$maY(
																{
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$vSignal('height'),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vOffset(
																			_gicentre$elm_vega$Vega$vNum(13)),
																		_1: {ctor: '[]'}
																	}
																}),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$maText(
																	{
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$vSignal('datum.count + \' null\''),
																		_1: {ctor: '[]'}
																	}),
																_1: {
																	ctor: '::',
																	_0: _gicentre$elm_vega$Vega$maAlign(
																		{
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$vStr(
																				_gicentre$elm_vega$Vega$hAlignLabel(_gicentre$elm_vega$Vega$AlignRight)),
																			_1: {ctor: '[]'}
																		}),
																	_1: {
																		ctor: '::',
																		_0: _gicentre$elm_vega$Vega$maBaseline(
																			{
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$vStr(
																					_gicentre$elm_vega$Vega$vAlignLabel(_gicentre$elm_vega$Vega$AlignTop)),
																				_1: {ctor: '[]'}
																			}),
																		_1: {
																			ctor: '::',
																			_0: _gicentre$elm_vega$Vega$maFill(
																				{
																					ctor: '::',
																					_0: _gicentre$elm_vega$Vega$vStr('#999'),
																					_1: {ctor: '[]'}
																				}),
																			_1: {
																				ctor: '::',
																				_0: _gicentre$elm_vega$Vega$maFontSize(
																					{
																						ctor: '::',
																						_0: _gicentre$elm_vega$Vega$vNum(9),
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
							},
							_p7)))));
	};
	var ax = function (_p8) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'xScale',
				_gicentre$elm_vega$Vega$SBottom,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axOffset(
						_gicentre$elm_vega$Vega$num(5)),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axFormat('s'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axTitle(
								_gicentre$elm_vega$Vega$strSignal('xField')),
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
						_0: _gicentre$elm_vega$Vega$axOffset(
							_gicentre$elm_vega$Vega$num(5)),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axFormat('s'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axTitle(
									_gicentre$elm_vega$Vega$strSignal('yField')),
								_1: {ctor: '[]'}
							}
						}
					},
					_p8)));
	};
	var sc = function (_p9) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'xScale',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$niTrue),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scRange(
								_gicentre$elm_vega$Vega$raValues(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$vSignal('nullGap'),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$vSignal('width'),
											_1: {ctor: '[]'}
										}
									})),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scDomain(
									_gicentre$elm_vega$Vega$doData(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$daDataset('valid'),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daField(
													_gicentre$elm_vega$Vega$strSignal('xField')),
												_1: {ctor: '[]'}
											}
										})),
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
							_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$niTrue),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scRange(
									_gicentre$elm_vega$Vega$raValues(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$vSignal('height - nullGap'),
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
												_0: _gicentre$elm_vega$Vega$daDataset('valid'),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daField(
														_gicentre$elm_vega$Vega$strSignal('yField')),
													_1: {ctor: '[]'}
												}
											})),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					_p9)));
	};
	var si = function (_p10) {
		return _gicentre$elm_vega$Vega$signals(
			A3(
				_gicentre$elm_vega$Vega$signal,
				'yField',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$siValue(
						_gicentre$elm_vega$Vega$vStr('IMDB_Rating')),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siBind(
							_gicentre$elm_vega$Vega$iSelect(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$inOptions(
										_gicentre$elm_vega$Vega$vStrs(
											{
												ctor: '::',
												_0: 'IMDB_Rating',
												_1: {
													ctor: '::',
													_0: 'Rotten_Tomatoes_Rating',
													_1: {
														ctor: '::',
														_0: 'US_Gross',
														_1: {
															ctor: '::',
															_0: 'Worldwide_Gross',
															_1: {ctor: '[]'}
														}
													}
												}
											})),
									_1: {ctor: '[]'}
								})),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$Vega$signal,
					'xField',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$siValue(
							_gicentre$elm_vega$Vega$vStr('Rotten_Tomatoes_Rating')),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siBind(
								_gicentre$elm_vega$Vega$iSelect(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$inOptions(
											_gicentre$elm_vega$Vega$vStrs(
												{
													ctor: '::',
													_0: 'IMDB_Rating',
													_1: {
														ctor: '::',
														_0: 'Rotten_Tomatoes_Rating',
														_1: {
															ctor: '::',
															_0: 'US_Gross',
															_1: {
																ctor: '::',
																_0: 'Worldwide_Gross',
																_1: {ctor: '[]'}
															}
														}
													}
												})),
										_1: {ctor: '[]'}
									})),
							_1: {ctor: '[]'}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$signal,
						'nullSize',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$siValue(
								_gicentre$elm_vega$Vega$vNum(8)),
							_1: {ctor: '[]'}
						},
						A3(
							_gicentre$elm_vega$Vega$signal,
							'nullGap',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$siUpdate('nullSize + 10'),
								_1: {ctor: '[]'}
							},
							_p10)))));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$transform,
				{
					ctor: '::',
					_0: A3(_gicentre$elm_vega$Vega$trFormula, 'datum.Title + \' (\' + (year(datum.Release_Date) || \'?\') + \')\'', 'tooltip', _gicentre$elm_vega$Vega$AlwaysUpdate),
					_1: {ctor: '[]'}
				},
				A2(
					_gicentre$elm_vega$Vega$data,
					'movies',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$daUrl('https://vega.github.io/vega/data/movies.json'),
						_1: {ctor: '[]'}
					})),
			_1: {
				ctor: '::',
				_0: A2(
					_gicentre$elm_vega$Vega$transform,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$trFilter(
							_gicentre$elm_vega$Vega$expr('datum[xField] != null && datum[yField] != null')),
						_1: {ctor: '[]'}
					},
					A2(
						_gicentre$elm_vega$Vega$data,
						'valid',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$daSource('movies'),
							_1: {ctor: '[]'}
						})),
				_1: {
					ctor: '::',
					_0: A2(
						_gicentre$elm_vega$Vega$transform,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$trFilter(
								_gicentre$elm_vega$Vega$expr('datum[xField] == null && datum[yField] == null')),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$trAggregate(
									{ctor: '[]'}),
								_1: {ctor: '[]'}
							}
						},
						A2(
							_gicentre$elm_vega$Vega$data,
							'nullXY',
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$daSource('movies'),
								_1: {ctor: '[]'}
							})),
					_1: {
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$Vega$transform,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$trFilter(
									_gicentre$elm_vega$Vega$expr('datum[xField] != null && datum[yField] == null')),
								_1: {ctor: '[]'}
							},
							A2(
								_gicentre$elm_vega$Vega$data,
								'nullY',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$daSource('movies'),
									_1: {ctor: '[]'}
								})),
						_1: {
							ctor: '::',
							_0: A2(
								_gicentre$elm_vega$Vega$transform,
								{
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$trFilter(
										_gicentre$elm_vega$Vega$expr('datum[xField] == null && datum[yField] != null')),
									_1: {ctor: '[]'}
								},
								A2(
									_gicentre$elm_vega$Vega$data,
									'nullX',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$daSource('movies'),
										_1: {ctor: '[]'}
									})),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
	return _gicentre$elm_vega$Vega$toVega(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$Vega$width(450),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$height(450),
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
var _gicentre$elm_vega$GalleryScatter$scatterplot1 = function () {
	var shapeEncoding = {
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
					_0: _gicentre$elm_vega$Vega$vNum(0.5),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$Vega$maStroke(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$vStr('#4682b4'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$maShape(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$vStr(
								_gicentre$elm_vega$Vega$symbolLabel(_gicentre$elm_vega$Vega$SymCircle)),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$maFill(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$vStr('transparent'),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}
			}
		}
	};
	var lg = function (_p11) {
		return _gicentre$elm_vega$Vega$legends(
			A2(
				_gicentre$elm_vega$Vega$legend,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$leSize('sizeScale'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$leTitle('Acceleration'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$leFormat('s'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$leEncode(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$enSymbols(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$enUpdate(shapeEncoding),
												_1: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				_p11));
	};
	var mk = function (_p12) {
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
								_gicentre$elm_vega$Vega$str('cars')),
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$mEncode(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$enUpdate(
									A2(
										_elm_lang$core$Basics_ops['++'],
										{
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$maX(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$vScale(
														_gicentre$elm_vega$Vega$fName('xScale')),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vField(
															_gicentre$elm_vega$Vega$fName('Horsepower')),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$maY(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$vScale(
															_gicentre$elm_vega$Vega$fName('yScale')),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vField(
																_gicentre$elm_vega$Vega$fName('Miles_per_Gallon')),
															_1: {ctor: '[]'}
														}
													}),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$maSize(
														{
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$vScale(
																_gicentre$elm_vega$Vega$fName('sizeScale')),
															_1: {
																ctor: '::',
																_0: _gicentre$elm_vega$Vega$vField(
																	_gicentre$elm_vega$Vega$fName('Acceleration')),
																_1: {ctor: '[]'}
															}
														}),
													_1: {ctor: '[]'}
												}
											}
										},
										shapeEncoding)),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				},
				_p12));
	};
	var ax = function (_p13) {
		return _gicentre$elm_vega$Vega$axes(
			A4(
				_gicentre$elm_vega$Vega$axis,
				'xScale',
				_gicentre$elm_vega$Vega$SBottom,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$axGrid(true),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$axDomain(false),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axTickCount(5),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axTitle(
									_gicentre$elm_vega$Vega$str('Horsepower')),
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
						_0: _gicentre$elm_vega$Vega$axGrid(true),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$axDomain(false),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$axTickCount(5),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$axTitle(
										_gicentre$elm_vega$Vega$str('Miles per gallon')),
									_1: {ctor: '[]'}
								}
							}
						}
					},
					_p13)));
	};
	var sc = function (_p14) {
		return _gicentre$elm_vega$Vega$scales(
			A3(
				_gicentre$elm_vega$Vega$scale,
				'xScale',
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$scRound(
							_gicentre$elm_vega$Vega$boo(true)),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$niTrue),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scZero(
									_gicentre$elm_vega$Vega$boo(true)),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scDomain(
										_gicentre$elm_vega$Vega$doData(
											{
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$daDataset('cars'),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daField(
														_gicentre$elm_vega$Vega$str('Horsepower')),
													_1: {ctor: '[]'}
												}
											})),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scRange(
											_gicentre$elm_vega$Vega$raDefault(_gicentre$elm_vega$Vega$RWidth)),
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
							_0: _gicentre$elm_vega$Vega$scRound(
								_gicentre$elm_vega$Vega$boo(true)),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$niTrue),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scZero(
										_gicentre$elm_vega$Vega$boo(true)),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scDomain(
											_gicentre$elm_vega$Vega$doData(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$Vega$daDataset('cars'),
													_1: {
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$daField(
															_gicentre$elm_vega$Vega$str('Miles_per_Gallon')),
														_1: {ctor: '[]'}
													}
												})),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$scRange(
												_gicentre$elm_vega$Vega$raDefault(_gicentre$elm_vega$Vega$RHeight)),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					},
					A3(
						_gicentre$elm_vega$Vega$scale,
						'sizeScale',
						{
							ctor: '::',
							_0: _gicentre$elm_vega$Vega$scType(_gicentre$elm_vega$Vega$ScLinear),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$Vega$scRound(
									_gicentre$elm_vega$Vega$boo(true)),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$Vega$scNice(_gicentre$elm_vega$Vega$niFalse),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$Vega$scZero(
											_gicentre$elm_vega$Vega$boo(true)),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$Vega$scDomain(
												_gicentre$elm_vega$Vega$doData(
													{
														ctor: '::',
														_0: _gicentre$elm_vega$Vega$daDataset('cars'),
														_1: {
															ctor: '::',
															_0: _gicentre$elm_vega$Vega$daField(
																_gicentre$elm_vega$Vega$str('Acceleration')),
															_1: {ctor: '[]'}
														}
													})),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$Vega$scRange(
													_gicentre$elm_vega$Vega$raNums(
														{
															ctor: '::',
															_0: 4,
															_1: {
																ctor: '::',
																_0: 361,
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
						_p14))));
	};
	var ds = _gicentre$elm_vega$Vega$dataSource(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$Vega$transform,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$Vega$trFilter(
						_gicentre$elm_vega$Vega$expr('datum[\'Horsepower\'] != null && datum[\'Miles_per_Gallon\'] != null && datum[\'Acceleration\'] != null')),
					_1: {ctor: '[]'}
				},
				A2(
					_gicentre$elm_vega$Vega$data,
					'cars',
					{
						ctor: '::',
						_0: _gicentre$elm_vega$Vega$daUrl('https://vega.github.io/vega/data/cars.json'),
						_1: {ctor: '[]'}
					})),
			_1: {ctor: '[]'}
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
						_0: ds,
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
									_0: lg(
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
var _gicentre$elm_vega$GalleryScatter$sourceExample = _gicentre$elm_vega$GalleryScatter$scatterplot1;
var _gicentre$elm_vega$GalleryScatter$view = function (spec) {
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
							A2(_elm_lang$core$Json_Encode$encode, 2, _gicentre$elm_vega$GalleryScatter$sourceExample)),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _gicentre$elm_vega$GalleryScatter$mySpecs = _gicentre$elm_vega$Vega$combineSpecs(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'scatterplot1', _1: _gicentre$elm_vega$GalleryScatter$scatterplot1},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'scatterplot2', _1: _gicentre$elm_vega$GalleryScatter$scatterplot2},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'scatterplot3', _1: _gicentre$elm_vega$GalleryScatter$scatterplot3},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'scatterplot4', _1: _gicentre$elm_vega$GalleryScatter$scatterplot4},
					_1: {ctor: '[]'}
				}
			}
		}
	});
var _gicentre$elm_vega$GalleryScatter$elmToJS = _elm_lang$core$Native_Platform.outgoingPort(
	'elmToJS',
	function (v) {
		return v;
	});
var _gicentre$elm_vega$GalleryScatter$main = _elm_lang$html$Html$program(
	{
		init: {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$GalleryScatter$mySpecs,
			_1: _gicentre$elm_vega$GalleryScatter$elmToJS(_gicentre$elm_vega$GalleryScatter$mySpecs)
		},
		view: _gicentre$elm_vega$GalleryScatter$view,
		update: F2(
			function (_p15, model) {
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			}),
		subscriptions: _elm_lang$core$Basics$always(_elm_lang$core$Platform_Sub$none)
	})();

var Elm = {};
Elm['GalleryScatter'] = Elm['GalleryScatter'] || {};
if (typeof _gicentre$elm_vega$GalleryScatter$main !== 'undefined') {
    _gicentre$elm_vega$GalleryScatter$main(Elm['GalleryScatter'], 'GalleryScatter', undefined);
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


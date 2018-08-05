
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

var _gicentre$elm_vega$VegaLite$windowSortFieldSpec = function (wsf) {
	var _p0 = wsf;
	if (_p0.ctor === 'WAscending') {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$string(_p0._0)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'order',
						_1: _elm_lang$core$Json_Encode$string('ascending')
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
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$string(_p0._0)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'order',
						_1: _elm_lang$core$Json_Encode$string('descending')
					},
					_1: {ctor: '[]'}
				}
			});
	}
};
var _gicentre$elm_vega$VegaLite$windowPropertySpec = F2(
	function (wpName, wps) {
		var wpSpec = function (wp) {
			var _p1 = wpName;
			switch (_p1) {
				case 'frame':
					var _p2 = wp;
					if (_p2.ctor === 'WFrame') {
						if (_p2._0.ctor === 'Just') {
							if (_p2._1.ctor === 'Just') {
								return _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$int(_p2._0._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$int(_p2._1._0),
											_1: {ctor: '[]'}
										}
									});
							} else {
								return _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$int(_p2._0._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$null,
											_1: {ctor: '[]'}
										}
									});
							}
						} else {
							if (_p2._1.ctor === 'Just') {
								return _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$null,
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$int(_p2._1._0),
											_1: {ctor: '[]'}
										}
									});
							} else {
								return _elm_lang$core$Json_Encode$list(
									{
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$null,
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$null,
											_1: {ctor: '[]'}
										}
									});
							}
						}
					} else {
						return _elm_lang$core$Json_Encode$null;
					}
				case 'ignorePeers':
					var _p3 = wp;
					if (_p3.ctor === 'WIgnorePeers') {
						return _elm_lang$core$Json_Encode$bool(_p3._0);
					} else {
						return _elm_lang$core$Json_Encode$null;
					}
				case 'groupby':
					var _p4 = wp;
					if (_p4.ctor === 'WGroupBy') {
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p4._0));
					} else {
						return _elm_lang$core$Json_Encode$null;
					}
				case 'sort':
					var _p5 = wp;
					if (_p5.ctor === 'WSort') {
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$windowSortFieldSpec, _p5._0));
					} else {
						return _elm_lang$core$Json_Encode$null;
					}
				default:
					return A2(
						_elm_lang$core$Debug$log,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'Unexpected window property name ',
							_elm_lang$core$Basics$toString(wpName)),
						_elm_lang$core$Json_Encode$null);
			}
		};
		var specList = A2(
			_elm_lang$core$List$filter,
			function (x) {
				return !_elm_lang$core$Native_Utils.eq(x, _elm_lang$core$Json_Encode$null);
			},
			A2(_elm_lang$core$List$map, wpSpec, wps));
		var _p6 = specList;
		if ((_p6.ctor === '::') && (_p6._1.ctor === '[]')) {
			return _p6._0;
		} else {
			return _elm_lang$core$Json_Encode$null;
		}
	});
var _gicentre$elm_vega$VegaLite$wOperationLabel = function (op) {
	var _p7 = op;
	switch (_p7.ctor) {
		case 'RowNumber':
			return 'row_number';
		case 'Rank':
			return 'rank';
		case 'DenseRank':
			return 'dense_rank';
		case 'PercentRank':
			return 'percent_rank';
		case 'CumeDist':
			return 'cume_dist';
		case 'Ntile':
			return 'ntile';
		case 'Lag':
			return 'lag';
		case 'Lead':
			return 'lead';
		case 'FirstValue':
			return 'first_value';
		case 'LastValue':
			return 'last_value';
		default:
			return 'nth_value';
	}
};
var _gicentre$elm_vega$VegaLite$vlPropertyLabel = function (spec) {
	var _p8 = spec;
	switch (_p8.ctor) {
		case 'VLName':
			return 'name';
		case 'VLDescription':
			return 'description';
		case 'VLTitle':
			return 'title';
		case 'VLWidth':
			return 'width';
		case 'VLHeight':
			return 'height';
		case 'VLPadding':
			return 'padding';
		case 'VLAutosize':
			return 'autosize';
		case 'VLBackground':
			return 'background';
		case 'VLData':
			return 'data';
		case 'VLDatasets':
			return 'datasets';
		case 'VLProjection':
			return 'projection';
		case 'VLMark':
			return 'mark';
		case 'VLTransform':
			return 'transform';
		case 'VLEncoding':
			return 'encoding';
		case 'VLConfig':
			return 'config';
		case 'VLSelection':
			return 'selection';
		case 'VLHConcat':
			return 'hconcat';
		case 'VLVConcat':
			return 'vconcat';
		case 'VLLayer':
			return 'layer';
		case 'VLRepeat':
			return 'repeat';
		case 'VLFacet':
			return 'facet';
		case 'VLSpacing':
			return 'spacing';
		case 'VLAlign':
			return 'align';
		case 'VLBounds':
			return 'bounds';
		case 'VLCenter':
			return 'center';
		case 'VLSpec':
			return 'spec';
		default:
			return 'resolve';
	}
};
var _gicentre$elm_vega$VegaLite$viewConfigProperty = function (viewCfg) {
	var _p9 = viewCfg;
	switch (_p9.ctor) {
		case 'ViewWidth':
			return {
				ctor: '_Tuple2',
				_0: 'width',
				_1: _elm_lang$core$Json_Encode$float(_p9._0)
			};
		case 'ViewHeight':
			return {
				ctor: '_Tuple2',
				_0: 'height',
				_1: _elm_lang$core$Json_Encode$float(_p9._0)
			};
		case 'Clip':
			return {
				ctor: '_Tuple2',
				_0: 'clip',
				_1: _elm_lang$core$Json_Encode$bool(_p9._0)
			};
		case 'Fill':
			var _p10 = _p9._0;
			if (_p10.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'fill',
					_1: _elm_lang$core$Json_Encode$string(_p10._0)
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'fill',
					_1: _elm_lang$core$Json_Encode$string('')
				};
			}
		case 'FillOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'fillOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p9._0)
			};
		case 'Stroke':
			var _p11 = _p9._0;
			if (_p11.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'stroke',
					_1: _elm_lang$core$Json_Encode$string(_p11._0)
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'stroke',
					_1: _elm_lang$core$Json_Encode$string('')
				};
			}
		case 'StrokeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'strokeOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p9._0)
			};
		case 'StrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p9._0)
			};
		case 'StrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p9._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'strokeDashOffset',
				_1: _elm_lang$core$Json_Encode$float(_p9._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$vAlignLabel = function (align) {
	var _p12 = align;
	switch (_p12.ctor) {
		case 'AlignTop':
			return 'top';
		case 'AlignMiddle':
			return 'middle';
		default:
			return 'bottom';
	}
};
var _gicentre$elm_vega$VegaLite$timeUnitLabel = function (tu) {
	var _p13 = tu;
	switch (_p13.ctor) {
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
		case 'Milliseconds':
			return 'milliseconds';
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'utc',
				_gicentre$elm_vega$VegaLite$timeUnitLabel(_p13._0));
	}
};
var _gicentre$elm_vega$VegaLite$symbolLabel = function (sym) {
	var _p14 = sym;
	switch (_p14.ctor) {
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
			return _p14._0;
	}
};
var _gicentre$elm_vega$VegaLite$stackProperty = function (sp) {
	var _p15 = sp;
	switch (_p15.ctor) {
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
var _gicentre$elm_vega$VegaLite$sideLabel = function (side) {
	var _p16 = side;
	switch (_p16.ctor) {
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
var _gicentre$elm_vega$VegaLite$selectionResolutionLabel = function (res) {
	var _p17 = res;
	switch (_p17.ctor) {
		case 'Global':
			return 'global';
		case 'Union':
			return 'union';
		default:
			return 'intersect';
	}
};
var _gicentre$elm_vega$VegaLite$selectionMarkProperty = function (markProp) {
	var _p18 = markProp;
	switch (_p18.ctor) {
		case 'SMFill':
			return {
				ctor: '_Tuple2',
				_0: 'fill',
				_1: _elm_lang$core$Json_Encode$string(_p18._0)
			};
		case 'SMFillOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'fillOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p18._0)
			};
		case 'SMStroke':
			return {
				ctor: '_Tuple2',
				_0: 'stroke',
				_1: _elm_lang$core$Json_Encode$string(_p18._0)
			};
		case 'SMStrokeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'strokeOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p18._0)
			};
		case 'SMStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p18._0)
			};
		case 'SMStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p18._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'strokeDashOffset',
				_1: _elm_lang$core$Json_Encode$float(_p18._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$selectionLabel = function (seType) {
	var _p19 = seType;
	switch (_p19.ctor) {
		case 'Single':
			return 'single';
		case 'Multi':
			return 'multi';
		default:
			return 'interval';
	}
};
var _gicentre$elm_vega$VegaLite$schemeProperty = F2(
	function (name, extent) {
		var _p20 = extent;
		if (((_p20.ctor === '::') && (_p20._1.ctor === '::')) && (_p20._1._1.ctor === '[]')) {
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
										_0: _elm_lang$core$Json_Encode$float(_p20._0),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Json_Encode$float(_p20._1._0),
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
var _gicentre$elm_vega$VegaLite$scaleNiceSpec = function (ni) {
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
						_1: _elm_lang$core$Json_Encode$string(
							_gicentre$elm_vega$VegaLite$timeUnitLabel(_p21._0))
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
		default:
			return _elm_lang$core$Json_Encode$int(_p21._0);
	}
};
var _gicentre$elm_vega$VegaLite$scaleLabel = function (scType) {
	var _p22 = scType;
	switch (_p22.ctor) {
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
var _gicentre$elm_vega$VegaLite$scaleConfigProperty = function (scaleCfg) {
	var _p23 = scaleCfg;
	switch (_p23.ctor) {
		case 'SCBandPaddingInner':
			return {
				ctor: '_Tuple2',
				_0: 'bandPaddingInner',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCBandPaddingOuter':
			return {
				ctor: '_Tuple2',
				_0: 'bandPaddingOuter',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCClamp':
			return {
				ctor: '_Tuple2',
				_0: 'clamp',
				_1: _elm_lang$core$Json_Encode$bool(_p23._0)
			};
		case 'SCMaxBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'maxBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCMinBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'minBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCMaxFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'maxFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCMinFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'minFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCMaxOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'maxOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCMinOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'minOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCMaxSize':
			return {
				ctor: '_Tuple2',
				_0: 'maxSize',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCMinSize':
			return {
				ctor: '_Tuple2',
				_0: 'minSize',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCMaxStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'maxStrokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCMinStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'minStrokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCPointPadding':
			return {
				ctor: '_Tuple2',
				_0: 'pointPadding',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		case 'SCRangeStep':
			var _p24 = _p23._0;
			if (_p24.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'rangeStep',
					_1: _elm_lang$core$Json_Encode$float(_p24._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'rangeStep', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'SCRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _elm_lang$core$Json_Encode$bool(_p23._0)
			};
		case 'SCTextXRangeStep':
			return {
				ctor: '_Tuple2',
				_0: 'textXRangeStep',
				_1: _elm_lang$core$Json_Encode$float(_p23._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'useUnaggregatedDomain',
				_1: _elm_lang$core$Json_Encode$bool(_p23._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$resolutionLabel = function (res) {
	var _p25 = res;
	if (_p25.ctor === 'Shared') {
		return 'shared';
	} else {
		return 'independent';
	}
};
var _gicentre$elm_vega$VegaLite$repeatFieldsProperty = function (fields) {
	var _p26 = fields;
	if (_p26.ctor === 'RowFields') {
		return {
			ctor: '_Tuple2',
			_0: 'row',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p26._0))
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'column',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p26._0))
		};
	}
};
var _gicentre$elm_vega$VegaLite$rangeConfigProperty = function (rangeCfg) {
	var _p27 = rangeCfg;
	switch (_p27.ctor) {
		case 'RCategory':
			return {
				ctor: '_Tuple2',
				_0: 'category',
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: A2(
							_gicentre$elm_vega$VegaLite$schemeProperty,
							_p27._0,
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
							_gicentre$elm_vega$VegaLite$schemeProperty,
							_p27._0,
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
							_gicentre$elm_vega$VegaLite$schemeProperty,
							_p27._0,
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
							_gicentre$elm_vega$VegaLite$schemeProperty,
							_p27._0,
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
							_gicentre$elm_vega$VegaLite$schemeProperty,
							_p27._0,
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
							_gicentre$elm_vega$VegaLite$schemeProperty,
							_p27._0,
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					})
			};
	}
};
var _gicentre$elm_vega$VegaLite$positionLabel = function (pChannel) {
	var _p28 = pChannel;
	switch (_p28.ctor) {
		case 'X':
			return 'x';
		case 'Y':
			return 'y';
		case 'X2':
			return 'x2';
		case 'Y2':
			return 'y2';
		case 'Longitude':
			return 'longitude';
		case 'Latitude':
			return 'latitude';
		case 'Longitude2':
			return 'longitude2';
		default:
			return 'latitude2';
	}
};
var _gicentre$elm_vega$VegaLite$projectionLabel = function (proj) {
	var _p29 = proj;
	switch (_p29.ctor) {
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
			return 'conicEqualarea';
		case 'ConicEquidistant':
			return 'conicEquidistant';
		case 'Custom':
			return _p29._0;
		case 'Equirectangular':
			return 'equirectangular';
		case 'Gnomonic':
			return 'gnomonic';
		case 'Mercator':
			return 'mercator';
		case 'Orthographic':
			return 'orthographic';
		case 'Stereographic':
			return 'stereographic';
		default:
			return 'transverseMercator';
	}
};
var _gicentre$elm_vega$VegaLite$projectionProperty = function (pp) {
	var _p30 = pp;
	switch (_p30.ctor) {
		case 'PType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$projectionLabel(_p30._0))
			};
		case 'PClipAngle':
			var _p31 = _p30._0;
			if (_p31.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'clipAngle',
					_1: _elm_lang$core$Json_Encode$float(_p31._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'clipAngle', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'PClipExtent':
			var _p32 = _p30._0;
			if (_p32.ctor === 'NoClip') {
				return {ctor: '_Tuple2', _0: 'clipExtent', _1: _elm_lang$core$Json_Encode$null};
			} else {
				return {
					ctor: '_Tuple2',
					_0: 'clipExtent',
					_1: _elm_lang$core$Json_Encode$list(
						A2(
							_elm_lang$core$List$map,
							_elm_lang$core$Json_Encode$float,
							{
								ctor: '::',
								_0: _p32._0,
								_1: {
									ctor: '::',
									_0: _p32._1,
									_1: {
										ctor: '::',
										_0: _p32._2,
										_1: {
											ctor: '::',
											_0: _p32._3,
											_1: {ctor: '[]'}
										}
									}
								}
							}))
				};
			}
		case 'PCenter':
			return {
				ctor: '_Tuple2',
				_0: 'center',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$float(_p30._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$float(_p30._1),
							_1: {ctor: '[]'}
						}
					})
			};
		case 'PRotate':
			return {
				ctor: '_Tuple2',
				_0: 'rotate',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						_elm_lang$core$Json_Encode$float,
						{
							ctor: '::',
							_0: _p30._0,
							_1: {
								ctor: '::',
								_0: _p30._1,
								_1: {
									ctor: '::',
									_0: _p30._2,
									_1: {ctor: '[]'}
								}
							}
						}))
			};
		case 'PPrecision':
			return {
				ctor: '_Tuple2',
				_0: 'precision',
				_1: _elm_lang$core$Json_Encode$float(_p30._0)
			};
		case 'PCoefficient':
			return {
				ctor: '_Tuple2',
				_0: 'coefficient',
				_1: _elm_lang$core$Json_Encode$float(_p30._0)
			};
		case 'PDistance':
			return {
				ctor: '_Tuple2',
				_0: 'distance',
				_1: _elm_lang$core$Json_Encode$float(_p30._0)
			};
		case 'PFraction':
			return {
				ctor: '_Tuple2',
				_0: 'fraction',
				_1: _elm_lang$core$Json_Encode$float(_p30._0)
			};
		case 'PLobes':
			return {
				ctor: '_Tuple2',
				_0: 'lobes',
				_1: _elm_lang$core$Json_Encode$int(_p30._0)
			};
		case 'PParallel':
			return {
				ctor: '_Tuple2',
				_0: 'parallel',
				_1: _elm_lang$core$Json_Encode$float(_p30._0)
			};
		case 'PRadius':
			return {
				ctor: '_Tuple2',
				_0: 'radius',
				_1: _elm_lang$core$Json_Encode$float(_p30._0)
			};
		case 'PRatio':
			return {
				ctor: '_Tuple2',
				_0: 'ratio',
				_1: _elm_lang$core$Json_Encode$float(_p30._0)
			};
		case 'PSpacing':
			return {
				ctor: '_Tuple2',
				_0: 'spacing',
				_1: _elm_lang$core$Json_Encode$float(_p30._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'tilt',
				_1: _elm_lang$core$Json_Encode$float(_p30._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$paddingSpec = function (pad) {
	var _p33 = pad;
	if (_p33.ctor === 'PSize') {
		return _elm_lang$core$Json_Encode$float(_p33._0);
	} else {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'left',
					_1: _elm_lang$core$Json_Encode$float(_p33._0)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'top',
						_1: _elm_lang$core$Json_Encode$float(_p33._1)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'right',
							_1: _elm_lang$core$Json_Encode$float(_p33._2)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'bottom',
								_1: _elm_lang$core$Json_Encode$float(_p33._3)
							},
							_1: {ctor: '[]'}
						}
					}
				}
			});
	}
};
var _gicentre$elm_vega$VegaLite$overlapStrategyLabel = function (strat) {
	var _p34 = strat;
	switch (_p34.ctor) {
		case 'ONone':
			return 'false';
		case 'OParity':
			return 'parity';
		default:
			return 'greedy';
	}
};
var _gicentre$elm_vega$VegaLite$operationLabel = function (op) {
	var _p35 = op;
	switch (_p35.ctor) {
		case 'ArgMax':
			return 'argmax';
		case 'ArgMin':
			return 'argmin';
		case 'Average':
			return 'average';
		case 'Count':
			return 'count';
		case 'CI0':
			return 'ci0';
		case 'CI1':
			return 'ci1';
		case 'Distinct':
			return 'distinct';
		case 'Max':
			return 'max';
		case 'Mean':
			return 'mean';
		case 'Median':
			return 'median';
		case 'Min':
			return 'min';
		case 'Missing':
			return 'missing';
		case 'Q1':
			return 'q1';
		case 'Q3':
			return 'q3';
		case 'Stdev':
			return 'stdev';
		case 'StdevP':
			return 'stdevp';
		case 'Sum':
			return 'sum';
		case 'Stderr':
			return 'stderr';
		case 'Valid':
			return 'valid';
		case 'Variance':
			return 'variance';
		default:
			return 'variancep';
	}
};
var _gicentre$elm_vega$VegaLite$windowAsProperty = function (w) {
	var _p36 = w;
	switch (_p36.ctor) {
		case 'WAggregateOp':
			return {
				ctor: '_Tuple2',
				_0: 'op',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$operationLabel(_p36._0))
			};
		case 'WOp':
			return {
				ctor: '_Tuple2',
				_0: 'op',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$wOperationLabel(_p36._0))
			};
		case 'WParam':
			return {
				ctor: '_Tuple2',
				_0: 'param',
				_1: _elm_lang$core$Json_Encode$int(_p36._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p36._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$monthNameLabel = function (mon) {
	var _p37 = mon;
	switch (_p37.ctor) {
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
var _gicentre$elm_vega$VegaLite$measurementLabel = function (mType) {
	var _p38 = mType;
	switch (_p38.ctor) {
		case 'Nominal':
			return 'nominal';
		case 'Ordinal':
			return 'ordinal';
		case 'Quantitative':
			return 'quantitative';
		case 'Temporal':
			return 'temporal';
		default:
			return 'geojson';
	}
};
var _gicentre$elm_vega$VegaLite$markOrientationLabel = function (orient) {
	var _p39 = orient;
	if (_p39.ctor === 'Horizontal') {
		return 'horizontal';
	} else {
		return 'vertical';
	}
};
var _gicentre$elm_vega$VegaLite$markLabel = function (mark) {
	var _p40 = mark;
	switch (_p40.ctor) {
		case 'Area':
			return 'area';
		case 'Bar':
			return 'bar';
		case 'Boxplot':
			return 'boxplot';
		case 'Circle':
			return 'circle';
		case 'Errorband':
			return 'errorband';
		case 'Errorbar':
			return 'errorbar';
		case 'Line':
			return 'line';
		case 'Geoshape':
			return 'geoshape';
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
		case 'Tick':
			return 'tick';
		default:
			return 'trail';
	}
};
var _gicentre$elm_vega$VegaLite$markInterpolationLabel = function (interp) {
	var _p41 = interp;
	switch (_p41.ctor) {
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
var _gicentre$elm_vega$VegaLite$legendOrientLabel = function (orient) {
	var _p42 = orient;
	switch (_p42.ctor) {
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
var _gicentre$elm_vega$VegaLite$inputProperty = function (prop) {
	var _p43 = prop;
	switch (_p43.ctor) {
		case 'InMin':
			return {
				ctor: '_Tuple2',
				_0: 'min',
				_1: _elm_lang$core$Json_Encode$float(_p43._0)
			};
		case 'InMax':
			return {
				ctor: '_Tuple2',
				_0: 'max',
				_1: _elm_lang$core$Json_Encode$float(_p43._0)
			};
		case 'InStep':
			return {
				ctor: '_Tuple2',
				_0: 'step',
				_1: _elm_lang$core$Json_Encode$float(_p43._0)
			};
		case 'Debounce':
			return {
				ctor: '_Tuple2',
				_0: 'debounce',
				_1: _elm_lang$core$Json_Encode$float(_p43._0)
			};
		case 'InName':
			return {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(_p43._0)
			};
		case 'InOptions':
			return {
				ctor: '_Tuple2',
				_0: 'options',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p43._0))
			};
		case 'InPlaceholder':
			return {
				ctor: '_Tuple2',
				_0: 'placeholder',
				_1: _elm_lang$core$Json_Encode$string(_p43._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'element',
				_1: _elm_lang$core$Json_Encode$string(_p43._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$hAlignLabel = function (align) {
	var _p44 = align;
	switch (_p44.ctor) {
		case 'AlignLeft':
			return 'left';
		case 'AlignCenter':
			return 'center';
		default:
			return 'right';
	}
};
var _gicentre$elm_vega$VegaLite$geometryTypeSpec = function (gType) {
	var toCoords = function (pairs) {
		return _elm_lang$core$Json_Encode$list(
			A2(
				_elm_lang$core$List$map,
				function (_p45) {
					var _p46 = _p45;
					return _elm_lang$core$Json_Encode$list(
						{
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$float(_p46._0),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$float(_p46._1),
								_1: {ctor: '[]'}
							}
						});
				},
				pairs));
	};
	var _p47 = gType;
	switch (_p47.ctor) {
		case 'GeoPoint':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('Point')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'coordinates',
							_1: _elm_lang$core$Json_Encode$list(
								{
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$float(_p47._0),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$float(_p47._1),
										_1: {ctor: '[]'}
									}
								})
						},
						_1: {ctor: '[]'}
					}
				});
		case 'GeoPoints':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('MultiPoint')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'coordinates',
							_1: toCoords(_p47._0)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'GeoLine':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('LineString')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'coordinates',
							_1: toCoords(_p47._0)
						},
						_1: {ctor: '[]'}
					}
				});
		case 'GeoLines':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('MultiLineString')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'coordinates',
							_1: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, toCoords, _p47._0))
						},
						_1: {ctor: '[]'}
					}
				});
		case 'GeoPolygon':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'type',
						_1: _elm_lang$core$Json_Encode$string('Polygon')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'coordinates',
							_1: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, toCoords, _p47._0))
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
						_1: _elm_lang$core$Json_Encode$string('MultiPolygon')
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'coordinates',
							_1: _elm_lang$core$Json_Encode$list(
								A2(
									_elm_lang$core$List$map,
									function (cs) {
										return _elm_lang$core$Json_Encode$list(
											A2(_elm_lang$core$List$map, toCoords, cs));
									},
									_p47._0))
						},
						_1: {ctor: '[]'}
					}
				});
	}
};
var _gicentre$elm_vega$VegaLite$fontWeightSpec = function (w) {
	var _p48 = w;
	switch (_p48.ctor) {
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
var _gicentre$elm_vega$VegaLite$legendConfigProperty = function (legendConfig) {
	var _p49 = legendConfig;
	switch (_p49.ctor) {
		case 'CornerRadius':
			return {
				ctor: '_Tuple2',
				_0: 'cornerRadius',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'FillColor':
			return {
				ctor: '_Tuple2',
				_0: 'fillColor',
				_1: _elm_lang$core$Json_Encode$string(_p49._0)
			};
		case 'Orient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$legendOrientLabel(_p49._0))
			};
		case 'Offset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'StrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'strokeColor',
				_1: _elm_lang$core$Json_Encode$string(_p49._0)
			};
		case 'LeStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p49._0))
			};
		case 'LeStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'LePadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'GradientLabelBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'gradientLabelBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p49._0))
			};
		case 'GradientLabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'gradientLabelLimit',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'GradientLabelOffset':
			return {
				ctor: '_Tuple2',
				_0: 'gradientLabelOffset',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'GradientStrokeColor':
			return {
				ctor: '_Tuple2',
				_0: 'gradientStrokeColor',
				_1: _elm_lang$core$Json_Encode$string(_p49._0)
			};
		case 'GradientStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'gradientStrokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'GradientHeight':
			return {
				ctor: '_Tuple2',
				_0: 'gradientHeight',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'GradientWidth':
			return {
				ctor: '_Tuple2',
				_0: 'gradientWidth',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'LeLabelAlign':
			return {
				ctor: '_Tuple2',
				_0: 'labelAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$hAlignLabel(_p49._0))
			};
		case 'LeLabelBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'labelBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p49._0))
			};
		case 'LeLabelColor':
			return {
				ctor: '_Tuple2',
				_0: 'labelColor',
				_1: _elm_lang$core$Json_Encode$string(_p49._0)
			};
		case 'LeLabelFont':
			return {
				ctor: '_Tuple2',
				_0: 'labelFont',
				_1: _elm_lang$core$Json_Encode$string(_p49._0)
			};
		case 'LeLabelFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'LeLabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'labelLimit',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'LeLabelOffset':
			return {
				ctor: '_Tuple2',
				_0: 'labelOffset',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'LeShortTimeLabels':
			return {
				ctor: '_Tuple2',
				_0: 'shortTimeLabels',
				_1: _elm_lang$core$Json_Encode$bool(_p49._0)
			};
		case 'EntryPadding':
			return {
				ctor: '_Tuple2',
				_0: 'entryPadding',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'SymbolColor':
			return {
				ctor: '_Tuple2',
				_0: 'symbolColor',
				_1: _elm_lang$core$Json_Encode$string(_p49._0)
			};
		case 'SymbolType':
			return {
				ctor: '_Tuple2',
				_0: 'symbolType',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$symbolLabel(_p49._0))
			};
		case 'SymbolSize':
			return {
				ctor: '_Tuple2',
				_0: 'symbolSize',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'SymbolStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'symbolStrokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'LeTitleAlign':
			return {
				ctor: '_Tuple2',
				_0: 'titleAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$hAlignLabel(_p49._0))
			};
		case 'LeTitleBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'titleBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p49._0))
			};
		case 'LeTitleColor':
			return {
				ctor: '_Tuple2',
				_0: 'titleColor',
				_1: _elm_lang$core$Json_Encode$string(_p49._0)
			};
		case 'LeTitleFont':
			return {
				ctor: '_Tuple2',
				_0: 'titleFont',
				_1: _elm_lang$core$Json_Encode$string(_p49._0)
			};
		case 'LeTitleFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		case 'LeTitleFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontWeight',
				_1: _gicentre$elm_vega$VegaLite$fontWeightSpec(_p49._0)
			};
		case 'LeTitleLimit':
			return {
				ctor: '_Tuple2',
				_0: 'titleLimit',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _elm_lang$core$Json_Encode$float(_p49._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$fieldTitleLabel = function (ftp) {
	var _p50 = ftp;
	switch (_p50.ctor) {
		case 'Verbal':
			return 'verbal';
		case 'Function':
			return 'function';
		default:
			return 'plain';
	}
};
var _gicentre$elm_vega$VegaLite$extentSpec = function (ext) {
	var _p51 = ext;
	switch (_p51.ctor) {
		case 'ExCI':
			return _elm_lang$core$Json_Encode$string('ci');
		case 'ExStderr':
			return _elm_lang$core$Json_Encode$string('stderr');
		case 'ExStdev':
			return _elm_lang$core$Json_Encode$string('stdev');
		case 'ExIqr':
			return _elm_lang$core$Json_Encode$string('iqr');
		case 'ExRange':
			return _elm_lang$core$Json_Encode$string('min-max');
		default:
			return _elm_lang$core$Json_Encode$float(_p51._0);
	}
};
var _gicentre$elm_vega$VegaLite$dayLabel = function (day) {
	var _p52 = day;
	switch (_p52.ctor) {
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
var _gicentre$elm_vega$VegaLite$dateTimeProperty = function (dt) {
	var _p53 = dt;
	switch (_p53.ctor) {
		case 'DTYear':
			return {
				ctor: '_Tuple2',
				_0: 'year',
				_1: _elm_lang$core$Json_Encode$int(_p53._0)
			};
		case 'DTQuarter':
			return {
				ctor: '_Tuple2',
				_0: 'quarter',
				_1: _elm_lang$core$Json_Encode$int(_p53._0)
			};
		case 'DTMonth':
			return {
				ctor: '_Tuple2',
				_0: 'month',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$monthNameLabel(_p53._0))
			};
		case 'DTDate':
			return {
				ctor: '_Tuple2',
				_0: 'date',
				_1: _elm_lang$core$Json_Encode$int(_p53._0)
			};
		case 'DTDay':
			return {
				ctor: '_Tuple2',
				_0: 'day',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$dayLabel(_p53._0))
			};
		case 'DTHours':
			return {
				ctor: '_Tuple2',
				_0: 'hours',
				_1: _elm_lang$core$Json_Encode$int(_p53._0)
			};
		case 'DTMinutes':
			return {
				ctor: '_Tuple2',
				_0: 'minutes',
				_1: _elm_lang$core$Json_Encode$int(_p53._0)
			};
		case 'DTSeconds':
			return {
				ctor: '_Tuple2',
				_0: 'seconds',
				_1: _elm_lang$core$Json_Encode$int(_p53._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'milliseconds',
				_1: _elm_lang$core$Json_Encode$int(_p53._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$legendProperty = function (legendProp) {
	var _p54 = legendProp;
	switch (_p54.ctor) {
		case 'LType':
			var _p55 = _p54._0;
			if (_p55.ctor === 'Gradient') {
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
		case 'LFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$string(_p54._0)
			};
		case 'LOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p54._0)
			};
		case 'LOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$legendOrientLabel(_p54._0))
			};
		case 'LPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _elm_lang$core$Json_Encode$float(_p54._0)
			};
		case 'LTickCount':
			return {
				ctor: '_Tuple2',
				_0: 'tickCount',
				_1: _elm_lang$core$Json_Encode$float(_p54._0)
			};
		case 'LTitle':
			var _p56 = _p54._0;
			return _elm_lang$core$Native_Utils.eq(_p56, '') ? {ctor: '_Tuple2', _0: 'title', _1: _elm_lang$core$Json_Encode$null} : {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$string(_p56)
			};
		case 'LValues':
			var list = function () {
				var _p57 = _p54._0;
				switch (_p57.ctor) {
					case 'LNumbers':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p57._0));
					case 'LDateTimes':
						return _elm_lang$core$Json_Encode$list(
							A2(
								_elm_lang$core$List$map,
								function (dt) {
									return _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, dt));
								},
								_p57._0));
					default:
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p57._0));
				}
			}();
			return {ctor: '_Tuple2', _0: 'values', _1: list};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _elm_lang$core$Json_Encode$int(_p54._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$scaleDomainSpec = function (sdType) {
	var _p58 = sdType;
	switch (_p58.ctor) {
		case 'DNumbers':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p58._0));
		case 'DDateTimes':
			return _elm_lang$core$Json_Encode$list(
				A2(
					_elm_lang$core$List$map,
					function (dt) {
						return _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, dt));
					},
					_p58._0));
		case 'DStrings':
			return _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p58._0));
		case 'DSelection':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'selection',
						_1: _elm_lang$core$Json_Encode$string(_p58._0)
					},
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$string('unaggregated');
	}
};
var _gicentre$elm_vega$VegaLite$dataValuesSpecs = function (dvs) {
	var _p59 = dvs;
	switch (_p59.ctor) {
		case 'Numbers':
			return A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p59._0);
		case 'Strings':
			return A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p59._0);
		case 'DateTimes':
			return A2(
				_elm_lang$core$List$map,
				function (dts) {
					return _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, dts));
				},
				_p59._0);
		default:
			return A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$bool, _p59._0);
	}
};
var _gicentre$elm_vega$VegaLite$dataValueSpec = function (val) {
	var _p60 = val;
	switch (_p60.ctor) {
		case 'Number':
			return _elm_lang$core$Json_Encode$float(_p60._0);
		case 'Str':
			return _elm_lang$core$Json_Encode$string(_p60._0);
		case 'Boolean':
			return _elm_lang$core$Json_Encode$bool(_p60._0);
		default:
			return _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, _p60._0));
	}
};
var _gicentre$elm_vega$VegaLite$dataTypeSpec = function (dType) {
	var _p61 = dType;
	switch (_p61.ctor) {
		case 'FoNumber':
			return _elm_lang$core$Json_Encode$string('number');
		case 'FoBoolean':
			return _elm_lang$core$Json_Encode$string('boolean');
		case 'FoDate':
			var _p62 = _p61._0;
			return _elm_lang$core$Native_Utils.eq(_p62, '') ? _elm_lang$core$Json_Encode$string('date') : _elm_lang$core$Json_Encode$string(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'date:\'',
					A2(_elm_lang$core$Basics_ops['++'], _p62, '\'')));
		default:
			var _p63 = _p61._0;
			return _elm_lang$core$Native_Utils.eq(_p63, '') ? _elm_lang$core$Json_Encode$string('utc') : _elm_lang$core$Json_Encode$string(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'utc:\'',
					A2(_elm_lang$core$Basics_ops['++'], _p63, '\'')));
	}
};
var _gicentre$elm_vega$VegaLite$formatProperty = function (fmt) {
	var _p64 = fmt;
	switch (_p64.ctor) {
		case 'JSON':
			var _p65 = _p64._0;
			return _elm_lang$core$Native_Utils.eq(
				_elm_lang$core$String$trim(_p65),
				'') ? {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('json')
				},
				_1: {ctor: '[]'}
			} : {
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
						_1: _elm_lang$core$Json_Encode$string(_p65)
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
						_1: _elm_lang$core$Json_Encode$string(
							_elm_lang$core$String$fromChar(_p64._0))
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
						_1: _elm_lang$core$Json_Encode$string(_p64._0)
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
						_1: _elm_lang$core$Json_Encode$string(_p64._0)
					},
					_1: {ctor: '[]'}
				}
			};
		default:
			var _p68 = _p64._0;
			return _elm_lang$core$Native_Utils.eq(
				_p68,
				{ctor: '[]'}) ? {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'parse', _1: _elm_lang$core$Json_Encode$null},
				_1: {ctor: '[]'}
			} : {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'parse',
					_1: _elm_lang$core$Json_Encode$object(
						A2(
							_elm_lang$core$List$map,
							function (_p66) {
								var _p67 = _p66;
								return {
									ctor: '_Tuple2',
									_0: _p67._0,
									_1: _gicentre$elm_vega$VegaLite$dataTypeSpec(_p67._1)
								};
							},
							_p68))
				},
				_1: {ctor: '[]'}
			};
	}
};
var _gicentre$elm_vega$VegaLite$cursorLabel = function (cur) {
	var _p69 = cur;
	switch (_p69.ctor) {
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
var _gicentre$elm_vega$VegaLite$compositionAlignmentSpec = function (ca) {
	var _p70 = ca;
	switch (_p70.ctor) {
		case 'CANone':
			return _elm_lang$core$Json_Encode$string('none');
		case 'CAEach':
			return _elm_lang$core$Json_Encode$string('each');
		default:
			return _elm_lang$core$Json_Encode$string('all');
	}
};
var _gicentre$elm_vega$VegaLite$cInterpolateSpec = function (iType) {
	var _p71 = iType;
	switch (_p71.ctor) {
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
							_1: _elm_lang$core$Json_Encode$float(_p71._0)
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
							_1: _elm_lang$core$Json_Encode$float(_p71._0)
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
							_1: _elm_lang$core$Json_Encode$float(_p71._0)
						},
						_1: {ctor: '[]'}
					}
				});
	}
};
var _gicentre$elm_vega$VegaLite$scaleProperty = function (scaleProp) {
	var _p72 = scaleProp;
	switch (_p72.ctor) {
		case 'SType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$scaleLabel(_p72._0))
			};
		case 'SDomain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _gicentre$elm_vega$VegaLite$scaleDomainSpec(_p72._0)
			};
		case 'SRange':
			var _p73 = _p72._0;
			switch (_p73.ctor) {
				case 'RNumbers':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p73._0))
					};
				case 'RStrings':
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p73._0))
					};
				default:
					return {
						ctor: '_Tuple2',
						_0: 'range',
						_1: _elm_lang$core$Json_Encode$string(_p73._0)
					};
			}
		case 'SScheme':
			return A2(_gicentre$elm_vega$VegaLite$schemeProperty, _p72._0, _p72._1);
		case 'SPadding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _elm_lang$core$Json_Encode$float(_p72._0)
			};
		case 'SPaddingInner':
			return {
				ctor: '_Tuple2',
				_0: 'paddingInner',
				_1: _elm_lang$core$Json_Encode$float(_p72._0)
			};
		case 'SPaddingOuter':
			return {
				ctor: '_Tuple2',
				_0: 'paddingOuter',
				_1: _elm_lang$core$Json_Encode$float(_p72._0)
			};
		case 'SRangeStep':
			var _p74 = _p72._0;
			if (_p74.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: 'rangeStep',
					_1: _elm_lang$core$Json_Encode$float(_p74._0)
				};
			} else {
				return {ctor: '_Tuple2', _0: 'rangeStep', _1: _elm_lang$core$Json_Encode$null};
			}
		case 'SRound':
			return {
				ctor: '_Tuple2',
				_0: 'round',
				_1: _elm_lang$core$Json_Encode$bool(_p72._0)
			};
		case 'SClamp':
			return {
				ctor: '_Tuple2',
				_0: 'clamp',
				_1: _elm_lang$core$Json_Encode$bool(_p72._0)
			};
		case 'SInterpolate':
			return {
				ctor: '_Tuple2',
				_0: 'interpolate',
				_1: _gicentre$elm_vega$VegaLite$cInterpolateSpec(_p72._0)
			};
		case 'SNice':
			return {
				ctor: '_Tuple2',
				_0: 'nice',
				_1: _gicentre$elm_vega$VegaLite$scaleNiceSpec(_p72._0)
			};
		case 'SZero':
			return {
				ctor: '_Tuple2',
				_0: 'zero',
				_1: _elm_lang$core$Json_Encode$bool(_p72._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'reverse',
				_1: _elm_lang$core$Json_Encode$bool(_p72._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$channelLabel = function (ch) {
	var _p75 = ch;
	switch (_p75.ctor) {
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
var _gicentre$elm_vega$VegaLite$resolveProperty = function (res) {
	var _p76 = res;
	switch (_p76.ctor) {
		case 'RAxis':
			return {
				ctor: '_Tuple2',
				_0: 'axis',
				_1: _elm_lang$core$Json_Encode$object(
					A2(
						_elm_lang$core$List$map,
						function (_p77) {
							var _p78 = _p77;
							return {
								ctor: '_Tuple2',
								_0: _gicentre$elm_vega$VegaLite$channelLabel(_p78._0),
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$elm_vega$VegaLite$resolutionLabel(_p78._1))
							};
						},
						_p76._0))
			};
		case 'RLegend':
			return {
				ctor: '_Tuple2',
				_0: 'legend',
				_1: _elm_lang$core$Json_Encode$object(
					A2(
						_elm_lang$core$List$map,
						function (_p79) {
							var _p80 = _p79;
							return {
								ctor: '_Tuple2',
								_0: _gicentre$elm_vega$VegaLite$channelLabel(_p80._0),
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$elm_vega$VegaLite$resolutionLabel(_p80._1))
							};
						},
						_p76._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$object(
					A2(
						_elm_lang$core$List$map,
						function (_p81) {
							var _p82 = _p81;
							return {
								ctor: '_Tuple2',
								_0: _gicentre$elm_vega$VegaLite$channelLabel(_p82._0),
								_1: _elm_lang$core$Json_Encode$string(
									_gicentre$elm_vega$VegaLite$resolutionLabel(_p82._1))
							};
						},
						_p76._0))
			};
	}
};
var _gicentre$elm_vega$VegaLite$boundsSpec = function (bnds) {
	var _p83 = bnds;
	if (_p83.ctor === 'Full') {
		return _elm_lang$core$Json_Encode$string('full');
	} else {
		return _elm_lang$core$Json_Encode$string('flush');
	}
};
var _gicentre$elm_vega$VegaLite$booleanOpSpec = function (bo) {
	var _p84 = bo;
	switch (_p84.ctor) {
		case 'Expr':
			return _elm_lang$core$Json_Encode$string(_p84._0);
		case 'SelectionName':
			return _elm_lang$core$Json_Encode$string(_p84._0);
		case 'Selection':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'selection',
						_1: _elm_lang$core$Json_Encode$string(_p84._0)
					},
					_1: {ctor: '[]'}
				});
		case 'And':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'and',
						_1: _elm_lang$core$Json_Encode$list(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p84._0),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p84._1),
									_1: {ctor: '[]'}
								}
							})
					},
					_1: {ctor: '[]'}
				});
		case 'Or':
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'or',
						_1: _elm_lang$core$Json_Encode$list(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p84._0),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p84._1),
									_1: {ctor: '[]'}
								}
							})
					},
					_1: {ctor: '[]'}
				});
		default:
			return _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'not',
						_1: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p84._0)
					},
					_1: {ctor: '[]'}
				});
	}
};
var _gicentre$elm_vega$VegaLite$binProperty = function (binProp) {
	var _p85 = binProp;
	switch (_p85.ctor) {
		case 'MaxBins':
			return {
				ctor: '_Tuple2',
				_0: 'maxbins',
				_1: _elm_lang$core$Json_Encode$int(_p85._0)
			};
		case 'Base':
			return {
				ctor: '_Tuple2',
				_0: 'base',
				_1: _elm_lang$core$Json_Encode$float(_p85._0)
			};
		case 'Step':
			return {
				ctor: '_Tuple2',
				_0: 'step',
				_1: _elm_lang$core$Json_Encode$float(_p85._0)
			};
		case 'Steps':
			return {
				ctor: '_Tuple2',
				_0: 'steps',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p85._0))
			};
		case 'MinStep':
			return {
				ctor: '_Tuple2',
				_0: 'minstep',
				_1: _elm_lang$core$Json_Encode$float(_p85._0)
			};
		case 'Divides':
			return {
				ctor: '_Tuple2',
				_0: 'divide',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p85._0))
			};
		case 'Extent':
			return {
				ctor: '_Tuple2',
				_0: 'extent',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$float(_p85._0),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$float(_p85._1),
							_1: {ctor: '[]'}
						}
					})
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'nice',
				_1: _elm_lang$core$Json_Encode$bool(_p85._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$bindingSpec = function (bnd) {
	var _p86 = bnd;
	switch (_p86.ctor) {
		case 'IRange':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('range')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'ICheckbox':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('checkbox')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'IRadio':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('radio')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'ISelect':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('select')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'IText':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('text')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'INumber':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('number')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'IDate':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('date')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'ITime':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('time')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'IMonth':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('month')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'IWeek':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('week')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'IDateTimeLocal':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('datetimelocal')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		case 'ITel':
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('tel')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: _p86._0,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'input',
							_1: _elm_lang$core$Json_Encode$string('color')
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$inputProperty, _p86._1)
					})
			};
	}
};
var _gicentre$elm_vega$VegaLite$selectionProperty = function (selProp) {
	var _p87 = selProp;
	switch (_p87.ctor) {
		case 'Fields':
			return {
				ctor: '_Tuple2',
				_0: 'fields',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p87._0))
			};
		case 'Encodings':
			return {
				ctor: '_Tuple2',
				_0: 'encodings',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						function (_p88) {
							return _elm_lang$core$Json_Encode$string(
								_gicentre$elm_vega$VegaLite$channelLabel(_p88));
						},
						_p87._0))
			};
		case 'On':
			return {
				ctor: '_Tuple2',
				_0: 'on',
				_1: _elm_lang$core$Json_Encode$string(_p87._0)
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
					_gicentre$elm_vega$VegaLite$selectionResolutionLabel(_p87._0))
			};
		case 'SelectionMark':
			return {
				ctor: '_Tuple2',
				_0: 'mark',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$selectionMarkProperty, _p87._0))
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
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$bindingSpec, _p87._0))
			};
		case 'Nearest':
			return {
				ctor: '_Tuple2',
				_0: 'nearest',
				_1: _elm_lang$core$Json_Encode$bool(_p87._0)
			};
		case 'Toggle':
			return {
				ctor: '_Tuple2',
				_0: 'toggle',
				_1: _elm_lang$core$Json_Encode$string(_p87._0)
			};
		case 'Translate':
			var _p89 = _p87._0;
			return _elm_lang$core$Native_Utils.eq(_p89, '') ? {
				ctor: '_Tuple2',
				_0: 'translate',
				_1: _elm_lang$core$Json_Encode$bool(false)
			} : {
				ctor: '_Tuple2',
				_0: 'translate',
				_1: _elm_lang$core$Json_Encode$string(_p89)
			};
		default:
			var _p90 = _p87._0;
			return _elm_lang$core$Native_Utils.eq(_p90, '') ? {
				ctor: '_Tuple2',
				_0: 'zoom',
				_1: _elm_lang$core$Json_Encode$bool(false)
			} : {
				ctor: '_Tuple2',
				_0: 'zoom',
				_1: _elm_lang$core$Json_Encode$string(_p90)
			};
	}
};
var _gicentre$elm_vega$VegaLite$bin = function (bProps) {
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
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$binProperty, bProps))
	};
};
var _gicentre$elm_vega$VegaLite$detailChannelProperty = function (field) {
	var _p91 = field;
	switch (_p91.ctor) {
		case 'DName':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p91._0)
			};
		case 'DmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$measurementLabel(_p91._0))
			};
		case 'DBin':
			return _gicentre$elm_vega$VegaLite$bin(_p91._0);
		case 'DTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$timeUnitLabel(_p91._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$operationLabel(_p91._0))
			};
	}
};
var _gicentre$elm_vega$VegaLite$axisProperty = function (axisProp) {
	var _p92 = axisProp;
	switch (_p92.ctor) {
		case 'AxFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$string(_p92._0)
			};
		case 'AxLabels':
			return {
				ctor: '_Tuple2',
				_0: 'labels',
				_1: _elm_lang$core$Json_Encode$bool(_p92._0)
			};
		case 'AxLabelAngle':
			return {
				ctor: '_Tuple2',
				_0: 'labelAngle',
				_1: _elm_lang$core$Json_Encode$float(_p92._0)
			};
		case 'AxLabelOverlap':
			return {
				ctor: '_Tuple2',
				_0: 'labelOverlap',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$overlapStrategyLabel(_p92._0))
			};
		case 'AxLabelPadding':
			return {
				ctor: '_Tuple2',
				_0: 'labelPadding',
				_1: _elm_lang$core$Json_Encode$float(_p92._0)
			};
		case 'AxDomain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _elm_lang$core$Json_Encode$bool(_p92._0)
			};
		case 'AxGrid':
			return {
				ctor: '_Tuple2',
				_0: 'grid',
				_1: _elm_lang$core$Json_Encode$bool(_p92._0)
			};
		case 'AxMaxExtent':
			return {
				ctor: '_Tuple2',
				_0: 'maxExtent',
				_1: _elm_lang$core$Json_Encode$float(_p92._0)
			};
		case 'AxMinExtent':
			return {
				ctor: '_Tuple2',
				_0: 'minExtent',
				_1: _elm_lang$core$Json_Encode$float(_p92._0)
			};
		case 'AxOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$sideLabel(_p92._0))
			};
		case 'AxOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p92._0)
			};
		case 'AxPosition':
			return {
				ctor: '_Tuple2',
				_0: 'position',
				_1: _elm_lang$core$Json_Encode$float(_p92._0)
			};
		case 'AxZIndex':
			return {
				ctor: '_Tuple2',
				_0: 'zindex',
				_1: _elm_lang$core$Json_Encode$int(_p92._0)
			};
		case 'AxTicks':
			return {
				ctor: '_Tuple2',
				_0: 'ticks',
				_1: _elm_lang$core$Json_Encode$bool(_p92._0)
			};
		case 'AxTickCount':
			return {
				ctor: '_Tuple2',
				_0: 'tickCount',
				_1: _elm_lang$core$Json_Encode$int(_p92._0)
			};
		case 'AxTickSize':
			return {
				ctor: '_Tuple2',
				_0: 'tickSize',
				_1: _elm_lang$core$Json_Encode$float(_p92._0)
			};
		case 'AxValues':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p92._0))
			};
		case 'AxDates':
			return {
				ctor: '_Tuple2',
				_0: 'values',
				_1: _elm_lang$core$Json_Encode$list(
					A2(
						_elm_lang$core$List$map,
						function (dts) {
							return _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, dts));
						},
						_p92._0))
			};
		case 'AxTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$string(_p92._0)
			};
		case 'AxTitleAlign':
			return {
				ctor: '_Tuple2',
				_0: 'titleAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$hAlignLabel(_p92._0))
			};
		case 'AxTitleAngle':
			return {
				ctor: '_Tuple2',
				_0: 'titleAngle',
				_1: _elm_lang$core$Json_Encode$float(_p92._0)
			};
		case 'AxTitleMaxLength':
			return {
				ctor: '_Tuple2',
				_0: 'titleMaxLength',
				_1: _elm_lang$core$Json_Encode$float(_p92._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _elm_lang$core$Json_Encode$float(_p92._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$axisConfigProperty = function (axisCfg) {
	var _p93 = axisCfg;
	switch (_p93.ctor) {
		case 'BandPosition':
			return {
				ctor: '_Tuple2',
				_0: 'bandPosition',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'Domain':
			return {
				ctor: '_Tuple2',
				_0: 'domain',
				_1: _elm_lang$core$Json_Encode$bool(_p93._0)
			};
		case 'DomainColor':
			return {
				ctor: '_Tuple2',
				_0: 'domainColor',
				_1: _elm_lang$core$Json_Encode$string(_p93._0)
			};
		case 'DomainWidth':
			return {
				ctor: '_Tuple2',
				_0: 'domainWidth',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'MaxExtent':
			return {
				ctor: '_Tuple2',
				_0: 'maxExtent',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'MinExtent':
			return {
				ctor: '_Tuple2',
				_0: 'minExtent',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'Grid':
			return {
				ctor: '_Tuple2',
				_0: 'grid',
				_1: _elm_lang$core$Json_Encode$bool(_p93._0)
			};
		case 'GridColor':
			return {
				ctor: '_Tuple2',
				_0: 'gridColor',
				_1: _elm_lang$core$Json_Encode$string(_p93._0)
			};
		case 'GridDash':
			return {
				ctor: '_Tuple2',
				_0: 'gridDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p93._0))
			};
		case 'GridOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'gridOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'GridWidth':
			return {
				ctor: '_Tuple2',
				_0: 'gridWidth',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'Labels':
			return {
				ctor: '_Tuple2',
				_0: 'labels',
				_1: _elm_lang$core$Json_Encode$bool(_p93._0)
			};
		case 'LabelAngle':
			return {
				ctor: '_Tuple2',
				_0: 'labelAngle',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'LabelColor':
			return {
				ctor: '_Tuple2',
				_0: 'labelColor',
				_1: _elm_lang$core$Json_Encode$string(_p93._0)
			};
		case 'LabelFont':
			return {
				ctor: '_Tuple2',
				_0: 'labelFont',
				_1: _elm_lang$core$Json_Encode$string(_p93._0)
			};
		case 'LabelFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'LabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'labelLimit',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'LabelOverlap':
			return {
				ctor: '_Tuple2',
				_0: 'labelOverlap',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$overlapStrategyLabel(_p93._0))
			};
		case 'LabelPadding':
			return {
				ctor: '_Tuple2',
				_0: 'labelPadding',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'ShortTimeLabels':
			return {
				ctor: '_Tuple2',
				_0: 'shortTimeLabels',
				_1: _elm_lang$core$Json_Encode$bool(_p93._0)
			};
		case 'Ticks':
			return {
				ctor: '_Tuple2',
				_0: 'ticks',
				_1: _elm_lang$core$Json_Encode$bool(_p93._0)
			};
		case 'TickColor':
			return {
				ctor: '_Tuple2',
				_0: 'tickColor',
				_1: _elm_lang$core$Json_Encode$string(_p93._0)
			};
		case 'TickRound':
			return {
				ctor: '_Tuple2',
				_0: 'tickRound',
				_1: _elm_lang$core$Json_Encode$bool(_p93._0)
			};
		case 'TickSize':
			return {
				ctor: '_Tuple2',
				_0: 'tickSize',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'TickWidth':
			return {
				ctor: '_Tuple2',
				_0: 'tickWidth',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'TitleAlign':
			return {
				ctor: '_Tuple2',
				_0: 'titleAlign',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$hAlignLabel(_p93._0))
			};
		case 'TitleAngle':
			return {
				ctor: '_Tuple2',
				_0: 'titleAngle',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'TitleBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'titleBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p93._0))
			};
		case 'TitleColor':
			return {
				ctor: '_Tuple2',
				_0: 'titleColor',
				_1: _elm_lang$core$Json_Encode$string(_p93._0)
			};
		case 'TitleFont':
			return {
				ctor: '_Tuple2',
				_0: 'titleFont',
				_1: _elm_lang$core$Json_Encode$string(_p93._0)
			};
		case 'TitleFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontWeight',
				_1: _gicentre$elm_vega$VegaLite$fontWeightSpec(_p93._0)
			};
		case 'TitleFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'TitleLimit':
			return {
				ctor: '_Tuple2',
				_0: 'titleLimit',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'TitleMaxLength':
			return {
				ctor: '_Tuple2',
				_0: 'titleMaxLength',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'TitlePadding':
			return {
				ctor: '_Tuple2',
				_0: 'titlePadding',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		case 'TitleX':
			return {
				ctor: '_Tuple2',
				_0: 'titleX',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'titleY',
				_1: _elm_lang$core$Json_Encode$float(_p93._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$autosizeProperty = function (asCfg) {
	var _p94 = asCfg;
	switch (_p94.ctor) {
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
var _gicentre$elm_vega$VegaLite$arrangementLabel = function (arrng) {
	var _p95 = arrng;
	if (_p95.ctor === 'Row') {
		return 'row';
	} else {
		return 'column';
	}
};
var _gicentre$elm_vega$VegaLite$hyperlinkChannelProperty = function (field) {
	var _p96 = field;
	switch (_p96.ctor) {
		case 'HName':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$string(_p96._0)
				},
				_1: {ctor: '[]'}
			};
		case 'HRepeat':
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
									_gicentre$elm_vega$VegaLite$arrangementLabel(_p96._0))
							},
							_1: {ctor: '[]'}
						})
				},
				_1: {ctor: '[]'}
			};
		case 'HmType':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$measurementLabel(_p96._0))
				},
				_1: {ctor: '[]'}
			};
		case 'HBin':
			return {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bin(_p96._0),
				_1: {ctor: '[]'}
			};
		case 'HSelectionCondition':
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
								_1: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p96._0)
							},
							_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$hyperlinkChannelProperty, _p96._1)
						})
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$hyperlinkChannelProperty, _p96._2)
			};
		case 'HDataCondition':
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
								_0: 'test',
								_1: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p96._0)
							},
							_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$hyperlinkChannelProperty, _p96._1)
						})
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$hyperlinkChannelProperty, _p96._2)
			};
		case 'HTimeUnit':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'timeUnit',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$timeUnitLabel(_p96._0))
				},
				_1: {ctor: '[]'}
			};
		case 'HAggregate':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'aggregate',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$operationLabel(_p96._0))
				},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$string(_p96._0)
				},
				_1: {ctor: '[]'}
			};
	}
};
var _gicentre$elm_vega$VegaLite$markChannelProperty = function (field) {
	var _p97 = field;
	switch (_p97.ctor) {
		case 'MName':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$string(_p97._0)
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
									_gicentre$elm_vega$VegaLite$arrangementLabel(_p97._0))
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
						_gicentre$elm_vega$VegaLite$measurementLabel(_p97._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MScale':
			var _p98 = _p97._0;
			return _elm_lang$core$Native_Utils.eq(
				_p98,
				{ctor: '[]'}) ? {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'scale', _1: _elm_lang$core$Json_Encode$null},
				_1: {ctor: '[]'}
			} : {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'scale',
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$scaleProperty, _p98))
				},
				_1: {ctor: '[]'}
			};
		case 'MLegend':
			var _p99 = _p97._0;
			return _elm_lang$core$Native_Utils.eq(
				_p99,
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
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$legendProperty, _p99))
				},
				_1: {ctor: '[]'}
			};
		case 'MBin':
			return {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bin(_p97._0),
				_1: {ctor: '[]'}
			};
		case 'MSelectionCondition':
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
								_1: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p97._0)
							},
							_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, _p97._1)
						})
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, _p97._2)
			};
		case 'MDataCondition':
			var testClause = function (_p100) {
				var _p101 = _p100;
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'test',
							_1: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p101._0)
						},
						_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, _p101._1)
					});
			};
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'condition',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, testClause, _p97._0))
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, _p97._1)
			};
		case 'MTimeUnit':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'timeUnit',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$timeUnitLabel(_p97._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MTitle':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'title',
					_1: _elm_lang$core$Json_Encode$string(_p97._0)
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
						_gicentre$elm_vega$VegaLite$operationLabel(_p97._0))
				},
				_1: {ctor: '[]'}
			};
		case 'MPath':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$string(_p97._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MNumber':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$float(_p97._0)
				},
				_1: {ctor: '[]'}
			};
		case 'MString':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$string(_p97._0)
				},
				_1: {ctor: '[]'}
			};
		default:
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'value',
					_1: _elm_lang$core$Json_Encode$bool(_p97._0)
				},
				_1: {ctor: '[]'}
			};
	}
};
var _gicentre$elm_vega$VegaLite$sortProperty = function (sp) {
	var _p102 = sp;
	switch (_p102.ctor) {
		case 'Ascending':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'order',
					_1: _elm_lang$core$Json_Encode$string('ascending')
				},
				_1: {ctor: '[]'}
			};
		case 'Descending':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'order',
					_1: _elm_lang$core$Json_Encode$string('descending')
				},
				_1: {ctor: '[]'}
			};
		case 'ByFieldOp':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$string(_p102._0)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'op',
						_1: _elm_lang$core$Json_Encode$string(
							_gicentre$elm_vega$VegaLite$operationLabel(_p102._1))
					},
					_1: {ctor: '[]'}
				}
			};
		case 'ByRepeatOp':
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
									_gicentre$elm_vega$VegaLite$arrangementLabel(_p102._0))
							},
							_1: {ctor: '[]'}
						})
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'op',
						_1: _elm_lang$core$Json_Encode$string(
							_gicentre$elm_vega$VegaLite$operationLabel(_p102._1))
					},
					_1: {ctor: '[]'}
				}
			};
		default:
			return A2(
				_elm_lang$core$Debug$log,
				'Warning: Unexpected custom sorting provided to sortProperty',
				{ctor: '[]'});
	}
};
var _gicentre$elm_vega$VegaLite$orderChannelProperty = function (oDef) {
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
								_gicentre$elm_vega$VegaLite$arrangementLabel(_p103._0))
						},
						_1: {ctor: '[]'}
					})
			};
		case 'OmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$measurementLabel(_p103._0))
			};
		case 'OBin':
			return _gicentre$elm_vega$VegaLite$bin(_p103._0);
		case 'OAggregate':
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$operationLabel(_p103._0))
			};
		case 'OTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$timeUnitLabel(_p103._0))
			};
		default:
			var _p105 = _p103._0;
			var _p104 = _p105;
			_v88_4:
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
							case 'CustomSort':
								return {
									ctor: '_Tuple2',
									_0: 'sort',
									_1: _elm_lang$core$Json_Encode$list(
										_gicentre$elm_vega$VegaLite$dataValuesSpecs(_p104._0._0))
								};
							default:
								break _v88_4;
						}
					} else {
						break _v88_4;
					}
				}
			} while(false);
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$sortProperty, _p105))
			};
	}
};
var _gicentre$elm_vega$VegaLite$positionChannelProperty = function (pDef) {
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
					_gicentre$elm_vega$VegaLite$measurementLabel(_p106._0))
			};
		case 'PBin':
			return _gicentre$elm_vega$VegaLite$bin(_p106._0);
		case 'PAggregate':
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$operationLabel(_p106._0))
			};
		case 'PTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$timeUnitLabel(_p106._0))
			};
		case 'PTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$string(_p106._0)
			};
		case 'PSort':
			var _p108 = _p106._0;
			var _p107 = _p108;
			_v90_4:
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
							case 'CustomSort':
								return {
									ctor: '_Tuple2',
									_0: 'sort',
									_1: _elm_lang$core$Json_Encode$list(
										_gicentre$elm_vega$VegaLite$dataValuesSpecs(_p107._0._0))
								};
							default:
								break _v90_4;
						}
					} else {
						break _v90_4;
					}
				}
			} while(false);
			return {
				ctor: '_Tuple2',
				_0: 'sort',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$sortProperty, _p108))
			};
		case 'PScale':
			var _p109 = _p106._0;
			return _elm_lang$core$Native_Utils.eq(
				_p109,
				{ctor: '[]'}) ? {ctor: '_Tuple2', _0: 'scale', _1: _elm_lang$core$Json_Encode$null} : {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$scaleProperty, _p109))
			};
		case 'PAxis':
			var _p110 = _p106._0;
			return _elm_lang$core$Native_Utils.eq(
				_p110,
				{ctor: '[]'}) ? {ctor: '_Tuple2', _0: 'axis', _1: _elm_lang$core$Json_Encode$null} : {
				ctor: '_Tuple2',
				_0: 'axis',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisProperty, _p110))
			};
		case 'PStack':
			return _gicentre$elm_vega$VegaLite$stackProperty(_p106._0);
		case 'PRepeat':
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
								_gicentre$elm_vega$VegaLite$arrangementLabel(_p106._0))
						},
						_1: {ctor: '[]'}
					})
			};
		case 'PWidth':
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _elm_lang$core$Json_Encode$string('width')
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'value',
				_1: _elm_lang$core$Json_Encode$string('height')
			};
	}
};
var _gicentre$elm_vega$VegaLite$textChannelProperty = function (tDef) {
	var _p111 = tDef;
	switch (_p111.ctor) {
		case 'TName':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'field',
					_1: _elm_lang$core$Json_Encode$string(_p111._0)
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
									_gicentre$elm_vega$VegaLite$arrangementLabel(_p111._0))
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
						_gicentre$elm_vega$VegaLite$measurementLabel(_p111._0))
				},
				_1: {ctor: '[]'}
			};
		case 'TBin':
			return {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bin(_p111._0),
				_1: {ctor: '[]'}
			};
		case 'TAggregate':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'aggregate',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$operationLabel(_p111._0))
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
						_gicentre$elm_vega$VegaLite$timeUnitLabel(_p111._0))
				},
				_1: {ctor: '[]'}
			};
		case 'TTitle':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'title',
					_1: _elm_lang$core$Json_Encode$string(_p111._0)
				},
				_1: {ctor: '[]'}
			};
		case 'TFormat':
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'format',
					_1: _elm_lang$core$Json_Encode$string(_p111._0)
				},
				_1: {ctor: '[]'}
			};
		case 'TSelectionCondition':
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
								_1: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p111._0)
							},
							_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, _p111._1)
						})
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, _p111._2)
			};
		default:
			var testClause = function (_p112) {
				var _p113 = _p112;
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'test',
							_1: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p113._0)
						},
						_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, _p113._1)
					});
			};
			return {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'condition',
					_1: _elm_lang$core$Json_Encode$list(
						A2(_elm_lang$core$List$map, testClause, _p111._0))
				},
				_1: A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, _p111._1)
			};
	}
};
var _gicentre$elm_vega$VegaLite$anchorLabel = function (an) {
	var _p114 = an;
	switch (_p114.ctor) {
		case 'AStart':
			return 'start';
		case 'AMiddle':
			return 'middle';
		default:
			return 'end';
	}
};
var _gicentre$elm_vega$VegaLite$headerProperty = function (hProp) {
	var _p115 = hProp;
	switch (_p115.ctor) {
		case 'HFormat':
			return {
				ctor: '_Tuple2',
				_0: 'format',
				_1: _elm_lang$core$Json_Encode$string(_p115._0)
			};
		case 'HLabelAngle':
			return {
				ctor: '_Tuple2',
				_0: 'labelAngle',
				_1: _elm_lang$core$Json_Encode$float(_p115._0)
			};
		case 'HLabelColor':
			return {
				ctor: '_Tuple2',
				_0: 'labelColor',
				_1: _elm_lang$core$Json_Encode$string(_p115._0)
			};
		case 'HLabelFont':
			return {
				ctor: '_Tuple2',
				_0: 'labelFont',
				_1: _elm_lang$core$Json_Encode$string(_p115._0)
			};
		case 'HLabelFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'labelFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p115._0)
			};
		case 'HLabelLimit':
			return {
				ctor: '_Tuple2',
				_0: 'labelLimit',
				_1: _elm_lang$core$Json_Encode$float(_p115._0)
			};
		case 'HTitle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$string(_p115._0)
			};
		case 'HTitleAnchor':
			return {
				ctor: '_Tuple2',
				_0: 'titleAnchor',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$anchorLabel(_p115._0))
			};
		case 'HTitleAngle':
			return {
				ctor: '_Tuple2',
				_0: 'titleAngle',
				_1: _elm_lang$core$Json_Encode$float(_p115._0)
			};
		case 'HTitleBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'titleBaseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p115._0))
			};
		case 'HTitleColor':
			return {
				ctor: '_Tuple2',
				_0: 'titleColor',
				_1: _elm_lang$core$Json_Encode$string(_p115._0)
			};
		case 'HTitleFont':
			return {
				ctor: '_Tuple2',
				_0: 'titleFont',
				_1: _elm_lang$core$Json_Encode$string(_p115._0)
			};
		case 'HTitleFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontWeight',
				_1: _elm_lang$core$Json_Encode$string(_p115._0)
			};
		case 'HTitleFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'titleFontSize',
				_1: _elm_lang$core$Json_Encode$float(_p115._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'titleLimit',
				_1: _elm_lang$core$Json_Encode$float(_p115._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$facetChannelProperty = function (fMap) {
	var _p116 = fMap;
	switch (_p116.ctor) {
		case 'FName':
			return {
				ctor: '_Tuple2',
				_0: 'field',
				_1: _elm_lang$core$Json_Encode$string(_p116._0)
			};
		case 'FmType':
			return {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$measurementLabel(_p116._0))
			};
		case 'FBin':
			return _gicentre$elm_vega$VegaLite$bin(_p116._0);
		case 'FAggregate':
			return {
				ctor: '_Tuple2',
				_0: 'aggregate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$operationLabel(_p116._0))
			};
		case 'FTimeUnit':
			return {
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$timeUnitLabel(_p116._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'header',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$headerProperty, _p116._0))
			};
	}
};
var _gicentre$elm_vega$VegaLite$facetMappingProperty = function (fMap) {
	var _p117 = fMap;
	if (_p117.ctor === 'RowBy') {
		return {
			ctor: '_Tuple2',
			_0: 'row',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$facetChannelProperty, _p117._0))
		};
	} else {
		return {
			ctor: '_Tuple2',
			_0: 'column',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$facetChannelProperty, _p117._0))
		};
	}
};
var _gicentre$elm_vega$VegaLite$titleConfigSpec = function (titleCfg) {
	var _p118 = titleCfg;
	switch (_p118.ctor) {
		case 'TAnchor':
			return {
				ctor: '_Tuple2',
				_0: 'anchor',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$anchorLabel(_p118._0))
			};
		case 'TAngle':
			return {
				ctor: '_Tuple2',
				_0: 'angle',
				_1: _elm_lang$core$Json_Encode$float(_p118._0)
			};
		case 'TBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'baseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p118._0))
			};
		case 'TColor':
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _elm_lang$core$Json_Encode$string(_p118._0)
			};
		case 'TFont':
			return {
				ctor: '_Tuple2',
				_0: 'font',
				_1: _elm_lang$core$Json_Encode$string(_p118._0)
			};
		case 'TFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'fontSize',
				_1: _elm_lang$core$Json_Encode$float(_p118._0)
			};
		case 'TFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'fontWeight',
				_1: _gicentre$elm_vega$VegaLite$fontWeightSpec(_p118._0)
			};
		case 'TLimit':
			return {
				ctor: '_Tuple2',
				_0: 'limit',
				_1: _elm_lang$core$Json_Encode$float(_p118._0)
			};
		case 'TOffset':
			return {
				ctor: '_Tuple2',
				_0: 'offset',
				_1: _elm_lang$core$Json_Encode$float(_p118._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$sideLabel(_p118._0))
			};
	}
};
var _gicentre$elm_vega$VegaLite$transpose = function (ll) {
	transpose:
	while (true) {
		var _p119 = ll;
		if (_p119.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p119._0.ctor === '[]') {
				var _v99 = _p119._1;
				ll = _v99;
				continue transpose;
			} else {
				var _p120 = _p119._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p120);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p120);
				return {
					ctor: '::',
					_0: {ctor: '::', _0: _p119._0._0, _1: heads},
					_1: _gicentre$elm_vega$VegaLite$transpose(
						{ctor: '::', _0: _p119._0._1, _1: tails})
				};
			}
		}
	}
};
var _gicentre$elm_vega$VegaLite$windowAs = F3(
	function (fName, ws, wProps) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'windowAs',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$object(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'as',
									_1: _elm_lang$core$Json_Encode$string(fName)
								},
								_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$windowAsProperty, ws)
							}),
						_1: {
							ctor: '::',
							_0: A2(_gicentre$elm_vega$VegaLite$windowPropertySpec, 'frame', wProps),
							_1: {
								ctor: '::',
								_0: A2(_gicentre$elm_vega$VegaLite$windowPropertySpec, 'ignorePeers', wProps),
								_1: {
									ctor: '::',
									_0: A2(_gicentre$elm_vega$VegaLite$windowPropertySpec, 'groupby', wProps),
									_1: {
										ctor: '::',
										_0: A2(_gicentre$elm_vega$VegaLite$windowPropertySpec, 'sort', wProps),
										_1: {ctor: '[]'}
									}
								}
							}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$toVegaLite = function (spec) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: '$schema',
				_1: _elm_lang$core$Json_Encode$string('https://vega.github.io/schema/vega-lite/v3.json')
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p121) {
					var _p122 = _p121;
					return {
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$VegaLite$vlPropertyLabel(_p122._0),
						_1: _p122._1
					};
				},
				spec)
		});
};
var _gicentre$elm_vega$VegaLite$tooltips = function (tDefss) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'tooltip',
			_1: _elm_lang$core$Json_Encode$list(
				A2(
					_elm_lang$core$List$map,
					function (tDefs) {
						return _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, tDefs));
					},
					tDefss))
		});
};
var _gicentre$elm_vega$VegaLite$tooltip = function (tDefs) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'tooltip',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, tDefs))
		});
};
var _gicentre$elm_vega$VegaLite$timeUnitAs = F3(
	function (tu, field, label) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'timeUnit',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(
							_gicentre$elm_vega$VegaLite$timeUnitLabel(tu)),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(field),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(label),
								_1: {ctor: '[]'}
							}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$text = function (tDefs) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'text',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$textChannelProperty, tDefs))
		});
};
var _gicentre$elm_vega$VegaLite$strokeJoinLabel = function (jn) {
	var _p123 = jn;
	switch (_p123.ctor) {
		case 'JMiter':
			return 'miter';
		case 'JRound':
			return 'round';
		default:
			return 'bevel';
	}
};
var _gicentre$elm_vega$VegaLite$strokeCapLabel = function (cap) {
	var _p124 = cap;
	switch (_p124.ctor) {
		case 'CButt':
			return 'butt';
		case 'CRound':
			return 'round';
		default:
			return 'square';
	}
};
var _gicentre$elm_vega$VegaLite$markProperty = function (mProp) {
	var _p125 = mProp;
	switch (_p125.ctor) {
		case 'MFilled':
			return {
				ctor: '_Tuple2',
				_0: 'filled',
				_1: _elm_lang$core$Json_Encode$bool(_p125._0)
			};
		case 'MClip':
			return {
				ctor: '_Tuple2',
				_0: 'clip',
				_1: _elm_lang$core$Json_Encode$bool(_p125._0)
			};
		case 'MColor':
			return {
				ctor: '_Tuple2',
				_0: 'color',
				_1: _elm_lang$core$Json_Encode$string(_p125._0)
			};
		case 'MCursor':
			return {
				ctor: '_Tuple2',
				_0: 'cursor',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$cursorLabel(_p125._0))
			};
		case 'MExtent':
			return {
				ctor: '_Tuple2',
				_0: 'extent',
				_1: _gicentre$elm_vega$VegaLite$extentSpec(_p125._0)
			};
		case 'MHRef':
			return {
				ctor: '_Tuple2',
				_0: 'href',
				_1: _elm_lang$core$Json_Encode$string(_p125._0)
			};
		case 'MFill':
			return {
				ctor: '_Tuple2',
				_0: 'fill',
				_1: _elm_lang$core$Json_Encode$string(_p125._0)
			};
		case 'MStroke':
			return {
				ctor: '_Tuple2',
				_0: 'stroke',
				_1: _elm_lang$core$Json_Encode$string(_p125._0)
			};
		case 'MStrokeCap':
			return {
				ctor: '_Tuple2',
				_0: 'strokeCap',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$strokeCapLabel(_p125._0))
			};
		case 'MStrokeJoin':
			return {
				ctor: '_Tuple2',
				_0: 'strokeJoin',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$strokeJoinLabel(_p125._0))
			};
		case 'MStrokeMiterLimit':
			return {
				ctor: '_Tuple2',
				_0: 'strokeMiterLimit',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'opacity',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MFillOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'fillOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MStrokeOpacity':
			return {
				ctor: '_Tuple2',
				_0: 'strokeOpacity',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MStrokeWidth':
			return {
				ctor: '_Tuple2',
				_0: 'strokeWidth',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MStrokeDash':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDash',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p125._0))
			};
		case 'MStrokeDashOffset':
			return {
				ctor: '_Tuple2',
				_0: 'strokeDashOffset',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MStyle':
			return {
				ctor: '_Tuple2',
				_0: 'style',
				_1: _elm_lang$core$Json_Encode$list(
					A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p125._0))
			};
		case 'MInterpolate':
			return {
				ctor: '_Tuple2',
				_0: 'interpolate',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$markInterpolationLabel(_p125._0))
			};
		case 'MTension':
			return {
				ctor: '_Tuple2',
				_0: 'tension',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MOrient':
			return {
				ctor: '_Tuple2',
				_0: 'orient',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$markOrientationLabel(_p125._0))
			};
		case 'MShape':
			return {
				ctor: '_Tuple2',
				_0: 'shape',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$symbolLabel(_p125._0))
			};
		case 'MSize':
			return {
				ctor: '_Tuple2',
				_0: 'size',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MAngle':
			return {
				ctor: '_Tuple2',
				_0: 'angle',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MAlign':
			return {
				ctor: '_Tuple2',
				_0: 'align',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$hAlignLabel(_p125._0))
			};
		case 'MBaseline':
			return {
				ctor: '_Tuple2',
				_0: 'baseline',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$vAlignLabel(_p125._0))
			};
		case 'MdX':
			return {
				ctor: '_Tuple2',
				_0: 'dx',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MdY':
			return {
				ctor: '_Tuple2',
				_0: 'dy',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MFont':
			return {
				ctor: '_Tuple2',
				_0: 'font',
				_1: _elm_lang$core$Json_Encode$string(_p125._0)
			};
		case 'MFontSize':
			return {
				ctor: '_Tuple2',
				_0: 'fontSize',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MFontStyle':
			return {
				ctor: '_Tuple2',
				_0: 'fontStyle',
				_1: _elm_lang$core$Json_Encode$string(_p125._0)
			};
		case 'MFontWeight':
			return {
				ctor: '_Tuple2',
				_0: 'fontWeight',
				_1: _gicentre$elm_vega$VegaLite$fontWeightSpec(_p125._0)
			};
		case 'MRadius':
			return {
				ctor: '_Tuple2',
				_0: 'radius',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MText':
			return {
				ctor: '_Tuple2',
				_0: 'text',
				_1: _elm_lang$core$Json_Encode$string(_p125._0)
			};
		case 'MTheta':
			return {
				ctor: '_Tuple2',
				_0: 'theta',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MBinSpacing':
			return {
				ctor: '_Tuple2',
				_0: 'binSpacing',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MContinuousBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'continuousBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MDiscreteBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'discreteBandSize',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MShortTimeLabels':
			return {
				ctor: '_Tuple2',
				_0: 'shortTimeLabels',
				_1: _elm_lang$core$Json_Encode$bool(_p125._0)
			};
		case 'MBandSize':
			return {
				ctor: '_Tuple2',
				_0: 'bandSize',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MThickness':
			return {
				ctor: '_Tuple2',
				_0: 'thickness',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MRule':
			return {
				ctor: '_Tuple2',
				_0: 'rule',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p125._0))
			};
		case 'MBorders':
			return {
				ctor: '_Tuple2',
				_0: 'borders',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p125._0))
			};
		case 'MTicks':
			return {
				ctor: '_Tuple2',
				_0: 'ticks',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p125._0))
			};
		case 'MPoint':
			return {
				ctor: '_Tuple2',
				_0: 'point',
				_1: _gicentre$elm_vega$VegaLite$pointMarkerSpec(_p125._0)
			};
		case 'MLine':
			return {
				ctor: '_Tuple2',
				_0: 'line',
				_1: _gicentre$elm_vega$VegaLite$lineMarkerSpec(_p125._0)
			};
		case 'MXOffset':
			return {
				ctor: '_Tuple2',
				_0: 'xOffset',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MX2Offset':
			return {
				ctor: '_Tuple2',
				_0: 'x2Offset',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		case 'MYOffset':
			return {
				ctor: '_Tuple2',
				_0: 'yOffset',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'y2Offset',
				_1: _elm_lang$core$Json_Encode$float(_p125._0)
			};
	}
};
var _gicentre$elm_vega$VegaLite$lineMarkerSpec = function (pm) {
	var _p126 = pm;
	if (_p126.ctor === 'LMNone') {
		return _elm_lang$core$Json_Encode$bool(false);
	} else {
		return _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p126._0));
	}
};
var _gicentre$elm_vega$VegaLite$pointMarkerSpec = function (pm) {
	var _p127 = pm;
	switch (_p127.ctor) {
		case 'PMTransparent':
			return _elm_lang$core$Json_Encode$string('transparent');
		case 'PMNone':
			return _elm_lang$core$Json_Encode$bool(false);
		default:
			return _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p127._0));
	}
};
var _gicentre$elm_vega$VegaLite$configProperty = function (configProp) {
	var _p128 = configProp;
	switch (_p128.ctor) {
		case 'Autosize':
			return {
				ctor: '_Tuple2',
				_0: 'autosize',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$autosizeProperty, _p128._0))
			};
		case 'Background':
			return {
				ctor: '_Tuple2',
				_0: 'background',
				_1: _elm_lang$core$Json_Encode$string(_p128._0)
			};
		case 'CountTitle':
			return {
				ctor: '_Tuple2',
				_0: 'countTitle',
				_1: _elm_lang$core$Json_Encode$string(_p128._0)
			};
		case 'FieldTitle':
			return {
				ctor: '_Tuple2',
				_0: 'fieldTitle',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$fieldTitleLabel(_p128._0))
			};
		case 'RemoveInvalid':
			return _p128._0 ? {
				ctor: '_Tuple2',
				_0: 'invalidValues',
				_1: _elm_lang$core$Json_Encode$string('filter')
			} : {ctor: '_Tuple2', _0: 'invalidValues', _1: _elm_lang$core$Json_Encode$null};
		case 'NumberFormat':
			return {
				ctor: '_Tuple2',
				_0: 'numberFormat',
				_1: _elm_lang$core$Json_Encode$string(_p128._0)
			};
		case 'Padding':
			return {
				ctor: '_Tuple2',
				_0: 'padding',
				_1: _gicentre$elm_vega$VegaLite$paddingSpec(_p128._0)
			};
		case 'TimeFormat':
			return {
				ctor: '_Tuple2',
				_0: 'timeFormat',
				_1: _elm_lang$core$Json_Encode$string(_p128._0)
			};
		case 'Axis':
			return {
				ctor: '_Tuple2',
				_0: 'axis',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfigProperty, _p128._0))
			};
		case 'AxisX':
			return {
				ctor: '_Tuple2',
				_0: 'axisX',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfigProperty, _p128._0))
			};
		case 'AxisY':
			return {
				ctor: '_Tuple2',
				_0: 'axisY',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfigProperty, _p128._0))
			};
		case 'AxisLeft':
			return {
				ctor: '_Tuple2',
				_0: 'axisLeft',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfigProperty, _p128._0))
			};
		case 'AxisRight':
			return {
				ctor: '_Tuple2',
				_0: 'axisRight',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfigProperty, _p128._0))
			};
		case 'AxisTop':
			return {
				ctor: '_Tuple2',
				_0: 'axisTop',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfigProperty, _p128._0))
			};
		case 'AxisBottom':
			return {
				ctor: '_Tuple2',
				_0: 'axisBottom',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfigProperty, _p128._0))
			};
		case 'AxisBand':
			return {
				ctor: '_Tuple2',
				_0: 'axisBand',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$axisConfigProperty, _p128._0))
			};
		case 'Legend':
			return {
				ctor: '_Tuple2',
				_0: 'legend',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$legendConfigProperty, _p128._0))
			};
		case 'MarkStyle':
			return {
				ctor: '_Tuple2',
				_0: 'mark',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'Projection':
			return {
				ctor: '_Tuple2',
				_0: 'projection',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$projectionProperty, _p128._0))
			};
		case 'AreaStyle':
			return {
				ctor: '_Tuple2',
				_0: 'area',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'BarStyle':
			return {
				ctor: '_Tuple2',
				_0: 'bar',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'CircleStyle':
			return {
				ctor: '_Tuple2',
				_0: 'circle',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'GeoshapeStyle':
			return {
				ctor: '_Tuple2',
				_0: 'geoshape',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'LineStyle':
			return {
				ctor: '_Tuple2',
				_0: 'line',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'PointStyle':
			return {
				ctor: '_Tuple2',
				_0: 'point',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'RectStyle':
			return {
				ctor: '_Tuple2',
				_0: 'rect',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'RuleStyle':
			return {
				ctor: '_Tuple2',
				_0: 'rule',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'SquareStyle':
			return {
				ctor: '_Tuple2',
				_0: 'square',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'TextStyle':
			return {
				ctor: '_Tuple2',
				_0: 'text',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'TickStyle':
			return {
				ctor: '_Tuple2',
				_0: 'tick',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
		case 'TitleStyle':
			return {
				ctor: '_Tuple2',
				_0: 'title',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$titleConfigSpec, _p128._0))
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
							_0: _p128._0,
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._1))
						},
						_1: {ctor: '[]'}
					})
			};
		case 'Scale':
			return {
				ctor: '_Tuple2',
				_0: 'scale',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$scaleConfigProperty, _p128._0))
			};
		case 'Stack':
			return _gicentre$elm_vega$VegaLite$stackProperty(_p128._0);
		case 'Range':
			return {
				ctor: '_Tuple2',
				_0: 'range',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$rangeConfigProperty, _p128._0))
			};
		case 'SelectionStyle':
			var selProp = function (_p129) {
				var _p130 = _p129;
				return {
					ctor: '_Tuple2',
					_0: _gicentre$elm_vega$VegaLite$selectionLabel(_p130._0),
					_1: _elm_lang$core$Json_Encode$object(
						A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$selectionProperty, _p130._1))
				};
			};
			return {
				ctor: '_Tuple2',
				_0: 'selection',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, selProp, _p128._0))
			};
		case 'View':
			return {
				ctor: '_Tuple2',
				_0: 'view',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$viewConfigProperty, _p128._0))
			};
		default:
			return {
				ctor: '_Tuple2',
				_0: 'trail',
				_1: _elm_lang$core$Json_Encode$object(
					A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, _p128._0))
			};
	}
};
var _gicentre$elm_vega$VegaLite$stroke = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'stroke',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, markProps))
		});
};
var _gicentre$elm_vega$VegaLite$size = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'size',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, markProps))
		});
};
var _gicentre$elm_vega$VegaLite$shape = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'shape',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, markProps))
		});
};
var _gicentre$elm_vega$VegaLite$select = F3(
	function (name, sType, options) {
		var selProps = {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$selectionLabel(sType))
			},
			_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$selectionProperty, options)
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
var _gicentre$elm_vega$VegaLite$row = function (fFields) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'row',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$facetChannelProperty, fFields))
		});
};
var _gicentre$elm_vega$VegaLite$resolution = function (res) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_gicentre$elm_vega$VegaLite$resolveProperty(res));
};
var _gicentre$elm_vega$VegaLite$order = function (oDefs) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'order',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$orderChannelProperty, oDefs))
		});
};
var _gicentre$elm_vega$VegaLite$opAs = F3(
	function (op, field, label) {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'op',
					_1: _elm_lang$core$Json_Encode$string(
						_gicentre$elm_vega$VegaLite$operationLabel(op))
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
var _gicentre$elm_vega$VegaLite$opacity = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'opacity',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, markProps))
		});
};
var _gicentre$elm_vega$VegaLite$lookupAs = F4(
	function (key1, _p131, key2, asName) {
		var _p132 = _p131;
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'lookupAs',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(key1),
						_1: {
							ctor: '::',
							_0: _p132._1,
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(key2),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$string(asName),
									_1: {ctor: '[]'}
								}
							}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$lookup = F4(
	function (key1, _p133, key2, fields) {
		var _p134 = _p133;
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'lookup',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$string(key1),
						_1: {
							ctor: '::',
							_0: _p134._1,
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(key2),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$list(
										A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, fields)),
									_1: {ctor: '[]'}
								}
							}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$hyperlink = function (hyperProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'href',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$hyperlinkChannelProperty, hyperProps))
		});
};
var _gicentre$elm_vega$VegaLite$geometry = F2(
	function (gType, properties) {
		return _elm_lang$core$Native_Utils.eq(
			properties,
			{ctor: '[]'}) ? _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('Feature')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'geometry',
						_1: _gicentre$elm_vega$VegaLite$geometryTypeSpec(gType)
					},
					_1: {ctor: '[]'}
				}
			}) : _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'type',
					_1: _elm_lang$core$Json_Encode$string('Feature')
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'geometry',
						_1: _gicentre$elm_vega$VegaLite$geometryTypeSpec(gType)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'properties',
							_1: _elm_lang$core$Json_Encode$object(
								A2(
									_elm_lang$core$List$map,
									function (_p135) {
										var _p136 = _p135;
										return {
											ctor: '_Tuple2',
											_0: _p136._0,
											_1: _gicentre$elm_vega$VegaLite$dataValueSpec(_p136._1)
										};
									},
									properties))
						},
						_1: {ctor: '[]'}
					}
				}
			});
	});
var _gicentre$elm_vega$VegaLite$geometryCollection = function (geoms) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string('GeometryCollection')
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'geometries',
					_1: _elm_lang$core$Json_Encode$list(geoms)
				},
				_1: {ctor: '[]'}
			}
		});
};
var _gicentre$elm_vega$VegaLite$geoFeatureCollection = function (geoms) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'type',
				_1: _elm_lang$core$Json_Encode$string('FeatureCollection')
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'features',
					_1: _elm_lang$core$Json_Encode$list(geoms)
				},
				_1: {ctor: '[]'}
			}
		});
};
var _gicentre$elm_vega$VegaLite$flattenAs = F2(
	function (fields, names) {
		return F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'flattenAs',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, fields)),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$list(
								A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, names)),
							_1: {ctor: '[]'}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$flatten = function (fs) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'flatten',
			_1: _elm_lang$core$Json_Encode$list(
				A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, fs))
		});
};
var _gicentre$elm_vega$VegaLite$filter = function (f) {
	var _p137 = f;
	switch (_p137.ctor) {
		case 'FExpr':
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _elm_lang$core$Json_Encode$string(_p137._0)
				});
		case 'FCompose':
			return F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})(
				{
					ctor: '_Tuple2',
					_0: 'filter',
					_1: _gicentre$elm_vega$VegaLite$booleanOpSpec(_p137._0)
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
								_1: _elm_lang$core$Json_Encode$string(_p137._0)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'equal',
									_1: _gicentre$elm_vega$VegaLite$dataValueSpec(_p137._1)
								},
								_1: {ctor: '[]'}
							}
						})
				});
		case 'FLessThan':
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
								_1: _elm_lang$core$Json_Encode$string(_p137._0)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'lt',
									_1: _gicentre$elm_vega$VegaLite$dataValueSpec(_p137._1)
								},
								_1: {ctor: '[]'}
							}
						})
				});
		case 'FLessThanEq':
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
								_1: _elm_lang$core$Json_Encode$string(_p137._0)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'lte',
									_1: _gicentre$elm_vega$VegaLite$dataValueSpec(_p137._1)
								},
								_1: {ctor: '[]'}
							}
						})
				});
		case 'FGreaterThan':
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
								_1: _elm_lang$core$Json_Encode$string(_p137._0)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'gt',
									_1: _gicentre$elm_vega$VegaLite$dataValueSpec(_p137._1)
								},
								_1: {ctor: '[]'}
							}
						})
				});
		case 'FGreaterThanEq':
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
								_1: _elm_lang$core$Json_Encode$string(_p137._0)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'gte',
									_1: _gicentre$elm_vega$VegaLite$dataValueSpec(_p137._1)
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
								_1: _elm_lang$core$Json_Encode$string(_p137._0)
							},
							_1: {ctor: '[]'}
						})
				});
		case 'FRange':
			var values = function () {
				var _p138 = _p137._1;
				if (_p138.ctor === 'NumberRange') {
					return _elm_lang$core$Json_Encode$list(
						{
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$float(_p138._0),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$float(_p138._1),
								_1: {ctor: '[]'}
							}
						});
				} else {
					if (_p138._0.ctor === '[]') {
						if (_p138._1.ctor === '[]') {
							return _elm_lang$core$Json_Encode$list(
								{
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$null,
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$null,
										_1: {ctor: '[]'}
									}
								});
						} else {
							return _elm_lang$core$Json_Encode$list(
								{
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$null,
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$object(
											A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, _p138._1)),
										_1: {ctor: '[]'}
									}
								});
						}
					} else {
						if (_p138._1.ctor === '[]') {
							return _elm_lang$core$Json_Encode$list(
								{
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, _p138._0)),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$null,
										_1: {ctor: '[]'}
									}
								});
						} else {
							return _elm_lang$core$Json_Encode$list(
								{
									ctor: '::',
									_0: _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, _p138._0)),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Json_Encode$object(
											A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, _p138._1)),
										_1: {ctor: '[]'}
									}
								});
						}
					}
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
								_1: _elm_lang$core$Json_Encode$string(_p137._0)
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
				var _p139 = _p137._1;
				switch (_p139.ctor) {
					case 'Numbers':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$float, _p139._0));
					case 'DateTimes':
						return _elm_lang$core$Json_Encode$list(
							A2(
								_elm_lang$core$List$map,
								function (dt) {
									return _elm_lang$core$Json_Encode$object(
										A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, dt));
								},
								_p139._0));
					case 'Strings':
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, _p139._0));
					default:
						return _elm_lang$core$Json_Encode$list(
							A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$bool, _p139._0));
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
								_1: _elm_lang$core$Json_Encode$string(_p137._0)
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
var _gicentre$elm_vega$VegaLite$fill = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'fill',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, markProps))
		});
};
var _gicentre$elm_vega$VegaLite$detail = function (detailProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'detail',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$detailChannelProperty, detailProps))
		});
};
var _gicentre$elm_vega$VegaLite$dataRow = function (row) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_elm_lang$core$Json_Encode$object(
			A2(
				_elm_lang$core$List$map,
				function (_p140) {
					var _p141 = _p140;
					return {
						ctor: '_Tuple2',
						_0: _p141._0,
						_1: _gicentre$elm_vega$VegaLite$dataValueSpec(_p141._1)
					};
				},
				row)));
};
var _gicentre$elm_vega$VegaLite$dataColumn = F2(
	function (colName, data) {
		var _p142 = data;
		switch (_p142.ctor) {
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
						_p142._0));
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
						_p142._0));
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
									A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$dateTimeProperty, dts))
							};
						},
						_p142._0));
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
						_p142._0));
		}
	});
var _gicentre$elm_vega$VegaLite$configuration = function (cfg) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_gicentre$elm_vega$VegaLite$configProperty(cfg));
};
var _gicentre$elm_vega$VegaLite$combineSpecs = function (specs) {
	return _elm_lang$core$Json_Encode$object(specs);
};
var _gicentre$elm_vega$VegaLite$column = function (fFields) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'column',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$facetChannelProperty, fFields))
		});
};
var _gicentre$elm_vega$VegaLite$color = function (markProps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		{
			ctor: '_Tuple2',
			_0: 'color',
			_1: _elm_lang$core$Json_Encode$object(
				A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$markChannelProperty, markProps))
		});
};
var _gicentre$elm_vega$VegaLite$calculateAs = F2(
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
var _gicentre$elm_vega$VegaLite$binAs = F3(
	function (bProps, field, label) {
		return _elm_lang$core$Native_Utils.eq(
			bProps,
			{ctor: '[]'}) ? F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'bin',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$bool(true),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(field),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(label),
								_1: {ctor: '[]'}
							}
						}
					})
			}) : F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})(
			{
				ctor: '_Tuple2',
				_0: 'bin',
				_1: _elm_lang$core$Json_Encode$list(
					{
						ctor: '::',
						_0: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$binProperty, bProps)),
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Json_Encode$string(field),
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Json_Encode$string(label),
								_1: {ctor: '[]'}
							}
						}
					})
			});
	});
var _gicentre$elm_vega$VegaLite$asSpec = function (specs) {
	return _elm_lang$core$Json_Encode$object(
		A2(
			_elm_lang$core$List$map,
			function (_p143) {
				var _p144 = _p143;
				return {
					ctor: '_Tuple2',
					_0: _gicentre$elm_vega$VegaLite$vlPropertyLabel(_p144._0),
					_1: _p144._1
				};
			},
			specs));
};
var _gicentre$elm_vega$VegaLite$aggregate = F2(
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
var _gicentre$elm_vega$VegaLite$Row = {ctor: 'Row'};
var _gicentre$elm_vega$VegaLite$Column = {ctor: 'Column'};
var _gicentre$elm_vega$VegaLite$AResize = {ctor: 'AResize'};
var _gicentre$elm_vega$VegaLite$APadding = {ctor: 'APadding'};
var _gicentre$elm_vega$VegaLite$APad = {ctor: 'APad'};
var _gicentre$elm_vega$VegaLite$ANone = {ctor: 'ANone'};
var _gicentre$elm_vega$VegaLite$AFit = {ctor: 'AFit'};
var _gicentre$elm_vega$VegaLite$AContent = {ctor: 'AContent'};
var _gicentre$elm_vega$VegaLite$TitleY = function (a) {
	return {ctor: 'TitleY', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleY = _gicentre$elm_vega$VegaLite$TitleY;
var _gicentre$elm_vega$VegaLite$TitleX = function (a) {
	return {ctor: 'TitleX', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleX = _gicentre$elm_vega$VegaLite$TitleX;
var _gicentre$elm_vega$VegaLite$TitlePadding = function (a) {
	return {ctor: 'TitlePadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitlePadding = _gicentre$elm_vega$VegaLite$TitlePadding;
var _gicentre$elm_vega$VegaLite$TitleMaxLength = function (a) {
	return {ctor: 'TitleMaxLength', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleMaxLength = _gicentre$elm_vega$VegaLite$TitleMaxLength;
var _gicentre$elm_vega$VegaLite$TitleLimit = function (a) {
	return {ctor: 'TitleLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleLimit = _gicentre$elm_vega$VegaLite$TitleLimit;
var _gicentre$elm_vega$VegaLite$TitleFontSize = function (a) {
	return {ctor: 'TitleFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleFontSize = _gicentre$elm_vega$VegaLite$TitleFontSize;
var _gicentre$elm_vega$VegaLite$TitleFontWeight = function (a) {
	return {ctor: 'TitleFontWeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleFontWeight = _gicentre$elm_vega$VegaLite$TitleFontWeight;
var _gicentre$elm_vega$VegaLite$TitleFont = function (a) {
	return {ctor: 'TitleFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleFont = _gicentre$elm_vega$VegaLite$TitleFont;
var _gicentre$elm_vega$VegaLite$TitleColor = function (a) {
	return {ctor: 'TitleColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleColor = _gicentre$elm_vega$VegaLite$TitleColor;
var _gicentre$elm_vega$VegaLite$TitleBaseline = function (a) {
	return {ctor: 'TitleBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleBaseline = _gicentre$elm_vega$VegaLite$TitleBaseline;
var _gicentre$elm_vega$VegaLite$TitleAngle = function (a) {
	return {ctor: 'TitleAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleAngle = _gicentre$elm_vega$VegaLite$TitleAngle;
var _gicentre$elm_vega$VegaLite$TitleAlign = function (a) {
	return {ctor: 'TitleAlign', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTitleAlign = _gicentre$elm_vega$VegaLite$TitleAlign;
var _gicentre$elm_vega$VegaLite$TickWidth = function (a) {
	return {ctor: 'TickWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTickWidth = _gicentre$elm_vega$VegaLite$TickWidth;
var _gicentre$elm_vega$VegaLite$TickSize = function (a) {
	return {ctor: 'TickSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTickSize = _gicentre$elm_vega$VegaLite$TickSize;
var _gicentre$elm_vega$VegaLite$TickRound = function (a) {
	return {ctor: 'TickRound', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTickRound = _gicentre$elm_vega$VegaLite$TickRound;
var _gicentre$elm_vega$VegaLite$TickColor = function (a) {
	return {ctor: 'TickColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTickColor = _gicentre$elm_vega$VegaLite$TickColor;
var _gicentre$elm_vega$VegaLite$Ticks = function (a) {
	return {ctor: 'Ticks', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoTicks = _gicentre$elm_vega$VegaLite$Ticks;
var _gicentre$elm_vega$VegaLite$ShortTimeLabels = function (a) {
	return {ctor: 'ShortTimeLabels', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoShortTimeLabels = _gicentre$elm_vega$VegaLite$ShortTimeLabels;
var _gicentre$elm_vega$VegaLite$LabelPadding = function (a) {
	return {ctor: 'LabelPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoLabelPadding = _gicentre$elm_vega$VegaLite$LabelPadding;
var _gicentre$elm_vega$VegaLite$LabelOverlap = function (a) {
	return {ctor: 'LabelOverlap', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoLabelOverlap = _gicentre$elm_vega$VegaLite$LabelOverlap;
var _gicentre$elm_vega$VegaLite$LabelLimit = function (a) {
	return {ctor: 'LabelLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoLabelLimit = _gicentre$elm_vega$VegaLite$LabelLimit;
var _gicentre$elm_vega$VegaLite$LabelFontSize = function (a) {
	return {ctor: 'LabelFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoLabelFontSize = _gicentre$elm_vega$VegaLite$LabelFontSize;
var _gicentre$elm_vega$VegaLite$LabelFont = function (a) {
	return {ctor: 'LabelFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoLabelFont = _gicentre$elm_vega$VegaLite$LabelFont;
var _gicentre$elm_vega$VegaLite$LabelColor = function (a) {
	return {ctor: 'LabelColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoLabelColor = _gicentre$elm_vega$VegaLite$LabelColor;
var _gicentre$elm_vega$VegaLite$LabelAngle = function (a) {
	return {ctor: 'LabelAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoLabelAngle = _gicentre$elm_vega$VegaLite$LabelAngle;
var _gicentre$elm_vega$VegaLite$Labels = function (a) {
	return {ctor: 'Labels', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoLabels = _gicentre$elm_vega$VegaLite$Labels;
var _gicentre$elm_vega$VegaLite$GridWidth = function (a) {
	return {ctor: 'GridWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoGridWidth = _gicentre$elm_vega$VegaLite$GridWidth;
var _gicentre$elm_vega$VegaLite$GridOpacity = function (a) {
	return {ctor: 'GridOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoGridOpacity = _gicentre$elm_vega$VegaLite$GridOpacity;
var _gicentre$elm_vega$VegaLite$GridDash = function (a) {
	return {ctor: 'GridDash', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoGridDash = _gicentre$elm_vega$VegaLite$GridDash;
var _gicentre$elm_vega$VegaLite$GridColor = function (a) {
	return {ctor: 'GridColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoGridColor = _gicentre$elm_vega$VegaLite$GridColor;
var _gicentre$elm_vega$VegaLite$Grid = function (a) {
	return {ctor: 'Grid', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoGrid = _gicentre$elm_vega$VegaLite$Grid;
var _gicentre$elm_vega$VegaLite$MinExtent = function (a) {
	return {ctor: 'MinExtent', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoMinExtent = _gicentre$elm_vega$VegaLite$MinExtent;
var _gicentre$elm_vega$VegaLite$MaxExtent = function (a) {
	return {ctor: 'MaxExtent', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoMaxExtent = _gicentre$elm_vega$VegaLite$MaxExtent;
var _gicentre$elm_vega$VegaLite$DomainWidth = function (a) {
	return {ctor: 'DomainWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoDomainWidth = _gicentre$elm_vega$VegaLite$DomainWidth;
var _gicentre$elm_vega$VegaLite$DomainColor = function (a) {
	return {ctor: 'DomainColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoDomainColor = _gicentre$elm_vega$VegaLite$DomainColor;
var _gicentre$elm_vega$VegaLite$Domain = function (a) {
	return {ctor: 'Domain', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoDomain = _gicentre$elm_vega$VegaLite$Domain;
var _gicentre$elm_vega$VegaLite$BandPosition = function (a) {
	return {ctor: 'BandPosition', _0: a};
};
var _gicentre$elm_vega$VegaLite$axcoBandPosition = _gicentre$elm_vega$VegaLite$BandPosition;
var _gicentre$elm_vega$VegaLite$AxZIndex = function (a) {
	return {ctor: 'AxZIndex', _0: a};
};
var _gicentre$elm_vega$VegaLite$axZIndex = _gicentre$elm_vega$VegaLite$AxZIndex;
var _gicentre$elm_vega$VegaLite$AxDates = function (a) {
	return {ctor: 'AxDates', _0: a};
};
var _gicentre$elm_vega$VegaLite$axDates = _gicentre$elm_vega$VegaLite$AxDates;
var _gicentre$elm_vega$VegaLite$AxValues = function (a) {
	return {ctor: 'AxValues', _0: a};
};
var _gicentre$elm_vega$VegaLite$axValues = _gicentre$elm_vega$VegaLite$AxValues;
var _gicentre$elm_vega$VegaLite$AxTitlePadding = function (a) {
	return {ctor: 'AxTitlePadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$axTitlePadding = _gicentre$elm_vega$VegaLite$AxTitlePadding;
var _gicentre$elm_vega$VegaLite$AxTitleMaxLength = function (a) {
	return {ctor: 'AxTitleMaxLength', _0: a};
};
var _gicentre$elm_vega$VegaLite$axTitleMaxLength = _gicentre$elm_vega$VegaLite$AxTitleMaxLength;
var _gicentre$elm_vega$VegaLite$AxTitleAngle = function (a) {
	return {ctor: 'AxTitleAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$axTitleAngle = _gicentre$elm_vega$VegaLite$AxTitleAngle;
var _gicentre$elm_vega$VegaLite$AxTitleAlign = function (a) {
	return {ctor: 'AxTitleAlign', _0: a};
};
var _gicentre$elm_vega$VegaLite$axTitleAlign = _gicentre$elm_vega$VegaLite$AxTitleAlign;
var _gicentre$elm_vega$VegaLite$AxTitle = function (a) {
	return {ctor: 'AxTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$axTitle = _gicentre$elm_vega$VegaLite$AxTitle;
var _gicentre$elm_vega$VegaLite$AxTickSize = function (a) {
	return {ctor: 'AxTickSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$axTickSize = _gicentre$elm_vega$VegaLite$AxTickSize;
var _gicentre$elm_vega$VegaLite$AxTickCount = function (a) {
	return {ctor: 'AxTickCount', _0: a};
};
var _gicentre$elm_vega$VegaLite$axTickCount = _gicentre$elm_vega$VegaLite$AxTickCount;
var _gicentre$elm_vega$VegaLite$AxTicks = function (a) {
	return {ctor: 'AxTicks', _0: a};
};
var _gicentre$elm_vega$VegaLite$axTicks = _gicentre$elm_vega$VegaLite$AxTicks;
var _gicentre$elm_vega$VegaLite$AxPosition = function (a) {
	return {ctor: 'AxPosition', _0: a};
};
var _gicentre$elm_vega$VegaLite$axPosition = _gicentre$elm_vega$VegaLite$AxPosition;
var _gicentre$elm_vega$VegaLite$AxOrient = function (a) {
	return {ctor: 'AxOrient', _0: a};
};
var _gicentre$elm_vega$VegaLite$axOrient = _gicentre$elm_vega$VegaLite$AxOrient;
var _gicentre$elm_vega$VegaLite$AxOffset = function (a) {
	return {ctor: 'AxOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$axOffset = _gicentre$elm_vega$VegaLite$AxOffset;
var _gicentre$elm_vega$VegaLite$AxMinExtent = function (a) {
	return {ctor: 'AxMinExtent', _0: a};
};
var _gicentre$elm_vega$VegaLite$axMinExtent = _gicentre$elm_vega$VegaLite$AxMinExtent;
var _gicentre$elm_vega$VegaLite$AxMaxExtent = function (a) {
	return {ctor: 'AxMaxExtent', _0: a};
};
var _gicentre$elm_vega$VegaLite$axMaxExtent = _gicentre$elm_vega$VegaLite$AxMaxExtent;
var _gicentre$elm_vega$VegaLite$AxLabels = function (a) {
	return {ctor: 'AxLabels', _0: a};
};
var _gicentre$elm_vega$VegaLite$axLabels = _gicentre$elm_vega$VegaLite$AxLabels;
var _gicentre$elm_vega$VegaLite$AxLabelPadding = function (a) {
	return {ctor: 'AxLabelPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$axLabelPadding = _gicentre$elm_vega$VegaLite$AxLabelPadding;
var _gicentre$elm_vega$VegaLite$AxLabelOverlap = function (a) {
	return {ctor: 'AxLabelOverlap', _0: a};
};
var _gicentre$elm_vega$VegaLite$axLabelOverlap = _gicentre$elm_vega$VegaLite$AxLabelOverlap;
var _gicentre$elm_vega$VegaLite$AxLabelAngle = function (a) {
	return {ctor: 'AxLabelAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$axLabelAngle = _gicentre$elm_vega$VegaLite$AxLabelAngle;
var _gicentre$elm_vega$VegaLite$AxGrid = function (a) {
	return {ctor: 'AxGrid', _0: a};
};
var _gicentre$elm_vega$VegaLite$axGrid = _gicentre$elm_vega$VegaLite$AxGrid;
var _gicentre$elm_vega$VegaLite$AxFormat = function (a) {
	return {ctor: 'AxFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$axFormat = _gicentre$elm_vega$VegaLite$AxFormat;
var _gicentre$elm_vega$VegaLite$AxDomain = function (a) {
	return {ctor: 'AxDomain', _0: a};
};
var _gicentre$elm_vega$VegaLite$axDomain = _gicentre$elm_vega$VegaLite$AxDomain;
var _gicentre$elm_vega$VegaLite$IColor = F2(
	function (a, b) {
		return {ctor: 'IColor', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iColor = function (f) {
	return _gicentre$elm_vega$VegaLite$IColor(f);
};
var _gicentre$elm_vega$VegaLite$ITel = F2(
	function (a, b) {
		return {ctor: 'ITel', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iTel = function (f) {
	return _gicentre$elm_vega$VegaLite$ITel(f);
};
var _gicentre$elm_vega$VegaLite$IDateTimeLocal = F2(
	function (a, b) {
		return {ctor: 'IDateTimeLocal', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iDateTimeLocal = function (f) {
	return _gicentre$elm_vega$VegaLite$IDateTimeLocal(f);
};
var _gicentre$elm_vega$VegaLite$IWeek = F2(
	function (a, b) {
		return {ctor: 'IWeek', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iWeek = function (f) {
	return _gicentre$elm_vega$VegaLite$IWeek(f);
};
var _gicentre$elm_vega$VegaLite$IMonth = F2(
	function (a, b) {
		return {ctor: 'IMonth', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iMonth = function (f) {
	return _gicentre$elm_vega$VegaLite$IMonth(f);
};
var _gicentre$elm_vega$VegaLite$ITime = F2(
	function (a, b) {
		return {ctor: 'ITime', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iTime = function (f) {
	return _gicentre$elm_vega$VegaLite$ITime(f);
};
var _gicentre$elm_vega$VegaLite$IDate = F2(
	function (a, b) {
		return {ctor: 'IDate', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iDate = function (f) {
	return _gicentre$elm_vega$VegaLite$IDate(f);
};
var _gicentre$elm_vega$VegaLite$INumber = F2(
	function (a, b) {
		return {ctor: 'INumber', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iNumber = function (f) {
	return _gicentre$elm_vega$VegaLite$INumber(f);
};
var _gicentre$elm_vega$VegaLite$IText = F2(
	function (a, b) {
		return {ctor: 'IText', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iText = function (f) {
	return _gicentre$elm_vega$VegaLite$IText(f);
};
var _gicentre$elm_vega$VegaLite$ISelect = F2(
	function (a, b) {
		return {ctor: 'ISelect', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iSelect = function (f) {
	return _gicentre$elm_vega$VegaLite$ISelect(f);
};
var _gicentre$elm_vega$VegaLite$IRadio = F2(
	function (a, b) {
		return {ctor: 'IRadio', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iRadio = function (f) {
	return _gicentre$elm_vega$VegaLite$IRadio(f);
};
var _gicentre$elm_vega$VegaLite$ICheckbox = F2(
	function (a, b) {
		return {ctor: 'ICheckbox', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iCheckbox = function (f) {
	return _gicentre$elm_vega$VegaLite$ICheckbox(f);
};
var _gicentre$elm_vega$VegaLite$IRange = F2(
	function (a, b) {
		return {ctor: 'IRange', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$iRange = function (f) {
	return _gicentre$elm_vega$VegaLite$IRange(f);
};
var _gicentre$elm_vega$VegaLite$Steps = function (a) {
	return {ctor: 'Steps', _0: a};
};
var _gicentre$elm_vega$VegaLite$biSteps = _gicentre$elm_vega$VegaLite$Steps;
var _gicentre$elm_vega$VegaLite$Step = function (a) {
	return {ctor: 'Step', _0: a};
};
var _gicentre$elm_vega$VegaLite$biStep = _gicentre$elm_vega$VegaLite$Step;
var _gicentre$elm_vega$VegaLite$Nice = function (a) {
	return {ctor: 'Nice', _0: a};
};
var _gicentre$elm_vega$VegaLite$biNice = _gicentre$elm_vega$VegaLite$Nice;
var _gicentre$elm_vega$VegaLite$MinStep = function (a) {
	return {ctor: 'MinStep', _0: a};
};
var _gicentre$elm_vega$VegaLite$biMinStep = _gicentre$elm_vega$VegaLite$MinStep;
var _gicentre$elm_vega$VegaLite$MaxBins = function (a) {
	return {ctor: 'MaxBins', _0: a};
};
var _gicentre$elm_vega$VegaLite$biMaxBins = _gicentre$elm_vega$VegaLite$MaxBins;
var _gicentre$elm_vega$VegaLite$Extent = F2(
	function (a, b) {
		return {ctor: 'Extent', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$biExtent = _gicentre$elm_vega$VegaLite$Extent;
var _gicentre$elm_vega$VegaLite$Divides = function (a) {
	return {ctor: 'Divides', _0: a};
};
var _gicentre$elm_vega$VegaLite$biDivide = _gicentre$elm_vega$VegaLite$Divides;
var _gicentre$elm_vega$VegaLite$Base = function (a) {
	return {ctor: 'Base', _0: a};
};
var _gicentre$elm_vega$VegaLite$biBase = _gicentre$elm_vega$VegaLite$Base;
var _gicentre$elm_vega$VegaLite$Not = function (a) {
	return {ctor: 'Not', _0: a};
};
var _gicentre$elm_vega$VegaLite$not = _gicentre$elm_vega$VegaLite$Not;
var _gicentre$elm_vega$VegaLite$Or = F2(
	function (a, b) {
		return {ctor: 'Or', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$or = F2(
	function (op1, op2) {
		return A2(_gicentre$elm_vega$VegaLite$Or, op1, op2);
	});
var _gicentre$elm_vega$VegaLite$And = F2(
	function (a, b) {
		return {ctor: 'And', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$and = F2(
	function (op1, op2) {
		return A2(_gicentre$elm_vega$VegaLite$And, op1, op2);
	});
var _gicentre$elm_vega$VegaLite$SelectionName = function (a) {
	return {ctor: 'SelectionName', _0: a};
};
var _gicentre$elm_vega$VegaLite$selectionName = _gicentre$elm_vega$VegaLite$SelectionName;
var _gicentre$elm_vega$VegaLite$Selection = function (a) {
	return {ctor: 'Selection', _0: a};
};
var _gicentre$elm_vega$VegaLite$selected = _gicentre$elm_vega$VegaLite$Selection;
var _gicentre$elm_vega$VegaLite$Expr = function (a) {
	return {ctor: 'Expr', _0: a};
};
var _gicentre$elm_vega$VegaLite$expr = _gicentre$elm_vega$VegaLite$Expr;
var _gicentre$elm_vega$VegaLite$Flush = {ctor: 'Flush'};
var _gicentre$elm_vega$VegaLite$Full = {ctor: 'Full'};
var _gicentre$elm_vega$VegaLite$ChSize = {ctor: 'ChSize'};
var _gicentre$elm_vega$VegaLite$ChShape = {ctor: 'ChShape'};
var _gicentre$elm_vega$VegaLite$ChOpacity = {ctor: 'ChOpacity'};
var _gicentre$elm_vega$VegaLite$ChColor = {ctor: 'ChColor'};
var _gicentre$elm_vega$VegaLite$ChY2 = {ctor: 'ChY2'};
var _gicentre$elm_vega$VegaLite$ChX2 = {ctor: 'ChX2'};
var _gicentre$elm_vega$VegaLite$ChY = {ctor: 'ChY'};
var _gicentre$elm_vega$VegaLite$ChX = {ctor: 'ChX'};
var _gicentre$elm_vega$VegaLite$Rgb = function (a) {
	return {ctor: 'Rgb', _0: a};
};
var _gicentre$elm_vega$VegaLite$rgb = _gicentre$elm_vega$VegaLite$Rgb;
var _gicentre$elm_vega$VegaLite$Lab = {ctor: 'Lab'};
var _gicentre$elm_vega$VegaLite$HslLong = {ctor: 'HslLong'};
var _gicentre$elm_vega$VegaLite$Hsl = {ctor: 'Hsl'};
var _gicentre$elm_vega$VegaLite$HclLong = {ctor: 'HclLong'};
var _gicentre$elm_vega$VegaLite$Hcl = {ctor: 'Hcl'};
var _gicentre$elm_vega$VegaLite$CubeHelixLong = function (a) {
	return {ctor: 'CubeHelixLong', _0: a};
};
var _gicentre$elm_vega$VegaLite$cubeHelixLong = _gicentre$elm_vega$VegaLite$CubeHelixLong;
var _gicentre$elm_vega$VegaLite$CubeHelix = function (a) {
	return {ctor: 'CubeHelix', _0: a};
};
var _gicentre$elm_vega$VegaLite$cubeHelix = _gicentre$elm_vega$VegaLite$CubeHelix;
var _gicentre$elm_vega$VegaLite$LTRB = F4(
	function (a, b, c, d) {
		return {ctor: 'LTRB', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$VegaLite$clipRect = F4(
	function (l, t, r, b) {
		return A4(_gicentre$elm_vega$VegaLite$LTRB, l, t, r, b);
	});
var _gicentre$elm_vega$VegaLite$NoClip = {ctor: 'NoClip'};
var _gicentre$elm_vega$VegaLite$CAAll = {ctor: 'CAAll'};
var _gicentre$elm_vega$VegaLite$CAEach = {ctor: 'CAEach'};
var _gicentre$elm_vega$VegaLite$CANone = {ctor: 'CANone'};
var _gicentre$elm_vega$VegaLite$View = function (a) {
	return {ctor: 'View', _0: a};
};
var _gicentre$elm_vega$VegaLite$coView = _gicentre$elm_vega$VegaLite$View;
var _gicentre$elm_vega$VegaLite$TrailStyle = function (a) {
	return {ctor: 'TrailStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coTrail = function (mps) {
	return F2(
		function (x, y) {
			return {ctor: '::', _0: x, _1: y};
		})(
		_gicentre$elm_vega$VegaLite$configProperty(
			_gicentre$elm_vega$VegaLite$TrailStyle(mps)));
};
var _gicentre$elm_vega$VegaLite$TimeFormat = function (a) {
	return {ctor: 'TimeFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$coTimeFormat = _gicentre$elm_vega$VegaLite$TimeFormat;
var _gicentre$elm_vega$VegaLite$TitleStyle = function (a) {
	return {ctor: 'TitleStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coTitle = _gicentre$elm_vega$VegaLite$TitleStyle;
var _gicentre$elm_vega$VegaLite$TickStyle = function (a) {
	return {ctor: 'TickStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coTick = _gicentre$elm_vega$VegaLite$TickStyle;
var _gicentre$elm_vega$VegaLite$TextStyle = function (a) {
	return {ctor: 'TextStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coText = _gicentre$elm_vega$VegaLite$TextStyle;
var _gicentre$elm_vega$VegaLite$Stack = function (a) {
	return {ctor: 'Stack', _0: a};
};
var _gicentre$elm_vega$VegaLite$coStack = _gicentre$elm_vega$VegaLite$Stack;
var _gicentre$elm_vega$VegaLite$SquareStyle = function (a) {
	return {ctor: 'SquareStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coSquare = _gicentre$elm_vega$VegaLite$SquareStyle;
var _gicentre$elm_vega$VegaLite$SelectionStyle = function (a) {
	return {ctor: 'SelectionStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coSelection = _gicentre$elm_vega$VegaLite$SelectionStyle;
var _gicentre$elm_vega$VegaLite$Scale = function (a) {
	return {ctor: 'Scale', _0: a};
};
var _gicentre$elm_vega$VegaLite$coScale = _gicentre$elm_vega$VegaLite$Scale;
var _gicentre$elm_vega$VegaLite$RuleStyle = function (a) {
	return {ctor: 'RuleStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coRule = _gicentre$elm_vega$VegaLite$RuleStyle;
var _gicentre$elm_vega$VegaLite$RemoveInvalid = function (a) {
	return {ctor: 'RemoveInvalid', _0: a};
};
var _gicentre$elm_vega$VegaLite$coRemoveInvalid = _gicentre$elm_vega$VegaLite$RemoveInvalid;
var _gicentre$elm_vega$VegaLite$RectStyle = function (a) {
	return {ctor: 'RectStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coRect = _gicentre$elm_vega$VegaLite$RectStyle;
var _gicentre$elm_vega$VegaLite$Range = function (a) {
	return {ctor: 'Range', _0: a};
};
var _gicentre$elm_vega$VegaLite$coRange = _gicentre$elm_vega$VegaLite$Range;
var _gicentre$elm_vega$VegaLite$Projection = function (a) {
	return {ctor: 'Projection', _0: a};
};
var _gicentre$elm_vega$VegaLite$coProjection = _gicentre$elm_vega$VegaLite$Projection;
var _gicentre$elm_vega$VegaLite$PointStyle = function (a) {
	return {ctor: 'PointStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coPoint = _gicentre$elm_vega$VegaLite$PointStyle;
var _gicentre$elm_vega$VegaLite$Padding = function (a) {
	return {ctor: 'Padding', _0: a};
};
var _gicentre$elm_vega$VegaLite$coPadding = _gicentre$elm_vega$VegaLite$Padding;
var _gicentre$elm_vega$VegaLite$NumberFormat = function (a) {
	return {ctor: 'NumberFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$coNumberFormat = _gicentre$elm_vega$VegaLite$NumberFormat;
var _gicentre$elm_vega$VegaLite$NamedStyle = F2(
	function (a, b) {
		return {ctor: 'NamedStyle', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$coNamedStyle = _gicentre$elm_vega$VegaLite$NamedStyle;
var _gicentre$elm_vega$VegaLite$MarkStyle = function (a) {
	return {ctor: 'MarkStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coMark = _gicentre$elm_vega$VegaLite$MarkStyle;
var _gicentre$elm_vega$VegaLite$LineStyle = function (a) {
	return {ctor: 'LineStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coLine = _gicentre$elm_vega$VegaLite$LineStyle;
var _gicentre$elm_vega$VegaLite$Legend = function (a) {
	return {ctor: 'Legend', _0: a};
};
var _gicentre$elm_vega$VegaLite$coLegend = _gicentre$elm_vega$VegaLite$Legend;
var _gicentre$elm_vega$VegaLite$GeoshapeStyle = function (a) {
	return {ctor: 'GeoshapeStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coGeoshape = _gicentre$elm_vega$VegaLite$GeoshapeStyle;
var _gicentre$elm_vega$VegaLite$FieldTitle = function (a) {
	return {ctor: 'FieldTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coFieldTitle = _gicentre$elm_vega$VegaLite$FieldTitle;
var _gicentre$elm_vega$VegaLite$CountTitle = function (a) {
	return {ctor: 'CountTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coCountTitle = _gicentre$elm_vega$VegaLite$CountTitle;
var _gicentre$elm_vega$VegaLite$CircleStyle = function (a) {
	return {ctor: 'CircleStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coCircle = _gicentre$elm_vega$VegaLite$CircleStyle;
var _gicentre$elm_vega$VegaLite$BarStyle = function (a) {
	return {ctor: 'BarStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coBar = _gicentre$elm_vega$VegaLite$BarStyle;
var _gicentre$elm_vega$VegaLite$Background = function (a) {
	return {ctor: 'Background', _0: a};
};
var _gicentre$elm_vega$VegaLite$coBackground = _gicentre$elm_vega$VegaLite$Background;
var _gicentre$elm_vega$VegaLite$AxisBand = function (a) {
	return {ctor: 'AxisBand', _0: a};
};
var _gicentre$elm_vega$VegaLite$coAxisBand = _gicentre$elm_vega$VegaLite$AxisBand;
var _gicentre$elm_vega$VegaLite$AxisBottom = function (a) {
	return {ctor: 'AxisBottom', _0: a};
};
var _gicentre$elm_vega$VegaLite$coAxisBottom = _gicentre$elm_vega$VegaLite$AxisBottom;
var _gicentre$elm_vega$VegaLite$AxisTop = function (a) {
	return {ctor: 'AxisTop', _0: a};
};
var _gicentre$elm_vega$VegaLite$coAxisTop = _gicentre$elm_vega$VegaLite$AxisTop;
var _gicentre$elm_vega$VegaLite$AxisRight = function (a) {
	return {ctor: 'AxisRight', _0: a};
};
var _gicentre$elm_vega$VegaLite$coAxisRight = _gicentre$elm_vega$VegaLite$AxisRight;
var _gicentre$elm_vega$VegaLite$AxisLeft = function (a) {
	return {ctor: 'AxisLeft', _0: a};
};
var _gicentre$elm_vega$VegaLite$coAxisLeft = _gicentre$elm_vega$VegaLite$AxisLeft;
var _gicentre$elm_vega$VegaLite$AxisY = function (a) {
	return {ctor: 'AxisY', _0: a};
};
var _gicentre$elm_vega$VegaLite$coAxisY = _gicentre$elm_vega$VegaLite$AxisY;
var _gicentre$elm_vega$VegaLite$AxisX = function (a) {
	return {ctor: 'AxisX', _0: a};
};
var _gicentre$elm_vega$VegaLite$coAxisX = _gicentre$elm_vega$VegaLite$AxisX;
var _gicentre$elm_vega$VegaLite$Axis = function (a) {
	return {ctor: 'Axis', _0: a};
};
var _gicentre$elm_vega$VegaLite$coAxis = _gicentre$elm_vega$VegaLite$Axis;
var _gicentre$elm_vega$VegaLite$Autosize = function (a) {
	return {ctor: 'Autosize', _0: a};
};
var _gicentre$elm_vega$VegaLite$coAutosize = _gicentre$elm_vega$VegaLite$Autosize;
var _gicentre$elm_vega$VegaLite$AreaStyle = function (a) {
	return {ctor: 'AreaStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$coArea = _gicentre$elm_vega$VegaLite$AreaStyle;
var _gicentre$elm_vega$VegaLite$CGrabbing = {ctor: 'CGrabbing'};
var _gicentre$elm_vega$VegaLite$CGrab = {ctor: 'CGrab'};
var _gicentre$elm_vega$VegaLite$CZoomOut = {ctor: 'CZoomOut'};
var _gicentre$elm_vega$VegaLite$CZoomIn = {ctor: 'CZoomIn'};
var _gicentre$elm_vega$VegaLite$CNWSEResize = {ctor: 'CNWSEResize'};
var _gicentre$elm_vega$VegaLite$CNESWResize = {ctor: 'CNESWResize'};
var _gicentre$elm_vega$VegaLite$CNSResize = {ctor: 'CNSResize'};
var _gicentre$elm_vega$VegaLite$CEWResize = {ctor: 'CEWResize'};
var _gicentre$elm_vega$VegaLite$CSWResize = {ctor: 'CSWResize'};
var _gicentre$elm_vega$VegaLite$CSEResize = {ctor: 'CSEResize'};
var _gicentre$elm_vega$VegaLite$CNWResize = {ctor: 'CNWResize'};
var _gicentre$elm_vega$VegaLite$CNEResize = {ctor: 'CNEResize'};
var _gicentre$elm_vega$VegaLite$CWResize = {ctor: 'CWResize'};
var _gicentre$elm_vega$VegaLite$CSResize = {ctor: 'CSResize'};
var _gicentre$elm_vega$VegaLite$CEResize = {ctor: 'CEResize'};
var _gicentre$elm_vega$VegaLite$CNResize = {ctor: 'CNResize'};
var _gicentre$elm_vega$VegaLite$CRowResize = {ctor: 'CRowResize'};
var _gicentre$elm_vega$VegaLite$CColResize = {ctor: 'CColResize'};
var _gicentre$elm_vega$VegaLite$CAllScroll = {ctor: 'CAllScroll'};
var _gicentre$elm_vega$VegaLite$CNotAllowed = {ctor: 'CNotAllowed'};
var _gicentre$elm_vega$VegaLite$CNoDrop = {ctor: 'CNoDrop'};
var _gicentre$elm_vega$VegaLite$CMove = {ctor: 'CMove'};
var _gicentre$elm_vega$VegaLite$CCopy = {ctor: 'CCopy'};
var _gicentre$elm_vega$VegaLite$CAlias = {ctor: 'CAlias'};
var _gicentre$elm_vega$VegaLite$CVerticalText = {ctor: 'CVerticalText'};
var _gicentre$elm_vega$VegaLite$CText = {ctor: 'CText'};
var _gicentre$elm_vega$VegaLite$CCrosshair = {ctor: 'CCrosshair'};
var _gicentre$elm_vega$VegaLite$CCell = {ctor: 'CCell'};
var _gicentre$elm_vega$VegaLite$CWait = {ctor: 'CWait'};
var _gicentre$elm_vega$VegaLite$CProgress = {ctor: 'CProgress'};
var _gicentre$elm_vega$VegaLite$CPointer = {ctor: 'CPointer'};
var _gicentre$elm_vega$VegaLite$CHelp = {ctor: 'CHelp'};
var _gicentre$elm_vega$VegaLite$CContextMenu = {ctor: 'CContextMenu'};
var _gicentre$elm_vega$VegaLite$CNone = {ctor: 'CNone'};
var _gicentre$elm_vega$VegaLite$CDefault = {ctor: 'CDefault'};
var _gicentre$elm_vega$VegaLite$CAuto = {ctor: 'CAuto'};
var _gicentre$elm_vega$VegaLite$FoUtc = function (a) {
	return {ctor: 'FoUtc', _0: a};
};
var _gicentre$elm_vega$VegaLite$foUtc = _gicentre$elm_vega$VegaLite$FoUtc;
var _gicentre$elm_vega$VegaLite$FoDate = function (a) {
	return {ctor: 'FoDate', _0: a};
};
var _gicentre$elm_vega$VegaLite$foDate = _gicentre$elm_vega$VegaLite$FoDate;
var _gicentre$elm_vega$VegaLite$FoBoolean = {ctor: 'FoBoolean'};
var _gicentre$elm_vega$VegaLite$FoNumber = {ctor: 'FoNumber'};
var _gicentre$elm_vega$VegaLite$Str = function (a) {
	return {ctor: 'Str', _0: a};
};
var _gicentre$elm_vega$VegaLite$str = _gicentre$elm_vega$VegaLite$Str;
var _gicentre$elm_vega$VegaLite$Number = function (a) {
	return {ctor: 'Number', _0: a};
};
var _gicentre$elm_vega$VegaLite$num = _gicentre$elm_vega$VegaLite$Number;
var _gicentre$elm_vega$VegaLite$DateTime = function (a) {
	return {ctor: 'DateTime', _0: a};
};
var _gicentre$elm_vega$VegaLite$dt = _gicentre$elm_vega$VegaLite$DateTime;
var _gicentre$elm_vega$VegaLite$Boolean = function (a) {
	return {ctor: 'Boolean', _0: a};
};
var _gicentre$elm_vega$VegaLite$boo = _gicentre$elm_vega$VegaLite$Boolean;
var _gicentre$elm_vega$VegaLite$false = _gicentre$elm_vega$VegaLite$Boolean(false);
var _gicentre$elm_vega$VegaLite$true = _gicentre$elm_vega$VegaLite$Boolean(true);
var _gicentre$elm_vega$VegaLite$Strings = function (a) {
	return {ctor: 'Strings', _0: a};
};
var _gicentre$elm_vega$VegaLite$strs = _gicentre$elm_vega$VegaLite$Strings;
var _gicentre$elm_vega$VegaLite$Numbers = function (a) {
	return {ctor: 'Numbers', _0: a};
};
var _gicentre$elm_vega$VegaLite$nums = _gicentre$elm_vega$VegaLite$Numbers;
var _gicentre$elm_vega$VegaLite$DateTimes = function (a) {
	return {ctor: 'DateTimes', _0: a};
};
var _gicentre$elm_vega$VegaLite$dts = _gicentre$elm_vega$VegaLite$DateTimes;
var _gicentre$elm_vega$VegaLite$Booleans = function (a) {
	return {ctor: 'Booleans', _0: a};
};
var _gicentre$elm_vega$VegaLite$boos = _gicentre$elm_vega$VegaLite$Booleans;
var _gicentre$elm_vega$VegaLite$DTMilliseconds = function (a) {
	return {ctor: 'DTMilliseconds', _0: a};
};
var _gicentre$elm_vega$VegaLite$dtMillisecond = _gicentre$elm_vega$VegaLite$DTMilliseconds;
var _gicentre$elm_vega$VegaLite$DTSeconds = function (a) {
	return {ctor: 'DTSeconds', _0: a};
};
var _gicentre$elm_vega$VegaLite$dtSecond = _gicentre$elm_vega$VegaLite$DTSeconds;
var _gicentre$elm_vega$VegaLite$DTMinutes = function (a) {
	return {ctor: 'DTMinutes', _0: a};
};
var _gicentre$elm_vega$VegaLite$dtMinute = _gicentre$elm_vega$VegaLite$DTMinutes;
var _gicentre$elm_vega$VegaLite$DTHours = function (a) {
	return {ctor: 'DTHours', _0: a};
};
var _gicentre$elm_vega$VegaLite$dtHour = _gicentre$elm_vega$VegaLite$DTHours;
var _gicentre$elm_vega$VegaLite$DTDay = function (a) {
	return {ctor: 'DTDay', _0: a};
};
var _gicentre$elm_vega$VegaLite$dtDay = _gicentre$elm_vega$VegaLite$DTDay;
var _gicentre$elm_vega$VegaLite$DTDate = function (a) {
	return {ctor: 'DTDate', _0: a};
};
var _gicentre$elm_vega$VegaLite$dtDate = _gicentre$elm_vega$VegaLite$DTDate;
var _gicentre$elm_vega$VegaLite$DTMonth = function (a) {
	return {ctor: 'DTMonth', _0: a};
};
var _gicentre$elm_vega$VegaLite$dtMonth = _gicentre$elm_vega$VegaLite$DTMonth;
var _gicentre$elm_vega$VegaLite$DTQuarter = function (a) {
	return {ctor: 'DTQuarter', _0: a};
};
var _gicentre$elm_vega$VegaLite$dtQuarter = _gicentre$elm_vega$VegaLite$DTQuarter;
var _gicentre$elm_vega$VegaLite$DTYear = function (a) {
	return {ctor: 'DTYear', _0: a};
};
var _gicentre$elm_vega$VegaLite$dtYear = _gicentre$elm_vega$VegaLite$DTYear;
var _gicentre$elm_vega$VegaLite$Sun = {ctor: 'Sun'};
var _gicentre$elm_vega$VegaLite$Sat = {ctor: 'Sat'};
var _gicentre$elm_vega$VegaLite$Fri = {ctor: 'Fri'};
var _gicentre$elm_vega$VegaLite$Thu = {ctor: 'Thu'};
var _gicentre$elm_vega$VegaLite$Wed = {ctor: 'Wed'};
var _gicentre$elm_vega$VegaLite$Tue = {ctor: 'Tue'};
var _gicentre$elm_vega$VegaLite$Mon = {ctor: 'Mon'};
var _gicentre$elm_vega$VegaLite$DAggregate = function (a) {
	return {ctor: 'DAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$dAggregate = _gicentre$elm_vega$VegaLite$DAggregate;
var _gicentre$elm_vega$VegaLite$DTimeUnit = function (a) {
	return {ctor: 'DTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$dTimeUnit = _gicentre$elm_vega$VegaLite$DTimeUnit;
var _gicentre$elm_vega$VegaLite$DBin = function (a) {
	return {ctor: 'DBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$dBin = _gicentre$elm_vega$VegaLite$DBin;
var _gicentre$elm_vega$VegaLite$DmType = function (a) {
	return {ctor: 'DmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$dMType = _gicentre$elm_vega$VegaLite$DmType;
var _gicentre$elm_vega$VegaLite$DName = function (a) {
	return {ctor: 'DName', _0: a};
};
var _gicentre$elm_vega$VegaLite$dName = _gicentre$elm_vega$VegaLite$DName;
var _gicentre$elm_vega$VegaLite$FHeader = function (a) {
	return {ctor: 'FHeader', _0: a};
};
var _gicentre$elm_vega$VegaLite$fHeader = _gicentre$elm_vega$VegaLite$FHeader;
var _gicentre$elm_vega$VegaLite$FTimeUnit = function (a) {
	return {ctor: 'FTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$fTimeUnit = _gicentre$elm_vega$VegaLite$FTimeUnit;
var _gicentre$elm_vega$VegaLite$FAggregate = function (a) {
	return {ctor: 'FAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$fAggregate = _gicentre$elm_vega$VegaLite$FAggregate;
var _gicentre$elm_vega$VegaLite$FBin = function (a) {
	return {ctor: 'FBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$fBin = _gicentre$elm_vega$VegaLite$FBin;
var _gicentre$elm_vega$VegaLite$FmType = function (a) {
	return {ctor: 'FmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$fMType = _gicentre$elm_vega$VegaLite$FmType;
var _gicentre$elm_vega$VegaLite$FName = function (a) {
	return {ctor: 'FName', _0: a};
};
var _gicentre$elm_vega$VegaLite$fName = _gicentre$elm_vega$VegaLite$FName;
var _gicentre$elm_vega$VegaLite$RowBy = function (a) {
	return {ctor: 'RowBy', _0: a};
};
var _gicentre$elm_vega$VegaLite$rowBy = _gicentre$elm_vega$VegaLite$RowBy;
var _gicentre$elm_vega$VegaLite$ColumnBy = function (a) {
	return {ctor: 'ColumnBy', _0: a};
};
var _gicentre$elm_vega$VegaLite$columnBy = _gicentre$elm_vega$VegaLite$ColumnBy;
var _gicentre$elm_vega$VegaLite$FRange = F2(
	function (a, b) {
		return {ctor: 'FRange', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$fiRange = _gicentre$elm_vega$VegaLite$FRange;
var _gicentre$elm_vega$VegaLite$FOneOf = F2(
	function (a, b) {
		return {ctor: 'FOneOf', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$fiOneOf = _gicentre$elm_vega$VegaLite$FOneOf;
var _gicentre$elm_vega$VegaLite$FSelection = function (a) {
	return {ctor: 'FSelection', _0: a};
};
var _gicentre$elm_vega$VegaLite$fiSelection = _gicentre$elm_vega$VegaLite$FSelection;
var _gicentre$elm_vega$VegaLite$FCompose = function (a) {
	return {ctor: 'FCompose', _0: a};
};
var _gicentre$elm_vega$VegaLite$fiCompose = _gicentre$elm_vega$VegaLite$FCompose;
var _gicentre$elm_vega$VegaLite$FExpr = function (a) {
	return {ctor: 'FExpr', _0: a};
};
var _gicentre$elm_vega$VegaLite$fiExpr = _gicentre$elm_vega$VegaLite$FExpr;
var _gicentre$elm_vega$VegaLite$FGreaterThanEq = F2(
	function (a, b) {
		return {ctor: 'FGreaterThanEq', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$fiGreaterThanEq = _gicentre$elm_vega$VegaLite$FGreaterThanEq;
var _gicentre$elm_vega$VegaLite$FGreaterThan = F2(
	function (a, b) {
		return {ctor: 'FGreaterThan', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$fiGreaterThan = _gicentre$elm_vega$VegaLite$FGreaterThan;
var _gicentre$elm_vega$VegaLite$FLessThanEq = F2(
	function (a, b) {
		return {ctor: 'FLessThanEq', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$fiLessThanEq = _gicentre$elm_vega$VegaLite$FLessThanEq;
var _gicentre$elm_vega$VegaLite$FLessThan = F2(
	function (a, b) {
		return {ctor: 'FLessThan', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$fiLessThan = _gicentre$elm_vega$VegaLite$FLessThan;
var _gicentre$elm_vega$VegaLite$FEqual = F2(
	function (a, b) {
		return {ctor: 'FEqual', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$fiEqual = _gicentre$elm_vega$VegaLite$FEqual;
var _gicentre$elm_vega$VegaLite$DateRange = F2(
	function (a, b) {
		return {ctor: 'DateRange', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$dtRange = _gicentre$elm_vega$VegaLite$DateRange;
var _gicentre$elm_vega$VegaLite$NumberRange = F2(
	function (a, b) {
		return {ctor: 'NumberRange', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$numRange = _gicentre$elm_vega$VegaLite$NumberRange;
var _gicentre$elm_vega$VegaLite$W900 = {ctor: 'W900'};
var _gicentre$elm_vega$VegaLite$W800 = {ctor: 'W800'};
var _gicentre$elm_vega$VegaLite$W700 = {ctor: 'W700'};
var _gicentre$elm_vega$VegaLite$W600 = {ctor: 'W600'};
var _gicentre$elm_vega$VegaLite$W500 = {ctor: 'W500'};
var _gicentre$elm_vega$VegaLite$W400 = {ctor: 'W400'};
var _gicentre$elm_vega$VegaLite$W300 = {ctor: 'W300'};
var _gicentre$elm_vega$VegaLite$W200 = {ctor: 'W200'};
var _gicentre$elm_vega$VegaLite$W100 = {ctor: 'W100'};
var _gicentre$elm_vega$VegaLite$Normal = {ctor: 'Normal'};
var _gicentre$elm_vega$VegaLite$Lighter = {ctor: 'Lighter'};
var _gicentre$elm_vega$VegaLite$Bolder = {ctor: 'Bolder'};
var _gicentre$elm_vega$VegaLite$Bold = {ctor: 'Bold'};
var _gicentre$elm_vega$VegaLite$Parse = function (a) {
	return {ctor: 'Parse', _0: a};
};
var _gicentre$elm_vega$VegaLite$parse = _gicentre$elm_vega$VegaLite$Parse;
var _gicentre$elm_vega$VegaLite$TopojsonMesh = function (a) {
	return {ctor: 'TopojsonMesh', _0: a};
};
var _gicentre$elm_vega$VegaLite$topojsonMesh = _gicentre$elm_vega$VegaLite$TopojsonMesh;
var _gicentre$elm_vega$VegaLite$TopojsonFeature = function (a) {
	return {ctor: 'TopojsonFeature', _0: a};
};
var _gicentre$elm_vega$VegaLite$topojsonFeature = _gicentre$elm_vega$VegaLite$TopojsonFeature;
var _gicentre$elm_vega$VegaLite$DSV = function (a) {
	return {ctor: 'DSV', _0: a};
};
var _gicentre$elm_vega$VegaLite$dsv = _gicentre$elm_vega$VegaLite$DSV;
var _gicentre$elm_vega$VegaLite$TSV = {ctor: 'TSV'};
var _gicentre$elm_vega$VegaLite$CSV = {ctor: 'CSV'};
var _gicentre$elm_vega$VegaLite$JSON = function (a) {
	return {ctor: 'JSON', _0: a};
};
var _gicentre$elm_vega$VegaLite$jsonProperty = _gicentre$elm_vega$VegaLite$JSON;
var _gicentre$elm_vega$VegaLite$GeoPolygons = function (a) {
	return {ctor: 'GeoPolygons', _0: a};
};
var _gicentre$elm_vega$VegaLite$geoPolygons = _gicentre$elm_vega$VegaLite$GeoPolygons;
var _gicentre$elm_vega$VegaLite$GeoPolygon = function (a) {
	return {ctor: 'GeoPolygon', _0: a};
};
var _gicentre$elm_vega$VegaLite$geoPolygon = _gicentre$elm_vega$VegaLite$GeoPolygon;
var _gicentre$elm_vega$VegaLite$GeoLines = function (a) {
	return {ctor: 'GeoLines', _0: a};
};
var _gicentre$elm_vega$VegaLite$geoLines = _gicentre$elm_vega$VegaLite$GeoLines;
var _gicentre$elm_vega$VegaLite$GeoLine = function (a) {
	return {ctor: 'GeoLine', _0: a};
};
var _gicentre$elm_vega$VegaLite$geoLine = _gicentre$elm_vega$VegaLite$GeoLine;
var _gicentre$elm_vega$VegaLite$GeoPoints = function (a) {
	return {ctor: 'GeoPoints', _0: a};
};
var _gicentre$elm_vega$VegaLite$geoPoints = _gicentre$elm_vega$VegaLite$GeoPoints;
var _gicentre$elm_vega$VegaLite$GeoPoint = F2(
	function (a, b) {
		return {ctor: 'GeoPoint', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$geoPoint = _gicentre$elm_vega$VegaLite$GeoPoint;
var _gicentre$elm_vega$VegaLite$AlignRight = {ctor: 'AlignRight'};
var _gicentre$elm_vega$VegaLite$AlignLeft = {ctor: 'AlignLeft'};
var _gicentre$elm_vega$VegaLite$AlignCenter = {ctor: 'AlignCenter'};
var _gicentre$elm_vega$VegaLite$HTitleLimit = function (a) {
	return {ctor: 'HTitleLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdTitleLimit = _gicentre$elm_vega$VegaLite$HTitleLimit;
var _gicentre$elm_vega$VegaLite$HTitleFontSize = function (a) {
	return {ctor: 'HTitleFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdTitleFontSize = _gicentre$elm_vega$VegaLite$HTitleFontSize;
var _gicentre$elm_vega$VegaLite$HTitleFontWeight = function (a) {
	return {ctor: 'HTitleFontWeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdTitleFontWeight = _gicentre$elm_vega$VegaLite$HTitleFontWeight;
var _gicentre$elm_vega$VegaLite$HTitleFont = function (a) {
	return {ctor: 'HTitleFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdTitleFont = _gicentre$elm_vega$VegaLite$HTitleFont;
var _gicentre$elm_vega$VegaLite$HTitleColor = function (a) {
	return {ctor: 'HTitleColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdTitleColor = _gicentre$elm_vega$VegaLite$HTitleColor;
var _gicentre$elm_vega$VegaLite$HTitleBaseline = function (a) {
	return {ctor: 'HTitleBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdTitleBaseline = _gicentre$elm_vega$VegaLite$HTitleBaseline;
var _gicentre$elm_vega$VegaLite$HTitleAngle = function (a) {
	return {ctor: 'HTitleAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdTitleAngle = _gicentre$elm_vega$VegaLite$HTitleAngle;
var _gicentre$elm_vega$VegaLite$HTitleAnchor = function (a) {
	return {ctor: 'HTitleAnchor', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdTitleAnchor = _gicentre$elm_vega$VegaLite$HTitleAnchor;
var _gicentre$elm_vega$VegaLite$HLabelLimit = function (a) {
	return {ctor: 'HLabelLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdLabelLimit = _gicentre$elm_vega$VegaLite$HLabelLimit;
var _gicentre$elm_vega$VegaLite$HLabelFontSize = function (a) {
	return {ctor: 'HLabelFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdLabelFontSize = _gicentre$elm_vega$VegaLite$HLabelFontSize;
var _gicentre$elm_vega$VegaLite$HLabelFont = function (a) {
	return {ctor: 'HLabelFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdLabelFont = _gicentre$elm_vega$VegaLite$HLabelFont;
var _gicentre$elm_vega$VegaLite$HLabelColor = function (a) {
	return {ctor: 'HLabelColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdLabelColor = _gicentre$elm_vega$VegaLite$HLabelColor;
var _gicentre$elm_vega$VegaLite$HLabelAngle = function (a) {
	return {ctor: 'HLabelAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdLabelAngle = _gicentre$elm_vega$VegaLite$HLabelAngle;
var _gicentre$elm_vega$VegaLite$HTitle = function (a) {
	return {ctor: 'HTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdTitle = _gicentre$elm_vega$VegaLite$HTitle;
var _gicentre$elm_vega$VegaLite$HFormat = function (a) {
	return {ctor: 'HFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$hdFormat = _gicentre$elm_vega$VegaLite$HFormat;
var _gicentre$elm_vega$VegaLite$HString = function (a) {
	return {ctor: 'HString', _0: a};
};
var _gicentre$elm_vega$VegaLite$hStr = _gicentre$elm_vega$VegaLite$HString;
var _gicentre$elm_vega$VegaLite$HDataCondition = F3(
	function (a, b, c) {
		return {ctor: 'HDataCondition', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$VegaLite$hDataCondition = F3(
	function (op, tCh, fCh) {
		return A3(_gicentre$elm_vega$VegaLite$HDataCondition, op, tCh, fCh);
	});
var _gicentre$elm_vega$VegaLite$HSelectionCondition = F3(
	function (a, b, c) {
		return {ctor: 'HSelectionCondition', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$VegaLite$hSelectionCondition = F3(
	function (op, tCh, fCh) {
		return A3(_gicentre$elm_vega$VegaLite$HSelectionCondition, op, tCh, fCh);
	});
var _gicentre$elm_vega$VegaLite$HTimeUnit = function (a) {
	return {ctor: 'HTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$hTimeUnit = _gicentre$elm_vega$VegaLite$HTimeUnit;
var _gicentre$elm_vega$VegaLite$HAggregate = function (a) {
	return {ctor: 'HAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$hAggregate = _gicentre$elm_vega$VegaLite$HAggregate;
var _gicentre$elm_vega$VegaLite$HBin = function (a) {
	return {ctor: 'HBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$hBin = _gicentre$elm_vega$VegaLite$HBin;
var _gicentre$elm_vega$VegaLite$HmType = function (a) {
	return {ctor: 'HmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$hMType = _gicentre$elm_vega$VegaLite$HmType;
var _gicentre$elm_vega$VegaLite$HRepeat = function (a) {
	return {ctor: 'HRepeat', _0: a};
};
var _gicentre$elm_vega$VegaLite$hRepeat = _gicentre$elm_vega$VegaLite$HRepeat;
var _gicentre$elm_vega$VegaLite$HName = function (a) {
	return {ctor: 'HName', _0: a};
};
var _gicentre$elm_vega$VegaLite$hName = _gicentre$elm_vega$VegaLite$HName;
var _gicentre$elm_vega$VegaLite$InPlaceholder = function (a) {
	return {ctor: 'InPlaceholder', _0: a};
};
var _gicentre$elm_vega$VegaLite$inPlaceholder = _gicentre$elm_vega$VegaLite$InPlaceholder;
var _gicentre$elm_vega$VegaLite$InStep = function (a) {
	return {ctor: 'InStep', _0: a};
};
var _gicentre$elm_vega$VegaLite$inStep = _gicentre$elm_vega$VegaLite$InStep;
var _gicentre$elm_vega$VegaLite$InName = function (a) {
	return {ctor: 'InName', _0: a};
};
var _gicentre$elm_vega$VegaLite$inName = _gicentre$elm_vega$VegaLite$InName;
var _gicentre$elm_vega$VegaLite$InMax = function (a) {
	return {ctor: 'InMax', _0: a};
};
var _gicentre$elm_vega$VegaLite$inMax = _gicentre$elm_vega$VegaLite$InMax;
var _gicentre$elm_vega$VegaLite$InMin = function (a) {
	return {ctor: 'InMin', _0: a};
};
var _gicentre$elm_vega$VegaLite$inMin = _gicentre$elm_vega$VegaLite$InMin;
var _gicentre$elm_vega$VegaLite$InOptions = function (a) {
	return {ctor: 'InOptions', _0: a};
};
var _gicentre$elm_vega$VegaLite$inOptions = _gicentre$elm_vega$VegaLite$InOptions;
var _gicentre$elm_vega$VegaLite$Element = function (a) {
	return {ctor: 'Element', _0: a};
};
var _gicentre$elm_vega$VegaLite$inElement = _gicentre$elm_vega$VegaLite$Element;
var _gicentre$elm_vega$VegaLite$Debounce = function (a) {
	return {ctor: 'Debounce', _0: a};
};
var _gicentre$elm_vega$VegaLite$inDebounce = _gicentre$elm_vega$VegaLite$Debounce;
var _gicentre$elm_vega$VegaLite$Symbol = {ctor: 'Symbol'};
var _gicentre$elm_vega$VegaLite$Gradient = {ctor: 'Gradient'};
var _gicentre$elm_vega$VegaLite$LeTitlePadding = function (a) {
	return {ctor: 'LeTitlePadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoTitlePadding = _gicentre$elm_vega$VegaLite$LeTitlePadding;
var _gicentre$elm_vega$VegaLite$LeTitleLimit = function (a) {
	return {ctor: 'LeTitleLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoTitleLimit = _gicentre$elm_vega$VegaLite$LeTitleLimit;
var _gicentre$elm_vega$VegaLite$LeTitleFontWeight = function (a) {
	return {ctor: 'LeTitleFontWeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoTitleFontWeight = _gicentre$elm_vega$VegaLite$LeTitleFontWeight;
var _gicentre$elm_vega$VegaLite$LeTitleFontSize = function (a) {
	return {ctor: 'LeTitleFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoTitleFontSize = _gicentre$elm_vega$VegaLite$LeTitleFontSize;
var _gicentre$elm_vega$VegaLite$LeTitleFont = function (a) {
	return {ctor: 'LeTitleFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoTitleFont = _gicentre$elm_vega$VegaLite$LeTitleFont;
var _gicentre$elm_vega$VegaLite$LeTitleColor = function (a) {
	return {ctor: 'LeTitleColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoTitleColor = _gicentre$elm_vega$VegaLite$LeTitleColor;
var _gicentre$elm_vega$VegaLite$LeTitleBaseline = function (a) {
	return {ctor: 'LeTitleBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoTitleBaseline = _gicentre$elm_vega$VegaLite$LeTitleBaseline;
var _gicentre$elm_vega$VegaLite$LeTitleAlign = function (a) {
	return {ctor: 'LeTitleAlign', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoTitleAlign = _gicentre$elm_vega$VegaLite$LeTitleAlign;
var _gicentre$elm_vega$VegaLite$SymbolStrokeWidth = function (a) {
	return {ctor: 'SymbolStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoSymbolStrokeWidth = _gicentre$elm_vega$VegaLite$SymbolStrokeWidth;
var _gicentre$elm_vega$VegaLite$SymbolSize = function (a) {
	return {ctor: 'SymbolSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoSymbolSize = _gicentre$elm_vega$VegaLite$SymbolSize;
var _gicentre$elm_vega$VegaLite$SymbolType = function (a) {
	return {ctor: 'SymbolType', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoSymbolType = _gicentre$elm_vega$VegaLite$SymbolType;
var _gicentre$elm_vega$VegaLite$SymbolColor = function (a) {
	return {ctor: 'SymbolColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoSymbolColor = _gicentre$elm_vega$VegaLite$SymbolColor;
var _gicentre$elm_vega$VegaLite$EntryPadding = function (a) {
	return {ctor: 'EntryPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoEntryPadding = _gicentre$elm_vega$VegaLite$EntryPadding;
var _gicentre$elm_vega$VegaLite$LeShortTimeLabels = function (a) {
	return {ctor: 'LeShortTimeLabels', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoShortTimeLabels = _gicentre$elm_vega$VegaLite$LeShortTimeLabels;
var _gicentre$elm_vega$VegaLite$LeLabelOffset = function (a) {
	return {ctor: 'LeLabelOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoLabelOffset = _gicentre$elm_vega$VegaLite$LeLabelOffset;
var _gicentre$elm_vega$VegaLite$LeLabelLimit = function (a) {
	return {ctor: 'LeLabelLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoLabelLimit = _gicentre$elm_vega$VegaLite$LeLabelLimit;
var _gicentre$elm_vega$VegaLite$LeLabelFontSize = function (a) {
	return {ctor: 'LeLabelFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoLabelFontSize = _gicentre$elm_vega$VegaLite$LeLabelFontSize;
var _gicentre$elm_vega$VegaLite$LeLabelFont = function (a) {
	return {ctor: 'LeLabelFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoLabelFont = _gicentre$elm_vega$VegaLite$LeLabelFont;
var _gicentre$elm_vega$VegaLite$LeLabelColor = function (a) {
	return {ctor: 'LeLabelColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoLabelColor = _gicentre$elm_vega$VegaLite$LeLabelColor;
var _gicentre$elm_vega$VegaLite$LeLabelBaseline = function (a) {
	return {ctor: 'LeLabelBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoLabelBaseline = _gicentre$elm_vega$VegaLite$LeLabelBaseline;
var _gicentre$elm_vega$VegaLite$LeLabelAlign = function (a) {
	return {ctor: 'LeLabelAlign', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoLabelAlign = _gicentre$elm_vega$VegaLite$LeLabelAlign;
var _gicentre$elm_vega$VegaLite$GradientWidth = function (a) {
	return {ctor: 'GradientWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoGradientWidth = _gicentre$elm_vega$VegaLite$GradientWidth;
var _gicentre$elm_vega$VegaLite$GradientHeight = function (a) {
	return {ctor: 'GradientHeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoGradientHeight = _gicentre$elm_vega$VegaLite$GradientHeight;
var _gicentre$elm_vega$VegaLite$GradientStrokeWidth = function (a) {
	return {ctor: 'GradientStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoGradientStrokeWidth = _gicentre$elm_vega$VegaLite$GradientStrokeWidth;
var _gicentre$elm_vega$VegaLite$GradientStrokeColor = function (a) {
	return {ctor: 'GradientStrokeColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoGradientStrokeColor = _gicentre$elm_vega$VegaLite$GradientStrokeColor;
var _gicentre$elm_vega$VegaLite$GradientLabelOffset = function (a) {
	return {ctor: 'GradientLabelOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoGradientLabelOffset = _gicentre$elm_vega$VegaLite$GradientLabelOffset;
var _gicentre$elm_vega$VegaLite$GradientLabelLimit = function (a) {
	return {ctor: 'GradientLabelLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoGradientLabelLimit = _gicentre$elm_vega$VegaLite$GradientLabelLimit;
var _gicentre$elm_vega$VegaLite$GradientLabelBaseline = function (a) {
	return {ctor: 'GradientLabelBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoGradientLabelBaseline = _gicentre$elm_vega$VegaLite$GradientLabelBaseline;
var _gicentre$elm_vega$VegaLite$LePadding = function (a) {
	return {ctor: 'LePadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoPadding = _gicentre$elm_vega$VegaLite$LePadding;
var _gicentre$elm_vega$VegaLite$LeStrokeWidth = function (a) {
	return {ctor: 'LeStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoStrokeWidth = _gicentre$elm_vega$VegaLite$LeStrokeWidth;
var _gicentre$elm_vega$VegaLite$LeStrokeDash = function (a) {
	return {ctor: 'LeStrokeDash', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoStrokeDash = _gicentre$elm_vega$VegaLite$LeStrokeDash;
var _gicentre$elm_vega$VegaLite$StrokeColor = function (a) {
	return {ctor: 'StrokeColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoStrokeColor = _gicentre$elm_vega$VegaLite$StrokeColor;
var _gicentre$elm_vega$VegaLite$Offset = function (a) {
	return {ctor: 'Offset', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoOffset = _gicentre$elm_vega$VegaLite$Offset;
var _gicentre$elm_vega$VegaLite$Orient = function (a) {
	return {ctor: 'Orient', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoOrient = _gicentre$elm_vega$VegaLite$Orient;
var _gicentre$elm_vega$VegaLite$FillColor = function (a) {
	return {ctor: 'FillColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoFillColor = _gicentre$elm_vega$VegaLite$FillColor;
var _gicentre$elm_vega$VegaLite$CornerRadius = function (a) {
	return {ctor: 'CornerRadius', _0: a};
};
var _gicentre$elm_vega$VegaLite$lecoCornerRadius = _gicentre$elm_vega$VegaLite$CornerRadius;
var _gicentre$elm_vega$VegaLite$TopRight = {ctor: 'TopRight'};
var _gicentre$elm_vega$VegaLite$TopLeft = {ctor: 'TopLeft'};
var _gicentre$elm_vega$VegaLite$Right = {ctor: 'Right'};
var _gicentre$elm_vega$VegaLite$None = {ctor: 'None'};
var _gicentre$elm_vega$VegaLite$Left = {ctor: 'Left'};
var _gicentre$elm_vega$VegaLite$BottomRight = {ctor: 'BottomRight'};
var _gicentre$elm_vega$VegaLite$BottomLeft = {ctor: 'BottomLeft'};
var _gicentre$elm_vega$VegaLite$LZIndex = function (a) {
	return {ctor: 'LZIndex', _0: a};
};
var _gicentre$elm_vega$VegaLite$leZIndex = _gicentre$elm_vega$VegaLite$LZIndex;
var _gicentre$elm_vega$VegaLite$LValues = function (a) {
	return {ctor: 'LValues', _0: a};
};
var _gicentre$elm_vega$VegaLite$leValues = _gicentre$elm_vega$VegaLite$LValues;
var _gicentre$elm_vega$VegaLite$LType = function (a) {
	return {ctor: 'LType', _0: a};
};
var _gicentre$elm_vega$VegaLite$leType = _gicentre$elm_vega$VegaLite$LType;
var _gicentre$elm_vega$VegaLite$LTitle = function (a) {
	return {ctor: 'LTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$leTitle = _gicentre$elm_vega$VegaLite$LTitle;
var _gicentre$elm_vega$VegaLite$LTickCount = function (a) {
	return {ctor: 'LTickCount', _0: a};
};
var _gicentre$elm_vega$VegaLite$leTickCount = _gicentre$elm_vega$VegaLite$LTickCount;
var _gicentre$elm_vega$VegaLite$LPadding = function (a) {
	return {ctor: 'LPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$lePadding = _gicentre$elm_vega$VegaLite$LPadding;
var _gicentre$elm_vega$VegaLite$LOrient = function (a) {
	return {ctor: 'LOrient', _0: a};
};
var _gicentre$elm_vega$VegaLite$leOrient = _gicentre$elm_vega$VegaLite$LOrient;
var _gicentre$elm_vega$VegaLite$LOffset = function (a) {
	return {ctor: 'LOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$leOffset = _gicentre$elm_vega$VegaLite$LOffset;
var _gicentre$elm_vega$VegaLite$LFormat = function (a) {
	return {ctor: 'LFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$leFormat = _gicentre$elm_vega$VegaLite$LFormat;
var _gicentre$elm_vega$VegaLite$LStrings = function (a) {
	return {ctor: 'LStrings', _0: a};
};
var _gicentre$elm_vega$VegaLite$leStrs = _gicentre$elm_vega$VegaLite$LStrings;
var _gicentre$elm_vega$VegaLite$LNumbers = function (a) {
	return {ctor: 'LNumbers', _0: a};
};
var _gicentre$elm_vega$VegaLite$leNums = _gicentre$elm_vega$VegaLite$LNumbers;
var _gicentre$elm_vega$VegaLite$LDateTimes = function (a) {
	return {ctor: 'LDateTimes', _0: a};
};
var _gicentre$elm_vega$VegaLite$leDts = _gicentre$elm_vega$VegaLite$LDateTimes;
var _gicentre$elm_vega$VegaLite$LMMarker = function (a) {
	return {ctor: 'LMMarker', _0: a};
};
var _gicentre$elm_vega$VegaLite$lmMarker = _gicentre$elm_vega$VegaLite$LMMarker;
var _gicentre$elm_vega$VegaLite$LMNone = {ctor: 'LMNone'};
var _gicentre$elm_vega$VegaLite$Trail = {ctor: 'Trail'};
var _gicentre$elm_vega$VegaLite$Tick = {ctor: 'Tick'};
var _gicentre$elm_vega$VegaLite$Text = {ctor: 'Text'};
var _gicentre$elm_vega$VegaLite$Square = {ctor: 'Square'};
var _gicentre$elm_vega$VegaLite$Rule = {ctor: 'Rule'};
var _gicentre$elm_vega$VegaLite$Rect = {ctor: 'Rect'};
var _gicentre$elm_vega$VegaLite$Point = {ctor: 'Point'};
var _gicentre$elm_vega$VegaLite$Line = {ctor: 'Line'};
var _gicentre$elm_vega$VegaLite$Geoshape = {ctor: 'Geoshape'};
var _gicentre$elm_vega$VegaLite$Circle = {ctor: 'Circle'};
var _gicentre$elm_vega$VegaLite$Errorbar = {ctor: 'Errorbar'};
var _gicentre$elm_vega$VegaLite$Errorband = {ctor: 'Errorband'};
var _gicentre$elm_vega$VegaLite$Boxplot = {ctor: 'Boxplot'};
var _gicentre$elm_vega$VegaLite$Bar = {ctor: 'Bar'};
var _gicentre$elm_vega$VegaLite$Area = {ctor: 'Area'};
var _gicentre$elm_vega$VegaLite$MBoolean = function (a) {
	return {ctor: 'MBoolean', _0: a};
};
var _gicentre$elm_vega$VegaLite$mBoo = _gicentre$elm_vega$VegaLite$MBoolean;
var _gicentre$elm_vega$VegaLite$MString = function (a) {
	return {ctor: 'MString', _0: a};
};
var _gicentre$elm_vega$VegaLite$mStr = _gicentre$elm_vega$VegaLite$MString;
var _gicentre$elm_vega$VegaLite$MNumber = function (a) {
	return {ctor: 'MNumber', _0: a};
};
var _gicentre$elm_vega$VegaLite$mNum = _gicentre$elm_vega$VegaLite$MNumber;
var _gicentre$elm_vega$VegaLite$MPath = function (a) {
	return {ctor: 'MPath', _0: a};
};
var _gicentre$elm_vega$VegaLite$mPath = _gicentre$elm_vega$VegaLite$MPath;
var _gicentre$elm_vega$VegaLite$MDataCondition = F2(
	function (a, b) {
		return {ctor: 'MDataCondition', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$mDataCondition = _gicentre$elm_vega$VegaLite$MDataCondition;
var _gicentre$elm_vega$VegaLite$MSelectionCondition = F3(
	function (a, b, c) {
		return {ctor: 'MSelectionCondition', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$VegaLite$mSelectionCondition = _gicentre$elm_vega$VegaLite$MSelectionCondition;
var _gicentre$elm_vega$VegaLite$MLegend = function (a) {
	return {ctor: 'MLegend', _0: a};
};
var _gicentre$elm_vega$VegaLite$mLegend = _gicentre$elm_vega$VegaLite$MLegend;
var _gicentre$elm_vega$VegaLite$MAggregate = function (a) {
	return {ctor: 'MAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$mAggregate = _gicentre$elm_vega$VegaLite$MAggregate;
var _gicentre$elm_vega$VegaLite$MTitle = function (a) {
	return {ctor: 'MTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$mTitle = _gicentre$elm_vega$VegaLite$MTitle;
var _gicentre$elm_vega$VegaLite$MTimeUnit = function (a) {
	return {ctor: 'MTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$mTimeUnit = _gicentre$elm_vega$VegaLite$MTimeUnit;
var _gicentre$elm_vega$VegaLite$MBin = function (a) {
	return {ctor: 'MBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$mBin = _gicentre$elm_vega$VegaLite$MBin;
var _gicentre$elm_vega$VegaLite$MScale = function (a) {
	return {ctor: 'MScale', _0: a};
};
var _gicentre$elm_vega$VegaLite$mScale = _gicentre$elm_vega$VegaLite$MScale;
var _gicentre$elm_vega$VegaLite$MmType = function (a) {
	return {ctor: 'MmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$mMType = _gicentre$elm_vega$VegaLite$MmType;
var _gicentre$elm_vega$VegaLite$MRepeat = function (a) {
	return {ctor: 'MRepeat', _0: a};
};
var _gicentre$elm_vega$VegaLite$mRepeat = _gicentre$elm_vega$VegaLite$MRepeat;
var _gicentre$elm_vega$VegaLite$MName = function (a) {
	return {ctor: 'MName', _0: a};
};
var _gicentre$elm_vega$VegaLite$mName = _gicentre$elm_vega$VegaLite$MName;
var _gicentre$elm_vega$VegaLite$Stepwise = {ctor: 'Stepwise'};
var _gicentre$elm_vega$VegaLite$StepBefore = {ctor: 'StepBefore'};
var _gicentre$elm_vega$VegaLite$StepAfter = {ctor: 'StepAfter'};
var _gicentre$elm_vega$VegaLite$Monotone = {ctor: 'Monotone'};
var _gicentre$elm_vega$VegaLite$LinearClosed = {ctor: 'LinearClosed'};
var _gicentre$elm_vega$VegaLite$Linear = {ctor: 'Linear'};
var _gicentre$elm_vega$VegaLite$CardinalOpen = {ctor: 'CardinalOpen'};
var _gicentre$elm_vega$VegaLite$CardinalClosed = {ctor: 'CardinalClosed'};
var _gicentre$elm_vega$VegaLite$Cardinal = {ctor: 'Cardinal'};
var _gicentre$elm_vega$VegaLite$Bundle = {ctor: 'Bundle'};
var _gicentre$elm_vega$VegaLite$BasisOpen = {ctor: 'BasisOpen'};
var _gicentre$elm_vega$VegaLite$BasisClosed = {ctor: 'BasisClosed'};
var _gicentre$elm_vega$VegaLite$Basis = {ctor: 'Basis'};
var _gicentre$elm_vega$VegaLite$Vertical = {ctor: 'Vertical'};
var _gicentre$elm_vega$VegaLite$Horizontal = {ctor: 'Horizontal'};
var _gicentre$elm_vega$VegaLite$MY2Offset = function (a) {
	return {ctor: 'MY2Offset', _0: a};
};
var _gicentre$elm_vega$VegaLite$maY2Offset = _gicentre$elm_vega$VegaLite$MY2Offset;
var _gicentre$elm_vega$VegaLite$MX2Offset = function (a) {
	return {ctor: 'MX2Offset', _0: a};
};
var _gicentre$elm_vega$VegaLite$maX2Offset = _gicentre$elm_vega$VegaLite$MX2Offset;
var _gicentre$elm_vega$VegaLite$MYOffset = function (a) {
	return {ctor: 'MYOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$maYOffset = _gicentre$elm_vega$VegaLite$MYOffset;
var _gicentre$elm_vega$VegaLite$MXOffset = function (a) {
	return {ctor: 'MXOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$maXOffset = _gicentre$elm_vega$VegaLite$MXOffset;
var _gicentre$elm_vega$VegaLite$MThickness = function (a) {
	return {ctor: 'MThickness', _0: a};
};
var _gicentre$elm_vega$VegaLite$maThickness = _gicentre$elm_vega$VegaLite$MThickness;
var _gicentre$elm_vega$VegaLite$MTicks = function (a) {
	return {ctor: 'MTicks', _0: a};
};
var _gicentre$elm_vega$VegaLite$maTicks = _gicentre$elm_vega$VegaLite$MTicks;
var _gicentre$elm_vega$VegaLite$MTheta = function (a) {
	return {ctor: 'MTheta', _0: a};
};
var _gicentre$elm_vega$VegaLite$maTheta = _gicentre$elm_vega$VegaLite$MTheta;
var _gicentre$elm_vega$VegaLite$MText = function (a) {
	return {ctor: 'MText', _0: a};
};
var _gicentre$elm_vega$VegaLite$maText = _gicentre$elm_vega$VegaLite$MText;
var _gicentre$elm_vega$VegaLite$MTension = function (a) {
	return {ctor: 'MTension', _0: a};
};
var _gicentre$elm_vega$VegaLite$maTension = _gicentre$elm_vega$VegaLite$MTension;
var _gicentre$elm_vega$VegaLite$MStyle = function (a) {
	return {ctor: 'MStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$maStyle = _gicentre$elm_vega$VegaLite$MStyle;
var _gicentre$elm_vega$VegaLite$MStrokeWidth = function (a) {
	return {ctor: 'MStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$maStrokeWidth = _gicentre$elm_vega$VegaLite$MStrokeWidth;
var _gicentre$elm_vega$VegaLite$MStrokeOpacity = function (a) {
	return {ctor: 'MStrokeOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$maStrokeOpacity = _gicentre$elm_vega$VegaLite$MStrokeOpacity;
var _gicentre$elm_vega$VegaLite$MStrokeMiterLimit = function (a) {
	return {ctor: 'MStrokeMiterLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$maStrokeMiterLimit = _gicentre$elm_vega$VegaLite$MStrokeMiterLimit;
var _gicentre$elm_vega$VegaLite$MStrokeJoin = function (a) {
	return {ctor: 'MStrokeJoin', _0: a};
};
var _gicentre$elm_vega$VegaLite$maStrokeJoin = _gicentre$elm_vega$VegaLite$MStrokeJoin;
var _gicentre$elm_vega$VegaLite$MStrokeDashOffset = function (a) {
	return {ctor: 'MStrokeDashOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$maStrokeDashOffset = _gicentre$elm_vega$VegaLite$MStrokeDashOffset;
var _gicentre$elm_vega$VegaLite$MStrokeDash = function (a) {
	return {ctor: 'MStrokeDash', _0: a};
};
var _gicentre$elm_vega$VegaLite$maStrokeDash = _gicentre$elm_vega$VegaLite$MStrokeDash;
var _gicentre$elm_vega$VegaLite$MStrokeCap = function (a) {
	return {ctor: 'MStrokeCap', _0: a};
};
var _gicentre$elm_vega$VegaLite$maStrokeCap = _gicentre$elm_vega$VegaLite$MStrokeCap;
var _gicentre$elm_vega$VegaLite$MStroke = function (a) {
	return {ctor: 'MStroke', _0: a};
};
var _gicentre$elm_vega$VegaLite$maStroke = _gicentre$elm_vega$VegaLite$MStroke;
var _gicentre$elm_vega$VegaLite$MSize = function (a) {
	return {ctor: 'MSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$maSize = _gicentre$elm_vega$VegaLite$MSize;
var _gicentre$elm_vega$VegaLite$MShortTimeLabels = function (a) {
	return {ctor: 'MShortTimeLabels', _0: a};
};
var _gicentre$elm_vega$VegaLite$maShortTimeLabels = _gicentre$elm_vega$VegaLite$MShortTimeLabels;
var _gicentre$elm_vega$VegaLite$MShape = function (a) {
	return {ctor: 'MShape', _0: a};
};
var _gicentre$elm_vega$VegaLite$maShape = _gicentre$elm_vega$VegaLite$MShape;
var _gicentre$elm_vega$VegaLite$MRule = function (a) {
	return {ctor: 'MRule', _0: a};
};
var _gicentre$elm_vega$VegaLite$maRule = _gicentre$elm_vega$VegaLite$MRule;
var _gicentre$elm_vega$VegaLite$MRadius = function (a) {
	return {ctor: 'MRadius', _0: a};
};
var _gicentre$elm_vega$VegaLite$maRadius = _gicentre$elm_vega$VegaLite$MRadius;
var _gicentre$elm_vega$VegaLite$MPoint = function (a) {
	return {ctor: 'MPoint', _0: a};
};
var _gicentre$elm_vega$VegaLite$maPoint = _gicentre$elm_vega$VegaLite$MPoint;
var _gicentre$elm_vega$VegaLite$MOrient = function (a) {
	return {ctor: 'MOrient', _0: a};
};
var _gicentre$elm_vega$VegaLite$maOrient = _gicentre$elm_vega$VegaLite$MOrient;
var _gicentre$elm_vega$VegaLite$MOpacity = function (a) {
	return {ctor: 'MOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$maOpacity = _gicentre$elm_vega$VegaLite$MOpacity;
var _gicentre$elm_vega$VegaLite$MLine = function (a) {
	return {ctor: 'MLine', _0: a};
};
var _gicentre$elm_vega$VegaLite$maLine = _gicentre$elm_vega$VegaLite$MLine;
var _gicentre$elm_vega$VegaLite$MInterpolate = function (a) {
	return {ctor: 'MInterpolate', _0: a};
};
var _gicentre$elm_vega$VegaLite$maInterpolate = _gicentre$elm_vega$VegaLite$MInterpolate;
var _gicentre$elm_vega$VegaLite$MFontWeight = function (a) {
	return {ctor: 'MFontWeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$maFontWeight = _gicentre$elm_vega$VegaLite$MFontWeight;
var _gicentre$elm_vega$VegaLite$MFontStyle = function (a) {
	return {ctor: 'MFontStyle', _0: a};
};
var _gicentre$elm_vega$VegaLite$maFontStyle = _gicentre$elm_vega$VegaLite$MFontStyle;
var _gicentre$elm_vega$VegaLite$MFontSize = function (a) {
	return {ctor: 'MFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$maFontSize = _gicentre$elm_vega$VegaLite$MFontSize;
var _gicentre$elm_vega$VegaLite$MFont = function (a) {
	return {ctor: 'MFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$maFont = _gicentre$elm_vega$VegaLite$MFont;
var _gicentre$elm_vega$VegaLite$MFillOpacity = function (a) {
	return {ctor: 'MFillOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$maFillOpacity = _gicentre$elm_vega$VegaLite$MFillOpacity;
var _gicentre$elm_vega$VegaLite$MFilled = function (a) {
	return {ctor: 'MFilled', _0: a};
};
var _gicentre$elm_vega$VegaLite$maFilled = _gicentre$elm_vega$VegaLite$MFilled;
var _gicentre$elm_vega$VegaLite$MFill = function (a) {
	return {ctor: 'MFill', _0: a};
};
var _gicentre$elm_vega$VegaLite$maFill = _gicentre$elm_vega$VegaLite$MFill;
var _gicentre$elm_vega$VegaLite$MExtent = function (a) {
	return {ctor: 'MExtent', _0: a};
};
var _gicentre$elm_vega$VegaLite$maExtent = _gicentre$elm_vega$VegaLite$MExtent;
var _gicentre$elm_vega$VegaLite$MdY = function (a) {
	return {ctor: 'MdY', _0: a};
};
var _gicentre$elm_vega$VegaLite$maDy = _gicentre$elm_vega$VegaLite$MdY;
var _gicentre$elm_vega$VegaLite$MdX = function (a) {
	return {ctor: 'MdX', _0: a};
};
var _gicentre$elm_vega$VegaLite$maDx = _gicentre$elm_vega$VegaLite$MdX;
var _gicentre$elm_vega$VegaLite$MDiscreteBandSize = function (a) {
	return {ctor: 'MDiscreteBandSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$maDiscreteBandSize = _gicentre$elm_vega$VegaLite$MDiscreteBandSize;
var _gicentre$elm_vega$VegaLite$MContinuousBandSize = function (a) {
	return {ctor: 'MContinuousBandSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$maContinuousBandSize = _gicentre$elm_vega$VegaLite$MContinuousBandSize;
var _gicentre$elm_vega$VegaLite$MHRef = function (a) {
	return {ctor: 'MHRef', _0: a};
};
var _gicentre$elm_vega$VegaLite$maHRef = _gicentre$elm_vega$VegaLite$MHRef;
var _gicentre$elm_vega$VegaLite$MCursor = function (a) {
	return {ctor: 'MCursor', _0: a};
};
var _gicentre$elm_vega$VegaLite$maCursor = _gicentre$elm_vega$VegaLite$MCursor;
var _gicentre$elm_vega$VegaLite$MColor = function (a) {
	return {ctor: 'MColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$maColor = _gicentre$elm_vega$VegaLite$MColor;
var _gicentre$elm_vega$VegaLite$MClip = function (a) {
	return {ctor: 'MClip', _0: a};
};
var _gicentre$elm_vega$VegaLite$maClip = _gicentre$elm_vega$VegaLite$MClip;
var _gicentre$elm_vega$VegaLite$MBorders = function (a) {
	return {ctor: 'MBorders', _0: a};
};
var _gicentre$elm_vega$VegaLite$maBorders = _gicentre$elm_vega$VegaLite$MBorders;
var _gicentre$elm_vega$VegaLite$MBinSpacing = function (a) {
	return {ctor: 'MBinSpacing', _0: a};
};
var _gicentre$elm_vega$VegaLite$maBinSpacing = _gicentre$elm_vega$VegaLite$MBinSpacing;
var _gicentre$elm_vega$VegaLite$MBaseline = function (a) {
	return {ctor: 'MBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$maBaseline = _gicentre$elm_vega$VegaLite$MBaseline;
var _gicentre$elm_vega$VegaLite$MBandSize = function (a) {
	return {ctor: 'MBandSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$maBandSize = _gicentre$elm_vega$VegaLite$MBandSize;
var _gicentre$elm_vega$VegaLite$MAngle = function (a) {
	return {ctor: 'MAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$maAngle = _gicentre$elm_vega$VegaLite$MAngle;
var _gicentre$elm_vega$VegaLite$MAlign = function (a) {
	return {ctor: 'MAlign', _0: a};
};
var _gicentre$elm_vega$VegaLite$maAlign = _gicentre$elm_vega$VegaLite$MAlign;
var _gicentre$elm_vega$VegaLite$GeoFeature = {ctor: 'GeoFeature'};
var _gicentre$elm_vega$VegaLite$Temporal = {ctor: 'Temporal'};
var _gicentre$elm_vega$VegaLite$Quantitative = {ctor: 'Quantitative'};
var _gicentre$elm_vega$VegaLite$Ordinal = {ctor: 'Ordinal'};
var _gicentre$elm_vega$VegaLite$Nominal = {ctor: 'Nominal'};
var _gicentre$elm_vega$VegaLite$Dec = {ctor: 'Dec'};
var _gicentre$elm_vega$VegaLite$Nov = {ctor: 'Nov'};
var _gicentre$elm_vega$VegaLite$Oct = {ctor: 'Oct'};
var _gicentre$elm_vega$VegaLite$Sep = {ctor: 'Sep'};
var _gicentre$elm_vega$VegaLite$Aug = {ctor: 'Aug'};
var _gicentre$elm_vega$VegaLite$Jul = {ctor: 'Jul'};
var _gicentre$elm_vega$VegaLite$Jun = {ctor: 'Jun'};
var _gicentre$elm_vega$VegaLite$May = {ctor: 'May'};
var _gicentre$elm_vega$VegaLite$Apr = {ctor: 'Apr'};
var _gicentre$elm_vega$VegaLite$Mar = {ctor: 'Mar'};
var _gicentre$elm_vega$VegaLite$Feb = {ctor: 'Feb'};
var _gicentre$elm_vega$VegaLite$Jan = {ctor: 'Jan'};
var _gicentre$elm_vega$VegaLite$VarianceP = {ctor: 'VarianceP'};
var _gicentre$elm_vega$VegaLite$Variance = {ctor: 'Variance'};
var _gicentre$elm_vega$VegaLite$Valid = {ctor: 'Valid'};
var _gicentre$elm_vega$VegaLite$Sum = {ctor: 'Sum'};
var _gicentre$elm_vega$VegaLite$StdevP = {ctor: 'StdevP'};
var _gicentre$elm_vega$VegaLite$Stdev = {ctor: 'Stdev'};
var _gicentre$elm_vega$VegaLite$Stderr = {ctor: 'Stderr'};
var _gicentre$elm_vega$VegaLite$Q3 = {ctor: 'Q3'};
var _gicentre$elm_vega$VegaLite$Q1 = {ctor: 'Q1'};
var _gicentre$elm_vega$VegaLite$Missing = {ctor: 'Missing'};
var _gicentre$elm_vega$VegaLite$Min = {ctor: 'Min'};
var _gicentre$elm_vega$VegaLite$Median = {ctor: 'Median'};
var _gicentre$elm_vega$VegaLite$Mean = {ctor: 'Mean'};
var _gicentre$elm_vega$VegaLite$Max = {ctor: 'Max'};
var _gicentre$elm_vega$VegaLite$Distinct = {ctor: 'Distinct'};
var _gicentre$elm_vega$VegaLite$Count = {ctor: 'Count'};
var _gicentre$elm_vega$VegaLite$CI1 = {ctor: 'CI1'};
var _gicentre$elm_vega$VegaLite$CI0 = {ctor: 'CI0'};
var _gicentre$elm_vega$VegaLite$Average = {ctor: 'Average'};
var _gicentre$elm_vega$VegaLite$ArgMin = {ctor: 'ArgMin'};
var _gicentre$elm_vega$VegaLite$ArgMax = {ctor: 'ArgMax'};
var _gicentre$elm_vega$VegaLite$OSort = function (a) {
	return {ctor: 'OSort', _0: a};
};
var _gicentre$elm_vega$VegaLite$oSort = _gicentre$elm_vega$VegaLite$OSort;
var _gicentre$elm_vega$VegaLite$OTimeUnit = function (a) {
	return {ctor: 'OTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$oTimeUnit = _gicentre$elm_vega$VegaLite$OTimeUnit;
var _gicentre$elm_vega$VegaLite$OAggregate = function (a) {
	return {ctor: 'OAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$oAggregate = _gicentre$elm_vega$VegaLite$OAggregate;
var _gicentre$elm_vega$VegaLite$OBin = function (a) {
	return {ctor: 'OBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$oBin = _gicentre$elm_vega$VegaLite$OBin;
var _gicentre$elm_vega$VegaLite$OmType = function (a) {
	return {ctor: 'OmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$oMType = _gicentre$elm_vega$VegaLite$OmType;
var _gicentre$elm_vega$VegaLite$ORepeat = function (a) {
	return {ctor: 'ORepeat', _0: a};
};
var _gicentre$elm_vega$VegaLite$oRepeat = _gicentre$elm_vega$VegaLite$ORepeat;
var _gicentre$elm_vega$VegaLite$OName = function (a) {
	return {ctor: 'OName', _0: a};
};
var _gicentre$elm_vega$VegaLite$oName = _gicentre$elm_vega$VegaLite$OName;
var _gicentre$elm_vega$VegaLite$OGreedy = {ctor: 'OGreedy'};
var _gicentre$elm_vega$VegaLite$OParity = {ctor: 'OParity'};
var _gicentre$elm_vega$VegaLite$ONone = {ctor: 'ONone'};
var _gicentre$elm_vega$VegaLite$PEdges = F4(
	function (a, b, c, d) {
		return {ctor: 'PEdges', _0: a, _1: b, _2: c, _3: d};
	});
var _gicentre$elm_vega$VegaLite$paEdges = _gicentre$elm_vega$VegaLite$PEdges;
var _gicentre$elm_vega$VegaLite$PSize = function (a) {
	return {ctor: 'PSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$paSize = _gicentre$elm_vega$VegaLite$PSize;
var _gicentre$elm_vega$VegaLite$PMMarker = function (a) {
	return {ctor: 'PMMarker', _0: a};
};
var _gicentre$elm_vega$VegaLite$pmMarker = _gicentre$elm_vega$VegaLite$PMMarker;
var _gicentre$elm_vega$VegaLite$PMNone = {ctor: 'PMNone'};
var _gicentre$elm_vega$VegaLite$PMTransparent = {ctor: 'PMTransparent'};
var _gicentre$elm_vega$VegaLite$Latitude2 = {ctor: 'Latitude2'};
var _gicentre$elm_vega$VegaLite$Longitude2 = {ctor: 'Longitude2'};
var _gicentre$elm_vega$VegaLite$Latitude = {ctor: 'Latitude'};
var _gicentre$elm_vega$VegaLite$Longitude = {ctor: 'Longitude'};
var _gicentre$elm_vega$VegaLite$Y2 = {ctor: 'Y2'};
var _gicentre$elm_vega$VegaLite$X2 = {ctor: 'X2'};
var _gicentre$elm_vega$VegaLite$Y = {ctor: 'Y'};
var _gicentre$elm_vega$VegaLite$X = {ctor: 'X'};
var _gicentre$elm_vega$VegaLite$position = F2(
	function (pos, pDefs) {
		var isNotPmType = function (pp) {
			var _p145 = pp;
			if (_p145.ctor === 'PmType') {
				return false;
			} else {
				return true;
			}
		};
		var _p146 = pos;
		switch (_p146.ctor) {
			case 'X':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$VegaLite$positionLabel(_gicentre$elm_vega$VegaLite$X),
						_1: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$positionChannelProperty, pDefs))
					});
			case 'Y':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$VegaLite$positionLabel(_gicentre$elm_vega$VegaLite$Y),
						_1: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$positionChannelProperty, pDefs))
					});
			case 'X2':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$VegaLite$positionLabel(_gicentre$elm_vega$VegaLite$X2),
						_1: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$positionChannelProperty, pDefs))
					});
			case 'Y2':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$VegaLite$positionLabel(_gicentre$elm_vega$VegaLite$Y2),
						_1: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$positionChannelProperty, pDefs))
					});
			case 'Longitude':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$VegaLite$positionLabel(_gicentre$elm_vega$VegaLite$Longitude),
						_1: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$positionChannelProperty, pDefs))
					});
			case 'Latitude':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$VegaLite$positionLabel(_gicentre$elm_vega$VegaLite$Latitude),
						_1: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$positionChannelProperty, pDefs))
					});
			case 'Longitude2':
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$VegaLite$positionLabel(_gicentre$elm_vega$VegaLite$Longitude2),
						_1: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$positionChannelProperty, pDefs))
					});
			default:
				return F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(
					{
						ctor: '_Tuple2',
						_0: _gicentre$elm_vega$VegaLite$positionLabel(_gicentre$elm_vega$VegaLite$Latitude2),
						_1: _elm_lang$core$Json_Encode$object(
							A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$positionChannelProperty, pDefs))
					});
		}
	});
var _gicentre$elm_vega$VegaLite$PStack = function (a) {
	return {ctor: 'PStack', _0: a};
};
var _gicentre$elm_vega$VegaLite$pStack = _gicentre$elm_vega$VegaLite$PStack;
var _gicentre$elm_vega$VegaLite$PSort = function (a) {
	return {ctor: 'PSort', _0: a};
};
var _gicentre$elm_vega$VegaLite$pSort = _gicentre$elm_vega$VegaLite$PSort;
var _gicentre$elm_vega$VegaLite$PAxis = function (a) {
	return {ctor: 'PAxis', _0: a};
};
var _gicentre$elm_vega$VegaLite$pAxis = _gicentre$elm_vega$VegaLite$PAxis;
var _gicentre$elm_vega$VegaLite$PScale = function (a) {
	return {ctor: 'PScale', _0: a};
};
var _gicentre$elm_vega$VegaLite$pScale = _gicentre$elm_vega$VegaLite$PScale;
var _gicentre$elm_vega$VegaLite$PAggregate = function (a) {
	return {ctor: 'PAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$pAggregate = _gicentre$elm_vega$VegaLite$PAggregate;
var _gicentre$elm_vega$VegaLite$PTitle = function (a) {
	return {ctor: 'PTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$pTitle = _gicentre$elm_vega$VegaLite$PTitle;
var _gicentre$elm_vega$VegaLite$PTimeUnit = function (a) {
	return {ctor: 'PTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$pTimeUnit = _gicentre$elm_vega$VegaLite$PTimeUnit;
var _gicentre$elm_vega$VegaLite$PBin = function (a) {
	return {ctor: 'PBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$pBin = _gicentre$elm_vega$VegaLite$PBin;
var _gicentre$elm_vega$VegaLite$PmType = function (a) {
	return {ctor: 'PmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$pMType = _gicentre$elm_vega$VegaLite$PmType;
var _gicentre$elm_vega$VegaLite$PRepeat = function (a) {
	return {ctor: 'PRepeat', _0: a};
};
var _gicentre$elm_vega$VegaLite$pRepeat = _gicentre$elm_vega$VegaLite$PRepeat;
var _gicentre$elm_vega$VegaLite$PHeight = {ctor: 'PHeight'};
var _gicentre$elm_vega$VegaLite$pHeight = _gicentre$elm_vega$VegaLite$PHeight;
var _gicentre$elm_vega$VegaLite$PWidth = {ctor: 'PWidth'};
var _gicentre$elm_vega$VegaLite$pWidth = _gicentre$elm_vega$VegaLite$PWidth;
var _gicentre$elm_vega$VegaLite$PName = function (a) {
	return {ctor: 'PName', _0: a};
};
var _gicentre$elm_vega$VegaLite$pName = _gicentre$elm_vega$VegaLite$PName;
var _gicentre$elm_vega$VegaLite$TransverseMercator = {ctor: 'TransverseMercator'};
var _gicentre$elm_vega$VegaLite$Stereographic = {ctor: 'Stereographic'};
var _gicentre$elm_vega$VegaLite$Orthographic = {ctor: 'Orthographic'};
var _gicentre$elm_vega$VegaLite$Mercator = {ctor: 'Mercator'};
var _gicentre$elm_vega$VegaLite$Gnomonic = {ctor: 'Gnomonic'};
var _gicentre$elm_vega$VegaLite$Equirectangular = {ctor: 'Equirectangular'};
var _gicentre$elm_vega$VegaLite$Custom = function (a) {
	return {ctor: 'Custom', _0: a};
};
var _gicentre$elm_vega$VegaLite$customProjection = _gicentre$elm_vega$VegaLite$Custom;
var _gicentre$elm_vega$VegaLite$ConicEquidistant = {ctor: 'ConicEquidistant'};
var _gicentre$elm_vega$VegaLite$ConicEqualArea = {ctor: 'ConicEqualArea'};
var _gicentre$elm_vega$VegaLite$ConicConformal = {ctor: 'ConicConformal'};
var _gicentre$elm_vega$VegaLite$AzimuthalEquidistant = {ctor: 'AzimuthalEquidistant'};
var _gicentre$elm_vega$VegaLite$AzimuthalEqualArea = {ctor: 'AzimuthalEqualArea'};
var _gicentre$elm_vega$VegaLite$AlbersUsa = {ctor: 'AlbersUsa'};
var _gicentre$elm_vega$VegaLite$Albers = {ctor: 'Albers'};
var _gicentre$elm_vega$VegaLite$PTilt = function (a) {
	return {ctor: 'PTilt', _0: a};
};
var _gicentre$elm_vega$VegaLite$prTilt = _gicentre$elm_vega$VegaLite$PTilt;
var _gicentre$elm_vega$VegaLite$PSpacing = function (a) {
	return {ctor: 'PSpacing', _0: a};
};
var _gicentre$elm_vega$VegaLite$prSpacing = _gicentre$elm_vega$VegaLite$PSpacing;
var _gicentre$elm_vega$VegaLite$PRatio = function (a) {
	return {ctor: 'PRatio', _0: a};
};
var _gicentre$elm_vega$VegaLite$prRatio = _gicentre$elm_vega$VegaLite$PRatio;
var _gicentre$elm_vega$VegaLite$PRadius = function (a) {
	return {ctor: 'PRadius', _0: a};
};
var _gicentre$elm_vega$VegaLite$prRadius = _gicentre$elm_vega$VegaLite$PRadius;
var _gicentre$elm_vega$VegaLite$PParallel = function (a) {
	return {ctor: 'PParallel', _0: a};
};
var _gicentre$elm_vega$VegaLite$prParallel = _gicentre$elm_vega$VegaLite$PParallel;
var _gicentre$elm_vega$VegaLite$PLobes = function (a) {
	return {ctor: 'PLobes', _0: a};
};
var _gicentre$elm_vega$VegaLite$prLobes = _gicentre$elm_vega$VegaLite$PLobes;
var _gicentre$elm_vega$VegaLite$PFraction = function (a) {
	return {ctor: 'PFraction', _0: a};
};
var _gicentre$elm_vega$VegaLite$prFraction = _gicentre$elm_vega$VegaLite$PFraction;
var _gicentre$elm_vega$VegaLite$PDistance = function (a) {
	return {ctor: 'PDistance', _0: a};
};
var _gicentre$elm_vega$VegaLite$prDistance = _gicentre$elm_vega$VegaLite$PDistance;
var _gicentre$elm_vega$VegaLite$PCoefficient = function (a) {
	return {ctor: 'PCoefficient', _0: a};
};
var _gicentre$elm_vega$VegaLite$prCoefficient = _gicentre$elm_vega$VegaLite$PCoefficient;
var _gicentre$elm_vega$VegaLite$PPrecision = function (a) {
	return {ctor: 'PPrecision', _0: a};
};
var _gicentre$elm_vega$VegaLite$prPrecision = _gicentre$elm_vega$VegaLite$PPrecision;
var _gicentre$elm_vega$VegaLite$PRotate = F3(
	function (a, b, c) {
		return {ctor: 'PRotate', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$VegaLite$prRotate = _gicentre$elm_vega$VegaLite$PRotate;
var _gicentre$elm_vega$VegaLite$PCenter = F2(
	function (a, b) {
		return {ctor: 'PCenter', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$prCenter = _gicentre$elm_vega$VegaLite$PCenter;
var _gicentre$elm_vega$VegaLite$PClipExtent = function (a) {
	return {ctor: 'PClipExtent', _0: a};
};
var _gicentre$elm_vega$VegaLite$prClipExtent = _gicentre$elm_vega$VegaLite$PClipExtent;
var _gicentre$elm_vega$VegaLite$PClipAngle = function (a) {
	return {ctor: 'PClipAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$prClipAngle = _gicentre$elm_vega$VegaLite$PClipAngle;
var _gicentre$elm_vega$VegaLite$PType = function (a) {
	return {ctor: 'PType', _0: a};
};
var _gicentre$elm_vega$VegaLite$prType = _gicentre$elm_vega$VegaLite$PType;
var _gicentre$elm_vega$VegaLite$RSymbol = function (a) {
	return {ctor: 'RSymbol', _0: a};
};
var _gicentre$elm_vega$VegaLite$racoSymbol = _gicentre$elm_vega$VegaLite$RSymbol;
var _gicentre$elm_vega$VegaLite$RRamp = function (a) {
	return {ctor: 'RRamp', _0: a};
};
var _gicentre$elm_vega$VegaLite$racoRamp = _gicentre$elm_vega$VegaLite$RRamp;
var _gicentre$elm_vega$VegaLite$ROrdinal = function (a) {
	return {ctor: 'ROrdinal', _0: a};
};
var _gicentre$elm_vega$VegaLite$racoOrdinal = _gicentre$elm_vega$VegaLite$ROrdinal;
var _gicentre$elm_vega$VegaLite$RHeatmap = function (a) {
	return {ctor: 'RHeatmap', _0: a};
};
var _gicentre$elm_vega$VegaLite$racoHeatmap = _gicentre$elm_vega$VegaLite$RHeatmap;
var _gicentre$elm_vega$VegaLite$RDiverging = function (a) {
	return {ctor: 'RDiverging', _0: a};
};
var _gicentre$elm_vega$VegaLite$racoDiverging = _gicentre$elm_vega$VegaLite$RDiverging;
var _gicentre$elm_vega$VegaLite$RCategory = function (a) {
	return {ctor: 'RCategory', _0: a};
};
var _gicentre$elm_vega$VegaLite$racoCategory = _gicentre$elm_vega$VegaLite$RCategory;
var _gicentre$elm_vega$VegaLite$ColumnFields = function (a) {
	return {ctor: 'ColumnFields', _0: a};
};
var _gicentre$elm_vega$VegaLite$columnFields = _gicentre$elm_vega$VegaLite$ColumnFields;
var _gicentre$elm_vega$VegaLite$RowFields = function (a) {
	return {ctor: 'RowFields', _0: a};
};
var _gicentre$elm_vega$VegaLite$rowFields = _gicentre$elm_vega$VegaLite$RowFields;
var _gicentre$elm_vega$VegaLite$Independent = {ctor: 'Independent'};
var _gicentre$elm_vega$VegaLite$Shared = {ctor: 'Shared'};
var _gicentre$elm_vega$VegaLite$RScale = function (a) {
	return {ctor: 'RScale', _0: a};
};
var _gicentre$elm_vega$VegaLite$reScale = _gicentre$elm_vega$VegaLite$RScale;
var _gicentre$elm_vega$VegaLite$RLegend = function (a) {
	return {ctor: 'RLegend', _0: a};
};
var _gicentre$elm_vega$VegaLite$reLegend = _gicentre$elm_vega$VegaLite$RLegend;
var _gicentre$elm_vega$VegaLite$RAxis = function (a) {
	return {ctor: 'RAxis', _0: a};
};
var _gicentre$elm_vega$VegaLite$reAxis = _gicentre$elm_vega$VegaLite$RAxis;
var _gicentre$elm_vega$VegaLite$ScBinOrdinal = {ctor: 'ScBinOrdinal'};
var _gicentre$elm_vega$VegaLite$ScBinLinear = {ctor: 'ScBinLinear'};
var _gicentre$elm_vega$VegaLite$ScPoint = {ctor: 'ScPoint'};
var _gicentre$elm_vega$VegaLite$ScBand = {ctor: 'ScBand'};
var _gicentre$elm_vega$VegaLite$ScOrdinal = {ctor: 'ScOrdinal'};
var _gicentre$elm_vega$VegaLite$ScSequential = {ctor: 'ScSequential'};
var _gicentre$elm_vega$VegaLite$ScUtc = {ctor: 'ScUtc'};
var _gicentre$elm_vega$VegaLite$ScTime = {ctor: 'ScTime'};
var _gicentre$elm_vega$VegaLite$ScLog = {ctor: 'ScLog'};
var _gicentre$elm_vega$VegaLite$ScSqrt = {ctor: 'ScSqrt'};
var _gicentre$elm_vega$VegaLite$ScPow = {ctor: 'ScPow'};
var _gicentre$elm_vega$VegaLite$ScLinear = {ctor: 'ScLinear'};
var _gicentre$elm_vega$VegaLite$SCUseUnaggregatedDomain = function (a) {
	return {ctor: 'SCUseUnaggregatedDomain', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoUseUnaggregatedDomain = _gicentre$elm_vega$VegaLite$SCUseUnaggregatedDomain;
var _gicentre$elm_vega$VegaLite$SCTextXRangeStep = function (a) {
	return {ctor: 'SCTextXRangeStep', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoTextXRangeStep = _gicentre$elm_vega$VegaLite$SCTextXRangeStep;
var _gicentre$elm_vega$VegaLite$SCRound = function (a) {
	return {ctor: 'SCRound', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoRound = _gicentre$elm_vega$VegaLite$SCRound;
var _gicentre$elm_vega$VegaLite$SCRangeStep = function (a) {
	return {ctor: 'SCRangeStep', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoRangeStep = _gicentre$elm_vega$VegaLite$SCRangeStep;
var _gicentre$elm_vega$VegaLite$SCPointPadding = function (a) {
	return {ctor: 'SCPointPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoPointPadding = _gicentre$elm_vega$VegaLite$SCPointPadding;
var _gicentre$elm_vega$VegaLite$SCMinStrokeWidth = function (a) {
	return {ctor: 'SCMinStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoMinStrokeWidth = _gicentre$elm_vega$VegaLite$SCMinStrokeWidth;
var _gicentre$elm_vega$VegaLite$SCMaxStrokeWidth = function (a) {
	return {ctor: 'SCMaxStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoMaxStrokeWidth = _gicentre$elm_vega$VegaLite$SCMaxStrokeWidth;
var _gicentre$elm_vega$VegaLite$SCMinSize = function (a) {
	return {ctor: 'SCMinSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoMinSize = _gicentre$elm_vega$VegaLite$SCMinSize;
var _gicentre$elm_vega$VegaLite$SCMaxSize = function (a) {
	return {ctor: 'SCMaxSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoMaxSize = _gicentre$elm_vega$VegaLite$SCMaxSize;
var _gicentre$elm_vega$VegaLite$SCMinOpacity = function (a) {
	return {ctor: 'SCMinOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoMinOpacity = _gicentre$elm_vega$VegaLite$SCMinOpacity;
var _gicentre$elm_vega$VegaLite$SCMaxOpacity = function (a) {
	return {ctor: 'SCMaxOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoMaxOpacity = _gicentre$elm_vega$VegaLite$SCMaxOpacity;
var _gicentre$elm_vega$VegaLite$SCMinFontSize = function (a) {
	return {ctor: 'SCMinFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoMinFontSize = _gicentre$elm_vega$VegaLite$SCMinFontSize;
var _gicentre$elm_vega$VegaLite$SCMaxFontSize = function (a) {
	return {ctor: 'SCMaxFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoMaxFontSize = _gicentre$elm_vega$VegaLite$SCMaxFontSize;
var _gicentre$elm_vega$VegaLite$SCMinBandSize = function (a) {
	return {ctor: 'SCMinBandSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoMinBandSize = _gicentre$elm_vega$VegaLite$SCMinBandSize;
var _gicentre$elm_vega$VegaLite$SCMaxBandSize = function (a) {
	return {ctor: 'SCMaxBandSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoMaxBandSize = _gicentre$elm_vega$VegaLite$SCMaxBandSize;
var _gicentre$elm_vega$VegaLite$SCClamp = function (a) {
	return {ctor: 'SCClamp', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoClamp = _gicentre$elm_vega$VegaLite$SCClamp;
var _gicentre$elm_vega$VegaLite$SCBandPaddingOuter = function (a) {
	return {ctor: 'SCBandPaddingOuter', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoBandPaddingOuter = _gicentre$elm_vega$VegaLite$SCBandPaddingOuter;
var _gicentre$elm_vega$VegaLite$SCBandPaddingInner = function (a) {
	return {ctor: 'SCBandPaddingInner', _0: a};
};
var _gicentre$elm_vega$VegaLite$sacoBandPaddingInner = _gicentre$elm_vega$VegaLite$SCBandPaddingInner;
var _gicentre$elm_vega$VegaLite$Unaggregated = {ctor: 'Unaggregated'};
var _gicentre$elm_vega$VegaLite$DSelection = function (a) {
	return {ctor: 'DSelection', _0: a};
};
var _gicentre$elm_vega$VegaLite$doSelection = _gicentre$elm_vega$VegaLite$DSelection;
var _gicentre$elm_vega$VegaLite$DDateTimes = function (a) {
	return {ctor: 'DDateTimes', _0: a};
};
var _gicentre$elm_vega$VegaLite$doDts = _gicentre$elm_vega$VegaLite$DDateTimes;
var _gicentre$elm_vega$VegaLite$DStrings = function (a) {
	return {ctor: 'DStrings', _0: a};
};
var _gicentre$elm_vega$VegaLite$doStrs = _gicentre$elm_vega$VegaLite$DStrings;
var _gicentre$elm_vega$VegaLite$DNumbers = function (a) {
	return {ctor: 'DNumbers', _0: a};
};
var _gicentre$elm_vega$VegaLite$doNums = _gicentre$elm_vega$VegaLite$DNumbers;
var _gicentre$elm_vega$VegaLite$NTickCount = function (a) {
	return {ctor: 'NTickCount', _0: a};
};
var _gicentre$elm_vega$VegaLite$scNiceTickCount = _gicentre$elm_vega$VegaLite$NTickCount;
var _gicentre$elm_vega$VegaLite$NInterval = F2(
	function (a, b) {
		return {ctor: 'NInterval', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$scNiceInterval = _gicentre$elm_vega$VegaLite$NInterval;
var _gicentre$elm_vega$VegaLite$NFalse = {ctor: 'NFalse'};
var _gicentre$elm_vega$VegaLite$NTrue = {ctor: 'NTrue'};
var _gicentre$elm_vega$VegaLite$NYear = {ctor: 'NYear'};
var _gicentre$elm_vega$VegaLite$NMonth = {ctor: 'NMonth'};
var _gicentre$elm_vega$VegaLite$NWeek = {ctor: 'NWeek'};
var _gicentre$elm_vega$VegaLite$NDay = {ctor: 'NDay'};
var _gicentre$elm_vega$VegaLite$NHour = {ctor: 'NHour'};
var _gicentre$elm_vega$VegaLite$NMinute = {ctor: 'NMinute'};
var _gicentre$elm_vega$VegaLite$NSecond = {ctor: 'NSecond'};
var _gicentre$elm_vega$VegaLite$NMillisecond = {ctor: 'NMillisecond'};
var _gicentre$elm_vega$VegaLite$SReverse = function (a) {
	return {ctor: 'SReverse', _0: a};
};
var _gicentre$elm_vega$VegaLite$scReverse = _gicentre$elm_vega$VegaLite$SReverse;
var _gicentre$elm_vega$VegaLite$SZero = function (a) {
	return {ctor: 'SZero', _0: a};
};
var _gicentre$elm_vega$VegaLite$scZero = _gicentre$elm_vega$VegaLite$SZero;
var _gicentre$elm_vega$VegaLite$SNice = function (a) {
	return {ctor: 'SNice', _0: a};
};
var _gicentre$elm_vega$VegaLite$scNice = _gicentre$elm_vega$VegaLite$SNice;
var _gicentre$elm_vega$VegaLite$SInterpolate = function (a) {
	return {ctor: 'SInterpolate', _0: a};
};
var _gicentre$elm_vega$VegaLite$scInterpolate = _gicentre$elm_vega$VegaLite$SInterpolate;
var _gicentre$elm_vega$VegaLite$SClamp = function (a) {
	return {ctor: 'SClamp', _0: a};
};
var _gicentre$elm_vega$VegaLite$scClamp = _gicentre$elm_vega$VegaLite$SClamp;
var _gicentre$elm_vega$VegaLite$SRound = function (a) {
	return {ctor: 'SRound', _0: a};
};
var _gicentre$elm_vega$VegaLite$scRound = _gicentre$elm_vega$VegaLite$SRound;
var _gicentre$elm_vega$VegaLite$SRangeStep = function (a) {
	return {ctor: 'SRangeStep', _0: a};
};
var _gicentre$elm_vega$VegaLite$scRangeStep = _gicentre$elm_vega$VegaLite$SRangeStep;
var _gicentre$elm_vega$VegaLite$SPaddingOuter = function (a) {
	return {ctor: 'SPaddingOuter', _0: a};
};
var _gicentre$elm_vega$VegaLite$scPaddingOuter = _gicentre$elm_vega$VegaLite$SPaddingOuter;
var _gicentre$elm_vega$VegaLite$SPaddingInner = function (a) {
	return {ctor: 'SPaddingInner', _0: a};
};
var _gicentre$elm_vega$VegaLite$scPaddingInner = _gicentre$elm_vega$VegaLite$SPaddingInner;
var _gicentre$elm_vega$VegaLite$SPadding = function (a) {
	return {ctor: 'SPadding', _0: a};
};
var _gicentre$elm_vega$VegaLite$scPadding = _gicentre$elm_vega$VegaLite$SPadding;
var _gicentre$elm_vega$VegaLite$SScheme = F2(
	function (a, b) {
		return {ctor: 'SScheme', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$scScheme = function (name) {
	return _gicentre$elm_vega$VegaLite$SScheme(name);
};
var _gicentre$elm_vega$VegaLite$SRange = function (a) {
	return {ctor: 'SRange', _0: a};
};
var _gicentre$elm_vega$VegaLite$scRange = _gicentre$elm_vega$VegaLite$SRange;
var _gicentre$elm_vega$VegaLite$SDomain = function (a) {
	return {ctor: 'SDomain', _0: a};
};
var _gicentre$elm_vega$VegaLite$scDomain = _gicentre$elm_vega$VegaLite$SDomain;
var _gicentre$elm_vega$VegaLite$SType = function (a) {
	return {ctor: 'SType', _0: a};
};
var _gicentre$elm_vega$VegaLite$scType = _gicentre$elm_vega$VegaLite$SType;
var _gicentre$elm_vega$VegaLite$RName = function (a) {
	return {ctor: 'RName', _0: a};
};
var _gicentre$elm_vega$VegaLite$raName = _gicentre$elm_vega$VegaLite$RName;
var _gicentre$elm_vega$VegaLite$RStrings = function (a) {
	return {ctor: 'RStrings', _0: a};
};
var _gicentre$elm_vega$VegaLite$categoricalDomainMap = function (scaleDomainPairs) {
	var _p147 = _elm_lang$core$List$unzip(scaleDomainPairs);
	var domain = _p147._0;
	var range = _p147._1;
	return {
		ctor: '::',
		_0: _gicentre$elm_vega$VegaLite$SDomain(
			_gicentre$elm_vega$VegaLite$DStrings(domain)),
		_1: {
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$SRange(
				_gicentre$elm_vega$VegaLite$RStrings(range)),
			_1: {ctor: '[]'}
		}
	};
};
var _gicentre$elm_vega$VegaLite$domainRangeMap = F2(
	function (lowerMap, upperMap) {
		var _p148 = _elm_lang$core$List$unzip(
			{
				ctor: '::',
				_0: lowerMap,
				_1: {
					ctor: '::',
					_0: upperMap,
					_1: {ctor: '[]'}
				}
			});
		var domain = _p148._0;
		var range = _p148._1;
		return {
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$SDomain(
				_gicentre$elm_vega$VegaLite$DNumbers(domain)),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$SRange(
					_gicentre$elm_vega$VegaLite$RStrings(range)),
				_1: {ctor: '[]'}
			}
		};
	});
var _gicentre$elm_vega$VegaLite$raStrs = _gicentre$elm_vega$VegaLite$RStrings;
var _gicentre$elm_vega$VegaLite$RNumbers = function (a) {
	return {ctor: 'RNumbers', _0: a};
};
var _gicentre$elm_vega$VegaLite$raNums = _gicentre$elm_vega$VegaLite$RNumbers;
var _gicentre$elm_vega$VegaLite$Interval = {ctor: 'Interval'};
var _gicentre$elm_vega$VegaLite$Multi = {ctor: 'Multi'};
var _gicentre$elm_vega$VegaLite$Single = {ctor: 'Single'};
var _gicentre$elm_vega$VegaLite$SMStrokeDashOffset = function (a) {
	return {ctor: 'SMStrokeDashOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$smStrokeDashOffset = _gicentre$elm_vega$VegaLite$SMStrokeDashOffset;
var _gicentre$elm_vega$VegaLite$SMStrokeDash = function (a) {
	return {ctor: 'SMStrokeDash', _0: a};
};
var _gicentre$elm_vega$VegaLite$smStrokeDash = _gicentre$elm_vega$VegaLite$SMStrokeDash;
var _gicentre$elm_vega$VegaLite$SMStrokeWidth = function (a) {
	return {ctor: 'SMStrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$smStrokeWidth = _gicentre$elm_vega$VegaLite$SMStrokeWidth;
var _gicentre$elm_vega$VegaLite$SMStrokeOpacity = function (a) {
	return {ctor: 'SMStrokeOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$smStrokeOpacity = _gicentre$elm_vega$VegaLite$SMStrokeOpacity;
var _gicentre$elm_vega$VegaLite$SMStroke = function (a) {
	return {ctor: 'SMStroke', _0: a};
};
var _gicentre$elm_vega$VegaLite$smStroke = _gicentre$elm_vega$VegaLite$SMStroke;
var _gicentre$elm_vega$VegaLite$SMFillOpacity = function (a) {
	return {ctor: 'SMFillOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$smFillOpacity = _gicentre$elm_vega$VegaLite$SMFillOpacity;
var _gicentre$elm_vega$VegaLite$SMFill = function (a) {
	return {ctor: 'SMFill', _0: a};
};
var _gicentre$elm_vega$VegaLite$smFill = _gicentre$elm_vega$VegaLite$SMFill;
var _gicentre$elm_vega$VegaLite$Toggle = function (a) {
	return {ctor: 'Toggle', _0: a};
};
var _gicentre$elm_vega$VegaLite$seToggle = _gicentre$elm_vega$VegaLite$Toggle;
var _gicentre$elm_vega$VegaLite$Nearest = function (a) {
	return {ctor: 'Nearest', _0: a};
};
var _gicentre$elm_vega$VegaLite$seNearest = _gicentre$elm_vega$VegaLite$Nearest;
var _gicentre$elm_vega$VegaLite$Bind = function (a) {
	return {ctor: 'Bind', _0: a};
};
var _gicentre$elm_vega$VegaLite$seBind = _gicentre$elm_vega$VegaLite$Bind;
var _gicentre$elm_vega$VegaLite$SelectionMark = function (a) {
	return {ctor: 'SelectionMark', _0: a};
};
var _gicentre$elm_vega$VegaLite$seSelectionMark = _gicentre$elm_vega$VegaLite$SelectionMark;
var _gicentre$elm_vega$VegaLite$ResolveSelections = function (a) {
	return {ctor: 'ResolveSelections', _0: a};
};
var _gicentre$elm_vega$VegaLite$seResolve = _gicentre$elm_vega$VegaLite$ResolveSelections;
var _gicentre$elm_vega$VegaLite$Encodings = function (a) {
	return {ctor: 'Encodings', _0: a};
};
var _gicentre$elm_vega$VegaLite$seEncodings = _gicentre$elm_vega$VegaLite$Encodings;
var _gicentre$elm_vega$VegaLite$Fields = function (a) {
	return {ctor: 'Fields', _0: a};
};
var _gicentre$elm_vega$VegaLite$seFields = _gicentre$elm_vega$VegaLite$Fields;
var _gicentre$elm_vega$VegaLite$Zoom = function (a) {
	return {ctor: 'Zoom', _0: a};
};
var _gicentre$elm_vega$VegaLite$seZoom = _gicentre$elm_vega$VegaLite$Zoom;
var _gicentre$elm_vega$VegaLite$Translate = function (a) {
	return {ctor: 'Translate', _0: a};
};
var _gicentre$elm_vega$VegaLite$seTranslate = _gicentre$elm_vega$VegaLite$Translate;
var _gicentre$elm_vega$VegaLite$On = function (a) {
	return {ctor: 'On', _0: a};
};
var _gicentre$elm_vega$VegaLite$seOn = _gicentre$elm_vega$VegaLite$On;
var _gicentre$elm_vega$VegaLite$BindScales = {ctor: 'BindScales'};
var _gicentre$elm_vega$VegaLite$Empty = {ctor: 'Empty'};
var _gicentre$elm_vega$VegaLite$Intersection = {ctor: 'Intersection'};
var _gicentre$elm_vega$VegaLite$Union = {ctor: 'Union'};
var _gicentre$elm_vega$VegaLite$Global = {ctor: 'Global'};
var _gicentre$elm_vega$VegaLite$SRight = {ctor: 'SRight'};
var _gicentre$elm_vega$VegaLite$SLeft = {ctor: 'SLeft'};
var _gicentre$elm_vega$VegaLite$SBottom = {ctor: 'SBottom'};
var _gicentre$elm_vega$VegaLite$STop = {ctor: 'STop'};
var _gicentre$elm_vega$VegaLite$ByFieldOp = F2(
	function (a, b) {
		return {ctor: 'ByFieldOp', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$soByField = _gicentre$elm_vega$VegaLite$ByFieldOp;
var _gicentre$elm_vega$VegaLite$ByRepeatOp = F2(
	function (a, b) {
		return {ctor: 'ByRepeatOp', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$soByRepeat = _gicentre$elm_vega$VegaLite$ByRepeatOp;
var _gicentre$elm_vega$VegaLite$CustomSort = function (a) {
	return {ctor: 'CustomSort', _0: a};
};
var _gicentre$elm_vega$VegaLite$soCustom = _gicentre$elm_vega$VegaLite$CustomSort;
var _gicentre$elm_vega$VegaLite$Descending = {ctor: 'Descending'};
var _gicentre$elm_vega$VegaLite$Ascending = {ctor: 'Ascending'};
var _gicentre$elm_vega$VegaLite$NoStack = {ctor: 'NoStack'};
var _gicentre$elm_vega$VegaLite$StCenter = {ctor: 'StCenter'};
var _gicentre$elm_vega$VegaLite$StNormalize = {ctor: 'StNormalize'};
var _gicentre$elm_vega$VegaLite$StZero = {ctor: 'StZero'};
var _gicentre$elm_vega$VegaLite$CSquare = {ctor: 'CSquare'};
var _gicentre$elm_vega$VegaLite$CRound = {ctor: 'CRound'};
var _gicentre$elm_vega$VegaLite$CButt = {ctor: 'CButt'};
var _gicentre$elm_vega$VegaLite$JBevel = {ctor: 'JBevel'};
var _gicentre$elm_vega$VegaLite$JRound = {ctor: 'JRound'};
var _gicentre$elm_vega$VegaLite$JMiter = {ctor: 'JMiter'};
var _gicentre$elm_vega$VegaLite$Path = function (a) {
	return {ctor: 'Path', _0: a};
};
var _gicentre$elm_vega$VegaLite$symbolPath = _gicentre$elm_vega$VegaLite$Path;
var _gicentre$elm_vega$VegaLite$TriangleDown = {ctor: 'TriangleDown'};
var _gicentre$elm_vega$VegaLite$TriangleUp = {ctor: 'TriangleUp'};
var _gicentre$elm_vega$VegaLite$Diamond = {ctor: 'Diamond'};
var _gicentre$elm_vega$VegaLite$Cross = {ctor: 'Cross'};
var _gicentre$elm_vega$VegaLite$SymSquare = {ctor: 'SymSquare'};
var _gicentre$elm_vega$VegaLite$SymCircle = {ctor: 'SymCircle'};
var _gicentre$elm_vega$VegaLite$ExIqrScale = function (a) {
	return {ctor: 'ExIqrScale', _0: a};
};
var _gicentre$elm_vega$VegaLite$iqrScale = _gicentre$elm_vega$VegaLite$ExIqrScale;
var _gicentre$elm_vega$VegaLite$ExRange = {ctor: 'ExRange'};
var _gicentre$elm_vega$VegaLite$ExIqr = {ctor: 'ExIqr'};
var _gicentre$elm_vega$VegaLite$ExStdev = {ctor: 'ExStdev'};
var _gicentre$elm_vega$VegaLite$ExStderr = {ctor: 'ExStderr'};
var _gicentre$elm_vega$VegaLite$ExCI = {ctor: 'ExCI'};
var _gicentre$elm_vega$VegaLite$TFormat = function (a) {
	return {ctor: 'TFormat', _0: a};
};
var _gicentre$elm_vega$VegaLite$tFormat = _gicentre$elm_vega$VegaLite$TFormat;
var _gicentre$elm_vega$VegaLite$TDataCondition = F2(
	function (a, b) {
		return {ctor: 'TDataCondition', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$tDataCondition = _gicentre$elm_vega$VegaLite$TDataCondition;
var _gicentre$elm_vega$VegaLite$TSelectionCondition = F3(
	function (a, b, c) {
		return {ctor: 'TSelectionCondition', _0: a, _1: b, _2: c};
	});
var _gicentre$elm_vega$VegaLite$tSelectionCondition = _gicentre$elm_vega$VegaLite$TSelectionCondition;
var _gicentre$elm_vega$VegaLite$TTitle = function (a) {
	return {ctor: 'TTitle', _0: a};
};
var _gicentre$elm_vega$VegaLite$tTitle = _gicentre$elm_vega$VegaLite$TTitle;
var _gicentre$elm_vega$VegaLite$TTimeUnit = function (a) {
	return {ctor: 'TTimeUnit', _0: a};
};
var _gicentre$elm_vega$VegaLite$tTimeUnit = _gicentre$elm_vega$VegaLite$TTimeUnit;
var _gicentre$elm_vega$VegaLite$TAggregate = function (a) {
	return {ctor: 'TAggregate', _0: a};
};
var _gicentre$elm_vega$VegaLite$tAggregate = _gicentre$elm_vega$VegaLite$TAggregate;
var _gicentre$elm_vega$VegaLite$TBin = function (a) {
	return {ctor: 'TBin', _0: a};
};
var _gicentre$elm_vega$VegaLite$tBin = _gicentre$elm_vega$VegaLite$TBin;
var _gicentre$elm_vega$VegaLite$TmType = function (a) {
	return {ctor: 'TmType', _0: a};
};
var _gicentre$elm_vega$VegaLite$tMType = _gicentre$elm_vega$VegaLite$TmType;
var _gicentre$elm_vega$VegaLite$TRepeat = function (a) {
	return {ctor: 'TRepeat', _0: a};
};
var _gicentre$elm_vega$VegaLite$tRepeat = _gicentre$elm_vega$VegaLite$TRepeat;
var _gicentre$elm_vega$VegaLite$TName = function (a) {
	return {ctor: 'TName', _0: a};
};
var _gicentre$elm_vega$VegaLite$tName = _gicentre$elm_vega$VegaLite$TName;
var _gicentre$elm_vega$VegaLite$Utc = function (a) {
	return {ctor: 'Utc', _0: a};
};
var _gicentre$elm_vega$VegaLite$utc = function (tu) {
	return _gicentre$elm_vega$VegaLite$Utc(tu);
};
var _gicentre$elm_vega$VegaLite$Milliseconds = {ctor: 'Milliseconds'};
var _gicentre$elm_vega$VegaLite$SecondsMilliseconds = {ctor: 'SecondsMilliseconds'};
var _gicentre$elm_vega$VegaLite$Seconds = {ctor: 'Seconds'};
var _gicentre$elm_vega$VegaLite$MinutesSeconds = {ctor: 'MinutesSeconds'};
var _gicentre$elm_vega$VegaLite$Minutes = {ctor: 'Minutes'};
var _gicentre$elm_vega$VegaLite$HoursMinutesSeconds = {ctor: 'HoursMinutesSeconds'};
var _gicentre$elm_vega$VegaLite$HoursMinutes = {ctor: 'HoursMinutes'};
var _gicentre$elm_vega$VegaLite$Hours = {ctor: 'Hours'};
var _gicentre$elm_vega$VegaLite$Day = {ctor: 'Day'};
var _gicentre$elm_vega$VegaLite$Date = {ctor: 'Date'};
var _gicentre$elm_vega$VegaLite$MonthDate = {ctor: 'MonthDate'};
var _gicentre$elm_vega$VegaLite$Month = {ctor: 'Month'};
var _gicentre$elm_vega$VegaLite$QuarterMonth = {ctor: 'QuarterMonth'};
var _gicentre$elm_vega$VegaLite$Quarter = {ctor: 'Quarter'};
var _gicentre$elm_vega$VegaLite$YearMonthDateHoursMinutesSeconds = {ctor: 'YearMonthDateHoursMinutesSeconds'};
var _gicentre$elm_vega$VegaLite$YearMonthDateHoursMinutes = {ctor: 'YearMonthDateHoursMinutes'};
var _gicentre$elm_vega$VegaLite$YearMonthDateHours = {ctor: 'YearMonthDateHours'};
var _gicentre$elm_vega$VegaLite$YearMonthDate = {ctor: 'YearMonthDate'};
var _gicentre$elm_vega$VegaLite$YearMonth = {ctor: 'YearMonth'};
var _gicentre$elm_vega$VegaLite$YearQuarterMonth = {ctor: 'YearQuarterMonth'};
var _gicentre$elm_vega$VegaLite$YearQuarter = {ctor: 'YearQuarter'};
var _gicentre$elm_vega$VegaLite$Year = {ctor: 'Year'};
var _gicentre$elm_vega$VegaLite$TOrient = function (a) {
	return {ctor: 'TOrient', _0: a};
};
var _gicentre$elm_vega$VegaLite$ticoOrient = _gicentre$elm_vega$VegaLite$TOrient;
var _gicentre$elm_vega$VegaLite$TOffset = function (a) {
	return {ctor: 'TOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$ticoOffset = _gicentre$elm_vega$VegaLite$TOffset;
var _gicentre$elm_vega$VegaLite$TLimit = function (a) {
	return {ctor: 'TLimit', _0: a};
};
var _gicentre$elm_vega$VegaLite$ticoLimit = _gicentre$elm_vega$VegaLite$TLimit;
var _gicentre$elm_vega$VegaLite$TFontWeight = function (a) {
	return {ctor: 'TFontWeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$ticoFontWeight = _gicentre$elm_vega$VegaLite$TFontWeight;
var _gicentre$elm_vega$VegaLite$TFontSize = function (a) {
	return {ctor: 'TFontSize', _0: a};
};
var _gicentre$elm_vega$VegaLite$ticoFontSize = _gicentre$elm_vega$VegaLite$TFontSize;
var _gicentre$elm_vega$VegaLite$TFont = function (a) {
	return {ctor: 'TFont', _0: a};
};
var _gicentre$elm_vega$VegaLite$ticoFont = _gicentre$elm_vega$VegaLite$TFont;
var _gicentre$elm_vega$VegaLite$TColor = function (a) {
	return {ctor: 'TColor', _0: a};
};
var _gicentre$elm_vega$VegaLite$ticoColor = _gicentre$elm_vega$VegaLite$TColor;
var _gicentre$elm_vega$VegaLite$TBaseline = function (a) {
	return {ctor: 'TBaseline', _0: a};
};
var _gicentre$elm_vega$VegaLite$ticoBaseline = _gicentre$elm_vega$VegaLite$TBaseline;
var _gicentre$elm_vega$VegaLite$TAngle = function (a) {
	return {ctor: 'TAngle', _0: a};
};
var _gicentre$elm_vega$VegaLite$ticoAngle = _gicentre$elm_vega$VegaLite$TAngle;
var _gicentre$elm_vega$VegaLite$TAnchor = function (a) {
	return {ctor: 'TAnchor', _0: a};
};
var _gicentre$elm_vega$VegaLite$ticoAnchor = _gicentre$elm_vega$VegaLite$TAnchor;
var _gicentre$elm_vega$VegaLite$AlignBottom = {ctor: 'AlignBottom'};
var _gicentre$elm_vega$VegaLite$AlignMiddle = {ctor: 'AlignMiddle'};
var _gicentre$elm_vega$VegaLite$AlignTop = {ctor: 'AlignTop'};
var _gicentre$elm_vega$VegaLite$StrokeDashOffset = function (a) {
	return {ctor: 'StrokeDashOffset', _0: a};
};
var _gicentre$elm_vega$VegaLite$vicoStrokeDashOffset = _gicentre$elm_vega$VegaLite$StrokeDashOffset;
var _gicentre$elm_vega$VegaLite$StrokeDash = function (a) {
	return {ctor: 'StrokeDash', _0: a};
};
var _gicentre$elm_vega$VegaLite$vicoStrokeDash = _gicentre$elm_vega$VegaLite$StrokeDash;
var _gicentre$elm_vega$VegaLite$StrokeWidth = function (a) {
	return {ctor: 'StrokeWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$vicoStrokeWidth = _gicentre$elm_vega$VegaLite$StrokeWidth;
var _gicentre$elm_vega$VegaLite$StrokeOpacity = function (a) {
	return {ctor: 'StrokeOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$vicoStrokeOpacity = _gicentre$elm_vega$VegaLite$StrokeOpacity;
var _gicentre$elm_vega$VegaLite$Stroke = function (a) {
	return {ctor: 'Stroke', _0: a};
};
var _gicentre$elm_vega$VegaLite$vicoStroke = _gicentre$elm_vega$VegaLite$Stroke;
var _gicentre$elm_vega$VegaLite$FillOpacity = function (a) {
	return {ctor: 'FillOpacity', _0: a};
};
var _gicentre$elm_vega$VegaLite$vicoFillOpacity = _gicentre$elm_vega$VegaLite$FillOpacity;
var _gicentre$elm_vega$VegaLite$Fill = function (a) {
	return {ctor: 'Fill', _0: a};
};
var _gicentre$elm_vega$VegaLite$vicoFill = _gicentre$elm_vega$VegaLite$Fill;
var _gicentre$elm_vega$VegaLite$Clip = function (a) {
	return {ctor: 'Clip', _0: a};
};
var _gicentre$elm_vega$VegaLite$vicoClip = _gicentre$elm_vega$VegaLite$Clip;
var _gicentre$elm_vega$VegaLite$ViewHeight = function (a) {
	return {ctor: 'ViewHeight', _0: a};
};
var _gicentre$elm_vega$VegaLite$vicoHeight = _gicentre$elm_vega$VegaLite$ViewHeight;
var _gicentre$elm_vega$VegaLite$ViewWidth = function (a) {
	return {ctor: 'ViewWidth', _0: a};
};
var _gicentre$elm_vega$VegaLite$vicoWidth = _gicentre$elm_vega$VegaLite$ViewWidth;
var _gicentre$elm_vega$VegaLite$VLSelection = {ctor: 'VLSelection'};
var _gicentre$elm_vega$VegaLite$selection = function (sels) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLSelection,
		_1: _elm_lang$core$Json_Encode$object(sels)
	};
};
var _gicentre$elm_vega$VegaLite$VLConfig = {ctor: 'VLConfig'};
var _gicentre$elm_vega$VegaLite$configure = function (configs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLConfig,
		_1: _elm_lang$core$Json_Encode$object(configs)
	};
};
var _gicentre$elm_vega$VegaLite$VLCenter = {ctor: 'VLCenter'};
var _gicentre$elm_vega$VegaLite$center = function (c) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLCenter,
		_1: _elm_lang$core$Json_Encode$bool(c)
	};
};
var _gicentre$elm_vega$VegaLite$centerRC = F2(
	function (cRow, cCol) {
		return {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLCenter,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'row',
						_1: _elm_lang$core$Json_Encode$bool(cRow)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'col',
							_1: _elm_lang$core$Json_Encode$bool(cCol)
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$VLBounds = {ctor: 'VLBounds'};
var _gicentre$elm_vega$VegaLite$bounds = function (bnds) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLBounds,
		_1: _gicentre$elm_vega$VegaLite$boundsSpec(bnds)
	};
};
var _gicentre$elm_vega$VegaLite$VLAlign = {ctor: 'VLAlign'};
var _gicentre$elm_vega$VegaLite$align = function (algn) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLAlign,
		_1: _gicentre$elm_vega$VegaLite$compositionAlignmentSpec(algn)
	};
};
var _gicentre$elm_vega$VegaLite$VLSpacing = {ctor: 'VLSpacing'};
var _gicentre$elm_vega$VegaLite$alignRC = F2(
	function (alRow, alCol) {
		return {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLSpacing,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'row',
						_1: _gicentre$elm_vega$VegaLite$compositionAlignmentSpec(alRow)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'col',
							_1: _gicentre$elm_vega$VegaLite$compositionAlignmentSpec(alCol)
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$spacing = function (sp) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLSpacing,
		_1: _elm_lang$core$Json_Encode$float(sp)
	};
};
var _gicentre$elm_vega$VegaLite$spacingRC = F2(
	function (spRow, spCol) {
		return {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLSpacing,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'row',
						_1: _elm_lang$core$Json_Encode$float(spRow)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'col',
							_1: _elm_lang$core$Json_Encode$float(spCol)
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$VLResolve = {ctor: 'VLResolve'};
var _gicentre$elm_vega$VegaLite$resolve = function (res) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLResolve,
		_1: _elm_lang$core$Json_Encode$object(res)
	};
};
var _gicentre$elm_vega$VegaLite$VLSpec = {ctor: 'VLSpec'};
var _gicentre$elm_vega$VegaLite$specification = function (spec) {
	return {ctor: '_Tuple2', _0: _gicentre$elm_vega$VegaLite$VLSpec, _1: spec};
};
var _gicentre$elm_vega$VegaLite$VLFacet = {ctor: 'VLFacet'};
var _gicentre$elm_vega$VegaLite$facet = function (fMaps) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLFacet,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$facetMappingProperty, fMaps))
	};
};
var _gicentre$elm_vega$VegaLite$VLRepeat = {ctor: 'VLRepeat'};
var _gicentre$elm_vega$VegaLite$repeat = function (fields) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLRepeat,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$repeatFieldsProperty, fields))
	};
};
var _gicentre$elm_vega$VegaLite$VLVConcat = {ctor: 'VLVConcat'};
var _gicentre$elm_vega$VegaLite$vConcat = function (specs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLVConcat,
		_1: _elm_lang$core$Json_Encode$list(specs)
	};
};
var _gicentre$elm_vega$VegaLite$VLHConcat = {ctor: 'VLHConcat'};
var _gicentre$elm_vega$VegaLite$hConcat = function (specs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLHConcat,
		_1: _elm_lang$core$Json_Encode$list(specs)
	};
};
var _gicentre$elm_vega$VegaLite$VLLayer = {ctor: 'VLLayer'};
var _gicentre$elm_vega$VegaLite$layer = function (specs) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLLayer,
		_1: _elm_lang$core$Json_Encode$list(specs)
	};
};
var _gicentre$elm_vega$VegaLite$VLEncoding = {ctor: 'VLEncoding'};
var _gicentre$elm_vega$VegaLite$encoding = function (channels) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLEncoding,
		_1: _elm_lang$core$Json_Encode$object(channels)
	};
};
var _gicentre$elm_vega$VegaLite$VLProjection = {ctor: 'VLProjection'};
var _gicentre$elm_vega$VegaLite$projection = function (pProps) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLProjection,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$projectionProperty, pProps))
	};
};
var _gicentre$elm_vega$VegaLite$VLTransform = {ctor: 'VLTransform'};
var _gicentre$elm_vega$VegaLite$transform = function (transforms) {
	var assemble = function (_p149) {
		var _p150 = _p149;
		var _p165 = _p150._1;
		var _p164 = _p150._0;
		var _p151 = _p164;
		switch (_p151) {
			case 'aggregate':
				var _p152 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p165));
				if ((((_p152.ctor === 'Ok') && (_p152._0.ctor === '::')) && (_p152._0._1.ctor === '::')) && (_p152._0._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'aggregate', _1: _p152._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'groupby', _1: _p152._0._1._0},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'bin':
				var _p153 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p165));
				if (((((_p153.ctor === 'Ok') && (_p153._0.ctor === '::')) && (_p153._0._1.ctor === '::')) && (_p153._0._1._1.ctor === '::')) && (_p153._0._1._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'bin', _1: _p153._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'field', _1: _p153._0._1._0},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'as', _1: _p153._0._1._1._0},
									_1: {ctor: '[]'}
								}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'calculate':
				var _p154 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p165));
				if ((((_p154.ctor === 'Ok') && (_p154._0.ctor === '::')) && (_p154._0._1.ctor === '::')) && (_p154._0._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'calculate', _1: _p154._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'as', _1: _p154._0._1._0},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'lookup':
				var _p155 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p165));
				if ((((((_p155.ctor === 'Ok') && (_p155._0.ctor === '::')) && (_p155._0._1.ctor === '::')) && (_p155._0._1._1.ctor === '::')) && (_p155._0._1._1._1.ctor === '::')) && (_p155._0._1._1._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'lookup', _1: _p155._0._0},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'from',
									_1: _elm_lang$core$Json_Encode$object(
										{
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'data', _1: _p155._0._1._0},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'key', _1: _p155._0._1._1._0},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'fields', _1: _p155._0._1._1._1._0},
													_1: {ctor: '[]'}
												}
											}
										})
								},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'lookupAs':
				var _p156 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p165));
				if ((((((_p156.ctor === 'Ok') && (_p156._0.ctor === '::')) && (_p156._0._1.ctor === '::')) && (_p156._0._1._1.ctor === '::')) && (_p156._0._1._1._1.ctor === '::')) && (_p156._0._1._1._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'lookup', _1: _p156._0._0},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'from',
									_1: _elm_lang$core$Json_Encode$object(
										{
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'data', _1: _p156._0._1._0},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'key', _1: _p156._0._1._1._0},
												_1: {ctor: '[]'}
											}
										})
								},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'as', _1: _p156._0._1._1._1._0},
									_1: {ctor: '[]'}
								}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'flattenAs':
				var _p157 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p165));
				if ((((_p157.ctor === 'Ok') && (_p157._0.ctor === '::')) && (_p157._0._1.ctor === '::')) && (_p157._0._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'flatten', _1: _p157._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'as', _1: _p157._0._1._0},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'timeUnit':
				var _p158 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p165));
				if (((((_p158.ctor === 'Ok') && (_p158._0.ctor === '::')) && (_p158._0._1.ctor === '::')) && (_p158._0._1._1.ctor === '::')) && (_p158._0._1._1._1.ctor === '[]')) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'timeUnit', _1: _p158._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'field', _1: _p158._0._1._0},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'as', _1: _p158._0._1._1._0},
									_1: {ctor: '[]'}
								}
							}
						});
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			case 'windowAs':
				var _p159 = A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value),
					A2(_elm_lang$core$Json_Encode$encode, 0, _p165));
				if (((((((_p159.ctor === 'Ok') && (_p159._0.ctor === '::')) && (_p159._0._1.ctor === '::')) && (_p159._0._1._1.ctor === '::')) && (_p159._0._1._1._1.ctor === '::')) && (_p159._0._1._1._1._1.ctor === '::')) && (_p159._0._1._1._1._1._1.ctor === '[]')) {
					var _p163 = _p159._0._1._1._1._1._0;
					var _p162 = _p159._0._1._1._0;
					var _p161 = _p159._0._1._1._1._0;
					var _p160 = _p159._0._1._0;
					return _elm_lang$core$Json_Encode$object(
						A2(
							_elm_lang$core$Basics_ops['++'],
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'window',
									_1: _elm_lang$core$Json_Encode$list(
										{
											ctor: '::',
											_0: _p159._0._0,
											_1: {ctor: '[]'}
										})
								},
								_1: {ctor: '[]'}
							},
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Native_Utils.eq(_p160, _elm_lang$core$Json_Encode$null) ? {ctor: '[]'} : {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'frame', _1: _p160},
									_1: {ctor: '[]'}
								},
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Native_Utils.eq(_p162, _elm_lang$core$Json_Encode$null) ? {ctor: '[]'} : {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'ignorePeers', _1: _p162},
										_1: {ctor: '[]'}
									},
									A2(
										_elm_lang$core$Basics_ops['++'],
										_elm_lang$core$Native_Utils.eq(_p161, _elm_lang$core$Json_Encode$null) ? {ctor: '[]'} : {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'groupby', _1: _p161},
											_1: {ctor: '[]'}
										},
										_elm_lang$core$Native_Utils.eq(_p163, _elm_lang$core$Json_Encode$null) ? {ctor: '[]'} : {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'sort', _1: _p163},
											_1: {ctor: '[]'}
										})))));
				} else {
					return _elm_lang$core$Json_Encode$null;
				}
			default:
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p164, _1: _p165},
						_1: {ctor: '[]'}
					});
		}
	};
	return _elm_lang$core$List$isEmpty(transforms) ? {ctor: '_Tuple2', _0: _gicentre$elm_vega$VegaLite$VLTransform, _1: _elm_lang$core$Json_Encode$null} : {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLTransform,
		_1: _elm_lang$core$Json_Encode$list(
			A2(_elm_lang$core$List$map, assemble, transforms))
	};
};
var _gicentre$elm_vega$VegaLite$VLMark = {ctor: 'VLMark'};
var _gicentre$elm_vega$VegaLite$mark = F2(
	function (mark, mProps) {
		var _p166 = mProps;
		if (_p166.ctor === '[]') {
			return {
				ctor: '_Tuple2',
				_0: _gicentre$elm_vega$VegaLite$VLMark,
				_1: _elm_lang$core$Json_Encode$string(
					_gicentre$elm_vega$VegaLite$markLabel(mark))
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: _gicentre$elm_vega$VegaLite$VLMark,
				_1: _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'type',
							_1: _elm_lang$core$Json_Encode$string(
								_gicentre$elm_vega$VegaLite$markLabel(mark))
						},
						_1: A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$markProperty, mProps)
					})
			};
		}
	});
var _gicentre$elm_vega$VegaLite$area = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Area);
var _gicentre$elm_vega$VegaLite$bar = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Bar);
var _gicentre$elm_vega$VegaLite$boxplot = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Boxplot);
var _gicentre$elm_vega$VegaLite$circle = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Circle);
var _gicentre$elm_vega$VegaLite$errorband = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Errorband);
var _gicentre$elm_vega$VegaLite$errorbar = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Errorbar);
var _gicentre$elm_vega$VegaLite$geoshape = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Geoshape);
var _gicentre$elm_vega$VegaLite$line = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Line);
var _gicentre$elm_vega$VegaLite$point = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Point);
var _gicentre$elm_vega$VegaLite$rect = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Rect);
var _gicentre$elm_vega$VegaLite$rule = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Rule);
var _gicentre$elm_vega$VegaLite$square = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Square);
var _gicentre$elm_vega$VegaLite$textMark = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Text);
var _gicentre$elm_vega$VegaLite$tick = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Tick);
var _gicentre$elm_vega$VegaLite$trail = _gicentre$elm_vega$VegaLite$mark(_gicentre$elm_vega$VegaLite$Trail);
var _gicentre$elm_vega$VegaLite$VLDatasets = {ctor: 'VLDatasets'};
var _gicentre$elm_vega$VegaLite$datasets = function (namedData) {
	var extract = function (data) {
		var _p167 = A2(
			_elm_lang$core$Json_Decode$decodeString,
			_elm_lang$core$Json_Decode$keyValuePairs(_elm_lang$core$Json_Decode$value),
			A2(_elm_lang$core$Json_Encode$encode, 0, data));
		if ((((_p167.ctor === 'Ok') && (_p167._0.ctor === '::')) && (_p167._0._0.ctor === '_Tuple2')) && (_p167._0._1.ctor === '[]')) {
			return _p167._0._0._1;
		} else {
			return data;
		}
	};
	var specs = A2(
		_elm_lang$core$List$map,
		function (_p168) {
			var _p169 = _p168;
			return {
				ctor: '_Tuple2',
				_0: _p169._0,
				_1: function (_p170) {
					var _p171 = _p170;
					return extract(_p171._1);
				}(_p169._1)
			};
		},
		namedData);
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLDatasets,
		_1: _elm_lang$core$Json_Encode$object(specs)
	};
};
var _gicentre$elm_vega$VegaLite$VLData = {ctor: 'VLData'};
var _gicentre$elm_vega$VegaLite$dataFromColumns = F2(
	function (fmts, cols) {
		var dataArray = _elm_lang$core$Json_Encode$list(
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Json_Encode$object,
				_gicentre$elm_vega$VegaLite$transpose(cols)));
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'values', _1: dataArray},
					_1: {ctor: '[]'}
				})
		} : {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
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
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$formatProperty, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$dataFromJson = F2(
	function (json, fmts) {
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'values', _1: json},
					_1: {ctor: '[]'}
				})
		} : {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'values', _1: json},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'format',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$formatProperty, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$dataFromRows = F2(
	function (fmts, rows) {
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
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
			_0: _gicentre$elm_vega$VegaLite$VLData,
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
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$formatProperty, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$dataFromSource = F2(
	function (sourceName, fmts) {
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'name',
						_1: _elm_lang$core$Json_Encode$string(sourceName)
					},
					_1: {ctor: '[]'}
				})
		} : {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
			_1: _elm_lang$core$Json_Encode$object(
				{
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'name',
						_1: _elm_lang$core$Json_Encode$string(sourceName)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'format',
							_1: _elm_lang$core$Json_Encode$object(
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$formatProperty, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$dataFromUrl = F2(
	function (url, fmts) {
		return _elm_lang$core$Native_Utils.eq(
			fmts,
			{ctor: '[]'}) ? {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
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
			_0: _gicentre$elm_vega$VegaLite$VLData,
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
								A2(_elm_lang$core$List$concatMap, _gicentre$elm_vega$VegaLite$formatProperty, fmts))
						},
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$dataName = F2(
	function (name, data) {
		var extract = function (d) {
			var _p172 = A2(
				_elm_lang$core$Json_Decode$decodeString,
				_elm_lang$core$Json_Decode$keyValuePairs(_elm_lang$core$Json_Decode$value),
				A2(_elm_lang$core$Json_Encode$encode, 0, d));
			if ((((_p172.ctor === 'Ok') && (_p172._0.ctor === '::')) && (_p172._0._0.ctor === '_Tuple2')) && (_p172._0._1.ctor === '[]')) {
				return {ctor: '_Tuple2', _0: _p172._0._0._0, _1: _p172._0._0._1};
			} else {
				return A2(
					_elm_lang$core$Debug$log,
					'Non-data spec provided to dataName',
					{ctor: '_Tuple2', _0: '', _1: d});
			}
		};
		var spec = function (_p173) {
			var _p174 = _p173;
			return extract(_p174._1);
		}(data);
		return {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$VegaLite$VLData,
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
						_0: spec,
						_1: {ctor: '[]'}
					}
				})
		};
	});
var _gicentre$elm_vega$VegaLite$VLBackground = {ctor: 'VLBackground'};
var _gicentre$elm_vega$VegaLite$background = function (colour) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLBackground,
		_1: _elm_lang$core$Json_Encode$string(colour)
	};
};
var _gicentre$elm_vega$VegaLite$VLPadding = {ctor: 'VLPadding'};
var _gicentre$elm_vega$VegaLite$padding = function (pad) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLPadding,
		_1: _gicentre$elm_vega$VegaLite$paddingSpec(pad)
	};
};
var _gicentre$elm_vega$VegaLite$VLAutosize = {ctor: 'VLAutosize'};
var _gicentre$elm_vega$VegaLite$autosize = function (aus) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLAutosize,
		_1: _elm_lang$core$Json_Encode$object(
			A2(_elm_lang$core$List$map, _gicentre$elm_vega$VegaLite$autosizeProperty, aus))
	};
};
var _gicentre$elm_vega$VegaLite$VLHeight = {ctor: 'VLHeight'};
var _gicentre$elm_vega$VegaLite$height = function (h) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLHeight,
		_1: _elm_lang$core$Json_Encode$float(h)
	};
};
var _gicentre$elm_vega$VegaLite$VLWidth = {ctor: 'VLWidth'};
var _gicentre$elm_vega$VegaLite$width = function (w) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLWidth,
		_1: _elm_lang$core$Json_Encode$float(w)
	};
};
var _gicentre$elm_vega$VegaLite$VLTitle = {ctor: 'VLTitle'};
var _gicentre$elm_vega$VegaLite$title = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLTitle,
		_1: _elm_lang$core$Json_Encode$string(s)
	};
};
var _gicentre$elm_vega$VegaLite$VLDescription = {ctor: 'VLDescription'};
var _gicentre$elm_vega$VegaLite$description = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLDescription,
		_1: _elm_lang$core$Json_Encode$string(s)
	};
};
var _gicentre$elm_vega$VegaLite$VLName = {ctor: 'VLName'};
var _gicentre$elm_vega$VegaLite$name = function (s) {
	return {
		ctor: '_Tuple2',
		_0: _gicentre$elm_vega$VegaLite$VLName,
		_1: _elm_lang$core$Json_Encode$string(s)
	};
};
var _gicentre$elm_vega$VegaLite$WField = function (a) {
	return {ctor: 'WField', _0: a};
};
var _gicentre$elm_vega$VegaLite$wiField = _gicentre$elm_vega$VegaLite$WField;
var _gicentre$elm_vega$VegaLite$WParam = function (a) {
	return {ctor: 'WParam', _0: a};
};
var _gicentre$elm_vega$VegaLite$wiParam = _gicentre$elm_vega$VegaLite$WParam;
var _gicentre$elm_vega$VegaLite$WOp = function (a) {
	return {ctor: 'WOp', _0: a};
};
var _gicentre$elm_vega$VegaLite$wiOp = _gicentre$elm_vega$VegaLite$WOp;
var _gicentre$elm_vega$VegaLite$WAggregateOp = function (a) {
	return {ctor: 'WAggregateOp', _0: a};
};
var _gicentre$elm_vega$VegaLite$wiAggregateOp = _gicentre$elm_vega$VegaLite$WAggregateOp;
var _gicentre$elm_vega$VegaLite$NthValue = {ctor: 'NthValue'};
var _gicentre$elm_vega$VegaLite$LastValue = {ctor: 'LastValue'};
var _gicentre$elm_vega$VegaLite$FirstValue = {ctor: 'FirstValue'};
var _gicentre$elm_vega$VegaLite$Lead = {ctor: 'Lead'};
var _gicentre$elm_vega$VegaLite$Lag = {ctor: 'Lag'};
var _gicentre$elm_vega$VegaLite$Ntile = {ctor: 'Ntile'};
var _gicentre$elm_vega$VegaLite$CumeDist = {ctor: 'CumeDist'};
var _gicentre$elm_vega$VegaLite$PercentRank = {ctor: 'PercentRank'};
var _gicentre$elm_vega$VegaLite$DenseRank = {ctor: 'DenseRank'};
var _gicentre$elm_vega$VegaLite$Rank = {ctor: 'Rank'};
var _gicentre$elm_vega$VegaLite$RowNumber = {ctor: 'RowNumber'};
var _gicentre$elm_vega$VegaLite$WSort = function (a) {
	return {ctor: 'WSort', _0: a};
};
var _gicentre$elm_vega$VegaLite$wiSort = _gicentre$elm_vega$VegaLite$WSort;
var _gicentre$elm_vega$VegaLite$WGroupBy = function (a) {
	return {ctor: 'WGroupBy', _0: a};
};
var _gicentre$elm_vega$VegaLite$wiGroupBy = _gicentre$elm_vega$VegaLite$WGroupBy;
var _gicentre$elm_vega$VegaLite$WIgnorePeers = function (a) {
	return {ctor: 'WIgnorePeers', _0: a};
};
var _gicentre$elm_vega$VegaLite$wiIgnorePeers = _gicentre$elm_vega$VegaLite$WIgnorePeers;
var _gicentre$elm_vega$VegaLite$WFrame = F2(
	function (a, b) {
		return {ctor: 'WFrame', _0: a, _1: b};
	});
var _gicentre$elm_vega$VegaLite$wiFrame = _gicentre$elm_vega$VegaLite$WFrame;
var _gicentre$elm_vega$VegaLite$WDescending = function (a) {
	return {ctor: 'WDescending', _0: a};
};
var _gicentre$elm_vega$VegaLite$wiDescending = _gicentre$elm_vega$VegaLite$WDescending;
var _gicentre$elm_vega$VegaLite$WAscending = function (a) {
	return {ctor: 'WAscending', _0: a};
};
var _gicentre$elm_vega$VegaLite$wiAscending = _gicentre$elm_vega$VegaLite$WAscending;
var _gicentre$elm_vega$VegaLite$Plain = {ctor: 'Plain'};
var _gicentre$elm_vega$VegaLite$Function = {ctor: 'Function'};
var _gicentre$elm_vega$VegaLite$Verbal = {ctor: 'Verbal'};
var _gicentre$elm_vega$VegaLite$AEnd = {ctor: 'AEnd'};
var _gicentre$elm_vega$VegaLite$AMiddle = {ctor: 'AMiddle'};
var _gicentre$elm_vega$VegaLite$AStart = {ctor: 'AStart'};

var _gicentre$elm_vega$Walkthrough$crossFilter = function () {
	var selectedEnc = function (_p0) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$mStr('goldenrod'),
							_1: {ctor: '[]'}
						},
						_p0))));
	};
	var totalEnc = function (_p1) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p1)));
	};
	var filterTrans = function (_p2) {
		return _gicentre$elm_vega$VegaLite$transform(
			A2(
				_gicentre$elm_vega$VegaLite$filter,
				_gicentre$elm_vega$VegaLite$fiSelection('brush'),
				_p2));
	};
	var sel = function (_p3) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'brush',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$seEncodings(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p3));
	};
	var hourTrans = function (_p4) {
		return _gicentre$elm_vega$VegaLite$transform(
			A3(_gicentre$elm_vega$VegaLite$calculateAs, 'hours(datum.date)', 'hour', _p4));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$repeat(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$columnFields(
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
				_0: _gicentre$elm_vega$VegaLite$specification(
					_gicentre$elm_vega$VegaLite$asSpec(
						{
							ctor: '::',
							_0: A2(
								_gicentre$elm_vega$VegaLite$dataFromUrl,
								'https://vega.github.io/vega-lite/data/flights-2k.json',
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$parse(
										{
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'date',
												_1: _gicentre$elm_vega$VegaLite$foDate('%Y/%m/%d %H:%M')
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
									_0: _gicentre$elm_vega$VegaLite$layer(
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$asSpec(
												{
													ctor: '::',
													_0: _gicentre$elm_vega$VegaLite$bar(
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
												_0: _gicentre$elm_vega$VegaLite$asSpec(
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
																_0: _gicentre$elm_vega$VegaLite$bar(
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
var _gicentre$elm_vega$Walkthrough$contextAndFocus = function () {
	var encDetail = function (_p5) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pScale(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$scDomain(
										_gicentre$elm_vega$VegaLite$doSelection('brush')),
									_1: {ctor: '[]'}
								}),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$pAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$axTitle(''),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pName('price'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p5)));
	};
	var specDetail = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$width(400),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$area(
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
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Temporal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pAxis(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$axFormat('%Y'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pName('price'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$pAxis(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$axTickCount(3),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$axGrid(false),
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
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'brush',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$seEncodings(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p7));
	};
	var specContext = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$width(400),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$height(80),
				_1: {
					ctor: '::',
					_0: sel(
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$area(
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
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/sp500.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$vConcat(
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
var _gicentre$elm_vega$Walkthrough$coordinatedScatter2 = function () {
	var sel = function (_p8) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$BindScales,
					_1: {ctor: '[]'}
				},
				_p8));
	};
	var enc = function (_p9) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$mName('Origin'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$mMType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						_p9))));
	};
	var spec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/cars.json',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$circle(
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
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$repeat(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$rowFields(
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
						_0: _gicentre$elm_vega$VegaLite$columnFields(
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
				_0: _gicentre$elm_vega$VegaLite$specification(spec),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$elm_vega$Walkthrough$coordinatedScatter1 = function () {
	var sel = function (_p10) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$seEncodings(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p10));
	};
	var enc = function (_p11) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: A3(
								_gicentre$elm_vega$VegaLite$mSelectionCondition,
								_gicentre$elm_vega$VegaLite$selectionName('picked'),
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$mName('Origin'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$mMType(_gicentre$elm_vega$VegaLite$Nominal),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$mStr('grey'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						_p11))));
	};
	var spec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/cars.json',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$circle(
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
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$repeat(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$rowFields(
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
						_0: _gicentre$elm_vega$VegaLite$columnFields(
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
				_0: _gicentre$elm_vega$VegaLite$specification(spec),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$elm_vega$Walkthrough$scatterProps = function () {
	var enc = function (_p12) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('Horsepower'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pName('Miles_per_Gallon'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: A3(
								_gicentre$elm_vega$VegaLite$mSelectionCondition,
								_gicentre$elm_vega$VegaLite$selectionName('picked'),
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$mName('Origin'),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$mMType(_gicentre$elm_vega$VegaLite$Nominal),
										_1: {ctor: '[]'}
									}
								},
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$mStr('grey'),
									_1: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						},
						_p12))));
	};
	var trans = function (_p13) {
		return _gicentre$elm_vega$VegaLite$transform(
			A3(_gicentre$elm_vega$VegaLite$calculateAs, 'year(datum.Year)', 'Year', _p13));
	};
	return {
		ctor: '::',
		_0: A2(
			_gicentre$elm_vega$VegaLite$dataFromUrl,
			'https://vega.github.io/vega-lite/data/cars.json',
			{ctor: '[]'}),
		_1: {
			ctor: '::',
			_0: trans(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$circle(
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
var _gicentre$elm_vega$Walkthrough$interactiveScatter1 = function () {
	var sel = function (_p14) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Single,
				{ctor: '[]'},
				_p14));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$elm_vega$Walkthrough$scatterProps
		});
}();
var _gicentre$elm_vega$Walkthrough$interactiveScatter2 = function () {
	var sel = function (_p15) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Multi,
				{ctor: '[]'},
				_p15));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$elm_vega$Walkthrough$scatterProps
		});
}();
var _gicentre$elm_vega$Walkthrough$interactiveScatter3 = function () {
	var sel = function (_p16) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Multi,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$seOn('mouseover'),
					_1: {ctor: '[]'}
				},
				_p16));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$elm_vega$Walkthrough$scatterProps
		});
}();
var _gicentre$elm_vega$Walkthrough$interactiveScatter4 = function () {
	var sel = function (_p17) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Single,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$Empty,
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$seFields(
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
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$elm_vega$Walkthrough$scatterProps
		});
}();
var _gicentre$elm_vega$Walkthrough$interactiveScatter5 = function () {
	var sel = function (_p18) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Single,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$seFields(
						{
							ctor: '::',
							_0: 'Cylinders',
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$seBind(
							{
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$VegaLite$iRange,
									'Cylinders',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$inMin(3),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$inMax(8),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$inStep(1),
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
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$elm_vega$Walkthrough$scatterProps
		});
}();
var _gicentre$elm_vega$Walkthrough$interactiveScatter6 = function () {
	var sel = function (_p19) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Single,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$seFields(
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
						_0: _gicentre$elm_vega$VegaLite$seBind(
							{
								ctor: '::',
								_0: A2(
									_gicentre$elm_vega$VegaLite$iRange,
									'Cylinders',
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$inMin(3),
										_1: {
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$inMax(8),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$inStep(1),
												_1: {ctor: '[]'}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_gicentre$elm_vega$VegaLite$iRange,
										'Year',
										{
											ctor: '::',
											_0: _gicentre$elm_vega$VegaLite$inMin(1969),
											_1: {
												ctor: '::',
												_0: _gicentre$elm_vega$VegaLite$inMax(1981),
												_1: {
													ctor: '::',
													_0: _gicentre$elm_vega$VegaLite$inStep(1),
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
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$elm_vega$Walkthrough$scatterProps
		});
}();
var _gicentre$elm_vega$Walkthrough$interactiveScatter7 = function () {
	var sel = function (_p20) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Interval,
				{ctor: '[]'},
				_p20));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$elm_vega$Walkthrough$scatterProps
		});
}();
var _gicentre$elm_vega$Walkthrough$interactiveScatter8 = function () {
	var sel = function (_p21) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$seEncodings(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				},
				_p21));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$elm_vega$Walkthrough$scatterProps
		});
}();
var _gicentre$elm_vega$Walkthrough$interactiveScatter9 = function () {
	var sel = function (_p22) {
		return _gicentre$elm_vega$VegaLite$selection(
			A4(
				_gicentre$elm_vega$VegaLite$select,
				'picked',
				_gicentre$elm_vega$VegaLite$Interval,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$seEncodings(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$ChX,
							_1: {ctor: '[]'}
						}),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$BindScales,
						_1: {ctor: '[]'}
					}
				},
				_p22));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: sel(
				{ctor: '[]'}),
			_1: _gicentre$elm_vega$Walkthrough$scatterProps
		});
}();
var _gicentre$elm_vega$Walkthrough$dashboard1 = function () {
	var annotationEnc = function (_p23) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$Y,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('precipitation'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Mean),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$pScale(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$scDomain(
											_gicentre$elm_vega$VegaLite$doNums(
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
	var annotationSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$title('Annotation'),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$width(200),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$rule(
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
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p24)));
	};
	var barSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$title('Bar chart'),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bar(
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
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p25)));
	};
	var scatterSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$title('Scatterplot'),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$point(
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
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p26)));
	};
	var histoSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$title('Frequency histogram'),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bar(
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: histoEnc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$hConcat(
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
var _gicentre$elm_vega$Walkthrough$splom = function () {
	var enc = function (_p27) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p27)));
	};
	var spec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$point(
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$repeat(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$rowFields(
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
						_0: _gicentre$elm_vega$VegaLite$columnFields(
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
				_0: _gicentre$elm_vega$VegaLite$specification(spec),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$elm_vega$Walkthrough$barChartTriplet = function () {
	var enc = function (_p28) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p28)));
	};
	var spec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bar(
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: enc(
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			}
		});
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$repeat(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$rowFields(
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
				_0: _gicentre$elm_vega$VegaLite$specification(spec),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$elm_vega$Walkthrough$barChartPair = function () {
	var bar2Enc = function (_p29) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pName('temp_max'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p29)));
	};
	var bar1Enc = function (_p30) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p30)));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$vConcat(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$asSpec(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$bar(
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: bar1Enc(
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}
							}),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$asSpec(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$bar(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: bar2Enc(
											{ctor: '[]'}),
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			}
		});
}();
var _gicentre$elm_vega$Walkthrough$barChartWithAverage = function () {
	var barEnc = function (_p31) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				_p31));
	};
	var precipEnc = function (_p32) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$Y,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('precipitation'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Mean),
							_1: {ctor: '[]'}
						}
					}
				},
				_p32));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: precipEnc(
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$layer(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$asSpec(
								{
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$bar(
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
								_0: _gicentre$elm_vega$VegaLite$asSpec(
									{
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$rule(
											{ctor: '[]'}),
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				}
			}
		});
}();
var _gicentre$elm_vega$Walkthrough$barChart = function () {
	var enc = function (_p33) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pName('precipitation'),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p33)));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bar(
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
var _gicentre$elm_vega$Walkthrough$weatherColors = _gicentre$elm_vega$VegaLite$categoricalDomainMap(
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
var _gicentre$elm_vega$Walkthrough$stackedHistogram2 = function () {
	var enc = function (_p34) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$mName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$mMType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$mScale(_gicentre$elm_vega$Walkthrough$weatherColors),
									_1: {ctor: '[]'}
								}
							}
						},
						_p34))));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bar(
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
var _gicentre$elm_vega$Walkthrough$lineChart = function () {
	var enc = function (_p35) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$mName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$mMType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$mScale(_gicentre$elm_vega$Walkthrough$weatherColors),
									_1: {ctor: '[]'}
								}
							}
						},
						_p35))));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$line(
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
var _gicentre$elm_vega$Walkthrough$multiBar = function () {
	var enc = function (_p36) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$mName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$mMType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$mLegend(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$mScale(_gicentre$elm_vega$Walkthrough$weatherColors),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$column,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$fName('weather'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$fMType(_gicentre$elm_vega$VegaLite$Nominal),
									_1: {ctor: '[]'}
								}
							},
							_p36)))));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bar(
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
var _gicentre$elm_vega$Walkthrough$dashboard2 = function () {
	var annotationEnc = function (_p37) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$Y,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Row),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Mean),
							_1: {ctor: '[]'}
						}
					}
				},
				_p37));
	};
	var barEnc = function (_p38) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('date'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Ordinal),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pTimeUnit(_gicentre$elm_vega$VegaLite$Month),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Mean),
								_1: {ctor: '[]'}
							}
						}
					},
					_p38)));
	};
	var layerSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$layer(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$asSpec(
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$bar(
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
						_0: _gicentre$elm_vega$VegaLite$asSpec(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$rule(
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
	var barsSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$repeat(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$rowFields(
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
				_0: _gicentre$elm_vega$VegaLite$specification(layerSpec),
				_1: {ctor: '[]'}
			}
		});
	var scatterEnc = function (_p39) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Column),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {ctor: '[]'}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pRepeat(_gicentre$elm_vega$VegaLite$Row),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p39)));
	};
	var scatterSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$point(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: scatterEnc(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	var splomSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$repeat(
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$rowFields(
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
						_0: _gicentre$elm_vega$VegaLite$columnFields(
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
				_0: _gicentre$elm_vega$VegaLite$specification(scatterSpec),
				_1: {ctor: '[]'}
			}
		});
	var histoEnc = function (_p40) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$mName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$mMType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$mLegend(
										{ctor: '[]'}),
									_1: {
										ctor: '::',
										_0: _gicentre$elm_vega$VegaLite$mScale(_gicentre$elm_vega$Walkthrough$weatherColors),
										_1: {ctor: '[]'}
									}
								}
							}
						},
						A2(
							_gicentre$elm_vega$VegaLite$column,
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$fName('weather'),
								_1: {
									ctor: '::',
									_0: _gicentre$elm_vega$VegaLite$fMType(_gicentre$elm_vega$VegaLite$Nominal),
									_1: {ctor: '[]'}
								}
							},
							_p40)))));
	};
	var histoSpec = _gicentre$elm_vega$VegaLite$asSpec(
		{
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$bar(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: histoEnc(
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		});
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$vConcat(
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$asSpec(
							{
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$hConcat(
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
var _gicentre$elm_vega$Walkthrough$stackedHistogram = function () {
	var enc = function (_p41) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					A2(
						_gicentre$elm_vega$VegaLite$color,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$mName('weather'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$mMType(_gicentre$elm_vega$VegaLite$Nominal),
								_1: {ctor: '[]'}
							}
						},
						_p41))));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bar(
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
var _gicentre$elm_vega$Walkthrough$histogram = function () {
	var enc = function (_p42) {
		return _gicentre$elm_vega$VegaLite$encoding(
			A3(
				_gicentre$elm_vega$VegaLite$position,
				_gicentre$elm_vega$VegaLite$X,
				{
					ctor: '::',
					_0: _gicentre$elm_vega$VegaLite$pName('temp_max'),
					_1: {
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pBin(
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					}
				},
				A3(
					_gicentre$elm_vega$VegaLite$position,
					_gicentre$elm_vega$VegaLite$Y,
					{
						ctor: '::',
						_0: _gicentre$elm_vega$VegaLite$pAggregate(_gicentre$elm_vega$VegaLite$Count),
						_1: {
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
							_1: {ctor: '[]'}
						}
					},
					_p42)));
	};
	return _gicentre$elm_vega$VegaLite$toVegaLite(
		{
			ctor: '::',
			_0: A2(
				_gicentre$elm_vega$VegaLite$dataFromUrl,
				'https://vega.github.io/vega-lite/data/seattle-weather.csv',
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$bar(
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
var _gicentre$elm_vega$Walkthrough$stripPlot = _gicentre$elm_vega$VegaLite$toVegaLite(
	{
		ctor: '::',
		_0: A2(
			_gicentre$elm_vega$VegaLite$dataFromUrl,
			'https://vega.github.io/vega-lite/data/seattle-weather.csv',
			{ctor: '[]'}),
		_1: {
			ctor: '::',
			_0: _gicentre$elm_vega$VegaLite$tick(
				{ctor: '[]'}),
			_1: {
				ctor: '::',
				_0: _gicentre$elm_vega$VegaLite$encoding(
					A3(
						_gicentre$elm_vega$VegaLite$position,
						_gicentre$elm_vega$VegaLite$X,
						{
							ctor: '::',
							_0: _gicentre$elm_vega$VegaLite$pName('temp_max'),
							_1: {
								ctor: '::',
								_0: _gicentre$elm_vega$VegaLite$pMType(_gicentre$elm_vega$VegaLite$Quantitative),
								_1: {ctor: '[]'}
							}
						},
						{ctor: '[]'})),
				_1: {ctor: '[]'}
			}
		}
	});
var _gicentre$elm_vega$Walkthrough$mySpecs = _gicentre$elm_vega$VegaLite$combineSpecs(
	{
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'singleView1', _1: _gicentre$elm_vega$Walkthrough$stripPlot},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'singleView2', _1: _gicentre$elm_vega$Walkthrough$histogram},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'singleView3', _1: _gicentre$elm_vega$Walkthrough$stackedHistogram},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'singleView4', _1: _gicentre$elm_vega$Walkthrough$stackedHistogram2},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'singleView5', _1: _gicentre$elm_vega$Walkthrough$lineChart},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'multiView1', _1: _gicentre$elm_vega$Walkthrough$multiBar},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'multiView2', _1: _gicentre$elm_vega$Walkthrough$barChart},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'multiView3', _1: _gicentre$elm_vega$Walkthrough$barChartWithAverage},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'multiView4', _1: _gicentre$elm_vega$Walkthrough$barChartPair},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'multiView5', _1: _gicentre$elm_vega$Walkthrough$barChartTriplet},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: 'multiView6', _1: _gicentre$elm_vega$Walkthrough$splom},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: 'dashboard1', _1: _gicentre$elm_vega$Walkthrough$dashboard1},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: 'dashboard2', _1: _gicentre$elm_vega$Walkthrough$dashboard2},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: 'interactive1', _1: _gicentre$elm_vega$Walkthrough$interactiveScatter1},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 'interactive2', _1: _gicentre$elm_vega$Walkthrough$interactiveScatter2},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: 'interactive3', _1: _gicentre$elm_vega$Walkthrough$interactiveScatter3},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: 'interactive4', _1: _gicentre$elm_vega$Walkthrough$interactiveScatter4},
																		_1: {
																			ctor: '::',
																			_0: {ctor: '_Tuple2', _0: 'interactive5', _1: _gicentre$elm_vega$Walkthrough$interactiveScatter5},
																			_1: {
																				ctor: '::',
																				_0: {ctor: '_Tuple2', _0: 'interactive6', _1: _gicentre$elm_vega$Walkthrough$interactiveScatter6},
																				_1: {
																					ctor: '::',
																					_0: {ctor: '_Tuple2', _0: 'interactive7', _1: _gicentre$elm_vega$Walkthrough$interactiveScatter7},
																					_1: {
																						ctor: '::',
																						_0: {ctor: '_Tuple2', _0: 'interactive8', _1: _gicentre$elm_vega$Walkthrough$interactiveScatter8},
																						_1: {
																							ctor: '::',
																							_0: {ctor: '_Tuple2', _0: 'interactive9', _1: _gicentre$elm_vega$Walkthrough$interactiveScatter9},
																							_1: {
																								ctor: '::',
																								_0: {ctor: '_Tuple2', _0: 'coordinated1', _1: _gicentre$elm_vega$Walkthrough$coordinatedScatter1},
																								_1: {
																									ctor: '::',
																									_0: {ctor: '_Tuple2', _0: 'coordinated2', _1: _gicentre$elm_vega$Walkthrough$coordinatedScatter2},
																									_1: {
																										ctor: '::',
																										_0: {ctor: '_Tuple2', _0: 'coordinated3', _1: _gicentre$elm_vega$Walkthrough$contextAndFocus},
																										_1: {
																											ctor: '::',
																											_0: {ctor: '_Tuple2', _0: 'crossFilter1', _1: _gicentre$elm_vega$Walkthrough$crossFilter},
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
	});
var _gicentre$elm_vega$Walkthrough$elmToJS = _elm_lang$core$Native_Platform.outgoingPort(
	'elmToJS',
	function (v) {
		return v;
	});
var _gicentre$elm_vega$Walkthrough$main = _elm_lang$core$Platform$program(
	{
		init: {
			ctor: '_Tuple2',
			_0: _gicentre$elm_vega$Walkthrough$mySpecs,
			_1: _gicentre$elm_vega$Walkthrough$elmToJS(_gicentre$elm_vega$Walkthrough$mySpecs)
		},
		update: F2(
			function (_p43, model) {
				return {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none};
			}),
		subscriptions: _elm_lang$core$Basics$always(_elm_lang$core$Platform_Sub$none)
	})();

var Elm = {};
Elm['Walkthrough'] = Elm['Walkthrough'] || {};
if (typeof _gicentre$elm_vega$Walkthrough$main !== 'undefined') {
    _gicentre$elm_vega$Walkthrough$main(Elm['Walkthrough'], 'Walkthrough', undefined);
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


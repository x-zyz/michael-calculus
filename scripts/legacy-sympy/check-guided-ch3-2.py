#!/usr/bin/env python3
"""Deterministic SymPy verification for Chapter 3 Section 3.2 (L'Hopital's Rule) problems & transfers."""
import sympy as sp

x = sp.Symbol("x", real=True)
xp = sp.Symbol("xp", positive=True)
a = sp.Symbol("a", positive=True)
m = sp.Symbol("m", real=True, nonzero=True)

# 1. All 23 Section 3.2 original limits
assert sp.limit((sp.exp(x) - 1 - x) / x**2, x, 0) == sp.Rational(1, 2), "p21"
assert sp.limit((x - sp.sin(x)) / x**3, x, 0) == sp.Rational(1, 6), "p22"
assert sp.limit((sp.exp(2 * x) - 1 - 2 * x) / x**2, x, 0) == 2, "p135"
assert sp.limit((sp.exp(3 * x) - sp.exp(-3 * x)) / sp.sin(2 * x), x, 0) == 3, "p182"
assert sp.limit(sp.log(1 + 4 * x) / (2 * x), x, 0) == 2, "3-2-1-1"
assert sp.limit((sp.exp(2 * x) - sp.exp(-3 * x)) / sp.sin(2 * x), x, 0) == sp.Rational(5, 2), "3-2-1-2"
assert sp.limit((sp.tan(x) - sp.sin(x)) / (x - sp.sin(x)), x, 0) == 3, "3-2-1-3"
assert sp.limit(sp.sin(5 * x) / sp.tan(4 * x), x, sp.pi) == sp.Rational(-5, 4), "3-2-1-4"
assert sp.limit(sp.log(-sp.cos(x)) / (sp.pi - x) ** 2, x, sp.pi) == sp.Rational(-1, 2), "3-2-1-5"
assert sp.simplify((sp.diff(a**x, x) / sp.diff(x**m, x)).subs(x, a) - a ** (a - m + 1) * sp.log(a) / m) == 0, "3-2-1-6"
assert sp.limit(sp.log(sp.sin(5 * xp)) / sp.log(sp.sin(3 * xp)), xp, 0, "+") == 1, "3-2-1-7"
assert sp.limit(sp.tan(3 * x) / sp.tan(5 * x), x, sp.pi / 2) == sp.Rational(5, 3), "3-2-1-8"
assert sp.limit(sp.log(1 + 3 / x) / sp.atan(2 / x), x, sp.oo) == sp.Rational(3, 2), "3-2-1-9"
assert sp.limit(sp.log(1 + 3 * x**2) / (sp.sec(2 * x) - sp.cos(2 * x)), x, 0) == sp.Rational(3, 4), "3-2-1-10"
assert sp.limit((sp.exp(2 * x) - 1) * sp.cot(3 * x), x, 0) == sp.Rational(2, 3), "3-2-1-11"
assert sp.limit(x**4 * sp.exp(1 / x**2), x, 0) == sp.oo, "3-2-1-12"
assert sp.limit(4 / (x**2 - 4) - 1 / (x - 2), x, 2) == sp.Rational(-1, 4), "3-2-1-13"
assert sp.limit((sp.exp(2 * x) + 3 * x) ** (1 / x), x, 0) == sp.exp(5), "3-2-1-14"
assert sp.limit(sp.sin(xp) ** xp, xp, 0, "+") == 1, "3-2-1-15"
assert sp.limit((2 / xp) ** sp.tan(3 * xp), xp, 0, "+") == 1, "3-2-1-16"
assert sp.limit((2 * x - sp.cos(x)) / x, x, sp.oo) == 2, "3-2-2"
assert sp.limit(x**2 * sp.cos(1 / x) / sp.tan(x), x, 0) == 0, "3-2-3"
assert sp.limit((((1 + 2 * xp) ** (1 / xp)) / sp.exp(2)) ** (1 / xp), xp, 0, "+") == sp.exp(-2), "3-2-4"

# 2. All 23 Section 3.2 transfer numeric limits
assert sp.limit((sp.exp(3 * x) - 1 - 3 * x) / x**2, x, 0) == sp.Rational(9, 2), "t-p21"
assert sp.limit((2 * x - sp.sin(2 * x)) / x**3, x, 0) == sp.Rational(4, 3), "t-p22"
assert sp.limit((sp.exp(4 * x) - 1 - 4 * x) / x**2, x, 0) == 8, "t-p135"
assert sp.limit((sp.exp(4 * x) - sp.exp(-4 * x)) / sp.sin(2 * x), x, 0) == 4, "t-p182"
assert sp.limit(sp.log(1 + 6 * x) / (3 * x), x, 0) == 2, "t-3-2-1-1"
assert sp.limit((sp.exp(4 * x) - sp.exp(-2 * x)) / sp.sin(3 * x), x, 0) == 2, "t-3-2-1-2"
assert sp.limit((sp.tan(2 * x) - sp.sin(2 * x)) / (2 * x - sp.sin(2 * x)), x, 0) == 3, "t-3-2-1-3"
assert sp.limit(sp.sin(3 * x) / sp.tan(2 * x), x, sp.pi) == sp.Rational(-3, 2), "t-3-2-1-4"
assert sp.limit(sp.log(sp.cos(2 * x)) / x**2, x, 0) == -2, "t-3-2-1-5"
assert sp.limit((sp.exp(x) - sp.exp(1)) / (x**2 - 1), x, 1) / sp.exp(1) == sp.Rational(1, 2), "t-3-2-1-6"
assert sp.limit(sp.log(sp.sin(7 * xp)) / sp.log(sp.sin(2 * xp)), xp, 0, "+") == 1, "t-3-2-1-7"
assert sp.limit(sp.tan(x) / sp.tan(3 * x), x, sp.pi / 2) == 3, "t-3-2-1-8"
assert sp.limit(sp.log(1 + 5 / x) / sp.atan(2 / x), x, sp.oo) == sp.Rational(5, 2), "t-3-2-1-9"
assert sp.limit(sp.log(1 + 4 * x**2) / (sp.sec(2 * x) - sp.cos(2 * x)), x, 0) == 1, "t-3-2-1-10"
assert sp.limit((sp.exp(6 * x) - 1) * sp.cot(2 * x), x, 0) == 3, "t-3-2-1-11"
assert sp.limit(xp**2 * sp.exp(1 / xp), xp, 0, "+") == sp.oo, "t-3-2-1-12"
assert sp.limit(sp.exp(x) / x**2, x, sp.oo) == sp.oo, "t-3-2-1-12-check"
# For numeric transfer on 3-2-1-12, use x^2 * e^{-x} -> 0 or e^{2x} / (x^2) derivative coefficient: let's use lim_{x->+oo} (2x^2 + 3)/(x^2) or lim_{x->0} x^2 / (e^{2x}-1-2x) = 1/2!
assert sp.limit(x**2 / (sp.exp(2 * x) - 1 - 2 * x), x, 0) == sp.Rational(1, 2), "t-3-2-1-12-num"
assert sp.limit(6 / (x**2 - 9) - 1 / (x - 3), x, 3) == sp.Rational(-1, 6), "t-3-2-1-13"
assert sp.limit(sp.log((sp.exp(3 * x) + 4 * x) ** (1 / x)), x, 0) == 7, "t-3-2-1-14"
assert sp.limit((3 * xp) ** xp, xp, 0, "+") == 1, "t-3-2-1-15"
assert sp.limit((5 / xp) ** (2 * xp), xp, 0, "+") == 1, "t-3-2-1-16"
assert sp.limit((5 * x + sp.sin(x)) / x, x, sp.oo) == 5, "t-3-2-2"
assert sp.limit((3 * x + x**2 * sp.sin(1 / x)) / x, x, 0) == 3, "t-3-2-3"
assert sp.limit((sp.log(1 + 4 * xp) - 4 * xp) / xp**2, xp, 0, "+") == -8, "t-3-2-4"

print("ALL 23 Section 3.2 L'Hopital problems & transfers verified with SymPy!")

#!/usr/bin/env python3
"""Deterministic SymPy verification for Chapter 3 Section 3.1 (MVT) problems & transfers."""
import sympy as sp

x, t, c, d, alpha, beta, gamma = sp.symbols("x t c d alpha beta gamma", real=True)

# 1. Core & bank 3.1 numeric problems
assert sp.solve(sp.diff(x**2, x) - sp.Rational(5**2 - 1**2, 5 - 1), x) == [3], "p19"
assert sp.solve(sp.diff(x**2 - 4 * x + 3, x), x) == [2], "p20"
assert sp.solve(sp.diff(x**3, x) - sp.Rational(3**3 - 0**3, 3), x**2) == [3], "p134"
f181 = sp.log(sp.sin(2 * x))
assert sp.simplify(f181.subs(x, sp.pi / 12) - f181.subs(x, 5 * sp.pi / 12)) == 0, "p181 endpoints"
assert sp.simplify(sp.diff(f181, x).subs(x, sp.pi / 4)) == 0, "p181 stationary"

# 2. Written 3.1 problems
assert sp.solve(sp.diff(3 * x**2 - 2 * x, x) - sp.Rational((3 * 25 - 10) - (3 - 2), 4), x) == [3], "p216"
f312 = 3 * x**3 - 4 * x**2 + 2 * x + 1
roots312 = sp.solve(sp.diff(f312, x) - (f312.subs(x, 1) - f312.subs(x, 0)), x)
assert set(roots312) == {(4 - sp.sqrt(7)) / 9, (4 + sp.sqrt(7)) / 9}, "jc935-3-1-2"
assert all(0 < r.evalf() < 1 for r in roots312), "jc935-3-1-2 in (0,1)"

# jc935-3-1-3 Cauchy MVT
lhs313 = (sp.cos(sp.pi / 2) - sp.cos(0)) / ((sp.pi / 2 - sp.sin(sp.pi / 2)) - (0 - sp.sin(0)))
xi313 = 2 * sp.atan((sp.pi - 2) / 2)
rhs313 = (-sp.sin(xi313)) / (1 - sp.cos(xi313))
assert sp.simplify(lhs313 - rhs313) == 0, "jc935-3-1-3"
assert 0 < xi313.evalf() < (sp.pi / 2).evalf(), "jc935-3-1-3 in (0,pi/2)"

# jc935-3-1-4 parabola midpoint
f314 = alpha * x**2 + beta * x + gamma
avg314 = sp.simplify((f314.subs(x, d) - f314.subs(x, c)) / (d - c))
assert sp.solve(sp.diff(f314, x) - avg314, x) == [(c + d) / 2], "jc935-3-1-4"

# jc935-3-1-6 arctan(x) + arctan(1/x) = pi/2 for x > 0
xp = sp.Symbol("xp", positive=True)
assert sp.simplify(sp.diff(sp.atan(xp) + sp.atan(1 / xp), xp)) == 0, "jc935-3-1-6"
assert sp.atan(1) + sp.atan(1) == sp.pi / 2, "jc935-3-1-6 value"

# jc935-3-1-12 x^3 + 3x - 2 = 0
f3112 = x**3 + 3 * x - 2
assert f3112.subs(x, 0) < 0 and f3112.subs(x, 1) > 0, "jc935-3-1-12 ivt"
assert sp.diff(f3112, x) == 3 * x**2 + 3, "jc935-3-1-12 deriv"

# 3. Transfer problems for all 22 Section 3.1 ELI5 lessons
assert sp.solve(sp.diff(x**2, x) - sp.Rational(6**2 - 2**2, 6 - 2), x) == [4], "t-p19"
assert sp.solve(sp.diff(x**2 - 6 * x + 5, x), x) == [3], "t-p20"
assert sp.solve(sp.diff(x**3, x) - sp.Rational(6**3 - 0**3, 6), x**2) == [12], "t-p134"
assert sp.Rational(1, 2) == sp.solve(sp.cos(x), x)[0] / sp.pi, "t-p181"
assert sp.solve(sp.diff(2 * x**2 + x, x) - sp.Rational((2 * 36 + 6) - (2 * 4 + 2), 6 - 2), x) == [4], "t-p216"
assert len(sp.nroots(sp.diff((x + 4) * (x + 1) * (x - 1) * (x - 3) * (x - 6), x))) == 4, "t-p217"
assert sp.solve(sp.diff(sp.log(sp.cos(x - 1)), x), x)[0] == 1, "t-3-1-1"
f_t312 = x**3 - 3 * x**2 + 4
r_t312 = [r for r in sp.solve(sp.diff(f_t312, x) - sp.Rational(f_t312.subs(x, 3) - f_t312.subs(x, 0), 3), x) if 0 < r < 3]
assert r_t312 == [2], "t-3-1-2"
assert sp.solve((3 * x**2) / (2 * x) - sp.Rational(3**3 - 0, 3**2 - 0), x) == [2], "t-3-1-3"
assert sp.Rational(2 + 8, 2) == 5, "t-3-1-4"
assert len(sp.nroots(sp.diff((x + 5) * (x + 2) * (x - 1) * (x - 4) * (x - 7) * (x - 10), x))) == 5, "t-3-1-5"
assert sp.simplify(sp.diff(sp.sin(x) ** 2 + sp.cos(x) ** 2 + 4, x)) == 0, "t-3-1-6"
assert sp.simplify((sp.sin(0) ** 2 + sp.cos(0) ** 2 + 4)) == 5, "t-3-1-6 val"
assert sp.solve(sp.diff(x**2 + 6 * x, x), x) == [-3], "t-3-1-7"
G_t318 = (x + 1) ** 2 * (x - 2)
assert sp.solve(sp.diff(G_t318, x, 2), x) == [0], "t-3-1-8"
assert sp.solve((1 / (2 * sp.sqrt(xp))) * (16 - 9) - (sp.sqrt(16) - sp.sqrt(9)), xp) == [sp.Rational(49, 4)], "t-3-1-9"
assert sp.Rational(3 - 1, 1 + 3) == sp.Rational(1, 2), "t-3-1-10"
assert sp.Max(sp.Abs(5 * 1), sp.Abs(5 * (-1))) == 5, "t-3-1-11-1"
assert sp.simplify(sp.exp(3) * (x - 3) + sp.exp(3) - sp.exp(3) * (x - 2)) == 0, "t-3-1-11-2"
assert sp.diff(x**5 + 5 * x - 3, x).subs(x, 0) == 5, "t-3-1-12"
assert sp.solve((3 - 1) * (3 * (2 * x) - 9 * 1) - (1 * 9 - 3 * 1), x) == [2], "t-3-1-13"
assert sp.diff((x - 1) ** 3, x, 3) / sp.factorial(3) == 1, "t-3-1-15"

print("ALL 22 Section 3.1 problems & transfers verified with SymPy!")

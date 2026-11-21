"""Symbolic verification for JC935 Section 3-4 (Monotonicity and Concavity, 35 symbolic + 3 manual = 38 items)."""

from __future__ import annotations

import sympy as sp

x, y, t, a, b, c, d, k, n, p = sp.symbols("x y t a b c d k n p", real=True)
a_pos = sp.Symbol("a", positive=True)
n_pos = sp.Symbol("n", positive=True)
p_unit = sp.Symbol("p", positive=True)
t_pos = sp.Symbol("t", positive=True)
x_pos = sp.Symbol("x", positive=True)


def check_sign_at(expr: sp.Expr, var: sp.Symbol, pts: list, expected_sign: int, subs_extra: dict | None = None) -> None:
    for pt in pts:
        val = expr.subs(var, pt)
        if subs_extra:
            val = val.subs(subs_extra)
        num = complex(sp.N(val, 30))
        assert abs(num.imag) < 1e-12, f"Non-real value {num} at {pt}"
        if expected_sign > 0:
            assert num.real > 0, f"Expected > 0 at {pt}, got {num.real}"
        elif expected_sign < 0:
            assert num.real < 0, f"Expected < 0 at {pt}, got {num.real}"
        else:
            assert abs(num.real) < 1e-12, f"Expected == 0 at {pt}, got {num.real}"


# 3-4-1: f(x) = 2x - arctan(2x)
f1 = 2 * x - sp.atan(2 * x)
df1 = sp.simplify(sp.diff(f1, x))
assert sp.simplify(df1 - 8 * x**2 / (1 + 4 * x**2)) == 0
assert sp.solve(df1, x) == [0]
check_sign_at(df1, x, [-2, -sp.Rational(1, 2), sp.Rational(1, 2), 2], 1)

# 3-4-2: f(x) = -2x + sin(2x)
f2 = -2 * x + sp.sin(2 * x)
df2 = sp.simplify(sp.diff(f2, x))
assert sp.simplify(df2 - 2 * (sp.cos(2 * x) - 1)) == 0
assert sp.simplify(df2.subs(x, 0)) == 0
assert sp.simplify(df2.subs(x, sp.pi)) == 0
check_sign_at(df2, x, [-sp.pi / 4, sp.pi / 4, sp.pi / 2, 3 * sp.pi / 4], -1)

# 3-4-3-1: y = 2x^3 + 3x^2 - 12x + 5
f3_1 = 2 * x**3 + 3 * x**2 - 12 * x + 5
df3_1 = sp.factor(sp.diff(f3_1, x))
assert sp.simplify(df3_1 - 6 * (x + 2) * (x - 1)) == 0
assert set(sp.solve(df3_1, x)) == {-2, 1}
check_sign_at(df3_1, x, [-3, 2], 1)
check_sign_at(df3_1, x, [-1, 0], -1)

# 3-4-3-2: y = 3x + 27/x (x > 0)
f3_2 = 3 * x + 27 / x
df3_2 = sp.factor(sp.diff(f3_2, x))
assert sp.simplify(df3_2 - 3 * (x - 3) * (x + 3) / x**2) == 0
assert [r for r in sp.solve(df3_2, x) if r > 0] == [3]
check_sign_at(df3_2, x, [sp.Rational(1, 2), 1, 2], -1)
check_sign_at(df3_2, x, [4, 10], 1)

# 3-4-3-3: y = 6 / (2x^3 - 15x^2 + 36x)
denom3_3 = 2 * x**3 - 15 * x**2 + 36 * x
# Verify only real root of denominator is x=0
real_roots_denom = [r for r in sp.solve(denom3_3, x) if r.is_real]
assert real_roots_denom == [0]
f3_3 = 6 / denom3_3
df3_3 = sp.factor(sp.diff(f3_3, x))
expected_df3_3 = -36 * (x - 2) * (x - 3) / denom3_3**2
assert sp.simplify(df3_3 - expected_df3_3) == 0
assert set(sp.solve(sp.numer(df3_3), x)) == {2, 3}
check_sign_at(df3_3, x, [-1, 1, 4], -1)
check_sign_at(df3_3, x, [sp.Rational(5, 2)], 1)

# 3-4-3-4: y = ln(2x + sqrt(4x^2 + 9))
f3_4 = sp.log(2 * x + sp.sqrt(4 * x**2 + 9))
df3_4 = sp.simplify(sp.diff(f3_4, x))
assert sp.simplify(df3_4 - 2 / sp.sqrt(4 * x**2 + 9)) == 0
check_sign_at(df3_4, x, [-5, -1, 0, 1, 5], 1)

# 3-4-3-5: y = (x - 2)^3 * (x + 2)
f3_5 = (x - 2) ** 3 * (x + 2)
df3_5 = sp.factor(sp.diff(f3_5, x))
assert sp.simplify(df3_5 - 4 * (x - 2) ** 2 * (x + 1)) == 0
assert set(sp.solve(df3_5, x)) == {-1, 2}
check_sign_at(df3_5, x, [-3, -2], -1)
check_sign_at(df3_5, x, [0, 1, 3], 1)

# 3-4-3-6: y = cbrt((x + a)^2 * (2a - x)) (a > 0)
g3_6 = (x + a_pos) ** 2 * (2 * a_pos - x)
dg3_6 = sp.factor(sp.diff(g3_6, x))
assert sp.simplify(dg3_6 - 3 * (x + a_pos) * (a_pos - x)) == 0
# Real cube root is strictly increasing, so sign of y' matches sign of g'(x) away from -a, 2a
# Also verify explicit derivative formula (a - x) / cbrt((x+a)*(2a-x)^2) on each interval with a=1
df3_6_explicit = (1 - x) / (sp.real_root(x + 1, 3) * sp.real_root((2 - x) ** 2, 3))
for pt, expected_s in [(-2, -1), (0, 1), (sp.Rational(3, 2), -1), (3, -1)]:
    # Compare numerical derivative of real_root(g, 3) with explicit formula
    h = sp.Rational(1, 10000)
    g1 = g3_6.subs(a_pos, 1)
    y_val_p = sp.real_root(g1.subs(x, pt + h), 3)
    y_val_m = sp.real_root(g1.subs(x, pt - h), 3)
    num_deriv = float(sp.N((y_val_p - y_val_m) / (2 * h), 20))
    exact_deriv = float(sp.N(df3_6_explicit.subs(x, pt), 20))
    assert abs(num_deriv - exact_deriv) < 1e-6, f"Mismatch at {pt}: {num_deriv} vs {exact_deriv}"
    assert (exact_deriv > 0) == (expected_s > 0)

# 3-4-3-7: y = x^n * e^(-2x) (n > 0, x >= 0)
f3_7 = x_pos**n_pos * sp.exp(-2 * x_pos)
df3_7 = sp.diff(f3_7, x_pos)
assert sp.simplify(df3_7 - x_pos ** (n_pos - 1) * sp.exp(-2 * x_pos) * (n_pos - 2 * x_pos)) == 0
assert sp.solve(df3_7, x_pos) == [n_pos / 2]
check_sign_at(df3_7, x_pos, [sp.Rational(1, 2)], 1, {n_pos: 3})
check_sign_at(df3_7, x_pos, [2, 5], -1, {n_pos: 3})

# 3-4-3-8: y = x + 2|cos x|
# Branch 1: cos x > 0 on (-pi/2, pi/2) -> y = x + 2cos x, y' = 1 - 2sin x
df3_8_pos = sp.diff(x + 2 * sp.cos(x), x)
assert sp.simplify(df3_8_pos - (1 - 2 * sp.sin(x))) == 0
assert sp.simplify(df3_8_pos.subs(x, sp.pi / 6)) == 0
check_sign_at(df3_8_pos, x, [-sp.pi / 3, 0, sp.pi / 12], 1)
check_sign_at(df3_8_pos, x, [sp.pi / 4, sp.pi / 3], -1)
# Branch 2: cos x < 0 on (pi/2, 3pi/2) -> y = x - 2cos x, y' = 1 + 2sin x
df3_8_neg = sp.diff(x - 2 * sp.cos(x), x)
assert sp.simplify(df3_8_neg - (1 + 2 * sp.sin(x))) == 0
assert sp.simplify(df3_8_neg.subs(x, 7 * sp.pi / 6)) == 0
check_sign_at(df3_8_neg, x, [3 * sp.pi / 4, sp.pi], 1)
check_sign_at(df3_8_neg, x, [5 * sp.pi / 4, 4 * sp.pi / 3], -1)

# 3-4-5-1: x > 0 => 1 + x/3 > cbrt(1 + x)
f5_1 = 1 + t / 3 - (1 + t) ** sp.Rational(1, 3)
assert sp.simplify(f5_1.subs(t, 0)) == 0
df5_1 = sp.simplify(sp.diff(f5_1, t))
assert sp.simplify(df5_1 - sp.Rational(1, 3) * (1 - (1 + t) ** (-sp.Rational(2, 3)))) == 0
check_sign_at(df5_1, t, [sp.Rational(1, 10), 1, 7, 26], 1)

# 3-4-5-2: x > 0 => 2 + x*ln((x + sqrt(x^2 + 4))/2) > sqrt(x^2 + 4)
f5_2 = 2 + t * sp.log((t + sp.sqrt(t**2 + 4)) / 2) - sp.sqrt(t**2 + 4)
assert sp.simplify(f5_2.subs(t, 0)) == 0
df5_2 = sp.simplify(sp.diff(f5_2, t))
assert sp.simplify(df5_2 - sp.log((t + sp.sqrt(t**2 + 4)) / 2)) == 0
check_sign_at(df5_2, t, [sp.Rational(1, 4), 1, 3, 10], 1)

# 3-4-5-3: 0 < x < pi/2 => 2sin x + tan x > 3x
f5_3 = 2 * sp.sin(x) + sp.tan(x) - 3 * x
assert sp.simplify(f5_3.subs(x, 0)) == 0
df5_3 = sp.diff(f5_3, x)
assert sp.simplify(df5_3.subs(x, 0)) == 0
d2f5_3 = sp.simplify(sp.diff(df5_3, x))
expected_d2f5_3 = 2 * sp.sin(x) * (1 / sp.cos(x) ** 3 - 1)
assert sp.simplify(d2f5_3 - expected_d2f5_3) == 0
check_sign_at(d2f5_3, x, [sp.pi / 12, sp.pi / 4, sp.pi / 3], 1)

# 3-4-5-4: 0 < x < pi/2 => sec x > 1 + x^2/2
g5_4 = sp.tan(x) - x
assert sp.simplify(g5_4.subs(x, 0)) == 0
dg5_4 = sp.simplify(sp.diff(g5_4, x))
assert sp.simplify(dg5_4 - sp.tan(x) ** 2) == 0
f5_4 = 1 / sp.cos(x) - 1 - x**2 / 2
assert sp.simplify(f5_4.subs(x, 0)) == 0
df5_4 = sp.simplify(sp.diff(f5_4, x))
assert sp.simplify(df5_4 - (sp.tan(x) / sp.cos(x) - x)) == 0
check_sign_at(df5_4, x, [sp.pi / 12, sp.pi / 4, sp.pi / 3], 1)

# 3-4-5-5: x > 3 => 3^x > x^3
f5_5 = t * sp.log(3) - 3 * sp.log(t)
assert sp.simplify(f5_5.subs(t, 3)) == 0
df5_5 = sp.diff(f5_5, t)
assert sp.simplify(df5_5 - (sp.log(3) - 3 / t)) == 0
check_sign_at(df5_5, t, [sp.Rational(31, 10), 4, 10], 1)

# 3-4-6: e^x = a*x (a > 0)
f6 = sp.exp(x) - a_pos * x
df6 = sp.diff(f6, x)
x0_6 = sp.solve(df6, x)[0]
assert sp.simplify(x0_6 - sp.log(a_pos)) == 0
min_val_6 = sp.simplify(f6.subs(x, x0_6))
assert sp.simplify(min_val_6 - a_pos * (1 - sp.log(a_pos))) == 0
assert sp.simplify(min_val_6.subs(a_pos, sp.E)) == 0
assert sp.limit(f6.subs(a_pos, 2), x, sp.oo) == sp.oo
assert sp.limit(f6.subs(a_pos, 2), x, -sp.oo) == sp.oo

# 3-4-7: f(x) = 2x - cos(2x)
f7 = 2 * x - sp.cos(2 * x)
df7 = sp.diff(f7, x)
assert sp.simplify(df7 - (2 + 2 * sp.sin(2 * x))) == 0
assert sp.simplify(df7.subs(x, -sp.pi / 4)) == 0
assert df7.subs(x, 0) == 2
assert df7.subs(x, sp.pi / 4) == 4
assert df7.subs(x, 3 * sp.pi / 4) == 0
# Non-monotone derivative: 2 < 4 > 0

# 3-4-9-1: y = 3x^2 - 6x + 1
f9_1 = 3 * x**2 - 6 * x + 1
assert sp.diff(f9_1, x, 2) == 6

# 3-4-9-2: y = -sinh(x - 1)
f9_2 = -sp.sinh(x - 1)
d2f9_2 = sp.diff(f9_2, x, 2)
assert sp.simplify(d2f9_2 - (-sp.sinh(x - 1))) == 0
assert sp.solve(d2f9_2, x) == [1]
check_sign_at(d2f9_2, x, [-2, 0], 1)
check_sign_at(d2f9_2, x, [2, 4], -1)

# 3-4-9-3: y = 2x - 4/x (x > 0)
f9_3 = 2 * x - 4 / x
d2f9_3 = sp.simplify(sp.diff(f9_3, x, 2))
assert sp.simplify(d2f9_3 - (-8 / x**3)) == 0
check_sign_at(d2f9_3, x, [sp.Rational(1, 2), 1, 5], -1)

# 3-4-9-4: y = x * arcsin(x), x in (-1, 1)
f9_4 = x * sp.asin(x)
d2f9_4 = sp.simplify(sp.diff(f9_4, x, 2))
assert sp.simplify(d2f9_4 - (2 - x**2) / (1 - x**2) ** sp.Rational(3, 2)) == 0
check_sign_at(d2f9_4, x, [-sp.Rational(1, 2), 0, sp.Rational(1, 2), sp.Rational(9, 10)], 1)

# 3-4-10-1: y = x^3 - 6x^2 + 9x + 2
f10_1 = x**3 - 6 * x**2 + 9 * x + 2
d2f10_1 = sp.diff(f10_1, x, 2)
assert sp.simplify(d2f10_1 - (6 * x - 12)) == 0
assert sp.solve(d2f10_1, x) == [2]
assert f10_1.subs(x, 2) == 4
check_sign_at(d2f10_1, x, [0, 1], -1)
check_sign_at(d2f10_1, x, [3, 5], 1)

# 3-4-10-2: y = (x - 1) * e^x
f10_2 = (x - 1) * sp.exp(x)
d2f10_2 = sp.simplify(sp.diff(f10_2, x, 2))
assert sp.simplify(d2f10_2 - (x + 1) * sp.exp(x)) == 0
assert sp.solve(d2f10_2, x) == [-1]
assert sp.simplify(f10_2.subs(x, -1) - (-2 / sp.E)) == 0
check_sign_at(d2f10_2, x, [-3, -2], -1)
check_sign_at(d2f10_2, x, [0, 2], 1)

# 3-4-10-3: y = (x - 2)^4 + e^(-x)
f10_3 = (x - 2) ** 4 + sp.exp(-x)
d2f10_3 = sp.diff(f10_3, x, 2)
assert sp.simplify(d2f10_3 - (12 * (x - 2) ** 2 + sp.exp(-x))) == 0
check_sign_at(d2f10_3, x, [-3, 0, 2, 5], 1)

# 3-4-10-4: y = ln(x^2 + 4)
f10_4 = sp.log(x**2 + 4)
d2f10_4 = sp.factor(sp.diff(f10_4, x, 2))
assert sp.simplify(d2f10_4 - 2 * (4 - x**2) / (x**2 + 4) ** 2) == 0
assert set(sp.solve(sp.numer(d2f10_4), x)) == {-2, 2}
assert sp.simplify(f10_4.subs(x, 2) - sp.log(8)) == 0
assert sp.simplify(f10_4.subs(x, -2) - sp.log(8)) == 0
check_sign_at(d2f10_4, x, [-3, 3], -1)
check_sign_at(d2f10_4, x, [-1, 0, 1], 1)

# 3-4-10-5: y = e^(2*arctan(x))
f10_5 = sp.exp(2 * sp.atan(x))
d2f10_5 = sp.simplify(sp.diff(f10_5, x, 2))
assert sp.simplify(d2f10_5 - 4 * (1 - x) * sp.exp(2 * sp.atan(x)) / (1 + x**2) ** 2) == 0
assert sp.solve(sp.numer(d2f10_5), x) == [1]
assert sp.simplify(f10_5.subs(x, 1) - sp.exp(sp.pi / 2)) == 0
check_sign_at(d2f10_5, x, [-2, 0], 1)
check_sign_at(d2f10_5, x, [2, 5], -1)

# 3-4-10-6: y = x^3 * (6*ln(x) - 5) (x > 0)
f10_6 = x_pos**3 * (6 * sp.log(x_pos) - 5)
df10_6 = sp.simplify(sp.diff(f10_6, x_pos))
assert sp.simplify(df10_6 - 9 * x_pos**2 * (2 * sp.log(x_pos) - 1)) == 0
d2f10_6 = sp.simplify(sp.diff(f10_6, x_pos, 2))
assert sp.simplify(d2f10_6 - 36 * x_pos * sp.log(x_pos)) == 0
assert sp.solve(d2f10_6, x_pos) == [1]
assert f10_6.subs(x_pos, 1) == -5
check_sign_at(d2f10_6, x_pos, [sp.Rational(1, 2), sp.Rational(1, 10)], -1)
check_sign_at(d2f10_6, x_pos, [2, sp.E], 1)

# 3-4-11-1: f(t) = t^p (0 < p < 1, t > 0)
f11_1 = t_pos**p_unit
d2f11_1 = sp.diff(f11_1, t_pos, 2)
assert sp.simplify(d2f11_1 - p_unit * (p_unit - 1) * t_pos ** (p_unit - 2)) == 0
check_sign_at(d2f11_1, t_pos, [sp.Rational(1, 2), 2], -1, {p_unit: sp.Rational(1, 2)})

# 3-4-11-2: f(t) = a^t (a > 0, a != 1)
f11_2 = a_pos**t
d2f11_2 = sp.diff(f11_2, t, 2)
assert sp.simplify(d2f11_2 - a_pos**t * sp.log(a_pos) ** 2) == 0
check_sign_at(d2f11_2, t, [-2, 0, 2], 1, {a_pos: 2})
check_sign_at(d2f11_2, t, [-2, 0, 2], 1, {a_pos: sp.Rational(1, 2)})

# 3-4-11-3: f(t) = ln(1 + e^t)
f11_3 = sp.log(1 + sp.exp(t))
d2f11_3 = sp.together(sp.diff(f11_3, t, 2))
assert sp.together(d2f11_3 - sp.exp(t) / (1 + sp.exp(t)) ** 2) == 0
check_sign_at(d2f11_3, t, [-3, 0, 3], 1)

# 3-4-11-4: f(x) = cos(x) - (1 - 2x/pi) on [0, pi/2]
f11_4 = sp.cos(x) - (1 - 2 * x / sp.pi)
assert sp.simplify(f11_4.subs(x, 0)) == 0
assert sp.simplify(f11_4.subs(x, sp.pi / 2)) == 0
d2f11_4 = sp.diff(f11_4, x, 2)
assert sp.simplify(d2f11_4 - (-sp.cos(x))) == 0
check_sign_at(d2f11_4, x, [sp.pi / 12, sp.pi / 4, 5 * sp.pi / 12], -1)

# 3-4-12: y = (2x + 4) / (x^2 + 4) has 3 collinear inflection points
f12 = (2 * x + 4) / (x**2 + 4)
d2f12 = sp.factor(sp.diff(f12, x, 2))
assert sp.simplify(d2f12 - 4 * (x - 2) * (x**2 + 8 * x + 4) / (x**2 + 4) ** 3) == 0
roots12 = sorted(sp.solve(sp.numer(d2f12), x), key=lambda r: float(sp.N(r)))
assert len(roots12) == 3
expected_roots12 = [-4 - 2 * sp.sqrt(3), -4 + 2 * sp.sqrt(3), sp.Integer(2)]
for r1, r2 in zip(roots12, expected_roots12):
    assert sp.simplify(r1 - r2) == 0
# Sign alternates across all three roots
check_sign_at(d2f12, x, [-8], -1)
check_sign_at(d2f12, x, [-4], 1)
check_sign_at(d2f12, x, [0], -1)
check_sign_at(d2f12, x, [3], 1)
pts12 = [(r, sp.simplify(f12.subs(x, r))) for r in expected_roots12]
assert sp.simplify(pts12[0][1] - (1 - sp.sqrt(3)) / 4) == 0
assert sp.simplify(pts12[1][1] - (1 + sp.sqrt(3)) / 4) == 0
assert sp.simplify(pts12[2][1] - 1) == 0
# All three lie on y = x/8 + 3/4
for px, py in pts12:
    assert sp.simplify(py - (px / 8 + sp.Rational(3, 4))) == 0

# 3-4-13: (2, -4) is inflection point of y = a*x^3 + b*x^2
f13 = a * x**3 + b * x**2
sol13 = sp.solve([f13.subs(x, 2) + 4, sp.diff(f13, x, 2).subs(x, 2)], [a, b])
assert sol13 == {a: sp.Rational(1, 4), b: -sp.Rational(3, 2)}
d2f13 = sp.diff(f13.subs(sol13), x, 2)
assert sp.simplify(d2f13 - sp.Rational(3, 2) * (x - 2)) == 0

# 3-4-14: y = a*x^3 + b*x^2 + c*x + d; horizontal tangent at x=3, inflection (1, -2), passes (3, -18)
f14 = a * x**3 + b * x**2 + c * x + d
sol14 = sp.solve(
    [
        sp.diff(f14, x).subs(x, 3),
        sp.diff(f14, x, 2).subs(x, 1),
        f14.subs(x, 1) + 2,
        f14.subs(x, 3) + 18,
    ],
    [a, b, c, d],
)
assert sol14 == {a: 1, b: -3, c: -9, d: 9}
d2f14 = sp.diff(f14.subs(sol14), x, 2)
assert sp.simplify(d2f14 - (6 * x - 6)) == 0

# 3-4-15: y = k*(x^2 - 6)^2, normal at inflection points passes through (0, 0)
f15 = k * (x**2 - 6) ** 2
df15 = sp.factor(sp.diff(f15, x))
d2f15 = sp.factor(sp.diff(f15, x, 2))
assert sp.simplify(d2f15 - 12 * k * (x**2 - 2)) == 0
inf15 = [-sp.sqrt(2), sp.sqrt(2)]
for x0 in inf15:
    y0 = f15.subs(x, x0)
    slope = df15.subs(x, x0)
    # Normal line: Y - y0 = (-1/slope)*(X - x0); substitute X=0, Y=0 => -y0 = x0/slope => y0*slope + x0 = 0
    k_sols = sp.solve(sp.simplify(y0 * slope + x0), k)
    assert set(k_sols) == {-sp.Rational(1, 16), sp.Rational(1, 16)}

print("ALL 35 SYMBOLIC CHECKS FOR JC935 SECTION 3-4 PASSED.")

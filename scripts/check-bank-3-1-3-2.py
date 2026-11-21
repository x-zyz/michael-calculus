"""Symbolic checks for the JC935 Sections 3-1 and 3-2 variants."""

from sympy import (
    AccumBounds,
    Rational,
    atan,
    cos,
    cot,
    diff,
    exp,
    limit,
    log,
    oo,
    pi,
    real_roots,
    sec,
    simplify,
    sin,
    solve,
    sqrt,
    symbols,
    tan,
)

x, xi = symbols("x xi", real=True)
c, d, beta, gamma = symbols("c d beta gamma", real=True)
alpha = symbols("alpha", real=True, nonzero=True)
a = symbols("a", positive=True)
m = symbols("m", real=True, nonzero=True)
p = symbols("p", positive=True)

verified = set()


def check(item_id, *pairs):
    for actual, expected in pairs:
        assert actual == expected or simplify(actual - expected) == 0, (item_id, actual, expected)
    assert item_id not in verified, item_id
    verified.add(item_id)


# === Section 3-1 (6 computable / symbolic MVT items) ===

# jc935-3-1-1: f(x) = ln(cos x) on [-pi/3, pi/3]
f1 = log(cos(x))
df1 = diff(f1, x)
check(
    "jc935-3-1-1",
    (f1.subs(x, -pi / 3), log(Rational(1, 2))),
    (f1.subs(x, pi / 3), log(Rational(1, 2))),
    (df1.subs(x, 0), 0),
)
assert float(-pi / 3) < 0 < float(pi / 3)

# jc935-3-1-2: f(x) = 3x^3 - 4x^2 + 2x + 1 on [0, 1]
f2 = 3 * x**3 - 4 * x**2 + 2 * x + 1
secant2 = (f2.subs(x, 1) - f2.subs(x, 0)) / (1 - 0)
roots2 = solve(diff(f2, x) - secant2, x)
expected_roots2 = [(4 - sqrt(7)) / 9, (4 + sqrt(7)) / 9]
assert len(roots2) == 2
assert all(0 < float(r) < 1 for r in roots2)
check(
    "jc935-3-1-2",
    (secant2, 1),
    (roots2[0], expected_roots2[0]),
    (roots2[1], expected_roots2[1]),
)

# jc935-3-1-3: Cauchy MVT for f(x)=cos x, g(x)=x-sin x on [0, pi/2]
f3 = cos(x)
g3 = x - sin(x)
lhs3 = (f3.subs(x, pi / 2) - f3.subs(x, 0)) / (g3.subs(x, pi / 2) - g3.subs(x, 0))
xi3 = 2 * atan((pi - 2) / 2)
rhs3 = (diff(f3, x) / diff(g3, x)).subs(x, xi3)
assert 0 < float(xi3) < float(pi / 2)
check("jc935-3-1-3", (simplify(lhs3 - rhs3), 0))

# jc935-3-1-4: Quadratic f(x) = alpha*x^2 + beta*x + gamma on [c, d] (alpha != 0)
f4 = alpha * x**2 + beta * x + gamma
secant4 = simplify((f4.subs(x, d) - f4.subs(x, c)) / (d - c))
roots4 = solve(diff(f4, x).subs(x, xi) - secant4, xi)
assert len(roots4) == 1
check("jc935-3-1-4", (roots4[0], (c + d) / 2))

# jc935-3-1-5: f(x) = (x+2)(x-1)(x-4)(x-7), real roots of f'(x)=0
f5 = (x + 2) * (x - 1) * (x - 4) * (x - 7)
roots5 = real_roots(diff(f5, x), x)
assert len(roots5) == 3
r5_vals = sorted(float(r.evalf()) for r in roots5)
assert -2 < r5_vals[0] < 1
assert 1 < r5_vals[1] < 4
assert 4 < r5_vals[2] < 7
check("jc935-3-1-5", (len(roots5), 3))

# jc935-3-1-6: arctan(x) + arctan(1/x) = pi/2 for x > 0
f6 = atan(p) + atan(1 / p)
check("jc935-3-1-6", (simplify(diff(f6, p)), 0), (f6.subs(p, 1), pi / 2))


# === Section 3-2 (all 19 L'Hopital items) ===

check("jc935-3-2-1-1", (limit(log(1 + 4 * x) / (2 * x), x, 0), 2))
check("jc935-3-2-1-2", (limit((exp(2 * x) - exp(-3 * x)) / sin(2 * x), x, 0), Rational(5, 2)))
check("jc935-3-2-1-3", (limit((tan(x) - sin(x)) / (x - sin(x)), x, 0), 3))
check("jc935-3-2-1-4", (limit(sin(5 * x) / tan(4 * x), x, pi), Rational(-5, 4)))
check("jc935-3-2-1-5", (limit(log(-cos(x)) / (pi - x) ** 2, x, pi), Rational(-1, 2)))
num6 = exp(x * log(a)) - exp(a * log(a))
den6 = x**m - a**m
check(
    "jc935-3-2-1-6",
    (limit(num6 / den6, x, a), a ** (a - m + 1) * log(a) / m),
    (
        (diff(a**x - a**a, x) / diff(x**m - a**m, x)).subs(x, a),
        a ** (a - m + 1) * log(a) / m,
    ),
)
check("jc935-3-2-1-7", (limit(log(sin(5 * x)) / log(sin(3 * x)), x, 0, dir="+"), 1))
check("jc935-3-2-1-8", (limit(tan(3 * x) / tan(5 * x), x, pi / 2), Rational(5, 3)))
check("jc935-3-2-1-9", (limit(log(1 + 3 / x) / atan(2 / x), x, oo), Rational(3, 2)))
check("jc935-3-2-1-10", (limit(log(1 + 3 * x**2) / (sec(2 * x) - cos(2 * x)), x, 0), Rational(3, 4)))
check("jc935-3-2-1-11", (limit((exp(2 * x) - 1) * cot(3 * x), x, 0), Rational(2, 3)))
check(
    "jc935-3-2-1-12",
    (limit(x**4 * exp(1 / x**2), x, 0, dir="+"), oo),
    (limit(x**4 * exp(1 / x**2), x, 0, dir="-"), oo),
)
check("jc935-3-2-1-13", (limit(4 / (x**2 - 4) - 1 / (x - 2), x, 2), Rational(-1, 4)))
check("jc935-3-2-1-14", (limit((exp(2 * x) + 3 * x) ** (1 / x), x, 0), exp(5)))
check("jc935-3-2-1-15", (limit(sin(x) ** x, x, 0, dir="+"), 1))
check("jc935-3-2-1-16", (limit((2 / x) ** tan(3 * x), x, 0, dir="+"), 1))

# jc935-3-2-2: lim_{x->oo} (2x - cos x)/x = 2, derivative ratio 2 + sin x oscillates
num2 = 2 * x - cos(x)
den2 = x
check(
    "jc935-3-2-2",
    (limit(num2 / den2, x, oo), 2),
    (limit(num2 / den2, x, -oo), 2),
    (limit(diff(num2, x) / diff(den2, x), x, oo), AccumBounds(1, 3)),
)

# jc935-3-2-3: lim_{x->0} x^2 cos(1/x) / tan x = 0, derivative ratio oscillates
num3 = x**2 * cos(1 / x)
den3 = tan(x)
check(
    "jc935-3-2-3",
    (limit(num3 / den3, x, 0, dir="+"), 0),
    (limit(num3 / den3, x, 0, dir="-"), 0),
    (limit(diff(num3, x) / diff(den3, x), x, 0, dir="+"), AccumBounds(-1, 1)),
)

# jc935-3-2-4: continuity at x=0 for [((1+2x)^(1/x))/e^2]^(1/x) (x>0), e^(-2) (x<=0)
expr4 = ((1 + 2 * x) ** (1 / x) / exp(2)) ** (1 / x)
check("jc935-3-2-4", (limit(expr4, x, 0, dir="+"), exp(-2)))

assert len(verified) == 25, f"Expected 25 verified items, got {len(verified)}"
print(f"Verified {len(verified)} JC935 3-1/3-2 symbolic items successfully.")

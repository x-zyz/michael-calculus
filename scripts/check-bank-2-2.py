"""Symbolic checks for the JC935 Section 2-2 (求导法则) original variants."""

from sympy import (
    Abs,
    Function,
    Rational,
    acos,
    acosh,
    asin,
    asinh,
    atan,
    cos,
    cosh,
    cot,
    csc,
    diff,
    exp,
    expand,
    expand_trig,
    factor,
    log,
    pi,
    powsimp,
    sec,
    simplify,
    sin,
    sinh,
    solve,
    sqrt,
    symbols,
    tan,
    tanh,
    trigsimp,
)

x, t, theta = symbols("x t theta", real=True)
p = symbols("p", positive=True)
n = symbols("n", positive=True, integer=True)
verified = set()


def check(question, *pairs):
    for actual, expected in pairs:
        delta = actual - expected
        rad_delta = delta.replace(
            lambda e: e.is_Pow and e.exp in (Rational(1, 2), Rational(-1, 2)),
            lambda e: factor(e.base) ** e.exp,
        )
        ok = (
            actual == expected
            or simplify(delta) == 0
            or simplify(rad_delta) == 0
            or trigsimp(delta) == 0
            or simplify(expand_trig(powsimp(delta, force=True))) == 0
            or simplify(powsimp(expand(delta.rewrite(exp)), force=True)) == 0
        )
        assert ok, (question, actual, expected, simplify(rad_delta))
    assert question not in verified, question
    verified.add(question)


# Q1: cot and csc derivatives
check("1-1", (diff(cot(3 * x + 1), x), -3 * csc(3 * x + 1) ** 2))
check("1-2", (diff(csc(2 * x - 1), x), -2 * csc(2 * x - 1) * cot(2 * x - 1)))

# Q2: sum, product, quotient rules
check("2-1", (diff(2 * x**4 + 5 / x**3 - 4 / x + 9, x), 8 * x**3 - 15 / x**4 + 4 / x**2))
check("2-2", (diff(4 * x**3 - 3**x + 2 * exp(x), x), 12 * x**2 - 3**x * log(3) + 2 * exp(x)))
check("2-3", (diff(3 * tan(x) - 2 * sec(x) + 7, x), 3 * sec(x) ** 2 - 2 * sec(x) * tan(x)))
check("2-4", (diff(3 * sin(x) * cos(x), x), 3 * cos(2 * x)))
check("2-5", (diff(p**3 * log(p), p), p**2 * (3 * log(p) + 1)))
check("2-6", (diff(2 * exp(x) * sin(x), x), 2 * exp(x) * (sin(x) + cos(x))))
check("2-7", (diff(log(p) / p**2, p), (1 - 2 * log(p)) / p**3))
check("2-8", (diff(exp(x) / x**3 + log(5), x), exp(x) * (x - 3) / x**4))
check("2-9", (diff(p * log(p) * sin(p), p), (log(p) + 1) * sin(p) + p * log(p) * cos(p)))
check("2-10", (diff((2 + sin(x)) / (2 + cos(x)), x), (1 + 2 * cos(x) + 2 * sin(x)) / (2 + cos(x)) ** 2))

# Q3: derivatives at specific points
f31 = 2 * sin(x) + cos(x)
check("3-1", (diff(f31, x).subs(x, 0), 2), (diff(f31, x).subs(x, pi / 3), 1 - sqrt(3) / 2))
rho = theta * sin(theta) + 2 * cos(theta)
check("3-2", (diff(rho, theta).subs(theta, pi / 2), -1))
f33 = 4 / (6 - x) + x**2 / 4
check("3-3", (diff(f33, x).subs(x, 0), Rational(1, 9)), (diff(f33, x).subs(x, 2), Rational(5, 4)))

# Q4: vertical motion
height = 5 + 18 * t - Rational(9, 2) * t**2
vel = diff(height, t)
check("4-1", (vel, 18 - 9 * t))
peak_t = solve(vel, t)
assert peak_t == [2]
check("4-2", (peak_t[0], 2), (height.subs(t, 2), 23))

# Q5: tangent and normal lines at x = 0
curve5 = 2 * x**2 + 3 * sin(x)
tan5 = 3 * x
nor5 = -x / 3
check(
    "5",
    (curve5.subs(x, 0), 0),
    (diff(curve5, x).subs(x, 0), 3),
    (tan5.subs(x, 0), 0),
    (nor5.subs(x, 0), 0),
    (diff(tan5, x) * diff(nor5, x), -1),
)

# Q6: basic chain rule
check("6-1", (diff((3 * x - 2) ** 5, x), 15 * (3 * x - 2) ** 4))
check("6-2", (diff(cos(5 - 4 * x), x), 4 * sin(5 - 4 * x)))
check("6-3", (diff(exp(-4 * x**2), x), -8 * x * exp(-4 * x**2)))
check("6-4", (diff(log(4 + 3 * x**2), x), 6 * x / (4 + 3 * x**2)))
check("6-5", (diff(sin(2 * x) ** 2, x), 2 * sin(4 * x)))
check("6-6", (diff(sqrt(16 - 4 * x**2), x), -4 * x / sqrt(16 - 4 * x**2)))
check("6-7", (diff(tan(3 * x**2), x), 6 * x * sec(3 * x**2) ** 2))
check("6-8", (diff(atan(exp(2 * x)), x), 2 * exp(2 * x) / (1 + exp(4 * x))))
check("6-9", (diff(asin(x) ** 3, x), 3 * asin(x) ** 2 / sqrt(1 - x**2)))
check("6-10", (diff(log(cos(3 * x)), x), -3 * tan(3 * x)))

# Q7: intermediate chain / product / quotient rule
check("7-1", (diff(asin(2 - 3 * x), x), -3 / sqrt(1 - (2 - 3 * x) ** 2)))
check("7-2", (diff(1 / sqrt(9 - x**2), x), x / (9 - x**2) ** Rational(3, 2)))
check(
    "7-3",
    (
        diff(exp(-x / 3) * cos(2 * x), x),
        -exp(-x / 3) * (Rational(1, 3) * cos(2 * x) + 2 * sin(2 * x)),
    ),
)
# 7-4: |x| > 2 checked on both x = 2 + p and x = -2 - p
f74_expr = diff(acos(2 / x), x)
ans74 = 2 / (Abs(x) * sqrt(x**2 - 4))
check(
    "7-4",
    (f74_expr.subs(x, 2 + p), ans74.subs(x, 2 + p)),
    (f74_expr.subs(x, -2 - p), ans74.subs(x, -2 - p)),
)
check("7-5", (diff((2 - log(p)) / (2 + log(p)), p), -4 / (p * (2 + log(p)) ** 2)))
check("7-6", (diff(sin(3 * x) / x, x), (3 * x * cos(3 * x) - sin(3 * x)) / x**2))
# 7-7: 0 < x < 2 parameterized as x = 2*p/(1+p)
x77 = 2 * p / (1 + p)
check("7-7", (diff(asin(sqrt(x / 2)), x).subs(x, x77), (1 / (2 * sqrt(x * (2 - x)))).subs(x, x77)))
check("7-8", (diff(log(2 * x + sqrt(9 + 4 * x**2)), x), 2 / sqrt(9 + 4 * x**2)))
check("7-9", (diff(log(sec(2 * x) + tan(2 * x)), x), 2 * sec(2 * x)))
check("7-10", (diff(log(csc(3 * x) - cot(3 * x)), x), 3 * csc(3 * x)))

# Q8: multi-layer chain rule & algebraic simplification
# 8-1: |x| < 3 via x = 3*(p-1)/(p+1)
x81 = 3 * (p - 1) / (p + 1)
check(
    "8-1",
    (
        diff(asin(x / 3) ** 2, x).subs(x, x81),
        (2 * asin(x / 3) / sqrt(9 - x**2)).subs(x, x81),
    ),
)
check("8-2", (diff(log(tan(x / 3)), x), 2 / (3 * sin(2 * x / 3))))
check("8-3", (diff(sqrt(4 + log(p) ** 2), p), log(p) / (p * sqrt(4 + log(p) ** 2))))
check(
    "8-4",
    (diff(exp(atan(sqrt(2 * p))), p), exp(atan(sqrt(2 * p))) / ((1 + 2 * p) * sqrt(2 * p))),
)
check(
    "8-5",
    (
        diff(sin(2 * x) ** n * cos(2 * n * x), x),
        2 * n * sin(2 * x) ** (n - 1) * cos(2 * n * x + 2 * x),
    ),
)
check("8-6", (diff(atan((x + 2) / (x - 2)), x), -2 / (x**2 + 4)))
# 8-7: |x| < 2, use asin(u) + acos(u) = pi/2
x87 = 2 * (p - 1) / (p + 1)
d87 = diff(asin(x / 2) / acos(x / 2), x).subs(asin(x / 2), pi / 2 - acos(x / 2))
check(
    "8-7",
    (d87.subs(x, x87), (pi / (2 * sqrt(4 - x**2) * acos(x / 2) ** 2)).subs(x, x87)),
)
# 8-8: triple nested log, x > e/2
check("8-8", (diff(log(log(log(2 * p))), p), 1 / (p * log(2 * p) * log(log(2 * p)))))
# 8-9: |x| < 4 via x = 4*(p-1)/(p+1)
x89 = 4 * (p - 1) / (p + 1)
f89 = (sqrt(4 + x) - sqrt(4 - x)) / (sqrt(4 + x) + sqrt(4 - x))
ans89 = 4 / (sqrt(16 - x**2) * (4 + sqrt(16 - x**2)))
check("8-9", (diff(f89, x).subs(x, x89), ans89.subs(x, x89)))
# 8-10: 0 < x < 2 via x = 2*p/(1+p)
x810 = 2 * p / (1 + p)
f810 = asin(sqrt((2 - x) / (2 + x)))
ans810 = -sqrt(2) / ((2 + x) * sqrt(x * (2 - x)))
check("8-10", (diff(f810, x).subs(x, x810), ans810.subs(x, x810)))

# Q9 & Q10: abstract differentiable functions
u = Function("u")
v = Function("v")
f = Function("f")
s = symbols("s", real=True)


def fp(arg):
    return diff(f(s), s).subs(s, arg)


check(
    "9",
    (
        diff(sqrt(2 * u(x) ** 2 + 3 * v(x) ** 2), x),
        (2 * u(x) * diff(u(x), x) + 3 * v(x) * diff(v(x), x)) / sqrt(2 * u(x) ** 2 + 3 * v(x) ** 2),
    ),
)
check("10-1", (diff(f(x**3 + 1), x), 3 * x**2 * fp(x**3 + 1)))
check(
    "10-2",
    (
        diff(f(sin(2 * x) ** 2) - f(cos(2 * x) ** 2), x),
        2 * sin(4 * x) * (fp(sin(2 * x) ** 2) + fp(cos(2 * x) ** 2)),
    ),
)
check(
    "10-3",
    (
        diff(f(exp(2 * x)) / exp(2 * f(x)), x),
        2 * exp(-2 * f(x)) * (exp(2 * x) * fp(exp(2 * x)) - diff(f(x), x) * f(exp(2 * x))),
    ),
)

# Q11: mixed advanced derivatives
check("11-1", (diff(exp(-2 * x) * (x**2 - x + 1), x), exp(-2 * x) * (-2 * x**2 + 4 * x - 3)))
check(
    "11-2",
    (
        diff(cos(x) ** 2 * cos(x**2), x),
        -sin(2 * x) * cos(x**2) - 2 * x * cos(x) ** 2 * sin(x**2),
    ),
)
check("11-3", (diff(atan(x / 3) ** 2, x), 6 * atan(x / 3) / (9 + x**2)))
check("11-4", (diff(log(2 * p) / p**n, p), (1 - n * log(2 * p)) / p ** (n + 1)))
check(
    "11-5",
    (
        diff((exp(2 * t) - exp(-2 * t)) / (exp(2 * t) + exp(-2 * t)), t),
        8 / (exp(2 * t) + exp(-2 * t)) ** 2,
    ),
)
check("11-6", (diff(log(sin(2 / x)), x), -2 * cot(2 / x) / x**2))
check(
    "11-7",
    (
        diff(exp(-cos(2 / x) ** 2), x),
        -2 * sin(4 / x) * exp(-cos(2 / x) ** 2) / x**2,
    ),
)
check(
    "11-8",
    (
        diff(sqrt(2 * p + sqrt(2 * p)), p),
        (2 * sqrt(2 * p) + 1) / (2 * sqrt(2 * p) * sqrt(2 * p + sqrt(2 * p))),
    ),
)
x119 = 3 * (p - 1) / (p + 1)
check("11-9", (diff(x * asin(x / 3) + sqrt(9 - x**2), x).subs(x, x119), asin(x119 / 3)))
# 11-10: piecewise sign for |t| < 2 vs |t| > 2
d1110 = diff(asin(4 * t / (4 + t**2)), t)
t_in_pos = 2 * p / (1 + p)
t_in_neg = -2 * p / (1 + p)
t_out_pos = 2 + p
t_out_neg = -2 - p
check(
    "11-10",
    (d1110.subs(t, t_in_pos), 4 / (4 + t_in_pos**2)),
    (d1110.subs(t, t_in_neg), 4 / (4 + t_in_neg**2)),
    (d1110.subs(t, t_out_pos), -4 / (4 + t_out_pos**2)),
    (d1110.subs(t, t_out_neg), -4 / (4 + t_out_neg**2)),
)

# Q12: hyperbolic and inverse hyperbolic functions
check("12-1", (diff(sinh(cosh(2 * x)), x), 2 * sinh(2 * x) * cosh(cosh(2 * x))))
check("12-2", (diff(cosh(x) * exp(sinh(x)), x), exp(sinh(x)) * (sinh(x) + cosh(x) ** 2)))
check("12-3", (diff(tanh(log(3 * p)), p), 1 / (p * cosh(log(3 * p)) ** 2)))
check("12-4", (diff(cosh(x) ** 3 + sinh(x) ** 2, x), sinh(x) * cosh(x) * (3 * cosh(x) + 2)))
check("12-5", (diff(tanh(2 - 3 * x**2), x), -6 * x / cosh(2 - 3 * x**2) ** 2))
check("12-6", (diff(asinh(2 * x**2 + 1), x), 4 * x / sqrt(4 * x**4 + 4 * x**2 + 2)))
check("12-7", (diff(acosh(exp(3 * p)), p), 3 * exp(3 * p) / sqrt(exp(6 * p) - 1)))
check("12-8", (diff(atan(tanh(2 * x)), x), 2 / cosh(4 * x)))
check("12-9", (diff(log(cosh(2 * x)) + 1 / (2 * cosh(2 * x) ** 2), x), 2 * tanh(2 * x) ** 3))
check(
    "12-10",
    (
        diff(sinh((x - 2) / (x + 2)) ** 2, x),
        4 * sinh(2 * (x - 2) / (x + 2)) / (x + 2) ** 2,
    ),
)

assert len(verified) == 72
print(f"SymPy verified {len(verified)} derivative-rules exercises (Section 2-2)")

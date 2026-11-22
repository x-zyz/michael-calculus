"""Symbolic checks for the JC935 Section 2-4 (implicit, parametric & related rates) variants."""

from sympy import (
    Function,
    Rational,
    atan,
    cos,
    diff,
    exp,
    idiff,
    ln,
    pi,
    simplify,
    sin,
    solve,
    sqrt,
    symbols,
    tan,
)

x, y, t, theta = symbols("x y t theta", real=True)
a, b, p, q = symbols("a b p q", positive=True)
verified = set()


def check(question, *pairs):
    for actual, expected in pairs:
        diff_expr = simplify(actual - expected)
        assert actual == expected or diff_expr == 0, (question, actual, expected, diff_expr)
    assert question not in verified, question
    verified.add(question)


# 1-1: y^2 - 4xy + 5 = 0
check("1-1", (idiff(y**2 - 4 * x * y + 5, y, x), 2 * y / (y - 2 * x)))

# 1-2: x^3 + y^3 - 6bxy = 0
check("1-2", (idiff(x**3 + y**3 - 6 * b * x * y, y, x), (2 * b * y - x**2) / (y**2 - 2 * b * x)))

# 1-3: xy = e^(2x + y)
check("1-3", (idiff(x * y - exp(2 * x + y), y, x), (2 * exp(2 * x + y) - y) / (x - exp(2 * x + y))))

# 1-4: y = 2 - x e^(2y)
check("1-4", (idiff(y - 2 + x * exp(2 * y), y, x), -exp(2 * y) / (1 + 2 * x * exp(2 * y))))

# 2: x^(2/3) + y^(2/3) = 5 b^(2/3) at (8b, b)
xp, yp = symbols("xp yp", positive=True)
eq2 = xp**Rational(2, 3) + yp**Rational(2, 3) - 5 * b**Rational(2, 3)
slope2 = idiff(eq2, yp, xp).subs({xp: 8 * b, yp: b})
tan2 = x + 2 * y - 10 * b
nor2 = 2 * x - y - 15 * b
check(
    "2",
    (eq2.subs({xp: 8 * b, yp: b}), 0),
    (slope2, Rational(-1, 2)),
    (tan2.subs({x: 8 * b, y: b}), 0),
    (nor2.subs({x: 8 * b, y: b}), 0),
    (solve(tan2, y)[0].diff(x), slope2),
    (solve(nor2, y)[0].diff(x) * slope2, -1),
)

# 3: x^2 y + x y^2 = 16 -> horizontal at (2, -4), vertical at (-4, 2)
eq3 = x**2 * y + x * y**2 - 16
dy3 = idiff(eq3, y, x)
dx3 = idiff(eq3, x, y)
horiz_sols = [s for s in solve([eq3, 2 * x * y + y**2], [x, y], dict=True) if s[x].is_real and s[y].is_real]
vert_sols = [s for s in solve([eq3, x**2 + 2 * x * y], [x, y], dict=True) if s[x].is_real and s[y].is_real]
assert horiz_sols == [{x: 2, y: -4}]
assert vert_sols == [{x: -4, y: 2}]
check(
    "3",
    (dy3.subs({x: 2, y: -4}), 0),
    (dx3.subs({x: -4, y: 2}), 0),
)

# 4-1: q^2 y^2 - p^2 x^2 = p^2 q^2
eq4_1 = q**2 * y**2 - p**2 * x**2 - p**2 * q**2
y1_4_1 = idiff(eq4_1, y, x)
y2_4_1 = simplify(idiff(eq4_1, y, x, 2).subs(x**2, q**2 * (y**2 - p**2) / p**2))
check("4-1", (y1_4_1, p**2 * x / (q**2 * y)), (y2_4_1, p**4 / (q**2 * y**3)))

# 4-2: y = tan(x - y)
eq4_2 = y - tan(x - y)
y1_4_2 = simplify(idiff(eq4_2, y, x).subs(tan(x - y), y))
y2_4_2 = simplify(idiff(eq4_2, y, x, 2).subs(tan(x - y), y))
check("4-2", (y1_4_2, (1 + y**2) / (2 + y**2)), (y2_4_2, 2 * y * (1 + y**2) / (2 + y**2) ** 3))

# 4-3: y = 2 - x e^y
eq4_3 = y - 2 + x * exp(y)
y1_4_3 = idiff(eq4_3, y, x)
y2_4_3 = idiff(eq4_3, y, x, 2)
check(
    "4-3",
    (y1_4_3, -exp(y) / (1 + x * exp(y))),
    (y2_4_3, exp(2 * y) * (2 + x * exp(y)) / (1 + x * exp(y)) ** 3),
)

# 4-4: 2y - x = (x + y) ln(x + y)
eq4_4 = 2 * y - x - (x + y) * ln(x + y)
y1_4_4 = idiff(eq4_4, y, x)
y2_4_4 = idiff(eq4_4, y, x, 2)
check(
    "4-4",
    (y1_4_4, (ln(x + y) + 2) / (1 - ln(x + y))),
    (y2_4_4, 9 / ((x + y) * (1 - ln(x + y)) ** 3)),
)

# 5-1: y = (x / (x + 2))^x (x > 0)
f5_1 = (xp / (xp + 2)) ** xp
check("5-1", (diff(f5_1, xp), f5_1 * (ln(xp / (xp + 2)) + 2 / (xp + 2))))

# 5-2: y = ((x - 2) / (x^2 + 3)^(1/4))^(1/3) (x > 2)
xgt2 = symbols("xgt2", positive=True)
f5_2 = (xgt2 / ((xgt2 + 2) ** 2 + 3) ** Rational(1, 4)) ** Rational(1, 3)
exp5_2 = f5_2 * (1 / (3 * xgt2) - (xgt2 + 2) / (6 * ((xgt2 + 2) ** 2 + 3)))
check("5-2", (diff(f5_2, xgt2), exp5_2))

# 5-3: y = sqrt(x + 3) (4 - x)^3 / (x + 2)^4 (-2 < x < 4)
f5_3 = sqrt(x + 3) * (4 - x) ** 3 / (x + 2) ** 4
exp5_3 = f5_3 * (1 / (2 * (x + 3)) - 3 / (4 - x) - 4 / (x + 2))
check("5-3", (diff(f5_3, x), exp5_3))

# 5-4: y = sqrt(x cos(x) sqrt(1 + e^(2x))) (0 < x < pi/2)
f5_4 = sqrt(xp * cos(xp) * sqrt(1 + exp(2 * xp)))
exp5_4 = Rational(1, 2) * f5_4 * (1 / xp - tan(xp) + exp(2 * xp) / (1 + exp(2 * xp)))
check("5-4", (diff(f5_4, xp), exp5_4))

# 6-1: x = p t^3, y = q t^4
check("6-1", (diff(q * t**4, t) / diff(p * t**3, t), 4 * q * t / (3 * p)))

# 6-2: x = theta(1 + cos theta), y = theta sin theta
check(
    "6-2",
    (
        diff(theta * sin(theta), theta) / diff(theta * (1 + cos(theta)), theta),
        (sin(theta) + theta * cos(theta)) / (1 + cos(theta) - theta * sin(theta)),
    ),
)

# 7: x = e^(2t) cos t, y = e^(2t) sin t at t = pi/4
dy7 = diff(exp(2 * t) * sin(t), t) / diff(exp(2 * t) * cos(t), t)
check("7", (dy7.subs(t, pi / 4), 3))

# 8-1: x = 2 cos t, y = 2 sin(2t) at t = pi/6
x8_1, y8_1 = 2 * cos(t), 2 * sin(2 * t)
pt8_1 = (x8_1.subs(t, pi / 6), y8_1.subs(t, pi / 6))
k8_1 = (diff(y8_1, t) / diff(x8_1, t)).subs(t, pi / 6)
tan8_1 = 2 * x + y - 3 * sqrt(3)
nor8_1 = x - 2 * y + sqrt(3)
check(
    "8-1",
    (pt8_1[0], sqrt(3)),
    (pt8_1[1], sqrt(3)),
    (k8_1, -2),
    (tan8_1.subs({x: pt8_1[0], y: pt8_1[1]}), 0),
    (nor8_1.subs({x: pt8_1[0], y: pt8_1[1]}), 0),
    (solve(tan8_1, y)[0].diff(x), k8_1),
    (solve(nor8_1, y)[0].diff(x) * k8_1, -1),
)

# 8-2: x = 9bt/(1+t^3), y = 9bt^2/(1+t^3) at t = 2
x8_2, y8_2 = 9 * b * t / (1 + t**3), 9 * b * t**2 / (1 + t**3)
pt8_2 = (x8_2.subs(t, 2), y8_2.subs(t, 2))
k8_2 = simplify(diff(y8_2, t) / diff(x8_2, t)).subs(t, 2)
tan8_2 = 4 * x - 5 * y + 12 * b
nor8_2 = 5 * x + 4 * y - 26 * b
check(
    "8-2",
    (pt8_2[0], 2 * b),
    (pt8_2[1], 4 * b),
    (k8_2, Rational(4, 5)),
    (tan8_2.subs({x: pt8_2[0], y: pt8_2[1]}), 0),
    (nor8_2.subs({x: pt8_2[0], y: pt8_2[1]}), 0),
    (solve(tan8_2, y)[0].diff(x), k8_2),
    (solve(nor8_2, y)[0].diff(x) * k8_2, -1),
)

# 9-1: x = t^2/3, y = 2t + 5
x9_1, y9_1 = t**2 / 3, 2 * t + 5
dy9_1 = diff(y9_1, t) / diff(x9_1, t)
d2y9_1 = diff(dy9_1, t) / diff(x9_1, t)
check("9-1", (dy9_1, 3 / t), (d2y9_1, -Rational(9, 2) / t**3))

# 9-2: x = p sin t, y = q cos t
x9_2, y9_2 = p * sin(t), q * cos(t)
dy9_2 = diff(y9_2, t) / diff(x9_2, t)
d2y9_2 = diff(dy9_2, t) / diff(x9_2, t)
check("9-2", (dy9_2, -q * tan(t) / p), (d2y9_2, -q / (p**2 * cos(t) ** 3)))

# 9-3: x = 2 e^(2t), y = 5 e^(-t)
x9_3, y9_3 = 2 * exp(2 * t), 5 * exp(-t)
dy9_3 = diff(y9_3, t) / diff(x9_3, t)
d2y9_3 = diff(dy9_3, t) / diff(x9_3, t)
check("9-3", (dy9_3, -Rational(5, 4) * exp(-3 * t)), (d2y9_3, Rational(15, 16) * exp(-5 * t)))

# 9-4: x = 3 g'(t), y = 2 t g'(t) - 2 g(t) + 1
g = Function("g")
x9_4 = 3 * diff(g(t), t)
y9_4 = 2 * t * diff(g(t), t) - 2 * g(t) + 1
dy9_4 = simplify(diff(y9_4, t) / diff(x9_4, t))
d2y9_4 = simplify(diff(dy9_4, t) / diff(x9_4, t))
check("9-4", (dy9_4, Rational(2, 3) * t), (d2y9_4, Rational(2, 9) / diff(g(t), t, 2)))

# 10-1: x = t^2 + 2, y = t^3 + 3t
x10_1, y10_1 = t**2 + 2, t**3 + 3 * t
dy10_1 = diff(y10_1, t) / diff(x10_1, t)
d2y10_1 = diff(dy10_1, t) / diff(x10_1, t)
d3y10_1 = diff(d2y10_1, t) / diff(x10_1, t)
check("10-1", (d3y10_1, 3 * (3 - t**2) / (8 * t**5)))

# 10-2: x = ln(4 + t^2), y = t - 2 arctan(t/2)
x10_2, y10_2 = ln(4 + t**2), t - 2 * atan(t / 2)
dy10_2 = simplify(diff(y10_2, t) / diff(x10_2, t))
d2y10_2 = simplify(diff(dy10_2, t) / diff(x10_2, t))
d3y10_2 = simplify(diff(d2y10_2, t) / diff(x10_2, t))
check("10-2", (dy10_2, t / 2), (d2y10_2, (4 + t**2) / (4 * t)), (d3y10_2, (t**4 - 16) / (8 * t**3)))

# 11: dr/dt = 4 cm/s, r(0) = 0, find dS/dt at t = 3 s
S11 = pi * (4 * t) ** 2
check("11", (diff(S11, t).subs(t, 3), 96 * pi))

# 12: inverted cone H = 12 m, top diameter 6 m (R = 3), dV/dt = 3 m^3/min, find dh/dt at h = 4 m
h_fn = Function("h")
V12 = Rational(1, 3) * pi * (h_fn(t) / 4) ** 2 * h_fn(t)
dh12 = solve(diff(V12, t) - 3, diff(h_fn(t), t))[0].subs(h_fn(t), 4)
check("12", (dh12, 3 / pi))

# 13: cone H_max = 15 cm, top diameter 10 cm (R = 5 -> r = H/3), cylinder diameter 8 cm (r_c = 4)
# When H = 9 cm, dH/dt = -2 cm/min -> find dh/dt
H_fn = Function("H")
V0_13 = Rational(1, 3) * pi * 5**2 * 15
V_cone13 = Rational(1, 3) * pi * (H_fn(t) / 3) ** 2 * H_fn(t)
eq13 = V0_13 - V_cone13 - pi * 4**2 * h_fn(t)
dh13 = solve(diff(eq13, t), diff(h_fn(t), t))[0].subs({H_fn(t): 9, diff(H_fn(t), t): -2})
check("13", (dh13, Rational(9, 8)))

assert len(verified) == 28
print(f"SymPy verified all {len(verified)} JC935 section 2-4 exercises")

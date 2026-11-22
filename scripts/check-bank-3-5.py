"""Symbolic checks for the JC935 Section 3-5 (extrema & optimization) variants."""

from sympy import (
    E,
    Rational,
    Symbol,
    acos,
    cos,
    cot,
    csc,
    diff,
    exp,
    limit,
    log,
    oo,
    pi,
    simplify,
    sin,
    sinh,
    solve,
    sqrt,
    symbols,
    tan,
)

x, a = symbols("x a", real=True)
p = symbols("p", positive=True)
V, L, G, g, c, d = symbols("V L G g c d", positive=True)
n = symbols("n", positive=True, integer=True)
k = symbols("k", integer=True)
phi = symbols("phi", positive=True)
verified = set()


def check(question, *pairs):
    for actual, expected in pairs:
        assert actual == expected or simplify(actual - expected) == 0, (question, actual, expected)
    assert question not in verified, question
    verified.add(question)


# 1(1): y = x^3 - 3x^2 - 9x + 5
y = x**3 - 3 * x**2 - 9 * x + 5
dy = diff(y, x)
d2y = diff(dy, x)
roots = sorted(solve(dy, x))
assert roots == [-1, 3]
check(
    "1-1",
    (d2y.subs(x, -1), -12),
    (y.subs(x, -1), 10),
    (d2y.subs(x, 3), 12),
    (y.subs(x, 3), -22),
)

# 1(2): y = x - 2*ln(x + 2), x > -2
y = x - 2 * log(x + 2)
dy = diff(y, x)
d2y = diff(dy, x)
roots = solve(dy, x)
assert roots == [0]
check("1-2", (d2y.subs(x, 0), Rational(1, 2)), (y.subs(x, 0), -2 * log(2)))

# 1(3): y = 2x^4 - 4x^2 + 1
y = 2 * x**4 - 4 * x**2 + 1
dy = diff(y, x)
d2y = diff(dy, x)
roots = sorted(solve(dy, x))
assert roots == [-1, 0, 1]
check(
    "1-3",
    (d2y.subs(x, 0), -8),
    (y.subs(x, 0), 1),
    (d2y.subs(x, -1), 16),
    (y.subs(x, -1), -1),
    (d2y.subs(x, 1), 16),
    (y.subs(x, 1), -1),
)

# 1(4): y = x + 2*sqrt(2 - x), x <= 2
y = x + 2 * sqrt(2 - x)
dy = diff(y, x)
d2y = diff(dy, x)
roots = solve(dy, x)
assert roots == [1]
check("1-4", (d2y.subs(x, 1), Rational(-1, 2)), (y.subs(x, 1), 3))

# 1(5): y = (2 + x)/sqrt(1 + 2x^2)
y = (2 + x) / sqrt(1 + 2 * x**2)
dy = simplify(diff(y, x))
roots = solve(dy, x)
assert roots == [Rational(1, 4)]
assert dy.subs(x, 0) > 0 and dy.subs(x, 1) < 0
check(
    "1-5",
    (dy, (1 - 4 * x) / (1 + 2 * x**2) ** Rational(3, 2)),
    (y.subs(x, Rational(1, 4)), 3 * sqrt(2) / 2),
)

# 1(6): y = (2x^2 - 3x + 8)/(x^2 - 2x + 4)
y = (2 * x**2 - 3 * x + 8) / (x**2 - 2 * x + 4)
dy = simplify(diff(y, x))
roots = sorted(solve(dy, x))
assert roots == [-2, 2]
assert dy.subs(x, -3) < 0 and dy.subs(x, 0) > 0 and dy.subs(x, 3) < 0
check(
    "1-6",
    (dy, (4 - x**2) / (x**2 - 2 * x + 4) ** 2),
    (y.subs(x, -2), Rational(11, 6)),
    (y.subs(x, 2), Rational(5, 2)),
)

# 1(7): y = exp(-x) * sin(x)
y = exp(-x) * sin(x)
dy = diff(y, x)
d2y = simplify(diff(dy, x))
x_max = 2 * k * pi + pi / 4
x_min = 2 * k * pi + 5 * pi / 4
check(
    "1-7",
    (dy.subs(x, x_max), 0),
    (dy.subs(x, x_min), 0),
    (d2y, -2 * exp(-x) * cos(x)),
    (d2y.subs(x, x_max), -sqrt(2) * exp(-x_max)),
    (d2y.subs(x, x_min), sqrt(2) * exp(-x_min)),
    (y.subs(x, x_max), sqrt(2) / 2 * exp(-x_max)),
    (y.subs(x, x_min), -sqrt(2) / 2 * exp(-x_min)),
)

# 1(8): y = x^x, x > 0
y = p**p
dy = simplify(diff(y, p))
roots = solve(dy, p)
assert roots == [exp(-1)]
assert dy.subs(p, Rational(1, 10)) < 0 and dy.subs(p, 1) > 0
check(
    "1-8",
    (dy, p**p * (log(p) + 1)),
    (y.subs(p, exp(-1)), exp(-exp(-1))),
)

# 1(9): y = 4 + 3*(x - 2)^(1/3), strictly increasing on R, no extrema
y_right = 4 + 3 * p ** Rational(1, 3)
y_left = 4 - 3 * p ** Rational(1, 3)
check(
    "1-9",
    (diff(y_right, p), p ** Rational(-2, 3)),
    (-diff(y_left, p), p ** Rational(-2, 3)),
    (limit(y_right, p, 0, dir="+"), 4),
    (limit(y_left, p, 0, dir="+"), 4),
)

# 1(10): y = 2x - cot(x), strictly increasing on each branch, no extrema
y = 2 * x - cot(x)
dy = simplify(diff(y, x))
check("1-10", (dy, 2 + csc(x) ** 2))

# 3: f(x) = a*cos(x) + (1/2)*cos(2x) extremum at x = pi/3
f = a * cos(x) + Rational(1, 2) * cos(2 * x)
a_val = solve(diff(f, x).subs(x, pi / 3), a)[0]
f_sol = f.subs(a, a_val)
check(
    "3",
    (a_val, -1),
    (diff(f_sol, x, 2).subs(x, pi / 3), Rational(3, 2)),
    (f_sol.subs(x, pi / 3), Rational(-3, 4)),
)

# 5: f(x) = 6 - exp(2x) - exp(-2x) - 2*cos(2x)
f = 6 - exp(2 * x) - exp(-2 * x) - 2 * cos(2 * x)
check(
    "5",
    (simplify(diff(f, x) - 4 * (sin(2 * x) - sinh(2 * x))), 0),
    (diff(f, x, 1).subs(x, 0), 0),
    (diff(f, x, 2).subs(x, 0), 0),
    (diff(f, x, 3).subs(x, 0), 0),
    (diff(f, x, 4).subs(x, 0), -64),
    (f.subs(x, 0), 2),
)

# 6(1): y = 2x^3 - 3x^2 - 12x + 5 on [-2, 4]
y = 2 * x**3 - 3 * x**2 - 12 * x + 5
roots = sorted(solve(diff(y, x), x))
assert roots == [-1, 2]
vals = {pt: y.subs(x, pt) for pt in [-2, -1, 2, 4]}
check("6-1", (vals[-2], 1), (vals[-1], 12), (vals[2], -15), (vals[4], 37), (max(vals.values()), 37), (min(vals.values()), -15))

# 6(2): y = x^4/2 - 4x^2 + 3 on [-1, 3]
y = Rational(1, 2) * x**4 - 4 * x**2 + 3
roots = sorted(solve(diff(y, x), x))
assert roots == [-2, 0, 2]
vals = {pt: y.subs(x, pt) for pt in [-1, 0, 2, 3]}
check(
    "6-2",
    (vals[-1], Rational(-1, 2)),
    (vals[0], 3),
    (vals[2], -5),
    (vals[3], Rational(15, 2)),
    (max(vals.values()), Rational(15, 2)),
    (min(vals.values()), -5),
)

# 6(3): y = x + 2*sqrt(4 - x) on [-5, 4]
y = x + 2 * sqrt(4 - x)
roots = solve(diff(y, x), x)
assert roots == [3]
vals = {pt: y.subs(x, pt) for pt in [-5, 3, 4]}
check("6-3", (vals[-5], 1), (vals[3], 5), (vals[4], 4), (max(vals.values()), 5), (min(vals.values()), 1))

# 7: y = x^3 - 3x^2 - 9x + 2 on [0, 4], find max
y = x**3 - 3 * x**2 - 9 * x + 2
roots = sorted(solve(diff(y, x), x))
assert roots == [-1, 3]
vals = {pt: y.subs(x, pt) for pt in [0, 3, 4]}
check("7", (vals[0], 2), (vals[3], -25), (vals[4], -18), (max(vals.values()), 2))

# 8(1): y = x^2 - 16/x (x < 0), min
y = x**2 - 16 / x
dy = diff(y, x)
d2y = diff(dy, x)
real_roots = [r for r in solve(dy, x) if r.is_real and r < 0]
assert real_roots == [-2]
check("8-1", (d2y.subs(x, -2), 6), (y.subs(x, -2), 12))

# 8(2): y = 3x/(x^2 + 4) (x >= 0), max
y = 3 * x / (x**2 + 4)
dy = simplify(diff(y, x))
pos_roots = [r for r in solve(dy, x) if r.is_real and r >= 0]
assert pos_roots == [2]
assert dy.subs(x, 1) > 0 and dy.subs(x, 3) < 0
check("8-2", (y.subs(x, 2), Rational(3, 4)))

# 9: f_n(x) = n^2 * x^2 * (1 - x)^n on [0, 1], lim M(n)
fn = n**2 * x**2 * (1 - x) ** n
dfn = simplify(diff(fn, x))
x_star = Rational(2, 1) / (n + 2)
M_n = simplify(fn.subs(x, x_star))
check(
    "9",
    (simplify(dfn.subs(x, x_star)), 0),
    (M_n, 4 * n**2 / (n + 2) ** 2 * (n / (n + 2)) ** n),
    (limit(M_n, n, oo), 4 / E**2),
)

# 10: Wall + 36m fence rectangle
S = x * (36 - 2 * x)
x_opt = solve(diff(S, x), x)[0]
check("10", (x_opt, 9), (36 - 2 * x_opt, 18), (diff(S, x, 2), -4), (S.subs(x, x_opt), 162))

# 11: Open-top cylinder of volume V
A = pi * p**2 + 2 * V / p
r_opt = solve(diff(A, p), p)[0]
h_opt = simplify(V / (pi * r_opt**2))
check(
    "11",
    (r_opt, (V / pi) ** Rational(1, 3)),
    (h_opt, (V / pi) ** Rational(1, 3)),
    (r_opt / h_opt, 1),
    (diff(A, p, 2).subs(p, r_opt), 6 * pi),
)

# 12: Rectangle + semicircle window, area = 8
perim = p + 16 / p + pi * p / 4
x_opt = solve(diff(perim, p), p)[0]
y_rect = 8 / x_opt - pi * x_opt / 8
check(
    "12",
    (x_opt, 8 / sqrt(4 + pi)),
    (bool(y_rect > 0), True),
    (diff(perim, p, 2).subs(p, x_opt) > 0, True),
)

# 13: Pulling box with friction mu = sqrt(3)/3
mu = sqrt(3) / 3
D = cos(phi) + mu * sin(phi)
F_force = mu * G / D
alpha_opt = pi / 6
check(
    "13",
    (diff(D, phi).subs(phi, alpha_opt), 0),
    (diff(D, phi, 2).subs(phi, alpha_opt), -2 * sqrt(3) / 3),
    (simplify(F_force.subs(phi, alpha_opt)), G / 2),
)

# 14: Lever with 32kg at 0.25m, linear density 4 kg/m
F_lever = 8 * g / p + 2 * g * p
x_opt = solve(diff(F_lever, p), p)[0]
check(
    "14",
    (x_opt, 2),
    (diff(F_lever, p, 2).subs(p, x_opt), 2 * g),
    (F_lever.subs(p, x_opt), 8 * g),
)

# 15: Cone formed by cutting central angle theta from disk of radius L
theta = Symbol("theta", positive=True)
r_cone = L * (1 - theta / (2 * pi))
V_cone = pi * r_cone**2 * sqrt(L**2 - r_cone**2) / 3
dV_cone = diff(V_cone, theta)
theta_opt = 2 * pi * (1 - sqrt(6) / 3)
check(
    "15",
    (simplify(dV_cone.subs(theta, theta_opt)), 0),
    (bool(dV_cone.subs({theta: pi / 6, L: 1}) > 0), True),
    (bool(dV_cone.subs({theta: pi, L: 1}) < 0), True),
    (simplify(r_cone.subs(theta, theta_opt)), sqrt(6) * L / 3),
    (simplify(V_cone.subs(theta, theta_opt)), 2 * sqrt(3) * pi * L**3 / 27),
)

# 16: Crane boom 16m, pivot 2m, truss half-width 2m, height 1.5m, pillar 10m
h_crane = 16 * sin(phi) - 2 * tan(phi) + Rational(1, 2)
phi_opt = pi / 3
h_max = simplify(h_crane.subs(phi, phi_opt))
check(
    "16",
    (simplify(diff(h_crane, phi).subs(phi, phi_opt)), 0),
    (simplify(diff(h_crane, phi, 2).subs(phi, phi_opt)), -24 * sqrt(3)),
    (h_max, 6 * sqrt(3) + Rational(1, 2)),
    (bool(h_max > 10), True),
)

# 17: Hotel 60 rooms, base 300, +20 -> -1 room, cost 60/room
P_hotel = (60 - (x - 300) / 20) * (x - 60)
x_opt = solve(diff(P_hotel, x), x)[0]
check(
    "17",
    (x_opt, 780),
    (diff(P_hotel, x, 2), Rational(-1, 10)),
    (P_hotel.subs(x, x_opt), 25920),
)

# 18: Thermos cost 50, demand q(x) = c/(x - 50) + d*(110 - x)
L_profit = (x - 50) * (c / (x - 50) + d * (110 - x))
x_opt = solve(diff(L_profit, x), x)[0]
check(
    "18",
    (x_opt, 80),
    (diff(L_profit, x, 2), -2 * d),
    (simplify(L_profit.subs(x, x_opt)), c + 900 * d),
)

assert len(verified) == 28
print(f"SymPy verified {len(verified)} Section 3-5 extrema & optimization exercises")

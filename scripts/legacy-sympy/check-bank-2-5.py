"""Symbolic and numerical checks for the JC935 Section 2-5 (differentials) variants."""

from sympy import (
    Abs,
    Rational,
    acos,
    asin,
    atan,
    cos,
    diff,
    exp,
    log,
    pi,
    sec,
    simplify,
    sin,
    sqrt,
    symbols,
    tan,
)

x, t, dx = symbols("x t dx", real=True)
p = symbols("p", positive=True)
h, L, dh = symbols("h L dh", positive=True)
B, omega, theta0, k_real = symbols("B omega theta0 k_real", real=True)
k_nz = symbols("k_nz", real=True, nonzero=True)
n = symbols("n", positive=True, integer=True)
r, dr = symbols("r dr", positive=True)
R, l_var = symbols("R l_var", positive=True)

verified = set()


def check(question, *pairs):
    for actual, expected in pairs:
        diff_expr = actual - expected
        assert (
            actual == expected
            or simplify(diff_expr) == 0
            or simplify(diff_expr.rewrite(cos)) == 0
        ), (
            question,
            actual,
            expected,
        )
    assert question not in verified, question
    verified.add(question)


def check_approx(question, exact_expr, approx_val, tol):
    err = abs(float(exact_expr.evalf()) - approx_val)
    assert err < tol, (question, float(exact_expr.evalf()), approx_val, err, tol)


# Q1: y = x^3 + 2x at x = 1, dx = 1, 0.1, 0.01
y1 = x**3 + 2 * x
dy1_expr = diff(y1, x).subs(x, 1) * dx
delta_y1_expr = y1.subs(x, 1 + dx) - y1.subs(x, 1)
check(
    "1-1",
    (delta_y1_expr.subs(dx, 1), 9),
    (dy1_expr.subs(dx, 1), 5),
)
check(
    "1-2",
    (delta_y1_expr.subs(dx, Rational(1, 10)), Rational(531, 1000)),
    (dy1_expr.subs(dx, Rational(1, 10)), Rational(1, 2)),
)
check(
    "1-3",
    (delta_y1_expr.subs(dx, Rational(1, 100)), Rational(50301, 1000000)),
    (dy1_expr.subs(dx, Rational(1, 100)), Rational(1, 20)),
)

# Q2: Geometric signs of Delta y, dy, Delta y - dy at x0 = 1 for p = Delta x > 0
# (1) f(x) = x^2
f2_1 = x**2
Dy2_1 = simplify(f2_1.subs(x, 1 + p) - f2_1.subs(x, 1))
dy2_1 = diff(f2_1, x).subs(x, 1) * p
diff2_1 = simplify(Dy2_1 - dy2_1)
assert Dy2_1.is_positive and dy2_1.is_positive and diff2_1.is_positive
check("2-1", (Dy2_1, 2 * p + p**2), (dy2_1, 2 * p), (diff2_1, p**2))

# (2) f(x) = sqrt(x)
f2_2 = sqrt(x)
Dy2_2 = f2_2.subs(x, 1 + p) - f2_2.subs(x, 1)
dy2_2 = diff(f2_2, x).subs(x, 1) * p
diff2_2 = Dy2_2 - dy2_2
# Rationalized identity: sqrt(1+p) - (1 + p/2) = -p^2 / (4*(sqrt(1+p) + 1 + p/2)) < 0
diff2_2_rat = -(p**2) / (4 * (sqrt(1 + p) + 1 + p / 2))
assert dy2_2.is_positive and diff2_2_rat.is_negative
check("2-2", (dy2_2, p / 2), (diff2_2, diff2_2_rat))
for sample in [Rational(1, 10), Rational(1, 2), 2]:
    assert float(Dy2_2.subs(p, sample)) > 0
    assert float(diff2_2.subs(p, sample)) < 0

# (3) f(x) = 4 - x^2
f2_3 = 4 - x**2
Dy2_3 = (-2 * p - p**2)
dy2_3 = diff(f2_3, x).subs(x, 1) * p
diff2_3 = simplify(Dy2_3 - dy2_3)
assert Dy2_3.is_negative and dy2_3.is_negative and diff2_3.is_negative
check("2-3", (f2_3.subs(x, 1 + p) - f2_3.subs(x, 1), Dy2_3), (dy2_3, -2 * p), (diff2_3, -(p**2)))

# (4) f(x) = 2/x
f2_4 = 2 / x
Dy2_4 = simplify(f2_4.subs(x, 1 + p) - f2_4.subs(x, 1))
dy2_4 = diff(f2_4, x).subs(x, 1) * p
diff2_4 = simplify(Dy2_4 - dy2_4)
assert Dy2_4.is_negative and dy2_4.is_negative and diff2_4.is_positive
check("2-4", (Dy2_4, -2 * p / (1 + p)), (dy2_4, -2 * p), (diff2_4, 2 * p**2 / (1 + p)))

# Q3: Differentials of 10 functions
check("3-1", (diff(3 / p - 4 * sqrt(p), p), -3 / p**2 - 2 / sqrt(p)))
check("3-2", (diff(x * cos(3 * x), x), cos(3 * x) - 3 * x * sin(3 * x)))
check("3-3", (diff(x / sqrt(x**2 + 4), x), 4 / (x**2 + 4) ** Rational(3, 2)))
check(
    "3-4",
    (diff(log(2 - x) ** 2, x), 2 * log(2 - x) / (x - 2)),
)
check("3-5", (diff(x**2 * exp(3 * x), x), x * (2 + 3 * x) * exp(3 * x)))
check(
    "3-6",
    (
        diff(exp(-2 * x) * cos(4 - x), x),
        exp(-2 * x) * (sin(4 - x) - 2 * cos(4 - x)),
    ),
)
# 3-7: y = arccos(sqrt(1 - 4x^2)) on (-1/2, 0) and (0, 1/2)
x_pos = symbols("x_pos", positive=True)
x_neg = symbols("x_neg", negative=True)
# Substitute x_pos in (0, 1/2) and x_neg in (-1/2, 0)
expr3_7_pos = diff(acos(sqrt(1 - 4 * x_pos**2)), x_pos)
expr3_7_neg = diff(acos(sqrt(1 - 4 * x_neg**2)), x_neg)
check(
    "3-7",
    (expr3_7_pos, 2 / sqrt(1 - 4 * x_pos**2)),
    (expr3_7_neg, -2 / sqrt(1 - 4 * x_neg**2)),
)
check(
    "3-8",
    (
        diff(tan(2 + 3 * x**2) ** 2, x),
        12 * x * tan(2 + 3 * x**2) * sec(2 + 3 * x**2) ** 2,
    ),
)
check(
    "3-9",
    (diff(atan((4 - x**2) / (4 + x**2)), x), -8 * x / (16 + x**4)),
)
check(
    "3-10",
    (diff(B * cos(omega * t + theta0), t), -B * omega * sin(omega * t + theta0)),
)

# Q4: Reverse differentials d(F) = f(x) dx
check("4-1", (diff(5 * x, x), 5))
check("4-2", (diff(Rational(5, 2) * x**2, x), 5 * x))
check("4-3", (diff(-cos(t), t), sin(t)))
check("4-4", (diff(sin(k_nz * x) / k_nz, x), cos(k_nz * x)))
check("4-5", (diff(log(3 + x), x), 1 / (3 + x)))
check("4-6", (diff(-exp(-3 * x) / 3, x), exp(-3 * x)))
check("4-7", (diff(6 * sqrt(p), p), 3 / sqrt(p)))
check("4-8", (diff(tan(4 * x) / 4, x), sec(4 * x) ** 2))

# Q5: Parabolic arch length s = L*(1 + 8*h^2/(3*L^2)), estimate Delta s
s5 = L * (1 + 8 * h**2 / (3 * L**2))
check("5", (diff(s5, h) * dh, 16 * h * dh / (3 * L)))

# Q6: Sector area S = (1/2) * R^2 * alpha, with alpha = 45 deg = pi/4, R = 60 cm
alpha_s, R_s = symbols("alpha_s R_s", positive=True)
S_sector = Rational(1, 2) * R_s**2 * alpha_s
# 6-1: R=60 fixed, Delta alpha = -20' = -pi/540
dS6_1 = diff(S_sector, alpha_s).subs(R_s, 60) * (-pi / 540)
check("6-1", (dS6_1, -10 * pi / 3))
check_approx("6-1", dS6_1, -10.47, 0.005)
# 6-2: alpha=pi/4 fixed, R=60, Delta R = 0.5
dS6_2 = diff(S_sector, R_s).subs({R_s: 60, alpha_s: pi / 4}) * Rational(1, 2)
check("6-2", (dS6_2, 15 * pi / 2))
check_approx("6-2", dS6_2, 23.56, 0.005)

# Q7: Trig linear approximations
# 7-1: sin(31 deg) at x0 = pi/6, dx = pi/180
approx7_1 = sin(pi / 6) + diff(sin(x), x).subs(x, pi / 6) * (pi / 180)
check("7-1", (approx7_1, Rational(1, 2) + sqrt(3) * pi / 360))
check_approx("7-1", approx7_1, 0.51512, 0.00001)
check_approx("7-1-true", sin(31 * pi / 180), float(approx7_1.evalf()), 0.0001)

# 7-2: tan(121 deg) at x0 = 2*pi/3, dx = pi/180
approx7_2 = tan(2 * pi / 3) + diff(tan(x), x).subs(x, 2 * pi / 3) * (pi / 180)
check("7-2", (approx7_2, -sqrt(3) + pi / 45))
check_approx("7-2", approx7_2, -1.66224, 0.00001)
check_approx("7-2-true", tan(121 * pi / 180), float(approx7_2.evalf()), 0.003)

# Q8: Inverse trig linear approximations
# 8-1: arcsin(0.4997) at x0 = 1/2, dx = -3/10000
approx8_1 = asin(Rational(1, 2)) + diff(asin(x), x).subs(x, Rational(1, 2)) * Rational(-3, 10000)
check("8-1", (approx8_1, pi / 6 - sqrt(3) / 5000))
check_approx("8-1", approx8_1, 0.52325, 0.00001)
check_approx("8-1-true", asin(Rational(4997, 10000)), float(approx8_1.evalf()), 1e-6)

# 8-2: arccos(-0.4994) at x0 = -1/2, dx = 6/10000
approx8_2 = acos(Rational(-1, 2)) + diff(acos(x), x).subs(x, Rational(-1, 2)) * Rational(6, 10000)
check("8-2", (approx8_2, 2 * pi / 3 - sqrt(3) / 2500))
check_approx("8-2", approx8_2, 2.09370, 0.00001)
check_approx("8-2-true", acos(Rational(-4994, 10000)), float(approx8_2.evalf()), 1e-6)

# Q9: Small-|x| linear approximations
# 9-1: sin(2x) ~ 2x, estimate sin(36') with x = 18' = pi/600
lin9_1 = sin(0) + diff(sin(2 * x), x).subs(x, 0) * x
est9_1 = lin9_1.subs(x, pi / 600)
check("9-1", (lin9_1, 2 * x), (est9_1, pi / 300))
check_approx("9-1", est9_1, 0.01047, 0.00001)
check_approx("9-1-true", sin(pi / 300), float(est9_1.evalf()), 1e-6)

# 9-2: ln(1 + 2x) ~ 2x, estimate ln(1.006) with x = 0.003
lin9_2 = log(1) + diff(log(1 + 2 * x), x).subs(x, 0) * x
est9_2 = lin9_2.subs(x, Rational(3, 1000))
check("9-2", (lin9_2, 2 * x), (est9_2, Rational(3, 500)))
check_approx("9-2-true", log(Rational(1006, 1000)), float(est9_2.evalf()), 2e-5)

# 9-3: (1 - x)^(1/n) ~ 1 - x/n
lin9_3 = (1 - x).subs(x, 0) ** (1 / n) + diff((1 - x) ** (1 / n), x).subs(x, 0) * x
check("9-3", (lin9_3, 1 - x / n))

# 9-4: exp(k*x) ~ 1 + k*x
lin9_4 = exp(0) + diff(exp(k_real * x), x).subs(x, 0) * x
check("9-4", (lin9_4, 1 + k_real * x))

# Q10: Root approximations
# 10-1: cbrt(124) = 5 * (1 - 1/125)^(1/3) ~ 5*(1 - 1/375) = 374/75
approx10_1 = 5 * (1 - Rational(1, 3 * 125))
check("10-1", (approx10_1, Rational(374, 75)))
check_approx("10-1", approx10_1, 4.98667, 0.00001)
check_approx("10-1-true", Rational(124) ** Rational(1, 3), float(approx10_1.evalf()), 0.0001)

# 10-2: 82^(1/4) = 3 * (1 + 1/81)^(1/4) ~ 3*(1 + 1/324) = 325/108
approx10_2 = 3 * (1 + Rational(1, 4 * 81))
check("10-2", (approx10_2, Rational(325, 108)))
check_approx("10-2", approx10_2, 3.00926, 0.00001)
check_approx("10-2-true", Rational(82) ** Rational(1, 4), float(approx10_2.evalf()), 0.0001)

# Q11: Cone with h = 2r => V = (2/3)*pi*r^3; |dV/V| = 3*|dr/r| <= 1.5% => |dr/r| <= 0.5%
V_cone = Rational(2, 3) * pi * r**3
rel_V = simplify(diff(V_cone, r) * dr / V_cone)
check("11", (rel_V, 3 * dr / r), (Rational(3, 200) / 3, Rational(1, 200)))

# Q12: Sector plate R = 150 mm, alpha = 60 deg (l = 150 mm), delta_l = 0.15 mm
alpha_l = 2 * asin(l_var / (2 * R))
dalpha_dl = simplify(diff(alpha_l, l_var).subs({R: 150, l_var: 150}))
delta_alpha = simplify(Abs(dalpha_dl) * Rational(15, 100))
check("12", (dalpha_dl, sqrt(3) / 225), (delta_alpha, sqrt(3) / 1500))
check_approx("12", delta_alpha, 0.00115, 0.00001)

assert len(verified) == 40
print(f"SymPy verified all {len(verified)} Section 2-5 differential exercises!")

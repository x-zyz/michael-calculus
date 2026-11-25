"""Symbolic checks for the JC935 Section 4-1 antiderivative & indefinite integral variants."""

from sympy import (
    Abs,
    Rational,
    acos,
    asin,
    atan,
    cos,
    cot,
    csc,
    diff,
    E,
    exp,
    log,
    pi,
    sec,
    simplify,
    sin,
    solve,
    sqrt,
    symbols,
    tan,
    trigsimp,
)

x = symbols("x", real=True)
xp = symbols("x", positive=True)
x2 = symbols("x", positive=True)  # used with x > 2 substitution
t = symbols("t", positive=True)
s_var = symbols("s", positive=True)
theta = symbols("theta", real=True)
a_pos = symbols("a", positive=True)
k_pos = symbols("k", positive=True)
p_pos, q_pos = symbols("p q", positive=True)

verified = set()


def check(question, *pairs):
    for actual, expected in pairs:
        diff_expr = actual - expected
        ok = (
            actual == expected
            or simplify(diff_expr) == 0
            or trigsimp(diff_expr) == 0
        )
        assert ok, (question, actual, expected, simplify(diff_expr))
    assert question not in verified, f"Duplicate verification key: {question}"
    verified.add(question)


def check_antideriv(question, antideriv, integrand, var=x):
    check(question, (diff(antideriv, var), integrand))


# Question 1 (1)-(6): Verify indefinite integral identities by differentiation
check_antideriv("1-1", log(x + sqrt(x**2 + 4)), 1 / sqrt(x**2 + 4), x)

# 1-2: for x > 2, set x = 2 + u with u > 0 so sqrt(x^2 - 4) is strictly positive
u = symbols("u", positive=True)
f_1_2 = (sqrt(x**2 - 4) / (4 * x)).subs(x, u + 2)
g_1_2 = (1 / (x**2 * sqrt(x**2 - 4))).subs(x, u + 2)
check("1-2", (diff(f_1_2, u), g_1_2))

check_antideriv(
    "1-3",
    Rational(1, 2) * atan(x / 2) + 1 / (x + 2),
    4 * x / ((x**2 + 4) * (x + 2) ** 2),
    x,
)
check_antideriv("1-4", log(csc(x) - cot(x)), csc(x), x)
check_antideriv(
    "1-5",
    -Rational(1, 2) * x * cos(2 * x) + Rational(1, 4) * sin(2 * x),
    x * sin(2 * x),
    x,
)
check_antideriv(
    "1-6",
    Rational(1, 5) * exp(2 * x) * (2 * cos(x) + sin(x)),
    exp(2 * x) * cos(x),
    x,
)

# Question 2 (1)-(26): Indefinite integrals by basic rules & algebraic/trig rewriting
check_antideriv("2-1", -1 / (3 * x**3), 1 / x**4, x)
check_antideriv("2-2", Rational(2, 7) * xp ** Rational(7, 2), xp**2 * sqrt(xp), xp)
check_antideriv("2-3", Rational(3, 2) * xp ** Rational(2, 3), 1 / xp ** Rational(1, 3), xp)
check_antideriv("2-4", Rational(4, 9) * xp ** Rational(9, 4), xp * xp ** Rational(1, 4), xp)
check_antideriv("2-5", -Rational(2, 5) * xp ** Rational(-5, 2), 1 / (xp**3 * sqrt(xp)), xp)
check_antideriv(
    "2-6",
    (p_pos / (p_pos - q_pos)) * xp ** ((p_pos - q_pos) / p_pos),
    xp ** (-q_pos / p_pos),
    xp,
)
check_antideriv("2-7", Rational(7, 5) * x**5, 7 * x**4, x)
check_antideriv("2-8", x**4 - Rational(5, 2) * x**2 + 6 * x, 4 * x**3 - 5 * x + 6, x)
check_antideriv("2-9", 2 * sqrt(s_var / (3 * a_pos)), 1 / sqrt(3 * a_pos * s_var), s_var)
check_antideriv(
    "2-10",
    Rational(4, 5) * x**5 - Rational(4, 3) * x**3 + x,
    (2 * x**2 - 1) ** 2,
    x,
)
check_antideriv(
    "2-11",
    Rational(1, 3) * xp**3 - Rational(4, 5) * xp ** Rational(5, 2) + Rational(2, 3) * xp ** Rational(3, 2) - 2 * xp,
    (sqrt(xp) - 2) * (xp * sqrt(xp) + 1),
    xp,
)
check_antideriv(
    "2-12",
    Rational(2, 5) * xp ** Rational(5, 2) + Rational(8, 3) * xp ** Rational(3, 2) + 8 * sqrt(xp),
    (2 + xp) ** 2 / sqrt(xp),
    xp,
)
# 2-13: check both x > 0 and x < 0 for ln|x|
check(
    "2-13",
    (diff(4 * exp(xp) - 5 * log(xp), xp), 4 * exp(xp) - 5 / xp),
    (diff(4 * exp(-xp) - 5 * log(xp), xp) * (-1), 4 * exp(-xp) - 5 / (-xp)),
)
check_antideriv(
    "2-14",
    5 * atan(x) + 4 * asin(x),
    5 / (1 + x**2) + 4 / sqrt(1 - x**2),
    x,
)
check_antideriv(
    "2-15",
    2 * exp(xp) + Rational(9, 2) * xp ** Rational(2, 3),
    exp(xp) * (2 + 3 * exp(-xp) / xp ** Rational(1, 3)),
    xp,
)
check_antideriv("2-16", (5**x * exp(x)) / (1 + log(5)), 5**x * exp(x), x)
check_antideriv(
    "2-17",
    3 * x + 4 / (log(2) - log(5)) * (Rational(2, 5)) ** x,
    (3 * 5**x + 4 * 2**x) / 5**x,
    x,
)
check_antideriv("2-18", -cot(x) - csc(x), csc(x) * (csc(x) + cot(x)), x)
check_antideriv("2-19", (x - sin(x)) / 2, sin(x / 2) ** 2, x)
check_antideriv("2-20", -Rational(1, 2) * cot(x), 1 / (1 - cos(2 * x)), x)
check_antideriv("2-21", sin(x) + cos(x), cos(2 * x) / (cos(x) + sin(x)), x)
check_antideriv("2-22", tan(x) - cot(x), 1 / (sin(x) ** 2 * cos(x) ** 2), x)
check_antideriv("2-23", tan(x) - x, tan(x) ** 2, x)
check_antideriv(
    "2-24",
    sin(theta) + 2 * theta,
    sin(theta) * (cot(theta) + 2 * csc(theta)),
    theta,
)
check_antideriv("2-25", x + 3 * atan(x), (x**2 + 4) / (x**2 + 1), x)
check_antideriv(
    "2-26",
    Rational(2, 3) * x**3 - 3 * x + 3 * atan(x),
    (2 * x**4 - x**2) / (x**2 + 1),
    x,
)

# Question 3 (1)-(2): Initial value problems
y_3_1 = Rational(1, 3) * (x + 3) ** 3 + 2
check("3-1", (diff(y_3_1, x), (x + 3) ** 2), (y_3_1.subs(x, -3), 2))

x_3_2 = 1 / t**2 + 4 * t - 2
check(
    "3-2",
    (diff(x_3_2, t, 2), 6 / t**4),
    (diff(x_3_2, t).subs(t, 1), 2),
    (x_3_2.subs(t, 1), 3),
)

# Question 4 (1)-(3): Uniform braking model (v0 = 30 m/s, stopping distance = 75 m)
s_4 = -Rational(1, 2) * k_pos * t**2 + 30 * t
check(
    "4-1",
    (diff(s_4, t, 2), -k_pos),
    (diff(s_4, t).subs(t, 0), 30),
    (s_4.subs(t, 0), 0),
)
t_stop = solve(diff(s_4, t), t)[0]
s_stop = s_4.subs(t, t_stop)
check("4-2", (t_stop, 30 / k_pos), (s_stop, 450 / k_pos))
k_sol = solve(s_stop - 75, k_pos)[0]
check("4-3", (k_sol, 6), (-k_sol, -6))

# Question 5: Curve from tangent slope 2/x passing through (e^3, 5)
y_5 = 2 * log(xp) - 1
check("5", (diff(y_5, xp), 2 / xp), (y_5.subs(xp, E**3), 5))

# Question 6 (1)-(2): Motion from rest with v(t) = 4t^3 m/s
s_6 = t**4
check(
    "6-1",
    (diff(s_6, t), 4 * t**3),
    (s_6.subs(t, 0), 0),
    (s_6.subs(t, 2), 16),
)
t_6_2 = 200 ** Rational(1, 4)
check("6-2", (s_6.subs(t, t_6_2), 200))
assert abs(float(t_6_2) - 3.760603093) < 1e-6

# Question 7: Three antiderivatives of 1/sqrt(2x - x^2) on (0, 2)
# Reparameterize x = 2*w/(1 + w) with w > 0 so x in (0, 2) and 2 - x > 0 strictly
w = symbols("w", positive=True)
x_sub = 2 * w / (1 + w)
dx_dw = diff(x_sub, w)
target_7 = (1 / sqrt(2 * x - x**2)).subs(x, x_sub) * dx_dw

F1_7 = asin(x - 1).subs(x, x_sub)
F2_7 = acos(1 - x).subs(x, x_sub)
F3_7 = (2 * atan(sqrt(x / (2 - x)))).subs(x, x_sub)
check(
    "7",
    (diff(F1_7, w), target_7),
    (diff(F2_7, w), target_7),
    (diff(F3_7, w), target_7),
    (diff(F2_7 - F1_7, w), 0),
    (diff(F3_7 - F1_7, w), 0),
    ((F2_7 - F1_7).subs(w, 1), pi / 2),
    ((F3_7 - F1_7).subs(w, 1), pi / 2),
)

assert len(verified) == 41, f"Expected 41 verified items, got {len(verified)}"
print(f"SymPy verified {len(verified)} JC935 Section 4-1 antiderivative exercises")

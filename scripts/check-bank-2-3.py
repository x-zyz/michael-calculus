"""Symbolic checks for the JC935 Section 2-3 higher-order derivative variants."""

from sympy import (
    Function,
    Rational,
    cos,
    cot,
    csc,
    diff,
    exp,
    factorial,
    limit,
    log,
    pi,
    simplify,
    sin,
    solve,
    sqrt,
    symbols,
    atan,
)

x, t, s = symbols("x t s", real=True)
b = symbols("b", positive=True)
B, omega, phi = symbols("B omega phi", real=True)
k = symbols("k", real=True, nonzero=True)
h_pos = symbols("h_pos", positive=True)
a_c, b_c, c_c = symbols("a_c b_c c_c", real=True)
m_k = symbols("m_k", positive=True, integer=True)
verified = set()


def check(question, *pairs):
    for actual, expected in pairs:
        assert actual == expected or simplify(actual - expected) == 0, (
            question,
            actual,
            expected,
        )
    assert question not in verified, question
    verified.add(question)


# 1-1: y = 3x^3 - 2ln(x), x > 0
y1_1 = 3 * x**3 - 2 * log(x)
check("1-1", (diff(y1_1, x), 9 * x**2 - 2 / x), (diff(y1_1, x, 2), 18 * x + 2 / x**2))

# 1-2: y = e^(3x+2)
y1_2 = exp(3 * x + 2)
check("1-2", (diff(y1_2, x), 3 * exp(3 * x + 2)), (diff(y1_2, x, 2), 9 * exp(3 * x + 2)))

# 1-3: y = 2x sin(x)
y1_3 = 2 * x * sin(x)
check(
    "1-3",
    (diff(y1_3, x), 2 * sin(x) + 2 * x * cos(x)),
    (diff(y1_3, x, 2), 4 * cos(x) - 2 * x * sin(x)),
)

# 1-4: y = e^(2t) cos(2t)
y1_4 = exp(2 * t) * cos(2 * t)
check(
    "1-4",
    (diff(y1_4, t), 2 * exp(2 * t) * (cos(2 * t) - sin(2 * t))),
    (diff(y1_4, t, 2), -8 * exp(2 * t) * sin(2 * t)),
)

# 1-5: y = sqrt(b^2 + x^2), b > 0
y1_5 = sqrt(b**2 + x**2)
check(
    "1-5",
    (diff(y1_5, x), x / sqrt(b**2 + x**2)),
    (diff(y1_5, x, 2), b**2 / (b**2 + x**2) ** Rational(3, 2)),
)

# 1-6: y = ln(x^2 + 3)
y1_6 = log(x**2 + 3)
check(
    "1-6",
    (diff(y1_6, x), 2 * x / (x**2 + 3)),
    (diff(y1_6, x, 2), 2 * (3 - x**2) / (x**2 + 3) ** 2),
)

# 1-7: y = cot(2x)
y1_7 = cot(2 * x)
check(
    "1-7",
    (diff(y1_7, x), -2 * csc(2 * x) ** 2),
    (diff(y1_7, x, 2), 8 * csc(2 * x) ** 2 * cot(2 * x)),
)

# 1-8: y = 1 / (x^3 + 2)
y1_8 = 1 / (x**3 + 2)
check(
    "1-8",
    (diff(y1_8, x), -3 * x**2 / (x**3 + 2) ** 2),
    (diff(y1_8, x, 2), 12 * x * (x**3 - 1) / (x**3 + 2) ** 3),
)

# 1-9: y = (1 + 4x^2) arctan(2x)
y1_9 = (1 + 4 * x**2) * atan(2 * x)
check(
    "1-9",
    (diff(y1_9, x), 8 * x * atan(2 * x) + 2),
    (diff(y1_9, x, 2), 8 * atan(2 * x) + 16 * x / (1 + 4 * x**2)),
)

# 1-10: y = e^(2x) / x
y1_10 = exp(2 * x) / x
check(
    "1-10",
    (diff(y1_10, x), (2 * x - 1) * exp(2 * x) / x**2),
    (diff(y1_10, x, 2), 2 * exp(2 * x) * (2 * x**2 - 2 * x + 1) / x**3),
)

# 1-11: y = x e^(-x^2)
y1_11 = x * exp(-(x**2))
check(
    "1-11",
    (diff(y1_11, x), (1 - 2 * x**2) * exp(-(x**2))),
    (diff(y1_11, x, 2), 2 * x * (2 * x**2 - 3) * exp(-(x**2))),
)

# 1-12: y = ln(x + sqrt(x^2 + 4))
y1_12 = log(x + sqrt(x**2 + 4))
check(
    "1-12",
    (diff(y1_12, x), 1 / sqrt(x**2 + 4)),
    (diff(y1_12, x, 2), -x / (x**2 + 4) ** Rational(3, 2)),
)

# 2: f(x) = (2x - 5)^5, f'''(4)
f2 = (2 * x - 5) ** 5
check(
    "2",
    (diff(f2, x, 3), 480 * (2 * x - 5) ** 2),
    (diff(f2, x, 3).subs(x, 4), 4320),
)

# 3-1: y = f(x^3)
u = symbols("u", real=True)
f_abs = Function("f")
check(
    "3-1",
    (
        diff(f_abs(x**3), x, 2),
        6 * x * diff(f_abs(u), u).subs(u, x**3)
        + 9 * x**4 * diff(f_abs(u), u, 2).subs(u, x**3),
    ),
)

# 3-2: y = e^(f(x))
check(
    "3-2",
    (
        diff(exp(f_abs(x)), x, 2),
        (diff(f_abs(x), x, 2) + diff(f_abs(x), x) ** 2) * exp(f_abs(x)),
    ),
)

# 4-1 & 4-2: Inverse function 2nd and 3rd derivatives
g_abs = Function("g")
dt_du = 1 / diff(g_abs(t), t)
d2t_du2 = diff(dt_du, t) / diff(g_abs(t), t)
d3t_du3 = diff(d2t_du2, t) / diff(g_abs(t), t)

# Concrete check for 4-1: u = t^3 + 2t at t = 1
g4_1 = t**3 + 2 * t
val4_1 = (-diff(g4_1, t, 2) / diff(g4_1, t) ** 3).subs(t, 1)
check(
    "4-1",
    (d2t_du2, -diff(g_abs(t), t, 2) / diff(g_abs(t), t) ** 3),
    (val4_1, Rational(-6, 125)),
)

# Concrete check for 4-2: u = e^t + t at t = 0
g4_2 = exp(t) + t
val4_2 = (
    (3 * diff(g4_2, t, 2) ** 2 - diff(g4_2, t) * diff(g4_2, t, 3))
    / diff(g4_2, t) ** 5
).subs(t, 0)
check(
    "4-2",
    (
        d3t_du3,
        (3 * diff(g_abs(t), t, 2) ** 2 - diff(g_abs(t), t) * diff(g_abs(t), t, 3))
        / diff(g_abs(t), t) ** 5,
    ),
    (val4_2, Rational(1, 32)),
)

# 5: x(t) = B cos(omega t + phi)
x5 = B * cos(omega * t + phi)
check(
    "5",
    (diff(x5, t, 2), -B * omega**2 * cos(omega * t + phi)),
    (diff(x5, t, 2) + omega**2 * x5, 0),
)

# 6: dh/dt = k / h -> d^2h/dt^2 = -k^2 / h^3
v6 = k / h_pos
a6 = diff(v6, h_pos) * v6
check("6", (a6, -(k**2) / h_pos**3))

# 7: ds/dt = [g(s)]^2 -> d^2s/dt^2 = 2 [g(s)]^3 g'(s)
v7 = g_abs(s) ** 2
a7 = diff(v7, s) * v7
check("7", (a7, 2 * g_abs(s) ** 3 * diff(g_abs(s), s)))

# 8: Piecewise C^2 at x = 0: e^(2x) + sin(x) for x <= 0, a x^2 + b x + c for x > 0
left8 = exp(2 * x) + sin(x)
right8 = a_c * x**2 + b_c * x + c_c
eq_c = limit(right8, x, 0, dir="+") - limit(left8, x, 0, dir="-")
c_val = solve(eq_c, c_c)[0]
f0 = left8.subs(x, 0)
f1_left = limit((left8 - f0) / x, x, 0, dir="-")
f1_right = limit((right8.subs(c_c, c_val) - f0) / x, x, 0, dir="+")
b_val = solve(f1_right - f1_left, b_c)[0]
f2_left = limit((diff(left8, x) - f1_left) / x, x, 0, dir="-")
f2_right = limit(
    (diff(right8.subs({c_c: c_val, b_c: b_val}), x) - f1_left) / x, x, 0, dir="+"
)
a_val = solve(f2_right - f2_left, a_c)[0]
check("8", (a_val, 2), (b_val, 3), (c_val, 1))

# 9-1: y = e^(2x) sin(x), y^(4)
y9_1 = exp(2 * x) * sin(x)
check("9-1", (diff(y9_1, x, 4), exp(2 * x) * (24 * cos(x) - 7 * sin(x))))

# 9-2: y = x^2 cos(3x), y^(20)
y9_2 = x**2 * cos(3 * x)
expected9_2 = 3**18 * ((9 * x**2 - 380) * cos(3 * x) + 120 * x * sin(3 * x))
check("9-2", (diff(y9_2, x, 20), expected9_2))

# 10-1: y = (2x + 1)^n + c_1 x^(n-1) + ... + c_n -> y^(n) = 2^n n!
pairs10_1 = []
for n_val in range(1, 6):
    coeffs = symbols(f"c1:{n_val + 1}", real=True)
    poly = (2 * x + 1) ** n_val + sum(
        coeffs[j] * x ** (n_val - 1 - j) for j in range(n_val)
    )
    pairs10_1.append((diff(poly, x, n_val), 2**n_val * factorial(n_val)))
check("10-1", *pairs10_1)

# 10-2: y = cos^2(2x) -> y^(n) = 2^(2n-1) cos(4x + n pi / 2)
pairs10_2 = [
    (diff(cos(2 * x) ** 2, x, n_val), 2 ** (2 * n_val - 1) * cos(4 * x + n_val * pi / 2))
    for n_val in range(1, 7)
]
check("10-2", *pairs10_2)

# 10-3: y = (2x - 1) ln(2x - 1) -> y^(n) = (-1)^n 2^n (n-2)! / (2x - 1)^(n-1), n >= 2
y10_3 = (2 * x - 1) * log(2 * x - 1)
pairs10_3 = [(diff(y10_3, x), 2 * log(2 * x - 1) + 2)] + [
    (
        diff(y10_3, x, n_val),
        (-1) ** n_val * 2**n_val * factorial(n_val - 2) / (2 * x - 1) ** (n_val - 1),
    )
    for n_val in range(2, 7)
]
check("10-3", *pairs10_3)

# 10-4: y = x e^(3x) -> y^(n) = 3^(n-1) (3x + n) e^(3x)
y10_4 = x * exp(3 * x)
pairs10_4 = [
    (diff(y10_4, x, n_val), 3 ** (n_val - 1) * (3 * x + n_val) * exp(3 * x))
    for n_val in range(1, 7)
]
# Symbolic induction step for arbitrary positive integer m_k:
ind_expr = 3 ** (m_k - 1) * (3 * x + m_k) * exp(3 * x)
pairs10_4.append((diff(ind_expr, x), 3**m_k * (3 * x + m_k + 1) * exp(3 * x)))
check("10-4", *pairs10_4)

# 11: f(x) = x^2 ln(1 + 2x), f^(n)(0) = (-1)^(n-1) 2^(n-2) n! / (n - 2), n >= 3
f11 = x**2 * log(1 + 2 * x)
pairs11 = [
    (
        diff(f11, x, n_val).subs(x, 0),
        (-1) ** (n_val - 1) * 2 ** (n_val - 2) * factorial(n_val) / (n_val - 2),
    )
    for n_val in range(3, 9)
]
check("11", *pairs11)

assert len(verified) == 28, f"Expected 28 verified items, got {len(verified)}"
print(f"SymPy verified {len(verified)} higher-order derivative exercises (Section 2-3)")

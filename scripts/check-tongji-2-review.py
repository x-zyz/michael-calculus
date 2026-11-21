"""Symbolic checks for the JC935 Chapter 2 review (总习题二) variants."""

from sympy import (
    Abs,
    Rational,
    acos,
    atan,
    cos,
    cot,
    csc,
    diff,
    exp,
    factorial,
    idiff,
    limit,
    log,
    pi,
    prod,
    sec,
    simplify,
    sin,
    solve,
    sqrt,
    symbols,
    tan,
    trigsimp,
)

x, h, t = symbols("x h t", real=True)
p = symbols("p", positive=True)
k = symbols("k", integer=True, positive=True)
a, b, H, L = symbols("a b H L", positive=True)
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


# Q2: f(x) = prod_{j=1}^n (x - j), f'(1) = (-1)^(n-1) * (n-1)!
for n_val in range(2, 7):
    poly = prod(x - j for j in range(1, n_val + 1))
    assert simplify(diff(poly, x).subs(x, 1) - (-1) ** (n_val - 1) * factorial(n_val - 1)) == 0
    assert simplify(limit((poly - poly.subs(x, 1)) / (x - 1), x, 1) - (-1) ** (n_val - 1) * factorial(n_val - 1)) == 0
check("2", (diff(prod(x - j for j in range(1, 5)), x).subs(x, 1), -6))

# Q4: q(x) = 3x^2 + 2x, lambda(4) = 26
charge = 3 * x**2 + 2 * x
check(
    "4",
    (limit((charge.subs(x, 4 + h) - charge.subs(x, 4)) / h, h, 0, dir="-"), 26),
    (limit((charge.subs(x, 4 + h) - charge.subs(x, 4)) / h, h, 0, dir="+"), 26),
    (diff(charge, x).subs(x, 4), 26),
)

# Q5: f(x) = 1 / (2x + 1), by difference quotient -> -2 / (2x + 1)^2
f5 = 1 / (2 * x + 1)
dq5 = simplify((f5.subs(x, x + h) - f5) / h)
check("5", (limit(dq5, h, 0), -2 / (2 * x + 1) ** 2), (diff(f5, x), -2 / (2 * x + 1) ** 2))

# Q6-1: tan(2x) (x < 0), e^(2x) - 1 (x >= 0) at x = 0
check(
    "6-1",
    (limit(tan(2 * x) / x, x, 0, dir="-"), 2),
    (limit((exp(2 * x) - 1) / x, x, 0, dir="+"), 2),
)

# Q6-2: 3x / (1 + e^(-2/x)) (x != 0), 0 (x = 0) at x = 0
check(
    "6-2",
    (limit(3 / (1 + exp(-2 / x)), x, 0, dir="-"), 0),
    (limit(3 / (1 + exp(-2 / x)), x, 0, dir="+"), 3),
)

# Q7: x cos(2/x) (x != 0), 0 (x = 0): continuous at 0, non-differentiable at 0
m_int = symbols("m_int", integer=True, positive=True)
check(
    "7",
    (limit(x * cos(2 / x), x, 0, dir="+"), 0),
    (limit(x * cos(2 / x), x, 0, dir="-"), 0),
    (cos(2 / (2 / (2 * m_int * pi))), 1),
    (cos(2 / (2 / ((2 * m_int + 1) * pi))), -1),
)

# Q8-1: y = arccos(cos x) -> sin x / |sin x|
# Check on (0, pi) where sin x > 0 and (-pi, 0) where sin x < 0
t_pos = symbols("t_pos", positive=True)
check(
    "8-1",
    (diff(acos(cos(x)), x).subs(x, Rational(1, 2)), sin(Rational(1, 2)) / Abs(sin(Rational(1, 2)))),
    (diff(acos(cos(x)), x).subs(x, -Rational(1, 2)), sin(-Rational(1, 2)) / Abs(sin(-Rational(1, 2)))),
    (diff(acos(cos(x)), x), sin(x) / sqrt(1 - cos(x) ** 2)),
)

# Q8-2: y = arctan((2 - x) / (1 + 2x)) -> -1 / (1 + x^2)
y82 = atan((2 - x) / (1 + 2 * x))
check("8-2", (simplify(diff(y82, x)), -1 / (1 + x**2)))

# Q8-3: y = ln(tan(pi/4 + x/2)) + sin x * ln(cot x) on (0, pi/2) -> cos x * ln(cot x)
y83 = log(tan(pi / 4 + x / 2)) + sin(x) * log(cot(x))
check("8-3", (simplify((diff(y83, x) - cos(x) * log(cot(x))).rewrite(cos)), 0))

# Q8-4: y = ln(e^(2x) + sqrt(e^(4x) + 4)) -> 2 e^(2x) / sqrt(e^(4x) + 4)
y84 = log(exp(2 * x) + sqrt(exp(4 * x) + 4))
check("8-4", (simplify(diff(y84, x) - 2 * exp(2 * x) / sqrt(exp(4 * x) + 4)), 0))

# Q8-5: y = (2x)^(1/x) (x > 0) -> (2x)^(1/x) * (1 - ln(2x)) / x^2
y85 = (2 * p) ** (1 / p)
check("8-5", (simplify(diff(y85, p) - y85 * (1 - log(2 * p)) / p**2), 0))

# Q9-1: y = sin^2(2x) * ln x (x > 0) -> y'' = 8 cos(4x) ln x + 4 sin(4x)/x - sin^2(2x)/x^2
y91 = sin(2 * p) ** 2 * log(p)
expected91 = 8 * cos(4 * p) * log(p) + 4 * sin(4 * p) / p - sin(2 * p) ** 2 / p**2
check("9-1", (trigsimp(simplify(diff(y91, p, 2) - expected91)), 0))

# Q9-2: y = x / sqrt(4 + x^2) -> y'' = -12x / (4 + x^2)^(5/2)
y92 = x / sqrt(4 + x**2)
check(
    "9-2",
    (simplify(diff(y92, x) - 4 / (4 + x**2) ** Rational(3, 2)), 0),
    (simplify(diff(y92, x, 2) - (-12 * x / (4 + x**2) ** Rational(5, 2))), 0),
)

# Q10-1: y = (2x + 1)^(1/k) -> y^(n) = 2^n * prod_{j=0}^{n-1} (1/k - j) * (2x + 1)^(1/k - n)
y101 = (2 * p + 1) ** (Rational(1, 1) / k)
for n_val in range(1, 6):
    falling = prod(Rational(1, 1) / k - j for j in range(n_val))
    expected = 2**n_val * falling * (2 * p + 1) ** (Rational(1, 1) / k - n_val)
    assert simplify(diff(y101, p, n_val) - expected) == 0
check("10-1", (simplify(diff(y101, p, 3) - 8 * (1 / k) * (1 / k - 1) * (1 / k - 2) * (2 * p + 1) ** (1 / k - 3)), 0))

# Q10-2: y = (2x + 5) / (2x - 1) -> y^(n) = 6 * (-1)^n * 2^n * n! / (2x - 1)^(n + 1)
y102 = (2 * x + 5) / (2 * x - 1)
for n_val in range(1, 7):
    expected = 6 * (-1) ** n_val * 2**n_val * factorial(n_val) / (2 * x - 1) ** (n_val + 1)
    assert simplify(diff(y102, x, n_val) - expected) == 0
check("10-2", (simplify(y102 - (1 + 6 / (2 * x - 1))), 0))

# Q11: e^y + 3xy = e -> y(0) = 1, y'(0) = -3/e, y''(0) = 9/e^2
y_val, yp, ypp = symbols("y_val yp ypp", real=True)
eq11 = exp(y_val) + 3 * x * y_val - exp(1)
y0 = solve(eq11.subs(x, 0), y_val)[0]
yp_expr = idiff(eq11, y_val, x)
ypp_expr = idiff(eq11, y_val, x, 2)
check(
    "11",
    (y0, 1),
    (yp_expr.subs({x: 0, y_val: y0}), -3 / exp(1)),
    (ypp_expr.subs({x: 0, y_val: y0}), 9 / exp(2)),
)

# Q12: e^x = 2t^2 + 3t + 1, t cos y - y + pi/3 = 0 -> dy/dx|_{t=0} = 1/6
dx_dt = (4 * t + 3) / exp(x)
dy_dt = cos(y_val) / (1 + t * sin(y_val))
dy_dx_t0 = (dy_dt / dx_dt).subs({t: 0, x: 0, y_val: pi / 3})
check("12", (dy_dx_t0, Rational(1, 6)))

# Q13-1: x = a sin^3 t, y = b cos^3 t -> dy/dx = -(b/a) cot t, d^2y/dx^2 = b/(3a^2) csc^4 t sec t
x131 = a * sin(t) ** 3
y131 = b * cos(t) ** 3
d1_131 = trigsimp(diff(y131, t) / diff(x131, t))
d2_131 = trigsimp(diff(d1_131, t) / diff(x131, t))
check(
    "13-1",
    (trigsimp(d1_131 - (-(b / a) * cot(t))), 0),
    (trigsimp(d2_131 - b / (3 * a**2) * csc(t) ** 4 * sec(t)), 0),
)

# Q13-2: x = ln(1 + t^2), y = t - arctan t -> dy/dx = t/2, d^2y/dx^2 = (1 + t^2)/(4t)
x132 = log(1 + t**2)
y132 = t - atan(t)
d1_132 = simplify(diff(y132, t) / diff(x132, t))
d2_132 = simplify(diff(d1_132, t) / diff(x132, t))
check("13-2", (d1_132, t / 2), (d2_132, (1 + t**2) / (4 * t)))

# Q14: x = 3e^(2t), y = 2e^(-t) at t = 0 -> point (3, 2), k = -1/3, tangent x + 3y - 9 = 0, normal 3x - y - 7 = 0
x14 = 3 * exp(2 * t)
y14 = 2 * exp(-t)
slope14 = (diff(y14, t) / diff(x14, t)).subs(t, 0)
pt_x, pt_y = x14.subs(t, 0), y14.subs(t, 0)
tan14 = pt_y + slope14 * (x - pt_x)
nor14 = pt_y - (1 / slope14) * (x - pt_x)
check(
    "14",
    (pt_x, 3),
    (pt_y, 2),
    (slope14, Rational(-1, 3)),
    (simplify(x + 3 * tan14 - 9), 0),
    (simplify(3 * x - nor14 - 7), 0),
)

# Q15: period 4, f(2 + tan x) - 2 f(2 - tan x) = 9x + o(x) -> f(2) = 0, f'(2) = 3, tangent at (6, 0): 3x - y - 18 = 0
c0, c1 = symbols("c0 c1", real=True)
f_approx = c0 + c1 * (x - 2)
expr15 = f_approx.subs(x, 2 + tan(t)) - 2 * f_approx.subs(x, 2 - tan(t))
c0_sol = solve(limit(expr15, t, 0), c0)[0]
c1_sol = solve(limit(expr15.subs(c0, c0_sol) / t, t, 0) - 9, c1)[0]
check("15", (c0_sol, 0), (c1_sol, 3), (c0_sol + c1_sol * (x - 6), 3 * x - 18))

# Q16: cubic y = A x^3 + B x^2 + C x + D with y(0)=0, y'(0)=0, y(L)=H, y'(L)=0
A_c, B_c, C_c, D_c = symbols("A_c B_c C_c D_c", real=True)
cubic = A_c * x**3 + B_c * x**2 + C_c * x + D_c
sol16 = solve(
    [
        cubic.subs(x, 0),
        diff(cubic, x).subs(x, 0),
        cubic.subs(x, L) - H,
        diff(cubic, x).subs(x, L),
    ],
    [A_c, B_c, C_c, D_c],
)
expected16 = H * (3 * (x / L) ** 2 - 2 * (x / L) ** 3)
check("16", (simplify(cubic.subs(sol16) - expected16), 0))

# Q17: A goes North at 6 km/h from (0,0), B goes West at 10 km/h from (18,0). Find ds/dt at t = 1 h.
dist17 = sqrt((18 - 10 * t) ** 2 + (6 * t) ** 2)
check("17", (dist17.subs(t, 1), 10), (diff(dist17, t).subs(t, 1), Rational(-22, 5)))

# Q18: Differential approx of (1.03)^(1/5) around x = 0: 1 + (1/5)*0.03 = 1.006
f18 = (1 + x) ** Rational(1, 5)
approx18 = f18.subs(x, 0) + diff(f18, x).subs(x, 0) * Rational(3, 100)
check("18", (approx18, Rational(503, 500)))

# Q19: T = 2*pi*sqrt(m/k), k = 100 N/m, m = 4 kg, dT = 0.02 s -> dm = 2/(5*pi) kg
m_sym, k_sym = symbols("m_sym k_sym", positive=True)
T19 = 2 * pi * sqrt(m_sym / k_sym)
dT_dm = diff(T19, m_sym).subs({k_sym: 100, m_sym: 4})
dm_sol = Rational(2, 100) / dT_dm
check("19", (dT_dm, pi / 20), (dm_sol, 2 / (5 * pi)))
assert abs(float(dm_sol) - 0.12732395447351627) < 1e-12

assert len(verified) == 25
print(f"SymPy verified {len(verified)} Chapter 2 review exercises")

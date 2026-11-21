"""Symbolic verification for Section 7-6 and Section 7-7 (42 items)."""
import sympy as sp

x, t = sp.symbols("x t", real=True)
x_pos = sp.symbols("x", positive=True)
C1, C2, C3, C4 = sp.symbols("C1 C2 C3 C4")
k, alpha, beta, v0 = sp.symbols("k alpha beta v0", positive=True)
a_sym, b_sym = sp.symbols("a b", real=True)


def wronskian(funcs, var=x):
    n = len(funcs)
    M = sp.Matrix([[sp.diff(f, var, i) for f in funcs] for i in range(n)])
    return sp.simplify(M.det())


def check_ode(y_expr, ode_fn, var=x, name=""):
    res = sp.simplify(ode_fn(y_expr, var))
    assert res == 0, f"{name}: ODE residual = {res}"


verified = []

# ==================== 7-6 Q1 (1)-(10): Linear independence / dependence ====================
# 7-6-1-1: x^2, x^3 -> linearly independent
W = wronskian([x**2, x**3])
assert W == x**4 and W != 0
verified.append("jc935-7-6-1-1")

# 7-6-1-2: x^2, 5x^2 -> linearly dependent
W = wronskian([x**2, 5 * x**2])
assert W == 0
verified.append("jc935-7-6-1-2")

# 7-6-1-3: e^(3x), 4e^(3x) -> linearly dependent
W = wronskian([sp.exp(3 * x), 4 * sp.exp(3 * x)])
assert W == 0
verified.append("jc935-7-6-1-3")

# 7-6-1-4: e^(-2x), e^(2x) -> linearly independent
W = wronskian([sp.exp(-2 * x), sp.exp(2 * x)])
assert W == 4
verified.append("jc935-7-6-1-4")

# 7-6-1-5: cos 3x, sin 3x -> linearly independent
W = wronskian([sp.cos(3 * x), sp.sin(3 * x)])
assert sp.trigsimp(W) == 3
verified.append("jc935-7-6-1-5")

# 7-6-1-6: e^(-x^2), x e^(-x^2) -> linearly independent
W = wronskian([sp.exp(-x**2), x * sp.exp(-x**2)])
assert W == sp.exp(-2 * x**2)
verified.append("jc935-7-6-1-6")

# 7-6-1-7: sin 4x, sin 2x cos 2x -> linearly dependent
W = sp.trigsimp(wronskian([sp.sin(4 * x), sp.sin(2 * x) * sp.cos(2 * x)]))
assert W == 0
assert sp.simplify(sp.sin(4 * x) - 2 * sp.sin(2 * x) * sp.cos(2 * x)) == 0
verified.append("jc935-7-6-1-7")

# 7-6-1-8: e^(2x) cos 3x, e^(2x) sin 3x -> linearly independent
W = sp.trigsimp(wronskian([sp.exp(2 * x) * sp.cos(3 * x), sp.exp(2 * x) * sp.sin(3 * x)]))
assert W == 3 * sp.exp(4 * x)
verified.append("jc935-7-6-1-8")

# 7-6-1-9: ln x, x^2 ln x on (0, +inf) -> linearly independent
W = wronskian([sp.ln(x_pos), x_pos**2 * sp.ln(x_pos)], x_pos)
assert W == 2 * x_pos * sp.ln(x_pos) ** 2 and W != 0
verified.append("jc935-7-6-1-9")

# 7-6-1-10: e^(a x), e^(b x) (a != b) -> linearly independent
W = wronskian([sp.exp(a_sym * x), sp.exp(b_sym * x)])
assert sp.simplify(W - (b_sym - a_sym) * sp.exp((a_sym + b_sym) * x)) == 0
verified.append("jc935-7-6-1-10")

# ==================== 7-6 Q2, Q3 ====================
# 7-6-2: y'' - k^2 y = 0, y1 = cosh(kx), y2 = sinh(kx)
y1, y2 = sp.cosh(k * x), sp.sinh(k * x)
check_ode(C1 * y1 + C2 * y2, lambda y, v: sp.diff(y, v, 2) - k**2 * y, name="7-6-2")
assert sp.simplify(wronskian([y1, y2]) - k) == 0
verified.append("jc935-7-6-2")

# 7-6-3: y'' + 4x y' + (4x^2 + 2) y = 0, y1 = e^(-x^2), y2 = x e^(-x^2)
y1, y2 = sp.exp(-x**2), x * sp.exp(-x**2)
check_ode(
    C1 * y1 + C2 * y2,
    lambda y, v: sp.diff(y, v, 2) + 4 * v * sp.diff(y, v) + (4 * v**2 + 2) * y,
    name="7-6-3",
)
assert wronskian([y1, y2]) == sp.exp(-2 * x**2)
verified.append("jc935-7-6-3")

# ==================== 7-6 Q4 (1)-(6) ====================
# 7-6-4-1: y'' - y' - 2y = e^(4x)
y_sol = C1 * sp.exp(-x) + C2 * sp.exp(2 * x) + sp.Rational(1, 10) * sp.exp(4 * x)
check_ode(y_sol, lambda y, v: sp.diff(y, v, 2) - sp.diff(y, v) - 2 * y - sp.exp(4 * v), name="7-6-4-1")
assert wronskian([sp.exp(-x), sp.exp(2 * x)]) == 3 * sp.exp(x)
verified.append("jc935-7-6-4-1")

# 7-6-4-2: y'' + 4y = x cos x
y_sol = C1 * sp.cos(2 * x) + C2 * sp.sin(2 * x) + sp.Rational(1, 9) * (3 * x * sp.cos(x) + 2 * sp.sin(x))
check_ode(y_sol, lambda y, v: sp.diff(y, v, 2) + 4 * y - v * sp.cos(v), name="7-6-4-2")
assert sp.trigsimp(wronskian([sp.cos(2 * x), sp.sin(2 * x)])) == 2
verified.append("jc935-7-6-4-2")

# 7-6-4-3: x^2 y'' - 5x y' + 9y = 0 (x > 0)
y_sol = C1 * x_pos**3 + C2 * x_pos**3 * sp.ln(x_pos)
check_ode(
    y_sol,
    lambda y, v: v**2 * sp.diff(y, v, 2) - 5 * v * sp.diff(y, v) + 9 * y,
    var=x_pos,
    name="7-6-4-3",
)
assert wronskian([x_pos**3, x_pos**3 * sp.ln(x_pos)], x_pos) == x_pos**5
verified.append("jc935-7-6-4-3")

# 7-6-4-4: x^2 y'' - 5x y' + 5y = x^3 ln x (x > 0)
y_sol = C1 * x_pos**5 + C2 * x_pos - sp.Rational(1, 4) * x_pos**3 * sp.ln(x_pos)
check_ode(
    y_sol,
    lambda y, v: v**2 * sp.diff(y, v, 2) - 5 * v * sp.diff(y, v) + 5 * y - v**3 * sp.ln(v),
    var=x_pos,
    name="7-6-4-4",
)
assert wronskian([x_pos**5, x_pos], x_pos) == -4 * x_pos**5
verified.append("jc935-7-6-4-4")

# 7-6-4-5: x y'' + 2 y' - 4x y = e^(2x) (x != 0)
y_sol = (C1 * sp.exp(2 * x) + C2 * sp.exp(-2 * x)) / x + sp.exp(2 * x) / 4
check_ode(
    y_sol,
    lambda y, v: v * sp.diff(y, v, 2) + 2 * sp.diff(y, v) - 4 * v * y - sp.exp(2 * v),
    name="7-6-4-5",
)
assert sp.simplify(wronskian([sp.exp(2 * x) / x, sp.exp(-2 * x) / x]) + 4 / x**2) == 0
verified.append("jc935-7-6-4-5")

# 7-6-4-6: y^(4) - 16y = x^3
y_sol = (
    C1 * sp.exp(2 * x)
    + C2 * sp.exp(-2 * x)
    + C3 * sp.cos(2 * x)
    + C4 * sp.sin(2 * x)
    - sp.Rational(1, 16) * x**3
)
check_ode(y_sol, lambda y, v: sp.diff(y, v, 4) - 16 * y - v**3, name="7-6-4-6")
W4 = sp.trigsimp(wronskian([sp.exp(2 * x), sp.exp(-2 * x), sp.cos(2 * x), sp.sin(2 * x)]))
assert W4 == -512
verified.append("jc935-7-6-4-6")

# ==================== 7-6 Q5, Q6, Q7, Q8 ====================
# 7-6-5: (2x - 1)y'' - 4x y' + 4y = 0, given y1 = e^(2x)
y_sol = C1 * x + C2 * sp.exp(2 * x)
check_ode(
    y_sol,
    lambda y, v: (2 * v - 1) * sp.diff(y, v, 2) - 4 * v * sp.diff(y, v) + 4 * y,
    name="7-6-5",
)
assert wronskian([x, sp.exp(2 * x)]) == (2 * x - 1) * sp.exp(2 * x)
verified.append("jc935-7-6-5")

# 7-6-6: x^2 y'' - 4x y' + 6y = 2x^4 (x > 0), given y1 = x^2
y_sol = C1 * x_pos**2 + C2 * x_pos**3 + x_pos**4
check_ode(
    y_sol,
    lambda y, v: v**2 * sp.diff(y, v, 2) - 4 * v * sp.diff(y, v) + 6 * y - 2 * v**4,
    var=x_pos,
    name="7-6-6",
)
assert wronskian([x_pos**2, x_pos**3], x_pos) == x_pos**4
verified.append("jc935-7-6-6")

# 7-6-7: y'' + 4y = sec(2x)
y_sol = (
    C1 * sp.cos(2 * x)
    + C2 * sp.sin(2 * x)
    + sp.Rational(1, 4) * sp.cos(2 * x) * sp.ln(sp.cos(2 * x))
    + sp.Rational(1, 2) * x * sp.sin(2 * x)
)
check_ode(y_sol, lambda y, v: sp.diff(y, v, 2) + 4 * y - sp.sec(2 * v), name="7-6-7")
verified.append("jc935-7-6-7")

# 7-6-8: x^2 y'' - 3x y' + 4y = 2x^2 (x > 0)
y_sol = C1 * x_pos**2 + C2 * x_pos**2 * sp.ln(x_pos) + x_pos**2 * sp.ln(x_pos) ** 2
check_ode(
    y_sol,
    lambda y, v: v**2 * sp.diff(y, v, 2) - 3 * v * sp.diff(y, v) + 4 * y - 2 * v**2,
    var=x_pos,
    name="7-6-8",
)
verified.append("jc935-7-6-8")

# ==================== 7-7 Q1 ====================
# 7-7-1: y = C1 e^(2x) + C2 cos 3x + C3 sin 3x -> y''' - 2y'' + 9y' - 18y = 0
r = sp.symbols("r")
assert sp.expand((r - 2) * (r**2 + 9)) == r**3 - 2 * r**2 + 9 * r - 18
y_sol = C1 * sp.exp(2 * x) + C2 * sp.cos(3 * x) + C3 * sp.sin(3 * x)
check_ode(
    y_sol,
    lambda y, v: sp.diff(y, v, 3) - 2 * sp.diff(y, v, 2) + 9 * sp.diff(y, v) - 18 * y,
    name="7-7-1",
)
verified.append("jc935-7-7-1")

# ==================== 7-7 Q2 (1)-(10) ====================
# 7-7-2-1: y'' - y' - 6y = 0
check_ode(C1 * sp.exp(3 * x) + C2 * sp.exp(-2 * x), lambda y, v: sp.diff(y, v, 2) - sp.diff(y, v) - 6 * y, name="7-7-2-1")
verified.append("jc935-7-7-2-1")

# 7-7-2-2: y'' + 5y' = 0
check_ode(C1 + C2 * sp.exp(-5 * x), lambda y, v: sp.diff(y, v, 2) + 5 * sp.diff(y, v), name="7-7-2-2")
verified.append("jc935-7-7-2-2")

# 7-7-2-3: y'' + 9y = 0
check_ode(C1 * sp.cos(3 * x) + C2 * sp.sin(3 * x), lambda y, v: sp.diff(y, v, 2) + 9 * y, name="7-7-2-3")
verified.append("jc935-7-7-2-3")

# 7-7-2-4: y'' + 4y' + 13y = 0
check_ode(
    sp.exp(-2 * x) * (C1 * sp.cos(3 * x) + C2 * sp.sin(3 * x)),
    lambda y, v: sp.diff(y, v, 2) + 4 * sp.diff(y, v) + 13 * y,
    name="7-7-2-4",
)
verified.append("jc935-7-7-2-4")

# 7-7-2-5: 9 x'' - 12 x' + 4 x = 0 (in t)
check_ode(
    (C1 + C2 * t) * sp.exp(sp.Rational(2, 3) * t),
    lambda y, v: 9 * sp.diff(y, v, 2) - 12 * sp.diff(y, v) + 4 * y,
    var=t,
    name="7-7-2-5",
)
verified.append("jc935-7-7-2-5")

# 7-7-2-6: y'' - 6y' + 10y = 0
check_ode(
    sp.exp(3 * x) * (C1 * sp.cos(x) + C2 * sp.sin(x)),
    lambda y, v: sp.diff(y, v, 2) - 6 * sp.diff(y, v) + 10 * y,
    name="7-7-2-6",
)
verified.append("jc935-7-7-2-6")

# 7-7-2-7: y^(4) - 16y = 0
check_ode(
    C1 * sp.exp(2 * x) + C2 * sp.exp(-2 * x) + C3 * sp.cos(2 * x) + C4 * sp.sin(2 * x),
    lambda y, v: sp.diff(y, v, 4) - 16 * y,
    name="7-7-2-7",
)
verified.append("jc935-7-7-2-7")

# 7-7-2-8: y^(4) + 8y'' + 16y = 0
check_ode(
    (C1 + C2 * x) * sp.cos(2 * x) + (C3 + C4 * x) * sp.sin(2 * x),
    lambda y, v: sp.diff(y, v, 4) + 8 * sp.diff(y, v, 2) + 16 * y,
    name="7-7-2-8",
)
verified.append("jc935-7-7-2-8")

# 7-7-2-9: y^(4) + 4y''' + 4y'' = 0
check_ode(
    C1 + C2 * x + (C3 + C4 * x) * sp.exp(-2 * x),
    lambda y, v: sp.diff(y, v, 4) + 4 * sp.diff(y, v, 3) + 4 * sp.diff(y, v, 2),
    name="7-7-2-9",
)
verified.append("jc935-7-7-2-9")

# 7-7-2-10: y^(4) + 3y'' - 4y = 0
check_ode(
    C1 * sp.exp(x) + C2 * sp.exp(-x) + C3 * sp.cos(2 * x) + C4 * sp.sin(2 * x),
    lambda y, v: sp.diff(y, v, 4) + 3 * sp.diff(y, v, 2) - 4 * y,
    name="7-7-2-10",
)
verified.append("jc935-7-7-2-10")

# ==================== 7-7 Q3 (1)-(6): IVPs ====================
def check_ivp(y_expr, ode_fn, y0, dy0, var=x, name=""):
    check_ode(y_expr, ode_fn, var=var, name=name)
    assert sp.simplify(y_expr.subs(var, 0) - y0) == 0, f"{name}: y(0) mismatch"
    assert sp.simplify(sp.diff(y_expr, var).subs(var, 0) - dy0) == 0, f"{name}: y'(0) mismatch"


# 7-7-3-1
check_ivp(2 * sp.exp(2 * x) + 3 * sp.exp(3 * x), lambda y, v: sp.diff(y, v, 2) - 5 * sp.diff(y, v) + 6 * y, 5, 13, name="7-7-3-1")
verified.append("jc935-7-7-3-1")

# 7-7-3-2
check_ivp((3 + 2 * x) * sp.exp(-x / 3), lambda y, v: 9 * sp.diff(y, v, 2) + 6 * sp.diff(y, v) + y, 3, 1, name="7-7-3-2")
verified.append("jc935-7-7-3-2")

# 7-7-3-3
check_ivp(sp.exp(3 * x) - sp.exp(-x), lambda y, v: sp.diff(y, v, 2) - 2 * sp.diff(y, v) - 3 * y, 0, 4, name="7-7-3-3")
verified.append("jc935-7-7-3-3")

# 7-7-3-4
check_ivp(2 * sp.exp(-x) * sp.sin(4 * x), lambda y, v: sp.diff(y, v, 2) + 2 * sp.diff(y, v) + 17 * y, 0, 8, name="7-7-3-4")
verified.append("jc935-7-7-3-4")

# 7-7-3-5
check_ivp(3 * sp.cos(4 * x) + 2 * sp.sin(4 * x), lambda y, v: sp.diff(y, v, 2) + 16 * y, 3, 8, name="7-7-3-5")
verified.append("jc935-7-7-3-5")

# 7-7-3-6
check_ivp(3 * sp.exp(x) * sp.sin(2 * x), lambda y, v: sp.diff(y, v, 2) - 2 * sp.diff(y, v) + 5 * y, 0, 6, name="7-7-3-6")
verified.append("jc935-7-7-3-6")

# ==================== 7-7 Q4, Q5, Q6: Applications ====================
# 7-7-4: x'' + 2*beta*x' - alpha*x = 0, x(0) = 0, x'(0) = v0
gamma = sp.sqrt(beta**2 + alpha)
x_t = (v0 / gamma) * sp.exp(-beta * t) * sp.sinh(gamma * t)
check_ivp(x_t, lambda y, v: sp.diff(y, v, 2) + 2 * beta * sp.diff(y, v) - alpha * y, 0, v0, var=t, name="7-7-4")
x_t_exp = (v0 / (2 * gamma)) * (sp.exp((-beta + gamma) * t) - sp.exp((-beta - gamma) * t))
assert sp.simplify(x_t - x_t_exp) == 0
verified.append("jc935-7-7-4")

# 7-7-5: RLC discharge: L=0.25 H, R=1250 ohm, C=1e-6 F, E=15 V
# u'' + 5000 u' + 4e6 u = 0, u(0) = 15, u'(0) = 0
u_c = 20 * sp.exp(-1000 * t) - 5 * sp.exp(-4000 * t)
check_ivp(u_c, lambda y, v: sp.diff(y, v, 2) + 5000 * sp.diff(y, v) + 4000000 * y, 15, 0, var=t, name="7-7-5")
i_t = sp.Rational(1, 10**6) * sp.diff(u_c, t)
assert sp.simplify(i_t - sp.Rational(1, 50) * (sp.exp(-4000 * t) - sp.exp(-1000 * t))) == 0
verified.append("jc935-7-7-5")

# 7-7-6: Floating cylinder: R = 0.2 m, rho = 1000 kg/m^3, T = 1.5 s
g_sym = sp.symbols("g", positive=True)
rho = 1000
R_val = sp.Rational(1, 5)
T_val = sp.Rational(3, 2)
omega = 2 * sp.pi / T_val
m_val = sp.simplify(rho * g_sym * sp.pi * R_val**2 / omega**2)
assert m_val == 45 * g_sym / (2 * sp.pi)
m_num = float(m_val.subs(g_sym, sp.Rational(98, 10)).evalf())
assert abs(m_num - 70.18733) < 1e-3
verified.append("jc935-7-7-6")

assert len(verified) == 42, f"Expected 42 verified items, got {len(verified)}"
print(f"ALL {len(verified)} items in 7-6 (22) and 7-7 (20) symbolically verified successfully!")

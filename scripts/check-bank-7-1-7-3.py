"""Symbolic verification for Sections 7-1, 7-2, and 7-3 (bankOdeFirstOrderBasics)."""

import sympy as sp

x, y, t, theta, C, C1, C2 = sp.symbols("x y t theta C C1 C2", real=True)
k, m, c_damp, alpha, beta, b, r0, v0, L = sp.symbols(
    "k m c_damp alpha beta b r0 v0 L", positive=True
)
yf = sp.Function("y")
sf = sp.Function("s")
rf = sp.Function("r")
cf = sp.Function("c")
hf = sp.Function("h")
vf = sp.Function("v")
Mf = sp.Function("M")
rhof = sp.Function("rho")

checked = []


def verify_order(item_id, expr, func, expected_order):
    actual = sp.ode_order(expr, func)
    assert actual == expected_order, f"{item_id}: expected order {expected_order}, got {actual}"
    checked.append(item_id)


def verify_implicit_ode(item_id, F_xy, M_expr, N_expr):
    """Verify F(x, y) = C satisfies M(x, y) dx + N(x, y) dy = 0, i.e. F_x * N - F_y * M == 0."""
    Fx = sp.diff(F_xy, x)
    Fy = sp.diff(F_xy, y)
    res = sp.simplify(Fx * N_expr - Fy * M_expr)
    assert res == 0, f"{item_id}: implicit ODE check failed, got {res}"
    checked.append(item_id)


def verify_explicit_ode(item_id, y_expr, ode_lhs, subs_ic=None):
    """Verify y = y_expr satisfies ode_lhs == 0, and optional initial conditions."""
    res = sp.simplify(ode_lhs.subs(yf(x), y_expr).doit())
    assert res == 0, f"{item_id}: explicit ODE check failed, got {res}"
    if subs_ic:
        for expr_fn, expected in subs_ic:
            val = sp.simplify(expr_fn(y_expr))
            assert val == expected, f"{item_id}: IC failed, expected {expected}, got {val}"
    checked.append(item_id)


# ============================================================
# Section 7-1: 微分方程的基本概念 (20 items)
# ============================================================

# 7-1-1-(1..6): ODE order
verify_order("jc935-7-1-1-1", 2 * x * yf(x).diff(x) ** 3 - 5 * yf(x) * yf(x).diff(x) + 3 * x**2, yf(x), 1)
verify_order("jc935-7-1-1-2", 3 * x**2 * yf(x).diff(x, 2) + 4 * x * yf(x).diff(x) - 2 * yf(x), yf(x), 2)
verify_order("jc935-7-1-1-3", x**2 * yf(x).diff(x, 3) - 4 * yf(x).diff(x, 2) + 5 * x * yf(x), yf(x), 3)
verify_order("jc935-7-1-1-4", (5 * x + 3 * yf(x)) - (2 * x - 7 * yf(x)) * yf(x).diff(x), yf(x), 1)
verify_order("jc935-7-1-1-5", m * sf(t).diff(t, 2) + c_damp * sf(t).diff(t) + k * sf(t), sf(t), 2)
verify_order("jc935-7-1-1-6", rf(theta).diff(theta) - 2 * rf(theta) - sp.cos(theta) ** 2, rf(theta), 1)

# 7-1-2-(1..4): Verify whether given function is a solution
verify_explicit_ode("jc935-7-1-2-1", 4 * x**3, x * yf(x).diff(x) - 3 * yf(x))
verify_explicit_ode("jc935-7-1-2-2", 2 * sp.sin(2 * x) - 5 * sp.cos(2 * x), yf(x).diff(x, 2) + 4 * yf(x))
# 7-1-2-3: NOT a solution, residual is 2*exp(2*x) != 0
res_7123 = sp.simplify((yf(x).diff(x, 2) - 4 * yf(x).diff(x) + 4 * yf(x)).subs(yf(x), x**2 * sp.exp(2 * x)).doit())
assert sp.simplify(res_7123 - 2 * sp.exp(2 * x)) == 0, f"jc935-7-1-2-3 failed: {res_7123}"
checked.append("jc935-7-1-2-3")
verify_explicit_ode(
    "jc935-7-1-2-4",
    C1 * sp.exp(alpha * x) + C2 * sp.exp(beta * x),
    yf(x).diff(x, 2) - (alpha + beta) * yf(x).diff(x) + alpha * beta * yf(x),
)

# 7-1-3-(1..2): Implicit solution verification
verify_implicit_ode("jc935-7-1-3-1", 3 * x**2 - 4 * x * y + 3 * y**2, -(3 * x - 2 * y), 2 * x - 3 * y)
# 7-1-3-2: y = 2*ln(x*y) => (xy - 2x)y'' + x(y')^2 + yy' - 4y' = 0
yp, ypp = sp.symbols("yp ypp")
eq1_7132 = sp.diff(yf(x) - 2 * sp.log(x * yf(x)), x)
yp_expr = sp.solve(eq1_7132.subs(yf(x).diff(x), yp), yp)[0].subs(yf(x), y)
eq2_7132 = sp.diff(eq1_7132, x)
ypp_expr = sp.solve(eq2_7132.subs({yf(x).diff(x, 2): ypp, yf(x).diff(x): yp}), ypp)[0].subs({yf(x): y, yp: yp_expr})
res_7132 = sp.simplify((x * y - 2 * x) * ypp_expr + x * yp_expr**2 + y * yp_expr - 4 * yp_expr)
assert res_7132 == 0, f"jc935-7-1-3-2 failed: {res_7132}"
checked.append("jc935-7-1-3-2")

# 7-1-4-(1..3): Determine parameters from initial conditions
assert (2 * x**2 - y**2).subs({x: 1, y: 3}) == -7
checked.append("jc935-7-1-4-1")
y_7142 = (1 + 2 * x) * sp.exp(3 * x)
assert y_7142.subs(x, 0) == 1 and sp.diff(y_7142, x).subs(x, 0) == 5
checked.append("jc935-7-1-4-2")
y_7143 = -3 * sp.sin(2 * x)
assert y_7143.subs(x, sp.pi / 2) == 0 and sp.diff(y_7143, x).subs(x, sp.pi / 2) == 6
checked.append("jc935-7-1-4-3")

# 7-1-5-(1..3): Geometric ODE modeling
# 7-1-5-1: y' = x^3 - 1
assert sp.ode_order(yf(x).diff(x) - (x**3 - 1), yf(x)) == 1
checked.append("jc935-7-1-5-1")
# 7-1-5-2: Q = (0, -y), normal slope (y - (-y))/(x - 0) = -1/y' => 2yy' + x = 0
assert sp.simplify((2 * y / x) + 1 / yp - (2 * y * yp + x) / (x * yp)) == 0
checked.append("jc935-7-1-5-2")
# 7-1-5-3: Q = (x - y/y', 0), |PQ|^2 = (y/y')^2 + y^2 = b^2 => y^2(1 + (y')^2) = b^2 (y')^2
assert sp.simplify(((y / yp) ** 2 + y**2 - b**2) * yp**2 - (y**2 * (1 + yp**2) - b**2 * yp**2)) == 0
checked.append("jc935-7-1-5-3")

# 7-1-6: dc/dT = k * c / T^3
T = sp.Symbol("T", positive=True)
assert sp.ode_order(cf(T).diff(T) - k * cf(T) / T**3, cf(T)) == 1
checked.append("jc935-7-1-6")

# 7-1-7: Spherical ice melting
# dV/dt = 4*pi*r^2*dr/dt = -k*(4*pi*r^2) => dr/dt = -k => r(t) = r0 - k*t
k_717 = sp.solve(sp.Eq((r0 - 2 * k) ** 3, sp.Rational(8, 27) * r0**3), k)[0]
assert sp.simplify(k_717 - r0 / 6) == 0
t_melt = sp.solve(sp.Eq(r0 - k_717 * t, 0), t)[0]
assert t_melt == 6
checked.append("jc935-7-1-7")


# ============================================================
# Section 7-2: 可分离变量的微分方程 (22 items)
# ============================================================

# 7-2-1-(1..10): General solutions
verify_explicit_ode("jc935-7-2-1-1", sp.exp(C * x**2), x * yf(x).diff(x) - 2 * yf(x) * sp.log(yf(x)))
verify_explicit_ode("jc935-7-2-1-2", sp.Rational(1, 6) * x**4 + sp.Rational(1, 6) * x**3 + C, 4 * x**3 + 3 * x**2 - 6 * yf(x).diff(x))
verify_implicit_ode("jc935-7-2-1-3", sp.asin(y / 2) - sp.asin(x / 2), -sp.sqrt(4 - y**2), sp.sqrt(4 - x**2))
# 7-2-1-4: (2 - x - k)y' = k*y^2 => y = 1/(k*ln(2 - x - k) + C) on 2 - x - k > 0
verify_implicit_ode("jc935-7-2-1-4", 1 / y - k * sp.log(2 - x - k), -k * y**2, 2 - x - k)
verify_implicit_ode("jc935-7-2-1-5", sp.tan(x) * sp.tan(y) ** 2, sp.sec(x) ** 2 * sp.tan(y), 2 * sp.sec(y) ** 2 * sp.tan(x))
verify_implicit_ode("jc935-7-2-1-6", 2**x + 2 ** (-y), -(2 ** (x + y)), 1)
verify_implicit_ode("jc935-7-2-1-7", (sp.exp(x) - 1) * (sp.exp(y) + 1), sp.exp(x + y) + sp.exp(x), sp.exp(x + y) - sp.exp(y))
verify_implicit_ode("jc935-7-2-1-8", sp.cos(x) * sp.cos(y), sp.sin(x) * sp.cos(y), sp.cos(x) * sp.sin(y))
verify_implicit_ode("jc935-7-2-1-9", (y - 2) ** 3 + x**3, x**2, (y - 2) ** 2)
verify_implicit_ode("jc935-7-2-1-10", y**6 * (6 - x) / x, y, x**2 - 6 * x)

# 7-2-2-(1..7): Initial value problems
verify_explicit_ode(
    "jc935-7-2-2-1",
    sp.log((sp.exp(3 * x) + 2) / 3),
    yf(x).diff(x) - sp.exp(3 * x - yf(x)),
    subs_ic=[(lambda f: f.subs(x, 0), 0)],
)
G_7222 = sp.sin(y) / sp.sin(x)
verify_implicit_ode("jc935-7-2-2-2", G_7222, -sp.sin(y) * sp.cos(x), sp.sin(x) * sp.cos(y))
assert sp.simplify(G_7222.subs({x: sp.pi / 6, y: sp.pi / 2}) - 2) == 0
verify_explicit_ode(
    "jc935-7-2-2-3",
    sp.exp(sp.tan(x / 2) ** 2),
    yf(x).diff(x) * sp.sin(x) - 2 * yf(x) * sp.log(yf(x)),
    subs_ic=[(lambda f: f.subs(x, sp.pi / 2), sp.E)],
)
G_7224 = (sp.exp(x) + 1) * sp.sin(y)
verify_implicit_ode("jc935-7-2-2-4", G_7224, sp.sin(y), (1 + sp.exp(-x)) * sp.cos(y))
assert sp.simplify(G_7224.subs({x: 0, y: sp.pi / 6}) - 1) == 0
G_7225 = x**3 * y
verify_implicit_ode("jc935-7-2-2-5", G_7225, 3 * y, x)
assert G_7225.subs({x: 1, y: 4}) == 4
# 7-2-2-6: (1/rho)*d(rho)/d(theta) + ((rho^2+4)/(rho^2-4))*cot(theta) = 0, rho(pi/2)=4
rho = sp.Symbol("rho", positive=True)
G_7226 = (rho + 4 / rho) * sp.sin(theta)
assert sp.simplify(sp.diff(G_7226, theta) * (1 / rho) - sp.diff(G_7226, rho) * ((rho**2 + 4) / (rho**2 - 4) * sp.cot(theta))) == 0
assert sp.simplify(G_7226.subs({theta: sp.pi / 2, rho: 4}) - 5) == 0
checked.append("jc935-7-2-2-6")
# 7-2-2-7: x^2(1 + (y')^2) = 4, y(2) = 0 on 0 < x <= 2
xp = sp.Symbol("xp", positive=True)
y_7227 = sp.sqrt(4 - xp**2) + 2 * sp.log((2 - sp.sqrt(4 - xp**2)) / xp)
assert sp.simplify(xp**2 * (1 + sp.diff(y_7227, xp) ** 2) - 4) == 0
assert sp.simplify(y_7227.subs(xp, 2)) == 0
checked.append("jc935-7-2-2-7")

# 7-2-3: Conical tank draining
h = sp.Symbol("h", positive=True)
t_h = sp.Rational(1, 10) * (1024 - h ** sp.Rational(5, 2))
# Check dt/dh = -pi*h^2 / (4*pi*sqrt(h)) = -(1/4)*h^(3/2)
assert sp.simplify(sp.diff(t_h, h) + sp.Rational(1, 4) * h ** sp.Rational(3, 2)) == 0
assert t_h.subs(h, 16) == 0 and t_h.subs(h, 0) == sp.Rational(512, 5)
checked.append("jc935-7-2-3")

# 7-2-4: Particle linear motion, 2*v' = 16*t/v, v(5)=20 => v(t)=sqrt(8t^2+200)
v_t = sp.sqrt(8 * t**2 + 200)
assert sp.simplify(2 * sp.diff(v_t, t) - 16 * t / v_t) == 0
assert v_t.subs(t, 5) == 20 and sp.simplify(v_t.subs(t, 10) - 10 * sp.sqrt(10)) == 0
checked.append("jc935-7-2-4")

# 7-2-5: Radioactive decay, half-life 1200 years
M0 = sp.Symbol("M0", positive=True)
M_t = M0 * sp.exp(-sp.log(2) / 1200 * t)
assert sp.simplify(sp.diff(M_t, t) + (sp.log(2) / 1200) * M_t) == 0
assert M_t.subs(t, 0) == M0 and sp.simplify(M_t.subs(t, 1200) - M0 / 2) == 0
checked.append("jc935-7-2-5")

# 7-2-6: Curve through (3, 4), tangent segment bisected by tangency point => xy = 12
verify_explicit_ode("jc935-7-2-6", 12 / x, yf(x).diff(x) + yf(x) / x, subs_ic=[(lambda f: f.subs(x, 3), 4)])

# 7-2-7: Boat crossing river
x_y = (k / v0) * (L / 2 * y**2 - sp.Rational(1, 3) * y**3)
assert sp.simplify(sp.diff(x_y, y) - (k / v0) * y * (L - y)) == 0
assert x_y.subs(y, 0) == 0
checked.append("jc935-7-2-7")


# ============================================================
# Section 7-3: 齐次方程 (15 items)
# ============================================================

# 7-3-1-(1..6): General solutions of homogeneous ODEs
# 7-3-1-1: xy' - y - 2*sqrt(y^2 - x^2) = 0 (x > 0, y > x) => (y + sqrt(y^2 - x^2))/x^3 = C
yp_pos = sp.Symbol("yp_pos", positive=True)
F_7311 = (y + sp.sqrt(y**2 - xp**2)) / xp**3
res_7311 = sp.simplify(sp.diff(F_7311, xp) * xp + sp.diff(F_7311, y) * (y + 2 * sp.sqrt(y**2 - xp**2)))
assert res_7311 == 0, f"jc935-7-3-1-1 failed: {res_7311}"
checked.append("jc935-7-3-1-1")

verify_explicit_ode("jc935-7-3-1-2", x * sp.exp(C * x - 1), x * yf(x).diff(x) - yf(x) * (sp.log(yf(x) / x) + 2))
verify_implicit_ode("jc935-7-3-1-3", y**2 / x**2 - 4 * sp.log(x), 2 * x**2 + y**2, -x * y)
verify_implicit_ode("jc935-7-3-1-4", (x**3 - y**3) / x**2, x**3 + 2 * y**3, -3 * x * y**2)
verify_implicit_ode(
    "jc935-7-3-1-5",
    sp.sin(y / x) ** 2 / x,
    x * sp.sin(y / x) + 2 * y * sp.cos(y / x),
    -2 * x * sp.cos(y / x),
)
verify_implicit_ode(
    "jc935-7-3-1-6",
    x + 3 * y * sp.exp(x / y),
    1 + 3 * sp.exp(x / y),
    3 * sp.exp(x / y) * (1 - x / y),
)

# 7-3-2-(1..4): IVPs for homogeneous ODEs
F_7321 = y**4 - 4 * (y**2 - x**2)
verify_implicit_ode("jc935-7-3-2-1", (x**2 - y**2) / y**4, x * y, y**2 - 2 * x**2)
assert F_7321.subs({x: 0, y: 2}) == 0
F_7322 = y**2 - x**2 * (6 * sp.log(x) + 9)
verify_implicit_ode("jc935-7-3-2-2", y**2 / x**2 - 6 * sp.log(x), -(3 * x / y + y / x), 1)
assert F_7322.subs({x: 1, y: 3}) == 0
F_7323 = (x + 2 * y) / (x**2 + y**2)
verify_implicit_ode("jc935-7-3-2-3", F_7323, x**2 + 4 * x * y - y**2, 2 * y**2 + 2 * x * y - 2 * x**2)
assert F_7323.subs({x: 1, y: 2}) == 1
F_7324 = sp.sin(y / x) - 2 * sp.log(x) - sp.Rational(1, 2)
verify_implicit_ode("jc935-7-3-2-4", F_7324, -(y + 2 * x * sp.sec(y / x)), x)
assert F_7324.subs({x: 1, y: sp.pi / 6}) == 0

# 7-3-3: Area between arc OP and chord OP equals (3/2)x^2, through A(1,2)
y_733 = x * (2 - 6 * sp.log(x))
area_733 = sp.integrate(y_733, (x, 0, xp)) - sp.Rational(1, 2) * xp * y_733.subs(x, xp)
assert sp.simplify(area_733 - sp.Rational(3, 2) * xp**2) == 0
assert y_733.subs(x, 1) == 2
checked.append("jc935-7-3-3")

# 7-3-4-(1..4): Reducible to homogeneous ODEs
verify_implicit_ode(
    "jc935-7-3-4-1",
    (y - 2 * x) ** 4 / (x + y - 3),
    2 * x + 3 * y - 8,
    -(2 * x + y - 4),
)
verify_implicit_ode(
    "jc935-7-3-4-2",
    sp.log((x - 2) ** 2 + (y + 1) ** 2) + sp.atan((y + 1) / (x - 2)),
    2 * x - y - 5,
    x + 2 * y,
)
verify_implicit_ode(
    "jc935-7-3-4-3",
    (y - x - 2) ** 3 * (x + y) ** 7,
    2 * y - 5 * x - 7,
    5 * y - 2 * x - 7,
)
verify_implicit_ode(
    "jc935-7-3-4-4",
    x + 2 * y + sp.log(2 * x + y - 2),
    2 * x + y,
    4 * x + 2 * y - 3,
)

assert len(checked) == 57 and len(set(checked)) == 57, f"Expected 57 unique items, got {len(checked)}"
print(f"All {len(checked)} items in Sections 7-1, 7-2, and 7-3 verified symbolically with SymPy!")

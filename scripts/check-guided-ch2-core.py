"""SymPy step-chain verifier for ch2Core guidedHints (26 problems)."""

import time
import sympy as sp

x, h, t, p, dx = sp.symbols("x h t p dx", real=True)
xp = sp.Symbol("xp", real=True, positive=True)
tp = sp.Symbol("tp", real=True, positive=True)


def assert_eq_expr(pid: str, step: str, e1, e2) -> None:
    diff = sp.simplify(e1 - e2)
    if diff != 0:
        raise AssertionError(f"[{pid}] {step}: {e1} != {e2} (diff={diff})")


def assert_limit(pid: str, expr, var, pt, expected, dir_str="+-") -> None:
    got = sp.limit(expr, var, pt, dir=dir_str)
    if sp.simplify(got - expected) != 0:
        raise AssertionError(f"[{pid}] limit({expr}, {var}->{pt}{dir_str}) = {got} != {expected}")


def assert_denom_nonzero(pid: str, expr, var, pt) -> None:
    _, denom = sp.fraction(sp.together(expr))
    val = denom.subs(var, pt)
    if sp.simplify(val) == 0:
        raise AssertionError(f"[{pid}] final denominator is 0 at {var}={pt} for {expr}")


def verify_all() -> int:
    checked = 0

    # p11: f(x)=x^2, f'(3) = lim_{h->0} ((3+h)^2 - 9)/h = 6
    e0 = ((3 + h) ** 2 - 9) / h
    e1 = (9 + 6 * h + h**2 - 9) / h
    e2 = (6 * h + h**2) / h
    e3 = h * (6 + h) / h
    e4 = 6 + h
    assert_eq_expr("p11", "expand", e0, e1)
    assert_eq_expr("p11", "combine", e1, e2)
    assert_eq_expr("p11", "factor", e2, e3)
    assert_eq_expr("p11", "cancel", e3, e4)
    assert_denom_nonzero("p11", e4, h, 0)
    assert_limit("p11", e0, h, 0, 6)
    assert sp.diff(x**2, x).subs(x, 3) == 6
    assert e4.subs(h, 0) == 6
    checked += 1

    # p12: f(x)=sqrt(x), f'(1) = lim_{h->0} (sqrt(1+h) - 1)/h = 1/2
    e0 = (sp.sqrt(1 + h) - 1) / h
    e1 = (sp.sqrt(1 + h) - 1) * (sp.sqrt(1 + h) + 1) / (h * (sp.sqrt(1 + h) + 1))
    e2 = ((1 + h) - 1) / (h * (sp.sqrt(1 + h) + 1))
    e3 = h / (h * (sp.sqrt(1 + h) + 1))
    e4 = 1 / (sp.sqrt(1 + h) + 1)
    assert_eq_expr("p12", "conjugate", e0, e1)
    assert_eq_expr("p12", "diff_squares", e1, e2)
    assert_eq_expr("p12", "simplify_num", e2, e3)
    assert_eq_expr("p12", "cancel_h", e3, e4)
    assert_denom_nonzero("p12", e4, h, 0)
    assert_limit("p12", e0, h, 0, sp.Rational(1, 2))
    assert e4.subs(h, 0) == sp.Rational(1, 2)
    checked += 1

    # p13: f(x)=x^3-4x+2, f'(2) = 8
    f13 = x**3 - 4 * x + 2
    df13 = sp.diff(f13, x)
    assert_eq_expr("p13", "deriv", df13, 3 * x**2 - 4)
    assert df13.subs(x, 2) == 8
    checked += 1

    # p14: f(x)=x*ln(x), f'(1) = 1
    f14 = xp * sp.ln(xp)
    df14_raw = sp.diff(xp, xp) * sp.ln(xp) + xp * sp.diff(sp.ln(xp), xp)
    df14 = sp.ln(xp) + 1
    assert_eq_expr("p14", "product_rule", sp.diff(f14, xp), df14_raw)
    assert_eq_expr("p14", "simplify", df14_raw, df14)
    assert df14.subs(xp, 1) == 1
    checked += 1

    # p15: f(x)=(2x+1)^3, f'(0) = 6
    f15 = (2 * x + 1) ** 3
    df15_s1 = 3 * (2 * x + 1) ** 2 * sp.diff(2 * x + 1, x)
    df15_s2 = 3 * (2 * x + 1) ** 2 * 2
    df15_s3 = 6 * (2 * x + 1) ** 2
    assert_eq_expr("p15", "chain_1", sp.diff(f15, x), df15_s1)
    assert_eq_expr("p15", "chain_2", df15_s1, df15_s2)
    assert_eq_expr("p15", "chain_3", df15_s2, df15_s3)
    assert df15_s3.subs(x, 0) == 6
    checked += 1

    # p16: f(x)=ln(3x+1), f'(1) = 3/4
    f16 = sp.ln(3 * x + 1)
    df16_s1 = (1 / (3 * x + 1)) * sp.diff(3 * x + 1, x)
    df16_s2 = 3 / (3 * x + 1)
    assert_eq_expr("p16", "chain_1", sp.diff(f16, x), df16_s1)
    assert_eq_expr("p16", "chain_2", df16_s1, df16_s2)
    assert_denom_nonzero("p16", df16_s2, x, 1)
    assert df16_s2.subs(x, 1) == sp.Rational(3, 4)
    checked += 1

    # p17: f(x)=x^2, x0=2, dx=0.1 -> dy = 0.4
    df17 = sp.diff(x**2, x)
    assert_eq_expr("p17", "deriv", df17, 2 * x)
    assert df17.subs(x, 2) == 4
    assert df17.subs(x, 2) * sp.Rational(1, 10) == sp.Rational(2, 5)
    checked += 1

    # p18: f(x)=sqrt(x), x0=4, dx=0.04 -> f(4)+f'(4)dx = 2.01
    f18 = sp.sqrt(xp)
    df18 = sp.diff(f18, xp)
    assert_eq_expr("p18", "deriv", df18, 1 / (2 * sp.sqrt(xp)))
    assert f18.subs(xp, 4) == 2
    assert df18.subs(xp, 4) == sp.Rational(1, 4)
    approx18 = f18.subs(xp, 4) + df18.subs(xp, 4) * sp.Rational(4, 100)
    assert approx18 == sp.Rational(201, 100)
    checked += 1

    # p40: x=t^2, y=t^3, y'(x)|_{t=2} = 3
    dx_dt = sp.diff(t**2, t)
    dy_dt = sp.diff(t**3, t)
    yp_raw = dy_dt / dx_dt
    yp_simp = sp.Rational(3, 2) * t
    assert_eq_expr("p40", "param_deriv", yp_raw, (3 * t**2) / (2 * t))
    assert_eq_expr("p40", "cancel_t", yp_raw, yp_simp)
    assert_denom_nonzero("p40", yp_simp, t, 2)
    assert yp_simp.subs(t, 2) == 3
    checked += 1

    # p41: Q(p)=120-3p, E(10) = 1/3
    Q41 = 120 - 3 * p
    dQ41 = sp.diff(Q41, p)
    E41 = -p * dQ41 / Q41
    assert dQ41 == -3
    assert Q41.subs(p, 10) == 90
    assert_denom_nonzero("p41", E41, p, 10)
    assert E41.subs(p, 10) == sp.Rational(1, 3)
    checked += 1

    # p129: f(x)=(2x^2+x)^3, f'(1) = 135
    f129 = (2 * x**2 + x) ** 3
    df129_s1 = 3 * (2 * x**2 + x) ** 2 * sp.diff(2 * x**2 + x, x)
    df129_s2 = 3 * (2 * x**2 + x) ** 2 * (4 * x + 1)
    assert_eq_expr("p129", "chain_1", sp.diff(f129, x), df129_s1)
    assert_eq_expr("p129", "chain_2", df129_s1, df129_s2)
    assert df129_s2.subs(x, 1) == 135
    checked += 1

    # p130: x=t^2, y=t^3 (t>0), d^2y/dx^2|_{t=2} = 3/8
    dx130 = sp.diff(tp**2, tp)
    dy130 = sp.diff(tp**3, tp)
    yp130 = sp.simplify(dy130 / dx130)
    assert_eq_expr("p130", "first_deriv", yp130, sp.Rational(3, 2) * tp)
    ypp130 = sp.diff(yp130, tp) / dx130
    assert_eq_expr("p130", "second_deriv", ypp130, 3 / (4 * tp))
    assert_denom_nonzero("p130", ypp130, tp, 2)
    assert ypp130.subs(tp, 2) == sp.Rational(3, 8)
    checked += 1

    # p131: f(x)=x*e^x/(1+x), f'(0) = 1
    f131 = x * sp.exp(x) / (1 + x)
    u131 = x * sp.exp(x)
    v131 = 1 + x
    du131 = sp.exp(x) * (1 + x)
    assert_eq_expr("p131", "num_deriv", sp.diff(u131, x), du131)
    df131_step = (du131 * v131 - u131 * sp.diff(v131, x)) / v131**2
    assert_eq_expr("p131", "quotient", sp.diff(f131, x), df131_step)
    assert_denom_nonzero("p131", df131_step, x, 0)
    assert df131_step.subs(x, 0) == 1
    checked += 1

    # p132: x0=25, dx=1, f(x)=sqrt(x), df = 1/10
    df132 = sp.diff(sp.sqrt(xp), xp)
    assert_eq_expr("p132", "deriv", df132, 1 / (2 * sp.sqrt(xp)))
    assert df132.subs(xp, 25) * 1 == sp.Rational(1, 10)
    checked += 1

    # p133: Q(p)=150-3p, R(p)=pQ(p), R'(30) = -30
    Q133 = 150 - 3 * p
    R133 = p * Q133
    dQ133 = sp.diff(Q133, p)
    E133 = -p * dQ133 / Q133
    dR133_elast = Q133 * (1 - E133)
    assert_eq_expr("p133", "elast_identity", sp.diff(R133, p), dR133_elast)
    assert Q133.subs(p, 30) == 60
    assert E133.subs(p, 30) == sp.Rational(3, 2)
    assert dR133_elast.subs(p, 30) == -30
    checked += 1

    # p175: theta(t)=2t^2+t, theta'(2) = 9
    th175 = 2 * t**2 + t
    dth175 = sp.diff(th175, t)
    assert_eq_expr("p175", "deriv", dth175, 4 * t + 1)
    assert dth175.subs(t, 2) == 9
    checked += 1

    # p176: f(x)=-3x (x<0), 2x^2 (x>=0), f'_-(0) = -3
    q176 = (-3 * x - 0) / x
    assert_eq_expr("p176", "cancel_x", q176, sp.Integer(-3))
    assert_limit("p176", q176, x, 0, -3, dir_str="-")
    checked += 1

    # p177: f(x)=cot(4x), f'(pi/8) = -4
    f177 = sp.cot(4 * x)
    df177 = -4 / sp.sin(4 * x) ** 2
    assert_eq_expr("p177", "chain", sp.diff(f177, x), df177)
    assert_denom_nonzero("p177", df177, x, sp.pi / 8)
    assert df177.subs(x, sp.pi / 8) == -4
    checked += 1

    # p178: f(x)=3x^2+2ln(x), f''(2) = 11/2
    f178 = 3 * xp**2 + 2 * sp.ln(xp)
    df178 = 6 * xp + 2 / xp
    ddf178 = 6 - 2 / xp**2
    assert_eq_expr("p178", "first_deriv", sp.diff(f178, xp), df178)
    assert_eq_expr("p178", "second_deriv", sp.diff(df178, xp), ddf178)
    assert_denom_nonzero("p178", ddf178, xp, 2)
    assert ddf178.subs(xp, 2) == sp.Rational(11, 2)
    checked += 1

    # p179: y^2 - 2xy + 8 = 0 at (3,2) -> y' = -2
    y_sym = sp.Symbol("y", real=True)
    yp_sym = sp.Symbol("yp", real=True)
    F179 = y_sym**2 - 2 * x * y_sym + 8
    assert F179.subs({x: 3, y_sym: 2}) == 0
    imp179 = sp.diff(F179, x) + sp.diff(F179, y_sym) * yp_sym
    assert_eq_expr("p179", "implicit_diff", imp179, 2 * y_sym * yp_sym - 2 * y_sym - 2 * x * yp_sym)
    sol179 = sp.solve(imp179, yp_sym)[0]
    assert_eq_expr("p179", "solve_yp", sol179, y_sym / (y_sym - x))
    assert sol179.subs({x: 3, y_sym: 2}) == -2
    checked += 1

    # p180: y=x^3-2x, x=1, dx=1/2 -> dy_true - dy = 7/8
    f180 = x**3 - 2 * x
    df180 = sp.diff(f180, x)
    assert_eq_expr("p180", "deriv", df180, 3 * x**2 - 2)
    dy_true = f180.subs(x, sp.Rational(3, 2)) - f180.subs(x, 1)
    dy_lin = df180.subs(x, 1) * sp.Rational(1, 2)
    assert dy_true == sp.Rational(11, 8)
    assert dy_lin == sp.Rational(1, 2)
    assert dy_true - dy_lin == sp.Rational(7, 8)
    checked += 1

    # p211: d/dx (x^3 ln x), x>0 -> x^2(3 ln x + 1)
    f211 = xp**3 * sp.ln(xp)
    s211_1 = sp.diff(xp**3, xp) * sp.ln(xp) + xp**3 * sp.diff(sp.ln(xp), xp)
    s211_2 = 3 * xp**2 * sp.ln(xp) + xp**2
    s211_ans = xp**2 * (3 * sp.ln(xp) + 1)
    assert_eq_expr("p211", "prod", sp.diff(f211, xp), s211_1)
    assert_eq_expr("p211", "simp", s211_1, s211_2)
    assert_eq_expr("p211", "factor", s211_2, s211_ans)
    checked += 1

    # p212: d/dx (x^3 ln x sin x), x>0 -> x^2(3 ln x + 1) sin x + x^3 ln x cos x
    f212 = xp**3 * sp.ln(xp) * sp.sin(xp)
    s212_1 = (
        3 * xp**2 * sp.ln(xp) * sp.sin(xp)
        + xp**3 * (1 / xp) * sp.sin(xp)
        + xp**3 * sp.ln(xp) * sp.cos(xp)
    )
    s212_2 = 3 * xp**2 * sp.ln(xp) * sp.sin(xp) + xp**2 * sp.sin(xp) + xp**3 * sp.ln(xp) * sp.cos(xp)
    s212_ans = xp**2 * (3 * sp.ln(xp) + 1) * sp.sin(xp) + xp**3 * sp.ln(xp) * sp.cos(xp)
    assert_eq_expr("p212", "prod3", sp.diff(f212, xp), s212_1)
    assert_eq_expr("p212", "simp", s212_1, s212_2)
    assert_eq_expr("p212", "group", s212_2, s212_ans)
    checked += 1

    # p213: f(x)=x cos(2x), f''(x) = -4 sin(2x) - 4x cos(2x)
    f213 = x * sp.cos(2 * x)
    df213 = sp.cos(2 * x) - 2 * x * sp.sin(2 * x)
    ddf213_step = -2 * sp.sin(2 * x) - 2 * (sp.sin(2 * x) + 2 * x * sp.cos(2 * x))
    ddf213_ans = -4 * sp.sin(2 * x) - 4 * x * sp.cos(2 * x)
    assert_eq_expr("p213", "first_deriv", sp.diff(f213, x), df213)
    assert_eq_expr("p213", "second_step", sp.diff(df213, x), ddf213_step)
    assert_eq_expr("p213", "second_ans", ddf213_step, ddf213_ans)
    checked += 1

    # p214: x^2 + 3y^2 = 28 at (1,3) -> y' = -x/(3y), y'(1) = -1/9
    F214 = x**2 + 3 * y_sym**2 - 28
    assert F214.subs({x: 1, y_sym: 3}) == 0
    imp214 = sp.diff(F214, x) + sp.diff(F214, y_sym) * yp_sym
    assert_eq_expr("p214", "implicit_diff", imp214, 2 * x + 6 * y_sym * yp_sym)
    sol214 = sp.solve(imp214, yp_sym)[0]
    assert_eq_expr("p214", "solve_yp", sol214, -x / (3 * y_sym))
    assert sol214.subs({x: 1, y_sym: 3}) == sp.Rational(-1, 9)
    checked += 1

    # p215: y=x^2, x=3, dx=0.02 -> Delta y = 0.1204, dy = 0.12, diff = 0.0004
    dy215_exact = (x + dx) ** 2 - x**2
    dy215_expand = 2 * x * dx + dx**2
    assert_eq_expr("p215", "expand", dy215_exact, dy215_expand)
    dy215_lin = 2 * x * dx
    rem215 = dy215_expand - dy215_lin
    assert_eq_expr("p215", "remainder", rem215, dx**2)
    subs215 = {x: 3, dx: sp.Rational(2, 100)}
    assert dy215_lin.subs(subs215) == sp.Rational(12, 100)
    assert rem215.subs(subs215) == sp.Rational(4, 10000)
    assert dy215_exact.subs(subs215) == sp.Rational(1204, 10000)
    checked += 1

    return checked


if __name__ == "__main__":
    t0 = time.perf_counter()
    total = verify_all()
    elapsed = time.perf_counter() - t0
    print(f"OK: verified {total}/26 ch2Core problems in {elapsed:.2f}s")
